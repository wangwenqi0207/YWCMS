// 机构护理费用结算
<template>
  <div style="padding:20px;height:100%">
    <div class="tableBox" style="height:95%;background:#fff;padding:5px;">
      <div el-row style="margin:10px 0;text-align: left;">
        <div el-col span="24">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addData">新增</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="updateData">修改</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="deleteData">删除</el-button>
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
        <el-form-item label="机构名称" label-width="80px" span="5">
          <!-- <el-input v-model="searchForm.fullname" clearable></el-input> -->
          <el-select v-model="value" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.orgId"
              :label="item.orgName"
              :value="item.orgId"
            ></el-option>
          </el-select>
          <!-- <el-select v-model="nursingOrgType" placeholder="请选择" clearable="">
              <el-option label="居家护理" value="4"></el-option>
              <el-option label="机构护理" value="5"></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetData" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- Table -->
      <div style="padding:5px;height:80%">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="lists"
        border
        stripe
        style="width: 100% ;text-align:left"
        :default-sort="{prop: 'date', order: 'descending'}"
        @select="checkOut"
        height="100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <!-- <el-table-column prop="id" label="序号" width="100" sortable></el-table-column> -->
        <el-table-column prop="code" label="结算单号" width="150" sortable></el-table-column>
        <el-table-column prop="orgName" label="机构名称" width="150" sortable></el-table-column>
        <el-table-column prop="orgType" label="机构类型" width="200" sortable></el-table-column>
        <el-table-column prop="balanceMonth" label="结算月份" width="150" sortable></el-table-column>
        <el-table-column prop="lifeNursingCost" label="生活护理费用（元）" sortable width="200"></el-table-column>
        <el-table-column prop="medicalNursingCost" label="医疗护理费用(元)" sortable width="200"></el-table-column>
        <el-table-column prop="nursingCost" label="护理总费用(元)" sortable width="220"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable min-width="250px" ></el-table-column>
        <!-- <el-table-column prop="auditUserName" label="结算人操作人员" sortable width="200"></el-table-column> -->
      </el-table>
      </div>
      <!-- 模态框 -->
      <el-dialog
        :title="dialogTitile"
        :visible.sync="dialogVisible"
        width="600px"
        top="50px"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :rules="rules"
          label-width="150px"
          label-position="left"
          class="demo-ruleForm"
          validate-on-rule-change
        >
          <el-form-item label="机构名称" prop="orgId" width="200">
            <el-col :span="24">
              <el-select
                v-model="ruleForm.orgId"
                placeholder="请选择"
                clearable
                @change="orgSelect"
                :disabled="orgSelectDIs"
                style="width:100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.orgId"
                  :label="item.orgName"
                  :value="item.orgId"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="机构类型" prop="orgType" width="200">
            <el-radio-group v-model="ruleForm.orgType" :disabled="nursingOrgTypeDis">
              <el-radio label="4">机构护理</el-radio>
              <el-radio label="5">居家护理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择结算月份" prop="balanceMonth" width="200">
            <el-col :span="24" clearable>
              <div class="block" style="width:100%">
                <el-date-picker
                  v-model="ruleForm.balanceMonth"
                  format="yyyy年MM月"
                  value-format="yyyy-MM"
                  type="month"
                  :picker-options="pickerOptionsMonth"
                  :disabled="orgSelectDIs"
                  style="width:100%"
                ></el-date-picker>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="生活护理月费用" prop="lifeNursingCost" width="200">
            <el-col :span="24">
              <el-input v-model="ruleForm.lifeNursingCost" size="small" @input='oninput' style="width:100%"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="医疗护理月费用" prop="medicalNursingCost" width="200">
            <el-col :span="24">
              <el-input v-model="ruleForm.medicalNursingCost" size="small" style="width:100%"></el-input>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="护理总费用" prop="nursingCost" width="200">
            <el-col :span="10">
              <el-input v-model="ruleForm.nursingCost" size="small"></el-input>
            </el-col>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          <el-button @click="cancle" size="mini">取 消</el-button>
        </span>
      </el-dialog>

      <!-- 详情模态框 -->
      <el-dialog title="客服人员详细资料" :visible.sync="dialogVisible2" width="600px" top="50px">
        <el-form
          :model="detailForm"
          :rules="rules"
          label-width="150px"
          class="demo-ruleForm"
          disabled
        >
          <el-form-item label="姓名" prop="name" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="工号" prop="empno" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.empno"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="身份证号码" prop="idcard" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.idcard"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="人员类别" prop="type" width="200">
            <el-radio-group v-model="detailForm.type">
              <el-radio value="0" label="普通客服"></el-radio>
              <el-radio value="1" label="高级客服"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="职称" prop="proTitle" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.proTitle"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="工作电话" prop="workPhone" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.workPhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="联系地址" prop="address" width="200">
            <el-col :span="20">
              <el-input v-model="detailForm.address"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="状态" prop="status" width="200">
            <el-radio-group v-model="detailForm.status">
              <el-radio value="1" label="在职"></el-radio>
              <el-radio value="0" label="离职"></el-radio>
            </el-radio-group>
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
import base from "../../base/base";
export default {
  inject: ['reload'],
  mixins: [base],
  data() {
    return {
      // module: "customer_service_mng",
      module: "nursin_cost_balance_month_org",
      dialogVisible: false,
      dialogVisible2: false,
      dialogTitile: "新增客服人员",
      modelType: 1,
      searchForm: {
        fullname: "",
        idcard: "",
        empno: ""
      },
      lists: [],
      ruleForm: {
        orgId: "",
        orgType: 4 + "",
        orgName: "",
        balanceMonth: "",
        nursingCost: "",
        lifeNursingCost: "",
        medicalNursingCost: ""
      },
      rules: {
        orgId: [{ required: true, message: "请选择机构", trigger: "change" }],
        orgType: [{ required: true, message: "机构类型必选", trigger: "change" }],
        balanceMonth: [{ required: true, message: "请选择月份", trigger: "change" }],
        type: [{ required: true, message: "请选择客服等级", trigger: "blur" }],
        lifeNursingCost: [
          { required: true, message: "生活护理费用不能为空" },
          // { type: "number", message: "必须为数字值" },
          { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '最多精确到两位小数',trigger:'blur'}
          ],
        medicalNursingCost: [
          { required: true, message: "医疗护理费用不能为空"},
          // { type: "number", message: "必须为数字值",trigger:'blur' },
          { pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '最多精确到两位小数',trigger:'blur'}
          ]
      },
      detailForm: {
        name: "",
        idcard: "",
        empno: "",
        type: "0",
        proTitle: "",
        workPhone: "",
        address: "",
        status: "0"
      },
      checkData: [],
      loading: false,
      options: [],
      nursingOrgType: "4",
      value:"",
      nursingOrgTypeDis:true,
      firstDay:Date.now(),
      pickerOptionsMonth:{
        disabledDate(time) {
          let data=new Date();
          data.setDate(1);
          data.setHours(0);
          data.setSeconds(0);
          data.setMinutes(0);
            return time.getTime() >(data.getTime()-3600 * 1000 * 24);
          },
      },
      orgSelectDIs:false
    };
  },
  methods: {
    oninput(val){
      // console.log(val);
    },
    checkOut(val) {
      this.checkData = val;
      // console.log(val);
    },
    getData() {
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/nursing/${
          encodeURI(this.module)
        }/pagination?orgId=${encodeURI(this.value)}&pageNo=${encodeURI(this.currentPage)}&pageSize=${
          encodeURI(this.changePageSize)
        }`
      }).then(res => {
        this.loading = false;
        if (res.data.resultList) {
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.resData = res.data.resultList;
          this.dataList(res.data.resultList);
          if (!res.data.resultList.length) {
            this.$message({ type: "info", message: "暂无数据" });
          }
        }
      });
    },
    dataList(tableData) {
      let _this = this;
      let data = JSON.parse(JSON.stringify(tableData));
      data.forEach((item, index) => {
        item.orgType = item.orgType==4?"机构护理" : "居家护理";
      });
      this.lists = data;
    },
    addData() {
      let _this=this;
      this.dialogVisible = true;
      this.modelType = 1;
      this.dialogTitile = "新增护理机构结算";
      this.orgSelectDIs=false;
      this.ruleForm={
        orgId: "",
        orgType: 4 + "",
        orgName: "",
        balanceMonth: "",
        nursingCost: "",
        lifeNursingCost: "",
        medicalNursingCost: ""
      };
      this.$nextTick(()=>{
        _this.$refs['ruleForm'].clearValidate();
      })
    },
    updateData() {
      if (this.checkData.length != 1) {
        this.$message({ type: "info", message: "请选择一条数据进行修改" });
      } else {
        this.modelType = 0;
        this.dialogTitile = "修改护理机构结算";
        this.dialogVisible = true;
        let check = JSON.parse(JSON.stringify(this.checkData[0]));
        console.log(check)
        this.ruleForm.id=check.id;
        this.ruleForm.orgId = check.orgId;
        this.ruleForm.orgName = check.orgName;
        this.ruleForm.orgType=check.orgType=="机构护理"?"4":"5";
        this.ruleForm.balanceMonth = check.balanceMonth;
        this.ruleForm.nursingCost = check.nursingCost;
        this.ruleForm.lifeNursingCost = check.lifeNursingCost;
        this.ruleForm.medicalNursingCost = check.medicalNursingCost;
        this.ruleForm.nursingCost = check.nursingCost;
        this.ruleForm.code=check.code;
        this.orgSelectDIs=true;
        this.checkData = "";
      }
    },
    deleteData() {
      let _this = this;
      if (this.checkData.length != 1) {
        this.$message("请选择一条数据进行删除");
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
                url: `${_this.$store.state.globalRouter}/auth/nursing/${
                  encodeURI(_this.module)
                }/remove?id=${encodeURI(_this.checkData[0].id)}`
              })
              .then(res => {
                if (res.data.resultCode == "000000") {
                  _this.$message({ type: "success", message: "删除成功" });
                  this.getData();
                } else {
                  _this.$message({
                    type: "error",
                    message: "删除失败，服务出错"
                  });
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          // 判断新增还是修改
          console.log(data);
          data.orgType=parseInt( data.orgType);
          data.lifeNursingCost=Number(data.lifeNursingCost);
          data.medicalNursingCost=Number(data.medicalNursingCost);
          data.nursingCost=data.lifeNursingCost+data.medicalNursingCost;
          if (this.modelType) {
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/nursing/${encodeURI(this.module)}/save`,
              data
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.$message({ type: "success", message: "添加成功!" });
                this.dialogVisible = false;
                this.getData();
              } else if(res.data.resultCode=='400907') {
                this.$message({type:'error',message:res.data.resultMsg});
                this.dialogVisible = false;
                this.getData();

              }else{
                this.$message({ type: "error", message: "添加失败!服务出错" });
                this.dialogVisible = false;
                this.getData();
                }
            });
          } else {
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/nursing/${encodeURI(this.module)}/update`,
              data
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.$message({ type: "success", message: "修改成功!" });
                this.dialogVisible = false;
                this.getData();
              } else {
                this.$message({ type: "error", message: "修改失败!服务出错" });
                this.dialogVisible = false;
                this.getData();
              }
            });
          }
        } else {
          this.$message({ type: "info", message: "非法输入！" });
        }
      });
      this.checkData = "";
    },
    searchData() {
      this.getData();
    },
    protocolDetails(index, rowData) {
      // console.log(rowData);
      this.dialogVisible2 = true;
      let check = JSON.parse(JSON.stringify(rowData));
      let data = {
        empno: check.empno,
        name: check.name,
        idcard: check.idcard,
        proTitle: check.proTitle,
        status: check.status,
        type: check.type,
        address: check.address,
        workPhone: check.workPhone
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
      this.org = data.orgId;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.checkData = "";
        })
        .catch(_ => {});
    },
    resetData() {
      this.value=""
      this.getData();
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`,this.pageSize);
      this.changePageSize = val;
      this.currentPage=1;
      this.getData();
    },
    cancle() {
      this.clearValidate();
      this.dialogVisible = false;
      this.getData();
    },
    clearValidate: function() {
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].clearValidate();
      }
    },
    loadAllNursingOrg() {
      let orgArray = [];
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/organization/organization_nursing_service_mng/load_all_org`,
        type: "get"
      })
        .then(res => {
          if (res.data.resultCode == "000000") {
            let data = JSON.parse(JSON.stringify(res.data.data));
            // console.log(data);
            data.forEach((item, index) => {
              if (item.orgType == 4 || item.orgType == 5) {
                orgArray.push(item);
              }
            });
            // console.log(orgArray);
            this.options = orgArray;
          }
          if (res.data.resultCode == "100005") {
            this.$router.push({ path: "/" });
          }
        })
        .catch(error => {
          this.$message({ type: "error", message: error });
        });
    },
    orgSelect(val) {
      let BreakException = {};
      try {
         this.options.forEach((item, index) => {
        if (item.orgId == val) {
          this.ruleForm.orgName = item.orgName;
          this.ruleForm.orgType=item.orgType+'';
          this.nursingOrgTypeDis=true;
          throw BreakException;
        } else {
          this.ruleForm.orgName = "";
        }
      });
      } catch (e) {
        if (e !== BreakException) throw e;
      }
    }
  },
  mounted() {
    this.getData();
    this.loadAllNursingOrg();
    // let data=new Date();
    // data.setDate(1);
    // data.setHours(0);
    // data.setSeconds(0);
    // data.setMinutes(0);
    // this.firstDay=data;
  },
  updated() {
    this.clearValidate();
  }
};
</script>
<style scoped>
.demo-ruleForm {
  flex: 0;
  width: 90%;
  text-align: left;
  margin: auto;
}
.el-form-item {
  margin-bottom: 15px;
}
.el-pagination {
  text-align: left;
}
.el-dialog {
  display: flexs;
  flex-direction: column;
  max-height: calc(100% - 30px);
}
.el-dialog__body {
  overflow: auto;
}
</style>
