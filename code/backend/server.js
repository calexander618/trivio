var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var apiRoutes = require("./api-routes");

var options = {
    key: fs.readFileSync('/etc/nginx/ssl/michaelwoodruffdev.com.key'),
    cert: fs.readFileSync('/etc/nginx/ssl/michaelwoodruffdev.com.crt')
};

// app.use(cors());
app.use(bodyparser.json());
app.use(express.static('/home/cca374/hirechasealexander.com/dist'));
app.use('/api', apiRoutes);

var mongo = 'mongodb://127.0.0.1:27017/trivio';
var port = process.env.PORT || 443;

mongoose.connect(mongo)
    .then(() => 'Connected to MongoDB')
    .catch(error => console.log('Error connecting to MongoDB: ' + error));

var server = https.createServer(options, app).listen(port, function () {
    console.log("Express server listening on port " + port);
});

var io = require('socket.io')(server, {
    pingTimeout: 60000,
});

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

var gameSessions = new Map();
var gameQueue = [];
var privateGames = [];

io.on('connection', function (socket) {
    // ON CREATE GAME REQUEST
    socket.on('createRequest', function (req) {
        // get questions from api
        https.get(`https://opentdb.com/api.php?amount=${req.questionCount}&category=${req.category}&difficulty=${req.difficulty}&type=multiple`, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                // once request is processed, add questions to gameSession being created
                // store gamesession in map
                gameSessions.set(req.gameId, {
                    players: [{
                        playerId: req.playerId,
                        score: 0
                    }],
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
                // store in game queue or game session
                switch( req.visibility ) {
                    case 'public': 
                        gameQueue.push(req.gameId);
                        break;
                    case 'private': 
                        privateGames.push({
                            username: req.playerId, 
                            gameId: req.gameId
                        });
                        break;
                }
                gameQueue.push(req.gameId);
                socket.emit('gameCreated', {
                    gameId: req.gameId
                });
                // console.log(data);
                // console.log('SENDING TRIVIA TO GAME ' + req.gameId);
                // io.to(req.gameId).emit('newQuestions', { questions: JSON.parse(data).results });
            });
        }).on('error', (err) => {
            console.log("ERROR GETTING TRIVIA: " + err.message);
        });
    });

    socket.on('joinFriendRequest', function (req) {
        console.log('got joinfriendrequest');
        if (!privateGames.map(p => p.username).includes(req.friend)) {
            socket.emit('errorMessage', {message: `${req.friend} isnt hosting a game right now`});
            return;
        }

        let playerId = req.playerId;
        let gameId = privateGames.find(p => p.username === req.friend).gameId;
        privateGames = privateGames.filter(p => p.username !== req.friend);
        let gameToJoin = gameSessions.get(gameId);

        console.log(`playerId: ${playerId}`);
        console.log(`gameId: ${gameId}`);
        console.dir(`game: ${gameToJoin}`);

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

        return;


    });

    socket.on('joinRequest', function (req) {
        // check if gameQueue is empty
        if (gameQueue.length === 0) {
            socket.emit('errorMessage', {
                message: 'no games available'
            });
            return;
        }

        let playerId = req.playerId;
        let gameId = gameQueue.shift();
        let gameToJoin = gameSessions.get(gameId);

        // keep from players playing themselves
        if (gameToJoin.players[0].playerId === playerId) {
            console.log('ERROR: PLAYER ' + playerId + ' ALREADY IN GAME ');
            socket.emit('inGameError', {
                gameId: gameId
            });
            return;
        }

        // update gamesession object
        gameToJoin.playerCount++;
        gameToJoin.players.push({
            playerId: playerId,
            score: 0
        });
        gameSessions.set(gameId, gameToJoin);

        // notify lobby that player joined
        io.to(gameId).emit('playerJoin', {
            playerId: playerId
        });

        // join lobby
        socket.join(gameId);
        console.log('PLAYER ' + playerId + ' JOINED GAME ' + gameId);

        // notify joining socket that it's successfully joined
        socket.emit('gameJoined', {
            gameId: gameId
        });
    });

    socket.on('finishGame', function (req) {
        // update score for finished game
        let gameSession = gameSessions.get(req.gameId);
        if (!gameSession) {
            return;
        }
        gameSession.players[gameSession.players.findIndex(p => p.playerId === req.playerId)].score = req.score;
        gameSession.playersDone.push(req.playerId);
        gameSessions.set(req.gameId, gameSession);

        if (gameSession.playersDone.length === 2) {
            // tell frontend who won
            // notify frontend with game results
            io.to(req.gameId).emit('gameFinished', gameSession);
            gameSessions.delete(req.gameId);
            return;
        }

        console.log('waiting for player to finish');
        socket.emit('waitingForPlayersToFinish');
    });

    socket.on('navigatingAway', function (req) {
        console.log(req);
        // emit to players still in game that game is left
        let gameSession = gameSessions.get(req.gameId);
        if (typeof gameSession !== 'undefined') {
            io.to(req.gameId).emit('earlyEnd');
        }
        // remove game from gamesessions
        gameSessions.delete(req.gameId);
        gameQueue = gameQueue.filter(g => g !== req.gameId);
        console.log(gameSessions.get(req.gameId));
        console.log(gameQueue);
    });

    socket.on('messageRequest', function (req) {
        console.log('PLAYER ' + req.playerId + ' TO GAME ' + req.gameId + ': ' + req.message);
        io.to(req.gameId).emit('playerMessage', {
            playerId: req.playerId,
            message: req.message
        });
    });

    socket.on('triviaRequest', function (req) {
        socket.playerId = req.playerId;
        socket.gameId = req.gameId;
        console.log('PLAYER ID: ' + socket.playerId);
        let gameSession = gameSessions.get(req.gameId);
        if (typeof gameSession === 'undefined') {
            socket.emit('inGameError', {
                message: 'game not found'
            });
            return;
        }
        if (typeof gameSession.players.find(p => p.playerId === req.playerId) === 'undefined') {
            socket.emit('inGameError', {
                message: 'player not in game'
            });
            return;
        }
        if (gameSession.playersServed.includes(req.playerId)) {
            socket.emit('inGameError', {
                message: 'player already served questions'
            });
            return;
        }
        // console.log(gameSession);
        console.log(5);
        gameSession.playersServed.push(req.playerId);
        gameSessions.set(req.gameId, gameSession);
        console.log(gameSession.playersServed);
        socket.emit('newQuestions', {
            questions: gameSession.questions
        });

        // check if game is ready to be played
        if (gameSession.playersServed.length === 2) {
            console.log(6);
            io.to(req.gameId).emit('gameReady');
        }
    });


    socket.on('disconnect', function () {
        console.log('user disconnect');
        // emit to players still in game that game is left
        let gameSession = gameSessions.get(socket.gameId);
        io.to(socket.gameId).emit('earlyEnd');
        // remove game from gamesessions
        gameSessions.delete(socket.gameId);
        gameQueue = gameQueue.filter(g => g !== socket.gameId);
        console.log(gameSessions.get(socket.gameId));
        console.log(gameQueue);
    });

});