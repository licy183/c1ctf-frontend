<template>
    <b-container fluid>
        <b-row class="mt-3">
            <b-col offset-md="2" md="8">
                <template v-for="b in bulletins">
                    <b-card class="mb-2"  v-bind:key="b.bulletin_id" v-if="b.is_sticky" >
                        <b-badge variant="primary" class="float-right">置顶</b-badge>
                        <b-card-title>
                            {{b.title}}
                        </b-card-title>
                        <b-card-sub-title class="mt-2 mb-2">{{timeToString(b.publish_time)}}</b-card-sub-title>
                        <div v-html="b.content"></div>
                    </b-card>
                </template>
                <template v-for="b in bulletins">
                    <b-card class="mb-2"  v-bind:key="b.bulletin_id" v-if="!b.is_sticky" >
                        <b-card-title>{{b.title}}</b-card-title>
                        <b-card-sub-title class="mt-2 mb-2">{{timeToString(b.publish_time)}}</b-card-sub-title>
                        <div v-html="b.content"></div>
                    </b-card>
                </template>

            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import api from '@/util/api'
    import time from "@/util/time";
    export default {
        name: "bulletin",
        components: {},
        data() {
            return {
                bulletins: []
            }
        },
        computed: {

        },
        methods:{
            timeToString(t){
                return time.timeToString(t);
            }
        },
        mounted() {
            api.get('/bulletin/get_all_bulletin').then((bulletins) => {
                this.bulletins = bulletins;

            })
        }
    }
</script>

<style scoped>

</style>
