<template>
    <Teleport to="body">
        <div id="modal"
             class="flex flex-col fixed top-0 left-0 z-[999] h-1/2 w-[300] border-2 p-3 bg-white"
             @keydown.esc="closeModal">
            <div id="modal-header" class="flex items-center justify-center pb-2">
                <slot name="header"></slot> <button @click="closeModal">X</button>
            </div>

            <div id="modal-body">
                <slot name="body"></slot>
            </div>

            <div id="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </Teleport>
</template>

<script>
export default {
    name: "Modal",
    emits: ['close'],
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>