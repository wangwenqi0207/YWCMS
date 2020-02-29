<template>
  <div style="padding:20px;height:100%;">
    <div
      class = "tableBox"
      style = "height:95%;background:#fff;padding:5px;overflow:auto">
      <div
        el-row
        style="padding:10px;text-align: left;"
      >
        <div
          el-col
          span="24"
          class="top"
        >
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            size="mini"
            style="text-align:left;"
          >
            <el-form-item label="年度:">
              <el-date-picker
                v-model="searchForm.selectYearAttendance"
                align="right"
                type="year"
                placeholder="选择年"
                format='yyyy'
                value-format='yyyy'
              >
              </el-date-picker>

            </el-form-item>
            <el-form-item label="月季度:">
              <el-select
                v-model="searchForm.selectSeasonAttendance"
                placeholder="请选择"
                style="width:150px"
                size='mini'
                clearable
              >

                <el-option
                  value="SEASON1"
                  label="一季度"
                ></el-option>
                <el-option
                  value="SEASON2"
                  label="二季度"
                ></el-option>
                <el-option
                  value="SEASON3"
                  label="三季度"
                ></el-option>
                <el-option
                  value="SEASON4"
                  label="四季度"
                ></el-option>
                <el-option
                  value="01"
                  label="一月"
                ></el-option>
                <el-option
                  value="02"
                  label="二月"
                ></el-option>
                <el-option
                  value="03"
                  label="三月"
                ></el-option>
                <el-option
                  value="04"
                  label="四月"
                ></el-option>
                <el-option
                  value="05"
                  label="五月"
                ></el-option>
                <el-option
                  value="06"
                  label="六月"
                ></el-option>
                <el-option
                  value="07"
                  label="七月"
                ></el-option>
                <el-option
                  value="08"
                  label="八月"
                ></el-option>
                <el-option
                  value="09"
                  label="九月"
                ></el-option>
                <el-option
                  value="10"
                  label="十月"
                ></el-option>
                <el-option
                  value="11"
                  label="十一月"
                ></el-option>
                <el-option
                  value="12"
                  label="十二月"
                ></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="评估机构:">
              <el-select
                v-model="searchForm.assessOrgId"
                placeholder="请选择"
                style="width:150px"
                size='mini'
                clearable
              >

                <el-option
                  v-for="(item,index) in communityData"
                  :value="item.orgId"
                  :key="index"
                  :label="item.orgName"
                ></el-option>

              </el-select>
            </el-form-item>

            <el-form-item label="工单状态:">
              <el-select
                v-model="searchForm.orderStatusAttendance"
                placeholder="请选择"
                style="width:150px"
                size='mini'
                clearable
              >
                <el-option
                  value="0"
                  label="未评估"
                ></el-option>
                <el-option
                  value="1"
                  label="正在评估"
                ></el-option>
                <el-option
                  value="2"
                  label="已评估"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出勤状态:">
              <el-select
                v-model="searchForm.attendanceStatus"
                placeholder="请选择"
                style="width:150px"
                size='mini'
                clearable
              >
                <el-option
                  value="0"
                  label="正常"
                ></el-option>
                <el-option
                  value="1"
                  label="异常"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="search"
                icon="el-icon-search"
              >查询</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button
                type   = "primary"
                @click = "resetSearch"
              >重置</el-button>
            </el-form-item> -->
          </el-form>

          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div style="padding:5px;height:80%">
      <el-table
        :data="datalists"
        border
        stripe
        style="width: 100%;text-align:left; "
        @selection-change="handleSelectionChange"
        height="100%"
      >

        <el-table-column
          prop="orderNo"
          label="工单编号"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="orderStatus"
          label="工单状态"
          width="160"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.orderStatus==0 || scope.row.orderStatus=="0" '>
              待分配
            </p>
            <p v-else-if='scope.row.orderStatus==1 || scope.row.orderStatus=="1" '>
              已完成(复审通过)
            </p>
            <p v-else-if='scope.row.orderStatus==2 || scope.row.orderStatus=="2" '>
              待接单
            </p>
            <p v-else-if='scope.row.orderStatus==3 || scope.row.orderStatus=="3" '>
              待评估
            </p>
            <p v-else-if='scope.row.orderStatus==4 || scope.row.orderStatus=="4" '>
              正在评估
            </p>
            <p v-else-if='scope.row.orderStatus==5 || scope.row.orderStatus=="5" '>
              已评估
            </p>
            <p v-else-if='scope.row.orderStatus==6 || scope.row.orderStatus=="6" '>
              已评定等级
            </p>
            <p v-else-if='scope.row.orderStatus==7 || scope.row.orderStatus=="7" '>
              复审不通过
            </p>
            <p v-else-if='scope.row.orderStatus==-1 || scope.row.orderStatus=="-1" '>
              参保人取消
            </p>
            <p v-else-if='scope.row.orderStatus==-2 || scope.row.orderStatus=="-2" '>
              拒接单
            </p>
            <p v-else-if='scope.row.orderStatus==-3 || scope.row.orderStatus=="-3" '>
              系统取消
            </p>
            <p v-else>
              {{scope.row.needAssistItem}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="isReAssess"
          label="工单类型"
          width="100"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.isReAssess==1 || scope.row.isReAssess=="1" '>
              复评
            </p>
            <p v-else-if='scope.row.isFollowAssess==1 || scope.row.isFollowAssess=="1" '>
              持续复评
            </p>
            <p v-else>
              初评
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="assessOrgName"
          label="评估机构"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="fullnameA"
          label="评估师A"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="fullnameB"
          label="评估师B"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="appointedAddress"
          label="预约评估地址"
          width="260"
        ></el-table-column>
        <el-table-column
          prop="attendanceTimeIn"
          label="签到时间"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="attendanceStatusIn"
          label="签到状态"
          width="120"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.attendanceStatusIn && (scope.row.attendanceStatusIn==1 || scope.row.attendanceStatusIn=="1") '>
              正常(范围内)
            </p>
            <p v-else-if='scope.row.attendanceStatusIn && (scope.row.attendanceStatusIn==2 || scope.row.attendanceStatusIn=="2") '>
              异常(范围外)
            </p>
            <p v-else>
              {{scope.row.attendanceStatusIn}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="attendanceTimeOut"
          label="签出时间"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="attendanceStatusOut"
          label="签出状态"
          width="120"
        >
          <template slot-scope="scope">
            <p v-if='scope.row.attendanceStatusOut && (scope.row.attendanceStatusOut==1 || scope.row.attendanceStatusOut=="1") '>
              正常(范围内)
            </p>
            <p v-else-if='scope.row.attendanceStatusOut && (scope.row.attendanceStatusOut==2 || scope.row.attendanceStatusOut=="2") '>
              异常(范围外)
            </p>
            <p v-else>
              {{scope.row.attendanceStatusOut}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="appleyUserName"
          label="参保人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="contactName"
          label="联系人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          width="130"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              @click="showDetail(scope.row.attendanceTimeIn)"
              size='mini'
            >查看</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop  = "createTime"
          label = "操作"
        >
          <template slot-scope="scope">
            <el-button
              size   = "mini"
              type   = "warning"
              @click = "showRecord(scope.$index, scope.row)"
            >执行历史</el-button>
          </template>
        </el-table-column> -->

      </el-table>
      </div>

    </div>
    <div
      class = "pageNation"
      style = "height:5%;margin:10px 0;"
    >
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSize"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
      currentPage: 1,
      pageSize: [10, 20, 30, 50],
      total: 0,
      changePageSize: 10,

      //列表相关
      datalists: [],

      // 搜索相关
      searchForm: {
        selectYearAttendance: "",
        selectSeasonAttendance: "",
        assessOrgId: "",
        orderStatusAttendance: "",
        attendanceStatus: ""
      },

      communityData: [],

      updateData2: []
      //
    };
  },
  methods: {
    search() {
      // console.log(this.searchForm)
      if (this.searchForm.selectYearAttendance == null) {
        this.searchForm.selectYearAttendance = "";
      }
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/assess/assess_order_attendance_mng/pagination?selectYearAttendance=${
          encodeURI(this.searchForm.selectYearAttendance)
        }&selectSeasonAttendance=${
          encodeURI(this.searchForm.selectSeasonAttendance)
        }&assessOrgId=${encodeURI(this.searchForm.assessOrgId)}&orderStatusAttendance=${
          encodeURI(this.searchForm.orderStatusAttendance)
        }&attendanceStatus=${encodeURI(this.searchForm.attendanceStatus)}`,
        method: "get"
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    resetSearch() {
      this.searchForm = {
        selectYearAttendance: "",
        selectSeasonAttendance: "",
        assessOrgId: "",
        orderStatusAttendance: "",
        attendanceStatus: ""
      };
    },
    showDetail(attendanceTimeIn) {
      if (attendanceTimeIn == "null" || attendanceTimeIn == null) {
        // if(attendanceTimeIn == "null"){

        alert("该工单尚未签到信息");
      } else {
        //     $('#mapModal').modal('show');
        // setTimeout(function(){
        // 	initMap(longitudeIn,latitudeIn,longitudeOut,latitudeOut,attendanceStatusIn,attendanceStatusOut,appointedLongitude,appointedLatidude);//创建和初始化地图
        // },200);
        // window.localStorage.setItem("cbrJbId", id);
        this.$router.push({ path: "/assessAttendCount/assess_attend_detail" });
      }
    },

    dataList(tableData) {
      this.datalists = tableData;
    },
    //分页methods
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`,this.pageSize);
      this.changePageSize = val;
      this.$options.methods.getReloadData(this);
    },
    handleCurrentChange(val) {
      if (this.searchForm.selectYearAttendance == null) {
        this.searchForm.selectYearAttendance = "";
      }
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/assess/assess_order_attendance_mng/pagination?pageSize=${
          this.changePageSize
        }&pageNo=${val}&selectYearAttendance=${
          encodeURI(this.searchForm.selectYearAttendance)
        }&selectSeasonAttendance=${
          encodeURI(this.searchForm.selectSeasonAttendance)
        }&assessOrgId=${encodeURI(this.searchForm.assessOrgId)}&orderStatusAttendance=${
          encodeURI(this.searchForm.orderStatusAttendance)
        }&attendanceStatus=${encodeURI(this.searchForm.attendanceStatus)}`,
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
      if (that.searchForm.selectYearAttendance == null) {
        that.searchForm.selectYearAttendance = "";
      }
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/assess/assess_order_attendance_mng/pagination?pageSize=${
            that.changePageSize
          }&pageNo=${that.currentPage}&selectYearAttendance=${
            encodeURI(that.searchForm.selectYearAttendance)
          }&selectSeasonAttendance=${
            encodeURI(that.searchForm.selectSeasonAttendance)
          }&assessOrgId=${encodeURI(that.searchForm.assessOrgId)}&orderStatusAttendance=${
            encodeURI(that.searchForm.orderStatusAttendance)
          }&attendanceStatus=${encodeURI(that.searchForm.attendanceStatus)}`,
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
      }/assess/assess_order_attendance_mng/pagination`,
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
    // 获取评估机构
    this.$axios({
      url: `${this.$store.state.globalRouter}/auth/org_mng/loadAll`,
      method: "get"
    }).then(res => {
      // console.log(res.data.data);
      this.communityData = res.data.data;
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

