<template>
    <div class="wrapper">
        <Header/>
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
        computed: {
            ...mapWritableState(userModalStore, ['isLogged']),

        },
        created() {
            if (auth.currentUser) {
                this.isLogged = true;
            }
        },
    }
</script>
<style scoped>

</style>
