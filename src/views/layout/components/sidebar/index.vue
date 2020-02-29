<template>
  <div>
    <el-scrollbar style="height:100%">
      <div>
        <i
          @click="zankai"
          style="position:absolute;right:1px;top:0px;z-index:100;display:block;cursor:pointer;background:#d9e0e7;"
          class="el-icon-caret-left"
        ></i>
        <el-menu
          unique-opened
          :default-active="value1"
          background-color="#26384D"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <sidebar-item :routes="routes"></sidebar-item>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import sidebarItem from "./sidebarItem";

export default {
  data() {
    return {
      isCollapse: false,
      value1: null
    };
  },
  components: { sidebarItem },
  computed: {
    routes() {
      return global.antRouter;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    zankai() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse == true) {
        $("#sideBar").attr(
          "style",
          "position:absolute;height:100%;overflow:auto;width:22px!important;"
        );
        $("#mainContainer").attr(
          "style",
          "background-color:#d9e0e7;overflow:auto;margin-left:22px!important"
        );
      } else {
        $("#sideBar").attr(
          "style",
          "position:absolute;height:100%;overflow:auto;"
        );
        $("#mainContainer").attr(
          "style",
          "background-color:#d9e0e7;overflow:auto;"
        );
      }
    }
  },
  mounted() {
    this.value1 = this.$route.path; //当前路由
  },
  watch: {
    value1: function() {
      this.value1 = this.$route.path;
    }
  }
};
</script>
<style scoped>
.el-scrollbar__view{
  height: 100%;
}
</style>

