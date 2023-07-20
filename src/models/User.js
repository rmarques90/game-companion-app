export class User {
    displayName;
    uid;
    email;
    photoURL;

    constructor({ displayName, uid, email, photoURL }) {
        this.displayName = displayName;
        this.uid = uid;
        this.email = email;
        this.photoURL = photoURL;
    }
}