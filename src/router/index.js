import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
      { 
        path: '/', 
        name: 'Home',
        redirect: '/pokemons',
        component: () => import(/* webpackChunkName: "home" */ './../views/Home')
      },
      { 
        path: '/pokemons', 
        name: 'Pokemons',
        component: () => import(/* webpackChunkName: "pokemons" */ './../views/Pokemons')
      },
      { 
        path: '/star-wars', 
        name: 'StarWars',
        component: () => import(/* webpackChunkName: "home" */ './../views/StarWars')
      },  
    ]
})
