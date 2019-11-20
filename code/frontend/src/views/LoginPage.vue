<template>
  <div id="login-page">
    <page-header :loggedIn="false"></page-header>
    <div id="login-content">
      <md-card id="left">
        <md-card-header>
           <h2>Play Trivia Online</h2>
        </md-card-header>
        <ul>
          <md-card-content>A fast-paced competitive trivia game</md-card-content>
          <md-card-content>Play against friends and other competitors online</md-card-content>
          <md-card-content>Track you and your friends stats</md-card-content>
          <md-card-content>Check how you stack up in the global leaderboard</md-card-content>
        </ul>
      </md-card>
      <md-card id="right">
          <div id="forms-container">
             <form>
                <md-card-header>
                   <h2 id="login-header">Login</h2>
                </md-card-header>
                <md-field>
                   <md-input placeholder="Username"></md-input>
                </md-field>
                <md-field>
                   <md-input placeholder="Password"></md-input>
                </md-field>
                <md-button id="login-button">Login</md-button>
             </form>
          </div>
      </md-card>
    </div>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";

export default {
  name: "loginpage",
  components: {
    PageHeader
  }
};
</script>

<style scoped>
form {
    text-align: center;
}
#right {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #6EC1A1;
}

#left {
    background-color: #2D815F;
}

#forms-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

#login-header {
    text-align: center;
}

#login-content {
  padding: 2rem;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  display: flex;
  font-family: 'Roboto';
}

#left {
    width: 60%;
    background-color: #113a2466;
    padding: 40px;
    margin-right: 30px;
    color: #ededed99;
    height: 500px;
}

li {
  margin-top: 2rem;
  font-size: 1.5rem;
}

#right {
    width: 40%;
    background-color: #ededed44;
}

</style>
