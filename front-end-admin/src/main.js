

import { createApp } from 'vue'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createPinia } from 'pinia';
import router from './router';


createApp(App).use(router).use(createPinia()).mount('#app');
