<template>
  <div style="padding:20px;height:100%;">
    <div style="background: rgb(255, 255, 255);padding:10px;text-align: left;">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="按护理人" name="first">
          <el-form :inline="true" class="demo-form-inline" size="mini" style="text-align:left;">
            <el-form-item label="机构名称:">
              <el-select
                v-model="orgName"
                placeholder="请选择机构名称"
                style="width:220px"
                size="mini"
                clearable
              >
                <el-option
                  v-for="(item,index) in disOrg"
                  :value="item.orgId"
                  :key="index"
                  :label="item.orgName"
                >{{item.orgName}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="人员类型:">
              <el-select
                v-model="staffType"
                placeholder="请选择人员类型"
                style="width:150px"
                size="mini"
                clearable
              >
                <el-option label="全部" value></el-option>
                <el-option label="护理员" value="1"></el-option>
                <el-option label="护士" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="人员姓名:">
              <el-input v-model.trim="nameSearch" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>

            <el-form-item label="状态:">
              <el-select
                v-model="statusSearch"
                placeholder="请选择人员类型"
                style="width:150px"
                size="mini"
                clearable
              >
                <el-option label="全部" value></el-option>
                <el-option label="待护理" value="0"></el-option>
                <el-option label="已完成" value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="querySchedulingPlanByStaff(1)"
                icon="el-icon-search"
              >查询</el-button>
            </el-form-item>
          </el-form>
          <div class="panel-body" style="padding:0; overflow:hidden;">
            <h6>
              <div class="pull-right">
                <ul class="tag-box" style="float:left;">
                  <li style="float:left;">
                    <span>
                      <i class="colori1"></i>待护理&nbsp;&nbsp;&nbsp;
                    </span>
                  </li>
                  <li style="float:left;">
                    <span>
                      <i class="colori2"></i>已完成
                    </span>
                  </li>
                </ul>
                <button
                  name="last-week1"
                  type="button"
                  class="btn btn-sm glyphicon glyphicon-chevron-left"
                  style="float:left;"
                  @click="lastweek1()"
                ></button>
                <!-- <button
                  name   = "this-week1"
                  type   = "button"
                  class  = "btn btn-sm"
                  style  = "float:left;"
                  @click = "querySchedulingPlanByStaff(2)"
                >本周</button>-->
                <button
                  name="this-week1"
                  type="button"
                  class="btn btn-sm"
                  style="float:left;"
                  @click="currentWeek1()"
                >本周</button>
                <button
                  name="next-week1"
                  type="button"
                  class="btn btn-sm glyphicon glyphicon-chevron-right"
                  style="float:left;"
                  @click="nextweek1()"
                ></button>
              </div>
            </h6>
          </div>

          <div class="dataTables_wrapper no-footer" style="height:680px;overflow:auto;">
            <div class="bed_wrap">
              <table
                id="data-table-stel"
                name="SchedulingTable1"
                class="table table-striped table-bordered table_head"
                style="white-space: nowrap; width:100%; "
              >
                <thead>
                  <tr name="weekTr">
                    <th colspan="2"></th>
                    <th name="weekday">{{weekdayArray1[0]}}</th>
                    <th name="weekday">{{weekdayArray1[1]}}</th>
                    <th name="weekday">{{weekdayArray1[2]}}</th>
                    <th name="weekday">{{weekdayArray1[3]}}</th>
                    <th name="weekday">{{weekdayArray1[4]}}</th>
                    <th name="weekday">{{weekdayArray1[5]}}</th>
                    <th name="weekday">{{weekdayArray1[6]}}</th>
                  </tr>
                  <tr>
                    <th>人员类型</th>
                    <th>护理人员</th>
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th>周六</th>
                    <th>周日</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按参保人" name="second">
          <el-form :inline="true" class="demo-form-inline" size="mini" style="text-align:left;">
            <el-form-item label="机构名称:">
              <el-select
                v-model="orgName1"
                placeholder="请选择机构名称"
                style="width:220px"
                size="mini"
                clearable
              >
                <el-option
                  v-for="(item,index) in disOrg"
                  :value="item.orgId"
                  :key="index"
                  :label="item.orgName"
                >{{item.orgName}}</el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="参保人姓名:">
              <el-input v-model.trim="nameSearch1" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>

            <el-form-item label="状态:">
              <el-select
                v-model="statusSearch1"
                placeholder="请选择人员类型"
                style="width:150px"
                size="mini"
                clearable
              >
                <el-option label="全部" value></el-option>
                <el-option label="待护理" value="0"></el-option>
                <el-option label="已完成" value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="querySchedulingPlanByInsUser(1)"
                icon="el-icon-search"
              >查询</el-button>
            </el-form-item>
          </el-form>
          <div class="panel-body" style="padding:0; overflow:hidden;">
            <h6>
              <div class="pull-right">
                <ul class="tag-box">
                  <li>
                    <span>
                      <i class="colori1"></i>待护理&nbsp;&nbsp;&nbsp;
                    </span>
                  </li>
                  <li>
                    <span>
                      <i class="colori2"></i>已完成
                    </span>
                  </li>
                  <!-- <li >
																<span><i class="colori3"></i>已取消</span>
                  </li>-->
                </ul>
                <button
                  name="last-week2"
                  type="button"
                  class="btn btn-sm glyphicon glyphicon-chevron-left"
                  @click="lastweek2()"
                ></button>
                <!-- <button
                  name   = "this-week2"
                  type   = "button"
                  class  = "btn btn-sm"
                  @click = "querySchedulingPlanByInsUser(2)"
                >本周</button>-->
                <button
                  name="this-week2"
                  type="button"
                  class="btn btn-sm"
                  @click="currentWeek2()"
                >本周</button>
                <button
                  name="next-week2"
                  type="button"
                  class="btn btn-sm glyphicon glyphicon-chevron-right"
                  @click="nextweek2()"
                ></button>
              </div>
            </h6>
          </div>

          <div class="dataTables_wrapper no-footer" style="height:680px;overflow:auto;">
            <div class="bed_wrap">
              <table
                id="data-table-stel"
                name="SchedulingTable2"
                class="table table-striped table-bordered table_head"
                style="white-space: nowrap; width:100%;"
              >
                <thead>
                  <tr name="weekTr">
                    <th></th>
                    <th name="weekday">{{weekdayArray2[0]}}</th>
                    <th name="weekday">{{weekdayArray2[1]}}</th>
                    <th name="weekday">{{weekdayArray2[2]}}</th>
                    <th name="weekday">{{weekdayArray2[3]}}</th>
                    <th name="weekday">{{weekdayArray2[4]}}</th>
                    <th name="weekday">{{weekdayArray2[5]}}</th>
                    <th name="weekday">{{weekdayArray2[6]}}</th>
                  </tr>
                  <tr>
                    <th>参保人</th>
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th>周六</th>
                    <th>周日</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :visible.sync="dialogVisible1"
      width="600px"
      :before-close="handleClose1"
      style="text-align:left;"
      title="排班详情"
    >
      <!-- <span
          slot  = "header"
          class = "dialog-header"
          hidden
      >-->

      <!-- </span> -->

      <div class="modal-body" id="hlxmModal">
        <form class="form-horizontal" style="overflow:hidden">
          <input type="hidden" name="serviceDate">
          <input type="hidden" name="hlxmName">
          <input type="hidden" name="serviceType">
          <input type="hidden" name="frequency">

          <div class="form-group">
            <label class="control-label col-md-3 col-xs-3">人员类型：</label>
            <div class="col-md-9 col-xs-9">
              <input v-model="serviceStaffType" disabled style="width:100%;display:inline-block;">
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-md-3 col-xs-3">护理人员：</label>
            <div class="col-md-9 col-xs-9">
              <input
                v-model="serviceCurrentStaff"
                disabled
                style="width:100%;display:inline-block;"
              >
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-md-3 col-xs-3">参保人：</label>
            <div class="col-md-9 col-xs-9">
              <input v-model="userName" disabled style="width:100%;display:inline-block;">
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-md-3 col-xs-3">护理项目：</label>
            <div class="col-md-9 col-xs-9">
              <input v-model="serviceName" disabled style="width:100%;display:inline-block;">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-xs-3">护理开始时间:</label>
            <div class="col-md-9 col-xs-9">
              <div class="col-md-4 col-xs-4" style="padding:0;">
                <input v-model="hlsj" disabled style="width:100%;display:inline-block;">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-xs-3">护理项目时长：</label>
            <div class="col-md-9 col-xs-9">
              <div class="col-md-4 col-xs-4" style="padding:0">
                <input v-model="serviceDuration" disabled style="width:100%;display:inline-block;">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-xs-3">护理状态：</label>
            <div class="col-md-9 col-xs-9">
              <div class="col-md-4 col-xs-4" style="padding:0">
                <input v-model="hlStatus" disabled style="width:100%;display:inline-block;">
              </div>

              <!-- <div class="col-md-3">
<button type="button" class="btn btn-danger btn-sm" >请求外援</button>
              </div>-->
            </div>
          </div>
        </form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      activeName2: "first",
      // 按护理人搜索相关
      orgName: "",
      staffType: "",
      nameSearch: "",
      statusSearch: "",
      //按参保人搜索相关
      orgName1: "",
      nameSearch1: "",
      statusSearch1: "",
      disOrg: [],

      weekdayArray: [],
      weekdayArray1: [],
      weekdayArray2: [],
      servicePlanItemIdType1Array: [],
      servicePlanItemIdType2Array: [],

      //按护理人详情展示
      dialogVisible1: false,
      serviceStaffType: null,
      serviceCurrentStaff: null,
      userName: null,
      serviceName: null,
      hlsj: null,
      hlStatus: null,
      serviceDuration: null
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose1(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    // 原来的函数
    lastweek1() {
      var date = this.$moment(this.weekdayArray1[0]).subtract(7, "days");
      date = this.$moment(date).format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "1", this);
      //   console.log(this.weekdayArray1)
      this.$options.methods.querySchedulingPlanByStaff1(this);
      // console.log('上一周',this.servicePlanItemIdType1Array,this.weekdayArray1)
    },
    currentWeek1() {
      var date = this.$moment().format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "1", this);
      this.$options.methods.querySchedulingPlanByStaff1(this);
    },
    nextweek1() {
      var date = this.$moment(this.weekdayArray1[0]).add(7, "days");
      date = this.$moment(date).format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "1", this);
      this.$options.methods.querySchedulingPlanByStaff1(this);
      // console.log('上一周',this.servicePlanItemIdType1Array,this.weekdayArray1)
    },
    lastweek2() {
      var date = this.$moment(this.weekdayArray2[0]).subtract(7, "days");
      date = this.$moment(date).format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "2", this);

      this.$options.methods.querySchedulingPlanByInsUser1(this);
      // console.log('上一周',this.servicePlanItemIdType1Array,this.weekdayArray1)
    },
    currentWeek2() {
      var date = this.$moment().format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "2", this);
      this.$options.methods.querySchedulingPlanByInsUser1(this);
    },
    nextweek2() {
      var date = this.$moment(this.weekdayArray2[0]).add(7, "days");
      date = this.$moment(date).format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "2", this);
      this.$options.methods.querySchedulingPlanByInsUser1(this);
      // console.log('上一周',this.servicePlanItemIdType1Array,this.weekdayArray1)
    },
    formDate(date, that) {
      var date = that.$moment(date).format("YYYY-MM-DD");
      return date;
    },
    addDate(date, n) {
      date.setDate(date.getDate() + n);
      return date;
    },
    setDate(date, tableNo, that) {
      var myModelTable = $("#modalFrom");
      var specialarray = ["不是", "五保户", "低保户", "困难户"];
      var handicarray = ["不是", "是"];
      //表示当前已经点击到的日期
      var currentFirstDate1;
      var currentFirstDate2;

      // var week = date.getDay()-1;
      //     date = date.setDate(date.getDate()+week*-1)

      var oldWeekdayArray;
      switch (tableNo) {
        case "1":
          currentFirstDate1 = new Date(date);

          oldWeekdayArray = that.weekdayArray1;

          that.weekdayArray1 = new Array();
          // 使第一天为周一，日期对上
          if (that.$moment(currentFirstDate1).format("dddd") == "Tuesday") {
            date = that.$moment(date).subtract(1, "days");
          } else if (
            that.$moment(currentFirstDate1).format("dddd") == "Wednesday"
          ) {
            date = that.$moment(date).subtract(2, "days");
          } else if (
            that.$moment(currentFirstDate1).format("dddd") == "Thursday"
          ) {
            date = that.$moment(date).subtract(3, "days");
          } else if (
            that.$moment(currentFirstDate1).format("dddd") == "Friday"
          ) {
            date = that.$moment(date).subtract(4, "days");
          } else if (
            that.$moment(currentFirstDate1).format("dddd") == "Saturday"
          ) {
            date = that.$moment(date).subtract(5, "days");
          } else if (
            that.$moment(currentFirstDate1).format("dddd") == "Sunday"
          ) {
            date = that.$moment(date).subtract(6, "days");
          }
          break;
        case "2":
          currentFirstDate2 = new Date(date);
          oldWeekdayArray = that.weekdayArray2;
          that.weekdayArray2 = new Array();
          // 使第一天为周一，日期对上

          if (that.$moment(currentFirstDate2).format("dddd") == "Tuesday") {
            date = that.$moment(date).subtract(1, "days");
          } else if (
            that.$moment(currentFirstDate2).format("dddd") == "Wednesday"
          ) {
            date = that.$moment(date).subtract(2, "days");
          } else if (
            that.$moment(currentFirstDate2).format("dddd") == "Thursday"
          ) {
            date = that.$moment(date).subtract(3, "days");
          } else if (
            that.$moment(currentFirstDate2).format("dddd") == "Friday"
          ) {
            date = that.$moment(date).subtract(4, "days");
          } else if (
            that.$moment(currentFirstDate2).format("dddd") == "Saturday"
          ) {
            date = that.$moment(date).subtract(5, "days");
          } else if (
            that.$moment(currentFirstDate2).format("dddd") == "Sunday"
          ) {
            date = that.$moment(date).subtract(6, "days");
          }

          break;
        default:
          alert("护理类型错误，设置日期失败");
          return false;
          break;
      }

      // console.log('date',);
      var cells = $("table[name='SchedulingTable" + tableNo + "']")
        .find("tr[name='weekTr']")
        .find("th[name='weekday']");

      //循环为单元格进行赋值
      for (var i = 0; i < cells.length; i++) {
        var oldTd = $("table[name='SchedulingTable" + tableNo + "']").find(
          "td[name*='" + oldWeekdayArray[i] + "']"
        );
        // cells[i].innerHTML = that.$options.methods.formDate(i==0 ? date : date.setDate(date.getDate()+1),that);
        if(tableNo==1 || tableNo=='1'){
          that.weekdayArray1[i]= that.$options.methods.formDate(
            i == 0 ? date : that.$moment(date).add(i, "days"),
            that
          );
          oldTd.each(function() {
            $(this).attr(
              "name",
              $(this)
                .attr("name")
                .split("_")[0] +
                "_" +
                that.weekdayArray1[i]
            );
          });
        }else if(tableNo==2 || tableNo=='2'){
          that.weekdayArray2[i]= that.$options.methods.formDate(
            i == 0 ? date : that.$moment(date).add(i, "days"),
            that
          );
          oldTd.each(function() {
            $(this).attr(
              "name",
              $(this)
                .attr("name")
                .split("_")[0] +
                "_" +
                that.weekdayArray2[i]
            );
          });
        }else{
          console.log('护理类型错误，设置日期失败')
        }
        // cells[i].innerHTML = that.$options.methods.formDate(
        //   i == 0 ? date : that.$moment(date).add(i, "days"),
        //   that
        // );
        // switch (tableNo) {
        //   case "1":
        //     // console.log('11',that.weekdayArray1)
        //     that.weekdayArray1.push(cells[i].innerHTML);
        //     break;
        //   case "2":
        //     that.weekdayArray2.push(cells[i].innerHTML);
        //     break;
        //   default:
        //     alert("护理类型错误，设置日期失败");
        //     return false;
        //     break;
        // }
        // oldTd.each(function() {
        //   $(this).attr(
        //     "name",
        //     $(this)
        //       .attr("name")
        //       .split("_")[0] +
        //       "_" +
        //       cells[i].innerHTML
        //   );
        // });
      }
    },

    querySchedulingPlanByStaff1(that) {
      var staffUserClassmap = {};
      staffUserClassmap[1] = "护理员";
      staffUserClassmap[2] = "护士";
      var currentFirstDate1;
      var currentFirstDate2;

      var param = new Array();
      param.push({ name: "orgId", value: $("#orgId1").val() });
      param.push({ name: "staffNameLike", value: $("#staffNameLike1").val() });
      param.push({ name: "staffClass", value: $("#staffClass1").val() });
      param.push({ name: "weekdayArray", value: that.weekdayArray1 });
      param.push({ name: "serviceStatus", value: $("#serviceStatus1").val() });

      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_scheduling_mng/query_scheduling_manage_by_staff?orgId=${
            encodeURI(that.orgName)
          }&staffNameLike=${encodeURI(that.nameSearch)}&staffClass=${
            encodeURI(that.staffType)
          }&weekdayArray=${encodeURI(that.weekdayArray1)}&serviceStatus=${
            encodeURI(that.statusSearch)
          }`,
          method: "get"
        })
        .then(res => {
          var result = res.data.data;
          // console.log(result)
          if (res.data.resultCode == "000000") {
            var html = "<tbody>";
            if (result && result.length > 0) {
              for (let i = 0; i < result.length; i++) {
                var object = result[i];
                var nursingServiceStaffClass =
                  object.nursingServiceStaffClass + "";

                html += "<tr>";
                html +=
                  "	<td>" +
                  staffUserClassmap[object.nursingServiceStaffClass] +
                  "<input type='hidden' name='staffClass' value='" +
                  object.nursingServiceStaffClass +
                  "'></td>";
                html +=
                  "	<td>" +
                  object.nursingServiceStaffName +
                  "<input type='hidden' name='staffName' value='" +
                  object.nursingServiceStaffName +
                  "'></td>";
                for (let j = 0; j < that.weekdayArray1.length; j++) {
                  var weekday = that.weekdayArray1[j];
                  var SchedulingList = object.schedulingListMap[weekday];
                  // console.log(SchedulingList);
                  html += "	<td>";
                  for (let k = 0; k < SchedulingList.length; k++) {
                    var Scheduling = SchedulingList[k];
                    html += "<div>";
                    var color;
                    switch (Scheduling.serviceStatus) {
                      case 0:
                        color = "color1";
                        break;
                      case 1:
                        color = "color2";
                        break;
                      default:
                        break;
                    }

                    // 组件内传值的时候不知道为什么字符串会
                    //${object.nursingServiceStaffClass},${object.nursingServiceStaffName},${Scheduling.userName},${Scheduling.servicePlanItemName},${that.$moment(Scheduling.serviceStartTime).format('HH:mm')},${Scheduling.servicePlanItemId},${Scheduling.serviceStatus}
                    if (Scheduling.serviceStatus == 0) {
                      html += `<button class='${color}hlxm_pop1' @click='abc' style='background-color:#FFCE9D;width:100%;height:100%;color:#000;margin-bottom:5px;line-height:30px;padding:0 10px;font-size:12px;border:none;outline:none;vertical-align:middle;font-weight:300;border-radius:3px;'>${that
                        .$moment(Scheduling.serviceStartTime)
                        .format("HH:mm")}&nbsp;&nbsp;${
                        Scheduling.userName
                      }</button>`;
                    } else if (Scheduling.serviceStatus == 1) {
                      html += `<button class='${color}hlxm_pop1' @click='abc' style='background-color:#A3E0C2;width:100%;height:100%;color:#000;margin-bottom:5px;line-height:30px;padding:0 10px;font-size:12px;border:none;outline:none;vertical-align:middle;font-weight:300;border-radius:3px;'>${that
                        .$moment(Scheduling.serviceStartTime)
                        .format("HH:mm")}&nbsp;&nbsp;${
                        Scheduling.userName
                      }</button>`;
                    }
                    // html += "	<button class='"+color+" hlxm_pop1'>"+Scheduling.serviceStartTime.substring(11,16)+" "+Scheduling.userName+"</button>";

                    html +=
                      "	<input type='hidden' name='userName' value='" +
                      Scheduling.userName +
                      "'>";
                    html +=
                      "	<input type='hidden' name='serviceName' value='" +
                      Scheduling.servicePlanItemName +
                      "'>";
                    html +=
                      "	<input type='hidden' name='serviceStartTime' value='" +
                      Scheduling.serviceStartTime +
                      "'>";
                    html +=
                      "	<input type='hidden' name='serviceDuration' value='" +
                      Scheduling.serviceDuration +
                      "'>";
                    html +=
                      "	<input type='hidden' name='serviceStatus' value='" +
                      Scheduling.serviceStatus +
                      "'>";
                    html +=
                      "<input type='hidden' name='staffClass' value='" +
                      object.nursingServiceStaffClass +
                      "'>";
                    html +=
                      "<input type='hidden' name='staffName' value='" +
                      object.nursingServiceStaffName +
                      "'>";
                    html += "</div>";
                  }
                  html += "	</td>";
                }
                html += "</tr>";
              }

              html += "</tbody>";
              var MyComponent = Vue.extend({
                template: html,
                data() {
                  return {};
                },
                methods: {
                  abc(event) {
                    that.dialogVisible1 = true;
                    // 获取当前目标元素的父元素时不要用函数形式

                    // console.log('222',event.srcElement,event.srcElement.parentElement.childNodes);
                    var data = event.srcElement.parentElement.childNodes;
                    // console.log(data[0].innerHTML.split('&')[0],"userName  "+data[2].value,"serviceName "+data[4].value,'serviceStartTime  '+data[6].value,"serviceStatus "+data[8].value,'staffClass '+data[9].value,'staffName '+data[10].value)
                    if (data[11].value == 1) {
                      that.serviceStaffType = "护理员";
                    } else if (data[11].value == 2) {
                      that.serviceStaffType = "护士";
                    }

                    that.serviceCurrentStaff = data[12].value;
                    that.userName = data[2].value;
                    that.serviceName = data[4].value;
                    that.hlsj = data[0].innerHTML.split("&")[0];
                    if (data[10].value == 0) {
                      that.hlStatus = "待护理";
                    } else if (data[10].value == 1) {
                      that.hlStatus = "已护理";
                    }
                    that.serviceDuration = data[8].value;
                  }
                }
              });
              var component = new MyComponent().$mount();
              var divData = $("table[name='SchedulingTable1']").find("tbody");
              //         remove() - 删除被选元素（及其子元素）
              // empty() - 从被选元素中删除子元素
              divData.remove();
              // $("table[name='SchedulingTable1']").find("tbody").html("");
              $("table[name='SchedulingTable1']").append(component.$el);
            } else {
              var divData = $("table[name='SchedulingTable1']").find("tbody");
              divData.remove();

              $("table[name='SchedulingTable1']").append(
                `<tbody><tr><td colspan="9" style='text-align:center;'>暂无数据</td></tr></tbody>`
              );
              // $("table[name='SchedulingTable1']").find("tbody").html("");
              // $("table[name='SchedulingTable1']").find("tbody").html('暂无数据');
            }
          } else {
            alert("读取信息失败，错误信息：" + res.data.resultMsg);
          }
        });
    },
    querySchedulingPlanByStaff(type) {
      var weekday;
      if (type == 1) {
        weekday = this.weekdayArray1;
      } else {
        weekday = this.weekdayArray;

        var date = this.$moment(weekday[0]);
        date = this.$moment(date).format("YYYY-MM-DD");
        //   console.log(date)
        this.$options.methods.setDate(date, "1", this);
      }

      var staffUserClassmap = {};
      staffUserClassmap[1] = "护理员";
      staffUserClassmap[2] = "护士";
      var currentFirstDate1;
      var currentFirstDate2;

      var param = new Array();
      param.push({ name: "orgId", value: $("#orgId1").val() });
      param.push({ name: "staffNameLike", value: $("#staffNameLike1").val() });
      param.push({ name: "staffClass", value: $("#staffClass1").val() });
      param.push({ name: "weekdayArray", value: this.weekdayArray1 });
      param.push({ name: "serviceStatus", value: $("#serviceStatus1").val() });

      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_scheduling_mng/query_scheduling_manage_by_staff?orgId=${
          encodeURI(this.orgName)
        }&staffNameLike=${encodeURI(this.nameSearch)}&staffClass=${
          encodeURI(this.staffType)
        }&weekdayArray=${encodeURI(weekday)}&serviceStatus=${encodeURI(this.statusSearch)}`,
        method: "get"
      }).then(res => {
        var result = res.data.data;

        if (res.data.resultCode == "000000") {
          var html = "<tbody>";
          if (result && result.length > 0) {
            for (var i = 0; i < result.length; i++) {
              var object = result[i];
              html += "<tr>";
              html +=
                "	<td>" +
                staffUserClassmap[object.nursingServiceStaffClass] +
                "<input type='hidden' name='staffClass' value='" +
                object.nursingServiceStaffClass +
                "'></td>";
              html +=
                "	<td>" +
                object.nursingServiceStaffName +
                "<input type='hidden' name='staffName' value='" +
                object.nursingServiceStaffName +
                "'></td>";
              for (var j = 0; j < weekday.length; j++) {
                var weekday1 = weekday[j];
                var SchedulingList = object.schedulingListMap[weekday1];
                // console.log(SchedulingList);
                html += "	<td>";
                for (var k = 0; k < SchedulingList.length; k++) {
                  var Scheduling = SchedulingList[k];
                  html += "<div>";
                  var color;
                  switch (Scheduling.serviceStatus) {
                    case 0:
                      color = "color1";
                      break;
                    case 1:
                      color = "color2";
                      break;
                    default:
                      break;
                  }
                  if (Scheduling.serviceStatus == 0) {
                    html += `<button class='${color}hlxm_pop1'  @click='abc' style='background-color:#FFCE9D;width:100%;height:100%;color:#000;margin-bottom:5px;line-height:30px;padding:0 10px;font-size:12px;border:none;outline:none;vertical-align:middle;font-weight:300;border-radius:3px;'>${this.$moment(
                      Scheduling.serviceStartTime
                    ).format("HH:mm")}&nbsp;&nbsp;${
                      Scheduling.userName
                    }</button>`;
                  } else if (Scheduling.serviceStatus == 1) {
                    html += `<button class='${color}hlxm_pop1' @click='abc' style='background-color:#A3E0C2;width:100%;height:100%;color:#000;margin-bottom:5px;line-height:30px;padding:0 10px;font-size:12px;border:none;outline:none;vertical-align:middle;font-weight:300;border-radius:3px;'>${this.$moment(
                      Scheduling.serviceStartTime
                    ).format("HH:mm")}&nbsp;&nbsp;${
                      Scheduling.userName
                    }</button>`;
                  }
                  // html += "	<button class='"+color+" hlxm_pop1'>"+Scheduling.serviceStartTime.substring(11,16)+" "+Scheduling.userName+"</button>";

                  html +=
                    "	<input type='hidden' name='userName' value='" +
                    Scheduling.userName +
                    "'>";
                  html +=
                    "	<input type='hidden' name='serviceName' value='" +
                    Scheduling.servicePlanItemName +
                    "'>";
                  html +=
                    "	<input type='hidden' name='serviceStartTime' value='" +
                    Scheduling.serviceStartTime +
                    "'>";
                  html +=
                    "	<input type='hidden' name='serviceDuration' value='" +
                    Scheduling.serviceDuration +
                    "'>";
                  html +=
                    "	<input type='hidden' name='serviceStatus' value='" +
                    Scheduling.serviceStatus +
                    "'>";
                  html +=
                    "<input type='hidden' name='staffClass' value='" +
                    object.nursingServiceStaffClass +
                    "'>";
                  html +=
                    "<input type='hidden' name='staffName' value='" +
                    object.nursingServiceStaffName +
                    "'>";
                  html += "</div>";
                }
                html += "	</td>";
              }

              html += "</tr>";
            }
            html += "</tbody>";
            var that = this;
            var MyComponent = Vue.extend({
              template: html,
              data() {
                return {};
              },
              methods: {
                abc(event) {
                  that.dialogVisible1 = true;
                  // 获取当前目标元素的父元素时不要用函数形式

                  // console.log('222',event.srcElement,event.srcElement.parentElement.childNodes);
                  var data = event.srcElement.parentElement.childNodes;
                  // console.log(data[0].innerHTML.split('&')[0],"userName  "+data[2].value,"serviceName "+data[4].value,'serviceStartTime  '+data[6].value,"serviceStatus "+data[8].value,'staffClass '+data[9].value,'staffName '+data[10].value)
                  if (data[11].value == 1) {
                    that.serviceStaffType = "护理员";
                  } else if (data[11].value == 2) {
                    that.serviceStaffType = "护士";
                  }

                  that.serviceCurrentStaff = data[12].value;
                  that.userName = data[2].value;
                  that.serviceName = data[4].value;
                  that.hlsj = data[0].innerHTML.split("&")[0];
                  if (data[10].value == 0) {
                    that.hlStatus = "待护理";
                  } else if (data[10].value == 1) {
                    that.hlStatus = "已护理";
                  }
                  that.serviceDuration = data[8].value;
                }
              }
            });
            var component = new MyComponent().$mount();
            var divData = $("table[name='SchedulingTable1']").find("tbody");
            //         remove() - 删除被选元素（及其子元素）
            // empty() - 从被选元素中删除子元素
            divData.remove();
            // $("table[name='SchedulingTable1']").find("tbody").html("");
            $("table[name='SchedulingTable1']").append(component.$el);
          } else {
            var divData = $("table[name='SchedulingTable1']").find("tbody");

            divData.remove();

            $("table[name='SchedulingTable1']").append(
              `<tbody><tr><td colspan="9" style='text-align:center;'>暂无数据</td></tr></tbody>`
            );
            // $("table[name='SchedulingTable1']").find("tbody").html("");
            // $("table[name='SchedulingTable1']").find("tbody").html('暂无数据');
          }
        } else {
          alert("读取信息失败，错误信息：" + res.data.resultMsg);
        }
      });
    },
    querySchedulingPlanByInsUser1(that) {
      var staffUserClassmap = {};
      staffUserClassmap[1] = "护理员";
      staffUserClassmap[2] = "护士";
      var currentFirstDate1;
      var currentFirstDate2;
      var param = new Array();
      param.push({ name: "orgId", value: $("#orgId2").val() });
      param.push({ name: "userNameLike", value: $("#userNameLike2").val() });
      param.push({ name: "staffClass", value: $("#staffClass2").val() });
      param.push({ name: "weekdayArray", value: that.weekdayArray2 });
      param.push({ name: "serviceStatus", value: $("#serviceStatus2").val() });
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_scheduling_mng/query_scheduling_plan_by_ins_user?orgId=${
            encodeURI(that.orgName1)
          }&userNameLike=${encodeURI(that.nameSearch1)}&weekdayArray=${
            encodeURI(that.weekdayArray2)
          }&serviceStatus=${encodeURI(that.statusSearch1)}`,
          method: "get"
        })
        .then(res => {
          var result = res.data.data;
          console.log(result);
          if (res.data.resultCode == "000000") {
            var html = "<tbody>";
            if (result && result.length > 0) {
              for (let i = 0; i < result.length; i++) {
                var object = result[i];

                html += "<tr>";
                html +=
                  "	<td>" +
                  object.insUserName +
                  "<input type='hidden' name='userName' value='" +
                  object.insUserName +
                  "'></td>";
                for (let j = 0; j < that.weekdayArray2.length; j++) {
                  var weekday = that.weekdayArray2[j];
                  var SchedulingList = object.schedulingListMap[weekday];
                  // console.log(SchedulingList);
                  html += "	<td>";
                  for (let k = 0; k < SchedulingList.length; k++) {
                    var Scheduling = SchedulingList[k];
                    html += "<div>";
                    var color;
                    switch (Scheduling.serviceStatus) {
                      case 0:
                        color = "color1";
                        break;
                      case 1:
                        color = "color2";
                        break;
                      default:
                        break;
                    }

                    // 组件内传值的时候不知道为什么字符串会
                    //${object.nursingServiceStaffClass},${object.nursingServiceStaffName},${Scheduling.userName},${Scheduling.servicePlanItemName},${that.$moment(Scheduling.serviceStartTime).format('HH:mm')},${Scheduling.servicePlanItemId},${Scheduling.serviceStatus}
                    if (Scheduling.serviceStatus == 0) {
                      html += `<button class='${color}hlxm_pop2'  @click='abc' style='background-color:#FFCE9D;width:100%;height:100%;color:#000;margin-bottom:5px;line-height:30px;padding:0 10px;font-size:12px;border:none;outline:none;vertical-align:middle;font-weight:300;border-radius:3px;'>${that
                        .$moment(Scheduling.serviceStartTime)
                        .format("HH:mm")}&nbsp;&nbsp;${
                        Scheduling.nursingServiceStaffName
                      }</button>`;
                    } else if (Scheduling.serviceStatus == 1) {
                      html += `<button class='${color}hlxm_pop2' @click='abc' style='background-color:#A3E0C2;width:100%;height:100%;color:#000;margin-bottom:5px;line-height:30px;padding:0 10px;font-size:12px;border:none;outline:none;vertical-align:middle;font-weight:300;border-radius:3px;'>${that
                        .$moment(Scheduling.serviceStartTime)
                        .format("HH:mm")}&nbsp;&nbsp;${
                        Scheduling.nursingServiceStaffName
                      }</button>`;
                    }
                    // html += "	<button class='"+color+" hlxm_pop1'>"+Scheduling.serviceStartTime.substring(11,16)+" "+Scheduling.userName+"</button>";
                    // html += "	<button class='"+color+" hlxm_pop1'>"+Scheduling.serviceStartTime.substring(11,16)+" "+Scheduling.userName+"</button>";
                    html +=
                      "	<input type='hidden' name='userName' value='" +
                      Scheduling.userName +
                      "'>";
                    html +=
                      "	<input type='hidden' name='serviceName' value='" +
                      Scheduling.servicePlanItemName +
                      "'>";
                    html +=
                      "	<input type='hidden' name='serviceStartTime' value='" +
                      Scheduling.serviceStartTime +
                      "'>";
                    html +=
                      "	<input type='hidden' name='serviceDuration' value='" +
                      Scheduling.serviceDuration +
                      "'>";
                    html +=
                      "	<input type='hidden' name='serviceStatus' value='" +
                      Scheduling.serviceStatus +
                      "'>";
                    html +=
                      "<input type='hidden' name='staffClass' value='" +
                      Scheduling.userClass +
                      "'>";
                    html +=
                      "<input type='hidden' name='staffName' value='" +
                      Scheduling.nursingServiceStaffName +
                      "'>";

                    html += "</div>";
                  }
                  html += "	</td>";
                }
                html += "</tr>";
              }

              html += "</tbody>";
              var MyComponent = Vue.extend({
                template: html,
                data() {
                  return {};
                },
                methods: {
                  abc(event) {
                    that.dialogVisible1 = true;
                    // 获取当前目标元素的父元素时不要用函数形式

                    // console.log('222',event.srcElement,event.srcElement.parentElement.childNodes);
                    var data = event.srcElement.parentElement.childNodes;
                    // console.log(data[0].innerHTML.split('&')[0],"userName  "+data[2].value,"serviceName "+data[4].value,'serviceStartTime  '+data[6].value,"serviceStatus "+data[8].value,'staffClass '+data[9].value,'staffName '+data[10].value)
                    if (data[11].value == 1) {
                      that.serviceStaffType = "护理员";
                    } else if (data[11].value == 2) {
                      that.serviceStaffType = "护士";
                    }

                    that.serviceCurrentStaff = data[12].value;
                    that.userName = data[2].value;
                    that.serviceName = data[4].value;
                    that.hlsj = data[0].innerHTML.split("&")[0];
                    if (data[10].value == 0) {
                      that.hlStatus = "待护理";
                    } else if (data[10].value == 1) {
                      that.hlStatus = "已护理";
                    }
                    that.serviceDuration = data[8].value;
                  }
                }
              });
              var component = new MyComponent().$mount();
              var divData = $("table[name='SchedulingTable2']").find("tbody");
              //         remove() - 删除被选元素（及其子元素）
              // empty() - 从被选元素中删除子元素
              divData.remove();
              // $("table[name='SchedulingTable1']").find("tbody").html("");
              $("table[name='SchedulingTable2']").append(component.$el);
            } else {
              var divData = $("table[name='SchedulingTable2']").find("tbody");

              divData.remove();

              $("table[name='SchedulingTable2']").append(
                `<tbody><tr><td colspan="9" style='text-align:center;'>暂无数据</td></tr></tbody>`
              );
              // $("table[name='SchedulingTable1']").find("tbody").html("");
              // $("table[name='SchedulingTable1']").find("tbody").html('暂无数据');
            }
          } else {
            alert("读取信息失败，错误信息：" + res.data.resultMsg);
          }
        });
    },
    querySchedulingPlanByInsUser(type) {
      var weekday;
      if (type == 1) {
        weekday = this.weekdayArray2;
      } else {
        weekday = this.weekdayArray;

        var date = this.$moment(weekday[0]);
        date = this.$moment(date).format("YYYY-MM-DD");
        //   console.log(date)
        this.$options.methods.setDate(date, "2", this);
      }
      var staffUserClassmap = {};
      staffUserClassmap[1] = "护理员";
      staffUserClassmap[2] = "护士";
      var currentFirstDate1;
      var currentFirstDate2;

      var param = new Array();
      param.push({ name: "orgId", value: $("#orgId1").val() });
      param.push({ name: "staffNameLike", value: $("#staffNameLike1").val() });
      param.push({ name: "staffClass", value: $("#staffClass1").val() });
      param.push({ name: "weekdayArray", value: this.weekdayArray2 });
      param.push({ name: "serviceStatus", value: $("#serviceStatus1").val() });

      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_scheduling_mng/query_scheduling_plan_by_ins_user?orgId=${
          encodeURI(this.orgName1)
        }&userNameLike=${
          encodeURI(this.nameSearch1)
        }&weekdayArray=${encodeURI(weekday)}&serviceStatus=${encodeURI(this.statusSearch1)}`,
        method: "get"
      }).then(res => {
        var result = res.data.data;

        if (res.data.resultCode == "000000") {
          var html = "<tbody>";
          if (result && result.length > 0) {
            for (var i = 0; i < result.length; i++) {
              var object = result[i];
              html += "<tr>";
              html +=
                "	<td>" +
                object.insUserName +
                "<input type='hidden' name='userName' value='" +
                object.insUserName +
                "'></td>";
              for (var j = 0; j < weekday.length; j++) {
                var weekday1 = weekday[j];
                var SchedulingList = object.schedulingListMap[weekday1];
                // console.log(SchedulingList);
                html += "	<td>";
                for (var k = 0; k < SchedulingList.length; k++) {
                  var Scheduling = SchedulingList[k];
                  html += "<div>";
                  var color;
                  switch (Scheduling.serviceStatus) {
                    case 0:
                      color = "color1";
                      break;
                    case 1:
                      color = "color2";
                      break;
                    default:
                      break;
                  }
                  if (Scheduling.serviceStatus == 0) {
                    html += `<button class='${color}hlxm_pop2'  @click='abc' style='background-color:#FFCE9D;width:100%;height:100%;color:#000;margin-bottom:5px;line-height:30px;padding:0 10px;font-size:12px;border:none;outline:none;vertical-align:middle;font-weight:300;border-radius:3px;'>${this.$moment(
                      Scheduling.serviceStartTime
                    ).format("HH:mm")}&nbsp;&nbsp;${
                      Scheduling.nursingServiceStaffName
                    }</button>`;
                  } else if (Scheduling.serviceStatus == 1) {
                    html += `<button class='${color}hlxm_pop2' @click='abc' style='background-color:#A3E0C2;width:100%;height:100%;color:#000;margin-bottom:5px;line-height:30px;padding:0 10px;font-size:12px;border:none;outline:none;vertical-align:middle;font-weight:300;border-radius:3px;'>${this.$moment(
                      Scheduling.serviceStartTime
                    ).format("HH:mm")}&nbsp;&nbsp;${
                      Scheduling.nursingServiceStaffName
                    }</button>`;
                  }
                  // html += "	<button class='"+color+" hlxm_pop1'>"+Scheduling.serviceStartTime.substring(11,16)+" "+Scheduling.userName+"</button>";
                  html +=
                    "	<input type='hidden' name='userName' value='" +
                    Scheduling.userName +
                    "'>";
                  html +=
                    "	<input type='hidden' name='serviceName' value='" +
                    Scheduling.servicePlanItemName +
                    "'>";
                  html +=
                    "	<input type='hidden' name='serviceStartTime' value='" +
                    Scheduling.serviceStartTime +
                    "'>";
                  html +=
                    "	<input type='hidden' name='serviceDuration' value='" +
                    Scheduling.serviceDuration +
                    "'>";
                  html +=
                    "	<input type='hidden' name='serviceStatus' value='" +
                    Scheduling.serviceStatus +
                    "'>";
                  html +=
                    "<input type='hidden' name='staffClass' value='" +
                    Scheduling.userClass +
                    "'>";
                  html +=
                    "<input type='hidden' name='staffName' value='" +
                    Scheduling.nursingServiceStaffName +
                    "'>";
                  html += "</div>";
                }
                html += "	</td>";
              }

              html += "</tr>";
            }
            html += "</tbody>";
            var that = this;
            var MyComponent = Vue.extend({
              template: html,
              data() {
                return {};
              },
              methods: {
                abc(event) {
                  that.dialogVisible1 = true;
                  // 获取当前目标元素的父元素时不要用函数形式

                  // console.log('222',event.srcElement,event.srcElement.parentElement.childNodes);
                  var data = event.srcElement.parentElement.childNodes;
                  // console.log(data[0].innerHTML.split('&')[0],"userName  "+data[2].value,"serviceName "+data[4].value,'serviceStartTime  '+data[6].value,"serviceStatus "+data[8].value,'staffClass '+data[9].value,'staffName '+data[10].value)
                  if (data[11].value == 1) {
                    that.serviceStaffType = "护理员";
                  } else if (data[11].value == 2) {
                    that.serviceStaffType = "护士";
                  }

                  that.serviceCurrentStaff = data[12].value;
                  that.userName = data[2].value;
                  that.serviceName = data[4].value;
                  that.hlsj = data[0].innerHTML.split("&")[0];
                  if (data[10].value == 0) {
                    that.hlStatus = "待护理";
                  } else if (data[10].value == 1) {
                    that.hlStatus = "已护理";
                  }
                  that.serviceDuration = data[8].value;
                }
              }
            });
            var component = new MyComponent().$mount();
            var divData = $("table[name='SchedulingTable2']").find("tbody");
            //         remove() - 删除被选元素（及其子元素）
            // empty() - 从被选元素中删除子元素
            divData.remove();
            // $("table[name='SchedulingTable1']").find("tbody").html("");
            $("table[name='SchedulingTable2']").append(component.$el);
          } else {
            var divData = $("table[name='SchedulingTable2']").find("tbody");

            divData.remove();

            $("table[name='SchedulingTable2']").append(
              `<tbody><tr><td colspan="9" style='text-align:center;'>暂无数据</td></tr></tbody>`
            );
            // $("table[name='SchedulingTable1']").find("tbody").html("");
            // $("table[name='SchedulingTable1']").find("tbody").html('暂无数据');
          }
        } else {
          alert("读取信息失败，错误信息：" + res.data.resultMsg);
        }
      });
    }
  },

  mounted() {
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/intact/intact_organization_mng/load_by_org_type?orgType=45`,
      method: "get"
    }).then(res => {
      this.disOrg = res.data.data;
    });
    let date = [];
    let weekOfday = parseInt(
      this.$moment()
        .subtract(1, "days")
        .format("d")
    ); // 计算今天是这周第几天 周日为一周中的第一天
    let start = this.$moment()
      .subtract(weekOfday, "days")
      .format("YYYY-MM-DD");
    date.push(start); // 周一日期
    date.push(
      this.$moment(start)
        .add(1, "days")
        .format("YYYY-MM-DD")
    ); // 周二日期
    date.push(
      this.$moment(start)
        .add(2, "days")
        .format("YYYY-MM-DD")
    ); // 周三日期
    date.push(
      this.$moment(start)
        .add(3, "days")
        .format("YYYY-MM-DD")
    ); // 周四日期
    date.push(
      this.$moment(start)
        .add(4, "days")
        .format("YYYY-MM-DD")
    ); // 周五日期
    date.push(
      this.$moment(start)
        .add(5, "days")
        .format("YYYY-MM-DD")
    ); // 周六日期
    date.push(
      this.$moment(start)
        .add(6, "days")
        .format("YYYY-MM-DD")
    ); // 周日日期
    this.weekdayArray1 = date;
    this.weekdayArray2 = date;
    this.weekdayArray = date;
    // console.log('时间',date)
  }
};
</script>
<style scoped>
.tag-box {
  display: inline;
  vertical-align: middle;
  font-size: 14px;
  position: relative;
  /* top           : -5px; */
}

ul,
ol {
  margin-top: 8px !important;
  /* margin-bottom: 10px; */
}
.tag-box li {
  margin-left: 20px;
  display: inline;
  color: #333;
  list-style: none;
  margin: 0;
  padding: 0;
}
.panel-body h6 .btn.glyphicon-chevron-left,
.panel-body h6 .btn.glyphicon-chevron-right {
  position: relative;
  top: 0px;
}

.panel-body h6 .btn {
  margin-left: 5px;
  vertical-align: bottom;
  border: #cccccc 1px solid;
  background: #fff;
  color: #333;
}
.panel-body h6 .btn {
  margin-left: 5px;
  vertical-align: bottom;
  border: #cccccc 1px solid;
  background: #fff;
  color: #333;
}

.panel-body button,
.popover-content button {
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  font-size: 12px;
  border: none;
  outline: none;
  vertical-align: middle;
  color: #fff;
  background: #fc9153;
  font-weight: 300;
  border-radius: 3px;
}
.colori1 {
  width: 10px;
  height: 10px;
  position: relative;
  top: -2px;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
  background: #ffce9d;
}
.colori2 {
  width: 10px;
  height: 10px;
  position: relative;
  top: -2px;
  display: inline-block;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
  background: #a3e0c2;
}
#hlxmModal input[disabled]{
background: #e5e9ed;
opacity: .6;
filter: alpha(opacity=60);
border-color: #ccd0d4;
height: 30px;
line-height: 30px;
border: 1px solid #ccc;
box-shadow: none;
font-size: 12px;
padding: 5px 10px;
color:#555;
}
</style>
