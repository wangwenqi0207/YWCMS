
<template>
  <div style="padding:20px;height:100%;">
    <div style="height:95%;padding:5px;background:#fff;overflow:auto">
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
            <el-form-item label="参保人姓名:">
              <el-input
                v-model.trim = "searchForm.fullName"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="证件号:">
              <el-input
                v-model.trim = "searchForm.idNo"
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
        style             = "width: 100%;"
        @selection-change = "handleSelectionChange"
        size='mini'
        height="100%"
      >
       <el-table-column
          type  = "selection"
          width = "55"
        ></el-table-column>
        <el-table-column
          prop  = "insId"
          label = "ID"
          width = "100"
        ></el-table-column>
        <el-table-column
          prop  = "fullName"
          label = "参保人姓名"
          width='100'
        ></el-table-column>
        <el-table-column
          prop  = "idNo"
          label = "身份证号"
          width = "180"
        ></el-table-column>
        <el-table-column
          prop  = "birthday"
          label = "出生日期"
          width='100'
        ></el-table-column>
        <el-table-column
          prop  = "sex"
          label = "性别"
          width='80'
        >
        <template slot-scope="scope">
            <p v-if='scope.row.sex=="M"'>
              男
            </p>
            <p v-else-if='scope.row.sex=="F"'>
              女
            </p>
            <p v-else>
              {{scope.row.sex}}
            </p>

          </template>
        </el-table-column>
        <el-table-column
          prop  = "email"
          label = "对象类型"
          width='100'
        >
        <template slot-scope="scope">
            <p v-if='scope.row.email==1 || scope.row.email=="1"'>
              一类对象
            </p>
            <p v-else-if='scope.row.email==2 || scope.row.email=="2"'>
              二类对象
            </p>
            <p v-else>
              {{scope.row.email}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "insStatus"
          label = "剩余工时"
          width='80'
        >
        <template slot-scope="scope">
            <p v-if='scope.row.insStatus==1 || scope.row.insStatus=="1"'>
              8
            </p>
            <p v-else-if='scope.row.insStatus==2 || scope.row.insStatus=="2"'>
              6
            </p>

            <p v-else>
              {{scope.row.insStatus}}
            </p>

          </template>
        </el-table-column>
        <el-table-column
          prop  = "mobile"
          label = "手机号码"
          width='80'
        ></el-table-column>
        <el-table-column
          prop  = "address"
          label = "联系地址"
          width='120'
        ></el-table-column>
        <el-table-column
          prop  = "contactName"
          label = "联系人姓名"
          width='120'
        ></el-table-column>
        <el-table-column
          prop  = "contactPhone"
          label = "联系人电话"
          width='120'
        ></el-table-column>
        <el-table-column
          prop  = "bodyStatus"
          label = "身体状态"
          width='80'
        >
         <template slot-scope="scope">
            <p v-if='scope.row.bodyStatus==1 || scope.row.bodyStatus=="1"'>
              正常
            </p>
            <p v-else-if='scope.row.bodyStatus==2 || scope.row.bodyStatus=="2"'>
              死亡
            </p>
            <p v-else>
              {{scope.row.bodyStatus}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "deadDate"
          label = "死亡时间"
          width='80'
        ></el-table-column>
        <el-table-column
          prop  = "isFollowAssess"
          label = "是否需持续评估"
          width='120'
        >
        <template slot-scope="scope">
            <p v-if='scope.row.isFollowAssess==0 || scope.row.isFollowAssess=="0"'>
              否
            </p>
            <p v-else-if='scope.row.isFollowAssess==1 || scope.row.isFollowAssess=="1"'>
              是
            </p>

            <p v-else>
              {{scope.row.isFollowAssess}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "isFollowAssess"
          label = "操作"
          fixed="right"
          min-width='200'
        >
         <template slot-scope="scope">
            <el-button size="mini" type="success" @click="sportData(scope.row)">运动数据</el-button>
            <el-button size="mini" type="success" @click="showDetail(scope.row.insId)">查看</el-button>
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop  = "orderOldStatus"
          label = "原工单状态"
        >
        <template slot-scope="scope">
            <p v-if='scope.row.orderOldStatus==0 || scope.row.orderOldStatus=="0"'>
              待分配
            </p>

          </template>
        </el-table-column> -->

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
        <!-- <el-table-column
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

        ></el-table-column> -->
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
        fullName: '',
        idNo    : ''
      },


    };
  },
  methods: {
    search() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/ins_user/pagination?fullName=${
          encodeURI(this.searchForm.fullName)
        }&idNo=${
          encodeURI(this.searchForm.idNo)
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
        fullName: '',
        idNo    : ''
      };
    },

    showDetail(id){
      window.localStorage.setItem('cbrId',id);
      this.$router.push({path:'/userInfo/user_info_detail'});
      // if(this.$route.path=='/userInfo/_detail'){
      //   //  this.$route.path='/';

      // }

    },
    sportData(row){
      window.localStorage.setItem('cbrId',row.idNo);
      this.$router.push({path:'/userInfo/smart_device'});
    },
    dataList(tableData) {
      this.datalists = tableData;
      // var newdata   = [];
      // var newdata1  = [];
      // var newdata2  = [];
      // var newdata3  = [];
      // var dataArray = tableData;

      // dataArray.forEach(el => {
      //   if (el.questionType) {
      //    if(el.questionType==1){
      //      newdata.push('基本项目')
      //    }else if(el.questionType==2){
      //      newdata.push('老人整体情况')
      //    }else if(el.questionType==3){
      //      newdata.push('补充事项')
      //    }else if(el.questionType==4){
      //      newdata.push('疾病诊断')
      //    }else if(el.questionType==5){
      //      newdata.push('基本生活活动能力评定')
      //    }else{
      //      newdata.push(el.questionType)
      //    }
      //   }
      //   if (el.optionType) {
      //     if (el.optionType == 1) {
      //       newdata1.push("单选");
      //     } else if(el.optionType==2){
      //       newdata1.push("多选");
      //     }else{
      //       newdata1.push('其它')
      //     }
      //   }
      //     if(el.needPhoto==0){
      //       newdata2.push('不需要')
      //     }else{
      //       newdata2.push("需要");
      //   }
      //   //  if(el.optionText && el.optionText.length>=1){
      //   //     newdata3.push(el.optionText.substring(0,15)+"......");
      //   //   }else{
      //   //     newdata3.push("");
      //   // }
      // });

      // this.transform(dataArray, newdata);
      // this.transform1(dataArray, newdata1);
      // this.transform2(dataArray, newdata2);
      // // this.transform3(dataArray, newdata3);
      // this.datalists = dataArray;
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
        }/auth/ins_user/pagination?pageSize=${
          this.changePageSize
        }&pageNo=${val}&fullName=${
          encodeURI(this.searchForm.fullName)
        }&idNo=${
          encodeURI(this.searchForm.idNo)
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
          }/auth/ins_user/pagination?pageSize=${
            that.changePageSize
          }&pageNo=${that.currentPage}&fullName=${
          encodeURI(that.searchForm.fullName)
        }&idNo=${
          encodeURI(that.searchForm.idNo)
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
      }/auth/ins_user/pagination`,
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


