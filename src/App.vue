<template>
    <div class="wrapper">
        <SideBar/>
        <div class="content">
            <div class="main-grid">
                <Gradient/>
                <div class="main-grid__main">
                    <Header/>
                    <router-view v-slot="{Component}">
                        <transition name="fade">
                            <component :is="Component">
                            </component>
                        </transition>
                    </router-view>
                </div>
            </div>
            <Player/>
        </div>
    </div>
    <Auth/>
</template>
<script>
    import Auth from "./components/Auth.vue";
    import {mapWritableState} from 'pinia';
    import {auth} from "./includes/firebase"
    import userModalStore from "./stores/user";
    import Player from "./components/Player.vue";
    import Gradient from "./components/Gradient.vue";
    import SideBar from "./components/SideBar.vue";
    import Header from "./components/Header.vue";

    export default {
        components: {Header, SideBar, Gradient, Player, Auth},
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
