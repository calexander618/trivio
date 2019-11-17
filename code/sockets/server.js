var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname));

var port = process.env.PORT || 8080;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.get('/', function(res){
    res.sendFile('index.html');
}); 


var gameCount = new Map();

io.on('connection', function (socket) {
    socket.on('joinRequest', function (req) {
        var game = req.gameId;
        var player = req.playerId;
        //need to error check and see if user is in game
        if (gameCount.has(game)) {
            if (gameCount.get(game) < 2) {
                gameCount.set(game, gameCount.get(game)+1);
                io.to(game).emit('playerJoin');
                socket.join(game);
            }
            else {
                //need to implement fullGameError on client-side
                socket.emit('fullGameError', { gameId: game });
            }
        }
        else {
            gameCount.set(game, 1);
            io.to(game).emit('playerJoin');
            socket.join(game);
        }
    });
  
    // socket.on('disconnect', function () {
    //   io.emit('user disconnected');
    // });

});