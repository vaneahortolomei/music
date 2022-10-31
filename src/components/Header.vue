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
            <nav class="user-menu__nav user-menu__nav--hide nav" v-else>
                <ul class="nav__list">
                    <li class="nav__item">
                        <router-link class="nav__link" :to="{name: 'manage'}" title="Manage">
                            Manage
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="header__profile" v-if="this.isLogged">
            <div class="user-menu clickable">
                <UserAvatar class="user-avatar user-avatar--header"/>
                <div class="user-menu__arrow" :class="{'user-menu__arrow--active': isActive}"/>
                <button @click.stop="toggleMenu" class="user-menu__button clickable__button"/>
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
    <transition name="fade">
        <Notification class="notification"
                      :class="messageBg"
                      v-if="showAlert">
            <template #notification>
                {{showMessage}}
            </template>
        </Notification>
    </transition>
</template>

<script>
    import {mapWritableState, mapState, mapActions} from 'pinia';
    import UserAvatar from "./UserAvatar.vue";
    import useMenuStore from '../stores/user-menu.js';
    import useUserStore from "../stores/user";
    import useModalStore from '../stores/modal';
    import Notification from "./Notification.vue";

    export default {
        name: "Header",
        components: {Notification, UserAvatar},
        data() {
            return {
                showAlert: false,
                messageBg: 'notification--process',
                showMessage: 'User is log out',
            }
        },
        mounted() {
            this.windowCloseMenu();
        },
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
                this.showAlert = true;
                document.body.classList.add('body--fixed');
                this.setAlertTimer(2000);
            },
            toggleModal() {
                this.isOpen = !this.isOpen;
            },
            toggleMenu() {
                this.isActive = !this.isActive;
            },
            windowCloseMenu() {
                document.addEventListener('click', () => {
                    this.isActive = false;
                })
            },
            setAlertTimer(time) {
                setTimeout(() => {
                    this.showAlert = false;
                    document.body.classList.remove('body--fixed');
                }, time);
            }
        }
    }
</script>
