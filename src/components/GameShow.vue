<template>
    <div class="flex flex-row">
        <span>****{{name}}****</span>
        <img :src="picture" alt="game-picture">
    </div>
</template>

<script>
import {gamesAvailable} from "@/utils";

export default {
    name: "GameShow",
    props: {
        gameId: null
    },
    computed: {
        name() {
            return gamesAvailable.find(g => g.id === this.gameId)?.label;
        },
        picture() {
            return gamesAvailable.find(g => g.id === this.gameId)?.img;
        }
    }
}
</script>