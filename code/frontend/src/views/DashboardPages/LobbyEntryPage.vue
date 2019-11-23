<template>
  <div id="landing-page">
    <div class="row">
      <md-card class="tile" @click.native="showDialog = true">
         <h1>Create<br>
            <img src="../../assets/battle.png" alt="game-start" id="start-icon"/><br>
         Game</h1>
      </md-card>
      <md-card class="tile" @click.native="showJoinDialog = true">
         <h1>Join<br>
            <img src="../../assets/join.png" alt="game-join" id="join-icon"/><br>
         Game</h1>
      </md-card>
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
            <md-option value="22">Geography</md-option>
            <md-option value="24">Politics</md-option>
            <md-option value="23">History</md-option>
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
<!-- this is unfinished. values are not tied to any data at this moment-->
    <md-dialog :md-active.sync="showJoinDialog">
      <md-dialog-title>Join Game</md-dialog-title>
      <div class="md-layout-item">
        <span>Open Games</span>
        <md-field>
          <md-select
            v-model="games"
            name="games"
            id="games"
            placeholder="Select Game"
          >
            <md-option value="gameValue">Option 1</md-option>
            <md-option value="gameValue">Option 2</md-option>
            <md-option value="null">...</md-option>
          </md-select>
        </md-field>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showJoinDialog = false">Close</md-button>
        <md-button
          class="md-primary"
          @click="joinGame()"
          v-bind:disabled="!game"
        >Join</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { generateId } from "../../controllers/IdController";

export default {
  name: "lobbyentrypage",
  data() {
    return {
      gameId: null,
      difficulty: undefined,
      category: undefined,
      questions: undefined,
      showDialog: false,
      showJoinDialog: false,
      settings: {
        difficulty: null,
        category: null
      },
      socketInfo: {}
    };
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
      this.$router.push(`/dashboard/game/${this.gameId}`);
    },
    joinGame(){
       // logic goes here
    }
  },
  sockets: {}
};
</script>

<style scoped>
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
}

.row {
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin: auto;
  margin-top: 3rem;
}

.tile {
  background-color: lightgrey;
  padding: 50px 80px 50px 80px;
  box-shadow: 10px 10px 20px #22222277;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 3rem;
  flex-direction: column;
}

#start-icon, #join-icon {
  width: 3rem;
  margin: 40px;
}
</style>
