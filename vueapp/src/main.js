import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/router.js'

import 'bootstrap/scss/bootstrap.scss'
import "bootstrap"; // <-- JS File

createApp(App).use(router).mount('#app')
