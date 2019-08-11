import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import About from '@/components/About'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MainMenu,
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      props: true
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      props: true
    }
  ]
})
