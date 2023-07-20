<template>
    My active games:
    <div class="flex flex-col p-2 border-2" @click="goToRoom(game.id)" v-for="game in currentActiveGames">
        Room: {{game.roomName}}
        <GameShow :gameId="game.selectedGame"/>
    </div>
</template>

<script>
import {getActiveGamesForUser} from "@/firebase";
import GameShow from "@/components/GameShow.vue";

export default {
    name: "CurrentUserActiveGames",
    components: {GameShow},
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
            console.log(this.currentActiveGames)
        },
        goToRoom(id) {
            this.$router.push({name: 'GameRoom', params: {id}});
        }
    }
}
</script>