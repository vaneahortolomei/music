<template>
    <fieldset id="modal-login">
        <transition name="fade">
            <Notification class="notification"
                          :class="messageBg"
                          v-if="showAlert">
                <template #notification>
                    {{showMessage}}
                </template>
            </Notification>
        </transition>
        <Form @submit="submitLogin"
              class="form"
              :validation-schema="loginSchema">
            <div class="form__group">
                <label class="form__label">Email</label>
                <Field name="email" class="form__input" type="email"/>
                <ErrorMessage class="form__error" name="email"/>
            </div>
            <div class="form__group">
                <label class="form__label">Password</label>
                <Field name="password" class="form__input" type="password"/>
                <ErrorMessage class="form__error" name="password"/>
            </div>
            <button class="button button--main button--responsive" type="submit" :disabled="submission">Login</button>
        </Form>
    </fieldset>
</template>

<script>
    import {mapActions} from 'pinia';
    import userModalStore from "../stores/user";
    import Notification from "./Notification.vue";

    export default {
        name: "Login",
        components: {Notification},
        data() {
            return {
                loginSchema: {
                    email: 'required|email',
                    password: 'required|min:3|max:32|numeric',
                },
                submission: false,
                showAlert: false,
                messageBg: 'notification--process',
                showMessage: 'Process!',
                success: false,
            }
        },
        methods: {
            ...mapActions(userModalStore, {
                signUser: 'login',
            }),
            async submitLogin(val) {
                this.showAlert = true;
                this.showMessage = 'Process!';
                this.messageBg = 'notification--process';
                try {
                    await this.signUser(val);
                    this.success = true;
                    if (this.success === true) {
                        this.showMyMessage();
                    }
                } catch (e) {
                    if (e) {
                        this.showAlert = true;
                        this.messageBg = 'notification--error';
                        this.showMessage = 'Something wrong! Try again please!';
                    }
                }


                this.showAlert = true;
                this.messageBg = 'notification--success';
                this.showMessage = 'Welcome!';
            },
            showMyMessage() {
                setTimeout(() => {
                    this.showAlert = false;
                    window.location.pathname = '/'
                }, 2000)
            }
        }
    }
</script>
