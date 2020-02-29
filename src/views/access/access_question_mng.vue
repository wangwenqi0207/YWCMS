// 基础配置管理--评估调查表---评估问题管理
<template>
  <div style="padding:20px;height:100%">
    <div class="tableBox" style="background:#fff;padding:5px;height:95%">
      <!-- navbar -->
      <div el-row style="margin:10px 0;text-align: left;">
        <div el-col span="24">
          <!-- <el-input placeholder="模糊查询协议名称" v-model="searchText" style="width: auto" size="mini"/> -->
          <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="returnBack">返回</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addData">新增</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="updateData">修改</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="deleteData">删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <!-- navbar END -->
      <div style="text-align:left">评估调查表名称：{{tableName}}</div>
      <!-- searchForm  -->
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        size="mini"
        style="text-align:left;"
        :cell-style="cellStyle"
      >
        <el-form-item label="问题类别:">
          <el-select v-model="searchForm.type" clearable placeholder="请选择">
            <el-option
              v-for="item in questionType "
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级标题:">
          <el-input v-model.trim="searchForm.title1" placeholder="请输入护理标题名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="二级标题:">
          <el-input v-model.trim="searchForm.title2" placeholder="请输入护理标题名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="三级标题:">
          <el-input v-model.trim="searchForm.title3" placeholder="请输入护理标题名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetSearch" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- searchForm END -->
      <!-- table -->
      <div style="padding:5px;height:80%">
      <el-table
        :data="tableLists"
        border
        stripe
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        @select="checkOut"
        highlight-current-row
        height="100%"
        :cell-style         = "cellStyle"
        @cell-mouse-enter = 'mouseEnter'
        @cell-mouse-leave = 'mouseLeave'
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="序号" width="50"></el-table-column>
        <el-table-column prop="sortNumber" label="排序编号" width="120" sortable></el-table-column>
        <el-table-column prop="questionTypeName" label="问题类别" width="150" sortable></el-table-column>
        <el-table-column prop="questionTypeComment" label="备注" width="140" sortable></el-table-column>
        <el-table-column prop="title" label="一级标题" width="200" sortable></el-table-column>
        <el-table-column prop="secondTitle" label="二级标题" width="150"></el-table-column>
        <el-table-column prop="thirdTitle" label="三级标题" width="150"></el-table-column>
        <el-table-column prop="optionType" label="题型" sortable></el-table-column>
        <el-table-column prop="optionText" label="选型内容" width="250" sortable>
          <template slot-scope="scope">
            <p v-if='scope.row.optionText' :id="scope.row.id" data-toggle='popover' data-placement="left" data-container="body">
              {{scope.row.optionText.substring(0,15)+'......'}}
              <!-- {{scope.row.optionText}} -->
            </p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column prop="isScore" label="是否计分题" width="150"></el-table-column>
        <el-table-column prop="needPhoto" label="是否需要拍照" width="150"></el-table-column>
      </el-table>
      </div>
      <!-- table END -->
      <!-- dialog  -->
      <el-dialog
        :title="proptype"
        :visible.sync="dialogVisible"
        width="700px"
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
        >
          <el-form-item label="问题类别" prop="questionTypeId" style="text-align:left;">
            <el-col :span="24">
              <el-select v-model="ruleForm.questionTypeId" clearable placeholder="请选择" style="width:80%;">
                <el-option
                  v-for="item in questionType "
                  :key="item.id"
                  :label="item.typeName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="排序编号" prop="sortNumber" style="text-align:left;">
            <el-col :span="24">
              <el-input
                type="sortNumber"
                v-model.number="ruleForm.sortNumber"
                auto-complete="off"
                clearable
                style="width:80%;"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="一级标题" prop="title" style="text-align:left;">
            <el-col :span="24">
              <el-input v-model="ruleForm.title" auto-complete="off" clearable style="width:80%;"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="二级标题" prop="secondTitle" style="text-align:left;">
            <el-col :span="24">
              <el-input v-model="ruleForm.secondTitle" auto-complete="off" clearable style="width:80%;"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="三级标题" prop="thirdTitle" style="text-align:left;">
            <el-col :span="24">
              <el-input v-model="ruleForm.thirdTitle" auto-complete="off" clearable style="width:80%;"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="选项类别" prop="optionType" style="text-align:left;">
            <el-col>
              <el-radio-group v-model="ruleForm.optionType">
                <el-radio :label="1">单选</el-radio>
                <el-radio :label="2">多选</el-radio>
                <el-radio :label="3">数字下拉</el-radio>
                <el-radio :label="4">文本</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="选项内容" prop="optionText" style="text-align:left;">
            <el-col :span="24">
              <el-input type="textarea" v-model="ruleForm.optionText" clearable style="width:80%;"></el-input>
            </el-col>
            <el-col>
              <div style="color:#FF0000">（单选或多选时，每个选项之间用|分开;  下拉选项时，必需包含下划线）</div>
            </el-col>
          </el-form-item>
          <el-form-item label="是否计分题" prop="isScore" style="text-align:left;">
            <el-col>
              <el-radio-group v-model="ruleForm.isScore">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="是否需要拍照" prop="needPhoto" style="text-align:left;">
            <el-col>
              <el-radio-group v-model="ruleForm.needPhoto">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          <el-button @click="cancle" size="mini">取 消</el-button>
        </span>
      </el-dialog>
      <!-- dialog END -->
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
  data() {
    return {
      module: "assess_question_base_mng",
      tableId: localStorage.getItem("access_question_type_id"),
      tableName: localStorage.getItem("access_question_table_name"),
      searchForm: {
        type: "",
        title1: "",
        title2: "",
        title3: ""
      },
      questionType: "",
      tableLists: [{}, {}],
      checkData: "",
      dialogVisible: false,
      proptype: "评估管理问题新增",
      ruleForm: {
        questionTypeId: "",
        optionType: "",
        sortNumber: "",
        optionText: "",
        title: "",
        secondTitle: "",
        thirdTitle: "",
        isScore: "",
        needPhoto: ""
      },
      rules: {
        questionTypeId: [
          { required: true, message: "请选择问题类别", trigger: "change" }
        ],
        sortNumber: [
          { required: true, message: "请输入评估调查表排序编号" },
          { type: "number", message: "排序编号必须为数字值" }
        ],
        title: [{ required: true, message: "请输入一级标题" }],
        optionType: [
          { required: true, message: "请选择评估调查表类别", trigger: "change" }
        ],
        isScore: [{ required: true, message: "请选择", trigger: "change" }],
        needPhoto: [{ required: true, message: "请选择", trigger: "change" }],
        optionText:[{ required: true, message: "选项内容必填", trigger: "blur" }]
      },
      isAdd: true
    };
  },
  methods: {
    getData() {
      // console.log(this.tableId);
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/assess/${
          this.module
        }/pagination?questionnaireId=${encodeURI(this.tableId)}&questionTypeId=${
          encodeURI(this.searchForm.type)
        }&titleLike=${encodeURI(this.searchForm.title1)}&secondTitleLike=${
          encodeURI(this.searchForm.title2)
        }&thirdTitleLike=${encodeURI(this.searchForm.title3)}&pageNo=${encodeURI(this.currentPage)}&pageSize=${encodeURI(this.changePageSize)}`
      }).then(res => {
        if (res.data.resultList) {
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.resData = res.data.resultList;
          this.dataList(res.data.resultList);
        }
        if (res.data.resultList.length == 0) {
          this.$message({ type: "warning", message: "暂无数据" });
        }
      });
    },
    dataList(tableData) {
      let data = JSON.parse(JSON.stringify(tableData));
      data.forEach((item, index) => {
        if (item.needPhoto) {
          item.needPhoto = "需要";
        } else {
          item.needPhoto = "不需要";
        }
        if (item.isScore) {
          item.isScore = "是";
        } else {
          item.isScore = "否";
        }
        if (item.optionType == 1) {
          item.optionType = "单选";
        }
        if (item.optionType == 2) {
          item.optionType = "多选";
        }
        if (item.optionType == 3) {
          item.optionType = "数字下拉";
        }
        if(item.optionType==4){
          item.optionType="文本";
        }
      });
      this.tableLists = data;
    },
    loadQuestioinType() {//获取问题类型
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/assess/${
          this.module
        }/load_question_type?questionnaireId=${encodeURI(this.tableId)}`
      }).then(res => {
        this.questionType = res.data.data;
      });
    },
    checkOut(val) {
      this.checkData = val;
    },
    addData() {
      let _this=this;
      this.dialogVisible = true;
      this.proptype = "评估问题管理新增";
      this.ruleForm={
        questionTypeId: "",
        optionType: "",
        sortNumber: "",
        optionText: "",
        title: "",
        secondTitle: "",
        thirdTitle: "",
        isScore: "",
        needPhoto: ""
      };
      this.$nextTick(() => {
        _this.$refs["ruleForm"].clearValidate();
      });
      this.isAdd = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.ruleForm.optionType==3){
          console.log(this.ruleForm.optionText);
            // let underLine=this.ruleForm.optionText;
            // console.log(underLine.indexOf('_'))
            if(this.ruleForm.optionText.indexOf('_')==-1){
              this.$message({type:'warning',message:"当选项类型为数字下拉时，选项内容必需包含下划线！"})
                return false;
            }
          }
          // console.log(this.ruleForm.optionType);
          // console.log(this.ruleForm.optionText);
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          data.questionnaireId = this.tableId;
          if (this.isAdd) {
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/assess/${
                this.module
              }/save`,
              data
            }).then(res => {
              if (res.data.resultCode=='000000') {
                this.dialogVisible = false;
                this.getData();
                this.$message({type:'success',message:"新增成功"});
              }else{
                this.$message.warning(res.data.resultMsg);
              }
            });
          } else {
            let newData = {
              questionnaireId: data.questionnaireId,
              questionTypeId: data.questionTypeId,
              sortNumber: data.sortNumber,
              title: data.title,
              secondTitle: data.secondTitle,
              thirdTitle: data.thirdTitle,
              optionType: data.optionType,
              optionText: data.optionText,
              isScore: data.isScore,
              needPhoto: data.needPhoto
            };
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/assess/${
                this.module
              }/update?id=${encodeURI(data.id)}`,
              data: newData
            }).then(res => {
              if (res.data.resultCode=='000000') {
                this.dialogVisible = false;
                this.getData();
                this.$message({type:'success',message:'修改成功！'});
              } else {
                this.$message({type:'error',message:"修改失败，服务出错"});
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    updateData() {
      let _this = this;
      if (this.checkData.length == 1) {
        let data = JSON.parse(JSON.stringify(this.checkData[0]));
        data.isScore = data.isScore == "是" ? 1 : 0;
        data.needPhoto = data.needPhoto == "需要" ? 1 : 0;
        if (data.optionType == "单选") {
          data.optionType = 1;
        }
        if (data.optionType == "多选") {
          data.optionType = 2;
        }
        if (data.optionType == "数字下拉") {
          data.optionType = 3;
        }
        if (data.optionType == "文本") {
          data.optionType = 4;
        }
        this.proptype = "评估管理问题修改";
        this.isAdd = false;
        this.dialogVisible = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
      } else {
        this.$message({ type: "warning", message: "请选择一条数据进行修改" });
      }
    },
    deleteData() {
      let _this = this;
      if (this.checkData.length == 1) {
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
                url: `${_this.$store.state.globalRouter}/auth/assess/${
                  _this.module
                }/remove`,
                params: {
                  id: _this.checkData[0].id
                }
              })
              .then(res => {
                if (res.data.data) {
                  _this.$message({ type: "success", message: "删除成功" });
                  _this.currentPage=1;
                  _this.getData();
                } else {
                  this.$message(res.resultMsg);
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
    searchData(){
      this.getData();
    },
    cancle() {
      this.dialogVisible = false;
    },
    resetSearch() {
      this.searchForm = {
        type: "",
        title1: "",
        title2: "",
        title3: ""
      };
      this.getData();
    },
    returnBack() {
      this.$router.push({ path: "/access_question" });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`,this.pageSize);
      this.changePageSize = val;
      this.getData();
    },
    handleCurrentChange(val){
      this.currentPage=val;
      this.getData();
    },
    rowStyle({ row, rowIndex }) {
      return "height:50px;overflow:hidden";
    },
    cellStyle(row, column, rowIndex, columnIndex){
      if(row.columnIndex==9){
        return 'color:#337ab7;cursor:pointer';
      }else{
        return ''
      }
    },
    mouseEnter(row, column, cell, event){
      if(column.label=='选型内容'){
        var dataTip      = row.optionText;
        var inputStautUi = "<ul class='list-group'>";
        var inputEndUi   = "</ul>";
        var inputStartLi = "<li class='list-group-item' style='text-align:left;color:black'  width='100%' >"
        var inputEndLi   = "</li>"
        var viewTooltip  = "";
        var dataSplit    = dataTip.split('|');
		  	for(var i=0;i<dataSplit.length;i++){
		  		viewTooltip += inputStartLi + (i+1) + ':' + dataSplit[i] + inputEndLi;
		  	}
		  	viewTooltip = inputStautUi + viewTooltip + inputEndUi;

		  	$("#"+row.id).popover({html:true,title:"选项内容",content:viewTooltip}).popover();
		  	$("#"+row.id).popover('show');
      }
    },
    mouseLeave(row, column, cell, event){
      if(column.label=='选型内容'){
		  	$("#"+row.id).popover('destroy');
      }
    },
  },
  mounted() {
    this.getData();
    this.loadQuestioinType();
  }
};
</script>
<style scoped>
.el-table__row td .cell {
  /* word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden; */
  height: 50px;
}
.el-table .cell {
  max-height: 50px !important;
  overflow  : hidden !important;
}
.el-pagination {
  text-align: left;
}
</style>
