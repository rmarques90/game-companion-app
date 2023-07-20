<template>
    Game Room!

    <div v-if="loading">
        Loading...
    </div>

    <div class="flex flex-col" v-if="currentGame">
        <span>players!</span>
        <div class="flex flex-col">
            <div v-for="player in currentGamePlayers" class="flex flex-row">
                <img class="rounded-full w-8 h-8" :src="player?.photoURL"/>
                <span>{{ player?.displayName }}</span>
            </div>
        </div>

        <div class="mt-5">
            <span>Selected game: {{ selectedGame.label }}</span>
        </div>
    </div>
</template>

<script>
import {getAllUsers, getSingleGame} from "@/firebase";
import {gamesAvailable} from "@/utils";

export default {
    name: "GameRoom",
    props: {
        id: null
    },
    data() {
        return {
            loading: false,
            currentGame: null,
            availableUsers: []
        }
    },
    async mounted() {
        this.loading = true;
        await this.loadAllUsers();
        await this.loadCurrentGame();
        this.loading = false;
    },
    methods: {
        async loadAllUsers() {
            if (this.availableUsers?.length) {
                return;
            }

            try {
                this.availableUsers = await getAllUsers();
            } catch (e) {
                console.error(e);
            }
        },
        async loadCurrentGame() {
            try {
                this.loading = true;
                this.currentGame = await getSingleGame(this.id);
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        }
    },
    computed: {
        currentGamePlayers() {
            if (!this.currentGame) {
                return [];
            }

            let users = this.currentGame.players.map(playerUid => {
                return this.availableUsers.find(u => u.uid === playerUid);
            });

            console.log(users);
            return users;
        },
        selectedGame() {
            if (!this.currentGame) {
                return null;
            }

            return gamesAvailable.find(g => g.id === this.currentGame.selectedGame);
        }
    }
}
</script>