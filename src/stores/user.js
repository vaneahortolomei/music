import {defineStore} from "pinia";
import {auth, usersCollection} from "../includes/firebase.js";

export default defineStore('user', {
    state: () => ({
        isLogged: false,
        isDesktop: window.matchMedia("(min-width: 1025px)").matches,
    }),
    actions: {
        async register(payload) {
            const userCred = await auth.createUserWithEmailAndPassword(
                payload.email,
                payload.password,
            );

            await usersCollection.doc(userCred.user.uid).set({
                firstName: payload.firstName,
                email: payload.email,
                age: payload.age,
                country: payload.country,
            });

            await userCred.user.updateProfile({
                displayName: payload.firstName,
            });
            this.isLogged = true;
        },
        async login(payload) {
            await auth.signInWithEmailAndPassword(
                payload.email, payload.password
            );
            this.isLogged = true;
        },
        async signOut() {
            await auth.signOut();
            this.isLogged = false;
        }
    }
});
