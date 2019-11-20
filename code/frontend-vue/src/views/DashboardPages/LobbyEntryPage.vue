<template>
  <div id="landing-page">
      <div class="row">
        <div class="tile">
          <h1>Create New Game</h1>
          <img src="../../assets/battle.png" alt="">
        </div>
        <div class="tile">
          <h1>Join Game</h1>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "lobbyentrypage", 
  data() {
    return {
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
    

    .buttons {
        width: 80%;
        max-width: 600px;
        margin: auto;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        border-top: 1px solid lightgrey;
    }

    button {
        padding: 1rem;
        font-size: 2rem;
        font-family: 'Play';
        color: grey;
        border: none;
        border-bottom: 1px solid lightgrey;
        box-shadow: 0 0 20px 0 grey;
    }

    button:hover {
        cursor: pointer;
        background-color: #dedede;
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