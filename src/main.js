import {createApp} from "vue";
import {createPinia} from "pinia";

import {auth} from './includes/firebase.js';

import VeeValidatePlugin from "./includes/validation.js";
import App from "./App.vue";
import router from "./router";

import "./assets/index.scss";

let app;

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App);

        app.use(createPinia());
        app.use(router);
        app.use(VeeValidatePlugin);
        app.mount('#app');
    }
});


