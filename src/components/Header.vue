<template>
    <div class="header">
        <div class="header__logo">Music</div>
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
    import {mapStores} from 'pinia';
    import modalStore from '../stores/modal';

    export default {
        name: "Header",
        computed: {
            ...mapStores(modalStore)
        },
        methods: {
            toggleModal() {
                this.modalStore.isOpen = !this.modalStore.isOpen;
            }
        }
    }
</script>
