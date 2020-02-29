// 失能评估自评表管理
<template>
  <div style="padding:20px;height:100%">
    <div class="tableBox" style="background:#fff;padding:5px;height:95%;">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        size="mini"
        style="text-align: left;padding: 10px;background: rgba(240, 240, 240,0.4);border-radius: 5px;margin-bottom: 20px;"
      >
        <el-row>
          <el-form-item label="联系人姓名">
            <el-input v-model.trim="searchForm.contactName" clearable></el-input>
          </el-form-item>

          <el-form-item label="参保人姓名">
            <el-input v-model.trim="searchForm.insName" clearable></el-input>
          </el-form-item>

          <el-form-item label="参保人身份证">
            <el-input v-model.trim="searchForm.insIdCard" clearable></el-input>
          </el-form-item>

          <el-form-item label="填写状态">
            <el-select v-model="searchForm.insBaseInfoUpdateFlag" clearable >
              <el-option label="已填写" value="1"></el-option>
              <el-option label="未填写" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="评估状态">
            <el-select v-model="searchForm.orderStatus" clearable >
              <el-option label="已评估" value="6"></el-option>
              <el-option label="未评估" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetSearch" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <!-- 表格 -->
      <div style="padding:5px;height:80%">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :data="tableLists"
          border
          stripe
          height="100%"
          style="width: 100% "
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <!-- <el-table-column type="selection" width="50"></el-table-column> -->
          <el-table-column prop="id" label="序号" width="80" sortable></el-table-column>
          <el-table-column prop="insName" label="参保人姓名" width="120" sortable></el-table-column>
          <el-table-column prop="insIdCard" label="参保人身份证" width="200" sortable></el-table-column>
          <el-table-column prop="name" label="联系人姓名" width="150" sortable></el-table-column>
          <el-table-column prop="phone" label="联系人手机" width="200" sortable></el-table-column>
          <el-table-column prop="insBaseInfoUpdateFlag" label="填写状态" width="120" sortable></el-table-column>
          <el-table-column prop="createTime" label="提交时间" width="200" sortable></el-table-column>
          <el-table-column prop="orderStatus" label="评估状态" width="200" sortable></el-table-column>
          <el-table-column prop="action" label="操作"  width="280" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="showSelfAssessTable(scope.$index, scope.row)"
              >失能评估自评表</el-button>
              <el-button v-if="scope.row.insBaseInfoUpdateFlag=='已填写'" size="mini" type="success" @click="exportExcel(scope.$index, scope.row)">导出</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--失能评估展示表弹出框 -->
      <el-dialog
        :title="proptype"
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="handleClose"
        style="text-align:left"
      >
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="180px"
          label-position="left"
          class="demo-ruleForm"
          style="overflow:auto;"
          :disabled=false
        >
          <el-form-item label="1.参保人姓名">
            <el-col :span="6">
              <el-input v-model="ruleForm.insName" clearable size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="2.参保人身份证号">
            <el-col :span="12">
              <el-input v-model="ruleForm.insIdcard" clearable size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="3.居住地址">
            <el-col :span="5">
              <el-form-item>
                <el-input v-model="ruleForm.province" clearable size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">&nbsp;</el-col>
            <el-col :span="5">
              <el-form-item>
                <el-input v-model="ruleForm.city" clearable size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">&nbsp;</el-col>
            <el-col :span="5">
              <el-form-item>
                <el-input v-model="ruleForm.district" clearable size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">&nbsp;</el-col>
            <el-col :span="5">
              <el-form-item>
                <el-input v-model="ruleForm.street" clearable size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="   详细地址">
            <el-col :span="10">
              <el-input v-model="ruleForm.address" clearable size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="4.联系人姓名">
            <el-col :span="6">
              <el-input v-model="ruleForm.contactName" clearable size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="5.联系人身份证号">
            <el-col :span="12">
              <el-input v-model="ruleForm.contactIdcard" clearable size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="6.联系人电话">
            <el-col :span="12">
              <el-input v-model="ruleForm.contactPhone" clearable size="small"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="7.与参保人关系" >
            <el-col :span="10">
              <el-select
                v-model="ruleForm.relationshipInsUser"
                clearable
                placeholder="请选择状态"
                style="width:100%;float:left;"
                size="small"
              >
                <el-option label="自己" value=0></el-option>
                <el-option label="子女" value=1></el-option>
                <el-option label="父母" value=2></el-option>
                <el-option label="配偶" value=3></el-option>
                <el-option label="兄弟姐妹" value=4></el-option>
                <el-option label="朋友" value=5></el-option>
                <el-option label="其他" value=6></el-option>
                <el-option label="未知" value=7></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <hr />
          <el-form-item label="8.进食"  style="margin-bottom:20px">
            <el-col :span="12">
              <el-radio-group v-model="ruleForm.q1">
                <el-radio :label="1">使用餐具将饭菜送入口、咀嚼、吞咽等步骤(0)</el-radio>
                <el-radio :label="2">使用餐具，在切碎、搅拌等协助下能完成(5)</el-radio>
                <el-radio :label="3">使用餐具有困难，进食需要帮助(10)</el-radio>
                <el-radio :label="4">不能自主进食，或伴有吞咽困难，完全需要帮助（如喂食、鼻饲等）(20)</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="9.头部清洁及洗浴" style="margin-bottom:20px">
            <el-col :span="12">
              <el-radio-group v-model="ruleForm.q2">
                <el-radio :label="1">独立完成(0)</el-radio>
                <el-radio :label="2">头部清洁能独立完成，洗浴需要协助 (5)</el-radio>
                <el-radio :label="3">在他人协助下能完成部分头部清洁；洗浴需要帮助 (10)</el-radio>
                <el-radio :label="4">完全需要帮助 (20)</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="10.穿衣" style="margin-bottom:20px">
            <el-col :span="12">
              <el-radio-group v-model="ruleForm.q3">
                <el-radio :label="1">独立完成(0)</el-radio>
                <el-radio :label="2">需要他人协助，在适当时间内完成部分穿衣(5)</el-radio>
                <el-radio :label="3">在他人协助下，仍需在较长时间内完成部分穿衣(10)</el-radio>
                <el-radio :label="4">完全需要帮助(20)</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="11.大小便及如厕" style="margin-bottom:20px">
            <el-col :span="12">
              <el-radio-group v-model="ruleForm.q4">
                <el-radio :label="1"> 如厕不需协助(0)</el-radio>
                <el-radio :label="2">在适当提示和协助下能如厕或使用便盆(5)</el-radio>
                <el-radio :label="3">在很多提示和协助下尚能如厕或使用便盆(10)</el-radio>
                <el-radio :label="4">如厕完全需要帮助(20)</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="12.移动" style="margin-bottom:20px">
            <el-col :span="12">
              <el-radio-group v-model="ruleForm.q5">
                <el-radio :label="1">独立完成(0)</el-radio>
                <el-radio :label="2">借助较小外力或辅助装置能完成站立、转移、行走、上下楼梯等(5)</el-radio>
                <el-radio :label="3">动则气急喘息，借助较大外力才能完成站立、转移、行走，不能上下楼梯(10)</el-radio>
                <el-radio :label="4">卧床不起；休息状态下时有气息喘息，难以站立；移动完全需要帮助(20)</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="13.疾病" style="margin-bottom:20px">
            <el-col :span="12">
              <el-radio-group v-model="ruleForm.q6">
                <el-radio :label="1">无帕金森病、中风后遗症等导致上述能力受限的疾病(0)</el-radio>
                <el-radio :label="2">有帕金森病、中风后遗症等导致上述能力受限的疾病之一(10)</el-radio>
                <el-radio :label="3">有帕金森病、中风后遗症等导致上述能力受限的疾病一种以上(20)</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <div><hr/></div>
          <el-form-item :label=count>
            <el-col >
              <span>说明：自评分值超过40分（含），可提出评估申请；自评分值小于40分的，不建议评估申请</span><br />
              <span>申明：此表由参保人自评打分，仅作为是否申请失能评估的参考依据，最终结果以正式评估结论为准。</span>
            </el-col>
          </el-form-item>
           <el-form-item label="是否确认申请失能评估：">
            <el-col :span="12">
              <el-radio-group v-model="ruleForm.confirmApply">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
        </el-form>
        <hr />
        <div style="width:100%;position:relative;overflow:hidden">
          <div style="width:50%;float:left">
            <span>参保人（代理人）：{{ruleForm.custContactName}}</span>
          </div>
          <div  style="width:50%;float:left">
            <span>日期：{{ruleForm.createTime}}</span>
          </div>

        </div>
      </el-dialog>
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
  </div>
</template>
<script>
import base from "../../base/base";
import { error } from "util";
export default {
  mixins: [base],
  data() {
    return {
      module: "customer_contact_mng",
      proptype: "失能评估自评表",
      dialogVisible: false,
      searchForm: {
        contactName: "",
        insName: "",
        insIdCard: "",
        insBaseInfoUpdateFlag: "",
        orderStatus: ""
      },
      tableLists: [],
      ruleForm: {
        id:466,
        orderStr:null,
        orgLinks:null,
        custContactId:3908,
        insName:"",
        insIdcard:"",
        province:"",
        city:"",
        district:"",
        street:"",
        address:"",
        contactName:"",
        contactIdcard:"",
        contactPhone:"",
        relationshipInsUser:'',
        createTime:'',
        custContactName:"",
        score:null,
        createDateYYYYMMDD:null,
        q1:null,
        q2:null,
        q3:null,
        q4:null,
        q5:null,
        q6:null,
        item14:null,
        confirmApply:null
      },
      modelType: 1,
      checkData: [],
      loading: true,
      count:"合计:50分",
      coreCount:0,
      acent:"wang",
      userDate:"2019-5-30"
    };
  },
  methods: {
    getData() {
      this.$axios({
        method:'get',
        url:`${this.$store.state.globalRouter}/core/${
            this.module
          }/pagination`,
      params:{
        nameLike:this.searchForm.contactName,
        insNameLike:this.searchForm.insName,
        insIdcardLike:this.searchForm.insIdCard,
        pageNo:this.currentPage,
        pageSize:this.changePageSize,
        insBaseInfoUpdateFlag:this.searchForm.insBaseInfoUpdateFlag,
        orderStatus:this.searchForm.orderStatus
      }
      })
        .then(res => {
          this.loading = false;
          if (res.data.resultList) {
            this.total = res.data.totalCount;
            this.currentPage = res.data.curPage;
            this.resData = res.data.resultList;
            this.dataList(res.data.resultList);
          }
          if (res.data.resultList == null) {
            this.tableLists = [];
            this.$message({ type: "info", message: "暂无数据" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    dataList(tableData) {
      let data = JSON.parse(JSON.stringify(tableData));
      data.forEach((item, index) => {
        if(item.insBaseInfoUpdateFlag && item.insBaseInfoUpdateFlag == 1){

          item.insBaseInfoUpdateFlag ="已填写";
        }else{
          item.insBaseInfoUpdateFlag ="未填写";
        }
        if(item.createTime){
          item.createTime = this.$moment(item.createTime).format(
          "YYYY-MM-DD HH:mm:ss"
          );
        }
        if (item.orderStatus == null) {
          item.orderStatus = "未评估";
        }
        if (item.orderStatus == 1) {
          item.orderStatus = "参保人取消";
        }
        if (item.orderStatus == -2) {
          item.orderStatus = "评估人取消";
        }
        if (item.orderStatus == -3) {
          item.orderStatus = "系统取消";
        }
        if (item.orderStatus == 0) {
          item.orderStatus = "未分配";
        }
        if (item.orderStatus == 1) {
          item.orderStatus = "已完成评估";
        }
        if (item.orderStatus == 2) {
          item.orderStatus = "待评估人接单";
        }
        if (item.orderStatus == 3) {
          item.orderStatus = "待上门评估";
        }
        if (item.orderStatus == 4) {
          item.orderStatus = "正在评估";
        }
        if (item.orderStatus == 5) {
          item.orderStatus = "评估人已提交";
        }
        if (item.orderStatus == 6) {
          item.orderStatus = "已评估";
        }
        if (item.orderStatus == 8) {
          item.orderStatus = "待指派";
        }
        if (item.orderStatus == 10) {
          item.orderStatus = "待审核";
        }
        if (item.orderStatus == 11) {
          item.orderStatus = "审核不通过";
        }
      });
      this.tableLists = data;
    },
    searchData() {
      this.loading=true;
      // this.getData();
      this.$axios({
        method:'get',
        url:`${this.$store.state.globalRouter}/core/${
            this.module
          }/pagination`,
      params:{
        nameLike:this.searchForm.contactName,
        insNameLike:this.searchForm.insName,
        insIdcardLike:this.searchForm.insIdCard,
        pageNo:1,
        pageSize:this.changePageSize,
        insBaseInfoUpdateFlag:this.searchForm.insBaseInfoUpdateFlag,
        orderStatus:this.searchForm.orderStatus
      }
      })
        .then(res => {
          this.loading = false;
          if (res.data.resultList) {
            this.total = res.data.totalCount;
            this.currentPage = res.data.curPage;
            this.resData = res.data.resultList;
            this.dataList(res.data.resultList);
          }
          if (res.data.resultList == null) {
            this.tableLists = [];
            this.$message({ type: "info", message: "暂无数据" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadInsSelfAssessment(val){
      this.$axios({
        methods:'get',
        url:`${this.$store.state.globalRouter}/core/${this.module}/load_ins_self_assessment_by_contact_id?custContactId=${encodeURI(val)}`
      }).then(res=>{
        if(res.data.resultCode=='000000'){
          if(res.data.data){
            let data=JSON.parse(JSON.stringify(res.data.data));
            data.relationshipInsUser=data.relationshipInsUser+'';
            data.createTime=this.$moment(data.createTime).format("YYYY-MM-DD HH:mm:ss");
            this.ruleForm=JSON.parse(JSON.stringify(data));
            this.coreCount1(data.q1);
            this.coreCount1(data.q2);
            this.coreCount1(data.q3);
            this.coreCount1(data.q4);
            this.coreCount1(data.q5);
            switch(data.q6){
              case 1: this.coreCount+=0;
                break;
              case 2: this.coreCount+=10;
                break;
              case 3:this.coreCount+=20;
            };
            this.count="总分："+this.coreCount+"分";
          }else{
            this.coreCount="";
            this.ruleForm={
              id:null,
              orderStr:null,
              orgLinks:null,
              custContactId:null,
              insName:"",
              insIdcard:"",
              province:"",
              city:"",
              district:"",
              street:"",
              address:"",
              contactName:"",
              contactIdcard:"",
              contactPhone:"",
              relationshipInsUser:'',
              createTime:'',
              custContactName:"",
              score:null,
              createDateYYYYMMDD:null,
              q1:null,
              q2:null,
              q3:null,
              q4:null,
              q5:null,
              q6:null,
              item14:null,
              confirmApply:null
            };
            this.count="总分："+this.coreCount+"分";
          }
        }
      }).catch(error=>{
        this.$message.error(error);
      })
    },
    showSelfAssessTable(index, rowData) {
      this.dialogVisible = true;
      this.loadInsSelfAssessment(rowData.id);
    },
    exportExcel(index, rowData) {
      let addr=`${this.$store.state.globalRouter}/core/${this.module}/export_excel?custId=${rowData.id}`
      window.location.href=addr;
    },
    resetSearch() {
      this.searchForm.contactName = "";
      this.searchForm.insName = "";
      this.searchForm.insIdCard = "";
      this.searchForm.insBaseInfoUpdateFlag = "";
      this.searchForm.orderStatus = "";
      this.loading=true;
      this.getData();
    },
    handleSizeChange(val) {
      this.changePageSize = val;
      this.loading = true;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this.getData();
    },
    handleClose(done) {
            this.$confirm("确认关闭？")
              .then(_ => {
                done();
                this.coreCount=0;
              })
              .catch(_ => {});
          },
    coreCount1(val){
      let count=this.coreCount;
      switch(val){
            case 1: count+=0;
              break;
            case 2:count+=5;
              break;
            case 3:count+=10;
              break;
            case 4:count+=20;
          };
          this.coreCount=count;
          return this.coreCount;
    }
  },
  mounted() {
    this.coreCount=0;
    this.getData();
  }
};
</script>
<style scoped>
.el-pagination {
  text-align: left;
}
.el-form-item {
  margin-bottom: 10px;
}
.caret-wrapper {
  width: 5px !important;
}
.el-form-item__label {
  text-align: left;
}
.el-radio+.el-radio {
    margin-left: 0px;
}
</style>
