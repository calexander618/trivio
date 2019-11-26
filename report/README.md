# Link to Web-App


# A Short Introduction
We are Los Animales and our members are Dylan Bunch, Chase Alexander, and Michael Woodruff. We are making a rapid-fire trivia game called Triv.io (we currently do not own this domain, but that could be a future addition). All 3 of us worked on the UI at some point, but Dylan was mostly responsible for making Triv.io into something pretty using Vue Material design. Chase and Michael primarily worked on the Node backend, the web-sockets for matchmaking. Michael also worked with JWT for account authentication.
When you enter the website, you'll see two panels on the login page. The left panel is a short description of the web-app and the right is where you can login to the website. If you do not have an account, you can click the "Create Account" button at the bottom of the login panel. Then the login panel changes into the create account panel, and you can enter in your desired credentials. If you choose to create an account with a username that is taken, an error message will appear to notify you as such. The same can be said about passwords that do not match in both fields.
Upon logging in, you are presented with a navbar, 3 tiles, and the profile, friends, and logout button. The Navbar allows easy navigation between the game page, the leaderboards page, and the about page. On the game lobby page you will find the aforementioned 3 tiles: one that says "Create Game", one that says "Join Friend", and one that says "Join Game". If  you click "Create Game", a dialog box will appear and direct you to select the difficulty of the questions, the category in which to pull from, and the number of questions in the round. If you click "Join Game" you will be presented with a dialog box prompting you to choose the game you want to join. If you click "Join Friend" you'll be prompted to join one of your friends' open games.
The leaderboards page is where you can find the top-scoring players in a tabled form with all their game statistics on display. On the about page you will find information regarding the website, how it was built, and who did what in the project.

# The Problem
Have you ever been hanging out with your friends, but everyone's bored so their noses are buried in their phones? 

# Our Solution
Triv.io is our solution to that problem of needing more fun things to do with your friends. It'll be a web-app also availabe on mobile devices, so you can play whenever and wherever with your friends.

# Implementation
We'll be usinf NodeJS to set up our server, Vue for a frontend framework, MongoDB to manage game/user data, the TDB api to pull trivia questions, web-sockets to manage connections to games, and Vue Material to style everything. Chase and Michael handled mongodb, web-sockets, and the TDB api. Dylan handled the Vue Material frontend.

## Where We Meet Requirements
 - Consistent Design and User Experience
	- Each page has a header which is housed in a vue component (code/frontend/src/components/PageHeader.vue)
	- Every page except the login/createaccount page has a navigation bar (code/frontend/src/components/PageNav.vue)
	- Every page except the login/createaccount page has a profile tab you can view by clicking on the profile icon on the navigation bar (code/frontend/src/components/ProfileTab.vue)
	- We used material design vue components in many places where it made sense to give a similar feel across pages.
	- The UI has a few dynamic places in it. 
		- The leaderboards page changes depending on the user information within the database
		- The profile tab changes depending on the currently logged in user
		- The Game Page (GamePage.vue) changes depending on the current game you’re in and the corresponding question set
 - Well-Structured
	- ‘code/backend/model’ contains models for data housed in the MongoDB
	- ‘code/backend/api-routes.js’ contains node/express endpoints for frontend to hit
	- ‘code/backend/server.js’ contains logic for web sockets and serving static resources
	- `code/frontend/src` contains views and controllers for components of the application
	- This organization made it pretty clear where to look to change something, and made many pieces of code reusable
 - Authentication
	- Passwords are hashed and stored in the database, plain text passwords are not used in the database
	- Passwords are hashed on the server-side when comparing to hashed passwords within the database
	- JSON Web Tokens are used to maintain sessions
	- This JSON Web Token is stored in the Vuex (global data for Vue applications), after logging in.
	- Our Vue application router has a function called before every route switch which does the following
		- Check localStorage for a stored JWToken and Username
			- If found, store in Vuex
		- Hit api endpoint to verify this token in Vuex is signed in
		- If it comes back that the token is not signed in, Vue will boot user back to login page
		- The login/createaccount page is public, all other pages are not
	- Users can logout by clicking the door icon on top right of page
	- Places to find authentication logic would be 
		- code/frontend/src/router/index.js
			- The beforeEach function
		- code/backend/api-routes.js
			- Signin and verifySignin endpoints
		- code/frontend/src/components/PageNav.vue
			- Logout functionality
 - Architecture
	- Model: The model is the MongoDB which resides server-side. Templates for data stored there can be found in code/backend/model
	- Controller: Logic for individual components are housed in the script tag in the respective Vue Component. Whenever these components need to access the model (make a call to the api endpoint), it must go through a controller defined in code/frontend/src/controllers/
	- View: Views are housed in the template tag in each respective Vue file.
 - Persistent
	- User data and their match histories are stored in a Mongo Database server-side (persistent)
	- LocalStorage is used for holding onto authentication tokens in case a user closes their tab and wants to reopen the webpage and be logged in already.
	- Persistence is implemented inside the model/user.js file using mongoose and MongoDB.
 - Security
	- The site is secure since every request sent must be validated with a JWT generated on login. You can see their use in the functions on lines 109 and 143 of LoginPage.vue.
 - Responsive
	- We used material design with nearly every element we could. Can be found in the LoginPage.vue under the template section.
	- Media queries in the css are used to make sure each page is responsive
	- When the page width hits a certain threshold (we checked for 600 or 700px depending on page), new css will be applied to ensure mobile support
 - Content
	- We have data, in fact we pull all of our trivia from TDB, a trivia database of user-submitted questions. Can be found within the server.js file in backend.
	- User content is stored on the Mongo DB
	- Question content is received on the fly from [this](https://opentdb.com/api_config.php) api
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
