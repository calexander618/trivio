<template>
  <div id="page-nav">
    <router-link v-for="link in links" :key="link.href" :to="link.href" class="link">{{ link.name }}</router-link>
  </div>
</template>

<script>
export default {
  name: "pagenav",
  data() {
    return {
      links: [
        {
          name: "Leaderboards",
          href: "/dashboard/leaderboard"
        },
        {
          name: "About",
          href: "/dashboard/about"
        },
        {
          name: "Play",
          href: "/dashboard/landing"
        }
      ]
    };
  }
};
</script>

<style scoped>
#page-nav {
  border-bottom: 1px solid #b8b8b8;
  background-color: #c8c8c8;
  margin: 0;
  padding: 0.9rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 0px 30px grey;
}

p {
  margin: 0;
}

.link {
  color: white;
  text-decoration: none;
  font-family: "Play";
  padding: 0.8rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.link:hover {
  color: black;
  background-color: #dedede;
  cursor: pointer;
}

.router-link-active {
    background-color: #dedede !important;
    color: black !important;
}
</style>