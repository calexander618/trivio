<template>
  <div id="login-page">
    <page-header :loggedIn="false"></page-header>
    <notification
      class="notification"
      :notificationMessage="notification"
      v-if="notification"
      @ok="notification = undefined"
    ></notification>
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
            <md-field class="input-field">
              <md-input md-clearable placeholder="Username" v-model="username"></md-input>
            </md-field>
            <md-field :md-toggle-password="false" class="input-field">
              <md-input placeholder="Password" type="password" v-model="password"></md-input>
            </md-field>
            <md-button class="md-raised md-primary login-button" v-on:click="submitSignin()">Login</md-button>
            <md-button v-on:click="createAccount()">Create Account</md-button>
          </form>
        </div>
        <!-- <a href="/#/create">Create Account</a> -->
      </md-card>
      <md-card id="create-right" class="hidden">
        <div id="forms-container">
          <form ref="signupForm">
            <md-card-header id="login-header-container">
              <h2 id="login-header">Create Account</h2>
            </md-card-header>
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
              class="md-raised md-primary .md-field.md-input-actionary login-button"
              v-on:click="submitSignup()"
            >Sign Up</md-button>
            <md-button v-on:click="goBack()">I already have an account</md-button>
          </form>
        </div>
        <!-- <a href="/#/create">Create Account</a> -->
      </md-card>
    </div>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import Notification from "../components/Notification";
import { signin, signup } from "../controllers/LoginController";

export default {
  name: "loginpage",
  components: {
    PageHeader,
    Notification
  },
  data() {
    return {
      username: "",
      password: "",
      createUsername: "",
      createPassword: "",
      confirmPassword: "",
      notification: undefined
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

      signin(signinObject).then(token => {
        if (token) {
          this.$store.state.token = token;
          this.$store.state.username = this.username;
          this.$router.push("dashboard/lobbyentry");
        } else {
          this.notification = "Invalid info, please try again.";
        }
      });
    },
    submitSignup() {
      // check if passwords match
      if (this.createPassword !== this.confirmPassword) {
        this.notification = "Passwords don't match, please try again.";
        return;
      }
      // create signup object to send to signup endpoint
      const signupObject = {
        username: this.createUsername,
        password: this.createPassword
      };
      // make request
      signup(signupObject).then(res => {
        if (res.status === 200) {
          this.notification = "Successfully signed up.";
        } else if (res.status === 400) {
          // signup failed
          this.notification = "Signup failed, please try again.";
        }
      });
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  #left {
    display: none;
  }

  #right,
  #create-right {
    width: 100% !important;
    height: auto;
  }

  #login-content {
    display: flex;
    justify-content: center;
  }
}

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
  display: flex;
  flex-direction: column;
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
.md-field {
  margin-top: 20px !important;
}
.md-button {
  margin-top: 20px !important;
}
</style>
