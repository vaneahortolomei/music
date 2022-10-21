<template>
    <div class="logo logo--hide">
        <router-link :to="{name: 'main'}" title="Home">
            <svg width="67" height="67" class="logo__img">
                <use xlink:href="/src/img/sprite.svg#login-block-color"/>
            </svg>
        </router-link>
    </div>
    <h2 class="auth-form__title" v-if="tab === 'login'">Sign In to <span>MyOwnMusic</span></h2>
    <h2 class="auth-form__title" v-else>Join <span>MyOwnMusic</span></h2>
    <div role="tab" class="tab tab--auth">
        <button type="button" class="tab__button button"
                :class="{
                              'button--main':tab === 'login',
                              'button--second':tab === 'register'
                        }"
                @click.prevent="tab = 'login'">Log in
        </button>
        <button type="button" class="tab__button button"
                :class="{
                              'button--main':tab === 'register',
                              'button--second':tab === 'login'
                        }"
                @click.prevent="tab = 'register'">
            Sign up
        </button>
    </div>
    <Login v-if="tab === 'login'"/>
    <Register v-else/>
</template>

<script>
    import Login from "./Login.vue";
    import Register from "./Register.vue";

    export default {
        name: "Auth",
        components: {Register, Login},
        data() {
            return {
                tab: 'login'
            }
        }
    }
</script>
