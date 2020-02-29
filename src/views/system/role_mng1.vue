<template>
  <div style="padding:20px;height:100%;">
    <div style="background:#fff;padding:5px;height:95%">
      <div
        el-row
        style = "padding:10px;text-align: left;"
      >
        <div
          el-col
          span  = "24"
          class = "top"
        >
          <el-input
            placeholder = "请输入搜索角色名称"
            style       = "width: auto"
            size        = "small"
            v-model.trim    = "searchValue"
            clearable
          />
          <el-button
            type   = "primary"
            icon   = "el-icon-search"
            size   = "small"
            @click = 'search'
          >搜索</el-button>
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "add"
            icon          = "el-icon-plus"
          >新增</el-button>
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "update"
            icon          = "el-icon-edit"
          >修改</el-button>
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "remove"
            icon          = "el-icon-delete"
          >删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
<div style="padding:5px;height:90%" >
      <el-table
        :data = "datalists"
        border
        stripe
        style             = "width: 100%;text-align:left;overflow:auto;"
        @selection-change = "handleSelectionChange"
        height="100%"
      >
        <el-table-column
          type  = "selection"
          width = "55"
        >
        </el-table-column>
        <el-table-column
                    type  = "index"
                  :index  = "indexMethod"
                    width = "50"
        >
        </el-table-column>
        <el-table-column
          prop  = "name"
          label = "角色名称"
          width = "300"
        ></el-table-column>
        <el-table-column
          prop  = "orgName"
          label = "所属公司"
          width = "300"
        ></el-table-column>
        <el-table-column
          prop  = "remark"
          label = "备注"
          width = "180"
        ></el-table-column>
        <el-table-column
          prop  = "createTime"
          label = "创建时间"
        ></el-table-column>

      </el-table>
</div>
      <!-- 模态框 -->

      <el-dialog
                  title       = "新增角色"
                :visible.sync = "dialogVisible"
                  width       = "660px"
                :before-close = "handleClose"
                  id          = 'add'
                  class       = "model"
      >
        <div style="height:600px;overflow:auto">
          <el-form
            :model        = "ruleForm"
            :rules        = "rules"
              ref         = "ruleForm"
              label-width = "100px"
              class       = "demo-ruleForm"
          >
            <el-form-item
              label = "编辑内容"
              style = "margin-bottom:0px;line-height:14px"
            >

            </el-form-item>
            <hr />
            <el-form-item
              label  = "id"
              prop   = "id"
              hidden = 'true'
            >
              <el-input v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item
              label = "角色名称"
              prop  = "name"
            >
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item
              label = "所属公司"
              prop  = "company"
            >
              <el-select
                v-model     = "ruleForm.company"
                placeholder = "请选择角色所属公司"
                style="width:100%;"
              >
                <el-option
                            v-for = "(item,index) in orgNameList"
                          :label  = "item.orgName"
                          :value  = "item.orgId"
                          :key    = "index"
                >
                  {{item.orgName}}
                  <!-- <span hidden >{{item.orgId}}</span> -->
                </el-option>
                <!-- <el-option value="总公司">总公司</el-option>
              <el-option value="分公司">分公司</el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item
              label = "状态"
              prop  = "state"
            >
              <el-radio-group v-model="radio2">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">无效（相当于逻辑删除）</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label = "备注"
              prop  = "notice"
            >
              <el-input v-model="ruleForm.notice"></el-input>
            </el-form-item>
            <el-form-item
              label = "编辑权限"
              style = "margin-bottom:0px"
            >

            </el-form-item>
            <hr />
            <div style="position:relative;height:300px;overflow:hidden;">
              <div style="width:45%;float:left;border:1px solid #dcdfe6;height:95%;overflow:auto;">
                <el-tree
                  :data = "treeData"
                  show-checkbox
                            node-key            = "menuId"
                          :props                = "defaultProps"
                            @check-change       = 'getChecked'
                            ref                 = 'tree1'
                          :default-checked-keys = "menuIdList"
                            id                  = "qxtree"
                >
                </el-tree>
              </div>
              <div
                style = "width:53%;float:right;border:1px solid #dcdfe6;height:95%;overflow:auto;"
                class = "qxMng"
              >

              </div>
            </div>
            <el-form-item>
              <el-button
                type   = "primary"
                @click = "submitForm('ruleForm')"
              >提交</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
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
        </div>
      </el-dialog>
    </div>
    <div class="pageNation">
      <el-pagination
                  @size-change    = "handleSizeChange"
                  @current-change = "handleCurrentChange"
                :current-page     = "currentPage"
                :page-sizes       = "pageSize"
                :page-size        = "100"
                  layout          = "total, sizes, prev, pager, next, jumper"
                :total            = "total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import base from "../../base/base.js";
import Vue from "vue";
export default {
  // mixins: [base],
  inject: ["reload"],
  data() {
     // 行内自定义校验
    var validatePass = (rule, value, callback) => {
      // console.log('11',this.ruleForm.name)
      value=value.trim();
      if(this.oldName && value==this.oldName){
        callback()
      }else if(value==null || value==''){
        callback(new Error('角色名称必填！'));
      }else{
        let data={
          "name":value
        }
        this.$axios({
          method: "get",
          url   : `${this.$store.state.globalRouter}/auth/system/role/isExist`,
          headers: {
              'Content-type': 'application/json;charset=UTF-8'
          },
          params:data,
        }).then(res => {
         if(res.data.data){
            callback();
         }else{
           callback(new Error('该角色名称已经存在，请更换角色名称！'));
         }
        });
      }

    };
    return {
      //分页data
      currentPage   : 1,
      pageSize      : [10, 20, 30, 50],
      total         : 0,
      changePageSize: 10,

      //表单相关
      dialogVisible: false,
      ruleForm     : {
        name   : "",
        company: "",
        state  : "",
        notice : "",
        id     : 0
      },
      oldName:null,
      rules: {
        // name   : [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        name   : [{required:true,validator:validatePass,trigger: 'blur'}],
        company: [
          { required: true, message: "请选择角色所属公司", trigger: "change" }
        ]
        // state: [
        //   { required: true, message: "请选择角色当前状态", trigger: "change" }
        // ]
      },
      //列表相关
      datalists: [],

      //树相关
      treeData    : [],
      defaultProps: {
        children: "children",
        label   : "name"
      },
      addqx   : [],
      updateqx: [],
      delqx   : [],
      shenheqx: [],
      //修改表单填的数据
      updateData2: [],
      radio2     : null,
      dataQx     : null,
      dataQx1    : null,
      data2      : null,

      //修改或者添加时的所属公司
      orgNameList: [],
      menuIdList : [],
      menuIdList1: [],
      count      : 0,

      qxMenuList: [],

      //搜索
      searchValue: "",

      //   扩展权限
      extraList    : [],
      menuExtraMaps: {},
      extraQx      : []
    };
  },
  methods: {
    // // 新增，修改时监听事件
    // blurType(){
    //   // console.log(this.ruleForm.name)
    // },
    search() {
      if (this.searchValue != null && this.searchValue.length >= 1) {
        this.$axios({
          url   : `${this.$store.state.globalRouter}/auth/system/role/pagination`,
          method: "post",
          data  : {
            pageNo  : 1,
            pageSize: this.changePageSize,
            name    : this.searchValue
          }
        }).then(res => {
          this.total       = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.dataList(res.data.resultList);
        });
      } else {
        this.$axios({
          url   : `${this.$store.state.globalRouter}/auth/system/role/pagination`,
          method: "post",
          data  : {
            pageNo  : this.currentPage,
            pageSize: this.changePageSize
          }
        }).then(res => {
          this.total       = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.dataList(res.data.resultList);
        });
      }
    },
    add() {
      this.qxdel    = [];
      this.qxshenhe = [];
      this.qxdel    = [];
      this.qxadd    = [];
      this.dataQx1  = null;
      $(".model")
        .find(".el-dialog__title")
        .html("新增角色信息");
      this.dialogVisible = true;
      $(".qxMng").html("权限分配");

      var that = this;
      setTimeout(function() {
        that.radio2 = null;
        that.oldName=null;
        that.resetForm("ruleForm");
        that.$refs.tree1.setCheckedKeys([]);
        that.treeData = JSON.parse(window.localStorage.getItem("router"));
        // console.log($("#qxtree"));
        // $('#qxtree').attr('default-checked-keys',[]);
      }, 200);
    },
    update() {
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        this.$axios({
          url:
            this.$store.state.globalRouter +
            "/auth/system/role/getRoleMenuOpts?roleId=" +
            encodeURI(this.updateData2[0].roleId),
          method: "get"
        }).then(res => {
          //每次请求时置为空
          this.menuIdList  = [];
          this.menuIdList1 = [];

          // 每次请求的时候把增删改查等权限列表也置为空
          this.addqx    = [];
          this.shenheqx = [];
          this.delqx    = [];
          this.updateqx = [];

          this.$refs.tree1.setCheckedKeys([]);
          this.qxMenuList = res.data.data;
          for (var item of this.qxMenuList) {
            this.menuIdList.push(item.menuId);
          }
        });

        $(".model")
          .find(".el-dialog__title")
          .html("修改角色信息");
                            this.dialogVisible = true;
                        var that               = this;
        setTimeout(function() {
          that.ruleForm.name = that.updateData2[0].name;
          that.oldName = that.updateData2[0].name;
          if (that.updateData2[0].orgName) {
            that.ruleForm.company = that.updateData2[0].orgName;
          }
          if (that.updateData2[0].status == 1) {
            that.ruleForm.state = 1;
            that.radio2         = 1;
          } else {
            that.radio2         = 2;
            that.ruleForm.state = 2;
          }
          // that.ruleForm.company = that.updateData2[0].company;
          // that.ruleForm.state   = that.updateData2[0].state;
          that.ruleForm.notice = that.updateData2[0].notice;
          //判断是add还是修改
          that.ruleForm.id = 1;
          // 树的数据
          // console.log('11111',that.$store.state.getRouter)
          that.treeData = JSON.parse(window.localStorage.getItem("router"));

          that.ruleForm.company = that.updateData2[0].orgId;

          that.count = 1;

          $("#qxtree").attr("default-checked-keys", that.menuIdList);

          //获取修改时加载权限列表（与权限树相对应）
          that.getChecked();
        }, 500);
      }
    },
    remove() {
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        this.$confirm("是否要删除当前数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText : "取消",
          type             : "warning",
          center           : true
        })
          .then(() => {
            var that = this;
            setTimeout(() => {
              that
                .$axios({
                  url:
                    that.$store.state.globalRouter +
                    "/auth/system/role/remove?id=" +
                    encodeURI(that.updateData2[0].roleId),
                  method: "get"
                })
                .then(res => {
                  if(res.data.resultCode=='000000'){
                      that.$message({
                      type   : "success",
                      message: "删除成功"
                    });
                    that.$options.methods.getReloadData(that);
                  }else{
                  this.$message.warning(res.data.resultMsg);
                  }
                });
            }, 500);
          })
          .catch(() => {
            this.$message({
              type   : "info",
              message: "取消删除"
            });
          });
      }
    },

    dataList(tableData) {
      var newdata   = [];
      var dataArray = tableData;

      dataArray.forEach(el => {
        if (el.createTime) {
          newdata.push(
            this.$moment(el.createTime).format("YYYY-MM-DD HH:mm:ss")
          );
        }
      });

      this.transform(dataArray, newdata);
      this.datalists = dataArray;
    },
    transform(old, insert) {
      old.forEach((el, index) => {
        el.createTime = insert[index];
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
        url   : `${this.$store.state.globalRouter}/auth/system/role/pagination`,
        method: "post",
        data  : {
          name    : "",
          pageSize: this.changePageSize,
          pageNo  : val
        }
      }).then(res => {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.changePageSize + index + 1;
    },
    handleSelectionChange(val) {
      this.updateData2 = val;
      // console.log(this.updateData2);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.reload();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var checkData  = this.$refs.tree1.getCheckedNodes();
          var checkData1 = this.$refs.tree1.getHalfCheckedNodes();
          // console.log(checkData1)
          // console.log("checkData", checkData);
          var checkMenuIds = [];
          var crudMenuId   = [];

          for (var item of checkData) {
            checkMenuIds.push(item.menuId);
            if (item.parentId != 1) {
              crudMenuId.push(item.menuId);
            } else {
            }
          }

          if(checkData1 && checkData1.length>=1){
            for(var item of checkData1){
              checkMenuIds.push(item.menuId);
            }
          }
          // console.log(checkMenuIds)
          if (this.ruleForm.id == 1) {
            if (crudMenuId && crudMenuId.length >= 1) {
              var menuList = [];
              for (let i = 0; i < crudMenuId.length; i++) {
                menuList.push({
                                id                            : 0,
                                orderStr                      : "",
                                lang                          : "",
                                userId                        : 0,
                                loginName                     : "",
                                requestIp                     : "",
                                menuId                        : crudMenuId[i],
                                name                          : "",
                                url                           : "",
                                parentId                      : 0,
                                position                      : 0,
                                status                        : 0,
                                createTime                    : "",
                                systemMenu                    : 0,
                                menuCode                      : "",
                                dataQuery                     : 1,
                                dataAdd                       : this.addqx.indexOf(crudMenuId[i] + "") != -1 ? 1: 0,
                                dataUpdate                    :
          this.updateqx.indexOf(crudMenuId[i] + "") != -1 ? 1 : 0,
                                dataDelete                    :
          this.delqx.indexOf    (crudMenuId[i] + "") != -1 ? 1: 0,
                                dataAudit                     :
          this.shenheqx.indexOf(crudMenuId[i] + "") != -1 ? 1 : 0,
                                dataExtra1                    :
                    this.extraQx.indexOf("ext_1_" + crudMenuId[i]) != -1
                      ? 1
                                                                        :      0,
                                                              dataExtra2:
                    this.extraQx.indexOf("ext_2_" + crudMenuId[i]) != -1
                      ? 1
                                                                        :      0,
                                                              dataExtra3:
                    this.extraQx.indexOf("ext_3_" + crudMenuId[i]) != -1
                      ? 1
                                                                        :      0,
                                                              dataExtra4:
                    this.extraQx.indexOf("ext_4_" + crudMenuId[i]) != -1
                      ? 1
                                                                        :      0,
                                                              dataExtra5:
                    this.extraQx.indexOf("ext_5_" + crudMenuId[i]) != -1
                      ? 1
                                                                        :      0,
                                                              dataExtra6:
                    this.extraQx.indexOf("ext_6_" + crudMenuId[i]) != -1
                      ? 1
                                                              :      0,
                                                      subMenus: []
                });
              }
            }

            var obj = {
              checkMenuIds: checkMenuIds,
              crudMenuId  : crudMenuId,
              roleId      : this.updateData2[0].roleId,
              name        : this.ruleForm.name,
              status      : this.radio2,
              remark      : this.ruleForm.notice,
              createTime  : "",
              createUserId: 0,
              menus       : menuList,
              menuIds     : crudMenuId,
              orgName     : "",
              orgId       : this.ruleForm.company,
              orgLinks    : ""
            };
            if(!this.radio2){
              this.$message({type:'warning',message:"状态为必选"});
              return false;
            }
            if(checkMenuIds.length>=1&&crudMenuId.length>=1){

            }else{
              this.$message({type:'warning',message:"角色权限必选！"});
              return false;
            }
            this.$axios({
              url: `${
                this.$store.state.globalRouter
              }/auth/system/role/saveOrUpdate`,
              method: "post",
              data  : obj
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                alert("修改成功");
              }
            });
          } else {
            if (crudMenuId && crudMenuId.length >= 1) {
              var menuList = [];
              for (let i = 0; i < crudMenuId.length; i++) {
                if (this.addqx.indexOf(crudMenuId[i] + "") != -1) {
                  var add = 1;
                }
                menuList.push({
                                          id                            : 0,
                                          orderStr                      : "",
                                          lang                          : "",
                                          userId                        : 0,
                                          loginName                     : "",
                                          requestIp                     : "",
                                          menuId                        : crudMenuId[i],
                                          name                          : "",
                                          url                           : "",
                                          parentId                      : 0,
                                          position                      : 0,
                                          status                        : 0,
                                          createTime                    : "",
                                          systemMenu                    : 0,
                                          menuCode                      : "",
                                          dataQuery                     : 1,
                                          dataAdd                       : this.addqx.indexOf(crudMenuId[i] + "") != -1 ? 1: 0,
                                          dataUpdate                    :
                    this.updateqx.indexOf(crudMenuId[i] + "") != -1 ? 1 : 0,
                                          dataDelete                    :
                    this.delqx.indexOf    (crudMenuId[i] + "") != -1 ? 1: 0,
                                          dataAudit                     :
                    this.shenheqx.indexOf(crudMenuId[i] + "") != -1 ? 1 : 0,
                                          dataExtra1                    :
                    this.extraQx.indexOf("ext_1_" + crudMenuId[i]) != -1
                      ? 1
                                                                        :      0,
                                                              dataExtra2:
                    this.extraQx.indexOf("ext_2_" + crudMenuId[i]) != -1
                      ? 1
                                                                        :      0,
                                                              dataExtra3:
                    this.extraQx.indexOf("ext_3_" + crudMenuId[i]) != -1
                      ? 1
                                                                        :      0,
                                                              dataExtra4:
                    this.extraQx.indexOf("ext_4_" + crudMenuId[i]) != -1
                      ? 1
                                                                        :      0,
                                                              dataExtra5:
                    this.extraQx.indexOf("ext_5_" + crudMenuId[i]) != -1
                      ? 1
                                                                        :      0,
                                                              dataExtra6:
                    this.extraQx.indexOf("ext_6_" + crudMenuId[i]) != -1
                      ? 1
                                                              :      0,
                                                      subMenus: []
                });
              }
            }

            // 添加时的roleId一定要为null，不能为0
            var obj = {
              checkMenuIds: checkMenuIds,
              crudMenuId  : crudMenuId,
              roleId      : null,
              name        : this.ruleForm.name,
              status      : this.radio2,
              remark      : this.ruleForm.notice,
              createTime  : "",
              createUserId: 0,
              menus       : menuList,
              menuIds     : crudMenuId,
              orgName     : "",
              orgId       : this.ruleForm.company,
              orgLinks    : ""
            };
            if(!this.radio2){
              this.$message({type:'warning',message:"状态为必选"});
              return false;
            }
            if(checkMenuIds.length>=1&&crudMenuId.length>=1){

            }else{
              this.$message({type:'warning',message:"角色权限必选！"});
              return false;
            }
            this.$axios({
              url: `${
                this.$store.state.globalRouter
              }/auth/system/role/saveOrUpdate`,
              method: "post",
              data  : obj
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                alert("添加成功");
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getChecked() {
      var checkData = [];
          checkData = this.$refs.tree1.getCheckedNodes();

      //
      //   console.log(this.menuIdList,this.$refs.tree1.getCheckedNodes());
      var newData = [];
      if (checkData.length >= 1) {
        for (var item of checkData) {
          if (item.parentId == 1) {
          } else {
            newData.push(item);
          }
        }
      }
      var that  = this;
      var data6 = "";
      //   console.log('初始时的权限列表',that.qxMenuList)

      // that.qxMenuList被选中的树形菜单
      if (that.qxMenuList.length >= 1) {
        console.log(that.qxMenuList);
        for (var item of that.qxMenuList) {
          //   添加初始化的权限
          if (item.dataAdd == 1) {
            that.addqx.push(item.menuId + "");
          }
          if (item.dataUpdate == 1) {
            that.updateqx.push(item.menuId + "");
          }
          if (item.dataDelete == 1) {
            that.delqx.push(item.menuId + "");
          }
          if (item.dataAudit == 1) {
            that.shenheqx.push(item.menuId + "");
          }

          if (item.dataExtra1 == 1) {
            that.extraQx.push("ext_1_" + item.menuId);
          }
          if (item.dataExtra2 == 1) {
            that.extraQx.push("ext_2_" + item.menuId);
          }
          if (item.dataExtra3 == 1) {
            that.extraQx.push("ext_3_" + item.menuId);
          }
          if (item.dataExtra4 == 1) {
            that.extraQx.push("ext_4_" + item.menuId);
          }
          if (item.dataExtra5 == 1) {
            that.extraQx.push("ext_5_" + item.menuId);
          }
          if (item.dataExtra6 == 1) {
            that.extraQx.push("ext_6_" + item.menuId);
          }
        }
        console.log(that.extraQx);
        if (this.count == 1) {
          data6  = ``;
          data6 += `<table style="width: 100%;background:#fafafa " id="menuUrlCURDTable">
                   <thead><tr><th>名称</th><th>权限<input type="checkbox" @click="checkAll(2)">增<input type="checkbox" @click="checkAll(3)">改<input type="checkbox" @click="checkAll(4)">删<input type="checkbox" @click="checkAll(5)">审 操作</th></tr></thead>`;
          //    console.log(that.qxMenuList)
          for (var item of that.qxMenuList) {
            // //   添加初始化的权限
            //   if(item.dataAdd==1){
            //       that.addqx.push(item.menuId)
            //   }
            //   if(item.dataUpdate==1){
            //       that.updateqx.push(item.menuId)
            //   }
            //   if(item.dataDelete==1){
            //       that.delqx.push(item.menuId)
            //   }
            //   if(item.dataAudit==1){
            //       that.shenheqx.push(item.menuId)
            //   }

            data6 += `<tr id="curd_${
              item.menuId
            }"><td style='vertical-align:top!important;
    text-align:left!important;width:145px;' ref='qxname'>${
      item.menuName
    }</td><td style='vertical-align:top!important;
    text-align:left!important;'>`;
            if (item.dataQuery == 1) {
              data6 += `<input type="hidden" value="30" name="crudMenuId"><input type="checkbox" value="1" checked="checked" name="que_${
                item.menuId
              }" disabled="disabled">查`;
            } else {
              data6 += `<input type="hidden" value="30" name="crudMenuId"><input type="checkbox" value="0" name="que_${
                item.menuId
              }" disabled="disabled">查`;
            }
            if (item.dataAdd == 1) {
              data6 += `<input type="checkbox" value="1" name='add_${
                item.menuId
              }' class='qxadd' checked="checked" @click='qxadd'>增`;
            } else {
              data6 += `<input type="checkbox" value="0" name='add_${
                item.menuId
              }' class='qxadd' @click='qxadd'>增`;
            }

            if (item.dataUpdate == 1) {
              data6 += `<input type="checkbox" value="1" name="upd_${
                item.menuId
              }" class='qxupdate' checked="checked" @click='qxupdate'>改`;
            } else {
              data6 += `<input type="checkbox" value="0" name="upd_${
                item.menuId
              }" class='qxupdate' @click='qxupdate'>改`;
            }
            if (item.dataDelete == 1) {
              data6 += `<input type="checkbox" value="1" name="del_${
                item.menuId
              }" class='qxdel' checked="checked" @click='qxdel'>删`;
            } else {
              data6 += `<input type="checkbox" value="0" name="del_${
                item.menuId
              }" class='qxdel' @click='qxdel'>删`;
            }

            // 扩展权限
            var mEM = that.menuExtraMaps[item.menuId];
            if (mEM == null) {
              if (item.dataAudit) {
                data6 += `<input type="checkbox" value="1" name="aud_${
                  item.menuId
                }" class='qxshenhe' checked="checked" @click='qxshenhe'>审</td>`;
              } else {
                data6 += `<input type="checkbox" value="0" name="aud_${
                  item.menuId
                }" class='qxshenhe' @click='qxshenhe'>审</td>`;
              }
            } else {
              if (item.dataAudit) {
                data6 += `<input type="checkbox" value="1" name="aud_${
                  item.menuId
                }" class='qxshenhe' checked="checked" @click='qxshenhe'>审`;
              } else {
                data6 += `<input type="checkbox" value="0" name="aud_${
                  item.menuId
                }" class='qxshenhe' @click='qxshenhe'>审`;
              }
            }

            // if (mEM != null) {
            //   var extrHtmls  = "<br/>";
            //       extrHtmls +=
            //     "<input type='hidden' value='1'  name='extFlag_" +
            //     item.menuId +
            //     "' />";
            //   for (var eInd = 1; eInd <= mEM.length; eInd++) {
            //       if(item.dataExtra1==1){
            //           extrHtmls +=
            //       "<input type='checkbox' value='1'  name='ext_" +eInd +"_" +item.menuId +"' checked='checked' />" +mEM[eInd - 1];
            //       }else{
            //          extrHtmls +=
            //       "<input type='checkbox' value='0'  name='ext_" +eInd +"_" +item.menuId +"' />" +mEM[eInd - 1];
            //       }
            //   }
            //   data6 += extrHtmls;
            //   data6 += "</td>";
            // }

            var extrHtmls = "<br/>";
            if (mEM != null && item.menuId == 69) {
              if (item.dataExtra1 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  1 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />指派";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  1 +
                  "_" +
                  item.menuId +
                  "' @click='extra'/>指派";
              }
              if (item.dataExtra2 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  2 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />评级";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  2 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />评级";
              }
              if (item.dataExtra3 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  3 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />复审";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  3 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />复审";
              }
              if (item.dataExtra4 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  4 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />分配";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  4 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />分配";
              }
              if (item.dataExtra5 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  5 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />审核";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  5 +
                  "_" +
                  item.menuId +
                  "' @click='extra'  />审核";
              }
              if (item.dataExtra6 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  6 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />删除工单";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  6 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />删除工单";
              }
            } else if (mEM != null && item.menuId == 162) {
              if (item.dataExtra1 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  1 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />接收";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  1 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />接收";
              }
            } else if (mEM != null && item.menuId == 188) {
              if (item.dataExtra1 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  1 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />发起对账";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  1 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />发起对账";
              }
              if (item.dataExtra2 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  2 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />完成对账";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  2 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />完成对账";
              }
              if (item.dataExtra3 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  3 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />退回";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  3 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />退回";
              }
            } else if (mEM != null && item.menuId == 189) {
              if (item.dataExtra1 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  1 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />发送结算单";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  1 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />发送结算单";
              }
              if (item.dataExtra2 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  2 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />确认接收";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  2 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />确认接收";
              }
              if (item.dataExtra3 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  3 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />退回";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  3 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />退回";
              }
              if (item.dataExtra4 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  4 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />审核";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  4 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />审核";
              }
              if (item.dataExtra5 == 1) {
                extrHtmls +=
                  "<input type='checkbox' value='1'  name='ext_" +
                  5 +
                  "_" +
                  item.menuId +
                  "' checked='checked' @click='extra' />确认打款";
              } else {
                extrHtmls +=
                  "<input type='checkbox' value='0'  name='ext_" +
                  5 +
                  "_" +
                  item.menuId +
                  "' @click='extra' />确认打款";
              }
            }
            data6 += extrHtmls;
            data6 += "</td>";
          }
          data6      += `</tr></tbody></table>`;
          this.count  = 2;
        } else {
          // 每次重新点击树时，选中的列表
          that.addqx    = [];
          that.delqx    = [];
          that.updateqx = [];
          that.shenheqx = [];
          that.extraQx  = [];

          data6  = ``;
          data6 += `<table style="width: 100%;background:#fafafa " id="menuUrlCURDTable">
                   <thead><tr><th>名称</th><th>权限<input type="checkbox" @click="checkAll(2)">增<input type="checkbox" @click="checkAll(3)">改<input type="checkbox" @click="checkAll(4)">删<input type="checkbox" @click="checkAll(5)">审 操作</th></tr></thead>`;
          if (newData.length >= 1) {
            for (var item of newData) {
              data6 += `<tr id="curd_${
                item.menuId
              }"><td style='vertical-align:top!important;
    text-align:left!important;width:145px;' ref='qxname'>${
      item.name
    }</td><td style='vertical-align:top!important;
    text-align:left!important;'><input type="hidden" value="30" name="crudMenuId"><input type="checkbox" value="1" checked="checked" name="que_${
      item.menuId
    }" disabled="disabled">查<input type="checkbox" value="0" name='add_${
                item.menuId
              }' class='qxadd' @click='qxadd'>增<input type="checkbox" value="0" name="upd_${
                item.menuId
              }" class='qxupdate' @click='qxupdate'>改<input type="checkbox" value="0" name="del_${
                item.menuId
              }" class='qxdel' @click='qxdel'>删`;

              var mEM = that.menuExtraMaps[item.menuId];
              if (mEM == null) {
                data6 += `<input type="checkbox" value="0" name="aud_${
                  item.menuId
                }" class='qxshenhe' @click='qxshenhe'>审</td>`;
              } else {
                data6 += `<input type="checkbox" value="0" name="aud_${
                  item.menuId
                }" class='qxshenhe' @click='qxshenhe'>审`;
              }

              if (mEM != null) {
                var extrHtmls  = "<br/>";
                    extrHtmls +=
                  "<input type='hidden' value='1'  name='extFlag_" +
                  item.menuId +
                  "' />";
                for (var eInd = 1; eInd <= mEM.length; eInd++) {
                  // extrHtmls +=
                  //   "<input type='checkbox' value='1'  name='ext_" +
                  //   eInd +
                  //   "_" +
                  //   item.menuId +
                  //   "' @click='extra'/>" +
                  //   mEM[eInd - 1];

                  extrHtmls += `<input type='checkbox' value='0'  name='ext_${eInd}_${
                    item.menuId
                  }' @click='extra'/>${mEM[eInd - 1]}`;
                }
                data6 += extrHtmls;
                data6 += "</td>";
              }
            }
            data6 += `</tr></tbody></table>`;
          } else {
            data6 = `<p>权限分配</p>`;
          }
        }
      } else {
        // 每次重新点击树时，选中的列表
        that.addqx    = [];
        that.delqx    = [];
        that.updateqx = [];
        that.shenheqx = [];
        that.extraQx  = [];

        data6  = ``;
        data6 += `<table style="width: 100%;background:#fafafa " id="menuUrlCURDTable">
                   <thead><tr><th>名称</th><th>权限<input type="checkbox" @click="checkAll(2)">增<input type="checkbox" @click="checkAll(3)">改<input type="checkbox" @click="checkAll(4)">删<input type="checkbox" @click="checkAll(5)">审 操作</th></tr></thead>`;
        if (newData.length >= 1) {
          for (var item of newData) {
            data6 += `<tr id="curd_${
              item.menuId
            }"><td style='vertical-align:top!important;
    text-align:left!important;width:145px;' ref='qxname'>${
      item.name
    }</td><td style='vertical-align:top!important;
    text-align:left!important;'><input type="hidden" value="30" name="crudMenuId"><input type="checkbox" value="1" checked="checked" name="que_${
      item.menuId
    }" disabled="disabled">查<input type="checkbox" value="0" name='add_${
              item.menuId
            }' class='qxadd' @click='qxadd'>增<input type="checkbox" value="0" name="upd_${
              item.menuId
            }" class='qxupdate' @click='qxupdate'>改<input type="checkbox" value="0" name="del_${
              item.menuId
            }" class='qxdel' @click='qxdel'>删`;

            var mEM = that.menuExtraMaps[item.menuId];
            if (mEM == null) {
              data6 += `<input type="checkbox" value="0" name="aud_${
                item.menuId
              }" class='qxshenhe' @click='qxshenhe'>审</td>`;
            } else {
              data6 += `<input type="checkbox" value="0" name="aud_${
                item.menuId
              }" class='qxshenhe' @click='qxshenhe'>审`;
            }

            if (mEM != null) {
              var extrHtmls  = "<br/>";
                  extrHtmls +=
                "<input type='hidden' value='1'  name='extFlag_" +
                item.menuId +
                "' />";
              for (var eInd = 1; eInd <= mEM.length; eInd++) {
                extrHtmls += `<input type='checkbox' value='0'  name='ext_${eInd}_${
                  item.menuId
                }' @click='extra'/>${mEM[eInd - 1]}`;
              }
              data6 += extrHtmls;
              data6 += "</td>";
            }
          }
          data6 += `</tr></tbody></table>`;
        } else {
          data6 = `<p>权限分配</p>`;
        }
      }
      var MyComponent = Vue.extend({
        template: data6,
        data() {
          return {
            num2: 1,
            num3: 1,
            num4: 1,
            num5: 1
          };
        },
        methods: {
          checkAll(type) {
            // console.log(type)
            if (type == 2) {
              if (this.num2 % 2 == 1) {
                $(".qxadd").attr("checked", true);
                $(".qxadd").attr("value", 1);
                this.num2 += 1;
              } else {
                $(".qxadd").attr("checked", false);
                $(".qxadd").attr("value", 0);
                this.num2 += 1;
              }
            } else if (type == 3) {
              if (this.num3 % 2 == 1) {
                $(".qxupdate").attr("checked", true);
                $(".qxupdate").attr("value", 1);
                this.num3 += 1;
              } else {
                $(".qxupdate").attr("checked", false);
                $(".qxupdate").attr("value", 0);
                this.num3 += 1;
              }
            } else if (type == 4) {
              if (this.num4 % 2 == 1) {
                $(".qxdel").attr("checked", true);
                $(".qxdel").attr("value", 1);
                this.num4 += 1;
              } else {
                $(".qxdel").attr("checked", false);
                $(".qxdel").attr("value", 0);
                this.num4 += 1;
              }
            } else if (type == 5) {
              if (this.num5 % 2 == 1) {
                $(".qxshenhe").attr("checked", true);
                $(".qxshenhe").attr("value", 1);
                this.num5 += 1;
              } else {
                $(".qxshenhe").attr("checked", false);
                $(".qxshenhe").attr("value", 0);
                this.num5 += 1;
              }
            }
          },
          extra(e) {
            if (e.target.getAttribute("value") == 0) {
              e.target.setAttribute("value", 1);
              e.target.setAttribute("checked", true);
              var curId = e.target.getAttribute("name");
              if (that.extraQx.indexOf(curId) == -1) {
                that.extraQx.push(curId);
              }
            } else {
              e.target.setAttribute("value", 0);
              e.target.setAttribute("checked", false);
              var curId = e.target.getAttribute("name");
              if (that.extraQx.indexOf(curId) != -1) {
                that.extraQx.splice(that.extraQx.indexOf(curId), 1);
              }
            }
            console.log(that.extraQx);
          },
          qxadd(e) {
            if (e.target.getAttribute("value") == 0) {
              e.target.setAttribute("value", 1);
              e.target.setAttribute("checked", true);
              var curId = e.target.getAttribute("name").split("_")[1];
              if (that.addqx.indexOf(curId) == -1) {
                that.addqx.push(curId);
              }
            } else {
              e.target.setAttribute("value", 0);
              e.target.setAttribute("checked", false);
              var curId = e.target.getAttribute("name").split("_")[1];
              if (that.addqx.indexOf(curId) != -1) {
                that.addqx.splice(that.addqx.indexOf(curId), 1);
              }
            }
            // console.log(that.addqx);
            // this.getAllAdd();
          },
          qxupdate(e) {
            if (e.target.getAttribute("value") == 0) {
              e.target.setAttribute("value", 1);
              e.target.setAttribute("checked", true);
              var curId = e.target.getAttribute("name").split("_")[1];
              if (that.updateqx.indexOf(curId) == -1) {
                that.updateqx.push(curId);
              }
            } else {
              e.target.setAttribute("value", 0);
              e.target.setAttribute("checked", false);
              var curId = e.target.getAttribute("name").split("_")[1];
              if (that.updateqx.indexOf(curId) != -1) {
                that.updateqx.splice(that.updateqx.indexOf(curId), 1);
              }
            }
            // this.getAllUpdate();
          },
          qxdel(e) {
            if (e.target.getAttribute("value") == 0) {
              e.target.setAttribute("value", 1);
              e.target.setAttribute("checked", true);
              var curId = e.target.getAttribute("name").split("_")[1];
              if (that.delqx.indexOf(curId) == -1) {
                that.delqx.push(curId);
              }
            } else {
              e.target.setAttribute("value", 0);
              e.target.setAttribute("checked", false);
              var curId = e.target.getAttribute("name").split("_")[1];
              if (that.delqx.indexOf(curId) != -1) {
                that.delqx.splice(that.delqx.indexOf(curId), 1);
              }
            }
            // this.getAllDel();
          },
          qxshenhe(e) {
            if (e.target.getAttribute("value") == 0) {
              e.target.setAttribute("value", 1);
              e.target.setAttribute("checked", true);
              var curId = e.target.getAttribute("name").split("_")[1];
              if (that.shenheqx.indexOf(curId) == -1) {
                that.shenheqx.push(curId);
              }
            } else {
              e.target.setAttribute("value", 0);
              e.target.setAttribute("checked", false);
              var curId = e.target.getAttribute("name").split("_")[1];
              if (that.shenheqx.indexOf(curId) != -1) {
                that.shenheqx.splice(that.shenheqx.indexOf(curId), 1);
              }
            }
            // this.getAllShenhe();
          },
          getAllAdd() {
            that.addqx = [];
            for (let i = 0; i < $(".qxadd").length; i++) {
              if ($(".qxadd")[i].getAttribute("value") == 1) {
                var id = $(".qxadd")
                  [i].getAttribute("name")
                  .split("_")[1];
                that.addqx.push(id);
              }
            }
            // console.log(that.addqx);
          },
          getAllUpdate() {
            that.updateqx = [];
            for (let i = 0; i < $(".qxupdate").length; i++) {
              if ($(".qxupdate")[i].getAttribute("value") == 1) {
                var id = $(".qxupdate")
                  [i].getAttribute("name")
                  .split("_")[1];
                that.updateqx.push(id);
              }
            }
          },
          getAllDel() {
            that.delqx = [];
            for (let i = 0; i < $(".qxdel").length; i++) {
              if ($(".qxdel")[i].getAttribute("value") == 1) {
                var id = $(".qxdel")
                  [i].getAttribute("name")
                  .split("_")[1];
                that.delqx.push(id);
              }
            }
          },
          getAllShenhe() {
            that.shenheqx = [];
            for (let i = 0; i < $(".qxshenhe").length; i++) {
              if ($(".qxshenhe")[i].getAttribute("value") == 1) {
                var id = $(".qxshenhe")
                  [i].getAttribute("name")
                  .split("_")[1];
                that.shenheqx.push(id);
              }
            }
          }
        }
      });
      var component = new MyComponent().$mount();
      $(".qxMng").html(component.$el);
    },
    getReloadData(that) {
      that
        .$axios({
          url   : `${that.$store.state.globalRouter}/auth/system/role/pagination`,
          method: "post",
          data  : {
            name    : "",
            pageSize: that.changePageSize,
            pageNo  : that.currentPage
          }
        })
        .then(res => {
          if(res.data.resultCode=='100005'){
            that.$router.push({ path: "/" });
            }else{
                      that.total       = res.data.totalCount;
                      that.currentPage = res.data.curPage;
                      that.dataList(res.data.resultList);
            }
                    });
    }
  },
  mounted() {
    this.$axios({
      url   : `${this.$store.state.globalRouter}/auth/system/role/pagination`,
      method: "post",
      data  : {
        name    : "",
        pageSize: this.pageSize[0],
        pageNo  : this.currentPage
      }
    }).then(res => {
      if(res.data.resultCode=='100005'){
this.$router.push({ path: "/" });
}else{
          this.total       = res.data.totalCount;
          this.currentPage = res.data.curPage;
      this.dataList(res.data.resultList);
}
    });

    // //获取添加时的所有权限列表（树形）
    // this.treeData = this.$store.state.getRouter;

    //添加或者修改时所属公司选项
    this.$axios({
      url   : `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=1`,
      method: "get"
    }).then(res => {
      if(res.data.data){
        for (var item of res.data.data) {
          this.orgNameList.push(item);
        }
      }

    });
    this.$axios({
      url   : `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=2`,
      method: "get"
    }).then(res => {
      if(res.data.data){
        for (var item of res.data.data) {
          this.orgNameList.push(item);
        }
      }
    });
    this.$axios({
      url   : `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=3`,
      method: "get"
    }).then(res => {
      if(res.data.data){
        for (var item of res.data.data) {
          this.orgNameList.push(item);
        }
      }

    });
    this.$axios({
      url   : `${this.$store.state.globalRouter}/auth/corporation/list?orgLevel=4`,
      method: "get"
    }).then(res => {
      for (var item of res.data.data) {
        this.orgNameList.push(item);
      }
    });

    // 查询所有扩展权限
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/system/role/loadAllExtraNames`,
      method: "get"
    }).then(res => {
                          this.extraList = res.data.data;
                      var extraList      = res.data.data;
      if (extraList != null && extraList) {
        for (var op = 0; op < extraList.length; op++) {
          var extraObj = extraList[op];
          if (extraObj != null) {
            this.menuExtraMaps[extraObj.menuId] = [];
            for (var pj = 1; pj <= 6; pj++) {
              var actionName = extraObj["extra" + pj + "Name"];
              if (actionName) {
                this.menuExtraMaps[extraObj.menuId][pj - 1] = actionName;
              } else {
                break;
              }
            }
          }
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
  margin-top   : 3px;
  margin-bottom: 6px;
}
td,
th {
  padding       : 0;
  vertical-align: top !important;
  text-align    : left !important;
}
</style>
