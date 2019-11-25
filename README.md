# Link to Web-App


# A Short Introduction
We are Los Animales and our members are Dylan Bunch, Chase Alexander, and Michael Woodruff. We are making a rapid-fire trivia game called Triv.io (we currently do not own this domain, but that could be a future addition). All 3 of us worked on the UI at some point, but Dylan was mostly responsible for making Triv.io into something pretty using Vue Material design. Chase and Michael primarily worked on the Node backend, the web-sockets for matchmaking. Michael also worked with JWT for account authentication.
When you enter the website, you'll see two panels on the login page. The left panel is a short description of the web-app and the right is where you can login to the website. If you do not have an account, you can click the "Create Account" button at the bottom of the login panel. Then the login panel changes into the create account panel, and you can enter in your desired credentials. If you choose to create an account with a username that is taken, an error message will appear to notify you as such. The same can be said about passwords that do not match in both fields.
Upon logging in, you are presented with a navbar, 2 tiles, and the logout button. The Navbar allows easy navigation between the game page, the leaderboards page, and the about page. There is also a button on the opposite end of the navigation tabs that logs you out and redirects you to the login page. On the game lobby page you will find the aforementioned 2 tiles: one that says "Create Game" and one that says "Join Game". If  you click "Create Game", a dialog box will appear and direct you to select the difficulty of the questions, the category in which to pull from, and the number of questions in the round. If you click "Join Game" you will be presented with a dialog box prompting you to choose the game you want to join.
The leaderboards page is where you can find the top 10 highest scoring players. On the about page you will find information regarding the website, how it was built, and who did what in the project.

# The Problem
Have you ever been hanging out with your friends, but everyone's bored so their noses are buried in their phones? 

# Our Solution
Triv.io is our solution to that problem of needing more fun things to do with your friends. It'll be a web-app also availabe on mobile devices, so you can play whenever and wherever with your friends.

# Implementation
We'll be usinf NodeJS to set up our server, Vue for a frontend framework, MongoDB to manage game/user data, the TDB api to pull trivia questions, web-sockets to manage connections to games, and Vue Material to style everything. Chase and Michael handled mongodb, web-sockets, and the TDB api. Dylan handled the Vue Material frontend.

## Where We Meet Requirements
 - Consistent Design and User Experience
	- We used Vue Matrial for a large portion of our html elements. These can be seen in the LoginPage.vue, GamePage.vue, Leaderboards.vue, LobbyEntryPage.vue, and AboutPage.vue.
 - Well-Structured
	- In all of the pages mentioned under Consistent Design and User Experience, there is a style section which the styles for elements. For example, if you wanted to change the background color of all the cards on the LeaderboardsPage.vue all you would need to do is modify the leaderboard-entry class on line 73.
 - Authentication
	- Publicly available content is the LoginPage.vue while the other pages are only available after logged in. In order to manage this, we use JWT for per-request authentication and we store users' hashed passwords in a MongoDB database. The user sends their hashed password to our server and we check the hashed passwords together. Functions can be found in LoginPage.vue on lines 109 and 143.
 - Architecture
	- MVC is maintained through the use of controllers and .vue pages. The controllers are in the controllers folder, being ClientController.js and IdController.js. Views are stored in the views folder and are the .vue files. The model can be found in the backend folder under the model folder. We're using mongoose to manage the Mongo database that holds all the data from games/users. 
 - Persistent
	- Persistence is implemented inside the model/user.js file using mongoose and MongoDB.
 - Security
	- The site is secure since every request sent must be validated with a JWT generated on login. You can see their use in the functions on lines 109 and 143 of LoginPage.vue.
 - Responsive
	- We used material design with nearly every element we could. Can be found in the LoginPage.vue under the template section.
 - Content
	- We have data, in fact we pull all of our trivia from TDB, a trivia database of user-submitted questions. Can be found within the server.js file in backend.
 - Error Handling
	- If you log-in with an incorrect password, a message will be displayed informing you as such. The same can be said if you register with a taken username or if the passwords do not match. Also when creating a game a dialog will appear with several dropdowns. If you do not fill in all fields, the create button will be disabled until all fields are entered. Can be found in LobbyEntryPage.vue and LoginPage.vue
 - Publicly Viewable
	- The publicly viewable content is the LoginPage.vue while the other content is hidden behind the login screen.
 - Overall Purpose
	- We just wanted to make a fun game that you could play with your friends when you run out of things to do or if you just need to kill some time. 

# Knowledge Gained
Since Dylan didn't know Vue and he worked on the front-end, he learned how to use that framework. Michael and Chase got more experience with web-sockets, Vue, Node, and MongoDB since they worked on the backend. We also learned that it can be hard to manage the project with only 2 branches (frontend and backend). Instead, a branch per group member keeps toes from being stepped on until merges, but merges are where toes get stepped on anyway. We also learned that communication is imperative as we lost hours of work when Dylan designed an Angular frontend but, because of bad communication on everyone's part, we ended up having to ditch the Angular frontend since Chase and Michael needed a frontend to test with and Dylan had not finished yet, so they made a Vue frontend instead.

# Future Work
What we need to finish before the due date is a login page and the functionality behind it, a create account functionality, the game lobby page, the game page, the leaderboards page, and the about page. We need buttons so navigation on the page is easy, as well as a button to log out when you're done with the game. 
