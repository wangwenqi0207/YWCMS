// 护理项目管理
<template>
  <div style="padding:20px;height:100%">
    <div class="tableBox" style="background:#fff;padding:5px;height:95%;overflow:auto">
      <div el-row style="margin:10px 0;text-align: left;">
        <div el-col span="24">
          <!-- <el-input placeholder="模糊查询协议名称" v-model="searchText" style="width: auto" size="mini"/>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchData">搜索</el-button>-->
          <el-button
            v-if="urlRole1==1"
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="addData"
          >新增</el-button>
          <el-button
            v-if="urlRole2==1"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="updateData"
          >修改</el-button>
          <el-button
            v-if="urlRole3==1"
            type="primary"
            icon="el-icon-delete"
            size="small"
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
        <!-- <el-form-item label="护理项目编号:">
          <el-input v-model="searchForm.id" placeholder="请输入护理项目编号" clearable></el-input>
        </el-form-item>-->
        <el-form-item label="护理名称:">
          <el-input v-model.trim="searchForm.name" placeholder="请输入护理项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="护理项目分类:">
          <el-select v-model="searchForm.type" clearable placeholder="请选择">
            <el-option
              v-for="item in nursing_obj_sorts "
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <div style="padding:5px;height:80%">
      <el-table
        :data="lists"
        border
        stripe
        style="width: 100% ;"
        :default-sort="{prop: 'date', order: 'descending'}"
        @select="checkOut"
        height="100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="编号" width="80" sortable></el-table-column>
        <el-table-column prop="serviceName" label="护理项目名称" width="200" sortable></el-table-column>
        <el-table-column prop="serviceType" label="护理项目分类" width="150"></el-table-column>
        <!-- <el-table-column label="机构护理频次" width="150" sortable></el-table-column>
        <el-table-column label="居家护理频次" width="150" sortable></el-table-column>-->
        <el-table-column prop="serviceCotent" label="护理内容" width="150" sortable></el-table-column>
        <el-table-column prop="servicePrice" label="护理价格（元）" width="150" sortable></el-table-column>
        <el-table-column prop="serviceStatus" label="护理状态" width="150" sortable></el-table-column>
        <el-table-column prop="createName" label="创建人" width="150" sortable></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200" sortable></el-table-column>
        <el-table-column prop="updateTime" label="上次修改时间" sortable width="200"></el-table-column>
        <el-table-column prop="accessDetail" label="护理项目详情" min-width="180" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="protocolDetails(scope.$index, scope.row)"
            >护理项目详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <!-- 模态框 -->
      <el-dialog
        :title="proptype"
        :visible.sync="dialogVisible"
        width="600px"
        center
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
          style="overflow:auto;"
          :disabled="formDisabled"
        >
          <el-form-item label="护理名称" prop="serviceName" >
            <el-input v-model="ruleForm.serviceName" clearable></el-input>
          </el-form-item>
          <el-form-item label="护理项目分类" prop="serviceType">
            <el-select
              v-model="ruleForm.serviceType"
              placeholder="请选择护理项目分类"
              style="width:100%;float:left;"
              clearable
            >
              <el-option label="基础护理" value="1"></el-option>
              <el-option label="临床护理" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="护理项目内容" prop="serviceContent">
            <el-input v-model="ruleForm.serviceContent" clearable></el-input>
          </el-form-item>
          <el-form-item label="护理价格" prop="servicePrice" style="text-align:left;">
            <el-input-number v-model="ruleForm.servicePrice" controls-position="right" clearable :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="护理项目状态" prop="serviceStatus" style="text-align:left;">
            <el-radio-group v-model="ruleForm.serviceStatus" @change="selectStatu">
              <el-radio :label="1">有效</el-radio>
              <el-radio :label="0">无效</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          <el-button @click="cancle()" size="mini">取 消</el-button>
        </span>
      </el-dialog>

      <!-- 详情模态框 -->
      <el-dialog
        title="护理项目详情"
        :visible.sync="dialogVisible2"
        width="600px"
        center
        :before-close="handleClose"
      >
        <el-form
          :model="detailForm"
          ref="detailForm"
          label-width="150px"
          class="demo-ruleForm"
          style="overflow:auto;"
          disabled
        >
          <el-form-item label="护理名称" prop="serviceName">
            <el-input v-model="detailForm.serviceName"></el-input>
          </el-form-item>
          <el-form-item label="护理项目分类" prop="serviceType">
            <el-select
              v-model="detailForm.serviceType"
              placeholder="请选择护理项目分类"
              style="width:100%;float:left;"
            >
              <el-option label="基础护理" value="1"></el-option>
              <el-option label="临床护理" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="护理项目内容" prop="serviceContent">
            <el-input v-model="detailForm.serviceContent"></el-input>
          </el-form-item>
          <el-form-item label="护理价格" prop="servicePrice" style="text-align:left;">
            <el-input v-model="detailForm.servicePrice" ></el-input>
          </el-form-item>
          <el-form-item label="护理项目状态" prop="serviceStatus" style="text-align:left;">
            <el-radio-group v-model="detailForm.serviceStatus" @change="selectStatu">
              <el-radio :label="1" value="1">有效</el-radio>
              <el-radio :label="0" value="2">无效</el-radio>
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
  mixins: [base],
  inject: ["reload"],
  data() {
    let validateserviceName=(rule, value, callback)=>{
      value=value.trim();
      if(this.oldName && value==this.oldName){
        callback()
      }else if(value==null || value==''){
        callback(new Error('护理项目名称必填！'));
      }else{
        this.$axios({
          url   : `${this.$store.state.globalRouter}/auth/nursing/${encodeURI(this.module)}/isExist?name=${encodeURI(value)}`,
          method: "get",
        }).then(res => {
         if(res.data.data){
            callback();
         }else{
           callback(new Error('该护理名称已经存在，请更换护理名称！'));
         }
        });
      }
    };
    return {
      module: "serv_obj_manage",
      proptype: "护理项目新增",
      dialogVisible: false,
      dialogVisible2: false,
      searchForm: {
        id: "",
        name: "",
        type: ""
      },
      oldName:null,
      nursing_obj_sorts: [
        {
          value: 1,
          label: "基础护理"
        },
        {
          value: 2,
          label: "临床护理"
        }
      ],
      value3: "",
      ruleForm: {
        id: "",
        orderStr: null,
        orgLinks: "",
        serviceName: "",
        serviceType: 1,
        serviceContent: "",
        servicePrice: "",
        updateName: "",
        serviceStatus: 1,
        createTime: "",
        createName: "",
        updateTime: ""
      },
      rules: {
        serviceName: [
          { required: true, message: "协议名称必填", trigger: "blur" },
          {validator:validateserviceName,trigger:'blur'}
        ],
        serviceType: [
          { required: true, message: "请选择护理项目分类", trigger: "change" }
        ],
        servicePrice: [
          { required: true, message: "请添加护理项目单价", trigger: "blur" }
        ],
        serviceContent: [
          { required: true, message: "请输入护理内容", tirgger: "blur" }
        ],
        serviceStatus: [
          {
            type: "number",
            required: true,
            message: "该护理项目是否生效",
            tirgger: "blur"
          }
        ]
      },
      detailForm: {
        serviceName: "",
        serviceType: "",
        serviceContent: "",
        servicePrice: "",
        serviceStatus: ""
      },
      lists: [],
      modelType: 1, //1--新增---0----修改
      formDisabled: false,
      checkData: [],

      // 增删改审的权限问题？？
      urlRole1: 0,
      urlRole2: 0,
      urlRole3: 0,
      urlRole4: 0
    };
  },
  methods: {
    getData() {
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/nursing/${
          encodeURI(this.module)
        }/pagination?serviceNameLike=${encodeURI(this.searchForm.name)}&serviceType=${
          encodeURI(this.searchForm.type)
        }&pageNo=${encodeURI(this.currentPage)}&pageSize=${encodeURI(this.changePageSize)}`
      }).then(res => {
        if(res.data.resultCode=='100005'){
          this.$router.push({ path: "/" });
        }
        if (res.data.resultList) {
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.resData = res.data.resultList;
          this.dataList(res.data.resultList);
        }
      });
    },
    dataList(tableData) {
      // console.log(tableData);
      tableData.forEach((item, index) => {
        if (item.serviceStatus == 1) {
          item.serviceStatus = "有效";
        } else {
          item.serviceStatus = "无效";
        }
        if (item.serviceType == 1) {
          item.serviceType = "基础护理";
        } else if (item.serviceType == 2) {
          item.serviceType = "临床护理";
        }

        item.createTime = this.$moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
        item.updateTime = this.$moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss");
      });
      this.lists = tableData;
    },
    checkOut(val) {
      this.checkData = val;
    },
    selectStatu() {},
    searchData() {
      console.log(this.searchForm);
      this.$axios({
        method: "get",
        // url: `${this.$store.state.globalRouter}/auth/nursing/${
        //   this.module
        // }/pagination?serviceNameLike=${this.searchForm.name}&serviceType=${
        //   this.searchForm.type
        // }`
        url: `${this.$store.state.globalRouter}/auth/nursing/${
          encodeURI(this.module)
        }/pagination`,
        params:{
          serviceNameLike:this.searchForm.name,
          serviceType:this.searchForm.type
        }
      }).then(res => {
        if (res.data.resultList) {
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.resData = res.data.resultList;
          this.dataList(res.data.resultList);
        }
      });
    },
    addData() {
      this.modelType = 1;
      this.proptype = "护理项目新增";
      this.dialogVisible = true;
      this.formDisabled = false;
      let _this = this;
      this.ruleForm.serviceName = "";
      this.ruleForm.serviceType = "";
      this.ruleForm.serviceContent = "";
      this.ruleForm.servicePrice = "";
      this.ruleForm.serviceStatus = "";
      this.oldName=null;
      // this.clearValidate('ruleForm');
      this.$nextTick(() => {
        _this.$refs["ruleForm"].clearValidate();
      });
    },
    updateData() {
      this.modelType = 0;
      this.proptype = "护理项目修改";
      this.clearValidate('ruleForm');
      if (this.checkData.length == 1) {
        this.dialogVisible = true;
        let data = this.checkData[0];
        this.ruleForm.id = data.id;
        this.ruleForm.serviceName = data.serviceName;
        this.oldName=data.serviceName;
        this.ruleForm.serviceType = data.serviceType == "临床护理" ? "2" : "1";
        this.ruleForm.serviceContent = data.serviceCotent;
        this.ruleForm.servicePrice = data.servicePrice;
        this.ruleForm.serviceStatus = data.serviceStatus == "有效" ? 1 : 2;
      } else {
        this.$message("请选择一条数据进行修改操作！");
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
                if (res.data.resultCode=='000000') {
                  _this.$message({ type: "success", message: "删除成功" });
                  this.currentPage=1;
                  this.getData();
                }else{
                  this.$message({type:'error',message:res.data.resultMsg})
                }
              });
          })
          .catch(() => {
            this.$message({type: "info",message: "取消"});
          });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.clearValidate('ruleForm');
          done();
          this.getData();
        })
        .catch(_ => {});
    },
    protocolDetails(index, rowData) {
      this.dialogVisible2 = true;
      this.detailForm.serviceName = rowData.serviceName;
      this.detailForm.serviceType =
        rowData.serviceType == "临床护理" ? "2" : "1";
      this.detailForm.serviceContent = rowData.serviceCotent;
      this.detailForm.servicePrice = rowData.servicePrice;
      this.detailForm.serviceStatus = rowData.serviceStatus == "有效" ? 1 : 2;
    },
    submitForm(formName) {
      // this.dialogVisible = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = this.ruleForm;
          let data = {
            serviceName: formData.serviceName,
            serviceCotent: formData.serviceContent,
            serviceType: parseInt(formData.serviceType),
            serviceStatus: formData.serviceStatus,
            servicePrice: formData.servicePrice
          };
          if (this.modelType) {
            console.log(this.ruleForm);
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/nursing/${
                encodeURI(this.module)
              }/save`,
              data
            }).then(res => {
              if (res.data.resultCode=='000000') {
                this.$message({ type: "success", message: "添加成功" });
                this.dialogVisible = false;
                this.getData();
              } else {
                this.$message({ type: "error", message: res.data.resultMsg});
                this.getData();
              }
            });
          } else {
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/nursing/${
                encodeURI(this.module)
              }/update?id=${encodeURI(this.ruleForm.id)}`,
              data
            }).then(res => {
              if (res.data.data) {
                this.dialogVisible = false;
                this.getData();
                this.$message({ type: "success", message: "修改成功" });
              } else {
                this.$message({type:"error",message:"服务出错"});
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.$axios({
        url: `${this.$store.state.globalRouter}/auth/nursing/${
          encodeURI(this.module)
        }/pagination?serviceNameLike=${encodeURI(this.searchForm.name)}&serviceType=${
          encodeURI(this.searchForm.type)
        }&pageNo=${encodeURI(val)}&pageSize=${encodeURI(this.changePageSize)}`,
        method: "get"
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    cancle(done) {
      this.clearValidate('ruleForm');
      this.dialogVisible = false;
      this.getData();
    },
    clearValidate(formName){
      if(this.$refs[formName]){
        this.$refs[formName].clearValidate();
      }
    }
  },
  mounted() {
    this.getData();
    // 增删改审的权限判断
    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "基础配置管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "nursing/nursing_obj") {
              console.log("护理项目管理", submenu[j]);
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
.el-pagination {
  text-align: left;
}
</style>
