<template>
    <div id="profile-tab">
        <h1>{{ username }}</h1>
        <hr>
        <h3>W/L Ratio: {{ profile.ratio }}</h3>
        <h3>Games Played: {{ profile.gamesPlayed }}</h3>
        <h3>Games Won: {{ profile.gamesWon }}</h3>
        <h3>Games Lost: {{ profile.gamesLost }}</h3>
        <h3>Games Tied: {{ profile.gamesTied }}</h3>
        <button @click="$emit('click')">X</button>
    </div>
</template>

<script>
import {getProfile} from '../controllers/GameController';
export default {
    name: 'profiletab', 
    data() {
        return {
            username: this.$store.state.username, 
            profile: null
        }
    }, 
    mounted() {
        getProfile(this.$store.state.username)
        .then(res => {
            this.profile = res;
            this.profile.ratio = (Math.round(res.ratio * 1000)) / 1000;
        });
    }
}
</script>

<style scoped>
#profile-tab {
    background-color: white !important;
    font-family: 'Roboto';
}
button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 600;
}

button:hover {
    background-color: grey;
    cursor: pointer;
}

hr {
    width: 100%;
}
</style>