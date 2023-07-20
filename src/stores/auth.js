import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        user: null
    }),
    persist: {
        storage: localStorage,
        afterRestore: () => {
            console.log('afterRestore');
        }
    }
})