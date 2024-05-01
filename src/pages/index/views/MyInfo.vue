<template>
    <login-card title="个人信息" >
        <b-container fluid>
            <b-row class="mt-2">
                <b-col cols="4">用户名</b-col>
                <b-col cols="8">{{user.username}}</b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col cols="4">邮箱</b-col>
                <b-col cols="8">{{user.email}}</b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col cols="4">当前排名</b-col>
                <b-col cols="8">{{user.rank + 1}}</b-col>
            </b-row>
            <template v-if="user.is_student">
                <b-row class="mt-2">
                    <b-col cols="4">学号</b-col>
                    <b-col cols="8">{{user.student_id}}</b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col cols="4">姓名</b-col>
                    <b-col cols="8">{{user.student_name}}</b-col>
                </b-row>
            </template>

        </b-container>

    </login-card>
</template>

<script>
    import LoginCard from "@/pages/index/components/LoginCard";
    import api from  "@/util/api";
    export default {
        name: "MyInfo",
        components: {LoginCard},
        data() {
            return {
                user: {},
            }
        },
        mounted() {
            api.get('/user/get_curr_user').then(user => {
                this.user = user;
            })
        }
    }
</script>

<style scoped>

</style>
