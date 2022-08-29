<template>
    <div class="container">
        <p>manage</p>
    </div>
</template>

<script>
    import useUserStore from "../stores/user";

    export default {
        name: "Manage",
        beforeRouteEnter(to, from, next) {
            const store = useUserStore();
            if (store.isLogged) {
                next();
            } else {
                next({name: 'notFoundPage'})
            }
        }
    }
</script>
