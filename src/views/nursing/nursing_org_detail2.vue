<template>
  <div style="padding:20px;height:100%">
    <div class style="height:100%;background:#fff;padding:5px;">
      <div el-row style="margin:10px 0;text-align: left; height:30px">
        <div el-col span="24">
          <el-button
            v-if="urlRole1==1"
            type="primary"
            size="mini"
            icon="el-icon-d-arrow-left"
            @click="goBack"
          >返回</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div>
        <el-tabs type="border-card" @tab-click="tabClick">
          <el-tab-pane label="基本信息">
            <div>
              <el-container style="height:660px;overflow:auto;width:100%">
                <el-form
                  :model="baseInfoForm"
                  :rules="rules"
                  ref="baseInfoForm"
                  label-position="right"
                  label-width="20%"
                  size="mini"
                  class="demo-baseInfoForm"
                  style="width:60%;text-align:left"
                  :disabled="baseInfoDis"
                >
                  <!-- <el-form-item>模态框状态{{modelType}}</el-form-item> -->
                  <el-form-item label="组织机构代码" prop="orgCode">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.orgCode"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="机构名称" prop="orgName">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.orgName"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="机构类型" prop="orgType">
                    <el-radio-group v-model="baseInfoForm.orgType">
                      <el-radio :label="4" value="4">机构护理类型</el-radio>
                      <el-radio :label="5" value="5">居家护理类型</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="机构性质" prop="orgNature">
                    <el-radio-group v-model="baseInfoForm.orgNature">
                      <el-radio :label="1" value="1">公立</el-radio>
                      <el-radio :label="2" value="2">民营</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="机构所属地区" required>
                    <!-- <el-cascader
                      expand-trigger="click"
                      :options="options2"
                      @active-item-change="handleItemChange"
                      :props="props"
                      clearable
                    ></el-cascader> -->
                    <el-col :span='5'>
                      <el-select v-model="value2" placeholder="请选择省份"></el-select>
                    </el-col>
                    <el-col :span='5'>
                      <el-select v-model="value2" placeholder="请选择市"></el-select>                      
                    </el-col>
                    <el-col :span='5'>
                      <el-select v-model="value2" placeholder="请选择区县"></el-select>                      
                    </el-col>
                    <el-col :span='5'>
                      <el-select v-model="value2" placeholder="请选择街道"></el-select>                      
                    </el-col>
                  </el-form-item>
                  <el-form-item label="机构详细地址" prop="address">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.address"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="专管员" prop="managingStaffName">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.managingStaffName"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="专管员电话" prop="managingStaffPhone">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.managingStaffPhone"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="法人代表" prop="legalRepresentativeName">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.legalRepresentativeName  "></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="法人代表电话" prop="legalRepresentativePhone">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.legalRepresentativePhone"></el-input>
                    </el-col>
                  </el-form-item>
                  <!-- 床位费用 -->
                  <el-form-item
                    label="床位费用（标准）"
                    prop="bedCostStandard"
                    v-if="baseInfoForm.orgType==4"
                  >
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.bedCostStandard"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item
                    label="床位费用（救济）"
                    prop="bedCostRelief"
                    v-if="baseInfoForm.orgType==4"
                  >
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.bedCostRelief"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="baseInfoForm.status">
                      <el-radio :label="1" value="1">启动</el-radio>
                      <el-radio :label="2" value="2">暂停</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <!-- 统筹范围 -->
                  <el-form-item label="负责范围">
                    <el-col :span="15">
                      <child-page
                        v-for="(item,index) in items"
                        :key="index"
                        :index="index"
                        :items="items[index]"
                        :modelType="modelType"
                        :flage="flage"
                        @deleteIndexArea="deleteArea"
                      ></child-page>
                      <div id="addAreaButton">
                        <el-button type="primary" size="mini" @click="addArea">添加负责范围</el-button>
                      </div>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="银行户名" prop="bankAccountName">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.bankAccountName"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="银行卡号" prop="bankAccountNumber">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.bankAccountNumber"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="银行支行名称" prop="branchBankName">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.branchBankName"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="银行联行号（支行代码）" prop="branchBankNumber">
                    <el-col :span="10">
                      <el-input v-model="baseInfoForm.branchBankNumber"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="开户银行区域">
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
                      style="height:25px;width:50px; text-align:center"
                      v-model="baseInfoForm.bankAccountArea"
                    >
                  </el-form-item>
                </el-form>
              </el-container>
              <span>{{submitBarContent}}</span>
              <span v-if="submitBar==1">
                <el-button
                  type="primary"
                  @click="submitForm('baseInfoForm')"
                  :disabled="isDisabled"
                  size="mini"
                >提交</el-button>
                <el-button @click="cancle('baseInfoForm')" size="mini">重 置</el-button>
              </span>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="baseInfoForm.orgType==4" label="床位信息">
            <el-container v-if="nursingOrgAction">
              <div el-col span="24">
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="addData">新增</el-button>
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateData">修改</el-button>
                <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteData">删除</el-button>
              </div>
            </el-container>
            <el-container>
              <el-table
                ref="bedInfoData"
                :data="bedInfoData"
                tooltip-effect="dark"
                height="660"
                style="width: 100%;margin-top:10px"
                stripe
                border
                size="mini"
                @selection-change="handleSelectionChange"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
              >
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="roomNo" label="房间号"></el-table-column>
                <el-table-column prop="bedNo" label="床号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="bedType" label="类型" show-overflow-tooltip></el-table-column>
              </el-table>
            </el-container>
          </el-tab-pane>
          <el-dialog title="床位信息" :visible.sync="bedInfoDialog" width="30%" center>
            <el-container>
              <el-form
                label-position="left"
                label-width="100px"
                :model="bedInfoForm"
                size="mini"
                style="margin:0 auto"
                ref="bedInfoForm"
              >
                <el-form-item label="房间号">
                  <el-input v-model="bedInfoForm.roomNo" clearable></el-input>
                </el-form-item>
                <el-form-item label="床位号">
                  <el-input v-model="bedInfoForm.bedNo" clearable></el-input>
                </el-form-item>
                <el-form-item label="床位类型">
                  <el-select v-model="bedInfoForm.bedType" placeholder="请选择床位类型" clearable>
                    <el-option label="标准" value="1"></el-option>
                    <el-option label="救济" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-container>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancle()" size="mini">取 消</el-button>
              <el-button type="primary" @click="submitBedInfo('bedInfoForm')" size="mini">确 定</el-button>
            </span>
          </el-dialog>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import childPage from "../core/child.vue";
import base from "../../base/base";
export default {
  mixins: [base],
  inject: ["reload"],
  data() {
    return {
      items: [],
      flage: 0,
      nursingOrgAction: true,
      module: "organization_nursing_service_mng",
      nursingOrgId: "",
      submitBar: parseInt(localStorage.getItem("nursingOrgSubmitBar")),
      submitBarContent: "",
      urlRole1: 1,
      urlRole2: 1,
      urlRole3: 1,
      urlRole4: 1,
      bedRole1: 1,
      bedRole2: 1,
      bedRole3: 1,
      nursingOrgType: 1,
      modelType: 1,
      isDisabled: false,
      baseInfoDis: false,
      bedInfoDialog: false,
      baseInfoForm: {
        orgId: "",
        orgName: "",
        orgCode: "",
        orgType: "", //判断护理机构类型控制TAB项
        orgNature: "",
        orgProvince: "",
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
        branchBankNumber: "",
        bedCostStandard: "",
        bedCostRelief: ""
      },
      rules: {
        orgCode: [
          { required: true, message: "机构代码不能为空", trigger: "blur" }
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
          { required: true, message: "法人代表名字不能为空", trigger: "blur" }
        ],
        legalRepresentativePhone: [
          {
            required: true,
            message: "法人代表联系方式不能为空",
            trigger: "blur"
          }
        ],
        managingStaffName: [
          { required: true, message: "专管员姓名不能为空", trigger: "blur" }
        ],
        managingStaffPhone: [
          { required: true, message: "专管员电话不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择机构状态", trigger: "blur" }
        ],
        orgType: [
          { required: true, message: "请选择机构状态", trigger: "blur" }
        ],
        orgProvince:[
          {required: true, message: "请选择机构所在地区"}
        ]
      },
      bedInfoData: [],
      multipleSelection: [],
      bedAction: "",
      bedInfoForm: {
        roomNo: "",
        bedNo: "",
        bedType: ""
      },
      loading: true,
      options2: [{
        label: '江苏',
        cities: []
      }, {
        label: '浙江',
        cities: []
      }],
      props: {
        value: 'label',
        children: 'cities'
      }
    };
  },
  components: {
    childPage
  },
  computed: {},
  methods: {
    loadNuringOrgInfo() {
      this.modelType = parseInt(localStorage.getItem("nursingOrgAction"));
      this.nursingOrgId = localStorage.getItem("nursingOrgId");
      if (this.modelType == 2) {
        localStorage.setItem("nursingOrgSubmitBar", 0);
        console.log("查看详情");
        this.submitBar = 0;
        this.baseInfoDis = true;
        this.bedRole1 = 0;
        this.bedRole2 = 0;
        this.bedRole3 = 0;
      }
      if (this.modelType == 0 || this.modelType == 2) {
        //修改操作或者查看详情操作
        localStorage.setItem("nursingOrgSubmitBar", 1);
        this.$axios({
          method: "get",
          url: `${this.$store.state.globalRouter}/auth/organization/${
            encodeURI(this.module)
          }/load_for_edit`,
          params: {
            id: this.nursingOrgId
          }
        }).then(res => {
          if (res.data.resultCode == "000000") {
            this.items = [];
            let data = JSON.parse(JSON.stringify(res.data.data));
            this.baseInfoForm.orgCode = data.orgCode;
            this.baseInfoForm.orgName = data.orgName;
            this.baseInfoForm.orgId = data.orgId;
            this.baseInfoForm.address = data.address;
            this.baseInfoForm.legalRepresentativeName =
              data.legalRepresentativeName;
            this.baseInfoForm.legalRepresentativePhone =
              data.legalRepresentativePhone;
            this.baseInfoForm.managingStaffName = data.managingStaffName;
            this.baseInfoForm.managingStaffPhone = data.managingStaffName;
            this.baseInfoForm.createdTime = data.createdTime;
            this.baseInfoForm.bankAccountName = data.bankAccountName;
            this.baseInfoForm.bankAccountNumber = data.bankAccountNumber;
            this.baseInfoForm.bankAccountArea = data.bankAccountArea;
            this.baseInfoForm.branchBankName = data.branchBankName;
            this.baseInfoForm.branchBankNumber = data.bankAccountNumber;
            this.baseInfoForm.bedCostStandard = data.bedCostStandard;
            this.baseInfoForm.bedCostRelief = data.bedCostRelief;
            //--------------------
            this.baseInfoForm.orgNature = data.orgNature;
            this.baseInfoForm.status = data.status;
            this.baseInfoForm.orgType = data.orgType;
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
                let resData = JSON.parse(JSON.stringify(res.data.data));
                // console.log(resData);
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
              } else {
                this.$message("未获取到负责区域");
              }
            });
          } else {
            if (res.data.resultCode == "100005") {
              this.$confirm("未登录，请重新登录", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
              })
                .then(() => {
                  this.$router.push({ path: "/" });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消"
                  });
                });
            }
          }
        });
      }
      if (this.modelType == NaN) {
        this.$router.push("/show_info");
      }
    },
    goBack() {
      this.$router.push("/nursing_org");
    },
    //删除所负责的区域
    deleteArea(val) {
      this.items.splice(val, 1);
    },
    addArea() {
      this.items.push({
        overallType: "3",
        regionProvince: "",
        regionCity: "",
        regionDistrict: "",
        regionStreet: "",
        province: "",
        city: "",
        district: "",
        street: []
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.baseInfoForm);
          let data = this.baseInfoForm;
          data.orgId = parseInt(this.baseInfoForm.orgId);
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
          // 新增
          if (this.modelType == 1) {
            data.orgId = "";
            data.pageFlag = 45;
            console.log(data);
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/organization/${
                encodeURI(this.module)
              }/save`,
              data
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.$message({ type: "info", message: "添加成功！" });
                //保存负责区域
                this.submitBar = 0;
                localStorage.setItem("nursingOrgSubmitBar", 0);
                this.submitBarContent =
                  "护理机构基本信息已保存成功，修改请返回";
                this.baseInfoForm.orgId = res.data.data; //返回新增的机构ID
                this.nursingOrgId = res.data.data;
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
                    this.$message({
                      type: "error",
                      message: "修改负责范围失败！服务出错"
                    });
                  }
                });
                // this.getData();
              } else {
                if (res.data.resultCode == "100005") {
                  this.$message({
                    type: "error",
                    message: "用户未登录请重新登录"
                  });
                  this.$router.push.path("/");
                }
                this.$message({ type: "error", message: "保存失败服务出错！" });
              }
            });
          }
          if (this.modelType == 0) {
            //修改
            console.log("修改");
            areaData.forEach((item, index) => {
              item.relationObjectId = this.baseInfoForm.orgId;
            });
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/organization/${
                encodeURI(this.module)
              }/update?id=${parseInt(this.baseInfoForm.orgId)}`,
              data
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.$message({ type: "info", message: "修改成功！" });
              }
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
          }
        } else {
          this.$message({ type: "warning", message: "非法输入！" });
        }
      });
    },
    clearValidate(forName) {
      if (this.$refs[forName] !== undefined) {
        this.$refs[forName].resetFields();
        // this.$refs[forName].clearValidate();
      }
    },
    cancle(val) {
      this.clearValidate(val);
      this.bedInfoDialog = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    tabClick(event) {
      if (event.label == "床位信息") {
        if (this.modelType != 1) {
          this.loading = true;
          this.getData();
        } else {
          this.loading = false;
        }
      }
    },
    getData() {
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/organization/${
          encodeURI(this.module)
        }/get_bed_information_list_by_org_id`,
        params: {
          orgId: this.nursingOrgId
        }
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.loading = false;
          let data = JSON.parse(JSON.stringify(res.data.data));
          this.dataList(data);
        }
      });
    },
    dataList(data) {
      if (data.length >= 1) {
        data.forEach((item, index) => {
          if (item.bedType == 1) {
            item.bedType = "标准";
          }
          if (item.bedType == 2) {
            item.bedType = "救济";
          }
        });
        this.bedInfoData = data;
      }
    },
    addData() {
      this.bedInfoDialog = true;
      this.bedAction = 1;
      this.bedInfoForm.roomNo = "";
      this.bedInfoForm.bedNo = "";
      this.bedInfoForm.bedType = "";
    },
    updateData() {
      if (this.multipleSelection.length == 1) {
        this.bedInfoDialog = true;
        this.bedAction = 0;
        let data = this.multipleSelection[0];
        this.bedInfoForm.roomNo = data.roomNo;
        this.bedInfoForm.bedNo = data.bedNo;
        this.bedInfoForm.bedType = data.bedType;
      } else {
        this.$message({ type: "warning", message: "请选择一条数据进行修改" });
      }
    },
    deleteData() {
      if (this.multipleSelection.length == 1) {
        this.$confirm("是否确定删除该条数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$axios({
              method: "get",
              url: `${this.$store.state.globalRouter}/auth/organization/${
                encodeURI(this.module)
              }/remove_bed_info`,
              params: {
                bedId: this.multipleSelection[0].id
              }
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.$message({ type: "info", message: "删除床位成功" });
                this.bedInfoDialog = false;
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
      } else {
        this.$message({ type: "warning", message: "请选择一条数据进行删除" });
      }
    },
    submitBedInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.bedInfoForm);
          let bedInfo = JSON.parse(JSON.stringify(this.bedInfoForm));
          if (this.baseInfoForm.orgId) {
            bedInfo.orgId = this.baseInfoForm.orgId; //赋值服务机构Id
            if (this.bedAction == 1) {
              this.$axios({
                method: "post",
                url: `${this.$store.state.globalRouter}/auth/organization/${
                  encodeURI(this.module)
                }/add_bed_info`,
                data: bedInfo
              }).then(res => {
                if (res.data.resultCode == "000000") {
                  this.$message({ type: "info", message: "新增床位成功！" });
                  this.bedInfoDialog = false;
                  this.getData();
                }
              });
            }
            if (this.bedAction == 0) {
              bedInfo.id = this.multipleSelection[0].id;
              this.$axios({
                method: "post",
                url: `${this.$store.state.globalRouter}/auth/organization/${
                  encodeURI(this.module)
                }/update_bed_info`,
                data: bedInfo
              }).then(res => {
                if (res.data.resultCode == "000000") {
                  this.$message({ type: "info", message: "修改床位成功！" });
                  this.bedInfoDialog = false;
                  this.getData();
                }
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: "提交机构基本信息后，才能新增床位"
            });
          }
        }
      });
    },
    showAction() {
      if (localStorage.getItem("nursingOrgAction") == 2) {
        this.nursingOrgAction = false;
      } else {
        this.nursingOrgAction = true;
      }
    },
    handleItemChange(val) {
        console.log('active item:', val);
        setTimeout(_ => {
          if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
            this.options2[0].cities = [{
              label: '南京'
            }];
          } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
            this.options2[1].cities = [{
              label: '杭州'
            }];
          }
        }, 300);
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
      this.baseInfoForm.bankAccountArea = this.bankCity;
    }
  },
  mounted() {
    this.loadNuringOrgInfo();
    this.getBankAreaData();
    this.showAction();
  }
};
</script>
<style scoped>
.el-pagination {
  text-align: left;
}
.el-tabs__content {
  height: 80%;
  overflow: auto;
}
</style>


