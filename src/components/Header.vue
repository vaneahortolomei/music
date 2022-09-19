<template>
    <header class="header" :class="{'header--show': active}">
        <div class="header__logo">
            <button type="button" class="button button--toggle" @click.prevent="this.active = !this.active">
                <svg width="25" height="25" class="header__icon">
                    <use xlink:href="/src/img/sprite.svg#menu"/>
                </svg>
            </button>
        </div>
        <nav class="header__nav">
            <ul class="header__list">
                <li v-if="!this.isLogged" class="header__item">
                    <a href="#" class="header__link" @click.prevent="toggleModal" title="Login/Register">
                        <svg width="25" height="25" class="header__icon">
                            <use xlink:href="/src/img/sprite.svg#login"/>
                        </svg>
                        <span class="header__title">
                            Login/Register
                        </span>

                    </a>
                </li>
                <template v-else>
                    <li>{{userName}}</li>
                    <li class="header__item">
                        <router-link class="header__link" :to="{name: 'main'}">
                            <svg width="25" height="25" class="header__icon">
                                <use xlink:href="/src/img/sprite.svg#home"/>
                            </svg>
                            <span class="header__title">Home</span>
                        </router-link>
                    </li>
                    <li class="header__item">
                        <router-link class="header__link" :to="{name: 'manage'}">
                            <svg width="25" height="25" class="header__icon">
                                <use xlink:href="/src/img/sprite.svg#manage"/>
                            </svg>
                            <span class="header__title">Manage</span>
                        </router-link>
                    </li>
                    <li class="header__item">
                        <a href="#" class="header__link" @click.prevent="logOut" title="Logout">
                            <svg width="25" height="25" class="header__icon">
                                <use xlink:href="/src/img/sprite.svg#login"/>
                            </svg>
                            <span class="header__title">Logout</span>
                        </a>
                    </li>
                </template>
            </ul>
        </nav>
    </header>
</template>

<script>
    import {mapActions, mapWritableState} from 'pinia';
    import useModalStore from '../stores/modal';
    import useUserStore from "../stores/user";
    import {auth} from "../includes/firebase.js";

    export default {
        data() {
            return {
                active: false,
            }
        },
        name: "Header",
        computed: {
            ...mapWritableState(useModalStore, ['isOpen']),
            ...mapWritableState(useUserStore, ['isLogged']),
            userName(){
                return this.user = auth.currentUser.displayName;
            }

        },
        methods: {
            ...mapActions(useUserStore, {
                signOut: 'signOut'
            }),
            toggleModal() {
                this.isOpen = !this.isOpen;
            },
            async logOut() {
                await this.signOut();
                this.$router.push({name: 'main'});
            }
        }
    }
</script>
