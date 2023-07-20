<template>
    <div class="text-white">
        Teste
    </div>
</template>

<script>

export default {
    name: "HomeView",
    data() {
        return {
            showGameModal: false
        }
    },
    methods: {
        toggleGameModal() {
            this.showGameModal = !this.showGameModal;
        }
    }
}
</script>
