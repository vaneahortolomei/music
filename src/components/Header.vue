<template>
    <header class="header header--user content-header">
        <div class="header__wrap">
            <button type="button"
                    class="button header__button"
                    @click.prevent="backToPrevious"/>
            <ul v-if="!this.isLogged" class="nav">
                <li class="nav__item">
                    <a href="#" class="nav__link" @click.prevent="toggleModal" title="Login/Register">
                        <svg width="25" height="25" class="nav__icon">
                            <use xlink:href="/src/img/sprite.svg#login"/>
                        </svg>
                        <span class="nav__title">
                            Login/Register
                        </span>
                    </a>
                </li>
            </ul>
            <div v-else class="clickable header__user-menu user-menu" :class="hiddenClass" @click.prevent="toggleMenu">
                <UserAvatar class="user-avatar--header"/>
                <button type="button" class="clickable__button"/>
                <div v-if="isActive" class="user-menu__dropdown">
                    <nav class="user-menu__nav nav">
                        <ul class="nav__list">
                            <li class="nav__item">
                                <a href="#" class="nav__link" @click.prevent="logOut" title="Logout">
                                    <svg width="25" height="25" class="nav__icon">
                                        <use xlink:href="/src/img/sprite.svg#login"/>
                                    </svg>
                                    <span class="nav__title">Logout</span>
                                </a>
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
        data() {
            return {}
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
            },
            backToPrevious() {
                return this.$router.go(-1);
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
