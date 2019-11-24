<template>
	<div id="leaderboards-page">
		<div id="leaderboard-container">
			<!-- loop this over an array of the top scores -->
			<md-card md-with-hover v-for="(leader, count) in leaders" :key="leader.name" :to="leader.name" class="leaderboard-entry">
				<md-ripple>
					<md-card-header><h1>{{count + 1}}. {{leader.name}} - {{leader.score}}</h1></md-card-header>
				</md-ripple>
			</md-card>
		</div>
	</div>
</template>

<script>
export default {
    name: 'leaderboardspage',
	data() {
		return {
			leaders: [
				{
					name: "Zach",
					score: "800"
				},
				{
					name: "Terry",
					score: "700"
				},
				{
					name: "Bruce",
					score: "600"
				},
				{
					name: "Bill",
					score: "550"
				},
				{
					name: "420",
					score: "420"
				},
				{
					name: "sixty nine",
					score: "69"
				},
				{
					name: "Brad",
					score: "40"
				},
				{
					name: "Dack",
					score: "30"
				},
				{
					name: "Kory",
					score: "10"
				},
				{
					name: "Bort",
					score: "1"
				},
			]
		};
	}
}
</script>

<style scoped>
#leaderboard-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 20px;
}
.leaderboard-entry {
	width: 80% !important;
	margin-bottom: 20px;
	text-align: center;
}
h1 {
	font-size: 25pt;
}
</style>
