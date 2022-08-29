<template>
    <div class="wrapper">
        <Header/>
        <div class="content">
            <router-view/>
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

    export default {
        components: {Auth, Header},
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
<style scoped>

</style>
