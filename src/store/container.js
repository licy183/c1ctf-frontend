import {
    SET_CREATED_CONTAINER,
    CLEAR_CONTAINER,
    ADD_CREATED_CONTAINER,
    ADD_CONTAINER_INFO,
    DELETE_CONTAINER_INFO
} from '@/util/store-types'
const state = {
    /*
     [1,2,3]
     */
    created_container: null,
    /*
    [
      {title: "test web", introduction: "test flag{111}", score: 200, url: "http://example.com",}
    ]
    */
    container_info: [],
};
const getters = {

};
const mutations = {
    [SET_CREATED_CONTAINER](state, data) {
        state.created_container = data;
    },
    [ADD_CREATED_CONTAINER](state, challenge_id) {
        if(!state.created_container.includes(challenge_id)) {
            state.created_container.push(challenge_id);
        }
    },
    [ADD_CONTAINER_INFO](state, data) {
        if (state.container_info == null) {
            state.container_info = [];
        }
        state.container_info[data['id']] = data['detail'];
    },
    [DELETE_CONTAINER_INFO](state, challenge_id) {
        try {
            delete state.container_info[challenge_id];
        } catch (e){
            // eslint-disable-next-line no-empty

        }
        try {
            let i = state.created_container.indexOf(challenge_id);
            if(i !== -1) {
                state.created_container.splice(i, 1);
            }
        } catch (e) {
            // eslint-disable-next-line no-empty
        }

    },
    [CLEAR_CONTAINER](state) {
        state.created_container = null;
        state.container_info = [];
    },
}
const actions = {

};

export default {
    state,
    actions,
    mutations,
    getters
};
