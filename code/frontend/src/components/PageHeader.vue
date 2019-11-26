<template>
  <div id="page-header">
    <div class="left">
      <img src="../assets/logo.png" alt @click="$router.push('/dashboard/lobbyentry')"/>
      <h1>Triv.io</h1>
    </div>
    <div class="right" v-if="loggedIn">
      <!-- <img src="../assets/profile.png" alt="Profile" />
      <img src="../assets/logout.jpg" alt="Logout" /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "pageheader",
  props: ["loggedIn"]
};
</script>

<style scoped>
#page-header {
  font-family: "Play";
  height: 8rem;
  background-color: #4dcc9bf8;
  padding: 1rem;
  /* box-shadow: 0 0 30px black; */
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  z-index: 2;
}

h1 {
  margin: 0;
  font-size: 4rem;
  color: #ededed;
  margin-left: 1rem;
}

.left {
    display: flex;
    align-items: center;
    width: 80%;
}

.left > img {
    width: 5rem;
    height: 5rem;
}

.left > img:hover {
    cursor: pointer;
}

.right > img {
  width: 3rem;
  height: 3rem;
  padding: 0.3rem;
  transition: background-color 0.3s ease;
}

.right > img:hover {
  background-color: #cc6565;
  cursor: pointer;
}

.right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 20%;
}
</style>