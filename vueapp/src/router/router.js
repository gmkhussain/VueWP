import { createWebHistory, createRouter } from 'vue-router';
// import HomePage from '../views/frontend/pages/HomePage.vue'
import ContactPage from '../views/frontend/pages/ContactPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home_Page',
        component: () => import('@/views/frontend/pages/HomePage.vue')
    },
    {
        path: '/contact',
        name: 'Contact_Page',
        component: ContactPage
    }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;