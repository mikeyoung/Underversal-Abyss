import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Rules from '@/components/Rules'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      component: MainMenu
    },
    {
      path: '/rules',
      name: 'Rules',
      component: Rules
    }
  ]
})
