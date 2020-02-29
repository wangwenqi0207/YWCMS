<template>
  <div style="padding:20px;height:100%;">
    <div style="background:#fff;background:#fff;padding:5px;height:95%;overflow:auto">
      <div el-row style="padding:10px;text-align: left;">
        <el-button type="primary" icon="el-icon-back" size="mini" @click="back">返回</el-button>
      </div>
      <div el-col span="24" class="top">
        <el-form
          :inline="true"
          :model="orderForm"
          ref="orderForm"
          class="demo-form-inline"
          size="mini"
          style="font-size:10px;"
        >
          <el-form-item label="结算月份：" prop="JSNo">
            <el-input
              placeholder
              v-model="balanceMonth"
              style="width: 100px"
              size="mini"
              disabled="disabled"
            />
          </el-form-item>
          <el-form-item label="对账状态" prop="DZStatus" size="mini">
            <el-select
              v-model="orderForm.DZStatus"
              placeholder="请选择"
              style="width:120px"
              @change="changeSelect"
              size="mini"
            >
              <el-option label="全部" value></el-option>
              <el-option label="待发起" value="1"></el-option>
              <el-option label="待对账" value="2"></el-option>
              <el-option label="退回" value="3"></el-option>
              <el-option label="已对账" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结算机构：">
            <el-input placeholder v-model="orderForm.JSOrg" style="width: 80px" size="mini"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="grid-content bg-purple-dark"></div>
      </div>
      <div style="padding:5px;height:80%">
        <el-table
          :data="datalists"
          border
          stripe
          style="width: 100%;text-align:left;overflow:auto"
          @selection-change="handleSelectionChange"
          height="100%"
        >
          <el-table-column prop="code" label="对账单号" width="120"></el-table-column>
          <el-table-column prop="checkStatus" label="对账状态" width="120"></el-table-column>
          <el-table-column prop="balanceMonth" label="结算月份" width="120"></el-table-column>
          <el-table-column prop="orgName" label="护理机构" width="260"></el-table-column>
          <el-table-column prop="nursingNumber" label="护理人数" width="200"></el-table-column>
          <el-table-column prop="nursingCost" label="护理费用" width="200"></el-table-column>
          <el-table-column prop="lifeNursingCost" label="生活护理" width="200"></el-table-column>
          <el-table-column prop="medicalNursingCost" label="医疗护理" width="200"></el-table-column>
          <el-table-column prop="lifeNursingFundCost" label="生活护理基金支付" width="200"></el-table-column>
          <el-table-column prop="medicalNursingFundCost" label="医疗护理基金支付" width="200"></el-table-column>
          <el-table-column prop="medicalNursingPersonalCost" label="医疗护理个人自费" width="200"></el-table-column>
          <el-table-column prop="totalFundCost" label="总基金支付" width="200"></el-table-column>
          <el-table-column prop="totalPersonalCost" label="总个人费用" width="200"></el-table-column>
          <el-table-column prop="reallyCost" label="实时费用" width="200"></el-table-column>
          <el-table-column prop="operation" label="操作" width="280" fixed="right">
            <template slot-scope="scope">
              <div class="state">
                <!-- <el-input
                                                                                                                                                          placeholder = "请输入内容"
                                                                                                                                                          suffix-icon = "el-icon-arrow-right"
                                                                                                                                                        :value        = "scope.row.orderStatus"
                                                                                                                                                          style       = "display:inline-block;width:60%;"
                      readonly
                      @focus = "showDetail(scope.row.orderNo)"
                    >
                </el-input>-->
                <el-button
                  type="success"
                  size="mini"
                  @click.stop="fyDetail(scope.row.checkStatus,scope.row.balanceMonth,scope.row.orgName)"
                >月度明细</el-button>
                <!-- <el-button
                      v-if   = " scope.row.checkStatus=== '待发起' || scope.row.checkStatus=== '退回' && urlRole5==1 "
                      type   = "success"
                      size   = 'mini'
                      @click = "checkCost(scope.row.id)"
                      >发起对账</el-button>
                      <el-button
                      v-if   = "scope.row.checkStatus=== '待对账' && urlRole6==1"
                      type   = "success"
                      size   = 'mini'
                      @click = "finishCost(scope.row.id)"
                      >完成对账</el-button>
                      <el-button
                        v-if   = "scope.row.checkStatus=== '待对账' && urlRole7==1"
                        type   = "success"
                        size   = 'mini'
                        @click = "backCost(scope.row.id)"
                >退回</el-button>-->
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="备注"></el-table-column>
        </el-table>
     </div>
    <!-- 取消的模态框 -->
    <!-- <el-dialog
                                                                                  title       = "对账退回"
                                                                                :visible.sync = "dialogVisible3"
                                                                                  width       = "30%"
                                                                                :before-close = "handleClose3"
      >

        <el-form
          :model = "ruleFormCancel"
          status-icon
          :rules        = "rulesCancel"
            ref         = "ruleFormCancel"
            label-width = "100px"
            class       = "demo-ruleForm"
        >
          <el-form-item
            label = "退回理由："
            prop  = "cancelWhy"
          >

            <el-input
              v-model     = "ruleFormCancel.cancelWhy"
              placeholder = "请输入退回对账的理由"
            ></el-input>

          </el-form-item>

          <el-form-item>
            <el-button
              type   = "primary"
              @click = "submitFormCancel('ruleFormCancel')"
            >提交</el-button>
            <el-button @click="resetFormCancel('ruleFormCancel')">重置</el-button>
          </el-form-item>
        </el-form>
        <span
          slot  = "footer"
          class = "dialog-footer"
          hidden
        >
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button
            type   = "primary"
            @click = "dialogVisible3 = false"
          >确 定</el-button>
        </span>
    </el-dialog>-->
    </div>
    <div class="pageNation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSize"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import base from "../../base/base.js";
import Vue from "vue";
export default {
  mixins: [base],
  inject: ["reload"],
  data() {
    return {
      //分页data
      currentPage: 1,
      pageSize: [10, 20, 30, 50],
      total: 0,
      changePageSize: 10,

      orderForm: {
        JSNo: "",
        DZStatus: 4 + "",
        JSOrg: ""
      },
      //表单相关
      dialogVisible: false,

      //列表相关
      datalists: [],

      //权限按钮相关
      //   urlRole5: 0,
      //   urlRole6: 0,
      //   urlRole7: 0,

      balanceMonth: null,

      // //   退回的理由
      comment: "",
      ruleFormCancel: {
        cancelWhy: null
      },
      currentId: null,
      dialogVisible3: false,
      rulesCancel: {}
    };
  },
  methods: {
    search() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_cost_info_mng/pagination`,
        method: "get",
        params: {
          pageNo: this.currentPage,
          pageSize: this.changePageSize,
          // balanceMonth: this.orderForm.JSNo,
          orgName: this.orderForm.JSOrg,
          checkStatus: this.orderForm.DZStatus,
          balanceMonth: this.balanceMonth
          // checkStatus : 4
          // pageSize: this.pageSize[0],
          // pageNo  : this.currentPage
        }
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        // for(var item of res.data.resultList){

        // }
        this.dataList(res.data.resultList);
      });
    },
    changeSelect(val) {
      // console.log(this.orderForm.select)
    },
    back() {
      this.$router.push({ path: "/nursing_cost" });
    },

    fyDetail(status, balanceMonth, orgName) {
      window.localStorage.setItem("checkStatus", status);
      window.localStorage.setItem("balanceMonth", balanceMonth);
      window.localStorage.setItem("orgName", orgName);
      this.$router.push({ path: "/shouye/nursing_cost_detail2" });
    },
    dataList(tableData) {
      var newdata1 = [];

      var dataArray = tableData;

      dataArray.forEach(el => {
        // if (el.createTime) {
        //   newdata.push(
        //     this.$moment(el.createTime).format("YYYY-MM-DD HH:mm:ss")
        //   );
        // }
        if (el.checkStatus) {
          if (el.checkStatus == 1) {
            newdata1.push("待发起");
          } else if (el.checkStatus == "00") {
            newdata1.push("待发起");
          } else if (el.checkStatus == 2) {
            newdata1.push("待对账");
          } else if (el.checkStatus == 3) {
            newdata1.push("退回");
          } else if (el.checkStatus == 4) {
            newdata1.push("已对账");
          } else {
            newdata1.push("");
          }
        }
      });

      this.transform1(dataArray, newdata1);

      this.datalists = dataArray;
    },

    transform1(old, insert) {
      old.forEach((el, index) => {
        el.checkStatus = insert[index];
      });
    },

    //分页methods
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`,this.pageSize);
      this.changePageSize = val;
      this.$options.methods.getReloadData(this);
    },
    handleCurrentChange(val) {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_cost_info_mng/pagination`,
        method: "get",
        params: {
          // pageSize: this.pageSize[0],
          pageSize: this.changePageSize,
          pageNo: val,
          //   balanceMonth: this.orderForm.JSNo,
          orgName: this.orderForm.JSOrg,
          checkStatus: this.orderForm.DZStatus,
          balanceMonth: this.balanceMonth
          //   checkStatus : 4
        }
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      // return (this.currentPage-1)*this.pageSize[0]+index+1;
      return (this.currentPage - 1) * this.changePageSize + index + 1;
    },
    handleSelectionChange(val) {
      this.updateData2 = val;
      // console.log(this.updateData2)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getReloadData(that) {
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_cost_info_mng/pagination`,
          method: "get",
          params: {
            pageNo: that.currentPage,
            // pageSize: that.pageSize[0],
            pageSize: that.changePageSize,
            // balanceMonth: that.orderForm.JSNo,
            orgName: that.orderForm.JSOrg,
            checkStatus: that.orderForm.DZStatus,
            balanceMonth: that.balanceMonth
            // checkStatus : 4

            // pageSize: this.pageSize[0],
            // pageNo  : this.currentPage
          }
        })
        .then(res => {
          if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
          } else {
            that.total = res.data.totalCount;
            that.currentPage = res.data.curPage;
            // for(var item of res.data.resultList){

            // }
            that.dataList(res.data.resultList);
          }
        });
      // that.reload();
    }
  },
  mounted() {
    this.balanceMonth = window.localStorage.getItem("balanceMonth");
    this.orderForm.DZStatus = 4 + "";

    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_cost_info_mng/pagination`,
      method: "get",
      params: {
        pageNo: this.currentPage,
        pageSize: this.pageSize[0],
        balanceMonth: this.balanceMonth,
        checkStatus: 4
        // pageSize: this.pageSize[0],
        // pageNo  : this.currentPage
      }
    }).then(res => {
      if (res.data.resultCode == "100005") {
        this.$router.push({ path: "/" });
      } else {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        // for(var item of res.data.resultList){

        // }
        this.dataList(res.data.resultList);
      }
    });

    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    // var menu = JSON.parse(window.localStorage.getItem("router"));
    // if (menu && menu.length > 0) {
    //   for (let i = 0; i < menu.length; i++) {
    //     if (menu[i].name == "结算管理") {
    //       var submenu = menu[i].children;
    //       for (let j = 0; j < submenu.length; j++) {
    //         if (submenu[j].name == "护理费用对账") {
    //           console.log("护理费用对账", submenu[j]);
    //           // this.dataExtra1 = submenu[j].dataExtra1;
    //           // URL_ROLES[9] "dataExtra5": 0,
    //           // URL_ROLES[8] "dataExtra4": 0,
    //           // URL_ROLES[5] "dataExtra1": 0,
    //           // URL_ROLES[6] "dataExtra2": 0,
    //           // URL_ROLES[10] "dataExtra6": 0,
    //           // "dataExtra3": 0,

    //           this.urlRole5 = submenu[j].dataExtra1;
    //           this.urlRole6 = submenu[j].dataExtra2;
    //           this.urlRole7 = submenu[j].dataExtra3;

    //         }
    //       }
    //     }
    //   }
    // }
  }
};
</script>

<style scoped>
.top {
  text-align: left;
}
.el-pagination {
  text-align: left;
}
hr {
  margin-top: 3px;
  margin-bottom: 6px;
}
.el-form-item {
  margin-bottom: 18px;
}
.el-form-item__label {
  width: 150px;
}
.el-form-item__content {
  margin-left: 150px;
}
#detailModal{
  overflow-x:auto; 
}
</style>
