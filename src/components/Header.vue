<template>
    <div class="header">
        <div class="header__logo">
            <a href="/" title="logo" class="header__link">MusicLogo</a>
        </div>
        <ul class="header__list">
            <li v-if="!this.isLogged" class="header__item">
                <a href="#" class="header__link" @click.prevent="toggleModal">Login/Register</a>
            </li>
            <template v-else>
                <li class="header__item">
                    <a href="#" class="header__link">Manage</a>
                </li>
                <li class="header__item">
                    <a href="#" class="header__link" @click.prevent="logOut">Logout</a>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    import {mapActions, mapWritableState} from 'pinia';
    import useModalStore from '../stores/modal';
    import useUserStore from "../stores/user";

    export default {
        name: "Header",
        computed: {
            ...mapWritableState(useModalStore, ['isOpen']),
            ...mapWritableState(useUserStore, ['isLogged']),

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
            }
        }
    }
</script>
