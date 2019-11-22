import Vuex from 'vuex';

const store = new Vuex.Store({
    state: {
        token: null
    }, 
    mutations: {
        addToken(state, newToken) {
            state.token = newToken;
        }
    }
})

module.exports.store = store;