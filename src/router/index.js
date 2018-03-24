import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Rules from '@/components/Rules'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      component: MainMenu,
      props: true
    },
    {
      path: '/rules',
      name: 'Rules',
      component: Rules,
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
