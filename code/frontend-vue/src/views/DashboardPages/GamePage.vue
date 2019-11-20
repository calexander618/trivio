<template>
  <div id="game-page">
    <div id="left">
      <button id="start" v-on:click="nextQuestion()" :disabled="currentQuestion>=10">START GAME</button>
      <div v-if="started">
        <h3 v-html="questions[currentQuestion-1].question"></h3>
        <h1>{{currentTime}}</h1>
      </div>
    </div>
    <div id="right">
      <div class="messages">
        <div class="message" v-for="(message, index) in chatMessages" :key="index">{{ message }}</div>
      </div>
      <div id="chat-inputs">
        <input v-model="message" placeholder="Send a message" />
        <button v-on:click="sendMessage(gameId, playerId, message)">SEND</button>
      </div>
    </div>
  </div>
</template>

<script>
import { generateId } from "../../controllers/IdController";

export default {
  data() {
    return {
      gameId: this.$route.params.id,
      playerId: generateId(),
      currentTime: 0,
      timer: undefined,
      started: false,
      questions: [],
      currentQuestion: 1,
      chatMessages: [],
      message: ""
    };
  },
  //   mounted() {
  //     this.joinGame(this.gameId, this.playerId);
  //   },
  created() {
    this.joinGame(this.gameId, this.playerId);
  },

  sockets: {
    connect() {},
    disconnect() {},

    playerJoin(data) {
      this.chatMessages.push("Player " + data.playerId + " has joined.");
      this.getQuestions(this.gameId);
    },
    playerMessage(data) {
      this.chatMessages.push(data.playerId + ": " + data.message);
    },
    newQuestions(data) {
      for (var i = 0; i < data.questions.length; i++) {
        this.questions.push(data.questions[i]);
      }
    }
  },
  methods: {
    countDownTimer() {
      this.timer = setInterval(() => {
        if (this.currentTime <= 0) {
          clearInterval(this.timer);
          if (this.currentQuestion < 10) {
            this.nextQuestion();
          }
          // WE COULD SET STARTED TO FALSE HERE ON LAST LOOP
          return;
        }
        this.currentTime--;
      }, 1000);
    },
    joinGame(gameId, playerId) {
      this.$socket.emit("joinRequest", {
        gameId: gameId,
        playerId: playerId
      });
    },
    // startGame(gameId) {
    //   this.getQuestions(gameId);
    // },
    getQuestions(gameId) {
      this.$socket.emit("triviaRequest", {
        gameId: gameId
      });
    },
    nextQuestion() {
      clearInterval(this.timer);
      this.currentTime = 10;
      this.countDownTimer();

      if (!this.started) {
        document.getElementById("start").innerHTML = "NEXT";
        this.started = true;
        return;
      }
      // WE COULD SET STARTED TO FALSE HERE ON LAST LOOP
      this.currentQuestion++;
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

<style scoped>
#game-page {
  display: flex;
  width: 100%;
  margin: auto;
  justify-content: space-evenly;
  margin-top: 2rem;
}
#left {
  width: 50%;
  height: 400px;
  background-color: #08381e44;
}
#right {
  width: 30%;
  height: 400px;
  border: 1px solid black;
  background-color: #343434be;
  padding: 1rem;
  position: relative;
}
#chat-inputs {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: calc(100% - 20px);
}
#chat-inputs > input {
  width: calc(70% - 5px);
  border: none;
  padding: 5px;
  color: white;
  background-color: #25a15fbd;
}
#chat-inputs > button {
  width: calc(30% - 5px);
  border: none;
  padding: 5px;
}
#chat-inputs > button:hover {
  background-color: lightgrey;
  cursor: pointer;
}
.message {
  font-family: 'Roboto';
  color: white;
  margin-top: 10px;
}
</style>