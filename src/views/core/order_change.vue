<template>
  <div style="padding:20px;height:100%;">
    <div style="background:#fff;padding:5px;height:95%;overflow:auto">
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
            <el-form-item label="被指派评估师:">
              <el-input
                v-model.trim = "searchForm.assessPeople"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="更新者:">
              <el-input
                v-model.trim = "searchForm.updatePeople"
                clearable
              ></el-input>
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
          prop  = "orderNo"
          label = "工单编号"
        ></el-table-column>
        <el-table-column
          prop  = "orderOldStatus"
          label = "原工单状态"
        >
        <template slot-scope="scope">
            <p v-if='scope.row.orderOldStatus==0 || scope.row.orderOldStatus=="0"'>
              待分配
            </p>
            <p v-else-if='scope.row.orderOldStatus==1 || scope.row.orderOldStatus=="1"'>
              已完成（复审通过）
            </p>
            <p v-else-if='scope.row.orderOldStatus==2 || scope.row.orderOldStatus=="2"'>
              待接单
            </p>
            <p v-else-if='scope.row.orderOldStatus==3 || scope.row.orderOldStatus=="3"'>
              待评估
            </p>
            <p v-else-if='scope.row.orderOldStatus==4 || scope.row.orderOldStatus=="4"'>
              正在评估
            </p>
            <p v-else-if='scope.row.orderOldStatus==5 || scope.row.orderOldStatus=="5"'>
              已评估
            </p>
            <p v-else-if='scope.row.orderOldStatus==6 || scope.row.orderOldStatus=="6"'>
              已评定等级
            </p>
            <p v-else-if='scope.row.orderOldStatus==7 || scope.row.orderOldStatus=="7"'>
              复审不通过
            </p>
            <p v-else-if='scope.row.orderOldStatus==8 || scope.row.orderOldStatus=="8"'>
              待指派
            </p>
            <p v-else-if='scope.row.orderOldStatus==-1 || scope.row.orderOldStatus=="-1"'>
              参保人取消
            </p>
            <p v-else-if='scope.row.orderOldStatus==-2 || scope.row.orderOldStatus=="-2"'>
              拒接单
            </p>
            <p v-else-if='scope.row.orderOldStatus==-3 || scope.row.orderOldStatus=="-3"'>
              系统取消
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "orderNewStatus"
          label = "新工单状态"

        >
         <template slot-scope="scope">
            <p v-if='scope.row.orderNewStatus==0 || scope.row.orderNewStatus=="0"'>
              待分配
            </p>
            <p v-else-if='scope.row.orderNewStatus==1 || scope.row.orderNewStatus=="1"'>
              已完成（复审通过）
            </p>
            <p v-else-if='scope.row.orderNewStatus==2 || scope.row.orderNewStatus=="2"'>
              待接单
            </p>
            <p v-else-if='scope.row.orderNewStatus==3 || scope.row.orderNewStatus=="3"'>
              待评估
            </p>
            <p v-else-if='scope.row.orderNewStatus==4 || scope.row.orderNewStatus=="4"'>
              正在评估
            </p>
            <p v-else-if='scope.row.orderNewStatus==5 || scope.row.orderNewStatus=="5"'>
              已评估
            </p>
            <p v-else-if='scope.row.orderNewStatus==6 || scope.row.orderNewStatus=="6"'>
              已评定等级
            </p>
            <p v-else-if='scope.row.orderNewStatus==7 || scope.row.orderNewStatus=="7"'>
              复审不通过
            </p>
            <p v-else-if='scope.row.orderNewStatus==8 || scope.row.orderNewStatus=="8"'>
              待指派
            </p>
            <p v-else-if='scope.row.orderNewStatus==-1 || scope.row.orderNewStatus=="-1"'>
              参保人取消
            </p>
            <p v-else-if='scope.row.orderNewStatus==-2 || scope.row.orderNewStatus=="-2"'>
              拒接单
            </p>
            <p v-else-if='scope.row.orderNewStatus==-3 || scope.row.orderNewStatus=="-3"'>
              系统取消
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop  = "basicInfoTime"
          label = "回答基本信息时间"
          width = "180"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.basicInfoTime'>
              {{scope.row.basicInfoTime}}
            </p>
            <p v-else></p>
          </template>
        </el-table-column> -->
        <el-table-column
          prop  = "updatedTime"
          label = "更新日期"

        >
         <template slot-scope="scope">
            <p v-if='scope.row.updatedTime'>
              {{$moment(scope.row.updatedTime).format('YYYY-MM-DD h:mm:ss')}}
            </p>
            <p v-else></p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "assessUserName"
          label = "被指派评估师"

        >
         <template slot-scope="scope">
            <p v-if='scope.row.assessUserName==null || scope.row.isQuestionBaseCompleted==""'>
              -
            </p>
            <p v-else>
                {{scope.row.assessUserName}}
            </p>
          </template>
        </el-table-column>

        <el-table-column
          prop  = "updatedUserName"
          label = "更新者"

        ></el-table-column>
        <el-table-column
          prop  = "changeComment"
          label = "变更说明"
          width="200"
        ></el-table-column>
      </el-table> 
       </div>   
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
        assessPeople: '',
        updatePeople: ''
      },


    };
  },
  methods: {
    search() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/core/app_log_mng/pagination?assessUserName=${
          encodeURI(this.searchForm.assessPeople)
        }&updatedUserName=${
          encodeURI(this.searchForm.updatePeople)
        }`,
        method: "get"
      }).then(res => {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    resetSearch() {
      this.searchForm = {
        assessPeople: '',
        updatePeople: ''
      };
    },

    dataList(tableData) {
      this.datalists = tableData;
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
        }/auth/core/app_log_mng/pagination?pageSize=${
          this.changePageSize
        }&pageNo=${val}&assessUserName=${
          encodeURI(this.searchForm.assessPeople)
        }&updatedUserName=${
          encodeURI(this.searchForm.updatePeople)
        }`,
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
          }/auth/core/app_log_mng/pagination?pageSize=${
            that.changePageSize
          }&pageNo=${that.currentPage}&assessUserName=${
          encodeURI(that.searchForm.assessPeople)
        }&updatedUserName=${
          encodeURI(that.searchForm.updatePeople)
        }`,
          method: "get"
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
      // that.reload();
    }
  },
  mounted() {
    // this.getData();
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/core/app_log_mng/pagination`,
      method: "get"
    }).then(res => {
      if(res.data.resultCode=='100005'){
this.$router.push({ path: "/" });
}else{
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
