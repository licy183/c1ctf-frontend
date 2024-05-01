import { SET_BULLETIN } from '@/util/store-types'
const state = {
    bulletin: null
};
const getters = {

};
const mutations = {
    [SET_BULLETIN] (state, bulletin) {
        state.bulletin = bulletin;
    },
};
const actions = {

};

export default {
    state,
    actions,
    mutations,
    getters
};
