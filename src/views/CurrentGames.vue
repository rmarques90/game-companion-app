<template>
    Current games
    <div>
        {{ currentGames }}
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
            <span class="mr-2">Game type</span>
            <select v-model="newGameForm.selectedGame">
                <option value="bang">Bang!</option>
                <option value="king-of-tokyo">KoT!</option>
            </select>
        </div>

        <div class="flex flex-row mb-5">
            <span class="mr-2">User</span>
            <select v-model="newGameForm.teste">
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

export default {
    name: "CurrentGames",
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
        async submitNewGame() {
            if (this.loading) {
                return;
            }

            try {
                this.loading = true;
                let g = new Game(this.newGameForm);
                g.ownerId = useAuthStore().user?.uid;
                g.createdAt = new Date();
                await insertNewGame(g)

                alert('game inserted!');

                this.resetNewGame();

                await this.loadCurrentGames();
            } catch (e) {
                alert(e.message);
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>