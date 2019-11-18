<template>
  <div id="page-header">
    <h1>Trivio</h1>
    <div class="buttons">
      <img src="../assets/profile.png" alt="Profile">
      <img src="../assets/logout.jpg" alt="Logout" v-if="loggedIn" />
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
  background-color: #ee7575;
  padding: 1rem;
  box-shadow: 0 0 30px black;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

h1 {
  margin: 0;
  font-size: 3rem;
  color: #ededed;
  margin-left: 1rem;
  width: 80%;
}

img {
  width: 3rem;
  height: 3rem;
    padding: .3rem;
    transition: background-color .3s ease;
}

img:hover {
    background-color: #cc6565;
    cursor: pointer;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 20%;
}
</style>