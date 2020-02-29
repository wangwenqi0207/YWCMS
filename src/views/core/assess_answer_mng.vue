<template>
  <div style="padding:20px;height:100%;">
    <div style="background:#fff;padding:5px;height:95%;overflow:auto">
      <div el-row style="padding:10px;text-align: left;">
        <div el-col span="24" class="top">
          <el-button type="primary" size="small" @click.native="add" icon="el-icon-plus">新增</el-button>
          <el-button type="primary" size="small" @click.native="copyData" icon="el-icon-plus">拷贝</el-button>
          <el-button type="primary" size="small" @click.native="update" icon="el-icon-edit">修改</el-button>
          <el-button type="primary" size="small" @click.native="remove" icon="el-icon-delete">删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div el-row style="padding:10px;text-align: left;">
        <div el-col span="24" class="top">
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            size="mini"
            style="text-align:left;"
          >
            <el-form-item label="工单号:">
              <el-input v-model="searchForm.orderNumber" placeholder="请输入工单号" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetSearch" icon="el-icon-refresh">重置</el-button>
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
        height="100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orderNo" label="工单号" width="160"></el-table-column>
        <!-- <el-table-column
                                                                                                                                                                                                                                                                                                                                                                                                                                                          type  = "index"
                                                                                                                                                                                                                                                                                                                                                                                                                                                        :index  = "indexMethod"
                                                                                                                                                                                                                                                                                                                                                                                                                                                          width = "50"
        ></el-table-column>-->
        <el-table-column prop="insId" label="参保人ID" width="100"></el-table-column>
        <el-table-column prop="basicInfoId" label="回答基本信息" width="130"></el-table-column>
        <!-- <el-table-column
                                                                                                                                                                                                                                                                                                                                                                                                                                                          type  = "index"
                                                                                                                                                                                                                                                                                                                                                                                                                                                        :index  = "indexMethod"
                                                                                                                                                                                                                                                                                                                                                                                                                                                          width = "50"
                                                                                                                                                                                                                                                                                                                                                                                                                                                          label = "序号"
        ></el-table-column>-->
        <el-table-column prop="basicInfoTime" label="回答基本信息时间" width="180">
          <template slot-scope="scope">
            <p v-if="scope.row.basicInfoTime">
              {{scope.row.basicInfoTime}}
              <!-- {{$moment(scope.row.basicInfoTime).format('YYYY-MM-DD h:mm:ss')}} -->
            </p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column prop="basicInfoTotal" label="需要回答基本信息总数" width="180"></el-table-column>
        <el-table-column prop="basicCompletedNum" label="回答基本信息完成数量" width="180"></el-table-column>
        <el-table-column prop="isBasicCompleted" label="是否完成" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.isBasicCompleted">
              <span v-if="scope.row.isBasicCompleted==1 || scope.row.isBasicCompleted=='1'">已完成</span>
              <span v-else>未完成</span>
            </p>
            <p v-else></p>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop  = "optionText"
          label = "回答基本项目"
          width = "300"
        >
        <template slot-scope="scope">
            <p v-if='scope.row.optionText' :id="scope.row.id" data-toggle='popover' data-placement="bottom" data-container="body">
              {{scope.row.optionText.substring(0,15)+'......'}}
            </p>
            <p v-else></p>
          </template>
        </el-table-column>-->
        <el-table-column prop="questionBaseAnswerContent" label="回答基本项目" width="320">
          <template slot-scope="scope">
            <p
              v-if="scope.row.questionBaseAnswerContent && scope.row.questionBaseAnswerContent.length>20"
              style="color:#337ab7;cursor:pointer;"
              @click="detail(scope.row.questionBaseAnswerContent)"
            >{{scope.row.questionBaseAnswerContent.substring(0,20)+'...'}}</p>
            <p v-else>{{scope.row.questionBaseAnswerContent}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="questionBaseAnswerTime" label="回答基本项目时间" width="180">
          <template slot-scope="scope">
            <p
              v-if="scope.row.questionBaseAnswerTime"
            >{{$moment(scope.row.questionBaseAnswerTime).format('YYYY-MM-DD h:mm:ss')}}</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column prop="questionBaseTotal" label="需要回答基本项目总数" width="180"></el-table-column>
        <el-table-column prop="questionBaseCompletedNum" label="基本项目完成数量" width="180"></el-table-column>
        <el-table-column prop="isQuestionBaseCompleted" label="是否完成" width="100">
          <!-- <template slot-scope="scope">
            <p v-if='scope.row.isQuestionBaseCompleted && (scope.row.isQuestionBaseCompleted==1 || scope.row.isQuestionBaseCompleted=="1")'>
              已完成
            </p>
            <p v-else>未完成</p>
          </template>-->
        </el-table-column>
        <el-table-column prop="elderlyPopuStatusContent" label="老人总体情况" width="320">
          <template slot-scope="scope">
            <p
              v-if="scope.row.elderlyPopuStatusContent && scope.row.elderlyPopuStatusContent.length>20"
              style="color:#337ab7;cursor:pointer;"
              @click="detail(scope.row.elderlyPopuStatusContent)"
            >{{scope.row.elderlyPopuStatusContent.substring(0,20)+'...'}}</p>
            <p v-else>{{scope.row.elderlyPopuStatusContent}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="elderlyPopuStatusTime" label="老人总体状况时间" width="180">
          <template slot-scope="scope">
            <p
              v-if="scope.row.elderlyPopuStatusTime"
            >{{$moment(scope.row.elderlyPopuStatusTime).format('YYYY-MM-DD h:mm:ss')}}</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column prop="elderlyPopuStatusTotal" label="老人总体状况总数" width="180"></el-table-column>
        <el-table-column prop="elderlyPopuStatusCompletedNum" label="老人总体状况完成数量" width="180"></el-table-column>
        <el-table-column prop="isElderlyPopuStatusCompleted" label="是否完成" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.isElderlyPopuStatusCompleted">
              <span
                v-if="scope.row.isElderlyPopuStatusCompleted==1 || scope.row.isElderlyPopuStatusCompleted=='1'"
              >已完成</span>
              <span v-else>未完成</span>
            </p>
            <p v-else>
              <span
                v-if="scope.row.isElderlyPopuStatusCompleted==0 || scope.row.isElderlyPopuStatusCompleted=='0'"
              >未完成</span>
              <span v-else>已完成</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="questionDiagChoicedTitles" label="已选择的选择的大标题" width="180"></el-table-column>
        <el-table-column prop="questionDiagTotal" label="需要回答疾病诊断总数" width="180"></el-table-column>
        <el-table-column prop="questionDiagCompletedNum" label="需要回答疾病诊断完成数量" width="200"></el-table-column>
        <el-table-column prop="isQuestionDiagCompleted" label="是否完成" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.isQuestionDiagCompleted">
              <span
                v-if="scope.row.isQuestionDiagCompleted==1 || scope.row.isQuestionDiagCompleted=='1'"
              >已完成</span>
              <span v-else>未完成</span>
            </p>
            <p v-else>
              <span
                v-if="scope.row.isQuestionDiagCompleted==0 || scope.row.isQuestionDiagCompleted=='0'"
              >未完成</span>
              <span v-else>已完成</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="questionRemkAnswerContent" label="其它备注信息仅文字" width="320">
          <template slot-scope="scope">
            <p
              v-if="scope.row.questionRemkAnswerContent && scope.row.questionRemkAnswerContent.length>20"
              style="color:#337ab7;cursor:pointer;"
              @click="detail(scope.row.questionRemkAnswerContent)"
            >{{scope.row.questionRemkAnswerContent.substring(0,20)+'...'}}</p>
            <p v-else>{{scope.row.questionRemkAnswerContent}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="questionRemkAnswerTime" label="回答时间" width="180">
          <template slot-scope="scope">
            <p
              v-if="scope.row.questionRemkAnswerTime"
            >{{$moment(scope.row.questionRemkAnswerTime).format('YYYY-MM-DD h:mm:ss')}}</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column prop="questionRemkTotal" label="需要回答基本诊断总数" width="180"></el-table-column>
        <el-table-column prop="questionRemkCompletedNum" label="回答基本诊断完成数量" width="180"></el-table-column>
        <el-table-column prop="isQuestionRemkCompleted" label="疾病诊断是否完成" width="180">
          <!-- <template slot-scope="scope">
            <p v-if='scope.row.isQuestionRemkCompleted && (scope.row.isQuestionRemkCompleted==1 || scope.row.isQuestionRemkCompleted=="1")'>
              已完成
            </p>
            <p v-else>未完成</p>
          </template>-->
        </el-table-column>
        <el-table-column prop="createdTime" label="创建日期" width="180">
          <template slot-scope="scope">
            <p
              v-if="scope.row.createdTime"
            >{{$moment(scope.row.createdTime).format('YYYY-MM-DD h:mm:ss')}}</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" width="180">
          <template slot-scope="scope">
            <p
              v-if="scope.row.updateTime"
            >{{$moment(scope.row.updateTime).format('YYYY-MM-DD h:mm:ss')}}</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column prop="completedStatus" label="是否全完成" width="100">
          <template slot-scope="scope">
            <p v-if="scope.row.completedStatus">
              <span v-if="scope.row.completedStatus==1 || scope.row.completedStatus=='1'">已完成</span>
              <span v-else>未完成</span>
            </p>
            <p v-else>
              <span v-if="scope.row.completedStatus==0 || scope.row.completedStatus=='0'">未完成</span>
              <span v-else>已完成</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="assessUserId" label="评估人的ID" width="100"></el-table-column>
      </el-table>
      </div>
      <el-dialog
        :title="proptype"
        :visible.sync="dialogVisible"
        width="800px"
        center
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
          style="overflow:auto;"
        >
          <el-form-item label="工单ID" prop="orderNo">
            <el-col :span="24">
              <el-input v-model.number="ruleForm.orderNo" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="参保人ID" prop="userId">
            <el-col :span="24">
              <el-input v-model.number="ruleForm.userId" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答基本信息编号" prop="basicInfoId">
            <el-col :span="24">
              <el-input v-model.number="ruleForm.basicInfoId" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答基本信息最后做题时间" prop="basicInfoTime">
            <el-col :span="24">
              <el-date-picker
                v-model="ruleForm.basicInfoTime"
                type="datetime"
                default-time="12:00:00"
                style="width:100%;"
              ></el-date-picker>
              <!-- <el-input
                v-model.number = "ruleForm.basicInfoTime"
                auto-complete   = "off"
                clearable
              ></el-input>-->
            </el-col>
          </el-form-item>
          <el-form-item label="回答基本信息总数" prop="basicInfoTotal">
            <el-col :span="24">
              <el-input v-model.number="ruleForm.basicInfoTotal" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答基本信息完成数量" prop="basicCompletedNum">
            <el-col :span="24">
              <el-input v-model.number="ruleForm.basicCompletedNum" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答基本信息是否完成" prop="isBasicCompleted">
            <el-col :span="24">
              <el-input v-model.number="ruleForm.isBasicCompleted" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答基本项目答案" prop="questionBaseAnswerContent">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.questionBaseAnswerContent"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答基本项目时间" prop="questionBaseAnswerTime">
            <el-col :span="24">
              <el-date-picker
                v-model="ruleForm.questionBaseAnswerTime"
                type="datetime"
                default-time="12:00:00"
                style="width:100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="需要回答基本项目总数" prop="questionBaseTotal">
            <el-col :span="24">
              <el-input v-model.number="ruleForm.questionBaseTotal" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="基本项目完成数量" prop="questionBaseCompletedNum">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.questionBaseCompletedNum"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="基本项目是否完成" prop="isQuestionBaseCompleted">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.isQuestionBaseCompleted"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="老人总体状况内容" prop="elderlyPopuStatusContent">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.elderlyPopuStatusContent"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="老人总体状况时间" prop="elderlyPopuStatusTime">
            <el-col :span="24">
              <el-date-picker
                v-model="ruleForm.elderlyPopuStatusTime"
                type="datetime"
                default-time="12:00:00"
                style="width:100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="老人总体状况总数" prop="elderlyPopuStatusTotal">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.elderlyPopuStatusTotal"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="老人总体状况完成数量" prop="elderlyPopuStatusCompletedNum">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.elderlyPopuStatusCompletedNum"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="老人总体状况是否完成" prop="isElderlyPopuStatusCompleted">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.isElderlyPopuStatusCompleted"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答疾病诊断内容" prop="questionDiagAnswerContent">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.questionDiagAnswerContent"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答疾病诊断时间" prop="questionDiagAnswerTime">
            <el-col :span="24">
              <el-date-picker
                v-model="ruleForm.questionDiagAnswerTime"
                type="datetime"
                default-time="12:00:00"
                style="width:100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="回答疾病诊断标题" prop="questionDiagChoicedTitles">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.questionDiagChoicedTitles"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="需要回答疾病诊断总数" prop="questionDiagTotal">
            <el-col :span="24">
              <el-input v-model.number="ruleForm.questionDiagTotal" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答疾病诊断完成数量" prop="questionDiagCompletedNum">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.questionDiagCompletedNum"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答疾病诊断是否完成" prop="isQuestionDiagCompleted">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.isQuestionDiagCompleted"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="备注信息" prop="questionRemkAnswerContent">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.questionRemkAnswerContent"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="备注信息时间" prop="questionRemkAnswerTime">
            <el-col :span="24">
              <el-date-picker
                v-model="ruleForm.questionRemkAnswerTime"
                type="datetime"
                default-time="12:00:00"
                style="width:100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="需要回答疾病诊断总数" prop="questionRemkTotal">
            <el-col :span="24">
              <el-input v-model.number="ruleForm.questionRemkTotal" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答疾病诊断完成数量" prop="questionRemkCompletedNum">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.questionRemkCompletedNum"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="回答疾病诊断是否完成" prop="isQuestionRemkCompleted">
            <el-col :span="24">
              <el-input
                v-model.number="ruleForm.isQuestionRemkCompleted"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="状态" prop="status">
            <el-col :span="8">
              <el-select
                v-model = "ruleForm.status"
                clearable
                placeholder = "请选择状态"
                style       = "width:100%;float:left;"
              >
                <el-option label="有效" value="1"></el-option>
                <el-option label="无效" value="2"></el-option>
              </el-select>
            </el-col>
          </el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          <el-button @click="cancle" size="mini">取 消</el-button>
        </span>
      </el-dialog>
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
  data() {
    return {
      //分页data
      currentPage: 1,
      pageSize: [10, 20, 30, 50],
      total: 0,
      changePageSize: 10,

      //列表相关
      datalists: [],

      // 搜索相关
      searchForm: {
        orderNumber: ""
      },

      updateData2: [],

      // 添加或者修改相关
      dialogVisible: false,
      proptype: "评估回答答案新增",
      ruleForm: {
        orderNo: null,
        userId: null,
        basicInfoId: null,
        basicInfoTime: null,
        basicInfoTotal: null,
        basicCompletedNum: null,
        isBasicCompleted: null,
        questionBaseAnswerContent: null,
        questionBaseAnswerTime: null,
        questionBaseTotal: null,
        questionBaseCompletedNum: null,
        isQuestionBaseCompleted: null,
        elderlyPopuStatusContent: null,
        elderlyPopuStatusTime: null,
        elderlyPopuStatusTotal: null,
        elderlyPopuStatusCompletedNum: null,
        isElderlyPopuStatusCompleted: null,
        questionDiagAnswerContent: null,
        questionDiagAnswerTime: null,
        questionDiagChoicedTitles: null,
        questionDiagTotal: null,
        questionDiagCompletedNum: null,
        isQuestionDiagCompleted: null,
        questionRemkAnswerContent: null,
        questionRemkAnswerTime: null,
        questionRemkTotal: null,
        questionRemkCompletedNum: null,
        isQuestionRemkCompleted: null,
        completedStatus: null,
        assessUserId: null,
        insId: null,
        createTime: null,
        updateTime: null
      },
      rules: {
        orderNo: [{ required: true, message: "工单编号必填", trigger: "blur" }],
        userId: [{ required: true, message: "参保人Id必填", trigger: "blur" }],
        basicInfoId: [
          { required: true, message: "回答基本信息必填", trigger: "blur" }
        ],
        basicInfoTime: [
          { required: true, message: "回答基本信息时间必填", trigger: "blur" }
        ],
        basicInfoTotal: [
          {
            required: true,
            message: "需要回答基本信息总数必填",
            trigger: "blur"
          }
        ],
        basicCompletedNum: [
          {
            required: true,
            message: "回答基本信息完成数量必填",
            trigger: "blur"
          }
        ],
        isBasicCompleted: [
          {
            required: true,
            message: "回答基本信息是否完成必填",
            trigger: "blur"
          }
        ]
        // completedStatus: [
        //   { required: true, message: "是否全完成必填",trigger:'blur' },
        // ],

        // title     : [{ required: true, message: "请输入一级标题" }],
        // optionType: [
        //   { required: true, message: "请选择评估调查表类别", trigger: "change" }
        // ],
        // needPhoto: [{ required: true, message: "请选择", trigger: "change" }]
      },
      isAdd: 1
    };
  },
  methods: {
    search() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/assess/assess_order_answer/pagination?orderNo=${
          encodeURI(this.searchForm.orderNumber)
        }`,
        method: "get"
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    resetSearch() {
      this.searchForm = {
        orderNumber: ""
      };
    },
    detail(content) {
      alert(content);
    },
    add() {
      this.dialogVisible = true;
      this.proptype = "评估回答答案新增";
      this.ruleForm = {
        orderNo: null,
        userId: null,
        basicInfoId: null,
        basicInfoTime: null,
        basicInfoTotal: null,
        basicCompletedNum: null,
        isBasicCompleted: null,
        questionBaseAnswerContent: null,
        questionBaseAnswerTime: null,
        questionBaseTotal: null,
        questionBaseCompletedNum: null,
        isQuestionBaseCompleted: null,
        elderlyPopuStatusContent: null,
        elderlyPopuStatusTime: null,
        elderlyPopuStatusTotal: null,
        elderlyPopuStatusCompletedNum: null,
        isElderlyPopuStatusCompleted: null,
        questionDiagAnswerContent: null,
        questionDiagAnswerTime: null,
        questionDiagChoicedTitles: null,
        questionDiagTotal: null,
        questionDiagCompletedNum: null,
        isQuestionDiagCompleted: null,
        questionRemkAnswerContent: null,
        questionRemkAnswerTime: null,
        questionRemkTotal: null,
        questionRemkCompletedNum: null,
        isQuestionRemkCompleted: null,
        completedStatus: null,
        assessUserId: null,
        insId: null,
        createTime: null,
        updateTime: null
      };
      this.isAdd = 1;
    },
    cancle() {
      this.dialogVisible = false;
    },
    copyData() {
      let _this = this;
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        let data = JSON.parse(JSON.stringify(this.updateData2[0]));
        this.proptype = "评估回答答案拷贝新增";
        this.isAdd = 3;
        this.dialogVisible = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
      }
    },
    update() {
      let _this = this;
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        let data = JSON.parse(JSON.stringify(this.updateData2[0]));
        //     data.needPhoto = data.needPhoto == "需要" ? 1 : 0;
        // if (data.optionType == "单选") {
        //   data.optionType = 1;
        // }
        // if (data.optionType == "多选") {
        //   data.optionType = 2;
        // }
        // if (data.optionType == "其它") {
        //   data.optionType = 3;
        // }
        // if (data.questionType == "基本项目") {
        //   data.questionType = 1;
        // }
        // if (data.questionType == "老人整体情况") {
        //   data.questionType = 2;
        // }
        // if (data.questionType == "补充事项") {
        //   data.questionType = 3;
        // }
        // if (data.questionType == "疾病诊断") {
        //   data.questionType = 4;
        // }
        // if (data.questionType == "基本生活活动能力评定") {
        //   data.questionType = 5;
        // }
        this.proptype = "评估回答答案修改";
        this.isAdd = 2;
        this.dialogVisible = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let data = JSON.parse(JSON.stringify(this.ruleForm));

          if (this.isAdd == 1) {
            var submitData = new Object();

            submitData.orderNo = this.ruleForm.orderNo;
            submitData.userId = this.ruleForm.userId;
            submitData.basicInfoId = this.ruleForm.basicInfoId;
            // submitData.basicInfoTime = this.ruleForm.basicInfoTime;
            if (this.ruleForm.basicInfoTime) {
              submitData.basicInfoTime = this.$moment(
                this.ruleForm.basicInfoTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              submitData.basicInfoTime = null;
            }

            // submitData.basicInfoTime = this.$moment();
            // submitData.basicInfoTime                 = this.$moment().valueOf();
            submitData.basicInfoTotal = this.ruleForm.basicInfoTotal;
            submitData.basicCompletedNum = this.ruleForm.basicCompletedNum;
            submitData.isBasicCompleted = this.ruleForm.isBasicCompleted;
            submitData.questionBaseAnswerContent = this.ruleForm.questionBaseAnswerContent;
            if (this.ruleForm.questionBaseAnswerTime) {
              submitData.questionBaseAnswerTime = this.$moment(
                this.ruleForm.questionBaseAnswerTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              submitData.questionBaseAnswerTime = null;
            }

            submitData.questionBaseTotal = this.ruleForm.questionBaseTotal;
            submitData.questionBaseCompletedNum = this.ruleForm.questionBaseCompletedNum;
            submitData.isQuestionBaseCompleted = this.ruleForm.isQuestionBaseCompleted;
            submitData.elderlyPopuStatusContent = this.ruleForm.elderlyPopuStatusContent;
            if (this.ruleForm.elderlyPopuStatusTime) {
              submitData.elderlyPopuStatusTime = this.$moment(
                this.ruleForm.elderlyPopuStatusTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              submitData.elderlyPopuStatusTime = null;
            }

            submitData.elderlyPopuStatusTotal = this.ruleForm.elderlyPopuStatusTotal;
            submitData.elderlyPopuStatusCompletedNum = this.ruleForm.elderlyPopuStatusCompletedNum;
            submitData.isElderlyPopuStatusCompleted = this.ruleForm.isElderlyPopuStatusCompleted;
            submitData.questionDiagAnswerContent = this.ruleForm.questionDiagAnswerContent;
            if (this.ruleForm.questionDiagAnswerTime) {
              submitData.questionDiagAnswerTime = this.$moment(
                this.ruleForm.questionDiagAnswerTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              submitData.questionDiagAnswerTime = null;
            }

            submitData.questionDiagChoicedTitles = this.ruleForm.questionDiagChoicedTitles;
            submitData.questionDiagTotal = this.ruleForm.questionDiagTotal;
            submitData.questionDiagCompletedNum = this.ruleForm.questionDiagCompletedNum;
            submitData.isQuestionDiagCompleted = this.ruleForm.isQuestionDiagCompleted;
            submitData.questionRemkAnswerContent = this.ruleForm.questionRemkAnswerContent;
            if (this.ruleForm.questionRemkAnswerTime) {
              submitData.questionRemkAnswerTime = this.$moment(
                this.ruleForm.questionRemkAnswerTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              submitData.questionRemkAnswerTime = null;
            }

            submitData.questionRemkTotal = this.ruleForm.questionRemkTotal;
            submitData.questionRemkCompletedNum = this.ruleForm.questionRemkCompletedNum;
            submitData.isQuestionRemkCompleted = this.ruleForm.isQuestionRemkCompleted;
            // submitData.completedStatus               = 1;
            // submitData.assessUserId                  = 22001081;
            submitData.completedStatus = this.ruleForm.completedStatus;
            submitData.assessUserId = this.ruleForm.assessUserId;
            submitData.insId = this.ruleForm.userId;
            submitData.createTime = this.$moment().format(
              "YYYY-MM-DD HH:mm:ss"
            );
            // submitData.createTime = this.$moment().valueOf();
            submitData.updateTime = this.$moment().format(
              "YYYY-MM-DD HH:mm:ss"
            );
            // submitData.updateTime = this.$moment().valueOf();

            var mySubmitData = JSON.parse(JSON.stringify(submitData));

            // console.log('11',submitData)
            // console.log(data);
            // this.ruleForm.insId           = this.ruleForm.userId;
            // this.ruleForm.basicInfoTime   = this.$moment().format('YYYY-MM-DD HH:mm:ss');
            // this.ruleForm.assessUserId    = 22001081;
            // this.ruleForm.createTime      = this.$moment().format('YYYY-MM-DD HH:mm:ss');
            // this.ruleForm.updateTime      = this.$moment().format('YYYY-MM-DD HH:mm:ss');
            // this.ruleForm.completedStatus = 1;

            this.$axios({
              method: "post",
              url: `${
                this.$store.state.globalRouter
              }/auth/assess/assess_order_answer/save`,
              data: mySubmitData
              // emulateJSON: true,
              // contentType: 'application/json;charset=UTF-8'
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                alert("新增成功");
              } else {
                alert("添加失败：" + res.data.resultMsg);
              }
            });
          } else if (this.isAdd == 2) {
            let newData = this.ruleForm;
            if (this.ruleForm.basicInfoTime) {
              newData.basicInfoTime = this.$moment(
                this.ruleForm.basicInfoTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              newData.basicInfoTime = null;
            }
            if (this.ruleForm.questionBaseAnswerTime) {
              newData.questionBaseAnswerTime = this.$moment(
                this.ruleForm.questionBaseAnswerTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              newData.questionBaseAnswerTime = null;
            }
            if (this.ruleForm.elderlyPopuStatusTime) {
              newData.elderlyPopuStatusTime = this.$moment(
                this.ruleForm.elderlyPopuStatusTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              newData.elderlyPopuStatusTime = null;
            }
            if (this.ruleForm.questionDiagAnswerTime) {
              newData.questionDiagAnswerTime = this.$moment(
                this.ruleForm.questionDiagAnswerTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              newData.questionDiagAnswerTime = null;
            }
            if (this.ruleForm.questionRemkAnswerTime) {
              newData.questionRemkAnswerTime = this.$moment(
                this.ruleForm.questionRemkAnswerTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              newData.questionRemkAnswerTime = null;
            }

            // console.log(this.ruleForm)
            this.$axios({
              method: "post",
              url: `${
                this.$store.state.globalRouter
              }/auth/assess/assess_order_answer/update`,
              data: newData
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                alert("修改成功");
              } else {
                this.$message("修改失败，服务出错");
              }
            });
          } else if (this.isAdd == 3) {
            let newData = this.ruleForm;
            if (this.ruleForm.basicInfoTime) {
              newData.basicInfoTime = this.$moment(
                this.ruleForm.basicInfoTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              newData.basicInfoTime = null;
            }
            if (this.ruleForm.questionBaseAnswerTime) {
              newData.questionBaseAnswerTime = this.$moment(
                this.ruleForm.questionBaseAnswerTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              newData.questionBaseAnswerTime = null;
            }
            if (this.ruleForm.elderlyPopuStatusTime) {
              newData.elderlyPopuStatusTime = this.$moment(
                this.ruleForm.elderlyPopuStatusTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              newData.elderlyPopuStatusTime = null;
            }
            if (this.ruleForm.questionDiagAnswerTime) {
              newData.questionDiagAnswerTime = this.$moment(
                this.ruleForm.questionDiagAnswerTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              newData.questionDiagAnswerTime = null;
            }
            if (this.ruleForm.questionRemkAnswerTime) {
              newData.questionRemkAnswerTime = this.$moment(
                this.ruleForm.questionRemkAnswerTime
              ).format("YYYY-MM-DD HH:mm:ss");
            } else {
              newData.questionRemkAnswerTime = null;
            }
            this.$axios({
              method: "post",
              url: `${
                this.$store.state.globalRouter
              }/auth/assess/assess_order_answer/save`,
              data: newData
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                // this.$message("拷贝成功");
                alert("拷贝成功");
              } else {
                this.$message("拷贝失败，服务出错");
              }
            });
          }
        } else {
          this.$message("erro submit");
          return false;
        }
      });
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
              url:
                this.$store.state.globalRouter +
                "/auth/assess/assess_order_answer/remove?id=" +
                encodeURI(this.updateData2[0].orderNo),
              method: "get"
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.$options.methods.getReloadData(this);
              } else {
                alert("删除失败：" + res.data.resultMsg);
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
    dataList(tableData) {
      this.datalists = tableData;
      // var newdata   = [];
      // var newdata1  = [];
      // var newdata2  = [];
      // var newdata3  = [];
      // var dataArray = tableData;

      // dataArray.forEach(el => {
      //   if (el.questionType) {
      //    if(el.questionType==1){
      //      newdata.push('基本项目')
      //    }else if(el.questionType==2){
      //      newdata.push('老人整体情况')
      //    }else if(el.questionType==3){
      //      newdata.push('补充事项')
      //    }else if(el.questionType==4){
      //      newdata.push('疾病诊断')
      //    }else if(el.questionType==5){
      //      newdata.push('基本生活活动能力评定')
      //    }else{
      //      newdata.push(el.questionType)
      //    }
      //   }
      //   if (el.optionType) {
      //     if (el.optionType == 1) {
      //       newdata1.push("单选");
      //     } else if(el.optionType==2){
      //       newdata1.push("多选");
      //     }else{
      //       newdata1.push('其它')
      //     }
      //   }
      //     if(el.needPhoto==0){
      //       newdata2.push('不需要')
      //     }else{
      //       newdata2.push("需要");
      //   }
      //   //  if(el.optionText && el.optionText.length>=1){
      //   //     newdata3.push(el.optionText.substring(0,15)+"......");
      //   //   }else{
      //   //     newdata3.push("");
      //   // }
      // });

      // this.transform(dataArray, newdata);
      // this.transform1(dataArray, newdata1);
      // this.transform2(dataArray, newdata2);
      // // this.transform3(dataArray, newdata3);
      // this.datalists = dataArray;
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
        }/auth/assess/assess_order_answer/pagination?pageSize=${
          this.changePageSize
        }&pageNo=${val}`,
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

    getReloadData(that) {
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/assess/assess_order_answer/pagination?pageSize=${
            that.changePageSize
          }&pageNo=${that.currentPage}`,
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
      // that.reload();
    }
  },
  mounted() {
    // this.getData();
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/assess/assess_order_answer/pagination`,
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

/* 题目内容详情展示 */
.popover {
  max-width: 600px !important;
  top: 0px !important;
}
</style>
