import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/leaderboard',
    redirect: '/leaderboard/vanilla/osu/performance'
  },
  {
    path: '/leaderboard/:relax/:mode/:type',
    name: 'Leaderboard',
    component: () => import('../views/Leaderboard.vue')
  },
  {
    path: '/beatmaps/:id',
    name: 'Beatmaps',
    component: () => import('../views/Beatmaps.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
