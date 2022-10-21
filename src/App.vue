<template>
    <div class="wrapper">
        <div class="content">
            <Header v-if="isActive"/>
            <router-view v-slot="{Component}">
                <transition name="fade">
                    <component :is="Component">
                    </component>
                </transition>
            </router-view>
            <Player v-if="isActive"/>
        </div>
    </div>
</template>
<script>
    import {mapWritableState} from 'pinia';
    import {auth} from "./includes/firebase"
    import userModalStore from "./stores/user";
    import Player from "./components/Player.vue";
    import Header from "./components/Header.vue";
    import Auth from "./components/Auth.vue";

    export default {
        components: {Header, Player, Auth},
        data() {
            return {
                isActive: false,
            }
        },
        created() {
            if (auth.currentUser) {
                this.isLogged = true;
                this.isActive = true;
            }
        },
        computed: {
            ...mapWritableState(userModalStore, ['isLogged']),

        },
    }
</script>
