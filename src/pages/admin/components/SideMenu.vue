<template>
    <el-scrollbar :native="false">
        <el-menu router :default-active="currentPath" :default-openeds="['1']">
            <el-submenu index="1">
                <template slot="title"><i><font-awesome-icon icon="list-ul" class="icon-margin"/></i>题目管理</template>
                <el-menu-item index="/category" :route="{ name: 'Category'}"><i class="el-icon-collection-tag"></i>分类</el-menu-item>
                <el-menu-item index="/challenge" :route="{ name: 'Challenge'}"><i class="el-icon-tickets"></i>题目</el-menu-item>
            </el-submenu>
            <el-menu-item index="/user" :route="{name: 'User'}"><i class="el-icon-user"></i>用户管理</el-menu-item>
            <el-menu-item index="/bulletin" :route="{name: 'Bulletin'}"><i class="el-icon-chat-line-round"></i>公告管理</el-menu-item>
            <el-menu-item index="/config" :route="{ name: 'Config'}" ><i class="el-icon-setting"></i>系统配置</el-menu-item>
<!--            <el-menu-item index="/ranking" :route="{ name: 'Ranking'}"><i class="el-icon-s-data"></i>排行榜</el-menu-item>-->
            <el-menu-item index="/log" :route="{ name: 'Log'}"><i class="el-icon-monitor"></i>比赛日志</el-menu-item>

        </el-menu>
    </el-scrollbar>
</template>

<script>

    export default {
        name: "Menu",
        data() {
            return {
                currentPath: this.$route.matched[0].path,

            }
        },
        mounted () {

        }
    }
</script>

<style scoped>
    .icon-margin {
        margin-right: 8px;
        margin-left: 4px;
        margin-top: -5px;
        font-size: 16px;
    }
    .el-scrollbar{
        height: 100vh;
        border-right: 1px solid #eee;
    }
    .el-scrollbar>>>.el-scrollbar__wrap{
        overflow-x: hidden;
    }

</style>
<style>

</style>
