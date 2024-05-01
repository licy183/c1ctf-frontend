<template>
    <el-scrollbar class="main-scrollbar" :native="false">
        <router-view/>
    </el-scrollbar>

</template>

<script>
    export default {
        name: "Main",
    }
</script>

<style scoped>
    .main-scrollbar {
        height: calc(100vh - 60px);
    }
    .main-scrollbar>>> .el-scrollbar__wrap{
        overflow-x: hidden;
    }

</style>
