<template>
    <div class="header">
        <div class="header__logo">
            <a href="/" title="logo" class="header__link">MusicLogo</a>
        </div>
        <ul class="header__list">
            <li class="header__item">
                <a href="#" class="header__link" @click.prevent="toggleModal">Login/Logout</a>
            </li>
            <li class="header__item">
                <a href="#" class="header__link">Manage</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapWritableState} from 'pinia';
    import modalStore from '../stores/modal';

    export default {
        name: "Header",
        computed: {
            ...mapWritableState(modalStore, ['isOpen']),
        },
        methods: {
            toggleModal() {
                this.isOpen = !this.isOpen;
            }
        }
    }
</script>
