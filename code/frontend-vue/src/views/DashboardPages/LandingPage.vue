<template>
  <div id="landing-page">
    <div class="buttons">
      <button>Play against stranger</button>
      <button>Play against friend</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "landingpage"
};
</script>

<style scoped>
    .buttons {
        width: 80%;
        max-width: 600px;
        margin: auto;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        border-top: 1px solid lightgrey;
    }

    button {
        padding: 1rem;
        font-size: 2rem;
        font-family: 'Play';
        color: grey;
        border: none;
        border-bottom: 1px solid lightgrey;
        box-shadow: 0 0 20px 0 grey;
    }

    button:hover {
        cursor: pointer;
        background-color: #dedede;
    }

</style>