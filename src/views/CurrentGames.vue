<template>
    Current games
    <div @click="goToGame(currentGame)" class="mt-2 mb-2 border-2" v-for="currentGame in currentGames">
        <span>Room Name: {{currentGame.roomName}} -- Game: <GameShow :game-id="currentGame.selectedGame"></GameShow> </span>
    </div>
<!--    -->

    <button @click="addNewGame">Add new game</button>

    <NewGameModal v-if="showModalNewGame" @close="showModalNewGame = false"></NewGameModal>
</template>

<script>
import {getCurrentGamesActive} from "@/firebase";
import GamesSelect from "@/components/GamesSelect.vue";
import GameShow from "@/components/GameShow.vue";
import Modal from "@/components/Modal.vue";
import NewGameModal from "@/components/NewGameModal.vue";

export default {
    name: "CurrentGames",
    components: {NewGameModal, Modal, GameShow, GamesSelect},
    data() {
        return {
            loading: false,
            currentGames: [],
            availableUsers: [],
            showModalNewGame: false
        }
    },
    mounted() {
        this.loadCurrentGames();
    },
    methods: {
        async loadCurrentGames() {
            this.currentGames = await getCurrentGamesActive();
        },
        goToGame(game) {
            this.$router.push({name: 'GameRoom', params: {id: game.id}});
        },
        addNewGame() {
            this.showModalNewGame = true;
        }
    }
}
</script>