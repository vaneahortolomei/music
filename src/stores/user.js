import {defineStore} from "pinia";
import {auth, usersCollection} from "../includes/firebase.js";

export default defineStore('user', {
    state: () => ({
        isLogged: false,
    }),
    actions: {
        async register(payload) {
            await auth.createUserWithEmailAndPassword(
                payload.email, payload.password
            );

            await usersCollection.add({
                name: payload.name,
                lastName: payload.lastName,
                email: payload.email,
                age: payload.age,
                country: payload.country,
            });
            this.isLogged = true;
        },
        async login(payload) {
            await auth.signInWithEmailAndPassword(
                payload.email, payload.password
            );
            this.isLogged = true;
        },
        async signOut(){
            await auth.signOut();

            this.isLogged = false;
        }
    }
});
