<template>
    <div class="auth">
        <div class="auth__description">
            <div class="auth-description">
                <header>
                    <div class="logo">
                        <router-link :to="{name: 'main'}" title="Home">
                            <svg width="67" height="67" class="logo__img">
                                <use xlink:href="/src/img/sprite.svg#login-block"/>
                            </svg>
                        </router-link>
                    </div>
                </header>
                <h1 class="auth-description__title">Welcome to MyOwnMusic</h1>
                <p class="auth-description__subtitle">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                    nonummy </p>
            </div>
        </div>
        <div class="auth__form">
            <picture class="auth__main-img">
                <source srcset="/src/img/login/login-instrument.webp" type="image/webp">
                <img decoding="sync" src="/src/img/login/login-instrument.png" alt="">
            </picture>
            <div class="auth-form">
                <Auth/>
            </div>
        </div>
    </div>
</template>

<script>
    import Auth from "../components/Auth.vue";
    import useUserStore from "../stores/user.js";

    export default {
        components: {Auth},
        beforeRouteEnter(to, from, next) {
            const store = useUserStore();
            if (!store.isLogged) {
                next();
            } else {
                next({name: ''})
            }
        },
    }
</script>
