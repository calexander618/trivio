import Vuex from 'vuex';

const store = new Vuex.store({
    state: {
        token: null
    }, 
    mutations: {
        addToken(state, newToken) {
            state.token = newToken;
        }
    }
})