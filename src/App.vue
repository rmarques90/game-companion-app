<template>
    <div v-if="AuthStore.token">
        <span>Olá, {{AuthStore.user?.displayName}}</span>
        <button @click="logout">Logout</button>
    </div>
    <router-view/>
</template>

<script>
import {RouterView} from 'vue-router'
import {useAuthStore} from "@/stores/auth";
import {logoutGoogle} from "@/firebase";

export default {
    name: 'App',
    data() {
        return {
            AuthStore: useAuthStore()
        }
    },
    methods: {
        async logout() {
            await logoutGoogle();
            this.$router.push({name: 'login'});
        }
    }
}

</script>