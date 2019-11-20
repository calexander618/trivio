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

Vue.use(VueRouter);

const routes = [
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

export default router;