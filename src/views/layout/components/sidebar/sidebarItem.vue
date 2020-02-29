<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <router-link
        v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow"
        :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name"
        style="text-align:left;"
      >
        <el-menu-item
          :index="item.path+'/'+item.children[0].path"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <i class="el-icon-document"></i>
          <span
            v-if="item.children[0].meta&&item.children[0].meta.title"
          >{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name" style="text-align:left;">
        <template slot="title">
          <!-- <i class="el-icon-menu" size="mini"></i> -->
          <i class="icon-alicaidan" size="mini"></i>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children">
          <sidebar-item
            :is-nest="true"
            class="nest-menu"
            v-if="child.children&&child.children.length>0"
            :routes="[child]"
            :key="child.path"
          ></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <i class="icon-alierjicaidan"></i>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "sidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    // console.log(this.routes);
  }
};
</script>
<style scoped>
.el-submenu [class^="el-icon-"] {
  vertical-align: middle;
  margin-right: -4px;
  width: 24px;
  text-align: center;
  font-size: 14px;
}
.el-menu-item,
.el-submenu__title {
  height: 38px !important;
  line-height: 38px !important;
  position: relative;
  -webkit-box-sizing: border-box;
  white-space: nowrap;
  list-style: none;
}
</style>
