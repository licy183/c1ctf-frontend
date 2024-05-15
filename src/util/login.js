import router from "@/pages/index/router";
import store from "@/store/index";
import api from "@/util/api"
import {
    SET_LOGOUT,
    SET_TOKEN_LOGIN,
    SET_USERNAME,
    SET_IS_ADMIN,
    CLEAR_CHALLENGE,
    CLEAR_CONTAINER
} from "@/util/store-types";

let login = new class Login {
    logout () {
        store.commit(SET_LOGOUT);
        store.commit(CLEAR_CHALLENGE);
        store.commit(CLEAR_CONTAINER);
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        try{
            router.push({name: 'Index'});
            // eslint-disable-next-line no-empty
        } catch (e) {

        }
    }

    autoLogin() {
        return new Promise(async (resolve, reject) => {
            let token = sessionStorage.getItem('token');
            if (!token) {token = localStorage.getItem('token')}
            if (token) {
                store.commit(SET_TOKEN_LOGIN, token);
                api.get('/user/get_curr_user').then((r) => {
                    store.commit(SET_USERNAME, r.username);
                    store.commit(SET_IS_ADMIN, r.is_admin);
                    resolve(r)
                }).catch((e) => {
                    if (e.response != null && e.response.status === 400) {
                        store.commit(SET_LOGOUT);
                        sessionStorage.removeItem('token');
                        localStorage.removeItem('token');
                    }
                    reject(e);

                })
            } else {
                reject("cannot find token");
            }
        });

    }
    get isLogin() {
        return store.state.user.is_authenticated;
    }
    get isAdmin() {
        return store.state.user.is_admin;
    }
};
export default login;
