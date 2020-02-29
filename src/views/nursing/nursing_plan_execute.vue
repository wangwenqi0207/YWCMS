<template>
  <div style="padding:20px;height:100%;">
    <div style="background:#fff;height:95%;padding:5px;overflow:auto">
      <div el-row style = "padding:10px;text-align: left;">
        <div
          el-col
          span  = "24"
          class = "top"
        >
          <el-form
            :inline = "true"
            :model  = "searchForm"
              class = "demo-form-inline"
              size  = "mini"
              style = "text-align:left;"
          >
            <el-form-item label="机构名称:">
              <el-select
                v-model     = "searchForm.distributeOrgId"
                placeholder = "请选择分配机构"
                style       = "width:150px"
                size        = 'mini'
                clearable
              >
                <el-option
                  v-for = "(item,index) in disOrg"
                :value  = "item.orgId"
                :key    = "index"
                :label  = "item.orgName"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input
                v-model.trim = "searchForm.userNameLike"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号:">
              <el-input
                v-model.trim = "searchForm.userIdcardLike"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="医保卡号:">
              <el-input
                v-model.trim = "searchForm.medicalInsuranceIdLike"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="状态:">
              <el-select
                v-model = "searchForm.planStatus"
                clearable
                placeholder = "请选择"
              >
                <el-option
                  label = "全部"
                  value = ""
                ></el-option>
                <el-option
                  label = "正常"
                  value = "1"
                ></el-option>
                <el-option
                  label = "暂停"
                  value = "2"
                ></el-option>
                <el-option
                  label = "终止"
                  value = "3"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type   = "primary"
                @click = "search"
                icon="el-icon-search"
              >查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type   = "primary"
                @click = "resetSearch"
                icon="el-icon-refresh"
              >重置</el-button>
            </el-form-item>
          </el-form>

          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
<div style="padding:5px;height:80%">
      <el-table
        :data = "datalists"
        border
        stripe
        style             = "width: 100%;text-align:left; "
        height="100%"
        @selection-change = "handleSelectionChange"
      >
        <el-table-column
          type      = "selection"
          width     = "55"
        :selectable = "selectADD"
        ></el-table-column>
        <el-table-column
          prop  = "planId"
          label = "序号"
        ></el-table-column>
        <el-table-column
          prop  = "distributeOrgName"
          label = "机构"
        ></el-table-column>
        <el-table-column
          prop  = "userName"
          label = "姓名"
        ></el-table-column>
        <el-table-column
          prop  = "userIdcard"
          label = "身份证号"
        ></el-table-column>
        <el-table-column
          prop  = "medicalInsuranceId"
          label = "医保卡号"
        ></el-table-column>
        <el-table-column
          prop  = "serviceInDate"
          label = "入住时间"
        ></el-table-column>
        <el-table-column
          prop  = "planStatus"
          label = "入住状态"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.planStatus==1 || scope.row.planStatus=="1" '>
              正常
            </p>
            <p v-if='scope.row.planStatus==2 || scope.row.planStatus=="2" '>
              暂停
            </p>
            <p v-if='scope.row.planStatus==3 || scope.row.planStatus=="3" '>
              终止
            </p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "createTime"
          label = "操作"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size   = "mini"
              type   = "success"
              @click = "showRecord(scope.$index, scope.row)"
            >执行历史</el-button>
          </template>
        </el-table-column>

      </el-table>
</div>
      <!-- 新增服务计划的弹框（Modal） -->
      <div
        class           = "modal fade in"
        id              = "executeHistoryListModal"
        tabindex        = "-1"
        role            = "dialog"
        aria-labelledby = "myModalLabel"
        :aria-hidden     = 'true'
      >
        <div
          class = "modal-dialog"
          style = "min-width:1200px;"
        >
          <form
            role = "form"
            id   = "modalFrom"
          >
            <div class="modal-content">
              <div
                class = "modal-header"
                style = "text-align:left;margin: 0px auto;width: 88%;"
              >
              <button
                type         = "button"
                class        = "close"
                data-dismiss = "modal"
                aria-hidden  = "true"
              >
                &times;
              </button>
                执行历史
              </div>
              <div
                class = "modal-body"
                style = "text-align:left;margin: 0px auto;width: 88%;"
              >
                <input
                  name = "planId"
                  type = "hidden"
                />
                护理日期 <el-date-picker
                  v-model     = "planDate"
                  type        = "date"
                  placeholder = "选择日期"
                  size        = "mini"
                >
                </el-date-picker>
                <el-button
                  type   = "primary"
                  @click = "queryExecuteHistoryButton1"
                  size   = "mini"
                >查询</el-button>

              </div>
              <div class="modal-body">
                <div class="table-responsive panel-body">
                  <table
                    name  = "executeHistoryListTable"
                    style = 'margin:0 auto;padding:0px;width:90%;'
                    class = 'table table-striped table-bordered nowrap'
                  >
                    <thead>
                      <tr>
                        <th style='text-align:center;'>护理分类</th>
                        <th style='text-align:center;'>护理项目</th>
                        <th style='text-align:center;'>护理频次（次/每天）</th>
                        <th style='text-align:center;'>护理项目时长</th>
                        <th style='text-align:center;'>护理人员</th>
                        <th style='text-align:center;'>护理状态</th>
                        <th style='text-align:center;'>操作</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class = "modal-footer"
                style = "text-align:center"
              >
                <button
                  type         = "button"
                  class        = "btn btn-default"
                  data-dismiss = "modal"
                >关闭</button>
              </div>
            </div>
          </form>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
      <!-- 护理记录添加（Modal）开始 -->
      <div
        class           = "modal fade"
        id              = "addExecuteModal"
        tabindex        = "-2"
        role            = "dialog"
        aria-labelledby = "myModalLabel"
        aria-hidden     = "true"
      >
        <div
          class = "modal-dialog"
          style = "width:500px;"
        >
          <div class="modal-content">
            <div class="modal-header">
              <button
                type         = "button"
                class        = "close"
                data-dismiss = "modal"
                aria-hidden  = "true"
              >
                &times;
              </button>
              <h5 class="modal-title">
                添加记录
              </h5>
            </div>
            <div class="modal-body">
              <form
                class = "form-horizontal"
                style = "overflow:hidden"
              >
                <div class="form-group">
                  <label class="control-label col-md-4" style="text-align:right;">护理开始时间：</label>
                  <div class="col-md-8">
                    <el-date-picker
      v-model     = "planStartDate"
      type        = "datetime"
      placeholder = "选择日期时间"
      style       = "width:100%;"
      >
    </el-date-picker>

                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-md-4" style="text-align:right;">护理时长：</label>
                  <div class="col-md-8">
                    <el-input name="serveTime" v-model="serveTime" ></el-input>
                  </div>
                </div>
              </form>
            </div>

            <div
              class = "modal-footer"
              style = "text-align:center"
            >
              <button
                type   = "button"
                class  = "btn btn-primary"
                style  = "width:100px;"
                @click = "submitSchedulingPlanExecute"
              >提交</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 护理记录多条添加（Modal）开始 -->
      <div
        class           = "modal fade"
        id              = "addAllExecuteModal"
        tabindex        = "-2"
        role            = "dialog"
        aria-labelledby = "myModalLabel"
        aria-hidden     = "true"
      >
        <div
          class = "modal-dialog"
          style = "width:500px;"
        >
          <div class="modal-content">
            <div class="modal-header">
              <button
                type         = "button"
                class        = "close"
                data-dismiss = "modal"
                aria-hidden  = "true"
              >
                &times;
              </button>
              <h5 class="modal-title">
                一键添加记录
              </h5>
            </div>
            <div class="modal-body">
              <form
                class = "form-horizontal"
                style = "overflow:hidden"
              >

                <div class="form-group">
                  <label class="control-label col-md-4" style="text-align:right;">护理开始时间：</label>
                  <div class="col-md-8">
                     <el-date-picker
                      v-model     = "planAllStartDate"
                      type        = "datetime"
                      placeholder = "选择日期时间"
                      style       = "width:100%;"
                      >
                    </el-date-picker>
                  </div>
                </div>

              </form>
            </div>

            <div
              class = "modal-footer"
              style = "text-align:center"
            >
              <button
                type   = "button"
                class  = "btn btn-primary"
                style  = "width:100px;"
                @click = "submitAllSchedulingPlanExecute">
                一键提交
                </button>
            </div>
          </div>
        </div>
      </div>
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
  data() {
    return {
      //分页data
      currentPage   : 1,
      pageSize      : [10, 20, 30, 50],
      total         : 0,
      changePageSize: 10,

      //列表相关
      datalists: [],

      // 搜索相关
      searchForm: {
        distributeOrgId       : "",
        userNameLike          : "",
        medicalInsuranceIdLike: "",
        userIdcardLike        : "",
        planStatus            : ""
      },

      // 执行历史
      planDate     : null,
      disOrg       : [],
      currentPlanID: null,

      // 添加记录
      planStartDate: null,
      serveTime    : null,
      // createTime:null,
      createName      : null,
      schedulingPlanId: null,
      // 添加多条记录
      planAllStartDate: null,

      currentObjId:null,



    };
  },
  destroyed(){
    if(this.currentObjId){
      // console.log('111',this.currentObjId);
      	// $("#"+this.currentObjId).popover('hide');
    }
  },

  methods: {
    selectADD: function(row, index) {
      if (row.auditStatus == 101 || row.auditStatus == "101") {
        return false;
      } else {
        return true;
      }
    },
    search() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_execute_mng/pagination?pageFlag=4&distributeOrgId=${
         encodeURI(this.searchForm.distributeOrgId)
        }&userNameLike=${encodeURI(this.searchForm.userNameLike)}&medicalInsuranceIdLike=${
          encodeURI(this.searchForm.medicalInsuranceIdLike)
        }&userIdcardLike=${encodeURI(this.searchForm.userIdcardLike)}&planStatus=${
          encodeURI(this.searchForm.planStatus)
        }`,
        method: "get"
      }).then(res => {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    resetSearch() {
      this.searchForm = {
        distributeOrgId       : "",
        userNameLike          : "",
        medicalInsuranceIdLike: "",
        userIdcardLike        : "",
        planStatus            : ""
      };
    },
    showRecord(index, row) {
      this.currentPlanID = row.planId;
      this.planDate      = this.$moment().format('YYYY-MM-DD');
      $("#executeHistoryListModal").modal("show");
      this.$options.methods.queryExecuteHistoryButton(this.currentPlanID,this.planDate,this);
    },
    submitSchedulingPlanExecute(){
      // console.log(this.schedulingPlanId,this.createName,this.$moment(this.planStartDate).format('YYYY-MM-DD h:mm:ss'),this.serveTime)
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_execute_mng/submit_scheduling_plan_execute?schedulingPlanId=${encodeURI(this.schedulingPlanId)}&
serveTime=${encodeURI(this.serveTime)}&createTime=${encodeURI(this.$moment(this.planStartDate).format('YYYY-MM-DD h:mm:ss'))}&createName=${encodeURI(this.createName)}`,
        method: "get"
      }).then(res => {
        if(res.data.resultCode=='000000'){
          	$("#addExecuteModal").modal("hide");
          alert('添加成功');
          this.$options.methods.queryExecuteHistoryButton(this.currentPlanID,this.$moment(this.planDate).format('YYYY-MM-DD'),this);

        }else{
          alert('添加失败'+res.data.resultMsg);
        }
      })
    },
    submitAllSchedulingPlanExecute(){
      //  console.log(this.currentPlanID,this.$moment(this.planAllStartDate).format('YYYY-MM-DD h:mm:ss'),this.$moment(this.planDate).format('YYYY-MM-DD'))
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_execute_mng/submit_all_scheduling_plan_execute?planId=${encodeURI(this.currentPlanID)}&
serviceDate=${encodeURI(this.$moment(this.planDate).format('YYYY-MM-DD'))}&createTime=${encodeURI(this.$moment(this.planAllStartDate).format('YYYY-MM-DD h:mm:ss'))}`,
        method: "get"
      }).then(res => {
        if(res.data.resultCode=='000000'){
          	$("#addAllExecuteModal").modal("hide");
          alert('添加成功');
          this.$options.methods.queryExecuteHistoryButton(this.currentPlanID,this.$moment(this.planDate).format('YYYY-MM-DD'),this);

        }else{
          alert('添加失败'+res.data.resultMsg);
        }
      })
    },
    queryExecuteHistoryButton(planId,planDate,that) {
      $("#executeHistoryListModal").find("table[name='executeHistoryListTable']").find("tbody").remove();
      that.$axios({
        url: `${
          that.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_execute_mng/load_scheduling_plan_for_execute_history?planId=${encodeURI(planId)}&serviceDate=${encodeURI(planDate)}`,
        method: "get"
      }).then(res => {
         var            serviceTypeMap = {};
         serviceTypeMap[1]             = "基础护理";
         serviceTypeMap[2]             = "临床护理";

    var              serviceStatusMap = {};
    serviceStatusMap[0]               = "未完成";
    serviceStatusMap[1]               = "已完成";
    var              list             = res.data.data;
    var              html             = "<tbody>";
      		if(list.length == 0){
      			html += "<tr><td colspan='7'>暂无数据</td></tr>";
      		} else {
      		var tdser = 1;
      		for (var i = 0; i < list.length; i++) {
      			var object = list[i];
      			if(object.serviceStatus!=1){
      			tdser = 0;
      			}
      			html += "<tr>";
      			html += "	<td>"+serviceTypeMap[object.serviceType]+"</td>";
      			html += "	<td>"+object.servicePlanItemName+"</td>";
      			html += "	<td>"+object.frequency+"</td>";
      			html += "	<td>"+object.serviceDuration+"</td>";
      			html += "	<td>"+object.nursingServiceStaffName+"</td>";
      			html += "	<td id='ob_"+object.id+"' name='tdStatus' data-toggle='popover'  @mouseover='showExecuteDetail' @mouseout='closeExecuteDetail'>"+serviceStatusMap[object.serviceStatus]+"</td>";
      			html += "	<td><a id='"+object.id+"' name='"+object.nursingServiceStaffName+"'status='"+object.serviceStatus+"' @click='addExecuteView' style='color:#337ab7;'>添加记录</a></td></tr>";
          };
                 html += "<tr><td colspan='7'><a id='"+object.id+"' name='"+tdser+"' @click='addAllExecuteView' style='color:#337ab7;'>一键添加</a></td></tr>";
          }
                                                                                                                                                                                                                                               html        += '</tbody>';
                                                                                                                                                                                                                                           var MyComponent  = Vue.extend({
            template: html,
            data() {
              return {};
            },
            methods: {
              addExecuteView(event){
                //  console.log(event.target.getAttribute('id')) ;
                //  console.log(event.target.getAttribute('name')) ;
                 var serviceStatus = event.target.getAttribute('status');
                if(serviceStatus==1 || serviceStatus=='1'){
    	alert("当前护理已完成,不需要添加");
    	}else{

        that.createName       = event.target.getAttribute('name');
        that.schedulingPlanId = event.target.getAttribute('id');
        // console.log(this.schedulingPlanId,this.createName)
    	$("#addExecuteModal").modal("show");
      }


              },
              addAllExecuteView(){
                 var tdser = event.target.getAttribute('name');
                if(tdser==1 || tdser=='1'){
    	alert("当前护理已完成,不需要添加");
    	}else{
        // $("#addExecuteModal").find("input[name='schedulingPlanId']").val(schedulingPlanId);
    	// $("#addExecuteModal").find("input[name='createName']").val(createName);
    	$("#addAllExecuteModal").modal("show");
      }


              },
              showExecuteDetail(event){

                var obId    = event.target.getAttribute('id');
                that.currentObjId=obId;
                var nullStr = "无";
      this.$axios({
        url: `${
          that.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_execute_mng/load_scheduling_plan_for_execute_history_detail?schedulingPlanId=${encodeURI(obId.split('_')[1])}`,
        method: "get"
      }).then(res=>{

        var list   = res.data.data;
        var html1  = "<table style='margin:0px;padding:0px;width:100%;'  class='table table-striped table-bordered nowrap'>";
            html1 += "<tr><th>执行日期</th><th>时长</th></tr>";

			if(list.length == 0){
				html1 += "<tr><td>暂无记录</td></tr>";
			}else{
        for(var i=0;i<list.length;i++){
				var obj    = list[i];
				    html1 += "<tr><td>"+this.$moment(obj.createTime).format('YYYY-MM-DD h:mm:ss')+"</td><td>"+obj.serveTime+"</td></tr>";
			}
      }
			html1 += "</table>";
			$("#"+obId).popover({html:true,content:html1,placement:'right',container:'body'}).popover('show');
      })

              },
              closeExecuteDetail(event){
                // alert('合并')
                var obId = event.target.getAttribute('id');
                 that.currentObjId=obId;
    	$("#"+obId).popover('hide');
              }
            }
          });
          var component = new MyComponent().$mount();

        // $("#executeHistoryListModal").find("table[name='executeHistoryListTable']").find("tbody").html(html);
      	$("#executeHistoryListModal").find("table[name='executeHistoryListTable']").append(component.$el);




      });
      //   $.getJSON(curUrl+"?act=loadSchedulingPlanForExecuteHistory&planId="+planId+"&serviceDate="+serviceDate,{},function cb(list){
      // 		var html = "";
      // 		if(list.length == 0){
      // 			html += "<tr><td colspan='7'>暂无数据</td></tr>";
      // 		} else {
      // 		var tdser=1;
      // 		for (var i = 0; i < list.length; i++) {
      // 			var object = list[i];
      // 			if(object.serviceStatus!=1){
      // 			tdser=0;
      // 			}
      // 			html += "<tr>";
      // 			html += "	<td>"+serviceTypeMap[object.serviceType]+"</td>";
      // 			html += "	<td>"+object.servicePlanItemName+"</td>";
      // 			html += "	<td>"+object.frequency+"</td>";
      // 			html += "	<td>"+object.serviceDuration+"</td>";
      // 			html += "	<td>"+object.nursingServiceStaffName+"</td>";
      // 			html += "	<td id='ob_"+object.id+"' name='tdStatus' onmouseover='showExecuteDetail(\""+object.id+"\")' onmouseout='closeExecuteDetail(\""+object.id+"\")'>"+serviceStatusMap[object.serviceStatus]+"</td>";
      // 			html += "	<td><a onclick=\"addExecuteView('"+object.id+"','"+object.nursingServiceStaffName+"',"+object.serviceStatus+")\">添加记录</a></td>";
      // 		}
      // 		html += "	<td><a onclick=\"addAllExecuteView('"+object.id+"','"+object.nursingServiceStaffName+"',"+tdser+")\">一键添加</a></td>";
      // 		}
      // 	$("#executeHistoryListModal").find("table[name='executeHistoryListTable']").find("tbody").html(html);
      // });
    },
     queryExecuteHistoryButton1() {
      $("#executeHistoryListModal").find("table[name='executeHistoryListTable']").find("tbody").remove();
      var that = this;
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_execute_mng/load_scheduling_plan_for_execute_history?planId=${encodeURI(this.currentPlanID)}&serviceDate=${encodeURI(this.$moment(this.planDate).format('YYYY-MM-DD'))}`,
        method: "get"
      }).then(res => {
         var            serviceTypeMap = {};
         serviceTypeMap[1]             = "基础护理";
         serviceTypeMap[2]             = "临床护理";

    var              serviceStatusMap = {};
    serviceStatusMap[0]               = "未完成";
    serviceStatusMap[1]               = "已完成";
    var              list             = res.data.data;
    var              html             = "<tbody>";
      		if(list.length == 0){
      			html += "<tr><td colspan='7'>暂无数据</td></tr>";
      		} else {
      		var tdser = 1;
      		for (var i = 0; i < list.length; i++) {
      			var object = list[i];
      			if(object.serviceStatus!=1){
      			tdser = 0;
      			}
      			html += "<tr>";
      			html += "	<td>"+serviceTypeMap[object.serviceType]+"</td>";
      			html += "	<td>"+object.servicePlanItemName+"</td>";
      			html += "	<td>"+object.frequency+"</td>";
      			html += "	<td>"+object.serviceDuration+"</td>";
      			html += "	<td>"+object.nursingServiceStaffName+"</td>";
      			html += "	<td id='ob_"+object.id+"' name='tdStatus' data-toggle='popover' @mouseover='showExecuteDetail' @mouseout='closeExecuteDetail'>"+serviceStatusMap[object.serviceStatus]+"</td>";
      			html += "	<td><a id='"+object.id+"' name='"+object.nursingServiceStaffName+"'status='"+object.serviceStatus+"' @click='addExecuteView' style='color:#337ab7;'>添加记录</a></td></tr>";
          };
                 html += "<tr><td colspan='7'><a id='"+object.id+"' name='"+tdser+"'  @click='addAllExecuteView' style='color:#337ab7;'>一键添加</a></td></tr>";
          }
                                                                                                                                                                                                                                               html        += '</tbody>';
                                                                                                                                                                                                                                           var MyComponent  = Vue.extend({
            template: html,
            data() {
              return {};
            },
            methods: {
              addExecuteView(){
      var serviceStatus = event.target.getAttribute('status');
                if(serviceStatus==1 || serviceStatus=='1'){
    	alert("当前护理已完成,不需要添加");
    	}else{

        that.createName       = event.target.getAttribute('name');
        that.schedulingPlanId = event.target.getAttribute('id');
        // console.log(this.schedulingPlanId,this.createName)
    	$("#addExecuteModal").modal("show");
      }

              },
              addAllExecuteView(){
       var tdser = event.target.getAttribute('name');
                if(tdser==1 || tdser=='1'){
    	alert("当前护理已完成,不需要添加");
    	}else{
        // $("#addExecuteModal").find("input[name='schedulingPlanId']").val(schedulingPlanId);
    	// $("#addExecuteModal").find("input[name='createName']").val(createName);
    	$("#addAllExecuteModal").modal("show");
      }
              },
              showExecuteDetail(event){

                var obId    = event.target.getAttribute('id');
                 that.currentObjId=obId;
                var nullStr = "无";
      this.$axios({
        url: `${
          that.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_execute_mng/load_scheduling_plan_for_execute_history_detail?schedulingPlanId=${encodeURI(obId.split('_')[1])}`,
        method: "get"
      }).then(res=>{
        var list   = res.data.data;
        var html1  = "<table style='margin:0px;padding:0px;width:100%;'  class='table table-striped table-bordered nowrap'>";
            html1 += "<tr><th>执行日期</th><th>时长</th></tr>";

			if(list.length == 0){
				html1 += "<tr><td>暂无记录</td></tr>";
			}else{
        for(var i=0;i<list.length;i++){
				var obj    = list[i];
				    html1 += "<tr><td>"+this.$moment(obj.createTime).format('YYYY-MM-DD h:mm:ss')+"</td><td>"+obj.serveTime+"</td></tr>";
			}
      }
			html1 += "</table>";
			$("#"+obId).popover({html:true,content:html1,placement:'right',container:'body'}).popover('show');
      })

              },
              closeExecuteDetail(event){
                // alert('合并')
                var obId = event.target.getAttribute('id');
                 that.currentObjId=obId;
    	$("#"+obId).popover('hide');
              }
            }
          });
          var component = new MyComponent().$mount();

        // $("#executeHistoryListModal").find("table[name='executeHistoryListTable']").find("tbody").html(html);
      	$("#executeHistoryListModal").find("table[name='executeHistoryListTable']").append(component.$el);




      });
    },
    dataList(tableData) {
      this.datalists = tableData;
    },
    transform(old, insert) {
      old.forEach((el, index) => {
        el.questionType = insert[index];
      });
    },
    transform1(old, insert) {
      old.forEach((el, index) => {
        el.optionType = insert[index];
      });
    },
    transform2(old, insert) {
      old.forEach((el, index) => {
        el.needPhoto = insert[index];
      });
    },
    transform3(old, insert) {
      old.forEach((el, index) => {
        el.optionText = insert[index];
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
        }/auth/nursing/nursing_service_plan_execute_mng/pagination?pageSize=${
          encodeURI(this.changePageSize)
        }&pageNo=${encodeURI(val)}&pageFlag=4&distributeOrgId=${
         encodeURI(this.searchForm.distributeOrgId)
        }&userNameLike=${encodeURI(this.searchForm.userNameLike)}&medicalInsuranceIdLike=${
          encodeURI(this.searchForm.medicalInsuranceIdLike)
        }&userIdcardLike=${encodeURI(this.searchForm.userIdcardLike)}&planStatus=${
          encodeURI(this.searchForm.planStatus)
        }`,
        method: "get"
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

    getReloadData(that) {
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_plan_execute_mng/pagination?pageSize=${
            encodeURI(that.changePageSize)
          }&pageNo=${encodeURI(that.currentPage)}&pageFlag=4&distributeOrgId=${
            encodeURI(that.searchForm.distributeOrgId)
          }&userNameLike=${
            encodeURI(that.searchForm.userNameLike)
          }&medicalInsuranceIdLike=${
            encodeURI(that.searchForm.medicalInsuranceIdLike)
          }&userIdcardLike=${encodeURI(that.searchForm.userIdcardLike)}&planStatus=${
            encodeURI(that.searchForm.planStatus)
          }`,
          method: "get"
        })
        .then(res => {
          if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
          } else {
            that.total       = res.data.totalCount;
            that.currentPage = res.data.curPage;
            that.dataList(res.data.resultList);
          }
        });
      // that.reload();
    }
  },
  mounted() {

    // this.getData();
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_service_plan_execute_mng/pagination?pageFlag=4`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "100005") {
        this.$router.push({ path: "/" });
      } else {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        // for(var item of res.data.resultList){

        // }
        this.dataList(res.data.resultList);
      }
    });
    //获取机构
    // 获取分配时的护理机构及居家护理机构
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/intact/intact_organization_mng/load_by_org_type?orgType=45`,
      method: "get"
    }).then(res => {
      // console.log(res.data.data);
      this.disOrg = res.data.data;
    });

    $('[data-toggle="popover"]').popover() //弹窗
        .on('show.bs.popover', function () { //展示时,关闭非当前所有弹窗
            $(this).parent().siblings().find('[data-toggle="popover"]').popover('hide');
        });
    $('body').on('click',function(event){
      var target = $(event.target);
      // console.log('33333')
        if (!target.hasClass('popover') //弹窗内部点击不关闭
                && target.parent('.popover-content').length === 0
                && target.parent('.popover-title').length === 0
                && target.parent('.popover').length === 0
                && target.data("toggle") !== "popover") {
                  // console.log('6666')
                //弹窗触发列不关闭，否则显示后隐藏
            $('[data-toggle="popover"]').popover('hide');
        }
    })



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

/* 题目内容详情展示 */
.popover {
  max-width: 600px !important;
  top      : 0px !important;
}
#executeHistoryListModal{
  overflow-x: auto;
}
</style>
