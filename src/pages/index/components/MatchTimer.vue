<template>
    <b-card class="text-center">
        <b-card-title><small>{{ stateText }}</small></b-card-title>
        <kbd>{{days}}</kbd> 天 <kbd>{{hours}}</kbd> 时 <kbd>{{minutes}}</kbd> 分 <kbd>{{seconds}}</kbd> 秒
    </b-card>
</template>>

<script>
    import { mapState } from 'vuex'
    import match from "@/util/match";

    export default {
        name: "MatchTimer",
        data() {
            return {
                timer: null,
                stateText: '距离比赛结束还有',
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00'
            }
        },
        computed: {
            ...mapState(['config'])
        },
        methods:{
            zeroPadding(i) {
                let s = i.toString();
                if (s.length < 2) {
                    return '0' + s;
                } else {
                    return s;
                }
            },
            refreshTime() {
                if (!match.isStarted) {
                    this.stateText = '距离比赛开始还有';
                } else if (match.isOpen) {
                    this.stateText = '距离比赛结束还有';
                } else {
                    this.stateText = '比赛已结束';
                }
                let remainTime = match.remainTime;

                remainTime = Math.floor(remainTime / 1000);
                let s = remainTime % 86400;
                let m = s % 3600;
                this.days = this.zeroPadding(Math.floor(remainTime / 86400));
                this.hours = this.zeroPadding(Math.floor(s / 3600));
                this.minutes = this.zeroPadding(Math.floor(m / 60));
                this.seconds = this.zeroPadding(m % 60);
            }
        },
        mounted() {
            this.refreshTime();
            this.timer = setInterval(this.refreshTime, 1000)
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped>

</style>
