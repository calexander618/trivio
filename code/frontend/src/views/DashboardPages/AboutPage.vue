<template>
  <div id="about-page">
    <md-card id="about-header-card">
      <md-card-header>
        <h1>About Triv.io</h1>
      </md-card-header>
      <md-card-content>Triv.io is built with VueJS for the frontend framework, the TriviaDB api to pull questions and answers, a MongoDB database to store user accounts, scores, etc., and using NodeJS on the server-side. We used web-sockets to manage the user connections, JWT tokens to manage user authentication for their requests, and Vue Material for the frontend design.</md-card-content>
    </md-card>
    <div id="boys-container">
      <md-card class="boys">
        <md-card-header>
          <h1>Chase Alexander</h1>
        </md-card-header>
        <md-card-content>Front-End, Back-End, and Sockets</md-card-content>
      </md-card>
      <md-card class="boys">
        <md-card-header class="middle">
          <h1>Michael Woodruff</h1>
        </md-card-header>
        <md-card-content>Front-End, Back-End, and Sockets</md-card-content>
      </md-card>
      <md-card class="boys">
        <md-card-header>
          <h1>Dylan Bunch</h1>
        </md-card-header>
        <md-card-content>Front-End, Documentation</md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "aboutpage"
};
</script>

<style scoped>
#about-header-card {
  width: 80%;
  margin-top: 20px;
  max-width: 800px;
}

#about-page {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

#boys-container {
  max-width: 1000px;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}

.boys {
  width: 300px;
  margin: 10px;
}

#about-header-card, .boys {
	box-shadow: 5px 5px 5px 0 #11111166;
	box-shadow: 10px 10px 20px #22222277;
}

.md-card-content {
  max-width: 500px !important;
  margin: auto !important;
}
</style>
