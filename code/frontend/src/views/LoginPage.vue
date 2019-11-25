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
          <form ref="loginForm">
            <md-card-header id="login-header-container">
              <h2 id="login-header">Log In</h2>
            </md-card-header>
            <div class="md-subhead hidden" id="act-create-success">
               Account Creation Successful
            </div>
            <div class="md-subhead hidden" id="login-failure">
               Invalid Username/Password
            </div>
            <md-field class="input-field">
              <md-input md-clearable placeholder="Username" v-model="username"></md-input>
            </md-field>
            <md-field :md-toggle-password="false" class="input-field">
              <md-input placeholder="Password" type="password" v-model="password"></md-input>
            </md-field>
            <md-button
              class="md-raised md-primary"
              id="login-button"
              v-on:click="submitSignin()"
            >Login</md-button>
          </form>
        </div>
        <!-- <a href="/#/create">Create Account</a> -->
        <md-button id="create-button" v-on:click="createAccount()">Create Account</md-button>
      </md-card>
      <md-card id="create-right" class="hidden">
        <div id="forms-container">
          <form ref="signupForm">
            <md-card-header id="login-header-container">
              <h2 id="login-header">Create Account</h2>
            </md-card-header>
            <div class="md-subhead hidden" id="act-create-failure-pwd">
               Passwords do not match
            </div>
            <div class="md-subhead hidden" id="act-create-failure-usr">
               Username taken
            </div>
            <md-field class="input-field">
              <md-input placeholder="Username" v-model="createUsername"></md-input>
            </md-field>
            <md-field :md-toggle-password="false" class="input-field">
              <md-input placeholder="Password" type="password" v-model="createPassword"></md-input>
            </md-field>
            <md-field :md-toggle-password="false" class="input-field">
              <md-input placeholder="Confirm Password" type="password" v-model="confirmPassword"></md-input>
            </md-field>
            <md-button
              class="md-raised md-primary .md-field.md-input-actionary"
              id="login-button"
              v-on:click="submitSignup()"
            >Sign Up</md-button>
          </form>
        </div>
        <!-- <a href="/#/create">Create Account</a> -->
        <md-button id="uncreate-button" v-on:click="goBack()">I already have an account</md-button>
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
  },
  data() {
    return {
      username: "",
      password: "",
      createUsername: "",
      createPassword: "",
      confirmPassword: ""
    };
  },
  methods: {
    createAccount() {
      var right = document.getElementById("right");
      var create_right = document.getElementById("create-right");
      right.classList.add("hidden");
      create_right.classList.remove("hidden");
    },
    goBack() {
      var right = document.getElementById("right");
      var create_right = document.getElementById("create-right");
      right.classList.remove("hidden");
      create_right.classList.add("hidden");
    },
    submitSignin() {
      // set up sign in object
      const signinObject = {
        username: this.username,
        password: this.password
      };
      console.log(signinObject);
      // make request to sign in
      fetch("http://localhost:3000/api/user/signin", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(signinObject)
      })
        .then(res => {
          if (res.status === 404) {
            console.log("username or password invalid");
            document.getElementById("act-create-success").classList.add("hidden");
            document.getElementById("login-failure").classList.remove("hidden");
            return "";
          } else {
            return res.json();
          }
        })
        .then(res => {
           if (typeof res.token !== 'undefined') {
              // store token here
              this.$store.state.token = res.token;
              this.$store.state.username = this.username;
              this.$router.push('dashboard/lobbyentry');
           }
        });
    },
    submitSignup() {
      // check if passwords match
      if (this.createPassword !== this.confirmPassword) {
        console.log("passwords dont match");
          document.getElementById("act-create-success").classList.add("hidden");
          document.getElementById("act-create-failure-pwd").classList.remove("hidden");
          document.getElementById("act-create-failure-usr").classList.add("hidden");
        return;
      }
      // create signup object to send to signup endpoint
      const signupObject = {
        username: this.createUsername,
        password: this.createPassword
      };
      // make request
      fetch("http://localhost:3000/api/user/signup", {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupObject),
        method: "post"
      }).then(res => {
        if (res.status === 200) {
          // signup successful
          //console.log("successfully signed up");
          document.getElementById("create-right").classList.add("hidden");
          document.getElementById("right").classList.remove("hidden");
          document.getElementById("act-create-success").classList.remove("hidden");
          document.getElementById("act-create-failure-pwd").classList.add("hidden");
          document.getElementById("act-create-failure-usr").classList.add("hidden");
        } else if (res.status === 400) {
          // signup failed
          //console.log("signup failed");
          document.getElementById("act-create-success").classList.add("hidden");
          document.getElementById("act-create-failure-pwd").classList.add("hidden");
          document.getElementById("act-create-failure-usr").classList.remove("hidden");
        }
      });
    }
  }
};
</script>

<style scoped>
.md-field {
  background: white;
  border-radius: 2px 2px 2px 2px;
  margin: 0 !important;
  padding-top: 0px !important;
  top: 0px !important;
  margin-bottom: 20px !important;
}
.md-field {
  top: 0px !important;
}
.md-input {
  height: 36px !important;
}
.input-field {
  /*margin-top: 6px !important;*/
  min-height: 36px !important;
}
form {
  text-align: center;
}
#right,
#create-right {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6ec1a1;
}
#left {
  background-color: #2d815f;
}
#forms-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
#login-header {
  text-align: center;
  margin: 0;
}
#login-content {
  padding: 2rem;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  display: flex;
  font-family: "Roboto";
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
#right,
#create-right {
  width: 40%;
  background-color: #ededed44;
}
#login-header-container {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
}
a {
  position: absolute;
  bottom: 0;
  margin-bottom: 30px;
}
#create-button,
#uncreate-button {
  position: absolute;
  bottom: 0;
  margin-bottom: 30px;
}
.hidden {
  display: none !important;
}
#act-create-success {
	margin-bottom: 30px;
	color: #121212 !important;
	background-color: #5f875f;
	border-radius: 2px;
}
#login-failure, #act-create-failure-pwd, #act-create-failure-usr {
	text-align: center;
	margin-bottom: 30px;
	background-color: #a85f5f;
	color: #121212 !important;
}
</style>
