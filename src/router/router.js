import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@/views/AuthPage.vue';
import AnalyticsPage from '@/views/AnalyticsPage.vue';

const routes = [
  { path: '/', redirect: '/authorization' },
  { path: '/authorization', component: AuthPage },
  { path: '/analytics', component: AnalyticsPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;