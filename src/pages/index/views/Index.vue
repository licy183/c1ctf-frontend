<template>
    <b-container class="mt-3">
        <b-row class="mt-3 d-flex justify-content-center">
            <b-col cols="12">
                <match-timer/>
                <b-card class="mt-3">
                    <b-card-title>
                        C1CTF 网络安全竞赛
                    </b-card-title>
                    <h5>比赛时间</h5>
                    <p>1970-01-01 00:00:00 - 1970-01-01 20:00:00 (中国标准时间)</p>
                    <h5>报名方式</h5>
                    <p>参赛选手需在比赛平台注册，本校学生请使用校内统一认证登录。</p>
                    <p>比赛相关通知见QQ群:<b-link target="_blank"  href="qqlink">这是QQ群号</b-link>。</p>
                    <p>校内选手务必在注册时选择<b>校内用户</b></p>
                    <p>平台地址：<b-link>https://c1ctf.c1sec.club/c1ctf2019/</b-link></p>
                    <h5>比赛方式</h5>
                    <p>个人参赛，不允许组队，选手可在规定的竞赛时间内自行答题。</p>
                    <h5>评分标准</h5>
                    <li>竞赛成绩排名(80%)</li>
                    <p>将Web、Misc、Crypto、Reverse、Pwn五个方向分数总和作为比赛结果评定主要依据。</p>
                    <li>比赛题解(20%)</li>
                    <p>为保证比赛公平公正，保证参赛者独立完成试题，比赛过后需要提交题解，题解发送至邮箱contact@c1sec.club。对于在比赛结束24h内未提交题解者按照中途放弃比赛处理，不予排名。</p>
                    <h5>奖项设置</h5>
                    <p>本次比赛颁奖对象为：本校在校学生</p>
                    <li>一等奖1名，奖品待定</li>
                    <li>二等奖2名，奖品待定</li>
                    <li>三等奖3名，奖品待定</li>
                    <li>优秀奖若干</li>
                    <p>组委会将对获奖选手颁发证书及奖品。</p>
                    <h5>注意事项</h5>
                    <li>得分与排名刷新有延时，提交答案后过一会儿即可看到排名更新。</li>
                    <li>比赛过程中禁止交换比赛题目答案及解题思路。</li>
                    <li>比赛过程中不可对比赛平台进行攻击。如经发现，取消比赛资格。</li>
                    <li>如发现比赛平台漏洞，及时联系邮箱：contact[at]c1sec.club，有适当加分奖励。</li>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>


    import MatchTimer from "@/pages/index/components/MatchTimer";
    export default {
        name: "Index",
        components: {MatchTimer},
        data() {
            return{

            }
        },

    }
</script>

<style scoped>

</style>
