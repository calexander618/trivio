<template>
  <div id="login-page">
    <page-header :loggedIn="false"></page-header>
    <div id="login-content">
      <div class="left">
        <h2>Play Trivia Online</h2>
        <ul>
          <li>A fast-paced competitive trivia game</li>
          <li>Play against friends and other competitors online</li>
          <li>Track you and your friends stats</li>
          <li>Check how you stack up in the global leaderboard</li>
        </ul>
      </div>
      <div class="right">
          <div id="forms-container">
              <div class="form"></div>
              <div class="form"></div>
          </div>
      </div>
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
#login-content {
  padding: 2rem;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  display: flex;
  font-family: 'Roboto';
}

.left {
    width: 60%;
    background-color: #113a2466;
    padding: 40px;
    margin-right: 30px;
    color: #ededed99;
    height: 500px;
}

.left > h2 {
  margin: 0;
  font-size: 3rem;
}

li {
  margin-top: 2rem;
  font-size: 1.5rem;
}

.right {
    width: 40%;
    background-color: #ededed44;
}
</style>