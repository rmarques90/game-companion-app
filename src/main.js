import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import {useAuthStore} from "@/stores/auth";

import {setup as firebaseSetup} from './firebase';

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.name === 'login' && authStore.token) {
        next({name: 'home'});
        return;
    }

    if (to.meta.requiresAuth) {
        if (authStore.token) {
            next();
        } else {
            next({name: 'login'});
        }
    } else {
        next();
    }
})

firebaseSetup();

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)

app.mount('#app')
