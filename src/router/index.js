import Vue from 'vue'
import Router from 'vue-router'
import Semelhantes from '@/components/Semelhantes'
import ContasLista from '@/components/ContasLista'
import Login from '@/components/Auth/Login'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Semelhantes',
      name: 'Semelhantes',
      component: Semelhantes,
    },
    {  
        path: '/ContasLista',
        name: 'ContasLista',
        component: ContasLista,
    },
    {   

        path: '/Login',
        name: 'Login',
        component: Login,
      },
    
      
  ],

})

/*const routes = [
  {
    path: "/login",
    component: Login,
    name: 'login'

}
];

const router = new VueRouter({
mode: 'history',
routes,
base: '/'

})*/


 


