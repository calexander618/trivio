<template>
  <div>
    <md-table v-model="leaderboards" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Top Gamers</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <!-- <md-table-cell md-label="Rank" md-numeric>{{ rank }}</md-table-cell> -->
        <md-table-cell md-label="User">{{ item.username }}</md-table-cell>
        <md-table-cell md-label="W/L Ratio">{{ item.ratio}}</md-table-cell>
        <md-table-cell md-label="Games">{{ item.gamesPlayed }}</md-table-cell>
        <md-table-cell md-label="Wins">{{ item.gamesWon}}</md-table-cell>
        <md-table-cell md-label="Ties">{{ item.gamesTied}}</md-table-cell>
        <md-table-cell md-label="Losses">{{ item.gamesLost }}</md-table-cell>
      </md-table-row>
    </md-table>

  </div>
  <!-- <p v-for="player in leaderboards" :key="player.username">{{player.username}}</p> -->
</template>

<script>
import { getLeaderboards } from "../../controllers/GameController";

export default {
  name: "leaderboardspage",
  data() {
    return {
      rank: 1,
      leaderboards: []
    };
  },
  mounted() {
    getLeaderboards().then(leaderboards => {
      this.leaderboards = leaderboards;
    });
  }
};
</script>

<style scoped>
md-card {
    background-color: #343434be;
}
</style>