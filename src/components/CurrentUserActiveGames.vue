<template>
    Current User Active games:
    {{currentActiveGames}}
</template>

<script>
import {getActiveGamesForUser} from "@/firebase";

export default {
    name: "CurrentUserActiveGames",
    props: {
        user: null
    },
    data() {
        return {
            currentActiveGames: []
        }
    },
    mounted() {
        this.loadCurrentActiveGames();
    },
    methods: {
        async loadCurrentActiveGames() {
            this.currentActiveGames = await getActiveGamesForUser(this.user?.uid);
        }
    }
}
</script>