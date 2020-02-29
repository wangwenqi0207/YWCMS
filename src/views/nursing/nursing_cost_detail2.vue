<template>
  <div style="padding:20px;height:100%;">
    <div style="background:#fff;background:#fff;padding:5px;height:95%;overflow:auto">
      <div el-row style="padding:10px;text-align: left;">
        <el-button type="primary" icon="el-icon-back" size="mini" @click="back">返回</el-button>
      </div>
      <div el-row style="padding:10px;text-align: left;">
        <div el-col span="24" class="top">
          <el-form
            :inline="true"
            :model="orderForm"
            ref="orderForm"
            class="demo-form-inline"
            size="mini"
            style="font-size:10px;"
          >
            <el-form-item label="参保人姓名：" prop="name">
              <el-input placeholder v-model="orderForm.name" style="width: 100px" size="mini"/>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div style="padding:5px;height:80%">
        <el-table
          :data="datalists"
          border
          stripe
          style="width: 100%;text-align:left; "
          @selection-change="handleSelectionChange"
          :row-style="rowStyle"
          height="100%"
        >
          <el-table-column prop="id" label="ID" width="120"></el-table-column>
          <el-table-column prop="balanceMonth" label="结算月份" width="120"></el-table-column>
          <el-table-column prop="userName" label="参保人姓名" width="120"></el-table-column>
          <el-table-column prop="special" label="民政认定" width="120"></el-table-column>
          <el-table-column prop="handicapped" label="残联认定" width="120"></el-table-column>
          <el-table-column prop="nursingCost" label="护理费用" width="160"></el-table-column>
          <el-table-column prop="lifeNursingCost" label="生活护理" width="160"></el-table-column>
          <el-table-column prop="medicalNursingCost" label="医疗护理" width="160"></el-table-column>
          <el-table-column prop="lifeNursingFundCost" label="生活护理基金支付" width="160"></el-table-column>
          <el-table-column prop="medicalNursingFundCost" label="医疗护理基金支付" width="160"></el-table-column>
          <el-table-column prop="medicalNursingPersonalCost" label="医疗护理个人自费" width="160"></el-table-column>
          <el-table-column prop="totalFundCost" label="总基金支付" width="160"></el-table-column>
          <el-table-column prop="totalPersonalCost" label="总个人自费" width="160"></el-table-column>
          <el-table-column prop="operation" label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <div class="state">
                <el-button
                  type="success"
                  size="mini"
                  @click.stop="fyDetail(scope.row.rid,scope.row.balanceMonth,scope.row.userIdcard)"
                >月度明细</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="rid" label="剔除状态" width="120" fixed="right">
            <template slot-scope="scope">
              <div
                class="state"
                v-if="checkStatus=='待发起' || checkStatus=='待对账' || checkStatus=='退回'"
              >
                <el-button
                  v-if="scope.row.rid==1"
                  type="success"
                  size="mini"
                  @click.stop="rid(scope.row.id)"
                >剔除</el-button>
                <el-button
                  v-else
                  type="success"
                  size="mini"
                  @click.stop="cancleRid(scope.row.id)"
                >取消剔除</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="备注"></el-table-column>
        </el-table>
      </div>

      <!-- 取消的模态框 -->
      <el-dialog
        title="剔除操作"
        :visible.sync="dialogVisible3"
        width="30%"
        :before-close="handleClose3"
      >
        <el-form
          :model="ruleFormCancel"
          status-icon
          :rules="rulesCancel"
          ref="ruleFormCancel"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="剔除理由：" prop="cancelWhy">
            <el-input v-model="ruleFormCancel.cancelWhy" placeholder="请输入剔除的理由"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitFormCancel('ruleFormCancel')">提交</el-button>
            <!-- <el-button @click="resetFormCancel('ruleFormCancel')">重置</el-button> -->
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" hidden>
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
        </span>
      </el-dialog>

      <div
        class="modal fade"
        id="detailModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalDetail"
        aria-hidden="true"
      >
        <div class="modal-dialog" style="width:1100px;">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h5 class="modal-title" id="myModalDetail" style="text-align:left;">详情</h5>
            </div>
            <div class="modal-body">
              <form class="form-horizontal" style="overflow:hidden">
                <div class="c_content">
                  <div class="c_tab_content" id="data-table">
                    <table id="data-table-stel" class="table table-striped table-bordered table_head" style="white-space: nowrap; width:100% ">
                                <thead>
                                <tr style='text-align: center'>
                                    <th style="width: 10%">参保人姓名</th>
                                    <th style="width: 15%">护理日期</th>
                                    <th style="width: 20%" colspan="2">护理费用</th>
                                    <th style="width: 20%" colspan="2">生活护理</th>
                                    <th style="width: 20%" colspan="2">医疗护理</th>
                                    <th style="width: 7%" >操作</th>
                                    <th style="width: 7%" >剔除状态</th>
                                </tr>
                                </thead>
                    </table>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer" style="text-align:center">
              <el-button
                type="success"
                size="mini"
                data-dismiss="modal"
              >关闭</el-button>
            </div>
          </div>
        </div>
      </div>
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
        ></el-pagination>
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
        name: ""
      },
      //表单相关
      dialogVisible: false,

      //列表相关
      datalists: [],

      //   退回的理由
      comment: "",
      ruleFormCancel: {
        cancelWhy: null
      },
      currentId: null,
      dialogVisible3: false,
      rulesCancel: {},
      checkStatus: "",

      balanceMonth: "",
      orgName: ""
    };
  },
  methods: {
    // 表格初始化时每行的样式
    rowStyle(row, rowindex) {
      // console.log(row.row.rid)
      if (row.row.rid != 1) {
        return "color:orange;text-decoration:line-through;";
      } else {
        return "color:#606266;";
      }
      return "";
    },
    search() {
      console.log(this.orderForm.name, this.balanceMonth, this.orgName);

      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_cost_info_month_org_mng.htm/pagination`,
        method: "get",
        params: {
          pageNo: this.currentPage,
          pageSize: this.changePageSize,
          userName: this.orderForm.name,
          balanceMonth: this.balanceMonth,
          orgName: this.orgName
        }
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        // for(var item of res.data.resultList){

        // }
        this.dataList(res.data.resultList);
      });
    },
    back() {
      this.$router.push({ path: "/shouye/nursing_cost_detail" });
    },
    changeSelect(val) {
      // console.log(this.orderForm.select)
    },
    getRidStatic(serviceStatus, rid) {
      if (serviceStatus == "已完成") {
        if (rid == 1) {
          return "剔除";
        } else {
          return "取消剔除";
        }
      } else {
        return "已剔除";
      }
    },

    fyDetail(showNursingCostInfoMonthOrgRid, balanceMonth, userIdcard) {
      var nowYearMonth = this.$moment().format("YYYY-MM");
      var isNowYearMonth = balanceMonth == nowYearMonth;
      var checkStatus = this.checkStatus;
      // $("#data-table tbody:not(:first)").remove();
      var beginHTML=`<table id="data-table-stel" class="table table-striped table-bordered table_head" style="white-space: nowrap; width:100% ">
                                <thead>
                                <tr style='text-align: center'>
                                    <th style="width: 10%">参保人姓名</th>
                                    <th style="width: 15%">护理日期</th>
                                    <th style="width: 20%" colspan="2">护理费用</th>
                                    <th style="width: 20%" colspan="2">生活护理</th>
                                    <th style="width: 20%" colspan="2">医疗护理</th>
                                    <th style="width: 7%" >操作</th>
                                    <th style="width: 7%" >剔除状态</th>
                                </tr>
                                </thead>`
      $("#data-table").html(beginHTML);
      $("#detailModal").modal("show");
      var _this = this;
      this.$axios({
        url:
          this.$store.state.globalRouter +
          "/auth/nursing/nursing_cost_info_month_org_mng.htm/get_all_days_nursing_cost_by_month?userIdcard=" +
          encodeURI(userIdcard) +
          "&balanceMonth=" +
          encodeURI(balanceMonth),
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var result = res.data.data;
          var tableHTML = "";
          tableHTML += `<table id="data-table-stel" class="table table-striped table-bordered table_head" style="white-space: nowrap; width:100% ">
                                <thead>
                                <tr style='text-align: center'>
                                    <th style="width: 10%">参保人姓名</th>
                                    <th style="width: 15%">护理日期</th>
                                    <th style="width: 20%" colspan="2">护理费用</th>
                                    <th style="width: 20%" colspan="2">生活护理</th>
                                    <th style="width: 20%" colspan="2">医疗护理</th>
                                    <th style="width: 7%" >操作</th>
                                    <th style="width: 7%" >剔除状态</th>
                                </tr>
                                </thead>`;
          if (result && result.length >= 1) {
            result.forEach(function(item, index) {
              tableHTML +=
                "<tbody style='text-align: center;background-color: darkred'>";
              tableHTML += "<tr>";
              if (item.rid == 1) {
                var data1 = item.serviceDate;
                tableHTML += "<td>" + item.userName + "</td>";
                tableHTML += "<td>" + item.serviceDate + "</td>";
                tableHTML += "<td colspan='2'>" + item.nursingCost + "</td>";
                tableHTML +=
                  "<td colspan='2'>" + item.lifeNursingCost + "</td>";
                tableHTML +=
                  "<td colspan='2'>" + item.medicalNursingCost + "</td>";
              } else {
                tableHTML +=
                  "<td style='text-decoration: line-through;color: coral'>" +
                  item.userName +
                  "</td>";
                tableHTML +=
                  "<td style='text-decoration: line-through;color: coral'>" +
                  item.serviceDate +
                  "</td>";
                tableHTML +=
                  "<td style='text-decoration: line-through;color: coral' colspan='2'>" +
                  item.nursingCost +
                  "</td>";
                tableHTML +=
                  "<td style='text-decoration: line-through;color: coral' colspan='2'>" +
                  item.lifeNursingCost +
                  "</td>";
                tableHTML +=
                  "<td style='text-decoration: line-through;color: coral' colspan='2'>" +
                  item.medicalNursingCost +
                  "</td>";
              }

              tableHTML += `<td colspan='1' class="${
                item.serviceDate
              }" @click='showNursingProjectDetail'>护理明细<span class='glyphicon glyphicon-chevron-right showtabs'></span></td>`;
              //如果对账明细已剔除，则内部全部为已剔除
              if ("0" == showNursingCostInfoMonthOrgRid) {
                tableHTML += "<td>已剔除</td>";
              } else if (
                "待发起" == checkStatus ||
                "待对账" == checkStatus ||
                "退回" == checkStatus
              ) {
                if (item.rid == 1) {
                  var data = `${item.planId}=${item.orgId}=${item.userIdcard}=${
                    item.serviceDate
                  }=${balanceMonth}=${item.nursingCost}=${
                    item.lifeNursingCost
                  }=${
                    item.medicalNursingCost
                  }=${showNursingCostInfoMonthOrgRid}`;
                  //  console.log(data,item.serviceDate)
                  tableHTML += `<td><input type='button' zValue="${data}" yValue="${
                    item.serviceDate
                  }" @click='ridOneDay' value='剔除'></td>`;
                } else {
                  var data3 = `${item.planId}=${item.orgId}=${
                    item.userIdcard
                  }=${
                    item.serviceDate
                  }=${balanceMonth}=${showNursingCostInfoMonthOrgRid}`;
                  tableHTML += `<td><input type='button' zValue='${data3}' @click='cancelRidOneDay' value='取消剔除'></td>`;
                }
              } else {
                if (item.rid != 1) {
                  tableHTML += "<td>已剔除</td>";
                } else {
                  tableHTML += "<td>剔除</td>";
                }
              }
              tableHTML += "</tr>";
              tableHTML += "</tbody>";

              tableHTML +=
                "<tbody hidden style='text-align: center' id='" +
                item.serviceDate +
                "'><tr>";
              tableHTML += "<td>护理分类</td>";
              tableHTML += "<td>护理项目</td>";
              tableHTML += "<td>频次</td>";
              tableHTML += "<td>价格</td>";
              tableHTML += "<td>护理费用</td>";
              tableHTML += "<td>护理人员</td>";
              tableHTML += "<td>护理状态</td>";
              tableHTML += "<td>剔除状态</td>";
              tableHTML += "<td colspan='2'>备注</td>";
              tableHTML += "</tr></tbody>";
              //
              _this
                .$axios({
                  url:
                    _this.$store.state.globalRouter +
                    "/auth/nursing/nursing_cost_info_month_org_mng.htm/get_nursing_item_info_by_type?userIdcard=" +
                    encodeURI(userIdcard) +
                    "&serviceDate=" +
                    encodeURI(item.serviceDate),
                  method: "get"
                })
                .then(res => {
                  if (res.data.resultCode == "000000") {
                    var itemResult = res.data.data;
                    var baseNursingItemInfo = itemResult.baseNursingItemInfo;
                    var medicalNursingItemInfo =
                      itemResult.medicalNursingItemInfo;
                    // var tableTML1 = "<tbody>";
                    var tableTML1 = "";
                    // console.log('666',itemResult,baseNursingItemInfo,medicalNursingItemInfo)
                    if (baseNursingItemInfo.length > 0) {
                      tableTML1 += "<tr>";
                      tableTML1 +=
                        "<td rowspan='" +
                        baseNursingItemInfo.length +
                        "' style='text-align: center;vertical-align: middle'>基本护理</td>";
                      baseNursingItemInfo.forEach(function(
                        baseNursingItemInfoItem,
                        baseNursingItemInfoIndex
                      ) {
                        if (baseNursingItemInfoIndex == 0) {
                          tableTML1 +=
                            "<td>" +
                            baseNursingItemInfoItem.serviceName +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            baseNursingItemInfoItem.frequency +
                            "</td>";
                          tableTML1 +=
                            "<td>" + baseNursingItemInfoItem.price + "</td>";
                          tableTML1 +=
                            "<td>" +
                            baseNursingItemInfoItem.nursingCost +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            baseNursingItemInfoItem.staffName +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            baseNursingItemInfoItem.serviceStatus +
                            "</td>";

                          var static1 = _this.$options.methods.getRidStatic(
                            baseNursingItemInfoItem.serviceStatus,
                            baseNursingItemInfoItem.rid
                          );
                          if (
                            static1 == "已剔除" ||
                            isNowYearMonth ||
                            showNursingCostInfoMonthOrgRid == "0" ||
                            item.rid == 0
                          ) {
                            tableTML1 += "<td>" + "已剔除" + "</td>";
                          } else {
                            if (checkStatus != "4") {
                              tableTML1 += `<td><input type='button'  class='${
                                baseNursingItemInfoItem.schedulingPlanId
                              }' @click='ridOperation(${
                                baseNursingItemInfoItem.schedulingPlanId
                              })' value='${static1}'></td>`;
                            } else {
                              tableTML1 += "<td>" + static1 + "</td>";
                            }
                          }
                          tableTML1 +=
                            "<td colspan='2'>" +
                            baseNursingItemInfoItem.common +
                            "</td>";
                          tableTML1 += "</tr>";
                        }
                        if (baseNursingItemInfoIndex > 0) {
                          tableTML1 += "<tr>";
                          tableTML1 +=
                            "<td>" +
                            baseNursingItemInfoItem.serviceName +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            baseNursingItemInfoItem.frequency +
                            "</td>";
                          tableTML1 +=
                            "<td>" + baseNursingItemInfoItem.price + "</td>";
                          tableTML1 +=
                            "<td>" +
                            baseNursingItemInfoItem.nursingCost +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            baseNursingItemInfoItem.staffName +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            baseNursingItemInfoItem.serviceStatus +
                            "</td>";
                          var static1 = _this.$options.methods.getRidStatic(
                            baseNursingItemInfoItem.serviceStatus,
                            baseNursingItemInfoItem.rid
                          );
                          if (
                            static1 == "已剔除" ||
                            isNowYearMonth ||
                            showNursingCostInfoMonthOrgRid == "0" ||
                            item.rid == 0
                          ) {
                            tableTML1 += "<td>" + "已剔除" + "</td>";
                          } else {
                            if (checkStatus != "4") {
                              tableTML1 += `<td><input type='button'  class='${
                                baseNursingItemInfoItem.schedulingPlanId
                              }' @click='ridOperation(${
                                baseNursingItemInfoItem.schedulingPlanId
                              })' value='${static1}'></td>`;
                            } else {
                              tableTML1 += "<td>" + static1 + "</td>";
                            }
                          }
                          tableTML1 +=
                            "<td colspan='2'>" +
                            baseNursingItemInfoItem.common +
                            "</td>";
                          tableTML1 += "</tr>";
                        }
                      });
                    }
                    if (medicalNursingItemInfo.length > 0) {
                      tableTML1 += "<tr>";
                      tableTML1 +=
                        "<td rowspan='" +
                        medicalNursingItemInfo.length +
                        "' style='text-align: center;vertical-align: middle'>医疗护理</td>";
                      medicalNursingItemInfo.forEach(function(
                        medicalNursingItemInfoItem,
                        medicalNursingItemInfoIndex
                      ) {
                        if (medicalNursingItemInfoIndex == 0) {
                          tableTML1 +=
                            "<td>" +
                            medicalNursingItemInfoItem.serviceName +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            medicalNursingItemInfoItem.frequency +
                            "</td>";
                          tableTML1 +=
                            "<td>" + medicalNursingItemInfoItem.price + "</td>";
                          tableTML1 +=
                            "<td>" +
                            medicalNursingItemInfoItem.nursingCost +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            medicalNursingItemInfoItem.staffName +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            medicalNursingItemInfoItem.serviceStatus +
                            "</td>";
                          var static1 = _this.$options.methods.getRidStatic(
                            medicalNursingItemInfoItem.serviceStatus,
                            medicalNursingItemInfoItem.rid
                          );
                          if (
                            static1 == "已剔除" ||
                            isNowYearMonth ||
                            showNursingCostInfoMonthOrgRid == "0" ||
                            item.rid == 0
                          ) {
                            tableTML1 += "<td>" + "已剔除" + "</td>";
                          } else {
                            if (checkStatus != "4") {
                              tableTML1 += `<td><input type='button'  class='${
                                baseNursingItemInfoItem.schedulingPlanId
                              }' @click='ridOperation(${
                                baseNursingItemInfoItem.schedulingPlanId
                              })' value='${static1}'></td>`;
                            } else {
                              tableTML1 += "<td>" + static1 + "</td>";
                            }
                          }
                          tableTML1 +=
                            "<td colspan='2'>" +
                            medicalNursingItemInfoItem.common +
                            "</td>";
                          tableTML1 += "</tr>";
                        }
                        if (medicalNursingItemInfoIndex > 0) {
                          tableTML1 += "<tr>";
                          tableTML1 +=
                            "<td>" +
                            medicalNursingItemInfoItem.serviceName +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            medicalNursingItemInfoItem.frequency +
                            "</td>";
                          tableTML1 +=
                            "<td>" + medicalNursingItemInfoItem.price + "</td>";
                          tableTML1 +=
                            "<td>" +
                            medicalNursingItemInfoItem.nursingCost +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            medicalNursingItemInfoItem.staffName +
                            "</td>";
                          tableTML1 +=
                            "<td>" +
                            medicalNursingItemInfoItem.serviceStatus +
                            "</td>";
                          var static1 = _this.$options.methods.getRidStatic(
                            medicalNursingItemInfoItem.serviceStatus,
                            medicalNursingItemInfoItem.rid
                          );
                          if (
                            static1 == "已剔除" ||
                            isNowYearMonth ||
                            showNursingCostInfoMonthOrgRid == "0" ||
                            item.rid == 0
                          ) {
                            tableTML1 += "<td>" + "已剔除" + "</td>";
                          } else {
                            if (checkStatus != "4") {
                              tableTML1 += `<td><input type='button'  class='${
                                baseNursingItemInfoItem.schedulingPlanId
                              }' @click='ridOperation(${
                                baseNursingItemInfoItem.schedulingPlanId
                              })' value='${static1}'></td>`;
                            } else {
                              tableTML1 += "<td>" + static1 + "</td>";
                            }
                          }
                          tableTML1 +=
                            "<td colspan='2'>" +
                            medicalNursingItemInfoItem.common +
                            "</td>";
                          tableTML1 += "</tr>";
                        }
                      });
                    }
                    //                                                         tableTML1   += '</tbody>'
                    //                                                     var MyComponent  = Vue.extend({
                    //     template: tableTML1,
                    //     data() {
                    //       return {

                    //       };
                    //     },
                    //     methods: {

                    //       ridOperation(id){
                    //           alert('333')
                    //       },

                    //     }
                    //   });
                    //   var component = new MyComponent().$mount();
                    //   // $("#data-table").append(component.$el);
                    //             $("#" + item.serviceDate).append(component.$el);
                    $("#" + item.serviceDate).append(tableTML1);
                  } else {
                    alert("失败" + res.data.resultMsg);
                  }
                });
            });
          }

          //先清除下除了表头之外的数据
          tableHTML += "</table>";
          $("#data-table tr:not(:first)").remove();
          // $('#data-table-stel').append(tableHTML);
          var MyComponent = Vue.extend({
            template: tableHTML,
            data() {
              return {
                flag: false
              };
            },
            methods: {
              showNursingProjectDetail(event) {
                var showTab = document.getElementById(event.target.className);
                if (showTab.getAttribute("hidden") == "hidden") {
                  showTab.removeAttribute("hidden");
                } else {
                  showTab.setAttribute("hidden", "hidden");
                }
              },
              ridOperation(id) {
                alert("333");
              },
              //剔除某一个人某一天的
              ridOneDay(event) {
                var data = event.target.getAttribute("zValue").split("=");
                var data1 = event.target.getAttribute("yValue");
                // console.log(data1)

                // console.log(data)
                var obj = {};
                obj.planId = data[0];
                obj.orgId = data[1];
                obj.userIdcard = data[2];
                obj.serviceDate = data1;
                obj.balanceMonth = data[4];
                obj.nursingCost = data[5];
                obj.lifeNursingCost = data[6];
                obj.medicalNursingCost = data[7];
                obj.rid = 0;

                _this
                  .$axios({
                    url: `${
                      _this.$store.state.globalRouter
                    }/auth/nursing/nursing_cost_info_month_org_mng.htm/rid_one_day`,
                    method: "get",
                    params: obj
                  })
                  .then(res => {
                    if (res.data.resultCode == "000000") {
                      _this.$options.methods.fyDetail1(
                        showNursingCostInfoMonthOrgRid,
                        balanceMonth,
                        userIdcard,
                        _this
                      );

                      alert("剔除成功");
                    } else {
                      alert("剔除失败" + res.data.resultMsg);
                    }
                  });
              },
              //取消剔除某一个人某一天的
              cancelRidOneDay(event) {
                var data3 = event.target.getAttribute("zValue").split("=");

                var obj = {};
                obj.planId = data3[0];
                obj.orgId = data3[1];
                obj.userIdcard = data3[2];
                obj.serviceDate = data3[3];
                obj.balanceMonth = data3[4];
                obj.lifeNursingCost = 0;
                obj.medicalNursingCost = 0;
                obj.rid = 1;
                //  console.log(obj)
                _this
                  .$axios({
                    url: `${
                      _this.$store.state.globalRouter
                    }/auth/nursing/nursing_cost_info_month_org_mng.htm/cancel_rid_one_day`,
                    method: "get",
                    params: obj
                  })
                  .then(res => {
                    if (res.data.resultCode == "000000") {
                      _this.$options.methods.fyDetail1(
                        showNursingCostInfoMonthOrgRid,
                        balanceMonth,
                        userIdcard,
                        _this
                      );
                      alert("取消剔除成功");
                    } else {
                      alert("取消剔除失败" + res.data.resultMsg);
                    }
                  });
              }
            }
          });
          $("#data-table").html("");
          var component = new MyComponent().$mount();
          $("#data-table").append(component.$el);
        } else {
          alert("失败" + res.data.resultMsg);
        }
      });
    },
    fyDetail1(showNursingCostInfoMonthOrgRid, balanceMonth, userIdcard, that) {
      var nowYearMonth = that.$moment().format("YYYY-MM");
      var isNowYearMonth = balanceMonth == nowYearMonth;
      var checkStatus = that.checkStatus;
      // $("#data-table tbody:not(:first)").remove();
       var beginHTML=`<table id="data-table-stel" class="table table-striped table-bordered table_head" style="white-space: nowrap; width:100% ">
                                <thead>
                                <tr style='text-align: center'>
                                    <th style="width: 10%">参保人姓名</th>
                                    <th style="width: 15%">护理日期</th>
                                    <th style="width: 20%" colspan="2">护理费用</th>
                                    <th style="width: 20%" colspan="2">生活护理</th>
                                    <th style="width: 20%" colspan="2">医疗护理</th>
                                    <th style="width: 7%" >操作</th>
                                    <th style="width: 7%" >剔除状态</th>
                                </tr>
                                </thead>`
      $("#data-table").html(beginHTML);
      // $("#data-table").html("");
      $("#detailModal").modal("show");
      var _this = that;
      that
        .$axios({
          url:
            that.$store.state.globalRouter +
            "/auth/nursing/nursing_cost_info_month_org_mng.htm/get_all_days_nursing_cost_by_month?userIdcard=" +
           encodeURI(userIdcard) +
            "&balanceMonth=" +
            encodeURI(balanceMonth),
          method: "get"
        })
        .then(res => {
          if (res.data.resultCode == "000000") {
            var result = res.data.data;
            var tableHTML = "";
            tableHTML += `<table id="data-table-stel" class="table table-striped table-bordered table_head" style="white-space: nowrap; width:100% ">
                                <thead>
                                <tr style='text-align: center'>
                                    <th style="width: 10%">参保人姓名</th>
                                    <th style="width: 15%">护理日期</th>
                                    <th style="width: 20%" colspan="2">护理费用</th>
                                    <th style="width: 20%" colspan="2">生活护理</th>
                                    <th style="width: 20%" colspan="2">医疗护理</th>
                                    <th style="width: 7%" >操作</th>
                                    <th style="width: 7%" >剔除状态</th>
                                </tr>
                                </thead>`;
            if (result && result.length >= 1) {
              result.forEach(function(item, index) {
                tableHTML +=
                  "<tbody style='text-align: center;background-color: darkred'>";
                tableHTML += "<tr>";
                if (item.rid == 1) {
                  var data1 = item.serviceDate;
                  tableHTML += "<td>" + item.userName + "</td>";
                  tableHTML += "<td>" + item.serviceDate + "</td>";
                  tableHTML += "<td colspan='2'>" + item.nursingCost + "</td>";
                  tableHTML +=
                    "<td colspan='2'>" + item.lifeNursingCost + "</td>";
                  tableHTML +=
                    "<td colspan='2'>" + item.medicalNursingCost + "</td>";
                } else {
                  tableHTML +=
                    "<td style='text-decoration: line-through;color: coral'>" +
                    item.userName +
                    "</td>";
                  tableHTML +=
                    "<td style='text-decoration: line-through;color: coral'>" +
                    item.serviceDate +
                    "</td>";
                  tableHTML +=
                    "<td style='text-decoration: line-through;color: coral' colspan='2'>" +
                    item.nursingCost +
                    "</td>";
                  tableHTML +=
                    "<td style='text-decoration: line-through;color: coral' colspan='2'>" +
                    item.lifeNursingCost +
                    "</td>";
                  tableHTML +=
                    "<td style='text-decoration: line-through;color: coral' colspan='2'>" +
                    item.medicalNursingCost +
                    "</td>";
                }

                tableHTML += `<td colspan='1' class="${
                  item.serviceDate
                }" @click='showNursingProjectDetail'>护理明细<span class='glyphicon glyphicon-chevron-right showtabs'></span></td>`;
                //如果对账明细已剔除，则内部全部为已剔除
                if ("0" == showNursingCostInfoMonthOrgRid) {
                  tableHTML += "<td>已剔除</td>";
                } else if (
                  "待发起" == checkStatus ||
                  "待对账" == checkStatus ||
                  "退回" == checkStatus
                ) {
                  if (item.rid == 1) {
                    var data = `${item.planId}=${item.orgId}=${
                      item.userIdcard
                    }=${item.serviceDate}=${balanceMonth}=${item.nursingCost}=${
                      item.lifeNursingCost
                    }=${
                      item.medicalNursingCost
                    }=${showNursingCostInfoMonthOrgRid}`;
                    //  console.log(data,item.serviceDate)
                    tableHTML += `<td><input type='button' zValue="${data}" yValue="${
                      item.serviceDate
                    }" @click='ridOneDay' value='剔除'></td>`;
                  } else {
                    var data3 = `${item.planId}=${item.orgId}=${
                      item.userIdcard
                    }=${
                      item.serviceDate
                    }=${balanceMonth}=${showNursingCostInfoMonthOrgRid}`;
                    tableHTML += `<td><input type='button' zValue='${data3}' @click='cancelRidOneDay' value='取消剔除'></td>`;
                  }
                } else {
                  if (item.rid != 1) {
                    tableHTML += "<td>已剔除</td>";
                  } else {
                    tableHTML += "<td>剔除</td>";
                  }
                }
                tableHTML += "</tr>";
                tableHTML += "</tbody>";

                tableHTML +=
                  "<tbody hidden style='text-align: center' id='" +
                  item.serviceDate +
                  "'><tr>";
                tableHTML += "<td>护理分类</td>";
                tableHTML += "<td>护理项目</td>";
                tableHTML += "<td>频次</td>";
                tableHTML += "<td>价格</td>";
                tableHTML += "<td>护理费用</td>";
                tableHTML += "<td>护理人员</td>";
                tableHTML += "<td>护理状态</td>";
                tableHTML += "<td>剔除状态</td>";
                tableHTML += "<td colspan='2'>备注</td>";
                tableHTML += "</tr></tbody>";
                //
                _this
                  .$axios({
                    url:
                      _this.$store.state.globalRouter +
                      "/auth/nursing/nursing_cost_info_month_org_mng.htm/get_nursing_item_info_by_type?userIdcard=" +
                      encodeURI(userIdcard) +
                      "&serviceDate=" +
                      encodeURI(item.serviceDate),
                    method: "get"
                  })
                  .then(res => {
                    if (res.data.resultCode == "000000") {
                      var itemResult = res.data.data;
                      var baseNursingItemInfo = itemResult.baseNursingItemInfo;
                      var medicalNursingItemInfo =
                        itemResult.medicalNursingItemInfo;
                      // var tableTML1 = "<tbody>";
                      var tableTML1 = "";
                      // console.log('666',itemResult,baseNursingItemInfo,medicalNursingItemInfo)
                      if (baseNursingItemInfo.length > 0) {
                        tableTML1 += "<tr>";
                        tableTML1 +=
                          "<td rowspan='" +
                          baseNursingItemInfo.length +
                          "' style='text-align: center;vertical-align: middle'>基本护理</td>";
                        baseNursingItemInfo.forEach(function(
                          baseNursingItemInfoItem,
                          baseNursingItemInfoIndex
                        ) {
                          if (baseNursingItemInfoIndex == 0) {
                            tableTML1 +=
                              "<td>" +
                              baseNursingItemInfoItem.serviceName +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              baseNursingItemInfoItem.frequency +
                              "</td>";
                            tableTML1 +=
                              "<td>" + baseNursingItemInfoItem.price + "</td>";
                            tableTML1 +=
                              "<td>" +
                              baseNursingItemInfoItem.nursingCost +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              baseNursingItemInfoItem.staffName +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              baseNursingItemInfoItem.serviceStatus +
                              "</td>";

                            var static1 = _this.$options.methods.getRidStatic(
                              baseNursingItemInfoItem.serviceStatus,
                              baseNursingItemInfoItem.rid
                            );
                            if (
                              static1 == "已剔除" ||
                              isNowYearMonth ||
                              showNursingCostInfoMonthOrgRid == "0" ||
                              item.rid == 0
                            ) {
                              tableTML1 += "<td>" + "已剔除" + "</td>";
                            } else {
                              if (checkStatus != "4") {
                                tableTML1 += `<td><input type='button'  class='${
                                  baseNursingItemInfoItem.schedulingPlanId
                                }' @click='ridOperation(${
                                  baseNursingItemInfoItem.schedulingPlanId
                                })' value='${static1}'></td>`;
                              } else {
                                tableTML1 += "<td>" + static1 + "</td>";
                              }
                            }
                            tableTML1 +=
                              "<td colspan='2'>" +
                              baseNursingItemInfoItem.common +
                              "</td>";
                            tableTML1 += "</tr>";
                          }
                          if (baseNursingItemInfoIndex > 0) {
                            tableTML1 += "<tr>";
                            tableTML1 +=
                              "<td>" +
                              baseNursingItemInfoItem.serviceName +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              baseNursingItemInfoItem.frequency +
                              "</td>";
                            tableTML1 +=
                              "<td>" + baseNursingItemInfoItem.price + "</td>";
                            tableTML1 +=
                              "<td>" +
                              baseNursingItemInfoItem.nursingCost +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              baseNursingItemInfoItem.staffName +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              baseNursingItemInfoItem.serviceStatus +
                              "</td>";
                            var static1 = _this.$options.methods.getRidStatic(
                              baseNursingItemInfoItem.serviceStatus,
                              baseNursingItemInfoItem.rid
                            );
                            if (
                              static1 == "已剔除" ||
                              isNowYearMonth ||
                              showNursingCostInfoMonthOrgRid == "0" ||
                              item.rid == 0
                            ) {
                              tableTML1 += "<td>" + "已剔除" + "</td>";
                            } else {
                              if (checkStatus != "4") {
                                tableTML1 += `<td><input type='button'  class='${
                                  baseNursingItemInfoItem.schedulingPlanId
                                }' @click='ridOperation(${
                                  baseNursingItemInfoItem.schedulingPlanId
                                })' value='${static1}'></td>`;
                              } else {
                                tableTML1 += "<td>" + static1 + "</td>";
                              }
                            }
                            tableTML1 +=
                              "<td colspan='2'>" +
                              baseNursingItemInfoItem.common +
                              "</td>";
                            tableTML1 += "</tr>";
                          }
                        });
                      }
                      if (medicalNursingItemInfo.length > 0) {
                        tableTML1 += "<tr>";
                        tableTML1 +=
                          "<td rowspan='" +
                          medicalNursingItemInfo.length +
                          "' style='text-align: center;vertical-align: middle'>医疗护理</td>";
                        medicalNursingItemInfo.forEach(function(
                          medicalNursingItemInfoItem,
                          medicalNursingItemInfoIndex
                        ) {
                          if (medicalNursingItemInfoIndex == 0) {
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.serviceName +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.frequency +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.price +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.nursingCost +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.staffName +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.serviceStatus +
                              "</td>";
                            var static1 = _this.$options.methods.getRidStatic(
                              medicalNursingItemInfoItem.serviceStatus,
                              medicalNursingItemInfoItem.rid
                            );
                            if (
                              static1 == "已剔除" ||
                              isNowYearMonth ||
                              showNursingCostInfoMonthOrgRid == "0" ||
                              item.rid == 0
                            ) {
                              tableTML1 += "<td>" + "已剔除" + "</td>";
                            } else {
                              if (checkStatus != "4") {
                                tableTML1 += `<td><input type='button'  class='${
                                  baseNursingItemInfoItem.schedulingPlanId
                                }' @click='ridOperation(${
                                  baseNursingItemInfoItem.schedulingPlanId
                                })' value='${static1}'></td>`;
                              } else {
                                tableTML1 += "<td>" + static1 + "</td>";
                              }
                            }
                            tableTML1 +=
                              "<td colspan='2'>" +
                              medicalNursingItemInfoItem.common +
                              "</td>";
                            tableTML1 += "</tr>";
                          }
                          if (medicalNursingItemInfoIndex > 0) {
                            tableTML1 += "<tr>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.serviceName +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.frequency +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.price +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.nursingCost +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.staffName +
                              "</td>";
                            tableTML1 +=
                              "<td>" +
                              medicalNursingItemInfoItem.serviceStatus +
                              "</td>";
                            var static1 = _this.$options.methods.getRidStatic(
                              medicalNursingItemInfoItem.serviceStatus,
                              medicalNursingItemInfoItem.rid
                            );
                            if (
                              static1 == "已剔除" ||
                              isNowYearMonth ||
                              showNursingCostInfoMonthOrgRid == "0" ||
                              item.rid == 0
                            ) {
                              tableTML1 += "<td>" + "已剔除" + "</td>";
                            } else {
                              if (checkStatus != "4") {
                                tableTML1 += `<td><input type='button'  class='${
                                  baseNursingItemInfoItem.schedulingPlanId
                                }' @click='ridOperation(${
                                  baseNursingItemInfoItem.schedulingPlanId
                                })' value='${static1}'></td>`;
                              } else {
                                tableTML1 += "<td>" + static1 + "</td>";
                              }
                            }
                            tableTML1 +=
                              "<td colspan='2'>" +
                              medicalNursingItemInfoItem.common +
                              "</td>";
                            tableTML1 += "</tr>";
                          }
                        });
                      }
                      //                                                 tableTML1   += '</tbody>'
                      //                                             var MyComponent  = Vue.extend({
                      //     template: tableTML1,
                      //     data() {
                      //       return {

                      //       };
                      //     },
                      //     methods: {

                      //       ridOperation(id){
                      //           alert('333')
                      //       },

                      //     }
                      //   });
                      //   var component = new MyComponent().$mount();
                      //   // $("#data-table").append(component.$el);
                      //             $("#" + item.serviceDate).append(component.$el);
                      $("#" + item.serviceDate).append(tableTML1);
                    } else {
                      alert("失败" + res.data.resultMsg);
                    }
                  });
              });
            }

            //先清除下除了表头之外的数据
            tableHTML += "</table>";
            $("#data-table tr:not(:first)").remove();
            // $('#data-table-stel').append(tableHTML);
            var MyComponent = Vue.extend({
              template: tableHTML,
              data() {
                return {
                  flag: false
                };
              },
              methods: {
                showNursingProjectDetail(event) {
                  var showTab = document.getElementById(event.target.className);
                  if (showTab.getAttribute("hidden") == "hidden") {
                    showTab.removeAttribute("hidden");
                  } else {
                    showTab.setAttribute("hidden", "hidden");
                  }
                },
                ridOperation(id) {
                  //     submitSchedulingPlanId = schedulingPlanId;
                  // var ridStatic = $('.'+submitSchedulingPlanId).val();
                  // if(ridStatic === '剔除'){
                  //     $('#dialogModal').modal("show");
                  //     $('#inputRidCommon').val('');
                  // }
                  // if(ridStatic === '取消剔除'){
                  //     $.get("<@sp.ctx />nursing/nursing_cost_info_month_org_mng.htm?act=ridOperation&id="+submitSchedulingPlanId+"&rid=1",function rp(ridReslut) {
                  //         $('.'+submitSchedulingPlanId).val('剔除');
                  //         $('.'+submitSchedulingPlanId).parent().next().html('');
                  //         if(ridReslut.errorCode == 0){
                  //             alert("取消成功");
                  //             dataTable1.fnDraw(true);
                  //         }
                  //     });
                  // }
                  alert("333");
                },
                //剔除某一个人某一天的
                ridOneDay(event) {
                  var data = event.target.getAttribute("zValue").split("=");
                  var data1 = event.target.getAttribute("yValue");
                  // console.log(data1)

                  // console.log(data)
                  var obj = {};
                  obj.planId = data[0];
                  obj.orgId = data[1];
                  obj.userIdcard = data[2];
                  obj.serviceDate = data1;
                  obj.balanceMonth = data[4];
                  obj.nursingCost = data[5];
                  obj.lifeNursingCost = data[6];
                  obj.medicalNursingCost = data[7];
                  obj.rid = 0;

                  _this
                    .$axios({
                      url: `${
                        _this.$store.state.globalRouter
                      }/auth/nursing/nursing_cost_info_month_org_mng.htm/rid_one_day`,
                      method: "get",
                      params: obj
                    })
                    .then(res => {
                      if (res.data.resultCode == "000000") {
                        _this.$options.methods.fyDetail1(
                          showNursingCostInfoMonthOrgRid,
                          balanceMonth,
                          userIdcard,
                          _this
                        );

                        alert("剔除成功");
                      } else {
                        alert("剔除失败" + res.data.resultMsg);
                      }
                    });
                },
                //取消剔除某一个人某一天的
                cancelRidOneDay(event) {
                  var data3 = event.target.getAttribute("zValue").split("=");

                  var obj = {};
                  obj.planId = data3[0];
                  obj.orgId = data3[1];
                  obj.userIdcard = data3[2];
                  obj.serviceDate = data3[3];
                  obj.balanceMonth = data3[4];
                  obj.lifeNursingCost = 0;
                  obj.medicalNursingCost = 0;
                  obj.rid = 1;
                  //  console.log(obj)
                  _this
                    .$axios({
                      url: `${
                        _this.$store.state.globalRouter
                      }/auth/nursing/nursing_cost_info_month_org_mng.htm/cancel_rid_one_day`,
                      method: "get",
                      params: obj
                    })
                    .then(res => {
                      if (res.data.resultCode == "000000") {
                        _this.$options.methods.fyDetail1(
                          showNursingCostInfoMonthOrgRid,
                          balanceMonth,
                          userIdcard,
                          _this
                        );
                        alert("取消剔除成功");
                      } else {
                        alert("取消剔除失败" + res.data.resultMsg);
                      }
                    });
                }
              }
            });
            $("#data-table").html("");
            var component = new MyComponent().$mount();
            $("#data-table").append(component.$el);
          } else {
            alert("失败" + res.data.resultMsg);
          }
        });
    },
    // rid(id) {
    //   this.$confirm("确定要进行发起对账操作吗?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText : "取消",
    //     type             : "warning",
    //     center           : true
    //   })
    //     .then(() => {
    //       this.$axios({
    //         url: `${
    //           this.$store.state.globalRouter
    //         }/auth/nursing/nursing_cost_info_mng/check_cost?id=${id}&checkStatus=2`,
    //         method: "get"
    //       }).then(res => {
    //         if (res.data.resultCode == "000000") {
    //           this.$options.methods.getReloadData(this);
    //           alert("成功");
    //         } else {
    //           alert("失败" + res.data.resultMsg);
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type   : "info",
    //         message: "取消操作"
    //       });
    //     });
    // },
    // 取消剔除
    cancleRid(id) {
      this.$confirm("确定要进行取消剔除操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/nursing/nursing_cost_info_month_org_mng.htm/rid?id=${
              encodeURI(this.currentId)
            }&rid=1&comment=`,
            method: "get"
          }).then(res => {
            if (res.data.resultCode == "000000") {
              this.$options.methods.getReloadData(this);
              alert("取消剔除成功");
            } else {
              alert("取消剔除失败" + res.data.resultMsg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    // 剔除
    rid(id) {
      this.dialogVisible3 = true;
      this.currentId = id;
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
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/nursing/nursing_cost_info_month_org_mng.htm/rid?id=${
              encodeURI(this.currentId)
            }&comment=${encodeURI(this.ruleFormCancel.cancelWhy)}&rid=0`,
            method: "get"
          }).then(res => {
            if (res.data.resultCode == "000000") {
              this.dialogVisible3 = false;
              this.$options.methods.getReloadData(this);
              alert("剔除成功");
            } else {
              alert("剔除失败" + res.data.resultMsg);
            }
          });
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
      var newdata2 = [];

      var dataArray = tableData;

      dataArray.forEach(el => {
        // if (el.createTime) {
        //   newdata.push(
        //     this.$moment(el.createTime).format("YYYY-MM-DD HH:mm:ss")
        //   );
        // }
        if (el.special) {
          if (el.special == 1) {
            newdata1.push("五保户");
          } else if (el.special == 2) {
            newdata1.push("低保户");
          } else if (el.special == 3) {
            newdata1.push("困难户");
          } else {
            newdata1.push("");
          }
        }

        if (el.handicapped) {
          if (el.handicapped == 1) {
            newdata1.push("残疾人");
          } else {
            newdata1.push("");
          }
        }
      });

      this.transform1(dataArray, newdata1);
      this.transform2(dataArray, newdata2);

      this.datalists = dataArray;
    },

    transform1(old, insert) {
      old.forEach((el, index) => {
        el.special = insert[index];
      });
    },
    transform2(old, insert) {
      old.forEach((el, index) => {
        el.handicapped = insert[index];
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
        }/auth/nursing/nursing_cost_info_month_org_mng.htm/pagination?balanceMonth=${
          encodeURI(this.balanceMonth)
        }&orgName=${encodeURI(this.orgName)}&pageSize=${
          encodeURI(this.changePageSize)
        }&pageNo=${encodeURI(val)}&userName=${encodeURI(this.orderForm.name)}`,
        method: "get"
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
          }/auth/nursing/nursing_cost_info_month_org_mng.htm/pagination?balanceMonth=${
            encodeURI(that.balanceMonth)
          }&orgName=${encodeURI(that.orgName)}&pageNo=${encodeURI(that.currentPage)}&pageSize=${
            encodeURI(that.changePageSize)
          }&userName=${encodeURI(that.orderForm.name)}`,
          method: "get"
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
    // this.getData();
    this.balanceMonth = window.localStorage.getItem("balanceMonth");
    this.orgName = window.localStorage.getItem("orgName");
    this.checkStatus = window.localStorage.getItem("checkStatus");
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_cost_info_month_org_mng.htm/pagination?balanceMonth=${
        encodeURI(this.balanceMonth)
      }&orgName=${encodeURI(this.orgName)}`,
      method: "get"
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
  overflow-x: auto;
}

</style>
