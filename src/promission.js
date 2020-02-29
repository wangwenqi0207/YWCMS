import router from './router';
// import { Message } from 'element-ui'
import axios from 'axios';
const _import = require('./router/_import_' + process.env.NODE_ENV);  //获取组件的方法
import Layout from '@/views/layout'; //Layout 是架构组件，不在后台返回，在文件里单独引入

import Login from './views/main/login.vue';
import store from './store/index.js';
import Shouye from './views/layout/index.vue';

// import userInfoDetail from "@/views/core/user_info_detail.vue"


var getRouter;
//用来获取后台拿到的路由

router.beforeEach((to, from, next) => {
  // 当登录路由出现的时候直接进行下一步，如果不是登录路由的时候在进行判断存储
  // else if(next.path='/'){
  //   next();
  // }
  // console.log('11',to.path)
  if (to.path == '/'){
    next();
  }else if(to.path=='/assessLevel' || to.path=='/consult'){
    next();
  }else {
    // if(!getRouter)这一步判断很重要，如果没有，路由就会陷入死循环
    if(!getRouter){

      if(getObjArr('router') && getObjArr('router')!=[]){
      getRouter = getObjArr('router');


      routerGo(to, next);
      // next();
    }else{
      // this.$router.push({ path: "/" });
      window.location.href = 'http://192.168.1.115:8081/#/'
    }
    }else{
      next()
    }
  }
  // console.log(store.state.getRouter)
  // if (store.state.getRouter!=1 && !getRouter) {//不加这个判断，路由会陷入死循环
});
function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter);  //过滤路由
  router.addRoutes(getRouter); //动态添加路由
  global.antRouter = getRouter;  //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true });
}

function saveObjArr(name, data) {
  //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data));
}

function getObjArr(name) {
  //localStorage 获取数组对象的方法

  return JSON.parse(window.localStorage.getItem(name));
}

function filterAsyncRouter(asyncRouterMap) {
  //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        //Layout组件特殊处理
        route.component = Layout;
      } else {
        route.component = _import(route.component);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });

  return accessedRouters;
}

