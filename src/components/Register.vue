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
        <Form @submit="submitRegister"
              class="form"
              :validation-schema="registerSchema">
            <div class="form__group">
                <label class="form__label">Name</label>
                <Field name="firstName" class="form__input" type="text"/>
                <ErrorMessage class="form__error" name="firstName"/>
            </div>
            <div class="form__group">
                <label class="form__label">LastName</label>
                <Field class="form__input" type="text" name="lastName"/>
                <ErrorMessage class="form__error" name="lastName"/>
            </div>
            <div class="form__group">
                <label class="form__label">Password</label>
                <Field name="password" class="form__input" type="password"/>
                <ErrorMessage class="form__error" name="password"/>
            </div>
            <div class="form__group">
                <label class="form__label">Confirm Password</label>
                <Field name="confirm_password" class="form__input" type="password"/>
                <ErrorMessage class="form__error" name="confirm_password"/>
            </div>
            <div class="form__group">
                <label class="form__label">Email</label>
                <Field class="form__input" type="email" name="email"/>
                <ErrorMessage class="form__error" name="email"/>
            </div>
            <button class="button button--main button--responsive" type="submit" :disabled="submission">
                Join
            </button>
        </Form>
    </fieldset>
</template>

<script>
    import {mapActions} from 'pinia';
    import userModalStore from "../stores/user";
    import Notification from "./Notification.vue";

    export default {
        name: "Register",
        components: {Notification},
        data() {
            return {
                tab: 'login',
                registerSchema: {
                    firstName: 'required|min:2|max:100|alpha_spaces',
                    lastName: 'required|min:3|max:100|alpha_spaces',
                    email: 'required|min:3|max:100|email',
                    password: 'required|min:6|max:100',
                    confirm_password: 'confirmed:@password',
                },
                submission: false,
                showAlert: false,
                messageBg: 'notification--process',
                showMessage: '',
                success: false,
            }
        },
        methods: {
            ...mapActions(userModalStore, {
                createUser: 'register',
            }),
            async submitRegister(val) {
                this.showAlert = true;
                document.body.classList.add('body--fixed');
                this.showMessage = 'Process!';
                this.messageBg = 'notification--process';
                try {
                    await this.createUser(val);
                    this.success = true;

                    if (this.success === true) {
                        this.showAlert = false;
                        setTimeout(() => {
                            window.location.pathname = '/';
                        }, 2000);
                    }
                } catch (e) {
                    this.showAlert = true;
                    this.messageBg = 'notification--error';

                    e.code === 'auth/email-already-in-use' ?
                        this.showMessage = 'This email is already in use' :
                        this.showMessage = 'Something wrong! Try again please!';

                    this.setAlertTimer(3000);

                    return;
                }

                this.showAlert = true;
                this.messageBg = 'notification--success';
                this.showMessage = 'Welcome to MyMusic!';
            },
            setAlertTimer(time) {
                setTimeout(() => {
                    this.showAlert = false;
                }, time);
            }
        },
    }
</script>
