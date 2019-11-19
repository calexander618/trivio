<template>
  <div>
    <input v-model="gameId" placeholder="Game ID" />
    <input v-model="playerId" placeholder="Player ID" />
    <button v-on:click="joinGame(gameId, playerId)">JOIN</button>
    <hr />
    <input v-model="message" placeholder="Send a message" />
    <button v-on:click="sendMessage(gameId, playerId, message)">SEND</button>
    <hr />
    <button v-on:click="startGame(gameId)">START GAME</button>
    <div>{{questions}}</div>
    <div>
      <ul>
        <li v-for="message in chatMessages" v-bind:key="message">{{ message }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameId: undefined,
      playerId: undefined,
      questions: undefined,
      chatMessages: [],
      message: undefined
    };
  },
  mounted() {},
  sockets: {
    connect() {},
    disconnect() {},

    playerJoin(data) {
      this.chatMessages.push("Player " + data.playerId + " has joined.");
    },
    playerMessage(data) {
      this.chatMessages.push(data.playerId + ": " + data.message);
    },
    newQuestions(data) {
        this.questions = data.questions;
    }
  },
  methods: {
    joinGame(gameId, playerId) {
      // CHANGE THIS TO GET THE GAME ID PROVIDED FROM ROUTE
      this.$socket.emit("joinRequest", {
        gameId: gameId,
        playerId: playerId
      });
    },
    startGame(gameId) {
      this.getQuestions(gameId);
    },
    getQuestions(gameId) {
      this.$socket.emit("triviaRequest", {
        gameId: gameId
      });
    },
    sendMessage(gameId, playerId, message) {
      this.$socket.emit("messageRequest", {
        gameId: gameId,
        playerId: playerId,
        message: message
      });
    }
  }
};
</script>