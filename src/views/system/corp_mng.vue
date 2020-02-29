<template>
  <div style="padding:20px;height:100%">
    <div style="background:#fff;padding:5px;height:95%;overflow:auto">
      <div el-row style="margin:10px 0;text-align: left;">
        <div el-col span="24">
          <el-input
            placeholder="请输入搜索内容(全称)"
            v-model.trim="searchText"
            style="width: auto"
            size="small"
            clearable
          />
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchData">搜索</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addData">新增</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="updateData">修改</el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" @click="deleteData">删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
<div style="padding:5px;height:90%" >
      <el-table
        :data="lists"
        border
        stripe
        style="width: 100%;text-align:left;overflow:auto;"
        @select="checkOut"
        height="100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orgId" label="ID" width="50"></el-table-column>
        <el-table-column prop="orgName" label="公司名称" width="180"></el-table-column>
        <el-table-column prop="orgLevel" label="公司级别" width="180"></el-table-column>
        <el-table-column prop="parentName" label="上级公司" width="180"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
      </el-table>
</div>
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

    <!-- 模态框 -->
    <el-dialog title="用户操作" :visible.sync="centerDialogVisible" :before-close="handleClose" width="660px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width:500px"
        label-position="left"
      >
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="ID" prop="ID">
          <el-input v-model="ruleForm.ID"></el-input>
        </el-form-item>-->
        <!-- 公司级别 -->
        <el-form-item label="公司级别" prop="level">
          <el-radio-group v-model="ruleForm.level" required :disabled="orgLevelSelect">
            <el-radio @click.native.prevent="select('总公司')" label="总公司"></el-radio>
            <el-radio @click.native.prevent="select('分公司')" label="分公司"></el-radio>
            <el-radio @click.native.prevent="select('中支公司')" label="中支公司"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 选择上级公司 -->
        <el-form-item label="上级公司" prop="parentId">
          <el-select
            v-model="ruleForm.parentId"
            placeholder="选择上级公司"
            :disabled="selectStatu"
            ref="content"
            clearable
            style="width:100%;"
          >
            <!-- 下拉选择 -->
            <el-option
              v-for="(item,index) in optionArray"
              :label="item.orgName"
              :value="item.orgId"
              :key="index"
            >
              {{item.orgName}}
              <!-- <span hidden >{{item.orgId}}</span> -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import base from "../../base/base.js";
import Menu from "./menu_mng.vue";
export default {
  mixins: [base],
  inject: ["reload"],
  data() {
    return {
      //搜索框内容
      searchText: "",
      // 模态框是否显示
      centerDialogVisible: false,
      // 下拉xuanxiang
      optionArray: null,
      optionValue: "",
      selectStatu: false,
      content: "",
      // 表单
      ruleForm: {
        name: "",
        level: "",
        parentName: "",
        parentId: "",
        ID: 0, //0--新增，1----修改
        orgId: ""
      },
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        parentName: [
          { required: true, message: "请选择上级公司", trigger: "change" }
        ],
        level: [{ required: true, message: "请选择公司级别" }]
      },
      lists: [], //存放表格数据
      multipleSelectionId: [],
      orgLevelSelect: false
    };
  },
  components: {
    Menu
  },
  methods: {
    // 渲染列表
    dataList(tableData) {
      if (Array.isArray(tableData)) {
        var newdata = [];
        var dataArray = tableData;

        dataArray.forEach(el => {
          if (el.createTime) {
            el.createTime = this.$moment(el.createTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            if (el.orgLevel === 1) {
              el.orgLevel = "总公司";
            } else if (el.orgLevel === 2) {
              el.orgLevel = "分公司";
            } else {
              el.orgLevel = "中支公司";
            }
          }
        });
        this.lists = dataArray;
      } else {
        // console.log("返回数据" + tableData);
        this.lists = tableData;
      }
    },
    // -----------添加数据--------------
    addData() {
      let _this = this;
      this.centerDialogVisible = true;
      this.selectStatu = false;
      this.orgLevelSelect = false;
      this.ruleForm.ID = 0;
      this.ruleForm = {
        name: "",
        level: "",
        parentName: "",
        parentId: "",
        ID: 0
      };
      this.multipleSelectionId = [];
      this.$nextTick(() => {
        _this.$refs["ruleForm"].clearValidate();
      });
      this.multipleSelectionId = [];
    },
    checkOut(val) {
      this.multipleSelectionId = val;
    },
    //------------删除数据-----------
    deleteData() {
      //只做一条数据删除
      if (this.multipleSelectionId.length != 1) {
        this.$alert("请选择一条数据");
      } else {
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$axios({
              method: "get",
              url: `${
                this.$store.state.globalRouter
              }/auth/corporation/delete?id=${encodeURI(this.multipleSelectionId[0].orgId)}`
            })
              .then(res => {
                if (res.data.resultCode == "000000") {
                  this.multipleSelectionId = [];
                  this.$message({
                    type: "success",
                    message: "删除成功"
                  });
                  this.getRealoadData();
                } else {
                  this.$message.warning(res.data.resultMsg);
                }
              })
              .catch(error => {
                this.$message({ type: "error", message: "系统错误，请稍等。" });
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
    //-------------修改数据-------------
    updateData() {
      if (this.multipleSelectionId.length == 1) {
        this.centerDialogVisible = true;
        let data = this.multipleSelectionId[0];
        // console.log(data);

        this.ruleForm.name = data.orgName;
        this.ruleForm.parentId = data.parentName;
        this.ruleForm.level = data.orgLevel;
        // if (this.ruleForm.level != "总公司") {
        //   this.selectStatu = false;
        // } else {
        //   this.selectStatu = true;
        // }
        this.selectStatu = true;
        this.orgLevelSelect = true;
        this.ruleForm.ID = 1;
        this.ruleForm.orgId = data.orgId;
      } else {
        this.$alert("请选择一条要修改的数据");
      }
    },
    //-------------搜索数据-----------------
    searchData() {
      let postData = this.searchText;
      this.$axios({
        method: "get",
        url: `${
          this.$store.state.globalRouter
        }/auth/corporation/pagination?orgName=${encodeURI(this.searchText)}&pageNo=${
          this.currentPage
        }&pageSize=${this.pageSize[0]}`
      })
        .then(res => {
          // console.log(res.data.resultList); //查询返回数据
          if (res.data.resultList) {
            this.total = res.data.totalCount;
            this.currentPage = res.data.curPage;
            let resultArray = res.data.resultList;
            // console.log(resultArray);
            this.dataList(resultArray);
          } else if (res.data.resultList == null) {
            this.dataList([]);
          } else {
            this.$message({ type: "warning", message: "服务出错！" });
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    //----------------选择当前公司类型
    select(e) {
      //切换公司类型
      this.ruleForm.parentId = null; //切换时清空父级公司
      e === this.ruleForm.level
        ? (this.ruleForm.level = "")
        : (this.ruleForm.level = e);
      this.ruleForm.level = e;
      if (e === "总公司") {
        this.selectStatu = true;
      } else {
        this.selectStatu = false;
      }
      if (e === "分公司") {
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/corporation/list?orgLevel=1`
        }).then(res => {
          if (res.data.resultCode == "000000") {
            this.optionArray = res.data.data;
          } else {
            alert("失败：" + res.data.resultMsg);
          }

          // console.log(res.data.data);
        });
      }
      if (e === "中支公司") {
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/corporation/list?orgLevel=2`
        }).then(res => {
          if (res.data.resultCode == "000000") {
            this.optionArray = res.data.data;
          } else {
            alert("失败：" + res.data.resultMsg);
          }
          // console.log(res.data.data);
        });
      }
    },
    // 表单提交---------通过ruleForm中的ID判断是修改操作还是添加操作
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //通过表单验证
          let curLevel = this.ruleForm.level;
          if (curLevel === "总公司") {
            curLevel = 1;
          }
          if (curLevel === "分公司") {
            curLevel = 2;
          }
          if (curLevel === "中支公司") {
            curLevel = 3;
          }

          if (this.ruleForm.ID == 1) {
            //修改数据
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/corporation/update`,
              data: {
                orgName: this.ruleForm.name,
                orgLevel: curLevel,
                parentId: this.ruleForm.parentId,
                orgId: this.ruleForm.orgId
              }
            })
              .then(res => {
                if (res.data.resultCode == "000000") {
                  this.$message({ type: "success", message: "修改成功" });
                  this.multipleSelectionId = [];
                  this.centerDialogVisible = false;
                  this.getData();
                } else {
                  this.$message({ type: "error", message: "修改失败" });
                  this.multipleSelectionId = [];
                  this.centerDialogVisible = false;
                  this.getData();
                }
                if (res.resultCode == "900500") {
                  this.$message.error(res.resultMsg);
                }
              })
              .catch(error => {});
          } else {
            //新增数据
            // console.log(this.ruleForm);
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/corporation/save`,
              data: {
                orgName: this.ruleForm.name,
                orgLevel: curLevel,
                parentId: this.ruleForm.parentId
              }
            })
              .then(res => {
                if (res.data.resultCode == "000000") {
                  this.multipleSelectionId = [];
                  this.centerDialogVisible = false;
                  this.getData();
                  this.$message({ type: "success", message: "新增成功" });
                }
                // else {
                //   this.$message({ type: "error", message: "新增失败" });
                //   this.multipleSelectionId = [];
                //   this.centerDialogVisible = false;
                //   this.getData();
                // }
                // if(res.data.resultCode=='900500'){
                //   this.$message({type:'warning',message:"记录已存在！"})
                // }
                else {
                  this.$message.warning(res.data.resultMsg);
                  this.reload();
                }
              })
              .catch(error => {
                this.$message.error(error);
              });
          }
        } else {
          this.$message({ type: "error", message: "非法提交" });
          return false;
        }
      });
    },
    //清空表单
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      if (this.ruleForm.ID) {
        let parentName = this.ruleForm.parentName;
        let parentId = this.ruleForm.parentId;
        let level = this.ruleForm.level;
        this.ruleForm = {
          name: "",
          level,
          parentName,
          parentId,
          ID: 1
        };
      } else {
        this.ruleForm = {
          name: "",
          level: "",
          parentName: "",
          parentId: "",
          ID: 0
        };
      }
      let _this = this;
      this.$nextTick(() => {
        _this.$refs["ruleForm"].clearValidate();
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.clearValidate();
          done();
          this.multipleSelectionId = [];
          this.getData();
        })
        .catch(_ => {});
    },
    clearValidate: function() {
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].clearValidate();
      }
    },
    getRealoadData() {
      this.$axios({
        url: `${this.$store.state.globalRouter}/auth/${
          this.module
        }/pagination?pageNo=1&pageSize=${this.pageSize[0]}`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "100005") {
          this.$router.push({ path: "/" });
        } else {
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.resData = res.data.resultList;
          this.dataList(this.resData); //列出列表
        }
      });
    }
  },
  // 钩子函数
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
