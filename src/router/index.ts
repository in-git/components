import { createRouter, createWebHashHistory } from 'vue-router';
/* 页面中没有挂载路由 */
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/views/modules/home/Home.vue'),
      children: [],
    },
    {
      path: '/contextmenu',
      name: 'contextmenu',
      component: () => import('@/views/modules/contextmenu/index.vue'),
      children: [],
    },
    {
      path: '/draggable',
      name: 'draggable',
      component: () => import('@/views/modules/draggable/Main.vue'),
      children: [],
    },
  ],
});
