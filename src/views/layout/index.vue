<template>
  <div class="app-wrapper">
    <!-- <div class="header">我是头部</div> -->
    <div class="headerBox">
      <Header class="header"></Header>
    </div>

    <div class="mainBox">
      <sidebar class="sidebar-container" id="sideBar"></sidebar>
      <div class="main-container" id="mainContainer">
        <app-main></app-main>
      </div>
    </div>
    <div class="footBox"></div>
  </div>
</template>
<script>
import Header from "@/views/layout/components/Header.vue"; //页面布局的右侧区域
import AppMain from "@/views/layout/components/AppMain"; //页面布局的右侧区域
import sidebar from "@/views/layout/components/sidebar"; //页面布局的左侧菜单
export default {
  name      : "layout",
  components: {
    sidebar,
    AppMain,
    Header
  }
};
</script>

<style scoped>
#app .app-wrapper {
  position: relative;
  height  : 100%;
  width   : 100%;
}
.header {
  padding: 0px 20px;
  height : 60px;
  /* background-color: rgb(239, 242, 247); */
  /* color           : white; */
}
#app .sidebar-container {
  /* margin-top: 50px;
  position  : absolute;
  height    : 100%;
  overflow  : auto; */
}
.main-container {
  background-color: #d9e0e7;
  /* height          : 869px; */
  overflow        : auto;
}
.headerBox {
  overflow: hidden;
  height  :50px;
  /* background-color: rgb(84, 92, 100); */
  /* border-bottom: 1px solid rgba(255,255,255,0.5); */
}
.mainBox {
  height: 92%;
  position: relative;
}
.footBox {
  height: 2%;
}
</style>
