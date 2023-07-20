<template>
    <Modal v-if="showModalNewGame" @close="closeModal">
        <template v-slot:header>
            Add new
        </template>
        <template v-slot:body>
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
            </div>
        </template>

        <template v-slot:footer>
            <div class="flex flex-row">
                <button @click="submitNewGame">Submit</button>
            </div>
        </template>
    </Modal>
</template>
<script>
import GamesSelect from "@/components/GamesSelect.vue";
import Modal from "@/components/Modals/Modal.vue";
import {getAllUsers, insertNewGame} from "@/firebase";
import {Game} from "@/models/Game";
import {useAuthStore} from "@/stores/auth";

export default {
    name: "NewGameModal",
    components: {Modal, GamesSelect},
    emits: ['close'],
    data() {
        return {
            newGameForm: {
                roomName: null,
                roomPassword: null,
                selectedGame: null,
                players: [],
                scheduledFor: null,
                active: true
            },
            availableUsers: [],
            showModalNewGame: false
        }
    },
    async beforeMount() {
        await this.loadAllUsers();
        this.showModalNewGame = true
    },
    methods: {
        async loadAllUsers() {
            this.availableUsers = await getAllUsers();
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

                this.closeModal();
            } catch (e) {
                alert(e.message);
            } finally {
                this.loading = false;
            }
        },
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>