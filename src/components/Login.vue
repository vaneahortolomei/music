<template>
    <fieldset id="modal-login">
        <transition name="fade">
            <div class="message-box"
                 :class="messageBg"
                 v-if="showAlert"
            >
                {{showMessage}}
            </div>
        </transition>
        <legend>Login</legend>
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
    export default {
        name: "Login",
        data() {
            return {
                loginSchema: {
                    email: 'required|email',
                    password: 'required|min:3|max:32|numeric',
                },
                submission: false,
                showAlert: false,
                messageBg: 'message-box--process',
                showMessage: ''
            }
        },
        methods: {
            submitLogin(val) {
                console.log(val);
                this.showAlert = true;
                this.showMessage = 'Process!';

                setTimeout(() => {
                    this.messageBg = 'message-box--success';
                    this.showMessage = 'Success!';
                    this.showMyMessage();
                }, 2000);
            },
            showMyMessage(){
                setTimeout( () => {
                    this.showAlert = false;
                    window.location.pathname = '/'
                }, 2000)
            }
        }
    }
</script>
