<template>
    <div>
        <b-card no-body class="challenge-category mt-1" v-for="i in challenge.category"  v-bind:key="i.category_id">
            <b-card-header v-b-toggle="`collapse-${i.category_id}`" class="d-flex justify-content-between">
                <h5 class="mb-0">{{i.name}}</h5>
                <font-awesome-icon icon="angle-right" class="mt-1" pull="right"/>
            </b-card-header>
            <b-collapse :id="`collapse-${i.category_id}`" accordion="challenge-category" >
                <b-list-group flush>
                    <template v-for="j in challenge.open_challenge[i.name]">
                        <b-list-group-item
                                v-bind:key="j.challenge_id"
                                :to="{ name: 'ChallengeDetail', params: { challenge_id: j.challenge_id }}"
                                class="" v-if="matchIsStarted || challenge.solved_challenge.includes(j.challenge_id) || user.is_admin">

                            <b-row class="align-items-center">

                                <b-col cols="8">
                                    {{j.title}}
                                </b-col>
                                <b-col cols="3" class="no-padding-right">
                                    {{j.score}}
                                </b-col>
                                <b-col cols="1" class="no-padding-left">
                                    <template v-if="challenge.solved_challenge.includes(j.challenge_id)">
                                        <b-badge variant="success" pill>&#x2713;</b-badge>
                                    </template>
                                </b-col>

                            </b-row>

                        </b-list-group-item>
                    </template>

                </b-list-group>
            </b-collapse>
        </b-card>

    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import match from "@/util/match";

    export default {
        name: "ChallengeList",
        computed: {
            ...mapState(['challenge', 'user']),
            matchIsOpen() {
                return match.isOpen;
            },
            matchIsStarted() {
                return match.isStarted;
            }
        },
        data() {
            return {

            }
        },
        mounted () {

        },
        props: ['callback']
    }
</script>

<style scoped>
    /* 折叠时不显示最下面的横线（不然看着有重影） */
    .challenge-category>.card-header[aria-expanded="false"] {
        border: 0;
    }
    /* 箭头动画配置 */
    .challenge-category>.card-header>svg {
        float: right;
        transition: all 0.5s;
    }
    /* 折叠时箭头动画 */
    .challenge-category>.card-header[aria-expanded="true"]>svg {
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    .card-header {
        cursor:hand;
    }
    .no-padding-right {
        padding-right: 0;
    }
    .no-padding-left {
        padding-left: 0;
    }
</style>
