<template>
  <div style="padding:20px;height:100%;">
    <div style="height:95%;background:#fff;padding:5px;overflow:auto">
      <div
        el-row
        style = "padding:10px;text-align:left;"
      >
        <div
          el-col
          span  = "24"
          class = "top"
        >
          <el-form
            :inline = "true"
            :model  = "orderForm"
              ref   = "orderForm"
              class = "demo-form-inline"
              size  = 'mini'
              style = "font-size:10px;"
          >
            <el-form-item
              label = "结算月份："
              prop  = "JSNo"
            >
              <el-date-picker
              v-model     = "orderForm.JSNo"
              type        = "month"
              placeholder = "选择日期">
            </el-date-picker>
            </el-form-item>
            <el-form-item
              label = "状态"
              prop  = "DZStatus"
              size  = 'mini'
            >
              <el-select
                v-model     = "orderForm.DZStatus"
                placeholder = "请选择"
                style       = "width:120px"
                @change     = "changeSelect"
                size        = 'mini'
              >
                <el-option
                  label = "全部"
                  value = ""
                ></el-option>
                <el-option
                  label = "待发送"
                  value = "1"
                ></el-option>
                <el-option
                  label = "待接收"
                  value = "2"
                ></el-option>
                <el-option
                  label = "待审核"
                  value = "3"
                ></el-option>
                <el-option
                  label = "待打款"
                  value = "4"
                ></el-option>
                 <el-option
                  label = "已打款"
                  value = "5"
                ></el-option>
                 <el-option
                  label = "退回"
                  value = "6"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type   = "primary"
                icon   = "el-icon-search"
                size   = "mini"
                @click = "search"
              >查询</el-button>
            </el-form-item>
          </el-form>
          <!-- <el-button
                type   = "primary"
                icon   = "el-icon-download"
                size   = "mini"
                @click = "export2"
                style  = "float:right;"
              >导出医保</el-button> -->
              <!-- <el-button
              v-if   = "urlRole1==1"
              type   = "primary"
              icon   = "el-icon-printer"
              size   = "mini"
              @click = "export1"
              style  = "float:right;margin-right:30px;"
              >导出</el-button> -->
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div style="padding:5px;height:80%">
            <el-table
              :data = "datalists"
              border
              stripe
              style             = "width: 100%;text-align:left; "
              @selection-change = "handleSelectionChange"
              height="100%"
            >
              <el-table-column
                type  = "selection"
                width = "55"
              ></el-table-column>
              <el-table-column
                prop  = "code"
                label = "结算单号"
                width = "120"
              ></el-table-column>
              <el-table-column
                prop  = "checkStatus"
                label = "状态"
                width = "120"
              ></el-table-column>
              <el-table-column
                prop  = "balanceMonth"
                label = "结算月份"
                width = "120"
              ></el-table-column>
              <el-table-column
                prop  = "nursingNumber"
                label = "护理人数"
                width = "200"
              ></el-table-column>
              <el-table-column
                prop  = "nursingCost"
                label = "护理费用"
                width = "200"
              ></el-table-column>
              <el-table-column
                prop  = "lifeNursingCost"
                label = "生活护理"
                width = "200"
              ></el-table-column>
              <el-table-column
                prop  = "medicalNursingCost"
                label = "医疗护理"
                width = "200"
              ></el-table-column><el-table-column
                prop  = "lifeNursingFundCost"
                label = "生活护理基金支付"
                width = "200"
              ></el-table-column><el-table-column
                prop  = "medicalNursingFundCost"
                label = "医疗护理基金支付"
                width = "200"
              ></el-table-column><el-table-column
                prop  = "medicalNursingPersonalCost"
                label = "医疗护理个人自费"
                width = "200"
              ></el-table-column><el-table-column
                prop  = "totalFundCost"
                label = "总基金支付"
                width = "200"
              ></el-table-column>
              <el-table-column
                prop  = "totalPersonalCost"
                label = "总个人费用"
                width = "200"
              ></el-table-column>
              <el-table-column
                prop  = "reallyCost"
                label = "实付费用"
                width = "200"
              ></el-table-column>
              <el-table-column
                prop  = "operation"
                label = "操作"
                width = "280"
                fixed = "right"
              >
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
                      </el-input> -->
                      <el-button
                          type        = "success"
                          size        = 'mini'
                          @click.stop = 'fyDetail(scope.row.balanceMonth,scope.row.orgLinks)'
                        >费用详情</el-button>
                        <el-button
                        v-if   = " scope.row.checkStatus==='待发送' ||scope.row.checkStatus=== '退回' || scope.row.checkStatus=== '审核不通过' && urlRole5==1 "
                        type   = "success"
                        size   = 'mini'
                        @click = "balanceOperation(scope.row.id,2)"
                        >发送结算单</el-button>
                        <el-button
                        v-if   = "scope.row.checkStatus=== '待接收' && urlRole6==1"
                        type   = "success"
                        size   = 'mini'
                        @click = "balanceOperation(scope.row.id,3)"
                        >确认接收</el-button>
                        <el-button
                          v-if   = "scope.row.checkStatus=== '待接收' && urlRole7==1"
                          type   = "success"
                          size   = 'mini'
                          @click = "balanceOperation(scope.row.id,6)"
                        >退回</el-button>
                        <el-button
                          v-if   = "scope.row.checkStatus=== '待审核' && urlRole8==1"
                          type   = "success"
                          size   = 'mini'
                          @click = "costBalanceAudit(scope.row.id,4)"
                        >审核</el-button>
                        <el-button
                          v-if   = "scope.row.checkStatus=== '待打款' && urlRole9==1"
                          type   = "success"
                          size   = 'mini'
                          @click = "balanceOperation(scope.row.id,5)"
                        >确认打款</el-button>
                    </div>
                  </template>
              </el-table-column>
              <el-table-column
                prop  = "comment"
                label = "备注"
              ></el-table-column>
            </el-table>
      </div>
      <!-- 取消的模态框 -->
      <el-dialog
        title       = "审核操作"
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
            label = "审核："
            prop  = "cancelWhy"
          >
             <el-radio-group v-model="ruleFormCancel.result">
                <el-radio label="审核通过"></el-radio>
                <el-radio label="审核不通过"></el-radio>
            </el-radio-group>


          </el-form-item>

          <el-form-item>
            <el-button
              type   = "primary"
              @click = "submitFormCancel('ruleFormCancel')"
            >提交</el-button>
            <!-- <el-button @click="resetFormCancel('ruleFormCancel')">重置</el-button> -->
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
      </el-dialog>

    </div>
    <div class="pageNation">
      <el-pagination
          @size-change    = "handleSizeChange"
          @current-change = "handleCurrentChange"
        :current-page     = "currentPage"
        :page-sizes       = "pageSize"
        :page-size        = "100"
          layout          = "total, sizes, prev, pager, next, jumper"
        :total            = "total"
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
  inject: ['reload'],
  data() {
    return {
      //分页data
      currentPage   : 1,
      pageSize      : [10, 20, 30, 50],
      total         : 0,
      changePageSize: 10,

      orderForm    : {
        JSNo    : '',
        DZStatus: '',
      },
      //表单相关
      dialogVisible: false,

      //列表相关
      datalists: [],
      //权限按钮相关
      urlRole5: 0,
      urlRole6: 0,
      urlRole7: 0,
      urlRole8: 0,
      urlRole9: 0,

      updateData2: [],

    //   退回的理由
    comment       : '',
    ruleFormCancel: {
        result: null
      },
      currentId     : null,
      dialogVisible3: false,
      rulesCancel   : {},

      // 增删改审的权限问题？？
      urlRole1: 0,
      urlRole2: 0,
      urlRole3: 0,
      urlRole4: 0,


    };
  },
  methods: {
    search() {
     var date1 = null;
    if(this.orderForm.JSNo){
      date1 = this.$moment(this.orderForm.JSNo).format('YYYY-MM');
    }else{
      date1 = '';
    }
        // console.log(this.$moment(this.orderForm.JSNo).format('YYYY-MM'),this.orderForm.DZStatus)
    this.$axios({
      url   : `${this.$store.state.globalRouter}/auth/nursing/nursing_cost_balance_mng/pagination`,
      method: "get",
      params: {
        pageNo      : this.currentPage,
        pageSize    : this.pageSize[0],
        balanceMonth: date1,
        checkStatus : this.orderForm.DZStatus
        // pageSize: this.pageSize[0],
        // pageNo  : this.currentPage
      }
    }).then(res => {
      this.total       = res.data.totalCount;
      this.currentPage = res.data.curPage;
      // for(var item of res.data.resultList){

      // }
      this.dataList(res.data.resultList);
    });

    },
    changeSelect(val) {
      // console.log(this.orderForm.select)
    },
    export1(){
    //     if (this.updateData2.length != 1) {
    //     alert("请选择一条记录");
    //   } else {
    //     this.$confirm("是否要删除当前数据?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText : "取消",
    //       type             : "warning",
    //       center           : true
    //     })
    //       .then(() => {
    //         this.$axios({
    //           url:
    //             this.$store.state.globalRouter +
    //             "/auth/system/loginUser/remove?id=" +
    //             this.updateData2[0].userId,
    //           method: "get"
    //         }).then(res => {
    //           console.log(res);
    //           this.$message({
    //             type   : "success",
    //             message: "删除成功"
    //           });
    //           this.$options.methods.getReloadData(this);
    //         });
    //       })
    //       .catch(() => {
    //         this.$message({
    //           type   : "info",
    //           message: "取消删除"
    //         });
    //       });
    //   }
    alert('导出成功')
    },
    export2(){
        if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        this.$confirm("是否要导出当前数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText : "取消",
          type             : "warning",
          center           : true
        })
          .then(() => {
            let addr = `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_cost_balance_mng/get_excel_by_medical?balanceMonth=${this.updateData2[0].balanceMonth}`;
      // console.log(addr)
      window.location.href = addr;

          })
          .catch(() => {
            this.$message({
              type   : "info",
              message: "取消导出"
            });
          });
      }
    },
    fyDetail(balanceMonth,orgLinks){
    //   window.localStorage.setItem("checkStatus", status);
      window.localStorage.setItem("balanceMonth", balanceMonth);
      window.localStorage.setItem("orgLinks", orgLinks);
      this.$router.push({ path: "/shouye/nursing_cost_detail" });
    },
    balanceOperation(id,type,that){
        if(that){
           that.$axios({
            url   : `${that.$store.state.globalRouter}/auth/nursing/nursing_cost_balance_mng/balance_operation?id=${encodeURI(id)}&checkStatus=${encodeURI(type)}`,
            method: 'get'
        }).then(res=>{
            if(res.data.resultCode=='000000'){
                that.$options.methods.getReloadData(that)
                alert('操作成功');
            }else{
                alert('操作失败'+res.data.resultMsg)
            }
        })
        }else{
            this.$confirm("确定要进行操作吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText : "取消",
          type             : "warning",
          center           : true
        })
          .then(() => {
            this.$axios({
            url   : `${this.$store.state.globalRouter}/auth/nursing/nursing_cost_balance_mng/balance_operation?id=${encodeURI(id)}&checkStatus=${encodeURI(type)}`,
            method: 'get'
        }).then(res=>{
            if(res.data.resultCode=='000000'){
                this.$options.methods.getReloadData(this)
                alert('成功');
            }else{
                alert('失败'+res.data.resultMsg)
            }
        })
          })
          .catch(() => {
            this.$message({
              type   : "info",
              message: "取消操作"
            });
          });
        }

    },
    costBalanceAudit(id,type){
        console.log(id,type);
         this.dialogVisible3 = true;
         this.currentId      = id;
        // this.$confirm("确定要进行完成对账操作吗?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText : "取消",
        //   type             : "warning",
        //   center           : true
        // })
        //   .then(() => {
        //     this.$axios({
        //     url   : `${this.$store.state.globalRouter}/auth/nursing/nursing_cost_info_mng/check_cost?id=${id}&checkStatus=4`,
        //     method: 'get'
        // }).then(res=>{
        //     if(res.data.resultCode=='000000'){
        //         this.$options.methods.getReloadData(this)
        //         alert('成功');
        //     }else{
        //         alert('失败'+res.data.resultMsg)
        //     }
        // })
        //   })
        //   .catch(() => {
        //     this.$message({
        //       type   : "info",
        //       message: "取消操作"
        //     });
        //   });
    },
    handleClose3(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitFormCancel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            if(this.ruleFormCancel.result=='审核通过'){
                this.$options.methods.balanceOperation(this.currentId,4,this);
                this.dialogVisible3 = false;
                // alert('审核成功')
            }else if(this.ruleFormCancel.result=='审核不通过'){
                this.$options.methods.balanceOperation(this.currentId,7,this);
                this.dialogVisible3 = false;
                // alert('审核失败');
            }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormCancel(formName) {
      this.$refs[formName].resetFields();
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
            newdata1.push("待发送");
          }else if(el.checkStatus == 2){
              newdata1.push("待接收");
          }else if(el.checkStatus == 3){
              newdata1.push("待审核");
          }else if(el.checkStatus == 4){
              newdata1.push("待打款");
          }else if(el.checkStatus == 5){
              newdata1.push("已打款");
          }else if(el.checkStatus == 6){
              newdata1.push("退回");
          }else if(el.checkStatus == 7){
              newdata1.push("审核不通过");
          }else{
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
         var date1 = null;
    if(this.orderForm.JSNo){
      date1 = this.$moment(this.orderForm.JSNo).format('YYYY-MM');
    }else{
      date1 = '';
    }
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_cost_balance_mng/pagination`,
        method: "get",
        params: {
          // pageSize: this.pageSize[0],
          pageSize    : this.changePageSize,
          pageNo      : val,
          balanceMonth: date1,
          checkStatus : this.orderForm.DZStatus
        }
      }).then(res => {
        this.total       = res.data.totalCount;
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
         var date1 = null;
    if(that.orderForm.JSNo){
      date1 = that.$moment(that.orderForm.JSNo).format('YYYY-MM');
    }else{
      date1 = '';
    }
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_cost_balance_mng/pagination`,
          method: "get",
          params: {
            pageNo: that.currentPage,
            // pageSize: that.pageSize[0],
            pageSize    : that.changePageSize,
            balanceMonth: date1,
            checkStatus : that.orderForm.DZStatus

            // pageSize: this.pageSize[0],
            // pageNo  : this.currentPage
          }
        })
        .then(res => {
           if(res.data.resultCode=='100005'){
that.$router.push({ path: "/" });
}else{
    that.total       = res.data.totalCount;
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
    // this.getData();
    this.$axios({
      url   : `${this.$store.state.globalRouter}/auth/nursing/nursing_cost_balance_mng/pagination`,
      method: "get",
      params: {
        pageNo  : this.currentPage,
        pageSize: this.pageSize[0],
        // pageSize: this.pageSize[0],
        // pageNo  : this.currentPage
      }
    }).then(res => {
      if(res.data.resultCode=='100005'){
this.$router.push({ path: "/" });
}else{
    this.total       = res.data.totalCount;
    this.currentPage = res.data.curPage;
      // for(var item of res.data.resultList){

      // }
      this.dataList(res.data.resultList);
}
    });

    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "结算管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "nursing/nursing_cost") {
              console.log("护理费用结算", submenu[j]);
              // this.dataExtra1 = submenu[j].dataExtra1;
              // URL_ROLES[9] "dataExtra5": 0,
              // URL_ROLES[8] "dataExtra4": 0,
              // URL_ROLES[5] "dataExtra1": 0,
              // URL_ROLES[6] "dataExtra2": 0,
              // URL_ROLES[10] "dataExtra6": 0,
              // "dataExtra3": 0,

              this.urlRole1 = submenu[j].dataAdd;
              this.urlRole2 = submenu[j].dataUpdate;
              this.urlRole3 = submenu[j].dataDelete;
              this.urlRole4 = submenu[j].dataAudit;

              this.urlRole5 = submenu[j].dataExtra1;
              this.urlRole6 = submenu[j].dataExtra2;
              this.urlRole7 = submenu[j].dataExtra3;
              this.urlRole8 = submenu[j].dataExtra4;
              this.urlRole9 = submenu[j].dataExtra5;

            }
          }
        }
      }
    }



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
  margin-top   : 3px;
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
</style>
