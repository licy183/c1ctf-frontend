<template>
    <b-container fluid>
        <b-row class="mt-3">
            <b-col md="3" lg="3" xl="3s">
                <keep-alive>
                    <challenge-list/>
                </keep-alive>
            </b-col>
            <b-col md="5" lg="5" xl="6">

                <b-card>
                    <span class="float-right" v-if="challenge_id != 0">
                        <b-link v-b-modal.solved-top3>已解决：{{solved_count}}</b-link>
                    </span>
                    <b-card-title>
                        {{challenge_title}}
                    </b-card-title>
                    <template v-if="challenge_url != null && challenge_url.length > 0">
                        <hr>
                        <b-link target="_blank" v-if="challenge_url.startsWith('http')" :href="challenge_url">{{challenge_url}}</b-link>
                        <span v-html="challenge_url" v-else></span>

                    </template>
                    <hr>
                    <div v-html="challenge_introduction"></div>
                    <template v-if="challenge_id != 0 && matchIsOpen">
                        <hr>
                        <submit-flag :challengeId="challenge_id" />
                    </template>
                </b-card>
            </b-col>
            <b-col md="4" lg="4" xl="3">
                <match-timer/>
            </b-col>
        </b-row>
        <b-modal size="lg" title="Top 3" id="solved-top3"  hide-footer>
                <b-table-lite thead-class="d-none" responsive borderless :items="solved_user" :fields="['index', 'username', 'time']">
                    <template v-slot:cell(index)="data">
                        {{ data.index + 1 }}
                    </template>
                    <template v-slot:cell(username)="data">
                        {{ data.item.username }}
                    </template>
                    <template v-slot:cell(time)="data">
                        {{ format_time(data.item.solved_time) }}
                    </template>
                </b-table-lite>

        </b-modal>
    </b-container>

</template>

<script>
    import api from '@/util/api'
    import { mapState } from "vuex"
    import MatchTimer from "@/pages/index/components/MatchTimer";
    import ChallengeList from "@/pages/index/components/ChallengeList";
    import {SET_CATEGORY, SET_OPEN_CHALLENGE, SET_SOLVED_CHALLENGE, ADD_CHALLENGE_DETAIL} from "@/util/store-types";
    import SubmitFlag from "@/pages/index/components/SubmitFlag";
    import time from "@/util/time";
    import match from "@/util/match";

    export default {
        name: "Challenge",
        components: {SubmitFlag, ChallengeList, MatchTimer},
        methods: {
            format_time(t){
                return time.timeToString(t);
            },
            loadChallenge(challenge_id) {
                if (this.challenge.challenge_detail == null || this.challenge.challenge_detail[challenge_id] == null) {
                    api.post('/challenge/get_challenge_detail', {challenge_id: challenge_id}).then((challenge_detail) => {
                        this.challenge_title = challenge_detail.title;
                        this.challenge_introduction = challenge_detail.introduction;
                        this.challenge_id = challenge_detail.challenge_id;
                        this.challenge_url = challenge_detail.url;
                        this.challenge_score = challenge_detail.score;
                        this.$store.commit(ADD_CHALLENGE_DETAIL, {id: challenge_id, detail: challenge_detail});
                    })
                } else {
                    let challenge_detail = this.challenge.challenge_detail[challenge_id];
                    this.challenge_title = challenge_detail.title;
                    this.challenge_introduction = challenge_detail.introduction;
                    this.challenge_id = challenge_detail.challenge_id;
                    this.challenge_url = challenge_detail.url;
                    this.challenge_score = challenge_detail.score;
                }

            },
            loadSolvedCount(challenge_id) {
                api.post('/challenge/get_solved_user', {challenge_id: challenge_id}).then((data) => {
                    this.solved_user = data.solved_users;
                    this.solved_count = data.solved_count;
                })
            },
            loadCurrentChallenge() {
                if (this.$route.params.challenge_id != null && this.$route.params.challenge_id !== this.challenge_id) {
                    this.loadChallenge(this.$route.params.challenge_id);
                    this.loadSolvedCount(this.$route.params.challenge_id);
                }
            }
        },
        data() {
            return {
                challenge_title: '欢迎参加C1CTF',
                challenge_introduction: '请选择题目开始答题',
                challenge_score: 0,
                challenge_url: '',
                challenge_id: 0,
                solved_user: null,
                solved_count: 0,
            }
        },
        computed: {
            ...mapState(['challenge']),
            matchIsOpen() {
                return match.isOpen;
            }
        },
        async created() {

            if (this.challenge.solved_challenge == null) {
                let solved_challenge = await api.get('/challenge/get_solved_challenge');
                this.$store.commit(SET_SOLVED_CHALLENGE, solved_challenge);
            }
            if (this.challenge.open_challenge == null) {
                let challenges = await api.get('/challenge/get_open_challenge');
                this.$store.commit(SET_OPEN_CHALLENGE, challenges);
            }
            if (this.challenge.category == null) {
                let category = await api.get('/category/get_all_category');
                this.$store.commit(SET_CATEGORY, category);
            }
        },
        mounted() {
            this.loadCurrentChallenge();
        },
        watch: {
            $route () {
                this.loadCurrentChallenge();
            }
        },
    }
</script>

<style scoped>

</style>
