<template>
    <header class="header" :class="{'header--show': active}">
        <div class="header__logo">
            <button type="button" class="button button--toggle" @click.prevent="this.active = !this.active">
                <svg width="25" height="25" class="header__icon">
                    <use xlink:href="/src/img/sprite.svg#menu"/>
                </svg>
            </button>
        </div>
        <nav class="header__nav nav">
            <ul class="nav__list">
                <li v-if="isLogged" class="nav__item nav__show">
                    <a href="#" class="nav__link" @click.prevent="logOut" title="Logout">
                        <svg width="25" height="25" class="nav__icon">
                            <use xlink:href="/src/img/sprite.svg#login"/>
                        </svg>
                        <span class="nav__title">Logout</span>
                    </a>
                </li>
                <li v-if="!isLogged" class="nav__item nav__show">
                    <a href="#" class="nav__link" @click.prevent="toggleModal" title="Login/Register">
                        <svg width="25" height="25" class="nav__icon">
                            <use xlink:href="/src/img/sprite.svg#login"/>
                        </svg>
                        <span class="nav__title">
                            Login/Register
                        </span>
                    </a>
                </li>
                <li class="nav__item">
                    <router-link class="nav__link" :to="{name: 'main'}">
                        <svg width="25" height="25" class="nav__icon">
                            <use xlink:href="/src/img/sprite.svg#home"/>
                        </svg>
                        <span class="nav__title">Home</span>
                    </router-link>
                </li>
                <li v-if="isLogged" class="nav__item">
                    <router-link class="nav__link" :to="{name: 'manage'}">
                        <svg width="25" height="25" class="nav__icon">
                            <use xlink:href="/src/img/sprite.svg#manage"/>
                        </svg>
                        <span class="nav__title">Manage</span>
                    </router-link>
                </li>
                <li v-if="isLogged" class="nav__item nav__show">
                    <UserAvatar class="user-avatar user-avatar--header"/>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    import {mapActions, mapState, mapWritableState} from 'pinia';
    import useUserStore from "../stores/user";
    import UserAvatar from "./UserAvatar.vue";
    import useModalStore from "../stores/modal.js";
    import Notification from "./Notification.vue";

    export default {
        name: "SideBar",
        components: {Notification, UserAvatar},
        data() {
            return {
                active: false,
            }
        },
        methods: {
            ...mapActions(useUserStore, {
                signOut: 'signOut',
            }),
            async logOut() {
                await this.signOut();
                this.$router.push({name: 'main'});
            },
            toggleModal() {
                this.isOpen = !this.isOpen;
            },
        },
        computed: {
            ...mapWritableState(useUserStore, ['isLogged']),
            ...mapWritableState(useModalStore, ['isOpen']),
        },
    }
</script>
