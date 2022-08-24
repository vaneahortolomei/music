<template>
    <transition name="fade">
        <div class="message-box"
             :class="messageBg"
             v-if="showAlert"
        >
            {{showMessage}}
        </div>
    </transition>
    <fieldset id="modal-register">
        <legend>Register</legend>
        <Form @submit="submitRegister"
              class="form"
              :validation-schema="registerSchema"
              :initial-values="userData">
            <div class="form__group">
                <label>Name</label>
                <Field name="name" class="form__input" type="text"/>
                <ErrorMessage class="form__error" name="name"/>
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
                <ErrorMessage class="form__error" name="tos"/>
            </div>
            <button class="button button--main button--responsive" type="submit" :disabled="submission">
                Register
            </button>
        </Form>
    </fieldset>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                tab: 'login',
                registerSchema: {
                    name: 'required|min:2|max:100|alpha_spaces',
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
                messageBg: 'message-box--process',
                showMessage: ''
            }
        },
        methods: {
            submitRegister(val){
                console.log(val)
            }
        }
    }
</script>
