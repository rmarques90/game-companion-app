<template>
    <Teleport to="body">
        <div id="modal"
             class="absolute top-0 left-0 w-screen h-screen flex justify-center items-center"
             @keydown.esc="closeModal">
            <div class="border-2 w-[480px] min-w-[500px]">
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