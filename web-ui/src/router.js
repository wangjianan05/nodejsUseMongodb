/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 14:54:47
 * @LastEditTime : 2020-01-09 14:43:48
 * @LastEditors  : Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/main.vue'),
      redirect: '/userList',
      children: [
        {
          path: '/userList',
          name: 'userList',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/userList.vue')
        }
      ]
    }

  ]
})
