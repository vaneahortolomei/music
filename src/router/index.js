import {createRouter, createWebHistory} from "vue-router";
import Manage from "../views/Manage.vue";
import Main from "../views/Main.vue";
import notFoundPage from '../views/404.vue';
import Song from "../views/Song.vue";

const routes = [
    {
        path: "/",
        name: "main",
        component: Main,
    },
    {
        path: "/manage",
        name: "manage",
        component: Manage,
        beforeEnter: (to, from, next) => {
            next();
        },
    },
    {
        path: '/song/:id',
        name: 'song',
        component: Song
    },
    {
        path: '/:CatchAll(.*)*',
        name: 'notFoundPage',
        component: notFoundPage
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkExactActiveClass: 'header__link--active'
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;
