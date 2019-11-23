<template>
  <div id="notification">
    <md-card>
      <md-card-header>{{notificationMessage}}</md-card-header>
      <md-button @click="$emit('ok')">Ok</md-button>
    </md-card>
  </div>
</template>

<script>
export default {
    name: 'notification', 
    props: [
        'notificationMessage'
    ]
}
</script>

<style scoped>

</style>