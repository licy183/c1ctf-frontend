
<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <side-menu/>
      </el-aside>
      <el-container style="height: 100vh">
        <el-header>
          <header-comp/>
        </el-header>
        <el-main>
          <main-comp/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import SideMenu from '@/pages/admin/components/SideMenu'
  import HeaderComp from "@/pages/admin/components/Header";
  import MainComp from "@/pages/admin/components/Main";

  export default {
    name: 'App',
    data() {
      return {

      }
    },
    // eslint-disable-next-line vue/no-unused-components
    components: {HeaderComp, MainComp, SideMenu},
    created () {

    },
    mounted () {


    },
    methods: {

    }
  }

</script>

<style scoped>
  .el-header {
    padding: 0;
  }
  .el-main {
    padding: 0;
  }

</style>
<style>
  body { margin: 0 !important; }

</style>
