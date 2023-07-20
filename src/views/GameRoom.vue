<template>
    Game Room!
</template>

<script>
import {getAllUsers, getSingleGame} from "@/firebase";

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
    mounted() {
        this.loadCurrentGame();
        this.loadAllUsers();
    },
    methods: {
        async loadAllUsers() {
            if (this.loading) {
                return;
            }

            try {
                this.loading = true;
                this.availableUsers = await getAllUsers();
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        async loadCurrentGame() {
            if (this.loading) {
                return;
            }

            try {
                this.loading = true;
                this.currentGame = await getSingleGame(this.id);
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>