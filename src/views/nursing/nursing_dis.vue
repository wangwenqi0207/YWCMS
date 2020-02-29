<template>
  <div style="padding:20px;height:100%;" id="nursingDis">
    <div style="background:#ffffff;height:95%;overflow:auto;padding:5px">
      <div el-row style="padding:10px;text-align: left;">
        <div el-col span="24" class="top">
          <el-button
            v-if="urlRole1==1"
            type="primary"
            size="small"
            @click.native="add"
            icon="el-icon-plus"
          >新增</el-button>

          <el-button
            v-if="urlRole3==1"
            type="primary"
            size="small"
            @click.native="remove"
            icon="el-icon-delete"
          >删除</el-button>

          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <el-form :inline="true" class="demo-form-inline" size="mini" style="text-align:left;padding-left:15px;">
        <el-form-item label="分配状态:">
          <el-select
            v-model="disStatus"
            placeholder="请选择分配状态"
            style="width:150px"
            @change="changeSelect"
            size="mini"
            clearable
          >
            <el-option label="全部" value></el-option>
            <el-option label="待分配" value="0"></el-option>
            <el-option label="待接收" value="1"></el-option>
            <el-option label="已接收" value="2"></el-option>
            <el-option label="拒收" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分配机构:">
          <el-select
            v-model="disOrg1"
            placeholder="请选择分配机构"
            style="width:150px"
            @change="changeSelect"
            size="mini"
            clearable
          >
            <el-option v-for="(item,index) in disOrg" :value="item" :key="index">{{item}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名:">
          <el-input v-model.trim="nameSearch" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>

        <el-form-item label="医保卡号:">
          <el-input v-model.trim="ybCardSearch" placeholder="请输入医保卡号" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input v-model.trim="idCardSearch" placeholder="请输入身份证号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
     <div style="padding:5px;height:80%">
      <el-table
        :data="datalists"
        border
        stripe
       height="100%"
        style="width: 100%;text-align:left;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :selectable="selectADD"></el-table-column>
        <el-table-column prop="planId" label="序号" width="180"></el-table-column>
        <el-table-column prop="distributeStatus" label="分配状态" width="200">
          <template slot-scope="scope">
            <span
              style="display:inline-block;width:50px;text-align:left;"
            >{{scope.row.distributeStatus}}</span>

            <div style="display:inline-block;" v-if="scope.row.distributeStatus=='待分配'">
              <el-button size="mini" type="success" @click.stop="fenpei(scope.$index, scope.row)">分配</el-button>
            </div>

            <div style="display:inline-block;" v-else-if="scope.row.distributeStatus=='拒收'">
              <el-button size="mini" type="success" @click.stop="fenpei(scope.$index, scope.row)">分配</el-button>
            </div>
            <div style="display:inline-block;" v-else-if="scope.row.distributeStatus=='待接收'">
              <div v-if="dataExtra1==1">
                <el-button
                  size="mini"
                  type="success"
                  @click.stop="receive(scope.$index, scope.row)"
                  style="margin:0px;"
                >接收</el-button>
                <el-button
                  size="mini"
                  type="success"
                  @click.stop="reject(scope.$index, scope.row,1)"
                  style="margin:0px;"
                >拒收</el-button>
              </div>
              <div v-else>
                <el-button
                  size="mini"
                  type="success"
                  @click.stop="reject(scope.$index, scope.row,2)"
                  style="margin:0px;"
                >取消</el-button>
              </div>
            </div>
            <div></div>
          </template>
        </el-table-column>
        <el-table-column prop="distributeOrgName" label="分配机构" width="230"></el-table-column>
        <el-table-column prop="distributeOrgClass" label="护理类型" width="120"></el-table-column>
        <el-table-column prop="userName" label="申请人姓名" width="100"></el-table-column>
        <el-table-column prop="userIdcard" label="身份证号" width="180"></el-table-column>
        <el-table-column prop="medicalInsuranceId" label="医保卡号" width="180"></el-table-column>
        <el-table-column prop="userSex" label="性别" width="60"></el-table-column>
        <el-table-column prop="userAge" label="年龄" width="60"></el-table-column>
        <el-table-column prop="userAssessedLevel" label="评估等级" width="120"></el-table-column>
        <el-table-column prop="agentName" label="代理人姓名" width="120"></el-table-column>
        <el-table-column prop="agentPhone" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="streetName" label="街道" width="130"></el-table-column>
        <el-table-column prop="address" label="联系地址" width="250"></el-table-column>
        <el-table-column prop="planStatus" label="服务状态" width="80"></el-table-column>
        <el-table-column prop="planStartDate" label="计划开始日期" width="130"></el-table-column>

        <el-table-column label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click.stop="planDetail(scope.$index, scope.row)"
              style="margin:0px;"
            >护理计划详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <!-- 修改模态框 -->
      <el-dialog
        :visible.sync="dialogVisible1"
        width="1100px"
        :before-close="handleClose1"
        style="text-align:left;"
      >
        <span slot="header" class="dialog-header" hidden></span>
        <!-- <div class="modal-body"  >
				<form  role="form" id="modalFrom" class="form-horizontal">
							<h6><b>基础信息</b></h6>
                    		<input name="planId" type="hidden">
                            <div class="form-group">
                                    <label class="control-label col-md-2">身份证号：</label>
                                    <div class="col-md-4">
                                            <div class="col-md-9" style="padding:0; padding-right:5px;">
                                            <input class="form-control" name="userIdcard" type="text"></div>
                                            <div class="col-md-3" style="padding:0"><button type="button" name="findInsUserBtn" class="btn btn-sm btn-primary" style="display:block; width:100%" onclick="findInsUser(1);">读取</button></div>
                                    </div>
                                    <label class="control-label col-md-2">社保卡号：</label>
                                    <div class="col-md-4">
                                            <div class="col-md-9" style="padding:0; padding-right:5px;">
                                            <input class="form-control" name="medicalInsuranceId" type="text"></div>
											<div class="col-md-3" style="padding:0"><button type="button" name="findInsUserBtn" class="btn btn-sm btn-primary" style="display:block; width:100%" onclick="findInsUser(2);">读取</button></div>
                                    </div>
                            </div>
                            <div class="form-group">
                                    <label class="control-label col-md-2">姓名：</label>
                                    <div class="col-md-4">
                                            <input class="form-control" disabled name="userName" type="text">
                                    </div>
                                    <label class="control-label col-md-2">性别：</label>
                                    <div class="col-md-4">
                                    		<div style="padding-top:5px;">
                                            <input name="sex" type="radio" disabled checked> 男&nbsp;&nbsp;&nbsp;&nbsp;
                                            <input name="sex" type="radio" disabled> 女
                                            </div>
                                    </div>
                            </div>
                            <div class="form-group">
                                    <label class="control-label col-md-2">年龄：</label>
                                    <div class="col-md-4">
                                            <input class="form-control" disabled name="userAge" type="text">
                                    </div>
                                    <label class="control-label col-md-2">评估等级：</label>
                                    <div class="col-md-4">
                                            <input class="form-control" disabled name="userAssessedLevel" type="text">
                                    </div>
                            </div>
							<div class="form-group">
								<label class="control-label col-md-2">是否为民政部门认定的特殊人群：</label>
								<div class="col-md-4">
									<input class="form-control" disabled name="special" type="text">
								</div>
								<label class="control-label col-md-2">是否为残联部门认定的残疾人：</label>
								<div class="col-md-4">
									<input class="form-control" disabled name="handicapped" type="text">
								</div>
							</div>
                            <div class="form-group">
                                    <label class="control-label col-md-2">代理人姓名：</label>
                                    <div class="col-md-4">
                                            <input class="form-control" disabled name="agentName" type="text">
                                    </div>
                                    <label class="control-label col-md-2">联系电话：</label>
                                    <div class="col-md-4">
                                            <input class="form-control" disabled name="agentPhone" type="text">
                                    </div>
                            </div>
                            <div class="form-group">
                                    <label class="control-label col-md-2">护理地址：</label>
                                    <div class="col-md-4">
                                            <input class="form-control" disabled name="address" type="text">
                                    </div>
                                    <label class="control-label col-md-2">计划开始日期：</label>
                                    <div class="col-md-4">
                                            <input class="form-control" disabled name="planStartDate" type="text">
                                    </div>
                            </div>

                            <h6><b>护理计划</b></h6>
                       		<table id="pagDetailModalTable" style='margin:0 auto;padding:0px;width:100%;background-color: #F0F3F5'  class='table table-striped table-bordered nowrap'>
								<tr>
							  		<th style='text-align:center;' >护理分类</th>
							  		<th style='text-align:center;' >护理项目</th>
							  		<th style='text-align:center;' >实际护理频次</th>
							  		<th style='text-align:center;' >项目护理时长</th>
							  		<th style='text-align:center;' >护理价格（元/次）</th>
								</tr>
							</table>

							<div class="form-group">
							</div>

            	</form>
        </div>-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="planSubmit(3)">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 护理计划详情模态框 -->
      <el-dialog
        :visible.sync="dialogVisible2"
        width="1100px"
        :before-close="handleClose"
        style="text-align:left;"
        center
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
        <span slot="header" class="dialog-header" hidden></span>

        <div class="modal-body">
          <form role="form" id="modalFrom" class="form-horizontal">
            <h6>
              <b>基础信息</b>
            </h6>
            <input name="planId" type="hidden">
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
                    @click="findInsUser(1);"
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
                    @click="findInsUser(2);"
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
                  <input name="userSexM" type="radio" disabled> 男&nbsp;&nbsp;&nbsp;&nbsp;
                  <input name="userSexF" type="radio" disabled> 女
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
                <input class="form-control" disabled name="planStartDate" type="text">
              </div>
            </div>

            <h6>
              <b>护理计划</b>
            </h6>
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

            <div class="form-group"></div>
          </form>
          <div class="modal-footer" style="text-align:center">
            <button
              id="detailCloseBox"
              type="button"
              class="btn btn-success"
              @click="dialogVisible2 = false"
            >关闭</button>
            <button
              id="addDistributeButton"
              type="button"
              class="btn btn-success"
              @click="addDistribute()"
            >提交</button>
          </div>
        </div>

        <span slot="footer" class="dialog-footer" hidden>
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分配的模态框 -->
      <!-- <el-dialog
                                                                                                                                      title       = "分配护理机构"
                                                                                                                                    :visible.sync = "dialogVisibleFenpei"
                                                                                                                                      width       = "50%"


                                                                                                    :before-close = "handleCloseFenpei"
      >

        <el-form
          :model = "ruleFormFenpei"
          status-icon
          :rules        = "rulesFenpei"
            ref         = "ruleFormFenpei"
            label-width = "10%;"
            class       = "demo-ruleForm"
            style       = "text-align:left;"
        >
          <el-form-item
                  label = "分配给："
                  prop  = "orgCom"
          >
            <el-radio
              style              = "width:30%;"
              v-model            = "ruleFormFenpei.orgCom"
              label              = "1"
              @click.native.stop = "select()"
            >护理机构</el-radio>
            <el-radio
            style              = "width:30%;"
            v-model            = "ruleFormFenpei.orgCom"
            label              = "2"
            @click.native.stop = "select()"
            >居家护理</el-radio>

            <el-select
              v-if        = "ruleFormFenpei.orgCom==1"
              v-model     = "ruleFormFenpei.orgCom2"
              placeholder = "选择护理机构"
              style       = "width:80%;"
              @change     = "changeSelect"
              size        = 'mini'
            >

              <el-option
                                                                                                                                              v-for = "(item,index) in hlfpData"
                                                                                                                                            :value  = "item.orgId"
                                                                                                                                            :key    = "index"
                                                                                                                                            :label  = "item.orgName"
              ></el-option>

            </el-select>
            <el-select
              v-else
              v-model     = "ruleFormFenpei.orgCom2"
              placeholder = "选择居家护理"
              style       = "width:82%;"
              @change     = "changeSelect"
              size        = 'mini'
            >

              <el-option
                                                                                                                                              v-for = "(item,index) in jjhlData"
                                                                                                                                            :value  = "item.orgId"
                                                                                                                                            :key    = "index"
                                                                                                                                            :label  = "item.orgName"
              ></el-option>

            </el-select>
          </el-form-item>

          <el-form-item style="text-align:center;">
            <el-button
              type   = "primary"
              @click = "submitFormFenpei('ruleFormFenpei')"
            >提交</el-button>
            <el-button @click="resetFormFenpei('ruleFormFenpei')">重置</el-button>
          </el-form-item>
        </el-form>
        <span
          slot  = "footer"
          class = "dialog-footer"
          hidden
        >
          <el-button @click="dialogVisibleFenpei = false">取 消</el-button>
          <el-button
            type   = "primary"
            @click = "fenpeiOrg()"
          >确 定</el-button>
        </span>
      </el-dialog>-->
      <div class="modal" id="fenpeimodal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeModal('fenpeimodal')">&times;</button>
              <h4 class="modal-title" id="myModalLabel">分配护理机构</h4>
            </div>
            <div class="modal-body">
              <el-form
                :model="ruleFormFenpei"
                status-icon
                :rules="rulesFenpei"
                ref="ruleFormFenpei"
                label-width="10%;"
                class="demo-ruleForm"
                style="text-align:left;"
              >
                <el-form-item label="分配给：" prop="orgCom">
                  <el-radio
                    style="width:30%;"
                    v-model="ruleFormFenpei.orgCom"
                    label="1"
                    @click.native.stop="select()"
                  >护理机构</el-radio>
                  <el-radio
                    style="width:30%;"
                    v-model="ruleFormFenpei.orgCom"
                    label="2"
                    @click.native.stop="select()"
                  >居家护理</el-radio>

                  <el-select
                    v-if="ruleFormFenpei.orgCom==1"
                    v-model="ruleFormFenpei.orgCom2"
                    placeholder="选择护理机构"
                    style="width:80%;"
                    @change="changeSelect"
                    size="mini"
                  >
                    <el-option
                      v-for="(item,index) in hlfpData"
                      :value="item.orgId"
                      :key="index"
                      :label="[item.orgName]+'-'+[item.orgCode]"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-else
                    v-model="ruleFormFenpei.orgCom2"
                    placeholder="选择居家护理"
                    style="width:82%;"
                    @change="changeSelect"
                    size="mini"
                  >
                    <el-option
                      v-for="(item,index) in jjhlData"
                      :value="item.orgId"
                      :key="index"
                      :label="[item.orgName]+'-'+[item.orgCode]"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item style="text-align:center;">
                  <el-button type="primary" @click="submitFormFenpei('ruleFormFenpei')">提交</el-button>
                  <!-- <el-button @click="resetFormFenpei('ruleFormFenpei')">重置</el-button> -->
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->

      <!-- 拒接的模态框 -->
      <div class="modal" id="cancelmodal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeModal('cancelmodal')">&times;</button>
              <h4 class="modal-title" id="myModalLabel">拒绝接收</h4>
            </div>
            <div class="modal-body">
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
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- <el-dialog
  title="拒绝接收"
  :visible.sync="dialogVisibleReject"
  width="30%"
  center
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
            <el-button @click="resetFormReject('ruleFormReject')">重置</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" hidden style="display:none;height:0;padding:0;">
          <el-button @click="dialogVisibleReject = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleReject = false">确 定</el-button>
        </span>

      </el-dialog> -->
    </div>
    <div class="pgeNation">
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
import vueArea from "vue-area";
export default {
  mixins: [base],
  inject: ["reload"],
  data() {
    return {
      //搜索相关
      nameSearch: "",
      idCardSearch: "",
      ybCardSearch: "",
      disStatus: "",
      disOrg1: "",
      //分页data
      currentPage: 1,
      pageSize: [10, 20, 30, 50],
      total: 0,
      changePageSize: 10,

      //表单相关
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      curOpt_: null,
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
        orgCom: null,
        orgCom2: null
      },
      rulesFenpei: {},
      hlfpData: null,
      jjhlData: null,
      //拒接相关
      dialogVisibleReject: false,
      ruleFormReject: {
        why: null
      },
      rulesReject: {},
      rejectId: null,
      refuseType: null,

      currentPlanID: null,

      // 权限管理中是否有扩展权限dataExtra1
      dataExtra1: 0,
      // 增删改审的权限问题？？
      urlRole1: 0,
      urlRole2: 0,
      urlRole3: 0,
      urlRole4: 0,

      // 分配的样式问题
      screenWidth: document.body.clientWidth, //设置的监听屏幕的变化
      testspan: 12
    };
  },
  watch: {
    screenWidth(val) {
      if (val < 990) {
        this.testspan = 24;
      } else {
        this.testspan = 12;
      }
    },

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
    // 在ie下关闭模态框
    closeModal(id){
      $('#'+id).hide();
    },
    selectADD: function(row, index) {
      if (row.distributeStatus == "待分配" || row.distributeStatus == "拒收") {
        return true;
      } else {
        return false;
      }
    },
    exportPlan() {
      alert("导出成功");
    },

    search() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_distribute_mng/pagination?pageFlag=1&distributeOrgNameLike=${
          encodeURI(this.disOrg1)
        }&distributeStatus=${encodeURI(this.disStatus)}&userNameLike=${
          encodeURI(this.nameSearch)
        }&medicalInsuranceIdLike=${encodeURI(this.ybCardSearch)}&userIdcardLike=${
          encodeURI(this.idCardSearch)
        }&pageSize=${encodeURI(this.changePageSize)}&pageNo=1`,
        method: "get"
      }).then(res => {
        // console.log(res.data);
        this.dataList(res.data.resultList);
        this.total = res.data.totalCount;
        this.currentPage = 1;
      });
    },
    changeSelect(val) {
      //   console.log(this.statusSearch)
    },
    // 分配相关
    fenpei(index, row) {
      $("#fenpeimodal").modal("show");
      // this.dialogVisibleFenpei = true;
      // // console.log(index,row)
      this.ruleFormFenpei.orgCom2 = "";
      this.currentPlanID = row.planId;
    },

    // hljg(type){
    //   if(type==2){
    //     console.log('居家护理')
    //   }else if(type==1){
    //     console.log('机构护理')
    //   }
    // },

    // 选项切换时改变
    select() {
      // alert(this.ruleFormFenpei.orgCom2)
      this.ruleFormFenpei.orgCom2 = null;
    },
    submitFormFenpei(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.ruleFormFenpei.orgCom2 == "null" ||
            this.ruleFormFenpei.orgCom2 == null
          ) {
            this.ruleFormFenpei.orgCom2 = "";
          }
          // console.log(this.currentPlanID,this.ruleFormFenpei.orgCom,this.ruleFormFenpei.orgCom2);
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/nursing/nursing_service_distribute_mng/distribute_org?planId=${
              encodeURI(this.currentPlanID)
            }&distriOrgId=${encodeURI(this.ruleFormFenpei.orgCom2)}`,
            method: "get"
          }).then(res => {
            if (res.data.resultCode == "000000") {
              this.$options.methods.getReloadData(this);
              $("#fenpeimodal").modal("hide");
              // this.dialogVisibleFenpei = false;
              alert("分配成功");
            } else {
              // this.dialogVisibleFenpei = false;
              $("#fenpeimodal").modal("hide");
              alert("分配失败：" + res.data.resultMsg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormFenpei(formName) {
      this.$refs[formName].resetFields();
      this.ruleFormFenpei.orgCom = null;
      this.ruleFormFenpei.orgCom2 = null;
    },
    handleCloseFenpei(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    receive(index, row) {
      var planId = row.planId;
      console.log(planId);
      this.$confirm("你将要进行接收操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/nursing/nursing_service_distribute_mng/receive?planId=${encodeURI(planId)}`,
            method: "get"
          }).then(res => {
            // console.log(res)
            this.$options.methods.getReloadData(this);

            alert("接收成功");
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
    reject(index, row, refuseType) {
      // this.dialogVisibleReject = true;
      $('#cancelmodal').show();
      this.rejectId = row.planId;
      this.refuseType = refuseType;
    },
    submitFormReject(formName) {
      var planId = this.rejectId;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert(this.ruleFormReject.why);
          // alert(planId);

          // 护理分配取消的时候，refuseType是1或者2的问题：接收拒收的时候为1，取消的时候为2
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/nursing/nursing_service_distribute_mng/distri_refuse?planId=${encodeURI(planId)}&distriRefuseReason=${
              encodeURI(this.ruleFormReject.why)
            }&refuseType=${encodeURI(this.refuseType)}`,
            method: "get"
          }).then(res => {
            if (res.data.resultCode == "000000") {
              this.$options.methods.getReloadData(this);
              alert("提交成功");
              // this.dialogVisibleReject = false;
              $('#cancelmodal').hide();
            } else {
              alert("提交失败：" + res.data.resultMsg);
              // this.dialogVisibleReject = false;
              $('#cancelmodal').hide();
            }
          });
        } else {
          // console.log("error submit!!");
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
    add() {
      this.curOpt_ = 1;
      $("input[name=id]:checked").attr("checked", false);
      var myModelTable = $("#modalFrom");
      myModelTable.find("input[name='userIdcard']").attr("disabled", false);
      myModelTable
        .find("input[name='medicalInsuranceId']")
        .attr("disabled", false);
      myModelTable.find("button[name='findInsUserBtn']").show();
      $("#addDistributeButton").show();

      // document.getElementById("modalFrom").reset();
      this.dialogVisible2 = true;
      this.$options.methods.clearModelTable();

      // this.$options.methods.planFormInitAndShow();                                                                                                                                                                                                                                                                                                                                                                                                       this.dialogVisible2 = true;
      //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     var that                = this;
      //   this.$options.methods.clearModelTable();
    },

    remove() {
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
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
              }/auth/nursing/nursing_service_distribute_mng/delete_distribute?planId=${
                encodeURI(this.updateData2[0].planId)
              }`,
              method: "get"
            }).then(res => {
              if (res.data.success == "true" || res.data.success == true) {
                this.$options.methods.getReloadData(this);
                alert("删除成功");
              } else {
                alert("删除失败   " + res.data.resultMsg);
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
    planDetail(index, row) {
      this.dialogVisible2 = true;
      console.log(index, row);
      var planId = row.planId;

      // 与护理计划制定不同

      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_distribute_mng/load_ins_user_by_plan_id?planId=${encodeURI(planId)}`,
        method: "get"
      }).then(res => {
        var result = res.data.data;
        console.log("111", result);
        //下面是简单的根据身份证号算下年龄和性别并赋上值，可以手动再改
        var myModelTable = $("#modalFrom");
        var specialarray = ["不是", "五保户", "低保户", "困难户"];
        var handicarray = ["不是", "是"];
        myModelTable.find("input[name='userIdcard']").attr("disabled", true);
        myModelTable
          .find("input[name='medicalInsuranceId']")
          .attr("disabled", true);
        myModelTable.find("button[name='findInsUserBtn']").hide();
        $("#addDistributeButton").hide();
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
        myModelTable.find("input[name='agentPhone']").val(result.contactPhone);

        myModelTable.find("input[name='address']").val(result.appointedAddress);
        myModelTable
          .find("input[name='medicalInsuranceId']")
          .val(result.medicalInsuranceId);
        myModelTable
          .find("input[name='planStartDate']")
          .val(result.planStartDate);

        myModelTable.find("input[name='special']").val(specialarray[result.special]);
        myModelTable.find("input[name='handicapped']").val(handicarray[result.handicapped]);

        myModelTable.find("input[name='planId']").val(result.planId);

        var tableHTML = "";
        for (var i = 0; i < result.nursingServicePlanItemList.length; i++) {
          var nursingServicePlanItem = result.nursingServicePlanItemList[i];
          tableHTML += "<tr name='data_tr'>";
          if (nursingServicePlanItem.serviceType == "1") {
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>基础护理</td>";
          } else if (nursingServicePlanItem.serviceType == "2") {
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>常用临床护理</td>";
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
          tableHTML += "<td style='text-align:center;vertical-align: middle;'>";
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
      });
    },
    costTotalSalveByDetail(that) {
      var conditons = [];
      // console.log($("#pagDetailModalTable").find("tr[name='data_tr']"))
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
    // 新的提交
    addDistribute() {
      //  需要读取信息时填写的planID

      var myModelTable = $("#modalFrom");
      var planId = myModelTable.find("input[name='planId']").val();

      this.$axios({
        //  url http://39.96.24.242:8099/ltcins-intact-cms/nursing/nursing_service_distribute_mng.htm?act=addDistribute&planId=201811061609281849
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_distribute_mng/add_distribute?planId=${encodeURI(planId)}`,
        method: "get"
      }).then(res => {
        //  添加成功时返回的码是什么？？？？？
        if (res.data.resultCode == "000000") {
          this.$options.methods.getReloadData(this);
          alert("添加成功");
          $("#detailCloseBox").trigger("click");
          // 刷新表格的作用
          // doMyQuery();
          // 需要重新发送axios来重新获取表格
        } else {
          // console.log(res)
          alert("添加失败，错误信息：" + res.data.resultMsg);
        }
      });
    },

    clearModelTable() {
      //  新的
      var myModelTable = $("#modalFrom");
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
      // $('#addDistributeButton').css("background","#b6c2c9");
      $("#addDistributeButton").attr("disabled", true);
      $("#pagDetailModalTable tr:not(:first)").remove();
    },
    findInsUser(caseNo) {
      var myModelTable = $("#modalFrom");
      var specialarray = ["不是", "五保户", "低保户", "困难户"];
      var handicarray = ["不是", "是"];

      // $('#addDistributeButton').css("background","#b6c2c9");
      $("#addDistributeButton").attr("disabled", true);

      var idcardOrMedicalNo = "";
      switch (caseNo) {
        case 1:
          if (myModelTable.find("input[name='userIdcard']").val() == "") {
            this.$options.methods.clearModelTable();
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
            this.$options.methods.clearModelTable();
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
        }/auth/nursing/nursing_service_distribute_mng/load_ins_user_by_idcard_or_medical_no?idcardOrMedicalNo=${encodeURI(idcardOrMedicalNo)}&caseNo=${encodeURI(caseNo)}`,
        method: "get"
      }).then(res => {
        var result = res.data.data;
        console.log(result.sex);
        if (result.idNo == null || result.idNo == 'null') {
          $("#userAge").focus();
          alert(
            "无身份证号为：" +
              myModelTable.find("input[name='userIdcard']").val() +
              "的参保人记录信息"
          );
          this.$options.methods.clearModelTable();
        } else {
           if(res.data.resultCode == '9999999'){
             $("#userAge").focus();
            alert(
            "无身份证号为：" +
              myModelTable.find("input[name='userIdcard']").val() +
              "的参保人的护理计划已在分配列表中，无法再次分配"
          );
            this.$options.methods.clearModelTable();
          }
          // else if (res.data.resultCode == 400607 || result.assessedLevel == '400607') {
          //   $("#userAge").focus();
          //   // alert(res.data.resultMsg);
          //   alert(
          //   "无身份证号为：" +
          //     myModelTable.find("input[name='userIdcard']").val() +
          //     "的参保人的护理计划已在分配列表中，无法再次分配"
          // );
          //   this.$options.methods.clearModelTable();
          // }
          // else if (result.assessedLevel == null || result.assessedLevel == 'null') {
          //   $("#userAge").focus();
          //   alert(
          //     "身份证号为：" +
          //       myModelTable.find("input[name='userIdcard']").val() +
          //       "的参保人评估等级尚未完成"
          //   );
          //   this.$options.methods.clearModelTable();
          // }
          else if (result.assessedLevel == null || result.assessedLevel == 'null') {
            $("#userAge").focus();
            alert('该参保人的护理计划已经添加在分配列表中,无法再次分配');
            this.$options.methods.clearModelTable();
          }
          else if (result.assessedLevel == 0 || result.assessedLevel == '0') {
            $("#userAge").focus();
            alert(
              "身份证号为：" +
                myModelTable.find("input[name='userIdcard']").val() +
                "的参保人评估等级为0级，无法新增护理计划"
            );
            this.$options.methods.clearModelTable();
          } else if (result.auditStatus != 101) {
            $("#userAge").focus();
            alert(
              "身份证号为：" +
                myModelTable.find("input[name='userIdcard']").val() +
                "的参保人的护理计划尚未通过审核"
            );
            this.$options.methods.clearModelTable();
          } else {
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
            } else {
              myModelTable
                .find("input[name='userSexF']")
                .prop("checked", "checked");
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

            myModelTable
              .find("input[name='special']")
              .val(specialarray[result.special]);
            myModelTable
              .find("input[name='handicapped']")
              .val(handicarray[result.handicapped]);

            myModelTable.find("input[name='planId']").val(result.planId);

            // $('#addDistributeButton').css("background","#7BB6EC");
            $("#addDistributeButton").removeAttr("disabled");

            var tableHTML = "";
            for (var i = 0; i < result.nursingServicePlanItemList.length; i++) {
              var nursingServicePlanItem = result.nursingServicePlanItemList[i];
              tableHTML += "<tr name='data_tr'>";
              if (nursingServicePlanItem.serviceType == "1") {
                tableHTML +=
                  "<td style='text-align:center;vertical-align: middle;'>基础护理</td>";
              } else if (nursingServicePlanItem.serviceType == "2") {
                tableHTML +=
                  "<td style='text-align:center;vertical-align: middle;'>常用临床护理</td>";
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

            //护理分配主页
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
          }
        }
      });
    },

    // 图片上传相关

    dataList(tableData) {
      var newdata = [];
      var newdata2 = [];
      var newdata3 = [];
      var dataArray = tableData;
      var dataArray1 = tableData;
      var dataArray2 = tableData;
      var dataArray3 = tableData;
      dataArray.forEach((el, index) => {
        if (el.auditStatus) {
          if (el.distributeStatus == 0) {
            el.distributeStatus = "待分配";
          } else if (el.distributeStatus == 1) {
            el.distributeStatus = "待接收";
          } else if (el.distributeStatus == 2) {
            el.distributeStatus = "已接收";
          } else if (el.distributeStatus == 3) {
            el.distributeStatus = "拒收";
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

      this.datalists = dataArray;
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
        }/auth/nursing/nursing_service_distribute_mng/pagination?pageFlag=1&pageSize=${
          encodeURI(this.changePageSize)
        }&pageNo=${encodeURI(val)}&distributeOrgNameLike=${
          encodeURI(this.disOrg1)
        }&distributeStatus=${encodeURI(this.disStatus)}&userNameLike=${
          encodeURI(this.nameSearch)
        }&medicalInsuranceIdLike=${encodeURI(this.ybCardSearch)}&userIdcardLike=${
          encodeURI(this.idCardSearch)
        }`,
        method: "get"
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    handleSelectionChange(val) {
      this.updateData2 = val;
      //   console.log(this.updateData2)
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
          }/auth/nursing/nursing_service_distribute_mng/pagination?pageFlag=1&pageSize=${
            encodeURI(that.changePageSize)
          }&pageNo=${encodeURI(that.currentPage)}&distributeOrgNameLike=${
            encodeURI(that.disOrg1)
          }&distributeStatus=${encodeURI(that.disStatus)}&userNameLike=${
            encodeURI(that.nameSearch)
          }&medicalInsuranceIdLike=${encodeURI(that.ybCardSearch)}&userIdcardLike=${
            encodeURI(that.idCardSearch)
          }`,
          method: "get"
        })
        .then(res => {
          if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
          } else {
            that.total = res.data.totalCount;
            that.currentPage = res.data.curPage;
            that.dataList(res.data.resultList);
          }
        });
    }
  },
  mounted() {
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_service_distribute_mng/pagination?pageFlag=1`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "100005") {
        this.$router.push({ path: "/" });
      } else {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      }
    });
    // 获取搜索时所有的机构
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_service_distribute_mng/option`,
      method: "get"
    }).then(res => {
      this.disOrg = res.data.data;
    });

    // 获取分配时的护理机构及居家护理机构
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_service_distribute_mng/load_sub_org?orgType=4`,
      method: "get"
    }).then(res => {
      console.log(res.data.data);
      this.hlfpData = res.data.data;
    });

    // 居家护理
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_service_distribute_mng/load_sub_org?orgType=5`,
      method: "get"
    }).then(res => {
      this.jjhlData = res.data.data;
    });

    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "护理管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "nursing/nursing_dis") {
              this.dataExtra1 = submenu[j].dataExtra1;
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
}
/* 样式优化 */
.modal-body h6 {
margin: 0;
padding: 0;
height: 28px;
border-bottom: 1px solid #e2e7eb;
margin-bottom: 15px;
text-align: left;
}
.modal-body h6 b {
display: inline-block;
padding-left: 10px;
border-left: 1px solid #e2e7eb;
font-size: 14px;
font-weight: normal;
}
</style>
<style>
#nursingDis .el-dialog__header{
margin-bottom:5px;
}
</style>

