<template>
  <div style="padding:20px;height:100%;" v-loading="loading" element-loading-text="拼命加载中" id="orgNursing">
    <div style="background: rgb(255, 255, 255); padding:5px;">
      <div el-row style="padding:10px;text-align: left;">
        <div el-col span="24" class="top">
          <el-button
            v-if="urlRole2==1"
            type="primary"
            size="small"
            @click.native="showEditView"
            icon="el-icon-edit"
          >排班</el-button>
          <el-button
            v-if="urlRole4==1"
            type="primary"
            size="small"
            @click.native="shehe()"
            icon="el-icon-setting"
          >审核</el-button>
          <el-button
            v-if="urlRole3==1"
            type="primary"
            size="small"
            @click.native="remove"
            icon="el-icon-delete"
          >删除</el-button>
          <el-button
            type="primary"
            size="small"
            @click.native="stop()"
            icon="el-icon-circle-close-outline"
          >暂停</el-button>
          <el-button
            type="primary"
            size="small"
            @click.native="recover()"
            icon="el-icon-circle-check-outline"
          >恢复</el-button>

          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <el-form
        :inline="true"
        class="demo-form-inline"
        size="mini"
        style="text-align:left;padding-left:15px"
      >
        <el-form-item label="机构名称:">
          <el-select
            v-model="disOrg1"
            placeholder="请选择机构名称"
            style="width:230px"
            @change="changeSelect"
            size="mini"
            clearable
          >
            <el-option
              v-for="(item,index) in disOrg"
              :value="item.orgId"
              :key="index"
              :label="item.orgName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="床位:">
          <el-input v-model.trim="bedNumSearch" placeholder="请输入床位" style="width:100px" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model.trim="nameSearch" placeholder="请输入姓名" style="width:100px" clearable></el-input>
        </el-form-item>

        <el-form-item label="社保卡号:">
          <el-input v-model.trim="ybCardSearch" placeholder="请输入社保卡号" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input v-model.trim="idCardSearch" placeholder="请输入身份证号" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select
            v-model="status"
            placeholder="选择状态"
            style="width:100px"
            @change="changeSelect"
            size="mini"
            clearable
          >
            <el-option label="全部" value></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="暂停" value="2"></el-option>
            <el-option label="终止" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核:">
          <el-select
            v-model="shenheStatus"
            placeholder="请选择审核"
            style="width:120px"
            @change="changeSelect"
            size="mini"
            clearable
          >
            <el-option label="全部" value></el-option>
            <el-option label="未审核" value="100"></el-option>
            <el-option label="审核通过" value="101"></el-option>
            <el-option label="审核拒绝" value="102"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="暂停原因:">
          <el-input v-model.trim="stopReason" placeholder="请输入暂停原因" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="dataTables_wrapper no-footer">
        <div class="bed_wrap">
          <ul name="bed_info_list_ul" class="bed_list">
            <li v-for="(item,index) of datalists" :key="index">
              <div v-if="item.userIdcard == null || item.userIdcard ==''" class="bed_box">
                <h2>
                  <input name type="checkbox" value disabled="disabled">
                  房间号: {{item.roomNo}}&nbsp;&nbsp;&nbsp;床位: {{item.bedNo}}
                </h2>
                <a class="add_box" @click="add(item.id)">
                  <b>未入住</b>（点击新增）
                </a>
              </div>
              <div v-else>
                <div class="bed_box">
                  <h2>
                    <input name="planIdBox" type="checkbox" :value="item.planId">
                    房间号: {{item.roomNo}}&nbsp;&nbsp;床位: {{item.bedNo}}
                    <span
                      class="pull-right"
                    >
                      审核：
                      <span>{{item.schedulingAuditStatus}}</span>&nbsp;&nbsp;
                    </span>
                  </h2>
                  <input type="hidden" name="bedIdHidden" :value="item.id">
                  <div class="details_box" @click="planDetail(item.planId,'no')">
                    <h3>{{item.userName}}&nbsp;&nbsp;&nbsp;{{item.userSex}}&nbsp;&nbsp;&nbsp;{{item.userAge}}</h3>
                    <p>身份证号: {{item.userIdcard}}</p>
                    <p>社保卡号: {{item.medicalInsuranceId}}</p>
                    <p>机构：{{item.distributeOrgName}}</p>
                    <p v-if="item.planStatus=='正常'">状态：{{item.planStatus}}</p>
                    <p v-else-if="item.planStatus=='暂停'" style="color:red;">状态：{{item.planStatus}}&nbsp;&nbsp;
                      <span v-if="item.comments && item.comments.length>10">
                        ({{item.comments.substring(0,10)}})
                      </span>
                      <span v-else>
                        ({{item.comments}})
                      </span>
                    </p>
                    <p v-else style="color:red;">状态：{{item.planStatus}}</p>

                    <input type="hidden" name="planStatus" :value="item.planStatus">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 排班模态框 -->
       <el-dialog
        :visible.sync="dialogVisible1"
        width="560px"
        :before-close="handleClose1"
        style="text-align:left;"
        title="排班新增"
      >
        <div class="modal-body" id="hlxmModal">
          <form class="form-horizontal" style="overflow:hidden">
            <input type="hidden" name="serviceDate">
            <input type="hidden" name="hlxmName">
            <input type="hidden" name="serviceType">
            <input type="hidden" name="frequency">

            <div class="form-group">
              <label class="control-label col-md-3 col-xs-3">人员类型：</label>
              <div class="col-md-9 col-xs-9">
                <select
                  class="form-control input-sm"
                  name="serviceStaffType"
                  v-model="serviceStaffType"
                  disabled="disabled"
                >
                  <option>护理员</option>
                  <option>护士</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-md-3 col-xs-3">护理人员：</label>
              <div class="col-md-9 col-xs-9">
                  <el-select
                    name="serviceStaff"
                    v-model="serviceCurrentStaff"
                    placeholder="请选择护理人员"
                    size="mini"
                    style="width:100%;margin-bottom:5px;"
                  >
                    <el-option
                      v-for="(item,index) in serviceStaffCurrentData"
                      :value="item.userId"
                      :key="index"
                      :label="item.fullname"
                    ></el-option>
                  </el-select>
                 <div class="col-md-5 col-xs-5" style="padding:0">
                    <el-input v-model.trim="serviceCurrentStaffSearch" placeholder="请输入姓名" size='mini'></el-input>
                  </div>
                  <div class="col-md-3 col-xs-3">
                    <el-button @click="findIns" size='mini'>搜索</el-button>
                  </div>

              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-md-3 col-xs-3">参保人：</label>
              <div class="col-md-9 col-xs-9">
                <input v-model="userName" disabled style="width:100%;">
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-md-3 col-xs-3">护理项目：</label>
              <div class="col-md-9 col-xs-9">
                <input v-model="serviceName" disabled style="width:100%;">
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-xs-3">护理开始时间:</label>
              <div class="col-md-9 col-xs-9">
                <div class="col-md-5 col-xs-5" style="padding:0px;">
                  <!-- <el-time-picker
                                                                                                        v-model       = "hlsj"
                                                                                                      :picker-options = "{
      selectableRange: '00:00:00 - 23:59:59'
    }"
                    placeholder  = "选择护理时间"
                    value-format = "HH:mm"
                    format       = "HH:mm"
                  >
                  </el-time-picker>-->
                  <el-time-select
                    v-model="hlsj"
                    :picker-options="{
    start: '00:00',
    step: '00:05',
    end: '23:55'
  }"
                    size='mini'
                    style="width:100%;"
                  ></el-time-select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-xs-3">护理项目时长：</label>
              <div class="col-md-9 week_form col-xs-9">
                <div class="col-md-5 col-xs-5" style="padding:0px;">
                <input v-model="serviceDuration" disabled style="width:100%;">
                <input name="serviceDuration" type="hidden">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3 col-xs-3">护理状态：</label>
              <div class="col-md-9 col-xs-9">
                <div class="col-md-5 col-xs-5" style="padding:0">
                  <select v-if="serviceStatus==1" class="form-control input-sm" readonly>
                    <option >待护理</option>
                  </select>
                  <select v-else class="form-control input-sm" readonly>
                    <option >已完成</option>
                  </select>
                </div>
                <div class="col-md-3 col-xs-3" v-if="serviceStatus==1">
                  <button
                    @click="cancelSchedulingPlan()"
                    type="button"
                    class="btn btn-default btn-sm"
                  >护理取消</button>
                </div>
                <!-- <div class="col-md-3">
                                            <button type="button" class="btn btn-danger btn-sm" >请求外援</button>
                </div>-->
              </div>
            </div>
          </form>
        </div>

        <!-- <div class="modal-footer" style="text-align:center">
                        	<button type="button" class="btn btn-primary" style="width:100px;" @click="submitSchedulingPlan()">提交</button>
        </div>-->
        <span slot="footer" class="dialog-footer" style="text-align:center;display:block;">
          <button @click="dialogVisible1 = false" class="btn">取 消</button>
          <button
            v-if="serviceStatus==1"
            type="button"
            class="btn btn-success"
            @click="planSubmit()"
          >提交</button>
          <!-- <el-button
            type   = "primary"
            @click = "planSubmit(3)"
          >确 定</el-button>-->
        </span>
      </el-dialog>
      <!-- 护理计划详情模态框 -->
      <el-dialog
        :visible.sync="dialogVisible2"
        width="1300px"
        :before-close="handleClose"
        style="text-align:left;"
      >
        <!-- <el-form
          :model        = "ruleForm"
          :rules        = "rules"
            ref         = "ruleForm"
            label-width = "100px"
            class       = "demo-ruleForm"
        >
         修改护理计划
          <el-form-item>
            <el-button
              type   = "primary"
              @click = "submitForm('ruleForm')"
            >提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>-->
        <span slot="header" class="dialog-header" style="padding:0px;" hidden></span>
        <!-- <a href="#1F" name='1F'>调到审核</a> -->
        <div class="modal-body">
          <form role="form" id="modalFrom" class="form-horizontal">
            <input name="planId" type="hidden">
            <h6>
              <b>基础信息</b>
              <a id="base_info_display_btn" class="s_btn" @click="shousuo(1)">展开</a>
            </h6>
            <div class="h6_body" id="base_info" hidden>
              <div class="form-group">
                <label class="control-label col-md-2 col-xs-2">身份证号：</label>
                <div class="col-md-4 col-xs-4">
                  <div class="col-md-9 col-xs-9" style="padding:0; padding-right:5px;">
                    <input class="form-control" name="userIdcard" type="text">
                  </div>
                  <div class="col-md-3 col-xs-3" style="padding:0">
                    <button
                      type="button"
                      name="findInsUserBtn"
                      class="btn btn-sm btn-success"
                      style="display:block; width:100%"
                      @click="findInsUser(1,this);"
                    >读取</button>
                  </div>
                </div>
                <label class="control-label col-md-2 col-xs-2">社保卡号：</label>
                <div class="col-md-4 col-xs-4">
                  <div class="col-md-9 col-xs-9" style="padding:0; padding-right:5px;">
                    <input class="form-control" name="medicalInsuranceId" type="text">
                  </div>
                  <div class="col-md-3 col-xs-3" style="padding:0">
                    <button
                      type="button"
                      name="findInsUserBtn"
                      class="btn btn-sm btn-success"
                      style="display:block; width:100%"
                      @click="findInsUser(2,this);"
                    >读取</button>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-2 col-xs-2">姓名：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" disabled name="userName" type="text">
                </div>
                <label class="control-label col-md-2 col-xs-2">性别：</label>
                <div class="col-md-4 col-xs-4">
                  <div style="padding-top:5px;">
                    <input
                      style="width: 10%;"
                      name="userSexM"
                      value="M"
                      type="radio"
                      disabled="disabled"
                    >男
                    <input
                      style="width: 10%;"
                      name="userSexF"
                      value="F"
                      type="radio"
                      disabled="disabled"
                    >女
                    <input class="form-control" name="userSex" type="hidden" readonly="readonly">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-2 col-xs-2">年龄：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" disabled name="userAge" type="text">
                </div>
                <label class="control-label col-md-2 col-xs-2">评估等级：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" disabled name="userAssessedLevel" type="text">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-md-2 col-xs-2">是否为民政部门认定的特殊人群：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" disabled name="special" type="text">
                </div>
                <label class="control-label col-md-2 col-xs-2">是否为残联部门认定的残疾人：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" disabled name="handicapped" type="text">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-md-2 col-xs-2">代理人姓名：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" disabled name="agentName" type="text">
                </div>
                <label class="control-label col-md-2 col-xs-2">联系电话：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" disabled name="agentPhone" type="text">
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-2 col-xs-2">护理地址：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" disabled name="address" type="text">
                </div>
                <label class="control-label col-md-2 col-xs-2">计划开始日期：</label>
                <div class="col-md-4 col-xs-4">
                  <input
                    class="form-control"
                    disabled
                    id="planStartDate"
                    name="planStartDate"
                    type="text"
                  >
                </div>
              </div>

              <h6></h6>
              <div class="form-group">
                <label class="control-label col-md-2 col-xs-2">机构名称：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" disabled name="distributeOrgName" type="text">
                </div>
                <label class="control-label col-md-2 col-xs-2">入住状态：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" disabled name="planStatus" type="text">
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-2 col-xs-2">入住时间：</label>
                <div class="col-md-4 col-xs-4">
                  <el-date-picker
                    v-model="serviceInDate"
                    type="date"
                    style="height: 34px;line-height: 34px;width:100%;"
                    name="serviceInDate"
                    id="serviceInDate"
                    :picker-options="pickerOptions2"
                  ></el-date-picker>
                </div>
                <label class="control-label col-md-2 col-xs-2">暂停时间：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" name="pauseDate" type="text">
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-md-2 col-xs-2">终止时间：</label>
                <div class="col-md-4 col-xs-4">
                  <input class="form-control" name="endDate" type="text">
                </div>
              </div>
            </div>

            <h6>
              <b>护理计划</b>
              <a id="nursing_plan_display_btn" class="s_btn" @click="shousuo(2)">展开</a>
            </h6>
            <div class="h6_body" id="nursing_plan" hidden>
              <table
                id="pagDetailModalTable"
                style="margin:0 auto;padding:0px;width:100%;background-color: #F0F3F5"
                class="table table-striped table-bordered nowrap"
              >
                <tr>
                  <th style="text-align:center;">护理分类</th>
                  <th style="text-align:center;">护理项目</th>
                  <th style="text-align:center;">实际护理频次</th>
                  <th style="text-align:center;">项目护理时长</th>
                  <th style="text-align:center;">护理价格（元/次）</th>
                </tr>
              </table>
            </div>
            <div class="form-group"></div>

            <div name="SchedulingDiv">
              <div class="c_tab" style="text-align:center;">
                <label class="active" for="c_tab1">
                  <input id="c_tab1" name="c_tab" type="radio" value @click="switchType(1)" checked> 按护理项目
                </label>
                <label for="c_tab2">
                  <input id="c_tab2" name="c_tab" type="radio" value @click="switchType(2)"> 按护理时长
                </label>
              </div>
              <div class="c_content">
                <div class="c_tab_content" id="hlxmType">
                  <h6>
                    <b>护理员</b>
                    <span class="pull-right">
                      <button
                        name="last-week1"
                        type="button"
                        class="btn btn-sm glyphicon glyphicon-chevron-left"
                        @click="lastweek1()"
                      ></button>
                      <button
                        name="this-week1"
                        type="button"
                        class="btn btn-sm"
                        @click="thisweek1()"
                      >本周</button>
                      <button
                        name="next-week1"
                        type="button"
                        class="btn btn-sm glyphicon glyphicon-chevron-right"
                        @click="nextweek1()"
                      ></button>
                      <button
                        name="copy-last-week1"
                        type="button"
                        class="btn btn-sm"
                        @click="copyLastWeek1()"
                      >同上周排班</button>
                    </span>
                  </h6>
                  <table
                    id="data-table-stel"
                    name="SchedulingTable1"
                    class="table table-striped table-bordered table_head"
                    style="white-space: nowrap; width:100%;text-align:center;"
                  >
                    <thead>
                      <tr name="weekTr">
                        <th colspan="3"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                      </tr>
                      <tr>
                        <th>护理分类</th>
                        <th>护理项目</th>
                        <th>全周</th>
                        <th>周一</th>
                        <th>周二</th>
                        <th>周三</th>
                        <th>周四</th>
                        <th>周五</th>
                        <th>周六</th>
                        <th>周日</th>
                      </tr>
                    </thead>
                    <!-- <tbody>
                    </tbody>-->
                  </table>
                  <h6>
                    <b>护士</b>
                    <span class="pull-right">
                      <button
                        name="last-week2"
                        type="button"
                        class="btn btn-sm glyphicon glyphicon-chevron-left"
                        @click="lastweek2()"
                      ></button>
                      <button
                        name="this-week2"
                        type="button"
                        class="btn btn-sm"
                        @click="thisweek2()"
                      >本周</button>
                      <button
                        name="next-week2"
                        type="button"
                        class="btn btn-sm glyphicon glyphicon-chevron-right"
                        @click="nextweek2()"
                      ></button>
                      <button
                        name="copy-last-week2"
                        type="button"
                        class="btn btn-sm"
                        @click="copyLastWeek2()"
                      >同上周排班</button>
                    </span>
                  </h6>
                  <table
                    id="data-table-stel"
                    name="SchedulingTable2"
                    class="table table-striped table-bordered table_head"
                    style="white-space: nowrap; width:100%;text-align:center;"
                  >
                    <thead>
                      <tr name="weekTr">
                        <th colspan="3"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                        <th name="weekday"></th>
                      </tr>
                      <tr>
                        <th>护理分类</th>
                        <th>护理项目</th>
                        <th>全周</th>
                        <th>周一</th>
                        <th>周二</th>
                        <th>周三</th>
                        <th>周四</th>
                        <th>周五</th>
                        <th>周六</th>
                        <th>周日</th>
                      </tr>
                    </thead>
                    <!-- <tbody >
                    </tbody>-->
                  </table>
                </div>
                <div class="c_tab_content" style="display:none" id="hlscType">
                  <div class="form-group">
                    <label class="control-label col-md-2 col-xs-2">每周护理时长：</label>
                    <div class="col-md-4 week_form col-xs-4">
                      <div class="col-md-11 col-xs-11" style="padding:0; padding-right:5px;">
                        <select class="form-control">
                          <option value>05</option>
                        </select>
                      </div>
                      <div class="col-md-1 col-xs-1" style="padding:0">小时</div>
                    </div>
                    <label class="control-label col-md-2 col-xs-2">护理开始时间：</label>
                    <div class="col-md-4 week_form col-xs-4">
                      <div class="col-md-5 col-xs-5" style="padding:0; padding-right:5px;">
                        <select class="form-control">
                          <option value>09</option>
                        </select>
                      </div>
                      <div class="col-md-1 col-xs-1" style="padding:0;">时</div>
                      <div class="col-md-5 col-xs-5" style="padding:0; padding-right:5px;">
                        <select class="form-control">
                          <option value>30</option>
                        </select>
                      </div>
                      <div class="col-md-1 col-xs-1" style="padding:0;">分</div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-md-2 col-xs-2">护理日期：</label>
                    <div class="col-md-4 week_form col-xs-4">
                      <div class="col-md-2 col-xs-2" style="padding:0;">
                        <input name type="checkbox" value> 周一
                      </div>
                      <div class="col-md-5 col-xs-5" style="padding:0; padding-right:5px;">
                        <select class="form-control">
                          <option value>基础护理</option>
                        </select>
                      </div>
                      <div class="col-md-4 col-xs-4" style="padding:0;">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-plus"></button>
                        <input class="form-control date_text" value="2" disabled name type="text">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-minus"></button>
                      </div>
                      <div class="col-md-1 col-xs-1" style="padding:0;">小时</div>
                    </div>
                    <label class="control-label col-md-2 col-xs-2"></label>
                    <div class="col-md-4 week_form col-xs-4">
                      <div class="col-md-2 col-xs-2" style="padding:0;">
                        <input name type="checkbox" value> 周二
                      </div>
                      <div class="col-md-5 col-xs-5" style="padding:0; padding-right:5px;">
                        <select class="form-control">
                          <option value>基础护理</option>
                        </select>
                      </div>
                      <div class="col-md-4 col-xs-4" style="padding:0;">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-plus"></button>
                        <input class="form-control date_text" value="2" disabled name type="text">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-minus"></button>
                      </div>
                      <div class="col-md-1 col-xs-1" style="padding:0;">小时</div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-md-2 col-xs-2"></label>
                    <div class="col-md-4 week_form col-xs-4">
                      <div class="col-md-2 col-xs-2" style="padding:0;">
                        <input name type="checkbox" value> 周三
                      </div>
                      <div class="col-md-5 col-xs-5" style="padding:0; padding-right:5px;">
                        <select class="form-control">
                          <option value>基础护理</option>
                        </select>
                      </div>
                      <div class="col-md-4 col-xs-4" style="padding:0;">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-plus"></button>
                        <input class="form-control date_text" value="2" disabled name type="text">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-minus"></button>
                      </div>
                      <div class="col-md-1 col-xs-1" style="padding:0;">小时</div>
                    </div>
                    <label class="control-label col-md-2 col-xs-2"></label>
                    <div class="col-md-4 week_form col-xs-4">
                      <div class="col-md-2 col-xs-2" style="padding:0;">
                        <input name type="checkbox" value> 周四
                      </div>
                      <div class="col-md-5 col-xs-5" style="padding:0; padding-right:5px;">
                        <select class="form-control">
                          <option value>基础护理</option>
                        </select>
                      </div>
                      <div class="col-md-4 col-xs-4" style="padding:0;">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-plus"></button>
                        <input class="form-control date_text" value="2" disabled name type="text">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-minus"></button>
                      </div>
                      <div class="col-md-1 col-xs-1" style="padding:0;">小时</div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-md-2 col-xs-2"></label>
                    <div class="col-md-4 week_form col-xs-4">
                      <div class="col-md-2 col-xs-2" style="padding:0;">
                        <input name type="checkbox" value> 周五
                      </div>
                      <div class="col-md-5 col-xs-5" style="padding:0; padding-right:5px;">
                        <select class="form-control">
                          <option value>基础护理</option>
                        </select>
                      </div>
                      <div class="col-md-4 col-xs-4" style="padding:0;">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-plus"></button>
                        <input class="form-control date_text" value="2" disabled name type="text">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-minus"></button>
                      </div>
                      <div class="col-md-1 col-xs-1" style="padding:0;">小时</div>
                    </div>
                    <label class="control-label col-md-2 col-xs-2"></label>
                    <div class="col-md-4 week_form col-xs-4">
                      <div class="col-md-2 col-xs-2" style="padding:0;">
                        <input name type="checkbox" value> 周六
                      </div>
                      <div class="col-md-5 col-xs-5" style="padding:0; padding-right:5px;">
                        <select class="form-control">
                          <option value>基础护理</option>
                        </select>
                      </div>
                      <div class="col-md-4 col-xs-4" style="padding:0;">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-plus"></button>
                        <input class="form-control date_text" value="2" disabled name type="text">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-minus"></button>
                      </div>
                      <div class="col-md-1 col-xs-1" style="padding:0;">小时</div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-md-2 col-xs-2"></label>
                    <div class="col-md-4 week_form col-xs-4">
                      <div class="col-md-2 col-xs-2" style="padding:0;">
                        <input name type="checkbox" value> 周日
                      </div>
                      <div class="col-md-5 col-xs-5" style="padding:0; padding-right:5px;">
                        <select class="form-control">
                          <option value>基础护理</option>
                        </select>
                      </div>
                      <div class="col-md-4 col-xs-4" style="padding:0;">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-plus"></button>
                        <input class="form-control date_text" value="2" disabled name type="text">
                        <button type="button" class="btn btn-sm glyphicon glyphicon-minus"></button>
                      </div>
                      <div class="col-md-1 col-xs-1" style="padding:0;">小时</div>
                    </div>
                  </div>
                  <h6>
                    <b>护理员</b>
                    <span class="pull-right">
                      <button type="button" class="btn btn-sm glyphicon glyphicon-chevron-left"></button>
                      <button type="button" class="btn btn-sm">本周</button>
                      <button type="button" class="btn btn-sm glyphicon glyphicon-chevron-right"></button>
                      <button type="button" class="btn btn-sm">同上周排班</button>
                    </span>
                  </h6>
                  <table
                    id="data-table-stel"
                    class="table table-striped table-bordered table_head"
                    style="white-space: nowrap; width:100%;text-align:center;"
                  >
                    <thead>
                      <tr>
                        <th>2018-3-12</th>
                        <th>2018-3-13</th>
                        <th>2018-3-14</th>
                        <th>2018-3-15</th>
                        <th>2018-3-16</th>
                        <th>2018-3-17</th>
                        <th>2018-3-18</th>
                      </tr>
                      <tr>
                        <th>周一</th>
                        <th>周二</th>
                        <th>周三</th>
                        <th>周四</th>
                        <th>周五</th>
                        <th>周六</th>
                        <th>周日</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="hlsc_pop">09: 30 09: 30 陈小非</td>
                        <td class="hlsc_pop">+</td>
                        <td class="hlsc_pop">09: 30 09: 30 陈小非</td>
                        <td class="hlsc_pop">+</td>
                        <td class="hlsc_pop">+</td>
                        <td class="hlsc_pop">+</td>
                        <td class="hlsc_pop">+</td>
                      </tr>
                    </tbody>
                  </table>
                  <h6>
                    <b>护士</b>
                    <span class="pull-right">
                      <button type="button" class="btn btn-sm glyphicon glyphicon-chevron-left"></button>
                      <button type="button" class="btn btn-sm">本周</button>
                      <button type="button" class="btn btn-sm glyphicon glyphicon-chevron-right"></button>
                      <button type="button" class="btn btn-sm">同上周排班</button>
                    </span>
                  </h6>
                  <table
                    id="data-table-stel"
                    class="table table-striped table-bordered table_head"
                    style="white-space: nowrap; width:100%;text-align:center;"
                  >
                    <thead>
                      <tr>
                        <th>2018-3-12</th>
                        <th>2018-3-13</th>
                        <th>2018-3-14</th>
                        <th>2018-3-15</th>
                        <th>2018-3-16</th>
                        <th>2018-3-17</th>
                        <th>2018-3-18</th>
                      </tr>
                      <tr>
                        <th>周一</th>
                        <th>周二</th>
                        <th>周三</th>
                        <th>周四</th>
                        <th>周五</th>
                        <th>周六</th>
                        <th>周日</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="hlsc_pop">+</td>
                        <td class="hlsc_pop">+</td>
                        <td class="hlsc_pop">+</td>
                        <td class="hlsc_pop">+</td>
                        <td class="hlsc_pop">09: 30 09: 30 陈小非</td>
                        <td class="hlsc_pop">+</td>
                        <td class="hlsc_pop">+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div id="detailAudit" class="table-responsive panel-body" style="display: none;">
          <table
            id="myModelTable"
            style="margin:0 auto;padding:0px;width:90%;"
            class="table table-striped"
          >
            <tr>
              <th>审核状态：</th>
              <td style="text-align:left;">
                <select id="auditStatusSubmit" style="width: 100px;">
                  <option value="101">审核通过</option>
                  <option value="102">审核拒绝</option>
                </select>
              </td>
            </tr>
          </table>
          <input id="auditID" type="hidden">
        </div>
        <div class="modal-footer" style="text-align:center" id="1F">
          <button
            id="detailCloseBox"
            type="button"
            class="btn btn-default"
            data-dismiss="modal"
            @click="dialogVisible2 = false"
          >关闭</button>
          <button
            id="addHomeServiceButton"
            type="button"
            class="btn btn-success"
            @click="addHomeService()"
          >提交</button>
          <button
            id="auditHomeServiceButton"
            type="button"
            class="btn btn-success"
            @click="auditOrgService()"
          >审核提交</button>
        </div>
        <span slot="footer" class="dialog-footer" hidden>
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分配的模态框 -->
      <el-dialog
        title="分配护理机构"
        :visible.sync="dialogVisibleFenpei"
        width="20%"
        :before-close="handleCloseFenpei"
      >
        <el-form
          :model="ruleFormFenpei"
          status-icon
          :rules="rulesFenpei"
          ref="ruleFormFenpei"
          label-width="100px"
          class="demo-ruleForm"
          style="text-align:left;"
        >
          <el-form-item label="分配给：" prop="orgCom">
            <el-radio v-model="ruleFormFenpei.orgCom" label="1">护理机构</el-radio>
            <el-radio v-model="ruleFormFenpei.orgCom" label="2">居家护理</el-radio>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitFormFenpei('ruleFormFenpei')">提交</el-button>
            <!-- <el-button @click="resetFormFenpei('ruleFormFenpei')">重置</el-button> -->
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" hidden>
          <el-button @click="dialogVisibleFenpei = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleFenpei = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 拒接的模态框 -->
      <!-- 分配的模态框 -->
      <el-dialog
        title="拒绝接收"
        :visible.sync="dialogVisibleReject"
        width="20%"
        :before-close="handleCloseReject"
      >
        <el-form
          :model="ruleFormReject"
          status-icon
          :rules="rulesReject"
          ref="ruleFormReject"
          label-width="100px"
          class="demo-ruleForm"
          style="text-align:left;"
        >
          <el-form-item label="理由：" prop="why">
            <el-input v-model="ruleFormReject.why" placeholder="请填写拒绝接收的理由"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitFormReject('ruleFormReject')">提交</el-button>
            <!-- <el-button @click="resetFormReject('ruleFormReject')">重置</el-button> -->
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" hidden>
          <el-button @click="dialogVisibleReject = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleReject = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 暂停护理计划 -->
      <el-dialog
        title="暂停护理计划"
        :visible.sync="dialogVisibleStop"
        width="30%"
        :before-close="handleCloseStop"
        center
      >
        <el-form
          :model="ruleFormStop"
          status-icon
          :rules="rulesStop"
          ref="ruleFormStop"
          label-width="100px"
          class="demo-ruleForm"
          style="text-align:left;"
        >
          <el-form-item label="暂停原因:" prop='stopWhy'>
                  <el-input v-model.trim="ruleFormStop.stopWhy" placeholder="请输入暂停原因" clearable></el-input>
                </el-form-item>

                <!-- <el-form-item>
                  <el-button type="primary" @click="submitFormStop('ruleFormStop')">提交</el-button>
                </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleStop = false">取 消</el-button>
          <el-button type="primary" @click="submitFormStop('ruleFormStop')">提交</el-button>
        </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
import base from "../../base/base.js";
import Vue from "vue";
import vueArea from "vue-area";
export default {
  mixins: [base],
  inject: ["reload"],
  data() {
    return {
      // 时间限制
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() < window.localStorage.getItem("sjxz1");
        }
      },
      //搜索相关
      // 搜索时get拼接，所有如果有未填的不能为null，要为空字符串
      nameSearch: "",
      idCardSearch: "",
      ybCardSearch: "",
      disStatus: "",
      disOrg1: "",
      status: "",
      shenheStatus: "",
      bedNumSearch: "",
      stopReason:'',

      //表单相关
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      curOpt_: null,
      curEditId_: null,
      ruleForm: {
        name: "",
        company: "",
        state: "",
        notice: "",
        id: 0
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        company: [
          { required: true, message: "请选择角色所属公司", trigger: "change" }
        ]
        // state: [
        //   { required: true, message: "请选择角色当前状态", trigger: "change" }
        // ]
      },

      ruleForm1: {
        name: "",
        company: "",
        state: "",
        notice: "",
        id: 0
      },
      rules1: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        company: [
          { required: true, message: "请选择角色所属公司", trigger: "change" }
        ]
        // state: [
        //   { required: true, message: "请选择角色当前状态", trigger: "change" }
        // ]
      },
      //列表相关
      datalists: [],

      // 暂停原因相关
      dialogVisibleStop:false,
      ruleFormStop: {
        stopWhy: ''
      },
      rulesStop: {
        stopWhy:{required:true, message: '请填写暂停原因',trigger: 'blur' }
      },
      planId:'',

      //搜索
      searchValue: "",
      updateData2: [],
      updateStartTime: null,
      updateSex: null,
      disOrg: [],

      // 省市区相关
      selected: "",
      citySelected: "",
      areaSelected: "",
      streetSelected: "",
      provinceL: [],
      cityL: [],
      areaL: [],
      city: [],
      streetL: [],
      provinceName: "",
      cityName: "",
      areaName: "",
      streetName: "",

      //   分配相关
      dialogVisibleFenpei: false,
      ruleFormFenpei: {
        orgCom: 1
      },
      rulesFenpei: {},
      //拒接相关
      dialogVisibleReject: false,
      ruleFormReject: {
        why: null
      },
      rulesReject: {},

      weekdayArray1: [],
      weekdayArray2: [],
      servicePlanItemIdType1Array: [],
      servicePlanItemIdType2Array: [],

      // 排班相关
      // 护理时间
      hlsj: null,

      serviceDuration: null,
      serviceName: null,
      userName: null,
      serviceStaff: null,
      serviceStaffType: null,
      paibanData: null,
      serviceStatus: 1,
      // 护理员的人选
      serviceStaffData: [],
      // 护士的人选
      serviceStaffData2: [],

      // 当前planID
      currentPlanID: null,

      // 排班时当前的日期
      currentDate: null,
      // 提交整周的时候判断是上面的护理员的日期还是护士的日期
      serviceType: 1,

      //
      // 当前的值
      serviceCurrentStaff: null,
      serviceCurrentType: null,
      serviceStaffCurrentData: [],
      // 搜索的内容
      serviceCurrentStaffSearch:null,

      startDate: null,
      bedId: null,

      // 新增里面的入住时间
      serviceInDate: null,

      // 增删改审的权限问题？？
      urlRole1: 0,
      urlRole2: 0,
      urlRole3: 0,
      urlRole4: 0,

      // loading效果的开关
      loading: true
    };
  },
  watch: {
    selected: function() {
      for (var item of this.provinceL) {
        if (item.regionId == this.selected) {
          this.provinceName = item.regionName;
        }
      }

      // console.log(this.selected,this.provinceName)
      this.$axios({
        url: `${this.$store.state.globalRouter}/get_regions?parentId=${
          encodeURI(this.selected)
        }`,
        method: "get"
      }).then(res => {
        // console.log(res)
        this.cityL = res.data;
      });

      this.areaL = [];
    },
    citySelected: function() {
      for (var item of this.cityL) {
        if (item.regionId == this.citySelected) {
          this.cityName = item.regionName;
        }
      }
      // console.log(this.citySelected,this.cityName)
      this.$axios({
        url: `${this.$store.state.globalRouter}/get_regions?parentId=${
          encodeURI(this.citySelected)
        }`,
        method: "get"
      }).then(res => {
        // console.log(res)
        this.areaL = res.data;
      });
    },
    areaSelected: function() {
      for (var item of this.areaL) {
        if (item.regionId == this.areaSelected) {
          this.areaName = item.regionName;
        }
      }
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_street_mng/find_nursing_street_by_district?district=${
          encodeURI(this.areaSelected)
        }-${encodeURI(this.areaName)}`,
        method: "get"
      }).then(res => {
        this.streetL = res.data.data;
        //  this.areaL = res.data;
      });
      // console.log(this.areaSelected,this.areaName)
    }
  },
  components: {
    vueArea: vueArea
  },
  methods: {
    // 排班时员工搜索
    findIns(){
      if(this.serviceCurrentStaffSearch && this.serviceCurrentStaffSearch!=''){
        if(this.serviceStaffType=='护理员'){
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/intact/intact_staff_mng/load_staff_by_type_and_class_name?userType=4&userClass=1&fullName=${encodeURI(this.serviceCurrentStaffSearch)}`,
            method: "get"
          }).then(res => {
            this.serviceStaffCurrentData=res.data.data;
            var data=res.data.data;
            if(data && data.length>0){
              this.serviceCurrentStaff=data[0].userId;
            }else{
              this.serviceCurrentStaff=null;
            }

          });
        }else if(this.serviceStaffType=='护士'){
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/intact/intact_staff_mng/load_staff_by_type_and_class_name?userType=4&userClass=2&fullName=${encodeURI(this.serviceCurrentStaffSearch)}`,
            method: "get"
          }).then(res => {
            this.serviceStaffCurrentData=res.data.data;
            var data=res.data.data;
            if(data && data.length>0){
              this.serviceCurrentStaff=data[0].userId;
            }else{
              this.serviceCurrentStaff=null;
            }

          });
        }
      }else{
        this.$message({type:'warning',message:'搜索名字不能为空!!'})
      }

    },
    // 收缩
    shousuo(type) {
      if (type == 1) {
        if ($("#base_info_display_btn").html() == "展开") {
          $("#base_info_display_btn").html("收缩");
          // $("#base_info").prop("hidden", false);
          $("#base_info").css("display", 'block');
        } else {
          $("#base_info_display_btn").html("展开");
          // $("#base_info").prop("hidden", true);
          $("#base_info").css("display", 'none');
        }
      }
      if (type == 2) {
        if ($("#nursing_plan_display_btn").html() == "展开") {
          $("#nursing_plan_display_btn").html("收缩");
          // $("#nursing_plan").prop("hidden", false);
          $("#nursing_plan").css("display", 'block');
        } else {
          $("#nursing_plan_display_btn").html("展开");
          // $("#nursing_plan").prop("hidden", true);
          $("#nursing_plan").css("display", 'none');
        }
      }
    },

    exportPlan() {
      alert("导出成功");
    },

    search() {
      // console.log(this.bedNumSearch)
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_org_service_mng/query_bed_information?distributeOrgId=${
          encodeURI(this.disOrg1)
        }&userNameLike=${encodeURI(this.nameSearch)}&medicalInsuranceIdLike=${
          encodeURI(this.ybCardSearch)
        }&userIdcardLike=${encodeURI(this.idCardSearch)}&planStatus=${
          encodeURI(this.status)
        }&schedulingAuditStatus=${encodeURI(this.shenheStatus)}&bedNoLike=${
         encodeURI(this.bedNumSearch)
        }&comments=${encodeURI(this.stopReason)}`,
        method: "get"
      }).then(res => {
        this.dataList(res.data.data);
      });
    },
    changeSelect(val) {
      //   console.log(this.statusSearch)
    },
    // 分配相关
    fenpei(index, row) {
      this.dialogVisibleFenpei = true;
      // console.log(index,row)
    },
    submitFormFenpei(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert(this.ruleFormFenpei.orgCom);
          //   console.log(this.orderNo, this.ruleFormFenpei.orgCom);
          //   this.$axios({
          //     url   : `${this.$store.state.globalRouter}/auth/assess/order_mng/distribute_org?orderNo=${this.orderNo}&distriOrgId=${this.ruleFormFenpei.orgCom}`,
          //     method: 'get'
          //   }).then(res=>{

          //     this.dialogVisible1 = false;
          //     alert('分配成功')
          //   })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormFenpei(formName) {
      this.$refs[formName].resetFields();
    },
    handleCloseFenpei(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    receive(index, row) {
      this.$confirm("你将要进行接收操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "接收成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消接收"
          });
        });
    },
    // 拒接相关
    reject(index, row) {
      this.dialogVisibleReject = true;
    },
    submitFormReject(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert(this.ruleFormReject.why);
          //   console.log(this.orderNo, this.ruleFormFenpei.orgCom);
          //   this.$axios({
          //     url   : `${this.$store.state.globalRouter}/auth/assess/order_mng/distribute_org?orderNo=${this.orderNo}&distriOrgId=${this.ruleFormFenpei.orgCom}`,
          //     method: 'get'
          //   }).then(res=>{

          //     this.dialogVisible1 = false;
          //     alert('分配成功')
          //   })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormReject(formName) {
      this.$refs[formName].resetFields();
    },
    handleCloseReject(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    add(id) {
      // alert(id)
      this.curOpt_ = 1;
      // document.getElementById("modalFrom").reset();
      this.dialogVisible2 = true;
      this.$options.methods.clearModelTable();

      setTimeout(() => {
        $("#auditHomeServiceButton").hide();
        var myModelTable = $("#modalFrom");
        this.startDate = null;
        this.bedId = id;

        $("#base_info_display_btn").html("收缩");
        // $("#base_info").prop("hidden", false);
        $("#base_info").css("display", 'block');
        $("#nursing_plan_display_btn").html("收缩");
        // $("#nursing_plan").prop("hidden", false);
        $("#nursing_plan").css("display", 'block');

        var myModelTable = $("#modalFrom");
        this.startDate = null;
        myModelTable.find("button[name='findInsUserBtn']").show();
        $("#addHomeServiceButton").attr("disabled", false);
        myModelTable.find("input[name='userIdcard']").attr("disabled", false);
        myModelTable
          .find("input[name='medicalInsuranceId']")
          .attr("disabled", false);
        $("#serviceInDate").attr("disabled", false);
      }, 100);

      // this.$options.methods.planFormInitAndShow();                                                                                                                                                                                                                                                                                                                                                                                                       this.dialogVisible2 = true;
      //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     var that                = this;
      //   this.$options.methods.clearModelTable();
    },
    shehe() {
      $("#base_info_display_btn").html("展开");
      // $("#base_info").prop("hidden", true);
      $("#base_info").css("display", 'none');
      $("#nursing_plan_display_btn").html("展开");
      // $("#nursing_plan").prop("hidden", true);
      $("#nursing_plan").css("display", 'none');
      var checkedLen = $("input[name='planIdBox']:checked").length;
      // console.log(checkedLen);
      if (checkedLen != 1) {
        alert("请选择一条记录");
      } else {
        var planStatus = $(":checkbox[name='planIdBox']:checked")
          .parent()
          .parent()
          .find("input[name='planStatus']")
          .val();
        if (planStatus != "正常") {
          alert("该床位的参保人的护理计划已暂停或者终止，无法修改");
        } else {
          var idCheck = $(":checkbox[name='planIdBox']:checked").val();
          // console.log(idCheck);
          this.currentPlanID = idCheck;
          this.$options.methods.planDetail(idCheck, "yes", this);
        }
      }
    },
    // 排班
    showEditView() {
      $("#base_info_display_btn").html("展开");
      // $("#base_info").prop("hidden", true);
      $("#base_info").css("display", 'none');
      $("#nursing_plan_display_btn").html("展开");
      // $("#nursing_plan").prop("hidden", true);
      $("#nursing_plan").css("display", 'none');
      var checkedLen = $("input[name='planIdBox']:checked").length;
      // console.log(checkedLen);
      if (checkedLen != 1) {
        alert("请选择一条记录");
      } else {
        var planStatus = $(":checkbox[name='planIdBox']:checked")
          .parent()
          .parent()
          .find("input[name='planStatus']")
          .val();
        if (planStatus != "正常") {
          alert("该床位的参保人的护理计划已暂停或者终止，无法修改");
        } else {
          var idCheck = $(":checkbox[name='planIdBox']:checked").val();
          // console.log(idCheck);
          this.$options.methods.paibanDetail(idCheck, this);
        }
      }
      this.bedId = $(":checkbox[name='planIdBox']:checked")
        .parent()
        .parent()
        .find("input[name='bedIdHidden']")
        .val();

      // if (this.updateData2.length != 1) {
      //   alert("请选择一条记录");
      // } else {
      //   var planId              = this.updateData2[0].planId;
      //       this.curEditId_     = planId;
      //       this.dialogVisible2 = true;
      //   this.$options.methods.paibanDetail(this.updateData2[0].planId, this);
      // }
    },

    //排班提交
    planSubmit() {
      // alert("提交成功");
      var planId = "";
      var myModelTable = $("#modalFrom");
      // console.log('planID',this.curOpt_,myModelTable.find("input[name='planId']").val());
      if (this.curOpt_ == 1) {
        // alert("1");
        planId = myModelTable.find("input[name='planId']").val();
      } else if (this.curOpt_ == 3) {
        planId = this.curEditId_;
      }
      // console.log('时间',this.hlsj)
      if (this.hlsj == null || planId == "") {
        alert("护理开始时间或护理计划ID不能为空");
      } else if(this.serviceCurrentStaff==null || this.serviceCurrentStaff==''){
        alert('请选择一位护理人员')
      }
      else {
        var nursingServiceSchedulingPlan = new Object();
        nursingServiceSchedulingPlan.planId = planId;
        nursingServiceSchedulingPlan.nursingServiceStaffId = this.serviceCurrentStaff;
        // console.log(this.serviceStaffData)

        for (var i = 0; i < this.serviceStaffCurrentData.length; i++) {
          if (
            this.serviceStaffCurrentData[i].userId == this.serviceCurrentStaff
          ) {
            nursingServiceSchedulingPlan.nursingServiceStaffName = this.serviceStaffCurrentData[
              i
            ].fullname;
          }
        }

        nursingServiceSchedulingPlan.servicePlanItemId = this.paibanData.id;
        nursingServiceSchedulingPlan.servicePlanItemName = this.paibanData.serviceName;
        // HH:mm为24小时制的，hh:mm为12小时制的
        nursingServiceSchedulingPlan.serviceStartTimeString = this.hlsj;

        nursingServiceSchedulingPlan.serviceDuration = this.paibanData.duration;
        nursingServiceSchedulingPlan.frequency = this.paibanData.frequency;
        // console.log("111", nursingServiceSchedulingPlan);
        if (this.currentDate != "ALL") {
          nursingServiceSchedulingPlan.serviceDateString = this.currentDate;
          this.$options.methods.ajaxSubmitSchedulingPlan(
            nursingServiceSchedulingPlan,
            this
          );
          // console.log(nursingServiceSchedulingPlan);
        } else {
          // console.log(this.serviceType)
          if (this.serviceType == 1) {
            for (let i = 0; i < this.weekdayArray1.length; i++) {
              nursingServiceSchedulingPlan.serviceDateString = this.weekdayArray1[
                i
              ];
              this.$options.methods.ajaxSubmitSchedulingPlan(
                nursingServiceSchedulingPlan,
                this
              );
            }
          } else if (this.serviceType == 2) {
            for (let i = 0; i < this.weekdayArray2.length; i++) {
              nursingServiceSchedulingPlan.serviceDateString = this.weekdayArray2[
                i
              ];
              this.$options.methods.ajaxSubmitSchedulingPlan(
                nursingServiceSchedulingPlan,
                this
              );
            }
          } else {
            alert("护理类型错误");
          }
        }
      }
    },
    // 护理取消
    cancelSchedulingPlan() {
      var planId = "";
      var myModelTable = $("#modalFrom");
      // console.log('planID',this.curOpt_,myModelTable.find("input[name='planId']").val());
      if (this.curOpt_ == 1) {
        // alert("1");
        planId = myModelTable.find("input[name='planId']").val();
      } else if (this.curOpt_ == 3) {
        planId = this.curEditId_;
      }
      if (planId != null) {
        // console.log('planID',myModelTable.find("input[name='planId']").val());

        var nursingServiceSchedulingPlan = new Object();
        nursingServiceSchedulingPlan.planId = planId;

        nursingServiceSchedulingPlan.servicePlanItemId = this.paibanData.id;

        nursingServiceSchedulingPlan.serviceDuration = this.paibanData.duration;

        if (this.currentDate != "ALL") {
          nursingServiceSchedulingPlan.serviceDateString = this.currentDate;
          this.$options.methods.ajaxCancleSchedulingPlan(
            nursingServiceSchedulingPlan,
            this
          );
          // console.log(nursingServiceSchedulingPlan)
        } else {
          // console.log(this.serviceType)
          if (this.serviceType == 1) {
            for (let i = 0; i < this.weekdayArray1.length; i++) {
              nursingServiceSchedulingPlan.serviceDateString = this.weekdayArray1[
                i
              ];
              this.$options.methods.ajaxCancleSchedulingPlan(
                nursingServiceSchedulingPlan,
                this
              );
            }
          } else if (this.serviceType == 2) {
            for (let i = 0; i < this.weekdayArray2.length; i++) {
              nursingServiceSchedulingPlan.serviceDateString = this.weekdayArray2[
                i
              ];
              this.$options.methods.ajaxCancleSchedulingPlan(
                nursingServiceSchedulingPlan,
                this
              );
            }
          } else {
            alert("护理类型错误");
          }
        }
      } else {
        alert("护理计划ID为空！");
      }
    },
    // 排班计划提交
    ajaxSubmitSchedulingPlan(nursingServiceSchedulingPlan, that) {
      var str = JSON.stringify(nursingServiceSchedulingPlan);
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_org_service_mng/submit_scheduling_plan`,
          method: "get",
          params: {
            nursingServiceSchedulingPlanJson: str
          }
        })
        .then(res => {
          if (res.data.resultCode == "000000") {
            // 获取具体的值填写
            that.$options.methods.querySchedulingPlan(1, that);
            that.$options.methods.querySchedulingPlan(2, that);
            // alert("添加成功");
            that.dialogVisible1 = false;
          } else {
            alert("添加失败  " + res.data.resultMsg);
          }
        });
    },
    // 排班计划取消
    ajaxCancleSchedulingPlan(nursingServiceSchedulingPlan, that) {
      var str = JSON.stringify(nursingServiceSchedulingPlan);

      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_org_service_mng/cancel_scheduling_plan`,
          method: "get",
          params: {
            nursingServiceSchedulingPlanJson: str
          }
        })
        .then(res => {
          if (res.data.resultCode == "000000") {
            that.$options.methods.querySchedulingPlan(1, that);
            that.$options.methods.querySchedulingPlan(2, that);
            // alert("取消成功");
            that.dialogVisible1 = false;
          } else {
            alert("取消失败  " + res.data.resultMsg);
          }
        });
    },
    remove() {
      var checkedLen = $("input[name='planIdBox']:checked").length;
      if (checkedLen != 1) {
        alert("请选择一条记录");
      } else {
        var idCheck = $(":checkbox[name='planIdBox']:checked").val();
        console.log(idCheck);
        this.$confirm("是否要删除当前数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$axios({
              url: `${
                this.$store.state.globalRouter
              }/auth/nursing/nursing_service_org_service_mng/delete_scheduling?planId=${encodeURI(idCheck)}`,
              method: "get"
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.$options.methods.getReloadData(this);
                alert("删除成功");
              } else {
                alert("删除失败  " + res.data.resultMsg);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除"
            });
          });
      }
    },
    stop() {
      var checkedLen = $("input[name='planIdBox']:checked").length;
      if (checkedLen != 1) {
        alert("请选择一条记录");
      } else {
        var idCheck = $(":checkbox[name='planIdBox']:checked").val();
        this.planId=idCheck;
        this.dialogVisibleStop=true;
        this.ruleFormStop.stopWhy='';
        // $("#stopmodal").modal("show");
        var _this=this;
        // DOM异步更新,直接写的时候报错找不到元素
        this.$nextTick(()=>{
          _this.$refs['ruleFormStop'].clearValidate();
        })



        // var idCheck = $(":checkbox[name='planIdBox']:checked").val();
        // console.log(idCheck);
        // this.$confirm("是否要暂停当前数据的状态?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning",
        //   center: true
        // })
        //   .then(() => {
        //     console.log(idCheck);
        //     this.$axios({
        //       url: `${
        //         this.$store.state.globalRouter
        //       }/auth/nursing/nursing_service_plan_base_mng/pause_service?planId=${encodeURI(idCheck)}&pauseStatus=2`,
        //       method: "get"
        //     }).then(res => {
        //       if ((res.data.resultCode == "000000")) {
        //         this.$options.methods.getReloadData(this);
        //         alert("暂停成功");
        //       } else {
        //         alert("暂停失败   " + res.data.resultMsg);
        //       }
        //     });
        //   })
        //   .catch(() => {
        //     this.$message({
        //       type: "info",
        //       message: "取消暂停"
        //     });
        //   });
      }
    },
    // 在ie下弹出框关闭兼容
    closeModal(id){
      $('#'+id).hide();
    },
    // 取消工单弹出框相关
    submitFormStop(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
              url: `${
                this.$store.state.globalRouter
              }/auth/nursing/nursing_service_plan_base_mng/pause_service?planId=${encodeURI(this.planId)}&pauseStatus=2&comments=${encodeURI(this.ruleFormStop.stopWhy)}`,
              method: "get"
            }).then(res => {
              if ((res.data.resultCode == "000000")) {
                this.$options.methods.getReloadData(this);
                // $('.modal-backdrop').remove();
                // $('#stopmodal').hide();
                this.dialogVisibleStop=false;
                alert("暂停成功");
              } else {
                // $('.modal-backdrop').remove();
                // $('#stopmodal').hide();
                this.dialogVisibleStop=false;
                alert("暂停失败   " + res.data.resultMsg);

              }
            });

        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    handleCloseStop(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    recover() {
      var checkedLen = $("input[name='planIdBox']:checked").length;
      if (checkedLen != 1) {
        alert("请选择一条记录");
      } else {
        var idCheck = $(":checkbox[name='planIdBox']:checked").val();
        // console.log(idCheck);
        this.$confirm("是否要恢复当前数据的状态?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$axios({
              url: `${
                this.$store.state.globalRouter
              }/auth/nursing/nursing_service_plan_base_mng/pause_service?planId=${encodeURI(idCheck)}&pauseStatus=1&comments=''`,
              method: "get"
            }).then(res => {
              if ((res.data.resultCode == "000000")) {
                this.$options.methods.getReloadData(this);
                alert("恢复成功");
              } else {
                alert("恢复失败   " + res.data.resultMsg);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消恢复"
            });
          });
      }
    },
    addHomeService() {
      // alert('添加成功')
      var planId = "";

      var planId = "";
      var myModelTable = $("#modalFrom");
      // console.log('planID',this.curOpt_,myModelTable.find("input[name='planId']").val());
      if (this.curOpt_ == 1) {
        planId = myModelTable.find("input[name='planId']").val();
      } else if (this.curOpt_ == 3) {
        planId = this.curEditId_;
      }

      // console.log(planId,this.startDate,this.bedId);
      var serviceInDate = $("#serviceInDate").val();
      if (serviceInDate == "") {
        alert("入住日期不能为空");
        return false;
      }

      if (this.curOpt_ == 1) {
        this.$axios({
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_org_service_mng/add_org_service?planId=${encodeURI(planId)}&bedId=${
            encodeURI(this.bedId)
          }&serviceInDate=${encodeURI(serviceInDate)}`,
          method: "get"
        }).then(res => {
          if (res.data.resultCode == "000000") {
            this.$options.methods.getReloadData(this);
            alert("提交成功");
            this.dialogVisible2 = false;
          } else {
            alert("提交失败  " + res.data.resultMsg);
          }
        });
      } else if (this.curOpt_ == 3) {
        this.$axios({
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_org_service_mng/add_org_service?planId=${encodeURI(planId)}&bedId=${
            encodeURI(this.bedId)
          }&serviceInDate=${encodeURI(this.startDate)}`,
          method: "get"
        }).then(res => {
          if (res.data.resultCode == "000000") {
            this.$options.methods.getReloadData(this);
            alert("提交成功");
            this.dialogVisible2 = false;
          } else {
            alert("提交失败  " + res.data.resultMsg);
          }
        });
      }
      //  this.$axios({
      //     url   : `${this.$store.state.globalRouter}/auth/nursing/nursing_service_org_service_mng/add_org_service?planId=${planId}&bedId=${this.bedId}&serviceInDate=${this.startDate}`,
      //     method: 'get'
      //   }).then(res=>{

      //     if(res.data.resultCode=='000000'){
      //       this.$options.methods.getReloadData(this);
      //       alert('提交成功');
      //       this.dialogVisible2 = false;
      //     }else{
      //       alert('提交失败  '+res.data.resultMsg)
      //     }

      //   })
    },
    auditOrgService() {
      var status = $("#auditStatusSubmit").val();
      console.log(status, this.currentPlanID);
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_org_service_mng/audit_home_service?planId=${
          encodeURI(this.currentPlanID)
        }&auditStatus=${encodeURI(status)}`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.$options.methods.getReloadData(this);
          this.dialogVisible2 = false;
          alert("审核成功");
        } else {
          alert("审核失败  " + res.data.resultMsg);
        }
      });
    },

    switchType(type) {
      if (type == 1) {
        $("#hlscType").attr("style", "display:none;");
        $("#hlxmType").attr("style", "display:block;");
      } else {
        $("#hlscType").attr("style", "display:block;");
        $("#hlxmType").attr("style", "display:none;");
      }
      // alert(type);
    },
    paibanDetail(planId, that) {
      that.dialogVisible2 = true;
      // console.log(index,row);
      //  that.dialogVisible2 = true;
      // console.log(index,row);
      var planId = planId;
      that.curOpt_ = 3;
      that.curEditId_ = planId;
      // 每次详情的时候先为空？？？？
      (that.weekdayArray1 = []),
        (that.weekdayArray2 = []),
        (that.servicePlanItemIdType1Array = []),
        (that.servicePlanItemIdType2Array = []);
      // 与护理计划制定不同

      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_plan_base_mng/load_ins_user_plan_edit_data?planId=${encodeURI(planId)}`,
          method: "get"
        })
        .then(res => {
          var result = res.data.data;

          that.startDate = result.planStartDate;
          var myModelTable = $("#modalFrom");
          var specialarray = ["不是", "五保户", "低保户", "困难户"];
          var handicarray = ["不是", "是"];
          var planStatusMap = {};
          planStatusMap[1] = "正常";
          planStatusMap[2] = "暂停";
          planStatusMap[3] = "终止";
          //表示当前已经点击到的日期
          var currentFirstDate1;
          var currentFirstDate2;

          myModelTable.find("button[name='copy-last-week1']").show();
          myModelTable.find("button[name='copy-last-week2']").show();

          $("#auditHomeServiceButton").hide();
          $("#addHomeServiceButton").show();

          // $("#addHomeServiceButton").css("background", "#7BB6EC");

          myModelTable.find("input[name='userIdcard']").attr("disabled", true);
          myModelTable
            .find("input[name='medicalInsuranceId']")
            .attr("disabled", true);
          myModelTable.find("button[name='findInsUserBtn']").hide();
          // $('#addHomeServiceButton').hide();
          that.userName = result.fullName;
          myModelTable.find("input[name='userIdcard']").val(result.idNo);
          myModelTable.find("input[name='userName']").val(result.fullName);
          //下面是简单的根据身份证号算下年龄和性别并赋上值，可以手动再改
          var date = new Date();
          var year = date.getFullYear();
          var birthday_year = parseInt(
            myModelTable
              .find("input[name='userIdcard']")
              .val()
              .substr(6, 4)
          );
          var userage = year - birthday_year;
          myModelTable.find("input[name='userAge']").val(userage);
          // alert(result.sex)
          if (result.sex == "M") {
            myModelTable
              .find("input[name='userSexM']")
              .prop("checked", "checked");
            myModelTable.find("input[name='userSexF']").prop("checked", false);
          } else {
            myModelTable
              .find("input[name='userSexF']")
              .prop("checked", "checked");
            myModelTable.find("input[name='userSexM']").prop("checked", false);
          }
          myModelTable.find("input[name='userSex']").val(result.sex);
          myModelTable
            .find("input[name='userAssessedLevel']")
            .val(result.assessedLevel);
          myModelTable.find("input[name='agentName']").val(result.contactName);
          myModelTable
            .find("input[name='agentPhone']")
            .val(result.contactPhone);

          myModelTable
            .find("input[name='address']")
            .val(result.appointedAddress);
          myModelTable
            .find("input[name='medicalInsuranceId']")
            .val(result.medicalInsuranceId);
          myModelTable
            .find("input[name='planStartDate']")
            .val(result.planStartDate);
          myModelTable.find("input[name='endDate']").val(result.endDate);

          myModelTable
            .find("input[name='special']")
            .val(specialarray[result.special]);
          myModelTable
            .find("input[name='handicapped']")
            .val(handicarray[result.handicapped]);

          myModelTable
            .find("input[name='distributeOrgName']")
            .val(result.distributeOrgName);
          myModelTable
            .find("input[name='planStatus']")
            .val(planStatusMap[result.planStatus]);
          myModelTable
            .find("input[name='serviceInDate']")
            .val(result.serviceInDate);
          myModelTable.find("input[name='endInDate']").val(result.endDate);
          myModelTable.find("input[name='pauseDate']").val(result.pauseDate);

          myModelTable
            .find("input[name='serviceInDate']")
            .attr("disabled", true);
          // myModelTable.find("input[name='serviceInDate']").attr("onfocus", "");

          myModelTable.find("input[name='pauseDate']").attr("disabled", true);
          // myModelTable.find("input[name='pauseDate']").attr("onfocus", "");
          myModelTable.find("input[name='endDate']").attr("disabled", true);
          // myModelTable.find("input[name='endDate']").attr("onfocus", "");

          myModelTable.find("input[name='planId']").val(result.planId);

          var tableHTML = "";
          var serviceType1Count = 0;
          var serviceType2Count = 0;
          // var servicePlanItemIdType1Array = new Array();
          // var servicePlanItemIdType2Array = new Array();

          for (var i = 0; i < result.nursingServicePlanItemList.length; i++) {
            var nursingServicePlanItem = result.nursingServicePlanItemList[i];
            tableHTML += "<tr name='data_tr'>";
            if (nursingServicePlanItem.serviceType == "1") {
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>基础护理</td>";
              serviceType1Count++;
              that.servicePlanItemIdType1Array.push(nursingServicePlanItem.id);
            } else if (nursingServicePlanItem.serviceType == "2") {
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>常用临床护理</td>";
              serviceType2Count++;
              that.servicePlanItemIdType2Array.push(nursingServicePlanItem.id);
            }
            tableHTML +=
              "<td style='text-align:left;vertical-align: middle;'>" +
              nursingServicePlanItem.serviceName +
              "<input name='serviceId' type='hidden' value='" +
              nursingServicePlanItem.serviceId +
              "'/><input name='serviceName' type='hidden' value='" +
              nursingServicePlanItem.serviceName +
              "'/><input name='serviceType' type='hidden' value='" +
              nursingServicePlanItem.serviceType +
              "'/></td>";
            // 护理频次（实际）
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>";
            tableHTML +=
              "<input type='text' name='frequencyUnitLength' style='width:50px;position:relative;top:-1px;height:31px!important;' disabled value='" +
              nursingServicePlanItem.frequencyUnitLength +
              "'/>";
            tableHTML +=
              "<select name='frequencyUnit' disabled style='width:50px;position:relative;top:-1px;height:31px!important;'>";
            if (nursingServicePlanItem.frequencyUnit == 1) {
              tableHTML += "<option value='1' selected='selected'>日</option>";
              tableHTML += "<option value='2'>月</option>";
            }
            if (nursingServicePlanItem.frequencyUnit == 2) {
              tableHTML += "<option value='1'>日</option>";
              tableHTML += "<option value='2' selected='selected'>月</option>";
            }
            tableHTML += "</select>";
            tableHTML +=
              "<input type='text' name='frequency' style='width:50px;position:relative;top:-1px;height:31px!important;' disabled value='" +
              nursingServicePlanItem.frequency +
              "'/> 次";
            tableHTML += "</td>";
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>" +
              nursingServicePlanItem.duration +
              " 分</td>";
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'><input type='hidden' name='servicePrice' value='" +
              nursingServicePlanItem.servicePrice +
              "'>" +
              nursingServicePlanItem.servicePrice +
              "</td>";
            tableHTML += "</tr>";
          }
          //先清除下除了表头之外的数据
          $("#pagDetailModalTable tr:not(:first)").remove();
          $("#pagDetailModalTable").append(tableHTML);

          myModelTable.find("div[name='SchedulingDiv']").show();
          var schedulingTable1 = myModelTable.find(
            "table[name='SchedulingTable1']"
          );
          var schedulingTable2 = myModelTable.find(
            "table[name='SchedulingTable2']"
          );
          that.$options.methods.setDate(
            that.$options.methods.addDate(new Date(), 0),
            "1",
            that
          );
          that.$options.methods.setDate(
            that.$options.methods.addDate(new Date(), 0),
            "2",
            that
          );
          var tableBody1 = "<tbody>";
          var tableBody2 = "<tbody>";
          var nursingServicePlanItemList1 = new Array();
          var nursingServicePlanItemList2 = new Array();
          for (
            var i2 = 0;
            i2 < result.nursingServicePlanItemList.length;
            i2++
          ) {
            var nursingServicePlanItem = result.nursingServicePlanItemList[i2];
            switch (nursingServicePlanItem.serviceType) {
              case 1:
                nursingServicePlanItemList1.push(nursingServicePlanItem);
                break;
              case 2:
                nursingServicePlanItemList2.push(nursingServicePlanItem);
                break;
              default:
                break;
            }
          }
          // console.log(that.weekdayArray1);
          //  具体的内部填值是在获取的列表里面的
          for (var m1 = 0; m1 < nursingServicePlanItemList1.length; m1++) {
            var nursingServicePlanItem = nursingServicePlanItemList1[m1];
            tableBody1 += "<tr>";
            if (m1 == 0) {
              tableBody1 +=
                "<td rowspan='" +
                serviceType1Count +
                "' style='vertical-align:middle'>基础护理</td>";
            }
            tableBody1 +=
              "<td>" +
              nursingServicePlanItem.serviceName +
              "<input type='hidden' name='serviceName' value='" +
              nursingServicePlanItem.serviceName +
              "'><input type='hidden' name='duration' value='" +
              nursingServicePlanItem.duration +
              "'><input type='hidden' name='serviceType' value='" +
              nursingServicePlanItem.serviceType +
              "'><input type='hidden' name='frequency' value='" +
              nursingServicePlanItem.frequency +
              "'></td>";
            tableBody1 += `<td class='hlxm_pop' name='${
              nursingServicePlanItem.id
            }_ALL' @click='paiban'>+</td>`;
            for (var j = 0; j < 7; j++) {
              tableBody1 += `<td class='hlxm_pop' name='${
                nursingServicePlanItem.id
              }_${that.weekdayArray1[j]}' @click='paiban'>+`;
              tableBody1 += "</td>";
            }
            tableBody1 += "</tr>";
          }
          tableBody1 += "</tbody>";
          for (var m2 = 0; m2 < nursingServicePlanItemList2.length; m2++) {
            var nursingServicePlanItem = nursingServicePlanItemList2[m2];
            tableBody2 += "<tr>";
            if (m2 == 0) {
              tableBody2 +=
                "<td rowspan='" +
                serviceType2Count +
                "' style='vertical-align:middle'>常用临床护理</td>";
            }
            tableBody2 +=
              "<td>" +
              nursingServicePlanItem.serviceName +
              "<input type='hidden' name='serviceName' value='" +
              nursingServicePlanItem.serviceName +
              "'><input type='hidden' name='duration' value='" +
              nursingServicePlanItem.duration +
              "'><input type='hidden' name='serviceType' value='" +
              nursingServicePlanItem.serviceType +
              "'><input type='hidden' name='frequency' value='" +
              nursingServicePlanItem.frequency +
              "'></td>";
            tableBody2 += `<td class='hlxm_pop' name='${
              nursingServicePlanItem.id
            }_ALL' @click='paiban'>+</td>`;
            for (var j = 0; j < 7; j++) {
              tableBody2 += `<td class='hlxm_pop' name='${
                nursingServicePlanItem.id
              }_${that.weekdayArray2[j]}' @click='paiban'>+`;
              tableBody2 += "</td>";
            }
            tableBody2 += "</tr>";
          }

          tableBody2 += "</tbody>";

          if (serviceType1Count != 0) {
            var MyComponent = Vue.extend({
              template: tableBody1,
              data() {
                return {};
              },
              methods: {
                paiban(event) {
                  that.dialogVisible1 = true;
                  that.serviceCurrentStaffSearch='';
                  // that.serviceStatus=0;
                  console.log(
                    "11",
                    event.srcElement.parentElement.childNodes[1].childNodes
                  );
                  var ht = event.target;
                  var dateString = event.target.getAttribute("name");
                  that.currentDate = dateString.split("_")[1];
                  // console.log('1111',that.currentDate);
                  var id = ht.getAttribute("name").split("_")[0];
                  var data;
                  for (var item of nursingServicePlanItemList1) {
                    if (id == item.id) {
                      data = item;
                    }
                  }

                  that.paibanData = data;
                  var hlryName = null;
                  if (event.target.textContent != "+") {
                    // that.hlsj = that.$moment('2017-01-02 '+event.target.textContent.split(' ')[0]+':00').format("HH:mm:ss");
                    that.hlsj = event.target.textContent.split(" ")[0];
                    hlryName = event.target.textContent.split(" ")[1];
                  }
                  // console.log(data)
                  that.serviceDuration = data.duration;
                  that.serviceName = data.serviceName;
                  that.serviceType = data.serviceType;
                  that.serviceStaffType = "护理员";
                  if (data.serviceType == 1) {
                    // console.log(that.serviceStaffData);
                    that.serviceCurrentType = 1;
                    if (hlryName != null) {
                      for (var i = 0; i < that.serviceStaffData.length; i++) {
                        if (that.serviceStaffData[i].fullname == hlryName) {
                          that.serviceCurrentStaff =
                            that.serviceStaffData[i].userId;
                        }
                      }
                    } else {
                      that.serviceCurrentStaff =
                        that.serviceStaffData[0].userId;
                    }

                    that.serviceStaffCurrentData = that.serviceStaffData;
                  } else if (data.serviceType == 2) {
                    that.serviceCurrentType = 2;
                    if (hlryName != null) {
                      for (var i = 0; i < that.serviceStaffData2.length; i++) {
                        if (that.serviceStaffData2[i].fullname == hlryName) {
                          that.serviceCurrentStaff =
                            that.serviceStaffData2[i].userId;
                        }
                      }
                    } else {
                      that.serviceCurrentStaff =
                        that.serviceStaffData2[0].userId;
                    }

                    that.serviceStaffCurrentData = that.serviceStaffData2;
                  }
                }
              }
            });
            var component = new MyComponent().$mount();
            var divData = schedulingTable1.find("tbody");
            //         remove() - 删除被选元素（及其子元素）
            // empty() - 从被选元素中删除子元素
            divData.remove();
            schedulingTable1.append(component.$el);
            // schedulingTable1.find("tbody").html(tableBody1);
          } else {
            var divData = schedulingTable1.find("tbody");
            divData.remove();
            schedulingTable1.append(
              "<tr><td colspan='10' style='text-align: center;'>暂无数据</td></tr>"
            );
          }
          if (serviceType2Count != 0) {
            var MyComponent2 = Vue.extend({
              template: tableBody2,
              data() {
                return {};
              },
              methods: {
                paiban(event) {
                  that.dialogVisible1 = true;
                  that.serviceCurrentStaffSearch='';
                  console.log(
                    event.srcElement.parentElement.childNodes[1].childNodes
                  );
                  var ht = event.target;
                  var dateString = event.target.getAttribute("name");
                  that.currentDate = dateString.split("_")[1];
                  // console.log('1111',that.currentDate);
                  var id = ht.getAttribute("name").split("_")[0];
                  var data;
                  for (var item of nursingServicePlanItemList2) {
                    if (id == item.id) {
                      data = item;
                    }
                  }

                  that.paibanData = data;
                  var hlryName = null;
                  if (event.target.textContent != "+") {
                    // that.hlsj = that.$moment('2017-01-02 '+event.target.textContent.split(' ')[0]+':00').format("HH:mm:ss");
                    that.hlsj = event.target.textContent.split(" ")[0];
                    hlryName = event.target.textContent.split(" ")[1];
                  }
                  // console.log(data)
                  that.serviceDuration = data.duration;
                  that.serviceName = data.serviceName;
                  that.serviceType = data.serviceType;
                  // console.log(event,ht.getAttribute('name').split('_')[0],ht.getAttribute('name').split('_')[1]);
                  that.serviceStaffType = "护士";
                  if (data.serviceType == 1) {
                    that.serviceCurrentType = 1;
                    if (hlryName != null) {
                      for (var i = 0; i < that.serviceStaffData.length; i++) {
                        if (that.serviceStaffData[i].fullname == hlryName) {
                          that.serviceCurrentStaff =
                            that.serviceStaffData[i].userId;
                        }
                      }
                    } else {
                      that.serviceCurrentStaff =
                        that.serviceStaffData[0].userId;
                    }

                    that.serviceStaffCurrentData = that.serviceStaffData;
                  } else if (data.serviceType == 2) {
                    that.serviceCurrentType = 2;
                    if (hlryName != null) {
                      for (var i = 0; i < that.serviceStaffData2.length; i++) {
                        if (that.serviceStaffData2[i].fullname == hlryName) {
                          that.serviceCurrentStaff =
                            that.serviceStaffData2[i].userId;
                        }
                      }
                    } else {
                      that.serviceCurrentStaff =
                        that.serviceStaffData2[0].userId;
                    }

                    that.serviceStaffCurrentData = that.serviceStaffData2;
                  }
                }
              }
            });
            var component2 = new MyComponent2().$mount();
            // 每次表格都先要清空
            var divData = schedulingTable2.find("tbody");
            divData.remove();

            schedulingTable2.append(component2.$el);
          } else {
            var divData = schedulingTable2.find("tbody");
            divData.remove();

            schedulingTable2.append(
              "<tr><td colspan='10' style='text-align: center;'>暂无数据</td></tr>"
            );
          }

          that.curOpt_ = 3;
          // 获取具体的值填写
          that.$options.methods.querySchedulingPlan(1, that);
          that.$options.methods.querySchedulingPlan(2, that);
        });
    },
    planDetail(planId, flag, that) {
      // alert(planId);
      if (flag == "yes") {
        that.dialogVisible2 = true;
        $("#base_info_display_btn").html("展开");
        // $("#base_info").prop("hidden", true);
        $("#base_info").css("display", 'none');
        $("#nursing_plan_display_btn").html("展开");
        // $("#nursing_plan").prop("hidden", true);
        $("#nursing_plan").css("display", 'none');
        // console.log(index,row);
        that.currentPlanID = planId;
        var planId = planId;
        that.curOpt_ = 3;
        that.curEditId_ = planId;
        // 每次详情的时候先为空？？？？
        (that.weekdayArray1 = []),
          (that.weekdayArray2 = []),
          (that.servicePlanItemIdType1Array = []),
          (that.servicePlanItemIdType2Array = []);
        // 与护理计划制定不同

        that
          .$axios({
            url: `${
              that.$store.state.globalRouter
            }/auth/nursing/nursing_service_org_service_mng/load_ins_user_by_plan_id?planId=${encodeURI(planId)}`,
            method: "get"
          })
          .then(res => {
            var result = res.data.data;
            var myModelTable = $("#modalFrom");
            var specialarray = ["不是", "五保户", "低保户", "困难户"];
            var handicarray = ["不是", "是"];
            var planStatusMap = {};
            planStatusMap[1] = "正常";
            planStatusMap[2] = "暂停";
            planStatusMap[3] = "终止";
            //表示当前已经点击到的日期
            var currentFirstDate1;
            var currentFirstDate2;

            myModelTable
              .find("input[name='userIdcard']")
              .attr("disabled", true);
            myModelTable
              .find("input[name='medicalInsuranceId']")
              .attr("disabled", true);
            myModelTable.find("button[name='findInsUserBtn']").hide();
            $("#addHomeServiceButton").hide();

            myModelTable.find("input[name='userIdcard']").val(result.idNo);
            myModelTable.find("input[name='userName']").val(result.fullName);
            //下面是简单的根据身份证号算下年龄和性别并赋上值，可以手动再改
            var date = new Date();
            var year = date.getFullYear();
            var birthday_year = parseInt(
              myModelTable
                .find("input[name='userIdcard']")
                .val()
                .substr(6, 4)
            );
            var userage = year - birthday_year;
            myModelTable.find("input[name='userAge']").val(userage);
            // alert(result.sex)
            if (result.sex == "M") {
              myModelTable
                .find("input[name='userSexM']")
                .prop("checked", "checked");
              myModelTable
                .find("input[name='userSexF']")
                .prop("checked", false);
            } else {
              myModelTable
                .find("input[name='userSexF']")
                .prop("checked", "checked");
              myModelTable
                .find("input[name='userSexM']")
                .prop("checked", false);
            }
            myModelTable.find("input[name='userSex']").val(result.sex);
            myModelTable
              .find("input[name='userAssessedLevel']")
              .val(result.assessedLevel);
            myModelTable
              .find("input[name='agentName']")
              .val(result.contactName);
            myModelTable
              .find("input[name='agentPhone']")
              .val(result.contactPhone);

            myModelTable
              .find("input[name='address']")
              .val(result.appointedAddress);
            myModelTable
              .find("input[name='medicalInsuranceId']")
              .val(result.medicalInsuranceId);
            myModelTable
              .find("input[name='planStartDate']")
              .val(result.planStartDate);
            myModelTable.find("input[name='endDate']").val(result.endDate);

            myModelTable
              .find("input[name='special']")
              .val(specialarray[result.special]);
            myModelTable
              .find("input[name='handicapped']")
              .val(handicarray[result.handicapped]);

            myModelTable
              .find("input[name='distributeOrgName']")
              .val(result.distributeOrgName);
            myModelTable
              .find("input[name='planStatus']")
              .val(planStatusMap[result.planStatus]);
            myModelTable
              .find("input[name='serviceInDate']")
              .val(result.serviceInDate);
            myModelTable.find("input[name='endInDate']").val(result.endDate);
            myModelTable.find("input[name='pauseDate']").val(result.pauseDate);

            myModelTable
              .find("input[name='serviceInDate']")
              .attr("disabled", true);
            // myModelTable.find("input[name='serviceInDate']").attr("onfocus", "");

            myModelTable.find("input[name='pauseDate']").attr("disabled", true);
            // myModelTable.find("input[name='pauseDate']").attr("onfocus", "");
            myModelTable.find("input[name='endDate']").attr("disabled", true);
            // myModelTable.find("input[name='endDate']").attr("onfocus", "");

            myModelTable.find("input[name='planId']").val(result.planId);

            var tableHTML = "";
            var serviceType1Count = 0;
            var serviceType2Count = 0;
            // var servicePlanItemIdType1Array = new Array();
            // var servicePlanItemIdType2Array = new Array();
            for (var i = 0; i < result.nursingServicePlanItemList.length; i++) {
              var nursingServicePlanItem = result.nursingServicePlanItemList[i];
              tableHTML += "<tr name='data_tr'>";
              if (nursingServicePlanItem.serviceType == "1") {
                tableHTML +=
                  "<td style='text-align:center;vertical-align: middle;'>基础护理</td>";
                serviceType1Count++;
                that.servicePlanItemIdType1Array.push(
                  nursingServicePlanItem.id
                );
              } else if (nursingServicePlanItem.serviceType == "2") {
                tableHTML +=
                  "<td style='text-align:center;vertical-align: middle;'>常用临床护理</td>";
                serviceType2Count++;
                that.servicePlanItemIdType2Array.push(
                  nursingServicePlanItem.id
                );
              }
              tableHTML +=
                "<td style='text-align:left;vertical-align: middle;'>" +
                nursingServicePlanItem.serviceName +
                "<input name='serviceId' type='hidden' value='" +
                nursingServicePlanItem.serviceId +
                "'/><input name='serviceName' type='hidden' value='" +
                nursingServicePlanItem.serviceName +
                "'/><input name='serviceType' type='hidden' value='" +
                nursingServicePlanItem.serviceType +
                "'/></td>";
              // 护理频次（实际）
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>";
              tableHTML +=
                "<input type='text' name='frequencyUnitLength' style='width:50px;position:relative;top:-1px;height:31px!important;' disabled value='" +
                nursingServicePlanItem.frequencyUnitLength +
                "'/>";
              tableHTML +=
                "<select name='frequencyUnit' disabled style='width:50px;position:relative;top:-1px;height:31px!important;'>";
              if (nursingServicePlanItem.frequencyUnit == 1) {
                tableHTML +=
                  "<option value='1' selected='selected'>日</option>";
                tableHTML += "<option value='2'>月</option>";
              }
              if (nursingServicePlanItem.frequencyUnit == 2) {
                tableHTML += "<option value='1'>日</option>";
                tableHTML +=
                  "<option value='2' selected='selected'>月</option>";
              }
              tableHTML += "</select>";
              tableHTML +=
                "<input type='text' name='frequency' style='width:50px;position:relative;top:-1px;height:31px!important;' disabled value='" +
                nursingServicePlanItem.frequency +
                "'/> 次";
              tableHTML += "</td>";
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>" +
                nursingServicePlanItem.duration +
                " 分</td>";
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'><input type='hidden' name='servicePrice' value='" +
                nursingServicePlanItem.servicePrice +
                "'>" +
                nursingServicePlanItem.servicePrice +
                "</td>";
              tableHTML += "</tr>";
            }
            //先清除下除了表头之外的数据
            $("#pagDetailModalTable tr:not(:first)").remove();
            $("#pagDetailModalTable").append(tableHTML);

            //护理计划详情
            if (null != tableHTML || tableHTML != "") {
              var otherHtml = "";
              otherHtml += "<tr name='data_tr_cost_stotal'>";
              otherHtml +=
                "<td style='text-align:center;vertical-align: middle;'>合计</td>";
              otherHtml +=
                "<td style='text-align:center;vertical-align: middle;'></td>";
              otherHtml +=
                "<td style='text-align:center;vertical-align: middle;'></td>";
              otherHtml +=
                "<td style='text-align:center;vertical-align: middle;'></td>";
              otherHtml +=
                "<td style='text-align:center;vertical-align: middle;' id='costTotal'>0.00(元/月)</td>";
              otherHtml += "</tr>";
              otherHtml += "<tr name='message'>";
              otherHtml +=
                "<td colspan='6' style='text-align: center'>说明：每月实际护理费用，按当月护理执行记录为准，护理项目30日1次的按遵医嘱执行，暂不合计费用</td>";
              otherHtml += "</tr>";
              $("#pagDetailModalTable").append(otherHtml);
            }
            that.$options.methods.costTotalSalveByDetail(that);

            myModelTable.find("div[name='SchedulingDiv']").show();
            var schedulingTable1 = myModelTable.find(
              "table[name='SchedulingTable1']"
            );
            var schedulingTable2 = myModelTable.find(
              "table[name='SchedulingTable2']"
            );
            that.$options.methods.setDate(
              that.$options.methods.addDate(new Date(), 0),
              "1",
              that
            );
            that.$options.methods.setDate(
              that.$options.methods.addDate(new Date(), 0),
              "2",
              that
            );
            var tableBody1 = "<tbody>";
            var tableBody2 = "<tbody>";
            var nursingServicePlanItemList1 = new Array();
            var nursingServicePlanItemList2 = new Array();
            for (
              var i2 = 0;
              i2 < result.nursingServicePlanItemList.length;
              i2++
            ) {
              var nursingServicePlanItem =
                result.nursingServicePlanItemList[i2];
              switch (nursingServicePlanItem.serviceType) {
                case 1:
                  nursingServicePlanItemList1.push(nursingServicePlanItem);
                  break;
                case 2:
                  nursingServicePlanItemList2.push(nursingServicePlanItem);
                  break;
                default:
                  break;
              }
            }
            console.log(that.weekdayArray1);
            for (var m1 = 0; m1 < nursingServicePlanItemList1.length; m1++) {
              var nursingServicePlanItem = nursingServicePlanItemList1[m1];
              tableBody1 += "<tr>";
              if (m1 == 0) {
                tableBody1 +=
                  "<td rowspan='" +
                  serviceType1Count +
                  "' style='vertical-align:middle'>基础护理</td>";
              }
              tableBody1 +=
                "<td>" +
                nursingServicePlanItem.serviceName +
                "<input type='hidden' name='serviceName' value='" +
                nursingServicePlanItem.serviceName +
                "'><input type='hidden' name='duration' value='" +
                nursingServicePlanItem.duration +
                "'><input type='hidden' name='serviceType' value='" +
                nursingServicePlanItem.serviceType +
                "'><input type='hidden' name='frequency' value='" +
                nursingServicePlanItem.frequency +
                "'></td>";
              tableBody1 +=
                "<td class='hlxm_pop' name='" +
                nursingServicePlanItem.id +
                "_ALL'>+</td>";
              for (var j = 0; j < 7; j++) {
                tableBody1 +=
                  "<td class='hlxm_pop' name='" +
                  nursingServicePlanItem.id +
                  "_" +
                  that.weekdayArray1[j] +
                  "'>+";
                tableBody1 += "</td>";
              }
              tableBody1 += "</tr>";
            }
            tableBody1 += "</tbody>";
            for (var m2 = 0; m2 < nursingServicePlanItemList2.length; m2++) {
              var nursingServicePlanItem = nursingServicePlanItemList2[m2];
              tableBody2 += "<tr>";
              if (m2 == 0) {
                tableBody2 +=
                  "<td rowspan='" +
                  serviceType2Count +
                  "' style='vertical-align:middle'>常用临床护理</td>";
              }
              tableBody2 +=
                "<td>" +
                nursingServicePlanItem.serviceName +
                "<input type='hidden' name='serviceName' value='" +
                nursingServicePlanItem.serviceName +
                "'><input type='hidden' name='duration' value='" +
                nursingServicePlanItem.duration +
                "'><input type='hidden' name='serviceType' value='" +
                nursingServicePlanItem.serviceType +
                "'><input type='hidden' name='frequency' value='" +
                nursingServicePlanItem.frequency +
                "'></td>";
              tableBody2 +=
                "<td class='hlxm_pop' name='" +
                nursingServicePlanItem.id +
                "_ALL'>+</td>";
              for (var j = 0; j < 7; j++) {
                tableBody2 +=
                  "<td class='hlxm_pop' name='" +
                  nursingServicePlanItem.id +
                  "_" +
                  that.weekdayArray2[j] +
                  "'>+";
                tableBody2 += "</td>";
              }
              tableBody2 += "</tr>";
            }
            tableBody2 += "</tbody>";
            if (serviceType1Count != 0) {
              var divData = schedulingTable1.find("tbody");
              divData.remove();
              schedulingTable1.append(tableBody1);
            } else {
              var divData = schedulingTable1.find("tbody");
              divData.remove();
              schedulingTable1.append(
                "<tr><td colspan='10' style='text-align: center;'>暂无数据</td></tr>"
              );
            }
            if (serviceType2Count != 0) {
              var divData = schedulingTable2.find("tbody");
              divData.remove();
              schedulingTable2.append(tableBody2);
            } else {
              var divData = schedulingTable2.find("tbody");
              divData.remove();
              schedulingTable2.append(
                "<tr><td colspan='10' style='text-align: center;'>暂无数据</td></tr>"
              );
            }

            that.$options.methods.querySchedulingPlan(1, that);
            that.$options.methods.querySchedulingPlan(2, that);

            $("#auditHomeServiceButton").show();
            $("#detailAudit").attr("style", "display:block;");
            $("#auditID").val(planId);

            myModelTable.find("button[name='copy-last-week1']").hide();
            myModelTable.find("button[name='copy-last-week2']").hide();

            // console.log('比较两个数组',this.servicePlanItemIdType1Array,this.servicePlanItemIdType2Array)
            // infoDisplayInitHide();
            // this.$options.methods.costTotalSalveByDetail(this);
          });
      } else {
        this.dialogVisible2 = true;
        // console.log(index,row);
        this.currentPlanID = planId;
        var planId = planId;
        this.curOpt_ = 3;
        this.curEditId_ = planId;
        // 每次详情的时候先为空？？？？
        (this.weekdayArray1 = []),
          (this.weekdayArray2 = []),
          (this.servicePlanItemIdType1Array = []),
          (this.servicePlanItemIdType2Array = []);
        // 与护理计划制定不同
        $("#base_info_display_btn").html("展开");
        // $("#base_info").prop("hidden", true);
        $("#base_info").css("display", 'none');
        $("#nursing_plan_display_btn").html("展开");
        // $("#nursing_plan").prop("hidden", true);
        $("#nursing_plan").css("display", 'none');

        this.$axios({
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_org_service_mng/load_ins_user_by_plan_id?planId=${encodeURI(planId)}`,
          method: "get"
        }).then(res => {
          var result = res.data.data;
          var myModelTable = $("#modalFrom");
          var specialarray = ["不是", "五保户", "低保户", "困难户"];
          var handicarray = ["不是", "是"];
          var planStatusMap = {};
          planStatusMap[1] = "正常";
          planStatusMap[2] = "暂停";
          planStatusMap[3] = "终止";
          //表示当前已经点击到的日期
          var currentFirstDate1;
          var currentFirstDate2;

          myModelTable.find("input[name='userIdcard']").attr("disabled", true);
          myModelTable
            .find("input[name='medicalInsuranceId']")
            .attr("disabled", true);
          myModelTable.find("button[name='findInsUserBtn']").hide();
          $("#addHomeServiceButton").hide();

          myModelTable.find("input[name='userIdcard']").val(result.idNo);
          myModelTable.find("input[name='userName']").val(result.fullName);
          //下面是简单的根据身份证号算下年龄和性别并赋上值，可以手动再改
          var date = new Date();
          var year = date.getFullYear();
          var birthday_year = parseInt(
            myModelTable
              .find("input[name='userIdcard']")
              .val()
              .substr(6, 4)
          );
          var userage = year - birthday_year;
          myModelTable.find("input[name='userAge']").val(userage);
          if (result.sex == "M") {
            myModelTable
              .find("input[name='userSexM']")
              .prop("checked", "checked");
            myModelTable.find("input[name='userSexF']").prop("checked", false);
          } else {
            myModelTable
              .find("input[name='userSexF']")
              .prop("checked", "checked");
            myModelTable.find("input[name='userSexM']").prop("checked", false);
          }
          myModelTable.find("input[name='userSex']").val(result.sex);
          myModelTable
            .find("input[name='userAssessedLevel']")
            .val(result.assessedLevel);
          myModelTable.find("input[name='agentName']").val(result.contactName);
          myModelTable
            .find("input[name='agentPhone']")
            .val(result.contactPhone);

          myModelTable
            .find("input[name='address']")
            .val(result.appointedAddress);
          myModelTable
            .find("input[name='medicalInsuranceId']")
            .val(result.medicalInsuranceId);
          myModelTable
            .find("input[name='planStartDate']")
            .val(result.planStartDate);
          myModelTable.find("input[name='endDate']").val(result.endDate);

          myModelTable
            .find("input[name='special']")
            .val(specialarray[result.special]);
          myModelTable
            .find("input[name='handicapped']")
            .val(handicarray[result.handicapped]);

          myModelTable
            .find("input[name='distributeOrgName']")
            .val(result.distributeOrgName);
          myModelTable
            .find("input[name='planStatus']")
            .val(planStatusMap[result.planStatus]);
          myModelTable
            .find("input[name='serviceInDate']")
            .val(result.serviceInDate);
          myModelTable.find("input[name='endInDate']").val(result.endDate);
          myModelTable.find("input[name='pauseDate']").val(result.pauseDate);

          myModelTable
            .find("input[name='serviceInDate']")
            .attr("disabled", true);
          // myModelTable.find("input[name='serviceInDate']").attr("onfocus", "");

          myModelTable.find("input[name='pauseDate']").attr("disabled", true);
          // myModelTable.find("input[name='pauseDate']").attr("onfocus", "");
          myModelTable.find("input[name='endDate']").attr("disabled", true);
          // myModelTable.find("input[name='endDate']").attr("onfocus", "");

          myModelTable.find("input[name='planId']").val(result.planId);

          var tableHTML = "";
          var serviceType1Count = 0;
          var serviceType2Count = 0;
          // var servicePlanItemIdType1Array = new Array();
          // var servicePlanItemIdType2Array = new Array();
          for (var i = 0; i < result.nursingServicePlanItemList.length; i++) {
            var nursingServicePlanItem = result.nursingServicePlanItemList[i];
            tableHTML += "<tr name='data_tr'>";
            if (nursingServicePlanItem.serviceType == "1") {
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>基础护理</td>";
              serviceType1Count++;
              this.servicePlanItemIdType1Array.push(nursingServicePlanItem.id);
            } else if (nursingServicePlanItem.serviceType == "2") {
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>常用临床护理</td>";
              serviceType2Count++;
              this.servicePlanItemIdType2Array.push(nursingServicePlanItem.id);
            }
            tableHTML +=
              "<td style='text-align:left;vertical-align: middle;'>" +
              nursingServicePlanItem.serviceName +
              "<input name='serviceId' type='hidden' value='" +
              nursingServicePlanItem.serviceId +
              "'/><input name='serviceName' type='hidden' value='" +
              nursingServicePlanItem.serviceName +
              "'/><input name='serviceType' type='hidden' value='" +
              nursingServicePlanItem.serviceType +
              "'/></td>";
            // 护理频次（实际）
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>";
            tableHTML +=
              "<input type='text' name='frequencyUnitLength' style='width:50px;position:relative;top:-1px;height:31px!important;' disabled value='" +
              nursingServicePlanItem.frequencyUnitLength +
              "'/>";
            tableHTML +=
              "<select name='frequencyUnit' disabled style='width:50px;position:relative;top:-1px;height:31px!important;'>";
            if (nursingServicePlanItem.frequencyUnit == 1) {
              tableHTML += "<option value='1' selected='selected'>日</option>";
              tableHTML += "<option value='2'>月</option>";
            }
            if (nursingServicePlanItem.frequencyUnit == 2) {
              tableHTML += "<option value='1'>日</option>";
              tableHTML += "<option value='2' selected='selected'>月</option>";
            }
            tableHTML += "</select>";
            tableHTML +=
              "<input type='text' name='frequency' style='width:50px;position:relative;top:-1px;height:31px!important;' disabled value='" +
              nursingServicePlanItem.frequency +
              "'/> 次";
            tableHTML += "</td>";
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>" +
              nursingServicePlanItem.duration +
              " 分</td>";
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'><input type='hidden' name='servicePrice' value='" +
              nursingServicePlanItem.servicePrice +
              "'>" +
              nursingServicePlanItem.servicePrice +
              "</td>";
            tableHTML += "</tr>";
          }
          //先清除下除了表头之外的数据
          $("#pagDetailModalTable tr:not(:first)").remove();
          $("#pagDetailModalTable").append(tableHTML);

          //护理计划详情
          if (null != tableHTML || tableHTML != "") {
            var otherHtml = "";
            otherHtml += "<tr name='data_tr_cost_stotal'>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'>合计</td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'></td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'></td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'></td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;' id='costTotal'>0.00(元/月)</td>";
            otherHtml += "</tr>";
            otherHtml += "<tr name='message'>";
            otherHtml +=
              "<td colspan='6' style='text-align: center'>说明：每月实际护理费用，按当月护理执行记录为准，护理项目30日1次的按遵医嘱执行，暂不合计费用</td>";
            otherHtml += "</tr>";
            $("#pagDetailModalTable").append(otherHtml);
          }
          this.$options.methods.costTotalSalveByDetail(this);

          myModelTable.find("div[name='SchedulingDiv']").show();
          var schedulingTable1 = myModelTable.find(
            "table[name='SchedulingTable1']"
          );
          var schedulingTable2 = myModelTable.find(
            "table[name='SchedulingTable2']"
          );
          this.$options.methods.setDate(
            this.$options.methods.addDate(new Date(), 0),
            "1",
            this
          );
          this.$options.methods.setDate(
            this.$options.methods.addDate(new Date(), 0),
            "2",
            this
          );
          var tableBody1 = "<tbody>";
          var tableBody2 = "<tbody>";
          var nursingServicePlanItemList1 = new Array();
          var nursingServicePlanItemList2 = new Array();
          for (
            var i2 = 0;
            i2 < result.nursingServicePlanItemList.length;
            i2++
          ) {
            var nursingServicePlanItem = result.nursingServicePlanItemList[i2];
            switch (nursingServicePlanItem.serviceType) {
              case 1:
                nursingServicePlanItemList1.push(nursingServicePlanItem);
                break;
              case 2:
                nursingServicePlanItemList2.push(nursingServicePlanItem);
                break;
              default:
                break;
            }
          }
          console.log(this.weekdayArray1);
          for (var m1 = 0; m1 < nursingServicePlanItemList1.length; m1++) {
            var nursingServicePlanItem = nursingServicePlanItemList1[m1];
            tableBody1 += "<tr>";
            if (m1 == 0) {
              tableBody1 +=
                "<td rowspan='" +
                serviceType1Count +
                "' style='vertical-align:middle'>基础护理</td>";
            }
            tableBody1 +=
              "<td>" +
              nursingServicePlanItem.serviceName +
              "<input type='hidden' name='serviceName' value='" +
              nursingServicePlanItem.serviceName +
              "'><input type='hidden' name='duration' value='" +
              nursingServicePlanItem.duration +
              "'><input type='hidden' name='serviceType' value='" +
              nursingServicePlanItem.serviceType +
              "'><input type='hidden' name='frequency' value='" +
              nursingServicePlanItem.frequency +
              "'></td>";
            tableBody1 +=
              "<td class='hlxm_pop' name='" +
              nursingServicePlanItem.id +
              "_ALL'>+</td>";
            for (var j = 0; j < 7; j++) {
              tableBody1 +=
                "<td class='hlxm_pop' name='" +
                nursingServicePlanItem.id +
                "_" +
                this.weekdayArray1[j] +
                "'>+";
              tableBody1 += "</td>";
            }
            tableBody1 += "</tr>";
          }
          tableBody1 += "</tbody>";
          for (var m2 = 0; m2 < nursingServicePlanItemList2.length; m2++) {
            var nursingServicePlanItem = nursingServicePlanItemList2[m2];
            tableBody2 += "<tr>";
            if (m2 == 0) {
              tableBody2 +=
                "<td rowspan='" +
                serviceType2Count +
                "' style='vertical-align:middle'>常用临床护理</td>";
            }
            tableBody2 +=
              "<td>" +
              nursingServicePlanItem.serviceName +
              "<input type='hidden' name='serviceName' value='" +
              nursingServicePlanItem.serviceName +
              "'><input type='hidden' name='duration' value='" +
              nursingServicePlanItem.duration +
              "'><input type='hidden' name='serviceType' value='" +
              nursingServicePlanItem.serviceType +
              "'><input type='hidden' name='frequency' value='" +
              nursingServicePlanItem.frequency +
              "'></td>";
            tableBody2 +=
              "<td class='hlxm_pop' name='" +
              nursingServicePlanItem.id +
              "_ALL'>+</td>";
            for (var j = 0; j < 7; j++) {
              tableBody2 +=
                "<td class='hlxm_pop' name='" +
                nursingServicePlanItem.id +
                "_" +
                this.weekdayArray2[j] +
                "'>+";
              tableBody2 += "</td>";
            }
            tableBody2 += "</tr>";
          }
          tableBody2 += "</tbody>";
          if (serviceType1Count != 0) {
            var divData = schedulingTable1.find("tbody");
            divData.remove();
            schedulingTable1.append(tableBody1);
          } else {
            var divData = schedulingTable1.find("tbody");
            divData.remove();
            schedulingTable1.append(
              "<tr><td colspan='10' style='text-align: center;'>暂无数据</td></tr>"
            );
          }
          if (serviceType2Count != 0) {
            var divData = schedulingTable2.find("tbody");
            divData.remove();
            schedulingTable2.append(tableBody2);
          } else {
            var divData = schedulingTable2.find("tbody");
            divData.remove();
            schedulingTable2.append(
              "<tr><td colspan='10' style='text-align: center;'>暂无数据</td></tr>"
            );
          }

          this.$options.methods.querySchedulingPlan(1, this);
          this.$options.methods.querySchedulingPlan(2, this);

          if (flag == "yes") {
            $("#auditHomeServiceButton").show();
            $("#detailAudit").attr("style", "display:block;");
            $("#auditID").val(planId);
          }
          if (flag == "no") {
            $("#auditHomeServiceButton").hide();
            $("#detailAudit").attr("style", "display:none;");
          }

          myModelTable.find("button[name='copy-last-week1']").hide();
          myModelTable.find("button[name='copy-last-week2']").hide();

          // console.log('比较两个数组',this.servicePlanItemIdType1Array,this.servicePlanItemIdType2Array)
          // infoDisplayInitHide();
          // this.$options.methods.costTotalSalveByDetail(this);
        });
      }
    },

    lastweek1() {
      var date = this.$moment(this.weekdayArray1[0]).subtract(7, "days");
      date = this.$moment(date).format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "1", this);

      this.$options.methods.querySchedulingPlan(1, this);
      // console.log('上一周',this.servicePlanItemIdType1Array,this.weekdayArray1)
    },
    nextweek1() {
      var date = this.$moment(this.weekdayArray1[0]).add(7, "days");
      date = this.$moment(date).format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "1", this);
      this.$options.methods.querySchedulingPlan(1, this);
      // console.log('上一周',this.servicePlanItemIdType1Array,this.weekdayArray1)
    },
    lastweek2() {
      var date = this.$moment(this.weekdayArray2[0]).subtract(7, "days");
      date = this.$moment(date).format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "2", this);

      this.$options.methods.querySchedulingPlan(2, this);
      // console.log('上一周',this.servicePlanItemIdType1Array,this.weekdayArray1)
    },
    nextweek2() {
      var date = this.$moment(this.weekdayArray2[0]).add(7, "days");
      date = this.$moment(date).format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "2", this);
      this.$options.methods.querySchedulingPlan(2, this);
      // console.log('上一周',this.servicePlanItemIdType1Array,this.weekdayArray1)
    },
    copyLastWeek1() {
      var planId = "";
      var myModelTable = $("#modalFrom");
      // console.log('planID',this.curOpt_,myModelTable.find("input[name='planId']").val());
      if (this.curOpt_ == 1) {
        // alert("1");
        planId = myModelTable.find("input[name='planId']").val();
      } else if (this.curOpt_ == 3) {
        planId = this.curEditId_;
      }
      // console.log(planId,this.weekdayArray1, this.servicePlanItemIdType1Array);
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_org_service_mng/copy_last_week_scheduling_plan?planId=${encodeURI(planId)}&servicePlanItemIdArray=${
          encodeURI(this.servicePlanItemIdType1Array)
        }&weekdayArray=${encodeURI(this.weekdayArray1)}`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          alert("同步排班成功");
          this.$options.methods.querySchedulingPlan(1, this);
        } else {
          alert("同步排班失败  " + res.data.resultMsg);
        }
      });
    },
    thisweek1() {
      var date = this.$moment().format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "1", this);
      this.$options.methods.querySchedulingPlan(1, this);
    },
    thisweek2() {
      var date = this.$moment().format("YYYY-MM-DD");
      this.$options.methods.setDate(date, "2", this);
      this.$options.methods.querySchedulingPlan(2, this);
    },
    copyLastWeek2() {
      // console.log(this.weekdayArray2, this.servicePlanItemIdType2Array);
      var planId = "";
      var myModelTable = $("#modalFrom");
      // console.log('planID',this.curOpt_,myModelTable.find("input[name='planId']").val());
      if (this.curOpt_ == 1) {
        // alert("1");
        planId = myModelTable.find("input[name='planId']").val();
      } else if (this.curOpt_ == 3) {
        planId = this.curEditId_;
      }

      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_org_service_mng/copy_last_week_scheduling_plan?planId=${encodeURI(planId)}&servicePlanItemIdArray=${
          encodeURI(this.servicePlanItemIdType2Array)
        }&weekdayArray=${encodeURI(this.weekdayArray2)}`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          alert("同步排班成功");
          this.$options.methods.querySchedulingPlan(2, this);
        } else {
          alert("同步排班失败  " + res.data.resultMsg);
        }
      });
    },

    querySchedulingPlan(serviceType, that) {
      // console.log(that.curOpt_,that.curEditId_);
      var myModelTable = $("#modalFrom");
      var planId = "";
      if (that.curOpt_ == 1) {
        if (myModelTable.find("input[name='planId']").val() == "") {
          alert("护理计划ID为空！");
        } else {
          planId = myModelTable.find("input[name='planId']").val();
        }
      } else if (that.curOpt_ == 3) {
        if (that.curEditId_ == "") {
          alert("护理计划ID为空！");
          return false;
        } else {
          planId = that.curEditId_;
        }
      }

      var servicePlanItemIdArrayTemp;
      var weekdayArrayTemp;
      if (serviceType == 1) {
        servicePlanItemIdArrayTemp = that.servicePlanItemIdType1Array;
        weekdayArrayTemp = that.weekdayArray1;
      } else if (serviceType == 2) {
        servicePlanItemIdArrayTemp = that.servicePlanItemIdType2Array;
        weekdayArrayTemp = that.weekdayArray2;
      } else {
        alert("护理类型不正确，查询护理计划失败");
      }

      // 如果数组为空，就不发送请求，
      // 为什么一直为空，第二个数组
      if (servicePlanItemIdArrayTemp == "") {
        return false;
      }

      myModelTable.find("button[name='last-week1']").attr("disabled", true);
      myModelTable.find("button[name='this-week1']").attr("disabled", true);
      myModelTable.find("button[name='next-week1']").attr("disabled", true);
      myModelTable
        .find("button[name='copy-last-week1']")
        .attr("disabled", true);
      myModelTable.find("button[name='last-week2']").attr("disabled", true);
      myModelTable.find("button[name='this-week2']").attr("disabled", true);
      myModelTable.find("button[name='next-week2']").attr("disabled", true);
      myModelTable
        .find("button[name='copy-last-week2']")
        .attr("disabled", true);
      // console.log('111',planId,servicePlanItemIdArrayTemp,weekdayArrayTemp);

      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_home_service_mng/query_scheduling_plan?planId=${encodeURI(planId)}&servicePlanItemIdArray=${encodeURI(servicePlanItemIdArrayTemp)}&weekdayArray=${encodeURI(weekdayArrayTemp)}`,
          method: "get"
        })
        .then(res => {
          // console.log(res)
          var result = res.data;
          console.log(result);
          // console.log(res.data.data);
          if (result.resultCode == "000000") {
            for (var i = 0; i < result.data.length; i++) {
              var object = result.data[i];
              // 此处赋不上值，因为盒子的id不同
              // myModelTable.find("div[name='SchedulingDiv']").find("td[name='5020191_2019-01-21']").html('333');
              $.each(object.schedulingString, function(key, values) {
                var targetTd = myModelTable
                  .find("div[name='SchedulingDiv']")
                  .find("td[name='" + key + "']");

                if (values != "+") {
                  targetTd.html(values);
                } else {
                  targetTd.html(values);
                }
              });
            }
            that.$options.methods.buttonOpen();
          } else {
            alert("调用失败，错误信息：" + result.errorMsg);
            that.$options.methods.buttonOpen();
          }
        });
      // $.getJSON(curUrl+"?act=querySchedulingPlan&planId="+planId+"&servicePlanItemIdArray="+servicePlanItemIdArrayTemp+"&weekdayArray="+weekdayArrayTemp,function cb(result) {
      // if(result.errorCode == 0){
      // 	for(var i = 0; i < result.paramObj.length; i++) {
      // 		var object = result.paramObj[i];
      // 		$.each(object.schedulingString,function(key,values){
      // 			var targetTd = myModelTable.find("div[name='SchedulingDiv']").find("td[name='"+key+"']");
      // 			if(values != "+"){
      // 				targetTd.html(values);
      // 			} else {
      // 				targetTd.html(values);
      // 			}
      // 		});
      // 	}
      // 	buttonOpen();
      // } else {
      // 	alert("调用失败，错误信息：" + result.errorMsg);
      // 	buttonOpen();
      // }
      // });
    },
    buttonClose() {
      var myModelTable = $("#modalFrom");
      myModelTable.find("button[name='last-week1']").attr("disabled", true);
      myModelTable.find("button[name='this-week1']").attr("disabled", true);
      myModelTable.find("button[name='next-week1']").attr("disabled", true);
      myModelTable
        .find("button[name='copy-last-week1']")
        .attr("disabled", true);
      myModelTable.find("button[name='last-week2']").attr("disabled", true);
      myModelTable.find("button[name='this-week2']").attr("disabled", true);
      myModelTable.find("button[name='next-week2']").attr("disabled", true);
      myModelTable
        .find("button[name='copy-last-week2']")
        .attr("disabled", true);
    },
    buttonOpen() {
      var myModelTable = $("#modalFrom");
      myModelTable.find("button[name='last-week1']").attr("disabled", false);
      myModelTable.find("button[name='this-week1']").attr("disabled", false);
      myModelTable.find("button[name='next-week1']").attr("disabled", false);
      myModelTable
        .find("button[name='copy-last-week1']")
        .attr("disabled", false);
      myModelTable.find("button[name='last-week2']").attr("disabled", false);
      myModelTable.find("button[name='this-week2']").attr("disabled", false);
      myModelTable.find("button[name='next-week2']").attr("disabled", false);
      myModelTable
        .find("button[name='copy-last-week2']")
        .attr("disabled", false);
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
      var cells = myModelTable
        .find("table[name='SchedulingTable" + tableNo + "']")
        .find("tr[name='weekTr']")
        .find("th[name='weekday']");

      //循环为单元格进行赋值
      for (var i = 0; i < cells.length; i++) {
        var oldTd = myModelTable
          .find("table[name='SchedulingTable" + tableNo + "']")
          .find("td[name*='" + oldWeekdayArray[i] + "']");
        // cells[i].innerHTML = that.$options.methods.formDate(i==0 ? date : date.setDate(date.getDate()+1),that);
        cells[i].innerHTML = that.$options.methods.formDate(
          i == 0 ? date : that.$moment(date).add(i, "days"),
          that
        );
        switch (tableNo) {
          case "1":
            that.weekdayArray1.push(cells[i].innerHTML);
            break;
          case "2":
            that.weekdayArray2.push(cells[i].innerHTML);
            break;
          default:
            alert("护理类型错误，设置日期失败");
            return false;
            break;
        }
        oldTd.each(function() {
          $(this).attr(
            "name",
            $(this)
              .attr("name")
              .split("_")[0] +
              "_" +
              cells[i].innerHTML
          );
        });
      }
    },
    costTotalSalveByDetail(that) {
      var conditons = [];
      $("#pagDetailModalTable")
        .find("tr[name='data_tr']")
        .each(function() {
          var nursingServicePlanItem = new Object();
          nursingServicePlanItem.serviceType = $(this)
            .find("input[name='serviceType']")
            .val();
          nursingServicePlanItem.serviceId = $(this)
            .find("input[name='serviceId']")
            .val();
          nursingServicePlanItem.serviceName = $(this)
            .find("input[name='serviceName']")
            .val();
          nursingServicePlanItem.servicePrice = $(this)
            .find("input[name='servicePrice']")
            .val();
          nursingServicePlanItem.frequencyUnitLength = $(this)
            .find("input[name='frequencyUnitLength']")
            .val();
          nursingServicePlanItem.frequencyUnit = $(this)
            .find("select[name='frequencyUnit']")
            .val();
          nursingServicePlanItem.frequency = $(this)
            .find("input[name='frequency']")
            .val();
          nursingServicePlanItem.duration = $(this)
            .find("input[name='duration']")
            .val();
          conditons.push(nursingServicePlanItem);
        });
      // console.log("conditions", conditons);
      if (conditons.length > 0) {
        // console.log(conditons)
        setTimeout(() => {
          $.ajax({
            type: "POST",
            url: `${
              that.$store.state.globalRouter
            }/auth/nursing/nursing_service_plan_base_mng/cost_total`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(conditons),
            dataType: "json",
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: function(res) {
              if (res.resultCode == "000000") {
                document.getElementById("costTotal").innerHTML = res.data;
              } else {
                alert("请求失败，服务出错！");
              }
            },
            error: function() {
              tip("请求失败，服务出错！");
            }
          });
          // that
          //   .$axios({
          //     url: `${
          //       that.$store.state.globalRouter
          //     }/auth/nursing/nursing_service_plan_base_mng/cost_total`,
          //     method: "get",
          //     params: {
          //       conditions: JSON.stringify(conditons)
          //     }
          //   })
          //   .then(res => {
          //     document.getElementById("costTotal").innerHTML = res.data.data;
          //   });
        }, 1000);
      }
    },

    clearModelTable() {
      //  居家护理的清除框
      var myModelTable = $("#modalFrom");
      var specialarray = ["不是", "五保户", "低保户", "困难户"];
      var handicarray = ["不是", "是"];
      //表示当前已经点击到的日期
      var currentFirstDate1;
      var currentFirstDate2;
      myModelTable.find("input[name='planId']").val("");
      myModelTable.find("input[name='userIdcard']").val("");
      myModelTable.find("input[name='userName']").val("");
      myModelTable.find("input[name='userAge']").val("");
      myModelTable.find("input[name='userSexM']").prop("checked", false);
      myModelTable.find("input[name='userSexF']").prop("checked", false);
      myModelTable.find("input[name='userAssessedLevel']").val("");
      myModelTable.find("input[name='agentName']").val("");
      myModelTable.find("input[name='agentPhone']").val("");
      myModelTable.find("input[name='address']").val("");
      myModelTable.find("input[name='medicalInsuranceId']").val("");
      // $("#addHomeServiceButton").css("background", "#b6c2c9");
      $("#addHomeServiceButton").attr("disabled", true);
      $("#pagDetailModalTable tr:not(:first)").remove();
      myModelTable.find("div[name='SchedulingDiv']").hide();
      $("#detailAudit").attr("style", "display:none;");

      myModelTable.find("input[name='distributeOrgName']").val("");
      myModelTable.find("input[name='planStatus']").val("");
      myModelTable.find("input[name='serviceInDate']").val("");
      myModelTable.find("input[name='serviceInDate']").attr("disabled", true);
      // myModelTable.find("input[name='serviceInDate']").attr("onfocus", "");

      myModelTable.find("input[name='pauseDate']").val("");
      myModelTable.find("input[name='pauseDate']").attr("disabled", true);
      // myModelTable.find("input[name='pauseDate']").attr("onfocus", "");
      myModelTable.find("input[name='endDate']").val("");
      myModelTable.find("input[name='endDate']").attr("disabled", true);
      // myModelTable.find("input[name='endDate']").attr("onfocus", "");
    },
    findInsUser(caseNo, that) {
      var myModelTable = $("#modalFrom");
      var specialarray = ["不是", "五保户", "低保户", "困难户"];
      var handicarray = ["不是", "是"];
      this.curOpt_ = 1;
      // $("#addHomeServiceButton").css("background", "#b6c2c9");
      $("#addHomeServiceButton").attr("disabled", true);

      var idcardOrMedicalNo = "";
      switch (caseNo) {
        case 1:
          if (myModelTable.find("input[name='userIdcard']").val() == "") {
            that.$options.methods.clearModelTable();
            return false;
          }
          idcardOrMedicalNo = myModelTable
            .find("input[name='userIdcard']")
            .val();
          break;
        case 2:
          if (
            myModelTable.find("input[name='medicalInsuranceId']").val() == ""
          ) {
            that.$options.methods.clearModelTable();
            return false;
          }
          idcardOrMedicalNo = myModelTable
            .find("input[name='medicalInsuranceId']")
            .val();
          break;
        default:
          break;
      }
      // curUrl+"?act=loadInsUserByIdcardOrMedicalNo&idcardOrMedicalNo="+idcardOrMedicalNo+"&caseNo="+caseNo
      this.$axios({
        // url: `${this.$store.state.globalRouter}/auth/nursing/nursing_service_plan_base_mng/load_ins_user_by_idCard?idCard=${idCard}`,
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_org_service_mng/load_ins_user_by_idcard_or_medical_no?idcardOrMedicalNo=${encodeURI(idcardOrMedicalNo)}&caseNo=${encodeURI(caseNo)}`,
        method: "get"
      }).then(res => {
        var result = res.data.data;
        this.startDate = result.planStartDate;

        if (result.idNo == null) {
          $("#userAge").focus();
          alert(
            "无身份证号为：" +
              myModelTable.find("input[name='userIdcard']").val() +
              "的参保人记录信息"
          );
          this.$options.methods.clearModelTable();
        } else if (
          res.data.resultCode == "9999999" &&
          res.data.resultMsg != "护理计划已被接收"
        ) {
          $("#userAge").focus();
          alert(
            "身份证号为：" +
              myModelTable.find("input[name='userIdcard']").val() +
              "的护理计划尚未被机构接收"
          );
          this.$options.methods.clearModelTable();
        }
        // else if(res.data.resultCode == '9999999' && res.data.resultMsg=='护理计划已被接收'){
        //      $("#userAge").focus();
        //     alert(
        //       "身份证号为：" +
        //         myModelTable.find("input[name='userIdcard']").val() +
        //         "的护理计划已被机构接收"
        //     );
        //     this.$options.methods.clearModelTable();
        // }
        // else if (res.data.resultCode == 400607 || result.assessedLevel == '400607') {
        //     $("#userAge").focus();
        //     alert(res.data.resultMsg);
        //     this.$options.methods.clearModelTable();
        //   }
        else if (result.bedStatus == 1) {
          $("#userAge").focus();
          alert(
            "身份证号为：" +
              myModelTable.find("input[name='userIdcard']").val() +
              "的参保人已分配过床位，无法再次分配"
          );
          this.$options.methods.clearModelTable();
        } else if (result.assessedLevel == null) {
          $("#userAge").focus();
          alert(
            "身份证号为：" +
              myModelTable.find("input[name='userIdcard']").val() +
              "的参保人评估等级尚未完成"
          );
          this.$options.methods.clearModelTable();
        }
        // else if (result.assessedLevel == null) {
        //   $("#userAge").focus();
        //   alert('该护理计划尚未被机构接收')
        //   this.$options.methods.clearModelTable();
        // }
        else if (result.assessedLevel == 0) {
          $("#userAge").focus();
          alert(
            "身份证号为：" +
              myModelTable.find("input[name='userIdcard']").val() +
              "的参保人评估等级为0级，无法新增护理计划"
          );
          this.$options.methods.clearModelTable();
        } else if (result.distributeStatus != 2) {
          $("#userAge").focus();
          alert(
            "身份证号为：" +
              myModelTable.find("input[name='userIdcard']").val() +
              "的护理计划尚未被机构接收"
          );
          this.$options.methods.clearModelTable();
        } else {
          myModelTable.find("input[name='planId']").val(result.planId);

          // this.currentPlanID = result.planId;
          // var           myModelTable  = $("#modalFrom");
          // var           specialarray  = ["不是", "五保户", "低保户", "困难户"];
          // var           handicarray   = ["不是", "是"];
          var planStatusMap = {};
          planStatusMap[1] = "正常";
          planStatusMap[2] = "暂停";
          planStatusMap[3] = "终止";
          //表示当前已经点击到的日期
          var currentFirstDate1;
          var currentFirstDate2;

          myModelTable.find("button[name='copy-last-week1']").show();
          myModelTable.find("button[name='copy-last-week2']").show();

          $("#auditHomeServiceButton").hide();
          //  $("#auditHomeServiceButton").hide();
          $("#addHomeServiceButton").show();
          $("#addHomeServiceButton").attr("disabled", false);

          // $("#addHomeServiceButton").css("background", "#7BB6EC");

          // myModelTable
          //   .find("input[name='userIdcard']")
          //   .attr("disabled", true);
          // myModelTable
          //   .find("input[name='medicalInsuranceId']")
          //   .attr("disabled", true);
          // myModelTable.find("button[name='findInsUserBtn']").hide();
          // $('#addHomeServiceButton').hide();
          this.userName = result.fullName;
          myModelTable.find("input[name='userIdcard']").val(result.idNo);
          myModelTable.find("input[name='userName']").val(result.fullName);
          //下面是简单的根据身份证号算下年龄和性别并赋上值，可以手动再改
          var date = new Date();
          var year = date.getFullYear();
          var birthday_year = parseInt(
            myModelTable
              .find("input[name='userIdcard']")
              .val()
              .substr(6, 4)
          );
          var userage = year - birthday_year;
          myModelTable.find("input[name='userAge']").val(userage);
          if (result.sex == "M") {
            myModelTable
              .find("input[name='userSexM']")
              .prop("checked", "checked");
            myModelTable.find("input[name='userSexF']").prop("checked", false);
          } else {
            myModelTable
              .find("input[name='userSexF']")
              .prop("checked", "checked");
            myModelTable.find("input[name='userSexM']").prop("checked", false);
          }
          myModelTable.find("input[name='userSex']").val(result.sex);
          myModelTable
            .find("input[name='userAssessedLevel']")
            .val(result.assessedLevel);
          myModelTable.find("input[name='agentName']").val(result.contactName);
          myModelTable
            .find("input[name='agentPhone']")
            .val(result.contactPhone);

          myModelTable
            .find("input[name='address']")
            .val(result.appointedAddress);
          myModelTable
            .find("input[name='medicalInsuranceId']")
            .val(result.medicalInsuranceId);
          myModelTable
            .find("input[name='planStartDate']")
            .val(result.planStartDate);
          // 时间限制
          window.localStorage.setItem(
            "sjxz1",
            this.$moment(result.planStartDate, "YYYY-MM-DD").valueOf()
          );
          myModelTable.find("input[name='endDate']").val(result.endDate);

          myModelTable
            .find("input[name='special']")
            .val(specialarray[result.special]);
          myModelTable
            .find("input[name='handicapped']")
            .val(handicarray[result.handicapped]);

          myModelTable
            .find("input[name='distributeOrgName']")
            .val(result.distributeOrgName);
          myModelTable
            .find("input[name='planStatus']")
            .val(planStatusMap[result.planStatus]);
          // myModelTable
          //   .find("input[name='serviceInDate']")
          //   .val(result.serviceInDate);
          $("#serviceInDate").val(result.serviceInDate);
          $("#serviceInDate").attr("disabled", false);
          myModelTable.find("input[name='endInDate']").val(result.endDate);
          myModelTable.find("input[name='pauseDate']").val(result.pauseDate);

          myModelTable.find("input[name='pauseDate']").attr("disabled", true);
          // myModelTable.find("input[name='pauseDate']").attr("onfocus", "");
          myModelTable.find("input[name='endDate']").attr("disabled", true);
          // myModelTable.find("input[name='endDate']").attr("onfocus", "");

          myModelTable.find("input[name='planId']").val(result.planId);

          var tableHTML = "";
          var serviceType1Count = 0;
          var serviceType2Count = 0;
          // var servicePlanItemIdType1Array = new Array();
          // var servicePlanItemIdType2Array = new Array();

          for (var i = 0; i < result.nursingServicePlanItemList.length; i++) {
            var nursingServicePlanItem = result.nursingServicePlanItemList[i];
            tableHTML += "<tr name='data_tr'>";
            if (nursingServicePlanItem.serviceType == "1") {
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>基础护理</td>";
              serviceType1Count++;
              this.servicePlanItemIdType1Array.push(nursingServicePlanItem.id);
            } else if (nursingServicePlanItem.serviceType == "2") {
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>常用临床护理</td>";
              serviceType2Count++;
              this.servicePlanItemIdType2Array.push(nursingServicePlanItem.id);
            }
            tableHTML +=
              "<td style='text-align:left;vertical-align: middle;'>" +
              nursingServicePlanItem.serviceName +
              "<input name='serviceId' type='hidden' value='" +
              nursingServicePlanItem.serviceId +
              "'/><input name='serviceName' type='hidden' value='" +
              nursingServicePlanItem.serviceName +
              "'/><input name='serviceType' type='hidden' value='" +
              nursingServicePlanItem.serviceType +
              "'/></td>";
            // 护理频次（实际）
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>";
            tableHTML +=
              "<input type='text' name='frequencyUnitLength' style='width:50px;position:relative;top:-1px;height:31px!important;' disabled value='" +
              nursingServicePlanItem.frequencyUnitLength +
              "'/>";
            tableHTML +=
              "<select name='frequencyUnit' disabled style='width:50px;position:relative;top:-1px;height:31px!important;'>";
            if (nursingServicePlanItem.frequencyUnit == 1) {
              tableHTML += "<option value='1' selected='selected'>日</option>";
              tableHTML += "<option value='2'>月</option>";
            }
            if (nursingServicePlanItem.frequencyUnit == 2) {
              tableHTML += "<option value='1'>日</option>";
              tableHTML += "<option value='2' selected='selected'>月</option>";
            }
            tableHTML += "</select>";
            tableHTML +=
              "<input type='text' name='frequency' style='width:50px;position:relative;top:-1px;height:31px!important;' disabled value='" +
              nursingServicePlanItem.frequency +
              "'/> 次";
            tableHTML += "</td>";
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>" +
              nursingServicePlanItem.duration +
              " 分</td>";
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'><input type='hidden' name='servicePrice' value='" +
              nursingServicePlanItem.servicePrice +
              "'>" +
              nursingServicePlanItem.servicePrice +
              "</td>";
            tableHTML += "</tr>";
          }
          //先清除下除了表头之外的数据
          $("#pagDetailModalTable tr:not(:first)").remove();
          $("#pagDetailModalTable").append(tableHTML);

          //护理计划详情
          if (null != tableHTML || tableHTML != "") {
            var otherHtml = "";
            otherHtml += "<tr name='data_tr_cost_stotal'>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'>合计</td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'></td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'></td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'></td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;' id='costTotal'>0.00(元/月)</td>";
            otherHtml += "</tr>";
            otherHtml += "<tr name='message'>";
            otherHtml +=
              "<td colspan='6' style='text-align: center'>说明：每月实际护理费用，按当月护理执行记录为准，护理项目30日1次的按遵医嘱执行，暂不合计费用</td>";
            otherHtml += "</tr>";
            $("#pagDetailModalTable").append(otherHtml);
          }
          this.$options.methods.costTotalSalveByDetail(this);


          myModelTable.find("div[name='SchedulingDiv']").show();
          var schedulingTable1 = myModelTable.find(
            "table[name='SchedulingTable1']"
          );
          var schedulingTable2 = myModelTable.find(
            "table[name='SchedulingTable2']"
          );
          this.$options.methods.setDate(
            this.$options.methods.addDate(new Date(), 0),
            "1",
            this
          );
          this.$options.methods.setDate(
            this.$options.methods.addDate(new Date(), 0),
            "2",
            this
          );
          var tableBody1 = "<tbody>";
          var tableBody2 = "<tbody>";
          var nursingServicePlanItemList1 = new Array();
          var nursingServicePlanItemList2 = new Array();
          for (
            var i2 = 0;
            i2 < result.nursingServicePlanItemList.length;
            i2++
          ) {
            var nursingServicePlanItem = result.nursingServicePlanItemList[i2];
            switch (nursingServicePlanItem.serviceType) {
              case 1:
                nursingServicePlanItemList1.push(nursingServicePlanItem);
                break;
              case 2:
                nursingServicePlanItemList2.push(nursingServicePlanItem);
                break;
              default:
                break;
            }
          }
          // console.log(that.weekdayArray1);
          //  具体的内部填值是在获取的列表里面的
          for (var m1 = 0; m1 < nursingServicePlanItemList1.length; m1++) {
            var nursingServicePlanItem = nursingServicePlanItemList1[m1];
            tableBody1 += "<tr>";
            if (m1 == 0) {
              tableBody1 +=
                "<td rowspan='" +
                serviceType1Count +
                "' style='vertical-align:middle'>基础护理</td>";
            }
            tableBody1 +=
              "<td>" +
              nursingServicePlanItem.serviceName +
              "<input type='hidden' name='serviceName' value='" +
              nursingServicePlanItem.serviceName +
              "'><input type='hidden' name='duration' value='" +
              nursingServicePlanItem.duration +
              "'><input type='hidden' name='serviceType' value='" +
              nursingServicePlanItem.serviceType +
              "'><input type='hidden' name='frequency' value='" +
              nursingServicePlanItem.frequency +
              "'></td>";
            tableBody1 += `<td class='hlxm_pop' name='${
              nursingServicePlanItem.id
            }_ALL' @click='paiban'>+</td>`;
            for (var j = 0; j < 7; j++) {
              tableBody1 += `<td class='hlxm_pop' name='${
                nursingServicePlanItem.id
              }_${this.weekdayArray1[j]}' @click='paiban'>+`;
              tableBody1 += "</td>";
            }
            tableBody1 += "</tr>";
          }
          tableBody1 += "</tbody>";
          for (var m2 = 0; m2 < nursingServicePlanItemList2.length; m2++) {
            var nursingServicePlanItem = nursingServicePlanItemList2[m2];
            tableBody2 += "<tr>";
            if (m2 == 0) {
              tableBody2 +=
                "<td rowspan='" +
                serviceType2Count +
                "' style='vertical-align:middle'>常用临床护理</td>";
            }
            tableBody2 +=
              "<td>" +
              nursingServicePlanItem.serviceName +
              "<input type='hidden' name='serviceName' value='" +
              nursingServicePlanItem.serviceName +
              "'><input type='hidden' name='duration' value='" +
              nursingServicePlanItem.duration +
              "'><input type='hidden' name='serviceType' value='" +
              nursingServicePlanItem.serviceType +
              "'><input type='hidden' name='frequency' value='" +
              nursingServicePlanItem.frequency +
              "'></td>";
            tableBody2 += `<td class='hlxm_pop' name='${
              nursingServicePlanItem.id
            }_ALL' @click='paiban'>+</td>`;
            for (var j = 0; j < 7; j++) {
              tableBody2 += `<td class='hlxm_pop' name='${
                nursingServicePlanItem.id
              }_${this.weekdayArray2[j]}' @click='paiban'>+`;
              tableBody2 += "</td>";
            }
            tableBody2 += "</tr>";
          }

          tableBody2 += "</tbody>";
          var that = this;
          if (serviceType1Count != 0) {
            var MyComponent = Vue.extend({
              template: tableBody1,
              data() {
                return {};
              },
              methods: {
                paiban(event) {
                  that.dialogVisible1 = true;
                  that.serviceCurrentStaffSearch='';
                  console.log(
                    event.srcElement.parentElement.childNodes[1].childNodes
                  );
                  var ht = event.target;
                  var dateString = event.target.getAttribute("name");
                  that.currentDate = dateString.split("_")[1];
                  // console.log('1111',that.currentDate);
                  var id = ht.getAttribute("name").split("_")[0];
                  var data;
                  for (var item of nursingServicePlanItemList1) {
                    if (id == item.id) {
                      data = item;
                    }
                  }

                  that.paibanData = data;
                  var hlryName = null;
                  if (event.target.textContent != "+") {
                    // that.hlsj = that.$moment('2017-01-02 '+event.target.textContent.split(' ')[0]+':00').format("HH:mm:ss");
                    that.hlsj = event.target.textContent.split(" ")[0];
                    hlryName = event.target.textContent.split(" ")[1];
                  }
                  // console.log(data)
                  that.serviceDuration = data.duration;
                  that.serviceName = data.serviceName;
                  that.serviceType = data.serviceType;
                  that.serviceStaffType = "护理员";
                  if (data.serviceType == 1) {
                    // console.log(that.serviceStaffData);
                    that.serviceCurrentType = 1;
                    if (hlryName != null) {
                      for (var i = 0; i < that.serviceStaffData.length; i++) {
                        if (that.serviceStaffData[i].fullname == hlryName) {
                          that.serviceCurrentStaff =
                            that.serviceStaffData[i].userId;
                        }
                      }
                    } else {
                      that.serviceCurrentStaff =
                        that.serviceStaffData[0].userId;
                    }

                    that.serviceStaffCurrentData = that.serviceStaffData;
                  } else if (data.serviceType == 2) {
                    that.serviceCurrentType = 2;
                    if (hlryName != null) {
                      for (var i = 0; i < that.serviceStaffData2.length; i++) {
                        if (that.serviceStaffData2[i].fullname == hlryName) {
                          that.serviceCurrentStaff =
                            that.serviceStaffData2[i].userId;
                        }
                      }
                    } else {
                      that.serviceCurrentStaff =
                        that.serviceStaffData2[0].userId;
                    }

                    that.serviceStaffCurrentData = that.serviceStaffData2;
                  }
                }
              }
            });
            var component = new MyComponent().$mount();
            var divData = schedulingTable1.find("tbody");
            //         remove() - 删除被选元素（及其子元素）
            // empty() - 从被选元素中删除子元素
            divData.remove();
            schedulingTable1.append(component.$el);
            // schedulingTable1.find("tbody").html(tableBody1);
          } else {
            var divData = schedulingTable1.find("tbody");
            divData.remove();
            schedulingTable1.append(
              "<tr><td colspan='10' style='text-align: center;'>暂无数据</td></tr>"
            );
          }
          if (serviceType2Count != 0) {
            var MyComponent2 = Vue.extend({
              template: tableBody2,
              data() {
                return {};
              },
              methods: {
                paiban(event) {
                  that.dialogVisible1 = true;
                  that.serviceCurrentStaffSearch='';
                  console.log(
                    event.srcElement.parentElement.childNodes[1].childNodes
                  );
                  var ht = event.target;
                  var dateString = event.target.getAttribute("name");
                  that.currentDate = dateString.split("_")[1];
                  // console.log('1111',that.currentDate);
                  var id = ht.getAttribute("name").split("_")[0];
                  var data;
                  for (var item of nursingServicePlanItemList2) {
                    if (id == item.id) {
                      data = item;
                    }
                  }

                  that.paibanData = data;
                  var hlryName = null;
                  if (event.target.textContent != "+") {
                    // that.hlsj = that.$moment('2017-01-02 '+event.target.textContent.split(' ')[0]+':00').format("HH:mm:ss");
                    that.hlsj = event.target.textContent.split(" ")[0];
                    hlryName = event.target.textContent.split(" ")[1];
                  }
                  // console.log(data)
                  that.serviceDuration = data.duration;
                  that.serviceName = data.serviceName;
                  that.serviceType = data.serviceType;
                  // console.log(event,ht.getAttribute('name').split('_')[0],ht.getAttribute('name').split('_')[1]);
                  that.serviceStaffType = "护士";
                  if (data.serviceType == 1) {
                    that.serviceCurrentType = 1;
                    if (hlryName != null) {
                      for (var i = 0; i < that.serviceStaffData.length; i++) {
                        if (that.serviceStaffData[i].fullname == hlryName) {
                          that.serviceCurrentStaff =
                            that.serviceStaffData[i].userId;
                        }
                      }
                    } else {
                      that.serviceCurrentStaff =
                        that.serviceStaffData[0].userId;
                    }

                    that.serviceStaffCurrentData = that.serviceStaffData;
                  } else if (data.serviceType == 2) {
                    that.serviceCurrentType = 2;
                    if (hlryName != null) {
                      for (var i = 0; i < that.serviceStaffData2.length; i++) {
                        if (that.serviceStaffData2[i].fullname == hlryName) {
                          that.serviceCurrentStaff =
                            that.serviceStaffData2[i].userId;
                        }
                      }
                    } else {
                      that.serviceCurrentStaff =
                        that.serviceStaffData2[0].userId;
                    }

                    that.serviceStaffCurrentData = that.serviceStaffData2;
                  }
                }
              }
            });
            var component2 = new MyComponent2().$mount();
            // 每次表格都先要清空
            var divData = schedulingTable2.find("tbody");
            divData.remove();

            schedulingTable2.append(component2.$el);
          } else {
            var divData = schedulingTable2.find("tbody");
            divData.remove();

            schedulingTable2.append(
              "<tr><td colspan='10' style='text-align: center;'>暂无数据</td></tr>"
            );
          }

          // 获取具体的值填写
          this.$options.methods.querySchedulingPlan(1, this);
          this.$options.methods.querySchedulingPlan(2, this);
        }
      });
    },
    dataList(tableData) {
      var newdata = [];
      var newdata2 = [];
      var newdata3 = [];
      var dataArray = tableData;
      var dataArray1 = tableData;
      var dataArray2 = tableData;
      var dataArray3 = tableData;
      dataArray.forEach(el => {
        // 判读用户等级及状态再决定是否显示审核？？？？
        // if(URL_ROLES[4] == 1 && full.schedulingAuditStatus != 101){
        //   	  	      html += "<button data-toggle='modal' data-target='#addModal' style='margin-left:5px;' onclick=\"showDetail('"+full.planId+"','yes')\">审核</button>";
        // 	  	 }

        if (el.schedulingAuditStatus) {
          if (el.schedulingAuditStatus == 100) {
            el.schedulingAuditStatus = "未审核";
          } else if (el.schedulingAuditStatus == 101) {
            el.schedulingAuditStatus = "审核通过";
          } else if (el.schedulingAuditStatus == 102) {
            el.schedulingAuditStatus = "审核拒绝";
          } else {
          }
        }
        if (el.distributeOrgClass) {
          if (el.distributeOrgClass == 4) {
            el.distributeOrgClass = "机构护理";
          } else if (el.distributeOrgClass == 5) {
            el.distributeOrgClass = "居家护理";
          }
        }
        if (el.userSex) {
          if (el.userSex == "F") {
            el.userSex = "女";
          } else if (el.userSex == "M") {
            el.userSex = "男";
          }
        }
        if (el.planStatus) {
          if (el.planStatus == 1) {
            el.planStatus = "正常";
          } else if (el.planStatus == 2) {
            el.planStatus = "暂停";
          } else if (el.planStatus == 3) {
            el.planStatus = "终止";
          }
        }
        if (el.userAssessedLevel) {
          el.userAssessedLevel = el.userAssessedLevel + "级";
        }
      });
      // dataArray.sort();
      this.datalists = dataArray;
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClose1(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("修改成功");
        } else {
          return false;
        }
      });
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields();
    },

    getReloadData(that) {
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_org_service_mng/query_bed_information`,
          method: "get"
        })
        .then(res => {
          if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
          } else {
            that.datalists = res.data.data;
            // console.log(this.datalists)
            that.dataList(res.data.data);
          }

          // this.getList();
        });
      // that.reload();
    }
  },
  created() {
    // this.loading = true;
  },
  mounted() {
    // 时间限制
    window.localStorage.setItem(
      "sjxz1",
      this.$moment("2019-05-03", "YYYY-MM-DD").valueOf()
    );
    // this.getData();
    // 页面加载完成时，loading效果关闭
    // this.loading = false;
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_service_org_service_mng/query_bed_information`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "100005") {
        this.$router.push({ path: "/" });
      } else {
        this.datalists = res.data.data;
        // console.log(this.datalists)
        this.dataList(res.data.data);
        this.loading = false;
      }

      // this.getList();
    });
    // 获取搜索时所有的机构
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/intact/intact_organization_mng/load_by_org_type?orgType=4`,
      method: "get"
    }).then(res => {
      // console.log('机构名称',res.data);
      this.disOrg = res.data.data;
    });

    // serviceStaffData护理人员选择 护理员
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/intact/intact_staff_mng/load_staff_by_type_and_class?userType=4&userClass=1`,
      method: "get"
    }).then(res => {
      this.serviceStaffData = res.data.data;
    });
    // 护士选择
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/intact/intact_staff_mng/load_staff_by_type_and_class?userType=4&userClass=2`,
      method: "get"
    }).then(res => {
      this.serviceStaffData2 = res.data.data;
    });

    // 增删改审的权限判断
    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "护理管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "nursing/org_nuring") {
              console.log("机构护理", submenu[j]);
              // urlRole1==dataAdd 增
              // urlRole2==dataUpdate 修
              // urlRole3==dataDelete 删除
              // urlRole4==dataAudit 审

              this.urlRole1 = submenu[j].dataAdd;
              this.urlRole2 = submenu[j].dataUpdate;
              this.urlRole3 = submenu[j].dataDelete;
              this.urlRole4 = submenu[j].dataAudit;
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
  margin-top: 3px;
  margin-bottom: 6px;
}
th {
  text-align: right;
}
td {
  padding: 2px 0px;
  text-align: center;
}
.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  text-align: center;
}

.c_tab label.active {
  background: #f2f2f2;
}
.c_tab label {
  width: 138px;
  background: #fff;
  height: 34px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  line-height: 34px;
  border: #cccccc 1px solid;
  margin-left: -1px;
  display: inline-block;
}
label {
  font-weight: 500;
}
label {
  color: #242a30;
}
.btn.glyphicon-plus,
.btn.glyphicon-minus {
  font-size: 12px;
  vertical-align: middle;
  height: 32px;
  line-height: 32px;
  padding: 0px 7px;
  background: #fff;
  border: 1px solid #e2e7eb;
  border-radius: 0;
}
.week_form .date_text {
  width: 40px;
  padding: 6px 0;
  height: 32px;
  text-align: center;
  display: inline;
  vertical-align: middle;
  background: #fff;
  border-width: 1px 0;
  border-radius: 0;
  position: relative;
  top: 1px;
}
.modal-body h6 .btn.glyphicon-chevron-left,
.modal-body h6 .btn.glyphicon-chevron-right {
  position: relative;
  top: 0px;
}

.modal-body h6 .btn {
  margin-left: 5px;
  vertical-align: bottom;
  border: #cccccc 1px solid;
  background: #fff;
}

.bed_list li {
  width: 25%;
  float: left;

  text-align: left;
}
.bed_list,
.bed_list li {
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  padding-bottom: 10px;
}
.bed_box {
  height: 146px;
  border: 1px solid #ccd0d4;
  border-radius: 7px;
  margin: 0 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.115);
}
.dataTables_wrapper {
  position: relative;
  clear: both;
  *zoom: 1;
  zoom: 1;
  overflow: auto;
  height: 750px;
}
.bed_list li h2 {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ccd0d4;
  font-size: 12px;
  padding: 0 10px;
  margin: 0;
  font-weight: 500;
  color: #242a30;
}
.details_box {
  height: 100px;
  cursor: pointer;
}
.bed_list li h3 {
  height: 28px;
  line-height: 28px;
  font-size: 16px;
  padding: 3px 10px;
  margin: 0;
  box-sizing: content-box;
  font-weight: 500;
  color: #242a30;
}
.bed_list li p {
  padding: 0 10px;
  line-height: 18px;
  margin: 0;
}
.bed_box {
  height: 146px;
  border: 1px solid #ccd0d4;
  border-radius: 7px;
  margin: 0 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.115);
}
.add_box,
.add_box:hover {
  cursor: pointer;
  display: block;
  text-align: center;
  color: #707478;
  height: 118px;
  text-decoration: none;
}
.add_box b {
  display: block;
  font-size: 16px;
  color: #707478;
  padding-top: 30px;
  font-weight: normal;
}
.bed_list li h3 {
  height: 28px;
  line-height: 28px;
  font-size: 16px;
  padding: 3px 10px;
  margin: 0;
  box-sizing: content-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
  color: #242a30;
}
.bed_list li p {
  padding: 0 10px;
  line-height: 18px;
  margin: 0;
  font-size: 12px;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #707478;
}

/* 展开收缩的样式 */
.modal-body h6 {
  position: relative;
}

.modal-body h6 {
  margin: 0;
  padding: 0;
  height: 28px;
  border-bottom: 1px solid #e2e7eb;
  margin-bottom: 15px;
}
.modal-body h6 b {
  display: inline-block;
  padding-left: 10px;
  border-left: 1px solid #e2e7eb;
  font-size: 14px;
  font-weight: normal;
}
.modal-body h6 a {
  position: absolute;
  right: 0;
  top: 5px;
  text-decoration: none;
  cursor: pointer;
}
.modal-body h6 .pull-right {
  position: relative;
  top: -10px;
}

.pull-right {
  float: right !important;
}
a {
  color: #337ab7;
  text-decoration: none;
}

a {
  background-color: transparent;
}
#hlxmModal input[disabled],#hlxmModal select[disabled]{
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
<style>
#orgNursing .el-dialog__header{
margin-bottom:5px;
}
#orgNursing .el-dialog__body{
padding-top:0px;
padding-bottom: 0px;
}
</style>

