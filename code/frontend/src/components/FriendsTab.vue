<template>
  <div id="friends-tab">
    <button @click="add()" class="add-button">+</button>
    <h1>Friends</h1>
    <hr />
    <div class="friend" v-for="friend in friends" :key="friend" @click="joinFriend(friend)">
      <button @click="remove($event, friend)">X</button>
      <h3>{{friend}}</h3>
    </div>
    <button @click="$emit('click')" id="close-button">X</button>
  </div>
</template>

<script>
import {
  getFriends,
  removeFriend,
  addFriend
} from "../controllers/GameController";
export default {
  name: "friendstab",
  data() {
    return {
      username: this.$store.state.username,
      friends: []
    };
  },
  methods: {
    remove(e, friend) {
      e.stopPropagation();
      if (confirm(`Remove ${friend} from friends list?`)) {
        removeFriend(this.$store.state.username, friend)
          .then(() => this.get());
      }
    },
    joinFriend(friend) {
      this.$socket.emit("joinFriendRequest", {
        playerId: this.$store.state.username,
        friend: friend
      });
      this.$parent.isFriendsOpen = false;
    },
    add() {
      let friend = prompt("Enter username of friend: ");
      addFriend(this.$store.state.username, friend).then(() => this.get());
    },
    get() {
      getFriends(this.$store.state.username)
        .then(res => res.json())
        .then(res => {
          this.friends = res;
        });
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style scoped>
.add-button {
  font-size: 2rem;
  position: absolute;
  left: 1rem;
  top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
#friends-tab {
  background-color: white !important;
  font-family: "Roboto";
  position: absolute;
  z-index: 2;
}
button {
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
}

button:hover {
  background-color: grey;
  cursor: pointer;
}

#close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  font-size: 2rem;
}

.friend {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.friend:hover {
  background-color: #ebebeb;
  cursor: pointer;
}

.friend > button {
  background-color: #ebebeb00;
}

hr {
  width: 100%;
}
</style>