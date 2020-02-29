<template>
  <div style="padding:20px;height:100%;">
    <div style="height:95%;background:#fff;padding:5px;overflow:auto">
      <div
        el-row
        style = "padding:10px;text-align: left;"
      >
        <div
          el-col
          span  = "24"
          class = "top"
        >
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "add"
            icon          = "el-icon-plus"
          >新增</el-button>
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "update"
            icon          = "el-icon-edit"
          >修改</el-button>
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "remove"
            icon          = "el-icon-delete"
          >删除</el-button>
          <!-- <el-button
            type          = "primary"
            size          = "small"
            @click.native = "export1"
            icon          = "el-icon-delete"
          >导入基本信息</el-button>
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "export2"
            icon          = "el-icon-delete"
          >导入公共卫生信息</el-button> -->
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div
        el-row
        style = "padding:10px;text-align: left;"
      >
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
            <el-form-item label="镇(街道):">
              <el-select
                v-model     = "searchForm.street"
                placeholder = "请选择"
                style       = "width:150px"
                size        = 'mini'
                clearable
              >

                <el-option
                                  v-for = "(item,index) in streetData"
                                :value  = "item.street"
                                :key    = "index"
                                :label  = "item.street"
                ></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="村(社区):">
              <el-select
                v-model     = "searchForm.community"
                placeholder = "请选择"
                style       = "width:150px"
                size        = 'mini'
                clearable
              >

                <el-option
                                  v-for = "(item,index) in communityData"
                                :value  = "item.community"
                                :key    = "index"
                                :label  = "item.community"
                ></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input
                v-model = "searchForm.name"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号:">
              <el-input
                v-model = "searchForm.idCard"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="护理项目:">
              <el-select
                v-model     = "searchForm.needAssistItem"
                placeholder = "请选择"
                style       = "width:150px"
                size        = 'mini'
                clearable
              >
                <el-option
                  value = "1"
                  label = "吃饭"
                ></el-option>
                <el-option
                  value = "2"
                  label = "穿衣"
                ></el-option>
                <el-option
                  value = "3"
                  label = "移动"
                ></el-option>
                <el-option
                  value = "4"
                  label = "洗澡"
                ></el-option>
                <el-option
                  value = "5"
                  label = "如厕"
                ></el-option>
                <el-option
                  value = "6"
                  label = "大小便控制"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主要疾病诊断:">
              <el-select
                v-model     = "searchForm.diseaseDiagnosis"
                placeholder = "请选择"
                style       = "width:150px"
                size        = 'mini'
                clearable
              >
                <el-option
                  value = "1"
                  label = "慢性阻塞性肺疾病"
                ></el-option>
                <el-option
                  value = "2"
                  label = "高血压病"
                ></el-option>
                <el-option
                  value = "3"
                  label = "糖尿病"
                ></el-option>
                <el-option
                  value = "4"
                  label = "脑血管意外"
                ></el-option>
                <el-option
                  value = "5"
                  label = "冠心病"
                ></el-option>
                <el-option
                  value = "6"
                  label = "帕金森"
                ></el-option>
                <el-option
                  value = "7"
                  label = "晚期肿瘤"
                ></el-option>
                <el-option
                  value = "8"
                  label = "下肢骨折"
                ></el-option>
                <el-option
                  value = "9"
                  label = "精神病（含老年痴呆）"
                ></el-option>
                <el-option
                  value = "10"
                  label = "脑瘫"
                ></el-option>
                <el-option
                  value = "11"
                  label = "无上述疾病"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="现居住场所:">
              <el-select
                v-model     = "searchForm.address"
                placeholder = "请选择"
                style       = "width:150px"
                size        = 'mini'
                clearable
              >
                <el-option
                  value = "1"
                  label = "居家"
                ></el-option>
                <el-option
                  value = "2"
                  label = "医疗机构"
                ></el-option>
                <el-option
                  value = "3"
                  label = "养老机构"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="月护理费用支出:">
              <el-select
                v-model     = "searchForm.nursingExpenses"
                placeholder = "请选择"
                style       = "width:150px"
                size        = 'mini'
                clearable
              >
                <el-option
                  value = "1"
                  label = "1000元以下"
                ></el-option>
                <el-option
                  value = "2"
                  label = "1000-2000元"
                ></el-option>
                <el-option
                  value = "3"
                  label = "2000-3000元"
                ></el-option>
                <el-option
                  value = "4"
                  label = "3000-4000元"
                ></el-option>
                <el-option
                  value = "5"
                  label = "4000-5000元"
                ></el-option>
                <el-option
                  value = "6"
                  label = "5000元以上"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="护理类型:">
              <el-select
                v-model     = "searchForm.homeCareType"
                placeholder = "请选择"
                style       = "width:150px"
                size        = 'mini'
                clearable
              >
                <el-option
                  value = "1"
                  label = "亲朋邻居"
                ></el-option>
                <el-option
                  value = "2"
                  label = "保姆"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="医保卡号:">
              <el-input
                v-model = "searchForm.medicalInsuranceIdLike"
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
            </el-form-item> -->
            <el-form-item>
              <el-button
                type   = "primary"
                @click = "search"
                icon="el-icon-search"
              >查询</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button
                type   = "primary"
                @click = "resetSearch"
              >重置</el-button>
            </el-form-item> -->
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
        @selection-change = "handleSelectionChange"
        height="100%"
      >
        <el-table-column
          type  = "selection"
          width = "55"
        ></el-table-column>
        <el-table-column
          prop  = "id"
          label = "序号"
          width = "100"
        ></el-table-column>
        <el-table-column
          prop  = "street"
          label = "镇(街道)"
          width = "100"
        ></el-table-column>
        <el-table-column
          prop  = "community"
          label = "村(社区)"
          width = "100"
        ></el-table-column>
        <el-table-column
          prop  = "name"
          label = "姓名"
          width = "80"
        ></el-table-column>
        <el-table-column
          prop  = "gender"
          label = "性别"
          width = "80"
        ></el-table-column>
        <el-table-column
          prop  = "idCard"
          label = "身份证号"
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "needAssistItem"
          label = "需要协助的护理项目"
          width = "200"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.needAssistItem==1 || scope.row.needAssistItem=="1" '>
              吃饭
            </p>
            <p v-else-if='scope.row.needAssistItem==2 || scope.row.needAssistItem=="2" '>
              穿衣
            </p>
            <p v-else-if='scope.row.needAssistItem==3 || scope.row.needAssistItem=="3" '>
              移动
            </p>
            <p v-else-if='scope.row.needAssistItem==4 || scope.row.needAssistItem=="4" '>
              洗澡
            </p>
            <p v-else-if='scope.row.needAssistItem==5 || scope.row.needAssistItem=="5" '>
              如厕
            </p>
            <p v-else-if='scope.row.needAssistItem==6 || scope.row.needAssistItem=="6" '>
              大小便控制
            </p>
            <p v-else>
              {{showData(scope.row.needAssistItem)}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "diseaseDiagnosis"
          label = "主要疾病诊断"
          width = "210"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.diseaseDiagnosis==1 || scope.row.diseaseDiagnosis=="1" '>
              慢性阻塞性肺疾病
            </p>
            <p v-else-if='scope.row.diseaseDiagnosis==2 || scope.row.diseaseDiagnosis=="2" '>
              高血压病
            </p>
            <p v-else-if='scope.row.diseaseDiagnosis==3 || scope.row.diseaseDiagnosis=="3" '>
              糖尿病
            </p>
            <p v-else-if='scope.row.diseaseDiagnosis==4 || scope.row.diseaseDiagnosis=="4" '>
              脑血管意外
            </p>
            <p v-else-if='scope.row.diseaseDiagnosis==5 || scope.row.diseaseDiagnosis=="5" '>
              冠心病
            </p>
            <p v-else-if='scope.row.diseaseDiagnosis==6 || scope.row.diseaseDiagnosis=="6" '>
              帕金森
            </p>
            <p v-else-if='scope.row.diseaseDiagnosis==7 || scope.row.diseaseDiagnosis=="7" '>
              晚期肿瘤
            </p>
            <p v-else-if='scope.row.diseaseDiagnosis==8 || scope.row.diseaseDiagnosis=="8" '>
              下肢骨折
            </p>
            <p v-else-if='scope.row.diseaseDiagnosis==9 || scope.row.diseaseDiagnosis=="9" '>
              精神病（含老年痴呆）
            </p>
            <p v-else-if='scope.row.diseaseDiagnosis==10 || scope.row.diseaseDiagnosis=="10" '>
              脑瘫
            </p>
            <p v-else-if='scope.row.diseaseDiagnosis==11 || scope.row.diseaseDiagnosis=="11" '>
              无上述疾病
            </p>
            <p v-else>
              {{showData1(scope.row.diseaseDiagnosis)}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "address"
          label = "现居住场所"
          width = "200"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.address==1 || scope.row.address=="1" '>
              居家
            </p>
            <p v-else-if='scope.row.address==2 || scope.row.address=="2" '>
              医疗机构
            </p>
            <p v-else-if='scope.row.address==3 || scope.row.address=="3" '>
              养老机构
            </p>
            <p v-else>
              {{scope.row.address}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "homeCareType"
          label = "居家护理类型"
          width = "160"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.homeCareType==1 || scope.row.homeCareType=="1" '>
              亲朋邻居
            </p>
            <p v-else-if='scope.row.homeCareType==2 || scope.row.homeCareType=="2" '>
              保姆
            </p>
            <p v-else>
              {{scope.row.homeCareType}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "nursingExpenses"
          label = "月护理费用支出"
          width = "160"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.nursingExpenses==1 || scope.row.nursingExpenses=="1" '>
              1000元以下
            </p>
            <p v-else-if='scope.row.nursingExpenses==2 || scope.row.nursingExpenses=="2" '>
              1000—2000元
            </p>
            <p v-else-if='scope.row.nursingExpenses==3 || scope.row.nursingExpenses=="3" '>
              2000—3000元
            </p>
            <p v-else-if='scope.row.nursingExpenses==4 || scope.row.nursingExpenses=="4" '>
              3000—4000元
            </p>
            <p v-else-if='scope.row.nursingExpenses==5 || scope.row.nursingExpenses=="5" '>
              4000—5000元
            </p>
            <p v-else-if='scope.row.nursingExpenses==6 || scope.row.nursingExpenses=="6" '>
              5000元以上
            </p>
            <p v-else>
              {{scope.row.nursingExpenses}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "contactName"
          label = "联系人姓名"
          width = "100"
        ></el-table-column>
        <el-table-column
          prop  = "contactPhone"
          label = "联系人电话"
          width = "130"
        ></el-table-column>
        <el-table-column
          prop  = "remarks"
          label = "备注"
          width = "230"
        ></el-table-column>
        <el-table-column
          prop  = "operation"
          label = "操作"
          width = "130"
          fixed = "right"
        >
          <template slot-scope="scope">
            <el-button type="success" @click="showDetail(scope.row.idCard)" size='mini'>公共卫生信息</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop  = "createTime"
          label = "操作"
        >
          <template slot-scope="scope">
            <el-button
              size   = "mini"
              type   = "warning"
              @click = "showRecord(scope.$index, scope.row)"
            >执行历史</el-button>
          </template>
        </el-table-column> -->

      </el-table>
</div>
      <el-dialog
        :title        = "proptype"
        :visible.sync = "dialogVisible"
          width       = "800px"
        center
        :before-close = "handleClose"
      >
        <el-form
          :model        = "ruleForm"
          :rules        = "rules"
            ref         = "ruleForm"
            label-width = "200px"
            class       = "demo-ruleForm"
            style       = "overflow:auto;"
        >
          <el-form-item
            label = "镇(街道)"
            prop  = "street"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.street"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "村(社区)"
            prop  = "community"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.community"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "姓名"
            prop  = "name"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.name"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            label = "性别"
            prop  = "gender"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.gender"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "身份证号"
            prop  = "idCard"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.idCard"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "需要协助的护理项目"
            prop  = "needAssistItem"
          >
            <el-col :span="20">
              <el-checkbox-group v-model="ruleForm.needAssistItem">
                <el-checkbox
                  value = '1'
                  label = "吃饭"
                ></el-checkbox>
                <el-checkbox
                  value = '2'
                  label = "穿衣"
                ></el-checkbox>
                <el-checkbox
                  value = '3'
                  label = "移动"
                ></el-checkbox>
                <el-checkbox
                  value = '4'
                  label = "洗澡"
                ></el-checkbox>
                <el-checkbox
                  value = '5'
                  label = "如厕"
                ></el-checkbox>
                <el-checkbox
                  value = '6'
                  label = "大小便控制"
                ></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "主要疾病诊断"
            prop  = "diseaseDiagnosis"
          >
            <el-col :span="20">
              <el-checkbox-group v-model="ruleForm.diseaseDiagnosis">
                <el-checkbox
                  value = '1'
                  label = "慢性阻塞性肺疾病"
                ></el-checkbox>
                <el-checkbox
                  value = '2'
                  label = "高血压病"
                ></el-checkbox>
                <el-checkbox
                  value = '3'
                  label = "糖尿病"
                ></el-checkbox>
                <el-checkbox
                  value = '4'
                  label = "脑血管意外"
                ></el-checkbox>
                <el-checkbox
                  value = '5'
                  label = "冠心病"
                ></el-checkbox>
                <el-checkbox
                  value = '6'
                  label = "帕金森"
                ></el-checkbox>
                <el-checkbox
                  value = '7'
                  label = "晚期肿瘤"
                ></el-checkbox>
                <el-checkbox
                  value = '8'
                  label = "下肢骨折"
                ></el-checkbox>
                <el-checkbox
                  value = '9'
                  label = "精神病(含老年痴呆)"
                ></el-checkbox>
                <el-checkbox
                  value = '10'
                  label = "脑瘫"
                ></el-checkbox>
                <el-checkbox
                  value = '11'
                  label = "无上述疾病"
                ></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>

          <el-form-item
            label = "现居住场所"
            prop  = "address"
          >
            <el-col :span="20">
              <el-select
                v-model     = "ruleForm.address"
                placeholder = "请选择"
                style       = "width:100%"
                size        = 'mini'
                clearable
              >
                <el-option
                  value = "1"
                  label = "居家"
                ></el-option>
                <el-option
                  value = "2"
                  label = "医疗机构"
                ></el-option>
                <el-option
                  value = "3"
                  label = "养老机构"
                ></el-option>
              </el-select>

            </el-col>
          </el-form-item>
          <el-form-item
            label = "居家护理类型"
            prop  = "homeCareType"
          >
            <el-col :span="20">
              <el-select
                v-model     = "ruleForm.homeCareType"
                placeholder = "请选择"
                style       = "width:100%"
                size        = 'mini'
                clearable
              >
                <el-option
                  value = "1"
                  label = "亲朋邻居"
                ></el-option>
                <el-option
                  value = "2"
                  label = "保姆"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "月护理费用支出"
            prop  = "nursingExpenses"
          >
            <el-col :span="20">
              <el-select
                v-model     = "ruleForm.nursingExpenses"
                placeholder = "请选择"
                style       = "width:100%"
                size        = 'mini'
                clearable
              >
                <el-option
                  value = "1"
                  label = "1000元以下"
                ></el-option>
                <el-option
                  value = "2"
                  label = "1000-2000元"
                ></el-option>
                <el-option
                  value = "3"
                  label = "2000-3000元"
                ></el-option>
                <el-option
                  value = "4"
                  label = "3000-4000元"
                ></el-option>
                <el-option
                  value = "5"
                  label = "4000-5000元"
                ></el-option>
                <el-option
                  value = "6"
                  label = "5000元以上"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "联系人姓名"
            prop  = "contactName"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.contactName"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            label = "联系人电话"
            prop  = "contactPhone"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.contactPhone"
               auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "备注"
            prop  = "remarks"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.remarks"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <span
          slot  = "footer"
          class = "dialog-footer"
        >
          <el-button
            type   = "primary"
            @click = "submitForm('ruleForm')"
            size   = "mini"
          >提交</el-button>
          <el-button
            @click = "cancle"
            size   = "mini"
          >取 消</el-button>
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
        street          : "",
        community       : "",
        name            : "",
        idCard          : "",
        needAssistItem  : "",
        diseaseDiagnosis: "",
        address         : "",
        nursingExpenses : "",
        homeCareType    : ""
      },

      communityData: [],
      streetData   : [],

      updateData2: [],
      //
      // 添加或者修改相关
      dialogVisible: false,
      proptype     : "评估管理问题新增",
      ruleForm     : {
        street          : null,
        community       : null,
        name            : null,
        gender          : null,
        idCard          : null,
        needAssistItem  : [],
        diseaseDiagnosis: [],
        address         : null,
        homeCareType    : null,
        nursingExpenses : null,
        contactName     : null,
        contactPhone    : null,
        remarks         : null
      },
      rules: {
        street   : [{ required: true, message: "镇(街道)必填", trigger: "blur" }],
        community: [
          { required: true, message: "村(社区)必填", trigger: "blur" }
        ],
        name          : [{ required: true, message: "姓名必填", trigger: "blur" }],
        gender        : [{ required: true, message: "性别必填", trigger: "blur" }],
        idCard        : [{ required: true, message: "身份证号必填", trigger: "blur" }],
        needAssistItem: [
          { required: true, message: "需要协助的护理项目必选", trigger: "blur" }
        ],
        diseaseDiagnosis: [
          { required: true, message: "主要疾病诊断必填", trigger: "blur" }
        ],
        address: [
          { required: true, message: "现居住场所必选", trigger: "change" }
        ],

        homeCareType: [
          { required: true, message: "居家护理类型必选", trigger: "change" }
        ],
        nursingExpenses: [
          { required: true, message: "月护理费用支出必选", trigger: "change" }
        ],
        contactName: [
          { required: true, message: "联系人姓名必填", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "联系人电话必填", trigger: "blur" }
        ]
      },
      isAdd: 1
    };
  },
  methods: {
    export1() {
      alert("导入基本信息待开发");
    },
    export2() {
      alert("待开发");
    },
    add() {
      this.dialogVisible = true;
      this.proptype      = "参保人员基本信息新增";
      this.isAdd         = 1;
      this.ruleForm={
        street          : null,
        community       : null,
        name            : null,
        gender          : null,
        idCard          : null,
        needAssistItem  : [],
        diseaseDiagnosis: [],
        address         : null,
        homeCareType    : null,
        nursingExpenses : null,
        contactName     : null,
        contactPhone    : null,
        remarks         : null
      };

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
        this.proptype      = "参保人员基本信息修改";
        this.isAdd         = 2;
        this.dialogVisible = true;
        this.ruleForm      = JSON.parse(JSON.stringify(data));
        if (this.updateData2[0].needAssistItem) {
          var data1 = this.updateData2[0].needAssistItem;
          if (data1.length > 1) {
            var data2      = data1.split(",");
            var data2Array = [];
            for (var item of data2) {
              if (item == 1 || item == "1") {
                data2Array.push("吃饭");
              } else if (item == 2 || item == "2") {
                data2Array.push("穿衣");
              } else if (item == 3 || item == "3") {
                data2Array.push("移动");
              } else if (item == 4 || item == "4") {
                data2Array.push("洗澡");
              } else if (item == 5 || item == "5") {
                data2Array.push("如厕");
              } else if (item == 6 || item == "6") {
                data2Array.push("大小便控制");
              }
            }
            this.ruleForm.needAssistItem = data2Array;
          } else if (data1.length == 1) {
            var item = data1;
            if (item == 1 || item == "1") {
              this.ruleForm.needAssistItem = ["吃饭"];
            } else if (item == 2 || item == "2") {
              this.ruleForm.needAssistItem = ["穿衣"];
            } else if (item == 3 || item == "3") {
              this.ruleForm.needAssistItem = ["移动"];
            } else if (item == 4 || item == "4") {
              this.ruleForm.needAssistItem = ["洗澡"];
            } else if (item == 5 || item == "5") {
              this.ruleForm.needAssistItem = ["如厕"];
            } else if (item == 6 || item == "6") {
              this.ruleForm.needAssistItem = ["大小便控制"];
            }
          }
        }else{
          // 如果不存在的话，就把初始值设为[],避免选中一个就选择全部
          this.ruleForm.needAssistItem = [];
        }
        if (this.updateData2[0].diseaseDiagnosis) {
          var data3 = this.updateData2[0].diseaseDiagnosis;
          if (data3.length > 1) {
            var data4      = data3.split(",");
            var data4Array = [];
            for (var item of data4) {
              if (item == 1 || item == "1") {
                data4Array.push("慢性阻塞性肺疾病");
              } else if (item == 2 || item == "2") {
                data4Array.push("高血压病");
              } else if (item == 3 || item == "3") {
                data4Array.push("糖尿病");
              } else if (item == 4 || item == "4") {
                data4Array.push("脑血管意外");
              } else if (item == 5 || item == "5") {
                data4Array.push("冠心病");
              } else if (item == 6 || item == "6") {
                data4Array.push("帕金森");
              } else if (item == 7 || item == "7") {
                data4Array.push("晚期肿瘤");
              } else if (item == 8 || item == "8") {
                data4Array.push("下肢骨折");
              } else if (item == 9 || item == "9") {
                data4Array.push("精神病(含老年痴呆)");
              } else if (item == 10 || item == "10") {
                data4Array.push("脑瘫");
              } else if (item == 11 || item == "11") {
                data4Array.push("无上述疾病");
              }
            }
            this.ruleForm.diseaseDiagnosis = data4Array;
          } else if (data3.length == 1) {
            var item = data3;
            if (item == 1 || item == "1") {
              this.ruleForm.diseaseDiagnosis = ["慢性阻塞性肺疾病"];
            } else if (item == 2 || item == "2") {
              this.ruleForm.diseaseDiagnosis = ["高血压病"];
            } else if (item == 3 || item == "3") {
              this.ruleForm.diseaseDiagnosis = ["糖尿病"];
            } else if (item == 4 || item == "4") {
              this.ruleForm.diseaseDiagnosis = ["脑血管意外"];
            } else if (item == 5 || item == "5") {
              this.ruleForm.diseaseDiagnosis = ["冠心病"];
            } else if (item == 6 || item == "6") {
              this.ruleForm.diseaseDiagnosis = ["帕金森"];
            } else if (item == 7 || item == "7") {
              this.ruleForm.diseaseDiagnosis = ["晚期肿瘤"];
            } else if (item == 8 || item == "8") {
              this.ruleForm.diseaseDiagnosis = ["下肢骨折"];
            } else if (item == 9 || item == "9") {
              this.ruleForm.diseaseDiagnosis = ["精神病(含老年痴呆)"];
            } else if (item == 10 || item == "10") {
              this.ruleForm.diseaseDiagnosis = ["脑瘫"];
            } else if (item == 11 || item == "11") {
              this.ruleForm.diseaseDiagnosis = ["无上述疾病"];
            }
          }
        }else{
          this.ruleForm.diseaseDiagnosis = [];
        }
      }
    },
    cancle() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isAdd == 1) {
            var myData1 = "";
            if (
              this.ruleForm.needAssistItem &&
              this.ruleForm.needAssistItem.length > 0
            ) {
              for (var item of this.ruleForm.needAssistItem) {
                if (item == "吃饭") {
                  myData1 += "1,";
                } else if (item == "穿衣") {
                  myData1 += "2,";
                } else if (item == "移动") {
                  myData1 += "3,";
                } else if (item == "洗澡") {
                  myData1 += "4,";
                } else if (item == "如厕") {
                  myData1 += "5,";
                } else if (item == "大小便控制") {
                  myData1 += "6,";
                }
              }
              this.ruleForm.needAssistItem = myData1;
            } else {
              this.ruleForm.needAssistItem = "";
            }
            var myData2 = "";
            if (
              this.ruleForm.diseaseDiagnosis &&
              this.ruleForm.diseaseDiagnosis.length > 0
            ) {
              for (var item of this.ruleForm.diseaseDiagnosis) {
                if (item == "慢性阻塞性肺疾病") {
                  myData2 += "1,";
                } else if (item == "高血压病") {
                  myData2 += "2,";
                } else if (item == "糖尿病") {
                  myData2 += "3,";
                } else if (item == "脑血管意外") {
                  myData2 += "4,";
                } else if (item == "冠心病") {
                  myData2 += "5,";
                } else if (item == "帕金森") {
                  myData2 += "6,";
                } else if (item == "晚期肿瘤") {
                  myData2 += "7,";
                } else if (item == "下肢骨折") {
                  myData2 += "8,";
                } else if (item == "精神病(含老年痴呆)") {
                  myData2 += "9,";
                } else if (item == "脑瘫") {
                  myData2 += "10,";
                } else if (item == "无上述疾病") {
                  myData2 += "11,";
                }
              }

              this.ruleForm.diseaseDiagnosis = myData2;
            } else {
              this.ruleForm.diseaseDiagnosis = "";
            }

            // this.ruleForm.needAssistItem   = '1,2,3';
            // this.ruleForm.diseaseDiagnosis = '1,2,4';

            this.$axios({
              method: "post",
              url   : `${
                this.$store.state.globalRouter
              }/auth/user/user_basic_info/save`,
              data: this.ruleForm
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
            var myData1 = "";

            if (
              this.ruleForm.needAssistItem &&
              this.ruleForm.needAssistItem.length > 0
            ) {
              for (var item of this.ruleForm.needAssistItem) {
                if (item == "吃饭") {
                  myData1 += "1,";
                } else if (item == "穿衣") {
                  myData1 += "2,";
                } else if (item == "移动") {
                  myData1 += "3,";
                } else if (item == "洗澡") {
                  myData1 += "4,";
                } else if (item == "如厕") {
                  myData1 += "5,";
                } else if (item == "大小便控制") {
                  myData1 += "6,";
                }
              }
              this.ruleForm.needAssistItem = myData1;
            } else {
              this.ruleForm.needAssistItem = "";
            }

            var myData2 = "";

            if (
              this.ruleForm.diseaseDiagnosis &&
              this.ruleForm.diseaseDiagnosis.length > 0
            ) {
              for (var item of this.ruleForm.diseaseDiagnosis) {
                if (item == "慢性阻塞性肺疾病") {
                  myData2 += "1,";
                } else if (item == "高血压病") {
                  myData2 += "2,";
                } else if (item == "糖尿病") {
                  myData2 += "3,";
                } else if (item == "脑血管意外") {
                  myData2 += "4,";
                } else if (item == "冠心病") {
                  myData2 += "5,";
                } else if (item == "帕金森") {
                  myData2 += "6,";
                } else if (item == "晚期肿瘤") {
                  myData2 += "7,";
                } else if (item == "下肢骨折") {
                  myData2 += "8,";
                } else if (item == "精神病(含老年痴呆)") {
                  myData2 += "9,";
                } else if (item == "脑瘫") {
                  myData2 += "10,";
                } else if (item == "无上述疾病") {
                  myData2 += "11,";
                }
              }

              this.ruleForm.diseaseDiagnosis = myData2;
            } else {
              this.ruleForm.diseaseDiagnosis = "";
            }
            this.$axios({
              method: "post",
              url   : `${
                this.$store.state.globalRouter
              }/auth/user/user_basic_info/update`,
              data: this.ruleForm
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                alert("修改成功");
              } else {
                alert("修改失败" + res.data.resultMsg);
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
          cancelButtonText : "取消",
          type             : "warning",
          center           : true
        })
          .then(() => {
            // console.log(this.updateData2[0].id);
            this.$axios({
              url:
                this.$store.state.globalRouter +
                "/auth/user/user_basic_info/remove?id=" +
                encodeURI(this.updateData2[0].id),
              method: "get"
            }).then(res => {
              if (res.data.resultCode == "000000") {
                alert("删除成功");
                this.$options.methods.getReloadData(this);
              } else {
                alert("删除失败：" + res.data.resultMsg);
              }
            });
          })
          .catch(() => {
            this.$message({
              type   : "info",
              message: "取消删除"
            });
          });
      }
    },
    showData(data) {
      // alert('11')
      if (data) {
        var areaList = data.split(",");
        var temp     = "";
        // var temp1    = "";
        for (var i = 0; i < areaList.length; i++) {
          switch (areaList[i]) {
            case "1":
              temp += "吃饭,";
              break;
            case "2":
              temp += "穿衣,";
              break;
            case "3":
              temp += "移动,";
              break;
            case "4":
              temp += "洗澡,";
              break;
            case "5":
              temp += "如厕,";
              break;
            case "6":
              temp += "大小便控制,";
              break;
          }
          // temp1 += temp + ",";
        }
        return temp.substring(0, temp.length - 1);
      } else {
        console.log(data);
      }
    },
    showData1(data) {
      if (data) {
        var areaList = data.split(",");
        // var temp     = "";
        var temp1 = "";

        for (var i = 0; i < areaList.length; i++) {
          // console.log(areaList[i])
          switch (areaList[i]) {
            case "1":
              temp1 += "慢性阻塞性肺疾病,";
              break;
            case "2":
              temp1 += "高血压病,";
              break;
            case "3":
              temp1 += "糖尿病,";
              break;
            case "4":
              temp1 += "脑血管意外,";
              break;
            case "5":
              temp1 += "冠心病,";
              break;
            case "6":
              temp1 += "帕金森,";
              break;
            case "7":
              temp1 += "晚期肿瘤,";
              break;
            case "8":
              temp1 += "下肢骨折,";
              break;
            case "9":
              temp1 += "精神病（含老年痴呆）,";
              break;
            case "10":
              temp1 += "脑瘫,";
              break;
            case "11":
              temp1 += "无上述疾病,";
              break;
          }
          // temp1 += temp + ",";
        }
        // console.log(temp1.substring(0, temp1.length - 1));
        return temp1.substring(0, temp1.length - 1);
      }
    },
    search() {
      // console.log(this.searchForm)
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/user/user_basic_info/pagination?street=${
          encodeURI(this.searchForm.street)
        }&community=${this.searchForm.community}&name=${
          encodeURI(this.searchForm.name)
        }&idCard=${encodeURI(this.searchForm.idCard)}&needAssistItem=${
          encodeURI(this.searchForm.needAssistItem)
        }&diseaseDiagnosis=${encodeURI(this.searchForm.diseaseDiagnosis)}&address=${
          encodeURI(this.searchForm.address)
        }&nursingExpenses=${encodeURI(this.searchForm.nursingExpenses)}&homeCareType=${
          encodeURI(this.searchForm.homeCareType)
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
    showDetail(id) {
      window.localStorage.setItem("cbrJbId", id);
      this.$router.push({ path: "/userBasicInfo/user_basic_info_detail" });
      // this.currentPlanID = row.planId;
      // this.planDate      = this.$moment().format('YYYY-MM-DD');
      // $("#executeHistoryListModal").modal("show");
      // this.$options.methods.queryExecuteHistoryButton(this.currentPlanID,this.planDate,this);
    },

    dataList(tableData) {
      this.datalists = tableData;
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
        }/auth/user/user_basic_info/pagination?pageSize=${
          encodeURI(this.changePageSize)
        }&pageNo=${val}&street=${encodeURI(this.searchForm.street)}&community=${
          encodeURI(this.searchForm.community)
        }&name=${encodeURI(this.searchForm.name)}&idCard=${
          encodeURI(this.searchForm.idCard)
        }&needAssistItem=${encodeURI(this.searchForm.needAssistItem)}&diseaseDiagnosis=${
          encodeURI(this.searchForm.diseaseDiagnosis)
        }&address=${encodeURI(this.searchForm.address)}&nursingExpenses=${
          encodeURI(this.searchForm.nursingExpenses)
        }&homeCareType=${encodeURI(this.searchForm.homeCareType)}`,
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
          }/auth/user/user_basic_info/pagination?pageSize=${
            that.changePageSize
          }&pageNo=${that.currentPage}&street=${
            encodeURI(that.searchForm.street)
          }&community=${that.searchForm.community}&name=${
            encodeURI(that.searchForm.name)
          }&idCard=${encodeURI(that.searchForm.idCard)}&needAssistItem=${
            encodeURI(that.searchForm.needAssistItem)
          }&diseaseDiagnosis=${encodeURI(that.searchForm.diseaseDiagnosis)}&address=${
            encodeURI(that.searchForm.address)
          }&nursingExpenses=${encodeURI(that.searchForm.nursingExpenses)}&homeCareType=${
            encodeURI(that.searchForm.homeCareType)
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
      }/auth/user/user_basic_info/pagination`,
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
    // 获取机构
    // 获取分配时的护理机构及居家护理机构
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/user/user_basic_info/get_communitys`,
      method: "get"
    }).then(res => {
      // console.log(res.data.data);
      this.communityData = res.data.data;
    });
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/user/user_basic_info/get_streets`,
      method: "get"
    }).then(res => {
      // console.log(res.data.data);
      this.streetData = res.data.data;
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
</style>

