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
    },
    {
        path: '/login',
        name: 'Login_Page',
        component: () => import('@/views/frontend/pages/LoginPage.vue'),
        meta: { layout: 'LoginLayout' } // <-- Layout
    },
    {
        path: '/products',
        name: 'Product_Page',
        component: () => import('@/views/frontend/pages/products/ProductList.vue'),
    }

];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;