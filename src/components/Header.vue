<template>
    <header class="header header--user">
        <div class="header__nav">
            <div class="logo logo--main">
                <router-link class="logo__link" :to="{name: 'main'}"/>
            </div>
            <nav class="user-menu__nav nav" v-if="!this.isLogged">
                <ul class="nav">
                    <li class="nav__item">
                        <router-link class="nav__link" :to="{name: 'auth'}" title="Auth">LogIn</router-link>
                    </li>
                </ul>
            </nav>
            <nav class="user-menu__nav nav" v-else>
                <ul class="nav__list">
                    <li class="nav__item">
                        <router-link class="nav__link" :to="{name: 'manage'}" title="Manage">
                            Manage
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="header__profile">
            <div class="user-menu clickable">
                <UserAvatar class="user-avatar user-avatar--header"/>
                <div class="user-menu__arrow" :class="{'user-menu__arrow--active': isActive}"/>
                <button @click="toggleMenu" class="user-menu__button clickable__button"/>
                <div class="user-menu__dropdown dropdown" v-if="isActive">
                    <nav class=" nav nav--user-menu">
                        <ul class="nav__list">
                            <li class="nav__item">
                                <router-link class="nav__link" :to="{name: 'main'}" @click.prevent="logOut"
                                             title="LogOut">
                                    Logout
                                </router-link>
                            </li>
                            <li class="nav__item nav__item--hide">
                                <router-link class="nav__link" :to="{name: 'manage'}" title="Manage">
                                    Manage
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapWritableState, mapState, mapActions} from 'pinia';
    import UserAvatar from "./UserAvatar.vue";
    import useMenuStore from '../stores/user-menu.js';
    import useUserStore from "../stores/user";
    import useModalStore from '../stores/modal';

    export default {
        name: "Header",
        components: {UserAvatar},
        computed: {
            ...mapState(useMenuStore, ['hiddenClass']),
            ...mapWritableState(useMenuStore, ['isActive']),
            ...mapWritableState(useUserStore, ['isLogged']),
            ...mapWritableState(useModalStore, ['isOpen']),
        },
        methods: {
            ...mapActions(useUserStore, {
                signOut: 'signOut'
            }),
            async logOut() {
                await this.signOut();
                this.$router.push({name: 'main'});
            },
            toggleModal() {
                this.isOpen = !this.isOpen;
            },
            toggleMenu() {
                this.isActive = !this.isActive;
            }
        }
    }
</script>
