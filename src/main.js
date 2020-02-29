import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import '@/utils/global'; //全局
import './promission'; //这里进行路由后台获取的模拟
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'; // global css
import axios from 'axios';
import Vuex from 'vuex';

import store from './store/index.js';
import moment from 'moment';
import '@/assets/icon/iconfont.css'
import '../theme/index.css'
// require ('./mock.js');
// 编辑器相关

// 引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

// 百度地图相关
import 'echarts/extension/bmap/bmap';
import './assets/js/walden.js';

// 跨域相关
import 'babel-polyfill';
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.prototype.HOST = '/api';

require('es6-promise').polyfill();

Vue.use(Vuex);
axios.defaults.withCredentials = true;
Vue.prototype.$axios           = axios;
Vue.prototype.$moment          = moment;

Vue.config.productionTip = false;
Vue.use(ElementUI);
// 图片放大相关3 比较好用
// import Viewer from 'v-viewer';
// import 'viewerjs/dist/viewer.css';

// Vue.use(Viewer, {
//   defaultOptions: {
//     zIndex: 9999,
//     // fullscreen: false
//   }
// });

// Ueditor编辑器相关
Vue.component('vue-ueditor-wrap', VueUeditorWrap);
// 图片放大相关3 比较好用
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    // fullscreen: false
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template  : '<App/>'
});
