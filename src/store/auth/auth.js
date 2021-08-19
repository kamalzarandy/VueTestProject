import axios from "axios";

const auth = {
    token: null,
    expiredTime: null,
    isAuthenticate: false
};


const actions = {
    async login({commit}, form) {
        await axios.post('login', form)
        let UserForm = new FormData()
        UserForm.append('username', form.username)
        UserForm.append('password', form.password)
        //await commit("login", user.get("username"));
    },
    async LogOut({ commit }) {
        await axios.post('logout')
        commit("logOut");
    },
};

const mutations = {
    setToken(auth, token , expiredTime) {
        auth.token = token;
        auth.expiredTime = expiredTime;
        auth.isAuthenticate = true;
    },
    login(auth, token , expiredTime) {
        auth.token = token;
        auth.expiredTime = expiredTime;
        auth.isAuthenticate = true;
    },
    logOut(auth) {
        auth.token = null;
        auth.expiredTime = null;
        auth.isAuthenticate = false;
    },
};

export default {
    auth,
    actions,
    mutations,
};
