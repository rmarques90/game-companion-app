<template>
    <CurrentUserActiveGames :user="AuthStore.user" />
</template>

<script>

import CurrentUserActiveGames from "@/components/CurrentUserActiveGames.vue";
import {useAuthStore} from "@/stores/auth";

export default {
    name: "HomeView",
    components: {CurrentUserActiveGames},
    data() {
        return {
            AuthStore: useAuthStore(),
            showGameModal: false
        }
    },
    methods: {
        toggleGameModal() {
            this.showGameModal = !this.showGameModal;
        }
    }
}
</script>
