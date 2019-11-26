<template>
  <div id="landing-page">
    <notification
      class="notification"
      :notificationMessage="notification"
      v-if="notification"
      @ok="notification = undefined"
    ></notification>
    <div class="row">
      <div class="tile" @click="showDialog = true">
        <p class="tile-header">Create New Game</p>
        <img src="../../assets/hammer.png" alt />
      </div>
      <div class="tile" @click="joinGame()">
        <p class="tile-header">Join Game</p>
        <img src="../../assets/join.png" alt />
      </div>
    </div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create Game</md-dialog-title>
      <div class="md-layout-item">
        <span>Difficulty</span>
        <md-field>
          <md-select
            v-model="difficulty"
            name="difficulty"
            id="difficulty"
            placeholder="Difficulty"
          >
            <md-option value="easy">Easy</md-option>
            <md-option value="medium">Medium</md-option>
            <md-option value="hard">Hard</md-option>
          </md-select>
        </md-field>
        <span>Category</span>
        <md-field>
          <md-select v-model="category" name="category" id="category" placeholder="Category">
            <md-option value="17">Nature</md-option>
            <md-option value="18">Computers</md-option>
            <md-option value="19">Math</md-option>
            <md-option value="20">Mythology</md-option>
            <md-option value="21">Sports</md-option>
            <md-option value="22">Geography</md-option>
            <md-option value="24">Politics</md-option>
            <md-option value="23">History</md-option>
            <md-option value="25">Art</md-option>
            <md-option value="26">Celebrities</md-option>
          </md-select>
        </md-field>
        <span>Number of Questions</span>
        <md-field>
          <md-select
            v-model="questions"
            name="questions"
            id="questions"
            placeholder="Number of Questions"
          >
            <md-option value="5">5</md-option>
            <md-option value="10">10</md-option>
            <md-option value="15">15</md-option>
          </md-select>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button
          class="md-primary"
          @click="createGame()"
          v-bind:disabled="!difficulty || !category || !questions"
        >Create</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Notification from "../../components/Notification.vue";
import { generateId } from "../../controllers/IdController";

export default {
  name: "lobbyentrypage",
  components: {
    Notification
  }, 
  data() {
    return {
      errorMessage: "",
      gameId: null,
      difficulty: undefined,
      category: undefined,
      questions: undefined,
      showDialog: false,
      settings: {
        difficulty: null,
        category: null
      },
      socketInfo: {},
      notification: undefined
    };
  },
  sockets: {
    gameJoined(data) {
      this.$router.push(`/dashboard/game/${data.gameId}`);
    },
    gameCreated(data) {
      this.$router.push(`/dashboard/game/${data.gameId}`);
    },
    errorMessage(data) {
      console.log(data.message);
      this.notification = data.message;
    }
  },
  methods: {
    createGame() {
      this.gameId = generateId();
      this.$socket.emit("createRequest", {
        playerId: this.$store.state.username,
        gameId: this.gameId,
        difficulty: this.difficulty,
        category: this.category,
        questionCount: this.questions
      });
    },
    joinGame() {
      this.$socket.emit("joinRequest", {
        playerId: this.$store.state.username
      });
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tile {
    margin: 0 0 20px 0;
  }
}
.tile:hover {
  background: #dedede;
  cursor: pointer;
}

.md-dialog {
  width: 768px;
}

.md-layout-item {
  width: 80%;
  margin: auto;
}

.md-menu,
md-select {
  color: black;
}

.md-button {
  font-size: 14pt;
  height: 50px;
}

.buttons {
  width: 80%;
  max-width: 600px;
  margin: auto;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgrey;
}

h1 {
  font-family: "Roboto";
  text-align: center;
  font-size: 3rem;
  color: #acacac;
  margin: 0;
  display: block;
}

.row {
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin: auto;
  margin-top: 3rem;
}

.tile {
  background-color: white;
  padding: 30px;
  box-shadow: 10px 10px 20px #22222277;
  height: 20rem;
  width: 16rem;
  position: relative;
}

img {
  width: 3rem;
}

#error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.tile-header {
  font-size: 4rem;
  display: block;
  line-height: 4rem;
  margin: 0;
  color: #11111188;
}

img {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
