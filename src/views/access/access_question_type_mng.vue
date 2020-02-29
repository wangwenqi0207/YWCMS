// 基础配置管理--评估调查表---评估问题类别管理
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
      <!-- TABLE -->
      <div style="padding:5px;height:80%">
      <el-table
        :data="tableLists"
        border
        stripe
        style="width: 100% "
        :default-sort="{prop: 'date', order: 'descending'}"
        @select="checkOut"
        highlight-current-row
        height="100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="序号" width="50"></el-table-column>
        <el-table-column prop="sortNumber" label="排序编号" width="150" sortable></el-table-column>
        <el-table-column prop="typeClass" label="类别样式" width="200" sortable></el-table-column>
        <el-table-column prop="typeName" label="类别名称" width="200" sortable></el-table-column>
        <el-table-column prop="comment" label="备注" width="200" sortable></el-table-column>
        <el-table-column prop="icon" label="图标" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.image" max-width="30" height="30" style="max-width:30px">
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="创建者" width="150"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable min-width="200"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" sortable min-width="200"></el-table-column>
      </el-table>
      </div>
      <!-- TABLE END -->
      <!-- dialog  -->
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
        >
          <el-form-item label="排序编号" prop="sortNumber">
            <el-col :span="24">
              <el-input type="sortNumber" v-model.number="ruleForm.sortNumber" auto-complete="off" clearable ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="样式类别" prop="typeClass" style="text-align:left;">
            <el-col :span='24'>
              <el-radio-group v-model="ruleForm.typeClass">
                <el-radio :label="1">被调查者及家庭情况</el-radio>
                <el-radio :label="2">配置问题</el-radio>
                <el-radio :label="3">备注</el-radio>
                <el-radio :label="4">疾病诊断</el-radio>
              </el-radio-group>
            </el-col>
            <el-col>
              <div style="color:#FF0000;text-align:left;">（选择配置问题才可以配置题目，被调查者及家庭情况和备注由APP端设置，此处只配置排序编号）</div>
            </el-col>
          </el-form-item>
          <el-form-item label="类别名称" prop="typeName">
            <el-col :span="24">
              <el-input v-model="ruleForm.typeName" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="备注" prop="comment">
            <el-col :span="24">
              <el-input type="textarea" v-model="ruleForm.comment" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <!-- <el-input v-model="ruleForm.icon" clearable></el-input> -->
            <div style="width:100px;height:50px;position:relative">
              <a style="cursor:pointer">
                <img
                  :src="defaultImgSrc"
                  style="display:inline-block;"
                  height="50px"
                  width="50px"
                  @click="selectPic"
                >
              </a>
              <div id="imgBox" v-if="imgBox">
                <div>图标选择</div>
                <img
                  v-for="(item, index) in imgSelection"
                  :key="index"
                  :src="require(`@/assets/questionTypeIcon/${item}.png`)"
                  style="width:30px;height:30px"
                  @click="selectImage(item)"
                >
              </div>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          <el-button @click="cancle" size="mini">取 消</el-button>
        </span>
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
import {mapActions, mapState,mapGetters} from 'vuex' ;//注册 action 和 state
export default {
  mixins: [base],
  data() {
    let validateTypeName=(rule, value, callback)=>{
          value=value.trim();
          if(this.oldName && value==this.oldName){
            callback()
          }else if(value==null || value==''){
            callback(new Error('类别名称必填！'));
          }else{
            let data={
                'questionnaireId':localStorage.getItem("access_question_type_id"),
                'typeName':value
            }
            this.$axios({
              url   : `${this.$store.state.globalRouter}/auth/assess/${this.module}/is_exist`,
              method: "get",
              params:data
            }).then(res => {
            if(res.data.data){
                callback();
            }else{
              callback(new Error('该类别名称已经存在，请更换名称！'));
            }
            });
          }
    };
    return {
      module: "assess_question_type_mng",
      proptype: "失能评估调查表类别添加",
      dialogVisible: false,
      checkData: [],
      picSource: 1,
      tableId: localStorage.getItem("access_question_type_id"),
      tableName:localStorage.getItem('access_question_table_name'),
      tableLists: [{}, {}],
      oldName:null,
      ruleForm: {
        typeName: "",
        typeClass: "",
        sortNumber: "",
        comment: ""
      },
      rules: {
        sortNumber: [
          { required: true, message: "请输入评估调查表排序编号" },
          { type: 'number', message: "排序编号必须为数字值" }
        ],
        typeName: [
          {required: true,message: "请输入评估调查表类别名称",trigger: "blur"},
          {validator:validateTypeName,trigger:'blur'}
        ],
        typeClass: [
          { required: true, message: "请选择评估调查表类别", trigger: "blur" }
        ]
      },
      imgBox: false,
      imgSelection: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      access_question_type_id: "",
      isAdd: true,
      defaultImgSrc:''
      // defaultImgSrc:require(`@/assets/questionTypeIcon/${parseInt(this.picSource)}.png`)
    };
  },
  methods: {
    addData() {
      this.dialogVisible = true;
      this.proptype = "失能评估调查表类别添加";
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate();
        // this.$refs["ruleForm"].resetFields();
      });
      this.picSource = 1;
      this.ruleForm.sortNumber="";
      this.ruleForm.typeName="";
      this.ruleForm.typeClass="";
      this.ruleForm.comment="";
      this.oldName=null;
    },
    returnBack() {
      this.$router.push({ path: "/access_question" });
    },
    checkOut(val) {
      this.checkData = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          data.questionnaireId = this.tableId;
          data.icon = this.picSource;
          if (this.isAdd) {
            //判断是否为新增
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/assess/${
                this.module
              }/save`,
              data
            }).then(res => {
              if (res.data.resultCode=='000000') {
                this.dialogVisible = false;
                this.loadAssessQuestion();
                this.$message({type:'success',message:"新增成功"});
              }else{
                this.$message.warning(res.data.resultMsg)
              }
            });
          }else{
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/assess/${
                this.module
              }/update?id=${encodeURI(data.id)}`,
              data
            }).then(res => {
              if (res.data.resultCode=='000000') {
                this.dialogVisible = false;
                this.loadAssessQuestion();
                this.$message({type:'success',message:"修改成功"});
              }else{
                this.$message.warning(res.data.resultMsg);
              }
            });
          }
        } else {
          this.$message("erro submit");
          return false;
        }
      });
    },
    cancle() {
      this.dialogVisible = false;
      this.imgBox = false;
    },
    loadAssessQuestion() {
      // this.access_question_type_id = this.$store.state.access_question_type_id;
      // this.tableName = this.$store.state.access_question_table_name;
      this.access_question_type_id = localStorage.getItem("access_question_type_id");
      this.tableName = localStorage.getItem("access_question_table_name");
      let id = this.access_question_type_id;
      // console.log(id);
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/assess/${
          this.module
        }/pagination?questionnaireId=${encodeURI(id)}&pageNo=${encodeURI(this.currentPage)}&pageSize=${encodeURI(this.changePageSize)}`
      }).then(res => {
        // console.log(res.data.resultList);
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
        item.createTime = this.$moment(item.createTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        item.updateTime = this.$moment(item.updateTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        if (item.typeClass == 1) {
          item.typeClass = "被调查者及家庭情况";
        }
        if (item.typeClass == 2) {
          item.typeClass = "配置问题";
        }
        if (item.typeClass == 3) {
          item.typeClass = "备注";
        }
        if (item.typeClass == 4) {
          item.typeClass = "疾病诊断";
        }
        if (item.icon != null && item.icon != "") {
          item.image = require(`@/assets/questionTypeIcon/${item.icon}.png`);
        }
      });
      this.tableLists = data;
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
                  _this.loadAssessQuestion();
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
    updateData() {
      let _this = this;
      if (this.checkData.length == 1) {
        this.dialogVisible = true;
        this.$nextTick(()=>{
          _this.$refs['ruleForm'].clearValidate();
        })
        this.isAdd = false;
        this.proptype = "失能评估调查表类别修改";
        // this.ruleForm=JSON.parse(JSON.stringify(this.checkData[0]));
        if (this.checkData[0].typeClass == "被调查者及家庭情况") {
          this.ruleForm.typeClass = 1;
        }
        if (this.checkData[0].typeClass == "配置问题") {
          this.ruleForm.typeClass = 2;
        }
        if (this.checkData[0].typeClass == "备注") {
          this.ruleForm.typeClass = 3;
        }
        if (this.checkData[0].typeClass == "疾病诊断") {
          this.ruleForm.typeClass = 4;
        }
        this.ruleForm.sortNumber = this.checkData[0].sortNumber;
        this.ruleForm.typeName = this.checkData[0].typeName;
        this.oldName=this.checkData[0].typeName;
        this.ruleForm.comment = this.checkData[0].comment;
        this.picSource = this.checkData[0].icon;
        this.ruleForm.id=this.checkData[0].id;
      } else {
        this.$message({ type: "warning", message: "请选择一条数据进行修改" });
      }
    },
    selectPic() {
      this.imgBox = true;
    },
    selectImage(val) {
      this.picSource = val;
      this.imgBox = false;
    },
    //分页methods
    handleSizeChange(val) {
        this.changePageSize = val;
        this.loadAssessQuestion();
      },
      handleCurrentChange(val){
        this.curPage=val;
        this.loadAssessQuestion();
      }
  },
  mounted() {
    this.loadAssessQuestion();
    this.defaultImgSrc=require(`@/assets/questionTypeIcon/${parseInt(this.picSource)}.png`)
  },
  watch:{
    picSource:{
      handler(newVal, oldVal) {
        this.defaultImgSrc=require(`@/assets/questionTypeIcon/${parseInt(this.picSource)}.png`)
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style scoped>
.el-pagination {
  text-align: left;
}
#imgBox {
  position: absolute;
  left: 60px;
  top: -150px;
  background: #ffffff;
  width: 200px;
  height: 200px;
  border-radius: 5%;
  border: 1px solid #eeeeee;
}

</style>
