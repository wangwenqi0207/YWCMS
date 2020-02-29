<template>
  <div style="padding:20px;height:100%;">
    <div style="background:#fff;padding:5px;height:95%">
      <div el-row style="padding:10px;text-align: left;">
        <div el-col span="24" class="top">
          <el-input placeholder="请输入姓名" style="width: auto" size="small" v-model.trim="searchValue" clearable></el-input>
          <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
          <el-button type="primary" size="small" @click.native="add" icon="el-icon-plus">新增</el-button>
          <el-button type="primary" size="small" @click.native="update" icon="el-icon-edit">修改</el-button>
          <el-button type="primary" size="small" @click.native="remove" icon="el-icon-delete">删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
<div style="padding:5px;height:80%">
      <el-table
        :data="datalists"
        border
        stripe
        style="width: 100%;text-align:left;overflow:auto;"
        @selection-change="handleSelectionChange"
        height="100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column
        prop  = "userId"
        label = "用户id"
        width = "100"
        ></el-table-column>-->
        <el-table-column type="index" :index="indexMethod" width="50"></el-table-column>
        <el-table-column prop="loginName" label="登录名" width="200"></el-table-column>
        <el-table-column prop="fullName" label="姓名" width="200"></el-table-column>
        <el-table-column prop="systemAdmin" label="是否为系统管理员" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="orgName" label="所属公司" width="200"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="200" ></el-table-column>
      </el-table>
</div>
      <!-- 模态框 -->

      <el-dialog
        title="新增用户"
        :visible.sync="dialogVisible"
        width="660px"
        :before-close="handleClose"
        id="add"
        class="model"
      >
        <div style="height:600px;overflow:hidden;">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div style="width:49%;float:left;">
              <el-form-item label="编辑用户" style="margin-bottom:0px;line-height:14px"></el-form-item>
              <hr>
              <el-form-item label="id" prop="id" hidden="true">
                <el-input v-model="ruleForm.id"></el-input>
              </el-form-item>
              <el-form-item label="登录名" prop="loginName">
                <el-input
                  v-model="ruleForm.loginName"
                  id="loginName"
                  placeholder="手机号,email，登录名都可以"
                ></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="loginPwd">
                <el-input type="password" v-model="ruleForm.loginPwd" placeholder="不输入密码表示不修改密码"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="填写真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" placeholder="email用于接收邮件等"></el-input>
              </el-form-item>
              <el-form-item label="超级管理员" prop="isAdmin">
                <el-radio-group v-model="radio1">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否可授权" prop="isQx">
                <el-radio-group v-model="radio2">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="所属公司" prop="company">
                <el-select v-model="ruleForm.company" placeholder="请选择角色所属公司">
                  <el-option
                    v-for="(item,index) in orgNameList"
                    :label="item.orgName"
                    :value="item.orgId"
                    :key="index"
                  >
                    {{item.orgName}}
                    <!-- <span hidden >{{item.orgId}}</span> -->
                  </el-option>
                  <!-- <el-option value="总公司">总公司</el-option>
                  <el-option value="分公司">分公司</el-option>-->
                </el-select>
              </el-form-item>
            </div>
            <div style="width:45%;float:right;">
              <el-form-item label="分配权限" style="margin-bottom:0px"></el-form-item>
              <hr>
              <div style="position:relative;height:430px;overflow:hidden;">
                <div style="border:1px solid #dcdfe6;height:95%;overflow:auto;">
                  <el-tree
                    :data="qxList"
                    show-checkbox
                    node-key="id"
                    :props="defaultProps"
                    ref="tree1"
                    :default-checked-keys="menuIdList"
                    id="qxtree"
                  ></el-tree>
                </div>
              </div>
            </div>
            <div style="clear:both;">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </div>
          </el-form>
          <span slot="footer" class="dialog-footer" hidden>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
    <div class="pageNation">
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
import base from "../../base/base.js";
import Vue from "vue";
export default {
  mixins: [base],
  data() {
    var newReg2 = (rule, value, callback) => {
      if($(".model").find(".el-dialog__title").html()=='新增用户'){
        if(!value){
          callback(new Error('密码必填!!'))
        }else{
          console.log(value)
          callback();
        }

      }else if($(".model").find(".el-dialog__title").html()=='修改用户'){
        callback();
      }else{
        callback();
      }

      // var value=this.trimStr(value);
      // if (value!=parseFloat(value)) {
      //   callback(new Error('只能是数字'));
      // } else if(value<=0){
      //   callback(new Error('不能为负数'));
      // }else{
      //   callback();
      // }
	  };
    return {
      //分页data
      currentPage: 1,
      pageSize: [10, 20, 30, 50],
      total: 0,
      changePageSize: 10,

      //表单相关
      dialogVisible: false,
      ruleForm: {
        loginName: "",
        loginPwd: "",
        name: "",
        email: "",
        company: "",
        isAdmin: 0,
        isQx: 0,
        id: 0
      },
      rules: {
        loginName: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        loginPwd:[{ required: true,validator: newReg2, trigger: 'blur' }],
        name: [{ required: true, message: "请填写真实姓名", trigger: "blur" }],
        company: [
          { required: true, message: "请选择用户所属公司", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址"
          }
        ]
      },
      //列表相关
      datalists: [],

      //修改表单填的数据
      updateData2: [],
      radio1: null,
      radio2: null,
      orgLinks: null,

      //修改或者添加时的所属公司
      orgNameList: [],
      //修改或者添加时的所拥有的权限名称
      qxList: [],

      //搜索
      searchValue: "",

      //分配角色权限相关
      defaultProps: {
        children: "children",
        label: "label"
      },
      menuIdList: []
    };
  },
  methods: {
    search() {
      if (this.searchValue != null && this.searchValue.length >= 1) {
        this.$axios({
          url: `${
            this.$store.state.globalRouter
          }/auth/system/loginUser/pagination`,
          method: "post",
          data: {
            pageNo: 1,
            pageSize: 10,
            fullName: this.searchValue
          }
        }).then(res => {
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.dataList(res.data.resultList);
        });
      } else {
        this.$axios({
          url: `${
            this.$store.state.globalRouter
          }/auth/system/loginUser/pagination`,
          method: "post",
          data: {
            pageNo: 1,
            pageSize: 10
          }
        }).then(res => {
          if(res.data.resultCode=='100005'){
            this.$router.push({ path: "/" });
          }else{
            this.total = res.data.totalCount;
            this.currentPage = res.data.curPage;
            this.dataList(res.data.resultList);
          }

        });
      }
    },
    add() {
      this.menuIdList = [];
      $(".model")
        .find(".el-dialog__title")
        .html("新增用户");
      this.dialogVisible = true;
      $("#loginName").attr("disabled", false);
      var that = this;
      setTimeout(function() {
        that.radio1 = 0;
        that.radio2 = 0;
        that.resetForm("ruleForm");
      }, 200);
    },
    update() {
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        this.menuIdList = [];
        $(".model")
          .find(".el-dialog__title")
          .html("修改用户");
        this.dialogVisible = true;
        var that = this;
        that.$nextTick(() => {
          that.$refs["ruleForm"].clearValidate();
        });
        this.$axios({
          url: `${
            this.$store.state.globalRouter
          }/auth/system/role/getUserRoles?pkId=${encodeURI(that.updateData2[0].userId)}`,
          method: "get"
        }).then(res => {
          var qxMenuList = res.data.data;
          if (qxMenuList && qxMenuList.length >= 1) {
            for (var item of qxMenuList) {
              this.menuIdList.push(item.roleId);
            }
          }
        });
        setTimeout(function() {
          // console.log(that.updateData2[0]);
          // that.resetForm("ruleForm");
          if (that.updateData2[0].loginName) {
            that.ruleForm.loginName = that.updateData2[0].loginName;
          }
          $("#loginName").attr("disabled", true);
          if (that.updateData2[0].orgName) {
            that.ruleForm.company = that.updateData2[0].orgId;
          }
          if (
            that.updateData2[0].systemAdmin == "是" ||
            that.updateData2[0].systemAdmin == 1
          ) {
            that.ruleForm.isAdmin = 1;
            that.radio1 = 1;
          } else {
            that.radio1 = 0;
            that.ruleForm.isAdmin = 0;
          }
          if (
            that.updateData2[0].withOption == "是" ||
            that.updateData2[0].withOption == 1
          ) {
            that.ruleForm.isQx = 1;
            that.radio2 = 1;
          } else {
            that.radio2 = 0;
            that.ruleForm.isQx = 0;
          }

          if (that.updateData2[0].email) {
            that.ruleForm.email = that.updateData2[0].email;
          }
          if (that.updateData2[0].fullName) {
            that.ruleForm.name = that.updateData2[0].fullName;
          }

          if (that.updateData2[0].orgLinks) {
            that.orgLinks = that.updateData2[0].orgLinks;
          }

          // $('#qxtree').attr('default-checked-keys',[]);

          that.$refs.tree1.setCheckedKeys(that.menuIdList);
          // console.log(that.menuIdList,that.$refs.tree1.getCheckedNodes())
          //判断是add还是修改
          that.ruleForm.id = 1;
          that.ruleForm.loginPwd = null;
        }, 500);
      }
    },
    remove() {
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        this.$confirm("是否要删除当前数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$axios({
              url:
                this.$store.state.globalRouter +
                "/auth/system/loginUser/remove?id=" +
                encodeURI(this.updateData2[0].userId),
              method: "get"
            }).then(res => {
              // console.log(res);
              if (res.data.resultCode == "000000") {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.currentPage=1;
              }
              this.$options.methods.getReloadData(this);
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除"
            });
          });
      }
    },

    dataList(tableData) {
      var newdata = [];
      var newdata1 = [];
      var newdata2 = [];
      var dataArray = tableData;

      dataArray.forEach(el => {
        if (el.createTime) {
          newdata.push(
            this.$moment(el.createTime).format("YYYY-MM-DD HH:mm:ss")
          );
        }
        if (el.status) {
          if (el.status == 1) {
            newdata1.push("正常");
          } else {
            newdata1.push("不正常");
          }
        } else {
          newdata1.push("不正常");
        }
        if (el.systemAdmin) {
          newdata2.push("是");
        } else {
          newdata2.push("否");
        }
      });

      this.transform(dataArray, newdata);
      this.transform1(dataArray, newdata1);
      this.transform2(dataArray, newdata2);
      this.datalists = dataArray;
    },
    transform(old, insert) {
      old.forEach((el, index) => {
        el.createTime = insert[index];
      });
    },
    transform1(old, insert) {
      old.forEach((el, index) => {
        el.status = insert[index];
      });
    },
    transform2(old, insert) {
      old.forEach((el, index) => {
        el.systemAdmin = insert[index];
      });
    },
    //分页methods
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`,this.pageSize);
      this.changePageSize = val;
      this.$options.methods.getReloadData(this);
    },
    handleCurrentChange(val) {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/system/loginUser/pagination`,
        method: "post",
        data: {
          fullName: "",
          // pageSize: this.pageSize[0],
          pageSize: this.changePageSize,
          pageNo: val
        }
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
        if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
        }
      });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      // return (this.currentPage-1)*this.pageSize[0]+index+1;
      return (this.currentPage - 1) * this.changePageSize + index + 1;
    },
    handleSelectionChange(val) {
      this.updateData2 = val;
      // console.log(this.updateData2)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      var checkData = this.$refs.tree1.getCheckedNodes();
      var ids = [];
      if (checkData.length >= 1) {
        for (var item of checkData) {
          ids.push(item.id);
        }
      }
      this.$axios({
        url:
          this.$store.state.globalRouter +
          "/auth/corporation/info?id=" +
          encodeURI(this.ruleForm.company),
        method: "get"
      }).then(res => {
        this.orgLinks = res.data.data.orgLinks;
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.id == 1) {
            var that = this;
            if (ids.length >= 1) {
            } else {
              this.$message({ type: "warning", message: "请选择角色权限！" });
              return false;
            }
            setTimeout(() => {
              that
                .$axios({
                  url: `${
                    this.$store.state.globalRouter
                  }/auth/system/loginUser/saveOrUpdate`,
                  method: "post",
                  data: {
                    pkId: that.updateData2[0].userId,
                    loginName: that.ruleForm.loginName,
                    fullName: that.ruleForm.name,
                    systemAdmin: that.ruleForm.isAdmin,
                    orgId: that.ruleForm.company,
                    email: that.ruleForm.email,
                    loginPwd: that.ruleForm.loginPwd,
                    checkRoleIds: ids,
                    orgLinks: that.orgLinks,
                    withOption: that.radio2
                  }
                })
                .then(res => {
                  if (res.data.resultCode == "000000") {
                    this.$options.methods.getReloadData(this);

                    alert("修改成功");
                    this.dialogVisible = false;
                  } else {
                    alert("修改失败" + res.data.resultMsg);
                    this.dialogVisible = false;
                  }
                });
            }, 500);
          } else {
            this.ruleForm.isAdmin = this.radio1;
            this.ruleForm.isQx = this.radio2;
            var that = this;
            // 传值的时候email不能与数据库里面存在的重复
            if (ids.length >= 1) {
            } else {
              this.$message({ type: "warning", message: "请选择角色权限！" });
              return false;
            }
            setTimeout(() => {
              that
                .$axios({
                  url: `${
                    this.$store.state.globalRouter
                  }/auth/system/loginUser/saveOrUpdate`,
                  method: "post",
                  data: {
                    loginName: that.ruleForm.loginName,
                    fullName: that.ruleForm.name,
                    systemAdmin: that.ruleForm.isAdmin,
                    orgId: that.ruleForm.company,
                    email: that.ruleForm.email,
                    loginPwd: that.ruleForm.loginPwd,
                    checkRoleIds: ids,
                    orgLinks: that.orgLinks,
                    withOption: that.radio2,
                    status: 1
                  }
                })
                .then(res => {
                  // console.log(res.data);
                  if (res.data.resultCode == "000000") {
                    this.$options.methods.getReloadData(this);
                    alert("添加成功");
                    this.dialogVisible = false;
                  } else {
                    alert("添加失败  "+res.data.resultMsg);
                    this.dialogVisible = false;
                  }
                });
            }, 500);
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getChecked() {},
    getReloadData(that) {
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/system/loginUser/pagination`,
          method: "post",
          data: {
            pageNo: that.currentPage,
            // pageSize: that.pageSize[0],
            pageSize: that.changePageSize,
            fullName: ""
            // pageSize: this.pageSize[0],
            // pageNo  : this.currentPage
          }
        })
        .then(res => {
          if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
          } else {
            that.total = res.data.totalCount;
            that.currentPage = res.data.curPage;
            that.dataList(res.data.resultList);
          }
        });
      // that.reload();
    }
  },
  mounted() {
    // this.getData();
    this.$axios({
      url: `${this.$store.state.globalRouter}/auth/system/loginUser/pagination`,
      method: "post",
      data: {
        pageNo: this.currentPage,
        pageSize: this.pageSize[0],
        fullName: ""
        // pageSize: this.pageSize[0],
        // pageNo  : this.currentPage
      }
    }).then(res => {
      if (res.data.resultCode == "100005") {
        this.$router.push({ path: "/" });
      } else {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        // for(var item of res.data.resultList){

        // }
        this.dataList(res.data.resultList);
      }
    });

    //添加或者修改时所属公司选项
    this.$axios({
      url: `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=1`,
      method: "get"
    }).then(res => {
      // console.log(res.data.data);
      if(res.data.data){
          for (var item of res.data.data) {
          this.orgNameList.push(item);
        }
      }

    });
    this.$axios({
      url: `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=2`,
      method: "get"
    }).then(res => {
      if(res.data.data){
          for (var item of res.data.data) {
          this.orgNameList.push(item);
        }
      }

    });
    this.$axios({
      url: `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=3`,
      method: "get"
    }).then(res => {
      if(res.data.data){
          for (var item of res.data.data) {
          this.orgNameList.push(item);
        }
      }

    });
    this.$axios({
      url: `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=4`,
      method: "get"
    }).then(res => {
      if(res.data.data){
          for (var item of res.data.data) {
          this.orgNameList.push(item);
        }
      }

    });

    //获取所有公司角色
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/system/role/getUserRoles?loadAll=true`,
      method: "get"
    }).then(res => {
       var data = res.data.data;
      if(res.data.data){
          for (let item of data) {
          this.qxList.push({ id: item.roleId, label: item.name });
        }
      }


    });
  }
};
</script>

<style scoped>
.top {
  text-align: left;
}
.el-pagination {
  text-align: left;
}
hr {
  margin-top: 3px;
  margin-bottom: 6px;
}
.el-form-item {
  margin-bottom: 18px;
}
.el-form-item__label {
  width: 150px;
}
.el-form-item__content {
  margin-left: 150px;
}
</style>
