import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage.vue';
import CreatePage from '../views/CreatePage.vue';
import Dashboard from '../views/Dashboard.vue';
import LobbyEntryPage from '../views/DashboardPages/LobbyEntryPage.vue';
import GamePage from '../views/DashboardPages/GamePage.vue';
import UserProfilePage from '../views/DashboardPages/UserProfilePage.vue';
import LeaderboardsPage from '../views/DashboardPages/LeaderboardsPage.vue';
import AboutPage from '../views/DashboardPages/AboutPage.vue';
import PageNotFound from '../views/PageNotFound.vue';
// import { store } from '../store.js';
import { checkToken, checkLocalStorageForToken } from '../controllers/LoginController';

Vue.use(VueRouter);

const routes = [
  {
    path: '*', 
    name: 'page-not-found',
    component: PageNotFound
  }, 
  {
    path: '/',
    name: 'redirect-to-login',
    redirect: '/dashboard/lobbyentry',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePage
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'lobbyentry',
        component: LobbyEntryPage
      },
      {
        path: 'game/:id',
        component: GamePage
      },
      {
        path: 'profile/:id',
        component: UserProfilePage
      },
      {
        path: 'leaderboard',
        component: LeaderboardsPage
      },
      {
        path: 'about',
        component: AboutPage
      }
    ]
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const publicroutes = ['/login'];
  // if public route, allow through
  if (publicroutes.includes(to.path)) return next();
  else {
    //before we check token, we check localstorage to see if theres a token in there
    checkLocalStorageForToken();
    checkToken().then(isSignedIn => {
      console.log(isSignedIn);
      if (isSignedIn !== false) return next();
      else return next('/login');
    });
  }
});


export default router;

