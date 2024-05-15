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
                    <span class="float-right" v-if="current_challenge.id != 0">
                        <b-link v-b-modal.solved-top3>已解决：{{ solved_count }}</b-link>
                    </span>
                    <b-card-title>
                        {{ current_challenge.title }}
                    </b-card-title>
                    <!-- 容器链接 -->
                    <template v-if="current_challenge.is_container">
                        <hr>
                        <template v-if="current_container.is_allocated">
                            <template v-if="current_container.is_created">
                                <challenge-url :url="current_container.url"/>
                                <span class="float-right">
                                    <span class="pr-2"></span>
                                        <container-timer :expire="current_container.expire"
                                                         @expired="remove_container(current_challenge.id)" class="pr-2"/>
                                        <b-link @click.prevent="renewContainer(current_challenge.id)" class="pr-2">续期</b-link>
                                        <b-link @click.prevent="freeContainer(current_challenge.id)">删除环境</b-link>
                                    </span>
                            </template>
                            <template v-else>
                                <!-- current_container.is_created - else -->
                                <b-spinner variant="secondary" small/>
                                正在创建环境...
                            </template>
                        </template>
                        <!-- current_container.is_allocated -else -->
                        <b-link @click.prevent="allocContainer(current_challenge.id)" v-else>创建环境</b-link>
                    </template>
                    <!-- 普通题目 且 题目链接不为空 -->
                    <template v-else-if="current_challenge.url != null && current_challenge.url.length > 0">
                        <hr>
                        <challenge-url :url="current_challenge.url"/>
                    </template>
                    <hr>
                    <div v-html="current_challenge.introduction"></div>
                    <template v-if="current_challenge.id != 0 && matchIsOpen">
                        <hr>
                        <submit-flag :challengeId="current_challenge.id"/>
                    </template>
                </b-card>
            </b-col>
            <b-col md="4" lg="4" xl="3">
                <match-timer/>
            </b-col>
        </b-row>
        <!-- 已解题用户 -->
        <b-modal size="lg" title="Top 3" id="solved-top3" hide-footer>
            <b-table-lite thead-class="d-none" responsive borderless :items="solved_user"
                          :fields="['index', 'username', 'time']">
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
import ContainerApi from "@/util/api/container";
import {mapState} from "vuex"
import MatchTimer from "@/pages/index/components/MatchTimer";
import ChallengeList from "@/pages/index/components/ChallengeList";
import {
    SET_CATEGORY,
    SET_OPEN_CHALLENGE,
    SET_SOLVED_CHALLENGE,
    ADD_CHALLENGE_DETAIL,
    SET_CREATED_CONTAINER, DELETE_CONTAINER_INFO, ADD_CREATED_CONTAINER
} from "@/util/store-types";
import SubmitFlag from "@/pages/index/components/SubmitFlag";
import time from "@/util/time";
import match from "@/util/match";
import ChallengeUrl from "@/pages/index/components/ChallengeUrl";
import ContainerTimer from "@/pages/index/components/ContainerTimer";

export default {
    name: "Challenge",
    components: {ContainerTimer, ChallengeUrl, SubmitFlag, ChallengeList, MatchTimer},
    methods: {
        format_time(t) {
            return time.timeToString(t);
        },
        /* 前端移除容器 */
        remove_container(challenge_id) {
            this.current_container = {is_allocated: false, is_created: false, url: null}
            this.$store.commit(DELETE_CONTAINER_INFO, challenge_id);
        },
        allocContainer(challenge_id) {
            ContainerApi.alloc(challenge_id).then(msg => {
                this.$root.$bvToast.toast(msg, {title: '题目环境创建成功', variant: 'success', autoHideDelay: 1500});
                this.loadContainer(challenge_id)
            }).catch(e => {
                this.$root.$bvToast.toast(e, {title: '题目环境创建失败', variant: 'danger', autoHideDelay: 1500});
            })
        },
        renewContainer(challenge_id) {
            ContainerApi.renew(challenge_id).then(msg => {
                this.$root.$bvToast.toast(msg, {title: '题目环境续期成功', variant: 'success', autoHideDelay: 1500});
                this.loadContainer(challenge_id);
            }).catch(e => {
                this.$root.$bvToast.toast(e, {title: '题目环境续期失败', variant: 'danger', autoHideDelay: 1500});
            });
        },
        freeContainer(challenge_id) {
            ContainerApi.free(challenge_id).then(msg => {
                this.$root.$bvToast.toast(msg, {title: '题目环境回收成功', variant: 'success', autoHideDelay: 1500});
                this.remove_container(challenge_id);
            }).catch(e => {
                this.$root.$bvToast.toast(e, {title: '题目环境回收失败', variant: 'danger', autoHideDelay: 1500});
            });
        },
        loadContainer(challenge_id) {
            ContainerApi.get(challenge_id).then(container_info => {
                this.current_container = container_info;
                if (this.current_container.is_allocated && !this.current_container.is_created) {
                    this.container_reloader = setTimeout(() => {
                        this.loadContainer(challenge_id)
                    }, 2000);
                }
                if (this.current_container.is_created) {
                    // this.current_challenge.url.replace("%host%", this.current_container.host);
                    // this.current_challenge.url.replace("%port%", this.current_container.port);
                    this.$store.commit(ADD_CREATED_CONTAINER, challenge_id);
                }
            }).catch(() => {
                this.remove_container(challenge_id);
                // this.$root.$bvToast.toast(e, {title: '题目环境加载失败', variant: 'danger', autoHideDelay: 1500});
            });
        },
        async loadChallenge(challenge_id) {
            if (this.challenge.challenge_detail == null || this.challenge.challenge_detail[challenge_id] == null) {
                let challenge_detail = await api.post('/challenge/get_challenge_detail', {challenge_id: challenge_id});
                this.current_challenge = challenge_detail;
                this.$store.commit(ADD_CHALLENGE_DETAIL, {id: challenge_id, detail: challenge_detail});
            } else {
                this.current_challenge = this.challenge.challenge_detail[challenge_id];
            }
            this.current_challenge.id = challenge_id;

            if (this.current_challenge.is_container) {
                this.loadContainer(this.current_challenge.id)
            }
        },
        loadSolvedCount(challenge_id) {
            api.post('/challenge/get_solved_user', {challenge_id: challenge_id}).then((data) => {
                this.solved_user = data.solved_users;
                this.solved_count = data.solved_count;
            })
        },
        loadCurrentChallenge() {
            if (this.$route.params.challenge_id != null && this.$route.params.challenge_id !== this.challenge.id) {
                this.loadChallenge(Number(this.$route.params.challenge_id));
                this.loadSolvedCount(Number(this.$route.params.challenge_id));
            }
        }
    },
    data() {
        return {
            current_challenge: {
                title: '欢迎参加' + process.env.VUE_APP_CTF_NAME,
                introduction: '请选择题目开始答题',
                score: 0,
                url: '',
                is_container: false,
                id: 0,
            },
            current_container: {
                expire: 0,
                is_created: false,
                is_allocated: false,
                url: '',
            },
            solved_user: null,
            solved_count: 0,
            container_reloader: null,
        }
    },
    computed: {
        ...mapState(['challenge', 'container']),
        matchIsOpen() {
            return match.isOpen;
        }
    },
    async created() {
        if (this.container.created_container == null) {
            let created_container = await ContainerApi.list();
            this.$store.commit(SET_CREATED_CONTAINER, created_container);
        }
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
        $route() {
            this.loadCurrentChallenge();
            if (this.container_reloader) {
                clearTimeout(this.container_reloader);
                this.container_reloader = null;
            }
        }
    },
}
</script>

<style scoped>

</style>
