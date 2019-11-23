var express = require('express');
var app = express();

var cors = require('cors');

var server = require('http').Server(app);
var io = require('socket.io')(server, {
    pingTimeout: 60000,
});

var https = require('https');

var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var apiRoutes = require("./api-routes");

app.use(cors());
app.use(bodyparser.json());
app.use(express.static(__dirname));
app.use('/api', apiRoutes);

var mongo = 'mongodb://127.0.0.1:27017/trivio';
var port = process.env.PORT || 3000;

mongoose.connect(mongo)
    .then(() => 'Connected to MongoDB')
    .catch(error => console.log('Error connecting to MongoDB: ' + error));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.get('/', function (res) {
    res.sendFile('index.html');
});

var gameSessions = new Map();
var gameQueue = [];

io.on('connection', function (socket) {
    // ON CREATE GAME REQUEST
    socket.on('createRequest', function (req) {
        console.log(1);
        // get questions from api
        https.get(`https://opentdb.com/api.php?amount=${req.questionCount}&category=${req.category}&difficulty=${req.difficulty}&type=multiple`, (resp) => {
            let data = '';
            console.log(2);
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                console.log(3);
                // once request is processed, add questions to gameSession being created
                // store gamesession in map
                gameSessions.set(req.gameId, {
                    players: [{playerId: req.playerId, score: 0}],
                    playersServed: [], 
                    playersDone: [],
                    gameInfo: {
                        category: req.category,
                        difficulty: req.difficulty,
                        questionCount: req.questionCount
                    },
                    questions: JSON.parse(data).results,
                    playerCount: 1
                });
                console.log('GETTTING FROM MAP');
                console.log(gameSessions.get(req.gameId));
                // user creating game will join gamesession
                socket.join(req.gameId);
                // store in game queue
                gameQueue.push(req.gameId);
                socket.emit('gameCreated', { gameId: req.gameId });
                // console.log(data);
                // console.log('SENDING TRIVIA TO GAME ' + req.gameId);
                // io.to(req.gameId).emit('newQuestions', { questions: JSON.parse(data).results });
            });
        }).on('error', (err) => {
            console.log("ERROR GETTING TRIVIA: " + err.message);
        });
    });

    socket.on('joinRequest', function (req) {
        // check if gameQueue is empty
        if (gameQueue.length === 0) {
            socket.emit('errorMessage', {message: 'no games available'});
            return;
        }

        let playerId = req.playerId;
        let gameId = gameQueue.shift();
        let gameToJoin = gameSessions.get(gameId);

        // keep from players playing themselves
        if (gameToJoin.players[0].playerId === playerId) {
            console.log('ERROR: PLAYER ' + playerId + ' ALREADY IN GAME ');
            socket.emit('inGameError', { gameId: gameId });
            return;
        }

        // update gamesession object
        gameToJoin.playerCount++;
        gameToJoin.players.push({playerId: playerId, score: 0});
        gameSessions.set(gameId, gameToJoin);

        // notify lobby that player joined
        io.to(gameId).emit('playerJoin', { playerId: playerId });

        // join lobby
        socket.join(gameId);
        console.log('PLAYER ' + playerId + ' JOINED GAME ' + gameId);

        // notify joining socket that it's successfully joined
        socket.emit('gameJoined', { gameId: gameId });
    });

    // JOIN THE GAME, OR CREATE NEW SOCKET ROOM FOR IT
    // socket.on('joinRequest', function (req) {

    //     var playerId = req.playerId;
    //     var gameId = req.gameId;

    //     // SESSION IS ALREADY FULL
    //     if (gameSessions.has(gameId) && gameSessions.get(gameId).playerCount >= 2) {
    //         console.log('ERROR: GAME ' + gameId + ' IS FULL');
    //         socket.emit('fullGameError', { gameId: gameId });
    //         return;
    //     }

    //     // CREATE NEW GAME SESSION IN MAP IF GAME DOESNT EXIST
    //     if (!gameSessions.has(gameId)) {
    //         var newSession = {
    //             players: [playerId],
    //             playerCount: 1,
    //             player1Score: 0,
    //             player2Score: 0
    //         };
    //         gameSessions.set(gameId, newSession);
    //     }
    //     // OTHERWISE RETRIEVE MAP ENTRY AND UPDATE IT
    //     // SEND MESSAGE TO REST OF SESSION
    //     else {
    //         var session = gameSessions.get(gameId);

    //         console.log(session);
    //         if (session.players[0] === playerId) {
    //             console.log('ERROR: PLAYER ' + playerId + ' ALREADY IN GAME ' + gameId);
    //             socket.emit('inGameError', { gameId: gameId });
    //             return;
    //         }

    //         session.playerCount++;
    //         session.players.push(playerId);
    //         gameSessions.set(gameId, session);
    //         io.to(gameId).emit('playerJoin', { playerId: playerId });
    //     }

    //     // JOIN/CREATE SESSION
    //     console.log('PLAYER ' + playerId + ' JOINED GAME ' + gameId);
    //     socket.join(gameId);

    // });

    socket.on('finishGame', function(req) {
        // update score for finished game
        let gameSession = gameSessions.get(req.gameId);
        gameSession.players[gameSession.players.findIndex(p => p.playerId === req.playerId)].score = req.score;
        gameSession.playersDone.push(req.playerId);
        gameSessions.set(req.gameId, gameSession);

        if (gameSession.playersDone.length === 2) {
            // tell frontend who won
            // notify frontend with game results
            io.to(req.gameId).emit('gameFinished', gameSession);
            return;
        }

        console.log('waiting for player to finish');
        socket.emit('waitingForPlayersToFinish');
    });

    socket.on('messageRequest', function (req) {
        console.log('PLAYER ' + req.playerId + ' TO GAME ' + req.gameId + ': ' + req.message);
        io.to(req.gameId).emit('playerMessage', { playerId: req.playerId, message: req.message });
    });

    socket.on('triviaRequest', function (req) {
        let gameSession = gameSessions.get(req.gameId);
        if (typeof gameSession === 'undefined') {
            socket.emit('inGameError', {message: 'game not found'});
            return;
        }
        if (typeof gameSession.players.find(p => p.playerId === req.playerId) === 'undefined') {
            socket.emit('inGameError', {message: 'player not in game'});
            return;
        }
        if (gameSession.playersServed.includes(req.playerId)) {
            socket.emit('inGameError', {message: 'player already served questions'});
            return;
        }
        // console.log(gameSession);

        gameSession.playersServed.push(req.playerId);
        socket.emit('newQuestions', { questions: gameSession.questions });

        // check if game is ready to be played
        if (gameSession.playersServed.length === 2) {
            io.to(req.gameId).emit('gameReady');
        }
    });


    // socket.on('disconnect', function () {
    //   io.emit('user disconnected');
    // });

});
