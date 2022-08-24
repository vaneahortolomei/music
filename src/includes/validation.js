import {
    Form,
    Field,
    defineRule,
    ErrorMessage,
    configure
}
    from "vee-validate";

import {
    required,
    min,
    max,
    alpha_spaces,
    email,
    numeric,
    min_value,
    max_value,
    confirmed,
    not_one_of as excluded
}
    from "@vee-validate/rules";

export default {
    install: function (app) {
        app.component('Form', Form);
        app.component('Field', Field);
        app.component('ErrorMessage', ErrorMessage);

        defineRule('required', required);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alpha_spaces', alpha_spaces);
        defineRule('email', email);
        defineRule('numeric', numeric);
        defineRule('min_value', min_value);
        defineRule('max_value', max_value);
        defineRule('confirmed', confirmed);
        defineRule('excluded', excluded);

        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `Поле ${ctx.field} обязательно для заполнения!`,
                    min: `Слишком мало символов`,
                    max: `Слишком много символов`,
                    email: `Поле ${ctx.field} должно быть валидным!`,
                    excluded: `Эта страна в жопе!`,
                };

                return messages[ctx.rule.name] ?
                    messages[ctx.rule.name] :
                    `The field ${ctx.field} is invalid!`;
            }
        });
    }

}
