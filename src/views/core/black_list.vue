<template>
  <div style="padding:20px;height:100%;">
    <div style="height:95%;background:#fff;padding:5px;overflow:auto">
      <div el-row style = "padding:10px;text-align: left;">
        <div
          el-col
          span  = "24"
          class = "top"
        >
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
      <div
        el-row
        style = "padding:10px;text-align: left;"
      >
        <div
          el-col
          span  = "24"
          class = "top"
        >
          <el-form
            :inline = "true"
            :model  = "searchForm"
              class = "demo-form-inline"
              size  = "mini"
              style = "text-align:left;"
          >

            <el-form-item label="姓名:">
              <el-input
                v-model = "searchForm.fullName"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="证件号码:">
              <el-input
                v-model = "searchForm.idCard"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="黑名单状态:">
              <el-select
                v-model     = "searchForm.type"
                placeholder = "请选择"
                style       = "width:150px"
                size        = 'mini'
                clearable
              >
                <el-option value  = "1" label  = "正常"></el-option>
                <el-option value  = "2" label  = "暂停"></el-option>
                <el-option value  = "3" label  = "终止"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type   = "primary"
                @click = "search"
                icon="el-icon-search"
              >查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type   = "primary"
                @click = "resetSearch"
                icon="el-icon-refresh"
              >重置</el-button>
            </el-form-item>
          </el-form>

          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div style="padding:5px;height:80%">
      <el-table
        :data = "datalists"
        border
        stripe
        style             = "width: 100%;text-align:left; "
        @selection-change = "handleSelectionChange"
        height="100%"
      >
        <el-table-column
          type  = "selection"
          width = "55"
        ></el-table-column>
        <el-table-column
          prop  = "id"
          label = "序号"
        ></el-table-column>
        <el-table-column
          prop  = "fullName"
          label = "姓名"
        ></el-table-column>
        <el-table-column
          prop  = "idCard"
          label = "证件号码"
          width='200'
        ></el-table-column>
        <el-table-column
          prop  = "dateOfBirth"
          label = "出生日期"
        ></el-table-column>
        <el-table-column
          prop  = "sex"
          label = "性别"
        >
        <template slot-scope="scope">
            <p v-if='scope.row.sex=="M"'>
             男
            </p>
            <p v-else-if='scope.row.sex=="F"'>
             女
            </p>
            <p v-else>{{scope.row.sex}}</p>

          </template>
        </el-table-column>
        <el-table-column
          prop  = "medicareNumber"
          label = "医保号"
          width='200'
        ></el-table-column>
        <el-table-column
          prop  = "type"
          label = "黑名单状态"
        >
         <template slot-scope="scope">
            <p v-if='scope.row.type==1 || scope.row.type=="1"'>
             正常
            </p>
            <p v-else-if='scope.row.type==2 || scope.row.type=="2"'>
             暂停
            </p>
            <p v-else-if='scope.row.type==3 || scope.row.type=="3"'>
             终止
            </p>
            <p v-else>{{scope.row.type}}</p>

          </template>
        </el-table-column>
        <el-table-column
          prop  = "effectiveDate"
          label = "生效日期"
        ></el-table-column>
        <el-table-column
          prop  = "expiryDate"
          label = "失效日期"
        ></el-table-column>
        <el-table-column
          prop  = "updateTime"
          label = "更新时间"
          width='200'
        >
         <template slot-scope="scope">
            <p v-if='scope.row.updateTime'>
             <!-- {{$moment().format('YYYY-MM-DD HH:mm:ss')}} -->
             {{scope.row.updateTime}}
            </p>

          </template>
        </el-table-column>

      </el-table>
      </div>
      <el-dialog
        :title        = "proptype"
        :visible.sync = "dialogVisible"
          width       = "800px"
        center
        :before-close = "handleClose"
      >
        <el-form
          :model        = "ruleForm"
          :rules        = "rules"
            ref         = "ruleForm"
            label-width = "200px"
            class       = "demo-ruleForm"
            style       = "overflow:auto;"
        >
          <el-form-item
            label = "姓名"
            prop  = "fullName"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.fullName"
                auto-complete="off"
                placeholder  = "请填写中文名字"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "证件号码"
            prop  = "idCard"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.idCard"
                auto-complete="off"
                placeholder  = "请填写18位身份证号"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "出生日期"
            prop  = "dateOfBirth"
          >
            <el-col :span="20">
              <el-date-picker
                v-model     = "ruleForm.dateOfBirth"
                align       = "right"
                type        = "date"
                style="width:100%;"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item
            label = "性别"
            prop  = "sex"
          >
            <el-col :span="20" style="text-align:left;">
              <el-radio v-model="ruleForm.sex" label="M">男</el-radio>
              <el-radio v-model="ruleForm.sex" label="F">女</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "医保号"
            prop  = "medicareNumber"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.medicareNumber"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "黑名单状态"
            prop  = "type"
          >
            <el-col :span="20">
               <el-select
                v-model     = "ruleForm.type"
                placeholder = "请选择"
                style       = "width:100%"
                size        = 'mini'
                clearable
              >
                <el-option value  = "1" label  = "正常"></el-option>
                <el-option value  = "2" label  = "暂停"></el-option>
                <el-option value  = "3" label  = "终止"></el-option>
              </el-select>

            </el-col>
          </el-form-item>

          <el-form-item
            label = "生效日期"
            prop  = "effectiveDate"
          >
            <el-col :span="20">
               <el-date-picker
                v-model     = "ruleForm.effectiveDate"
                align       = "right"
                type        = "date"
                style="width:100%;"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item
            label = "失效日期"
            prop  = "expiryDate"
          >
            <el-col :span="20">
              <el-date-picker
              style="width:100%;"
                v-model      = "ruleForm.expiryDate"
                type         = "datetime"
                default-time = "12:00:00">
              </el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <span
          slot  = "footer"
          class = "dialog-footer"
        >
          <el-button
            type   = "primary"
            @click = "submitForm('ruleForm')"
            size   = "mini"
          >提交</el-button>
          <el-button
            @click = "cancle"
            size   = "mini"
          >取 消</el-button>
        </span>
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
import base from "../../base/base.js";
import Vue from "vue";
export default {
  mixins: [base],
  data() {
    return {
      //分页data
      currentPage   : 1,
      pageSize      : [10, 20, 30, 50],
      total         : 0,
      changePageSize: 10,

      //列表相关
      datalists: [],

      // 搜索相关
      searchForm: {
        fullName: "",
        idCard  : "",
        type    : "",
      },

      updateData2: [],

       // 添加或者修改相关
      dialogVisible: false,
      proptype     : "参保人黑名单新增",
      ruleForm     : {
       fullName      : null,
       idCard        : null,
       dateOfBirth   : null,
       sex           : null,
       medicareNumber: null,
       type          : null,
       effectiveDate : null,
       expiryDate    : null,
      },
      rules: {
        fullName: [
          { required: true, message: "姓名必填", trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "证件号码必填",trigger:'blur' },
        ],
        dateOfBirth: [
          { required: true, message: "出生日期必填",trigger:'blur' },
        ],
        medicareNumber: [
          { required: true, message: "医保号必填",trigger:'blur' },
        ],
        type: [
          { required: true, message: "黑名单状态必选",trigger:'change' },
        ],
        effectiveDate: [
          { required: true, message: "生效日期必填",trigger:'blur' },
        ],
        expiryDate: [
          { required: true, message: "失效日期必填",trigger:'blur' },
        ],

      },
      isAdd: 1

    };
  },
  methods: {
    add() {
      this.dialogVisible = true;
      this.proptype      = "参保人黑名单新增";
      this.isAdd         = 1;
      this.ruleForm      = {
       fullName      : null,
       idCard        : null,
       dateOfBirth   : null,
       sex           : null,
       medicareNumber: null,
       type          : null,
       effectiveDate : null,
       expiryDate    : null,
      };

    },
    update() {
      let _this = this;
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {

        // console.log(this.updateData2[0])

        // let data = JSON.parse(JSON.stringify(this.updateData2[0]));
          this.$axios({
              method: "get",
              url   : `${
                this.$store.state.globalRouter
              }/auth/assess/assess_black_list/load_for_edit?id=${encodeURI(this.updateData2[0].id)}`,
            }).then(res => {

              if (res.data.resultCode=='000000') {
        let data               = JSON.parse(JSON.stringify(res.data.data));
            this.proptype      = "参保人黑名单修改";
            this.isAdd         = 2;
            this.dialogVisible = true;
            this.ruleForm      = JSON.parse(JSON.stringify(data));
            if(data.type==1 || data.type=='1'){
              this.ruleForm.type = '1'
            }else if(data.type==2 || data.type=='2'){
              this.ruleForm.type = '2'
            }else if(data.type==3 || data.type=='3'){
              this.ruleForm.type = '3'
            }

              }else{
                // this.dialogVisible = false;
                // alert('添加失败：'+res.data.resultMsg);
              }
            });



        }
      },
     cancle() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.ruleForm)
        //   // let data = JSON.parse(JSON.stringify(this.ruleForm));

          if (this.isAdd == 1) {
            this.ruleForm.dateOfBirth   = this.$moment(this.ruleForm.dateOfBirth).format('YYYY-MM-DD');
            this.ruleForm.effectiveDate = this.$moment(this.ruleForm.effectiveDate).format('YYYY-MM-DD');
            this.ruleForm.expiryDate    = this.$moment(this.ruleForm.expiryDate).format('YYYY-MM-DD HH:mm:ss');
            this.ruleForm.id            = null;
            this.$axios({
              method: "post",
              url   : `${
                this.$store.state.globalRouter
              }/auth/assess/assess_black_list/save`,
              data: this.ruleForm,
              // emulateJSON: true,
              // contentType: 'application/json;charset=UTF-8'
            }).then(res => {

              if (res.data.resultCode=='000000') {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                alert('新增成功')
              }else{
                this.dialogVisible = false;
                alert('添加失败：'+res.data.resultMsg);
              }
            });
          } else if (this.isAdd == 2) {
                            this.ruleForm.dateOfBirth   = this.$moment(this.ruleForm.dateOfBirth).format('YYYY-MM-DD');
                            this.ruleForm.effectiveDate = this.$moment(this.ruleForm.effectiveDate).format('YYYY-MM-DD');
                            this.ruleForm.expiryDate    = this.$moment(this.ruleForm.expiryDate).format('YYYY-MM-DD HH:mm:ss');
                        let newData                     = this.ruleForm;

            this.$axios({
              method: "post",
              url   : `${
                this.$store.state.globalRouter
              }/auth/assess/assess_black_list/update?id=${encodeURI(this.updateData2[0].id)}`,
              data: newData
            }).then(res => {
              if (res.data.resultCode=='000000') {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                alert('修改成功')
              } else {
                this.dialogVisible = false;
                alert('修改失败'+res.data.resultMsg);
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
          cancelButtonText : "取消",
          type             : "warning",
          center           : true
        })
          .then(() => {
            // console.log(this.updateData2[0]);
            this.$axios({
              url:
                this.$store.state.globalRouter +
                "/auth/assess/assess_black_list/remove?id=" +
                encodeURI(this.updateData2[0].id),
              method: "get"
            }).then(res => {
              if (res.data.resultCode == "000000") {
                // this.$message({
                //   type   : "success",
                //   message: "删除成功"
                // });
                alert('删除成功');
                this.$options.methods.getReloadData(this);

              } else {
                alert("删除失败：" + res.data.resultMsg);
              }
            });
          })
          .catch(() => {
            this.$message({
              type   : "info",
              message: "取消删除"
            });
          });
      }
    },
    search() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/assess/assess_black_list/pagination?fullName=${encodeURI(this.searchForm.fullName)}&idCard=${encodeURI(this.searchForm.idCard)}&type=${encodeURI(this.searchForm.type)}`,
        method: "get"
      }).then(res => {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    resetSearch() {
      this.searchForm = {
        fullName: "",
        idCard  : "",
        type    : "",
      };
    },
    dataList(tableData) {
      if(tableData && tableData.length>=1){
        this.datalists = tableData;
      }else{
        this.datalists = tableData;
      }

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
        }/auth/assess/assess_black_list/pagination?pageSize=${this.changePageSize}&pageNo=${val}&fullName=${encodeURI(this.searchForm.fullName)}&idCard=${encodeURI(this.searchForm.idCard)}&type=${encodeURI(this.searchForm.type)}`,
        method: "get"
      }).then(res => {
        this.total       = res.data.totalCount;
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
          }/auth/assess/assess_black_list/pagination?pageSize=${that.changePageSize}&pageNo=${that.currentPage}&fullName=${encodeURI(that.searchForm.fullName)}&idCard=${encodeURI(that.searchForm.idCard)}&type=${encodeURI(that.searchForm.type)}`,
          method: "get"
        })
        .then(res => {
          if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
          } else {
            that.total       = res.data.totalCount;
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
      }/auth/assess/assess_black_list/pagination`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "100005") {
        this.$router.push({ path: "/" });
      } else {
        this.total       = res.data.totalCount;
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
  margin-top   : 3px;
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
  top      : 0px !important;
}
</style>

