import './styles/main.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App).use(createPinia())

AOS.init();
app.use(createPinia())
app.use(router)

app.mount('#app')
