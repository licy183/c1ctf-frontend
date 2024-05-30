// eslint-disable-next-line no-unused-vars
import {SET_TOKEN, SET_ISAUTH , SET_LOGOUT , SET_USERNAME , SET_LOGIN, SET_TOKEN_LOGIN, SET_IS_ADMIN, SET_UNREAD_BULLETIN} from '@/util/store-types'

const state = {
    is_authenticated: false,
    username: '',
    token: '',
    is_admin: false,
    is_student: false,
    have_unread_bulletin: false,
};
const getters = {
    // getters 类似 computed
    // 在这里面写个方法
};
const mutations = {
    [SET_TOKEN] (state, token) {
        state.token = token;
    },
    [SET_USERNAME] (state, username) {
        state.username = username;
    },
    [SET_ISAUTH] (state, auth) {
        state.is_authenticated = auth;
    },
    [SET_IS_ADMIN] (state, admin) {
        state.is_admin = admin;
    },
    [SET_LOGOUT] (state) {
        state.token = '';
        state.is_authenticated = false;
        state.username = '';
        state.have_unread_bulletin = false;
    },
    [SET_LOGIN] (state, payload) {
        state.token = payload.token;
        state.username = payload.username;
        state.is_authenticated = true;
        state.is_admin = payload.is_admin;
        state.is_student = payload.is_student;
        // commit(SET_TOKEN, payload.token);
        // commit(SET_USERNAME, payload.username);
        // commit(SET_ISAUTH, true);
    },
    [SET_TOKEN_LOGIN] (state, token) {
        state.token = token;
        state.is_authenticated = true;
        // commit(SET_TOKEN, token);
        // commit(SET_ISAUTH, true);
        // commit()
    },
    [SET_UNREAD_BULLETIN] (state, value) {
        state.have_unread_bulletin = value;
    }
};
const actions = {
    // [CHECK_LOGIN] ({ commit }) {
    //     return new Promise(async(resolve, reject) => {
    //         api.get('/user/get_curr_user').then((r) => {
    //             commit(SET_USERNAME, r.username);
    //             resolve(r)
    //         }).catch((e) => {
    //             commit(SET_LOGOUT);
    //             reject(e)
    //         })
    //     })
    // },
};

export default {
    state,
    actions,
    mutations,
    getters
};
