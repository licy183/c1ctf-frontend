import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/user"
import config from "@/store/config";
import challenge from "@/store/challenge";
import container from "@/store/container";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user, config, challenge, container
    },
});
