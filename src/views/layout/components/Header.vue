<template>
  <div class="navbar">
    <!-- <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <breadcrumb class="breadcrumb-container"/> -->
    <div class="left-menu">
      <img src='@/assets/img/jingbanlogo.png' />
      <div style="font-size:25px;color:#409EFF;">长期护理保险护理服务管理系统</div>
    </div>

    <div class="right-menu">
      <!-- <ThemePicker class="colorPicker"></ThemePicker> -->
      <el-dropdown
        size = "small"
        split-button
      >
        {{userName}}
        <!-- {{store.state.loginName}} -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogVisible = true">密码修改</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog
              title       = "修改密码"
            :visible.sync = "dialogVisible"
              width       = "30%"
            :before-close = "handleClose"
      >
        <el-form
          :model = "ruleForm2"
          status-icon
          :rules        = "rules2"
            ref         = "ruleForm2"
            label-width = "100px"
            class       = "demo-ruleForm"
        >
          <el-form-item
            label = "旧密码"
            prop  = "oldPwd"
          >
            <el-input
              type    = "password"
              v-model = "ruleForm2.oldPwd"
            ></el-input>
          </el-form-item>
          <el-form-item
            label = "新密码"
            prop  = "pass"
          >
            <el-input
              type         = "password"
              v-model      = "ruleForm2.pass"
              autocomplete = "off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label = "确认密码"
            prop  = "checkPass"
          >
            <el-input
              type         = "password"
              v-model      = "ruleForm2.checkPass"
              autocomplete = "off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type   = "primary"
              @click = "submitForm('ruleForm2')"
            >提交</el-button>
            <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
          </el-form-item>
        </el-form>
        <span
          slot  = "footer"
          class = "dialog-footer"
          hidden
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type   = "primary"
            @click = "dialogVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ThemePicker from "@/views/layout/components/colorPicker.vue"; //颜色选择器
export default {
  inject: ["reload"],
  data() {
    var checkOldPwd  = (rule, value, callback) => {};
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginName    : "超级管理员",
      dialogVisible: false,
      userName     : "超级管理员",
      ruleForm2    : {
        oldPwd   : "",
        pass     : "",
        checkPass: ""
      },
      rules2: {
        pass     : [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
        // oldPwd: [
        //   { validator: checkOldPwd, trigger: 'blur' }
        // ]
      },
    };
  },
  components: {
    ThemePicker
  },
  computed  : {},
  methods   : {
    logout() {
      var that = this;
      this.$confirm("是否要退出登录状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText : "取消",
        type             : "warning",
        center           : true
      })
        .then(() => {
          this.reload();
          that.$router.push({ path: "/" });
          // window.localStorage.removeItem('router');
          this.$message({
            type   : "success",
            message: "退出成功"
          });
        })
        .catch(() => {
          this.$message({
            type   : "info",
            message: "取消退出"
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/system/loginUser/updatePwd`,
            method: "post",
            data  : {
              currPwd  : this.ruleForm2.oldPwd,
              newPwd   : this.ruleForm2.pass,
              confimPwd: this.ruleForm2.checkPass
            }
          }).then(res => {
            this.dialogVisible = false;
            this.$router.push({ path: "/" });
            alert("修改成功");
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    // console.log(this.$store)
    this.userName = window.localStorage.getItem("userName");
    // console.log(this.loginName)
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  // height       : 50px;
  height       : 100%;
  line-height  : 48px;
  border-radius: 0px !important;
  margin-bottom: 0px;
  .hamburger-container {
    line-height: 58px;
    height     : 50px;
    float      : left;
    padding    : 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display       : inline-block;
    vertical-align: top;
  }
  .left-menu {
    float : left;
    height: 100%;
    vertical-align: middle;
    // padding: 5px 0px;
    img {
      display: inline-block;
      height        : 80%;
      vertical-align: middle;
    }
  }
  .right-menu {
    float : right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin : 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height      : 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position  : relative;
        .user-avatar {
          cursor       : pointer;
          width        : 40px;
          height       : 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor   : pointer;
          position : absolute;
          right    : -20px;
          top      : 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

