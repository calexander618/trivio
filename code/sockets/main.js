var socket = io.connect('http://localhost:8080');
  
var $createGame = $('.createGame'); 
var $usernameInput = $('.usernameInput'); 
var $inputMessage = $('.inputMessage'); 

$createGame.click(function() {
    socket.emit('joinRequest', { gameId: $inputMessage.val(), playerId: $usernameInput.val() });
});

socket.on('playerJoin', function (data) {
    console.log("A player has joined the lobby");
});