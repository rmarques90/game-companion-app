<template>
    <div v-if="AuthStore.token" class="flex flex-col">
        <div class="flex flex-row items-center p-3">
            <div class="flex flex-1">
                <span>olá, {{AuthStore.user?.displayName}}</span>
            </div>
            <div class="flex">
                <img class="rounded-full w-8 h-8" :src="AuthStore.user?.photoURL" @click="onNavbarActionClicked('logout')"/>
            </div>
        </div>
    </div>
    <div class="h-full w-full">
        <router-view/>
    </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth";
import {getCurrentGamesActive, logoutGoogle} from "@/firebase";
import CurrentUserActiveGames from "@/components/CurrentUserActiveGames.vue";

export default {
    name: 'App',
    components: {CurrentUserActiveGames},
    data() {
        return {
            AuthStore: useAuthStore(),
            userProfileOptions: [
                {label: 'Logout', key: 'logout'}
            ],
            currentActiveGames: []
        }
    },
    methods: {
        async onNavbarActionClicked(opt) {
            switch (opt) {
                case 'logout':
                    await logoutGoogle();
                    this.$router.push({name: 'login'});
                    break;
            }
        },
        goToRoute(route) {
            this.$router.push({name: route});
        }
    }
}

</script>