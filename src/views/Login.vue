<template>
    <div>
        Teste do login
        <button @click="doLogin">Fazer login com google</button>
    </div>
</template>

<script>
import {makeGoogleAuth} from "@/firebase";

export default {
    name: "Login",
    methods: {
        async doLogin() {
            await makeGoogleAuth();
            this.$router.push({name: 'home'});
        }
    }
}
</script>