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

app.get('/', function(res){
    res.sendFile('index.html');
}); 

var gameSessions = new Map();

io.on('connection', function (socket) {
    // jwt.verify
    // if not signed in (verified), socket.close();
    // JOIN THE GAME, OR CREATE NEW SOCKET ROOM FOR IT
    socket.on('joinRequest', function (req) {

        var playerId = req.playerId;
        var gameId = req.gameId;

        // SESSION IS ALREADY FULL
        if (gameSessions.has(gameId) && gameSessions.get(gameId).playerCount >= 2) {
            console.log('ERROR: GAME ' + gameId + ' IS FULL');
            socket.emit('fullGameError', { gameId: gameId });
            return;
        }

        // CREATE NEW GAME SESSION IN MAP
        if (!gameSessions.has(gameId)) {
            var newSession = {
                players: [playerId],
                playerCount: 1,
                player1Score: 0,
                player2Score: 0
            };
            gameSessions.set(gameId, newSession);
        }
        // RETRIEVE MAP ENTRY AND UPDATE IT
        // SEND MESSAGE TO REST OF SESSION
        else {
            var session = gameSessions.get(gameId);

            console.log(session);
            if (session.players[0] === playerId) {
                console.log('ERROR: PLAYER ' + playerId + ' ALREADY IN GAME ' + gameId);
                socket.emit('inGameError', { gameId: gameId });
                return;
            }

            session.playerCount++;
            session.players.push(playerId);
            gameSessions.set(gameId, session);
            io.to(gameId).emit('playerJoin', { playerId: playerId });
        }

        // JOIN/CREATE SESSION
        console.log('PLAYER ' + playerId + ' JOINED GAME ' + gameId);
        socket.join(gameId);

    });
    
    socket.on('messageRequest', function (req) {
        console.log('PLAYER ' + req.playerId + ' TO GAME ' + req.gameId + ': ' + req.message);
        io.to(req.gameId).emit('playerMessage', { playerId: req.playerId, message: req.message });
    });
    
    socket.on('triviaRequest', function (req) {            
        https.get('https://opentdb.com/api.php?amount=10&type=multiple', (resp) => {
            var data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                console.log('SENDING TRIVIA TO GAME ' + req.gameId);
                io.to(req.gameId).emit('newQuestions', { questions: JSON.parse(data).results });
            });

        }).on('error', (err) => {
          console.log("ERROR GETTING TRIVIA: " + err.message);
        });
        
    });

  
    // socket.on('disconnect', function () {
    //   io.emit('user disconnected');
    // });

});
