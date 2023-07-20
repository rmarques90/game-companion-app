import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {useAuthStore} from "@/stores/auth";

const config = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

export const setup = () => {
    initializeApp(config);
}

const googleProvider = new GoogleAuthProvider();
export const makeGoogleAuth = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, googleProvider)
        .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            useAuthStore().$patch({
                token: token,
                user: user
            })
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        })
}

export const logoutGoogle = async () => {
    const auth = getAuth();
    await auth.signOut().then(() => {
        useAuthStore().$patch({
            token: null,
            user: null
        })
    }).catch((error) => {
        // An error happened.
        console.error("error logging out", error);
    });
}