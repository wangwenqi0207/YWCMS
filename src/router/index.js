import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/main/login.vue'
import Shouye from '../views/layout/index.vue'
import error from '../views/error/index.vue'

import orderDetail from '../views/core/order_detail'
import accessQuestionType from '../views/access/access_question_type_mng';
import accessQuestionMng from '../views/access/access_question_mng';
import accessQuestion from "../views/access/access_question"
import costInfoDeatil from "../views/nursing/cost_info_detail.vue"
import nursingCostDeatil from "../views/nursing/nursing_cost_detail.vue"
import nursingCostDeatil2 from "../views/nursing/nursing_cost_detail2.vue"
import nursingOrgDetail from "../views/nursing/nursing_org_detail"

import userInfoDetail from "../views/core/user_info_detail.vue"
import userBasicInfoDetail from "../views/core/user_basic_info_detail.vue"
import assessAttendDetail from "../views/core/assess_attend_detail.vue"



import assessLevel from "../views/core/assessLevel.vue"
import consult from "../views/core/consult.vue"

import smartDevice from "../views/core/smart_device.vue"



// import user_info from "../views/core/user_info.vue"

// import Login from '../views/main/login.vue'
Vue.use(Router)
var constantRouterMap = [
  {
    "path"     : "/",
    "component": Login,
    'hidden'   : true
  },
  {
    "path"     : "/shouye",
    "component": Shouye,
    'hidden'   : true,
    children   : [
      {
        "path"     : "access_question_type",
        "component": accessQuestionType
      },
      {
        "path"     : "access_question_mng",
        "component": accessQuestionMng
      },
      {
        "path"     : "cost_info_detail",
        "component": costInfoDeatil
      },
      {
        "path"     : "nursing_cost_detail",
        "component": nursingCostDeatil
      },
      {
        "path"     : "nursing_cost_detail2",
        "component": nursingCostDeatil2
      },
    ]
  },
  {
    "path"     : "/access_questions",
    "component": Shouye,
    'hidden'   : true,
    children   : [
      {
        "path"     : "access_question_type",
        "component": accessQuestionType
      },
      {
        "path"     : "access_question_mng",
        "component": accessQuestionMng
      }
    ]
  },
  {
    "path"     : "/nursing_orgs",
    "component": Shouye,
    'hidden'   : true,
    children   : [
      {
        "path"     : "nursing_org_detail",
        "component": nursingOrgDetail
      },
    ]
  },
  {
    "path"     : "/nursing_orgs",
    "component": Shouye,
    'hidden'   : true,
    children   : [
      {
        "path"     : "nursing_org_detail",
        "component": nursingOrgDetail
      }
    ]
  },
  {
    "path"     : "/orderMng",
    "component": Shouye,
    'hidden'   : true,
    children   : [
      {
      path     : 'order_detail',
      component: orderDetail,
      },

    ]
  },
  {
    "path"     : "/userInfo",
    "component": Shouye,
    'hidden'   : true,
    children   : [
      {
        path     : 'user_info_detail',
        component: userInfoDetail,
      },
      {
        path     : 'smart_device',
        component: smartDevice,
      },

    ]
  },

  {
    "path"     : "/userBasicInfo",
    "component": Shouye,
    'hidden'   : true,
    children   : [
      {
      path     : 'user_basic_info_detail',
      component: userBasicInfoDetail,
      },

    ]
  },

  {
    "path":'/assessAttendCount',
    "component":Shouye,
    'hidden':true,
    children:[
      {
        "path":"assess_attend_detail",
        "component":assessAttendDetail
      }
    ]
  },
  {
    "path":"/insurance-intact-cms",
    "component": Shouye,
    'hidden'   : true,
    children   : [
      {
        "path":"error",
        "component":error
      }
    ]
  },
  {
    "path":"/assessLevel",
    "component": assessLevel,
  },
  {
    "path":"/consult",
    "component": consult,
  }
  // history
  // { path: '*', component: Shouye }
]
export default new Router({
  routes: constantRouterMap
})


// 尝试history模式
// const router = new VueRouter({
//   mode: 'history',
//   routes: [
//     { path: '*', component: NotFoundComponent }
//   ]
// })
// export default new Router({
//   mode: 'history',
//   routes: constantRouterMap
// })

