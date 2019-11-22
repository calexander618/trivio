<template>
  <div id="game-page">
    <md-card md-with-hover id="left">
      <md-card v-if="started" id="game">
        <div id="card-header">
          <h1 id="timer" class="md-card-header">{{currentTime}}</h1>
          <h1 id="score" class="md-card-header">{{score}}</h1>
        </div>
        <h3 v-html="questions[currentQuestion-1].question" class="trivia-question"></h3>
        <div class="answer" v-for="(answer, index) in currentAnswers.answers" :key="index">
<div>
          <md-radio class="trivia-radio" type="radio" name="currentAnswer" :value="answer" v-model="currentAnswers.selected" />
          <p v-html="answer" class="trivia-option"></p>
</div>
        </div>
      </md-card>
      <md-button class="md-raised md-primary" id="start" v-on:click="nextQuestion()" :disabled="currentQuestion>=10">START GAME</md-button>
    </md-card>
    <md-card md-with-hover id="right">
      <div class="messages">
        <md-card class="message" v-for="(message, index) in chatMessages" :key="index">{{ message }}</md-card>
      </div>
      <div id="chat-inputs">
        <md-field id="input-field">
           <md-input id="chat-input" v-model="message" placeholder="Send a message"></md-input>
        </md-field>
        <md-button class="md-raised md-primary" v-on:click="sendMessage(gameId, playerId, message)">SEND</md-button>
      </div>
    </md-card>
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
      currentAnswers: {
        selected: "",
        correct: "",
        answers: []
      },
      score: 0,
      chatMessages: [],
      message: ""
    };
  },
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
      this.getAnswers();
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
          else {
              this.evaluateResponse();
            // UNCOMMENT THIS LATER ON, KEEP IT HERE
            //   this.started = false;
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

      this.evaluateResponse();

      this.currentQuestion++;
      this.getAnswers();
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
        playerId: playerId,
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
@import './animate.css';
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
  height: 740px;
  margin: auto;
  justify-content: space-evenly;
  margin-top: 2rem;
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
}
#chat-inputs {
  position: absolute;
  bottom: 10px;
  left: 15px;
  width: calc(100% - 20px);
  display: flex;
}
#chat-inputs > .md-input {
  width: calc(70% - 5px);
  border: none;
  padding: 5px;
  color: white;
  background-color: #25a15fbd;
}
#chat-inputs > .md-button {
  width: calc(30% - 5px);
  border: none;
  padding: 5px;
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

</style>
