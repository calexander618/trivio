<template>
  <div id="page-nav">
    <router-link v-for="link in links" :key="link.href" :to="link.href" class="link">{{ link.name }}</router-link>
    <div id="buttons">
       <img src="../assets/profile.png" alt="">
       <a href="/#/login">
          <img src="../assets/logout.png" alt="">
       </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagenav",
  data() {
    return {
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
#page-nav {
  background-color: #4dcc9bf8;
  margin: 0;
  padding: 0.9rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2);
  overflow: hidden;
}

p {
  margin: 0;
}

.link {
  color: #555 !important;
  text-decoration: none !important;
  border-radius: 10px 10px 0 0;
  font-famiy: "Play";
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
  padding: .3rem .3rem;
}

#buttons img {
  width: 2rem;
  height: 2rem;
  padding: .3rem;
  margin-right: 5px;
  border-radius: 2rem;

}

#buttons img:hover {
  background-color: #3baf83f8;
  cursor: pointer;
}
</style>
