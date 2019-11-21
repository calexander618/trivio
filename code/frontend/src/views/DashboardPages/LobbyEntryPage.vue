<template>
  <div id="landing-page">
      <div class="row">
        <div class="tile" @click="showDialog = true">
          <h1>Create New Game</h1>
          <img src="../../assets/battle.png" alt="">
        </div>
        <div class="tile">
          <h1>Join Game</h1>
        </div>
      </div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create Game</md-dialog-title>
    <div class="md-layout-item">
          <span>Difficulty</span>
        <md-field>
          <md-select v-model="difficulty" name="difficulty" id="difficulty" placeholder="Difficulty">
            <md-option value="Easy">Easy</md-option>
            <md-option value="Normal">Normal</md-option>
            <md-option value="Hard">Hard</md-option>
          </md-select>
        </md-field>
          <span>Category</span>
        <md-field>
          <md-select v-model="category" name="category" id="category" placeholder="Category">
            <md-option value="Geography">Geography</md-option>
            <md-option value="Media">Media</md-option>
            <md-option value="History">History</md-option>
          </md-select>
        </md-field>
          <span>Number of Questions</span>
        <md-field>
          <md-select v-model="questions" name="questions" id="questions" placeholder="Number of Questions">
            <md-option value=1>1</md-option>
            <md-option value=2>2</md-option>
            <md-option value=3>3</md-option>
            <md-option value=4>4</md-option>
            <md-option value=5>5</md-option>
          </md-select>
        </md-field>
      </div>
       <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false" v-bind:disabled="!difficulty || !category || !questions">Create</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "lobbyentrypage", 
  data() {
    return {
     difficulty: undefined,
     category: undefined,
     questions: undefined,
	showDialog: false,
      settings: {
        difficulty: null, 
        category: null, 
      }, 
      socketInfo: {
      }
    }
  }
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

.md-menu, md-select {
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
        font-family: 'Roboto';
        text-align: center;
        font-size: 3rem;
        color: #acacac;;
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
      padding: 30px;
      box-shadow: 10px 10px 20px #22222277;
    }

    img {
      width: 3rem;
    }

</style>
