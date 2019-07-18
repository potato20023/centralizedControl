import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'

import town from '@/components/town'
import classM from '@/components/classM'
import classS from '@/components/classS'
import test from '@/components/mode/test'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/town/:townId',
      name:'town',
      component:town
    },
    {
      path:'/hellow',
      name:'HelloWorld',
      component:HelloWorld
    },{
      path:'/classM/:schoolId',
      name:'classM',
      component:classM
    },
    {
      path:'/classS',
      name:"classS",
      component:classS
    },
    {
      path:'/test',
      name:'test',
      component:test
    }
  ]
})
