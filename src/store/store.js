import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
//import auth from "../lib/manageApiCall";

Vue.use(Vuex)
Vue.use(createPersistedState)

const store = new Vuex.Store({
    modules: {
        //auth,
    },
    state: {
        alertMessage:{visible: false , message: "33Alert!" ,type: "error",showAlert: "showAlert"},
        authenticate: {isAuthenticate :false, token : null},
        showLoading: false,
    },
    getters: {
        message (state) {
            return state.alertMessage.message
        },
        visible (state) {
            return state.alertMessage.visible
        },
        errorType (state) {
            return state.alertMessage.type
        },
        showAlert (state) {
            return state.alertMessage.showAlert
        },
        getAuthStatus (state) {
           return state.authenticate.isAuthenticate ;
        },
        getToken (state) {
           return state.authenticate.token ;
        },
        getLoadingStatus (state) {
            return state.showLoading ;
        },
    },
    mutations: {
        showMessage (state, SalrtObj ) {
            state.alertMessage.visible = true;
            state.alertMessage.showAlert = 'showAlert';
            state.alertMessage.message = SalrtObj.message;
            state.alertMessage.type = SalrtObj.type;
        },
        hideMessage (state ) {
            state.alertMessage.visible = false;
            state.alertMessage.showAlert = '';
            state.alertMessage.message = '';
        },
        loginUser (state , token) {
            state.authenticate.isAuthenticate = true;
            state.authenticate.token = token.token;
        },
        logoutUser (state ) {
            state.authenticate.isAuthenticate = false;
            state.authenticate.token = null;
        },
        showLoading: function (state) {
            state.showLoading=true;
        },
        hideLoading: function (state) {
            state.showLoading=false;
        },
    },
    actions: {
        loginUser: ({ commit,getters }, loginInfo) => {
            commit('loginUser', {token : loginInfo.token});
            axios.defaults.headers.common = {
                'Authorization': 'Bearer ' + getters.getToken
            };

        },
        logoutUser: ({ commit }) => {
            commit('logoutUser');
        },
        alertError: ({ commit }, message) => {
            commit('showMessage', {type :'error' , message: message});
            setTimeout(() => {
              commit('hideMessage')
            }, 6000)
        },
        alertInfo: ({ commit }, message) => {
            commit('showMessage',{type :'info' , message: message});
            setTimeout(() => {
              commit('hideMessage')
            }, 6000)
        },
        alertMessage: ({ commit }, message) => {
            commit('showMessage',{type :'success', message: message});
            setTimeout(() => {
              commit('hideMessage')
            }, 6000)
        },
        alertWarning: ({ commit }, message) => {
            commit('showMessage',{type :'warning', message: message});
            setTimeout(() => {
              commit('hideMessage')
            }, 6000)
        },
        hideAlert: ({ commit }) => {
            commit('hideMessage');
        },
        showDelayedLoading: ({ commit }) => {
            commit('showLoading');
            setTimeout(() => {
              commit('hideLoading')
            }, 50000)
        },
        showLoading: ({ commit }) => {
            commit('showLoading');
        },
        hideLoading: ({ commit }) => {
            commit('hideLoading');
        }
    },
    plugins: [createPersistedState()]
})
export default store

