import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Camera from '@/components/Camera';
import Reports from '@/components/Reports';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/camera',
      name: 'Capturar Amostra',
      component: Camera
    },
    {
      path: '/relatorios',
      name: 'Relatórios',
      component: Reports
    }
  ]
});
