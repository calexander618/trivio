<template>
  <div id="leaderboards-page">
    <md-table v-model="leaderboards" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Top Players</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="User">{{ item.username }}</md-table-cell>
        <md-table-cell md-label="W/L Ratio">{{ item.ratio}}</md-table-cell>
        <md-table-cell md-label="Games" class="responsive-remove">{{ item.gamesPlayed }}</md-table-cell>
        <md-table-cell md-label="Wins" class="responsive-remove">{{ item.gamesWon}}</md-table-cell>
        <md-table-cell md-label="Ties" class="responsive-remove">{{ item.gamesTied}}</md-table-cell>
        <md-table-cell md-label="Losses" class="responsive-remove">{{ item.gamesLost }}</md-table-cell>
      </md-table-row>
    </md-table>

  </div>
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
@media only screen and (max-width: 700px) {
  .md-table {
    margin-top: 0 !important;
  }
}
.leaderboards-page {
  z-index: -2 !important;
}
md-card {
    background-color: #343434be;
}
.md-table {
  margin: auto !important;
  margin-top: 1rem !important;
  width: 100% !important;
  max-width: 800px !important;
  position: relative !important;
  z-index: 1 !important;
}
</style>