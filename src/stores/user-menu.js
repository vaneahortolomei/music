import {defineStore} from "pinia";

export default defineStore('user-menu', {
    state: () => ({
        isActive: false,
    }),
    getters: {
        hiddenClass(state) {
            return state.isActive ? 'user-menu--active' : '';
        }
    },
});
