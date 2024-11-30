import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/voice'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: 'voice',
        name: 'tabs',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/Tab5Page.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
