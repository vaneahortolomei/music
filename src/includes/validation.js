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
                    required: `enter ${ctx.field}`,
                    min: `Too few characters`,
                    max: `Too many characters`,
                    email: `Looks like this ${ctx.field} is incomplete`,
                    excluded: `Country banned`,
                };

                return messages[ctx.rule.name] ?
                    messages[ctx.rule.name] :
                    `${ctx.field} field is invalid!`;
            }
        });
    }

}
