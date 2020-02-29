<template>
  <div style="padding:20px;height:100%">
    <div
      class = "tableBox"
      style = "height:95%;background:#fff;padding:5px;overflow:auto"
    >
      <div
        el-row
        style = "margin:10px 0;text-align: left;"
      >
        <div
          el-col
          span = "24"
        >
          <el-button
          v-if   = "urlRole1==1"
          type   = "primary"
          size   = "small"
          icon   = "el-icon-plus"
          @click = "addData"
          >新增</el-button>
          <el-button
          v-if   = "urlRole2==1"
          type   = "primary"
          size   = "small"
          icon   = "el-icon-edit"
          @click = "updateData"
          >修改</el-button>
          <el-button
          v-if   = "urlRole3==1"
          type   = "primary"
          icon   = "el-icon-delete"
          size   = "small"
          @click = "deleteData"
          >删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <el-form
        :inline = "true"
        :model  = "searchForm"
          class = "demo-form-inline"
          size  = "mini"
          style = "text-align:left;"
      >
        <el-form-item label="登录账号：">
          <el-input
            v-model.trim = "searchForm.account"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label       = "姓名："
          label-width = "80px"
          span        = "5"
        >
          <el-input
            v-model.trim = "searchForm.fullname"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="工号：">
          <el-input
            v-model.trim = "searchForm.empno"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input
            v-model.trim = "searchForm.idNo"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="所属机构：">
          <el-input
            v-model.trim = "searchForm.orgName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type   = "primary"
            @click = "searchData"
            icon   = "el-icon-search"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type   = "primary"
            @click = "resetData"
            icon   = "el-icon-refresh"
          >重置</el-button>
        </el-form-item>
      </el-form>
      <div style="padding:5px;height:80%">
      <el-table
        :data = "lists"
        border
        stripe
        style       = "width: 100%; "
      :default-sort = "{prop: 'date', order: 'descending'}"
        @select     = "checkOut"
        height="100%"
      >
        <el-table-column
          type  = "selection"
          width = "50"
        ></el-table-column>
        <el-table-column
          prop  = "userId"
          label = "序号"
          width = "100"
          sortable
        ></el-table-column>
        <el-table-column
          prop  = "account"
          label = "登录账号"
          width = "150"
          sortable
        ></el-table-column>
        <el-table-column
          prop  = "idNo"
          label = "身份证号"
          width = "180"
          sortable
        ></el-table-column>
        <el-table-column
          prop  = "empno"
          label = "工号"
          width = "150"
          sortable
        ></el-table-column>
        <el-table-column
          prop  = "fullname"
          label = "姓名"
          width = "150"
          sortable
        ></el-table-column>
        <el-table-column
          prop  = "gender"
          label = "性别"
          width = "150"
          sortable
        ></el-table-column>
        <el-table-column
          prop  = "userClass"
          label = "人员分类"
          width = "150"
          sortable
        ></el-table-column>
        <el-table-column
          prop  = "orgName"
          label = "所属机构"
          width = "220"
          sortable
        ></el-table-column>
        <el-table-column
          prop  = "position"
          label = "职位"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "proTitle"
          label = "职称"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "workPhone"
          label = "工作电话"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "homePhone"
          label = "私人电话"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "education"
          label = "学历"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "degree"
          label = "学位"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "workingYears"
          label = "工龄"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "address"
          label = "联系地址"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "status"
          label = "状态"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "bankAccountName"
          label = "银行户名"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "bankAccountNumber"
          label = "银行卡号"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "branchBankName"
          label = "银行支行名称"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "branchBankNumber"
          label = "银行支行号（支行代码）"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "bankAccountArea"
          label = "开户银行区域"
          sortable
          width = "200"
        ></el-table-column>
        <el-table-column
          prop  = "accessDetail"
          label = "详情"
          width = "150"
          sortable
          fixed = "right"
        >
          <template slot-scope="scope">
            <el-button
              size   = "mini"
              type   = "success"
              @click = "protocolDetails(scope.$index, scope.row)"
            >详细资料</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <!-- 模态框 -->
      <el-dialog
        :title        = "dialogTitile"
        :visible.sync = "dialogVisible"
          width       = "800px"
          top         = "50px"
        :before-close = "handleClose"
        center
      >
        <el-form
          :model        = "ruleForm"
            ref         = "ruleForm"
          :rules        = "rules"
            label-width = "150px"
            class       = "demo-ruleForm"
            size="small"
            label-position="left"
        >
          <!-- <el-form-item>模态框状态{{modelType}}</el-form-item> -->
          <el-form-item
            label = "登录账号"
            prop  = "account"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.account"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "密码"
            prop  = "passwd"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.passwd"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "身份证号码"
            prop  = "idNo"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.idNo"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "工号"
            prop  = "empno"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.empno"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "姓名"
            prop  = "fullname"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.fullname"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "性别"
            prop  = "gender"
            width = "200"
          >
            <el-radio-group v-model="ruleForm.gender">
              <el-radio
                value = "1"
                label = "男"
              ></el-radio>
              <el-radio
                value = "2"
                label = "女"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label = "人员类别"
            prop  = "userClass"
            width = "200"
          >
            <el-radio-group v-model="ruleForm.userClass">
              <el-radio
                value = "1"
                label = "申请员"
              ></el-radio>
              <!-- <el-radio value="2" label="离职"></el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label = "所属机构"
            prop  = "org"
            width = "200"
          >
          <el-col :span="20">
            <el-select
              clearable
              placeholder = "请选择"
              size        = "mini"
              v-model     = "ruleForm.org"
              id          = "orgName"
              style="width:100%;"
            >
              <el-option
                          v-for = "(item,index) in orgArray"
                        :value  = "item.orgId"
                        :label  = "item.orgName"
                        :key    = "index"
              >{{item.orgName}}</el-option>
            </el-select>
          </el-col>
          </el-form-item>
          <el-form-item
            label = "职位"
            prop  = "position"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.position"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "职称"
            prop  = "password"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.password"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "工作电话"
            prop  = "workPhone"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model.number="ruleForm.workPhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "私人电话"
            prop  = "homePhone"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.homePhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "学历"
            prop  = "education"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.education"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "学位"
            prop  = "degree"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.degree"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "工龄"
            prop  = "workingYears"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.workingYears"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "联系地址"
            prop  = "address"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.address"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "银行户名"
            prop  = "bankAccountName"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.bankAccountName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "银行卡号"
            prop  = "bankAccountNumber"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.bankAccountNumber"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "银行支行名称"
            prop  = "branchBankName"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.branchBankName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "银行联行号（支行代码）"
            prop  = "branchBankNumber"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="ruleForm.branchBankNumber"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "开户银行区域"
            prop  = "bankAccountArea"
            width = "200"
            required
            :rules="[
              { required: true, message: '请选择开户银行区域', trigger: 'change' },
            ]"
          >
            <el-select
              clearable
              placeholder = "请选择"
              size        = "mini"
              v-model     = "bankProvince"
            >
              <el-option
                          v-for = "(item,index) in bankProvinceL"
                        :value  = "item.regionId"
                        :label  = "item.regionName"
                        :key    = "index"
              >{{item.regionName}}</el-option>
            </el-select>
            <el-select
              clearable
              placeholder = "请选择"
              size        = "mini"
              v-model     = "bankCity"
            >
              <el-option
                          v-for = "(item,index) in bankCityL"
                        :value  = "item.value"
                        :label  = "item.city"
                        :key    = "index"
              >{{item.city}}</el-option>
            </el-select>区域编号：
            <input
                        style = "height:25px;width:50px; line-height:25px;text-align:center"
                      :value  = "ruleForm.bankAccountArea"
            >
          </el-form-item>
          <el-form-item
            label = "状态"
            prop  = "status"
            width = "200"
          >
            <el-radio-group v-model="ruleForm.status">
              <el-radio
                value = "1"
                label = "在职"
              ></el-radio>
              <el-radio
                value = "2"
                label = "离职"
              ></el-radio>
            </el-radio-group>
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

      <!-- 详情模态框 -->
      <el-dialog
                  title       = "申请机构人员详细资料"
                :visible.sync = "dialogVisible2"
                  width       = "800px"
                  top         = "50px"
                  center
      >
        <el-form
          :model        = "detailForm"
            label-width = "150px"
            class       = "demo-ruleForm"
          disabled
          label-position="left"
        >
          <!-- <el-form-item>模态框状态{{modelType}}</el-form-item> -->
          <el-form-item
            label = "登录账号"
            prop  = "account"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.account" placeholder="邮箱或者手机号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "密码"
            prop  = "passwd"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.passwd"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "身份证号码"
            prop  = "idNo"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.idNo"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "工号"
            prop  = "empno"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.empno"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "姓名"
            prop  = "fullname"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.fullname"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "性别"
            prop  = "gender"
            width = "200"
          >
            <el-radio-group v-model="detailForm.gender">
              <el-radio
                value = "1"
                label = "男"
              ></el-radio>
              <el-radio
                value = "2"
                label = "女"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label = "人员类别"
            prop  = "userClass"
            width = "200"
          >
            <el-radio-group v-model="detailForm.userClass">
              <el-radio
                value = "1"
                label = "申请员"
              ></el-radio>
              <!-- <el-radio value="2" label="离职"></el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label = "所属机构"
            prop  = "org"
            width = "200"
          >
          <el-col :span="20">
            <el-select
              clearable
              placeholder = "请选择"
              size        = "mini"
              v-model     = "detailForm.org"
              id          = "orgName"
              style="width:100%;"
            >
              <el-option
                          v-for = "(item,index) in orgArray"
                        :value  = "item.orgId"
                        :label  = "item.orgName"
                        :key    = "index"
              >{{item.orgName}}</el-option>
            </el-select>
          </el-col>
          </el-form-item>
          <el-form-item
            label = "职位"
            prop  = "position"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.position"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "职称"
            prop  = "password"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.password"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "工作电话"
            prop  = "workPhone"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model.number="detailForm.workPhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "私人电话"
            prop  = "homePhone"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.homePhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "学历"
            prop  = "education"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.education"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "学位"
            prop  = "degree"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.degree"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "工龄"
            prop  = "workingYears"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.workingYears"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "联系地址"
            prop  = "address"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.address"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "银行户名"
            prop  = "bankAccountName"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.bankAccountName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "银行卡号"
            prop  = "bankAccountNumber"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.bankAccountNumber"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "银行支行名称"
            prop  = "branchBankName"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.branchBankName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "银行联行号（支行代码）"
            prop  = "branchBankNumber"
            width = "200"
          >
            <el-col :span="20">
              <el-input v-model="detailForm.branchBankNumber"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "开户银行区域"
            prop  = "bankAccountArea"
            width = "200"
          >
            <el-select
              clearable
              placeholder = "请选择"
              size        = "mini"
              v-model     = "bankProvince"
            >
              <el-option
                          v-for = "(item,index) in bankProvinceL"
                        :value  = "item.regionId"
                        :label  = "item.regionName"
                        :key    = "index"
              >{{item.regionName}}</el-option>
            </el-select>
            <el-select
              clearable
              placeholder = "请选择"
              size        = "mini"
              v-model     = "bankCity"
            >
              <el-option
                          v-for = "(item,index) in bankCityL"
                        :value  = "item.value"
                        :label  = "item.city"
                        :key    = "index"
              >{{item.city}}</el-option>
            </el-select>区域编号：
            <input
                        style = "height:25px;width:50px;line-height:25px; text-align:center"
                      :value  = "detailForm.bankAccountArea"
            >
          </el-form-item>
          <el-form-item
            label = "状态"
            prop  = "status"
            width = "200"
          >
            <el-radio-group v-model="detailForm.status">
              <el-radio
                value = "1"
                label = "在职"
              ></el-radio>
              <el-radio
                value = "2"
                label = "离职"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div
      class = "pageNation"
      style = "height:5%;margin:10px 0;"
    >
      <el-pagination
                  @size-change    = "handleSizeChange"
                  @current-change = "handleCurrentChange"
                :current-page     = "currentPage"
                :page-sizes       = "pageSize"
                :page-size        = "100"
                  layout          = "total, sizes, prev, pager, next, jumper"
                :total            = "total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import base from "../../base/base";
export default {
  mixins: [base],
  inject: ['reload'],
  data() {
    return {
      module        : "staff_apply_mng",
      dialogVisible : false,
      dialogVisible2: false,
      dialogTitile  : "新增人员信息",
      modelType     : 1,
      searchForm    : {
        account : "",
        fullname: "",
        idNo    : "",
        orgName : "",
        empno   : ""
      },
      lists   : [],
      ruleForm: {
        id               : "",
        orderStr         : "",
        orgLinks         : "",
        userId           : "",
        account          : "",
        passwd           : "",
        idNo             : "",
        empno            : "",
        avatar           : "",
        fullname         : "",
        gender           : "",
        userType         : "",
        userClass        :"",
        member           : "",
        assessLevel      : "",
        madePlanLevel    : "",
        nursingLevel     : "",
        orgId            : "",
        position         : "",
        proTitle         : "",
        workPhone        : "",
        homePhone        : "",
        education        : "",
        degree           : "",
        workingYears     : "",
        address          : "",
        status           : "在职",
        bankAccountName  : "",
        bankAccountNumber: "",
        branchBankName   : "",
        branchBankNumber : "",
        bankAccountArea  : "",
        orgName          : "",
        org      : "",

      },
      rules: {
        account: [
          { required: true, message: "登录账户不能为空", trigger: "blur" },
          {pattern:/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}|^1[34578][0-9]{9}/,message:"账户只能邮箱或者手机号",trigger:'blur'}
        ],
        passwd: [
          { required: true, message: "账户密码不能为空", trigger: "blur" }
        ],
        status:[
          { required: true, message: "状态必选", trigger: "change" }
        ],
        org:[
          {required:true, message: "所属机构必填", trigger: "change" }
        ],
        idNo    : [
          { required: true, message: "身份证号必填", trigger: "blur" },
          {pattern:/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,message:"身份证号码无效",trigger:"blur"}
        ],
        empno   : [{ required: true, message: "工号", trigger: "blur" }],
        fullname: [
          { required: true, message: "真实姓名必填", trigger: "blur" },
          {pattern:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,message:"请输入真实姓名",trigger:"blur"}
        ],
        gender   : [{ required: true, message: "请选择性别", trigger: "blur" }],
        userClass: [
          { required: true, message: "请选择人员分类", trigger: "blur" }
        ],
        workPhone: [
          { required: true, message: "工作电话必填",trigger:'blur'},
          { type: "number", message: "电话必须为数字值" },
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请填大陆有效手机号',trigger:'blur'}
        ]
      },
      detailForm: {
        id               : "",
        orderStr         : "",
        orgLinks         : "",
        userId           : "",
        account          : "",
        passwd           : "",
        idNo             : "",
        empno            : "",
        avatar           : "",
        fullname         : "",
        gender           : "",
        userType         : "",
        userClass        :"",
        member           : "",
        assessLevel      : "",
        madePlanLevel    : "",
        nursingLevel     : "",
        orgId            : "",
        position         : "",
        proTitle         : "",
        workPhone        : "",
        homePhone        : "",
        education        : "",
        degree           : "",
        workingYears     : "",
        address          : "",
        status           : "",
        bankAccountName  : "",
        bankAccountNumber: "",
        branchBankName   : "",
        branchBankNumber : "",
        bankAccountArea  : "",
        orgName          : "",
        org      : "",
      },
      checkData: [],
      orgType  : 1,
      // org      : "",
      orgArray : [],

      // 增删改审的权限问题？？
      urlRole1: 0,
      urlRole2: 0,
      urlRole3: 0,
      urlRole4: 0,

    };
  },
  methods: {
    checkOut(val) {
      this.checkData = val;
    },
    getData() {
      this.$axios({
        method: "get",
        url   : `${this.$store.state.globalRouter}/auth/staff/${
          this.module
        }/pagination?accountLike=${encodeURI(this.searchForm.account)}&fullnameLike=${
          encodeURI(this.searchForm.fullname)
        }&idNoLike=${encodeURI(this.searchForm.idNo)}&orgNameLike=${
          encodeURI(this.searchForm.orgName)
        }&empnoLike=${encodeURI(this.searchForm.empno)}&userType=1&pageNo=${
          this.currentPage
        }&pageSize=${this.changePageSize}`
      }).then(res => {
        if(res.data.resultCode=='100005'){
          this.$router.push({ path: "/" });
          }else{
          if (res.data.resultList) {
                    this.total       = res.data.totalCount;
                    this.currentPage = res.data.curPage;
                    this.resData     = res.data.resultList;
                    this.dataList(res.data.resultList);
            }
          if (!res.data.resultList.length) {
                      this.$message({ type: "info", message: "暂无数据" });
            }
}


      });
    },
    dataList(tableData) {
      let _this = this;
      let data  = JSON.parse(JSON.stringify(tableData));
      data.forEach((item, index) => {
        if (item.bankAccountArea) {
          item.bankAccountArea =
            this.getBankAreaChinese(item.bankAccountArea) +
            "-" +
            item.bankAccountArea;
        }
        item.status    = item.status == 1 ? "在职" : "离职";
        item.gender    = item.gender == "M" ? "男" : "女";
        item.userClass = item.userClass == 1 ? "申请员" : "";
      });
      this.lists = data;
    },
    addData() {
      let _this=this;
      this.dialogVisible = true;
      this.modelType     = 1;
      this.dialogTitile  = "新增申请机构人员";
      this.ruleForm      = {
        id               : "",
        orderStr         : "",
        orgLinks         : "",
        userId           : "",
        account          : "",
        passwd           : "",
        idNo             : "",
        empno            : "",
        avatar           : "",
        fullname         : "",
        gender           : "",
        userType         : "",
        userClass        :"申请员",
        member           : "",
        assessLevel      : "",
        madePlanLevel    : "",
        nursingLevel     : "",
        orgId            : "",
        position         : "",
        proTitle         : "",
        workPhone        : "",
        homePhone        : "",
        education        : "",
        degree           : "",
        workingYears     : "",
        address          : "",
        status           : "在职",
        bankAccountName  : "",
        bankAccountNumber: "",
        branchBankName   : "",
        branchBankNumber : "",
        bankAccountArea  : "",
        orgName          : ""
      };
      this.bankProvince = "";
      this.$nextTick(()=>{
        _this.$refs['ruleForm'].clearValidate();
      })
    },
    updateData() {
      if (this.checkData.length != 1) {
        this.$message({ type: "info", message: "请选择一条数据进行修改" });
      } else {
        let _this=this;

      this.modelType     = 0;
      this.dialogTitile  = "申请机构人员信息修改";
      this.dialogVisible = true;
      this.$nextTick(()=>{
        _this.$refs['ruleForm'].clearValidate();
      });
      let check              = JSON.parse(JSON.stringify(this.checkData[0]));
      let data               = {
          account          : check.account,
          address          : check.address,
          bankAccountArea  : check.bankAccountArea,
          bankAccountName  : check.bankAccountName,
          bankAccountNumber: check.bcheckankAccountNumber,
          degree           : check.degree,
          education        : check.education,
          empno            : check.empno,
          fullname         : check.fullname,
          gender           : check.gender,
          homePhone        : check.homePhone,
          id               : check.id,
          idNo             : check.idNo,
          orderStr         : check.orderStr,
          orgId            : check.orgId,
          orgLinks         : check.orgLinks,
          orgName          : check.orgName,
          passwd           : check.passwd,
          position         : check.position,
          proTitle         : check.proTitle,
          status           : check.status,
          userClass        : check.userClass,
          userId           : check.userId,
          userType         : check.userType,
          workPhone        : parseInt(check.workPhone),
          workingYears     : check.workingYears
        };
        if (data.bankAccountArea && !Number.isInteger(data.bankAccountArea)) {
          data.bankAccountArea = parseInt(
            this.checkData[0].bankAccountArea.split("-")[1]
          );
          this.getBankAreaChinese(data.bankAccountArea);
        } else {
          this.bankProvince    = "";
          data.bankAccountArea = this.checkData[0].bankAccountArea;
          this.getBankAreaChinese(data.bankAccountArea);
        }
        // console.log("区域编号：" + data.bankAccountArea);
        this.ruleForm = data;
        this.ruleForm.org      = data.orgId;
      }
    },
    deleteData() {
      let _this = this;
      if (this.checkData.length != 1) {
        this.$message("请选择一条数据进行删除");
      } else {
        this.$confirm("是否确定删除该条数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText : "取消",
          type             : "warning",
          center           : true
        })
          .then(() => {
            _this
              .$axios({
                method: "get",
                url   : `${_this.$store.state.globalRouter}/auth/staff/${
                  _this.module
                }/remove?id=${encodeURI(_this.checkData[0].userId)}`
              })
              .then(res => {
                if (res.data.data) {
                  _this.$message({ type: "info", message: "删除成功" });
                  this.getData();
                } else {
                  _this.$message({
                    type   : "info",
                    message: "删除失败，服务出错"
                  });
                }
              });
          })
          .catch(() => {
            this.$message({
              type   : "info",
              message: "取消"
            });
          });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.orgId = this.ruleForm.org;
          let data                = JSON.parse(JSON.stringify(this.ruleForm));
          data.gender         = data.gender == "男" ? "M" : "F";
          data.status         = data.status == "在职" ? 1 : 0;
          data.userClass      = data.userClass == "申请员" ? 1 : 0;
          data.userType       = 1;
          data.orgId          = this.ruleForm.org;
          data.orgName        = $("#orgName")[0].value;
          // 判断新增还是修改
          if (this.modelType) {
            // console.log("新增");
            // console.log(this.ruleForm);
            // console.log(data);
            this.$axios({
              method: "post",
              url   : `${this.$store.state.globalRouter}/auth/staff/${
                this.module
              }/save`,
              data
            }).then(res => {
              if (res.data.data) {
                if(res.data.resultCode=='000000'){
                  this.$message({ type: "success", message: "添加成功!" });
                  this.dialogVisible = false;
                  this.getData();
                }
              } else {
                this.$message({ type: "error", message: res.data.resultMsg});
                this.dialogVisible = false;
                this.reload();
              }
            });
          } else {
            // console.log("修改");
            // console.log(data);
            this.$axios({
              method: "post",
              url   : `${this.$store.state.globalRouter}/auth/staff/${
                this.module
              }/update?id=${encodeURI(this.ruleForm.userId)}`,
              data
            }).then(res => {
              if (res.data.data) {
                if(res.data.resultCode=='000000'){
                  this.$message({ type: "success", message: "修改成功!" });
                  this.dialogVisible = false;
                  this.getData();
                }
              } else {
                this.$message({ type: "error", message: res.data.resultMsg});
                this.dialogVisible = false;
                this.reload();
              }
            });
          }
        } else {
          this.$message({ type: "error", message: "非法输入！" });
        }
      });
    },
    searchData() {
      // console.log(this.searchForm);
      this.getData();
    },
    protocolDetails(index, rowData) {
      // console.log(rowData);
                          this.dialogVisible2 = true;
                      let check               = JSON.parse(JSON.stringify(rowData));
      // console.log(check);
      let data = {
        account          : check.account,
        address          : check.address,
        bankAccountArea  : check.bankAccountArea,
        bankAccountName  : check.bankAccountName,
        bankAccountNumber: check.bcheckankAccountNumber,
        degree           : check.degree,
        education        : check.education,
        empno            : check.empno,
        fullname         : check.fullname,
        gender           : check.gender,
        homePhone        : check.homePhone,
        id               : check.id,
        idNo             : check.idNo,
        orderStr         : check.orderStr,
        orgId            : check.orgId,
        orgLinks         : check.orgLinks,
        orgName          : check.orgName,
        passwd           : check.passwd,
        position         : check.position,
        proTitle         : check.proTitle,
        status           : check.status,
        userClass        : check.userClass,
        userId           : check.userId,
        userType         : check.userType,
        workPhone        : check.workPhone,
        workingYears     : check.workingYears
      };
      // console.log(data)
      if (data.bankAccountArea && !Number.isInteger(data.bankAccountArea)) {
        data.bankAccountArea = parseInt(check.bankAccountArea.split("-")[1]);
        this.getBankAreaChinese(data.bankAccountArea);
      } else {
        this.bankProvince = "";
        // data.bankAccountArea=parseInt(data.bankAccountArea);
        data.bankAccountArea = check.bankAccountArea;
        this.getBankAreaChinese(data.bankAccountArea);
      }
      // console.log("区域编号：" + data.bankAccountArea);
      this.detailForm = data;
      this.detailForm.org        = data.orgId;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    resetData() {
      this.searchForm.account  = "";
      this.searchForm.idNo     = "";
      this.searchForm.fullname = "";
      this.searchForm.orgName  = "";
      this.searchForm.empno    = "";
      this.getData();
    },
    // 分页
    handleCurrentChange(val) {
      this.$axios({
        url: `${this.$store.state.globalRouter}/auth/staff/${
          this.module
        }/pagination?accountLike=${encodeURI(this.searchForm.account)}&fullnameLike=${
          encodeURI(this.searchForm.fullname)
        }&idNoLike=${encodeURI(this.searchForm.idNo)}&orgNameLike=${
          encodeURI(this.searchForm.orgName)
        }&empnoLike=${
         encodeURI(this.searchForm.empno)
        }&userType=1&pageNo=${val}&pageSize=${this.changePageSize}`,
        method: "get"
      }).then(res => {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    cancle() {
      this.dialogVisible = false;
      this.getData();
    },
    loadByOrgType() {
      this.$axios({
        method: "get",
        url   : `${
          this.$store.state.globalRouter
        }/auth/intact/intact_organization_mng/load_by_org_type?orgType=${
          encodeURI(this.orgType)
        }`
      }).then(res => {
        // console.log(res);
        if (res.data.data) {
          let data          = res.data.data;
              this.orgArray = JSON.parse(JSON.stringify(data));
        }
      });
    },

    getReloadData(that) {
      that
        .$axios({
          url: `${that.$store.state.globalRouter}/auth/staff/${
            that.module
          }/pagination?accountLike=${encodeURI(that.searchForm.account)}&fullnameLike=${
            encodeURI(that.searchForm.fullname)
          }&idNoLike=${encodeURI(that.searchForm.idNo)}&orgNameLike=${
            encodeURI(that.searchForm.orgName)
          }&empnoLike=${encodeURI(that.searchForm.empno)}&userType=1&pageNo=${
            that.currentPage
          }&pageSize=${that.changePageSize}`,
          method: "get"
        })
        .then(res => {
          if(res.data.resultCode=='100005'){
that.$router.push({ path: "/" });
}else{
 that.total       = res.data.totalCount;
 that.currentPage = res.data.curPage;
 that.resData     = res.data.resultList;
          //   console.log(that.resData)
          that.dataList(that.resData); //列出列表
}


        });
        // that.reload();
    }
  },
  watch: {
    bankProvince: function() {
      if (this.bankProvince) {
        let _this = this;
        let data  = this.$store.state.bankAccountArea;
        // console.log(data);
        let newCityArray;
        data.forEach((item, index) => {
          if (item.prova == this.bankProvince + "") {
            newCityArray = item.bankAccountArea;
          }
        });
        this.bankCityL = newCityArray;
      } else {
        this.bankCityL = [];
      }
      this.bankCity = "";
    },
    bankCity: function() {
      this.ruleForm.bankAccountArea = this.bankCity;
    }
  },
  mounted() {
    this.getData();
    this.getBankAreaData();
    this.loadByOrgType();
    // 增删改审的权限判断
    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "人员管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "core/apply_staff") {
              console.log("申请机构人员", submenu[j]);
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
.demo-ruleForm {
  flex      : 0;
  width     : 90%;
  text-align: left;
  margin    : auto;
}
/* .el-form-item {
  border-bottom: 1px solid #eeeeee;
} */
.el-pagination {
  text-align: left;
}
</style>
