<template>
	<div id="about-page">
		<md-card id="about-header-card">
			<md-card-header><h1>About Triv.io</h1></md-card-header>
			<md-card-content>
				Triv.io is  built with VueJS for the frontend framework, the TriviaDB api to pull questions and answers, a MongoDB database to store user accounts, scores, etc., and using NodeJS on the server-side. We used web-sockets to manage the user connections,  JWT tokens to manage user authentication for their requests, and Vue Material for the frontend design.
			</md-card-content>
		</md-card>
		<div id="boys-container">
			<md-card class="boys">
				<md-card-header><h1>Chase Alexander</h1></md-card-header>
				<md-card-content>
					Front-End, Back-End, and Sockets
				</md-card-content>
			</md-card>
			<md-card class="boys">
				<md-card-header><h1>Michael Woodruff</h1></md-card-header>
				<md-card-content>
					Front-End, Back-End, and Sockets
				</md-card-content>
			</md-card>
			<md-card class="boys">
				<md-card-header><h1>Dylan Bunch</h1></md-card-header>
				<md-card-content>
					Front-End, Documentation
				</md-card-content>
			</md-card>
		</div>
	</div>
</template>

<script>
export default {
    name: 'aboutpage'
}
</script>

<style scoped>

#about-header-card {
	width: 80%;
	margin-top: 20px;
}

#about-page {
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

#boys-container {
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 20px;
}

.boys {
	width: 300px;
}

</style>
