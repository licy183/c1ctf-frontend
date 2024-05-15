<template>
    <div class="header">
        <el-row class="header-row" style="display: flex; align-items:center; ">
          {{CTF_NAME}} 后台管理
            <el-dropdown style="line-height: normal; margin-left:auto;margin-right: 20px;">
              <span>
                {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><el-link :underline="false" href="index.html"> 返回前台</el-link></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-row>

    </div>

</template>

<script>
    import {mapState} from "vuex"
    export default {
        name: "Header",
        data () {
          return {
            CTF_NAME: process.env.VUE_APP_CTF_NAME
          }
        },
        computed: mapState([
            'user'
        ]),
    }
</script>

<style scoped>
    .header {
        height: 56px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);

    }
    .header>.header-row {
        line-height: 60px;
        margin-left: 20px;
        position:relative;
    }
</style>
