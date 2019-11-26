<template>
  <div id="page-nav">
    <router-link v-for="link in links" :key="link.href" :to="link.href" class="link">{{ link.name }}</router-link>
    <div id="buttons">
      <img @click="toggleProfile()" src="../assets/profile.png" alt />
      <img @click="logout()" src="../assets/logout.png" alt />
    </div>
    <transition name="slide">
      <profile-tab class="profile-tab" v-if="isProfileOpen" @click="toggleProfile()"></profile-tab>
    </transition>
  </div>
</template>

<script>
import ProfileTab from "./ProfileTab.vue";
export default {
  name: "pagenav",
  components: {
    ProfileTab
  },
  methods: {
    logout() {
      localStorage.removeItem("trivioLocalStorageToken");
      localStorage.removeItem("trivioLocalStorageUsername");
      this.$store.state.token = null;
      this.$store.state.username = null;
      this.$router.push("/login");
    },
    toggleProfile() {
      this.isProfileOpen = !this.isProfileOpen;
    }
  },
  data() {
    return {
      isProfileOpen: false,
      links: [
        {
          name: "Play",
          href: "/dashboard/lobbyentry"
        },
        {
          name: "Leaderboards",
          href: "/dashboard/leaderboard"
        },
        {
          name: "About",
          href: "/dashboard/about"
        }
      ]
    };
  }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.slide-enter-to,
.slide-leave {
  opacity: 1;
  transform: translateX(0);
}

.profile-tab {
  position: absolute;
  z-index: 10;
  bottom: -405px;
  right: 5px;
  background-color: white !important;
  font-family: "Roboto";
  height: 400px;
  width: 300px;
  box-shadow: -5px 5px 20px 0 #11111144;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
}

#page-nav {
  background-color: #4dcc9bf8;
  margin: 0;
  padding: 0.9rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

p {
  margin: 0;
}

.link {
  color: white;
  text-decoration: none;
  border-radius: 10px 10px 0 0;
  font-family: "Play";
  padding: 0.8rem;
  transition: background-color 0.2s ease, color 0.2s ease;
  position: relative;
  top: 5px;
}

.link:hover {
  color: white;
  background-color: #3baf83f8;
  cursor: pointer;
}

.router-link-active {
  background-color: #3baf83f8 !important;
  color: white !important;
}

#buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.3rem 0.3rem;
}

#buttons img {
  width: 3rem;
  height: 3rem;
  padding: 0.3rem;
  margin-right: 5px;
  border-radius: 2rem;
}

#buttons img:hover {
  background-color: #3baf83f8;
  cursor: pointer;
}
</style>
