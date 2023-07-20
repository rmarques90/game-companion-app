<template>
    <select v-model="selectedGameId" @change="selectGame">
        <option v-for="game in games" :value="game.id">{{game.label}}</option>
    </select>
</template>

<script>
import {gamesAvailable} from "@/utils";

export default {
    name: "GamesSelect",
    emits: ['select-game'],
    data() {
        return {
            selectedGameId: null,
            games: gamesAvailable
        }
    },
    methods: {
        selectGame(e) {
            this.selectedGameId = e.target.value;
            this.$emit('select-game', this.selectedGameId);
        }
    }
}
</script>