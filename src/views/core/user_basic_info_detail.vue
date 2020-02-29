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
   <el-tab-pane label="个人基本信息" name="first">
       <table style="width:60%;" class='myTable'>
          <tr>
              <td>人员ID: </td>
              <td><input name="userName" /></td>
              <td>人员编码(社保编码): </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>证件类型: </td>
              <td><input name="userName" /></td>
              <td>证件号码</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>户籍地所属行政区代码: </td>
              <td><input name="userName" /></td>
              <td>姓名：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>性别: </td>
              <td><input name="userName" /></td>
              <td>民族：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>出生日期: </td>
              <td><input name="userName" /></td>
              <td>参加工作日期：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>户口性质: </td>
              <td><input name="userName" /></td>
              <td>户口所在地：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>文化程度: </td>
              <td><input name="userName" /></td>
              <td>个人身份：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>专业技术职务: </td>
              <td><input name="userName" /></td>
              <td>国家职业资格等级：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>婚姻状态: </td>
              <td><input name="userName" /></td>
              <td>行政职务：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
              <td>联系电话: </td>
              <td><input name="userName" /></td>
              <td>地址：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>户籍地邮政编码: </td>
              <td><input name="userName" /></td>
              <td>备注：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>人员登记事件ID: </td>
              <td><input name="userName" /></td>
              <td>电子邮箱：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>户籍证明编号: </td>
              <td><input name="userName" /></td>
              <td hidden>姓名：</td>
              <td hidden><input /></td>
          </tr>

      </table>
   </el-tab-pane>
  <el-tab-pane label="行为习惯" name="second">
      <table style="width:60%;" class='myTable'>
          <tr>
              <td>身份证号: </td>
              <td><input name="userName" /></td>
              <td>吸烟状况: </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>开始吸烟年龄(岁): </td>
              <td><input name="userName" /></td>
              <td>戒烟年龄(岁)</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>日吸烟量(支): </td>
              <td><input name="userName" /></td>
              <td>以往平均每日吸烟：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>饮酒状况: </td>
              <td><input name="userName" /></td>
              <td>饮酒种类：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>日饮酒量(两): </td>
              <td><input name="userName" /></td>
              <td>是否戒酒：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>戒酒年龄(岁): </td>
              <td><input name="userName" /></td>
              <td>近一年内是否管醉酒：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>以往饮酒每月次: </td>
              <td><input name="userName" /></td>
              <td>以往饮酒，每次量：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>以往常饮酒类: </td>
              <td><input name="userName" /></td>
              <td>饮食习惯：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>每日刷牙频率: </td>
              <td><input name="userName" /></td>
              <td>锻炼频率：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
              <td>锻炼方式: </td>
              <td><input name="userName" /></td>
              <td>锻炼方式-其它：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>每日锻炼时间: </td>
              <td><input name="userName" /></td>
              <td>主要负性生活事件：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>主要负性生活事件-其它: </td>
              <td><input name="userName" /></td>
              <td>创建人员：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>创建时间: </td>
              <td><input name="userName" /></td>
              <td>创建机构：</td>
              <td><input /></td>
          </tr>

      </table>
  </el-tab-pane>
  <el-tab-pane label="既往史" name="third">
       <table style="width:60%;" class='myTable'>
          <tr>
              <td>人员ID: </td>
              <td><input name="userName" /></td>
              <td>人员编码(社保编码): </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>证件类型: </td>
              <td><input name="userName" /></td>
              <td>证件号码</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>姓名: </td>
              <td><input name="userName" /></td>
              <td>性别：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>大险种类型: </td>
              <td><input name="userName" /></td>
              <td>医疗人员类别：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>单位ID: </td>
              <td><input name="userName" /></td>
              <td>单位类型：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>业务年月: </td>
              <td><input name="userName" /></td>
              <td>医保年度：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>就诊结算时间: </td>
              <td><input name="userName" /></td>
              <td>人员医疗结算id：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>结算次序号: </td>
              <td><input name="userName" /></td>
              <td>人员医疗就诊id：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>住院号: </td>
              <td><input name="userName" /></td>
              <td>结算类别：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
              <td>入院类型: </td>
              <td><input name="userName" /></td>
              <td>就诊方式：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>医疗类别: </td>
              <td><input name="userName" /></td>
              <td>病案号：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>入院顺序号: </td>
              <td><input name="userName" /></td>
              <td>入院诊断病种编码、门诊诊断病种编码：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>入院疾病名称: </td>
              <td><input name="userName" /></td>
              <td>出院诊断病种编码：</td>
              <td><input /></td>
          </tr>
          <tr>
               <td>出院疾病名称: </td>
              <td><input name="userName" /></td>
              <td>入院诊断医生、门诊诊断医生：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>出院诊断医生: </td>
              <td><input name="userName" /></td>
              <td>科室代码：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>在院科室、门诊科室: </td>
              <td><input name="userName" /></td>
              <td>病区床位：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>主要病情描述: </td>
              <td><input name="userName" /></td>
              <td>异地标志：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>开始日期: </td>
              <td><input name="userName" /></td>
              <td>终止日期：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>住院天数: </td>
              <td><input name="userName" /></td>
              <td hidden>入院诊断病种编码、门诊诊断病种编码：</td>
              <td hidden><input name="userName" /></td>
          </tr>

      </table>
  </el-tab-pane>
  <el-tab-pane label="过敏史" name="fourth">
      <table style="width:60%;" class='myTable'>
          <tr>
              <td>身份证号: </td>
              <td><input name="userName" /></td>
              <td hidden>人员编码(社保编码): </td>
              <td hidden><input name="userName" /></td>
          </tr>
          <tr>
               <td>序号: </td>
              <td><input name="userName" /></td>
              <td>过敏类型: </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>过敏源: </td>
              <td><input name="userName" /></td>
              <td>过敏原因：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>发病日期: </td>
              <td><input name="userName" /></td>
              <td>对应号：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>创建机构: </td>
              <td><input name="userName" /></td>
              <td>创建人员：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>创建时间: </td>
              <td><input name="userName" /></td>
              <td>治疗描述：</td>
              <td><input name="userName" /></td>
          </tr>
      </table>
  </el-tab-pane>
  <el-tab-pane label="家族史" name="five">
      <table style="width:60%;" class='myTable'>
          <tr>
              <td>健康档案编号: </td>
              <td><input name="userName" /></td>
              <td hidden>人员编码(社保编码): </td>
              <td hidden><input name="userName" /></td>
          </tr>
          <tr>
               <td>父亲的疾病: </td>
              <td><input name="userName" /></td>
              <td>父亲的疾病的其它: </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>母亲的疾病: </td>
              <td><input name="userName" /></td>
              <td>母亲的疾病其它：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>兄弟姐妹的疾病: </td>
              <td><input name="userName" /></td>
              <td>兄弟姐妹的疾病的其它：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>子女的疾病: </td>
              <td><input name="userName" /></td>
              <td>子女的疾病的其它：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>其它成员的疾病: </td>
              <td><input name="userName" /></td>
              <td>其它成员的疾病的其它：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>创建机构编号: </td>
              <td><input name="userName" /></td>
              <td>创建医生编号：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>输入时间: </td>
              <td><input name="userName" /></td>
              <td hidden>其它成员的疾病的其它：</td>
              <td hidden><input name="userName" /></td>
          </tr>
      </table>
  </el-tab-pane>
  <el-tab-pane label="遗传病史" name="six">
       <table style="width:60%;" class='myTable'>
          <tr>
              <td>健康档案编号: </td>
              <td><input name="userName" /></td>
              <td hidden>有误疾病: </td>
              <td hidden><input name="userName" /></td>
          </tr>
          <tr>
               <td>疾病名称: </td>
              <td><input name="userName" /></td>
              <td>输入时间: </td>
              <td><input name="userName" /></td>
          </tr>

      </table>
  </el-tab-pane>
  <el-tab-pane label="预防接种史" name="seven">
      <table style="width:60%;" class='myTable'>
          <tr>
              <td>儿童基本信息: </td>
              <td><input name="userName" /></td>
              <td hidden>人员编码(社保编码): </td>
              <td hidden><input name="userName" /></td>
          </tr>
          <tr>
               <td>身份证号: </td>
              <td><input name="userName" /></td>
              <td>受种者编码: </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>儿童接种信息: </td>
              <td><input name="userName" /></td>
              <td hidden>母亲的疾病其它：</td>
              <td hidden><input name="userName" /></td>
          </tr>
           <tr>
               <td>疫苗ID: </td>
              <td><input name="userName" /></td>
              <td>接种类型：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>接种时间: </td>
              <td><input name="userName" /></td>
              <td>疫苗生产厂家编码：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>疫苗批号: </td>
              <td><input name="userName" /></td>
              <td>接种门诊编码：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>接种医生: </td>
              <td><input name="userName" /></td>
              <td>疫苗价格：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>预约次数: </td>
              <td><input name="userName" /></td>
              <td>制品编码：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>接种门诊名称: </td>
              <td><input name="userName" /></td>
              <td>接种日期：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>接种点编码: </td>
              <td><input name="userName" /></td>
              <td>接种记录来源：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>疫苗产品编码: </td>
              <td><input name="userName" /></td>
              <td>创建时间：</td>
              <td><input name="userName" /></td>
          </tr>
      </table>
  </el-tab-pane>
  <el-tab-pane label="中医评估" name="eight">
    <table style="width:60%;" class='myTable'>
          <tr>
              <td>身份证号: </td>
              <td><input name="userName" /></td>
              <td>评估序号: </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>检查日期: </td>
              <td><input name="userName" /></td>
              <td>目试体型: </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>问寒热: </td>
              <td><input name="userName" /></td>
              <td>问寒热其它：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>问汗: </td>
              <td><input name="userName" /></td>
              <td>问汗-其它：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>问饮食: </td>
              <td><input name="userName" /></td>
              <td>问饮食-其它：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>问睡眠: </td>
              <td><input name="userName" /></td>
              <td>问睡眠-其它：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>问小便: </td>
              <td><input name="userName" /></td>
              <td>问小便-其它：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>问大便: </td>
              <td><input name="userName" /></td>
              <td>问大便-其它：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>问经带(女): </td>
              <td><input name="userName" /></td>
              <td>问经带(女)-其它：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>声音: </td>
              <td><input name="userName" /></td>
              <td>声音-其它：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>呼吸: </td>
              <td><input name="userName" /></td>
              <td>呼吸-其它：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>神: </td>
              <td><input name="userName" /></td>
              <td>神-其它: </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>色: </td>
              <td><input name="userName" /></td>
              <td hidden>色-其它：</td>
              <td hidden><input name="userName" /></td>
          </tr>
           <tr>
               <td>皮肤: </td>
              <td><input name="userName" /></td>
              <td>皮肤-其它：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>毛发: </td>
              <td><input name="userName" /></td>
              <td>毛发-其它：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>舌质: </td>
              <td><input name="userName" /></td>
              <td>舌质-其它：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>舌苔: </td>
              <td><input name="userName" /></td>
              <td>舌苔-其它：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>脉象: </td>
              <td><input name="userName" /></td>
              <td>脉象-其它：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>需要记录说明的其它情况: </td>
              <td><input name="userName" /></td>
              <td>综合判断受检查的其它情况：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>调养建议: </td>
              <td><input name="userName" /></td>
              <td>接种记录来源：</td>
              <td hidden><input name="userName" /></td>
          </tr>
          <tr>
               <td>评估医生: </td>
              <td><input name="userName" /></td>
              <td>评估检查：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>创建人员: </td>
              <td><input name="userName" /></td>
              <td>创建时间：</td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>创建机构: </td>
              <td><input name="userName" /></td>
              <td>评估检查：</td>
              <td hidden><input name="userName" /></td>
          </tr>
      </table>
  </el-tab-pane>
  <el-tab-pane label="个人健康档案记录" name="nine">
     <table style="width:60%;" class='myTable'>
          <tr>
              <td>身份证号: </td>
              <td><input name="userName" /></td>
              <td>教育序号: </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>教育来源类别: </td>
              <td><input name="userName" /></td>
              <td>标题: </td>
              <td><input name="userName" /></td>
          </tr>
          <tr>
               <td>教育内容: </td>
              <td><input name="userName" /></td>
              <td>教育者编号：</td>
              <td><input name="userName" /></td>
          </tr>
           <tr>
               <td>机构代码: </td>
              <td><input name="userName" /></td>
              <td>教育时间：</td>
              <td><input name="userName" /></td>
          </tr>
      </table>
  </el-tab-pane>
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
        activeName: 'first'
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
        this.$router.push({ path: "/user_basic_info" });
    },
    handleClick(tab, event) {
        console.log(tab, event);
      }


  },
  mounted() {
     window.localStorage.getItem('cbrJbId');
    //   this.$axios({
    //       url: `${
    //     this.$store.state.globalRouter
    //   }/auth/ins_user/pagination`,
    //       method: 'get'
    //   }).then(res=>{
    //       console.log(res)
    //   })

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
    width: 16%;
    /* border-bottom: 1px solid #cccccc; */
    /* border-right: 1px solid #cccccc; */
    text-align: right;padding: 15px;
}
.myTable tr td:nth-of-type(3){
    width: 15%;
    /* border-bottom: 1px solid #cccccc; */
    /* border-right: 1px solid #cccccc; */
    text-align: right;padding: 15px;
}
.myTable tr td:nth-of-type(2){
    width: 30%;
    /* border-bottom: 1px solid #cccccc; */
}
.myTable tr td:nth-of-type(4){
    width: 30%;
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


