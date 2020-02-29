<template>
  <div style="padding:5px;height:100%;">
    <div
      class = "tableBox"
      style = "background:#fff;padding:5px;"
    >
      <div
        el-col
        span  = "24"
        style = "text-align:left;"
      >
        <el-button
          type   = "primary"
          icon   = "el-icon-back"
          size   = "small"
          @click = "back"
        >返回</el-button>
        <div class="grid-content bg-purple-dark"></div>
      </div>
      <div style="margin-top:10px;">
          <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
  <el-tab-pane label="基本信息" name="first">
      <table style="width:60%;" class='myTable'>
          <tr>
              <td>参保人姓名: </td>
              <td><input id="fullName" /></td>
          </tr>
          <tr>
              <td>身份证号: </td>
              <td><input id="idNo" /></td>
          </tr>
          <tr>
              <td>出生日期: </td>
              <td><input id="birthday" /></td>
          </tr>
          <tr>
              <td>性别: </td>
              <td style="text-align:left;padding:0px 15px;">
                <el-radio v-model="sex" label="M">男</el-radio>
                <el-radio v-model="sex" label="F">女</el-radio>
              </td>
          </tr>
          <tr>
              <td>对象类型: </td>
              <td style="text-align:left;padding:0px 15px;">
                <el-radio v-model="email" label="1">一类对象</el-radio>
                <el-radio v-model="email" label="2">二类对象</el-radio>
              </td>
          </tr>
          <!-- <tr>
              <td>医保类型: </td>
               <td style="text-align:left;padding:0px 15px;">
                <el-radio v-model="medicalInsuranceType" label="1">在职职工</el-radio>
                <el-radio v-model="medicalInsuranceType" label="2">公务员</el-radio>
                <el-radio v-model="medicalInsuranceType" label="3">退休</el-radio>
                <el-radio v-model="medicalInsuranceType" label="4">离休</el-radio>
              </td>
          </tr> -->
          <tr>
              <td>剩余工时: </td>
              <td><input id="medicalInsuranceId" v-model="time"/></td>
          </tr>
          <tr>
              <td>手机号码: </td>
              <td><input id="mobile" /></td>
          </tr>
          <tr>
              <td>邮箱: </td>
              <td><input id="email" /></td>
          </tr>
          <tr>
              <td>联系地址: </td>
              <td><input id="address" /></td>
          </tr>

           <tr>
              <td>工作单位: </td>
              <td><input id="workAddress" /></td>
          </tr>
           <tr>
              <td>联系人姓名: </td>
              <td><input id="contactName" /></td>
          </tr>
           <tr>
              <td>联系人电话: </td>
              <td><input id="contactPhone" /></td>
          </tr>
           <tr>
              <td>开户银行: </td>
              <td><input id="bankName" /></td>
          </tr>
           <tr>
              <td>账户名称: </td>
              <td><input id="bankAccountName" /></td>
          </tr>
           <tr>
              <td>账号: </td>
              <td><input id="bankAccountId" /></td>
          </tr>
           <tr>
              <td>身体状态: </td>
              <td style="text-align:left;padding:0px 15px;">
                <el-radio v-model="work_address" label="1">正常</el-radio>
                <el-radio v-model="work_address" label="2">死亡</el-radio>
              </td>
          </tr>
           <tr>
              <td>死亡时间: </td>
              <td><input id="deadDate" /></td>
          </tr>
      </table>

  </el-tab-pane>
  <el-tab-pane label="评估&护理信息" name="second">
      <h4 style="text-align:left;">评估信息</h4>
      <table style="width:60%;" class='myTable'>
          <tr>
              <td>评估等级: </td>
              <td><input id="assessedLevel" /></td>
          </tr>
          <tr>
              <td>评估完成时间: </td>
              <td><input id="lastAssessTime" /></td>
          </tr>

      </table>
      <h4 style="text-align:left;">护理信息</h4>
      <table style="width:60%;" class='myTable'>
          <tr>
              <td>护理类型: </td>
              <td><input id="nursingTypeId" /></td>
          </tr>
          <tr>
              <td>护理起算日期: </td>
              <td><input id="treatmentStartDate" /></td>
          </tr>
          <tr>
              <td>护理结束日期: </td>
              <td><input id="treatmentEndDate" /></td>
          </tr>

          <tr>
              <td>护理变更状态: </td>
              <td><input id="treatmentChangeStatus" /></td>
          </tr>
          <tr>
              <td>护理变更日期: </td>
              <td><input id="treatmentChangeDate" /></td>
          </tr>
      </table>

  </el-tab-pane>
  <el-tab-pane label="健康档案&健康数据" name="third">健康档案&健康数据模块正在开发中，敬请期待...</el-tab-pane>
  <el-tab-pane label="积分记录" name="fourth">积分记录模块正在开发中，敬请期待...</el-tab-pane>
  <el-tab-pane label="预警信息" name="five">预警信息模块正在开发中，敬请期待...</el-tab-pane>
  <el-tab-pane label="费用记录" name="six">费用记录模块正在开发中，敬请期待...</el-tab-pane>
</el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
        activeName: 'first',
        // 基本信息里面的单选框
        sex                 : 'F',
        email: '1',
        insStatus           : '1',
        work_address          : '1',
        time:''
    };
  },
  methods: {
    back() {
    //   // 跳转回主页面时，分页会出错，所以回去前要置为空
    //   (this.$store.state.orderNoInfo = ""),
    //     (this.$store.state.selectStatus = ""),
    //     (this.$store.state.appleyUserName = ""),
    //     (this.appleyUserName = null),
    //     (this.$store.state.contactName = ""),
    //     (this.$store.state.idcard = ""),
    //     (this.$store.state.assessNameLike = ""),
    //     (this.$store.state.addressLike = ""),
        this.$router.push({ path: "/user_info" });
    },
    handleClick(tab, event) {
        // console.log(tab, event);
      },


  },
  mounted() {
      this.$axios({
          url: `${
        this.$store.state.globalRouter
      }/auth/ins_user/load_for_edit?id=${encodeURI(window.localStorage.getItem('cbrId'))}`,
          method: 'get'
      }).then(res=>{
        if(res.data.resultCode=='000000'){
          console.log('详情信息',res.data.data)
          var data = res.data.data;
          $('#fullName').val(data.fullName);
          $('#idNo').val(data.idNo);
          $('#birthday').val(data.birthday);
          if(data.sex){
            this.sex = data.sex;
          }
          if(data.insStatus=='1'){
              this.time  = "8"
          }else if(data.insStatus=='2'){
              this.time  = "6"
          }

          // this.medicalInsuranceType = data.medicalInsuranceType
          // console.log(this.medicalInsuranceType)
          // $('#medicalInsuranceId').val(data.medicalInsuranceId)
          if(data.email){
            this.email = data.email;
          }
          if(data.insStatus){
            this.insStatus = data.insStatus;
          }
          if(data.work_address){
           this.work_address = data.work_address;
          }

          $('#mobile').val(data.mobile);
          // $('#email').val(data.email);
          $('#address').val(data.address);
          $('#workAddress').val(data.workAddress);

             $('#contactName').val(data.contactName);


          $('#contactPhone').val(data.contactPhone);
          $('#bankName').val(data.bankName);
          $('#bankAccountName').val(data.bankAccountName);
          $('#bankAccountId').val(data.bankAccountId);


          $('#deadDate').val(data.deadDate);

          $('#assessedLevel').val(data.assessedLevel);
          if(data.lastAssessTime){
$('#lastAssessTime').val(this.$moment(data.lastAssessTime).format('YYYY-MM-DD HH:mm:ss'));
          }

          // $('#lastAssessTime').val(data.lastAssessTime);
          if(data.nursingTypeId && data.nursingTypeId=='4'){
            $('#nursingTypeId').val('机构护理');
          }else if(data.nursingTypeId && data.nursingTypeId=='5'){
            $('#nursingTypeId').val('居家护理');
          }

          $('#treatmentStartDate').val(data.treatmentStartDate);
          $('#treatmentEndDate').val(data.treatmentEndDate);
          $('#treatmentChangeStatus').val(data.treatmentChangeStatus);
          $('#treatmentChangeDate').val(data.treatmentChangeDate);
          // $('#deadDate').val(data.deadDate);



        }else{

        }

      })
  }
};
</script>

<style scoped>
h1 {
  display: block;
  /* font-size          : 2em; */
  margin-block-start : 0.67em;
  margin-block-end   : 0.67em;
  margin-inline-start: 0px;
  margin-inline-end  : 0px;
  font-weight        : bold;
}

.print_page {
  font-size  : 16px;
  font-family: 仿宋;
  width      : 815px;
  margin     : 0 auto;
  line-height: 30px;
  padding    : 30px 75px;
  color      : #000;
  background : #ffffff;
  margin-top : 20px;
  box-shadow : 0 0 10px #adafb8;
  height     : 1000px;
  position   : relative;
}
.print_page h1 {
  font-size  : 24px;
  text-align : center;
  line-height: 30px;
  padding    : 20px 0;
  padding-top: 30px;
}
.print_page h2 {
  font-size     : 18px;
  padding-bottom: 10px;
}
.print_page .content {
  text-indent: 2em;
}
.print_page .t_r {
  text-align: right;
}
.print_bar {
  position  : fixed;
  right     : 20px;
  top       : 50%;
  margin-top: -30px;
}
.print_btn {
  text-decoration: none;
  width          : 60px;
  height         : 60px;
  text-align     : center;
  line-height    : 60px;
  color          : #fff;
  background     : #348fe2;
  display        : inline-block;
  border-radius  : 5px;
}
.blank130 {
  height  : 130px;
  overflow: hidden;
}
.header,
.footer {
  height: 30px;
  width : 600px;
}
.header {
  background : url(../../assets/img/header.gif) center no-repeat;
  left       : 50%;
  margin-left: -300px;
  position   : relative;
}
.footer {
  background : url(../../assets/img/footer.gif) center no-repeat;
  position   : absolute;
  bottom     : 30px;
  left       : 50%;
  margin-left: -300px;
}
.print_page2 {
  font-size  : 18px;
  line-height: 48px;
}
.page_550 {
  width  : 570px;
  margin : 0 auto;
  padding: 30px 0;
}
.print_page ol {
  line-height   : 24px;
  padding-bottom: 10px;
  padding       : 0px 25px;
}
.print_page h3 {
  font-size: 18px;
  padding  : 10px 0;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 16px;
  width        : 40%;
  float        : left;
  margin-left  : 30px;
}

.gongdaninfo ul {
  overflow: hidden;
}
.gongdaninfo ul li {
  float        : left;
  width        : 35%;
  list-style   : none;
  text-align   : left;
  overflow     : hidden;
  margin-bottom: 20px;
}

.el-tabs--border-card > .el-tabs__content {
  /* padding: 15px; */
  padding       : 10px 0px;
  padding-bottom: 0px;
}
.el-form--label-left .el-form-item__label {
  text-align: left;
  width     : 100%;
  height    : 18px;
}
.el-radio-group {
  display       : inline-block;
  line-height   : 1;
  vertical-align: middle;
  font-size     : 0;
  width         : 100%;
  text-align    : left;
}
hr {
  margin-top   : 0px;
  margin-bottom: 0px;
  border       : 0;
  border-top   : 1px solid #eee;
}
.el-form-item {
  margin-bottom: 8px;
}
#result {
  float: left;
}
#result li {
  float   : left;
  position: relative;
}
#result img {
  display    : inline-block;
  width      : 80px;
  height     : 80px;
  margin-left: 10px;
}

.myTable tr td:nth-of-type(1){
    width: 15%;
    /* border-bottom: 1px solid #cccccc; */
    border-right: 1px solid #cccccc;
    text-align  : right;padding: 15px;
}
.myTable tr td:nth-of-type(2){
    width: 50%;
    /* border-bottom: 1px solid #cccccc; */
}
.myTable input{
    width        : 98%;
    padding      : 5px;
    border-radius: 3px;
    outline      : none;
    border       : 1px solid #ccc;
}
</style>


