<template>
    <div class="wrapper">
        <div class="content">
            <Header v-if="this.$route.name !== 'auth'"/>
            <router-view v-slot="{Component}">
                <transition name="fade">
                    <component :is="Component">
                    </component>
                </transition>
            </router-view>
            <Player v-if="this.$route.name !== 'auth'"/>
        </div>
    </div>
</template>
<script>
    import {mapWritableState} from 'pinia';
    import {auth} from "./includes/firebase"
    import userModalStore from "./stores/user";
    import Player from "./components/Player.vue";
    import Header from "./components/Header.vue";

    export default {
        components: {Header, Player},
        created() {
            if (auth.currentUser) {
                this.isLogged = true;
            }
        },
        computed: {
            ...mapWritableState(userModalStore, ['isLogged']),

        },
    }
</script>
