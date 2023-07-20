import {initializeApp} from 'firebase/app';
import {collection, getDocs, getFirestore, query, where, doc, addDoc, setDoc, getDoc, or, and} from "firebase/firestore";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useAuthStore} from "@/stores/auth";
import {Game} from "@/models/Game";
import {User} from "@/models/User";

const config = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

let db = null;
let app = null;
export const setup = () => {
    if (!app) {
        app = initializeApp(config);
    }
    if (!db) {
        db = getFirestore(app);
    }
}

const googleProvider = new GoogleAuthProvider();
export const makeGoogleAuth = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, googleProvider)
        .then(async result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            await insertUpdateUserOnFirebase(new User(user));
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

export const getCurrentGamesActive = async () => {
    const currentGamesRef = collection(db, "games");
    const q = query(currentGamesRef, where("active", "==", true)).withConverter(gameConverter);
    let resp = await getDocs(q);
    let dataToReturn = [];
    resp.forEach((doc) => {
        dataToReturn.push(doc.data());
    })
    return dataToReturn;
}

const gameConverter = {
    toFirestore: (game) => {
        let objToReturn = {};
        Object.entries(game).forEach(([key, value]) => {
            if (value != undefined) {
                objToReturn[key] = value;
            }
        });

        return objToReturn;
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Game(data);
    }
};

export const insertNewGame = async (game) => {
    try {
        // const gameRef = doc(db, 'games').withConverter(gameConverter);
        let docToInsert = gameConverter.toFirestore(game);
        await addDoc(collection(db, 'games'), docToInsert);
    } catch (e) {
        throw Error(e);
    }
}

const userConverter = {
    toFirestore: (user) => {
        let objToReturn = {};
        Object.entries(user).forEach(([key, value]) => {
            if (value != undefined) {
                objToReturn[key] = value;
            }
        });

        return objToReturn;
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data);
    }
};

const insertUpdateUserOnFirebase = (user) => {
    // const userRef = doc(db, 'users', user.uid).withConverter(userConverter);
    return setDoc(doc(db, 'users', user.uid), userConverter.toFirestore(user), {merge: true});
}

export const getAllUsers = async () => {
    const usersRef = collection(db, "users").withConverter(userConverter);
    let resp = await getDocs(usersRef);
    let dataToReturn = [];
    resp.forEach((doc) => {
        dataToReturn.push(doc.data());
    })
    return dataToReturn;
}

export const getSingleGame = async (gameId) => {
    const gameRef = doc(db, 'games', gameId).withConverter(gameConverter);
    return await getDoc(gameRef);
}

export const getActiveGamesForUser = async (userId) => {
    const currentGamesRef = collection(db, "games");
    const q = query(currentGamesRef, and(where("active", "==", true), or(where("players.uid", "in", [userId]), where("ownerId", '==', userId)))).withConverter(gameConverter);
    let resp = await getDocs(q);
    let dataToReturn = [];
    console.log('resp', resp);
    resp.forEach((doc) => {
        dataToReturn.push(doc.data());
    })
    console.log('dataToReturn', dataToReturn);
    return dataToReturn;
}