<template>
  <div style="padding:20px;height:100%;">
    <div style="background:#fff;padding:5px;height:95%;overflow:auto">
      <div el-row style="padding:10px;text-align: left;">
        <div el-col span="24" class="top">
          <el-button type="primary" size="small" @click.native="add" icon="el-icon-plus">新增</el-button>
          <el-button type="primary" size="small" @click.native="copyData" icon="el-icon-plus">拷贝</el-button>
          <el-button type="primary" size="small" @click.native="update" icon="el-icon-edit">修改</el-button>
          <el-button type="primary" size="small" @click.native="remove" icon="el-icon-delete">删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div el-row style="padding:10px;text-align: left;">
        <div el-col span="24" class="top">
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            size="mini"
            style="text-align:left;"
          >
            <el-form-item label="问题类别:">
              <el-select v-model="searchForm.type" clearable placeholder="请选择">
                <el-option label="全部" value></el-option>
                <el-option label="基本项目" value="1"></el-option>
                <el-option label="老人整体情况" value="2"></el-option>
                <el-option label="补充事项" value="3"></el-option>
                <el-option label="疾病诊断" value="4"></el-option>
                <el-option label="基本生活活动能力评定" value="5"></el-option>
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
              <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetSearch" incon="el-icon-refresh">重置</el-button>
            </el-form-item>
          </el-form>

          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div style="padding:5px;height:80%">
      <el-table
        :data="datalists"
        border
        stripe
        style="width: 100%;text-align:left;overflow:auto "
        @selection-change="handleSelectionChange"
        :cell-style="cellStyle"
        @cell-mouse-enter="mouseEnter"
        @cell-mouse-leave="mouseLeave"
        height="100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="questionType" label="问题类别" width="150"></el-table-column>
        <el-table-column prop="sortNumber" label="序号" width="100"></el-table-column>
        <el-table-column prop="title" label="一级标题" width="300"></el-table-column>
        <el-table-column prop="secondTitle" label="二级标题" width="200"></el-table-column>
        <el-table-column prop="thirdTitle" label="三级标题" width="200"></el-table-column>
        <el-table-column prop="optionType" label="选择类型" width="100"></el-table-column>
        <el-table-column prop="optionText" label="选项内容" >
          <template slot-scope="scope">
            <p
              v-if="scope.row.optionText"
              :id="scope.row.id"
              data-toggle="popover"
              data-placement="left"
              data-container="body"
            >{{scope.row.optionText.substring(0,15)+'......'}}</p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column prop="needPhoto" label="是否需要拍照" width="180"></el-table-column>
      </el-table>
      </div>
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
          <el-form-item label="问题类别" prop="questionType" style="text-align:left;">
            <el-col style="width:100%;">
              <el-radio-group v-model="ruleForm.questionType">
                <el-radio :label="1">基本项目</el-radio>
                <el-radio :label="2">老人整体情况</el-radio>
                <el-radio :label="3">补充事项</el-radio>
                <el-radio :label="4">疾病诊断</el-radio>
                <el-radio :label="5">基本生活活动能力评定</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="序号" prop="sortNumber">
            <el-col :span="20">
              <el-input
                type="sortNumber"
                v-model.number="ruleForm.sortNumber"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="一级标题" prop="title">
            <el-col :span="20">
              <el-input v-model.number="ruleForm.title" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="二级标题" prop="secondTitle">
            <el-col :span="20">
              <el-input v-model.number="ruleForm.secondTitle" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="三级标题" prop="thirdTitle">
            <el-col :span="20">
              <el-input v-model.number="ruleForm.thirdTitle" auto-complete="off" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="选项类别" prop="optionType" style="text-align:left;">
            <el-col>
              <el-radio-group v-model="ruleForm.optionType" v-if="isAdd!=2">
                <el-radio :label="1">单选</el-radio>
                <el-radio :label="2">多选</el-radio>
                <el-radio :label="3">其它</el-radio>
              </el-radio-group>
              <el-radio-group v-model="ruleForm.optionType" v-else disabled>
                <el-radio :label="1">单选</el-radio>
                <el-radio :label="2">多选</el-radio>
                <el-radio :label="3">其它</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="备注:" prop="optionText" style="text-align:left;">
            <el-col :span="20">
              <el-input type="textarea" v-model="ruleForm.optionText" clearable></el-input>
            </el-col>
            <el-col>
              <div style="color:#FF0000">（每个选项之间用"|"分开）</div>
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
    return {
      //分页data
      currentPage: 1,
      pageSize: [10, 20, 30, 50],
      total: 0,
      changePageSize: 10,

      //列表相关
      datalists: [],

      // 搜索相关
      searchForm: {
        type: "",
        title1: "",
        title2: "",
        title3: ""
      },

      updateData2: [],

      // 添加或者修改相关
      dialogVisible: false,
      proptype: "评估管理问题新增",
      ruleForm: {
        questionType: "",
        optionType: "",
        sortNumber: "",
        optionText: "",
        title: "",
        secondTitle: "",
        thirdTitle: "",
        needPhoto: ""
      },
      rules: {
        // questionType: [
        //   { required: true, message: "请选择问题类别", trigger: "change" }
        // ],
        // sortNumber: [
        //   { required: true, message: "请输入评估调查表排序编号" },
        //   { type: "number", message: "排序编号必须为数字值" }
        // ],
        // title     : [{ required: true, message: "请输入一级标题" }],
        // optionType: [
        //   { required: true, message: "请选择评估调查表类别", trigger: "change" }
        // ],
        // needPhoto: [{ required: true, message: "请选择", trigger: "change" }]
      },
      isAdd: 1
    };
  },
  methods: {
    cellStyle(row, column, rowIndex, columnIndex) {
      if (row.columnIndex == 8) {
        return "color:#337ab7;cursor:pointer";
      } else {
        return "";
      }
    },
    mouseEnter(row, column, cell, event) {
      if (column.label == "选项内容") {
        // console.log($('#'+row.id));
        // console.log(row.optionText.split('|'))
        var dataTip = row.optionText;
        var inputStautUi = "<ul class='list-group'>";
        var inputEndUi = "</ul>";
        var inputStartLi =
          "<li class='list-group-item' style='text-align:left;color:black'  width='100%' >";
        var inputEndLi = "</li>";
        var viewTooltip = "";
        var dataSplit = dataTip.split("|");
        for (var i = 0; i < dataSplit.length; i++) {
          viewTooltip +=
            inputStartLi + (i + 1) + ":" + dataSplit[i] + inputEndLi;
        }
        viewTooltip = inputStautUi + viewTooltip + inputEndUi;
        // console.log(viewTooltip)
        // $("#tip_"+fullId).tooltip({html : true, title:viewTooltip}).tooltip('show');
        // $('#'+row.id).html('11');
        // setTimeout(()=>{
        $("#" + row.id)
          .popover({
            html: true,
            title: "选项内容",
            content: inputStautUi + viewTooltip + inputEndUi
          })
          .popover();
        $("#" + row.id).popover("show");
        // console.log('667')
        // },100)
      }
    },
    mouseLeave(row, column, cell, event) {
      if (column.label == "选项内容") {
        // $("#"+row.id).popover({html:true,title:"",content:''}).popover();
        // $("#"+row.id).popover('hide');
        $("#" + row.id).popover("destroy");
      }
    },
    search() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/core/assess_question_mng/pagination?title=${
          encodeURI(this.searchForm.title1)
        }&secondTitle=${encodeURI(this.searchForm.title2)}&thirdTitle=${
          encodeURI(this.searchForm.title3)
        }&
questionType=${encodeURI(this.searchForm.type)}`,
        method: "get"
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    resetSearch() {
      this.searchForm = {
        type: "",
        title1: "",
        title2: "",
        title3: ""
      };
    },
    add() {
      this.dialogVisible = true;
      this.proptype = "评估问题管理新增";
      this.ruleForm = {
        questionType: "",
        optionType: "",
        sortNumber: "",
        optionText: "",
        title: "",
        secondTitle: "",
        thirdTitle: "",
        needPhoto: ""
      };
      this.isAdd = 1;
    },
    cancle() {
      this.dialogVisible = false;
    },
    copyData() {
      let _this = this;
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        let data = JSON.parse(JSON.stringify(this.updateData2[0]));
        data.needPhoto = data.needPhoto == "需要" ? 1 : 0;
        if (data.optionType == "单选") {
          data.optionType = 1;
        }
        if (data.optionType == "多选") {
          data.optionType = 2;
        }
        if (data.optionType == "其它") {
          data.optionType = 3;
        }
        if (data.questionType == "基本项目") {
          data.questionType = 1;
        }
        if (data.questionType == "老人整体情况") {
          data.questionType = 2;
        }
        if (data.questionType == "补充事项") {
          data.questionType = 3;
        }
        if (data.questionType == "疾病诊断") {
          data.questionType = 4;
        }
        if (data.questionType == "基本生活活动能力评定") {
          data.questionType = 5;
        }
        this.proptype = "评估管理问题拷贝新增";
        this.isAdd = 3;
        this.dialogVisible = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
      }
    },
    update() {
      let _this = this;
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        let data = JSON.parse(JSON.stringify(this.updateData2[0]));
        data.needPhoto = data.needPhoto == "需要" ? 1 : 0;
        if (data.optionType == "单选") {
          data.optionType = 1;
        }
        if (data.optionType == "多选") {
          data.optionType = 2;
        }
        if (data.optionType == "其它") {
          data.optionType = 3;
        }
        if (data.questionType == "基本项目") {
          data.questionType = 1;
        }
        if (data.questionType == "老人整体情况") {
          data.questionType = 2;
        }
        if (data.questionType == "补充事项") {
          data.questionType = 3;
        }
        if (data.questionType == "疾病诊断") {
          data.questionType = 4;
        }
        if (data.questionType == "基本生活活动能力评定") {
          data.questionType = 5;
        }
        this.proptype = "评估管理问题修改";
        this.isAdd = 2;
        this.dialogVisible = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let data = JSON.parse(JSON.stringify(this.ruleForm));

          if (this.isAdd == 1) {
            // console.log(data)
            this.$axios({
              method: "post",
              url: `${
                this.$store.state.globalRouter
              }/core/assess_question_mng/save`,
              data: {
                questionType: this.ruleForm.questionType,
                sortNumber: this.ruleForm.sortNumber,
                title: this.ruleForm.title,
                secondTitle: this.ruleForm.secondTitle,
                thirdTitle: this.ruleForm.thirdTitle,
                optionType: this.ruleForm.optionType,
                optionText: this.ruleForm.optionText,
                needPhoto: this.ruleForm.needPhoto
              }
            }).then(res => {
              if (res.data.data) {
                this.dialogVisible = false;
                this.getReloadData(this);
                this.$message("新增成功");
              }
            });
          } else if (this.isAdd == 2) {
            let newData = {
              needPhoto: this.ruleForm.needPhoto,
              optionText: this.ruleForm.optionText,
              optionType: this.ruleForm.optionType,
              questionType: this.ruleForm.questionType,
              secondTitle: this.ruleForm.secondTitle,
              sortNumber: this.ruleForm.sortNumber,
              thirdTitle: this.ruleForm.thirdTitle,
              title: this.ruleForm.title
            };

            this.$axios({
              method: "post",
              url: `${
                this.$store.state.globalRouter
              }/core/assess_question_mng/update?id=${encodeURI(this.updateData2[0].id)}`,
              data: newData
            }).then(res => {
              if (res.data.data) {
                this.dialogVisible = false;
                this.getReloadData(this);
                this.$message("修改成功");
              } else {
                this.$message("修改失败，服务出错");
              }
            });
          } else if (this.isAdd == 3) {
            this.$axios({
              method: "post",
              url: `${
                this.$store.state.globalRouter
              }/core/assess_question_mng/save`,
              data: {
                questionType: this.ruleForm.questionType,
                sortNumber: this.ruleForm.sortNumber,
                title: this.ruleForm.title,
                secondTitle: this.ruleForm.secondTitle,
                thirdTitle: this.ruleForm.thirdTitle,
                optionType: this.ruleForm.optionType,
                optionText: this.ruleForm.optionText,
                needPhoto: this.ruleForm.needPhoto
              }
            }).then(res => {
              if (res.data.data) {
                this.dialogVisible = false;
                this.getReloadData(this);
                this.$message("拷贝成功");
              }
            });
          }
        } else {
          this.$message("erro submit");
          return false;
        }
      });
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
                "/core/assess_question_mng/remove?id=" +
                encodeURI(this.updateData2[0].id),
              method: "get"
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.$options.methods.getReloadData(this);
              } else {
                alert("删除失败：" + res.data.resultMsg);
              }
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
      // this.datalists = tableData;
      var newdata = [];
      var newdata1 = [];
      var newdata2 = [];
      var newdata3 = [];
      var dataArray = tableData;

      dataArray.forEach(el => {
        if (el.questionType) {
          if (el.questionType == 1 || el.questionType == "1") {
            newdata.push("基本项目");
          }
          if (el.questionType == 2 || el.questionType == "2") {
            newdata.push("老人整体情况");
          }
          if (el.questionType == 3 || el.questionType == "3") {
            newdata.push("补充事项");
          }
          if (el.questionType == 4 || el.questionType == "4") {
            newdata.push("疾病诊断");
          }
          if (el.questionType == 5 || el.questionType == "5") {
            newdata.push("基本生活活动能力评定");
          }
        }
        if (el.optionType) {
          if (el.optionType == 1 || el.optionType == "1") {
            newdata1.push("单选");
          } else if (el.optionType == 2 || el.optionType == "2") {
            newdata1.push("多选");
          } else {
            newdata1.push("其它");
          }
        }
        if (el.needPhoto == 0 || el.needPhoto == "0") {
          newdata2.push("不需要");
        } else {
          newdata2.push("需要");
        }
        //  if(el.optionText && el.optionText.length>=1){
        //     newdata3.push(el.optionText.substring(0,15)+"......");
        //   }else{
        //     newdata3.push("");
        // }
      });

      this.transform(dataArray, newdata);
      this.transform1(dataArray, newdata1);
      this.transform2(dataArray, newdata2);
      // this.transform3(dataArray, newdata3);
      this.datalists = dataArray;
    },
    transform(old, insert) {
      old.forEach((el, index) => {
        el.questionType = insert[index];
      });
    },
    transform1(old, insert) {
      old.forEach((el, index) => {
        el.optionType = insert[index];
      });
    },
    transform2(old, insert) {
      old.forEach((el, index) => {
        el.needPhoto = insert[index];
      });
    },
    transform3(old, insert) {
      old.forEach((el, index) => {
        el.optionText = insert[index];
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
        }/core/assess_question_mng/pagination?title=${
          encodeURI(this.searchForm.title1)
        }&secondTitle=${encodeURI(this.searchForm.title2)}&thirdTitle=${
          encodeURI(this.searchForm.title3)
        }&
questionType=${encodeURI(this.searchForm.type)}&pageSize=${
          this.changePageSize
        }&pageNo=${val}`,
        method: "get"
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
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
    getReloadData(that) {
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/core/assess_question_mng/pagination?title=${
            encodeURI(that.searchForm.title1)
          }&secondTitle=${encodeURI(that.searchForm.title2)}&thirdTitle=${
            encodeURI(that.searchForm.title3)
          }&
questionType=${encodeURI(that.searchForm.type)}&pageSize=${that.changePageSize}&pageNo=${
            that.currentPage
          }`,
          method: "get"
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
      url: `${
        this.$store.state.globalRouter
      }/core/assess_question_mng/pagination`,
      method: "get"
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

/* 题目内容详情展示 */
.popover {
  max-width: 600px !important;
  top: 0px !important;
}
</style>
