// 基础配置---评估调查表
<template>
  <div style="padding:20px;height:100%">
    <div class="tableBox" style="background:#fff;padding:5px;height:95%;">
      <div el-row style="margin:10px 0;text-align: left;">
        <div el-col span="24">
          <!-- <el-input placeholder="模糊查询协议名称" v-model="searchText" style="width: auto" size="mini"/>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchData">搜索</el-button>-->
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addData">新增</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="updateData">修改</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="deleteData">删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <!-- 搜索栏 -->
      <el-form
        :inline = "true"
        :model  = "searchForm"
          class = "demo-form-inline"
          size  = "mini"
          style = "text-align:left;"
      >
        <el-form-item label="评估调查表名称">
          <el-input v-model.trim="searchForm.tableName" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.tableStatus" clearable @change="selectStaus">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSearch" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <div style="padding:5px;height:80%">
      <el-table
        :data = "tableLists"
        border
        stripe
            style       = "width: 100% "
          :default-sort = "{prop: 'date', order: 'descending'}"
            @select     = "checkOut"
            height="100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="编号" width="80" sortable></el-table-column>
        <el-table-column prop="questionnaireName" label="评估调查表名称" width="400" sortable></el-table-column>
        <el-table-column prop="status" label="状态" width="80" sortable></el-table-column>
        <el-table-column prop="createUserName" label="创建人" width="100" sortable></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200" sortable></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="200" sortable></el-table-column>
        <el-table-column prop="action" label="操作" min-width="300" fixed="right">
          <template slot-scope="scope">
            <el-button
              size   = "mini"
              type   = "success"
              @click = "assessQuestionTypeMng(scope.$index, scope.row)"
            >评估问题类别管理</el-button>
            <el-button
              size   = "mini"
              type   = "success"
              @click = "assessQuestionMng(scope.$index, scope.row)"
            >评估问题管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <el-dialog
        :title        = "proptype"
        :visible.sync = "dialogVisible"
        width       = "600px"
        center
        :before-close = "handleClose"
      >
        <el-form
          :model        = "ruleForm"
          :rules        = "rules"
            ref         = "ruleForm"
            label-width = "150px"
            class       = "demo-ruleForm"
            style       = "overflow:auto;"
        >
          <el-form-item label="评估调查表名称" prop="questionnaireName">
            <el-input v-model="ruleForm.questionnaireName" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model = "ruleForm.status"
              clearable
              placeholder = "请选择状态"
              style       = "width:100%;float:left;"
            >
              <el-option label="有效" value="1">有效</el-option>
              <el-option label="无效" value="0">无效</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="pageNation" style="height:5%;margin:10px 0;">
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
import { error } from "util";
export default {
  mixins: [base],
  data() {
    let validateQuestionnaireName=(rule, value, callback)=>{
            value=value.trim();
          if(this.oldName && value==this.oldName){
            callback()
          }else if(value==null || value==''){
            callback(new Error('评估调查表名称必填！'));
          }else{
            this.$axios({
              url   : `${this.$store.state.globalRouter}/auth/assess/${this.module}/isExist?name=${encodeURI(value)}`,
              method: "get"
            }).then(res => {
            if(res.data.data){
                callback();
            }else{
              callback(new Error('该评估调查表名称已经存在，请更换名称！'));
            }
            });
          }
    };
    return {
      module       : "assess_questionnaire_mng",
      proptype     : "新增评估调查表",
      dialogVisible: false,
      searchForm   : {
        tableName  : "",
        tableStatus: ""
      },
      tableLists: [],
      ruleForm  : {
        questionnaireName: "",
        status           : ""
      },
      oldName:null,
      rules: {
        questionnaireName: [
          { required: true, message: "请输入评估调查表名称", trigger: "blur" },
          {validator:validateQuestionnaireName,trigger:'blur'}
        ],
        status: [
          { required: true, message: "请选择评估调查表状态", trigger: "blur" }
        ]
      },
      modelType: 1,
      checkData: []
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(
          `${this.$store.state.globalRouter}/auth/assess/${
            this.module
          }/pagination?questionnaireName=${encodeURI(this.searchForm.tableName)}&status=${
            encodeURI(this.searchForm.tableStatus)
          }&pageNo=${encodeURI(this.currentPage)}&pageSize=${encodeURI(this.changePageSize)}`
        )
        .then(res => {
          if (res.data.resultList) {
            this.total       = res.data.totalCount;
            this.currentPage = res.data.curPage;
            this.resData     = res.data.resultList;
            this.dataList(res.data.resultList);
          }
          if (res.data.resultList == null) {
            this.tableLists = [];
            this.$message({ type: "info", message: "暂无数据" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    dataList(tableData) {
      let data = JSON.parse(JSON.stringify(tableData));
      data.forEach((item, index) => {
        item.status     = item.status == 1 ? "有效" : "无效";
        item.createTime = this.$moment(item.createTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        item.updateTime = this.$moment(item.updateTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });
      this.tableLists = data;
    },
    searchData() {
      this.getData();
    },
    addData() {
      this.dialogVisible = true;
      this.proptype      = "新增评估调查表";
      this.modelType     = 1;
      this.oldName=null;
      let _this=this;
      this.$nextTick(()=>{
        _this.$refs['ruleForm'].clearValidate();
      });
      this.ruleForm={
        questionnaireName: "",
        status           : ""
      }
    },
    updateData(){
      let _this=this;
        this.modelType = 0;
        if(this.checkData.length==1){
            this.proptype      = "评估调查表修改"
            this.dialogVisible = true;
            this.$nextTick(()=>{
              _this.$refs['ruleForm'].clearValidate();
            });
            this.ruleForm.id=this.checkData[0].id;
            this.ruleForm.status=this.checkData[0].status=="有效"?'1':'0';
            this.ruleForm.questionnaireName=this.checkData[0].questionnaireName;
            this.oldName=this.checkData[0].questionnaireName;
            // console.log(this.ruleForm);
        }else{
            this.$message({ type: "info", message: "请选择一条数据进行操纵" });
        }
    },
    deleteData(){
      let _this = this;
        if(this.checkData.length==1){
          this.$confirm('是否确定删除该条数据','提示',{
          confirmButtonText: "确定",
          cancelButtonText : "取消",
          type             : "warning",
          center           : true
        }).then(()=>{
          _this.$axios({
            method: 'get',
            url   : `${_this.$store.state.globalRouter}/auth/assess/${
                _this.module
              }/delete`,
          params:{
            id: _this.checkData[0].id
          }
          }).then(res=>{
            if(res.data.data){
              _this.$message({type:'success',message:'删除成功'});
              _this.currentPage=1
              _this.getReloadData();
            }else{
              this.$message(res.resultMsg)
            }
          });
        }).catch(()=>{
          this.$message({
              type   : "info",
              message: "取消"
            });
        })
        }else{
          this.$message({type:'info',message:"请选择一条数据进行删除"})
        }

    },
    submitForm(formName) {
      // this.dialogVisible = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data        = JSON.parse(JSON.stringify(this.ruleForm));
          if (this.modelType) {
            this.$axios({
              method: "post",
              url   : `${this.$store.state.globalRouter}/auth/assess/${
                this.module
              }/save`,
              data
            }).then(res=>{
                if(res.data.data){
                    this.$message({type:'success',message:'添加成功'});
                    this.dialogVisible = false;
                    this.getData();
                }else{
                    this.$message({type:'error',message:'添加失败，服务出错'});
                    this.dialogVisible = false;
                    this.getData();
                }
            });
          }else{
              this.$axios({
              method: "post",
              url   : `${this.$store.state.globalRouter}/auth/assess/${
                this.module
              }/update`,
              data:{
                  id               : data.id,
                  questionnaireName: data.questionnaireName,
                  status           : parseInt(data.status)
              }
            }).then(res=>{
                if(res.data.data){
                    this.$message({type:'success',message:'修改成功'});
                    this.dialogVisible = false;
                    this.getData();
                }else{
                    this.$message({type:'error',message:'修改失败，服务出错'});
                    this.dialogVisible = false;
                    // this.getData();
                }
            });
          }
        } else {
          this.$message("erro submit");
          return false;
        }
      });
    },
    assessQuestionTypeMng(index,rowData){
      this.$store.state.access_question_type_id    = rowData.id;
      this.$store.state.access_question_table_name = rowData.questionnaireName;
      localStorage.setItem('access_question_type_id', rowData.id);
      localStorage.setItem('access_question_table_name', rowData.questionnaireName);
      this.$router.push({path:'shouye/access_question_type'});
    },
    assessQuestionMng(index,rowData){
      this.$store.state.access_question_type_id    = rowData.id;
      this.$store.state.access_question_table_name = rowData.questionnaireName;
      localStorage.setItem('access_question_type_id', rowData.id);
      localStorage.setItem('access_question_table_name', rowData.questionnaireName);
      this.$router.push({path:'shouye/access_question_mng'});
    },
    selectStaus(val) {},
    resetSearch() {
      this.searchForm.tableName   = "";
      this.searchForm.tableStatus = "";
      this.getData();
    },
    checkOut(val) {
      this.checkData = val;
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage=val;
      this.searchData();
    },
    handleSizeChange(val) {
            // console.log(`每页 ${val} 条`,this.pageSize);
            this.changePageSize = val;
            this.getReloadData(this);
    },
    getReloadData(){
       this.$axios({
         method:'get',
         url:`${this.$store.state.globalRouter}/auth/assess/${
            this.module
          }/pagination?questionnaireName=${encodeURI(this.searchForm.tableName)}&status=${
            encodeURI(this.searchForm.tableStatus)
          }&pageNo=1&pageSize=${encodeURI(this.changePageSize)}`,
       })
        .then(res => {
          if (res.data.resultList) {
            this.total       = res.data.totalCount;
            this.currentPage = res.data.curPage;
            this.resData     = res.data.resultList;
            this.dataList(res.data.resultList);
          }
          if (res.data.resultList == null) {
            this.tableLists = [];
            this.$message({ type: "info", message: "暂无数据" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {},
  mounted() {
    this.getData();
  }
};
</script>
<style scoped>
.el-pagination {
  text-align: left;
}
</style>
