import {SET_OPEN_CHALLENGE, SET_CATEGORY, SET_SOLVED_CHALLENGE, ADD_SOLVED_CHALLENGE , ADD_CHALLENGE_DETAIL, CLEAR_CHALLENGE } from '@/util/store-types'
const state = {
    /*
    {
        "Web": [
            {
                "title": "test web",
                "score": 200,
                "challenge_id": 1,
                "solved_count": 0
            }
        ]
     }
    */
    open_challenge: null,
    /*
    [
        {
            "name": "Web",
            "category_id": 1
        }
    ]
     */
    category: null,
    /*
     [1,2,3]
     */
    solved_challenge: null,
    /*
    [ {title: "test web", introduction: "test flag{111}", score: 200, url: "http://example.com",}
    ]
    */

    challenge_detail: null
};
const getters = {

};
const mutations = {
    [SET_OPEN_CHALLENGE](state, data) {
        state.open_challenge = data;
    },
    [SET_CATEGORY](state, data) {
        state.category = data;
    },
    [SET_SOLVED_CHALLENGE](state, data) {
        state.solved_challenge = data;
    },
    [ADD_SOLVED_CHALLENGE](state, data) {
        state.solved_challenge.push(data);
    },
    [ADD_CHALLENGE_DETAIL](state, data) {
        if (state.challenge_detail == null) {
            state.challenge_detail = [];
        }
        state.challenge_detail[data['id']] = data['detail'];
    },
    [CLEAR_CHALLENGE](state) {
        state.challenge_detail = [];
        state.solved_challenge = null;
        state.open_challenge = null;
        state.category = null;
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
