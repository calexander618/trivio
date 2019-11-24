<template>
  <div id="backdrop">
    <div id="notification">
      <md-card>
        <md-card-header>{{notificationMessage}}</md-card-header>
        <md-button @click="$emit('ok')">Ok</md-button>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "notification",
  props: ["notificationMessage"]
};
</script>

<style scoped>
#notification {
  width: 300px;
  position: fixed;
  z-index: 3;
  left: calc(50% - 150px);
  top: 300px;
}

#backdrop {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: #11111144;
}

.md-button {
  width: 100% !important;
  margin: 0;
  padding: 0;
}
</style>