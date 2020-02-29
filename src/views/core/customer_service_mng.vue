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
        <el-form-item label="姓名：" label-width="80px" span="5">
          <el-input v-model.trim="searchForm.fullname" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="工号：">
          <el-input v-model="searchForm.empno" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="searchForm.idcard" clearable></el-input>
        </el-form-item> -->
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
        style="width: 100%;"
        :default-sort="{prop: 'date', order: 'descending'}"
        @select="checkOut"
        height="100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="序号" width="100" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" width="150" sortable></el-table-column>
        <el-table-column prop="empno" label="工号" width="150" sortable></el-table-column>
        <el-table-column prop="idcard" label="身份证号" width="200" sortable></el-table-column>
        <!-- <el-table-column prop="gender" label="性别" width="150" sortable></el-table-column> -->
        <el-table-column prop="type" label="人员分类" width="150" sortable></el-table-column>
        <el-table-column prop="proTitle" label="职称" sortable width="150"></el-table-column>
        <el-table-column prop="workPhone" label="工作电话" sortable width="150"></el-table-column>
        <el-table-column prop="address" label="联系地址" sortable width="250"></el-table-column>
        <el-table-column prop="status" label="状态" sortable width="150"></el-table-column>
        <el-table-column prop="accessDetail" label="详情"  sortable min-width="120" fixed="right">
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
        width="600px"
        top="50px"
        :before-close="handleClose"
        center
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
          <el-form-item label="姓名" prop="name" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.name" size="small"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="工号" prop="empno" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.empno" size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="身份证号码" prop="idcard" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.idcard" size="small"></el-input>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="性别" prop="gender" width="200">
            <el-radio-group v-model="ruleForm.gender">
              <el-radio value="1" label="男"></el-radio>
              <el-radio value="2" label="女"></el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="人员类别" prop="type" width="200">
            <el-radio-group v-model="ruleForm.type">
              <el-radio  label="0">普通客服</el-radio>
              <el-radio  label="1">高级客服</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="职称" prop="proTitle" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.proTitle" size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="工作电话" prop="workPhone" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.workPhone" size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="联系地址" prop="address" width="200">
            <el-col :span="20">
              <el-input v-model="ruleForm.address" size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="状态" prop="status" width="200">
            <el-radio-group v-model="ruleForm.status">
              <el-radio  label="1">在职</el-radio>
              <el-radio  label="0">离职</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          <el-button @click="cancle" size="mini">取 消</el-button>
        </span>
      </el-dialog>

      <!-- 详情模态框 -->
      <el-dialog title="客服人员详细资料" :visible.sync="dialogVisible2" width="600px" top="50px" center>
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
  data() {
    return {
      module: "customer_service_mng",
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
        name:'',
        idcard: "",
        empno: "",
        type:'0',
        proTitle: "",
        workPhone: "",
        address: "",
        status: '1',
      },
      rules: {
        name:[
          {required: true, message: "客服姓名必填", trigger: "blur" },
          {pattern:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,message:"请输入真实姓名",trigger:"blur"}
          ],
        idcard:[
          {required: true, message: "身份证号必填", trigger: "blur" },
          {pattern:/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,message:"身份证号码无效",trigger:"blur"}
          ],
        empno:[{required: true, message: "工号必填", trigger: "blur" }],
        type:[{required: true, message: "请选择客服等级", trigger: "blur" }],
        workPhone:[
          { required: true, message: "工作电话必填"},
          // { type: "number", message: "电话必须为数字值" },
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请填大陆有效手机号',trigger:'blur'}
          ],
        address:[{required: true, message: "联系地址必填", trigger: "blur" }],
        status:[{required: true, message: "是否在职", trigger: "blur" }]

      },
      detailForm: {
        name:'',
        idcard: "",
        empno: "",
        type:'0',
        proTitle: "",
        workPhone: "",
        address: "",
        status: '0',
      },
      checkData: [],
      loading:true

    };
  },
  methods: {
    checkOut(val) {
      this.checkData = val;
      // console.log(val);
    },
    getData() {
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/core/${
          this.module
        }/pagination?nameLike=${encodeURI(this.searchForm.fullname)}&pageNo=${this.currentPage}&pageSize=${this.changePageSize}`
      }).then(res => {
        this.loading=false;
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
        item.status = item.status == 1 ? "在职" : "离职";
        item.type=item.type==0?"普通客服":"高级客服";
      });
      this.lists = data;
    },
    addData() {
      this.dialogVisible = true;
      this.modelType = 1;
      this.dialogTitile = "新增客服人员";
      this.ruleForm.name='';
      this.ruleForm.idcard='';
      this.ruleForm.empno='';
      this.ruleForm.proTitle='';
      this.ruleForm.workPhone='';
      this.ruleForm.address='';
    },
    updateData() {
      if (this.checkData.length != 1) {
        this.$message({ type: "info", message: "请选择一条数据进行修改" });
      } else {
        this.modelType = 0;
        this.dialogTitile = "客服人员信息修改";
        this.dialogVisible = true;
        let check = JSON.parse(JSON.stringify(this.checkData[0]));
        let data = {
          empno: check.empno,
          name: check.name,
          idcard: check.idcard,
          proTitle: check.proTitle,
          status: check.status=='在职'?'1':'0',
          type: check.type=='普通客服'?'0':'1',
          workPhone: check.workPhone,
          address:check.address
        }
        this.ruleForm = data;
        this.ruleForm.id=check.id;
        this.checkData='';
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
                url: `${_this.$store.state.globalRouter}/core/${
                  _this.module
                }/remove?id=${encodeURI(_this.checkData[0].id)}`
              })
              .then(res => {
                if (res.data.resultCode=='000000') {
                  _this.$message({ type: "info", message: "删除成功" });
                  this.getData();
                } else {
                  _this.$message({
                    type: "info",
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
          // console.log(data)
          if (this.modelType) {
            // console.log(data);
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/core/${
                this.module
              }/save`,
              data
            }).then(res => {
              if (res.data.resultCode=='000000') {
                this.$message({ type: "info", message: "添加成功!" });
                this.dialogVisible = false;
                this.getData();
              } else {
                this.$message({ type: "info", message: "添加失败!服务出错" });
                this.dialogVisible = false;
              }
            });
          } else {
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/core/${
                this.module
              }/update?id=${encodeURI(this.ruleForm.id)}`,
              data
            }).then(res => {
              if (res.data.resultCode=='000000') {
                this.$message({ type: "info", message: "修改成功!" });
                this.dialogVisible = false;
                this.getData();
              } else {
                this.$message({ type: "info", message: "修改失败!服务出错" });
                this.dialogVisible = false;
                this.getData();
              }
            });
          }
        } else {
          this.$message({ type: "error", message: "非法输入！" });
        }
      });
      this.checkData='';
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
        address:check.address,
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
          this.checkData='';
        })
        .catch(_ => {});
    },
    resetData() {
      this.searchForm.account = "";
      this.searchForm.idcard = "";
      this.searchForm.fullname = "";
      this.searchForm.orgName = "";
      this.searchForm.empno = "";
      this.getData();
    },
    // 分页
    handleCurrentChange(val) {
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/core/${
          this.module
        }/pagination?nameLike=${encodeURI(this.searchForm.fullname)}&pageNo=${val}&pageSize=${this.changePageSize}`
      }).then(res => {
        this.loading=false;
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
    handleSizeChange(val) {
            // console.log(`每页 ${val} 条`,this.pageSize);
    this.changePageSize = val;
    this.getData();
    },
    cancle() {
      this.clearValidate();
      this.dialogVisible = false;
      this.getData();
    },
    clearValidate:function(){
      if(this.$refs['ruleForm']){
        this.$refs['ruleForm'].clearValidate();
      }

    }
  },
  mounted() {
    this.getData();
  },
  updated(){
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
