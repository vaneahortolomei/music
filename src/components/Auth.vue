<template>
    <ModalWrapper>
        <template #modal-content>
            <div role="tab" class="tab tab--auth">
                <button type="button" class="tab__button button"
                        :class="{
                              'button--main':tab === 'login',
                              'button--default':tab === 'register'
                        }"
                        @click.prevent="tab = 'login'">Login
                </button>
                <button type="button" class="tab__button button"
                        :class="{
                              'button--main':tab === 'register',
                              'button--default':tab === 'login'
                        }"
                        @click.prevent="tab = 'register'">
                    Register
                </button>
            </div>
            <Login v-if="tab === 'login'"/>
            <Register v-else/>
        </template>
    </ModalWrapper>
</template>

<script>
    import ModalWrapper from "./ModalWrapper.vue";
    import Login from "./Login.vue";
    import Register from "./Register.vue";

    export default {
        name: "Auth",
        components: {Register, Login, ModalWrapper},
        data() {
            return {
                tab: 'login'
            }
        }
    }
</script>
