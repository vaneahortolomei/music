<template>
    <transition name="fade">
        <Notification class="notification"
                      :class="messageBg"
                      v-if="showAlert">
            <template #notification>
                {{showMessage}}
            </template>
        </Notification>
    </transition>
    <fieldset>
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
            <button class="button button--main button--responsive" type="submit" :disabled="submission">Continue</button>
        </Form>
    </fieldset>
</template>

<script>
    import {mapActions} from 'pinia';
    import userModalStore from "../stores/user";
    import Notification from "./Notification.vue";
    import {auth} from "../includes/firebase.js";

    export default {
        name: "Login",
        components: {Notification},
        data() {
            return {
                loginSchema: {
                    email: 'required|email',
                    password: 'required|min:3|max:32',
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
                        setTimeout(() => {
                            window.location.pathname = '/';
                        }, 1500)
                    }
                } catch (e) {
                    if (e) {
                        this.showAlert = true;
                        this.messageBg = 'notification--error';
                        if (e.code === 'auth/wrong-password') {
                            this.showMessage = 'Wrong password!';
                        }
                        if (e.code === 'auth/user-not-found') {
                            this.showMessage = 'User not found!';
                        }
                        if (e.code === 'auth/too-many-requests') {
                            this.showMessage = 'To many requests. Try later.';
                        }
                        this.setAlertTimer(3000);
                        return;
                    }
                }

                this.showAlert = true;
                this.messageBg = 'notification--success';
                this.showMessage = `Welcome, ${auth.currentUser.displayName}`;
            },
            setAlertTimer(time) {
                setTimeout(() => {
                    this.showAlert = false;
                }, time);
            }
        }
    }
</script>
