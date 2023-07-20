<template>
    Current games
    <div @click="goToGame(currentGame)" class="mt-2 mb-2 border-2" v-for="currentGame in currentGames">
        <span>Room Name: {{currentGame.roomName}} -- Game: <GameShow :game-id="currentGame.selectedGame"></GameShow> </span>
    </div>
    <div id="new-game-form" class="flex flex-col bg-amber-200 p-5">

        <div class="flex flex-row mb-5">
            <span class="mr-2">Room name</span>
            <input type="text" max="255" v-model="newGameForm.roomName"/>
        </div>

        <div class="flex flex-row mb-5">
            <span class="mr-2">Room password</span>
            <input type="text" max="255" v-model="newGameForm.roomPassword"/>
        </div>

        <div class="flex flex-row mb-5">
            <span class="mr-2">Game</span>
            <GamesSelect @select-game="updateSelectedGame"></GamesSelect>
        </div>

        <div class="flex flex-row mb-5">
            <span class="mr-2">Scheduled for</span>
            <input type="datetime-local" v-model="newGameForm.scheduledFor">
        </div>

        <div class="flex flex-row mb-5">
            <span class="mr-2">User</span>
            <select multiple v-model="newGameForm.players">
                <option v-for="user in availableUsers" :value="user.uid">{{user.displayName}}</option>
            </select>
        </div>

        <div class="flex flex-row">
            <button @click="submitNewGame">Submit</button>
        </div>
    </div>
</template>

<script>
import {getAllUsers, getCurrentGamesActive, insertNewGame} from "@/firebase";
import {Game} from "@/models/Game";
import {useAuthStore} from "@/stores/auth";
import GamesSelect from "@/components/GamesSelect.vue";
import GameShow from "@/components/GameShow.vue";

export default {
    name: "CurrentGames",
    components: {GameShow, GamesSelect},
    data() {
        return {
            loading: false,
            currentGames: [],
            availableUsers: [],
            newGameForm: {
                roomName: null,
                roomPassword: null,
                selectedGame: null,
                players: [],
                scheduledFor: null,
                active: true
            }
        }
    },
    mounted() {
        this.loadCurrentGames();
    },
    methods: {
        async loadCurrentGames() {
            this.currentGames = await getCurrentGamesActive();
            if (!this.availableUsers.length) {
                this.availableUsers = await getAllUsers();
            }
        },
        resetNewGame() {
            this.newGameForm = {
                roomName: null,
                roomPassword: null,
                selectedGame: null,
                active: true
            }
        },
        updateSelectedGame(gameId) {
            this.newGameForm.selectedGame = gameId;
        },
        async submitNewGame() {
            if (this.loading) {
                return;
            }

            try {
                this.loading = true;
                let g = new Game(this.newGameForm);
                g.ownerId = useAuthStore().user?.uid;
                g.createdAt = new Date();
                g.scheduledFor = new Date(g.scheduledFor);
                await insertNewGame(g)

                alert('game inserted!');

                this.resetNewGame();

                await this.loadCurrentGames();
            } catch (e) {
                alert(e.message);
            } finally {
                this.loading = false;
            }
        },
        goToGame(game) {
            this.$router.push({name: 'GameRoom', params: {id: game.id}});
        }
    }
}
</script>