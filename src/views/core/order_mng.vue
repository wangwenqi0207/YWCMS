<template>
  <div style="padding:20px;height:100%;">
    <div class="tableBox"  style="height:95%;background:#fff;padding:5px;overflow:auto">
      <div el-row style="padding:10px;text-align: left;">
        <div>
          <!-- 表单input -->
          <el-form
            :inline="true"
            :model="orderForm"
            ref="orderForm"
            class="demo-form-inline"
            size="mini"
            style="font-size:10px;"
          >
            <el-form-item label="工单编号：" prop="orderNo">
              <el-input placeholder v-model.trim="orderForm.orderNo" style="width: 100px" size="mini" clearable></el-input>
            </el-form-item>
            <el-form-item label="工单状态" prop="selectStatus" size="mini">
              <el-select
                v-model="orderForm.selectStatus"
                placeholder="请选择"
                style="width:120px"
                @change="changeSelect"
                size="mini"
                clearable=""
              >
                <el-option label="全部" value></el-option>
                <el-option label="待分配" value="0"></el-option>
                <el-option label="待指派" value="8"></el-option>
                <el-option label="待接单" value="2"></el-option>
                <el-option label="待评估" value="3"></el-option>
                <el-option label="正在评估" value="4"></el-option>
                <el-option label="评估师A完成" value="5"></el-option>
                <el-option label="已评估" value="6"></el-option>
                <el-option label="已完成" value="1"></el-option>
                <el-option label="参保人取消" value="-1"></el-option>
                <el-option label="拒接单" value="-2"></el-option>
                <el-option label="系统取消" value="-3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="参保人：">
              <el-input
                placeholder
                v-model.trim="orderForm.appleyUserName"
                style="width: 80px"
                size="mini"
                clearable
              />
            </el-form-item>
            <el-form-item label="参保人身份证：">
              <el-input placeholder v-model.trim="orderForm.idcard" style="width: 80px" size="mini" clearable/>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input
                placeholder
                v-model.trim="orderForm.contactName"
                style="width: 80px"
                size="mini"
                clearable
              />
            </el-form-item>
            <el-form-item label="评估师：">
              <el-input
                placeholder
                v-model.trim="orderForm.assessNameLike"
                style="width: 80px"
                size="mini"
                clearable
              />
            </el-form-item>
            <el-form-item label="地址：">
              <el-input
                placeholder
                v-model.trim="orderForm.addressLike"
                style="width: 80px"
                size="mini"
                clearable
              />
            </el-form-item>
            <el-form-item label="工单申请日期:">

                <el-date-picker
                  v-model="orderForm.pickDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"

                ></el-date-picker>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="searchData">搜索</el-button>
            </el-form-item>
            <el-form-item v-if="urlRole10==1">
              <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteData">删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-download"
                size="mini"
                @click.stop="exportExcel"
              >导出</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-upload2"
                size="mini"
                @click.stop="exportData"
              >导出APP数据</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button
                type        = "primary"
                icon        = "el-icon-upload2"
                size        = "mini"
                @click.stop = "exportAData"
              >导出A表</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type        = "primary"
                icon        = "el-icon-upload2"
                size        = "mini"
                @click.stop = "exportBData"
              >导出B表</el-button>
            </el-form-item>-->
          </el-form>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <!-- 表格数据列表 -->
      <div style="padding:5px;height:85%">
        <el-table
          :data="tableData"
          height="100%"
          border
          stripe
          highlight-current-row
                                                                                                  style       = "width: 100% ;text-align:left;"
                                                                                                :default-sort = "{prop: 'date', order: 'descending'}"
                                                                                                  size        = 'mini'
                                                                                                  @cell-click = 'rowclick'
        >
          <el-table-column prop="orderNo" label="工单编号" width="160" sortable></el-table-column>
          <el-table-column prop="orderStatus" label="工单状态" width="260">
            <template slot-scope="scope">
              <div class="state">
                <el-input
                                                                                                          placeholder = "请输入内容"
                                                                                                          suffix-icon = "el-icon-arrow-right"
                                                                                                        :value        = "scope.row.orderStatus"
                                                                                                          style       = "display:inline-block;width:60%;"
                  readonly
                  @focus="showDetail(scope.row.orderNo)"
                ></el-input>
                <div v-if="scope.row.orderStatus === '已完成'" style="display:inline-block;width:30%;">
                  <span>{{scope.row.assessedLevel}}</span>
                </div>
                <div
                  v-else-if=" scope.row.orderStatus=== '待分配'"
                  style="display:inline-block;width:30%;"
                >
                  <el-button
                    v-if="urlRole8==1"
                    type="success"
                    size="medium"
                    @click.stop="fenpei(scope.row.orderNo)"
                  >分配</el-button>
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '参保人取消'"
                  style="display:inline-block;width:30%;"
                >
                  <el-button type="success" size="medium">参保人取消</el-button>
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '拒接单'"
                  style="display:inline-block;width:30%;"
                >
                  <el-button
                    v-if="urlRole5==1"
                    type="success"
                    size="medium"
                    @click.stop="zhipai(scope.row.orderNo,scope.row)"
                  >指派</el-button>
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '系统取消'"
                  style="display:inline-block;width:30%;"
                >
                  <el-button
                    v-if="urlRole5==1"
                    type="success"
                    size="medium"
                    @click.stop="zhipai(scope.row.orderNo,scope.row)"
                  >指派</el-button>
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '待接单'"
                  style="display:inline-block;width:30%;"
                >
                  <el-button
                    v-if="urlRole5==1"
                    type="success"
                    size="medium"
                    @click.stop="cancel(scope.row.orderNo)"
                  >取消工单</el-button>
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '待评估'"
                  style="display:inline-block;width:30%;"
                >
                  <el-button
                    v-if="urlRole5==1"
                    type="success"
                    size="medium"
                    @click.stop="cancel(scope.row.orderNo)"
                  >取消工单</el-button>
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '正在评估'"
                  style="display:inline-block;width:30%;"
                >
                  <el-button type="success" size="medium">正在评估</el-button>
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '评估师A完成'"
                  style="display:inline-block;width:30%;"
                >
                  <!-- <el-button
                    type = "success"
                    size = 'medium'
                  >评估已提交</el-button>-->
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '已评估'"
                  style="display:inline-block;width:30%;"
                >
                  <el-button
                    v-if="urlRole6==1"
                    type="success"
                    size="medium"
                    @click.stop="pingji(scope.row.orderNo)"
                  >评定等级</el-button>
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '待指派'"
                  style="display:inline-block;width:30%;"
                >
                  <el-button
                    v-if="urlRole5==1"
                    type="success"
                    size="medium"
                    @click.stop="zhipai(scope.row.orderNo,scope.row)"
                  >指派</el-button>
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '待审核'"
                  style="display:inline-block;width:30%;"
                >
                  <el-button
                    v-if="urlRole9==1"
                    type="success"
                    size="medium"
                    @click.stop="shenhe(scope.row.orderNo)"
                  >审核</el-button>
                </div>
                <div
                  v-else-if="scope.row.orderStatus === '审核不通过'"
                  style="display:inline-block;width:30%;"
                >
                  <!-- <el-button
                    type = "success"
                    size = 'medium'
                  >未通过</el-button>-->
                </div>
                <div v-else></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="isReAssess" label="工单类型" width="180" sortable></el-table-column>
          <el-table-column prop="applyFrom" label="工单来源" width="180" sortable></el-table-column>
          <el-table-column prop="appleyUserName" label="参保人姓名" sortable width="180"></el-table-column>
          <el-table-column prop="idcard" label="参保人身份证号" sortable width="180"></el-table-column>
          <el-table-column prop="contactName" label="联系人姓名" sortable width="180"></el-table-column>
          <el-table-column prop="contactPhone" label="联系人电话" sortable width="180"></el-table-column>
          <el-table-column prop="relationshipInsUser" label="与参保人关系" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="参保人联系地址" sortable width="400"></el-table-column>
          <el-table-column  label="预约评估时间" sortable width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.appointedTime">
                {{$moment(scope.row.appointedTime).format("YYYY-MM-DD HH:mm:ss")}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="assessAdress" label="预约评估地址" sortable width="400"></el-table-column>
          <el-table-column prop="assessOrgName" label="评估机构" sortable width="180"></el-table-column>
          <el-table-column prop="fullnameA" label="评估师A姓名" sortable width="180"></el-table-column>
          <el-table-column prop="workPhoneA" label="评估A电话" sortable width="180"></el-table-column>
          <el-table-column prop="fullnameB" label="评估B姓名" sortable width="180"></el-table-column>
          <el-table-column prop="workPhoneB" label="评估B电话" sortable width="180"></el-table-column>
          <el-table-column prop="orderCost" label="评估费用" sortable width="180"></el-table-column>
          <el-table-column  label="创建时间" sortable width="180">

            <template slot-scope="scope">
              <div v-if="scope.row.createdTime">
                {{$moment(scope.row.createdTime).format("YYYY-MM-DD HH:mm:ss")}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click.stop="ordDetail(scope.$index, scope.row)"
              >工单详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- <div class="block">
        <el-pagination
                                                                                                  @size-change    = "handleSizeChange"
                                                                                                  @current-change = "handleCurrentChange"
                                                                                                :current-page     = "currentPage"
                                                                                                :page-sizes       = "pageSize"
                                                                                                :page-size        = "100"
                                                                                                  layout          = "total, sizes, prev, pager, next, jumper"
                                                                                                :total            = "total"
        ></el-pagination>
      </div> -->
      <!-- 模态框 -->
      <el-dialog
        :title="proptype"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分配的模态框 -->
      <div class="modal" id="fenpeimodal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeModal('fenpeimodal')">&times;</button>
              <h4 class="modal-title" id="myModalLabel">分配评估机构</h4>
            </div>
            <div class="modal-body">
              <el-form
                :model="ruleFormFenpei"
                status-icon
                :rules="rulesFenpei"
                ref="ruleFormFenpei"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="分配给：" prop="orgCom">
                  <el-select
                    v-model="ruleFormFenpei.orgCom"
                    placeholder="请选择评估机构"
                    style="width:100%;float:left;"
                  >
                    <el-option
                      v-for="(item,index) in orgNameList"
                      :label="[item.orgName]+'-'+[item.orgCode]"
                      :value="item.orgId"
                      :key="index"
                    >{{item.orgName}}-{{item.orgCode}}</el-option>
                  </el-select>

                </el-form-item>

                <el-form-item>
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
      <!-- <el-dialog
                                                                                                title       = "分配评估机构"
                                                                                              :visible.sync = "dialogVisible1"
                                                                                                width       = "30%"
                                                                                              :before-close = "handleClose1"
      >

        <el-form
          :model = "ruleFormFenpei"
          status-icon
          :rules        = "rulesFenpei"
            ref         = "ruleFormFenpei"
            label-width = "100px"
            class       = "demo-ruleForm"
        >
          <el-form-item
            label = "分配给："
            prop  = "orgCom"
          >
            <el-select
              v-model     = "ruleFormFenpei.orgCom"
              placeholder = "请选择评估机构"
              style       = "width:100%;float:left;"
            >
              <el-option
                                                                                                        v-for = "(item,index) in orgNameList"
                                                                                                      :label  = "item.orgName"
                                                                                                      :value  = "item.orgId"
                                                                                                      :key    = "index"
              >
                {{item.orgName}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
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
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button
            type   = "primary"
            @click = "dialogVisible1 = false"
          >确 定</el-button>
        </span>
      </el-dialog>-->

      <!-- 指派的模态框 -->
      <div class="modal" id="zhipaimodal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeModal('zhipaimodal')">&times;</button>
              <h4 class="modal-title" id="myModalLabel">指派评估人员</h4>
            </div>
            <div class="modal-body">
              <el-form
                :model="ruleFormZhipai"
                status-icon
                :rules="rulesZhipai"
                ref="ruleFormZhipai"
                label-width="180px"
                class="demo-ruleForm"
              >
                <el-form-item label="评估员A：" prop="peopleA">
                  <el-select v-model="peopleA" placeholder="请选择评估员A" style="width:60%;float:left;">
                    <el-option
                      v-for="(item,index) in zhipaiData1"
                      :label="item.fullname"
                      :value="item.userId"
                      :key="index"
                    >{{item.fullname}}</el-option>
                  </el-select>
                  <span>{{peopleAOrg}}</span>
                </el-form-item>
                <el-form-item label="评估员B：" prop="peopleB">
                  <el-select v-model="peopleB" placeholder="请选择评估员B" style="width:60%;float:left;">
                    <el-option
                      v-for="(item,index) in zhipaiData2"
                      :label="item.fullname"
                      :value="item.userId"
                      :key="index"
                    >{{item.fullname}}</el-option>
                  </el-select>
                  <span>{{peopleBOrg}}</span>
                </el-form-item>
                <el-form-item label="预约评估时间:" prop="assessTime">
                  <el-date-picker
                    v-model="ruleFormZhipai.assessTime"
                    type="datetime"
                    placeholder="请选择预约时间"
                    style="width:60%;float:left;"
                    :picker-options="pickerOptions0"
                  ></el-date-picker>

                  <!-- <el-date-picker
              v-model      = "ruleFormZhipai.assessTime"
              type         = "datetime"
              placeholder  = "请选择预约的时间"
              style        = "width:100%;"
              format       = "yyyy年MM月dd日 hh时mm分ss秒"
              value-format = "yyyy-MM-dd hh-mm-ss"
            >
                  </el-date-picker>-->
                </el-form-item>
                <el-form-item label="预约评估地址（省市区）:" prop="address" style="width:100%;display:block;">
                  <my-area v-model="ruleFormZhipai.address" ref="area" style="float:left;"></my-area>
                </el-form-item>
                <el-form-item
                  label="预约评估地址（详细地址）:"
                  prop="addressInfo"
                  style="width:100%;display:block,"
                >
                  <el-input v-model="ruleFormZhipai.addressInfo" placeholder="请输入详细地址"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitFormZhipai('ruleFormZhipai')">提交</el-button>
                  <!-- <el-button @click="resetFormZhipai('ruleFormZhipai')">重置</el-button> -->
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
      <!-- <el-dialog
                                                                                                title       = "指派"
                                                                                              :visible.sync = "dialogVisible2"
                                                                                                width       = "30%"

                          :before-close = "handleClose2"
      >

        <el-form
          :model = "ruleFormZhipai"
          status-icon
          :rules        = "rulesZhipai"
            ref         = "ruleFormZhipai"
            label-width = "180px"
            class       = "demo-ruleForm"
        >
          <el-form-item
            label = "评估员A："
            prop  = "peopleA"
          >
            <el-select
              v-model     = "peopleA"
              placeholder = "请选择评估员A"
              style       = "width:60%;float:left;"
            >
              <el-option
                                                                                                        v-for = "(item,index) in zhipaiData1"
                                                                                                      :label  = "item.fullname"
                                                                                                      :value  = "item.userId"
                                                                                                      :key    = "index"
              >
                {{item.fullname}}
              </el-option>
            </el-select>
            <span>{{peopleAOrg}}</span>
          </el-form-item>
          <el-form-item
            label = "评估员B："
            prop  = "peopleB"
          >
            <el-select
              v-model     = "peopleB"
              placeholder = "请选择评估员B"
              style       = "width:60%;float:left;"
            >
              <el-option
                                                                                                                  v-for = "(item,index) in zhipaiData2"
                                                                                                                :label  = "item.fullname"
                                                                                                                :value  = "item.userId"
                                                                                                                :key    = "index"
              >
                {{item.fullname}}
              </el-option>
            </el-select>
            <span>{{peopleBOrg}}</span>
          </el-form-item>
          <el-form-item
            label = "预约评估时间:"
            prop  = "assessTime"
          >
            <el-date-picker
                                                                                          v-model       = "ruleFormZhipai.assessTime"
                                                                                          type          = "datetime"
                                                                                          placeholder   = "请选择预约时间"
                                                                                          style         = "width:60%;float:left;"
                                                                                        :picker-options = "pickerOptions0"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label = "预约评估地址（省市区）:"
            prop  = 'address'
            style = "width:100%;display:block;"
          >
            <my-area
              v-model = "ruleFormZhipai.address"
              ref     = "area"
              style   = "float:left;"
            ></my-area>
          </el-form-item>
          <el-form-item
            label = "预约评估地址（详细地址）:"
            prop  = "addressInfo"
            style = "width:100%;display:block,"
          >
            <el-input
              v-model     = "ruleFormZhipai.addressInfo"
              placeholder = "请输入详细地址"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type   = "primary"
              @click = "submitFormZhipai('ruleFormZhipai')"
            >提交</el-button>
            <el-button @click="resetFormZhipai('ruleFormZhipai')">重置</el-button>
          </el-form-item>
        </el-form>
        <span
          slot  = "footer"
          class = "dialog-footer"
          hidden
        >
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button
            type   = "primary"
            @click = "dialogVisible2 = false"
          >确 定</el-button>
        </span>
      </el-dialog>-->

      <!-- 取消的模态框 -->
      <div class="modal" id="cancelmodal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeModal('cancelmodal')">&times;</button>
              <h4 class="modal-title" id="myModalLabel">取消</h4>
            </div>
            <div class="modal-body">
              <el-form
                :model="ruleFormCancel"
                status-icon
                :rules="rulesCancel"
                ref="ruleFormCancel"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="取消理由：" prop="cancelWhy">
                  <el-input v-model="ruleFormCancel.cancelWhy" placeholder="请输入取消工单的理由"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitFormCancel('ruleFormCancel')">提交</el-button>
                  <!-- <el-button @click="resetFormCancel('ruleFormCancel')">重置</el-button> -->
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
      <!-- <el-dialog
                                                                                                          title       = "取消工单"
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
            label = "取消理由："
            prop  = "cancelWhy"
          >

            <el-input
              v-model     = "ruleFormCancel.cancelWhy"
              placeholder = "请输入取消工单的理由"
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

      <!-- 评定等级的模态框 -->
      <div class="modal" id="pingjimodal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeModal('pingjimodal')">&times;</button>
              <h4 class="modal-title" id="myModalLabel">评定等级</h4>
            </div>
            <div class="modal-body">
              <el-form
                :model="ruleFormPingji"
                status-icon
                :rules="rulesPingji"
                ref="ruleFormPingji"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="等级为：" prop="level">
                  <el-select
                    v-model="ruleFormPingji.level"
                    placeholder="请选择该工单所属等级"
                    style="width:86%;float:left;"
                  >
                    <el-option :label="0" :value="0"></el-option>
                    <el-option :label="1" :value="1"></el-option>
                    <el-option :label="2" :value="2"></el-option>
                    <el-option :label="3" :value="3"></el-option>
                    <el-option :label="4" :value="4"></el-option>
                    <el-option :label="5" :value="5"></el-option>
                    <el-option :label="6" :value="6"></el-option>
                  </el-select>
                  <span style="display:inline-block;float:left;">&nbsp;&nbsp;&nbsp;&nbsp;级</span>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitFormPingji('ruleFormPingji')">提交</el-button>
                  <!-- <el-button @click="resetFormPingji('ruleFormPingji')">重置</el-button> -->
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
      <!-- <el-dialog
                                                                                                          title       = "评定等级"
                                                                                                        :visible.sync = "dialogVisible4"
                                                                                                          width       = "30%"
                                                                                                        :before-close = "handleClose4"
      >

        <el-form
          :model = "ruleFormPingji"
          status-icon
          :rules        = "rulesPingji"
            ref         = "ruleFormPingji"
            label-width = "100px"
            class       = "demo-ruleForm"
        >
          <el-form-item
            label = "等级为："
            prop  = "level"
          >

            <el-select
              v-model     = "ruleFormPingji.level"
              placeholder = "请选择该工单所属等级"
              style       = "width:86%;float:left;"
            >
              <el-option
                :label = '0'
                :value = '0'
              ></el-option>
              <el-option
                :label = '1'
                :value = '1'
              ></el-option>
              <el-option
                :label = '2'
                :value = '2'
              ></el-option>
              <el-option
                :label = '3'
                :value = '3'
              ></el-option>
              <el-option
                :label = '4'
                :value = '4'
              ></el-option>
              <el-option
                :label = '5'
                :value = '5'
              ></el-option>
              <el-option
                :label = '6'
                :value = '6'
              ></el-option>

            </el-select>
            <span style="display:inline-block;float:left;">&nbsp;&nbsp;&nbsp;&nbsp;级</span>

          </el-form-item>

          <el-form-item>
            <el-button
              type   = "primary"
              @click = "submitFormPingji('ruleFormPingji')"
            >提交</el-button>
            <el-button @click="resetFormPingji('ruleFormPingji')">重置</el-button>
          </el-form-item>
        </el-form>
        <span
          slot  = "footer"
          class = "dialog-footer"
          hidden
        >
          <el-button @click="dialogVisible4 = false">取 消</el-button>
          <el-button
            type   = "primary"
            @click = "dialogVisible4 = false"
          >确 定</el-button>
        </span>
      </el-dialog>-->

      <!-- 审核的模态框 -->
      <div class="modal" id="shenhemodal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeModal('shenhemodal')">&times;</button>
              <h4 class="modal-title" id="myModalLabel">审核</h4>
            </div>
            <div class="modal-body">
              <el-form
                :model="ruleFormShenhe"
                status-icon
                :rules="rulesShenhe"
                ref="ruleFormShenhe"
                label-width="100px"
                class="demo-ruleForm"
                style="text-align:left;"
              >
                <el-form-item label="审核结果为：" prop="result">
                  <el-radio-group v-model="ruleFormShenhe.result">
                    <el-radio :label="1">审核通过</el-radio>
                    <el-radio :label="0">审核不通过</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitFormShenhe('ruleFormShenhe')">提交</el-button>
                  <!-- <el-button @click="resetFormShenhe('ruleFormShenhe')">重置</el-button> -->
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
      <!-- <el-dialog
                                                                                                          title       = "审核结果"
                                                                                                        :visible.sync = "dialogVisible5"
                                                                                                          width       = "20%"
                                                                                                        :before-close = "handleClose5"
      >

        <el-form
          :model = "ruleFormShenhe"
          status-icon
          :rules        = "rulesShenhe"
            ref         = "ruleFormShenhe"
            label-width = "100px"
            class       = "demo-ruleForm"
            style       = "text-align:left;"
        >
          <el-form-item
            label = "审核结果为："
            prop  = "result"
          >
            <el-radio-group v-model="ruleFormShenhe.result">
              <el-radio :label="1">审核通过</el-radio>
              <el-radio :label="0">审核不通过</el-radio>

            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button
              type   = "primary"
              @click = "submitFormShenhe('ruleFormShenhe')"
            >提交</el-button>
            <el-button @click="resetFormShenhe('ruleFormShenhe')">重置</el-button>
          </el-form-item>
        </el-form>
        <span
          slot  = "footer"
          class = "dialog-footer"
          hidden
        >
          <el-button @click="dialogVisible5 = false">取 消</el-button>
          <el-button
            type   = "primary"
            @click = "dialogVisible5 = false"
          >确 定</el-button>
        </span>
      </el-dialog>-->

      <!-- 状态的提示框 -->
      <el-dialog
        title="工单状态记录"
        :visible.sync="dialogVisibleStatus"
        width="40%"
        :before-close="handleCloseStatus"
      >
        <el-table
          :data="tableData1"
          height="300"
          border
          stripe
          highlight-current-row
          style="width: 100% ;text-align:left;overflow:auto;"
          :default-sort="{prop: 'date', order: 'descending'}"
          size="mini"
          @cell-click="rowclick"
          :row-style='rowStyle'
          id="orderStatus1"
        >
          <el-table-column prop="orderNewStatus" label="状态" width="160" sortable></el-table-column>
          <el-table-column prop="updatedTime" label="时间" width="170" sortable></el-table-column>
          <el-table-column prop="updatedUserName" label="操作人员" width="170" sortable></el-table-column>
          <el-table-column prop="changeComment" label="要执行操作" width="220" sortable></el-table-column>
        </el-table>
        <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleStatus = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisibleStatus = false">确 定</el-button>
        </span>-->
      </el-dialog>
    </div>
    <div class="pageNation" style="height:5%;margin-top:10px;">
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
import base from "../../base/base";
import myArea from "./area.vue";
export default {
  components: {
    myArea: myArea
  },
  mixins: [base],
  data() {
    return {
      module: "order_mng",
      tableData: [],
      // 工单状态的数据
      tableData1: [],
      dialogVisible: false,
      proptype: "新增操作",
      orderForm: {
        orderNo: "",
        selectStatus: "",
        appleyUserName: "",
        contactName: "",
        idcard: "",
        assessNameLike: "",
        addressLike: "",
        pickDate:''
      },

      //分配弹出框
      dialogVisible1: false,
      ruleFormFenpei: {
        orgCom: ""
      },
      orgComBM:'',
      rulesFenpei: {},
      orderNo: null,
      orgNameList: [],

      // 指派的弹出框
      dialogVisible2: false,
      ruleFormZhipai: {
        assessTime: null,
        address: null,
        addressInfo: null
      },
      peopleA: null,
      peopleB: null,
      peopleAOrg: "",
      peopleBOrg: "",
      rulesZhipai: {},

      // 取消工单相关
      dialogVisible3: false,
      ruleFormCancel: {
        cancelWhy: null
      },
      rulesCancel: {},

      // 评定等级相关
      dialogVisible4: false,
      ruleFormPingji: {
        level: null
      },
      rulesPingji: {},

      // 审核工单相关
      dialogVisible5: false,
      ruleFormShenhe: {
        result: null
      },
      rulesShenhe: {},

      // 工单状态展示
      dialogVisibleStatus: false,

      // 指派的Data
      zhipaiData1: [],
      zhipaiData2: [],

      // 权限分配时相关
      urlRole9: 0,
      urlRole8: 0,
      urlRole5: 0,
      urlRole6: 0,
      urlRole10: 0,

      // 工单管理定时刷新
      timer: null,

      // 工单指派的时间问题
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  watch: {
    peopleA: function() {
      for (var item of this.zhipaiData1) {
        if (item.userId == this.peopleA) {
          this.peopleAOrg = item.orgName;
        }
      }
    },
    peopleB: function() {
      for (var item of this.zhipaiData2) {
        if (item.userId == this.peopleB) {
          this.peopleBOrg = item.orgName;
        }
      }
    },
  },
  methods: {
    // 工单状态样式的回调
    rowStyle({row,rowIndex}){
      // console.log(this.tableData1.length,rowIndex)
      if(rowIndex+1==this.tableData1.length){
        return 'color:#67C23A;font-weight:600;'
      }
    },
    // 在ie下弹出框关闭兼容
    closeModal(id){
      $('#'+id).hide();
    },
    // 工单状态相关
    handleCloseStatus(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    changeSelect(val) {
      // console.log(this.orderForm.select)
    },
    dataList(data) {
      if (Array.isArray(data)) {
        var newdata = [];
        var newdata1 = [];
        var dataArray = data;
        dataArray.forEach(el => {
          if (el.appointedTime) {
            //时间戳转换
            newdata.push(
              this.$moment(el.appointedTime).format("YYYY-MM-DD HH:mm:ss")
            );
          } else {
            newdata.push(null);
          }
          if (el.createdTime) {
            //时间戳转换
            newdata1.push(
              this.$moment(el.createdTime).format("YYYY-MM-DD HH:mm:ss")
            );
          } else {
            newdata1.push(null);
          }

          //转换工单状态
          if (el.orderStatus == 0) {
            el.orderStatus = "待分配";
          } else if (el.orderStatus == -1) {
            el.orderStatus = "参保人取消";
          } else if (el.orderStatus == -2) {
            el.orderStatus = "拒接单";
          } else if (el.orderStatus == -3) {
            el.orderStatus = "系统取消";
          } else if (el.orderStatus == 1) {
            el.orderStatus = "已完成";
          } else if (el.orderStatus == 2) {
            el.orderStatus = "待接单";
          } else if (el.orderStatus == 3) {
            el.orderStatus = "待评估";
          } else if (el.orderStatus == 4) {
            el.orderStatus = "正在评估";
          } else if (el.orderStatus == 5) {
            el.orderStatus = "评估师A完成";
          } else if (el.orderStatus == 6) {
            el.orderStatus = "已评估";
          } else if (el.orderStatus == 8) {
            el.orderStatus = "待指派";
          } else if (el.orderStatus == 10) {
            el.orderStatus = "待审核";
          } else if (el.orderStatus == 11) {
            el.orderStatus = "审核不通过";
          }

          //工单类型转换

          // if (el.isFollowAssess==1 || el.isReAssess=='1') {
          //   el.isReAssess = "持续评估";
          // }else
          if(el.isReAssess==1 || el.isReAssess=='1'){
            el.isReAssess='复评'
          }else{
            el.isReAssess = "初评";
          }
          // 转换工单来源
          if (el.applyFrom == 1) {
            el.applyFrom = "WEB端";
          } else if (el.applyFrom == 2) {
            el.applyFrom = "微信公众号";
          } else if (el.applyFrom == 3) {
            el.applyFrom = "xml导入";
          } else if (el.applyFrom == 4) {
            el.applyFrom = "政务网";
          } else if (el.applyFrom == 5) {
            el.applyFrom = "居民端";
          } else {
            el.applyFrom = "未知";
          }

          //转换与参保人关系
          if (el.relationshipInsUser == 0) {
            el.relationshipInsUser = "自己";
          } else if (el.relationshipInsUser == 1) {
            el.relationshipInsUser = "子女";
          } else if (el.relationshipInsUser == 2) {
            el.relationshipInsUser = "父母";
          } else if (el.relationshipInsUser == 3) {
            el.relationshipInsUser = "配偶";
          } else if (el.relationshipInsUser == 4) {
            el.relationshipInsUser = "表兄弟妹";
          } else if (el.relationshipInsUser == 5) {
            el.relationshipInsUser = "朋友";
          } else if (el.relationshipInsUser == 6) {
            el.relationshipInsUser = "其他";
          }

          //联系地址拼接转换
          var appointedProvince = el.appointedProvince.split("-")[1];
          var appointedCity = el.appointedCity.split("-")[1];
          var appointedDistrict = el.appointedDistrict.split("-")[1];
          var appointedAddress  = el.appointedAddress;
              el.address        =
            appointedProvince +
            " " +
            appointedCity +
            " " +
            appointedDistrict +
            " " +
            appointedAddress;

          //评估联系地址拼接
          var appointedAssessProvince = null;
          var appointedAssessCity = null;
          var appointedAssessDistrict = null;
          var appointedAssessAddress = null;
          if (el.appointedAssessProvince) {
            appointedAssessProvince = el.appointedAssessProvince.split("-")[1];
          } else {
            appointedAssessProvince = "";
          }
          if (el.appointedAssessCity) {
            appointedAssessCity = el.appointedAssessCity.split("-")[1];
          } else {
            appointedAssessCity = "";
          }
          if (el.appointedAssessDistrict) {
            appointedAssessDistrict = el.appointedAssessDistrict.split("-")[1];
          } else {
            appointedAssessDistrict = "";
          }
          if (el.appointedAssessAddress) {
            appointedAssessAddress = el.appointedAssessAddress;
          } else {
            appointedAssessAddress = "";
          }

          el.assessAdress =
            appointedAssessProvince +
            " " +
            appointedAssessCity +
            " " +
            appointedAssessDistrict +
            " " +
            appointedAssessAddress;
        });
        var appointedTime = "appointedTime";
        var createdTime = "createdTime";
        this.transform(dataArray, newdata, appointedTime);
        this.transform(dataArray, newdata1, createdTime);
        this.tableData = dataArray;
      } else {
        // console.log("返回数据" + data);
        this.tableData = [];
        this.$alert("暂无数据！");
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    rowclick(row, column, cell, event) {
      if (column.label == "工单状态") {
        console.log(row);
        this.$axios({
          url: `${
            this.$store.state.globalRouter
          }/auth/core/app_log_mng/load_change_log_by_order_no?orderNo=${
            encodeURI(row.orderNo)
          }`,
          method: "get"
        }).then(res => {
          var dataArray = res.data.data;
          dataArray.forEach(el => {
            if (el.updatedTime) {
              //时间戳转换
              el.updatedTime = this.$moment(el.updatedTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            }
            //转换工单状态
            if (el.orderNewStatus == 0) {
              el.orderNewStatus = "待分配";
            } else if (el.orderNewStatus == -1) {
              el.orderNewStatus = "参保人取消";
            } else if (el.orderNewStatus == -2) {
              el.orderNewStatus = "拒接单";
            } else if (el.orderNewStatus == -3) {
              el.orderNewStatus = "系统取消";
            } else if (el.orderNewStatus == 1) {
              el.orderNewStatus = "已完成";
            } else if (el.orderNewStatus == 2) {
              el.orderNewStatus = "待接单";
            } else if (el.orderNewStatus == 3) {
              el.orderNewStatus = "待评估";
            } else if (el.orderNewStatus == 4) {
              el.orderNewStatus = "正在评估";
            } else if (el.orderNewStatus == 5) {
              el.orderNewStatus = "评估师A完成";
            } else if (el.orderNewStatus == 6) {
              el.orderNewStatus = "已评估";
            } else if (el.orderNewStatus == 8) {
              el.orderNewStatus = "待指派";
            } else if (el.orderNewStatus == 10) {
              el.orderNewStatus = "待审核";
            } else if (el.orderNewStatus == 11) {
              el.orderNewStatus = "审核不通过";
            }
          });
          this.tableData1 = dataArray;
          this.dialogVisibleStatus = true;
        });
      }
    },
    ordDetail(index, row) {
      //工单详情
      // console.log('1',row);
      this.$store.state.appleyUserId = row.appleyUserId;
      this.$store.state.orderNo = row.orderNo;
      this.$store.state.orderLevel = row.assessedLevel;
      this.$store.state.insUserIdCard = row.idcard;
      this.$store.state.appleyUserName = row.appleyUserName;

      window.localStorage.setItem("appleyUserId", row.appleyUserId);
      window.localStorage.setItem("orderNo", row.orderNo);
      window.localStorage.setItem("orderLevel", row.assessedLevel);
      window.localStorage.setItem("insUserIdCard", row.idcard);
      window.localStorage.setItem("appleyUserName", row.appleyUserName);

      // console.log('111',row);
      this.$router.push({ path: "/orderMng/order_detail" });
    },
    // ------导出成excel文件-------
    exportExcel() {
      let addr = `${
        this.$store.state.globalRouter
      }/auth/assess/order_mng/export_excel?orderNo=${
        this.orderForm.orderNo
      }&orderStatus=${this.orderForm.selectStatus}&appleyUserName=${
        this.orderForm.appleyUserName
      }&contactName=${this.orderForm.contactName}&assessNameLike=${
        this.orderForm.assessNameLike
      }&addressLike=${this.orderForm.addressLike}&idcard=${
        this.orderForm.idcard
      }&createdTimeBegin=${encodeURI(this.orderForm.pickDate?this.orderForm.pickDate[0]:'')}&createdTimeEnd=${encodeURI(this.orderForm.pickDate?this.orderForm.pickDate[1]:"")}`;
      // console.log(addr)
      window.location.href = addr;
      // this.$axios({
      //   url   : addr,
      //   method: "get"
      // }).then(res => {

      // });
    },
    testData() {
      window.location.href =
        "http://localhost:9003/insurance_intact_cms_war/auth/assess/order_mng/exportAssessLevel";
    },
    exportData() {
      //       orderNo:
      // orderStatus: 3
      // appleyUserName:
      // contactName:
      // assessNameLike:
      // idcard:
      // addressLike:
      // iDisplayStart: 0
      // iDisplayLength: 10
      // orderStr:
      let addr = `${
        this.$store.state.globalRouter
      }/auth/assess/order_mng/data?orderNo=${
        this.orderForm.orderNo
      }&orderStatus=${this.orderForm.selectStatus}&appleyUserName=${
        this.orderForm.appleyUserName
      }&contactName=${this.orderForm.contactName}&assessNameLike=${
        this.orderForm.assessNameLike
      }&addressLike=${this.orderForm.addressLike}&idcard=${
        this.orderForm.idcard
      }&createdTimeBegin=${encodeURI(this.orderForm.pickDate?this.orderForm.pickDate[0]:'')}&createdTimeEnd=${encodeURI(this.orderForm.pickDate?this.orderForm.pickDate[1]:'')}`;
      // console.log(addr)
      window.location.href = addr;
    },
    exportAData() {
      let addr = `${
        this.$store.state.globalRouter
      }/auth/assess/basic_info_mng/assessment_questionnaire_a_excel_out`;
      window.location.href = addr;
    },
    exportBData() {
      let addr = `${
        this.$store.state.globalRouter
      }/auth/assess/basic_info_mng/assessment_questionnaire_b_excel_out`;
      window.location.href = addr;
    },
    // --------------删除工单----------
    deleteData() {
      this.$prompt("请输入工单号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d{15}$/,
        inputErrorMessage: "请输入15位工单号"
      })
        .then(({ value }) => {
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/assess/order_mng/del_order_no?orderNo=${encodeURI(value)}`,
            method: "get"
          }).then(res => {
            this.$options.methods.getReloadData(this);
            alert("删除成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    // 搜索工单
    searchData() {
      this.$store.state.orderNoInfo = this.orderForm.orderNo;
      this.$store.state.selectStatus = this.orderForm.selectStatus;

      this.$store.state.appleyUserName = this.orderForm.appleyUserName;
      this.$store.state.contactName = this.orderForm.contactName;
      this.$store.state.idcard = this.orderForm.idcard;
      this.$store.state.assessNameLike = this.orderForm.assessNameLike;
      this.$store.state.addressLike = this.orderForm.addressLike;
      if(this.orderForm.pickDate){
        this.$store.state.createdTimeBegin=this.orderForm.pickDate[0];
        this.$store.state.createdTimeEnd=this.orderForm.pickDate[1];
      }else{
        this.$store.state.createdTimeBegin="";
        this.$store.state.createdTimeEnd="";
      }

      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/assess/order_mng/pagination?orderNo=${
          encodeURI(this.orderForm.orderNo)
        }&orderStatus=${encodeURI(this.orderForm.selectStatus)}&appleyUserName=${
          encodeURI(this.orderForm.appleyUserName)
        }&appleyUserIdNo=${encodeURI(this.orderForm.idcard)}&addressLike=${
          encodeURI(this.orderForm.addressLike)
        }&contactName=${encodeURI(this.orderForm.contactName)}&assessNameLike=${
          encodeURI(this.orderForm.assessNameLike)
        }&pageSize=${encodeURI(this.changePageSize)}&pageNo=1&createdTimeBegin=${encodeURI(this.orderForm.pickDate?this.orderForm.pickDate[0]:'')}&createdTimeEnd=${encodeURI(this.orderForm.pickDate?this.orderForm.pickDate[1]:'')}`,
        method: "get"
      }).then(res => {
        // console.log("1", res.data.resultList);

        this.dataList(res.data.resultList);
        this.total = res.data.totalCount;
        this.currentPage = 1;
      });
    },

    //工单进行的操作
    // 分配工单相关
    fenpei(orderNo) {
      // this.dialogVisible1 = true;
      $("#fenpeimodal").modal("show");
      this.orderNo = orderNo;
    },
    handleClose1(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 分配工单弹出框相关
    submitFormFenpei(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.orderNo, this.ruleFormFenpei.orgCom);
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/assess/order_mng/distribute_org?orderNo=${
              encodeURI(this.orderNo)
            }&distriOrgId=${encodeURI(this.ruleFormFenpei.orgCom)}`,
            method: "get"
          }).then(res => {
            if (res.data.resultCode == "000000") {
              $("#fenpeimodal").modal("hide");
              this.$options.methods.getReloadData(this);
              alert("分配成功");
            } else {
              $("#fenpeimodal").modal("hide");
              alert("分配失败：" + res.data.resultMsg);
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormFenpei(formName) {
      this.$refs[formName].resetFields();
    },

    // 指派工单相关
    zhipai(orderNo,row) {
      // this.dialogVisible2 = true;
      $("#zhipaimodal").modal("show");
      this.orderNo = orderNo;
      if(this.zhipaiData1.length){
        this.peopleA = this.zhipaiData1[0].userId;
      }else{
        this.peopleA="";
      }
      if(this.zhipaiData2.length){
        this.peopleB = this.zhipaiData2[0].userId;
      }else{
        this.peopleB="";
      }
      for (var item of this.$refs.area.provinceL) {
        if(row.appointedProvince){
          if(item.regionId==row.appointedProvince.split('-')[0]){
            this.$refs.area.selected = item.regionId;
            this.$refs.area.provinceName = item.regionName;
            if(row.appointedCity){
              this.$refs.area.citySelected = row.appointedCity.split('-')[0];
              this.$refs.area.cityName = row.appointedCity.split('-')[1];
            }
            if(row.appointedDistrict){
              this.$refs.area.areaSelected = row.appointedDistrict.split('-')[0];
              this.$refs.area.areaName = row.appointedDistrict.split('-')[1];
            }
          }
        }
      }
      // console.log(row.appointedProvince,row.appointedCity,row.appointedDistrict,row.appointedAddress);
      if(row.appointedAddress){
        this.ruleFormZhipai.addressInfo=row.appointedAddress
      }

    },
    // zhipai(orderNo) {
    //   // this.dialogVisible2 = true;
    //   $("#zhipaimodal").modal("show");
    //   this.orderNo = orderNo;
    //   this.peopleA = this.zhipaiData1[0].userId;
    //   this.peopleB = this.zhipaiData2[0].userId;
    // },
    handleClose2(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 指派工单弹出框相关
    submitFormZhipai(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleFormZhipai.assessTime) {
            var time = this.$moment(this.ruleFormZhipai.assessTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
             // console.log(this.$refs.area)
          var province =
            this.$refs.area.selected + "-" + this.$refs.area.provinceName;
          var city =
            this.$refs.area.citySelected + "-" + this.$refs.area.cityName;
          var area =
            this.$refs.area.areaSelected + "-" + this.$refs.area.areaName;
          if(this.ruleFormZhipai.addressInfo==null || this.ruleFormZhipai.addressInfo==''){
            this.ruleFormZhipai.addressInfo=''
          }
          // console.log(province,city,area);
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/assess/order_mng/distribute_order?orderNo=${
              encodeURI(this.orderNo)
            }&userIdA=${encodeURI(this.peopleA)}&userIdB=${
              encodeURI(this.peopleB)
            }&appointedTime=${encodeURI(time)}&appointedAssessProvince=${encodeURI(province)}&appointedAssessCity=${encodeURI(city)}&appointedAssessDistrict=${encodeURI(area)}&appointedAssessAddress=${
              encodeURI(this.ruleFormZhipai.addressInfo)
            }`,
            method: "get"
          }).then(res => {
            if(res.data.resultCode=='000000'){
              $('#zhipaimodal').modal('hide');
            this.$options.methods.getReloadData(this);
            alert("指派成功");
            }else{
              $('#zhipaimodal').modal('hide');
            alert("指派失败"+res.data.resultMsg);
            }
          });
          }else{
            alert('请选择预约评估时间')
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormZhipai(formName) {
      this.$refs[formName].resetFields();
    },

    //工单进行的操作
    // 取消工单相关
    cancel(orderNo) {
      // this.dialogVisible3 = true;
      $("#cancelmodal").modal("show");
      this.orderNo = orderNo;
    },
    handleClose3(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 取消工单弹出框相关
    submitFormCancel(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.orderNo, this.ruleFormCancel.cancelWhy);
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/assess/order_mng/set_status_cancel?orderNo=${
              encodeURI(this.orderNo)
            }&status=-3&comment=${encodeURI(this.ruleFormCancel.cancelWhy)}`,
            method: "get"
          }).then(res => {
            if (res.data.resultCode == "000000") {
              this.$options.methods.getReloadData(this);
              $("#cancelmodal").modal("hide");

              alert("取消成功");
            } else {
              $("#cancelmodal").modal("hide");
              alert("取消失败" + res.data.resultMsg);
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

    // 评定工单等级相关
    pingji(orderNo) {
      $("#pingjimodal").modal("show");
      // this.dialogVisible4 = true;
      this.orderNo = orderNo;
    },
    handleClose4(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 评定等级弹出框相关
    submitFormPingji(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.orderNo, this.ruleFormPingji.level);
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/assess/order_mng/set_order_level?level=${
              encodeURI(this.ruleFormPingji.level)
            }&orderNo=${encodeURI(this.orderNo)}`,
            method: "get"
          }).then(res => {
            if (res.data.resultCode == "000000") {
              this.$options.methods.getReloadData(this);
              // this.dialogVisible4 = false;
              $("#pingjimodal").modal("hide");
              alert("评级成功");
            } else {
              // this.dialogVisible4 = false;
              $("#pingjimodal").modal("hide");
              alert("评级失败" + res.data.resultMsg);
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormPingji(formName) {
      this.$refs[formName].resetFields();
    },

    // 审核工单相关
    shenhe(orderNo) {
      // this.dialogVisible5 = true;
      $("#shenhemodal").modal("show");
      this.orderNo = orderNo;
    },
    handleClose5(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 审核工单弹出框相关
    submitFormShenhe(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.orderNo, this.ruleFormShenhe.result);
          if (this.ruleFormShenhe.result == 1) {
            this.$axios({
              method: "get",
              url: `${
                this.$store.state.globalRouter
              }/auth/assess/order_mng/set_audit_status?orderNo=${
                encodeURI(this.orderNo)
              }&auditStatus=0`
            }).then(res => {
              // console.log(res);
              if (res.data.resultCode == "000000") {
                this.$options.methods.getReloadData(this);
                // this.dialogVisible5 = false;
                $("#shenhemodal").modal("hide");

                alert("提交成功");
              } else {
                alert("提交失败" + res.data.resultMsg);
              }
            });
          } else if (this.ruleFormShenhe.result == 0) {
            this.$axios({
              method: "get",
              url: `${
                this.$store.state.globalRouter
              }/auth/assess/order_mng/set_audit_status?orderNo=${
                encodeURI(this.orderNo)
              }&auditStatus=11`
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.$options.methods.getReloadData(this);
                // this.dialogVisible5 = false;
                $("#shenhemodal").modal("hide");

                alert("提交成功");
              } else {
                alert("提交失败" + res.data.resultMsg);
              }
            });
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetFormShenhe(formName) {
      this.$refs[formName].resetFields();
    },

    // 显示工单流转详情
    showDetail(orderNo) {
      // console.log('123')
    },
    hiddenDetail(orderNo) {
      alert("leave");
    },

  },
  mounted() {
    // 清空存的值,搜索的时候可能会导致错误，因为记录了之前填入的值
    this.$store.state.orderNoInfo=''
    this.$store.state.selectStatus=''
    this.$store.state.appleyUserName=''
    this.$store.state.idcard=''
    this.$store.state.contactName=''
    this.$store.state.assessNameLike=''
    this.$store.state.addressLike=''
    this.$store.state.createdTimeBegin="";
    this.$store.state.createdTimeEnd="";



    this.getData();
    this.$axios({
      method: "get",
      url: `${
        this.$store.state.globalRouter
      }/auth/intact/intact_organization_mng/load_by_org_type?orgType=2`
    }).then(res => {
      // console.log('公司列表',res.data.data)
      this.orgNameList = res.data.data;
    });
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/intact/intact_staff_mng/load_staff_by_type_and_class?userType=2&userClass=1`,
      method: "get"
    }).then(res => {
      this.zhipaiData1 = res.data.data;
    });
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/intact/intact_staff_mng/load_staff_by_type_and_class?userType=2&userClass=2`,
      method: "get"
    }).then(res => {
      this.zhipaiData2 = res.data.data;
    });

    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "评估管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "core/order_mng") {
              console.log("工单管理", submenu[j]);
              // this.dataExtra1 = submenu[j].dataExtra1;
              // URL_ROLES[9] "dataExtra5": 0,
              // URL_ROLES[8] "dataExtra4": 0,
              // URL_ROLES[5] "dataExtra1": 0,
              // URL_ROLES[6] "dataExtra2": 0,
              // URL_ROLES[10] "dataExtra6": 0,
              // "dataExtra3": 0,

              this.urlRole9 = submenu[j].dataExtra5;
              this.urlRole8 = submenu[j].dataExtra4;
              this.urlRole5 = submenu[j].dataExtra1;
              this.urlRole6 = submenu[j].dataExtra2;
              this.urlRole10 = submenu[j].dataExtra6;
            }
          }
        }
      }
    }

    // 工单管理自动刷新
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.searchData();
      }, 60000);
    }
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>
<style scoped>
.el-pagination {
  text-align: left;
}
#app .el-table__empty-text {
  text-align: left;
  color: #909399;
}
.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 0px;
  vertical-align: top;
}
#app /deep/ .el-form-item__label {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
