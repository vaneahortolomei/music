<template>
    <div class="wrapper">
        <Header/>
        <div class="content">
            <p>test</p>
        </div>
    </div>
    <Auth/>
</template>
<script>
    import Header from "./components/Header.vue";
    import Auth from "./components/Auth.vue";

    export default {
        components: {Auth, Header},
    }
</script>
<style scoped>

</style>
