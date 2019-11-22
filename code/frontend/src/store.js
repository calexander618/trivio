import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: null
    }, 
    mutations: {
        addToken(state, newToken) {
            state.token = newToken;
        }
    }
})