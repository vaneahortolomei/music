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
    <fieldset id="modal-register">
        <Form @submit="submitRegister"
              class="form"
              :validation-schema="registerSchema"
              :initial-values="userData">
            <div class="form__group">
                <label>Name</label>
                <Field name="firstName" class="form__input" type="text"/>
                <ErrorMessage class="form__error" name="firstName"/>
            </div>
            <div class="form__group">
                <label>LastName</label>
                <Field class="form__input" type="text" name="lastName"/>
                <ErrorMessage class="form__error" name="lastName"/>
            </div>
            <div class="form__group">
                <label>Age</label>
                <Field class="form__input" type="number" name="age"/>
                <ErrorMessage class="form__error" name="age"/>
            </div>
            <div class="form__group">
                <label>Password</label>
                <Field name="password" class="form__input" type="password"/>
                <ErrorMessage class="form__error" name="password"/>
            </div>
            <div class="form__group">
                <label>Confirm Password</label>
                <Field name="confirm_password" class="form__input" type="password"/>
                <ErrorMessage class="form__error" name="confirm_password"/>
            </div>
            <div class="form__group">
                <label>Country</label>
                <Field as="select" name="country" class="form__input">
                    <option value="USA">USA</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Russia">Russia</option>
                </Field>
                <ErrorMessage class="form__error" name="country"/>
            </div>
            <div class="form__group">
                <label>Email</label>
                <Field class="form__input" type="email" name="email"/>
                <ErrorMessage class="form__error" name="email"/>
            </div>
            <div class="form__group">
                <Field type="checkbox" name="tos" value="1"/>
                <label> Accept terms</label>
                <ErrorMessage class="form__error form__checkbox-error" name="tos"/>
            </div>
            <button class="button button--main button--responsive" type="submit" :disabled="submission">
                Register
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
                    age: 'required|min_value:18|max_value:100',
                    email: 'required|min:3|max:100|email',
                    password: 'required|min:6|max:100|numeric',
                    confirm_password: 'confirmed:@password',
                    country: 'required|excluded:Russia',
                    tos: 'required'
                },
                userData: {
                    country: 'USA'
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
                } catch (error) {
                    this.showAlert = true;
                    this.messageBg = 'notification--error';
                    this.showMessage = 'Something wrong! Try again please!';
                    return;
                }

                this.showAlert = true;
                this.messageBg = 'notification--success';
                this.showMessage = 'Welcome to music store!';
            }
        }
    }
</script>
