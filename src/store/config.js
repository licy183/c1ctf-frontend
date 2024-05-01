// eslint-disable-next-line no-unused-vars
import {SET_BEGIN_TIME, SET_END_TIME, SET_IS_REGISTER_OPEN } from '@/util/store-types'
const state = {
    beginTime: 0,
    endTime: 0,
    isRegisterOpen: false
};
const getters = {
    // // 比赛是否已经开始
    // isGameStart() {
    //     return state.beginTime < new Date().getTime();
    // },
    // // 比赛是否已经结束
    // isGameEnd() {
    //     return state.endTime < new Date().getTime();
    // },
    // // 比赛是否正在进行
    // isGameOpen() {
    //     // return isGameStart() && !isGameEnd();
    // }
};
const mutations = {
    [SET_BEGIN_TIME] (state, beginTime) {
        state.beginTime = new Date(beginTime);
    },
    [SET_END_TIME] (state, endTime) {
        state.endTime = new Date(endTime);
    },
    [SET_IS_REGISTER_OPEN] (state, open) {
        state.isRegisterOpen = open;
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
