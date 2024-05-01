import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from '../store';
// import el from "element-ui/src/locale/lang/el";

// import { API_URL } from "./config"

const Api = {
    constructor() {
        Vue.use(VueAxios, axios);
        axios.interceptors.request.use(
            config => {
                if (store.state.user.is_authenticated === true) {
                    config.headers.Authorization = `Bearer ${store.state.user.token}`
                }
                return config
            },
            error => {
                return Promise.reject(error)
            }
        );

        if (process.env.VUE_APP_API_URL.length > 0) {
            axios.defaults.baseURL = process.env.VUE_APP_API_URL;
        }

    },
    post(resource, params) {
        return new Promise(async (resolve, reject) => {
            axios.post(resource, params).then(
                response => {
                    if (response.data.code === 200) {
                        if (response.data.payload == null) {
                            resolve(response.data.message)
                        } else {
                            resolve(response.data.payload)
                        }
                    } else {
                        reject(response.data.message);
                    }
                }
            ).catch(
                e => {
                    reject(e);
                })
        })
    },
    get(resource) {
        return new Promise(async (resolve, reject) => {
            axios.get(resource).then(
                response => {
                    if (response.data.code === 200) {
                        resolve(response.data.payload);
                    } else {
                        reject(response.data.message);
                    }
                }
            ).catch(
                e => {
                    reject(e);
            })
        })
    }
};

Api.constructor();

export default Api;


