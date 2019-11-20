<template>
  <div>
    <input v-model="message" placeholder="Send a message" />
    <button v-on:click="sendMessage(gameId, playerId, message)">SEND</button>
    <hr />
    <!-- <button v-on:click="startGame(gameId)">START GAME</button> -->
    <button id="start" v-on:click="nextQuestion()" :disabled="currentQuestion>=10">START GAME</button>
    <div v-if="started">
      <h3 v-html="questions[currentQuestion-1].question"></h3>
      <h1>{{currentTime}}</h1>
    </div>
    <div>
      <ul>
        <li v-for="message in chatMessages" v-bind:key="message">{{ message }}</li>
      </ul>
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
    this.getQuestions(this.gameId);
  },

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