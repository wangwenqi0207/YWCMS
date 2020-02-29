//评估机构管理
<template>
  <div style="padding:20px;height:100%" id="assessOrg">
    <div class="tableBox" style="height:95%;background:#fff;padding:5px;">
      <div el-row style="margin:10px 0;text-align: left;">
        <div el-col span="24">
          <el-button
            v-if="urlRole1==1"
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="addData"
          >新增</el-button>
          <el-button
            v-if="urlRole2==1"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="updateData"
          >修改</el-button>
          <el-button
            v-if="urlRole3==1"
            type="primary"
            icon="el-icon-delete"
            size="mini"
            @click="deleteData"
          >删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        size="mini"
        style="text-align:left;"
      >
        <el-form-item label="机构名称">
          <el-input v-model.trim="searchForm.orgName" clearable></el-input>
        </el-form-item>
        <el-form-item label="组织机构代码">
          <el-input v-model.trim="searchForm.orgCode" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetData" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="padding:5px;height:80%">
      <el-table
        :data="lists"
        border
        stripe
        style="width: 100% "
        size="small"
        :default-sort="{prop: 'date', order: 'descending'}"
        height="100%"
        @select="checkOut"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="orgId" label="序号" width="100" sortable></el-table-column>
        <el-table-column prop="orgName" label="机构名称" width="150" sortable></el-table-column>
        <el-table-column prop="orgCode" label="组织机构代码" width="150" sortable></el-table-column>
        <el-table-column prop="address" label="机构地址" width="150" sortable></el-table-column>
        <el-table-column prop="managingStaffName" label="专管员" width="150" sortable></el-table-column>
        <el-table-column prop="managingStaffPhone" label="专管员电话" width="150" sortable></el-table-column>
        <el-table-column prop="legalRepresentativeName" label="法人代表" width="150" sortable></el-table-column>
        <el-table-column prop="legalRepresentativePhone" label="法人代表电话" width="150" sortable></el-table-column>
        <el-table-column prop="orgNature" label="机构性质" sortable width="150"></el-table-column>
        <el-table-column prop="status" label="状态" sortable width="80"></el-table-column>
        <el-table-column prop="bankAccountName" label="银行户名" sortable width="150"></el-table-column>
        <el-table-column prop="bankAccountNumber" label="银行卡号" sortable width="150"></el-table-column>
        <el-table-column prop="branchBankName" label="银行支行名称" sortable width="150"></el-table-column>
        <el-table-column prop="branchBankNumber" label="银行联行号（支行代码）" sortable width="200"></el-table-column>
        <el-table-column prop="bankAccountArea" label="开户银行区域" sortable width="150"></el-table-column>
        <el-table-column prop="accessDetail" label="详情" width="150" sortable fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="protocolDetails(scope.$index, scope.row)"
            >详细资料</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <!-- 模态框 -->
      <el-dialog
        :title="dialogTitile"
        :visible.sync="dialogVisible"
        width="900px"
        top="50px"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
          label-position="left"
        >
          <!-- <el-form-item>模态框状态{{modelType}}</el-form-item> -->
          <el-form-item label="组织机构代码" prop="orgCode" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.orgCode"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="机构名称" prop="orgName" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.orgName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="机构性质" prop="orgNature" width="200">
            <el-radio-group v-model="ruleForm.orgNature">
              <el-radio :label="1" value="1">公立</el-radio>
              <el-radio :label="0" value="0">民营</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="机构地址" prop="address" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.address"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="专管员" prop="managingStaffName" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.managingStaffName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="专管员电话" prop="managingStaffPhone" width="200">
            <el-col :span="20">
              <el-input v-model.number="ruleForm.managingStaffPhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="法人代表" prop="legalRepresentativeName" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.legalRepresentativeName  "></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="法人代表电话" prop="legalRepresentativePhone" width="200">
            <el-col :span="20">
              <el-input v-model.number="ruleForm.legalRepresentativePhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="状态" prop="status" width="200">
            <el-radio-group v-model="ruleForm.status">
              <el-radio :label="1">启动</el-radio>
              <el-radio :label="0">暂停</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 统筹范围 -->
          <!-- 添加负责范围-->
          <el-form-item label="负责范围">
            <child-page
              v-for="(item,index) in items"
              :key="index"
              :index="index"
              :items="items[index]"
              :modelType="modelType"
              :flage="flage"
              :tab_pane_disabled="tab_pane_disabled"
              @deleteIndexArea="deleteArea"
            ></child-page>
            <div style="margin-left:80px;" id="addAreaButton">
              <el-button type="primary" size="mini" @click="addArea">添加负责范围</el-button>
            </div>
          </el-form-item>
          <el-form-item label="银行户名" prop="bankAccountName" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.bankAccountName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="银行卡号" prop="bankAccountNumber" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.bankAccountNumber"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="银行支行名称" prop="branchBankName" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.branchBankName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="银行联行号（支行代码）" prop="branchBankNumber" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.branchBankNumber"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label="开户银行区域"
            prop="bankAccountArea"
            width="200"
            required
            :rules="[
              { required: true, message: '请选择开户银行区域', trigger: 'change' },
            ]"
          >
            <el-select v-model="bankProvince" clearable placeholder="请选择" size="mini">
              <el-option
                v-for="(item,index) in bankProvinceL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
            <el-select v-model="bankCity" clearable placeholder="请选择" size="mini">
              <el-option
                v-for="(item,index) in bankCityL"
                :value="item.value"
                :label="item.city"
                :key="index"
              >{{item.city}}</el-option>
            </el-select>区域编号：
            <input
              style="height:25px;width:50px;line-height:25px; text-align:center"
              v-model="ruleForm.bankAccountArea"
            >
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            :disabled="isDisabled"
            size="mini"
          >提交</el-button>
          <el-button @click="cancle" size="mini">取 消</el-button>
        </span>
      </el-dialog>

      <!-- 详情模态框 -->
      <el-dialog title="评估机构详情" :visible.sync="dialogVisible2" width="900px" top="50px">
        <el-form :model="detailForm" label-width="150px" class="demo-ruleForm" disabled>
          <el-form-item label="组织机构代码" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.orgCode"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="机构名称" prop="orgName" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.orgName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="机构性质" prop="orgNature" width="200">
            <el-radio-group v-model="detailForm.orgNature">
              <el-radio :label="1">公立</el-radio>
              <el-radio :label="0">民营</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="机构地址" prop="address" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.address"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="专管员" prop="managingStaffName" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.managingStaffName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="专管员电话" prop="managingStaffPhone" width="200">
            <el-col :span="20">
              <el-input v-model.number="detailForm.managingStaffPhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="法人代表" prop="legalRepresentativeName" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.legalRepresentativeName  "></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="法人代表电话" prop="legalRepresentativePhone" width="200">
            <el-col :span="20">
              <el-input v-model.number="detailForm.legalRepresentativePhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="状态" prop="status" width="200">
            <el-radio-group v-model="detailForm.status">
              <el-radio :label="1">启动</el-radio>
              <el-radio :label="0">暂停</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 统筹范围 -->
          <el-form-item label="负责范围">
            <child-page
              v-for="(item,index) in items"
              :key="index"
              :index="index"
              :items="items[index]"
              :modelType="modelType"
              :flage="flage"
              :tab_pane_disabled="tab_pane_disabled"
              @deleteIndexArea="deleteArea"
            ></child-page>
          </el-form-item>
          <el-form-item label="银行户名" prop="bankAccountName" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.bankAccountName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="银行卡号" prop="bankAccountNumber" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.bankAccountNumber"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="银行支行名称" prop="branchBankName" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.branchBankName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="银行联行号（支行代码）" prop="branchBankNumber" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.branchBankNumber"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="开户银行区域" width="200">
            <el-select v-model="bankProvince" clearable placeholder="请选择" size="mini">
              <el-option
                v-for="(item,index) in bankProvinceL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
            <el-select v-model="bankCity" clearable placeholder="请选择" size="mini">
              <el-option
                v-for="(item,index) in bankCityL"
                :value="item.value"
                :label="item.city"
                :key="index"
              >{{item.city}}</el-option>
            </el-select>区域编号：
            <input
              style="height:25px;width:50px;line-height:25px; text-align:center"
              v-model="ruleForm.bankAccountArea"
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="pageNation" style="height:5%;margin:10px 0;">
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
import childPage from "./child.vue";
import base from "../../base/base";
export default {
  mixins: [base],
  inject: ["reload"],
  data() {
    let validateOrgCode=(rule, value, callback)=>{
          value=value.trim();
          if(this.oldOrgCode && value==this.oldOrgCode){
            callback()
          }else if(value==null || value==''){
            callback(new Error('机构代码必填！'));
          }else{
            let data={
               'code':value
            }
            this.$axios({
              url   : `${this.$store.state.globalRouter}/auth/organization/${this.module}/is_exist`,
              method: "get",
              params:data
            }).then(res => {
            if(res.data.data){
                callback();
            }else{
              callback(new Error('该机构已经存在，请确定后重新输入！'));
            }
            });
          }
    };
    return {
      items: [],
      flage: 0,
      module: "organization_apply_mng",
      dialogVisible: false,
      dialogVisible2: false,
      dialogTitile: "新增评估机构",
      modelType: 1,
      searchForm: {
        orgName: "",
        orgCode: ""
      },
      oldOrgCode:null,
      isDisabled: false,
      lists: [],
      ruleForm: {
        orgId: "",
        orgName: "",
        orgCode: "",
        orgNature: 2,
        address: "",
        legalRepresentativeName: "",
        legalRepresentativePhone: "",
        managingStaffName: "",
        managingStaffPhone: "",
        status: "",
        createdTime: "",
        bankAccountName: "",
        bankAccountNumber: "",
        bankAccountArea: "",
        branchBankName: "",
        branchBankNumber: ""
      },
      rules: {
        orgCode: [
          { required: true, message: "机构代码不能为空", trigger: "blur" },
          {validator:validateOrgCode,trigger:'blur'}
        ],
        orgName: [
          { required: true, message: "机构名称不能为空", trigger: "blur" }
        ],
        orgNature: [
          { required: true, message: "请选择机构性质", trigger: "blur" }
        ],
        address: [
          { required: true, message: "机构地址不能为空", trigger: "blur" }
        ],
        legalRepresentativeName: [
          { required: true, message: "法人代表名字不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        ],
        legalRepresentativePhone: [
          {
            required: true,
            message: "法人代表联系方式不能为空",
            trigger: "blur"
          },
          { type: "number", message: "电话必须为数字值" },
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: "请填大陆有效手机号",
            trigger: "blur"
          }
        ],
        managingStaffName: [
          { required: true, message: "专管员姓名不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        ],
        managingStaffPhone: [
          { required: true, message: "专管员电话不能为空", trigger: "blur" },
          { type: "number", message: "电话必须为数字值" },
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: "请填大陆有效手机号",
            trigger: "blur"
          }
        ],
        status: [{ required: true, message: "请选择机构状态", trigger: "blur" }]
      },
      detail: false,
      detailForm: {},
      checkData: [],
      tab_pane_disabled: false,
      urlRole1: 1,
      urlRole2: 1,
      urlRole3: 1,
      urlRole4: 1
    };
  },
  components: {
    childPage
  },
  methods: {
    checkOut(val) {
      this.checkData = val;
    },
    getData() {
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/organization/${
          this.module
        }/pagination?orgType=2&orgCodeLike=${
          encodeURI(this.searchForm.orgCode)
        }&orgNameLike=${encodeURI(this.searchForm.orgName)}&pageNo=${
          this.currentPage
        }&pageSize=${this.changePageSize}`
      }).then(res => {
        if (res.data.resultCode == "100005") {
          this.$router.push({ path: "/" });
        } else {
          if (res.data.resultList) {
            this.total = res.data.totalCount;
            this.currentPage = res.data.curPage;
            this.resData = res.data.resultList;
            this.dataList(res.data.resultList);
          }
        }
      });
    },
    dataList(tableData) {
      let _this = this;
      let data = tableData;
      data.forEach((item, index) => {
        if (item.bankAccountArea) {
          item.bankAccountArea =
            this.getBankAreaChinese(item.bankAccountArea) +
            "-" +
            item.bankAccountArea;
        }
        if (item.orgNature == 1) {
          item.orgNature = "公立";
        } else {
          item.orgNature = "民营";
        }
        if (item.status == 1) {
          item.status = "启用";
        } else {
          item.status = "停用";
        }
      });
      this.lists = data;
      // console.log(data);
    },
    addData() {
      this.items = [
        {
          overallType: "3",
          regionProvince: 3879,
          regionCity: "",
          regionDistrict: "",
          regionStreet: "",
          province: "北京市",
          city: "",
          district: "",
          street: []
        }
      ];
      this.modelType = 1;
      this.tab_pane_disabled=false;
      this.dialogVisible = true;
      this.dialogTitile = "新增评估机构";
      this.ruleForm = {
        orgId: "",
        orgName: "",
        orgCode: "",
        orgNature: "",
        address: "",
        legalRepresentativeName: "",
        legalRepresentativePhone: "",
        managingStaffName: "",
        managingStaffPhone: "",
        status: "",
        createdTime: "",
        bankAccountName: "",
        bankAccountNumber: "",
        bankAccountArea: "",
        branchBankName: "",
        branchBankNumber: ""
      };
      this.oldOrgCode=null;
      this.bankProvince = "";
      let _this = this;
      this.$nextTick(() => {
        _this.$refs["ruleForm"].clearValidate();
      });
    },
    updateData() {
      if (this.checkData.length != 1) {
        this.$message({ type: "warning", message: "请选择一条数据进行修改" });
      } else {
        this.modelType = 0;
        this.dialogTitile = "评估机构资料修改";
        this.tab_pane_disabled=false;
        this.dialogVisible = true;
        this.items = []; //防出错（点击详情发现只有省份）
        let _this = this;
        this.$nextTick(() => {
          _this.$refs["ruleForm"].clearValidate();
        });
        let data = JSON.parse(JSON.stringify(this.checkData[0]));
        // console.log(data.bankAccountArea);
        if (data.bankAccountArea && !Number.isInteger(data.bankAccountArea)) {
          data.bankAccountArea = parseInt(
            this.checkData[0].bankAccountArea.split("-")[1]
          );
        } else {
          this.bankProvince = "";
          // data.bankAccountArea=parseInt(data.bankAccountArea);
          data.bankAccountArea = this.checkData[0].bankAccountArea;
        }
        this.ruleForm.address = data.address;
        this.ruleForm.bankAccountArea = data.bankAccountArea;
        this.ruleForm.bankAccountName = data.bankAccountName;
        this.ruleForm.bankAccountNumber = data.bankAccountNumber;
        this.ruleForm.bedCostRelief = data.bedCostRelief;
        this.ruleForm.bedCostStandard = data.bedCostStandard;
        this.ruleForm.branchBankName = data.branchBankName;
        this.ruleForm.branchBankNumber = data.branchBankNumber;
        this.ruleForm.createdTime = data.createdTime;
        this.ruleForm.id = data.id;
        this.ruleForm.legalRepresentativeName = data.legalRepresentativeName;
        this.ruleForm.legalRepresentativePhone = parseInt(
          data.legalRepresentativePhone
        );
        this.ruleForm.managingStaffName = data.managingStaffName;
        this.ruleForm.managingStaffPhone = parseInt(data.managingStaffPhone);
        this.ruleForm.orderStr = data.orderStr;
        this.ruleForm.orgCode = data.orgCode;
        this.oldOrgCode=data.orgCode;
        this.ruleForm.orgCodeLike = data.orgCodeLike;
        this.ruleForm.orgId = data.orgId;
        this.ruleForm.orgLinks = data.orgLinks;
        this.ruleForm.orgName = data.orgName;
        this.ruleForm.orgNameLike = data.orgNameLike;
        // this.ruleForm.orgNature=data.orgNature;
        this.ruleForm.orgType = data.orgType;
        this.ruleForm.pageFlag = data.pageFlag;
        // this.ruleForm.status=data.status;

        this.ruleForm.orgNature = data.orgNature == "公立" ? 1 : 0;
        this.ruleForm.status = data.orgNature == "启用" ? 1 : 0;
        this.getBankAreaChinese(data.bankAccountArea);
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/intact/intact_organization_mng/query_intact_responsible_area?relationObjectId=${
            encodeURI(data.orgId)
          }`
        }).then(res => {
          if (res.data.resultCode == "000000") {
            let result = res.data.data;
            let resData = JSON.parse(JSON.stringify(res.data.data));
            if (resData.length >= 1) {
              resData.forEach(item => {
                item.overallType = item.overallType + "";
                if (item.regionProvince) {
                  item.province = item.regionProvince.split("-")[1];
                  item.regionProvince = parseInt(
                    item.regionProvince.split("-")[0]
                  );
                } else {
                  item.province = "";
                  item.regionProvince = "";
                }
                if (item.regionCity) {
                  item.city = item.regionCity.split("-")[1];
                  item.regionCity = parseInt(item.regionCity.split("-")[0]);
                } else {
                  item.city = "";
                  item.regionCity = "";
                }
                if (item.regionDistrict) {
                  item.district = item.regionDistrict.split("-")[1];
                  item.regionDistrict = parseInt(
                    item.regionDistrict.split("-")[0]
                  );
                } else {
                  item.district = "";
                  item.regionDistrict = "";
                }
                // if (item.regionStreet) {
                //   item.street = item.regionStreet.split("-")[1];
                //   item.regionStreet = parseInt(item.regionStreet.split("-")[0]);
                // } else {
                //   item.street = "";
                //   item.regionStreet = "";
                // }
                if (
                  item.regionStreet &&
                  item.regionStreet != NaN &&
                  item.regionStreet != "-"
                ) {
                  item.street = item.regionStreet.split(",");
                } else {
                  item.street = [];
                  item.regionStreet = "";
                }
              });
            }
            this.items = resData;
          } else {
            this.$message("未获取到负责区域");
            $(".areabox").hide();
            this.provinceSelect = "";
          }
        });
      }
    },
    deleteData() {
      let _this = this;
      if (this.checkData.length != 1) {
        this.$message({ type: "warning", message: "请选择一条数据进行操作" });
      } else {
        this.$confirm("是否确定删除该条数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            _this
              .$axios({
                method: "get",
                url: `${_this.$store.state.globalRouter}/auth/organization/${
                  _this.module
                }/remove?id=${encodeURI(_this.checkData[0].orgId)}`
              })
              .then(res => {
                if (res.data.data) {
                  _this.$message({ type: "success", message: "删除成功" });
                  this.currentPage = 1;
                  this.getData();
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消"
            });
          });
      }
    },
    searchData() {
      this.getData();
    },
    protocolDetails(index, rowData) {
      this.tab_pane_disabled=true;
      this.dialogVisible2 = true;
      // this.items=[];//防出错（点击详情发现只有省份）
      // let data = JSON.parse(JSON.stringify(rowData));
      this.modelType = 2;
      let data = rowData;
      this.detailForm.address = data.address;
      this.detailForm.bankAccountArea = data.bankAccountArea;
      this.detailForm.bankAccountName = data.bankAccountName;
      this.detailForm.bankAccountNumber = data.bankAccountNumber;
      this.detailForm.bedCostRelief = data.bedCostRelief;
      this.detailForm.bedCostStandard = data.bedCostStandard;
      this.detailForm.branchBankName = data.branchBankName;
      this.detailForm.branchBankNumber = data.branchBankNumber;
      this.detailForm.createdTime = data.createdTime;
      this.detailForm.id = data.id;
      this.detailForm.legalRepresentativeName = data.legalRepresentativeName;
      this.detailForm.legalRepresentativePhone = data.legalRepresentativePhone;
      this.detailForm.managingStaffName = data.managingStaffName;
      this.detailForm.managingStaffPhone = data.managingStaffPhone;
      this.detailForm.orderStr = data.orderStr;
      this.detailForm.orgCode = data.orgCode;
      this.detailForm.orgCodeLike = data.orgCodeLike;
      this.detailForm.orgId = data.orgId;
      this.detailForm.orgLinks = data.orgLinks;
      this.detailForm.orgName = data.orgName;
      this.detailForm.orgNameLike = data.orgNameLike;
      // this.detailForm.orgNature=data.orgNature;
      this.detailForm.orgType = data.orgType;
      this.detailForm.pageFlag = data.pageFlag;
      // this.detailForm.status=data.status;

      this.detailForm.orgNature = rowData.orgNature == "公立" ? 1 : 0;
      this.detailForm.status = rowData.orgNature == "启用" ? 1 : 0;
      this.$axios({
        method: "get",
        url: `${
          this.$store.state.globalRouter
        }/auth/intact/intact_organization_mng/query_intact_responsible_area?relationObjectId=${
          encodeURI(rowData.orgId)
        }`
      }).then(res => {
        if (res.data.resultCode == "000000") {
          let result = res.data.data;
          this.detailForm.orgId = result.relationObjectId;
          let resData = JSON.parse(JSON.stringify(result));
          if (resData.length >= 1) {
            resData.forEach(item => {
              item.overallType = item.overallType + "";
              if (item.regionProvince) {
                item.province = item.regionProvince.split("-")[1];
                item.regionProvince = parseInt(
                  item.regionProvince.split("-")[0]
                );
              } else {
                item.province = "";
                item.regionProvince = "";
              }
              if (item.regionCity) {
                item.city = item.regionCity.split("-")[1];
                item.regionCity = parseInt(item.regionCity.split("-")[0]);
              } else {
                item.city = "";
                item.regionCity = "";
              }
              if (item.regionDistrict) {
                item.district = item.regionDistrict.split("-")[1];
                item.regionDistrict = parseInt(
                  item.regionDistrict.split("-")[0]
                );
              } else {
                item.district = "";
                item.regionDistrict = "";
              }
              if (
                item.regionStreet &&
                item.regionStreet != NaN &&
                item.regionStreet != "-"
              ) {
                item.street = item.regionStreet.split(",");
              } else {
                item.street = [];
                item.regionStreet = "";
              }
            });
          }
          this.items = resData;
        }
      });
      if (
        rowData.bankAccountArea &&
        !Number.isInteger(rowData.bankAccountArea)
      ) {
        this.getBankAreaChinese(rowData.bankAccountArea.split("-")[1]);
      } else {
        this.bankProvince = "";
        this.getBankAreaChinese(rowData.bankAccountArea);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          data.orgId = parseInt(this.ruleForm.orgId);
          let areaData = JSON.parse(JSON.stringify(this.items));
          areaData.forEach((item, index) => {
            item.regionProvince = item.regionProvince + "-" + item.province;
            item.regionCity = item.regionCity + "-" + item.city;
            item.regionDistrict = item.regionDistrict + "-" + item.district;
            if (item.street) {
              item.regionStreet = item.street.join(",");
            } else {
              item.regionStreet = null;
            }
          });
          if (this.modelType) {
            // console.log("新增");
            data.orgId = "";
            data.orgType = 2;
            // console.log(data);
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/organization/${
                this.module
              }/save`,
              data
            }).then(res => {
              // console.log(res);
              if (res.data.data) {
                this.$message({ type: "success", message: "添加成功！" });
                this.dialogVisible = false;
                //保存负责区域
                areaData.forEach((item, index) => {
                  item.relationObjectId = res.data.data + "";
                });
                this.$axios({
                  method: "post",
                  url: `${
                    this.$store.state.globalRouter
                  }/auth/intact/intact_organization_mng/submit_intact_responsible_area`,
                  data: areaData
                }).then(res => {
                  if (res.data.resultCode == "000000") {
                  } else {
                    this.$message("修改负责范围失败！服务出错");
                  }
                });
                this.getData();
              }
            });
          } else {
            // console.log("修改");
            areaData.forEach((item, index) => {
              item.relationObjectId = this.ruleForm.orgId;
            });
            this.$axios({
              method: "post",
              url: `${
                this.$store.state.globalRouter
              }/auth/intact/intact_organization_mng/submit_intact_responsible_area`,
              data: areaData
            }).then(res => {
              if (res.data.resultCode == "000000") {
              } else {
                this.$message("修改负责范围失败！服务出错");
              }
            });
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/organization/${
                this.module
              }/update?id=${encodeURI(parseInt(this.ruleForm.orgId))}`,
              data
            }).then(res => {
              if (res.data.data) {
                this.$message({ type: "success", message: "修改成功！" });
                this.dialogVisible = false;
                this.getData();
              }
            });
          }
        } else {
          this.$message({ type: "error", message: "非法输入！" });
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.reload();
        })
        .catch(_ => {});
      // this.getData();
    },
    resetData() {
      this.searchForm.orgName = "";
      this.searchForm.orgCode = "";
      this.getData();
    },
    // 分页
    handleCurrentChange(val) {
      this.$axios({
        url: `${this.$store.state.globalRouter}/auth/organization/${
          this.module
        }/pagination?orgType=2&orgCodeLike=${
          encodeURI(this.searchForm.orgCode)
        }&orgNameLike=${encodeURI(this.searchForm.orgName)}&pageNo=${val}&pageSize=${
          this.changePageSize
        }`,
        method: "get"
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    addArea() {
      this.items.push({
        overallType: "3",
        regionProvince: "",
        regionCity: "",
        regionDistrict: "",
        regionStreet: "",
        province: "北京市",
        city: "",
        district: "",
        street: []
      });
    },
    //删除所负责的区域
    deleteArea(val) {
      this.items.splice(val, 1);
    },
    cancle() {
      this.dialogVisible = false;
      this.getData();
      this.checkData = "";
      this.reload();
    },

    getReloadData(that) {
      that
        .$axios({
          url: `${that.$store.state.globalRouter}/auth/organization/${
            that.module
          }/pagination?orgType=2&pageNo=1&pageSize=${that.changePageSize}`,
          method: "get"
        })
        .then(res => {
          if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
          } else {
            that.total = res.data.totalCount;
            that.currentPage = res.data.curPage;
            that.resData = res.data.resultList;
            //   console.log(that.resData)
            that.dataList(that.resData); //列出列表
          }
        });
    }
  },
  watch: {
    bankProvince: function() {
      if (this.bankProvince) {
        let _this = this;
        let data = this.$store.state.bankAccountArea;
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
    // 增删改审的权限判断
    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "机构管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "core/assess_org") {
              // console.log("评估机构", submenu[j]);
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
  flex: 0;
  width: 80%;
  text-align: left;
}
/* .el-form-item {
  border-bottom: 1px solid #eeeeee;
} */
.el-pagination {
  text-align: left;
}

</style>
<style>
#assessOrg .el-dialog__footer {
    padding: 20px;
    padding-top: 10px;
    text-align: center;
    box-sizing: border-box;
}
</style>

