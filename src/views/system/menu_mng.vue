<template>
  <div style="padding:20px;height:100%;">
    <el-scrollbar style="height:100%">
      <div class="slot-tree">
        <div class="menuBox">
          <el-scrollbar style="height:100%">
            <!-- <el-button class="slot-t-top" type="primary" size="small" @click="handleAddTop">添加顶级节点</el-button> -->
           <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
          <br>
          <br>
            <el-tree
              ref="menuTree"
              class="expand-tree"
              :filter-node-method="filterNode"
              v-if="isLoadingTree"
              node-key="menuId"
              highlight-current
              :data="setTree"
              empty-text="暂无数据"
              :props="defaultProps"
              :expand-on-click-node="false"

            >
              <span class="slot-t-node" slot-scope="{ node, data }">
                <!-- 未编辑状态 -->
                <span v-show="!node.isEdit">
                  <span
                    :class="[data.menuId >= maxexpandId ? 'slot-t-node--label' : '']"
                  >{{node.label}}</span>
                  <span class="slot-t-icons" style>
                    <!-- 新增按钮 -->
                    <!-- <el-button
                      circle
                      :size="iconSize"
                      icon="el-icon-plus"
                      type="success"
                      @click="NodeAdd(node, data)"
                    ></el-button> -->
                    <!-- 编辑按钮 -->
                    <el-button
                      icon="el-icon-edit"
                      circle
                      :size="iconSize"
                      type="primary"
                      @click="NodeEdit(node, data)"
                    ></el-button>
                    <!-- 删除按钮 -->
                    <!-- <el-button
                      icon="el-icon-delete"
                      circle
                      :size="iconSize"
                      type="warning"
                      @click="NodeDel(node, data)"
                    ></el-button> -->
                  </span>
                </span>
                <!-- 编辑输入框 -->
                <span v-show="node.isEdit">
                  <el-input
                    class="slot-t-input"
                    size="mini"
                    autofocus
                    v-model="data.name"
                    :ref="'slotTreeInput'+data.menuId"
                    @blur.stop="NodeBlur(node, data)"
                    @keyup.enter.native="NodeBlur(node, data)"
                  ></el-input>
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
        </div>
        <div class="rightBox" v-if="isOpen">
          <el-scrollbar style="height:100%">
            <div class="inFrom">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark menuActionTitle">{{menuAction}}</div>
                </el-col>
              </el-row>
              <div class="form_container">
                <el-form
                  ref="inForm"
                  :model="inForm"
                  :rules="inRules"
                  label-width="100px"
                  size="mini"
                  class="inForm_body"
                >
                  <!-- <el-form-item label="父菜单ID" prop="parentId">
                    <el-input v-model="inForm.parentId"></el-input>
                  </el-form-item> -->
                  <el-form-item label="父菜单" prop="parentName">
                    <el-input v-model="inForm.parentName" :disabled="parentDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="inForm.name"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="菜单代码" prop="menuCode" v-if="inForm.parentId!=1">
                    <el-input v-model="inForm.menuCode" :disabled="inForm.parentId===1"></el-input>
                  </el-form-item>
                  <el-form-item label="url" prop="path" v-if="inForm.parentId!=1">
                    <el-input v-model="inForm.path" :disabled="inForm.parentId===1"></el-input>
                  </el-form-item> -->
                  <el-form-item label="统计排序" prop="position">
                    <el-input v-model.number="inForm.position" value="number"></el-input>
                    <span>越大越靠后，同级第一个为10</span>
                  </el-form-item>
                  <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="inForm.status">
                      <el-radio label="1" value="1">有效</el-radio>
                      <el-radio label="0" value="0">无效</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否系统菜单" prop="test">
                    <el-radio-group v-model="inForm.test">
                      <el-radio label="1" value="1">是</el-radio>
                      <el-radio label="0" value="0">否</el-radio>
                    </el-radio-group>
                    <span>(仅限超级管理员能看到)</span>
                  </el-form-item>
                  <el-form-item size="mini">
                    <el-button type="primary" @click="onSubmit('inForm')" size="mini">立即创建</el-button>
                    <el-button size="mini" @click="cancle('inForm')">取消</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import api from "@/resource/api2.js";
export default {
  name: "slot-tree",
  inject:['reload'],
  data() {
    return {
      filterText: "",
      maxexpandId: api.maxexpandId, //新增节点开始id
      non_maxexpandId: api.maxexpandId, //新增节点开始id(不更改)
      isLoadingTree: true, //是否加载节点树
      // setTree: api.treelist, //节点树数据
      setTree: null, //节点树数据
      iconSize: "mini",
      defaultProps: {
        children: "children",
        label: "name"
      },
      isOpen: false,
      parentDisabled: false,
      menuAction: "修改菜单",
      inForm: {
        menuId: "",
        name: "",
        path: "",
        menuCode: "",
        parentId: "",
        position: 10,
        status: '1',
        test: '0',
        extraFlag: "",
        parentName: ""
      },
      inRules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        position: [
          { required: true, message: "排序不能为空" },
          { type: "number", message: "排序必须为数字值" }
        ]
      },
      isAdd: 1
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    NodeEdit(n, d) {
      //编辑节点
      console.log(n, d);
      let _this = this;
      _this.isAdd = 0;
      // if (!n.isEdit) {
      //   //检测isEdit是否存在or是否为false
      //   this.$set(n, "isEdit", true);
      // }
      // this.$nextTick(() => {
      //   this.$refs["slotTreeInput" + d.menuId].$refs.input.focus();
      // });
      this.isOpen = true;
      this.inForm = {
        menuId: "",
        name: "",
        path: "",
        menuCode: "",
        parentId: "",
        position: 10,
        status: "",
        test: "",
        extraFlag: ""
      };

      this.$nextTick(() => {
        _this.$refs["inForm"].clearValidate();
      });
      let nodeData = JSON.parse(JSON.stringify(d));
      console.log(nodeData);
      this.inForm.parentId = nodeData.parentId;
      if (nodeData.parentId == 1) {
        this.inForm.parentName = "系统菜单";
      } else {
        this.inForm.parentName = n.parent.data.name;
      }
      this.inForm.menuCode = nodeData.menuCode;
      this.inForm.name = nodeData.name;
      this.inForm.path = nodeData.component;
      this.inForm.position = nodeData.position;
      this.inForm.status = nodeData.status + "";
      this.inForm.test = nodeData.systemMenu + "";
      this.inForm.menuId = nodeData.menuId;
      this.parentDisabled = true;
    },
    NodeDel(n, d) {
      //删除节点
      console.log(n, d);
      let that = this;
          this.$confirm("是否删除此节点？", "提示", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$axios({
                method: "get",
                url: `${this.$store.state.globalRouter}/auth/system/menu/remove`,
                params:{
                  id:d.menuId
                }
              }).then(res=>{
                if(res.data.resultCode=='100005'){
                  this.$message({ type: "error", message: "登录超时，请重新登录！" });
                  setTimeout(()=>{
                  that.$router.push({path:'/'});
                  },3000);
                }
                if(res.data.resultCode=='000000'){
                  this.$message({ type: "success", message: "删除成功" });
                }else{
                  this.$message({ type: "error", message: res.data.resultMsg });
                }
              })
            })
            .catch(() => {
              return false;
            });
    },
    NodeAdd(n, d) {
      let _this = this;
      _this.isAdd = 1;
      this.menuAction = "添加子菜单";
      //新增节点
      console.log(n, d);
      //判断层级
      if (n.level >= 3) {
        this.$message.error("最多只支持三级！");
        return false;
      }
      this.isOpen = true;
      this.inForm = {
        menuId: "",
        name: "",
        path: "",
        menuCode: "",
        parentId: "",
        position: 10,
        status: "",
        test: "",
        extraFlag: ""
      };

      this.$nextTick(() => {
        _this.$refs["inForm"].clearValidate();
      });
      let nodeData = JSON.parse(JSON.stringify(d));
      console.log(nodeData);
      this.inForm.parentId = nodeData.menuId;
      this.inForm.parentName = nodeData.name;
      this.parentDisabled = true;

      //   //新增数据
      //   d.children.push({
      //     menuId: ++this.maxexpandId,
      //     name: "新增节点",
      //     pid: d.menuId,
      //     children: []
      //   });
      //   //同时展开节点
      //   if (!n.expanded) {
      //     n.expanded = true;
      //   }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.inForm;
          let subData = {
            parentName: data.parentName,
            parentId: data.parentId,
            name:data.name,
            url: data.path,
            menuCode: data.menuCode,
            position: data.position,
            status: parseInt(data.status),
            systemMenu: parseInt(data.test),
            // method: "save"
          };
          // console.log(subData);
          if (this.isAdd) {
            //新增
            // subData.method = "save";
            // this.$axios({
            //   method: "post",
            //   url: `${this.$store.state.globalRouter}/auth/system/menu/save`,
            //   data: subData
            // })
            //   .then(res => {
            //     if (res.data.resultCode == "000000") {
            //       this.$message({ type: "success", message: "新增菜单成功！" });
            //       this.isOpen = false;
            //       this.getMenu();
            //     }
            //   })
            //   .catch(error => {
            //     this.$message({ type: "error", message: error });
            //   });
          } else {
            subData.menuId = data.menuId;
            // subData.method = "update";
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/system/menu/update`,
              data: subData
            })
              .then(res => {
                if (res.data.resultCode == "000000") {
                  if(res.data.data==1){
                    this.$message({ type: "success", message: "修改菜单成功！" });
                    this.getMenu();
                  }
                  if(res.data.data==null){
                    this.$message({ type: "warning", message: "只有叶子节点才能修改名字！" });
                  }
                  this.isOpen = false;
                  // this.getMenu();
                  // this.$router.push({path:'/'});
                }else if(res.data.resultCode == "100005"){
                  this.$router.push({path:'/'});
                }else{
                  this.$message.warning(res.data.resultMsg);
                }
              })
              .catch(error => {
                this.$message({ type: "error", message: error });
              });
          }
        } else {
          this.$message({ type: "error", message: "信息输入不准确" });
        }
      });
    },
    cancle(formName) {
      this.$refs[formName].clearValidate();
      this.isOpen = false;
    },
    getMenu() {
      this.$axios({
        method:'get',
        url:`${this.$store.state.globalRouter}/auth/system/menu/list`
      }).then(res=>{
          this.menuTransform(res.data.data.menuList);
      }).catch(error=>{
        this.$message({type:'error',message:error})
      });
      // console.log(JSON.parse(localStorage.getItem("router")));
      // this.setTree=JSON.parse(localStorage.getItem("router"));
    },
    menuTransform(list){
      let menu=[]
      for(let i=0;i<list.length;i++){
        if(list[i].parentId==1){
          menu.push(list[i]);
        }
      }
      for(let i=0;i<menu.length;i++){
        for(let j=0;j<list.length;j++){
          if(list[j].parentId==menu[i].menuId){
            menu[i].children.push(list[j]);
          }
        }
      }
      this.setTree=menu;
      global.antRouter=menu;
      this.reload();
      localStorage.setItem("router",JSON.stringify(menu));
    }
  },
  mounted() {
    // this.getMenu();
    this.setTree=JSON.parse(localStorage.getItem("router"))
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
};
</script>

<style>
.slot-tree {
  width: 80%;
  height: 80%;
  margin: 0 auto;
  padding: 1em;
  /* max-width: 600px; */
  overflow-y: auto;
}
/*顶部按钮*/
.slot-tree .slot-t-top {
  margin-bottom: 15px;
}
.slot-tree .slot-t-node span {
  display: inline-block;
}
/*节点*/
/* .slot-tree .slot-t-node--label {
  font-weight: 600;
} */
/*输入框*/
.slot-tree .slot-t-input .el-input__inner {
  height: 26px;
  line-height: 26px;
}
/*按钮列表*/
.slot-tree .slot-t-node .slot-t-icons {
  display: none;
  margin-left: 10px;
}
.slot-tree .slot-t-icons .el-button + .el-button {
  margin-left: 6px;
}
.slot-tree .el-tree-node__content:hover .slot-t-icons {
  display: inline-block;
}
.slot-tree {
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.menuBox {
  float: left;
  height: 100%;
  width: 40%;
}
.rightBox {
  float: right;
  height: 100%;
  width: 60%;
}
.inFrom {
  width: 100%;
}
.menuActionTitle {
  margin-top: 30px;
  height: 30px;
  line-height: 30px;
}
.form_container {
  padding: 0 50px;
  text-align: center;
}
.inForm_body {
  background: #ffffff;
  width: 60%;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid #eee;
}
</style>