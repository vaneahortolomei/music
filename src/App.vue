<template>
    <div class="wrapper">
        <Header/>
        <div class="content">
            <div class="main-grid">
                <Gradient/>
                <router-view/>
            </div>
            <Player/>
        </div>
    </div>
    <Auth/>
</template>
<script>
    import Header from "./components/Header.vue";
    import Auth from "./components/Auth.vue";
    import {mapWritableState} from 'pinia';
    import {auth} from "./includes/firebase"
    import userModalStore from "./stores/user";
    import Player from "./components/Player.vue";
    import Gradient from "./components/Gradient.vue";

    export default {
        components: {Gradient, Player, Auth, Header},
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
