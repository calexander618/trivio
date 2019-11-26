<template>
  <div id="game-page">
    <notification
      class="notification"
      :notificationMessage="gameResult"
      v-if="gameResult"
      @ok="endingRedirect()"
    ></notification>
    <md-card id="left">
      <md-card v-if="started" id="game">
        <p id="question-fraction">{{ currentQuestion }} / {{ questions.length }}</p>
        <div id="card-header">
          <h1 id="timer" class="md-card-header">Time: {{currentTime}}</h1>
          <h1 id="score" class="md-card-header">Score: {{score}}</h1>
        </div>
        <h3 v-html="questions[currentQuestion-1].question" class="trivia-question"></h3>
        <hr />
        <div
          class="answer"
          v-for="(answer, index) in currentAnswers.answers"
          :key="index + (transitionKey * 4)"
        >
          <div>
            <md-radio
              class="trivia-radio"
              type="radio"
              name="currentAnswer"
              :value="answer"
              v-model="currentAnswers.selected"
            />
            <p v-html="answer" class="trivia-option"></p>
          </div>
        </div>
      </md-card>
      <p id="pregame-timer" v-if="!started">{{pregameTimer}}</p>
      <md-button
        class="md-raised md-primary"
        id="start"
        v-on:click="nextQuestionOrSubmit()"
        :disabled="currentQuestion>questions.length || !started"
        v-if="gameStart"
      >NEXT</md-button>
    </md-card>
    <md-card id="right">
      <div class="messages">
        <md-card class="message" v-for="(message, index) in chatMessages" :key="index">{{ message }}</md-card>
      </div>
      <div id="chat-inputs">
        <md-field id="input-field">
          <md-input
            id="chat-input"
            v-model="message"
            placeholder="Send a message"
            @keyup.enter="sendMessage(gameId, playerId, message)"
          ></md-input>
        </md-field>
        <md-button
          class="md-raised md-primary"
          v-on:click="sendMessage(gameId, playerId, message)"
        >SEND</md-button>
      </div>
    </md-card>
  </div>
</template>

<script>
import Notification from "../../components/Notification";
import { updatePlayerRecord } from "../../controllers/GameController";

export default {
  components: {
    Notification
  },
  data() {
    return {
      gameId: this.$route.params.id,
      currentTime: 0,
      timer: undefined,
      started: false,
      questions: [],
      currentQuestion: 1,
      currentAnswers: {
        selected: "",
        correct: "",
        answers: []
      },
      score: 0,
      chatMessages: [],
      message: "",
      gameStart: false,
      gameResult: undefined,
      gameIsFinished: false,
      pregameTimerInterval: undefined,
      pregameTimerStart: false,
      pregameTimer: "Waiting for Player...",
      transitionKey: 1
    };
  },

  created() {
    this.getQuestions(this.gameId);
    window.addEventListener("beforeunload", function() {
      this.$socket.emit("navigatingAway", {
        gameId: this.gameId,
        playerId: this.$store.state.username
      });
    });
  },

  beforeDestroy() {
    this.$socket.emit("navigatingAway", {
      gameId: this.gameId,
      playerId: this.$store.state.username
    });
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
      this.getAnswers();
    },
    inGameError(data) {
      console.log(data.message);
    },
    gameReady() {
      this.timerStart = true;
      this.pregameTimer = 3;
      this.pregameTimerStart = true;
      this.pregameTimerInterval = setInterval(() => {
        this.pregameTimer--;
      }, 1000);
      this.gameStart = true;
      setTimeout(() => {
        this.nextQuestion();
        clearInterval(this.pregameTimerInterval);
        this.pregameTimerStart = false;
      }, 3000);
    },
    gameFinished(data) {
      //this is where we would update backend with win or loss
      let myScore = data.players.find(
        p => p.playerId === this.$store.state.username
      ).score;
      let otherScore = data.players.find(
        p => p.playerId !== this.$store.state.username
      ).score;
      if (myScore > otherScore) {
        this.gameResult = "You win!";
      } else if (otherScore > myScore) {
        this.gameResult = "You lose!";
      } else {
        this.gameResult = "You tied!";
      }
      this.gameIsFinished = true;
      updatePlayerRecord({
        username: this.$store.state.username,
        result: this.gameResult
      });
    },
    waitingForPlayersToFinish() {
      this.gameResult = "Waiting for other players to finish.";
    },
    earlyEnd() {
      this.gameResult = "The other player has left, please join new game.";
      this.gameIsFinished = true;
    }
  },

  methods: {
    endingRedirect() {
      if (this.gameResult !== "Waiting for other players to finish.") {
        this.$router.push("/dashboard/lobbyentry");
      } else {
        this.gameResult = undefined;
      }
    },
    nextQuestionOrSubmit() {
      clearInterval(this.timer);
      if (this.currentQuestion < this.questions.length) {
        this.nextQuestion();
      } else {
        this.evaluateResponse();
        this.$socket.emit("finishGame", {
          playerId: this.$store.state.username,
          gameId: this.gameId,
          score: this.score
        });
      }
    },
    countDownTimer() {
      this.timer = setInterval(() => {
        if (this.currentTime <= 0) {
          clearInterval(this.timer);
          if (this.currentQuestion < this.questions.length) {
            this.nextQuestion();
          } else {
            this.evaluateResponse();
            this.$socket.emit("finishGame", {
              playerId: this.$store.state.username,
              gameId: this.gameId,
              score: this.score
            });
          }
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

    getQuestions(gameId) {
      this.$socket.emit("triviaRequest", {
        gameId: gameId,
        playerId: this.$store.state.username
      });
    },
    nextQuestion() {
      clearInterval(this.timer);
      this.currentTime = 15;
      this.countDownTimer();

      if (!this.started) {
        document.getElementById("start").innerHTML = "NEXT";
        this.started = true;
        return;
      }

      this.evaluateResponse();

      this.currentQuestion++;
      this.getAnswers();
      this.transitionKey++;
    },
    getAnswers() {
      this.currentAnswers = {
        selected: "",
        correct: "",
        answers: []
      };

      var question = this.questions[this.currentQuestion - 1];
      this.currentAnswers.correct = question.correct_answer;
      this.currentAnswers.answers = question.incorrect_answers;
      this.currentAnswers.answers.push(question.correct_answer);
      this.shuffle(this.currentAnswers.answers);
    },
    evaluateResponse() {
      if (this.currentAnswers.selected === this.currentAnswers.correct) {
        this.score += 50;
      }
    },
    sendMessage(gameId, playerId, message) {
      this.$socket.emit("messageRequest", {
        gameId: gameId,
        playerId: this.$store.state.username,
        message: message
      });
    },
    shuffle(array) {
      var j, x, i;
      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
    }
  }
};
</script>

<style scoped>
@import "./animate.css";

@media only screen and (max-width: 700px) {
  #right {
    display: none;
  }

  #left {
    width: 95% !important;
  }

  #game {
    width: 90% !important;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0);
  opacity: 1;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-350px);
  opacity: 0;
}

#game {
  width: 90% !important;
  max-width: 600px !important;
}

.md-field {
  margin: 0px !important;
  background: white;
  border-radius: 2px 2px 2px 2px;
  padding-top: 0px !important;
  box-sizing: border-box;
}
.md-input {
  height: 36px !important;
}
#input-field {
  margin-top: 6px !important;
  height: 36px !important;
  min-height: 36px !important;
}
#game-page {
  display: flex;
  width: 100%;
  height: 600px;
  margin: auto;
  justify-content: space-evenly;
  margin-top: 2rem;
  padding-bottom: 2rem;
}
#left {
  width: 60%;
  background-color: #08381e44;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#right {
  width: 30%;
  border: 1px solid black;
  background-color: #343434be;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  z-index: 8;
}
#chat-inputs {
  position: absolute;
  bottom: 10px;
  left: 15px;
  width: calc(100% - 20px) !important;
  display: flex;
}
#chat-inputs > .md-input {
  width: calc(70% - 5px) !important;
  border: none;
  padding: 5px;
  color: white;
  background-color: #25a15fbd;
}
#chat-inputs > .md-button {
  width: calc(30% - 5px) !important;
  border: none;
  padding: 5px;
}

#chat-inputs > .md-field {
  width: calc(70% - 5px) !important;
}

#chat-inputs > .md-button {
  width: calc(30% - 5px) !important;
}
.message {
  font-family: "Roboto";
  color: black;
  margin-bottom: 5px;
  padding: 5px;
  width: auto;
  margin-right: 10px;
  background: white;
}
.messages {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - 41px);
  overflow: auto;
}
#game {
  width: 500px;
  height: 500px;
}
#card-header {
  display: flex;
  justify-content: space-between;
}
.trivia-option {
  display: inline-block;
  padding-bottom: 0px;
  font-size: 14pt;
}
.trivia-question {
  text-align: center;
}
.answer {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 50px;
}
#pregame-timer {
  font-size: 2rem;
  color: white;
  font-family: "Roboto";
  font-weight: 900;
}
#question-fraction {
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  font-size: 2rem;
}
</style>
