<template>
    <div id="leaderboards-page">
        <p>leaderboards</p>
        <p v-for="player in leaderboards" :key="player.username">{{player.username}}</p>
    </div>
</template>

<script>
import {getLeaderboards} from '../../controllers/GameController';

export default {
    name: 'leaderboardspage', 
    data() {
        return {
            leaderboards: []
        }
    }, 
    mounted() {
        getLeaderboards()
            .then(leaderboards => {
                this.leaderboards = leaderboards;
            });
    }
}
</script>