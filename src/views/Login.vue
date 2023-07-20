<template>
    <div class="absolute inset-0">
        <ButtonLoginWithGoogle @click="doLogin"></ButtonLoginWithGoogle>
    </div>
</template>

<script>
import {makeGoogleAuth} from "@/firebase";
import ButtonLoginWithGoogle from "@/components/Buttons/ButtonLoginWithGoogle.vue";

export default {
    name: "Login",
    components: {ButtonLoginWithGoogle},
    methods: {
        async doLogin() {
            await makeGoogleAuth();
            this.$router.push({name: 'home'});
        }
    }
}
</script>