<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <div v-if="$route.path=='/assessLevel'">
      <router-view/>
    </div>
    <div v-else> -->
      <el-scrollbar style="height:100%">
        <router-view v-if="isRouterAlive"/>
      </el-scrollbar>
    <!-- </div> -->

  </div>
</template>
<script>
export default {
  name: 'app',
  provide(){
      return{
        reload: this.reload
      }
    },
    data(){
      return {
        isRouterAlive: true,
      }
    },
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true
        });
      },
    },
    // created() {

    // },

}
</script>

<style>
@import './assets/font/font.css';
@import './assets/font/font1.css';
html,body{
  margin: 0px;
  width : 100%;
  height: 100%;
  font-size: 14px;
}
#app {
  font-family            : 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align             : center;
  color                  : #2c3e50;
  width                  : 100%;
  height                 : 100%;
}
.el-scrollbar__view{
  height: 100%;
}
#app .el-scrollbar .el-scrollbar__wrap {overflow-x: hidden;}
#app .el-form-item.is-required .el-form-item__label:before {
    content: '';
    color: #f56c6c;
    margin-right: 0px;
}
#app .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, #app .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
  content: '';
  color: #f56c6c;
  margin-right:0px;
}
.el-form-item.is-required .el-form-item__label:after {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
}
.el-select-dropdown__wrap{
      margin-bottom: 0px!important;
}

/* 字体设置相关 */
.el-table--mini {
    font-size: 14px!important;
}
.el-collapse-item__content{
  font-size: 14px!important;
}
.el-collapse-item__header{
  font-size: 14px!important;
}
.el-input__inner{
  font-size: 14px!important;
}
.el-form-item__label{

}
.el-table{
  font-size:14px!important;
}
</style>
<style>
/* 表头位置错乱解决 */
body .el-table th.gutter{
display: table-cell!important;
}
body .el-table colgroup.gutter{
display: table-cell!important;
}
</style>

