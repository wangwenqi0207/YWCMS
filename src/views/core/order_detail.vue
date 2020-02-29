<template>
  <div style="padding:20px;height:100%;">
    <div class="tableBox" style="background:#fff;padding:5px;height:100%;overflow:auto">
      <div el-col span="24" style="text-align:left;">
        <el-button type="primary" icon="el-icon-back" size="small" @click="back">返回</el-button>
        <div class="grid-content bg-purple-dark"></div>
      </div>
      <div style="margin-top:10px;">
        <el-tabs type="border-card" @tab-click="changetabs">
          <el-tab-pane style="height:800px">
            <span slot="label">申请信息</span>
            <div style="padding:20px;height:100%;overflow:auto">
              <div style="height:100%">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="220px"
                  class="demo-ruleForm"
                  size="mini"
                  style="text-align:left;width:80%"
                  label-position="left"
                >
                  <p
                    style="text-align:left;font-weight:blod;float:left;width:100%;font-weight:blod;font-size:16px;padding-bottom: 5px;
    border-bottom: 1px solid #ececec;"
                    class="typeTitle"
                  >
                    <b>申请人基本信息：</b>
                  </p>
                  <el-form-item label="姓名:" prop="name">
                    <el-input v-model="ruleForm.name" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="性别:" prop="sex">
                    <el-select
                      v-model="ruleForm.sex"
                      placeholder="请选择"
                      style="width:100%;float:left;"
                      disabled
                    >
                      <el-option label="男" value="M"></el-option>
                      <el-option label="女" value="F"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="身份证号:" prop="sfnumber">
                    <el-input v-model="ruleForm.sfnumber" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="出生日期:" prop="birthTime">
                    <el-date-picker
                      v-model="ruleForm.birthTime"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      style="width:100%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="社保卡号:" prop="sbnumber">
                    <el-input v-model="ruleForm.sbnumber" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话/手机:" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="是否为民政部门认定的特殊人群:" prop="isSpecial">
                    <el-select
                      v-model="ruleForm.isSpecial"
                      placeholder="请选择"
                      style="width:100%;float:left;"
                    >
                      <el-option label="不是" value="0"></el-option>
                      <el-option label="五保户" value="1"></el-option>
                      <el-option label="低保户" value="2"></el-option>
                      <el-option label="困难户" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否为残联部门认定的残疾人：" prop="isDes">
                    <el-select
                      v-model="ruleForm.isDes"
                      placeholder="请选择"
                      style="width:100%;float:left;"
                    >
                      <el-option label="不是" value="0"></el-option>
                      <el-option label="是" value="1"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item
                    label="联系地区:"
                    prop="area"
                    style="width:80%;display:block;"
                    class="is-required"
                  >
                    <select
                      v-model="provinceSelected"
                      autofocus
                      v-if="provinceL"
                      style="width:30%;display:inline-block;"
                      id="province"
                      required

                    >
                      <option disabled value="请选择城市">请选择城市</option>
                      <option
                        v-for="(item,index) in provinceL"
                        :value="item.regionId"
                        :key="index"
                      >{{item.regionName}}</option>
                    </select>
                    <select
                      v-model="citySelected"
                      v-if="cityL"
                      style="width:30%;display:inline-block;"
                      id="city"
                      required

                    >
                      <option disabled value="请选择城市">请选择城市</option>
                      <option
                        v-for="(item,index) in cityL"
                        :value="item.regionId"
                        :key="index"
                      >{{item.regionName}}</option>
                    </select>
                    <select
                      v-model="areaSelected"
                      v-if="areaL"
                      style="width:30%;display:inline-block;"
                      id="area"
                      required
                    >
                      <option disabled value="请选择城市">请选择区县</option>
                      <option
                        v-for="(item,index) in areaL"
                        :value="item.regionId"
                        :key="index"
                      >{{item.regionName}}</option>
                    </select>
                  </el-form-item>
                  <el-form-item label="详细地址:" prop="address" style="width:80%;display:block,">
                    <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
                  </el-form-item>
                  <p
                    style="text-align:left;font-weight:blod;float:left;width:100%;font-weight:blod;font-size:16px;"
                    class="typeTitle"
                  >
                    <b>联系人信息：</b>
                  </p>

                  <el-form-item label="联系人姓名：" prop="lxrName">
                    <el-input v-model="ruleForm.lxrName"></el-input>
                  </el-form-item>
                  <el-form-item label="联系人身份证号:" prop="lxrSfnumber">
                    <el-input v-model="ruleForm.lxrSfnumber"></el-input>
                  </el-form-item>

                  <el-form-item label="联系人电话/手机:" prop="lxrPhone">
                    <el-input v-model="ruleForm.lxrPhone"></el-input>
                  </el-form-item>
                  <el-form-item label="联系人与申请人的关系：" prop="gx">
                    <el-select
                      v-model="ruleForm.gx"
                      placeholder="请选择"
                      style="width:100%;float:left;"
                    >
                      <el-option label="自己" value="0"></el-option>
                      <el-option label="朋友" value="5"></el-option>
                      <el-option label="(表)兄弟姐妹" value="4"></el-option>
                      <el-option label="父母" value="2"></el-option>
                      <el-option label="子女" value="1"></el-option>

                      <el-option label="配偶" value="3"></el-option>
                      <el-option label="其它" value="6"></el-option>
                    </el-select>
                  </el-form-item>

                  <p
                    style="text-align:left;font-weight:blod;float:left;width:100%;font-weight:blod;font-size:16px;"
                    class="typeTitle"
                  >
                    <b>家庭医生：</b>
                  </p>

                  <el-form-item label="家庭医生姓名：" prop="docName">
                    <el-input v-model="ruleForm.docName"></el-input>
                  </el-form-item>
                  <el-form-item label="家庭医生联系方式:" prop="docPhone">
                    <el-input v-model="ruleForm.docPhone"></el-input>
                  </el-form-item>

                  <el-form-item label="单位:" prop="docAddress">
                    <el-input v-model="ruleForm.docAddress"></el-input>
                  </el-form-item>

                  <p
                    style="text-align:left;font-weight:blod;float:left;width:100%;font-weight:blod;font-size:16px;"
                    class="typeTitle"
                  >
                    <b>申请信息：</b>
                  </p>

                  <el-form-item label="评估类型：" prop="type">
                    <el-input v-model="ruleForm.type" readonly></el-input>
                  </el-form-item>
                  <el-form-item label="评估费用:" prop="money">
                    <el-input v-model="ruleForm.money" readonly></el-input>
                  </el-form-item>

                  <div style="float:left;border:1px solid #eee;width:84.8%;height:130px">
                    <p class="paddingTop10">
                      <b>相关资料图片：</b> 申请人身份证；代理人身份证；申请人户口页；代理人户口页；街道办、居委会、派出所开具的亲属关系证明；结婚证；社会保障卡；医疗文件等
                    </p>
                    <ul id="result" v-viewer></ul>
                  </div>
                  <el-form-item>
                    <el-button v-if="urlRole2!=0" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="工单信息">
            <div style="padding:20px;" class="gongdaninfo" id="gongdaninfo">
              <ul>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">申请人员:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input1"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">申请日期:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input2"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">分配人员:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input3"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">分配日期:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input4"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">指派人员:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input5"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">指派日期:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input6"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师A:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input7"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师B:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input8"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师A工号:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input9"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师B工号:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input10"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师A签到地址:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input11"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师B签到地址:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input12"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师A签到时间:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input13"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师B签到时间:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input14"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师A签出地址:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input15"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师B签出地址:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input16"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师A签出时间:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input17"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评估师B签出时间:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input18"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">集体评审:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input19"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
                <li>
                  <span style="display:block;font-weight:blod;width:22%;float:left;">评审日期:</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="input20"
                    :readonly="true"
                    style="width:60%;float:rigth;"
                    size="mini"
                  ></el-input>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="评估调查表">
            <el-tabs type="border-card" @tab-click="changetabs">
              <el-tab-pane :label="assessQuestionnaireA">
                <el-tabs type="border-card" v-model="activeName3" @tab-click="changetabs2">
                  <el-tab-pane
                    v-for="item in AForm"
                    :label="item.typeName"
                    :value="item.id"
                    :key="item.id"
                    :id="item.id"
                    :name="'id'+(item.id)"
                    :typeClass='item.typeClass'
                  ></el-tab-pane>
                </el-tabs>
              </el-tab-pane>
              <el-tab-pane :label="assessQuestionnaireB">
                <el-tabs type="border-card" v-model="activeName2" @tab-click="changetabs2">
                  <el-tab-pane
                    v-for="item in BForm"
                    :label="item.typeName"
                    :value="item.id"
                    :key="item.id"
                    :name="'id'+(item.id)"
                    :id="item.id"
                    :typeClass='item.typeClass'
                  ></el-tab-pane>
                </el-tabs>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="结果告知书">
            <div v-if="complete" style="overflow:auto;height:900px;">
              <div el-col span="24" style="text-align:center;" v-if="this.orderLevel!='null'">
                <el-button
                  type="primary"
                  icon="el-icon-printer"
                  size="small"
                  @click.stop="printReport"
                >打印</el-button>
              </div>
              <div v-if="this.orderLevel=='null'" style="font-size:25px;">评估尚未完成</div>
              <div v-else-if="this.orderLevel<4">
                <div class="print_page print_page2">
                  <div class="header"></div>
                  <h1>义乌市长期护理保险统一需求评估结果告知书</h1>
                  <div class="page_550" style="text-align:left;">
                    <p style="text-align:left;">
                      <u>{{this.appleyUserName}}</u>
                      <u>同志：</u>
                    </p>
                    <p
                      class="content"
                    >经评估，你目前的身体状况未达到《义乌市人民政府办公室印发关于建立长期护理保险制度意见（试行）的通知》（善政办发[2016]188号）与《义乌市长期护理保险统一需求评估实施办法（试行）》规定的重度失能标准，故暂无法享受长期护理保险待遇。特此告知！</p>
                    <p
                      class="content"
                    >若对评估结果有异议的，在收到评估结果告知书之日起30天内，可通过村（社区）长期护理保险受理窗口提出复评申请。若今后因身体状况和生活自理能力发生明显变化的，可再次申请评估，费用自理。</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p class="t_r">
                      义乌市长期护理保险失能评估委员会
                      <br>
                      <u>&nbsp;{{printDate}}&nbsp;</u>
                    </p>
                  </div>
                  <div class="footer"></div>
                </div>
              </div>
              <div style="overflow:auto" v-else-if="this.orderLevel==5 || this.orderLevel==4">
                <div class="print_page print_page2" style="overflow:auto">
                  <div class="header"></div>
                  <h1>义乌市长期护理保险统一需求评估结果告知书</h1>
                  <div class="page_550" style="text-align:left;">
                    <p style="text-align:left;">
                      <u>{{this.appleyUserName}}</u>同志：
                    </p>
                    <p class="content">你所申请的长期护理保险统一需求评估结果如下：</p>
                    <p class="content">
                      失能等级
                      <u>{{this.orderLevel}}</u>，属重度失能。
                    </p>
                    <p class="content">
                      可享受长期护理保险护理方式为
                      <u>居家上门护理、养老机构护理</u>。
                    </p>
                    <p class="content">
                      待遇享受有效期为
                      <u>&nbsp;&nbsp;&nbsp;&nbsp;{{effectiveStartDate}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>至
                      <u>&nbsp;&nbsp;{{effectiveEndDate}}&nbsp;&nbsp;&nbsp;</u>
                    </p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p class="t_r">
                      义乌市长期护理保险失能评估委员会
                      <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <u>&nbsp;&nbsp;&nbsp;{{assessmentDate}}&nbsp;&nbsp;&nbsp;&nbsp;</u>
                    </p>
                  </div>
                  <div class="footer"></div>
                </div>
                <div class="print_page" style="text-align:left;height:1180px;">
                  <div class="header"></div>
                  <h3 style="font-size: 18px;padding: 10px 0;">待遇享受须知：</h3>
                  <ol type="一">
                    <li>本告知书须通过参保人居住地所在村（社区）的民政受理窗口进行为期7天的公示。</li>
                    <li>请妥善保管本告知书，办理各项待遇享受时必须向定点护理机构出示。</li>
                    <li>符合享受长期护理保险待遇条件的参保人员选择入住定点护理机构的，凭社会保障市民卡、本告知书，到定点护理机构办理入住手续。</li>
                    <li>符合享受长期护理保险待遇条件的参保人员选择居家接受定点护理机构提供上门护理服务的，凭社会保障市民卡、本告知书等资料，与定点护理机构签订护理服务合约，明确相关服务项目、服务内容、服务价格、服务频次、服务时间及双方的权利、义务和责任免除等条款。</li>
                    <li>参保人员仅能在其失能等级相对应的护理服务方式间转换，其本人或代理人应及时至村（社区）民政受理窗口填报变更申请。</li>
                    <li>评估结果符合长期护理保险待遇，且目前已在享受养老服务补贴、重度残疾人护理补贴及其他规定不能同时享受的社会福利补贴的申请人，须及时至镇（街道）办理相关手续，即在两项待遇享受中选择一项作为其今后享受的保障待遇。</li>
                    <li>申请人对评估结果有异议的，在接到评估结果告知书的30天内可通过受理渠道提出复核申请。</li>
                    <li>长期护理保险评估结果的有效期最长为2年。享受长期护理服务的参保人员，应在评估有效期满前的30天内向受理渠道提出期末评估的书面申请。期末评估流程参照初次评估流程，评估期间可继续享受原长期护理保险待遇。</li>
                    <li>在评估结果有效期内，符合下列情况的，可申请进行状态评估：一是经评估，对达到评估等级为五级及以上、按规定可享受长期护理保险护理服务的参保人员，评估人员预计其状态在一定时间内有较大改善的，评估机构在评估报告中记录相关信息，并告知评估对象适时需进行状态评估。二是享受长期护理保险护理服务的参保人员，因身体状况和生活自理能力发生明显变化等，可申请状态评估。三是状态评估流程参照初次评估流程，评估期间如原评估报告仍在有效期内则可继续享受原长期护理保险待遇。</li>
                    <li>申请长期护理保险统一需求评估服务的评估费标准为每人每次280元。参保人员首次申请长期护理保险统一需求评估或期末评估，评估费由财政给予全额补贴；状态评估根据谁主张谁付费的原则处理；参保人员申请复核评估，评估费自理；城乡最低生活保障家庭、低保边缘户一类家庭中的残疾人员申请复评或状态评估，所产生的评估费由县财政承担，每年不超过2次。</li>
                    <li>未尽事宜请致电义乌市长期护理保险业务管理中心进行咨询，联系电话：0573-84695500</li>
                  </ol>
                  <p>
                    镇（街道）长期护理保险受理窗口电话：
                    <br>
                  </p>
                  <p
                    class="content"
                  >魏塘：0573-84127198&nbsp;&nbsp;&nbsp;罗星：0573-89101135&nbsp;&nbsp;&nbsp;&nbsp;大云：0573-84667605</p>
                  <p
                    class="content"
                  >姚庄：0573-84738813&nbsp;&nbsp;&nbsp;西塘：0573-84569421&nbsp;&nbsp;&nbsp;&nbsp;天凝：0573-84911670&nbsp;</p>
                  <p
                    class="content"
                  >陶庄：0573-89107126&nbsp;&nbsp;&nbsp;干窑：0573-89105102&nbsp;&nbsp;&nbsp;&nbsp;开发区（惠民）：0573-84645261</p>
                  <p align="center">&nbsp;</p>
                  <div class="footer"></div>
                </div>
              </div>
              <div style="overflow:auto" v-else>
                <div class="print_page print_page2">
                  <div class="header"></div>
                  <h1>义乌市长期护理保险统一需求评估结果告知书</h1>
                  <div class="page_550" style="text-align:left;padding:0px;">
                    <p style="text-align:left;">
                      <u>{{this.appleyUserName}}</u>同志：
                      <strong></strong>
                    </p>
                    <p class="content" style="line-height:20px;height:20px;">你所申请的长期护理保险统一需求评估结果如下：</p>
                    <p class="content" style="line-height:20px;height:20px;">
                      失能等级
                      <u>6级</u>，属重度失能。
                    </p>
                    <p class="content" style="line-height:20px;height:40px;">
                      可享受长期护理保险护理方式为
                      <u>居家上门护理、养老机构护理</u>，符合以下情形之一，可享受医疗机构护理：
                    </p>
                    <p
                      class="content"
                      style="line-height:20px;height:40px;"
                    >1、因病情需要长期保留胃管、气管套管、胆道外引流管、造瘘管、深静脉置换管等各种管道的；</p>
                    <p
                      class="content"
                      style="line-height:20px;height:20px;"
                    >2、需要长期依靠呼吸机等医疗设备维持生命体征的；</p>
                    <p
                      class="content"
                      style="line-height:20px;height:20px;"
                    >3、因各种原因导致昏迷，短期住院治疗不能好转的；</p>
                    <p
                      class="content"
                      style="line-height:20px;height:40px;"
                    >4、患各种严重不可逆型疾病且全身瘫痪、偏瘫、截瘫并且生活不能自理，需要长期支持治疗的；</p>
                    <p class="content" style="line-height:20px;height:20px;">5、疾病终末期临终关怀的。</p>
                    <p class="content" style="line-height:20px;height:20px;">
                      待遇享受有效期为
                      <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>
                      <u>&nbsp;&nbsp;{{effectiveStartDate}}&nbsp;&nbsp;&nbsp;</u>至
                      <u>&nbsp;&nbsp;{{effectiveEndDate}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>
                    </p>
                    <p>&nbsp;</p>
                    <p class="t_r">
                      &nbsp;&nbsp;义乌市长期护理保险失能评估委员会
                      <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <u>&nbsp;&nbsp;&nbsp;&nbsp;{{assessmentDate}}&nbsp;&nbsp;</u>
                    </p>
                  </div>
                  <div class="footer"></div>
                </div>
                <div class="print_page" style="text-align:left;height:1180px;">
                  <div class="header"></div>
                  <h3 style="font-size: 18px;padding: 10px 0;">待遇享受须知：</h3>
                  <ol type="一">
                    <li>本告知书须通过参保人居住地所在村（社区）的民政受理窗口进行为期7天的公示。</li>
                    <li>请妥善保管本告知书，办理各项待遇享受时必须向定点服务机构出示。</li>
                    <li>符合享受长期护理保险待遇条件的参保人员选择入住定点服务机构的，凭社会保障市民卡、本告知书，到定点服务机构办理入住手续。其中入住医疗机构护理床位接受护理服务的，必须符合本告知书中列明的5种情形之一。</li>
                    <li>符合享受长期护理保险待遇条件的参保人员选择居家接受定点服务机构提供上门护理服务的，凭社会保障市民卡、本告知书等资料，与定点服务机构签订护理服务合约，明确相关服务项目、服务内容、服务价格、服务频次、服务时间及双方的权利、义务和责任免除等条款。</li>
                    <li>参保人员仅能在其失能等级相对应的护理服务方式间转换，其本人或代理人应及时至村（社区）民政受理窗口填报变更申请。</li>
                    <li>评估结果符合长期护理保险待遇，且目前已在享受养老服务补贴、重度残疾人护理补贴及其他规定不能同时享受的社会福利补贴的申请人，须及时至镇（街道）办理相关手续，即在两项待遇享受中选择一项作为其今后享受的保障待遇。</li>
                    <li>申请人对评估结果有异议的，在接到评估结果告知书的30天内可通过受理渠道提出复核申请。</li>
                    <li>长期护理保险评估结果的有效期最长为2年。享受长期护理服务的参保人员，应在评估有效期满前的30天内向受理渠道提出期末评估的书面申请。期末评估流程参照初次评估流程，评估期间可继续享受原长期护理保险待遇。</li>
                    <li>在评估结果有效期内，符合下列情况的，可申请进行状态评估：一是经评估，对达到评估等级为五级及以上、按规定可享受长期护理保险护理服务的参保人员，评估人员预计其状态在一定时间内有较大改善的，评估机构在评估报告中记录相关信息，并告知评估对象适时需进行状态评估。二是享受长期护理保险护理服务的参保人员，因身体状况和生活自理能力发生明显变化等，可申请状态评估。三是状态评估流程参照初次评估流程，评估期间如原评估报告仍在有效期内则可继续享受原长期护理保险待遇。</li>
                    <li>申请长期护理保险统一需求评估服务的评估费标准为每人每次280元。参保人员首次申请长期护理保险统一需求评估或期末评估，评估费由财政给予全额补贴；状态评估根据谁主张谁付费的原则处理；参保人员申请复核评估，评估费自理；城乡最低生活保障家庭、低保边缘户一类家庭中的残疾人员申请复评或状态评估，所产生的评估费由县财政承担，每年不超过2次。</li>
                    <li>未尽事宜请致电义乌市长期护理保险业务管理中心进行咨询，联系电话：0573-84695500</li>
                  </ol>
                  <p>镇（街道）长期护理保险受理窗口电话：</p>
                  <p>
                    魏塘：0573-84127198&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;罗星：0573-89101135&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大云：0573-84667605
                    <br>姚庄：0573-84738813&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;西塘：0573-84569421&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;天凝：0573-84911670&nbsp;
                    <br>陶庄：0573-89107126&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;干窑：0573-89105102&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开发区（惠民）：0573-84645261
                  </p>
                  <div class="footer"></div>
                </div>
              </div>
            </div>
            <div v-else>评估尚未完成</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vueArea from "vue-area";


export default {
  data() {
    return {
      // 省市区相关
      provinceSelected: "",
      citySelected: "",
      areaSelected: "",
      provinceL: [],
      cityL: [],
      areaL: [],
      city: [],
      provinceName: null,
      cityName: null,
      areaName: null,

      complete: true,

      activeNames: ["1"],
      selected: null,
      //申请信息相关表单
      ruleForm: {
        name: null,
        sex: null,
        sfnumber: null,
        birthTime: null,
        sbnumber: null,
        phone: null,
        isSpecial: null,
        isDes: null,
        area: null,
        address: null,
        lxrName: null,
        lxrSfnumber: null,
        lxrPhone: null,
        gx: 0 + "",
        docName: null,
        docPhone: null,
        docAddress: null,
        type: null,
        money: null
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        sfnumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        birthTime: [
          { required: true, message: "请选择出生日期", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入联系地址", trigger: "blur" }
        ],
        lxrName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        lxrSfnumber: [
          { required: true, message: "请输入联系人身份证号", trigger: "blur" }
        ],
        lxrPhone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" }
        ],
        gx: [
          { required: true, message: "请选择与申请人关系", trigger: "blur" }
        ],
        type: [{ required: true, message: "请输入评估类型", trigger: "blur" }],
        money: [{ required: true, message: "请输入评估费用", trigger: "blur" }]
      },

      // 工单信息里面的输入
      input1: null,
      input2: null,
      input3: null,
      input4: null,
      input5: null,
      input6: null,
      input7: null,
      input8: null,
      input9: null,
      input10: null,
      input11: null,
      input12: null,
      input13: null,
      input14: null,
      input15: null,
      input16: null,
      input17: null,
      input18: null,
      input19: null,
      input20: null,

      //
      // A，B表名
      assessQuestionnaireA:'长期护理保险失能等级评估调查表(A卷)',
      assessQuestionnaireB:'长期护理保险失能等级评估调查表(B卷)',
      AForm: [],
      BForm: [],
      activeName2: '参保人意愿及健康状况',
      activeName3: 'id46',

      //
      MyDataHtml:'<div></div>',
      dataHtml: null,
      dataJiBen: null,
      dataOldMan: null,
      dataSick: null,
      dataSport: null,
      mentalData: null,
      hospitalData: null,
      socialData: null,
      selfData: null,
      addItems: null, //补充事项
      // 用函数获取题目的data
      questionAllData: null,

      // 评估结果打印
      effectiveStartDate: null,
      effectiveEndDate: null,
      assessmentDate: null,
      printDate:null,

      // 省市区
      city: null,

      // 权限管理
      urlRole2: 0,

      // 工单详情localStorage存储
      orderLevel: null,
      appleyUserName: null,

      // 省市区计数
      provinceCount:1,
      cityCount:1
    };
  },
  components: {
    vueArea: vueArea
  },
  watch: {
    provinceSelected: function() {
      this.provinceCount++;
      // console.log(this.city,this.provinceSelected)
      if(this.city){
        for (var item of this.city) {
          if (item.regionId == this.provinceSelected) {
            this.provinceName = item.regionName;
          }
        }
      }

      // console.log(this.provinceName)
      this.$axios({
        url: `${this.$store.state.globalRouter}/get_regions?parentId=${
          encodeURI(this.provinceSelected)
        }`,
        method: "get"
      }).then(res => {
        // console.log(res)
        this.cityL = res.data;
      });

      this.areaL = [];
      if(this.provinceCount>2){
        this.cityName=null;
        this.areaName=null;
      }


    },
    citySelected: function() {
      this.cityCount++;
      //   console.log(this.citySelected)
      for (var item of this.cityL) {
        if (item.regionId == this.citySelected) {
          this.cityName = item.regionName;
        }
      }
      this.$axios({
        url: `${this.$store.state.globalRouter}/get_regions?parentId=${
          encodeURI(this.citySelected)
        }`,
        method: "get"
      }).then(res => {
        // console.log(res)
        this.areaL = res.data;
      });
      if(this.cityCount>2){
        this.areaName=null;
      }


    },
    areaSelected: function() {
      for (var item of this.areaL) {
        if (item.regionId == this.areaSelected) {
          this.areaName = item.regionName;
        }
      }
    }
  },
  created() {
    // console.log(province)
    this.$axios({
      url: `${this.$store.state.globalRouter}/get_provinces`,
      method: "get"
    }).then(res => {
      this.provinceL = res.data;
    });
    // 获取省市区
    //localhost:8088/insurance-intact-cms/get_provinces
    this.$axios({
      url: `${this.$store.state.globalRouter}/get_provinces`,
      method: "get"
    }).then(res => {
      this.city = res.data;
      // console.log('city',this.city)
    });
  },
  methods: {
    back() {
      // 跳转回主页面时，分页会出错，所以回去前要置为空
      (this.$store.state.orderNoInfo = ""),
        (this.$store.state.selectStatus = ""),
        (this.$store.state.appleyUserName = ""),
        (this.appleyUserName = null),
        (this.$store.state.contactName = ""),
        (this.$store.state.idcard = ""),
        (this.$store.state.assessNameLike = ""),
        (this.$store.state.addressLike = ""),
        this.$router.push({ path: "/order_mng" });
    },
    printReport() {
      var orderLevel = window.localStorage.getItem("orderLevel");
      var orderNo = window.localStorage.getItem("orderNo");
      if (orderLevel && orderLevel != null && orderLevel != "null") {
        if (orderLevel == 6) {
          let addr = `${
            this.$store.state.globalRouter
          }/auth/assess/basic_info_mng/download_assess_result_six?orderNo=${orderNo}`;
          window.location.href = addr;
        } else if (orderLevel == 5 || orderLevel==4) {
          let addr = `${
            this.$store.state.globalRouter
          }/auth/assess/basic_info_mng/download_assess_result_five?orderNo=${orderNo}`;
          window.location.href = addr;
        } else {
          let addr = `${
            this.$store.state.globalRouter
          }/auth/assess/basic_info_mng/download_assess_result_fail?orderNo=${orderNo}`;
          window.location.href = addr;
        }
      } else {
        alert("该参保人评估尚未完成,不可打印");
      }

      // let addr = `${
      //   this.$store.state.globalRouter
      // }/auth/assess/basic_info_mng/assessment_questionnaire_b_excel_out`;
      // window.location.href = addr;
      // http://192.168.1.187:4280/insurance-intact-cms/auth/assess/basic_info_mng/download_assess_result_five?orderNo=1
      // // window.location.href = "<@sp.ctx />core/basic_info_mng.htm?act=downloadAssessResultSix&orderNo=" + ${orderNo};
      // alert("print");
    },

    handleChange(val) {
    },
    //申请信息表单相关
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.provinceName==null || this.cityName==null || this.areaName==null){
            alert('联系地区必填');
          }else{
              var data = {};
          data.orderNo = window.localStorage.getItem("orderNo");
          data.insUserIdCard = window.localStorage.getItem("insUserIdCard");
          data.fullname = this.ruleForm.name;
          data.idcard = this.ruleForm.sfnumber;
          data.birthday = this.ruleForm.birthTime;
          data.medicalInsuranceId = this.ruleForm.sbnumber;
          data.mobile = this.ruleForm.phone;
          data.special = this.ruleForm.isSpecial;
          (data.handicapped = this.ruleForm.isDes),
            // data.province           = this.$refs.area.selected
            // data.city               = this.$refs.area.citySelected
            // data.district           = this.$refs.area.areaSelected
            // data.regionProvince      = null,
            // data.regionCity          = '金华市'
            // data.regionDistrict      = '义乌市'

            (data.province = $("#province")[0].value + "-" + this.provinceName);
          data.city = $("#city")[0].value + "-" + this.cityName;
          data.district = $("#area")[0].value + "-" + this.areaName;
          data.appointedAddress = this.ruleForm.address;
          data.contactName = this.ruleForm.lxrName;
          data.contactIdcard = this.ruleForm.lxrSfnumber;
          data.contactPhone = this.ruleForm.lxrPhone;
          // 申请的关系没有
          data.relationshipInsUser = this.ruleForm.gx;
          data.familyDoctorName = this.ruleForm.docName;
          data.familyDoctorPhone = this.ruleForm.docPhone;
          data.familyDoctorCompany = this.ruleForm.docAddress;
          // data.assessType          = this.ruleForm.type
          // data.orderCost           = this.ruleForm.money
          // data.update              = 0
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/assess/basic_info_mng/save_apply_info`,
            method: "post",
            data: data
          }).then(res => {
            if (res.data.resultCode == "000000") {
              alert("保存成功");
            } else {
              alert("保存失败" + res.data.resultMsg);
            }
          });
          }


          // console.log(data)
          // console.log($('#province')[0].value+'-'+this.provinceName,$('#city')[0].value+'-'+this.cityName,$('#area')[0].value+'-'+this.areaName)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //
    changetabs2(event){
      if(event.$attrs.typeClass==1){

        var that = this;
        var myData = `<div style="padding:20px;height:800px;overflow:auto;"><el-form
                        :model           = "ruleForm1"
                        :rules           = "rules"
                          ref            = "ruleForm1"
                          label-width    = "220px"
                          class          = "demo-ruleForm"
                          size           = 'mini'
                          style          = "text-align:left;width:80%"
                          label-position = 'left'
                      >

                        <el-form-item
                          label = "1.姓名:"
                          prop  = "name"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-input style = "width:35.1%;float:left;margin-right:30px;" v-model="ruleForm1.name" readonly></el-input>
                          <div style='float:left;display:none'>照片：</div>
                          <div class="pgb_list" id="fullNamePhotoDiv" style="heigth:50px;float:left;display:none">
		        <div class="img_box">
              <ul class="img_list" id="fullNamePhotoUl">
              无
		        	</ul>
		        </div>
	        </div>


                        </el-form-item>

                        <el-form-item
                          label = "2.年龄:"
                          prop  = "age"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-input  style = "width:35.1%;float:left;" v-model="ruleForm1.age" readonly></el-input>
                        </el-form-item>
                        <el-form-item
                          label = "3.性别:"
                          prop  = "sex"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.sex"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "男"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "女"
                              value = "2"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "4.身高:"
                          prop  = "height"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-input style = "width:35.1%;float:left;" v-model="ruleForm1.height"></el-input>厘米
                        </el-form-item>
                        <el-form-item
                          label = "5.体重:"
                          prop  = "weight"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-input style = "width:35.1%;float:left;" v-model="ruleForm1.weight"></el-input>公斤
                        </el-form-item>
                        <el-form-item
                          label = "6.民族:"
                          prop  = "mz"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.mz"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "汉族"
                              value = "01"
                            ></el-option>

				<el-option value="02" label="蒙古族"></el-option>
				<el-option value="03" label="回族"></el-option>
				<el-option value="04" label="藏族"></el-option>
				<el-option value="05" label="维吾尔族"></el-option>
				<el-option value="06" label="苗族"></el-option>
				<el-option value="07" label="彝族"></el-option>
				<el-option value="08" label="壮族"></el-option>
				<el-option value="09" label="布依族"></el-option>
				<el-option value="10" label="朝鲜族"></el-option>
				<el-option value="11" label="满族"></el-option>
				<el-option value="12" label="侗族"></el-option>
				<el-option value="13" label="瑶族"></el-option>
				<el-option value="14" label="白族"></el-option>
				<el-option value="15" label="土家族"></el-option>
				<el-option value="16" label="哈尼族"></el-option>
				<el-option value="17" label="哈萨克族"></el-option>
				<el-option value="18" label="傣族"></el-option>
				<el-option value="19" label="黎族"></el-option>
				<el-option value="20" label="傈僳族"></el-option>
				<el-option value="21" label="佤族"></el-option>
				<el-option value="22" label="畲族"></el-option>
				<el-option value="23" label="高山族"></el-option>
				<el-option value="24" label="拉祜族"></el-option>
				<el-option value="25" label="水族"></el-option>
				<el-option value="26" label="东乡族"></el-option>
				<el-option value="27" label="纳西族"></el-option>
				<el-option value="28" label="景颇族"></el-option>
				<el-option value="29" label="柯尔克孜族"></el-option>
				<el-option value="30" label="土族"></el-option>
				<el-option value="31" label="达斡尔族"></el-option>
				<el-option value="32" label="仫佬族"></el-option>
				<el-option value="33" label="羌族"></el-option>
				<el-option value="34" label="布朗族"></el-option>
				<el-option value="35" label="撒拉族"></el-option>
				<el-option value="36" label=毛难族""></el-option>
				<el-option value="37" label="仡佬族"></el-option>
				<el-option value="38" label="锡伯族"></el-option>
				<el-option value="39" label="阿昌族"></el-option>
				<el-option value="40" label="普米族"></el-option>
				<el-option value="41" label="塔吉克族"></el-option>
				<el-option value="42" label="怒族"></el-option>
				<el-option value="43" label="乌孜别克族"></el-option>
				<el-option value="44" label="俄罗斯族"></el-option>
				<el-option value="45" label="鄂温克族"></el-option>
				<el-option value="46" label="崩龙族"></el-option>
				<el-option value="47" label="保安族"></el-option>
				<el-option value="48" label=裕固族""></el-option>
				<el-option value="49" label="京族"></el-option>
				<el-option value="50" label="塔塔尔族"></el-option>
				<el-option value="51" label="独龙族"></el-option>
				<el-option value="52" label="鄂伦春族"></el-option>
				<el-option value="53" label="赫哲族"></el-option>
				<el-option value="54" label="门巴族"></el-option>
				<el-option value="55" label="珞巴族"></el-option>
				<el-option value="56" label="基诺族"></el-option>
				<el-option value="97" label="其他">其他</el-option>
				<el-option value="98" label="外国血统">外国血统</el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "7.是否为本地居民:"
                          prop  = "isLocal"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.isLocal"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "是"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "否"
                              value = "2"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "8.户籍情况："
                          prop  = "huji"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.huji"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "城镇"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "农村"
                              value = "2"
                            ></el-option>
                            <el-option
                              label = "其它"
                              value = "3"
                            ></el-option>
                          </el-select>
                          <div style="width:35.1%;float:left;margin-left:10px;">
                          <el-input
                            v-model     = "ruleForm1.isHujiOther"
                            placeholder = "请输入内容"
                            v-show      = "ruleForm1.huji==3"
                            size = "mini"
                          ></el-input>
                          </div>

                        </el-form-item>
                        <el-form-item
                          label = "9.是否为民政部门认定的低保低收入人群："
                          prop  = "isPoor"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.isPoor"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "低保"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "低收入"
                              value = "2"
                            ></el-option>
                            <el-option
                              label = "其它"
                              value = "3"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "10.是否为“失独”家庭："
                          prop  = "isAlone"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.isAlone"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "否"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "是"
                              value = "2"
                            ></el-option>
                            <el-option
                              label = "其它"
                              value = "3"
                            ></el-option>
                          </el-select>
                          <div style="width:35.1%;float:left;margin-left:10px;">
                          <el-input
                            v-model     = "ruleForm1.isAloneOther"
                            placeholder = "请输入内容"
                            v-show      = "ruleForm1.isAlone==3"
                            size = "mini"
                          ></el-input>
                          </div>
                        </el-form-item>
                        <div style="width:100%;border-bottom:1px solid #ececec;margin-top:-15px;margin-bottom:10px;"></div>
                        <el-form-item
                          label = "11.文化程度："
                          prop  = "cluture"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.cluture"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "文盲"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "小学"
                              value = "2"
                            ></el-option>
                            <el-option
                              label = "初中"
                              value = "3"
                            ></el-option>
                            <el-option
                              label = "高中"
                              value = "4"
                            ></el-option>
                            <el-option
                              label = "大学及以上"
                              value = "5"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "12.主要经济来源："
                          prop  = "moneyFrom"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.moneyFrom"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "退休金"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "子女补贴"
                              value = "2"
                            ></el-option>
                            <el-option
                              label = "亲友资助"
                              value = "3"
                            ></el-option>
                            <el-option
                              label = "其它补贴"
                              value = "4"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "13.医保类别："
                          prop  = "ybType"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.ybType"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "职工医保"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "城乡居民医保"
                              value = "2"
                            ></el-option>
                          </el-select>
                          <div style='float:left;'>医保类别照片：</div>
                          <div class="pgb_list" id="medicalInseCategoryPhotoDiv" style="heigth:50px;float:left;">
		        <div class="img_box">
		        	<ul class="img_list" id="medicalInseCategoryPhotoUl">
		        	</ul>
		        </div>
	        </div>

                        </el-form-item>

                        <el-form-item
                          label = "14.居住地址："
                          prop  = 'address'
                          style = "width:80%;display:block;"
                        >
                          <div style="padding-bottom:10px">
                          <select v-model="selected" autofocus v-if="provinceL" style="width:30%;display:inline-block;">
      <option disabled value="请选择城市">请选择城市</option>
      <option v-for="(item,index) in provinceL" :value="item.regionId">{{item.regionName}}</option>
    </select>
    <select v-model="citySelected" v-if="cityL" style="width:30%;display:inline-block;">
      <option disabled value="请选择城市">请选择城市</option>
      <option v-for="(item,index) in cityL" :value="item.regionId">{{item.regionName}}</option>
    </select>
    <select v-model="areaSelected" v-if="areaL" style="width:30%;display:inline-block;">
      <option disabled value="请选择城市">请选择区县</option>
      <option v-for="(item,index) in areaL" :value="item.regionId">{{item.regionName}}</option>
    </select></div><div>
    <p style="float:left;display:inline;">详细地址：</p><el-input
                            v-model     = "ruleForm1.address"
                            placeholder = "请输入详细地址"
                            style       = "width:80%;float:left;"
                          ></el-input>

    </div>

                        </el-form-item>

                        <el-form-item
                          label = "15.现住场所："
                          prop  = "live"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.live"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "自有产权房、私房等"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "各种租赁房等"
                              value = "2"
                            ></el-option>
                            <el-option
                              label = "养老院或类似机构"
                              value = "3"
                            ></el-option>
                            <el-option
                              label = "护理院或类似机构"
                              value = "4"
                            ></el-option>
                            <el-option
                              label = "社区卫生服务中心"
                              value = "5"
                            ></el-option>
                            <el-option
                              label = "医院或类似机构"
                              value = "6"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "16.语言使用："
                          prop  = "language"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.language"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "普通话"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "方言"
                              value = "2"
                            ></el-option>
                            <el-option
                              label = "不使用语音等其它情况"
                              value = "3"
                            ></el-option>
                          </el-select>
                          <div style="width:35.1%;float:left;margin-left:10px;">
                          <el-input
                            v-model     = "ruleForm1.languageOther"
                            placeholder = "请输入内容"
                            v-show      = "ruleForm1.language==2"
                            size = "mini"
                          ></el-input>
                          </div>



                        </el-form-item>


                        <el-form-item
                         label = "17.家属成员："
                          prop  = "peiou"
                          style = "width:80%;display:block;">
                        <div style="overflow:hidden">

                        <el-select
                            v-model     = "ruleForm1.peiou"
                            placeholder = "是否有配偶"
                            style       = "width:35.1%;float:left;"
                            size        = "mini"
                          >
                            <el-option
                              label = "有"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "无"
                              value = "2"
                            ></el-option>

                          </el-select>
                          <div style='width:35.1%;float:left;margin-left:10px;'>
                          <el-input
                            v-model     = "ruleForm1.peiouName"
                            placeholder = "请输入配偶姓名"
                            v-show      = "ruleForm1.peiou==1"
                            style       = "float:left;"
                            size        = "mini"
                          ></el-input>
                          </div>


                          <div style       = "width:80%;float:left;margin-top:5px;margin-bottom:5px;">尚在父母兄弟姐妹数：<input v-model="ruleForm1.number1" style="width:30px;height:26px;"></input>子女人数：<input v-model="ruleForm1.number2" style="width:30px;height:26px;"></input>孙辈人数：<input v-model="ruleForm1.number3" style="width:30px;height:26px;"></el></div>

                        </div>
                      </el-form-item>




                        <el-form-item
                          label = "18.和谁一起居住："
                          prop  = "liveWith"
                          style = "width:80%;display:block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.liveWith"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "独居"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "非独居"
                              value = "2"
                            ></el-option>
                          </el-select>
                          <el-radio-group v-model="ruleForm1.liveWithOther" v-show="ruleForm1.liveWith==2">

                            <el-radio :label="1">配偶</el-radio>
                            <el-radio :label="2">子女及其配偶</el-radio>
                            <el-radio :label="3">孙辈及其配偶</el-radio>
                            <el-radio :label="4">保姆及其它非亲属</el-radio>

                          </el-radio-group>
                        </el-form-item>
                        <el-form-item
                          label = "19.照顾人员："
                          prop  = "carePeople"
                          style = "width:80%;display:block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.carePeople"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "不需要"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "需要"
                              value = "2"
                            ></el-option>
                          </el-select>
                          <el-radio-group v-model="ruleForm1.carePeopleOther" v-show="ruleForm1.carePeople==2">
                            <el-radio :label="1">无</el-radio>
                            <el-radio :label="2">配偶</el-radio>
                            <el-radio :label="3">子女及其配偶</el-radio>
                            <el-radio :label="4">孙辈及其配偶</el-radio>
                            <el-radio :label="5">保姆及其它非亲属</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item
                          label = "20.所有亲属中，与评估对象距离最近的居住在："
                          prop  = "distance"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.distance"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "同一街道"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "同一区县"
                              value = "2"
                            ></el-option>
                            <el-option
                              label = "同一城市"
                              value = "3"
                            ></el-option>
                            <el-option
                              label = "外省市"
                              value = "4"
                            ></el-option>
                            <el-option
                              label = "境外"
                              value = "5"
                            ></el-option>
                            <el-option
                              label = "没有亲属"
                              value = "6"
                            ></el-option>

                          </el-select>
                        </el-form-item>
                        <div style="width:100%;border-bottom:1px solid #ececec;margin-top:-15px;margin-bottom:10px;"></div>
                        <el-form-item
                          label = "21.居住楼层："
                          style = "width:80%;display:block;"
                        >
                          第：<input v-model="ruleForm1.number4" style="width:30px;height:26px;"></input>层
                          共：<input v-model="ruleForm1.number5" style="width:30px;height:26px;"></input>层
                        </el-form-item>
                        <el-form-item
                          label = "22.楼层有无电梯："
                          prop  = "hasDianti"
                          style = "width:80%;display:block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.hasDianti"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "有"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "无"
                              value = "2"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "23.室内有无台阶："
                          prop  = "hasTaijie"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.hasTaijie"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "有"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "无"
                              value = "2"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "24.室内有无助老化改造："
                          prop  = "hasGaizhao"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.hasGaizhao"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "有"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "无"
                              value = "2"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "25.厕所："
                          prop  = "bathroom"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.bathroom"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "独用"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "合用"
                              value = "2"
                            ></el-option>
                            <el-option
                              label = "无"
                              value = "3"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "26.洗浴设备："
                          prop  = "shebei"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.shebei"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "独用"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "合用"
                              value = "2"
                            ></el-option>
                            <el-option
                              label = "无"
                              value = "3"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          label = "27.最近三个月，居住地址是否改变："
                          prop  = "changeLive"
                          style = "width: 80%;margin-right: 50px;display:inline-block;"
                        >
                          <el-select
                            v-model     = "ruleForm1.changeLive"
                            placeholder = "请选择"
                            style       = "width:35.1%;float:left;"
                          >
                            <el-option
                              label = "没有改变"
                              value = "1"
                            ></el-option>
                            <el-option
                              label = "改变"
                              value = "2"
                            ></el-option>
                          </el-select>
                          <div style="width:35.1%;float:left;margin-left:10px;">
                          <el-input
                            v-model     = "ruleForm1.changeLiveOther"
                            placeholder='来自何处'
                            v-show      = "ruleForm1.changeLive==2"
                            size        = "mini"
                            style       = "float:left;"
                          ></el-input>
                          </div>

                        </el-form-item>
                        <el-form-item
                          label = "28.在过去的3个月内，每天不支付费用的照护情况（不包括非服务时间）："
                          style = "width:80%;display:block;"
                          required
                        >
                          各类非付费照护提供人数：<input v-model="ruleForm1.number6" style="width:30px;height:26px;"></input>
                          累计时间<input v-model="ruleForm1.number7" style="width:30px;height:26px;"></input>小时/月
                        </el-form-item>
                        <el-form-item
                          label = "29.在过去的3个月内，每天要支付费用的照护情况（不包括非服务时间）："
                          style = "width:80%;display:block;"
                          required
                        >
                          各类要付费照护提供人数：<input v-model="ruleForm1.number8" style="width:30px;height:26px;"></input>
                          累计时间：<input v-model="ruleForm1.number9" style="width:30px;height:26px;"></input>小时/月
                          支付费用：<input v-model="ruleForm1.number10" style="width:60px;height:26px;"></input>元/月
                        </el-form-item>

                        <el-form-item style = "width: 100%;margin-right: 50px;display:inline-block;" v-if="urlRole2!=0">
                          <el-button
                            type   = "primary"
                            @click = "submitForm1('ruleForm1')"
                          >保存</el-button>

                        </el-form-item>
                      </el-form></div>`;

        event.$el.innerHTML = "";
        var MyComponent = Vue.extend({
          template: myData,
          data() {
            return {
              urlRole2: that.urlRole2,
              // 评估调查表--长期护理保险失能等级评估调查表(A卷)--居家信息
              tid: null,
              ruleForm1: {
                name: null,
                photo: null,
                age: null,
                sex: null,
                height: null,
                weight: null,
                mz: null,
                isLocal: "1",
                huji: null,
                isHujiOther:null,
                isPoor: null,
                isAlone: null,
                isAloneOther: null,
                cluture: null,
                moneyFrom: null,
                ybType: null,
                ybTypePhoto: null,
                area: null,
                address: null,
                live: null,
                language: null,
                languageOther:null,
                peiou: null,
                peiouName: null,
                number1: 0,
                number2: 0,
                number3: 0,
                liveWith: null,
                liveWithOther: null,
                carePeople: null,
                carePeopleOther: null,
                distance: null,
                number4: null,
                number5: null,
                hasDianti: null,
                hasTaijie: null,
                hasGaizhao: null,
                bathroom: null,
                shebei: null,
                changeLive: null,
                changeLiveOther: null,
                number6: null,
                number7: null,
                number8: null,
                number9: null,
                number10: null
              },
              rules: {
                name: [
                  { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                sex: [
                  { required: true, message: "请选择性别", trigger: "change" }
                ],
                age: [
                  { required: true, message: "请输入年龄", trigger: "blur" }
                ],
                height: [
                  { required: true, message: "请填写身高", trigger: "blur" }
                ],
                weight: [
                  { required: true, message: "请填写体重", trigger: "blur" }
                ],
                mz: [
                  { required: true, message: "请选择民族", trigger: "change" }
                ],
                isLocal: [
                  {
                    required: true,
                    message: "请选择是否为本地居民",
                    trigger: "change"
                  }
                ],
                huji: [
                  {
                    required: true,
                    message: "请选择户籍信息",
                    trigger: "change"
                  }
                ],
                isPoor: [
                  {
                    required: true,
                    message: "请选择是否低收入人群",
                    trigger: "change"
                  }
                ],
                isAlone: [
                  {
                    required: true,
                    message: "请选择是否失独",
                    trigger: "change"
                  }
                ],
                isAloneOther: [
                  {
                    required: true,
                    message: "请填写失独信息",
                    trigger: "blur"
                  }
                ],
                cluture: [
                  {
                    required: true,
                    message: "请选择文化程度",
                    trigger: "change"
                  }
                ],
                moneyFrom: [
                  {
                    required: true,
                    message: "请选择主要收入来源",
                    trigger: "change"
                  }
                ],
                ybType: [
                  {
                    required: true,
                    message: "请选择医保类别",
                    trigger: "change"
                  }
                ],
                // area      : [{ required: true, message: "", trigger: "blur" }],
                address: [
                  { required: true, message: "请输入详细地址", trigger: "blur" }
                ],
                live: [
                  { required: true, message: "选择现居场所", trigger: "change" }
                ],
                language: [
                  { required: true, message: "选择使用语言", trigger: "change" }
                ],
                languageOther: [
                  {
                    required: true,
                    message: "请填写语言信息",
                    trigger: "blur"
                  }
                ],
                peiou: [
                  {
                    required: true,
                    message: "选择是否有配偶",
                    trigger: "change"
                  }
                ],
                liveWith: [
                  {
                    required: true,
                    message: "选择和谁一起居住",
                    trigger: "change"
                  }
                ],
                carePeople: [
                  { required: true, message: "选择照顾人员", trigger: "change" }
                ],
                distance: [
                  {
                    required: true,
                    message: "选择与亲属距离",
                    trigger: "change"
                  }
                ],
                hasDianti: [
                  { required: true, message: "选择有无电梯", trigger: "change" }
                ],
                hasTaijie: [
                  { required: true, message: "选择有无台阶", trigger: "change" }
                ],
                hasGaizhao: [
                  {
                    required: true,
                    message: "有无助老化改造",
                    trigger: "change"
                  }
                ],
                bathroom: [
                  { required: true, message: "有无测试", trigger: "change" }
                ],
                shebei: [
                  { required: true, message: "有无洗浴设备", trigger: "change" }
                ],
                changeLive: [
                  {
                    required: true,
                    message: "居住地址是否改变",
                    trigger: "change"
                  }
                ]
              },

              // 省市联动写在这里是因为this与that的指向问题
              msg: "省市联动",
              selected: "",
              citySelected: "",
              areaSelected: "",
              provinceL: [],
              cityL: [],
              areaL: [],
              city: [],
              cityChange: null,
              provinceName: null,
              cityName: null,
              areaName: null,

              // 省市区计数
              provinceCount1:1,
              cityCount1:1
            };
          },
          components: {
            vueArea: vueArea
          },
          methods: {
            submitForm1(formName) {
              this.$refs[formName].validate(valid => {
                if (valid) {
                 if(this.provinceName==null || this.cityName==null || this.areaName==null){
                   alert('居住地址必填！')

                 }else{
                   var obj1 = {
                    orderNo: window.localStorage.getItem("orderNo"),
                    tid: this.tid,
                    fullName: this.ruleForm1.name,
                    sex: this.ruleForm1.sex,
                    age: this.ruleForm1.age,
                    height: this.ruleForm1.height,
                    weight: this.ruleForm1.weight,
                    nation: "01",
                    // isLocal有问题,需要特别注意
                    localResidents: this.ruleForm1.isLocal + "",
                    censusRegister: this.ruleForm1.huji,
                    censusRegisterOther: this.ruleForm1.isHujiOther,
                    lowIncomePeople: this.ruleForm1.isPoor,
                    bereavedParents: this.ruleForm1.isAlone,
                    bereavedParentsOther: this.ruleForm1.isAloneOther,
                    degreeOfEducation: this.ruleForm1.cluture,
                    mainEconomicSources: this.ruleForm1.moneyFrom,
                    medicalInseCategory: this.ruleForm1.ybType,
                    medicalInseCategoryOther: null,
                    residentialProvince:
                      this.selected + "-" + this.provinceName,
                    residentialCity: this.citySelected + "-" + this.cityName,
                    residentialDistrict:
                      this.areaSelected + "-" + this.areaName,
                    residentialAddress: this.ruleForm1.address,
                    livingPlace: this.ruleForm1.live,
                    commonLanguage: this.ruleForm1.language,
                    commonLanguageOther: this.ruleForm1.languageOther,
                    familyMbersType: this.ruleForm1.peiou,
                    familyMbersSpouse: this.ruleForm1.peiouName,
                    familyMbersSisterNum: this.ruleForm1.number1,
                    familyMbersChildNum: this.ruleForm1.number2,
                    familyMbersGsonNum: this.ruleForm1.number3,
                    // "familyMbersSisterNum" : 0,
                    // "familyMbersChildNum"  : 0,
                    // "familyMbersGsonNum"   : 0,
                    livesTogether: this.ruleForm1.liveWith,
                    livesTogetherPeople:this.ruleForm1.liveWithOther,
                    careWorkers: this.ruleForm1.carePeople,
                    careWorkersOther:this.ruleForm1.carePeopleOther,
                    relativesLiveTogether: this.ruleForm1.distance,
                    floorCurr: this.ruleForm1.number4,
                    floorTotal: this.ruleForm1.number5,
                    haveElevator: this.ruleForm1.hasDianti,
                    haveSteps: this.ruleForm1.hasTaijie,
                    indoorChange: this.ruleForm1.hasGaizhao,
                    toilet: this.ruleForm1.bathroom,
                    bathEquipment: this.ruleForm1.shebei,
                    addressChange: this.ruleForm1.changeLive,
                    addressChangeOther: this.ruleForm1.changeLiveOther,
                    nurseNoPayPerson: this.ruleForm1.number6,
                    nurseNoPayTimes: this.ruleForm1.number7,
                    nursePayPerson: this.ruleForm1.number8,
                    nursePayTimes: this.ruleForm1.number9,
                    nursePayMoney: this.ruleForm1.number10,
                    careWorkersOther: this.ruleForm1.carePeopleOther,
                    livesTogetherPeople: this.ruleForm1.liveWithOther

                    // update: 1,
                  };

                  // console.log("666", obj1, this.ruleForm1);
                  this.$axios({
                    url: `${
                      that.$store.state.globalRouter
                    }/auth/assess/basic_info_mng/save_basic`,
                    method: "post",
                    data: obj1
                  }).then(res => {
                    // console.log("保存基本信息", res);
                    if (res.data.resultCode == "000000") {
                      alert("保存成功");
                    } else {
                      if(res.data.data){
                        alert("保存失败:  " + res.data.data+','+res.data.resultMsg);
                      }else{
                        alert("保存失败  " + res.data.resultMsg);
                      }

                    }
                  });
                 }
                } else {
                  console.log("error submit!!");
                  return false;
                }
              });
            },
            resetForm1(formName) {
              this.$refs[formName].resetFields();
            }

            //
          },
          watch: {
            selected: function() {
              // console.log(this.selected)
              this.provinceCount1++;
              for (var item of this.provinceL) {
                if (item.regionId == this.selected) {
                  this.provinceName = item.regionName;
                }
              }
              this.$axios({
                url: `${that.$store.state.globalRouter}/get_regions?parentId=${
                  encodeURI(this.selected)
                }`,
                method: "get"
              }).then(res => {
                // console.log(res)
                this.cityL = res.data;
                // console.log('11',this.cityChange)
              });

              this.areaL = [];
              if(this.provinceCount1>2){
                // alert('11')
                this.cityName=null;
                this.areaName=null;
              }

            },
            citySelected: function() {
              //   console.log(this.citySelected)
              this.cityCount1++;
              for (var item of this.cityL) {
                if (item.regionId == this.citySelected) {
                  // alert(this.cityName)
                  this.cityName = item.regionName;
                }
              }
              this.$axios({
                url: `${that.$store.state.globalRouter}/get_regions?parentId=${
                  encodeURI(this.citySelected)
                }`,
                method: "get"
              }).then(res => {
                // console.log(res)
                this.areaL = res.data;
              });
              if(this.cityCount1>2){
                 this.areaName=null;
              }
            },
            areaSelected: function() {
              for (var item of this.areaL) {
                if (item.regionId == this.areaSelected) {
                  this.areaName = item.regionName;
                }
              }
            }
          },
          created() {
            // console.log(province)
            this.$axios({
              url: `${that.$store.state.globalRouter}/get_provinces`,
              method: "get"
            }).then(res => {
              this.provinceL = res.data;
            });
          },
          mounted() {
            this.$axios({
              url: `${
                that.$store.state.globalRouter
              }/auth/assess/basic_info_mng/get_basic?orderNo=${encodeURI(window.localStorage.getItem(
                "orderNo"
              )) }`,
              method: "get"
            }).then(res => {
              var data = res.data.data[0];
              if(data.residentialProvince){
                this.provinceName = data.residentialProvince;
              }
              if(data.residentialCity){
                this.cityName = data.residentialCity;
              }
              if(data.residentialDistrict){
                this.areaName = data.residentialDistrict;
              }

              this.tid = data.tid;
              this.ruleForm1.name = data.fullName;
              this.ruleForm1.sex = data.sex + "";
              this.ruleForm1.age = data.age;
              this.ruleForm1.height = data.height;
              this.ruleForm1.weight = data.weight;
              if (data.nation) {
                this.ruleForm1.mz = data.nation + "";
              }

              // this.ruleForm1.isLocal = data.localResidents;
              if(data.censusRegister) {
                this.ruleForm1.huji = data.censusRegister + "";
              }
              if (data.censusRegisterOther) {
                this.ruleForm1.isHujiOther = data.censusRegisterOther + "";
              }

              if (data.lowIncomePeople) {
                this.ruleForm1.isPoor = data.lowIncomePeople + "";
              }

              if (data.bereavedParents) {
                this.ruleForm1.isAlone = data.bereavedParents + "";
              }

              if (data.bereavedParentsOther) {
                this.ruleForm1.isAloneOther = data.bereavedParentsOther + "";
              }

              if (data.degreeOfEducation) {
                this.ruleForm1.cluture = data.degreeOfEducation + "";
              }
              if (data.mainEconomicSources) {
                this.ruleForm1.moneyFrom = data.mainEconomicSources + "";
              }
              if (data.medicalInseCategory) {
                this.ruleForm1.ybType = data.medicalInseCategory + "";
              }
              if (data.familyMbersChildNum) {
                this.ruleForm1.number2 = data.familyMbersChildNum;
              }
              if (data.familyMbersGsonNum) {
                this.ruleForm1.number3 = data.familyMbersGsonNum;
              }
              if (data.familyMbersSisterNum) {
                this.ruleForm1.number1 = data.familyMbersSisterNum;
              }
              if (data.familyMbersSpouse) {
                this.ruleForm1.peiouName = data.familyMbersSpouse;
              }


              this.ruleForm1.ybTypePhoto = data.medicalInseCategoryOther;
              for (var item of that.city) {
                if (item.regionName == data.residentialProvince) {
                  this.selected = item.regionId;
                }
              }

             if(this.selected){
                that
                .$axios({
                  url: `${
                    that.$store.state.globalRouter
                  }/get_regions?parentId=${encodeURI(this.selected)}`,
                  method: "get"
                })
                .then(res => {
                  for (var item of res.data) {
                    if (item.regionName == data.residentialCity) {
                      this.citySelected = item.regionId;
                      // console.log(this.citySelected)
                    }
                  }
                });
             }


                setTimeout(() => {
                  if(this.citySelected){
                      that
                  .$axios({
                    url: `${
                      that.$store.state.globalRouter
                    }/get_regions?parentId=${encodeURI(this.citySelected)}`,
                    method: "get"
                  })
                  .then(res => {
                    for (var item of res.data) {
                      if (item.regionName == data.residentialDistrict) {
                        this.areaSelected = item.regionId;
                      }
                    }
                  });
                  }
              }, 500);




              // 省市区
              // this.selected = data.residentialProvince;
              // this.citySelected = data.residentialCity;
              // this.areaSelected = data.residentialDistrict;

              this.ruleForm1.address = data.residentialAddress;
              if (data.livingPlace) {
                this.ruleForm1.live = data.livingPlace + "";
              }

              if (data.commonLanguage) {
                this.ruleForm1.language = data.commonLanguage + "";
              }
              if (data.commonLanguageOther) {
                this.ruleForm1.languageOther = data.commonLanguageOther + "";
              }

              if (data.familyMbersType) {
                this.ruleForm1.peiou = data.familyMbersType + "";
              }
              if (data.livesTogether) {
                this.ruleForm1.liveWith = data.livesTogether + "";
              }

              this.ruleForm1.liveWithOther = data.livesTogetherPeople;
              if (data.careWorkers) {
                this.ruleForm1.carePeople = data.careWorkers + "";
              }

              this.ruleForm1.carePeopleOther = data.careWorkersOther;
              if (data.relativesLiveTogether) {
                this.ruleForm1.distance = data.relativesLiveTogether + "";
              }

              this.ruleForm1.number5 = data.floorTotal;
              this.ruleForm1.number4 = data.floorCurr;
              if (data.haveElevator) {
                this.ruleForm1.hasDianti = data.haveElevator + "";
              }
              if (data.haveSteps) {
                this.ruleForm1.hasTaijie = data.haveSteps + "";
              }
              if (data.indoorChange) {
                this.ruleForm1.hasGaizhao = data.indoorChange + "";
              }
              if (data.toilet) {
                this.ruleForm1.bathroom = data.toilet + "";
              }
              if (data.bathEquipment) {
                this.ruleForm1.shebei = data.bathEquipment + "";
              }

              if (data.addressChange) {
                this.ruleForm1.changeLive = data.addressChange + "";
              }
              if(data.addressChangeOther){
                this.ruleForm1.changeLiveOther = data.addressChangeOther + "";
              }

              this.ruleForm1.number6 = data.nurseNoPayPerson;
              this.ruleForm1.number7 = data.nurseNoPayTimes;
              this.ruleForm1.number8 = data.nursePayPerson;
              this.ruleForm1.number9 = data.nursePayTimes;
              this.ruleForm1.number10 = data.nursePayMoney;

              if (
                data.fullNamePhoto &&
                data.fullNamePhoto != "" &&
                data.fullNamePhoto != null &&
                data.fullNamePhoto != "null"
              ) {
                var pics = data.fullNamePhoto.split(",");
                var html = "";
                for (var i = 0; i < pics.length; i++) {
                  var pic = pics[i];

                  html += `<li><img src='${
                    this.$store.state.globalIMGRouter
                  }/${pic}' style='cursor:pointer;'/></li>`;
                }
                // $("#fullNamePhotoUl").html(html);
              } else {
                // $("#fullNamePhotoDiv").html("<p>无</p>");
              }
              if (
                data.medicalInseCategoryPhoto &&
                data.medicalInseCategoryPhoto != "" &&
                data.medicalInseCategoryPhoto != null &&
                data.medicalInseCategoryPhoto != "null"
              ) {
                var pics = data.medicalInseCategoryPhoto.split(",");
                var html = "";
                for (var i = 0; i < pics.length; i++) {
                  var pic = pics[i];
                  html += `<li><img src='${
                    this.$store.state.globalIMGRouter
                  }/${pic}' style='cursor:pointer;'/></li>`;
                }
                $("#medicalInseCategoryPhotoUl").html(html);
              } else {
                $("#medicalInseCategoryPhotoDiv").html("<p>暂无</p>");
              }
            });
          }
        });
        $('.formbody').remove();
        var component = new MyComponent().$mount();
        event.$el.appendChild(component.$el);
        // this.$nextTick(() => {
        //   this.$refs.ruleForm1.clearValidate();
        // })
      }else if(event.$attrs.typeClass==2){
        $('.formbody').remove();
        var appleyUserId = window.localStorage.getItem("appleyUserId");
        var orderNo = window.localStorage.getItem("orderNo");
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/assess/basic_info_mng/basic_proj?orderNo=${encodeURI(orderNo)}&insUserId=${encodeURI(appleyUserId)}&packetId=%5Bobject%20HTMLInputElement%5D&urlRoles=%5Bobject%20HTMLInputElement%5D&questionTypeId=${encodeURI(event.$attrs.id)}`,
      method: "get"
    }).then(res => {
      var data = res.data.data.dto;
      this.MyDataHtml = `
	<div class="formbody" style='margin:0px 15px 0px;'>
        <form id="form0">
        <input name="orderNo" id="orderNo" type="hidden" value="${orderNo}" />
        <input name="questionTypeId" id="questionTypeId" type="hidden" value="${event.$attrs.id}" />
        <input name="size" id="size" type="hidden" value="${data.length}" />
        `;
      for (let j=0;j<data.length;j++) {
        var item=data[j];
        if (item.optionType == 1) {
          var arr = item.optionText.split("|");
          var title = `${item.sortNumber}.${item.title}`;
          this.MyDataHtml+=`<ul class="qa_list" style='list-style:none;text-align:left;margin:0;'><li style='border-bottom:1px solid rgb(238, 238, 238);'>
                    <h3 style='font-size:15px;padding-top:15px;padding-bottom:15px;margin:0;'>${item.sortNumber}.${item.title}</h3>
                    <input name="sortNumber${j+1}" type="hidden" value="${item.sortNumber}.${item.title}" />
                    <input name="qid${j+1}" type="hidden" value="${item.id}" />`
          if(item.answers){
            this.MyDataHtml+=`<input name="answerOld${j+1}" type="hidden" value="${item.answers}" />`
          }else{
             this.MyDataHtml+=`<input name="answerOld${j+1}" type="hidden" value="" />`
          }



           for (let i=0;i<arr.length;i++) {
            var list=arr[i];
            if (item.answers && i+1==item.answers) {
              this.MyDataHtml+=`<p style='font-size:14px;display:inline-block;line-height: 22px;padding:0px 10px 10px 10px;margin:0;'><input class="magic-radio" type="radio" name="a${j+1}" id="a${j+1}_${i+1}" value="${i+1}" checked="checked"><label for="a${j+1}_${i+1}">${arr[i]}</label></p><br/>`
            }else{
              this.MyDataHtml+=`<p style='font-size:14px;display:inline-block;line-height: 22px;padding:0px 10px 10px 10px;margin:0;'><input class="magic-radio" type="radio" name="a${j+1}" id="a${j+1}_${i+1}" value="${i+1}"><label for="a${j+1}_${i+1}">${arr[i]}</label></p><br/>`
            }
          }
          this.MyDataHtml+=`</li></ul>`
        }
        else if (item.optionType == 2) {
          var arr = item.optionText.split("|");
          var title = `${item.sortNumber}.${item.title}`;
          this.MyDataHtml+=`<ul class="qa_list" style='list-style:none;text-align:left;margin:0;'><li style='border-bottom:1px solid rgb(238, 238, 238);'>
                    <h3 style='font-size:15px;padding-top:15px;padding-bottom:15px;margin:0;'>${item.sortNumber}.${item.title}</h3>
                    <input name="sortNumber${j+1}" type="hidden" value="${item.sortNumber}.${item.title}" />
                    <input name="qid${j+1}" type="hidden" value="${item.id}" />`
                    if(item.answers){
                      this.MyDataHtml+=`<input name="answerOld${j+1}" type="hidden" value="${item.answers}" />`
                    }else{
                      this.MyDataHtml+=`<input name="answerOld${j+1}" type="hidden" value="" />`
                    }


           if(item.answers){
             var answers=item.answers.split(',');
           }

           for (let i=0;i<arr.length;i++) {
            var list=arr[i];
            // console.log($.inArray(i+1, answers),i+1,answers)
            if (item.answers && $.inArray(i+1+'', answers)!=-1) {
              this.MyDataHtml+=`<p style='font-size:14px;display:inline-block;line-height: 22px;padding:0px 10px 10px 10px;margin:0;'><input class="magic-radio" type="checkbox" name="a${j+1}" id="a${j+1}_${i+1}" value="${i+1}" checked="checked"><label for="a${j+1}_${i+1}">${arr[i]}</label></p><br/>`
            }else{
              this.MyDataHtml+=`<p style='font-size:14px;display:inline-block;line-height: 22px;padding:0px 10px 10px 10px;margin:0;'><input class="magic-radio" type="checkbox" name="a${j+1}" id="a${j+1}_${i+1}" value="${i+1}"><label for="a${j+1}_${i+1}">${arr[i]}</label></p><br/>`
            }
          }
          this.MyDataHtml+=`</li></ul>`

        }
        else if (item.optionType == 3) {
          //  var arr = item.optionText.split("_______");
          var arr=[];
          item.optionText= item.optionText.replace(/\_+/g,"_______");
          if(item.optionText.split("_______").length>1){
            arr = item.optionText.split("_______");
          }

          var title = `${item.sortNumber}.${item.title}`;
          this.MyDataHtml+=`<ul class="qa_list" style='list-style:none;text-align:left;margin:0;'><li style='border-bottom:1px solid rgb(238, 238, 238);'>
                    <h3 style='font-size:15px;padding-top:15px;padding-bottom:15px;margin:0;'>${item.sortNumber}.${item.title}</h3>
                    <input name="sortNumber${j+1}" type="hidden" value="${item.sortNumber}.${item.title}" />
                    <input name="qid${j+1}" type="hidden" value="${item.id}" />`
                    if(item.answers){
                      this.MyDataHtml+=`<input name="answerOld${j+1}" type="hidden" value="${item.answers}" />`
                    }else{
                      this.MyDataHtml+=`<input name="answerOld${j+1}" type="hidden" value="" />`
                    }

          if(item.answers){
             this.MyDataHtml+=`<p>&nbsp;&nbsp;${arr[0]}<input name='a${j+1}' type='text' value='${item.answers}' style='text-align:left;width:50px;border: 1px solid #AAAAAA;'>${arr[1]}</p>`
          }else{
             this.MyDataHtml+=`<p>&nbsp;&nbsp;${arr[0]}<input name='a${j+1}' type='text' value='' style='text-align:left;width:50px;border: 1px solid #AAAAAA;'>${arr[1]}</p>`
          }

          this.MyDataHtml+=`</li></ul>`
        }
        else if (item.optionType == 4) {
          var title = `${item.sortNumber}.${item.title}`;
          this.MyDataHtml+=`<ul class="qa_list" style='list-style:none;text-align:left;margin:0;'><li style='border-bottom:1px solid rgb(238, 238, 238);'>
                    <h3 style='font-size:15px;padding-top:15px;padding-bottom:15px;margin:0;'>${item.sortNumber}.${item.title}</h3>
                    <input name="sortNumber${j+1}" type="hidden" value="${item.sortNumber}.${item.title}" />
                    <input name="qid${j+1}" type="hidden" value="${item.id}" />`
                    if(item.answers){
                       this.MyDataHtml+=`<input name="answerOld${j+1}" type="hidden" value="${item.answers}" />`
                    }else{
                      this.MyDataHtml+=`<input name="answerOld${j+1}" type="hidden" value="" />`
                    }

          if(item.answers){
            this.MyDataHtml+=`<p>&nbsp;&nbsp;${item.optionText}<input name='a${j+1}' type='text' value='${item.answers}' style='text-align:left;border: 1px solid #AAAAAA;width:300px;'></p>`
          }else{
            this.MyDataHtml+=`<p>&nbsp;&nbsp;${item.optionText}<input name='a${j+1}' type='text' value='' style='text-align:left;border: 1px solid #AAAAAA;width:300px;'></p>`
          }

          this.MyDataHtml+=`</li></ul>`

        }

        // <#if list.needPhoto = 1>
	      //           	<#if list.picUrls??>

				// 				<div class="pgb_list">
				// 			        <div class="img_box">
				// 			        	<ul class="img_list">
				// 	                		<#list list.picUrls?split(",") as picUrl>
				// 	                			<#if picUrl?contains("http")>
				// 									<li><img src="${picUrl}" big_src="${picUrl}"></li>
				// 								<#else>
				// 									<li><img src='<@sp.upload />${picUrl}' big_src='<@sp.upload />${picUrl}'></li>
				// 								</#if>
				// 							</#list>
				// 						</ul>
				// 			        </div>
				// 		        </div>

				// 		</#if>
	      //           </#if>
      }

      this.MyDataHtml += `
                        <div class="save_bar" id="submitDiv" style='margin:20px auto;'>
                        <el-button type="primary" @click="submitStep()" size='mini'>保存</el-button>
        </div>
        </form>
    </div>`;
    var that = this;

        event.$el.innerHTML = "";
        setTimeout(()=>{
          var MyComponent = Vue.extend({
          template: that.MyDataHtml,
          data() {
            return {

            };
          },
          methods: {
            submitStep(){
              // var obj=$("#form0").serializeArray();
              var obj=$("#form0").serialize();
              this.$axios({
                  url: `${
                    that.$store.state.globalRouter
                  }/auth/assess/basic_info_mng/save_basic_proj`,
                  method: "post",
                  data: obj
              }).then(res => {
                  if (res.data.resultCode == "000000") {
                    alert("保存成功");
                  } else {
                    if(res.data.data){
                        alert("保存失败:  " + res.data.data+','+res.data.resultMsg);
                    }else{
                        alert("保存失败  " + res.data.resultMsg);
                    }
                  }
              });
            }

          },
          mounted() {

          }
        });
        $('.formbody').remove();
        var component = new MyComponent().$mount();
        event.$el.appendChild(component.$el);
        },100)
    });


        // var that = this;

        // event.$el.innerHTML = "";
        // setTimeout(()=>{
        //   var MyComponent = Vue.extend({
        //   template: that.MyDataHtml,
        //   data() {
        //     return {

        //     };
        //   },
        //   methods: {
        //     submitStep(){
        //       // var obj=$("#form0").serializeArray();
        //       var obj=$("#form0").serialize();
        //       this.$axios({
        //           url: `${
        //             that.$store.state.globalRouter
        //           }/auth/assess/basic_info_mng/save_basic_proj`,
        //           method: "post",
        //           data: obj
        //       }).then(res => {
        //           if (res.data.resultCode == "000000") {
        //             alert("保存成功");
        //           } else {
        //             if(res.data.data){
        //                 alert("保存失败:  " + res.data.data+','+res.data.resultMsg);
        //             }else{
        //                 alert("保存失败  " + res.data.resultMsg);
        //             }
        //           }
        //       });
        //     }

        //   },
        //   mounted() {

        //   }
        // });
        // $('.formbody').remove();
        // var component = new MyComponent().$mount();
        // event.$el.appendChild(component.$el);
        // },100)
      }else if(event.$attrs.typeClass==3){
        $('.formbody').remove();
        let that = this;
        this.addItems = `<div style="height:400px;">
                      <el-row>
                        <el-col :span="10" style="text-align: left;padding-left:10px;">
                          <textarea name="txt" v-model="textarea" rows="10" cols="50" style="border:0px;"></textarea>
                        </el-col>
                      </el-row>
                      <el-row><el-button type="primary" size="small" @click="submitAddItems">提交</el-button></el-row>
                      </div>`;
        let myData = this.addItems;
        event.$el.innerHTML = "";
        let Mycomponent = Vue.extend({
          template: myData,
          data() {
            return {
              textarea: ""
            };
          },
          methods:{
            getData(){
                this.$axios({
                url: `${
                  that.$store.state.globalRouter
                }/auth/assess/basic_info_mng/other_remark?orderNo=${encodeURI(window.localStorage.getItem(
                  "orderNo"
                )) }&insUserId=${encodeURI(window.localStorage.getItem(
                  "appleyUserId"
                ))}&packetId=%5Bobject%20HTMLInputElement%5D&urlRoles=%5Bobject%20HTMLInputElement%5D&questionTypeId=${encodeURI(event.$attrs.id)}`,
                method: "get"
              }).then(res => {
                let data = res.data.data.assessQuestionAnswer;
                if (data == null || data.answers == "") {
                  this.textarea = "暂无";
                } else {
                  let answers = data.answers;
                  this.textarea = answers;
                }
              });
            },
            submitAddItems(){
              this.$axios({
                url: `${
                  that.$store.state.globalRouter
                }/auth/assess/basic_info_mng/save_other_remark`,
                method: "post",
                data:{
                  orderNo:window.localStorage.getItem("orderNo"),
                  questionTypeId:26,
                  a1:this.textarea,
                  answerOld1:1,
                  size:1
                }
              }).then((res)=>{
                if(res.data.resultCode=='000000'){
                  if(res.data.data==1){
                    this.$message({type:'success',message:'修改成功'});
                  }
                  if(res.data.data==null){
                     this.$message({type:'warning',message:'后台数据未保存'});
                  }
                }else{
                  this.$message.error(res.data.resultMsg);
                }
                // this.getData();
              }).catch((error)=>{
                this.$message.error(error);
                // this.getData();
              })
            }
          },
          mounted() {
            this.getData();
          }
        });
        $('.formbody').remove();
        let component = new Mycomponent().$mount();
        event.$el.appendChild(component.$el);
      }else if(event.$attrs.typeClass==4){
         $('.formbody').remove();
         var appleyUserId = window.localStorage.getItem("appleyUserId");
         var orderNo = window.localStorage.getItem("orderNo");
        // 老人总体情况
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/assess/basic_info_mng/disease_diagnosis?orderNo=${encodeURI(orderNo)}&insUserId=${encodeURI(appleyUserId)}&packetId=%5Bobject%20HTMLInputElement%5D&urlRoles=%5Bobject%20HTMLInputElement%5D&questionTypeId=${encodeURI(event.$attrs.id)}`,
      method: "get"
    }).then(res => {
              var data = res.data.data.dto;



      this.MyDataHtml = `
	<div class="formbody" style='margin:0px 15px 0px;'>
        <form id="form0">
        <input name="orderNo" id="orderNo" type="hidden" value="${orderNo}" />
        <input name="questionTypeId" id="questionTypeId" type="hidden" value="${event.$attrs.id}" />
        `;
      var size=0;
      for(let item in data){
        size+=data[item].length
      };
      this.MyDataHtml+=`<input name="size" id="size" type="hidden" value="${size}" />`;
       var sortNumber=0;
       var titleNum=0;
       this.MyDataHtml+=`<el-collapse v-model="activeNames" @change="handleChange">`
      for (let item in data) {
        titleNum++;
        this.MyDataHtml+=`<el-collapse-item title="${item}" name="${titleNum}">`
        for(var i=0;i<data[item].length;i++){
          sortNumber++;
          this.MyDataHtml+=`<div class="t_box" name="ul-tag-${titleNum}">
          <ul class="qa_list" style='list-style:none;text-align:left;margin:0;padding:0;'>
          <li style='border-bottom:1px solid rgb(238, 238, 238);'>
            <h3 style='font-size:15px;padding-top:15px;padding-bottom:15px;margin:0;'>${data[item][i].sortNumber}.${data[item][i].secondTitle} - ${data[item][i].thirdTitle}</h3>
            <input name="sortNumber${sortNumber}" type="hidden" value="${data[item][i].sortNumber}.${data[item][i].secondTitle} - ${data[item][i].thirdTitle}" />
            <input name="qid${sortNumber}" type="hidden" value="${data[item][i].id}" />`
            if(data[item][i].answers){
              this.MyDataHtml+=`<input name="answerOld${sortNumber}" type="hidden" value="${data[item][i].answers}" />`
            }else{
              this.MyDataHtml+=`<input name="answerOld${sortNumber}" type="hidden" value="" />`
            }


          var arr = data[item][i].optionText.split("|");
          for(var j=0;j<arr.length;j++){
            if (data[item][i].answers) {
              if(j+1==data[item][i].answers){
                this.MyDataHtml+=`<p style='font-size:14px;display:inline-block;line-height: 22px;padding:0px 10px 10px 10px;margin:0;'><input class="magic-radio" type="radio" name="a${sortNumber}" id="a${sortNumber}_${j+1}" value="${j+1}" checked="checked"><label for="a${sortNumber}_${j+1}">${arr[j]}</label></p><br/>`
              }else{
                this.MyDataHtml+=`<p style='font-size:14px;display:inline-block;line-height: 22px;padding:0px 10px 10px 10px;margin:0;'><input class="magic-radio" type="radio" name="a${sortNumber}" id="a${sortNumber}_${j+1}" value="${j+1}"><label for="a${sortNumber}_${j+1}">${arr[j]}</label></p><br/>`
              }

            }else{
              this.MyDataHtml+=`<p style='font-size:14px;display:inline-block;line-height: 22px;padding:0px 10px 10px 10px;margin:0;'><input class="magic-radio" type="radio" name="a${sortNumber}" id="a${sortNumber}_${j+1}" value="${j+1}"><label for="a${sortNumber}_${j+1}">${arr[j]}</label></p><br/>`
            }

          }



          this.MyDataHtml+=`</li>
          </ul>
          </div>`
        }
        this.MyDataHtml+=`</el-collapse-item>`
      }
      this.MyDataHtml+=`</el-collapse>`

      this.MyDataHtml += `
                        <div class="save_bar" id="submitDiv" style='margin:20px auto;'>
                        <el-button type="primary" @click="submitStep()" size='mini'>保存</el-button>
        </div>
        </form>
    </div>`;


        var that = this;


        event.$el.innerHTML = "";
        setTimeout(()=>{
          // console.log(this.MyDataHtml)
          var MyComponent = Vue.extend({
          template: that.MyDataHtml,
          data() {
            return {
              activeNames: ["1"]
            };
          },
          methods: {
            submitStep(){
              var obj=$("#form0").serialize();
              this.$axios({
                  url: `${
                    that.$store.state.globalRouter
                  }/auth/assess/basic_info_mng/save_disease_diagnosis`,
                  method: "post",
                  data: obj
              }).then(res => {
                  if (res.data.resultCode == "000000") {
                    alert("保存成功");
                  } else {
                    if(res.data.data){
                        alert("保存失败:  " + res.data.data+','+res.data.resultMsg);
                    }else{
                         alert("保存失败  " + res.data.resultMsg);
                    }
                  }
              });
            },

            handleChange(val) {

            }


          },
          mounted() {

          }
        });
        $('.formbody').remove();
        var component = new MyComponent().$mount();
        event.$el.appendChild(component.$el);
        },100)
    });





      }






    },
    changetabs(event) {
      if(event.label=='评估调查表' || event.label==this.assessQuestionnaireA){
        var AFirst=this.AForm[0].id;
        $('#tab-id'+AFirst).click();
      }
      if(event.label==this.assessQuestionnaireB){
        var BFirst=this.BForm[0].id;
        $('#tab-id'+BFirst).click();
      }

    }
  },
  mounted() {

    var appleyUserId = window.localStorage.getItem("appleyUserId");
    var orderNo = window.localStorage.getItem("orderNo");

    this.orderLevel = window.localStorage.getItem("orderLevel");
    this.appleyUserName = window.localStorage.getItem("appleyUserName");
    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "评估管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "core/order_mng") {

              this.urlRole2 = submenu[j].dataUpdate;
            }
          }
        }
      }
    }

    // 获取评估等级信息
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/assess/basic_info_mng/assess_result?orderNo=${encodeURI(window.localStorage.getItem(
        "orderNo"
      ))}&insUserId=${encodeURI(window.localStorage.getItem(
        "appleyUserId"
      ))}&packetId=%5Bobject%20HTMLInputElement%5D&urlRoles=http%3A%2F%2F39.96.24.242%3A8099%2Fltcins-intact-cms%2Fcore%2Forder_mng.htm`,
      method: "get"
    }).then(res => {
      // console.log('pingji',res.data.data.applyAssessment)
      this.printDate=res.data.data.printDate;
      if (res.data.data.applyAssessment) {
        var data = res.data.data.applyAssessment;
        this.effectiveStartDate = data.effectiveStartDate;
        this.effectiveEndDate = data.effectiveEndDate;
        this.assessmentDate = data.assessmentDate;
      }
    });

    // 要在created里面获取，不然页面加载进来监听的话可能会是空数据
    // // 获取省市区
    // //localhost:8088/insurance-intact-cms/get_provinces
    // this.$axios({
    //   url: `${this.$store.state.globalRouter}/get_provinces`,
    //   method: "get"
    // }).then(res => {
    //   this.city = res.data;
    //   // console.log('city',this.city)
    // });
    // 获取评估调查表
     this.$axios({
      url: `${this.$store.state.globalRouter}/auth/assess/basic_info_mng/assess_questionnaire?orderNo=${encodeURI(orderNo)}&insUserId=${encodeURI(window.localStorage.getItem(
            "appleyUserId"
          ))   }&packetId=%5Bobject%20HTMLInputElement%5D&urlRoles=%5Bobject%20HTMLInputElement%5D&`,
      method: "get"
    }).then(res => {
      this.assessQuestionnaireB=res.data.data.assessQuestionnaireB.questionnaireName;
      // this.assessQuestionnaireAID=res.data.data.assessQuestionnaireA.id;
      // this.assessQuestionnaireBID=res.data.data.assessQuestionnaireB.id;
      this.assessQuestionnaireA=res.data.data.assessQuestionnaireA.questionnaireName;

      // 获取A表，B表
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/assess/basic_info_mng/load_question_type_all_by_questionnaire_id?questionnaireId=${encodeURI(res.data.data.assessQuestionnaireA.id)}`,
        method: "get"
      }).then(res => {
        this.AForm = res.data.data;
      });
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/assess/basic_info_mng/load_question_type_all_by_questionnaire_id?questionnaireId=${encodeURI(res.data.data.assessQuestionnaireB.id)}`,
        method: "get"
      }).then(res => {
        this.BForm = res.data.data;
      });
      // console.log('city',this.city)
    });




    // 获取基本信息
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/assess/basic_info_mng/apply_info?orderNo=${encodeURI(window.localStorage.getItem(
        "orderNo"
      )) }&insUserId=${encodeURI(window.localStorage.getItem(
        "appleyUserId"
      ))}&packetId=%5Bobject%20HTMLInputElement%5D&urlRoles=http%3A%2F%2F39.96.24.242%3A8099%2Fltcins-intact-cms%2Fcore%2Forder_mng.htm`,
      method: "get"
    }).then(res => {
            // 为外部引入的组件填值取值
      var result = res.data.data;
      if (
        result.assessOrderPaperPicApplyList &&
        result.assessOrderPaperPicApplyList.length >= 1
      ) {
        var tempHtml = "";
        for (var i = 0; i < result.assessOrderPaperPicApplyList.length; i++) {
          if (result.assessOrderPaperPicApplyList[i].picUrl) {
            var data = `<li style='position:relative;width:80px;height:80px;float:left;list-style:none;margin-left:10px;'><img style='cursor:pointer;width:100%;height:100%' src='${
              this.$store.state.globalIMGRouter
            }/${result.assessOrderPaperPicApplyList[i].picUrl}' /></li>`;

            var MyComponent = Vue.extend({
              template: data,
              data() {
                return {};
              },
              methods: {
                // delete11(event){
                //   // alert('33');
                //   var goal = event.target.getAttribute('value');
                //   $('#'+goal).remove();
                // }
              }
            });
            var component = new MyComponent().$mount();
            $("#result").append(component.$el);
          }
        }
      }

      var data = res.data.data.insUser;
      var data1 = res.data.data.assessOrder;
      this.ruleForm.name = data1.fullname;
      this.ruleForm.sex = data1.sex;
      this.ruleForm.sfnumber = data1.idcard;
      this.ruleForm.birthTime = data.birthday;
      this.ruleForm.sbnumber=data.medicalInsuranceId;

      // this.ruleForm.sbnumber = data.idNo;

      this.ruleForm.phone = data1.mobile;
      if (data1.special != null) {
        this.ruleForm.isSpecial = data1.special + "";
      }
      if (data1.handicapped != null) {
        this.ruleForm.isDes = data1.handicapped + "";
      }

      if (data1.appointedProvince && data1.appointedProvince.length >= 1) {
        if(data1.appointedProvince.split("-")[0]){
           this.provinceSelected = data1.appointedProvince.split("-")[0];
           this.provinceName = data1.appointedProvince.split("-")[1];
        }
      }
      if (data1.appointedCity && data1.appointedCity.length >= 1) {
        if(data1.appointedCity.split("-")[0]){
          this.citySelected = data1.appointedCity.split("-")[0];
          this.cityName = data1.appointedCity.split("-")[1];
        }
      }

      if (data1.appointedDistrict && data1.appointedDistrict.length >= 1) {
        if(data1.appointedDistrict.split("-")[0]){
           this.areaSelected = data1.appointedDistrict.split("-")[0];
            this.areaName = data1.appointedDistrict.split("-")[1];
        }
      }

      this.ruleForm.address = data1.appointedAddress;

      this.ruleForm.lxrName = data1.contactName;
      this.ruleForm.lxrPhone = data1.contactPhone;
      this.ruleForm.lxrSfnumber = data1.contactIdcard;
      if (data1.relationshipInsUser == 0 || data1.relationshipInsUser == "0") {
        this.ruleForm.gx = 0 + "";
      } else {
        this.ruleForm.gx = data1.relationshipInsUser + "";
      }

      this.ruleForm.docName = data1.familyDoctorName;
      this.ruleForm.docPhone = data1.familyDoctorPhone;
      this.ruleForm.docAddress = data1.familyDoctorCompany;
      // this.ruleForm.isDes = data1.handicapped + "";
      // this.ruleForm.isDes = data1.handicapped+'';

      this.ruleForm.money = data1.orderCost;

      // 社保 评估类型
      // this.ruleForm.sbnumber = this.$store.state.medicalInsuranceId;
      if (data1.isReAssess == 0) {
        this.ruleForm.type = "初评";
      } else {
        this.ruleForm.type = "复评";
      }
    });

    // 填写工单信息
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/assess/basic_info_mng/order_info?orderNo=${encodeURI(window.localStorage.getItem(
        "orderNo"
      ))}&insUserId=${encodeURI(window.localStorage.getItem(
        "appleyUserId"
      ))}&packetId=%5Bobject%20HTMLInputElement%5D&urlRoles=http%3A%2F%2F39.96.24.242%3A8099%2Fltcins-intact-cms%2Fcore%2Forder_mng.htm`,
      method: "get"
    }).then(res => {
      // console.log('66666666',res.data.data);
      var data = res.data.data;

      this.input1 = data.assessOrder.createdUserName;
      // 时间格式化
      this.input2 = this.$moment(data.assessOrder.createdTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      // this.input6 = this.$moment(data1.appointedAssUserTime).format('YYYY-MM-DD HH:mm:ss');
      this.input7 = data.assessOrder.fullnameA;
      this.input8 = data.assessOrder.fullnameB;
      if (data.orderAssessInfo) {
        this.input9 = data.orderAssessInfo.empnoA;
        this.input10 = data.orderAssessInfo.empnoB;
      }

      // 类型 1-签到 2-签出 签到签出时间
      if (data.assessOrderAttendanceInA) {
        this.input13 = this.$moment(
          data.assessOrderAttendanceInA.attendanceTime
        ).format("YYYY-MM-DD HH:mm:ss");
        this.input11 = data.assessOrderAttendanceInA.attendanceAddress.replace("\"","").replace("\"","");
      }

      if (data.assessOrderAttendanceInB) {
        this.input14 = this.$moment(
          data.assessOrderAttendanceInB.attendanceTime
        ).format("YYYY-MM-DD HH:mm:ss");
        this.input12 = data.assessOrderAttendanceInB.attendanceAddress.replace("\"","").replace("\"","");
      }

      if (data.assessOrderAttendanceOutA) {
        this.input17 = this.$moment(
          data.assessOrderAttendanceOutA.attendanceTime
        ).format("YYYY-MM-DD HH:mm:ss");
        this.input15 = data.assessOrderAttendanceOutA.attendanceAddress.replace("\"","").replace("\"","");
      }
      if (data.assessOrderAttendanceOutB) {
        this.input18 = this.$moment(
          data.assessOrderAttendanceOutB.attendanceTime
        ).format("YYYY-MM-DD HH:mm:ss");
        this.input16 = data.assessOrderAttendanceOutB.attendanceAddress.replace("\"","").replace("\"","");
      }
      // this.input10 = data.orderAssessInfo.empnoB;
      // this.input10 = data.orderAssessInfo.empnoB;
      if (data.assessStatusChangeLogDistriOrg) {
        this.input3 = data.assessStatusChangeLogDistriOrg.updatedUserName;
        this.input4 = this.$moment(
          data.assessStatusChangeLogDistriOrg.updatedTime
        ).format("YYYY-MM-DD HH:mm:ss");
        if(data.orderAssessInfo){
          this.input5 = data.orderAssessInfo.createName;
          this.input6 = this.$moment(data.orderAssessInfo.createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }

      }

      if (data.assessStatusChangeLogOrderLevel) {
        this.input19 = data.assessStatusChangeLogOrderLevel.updatedUserName;
        this.input20 = this.$moment(
          data.assessStatusChangeLogOrderLevel.updatedTime
        ).format("YYYY-MM-DD HH:mm:ss");
      }
    });
  }
};
</script>

<style scoped>
h1 {
  display: block;
  /* font-size          : 2em; */
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.print_page {
  font-size: 16px;
  font-family: 仿宋;
  width: 815px;
  margin: 0 auto;
  line-height: 30px;
  padding: 30px 75px;
  color: #000;
  background: #ffffff;
  margin-top: 20px;
  box-shadow: 0 0 10px #adafb8;
  height: 1000px;
  position: relative;
}
.print_page h1 {
  font-size: 24px;
  text-align: center;
  line-height: 30px;
  padding: 20px 0;
  padding-top: 30px;
}
.print_page h2 {
  font-size: 18px;
  padding-bottom: 10px;
}
.print_page .content {
  text-indent: 2em;
}
.print_page .t_r {
  text-align: right;
}
.print_bar {
  position: fixed;
  right: 20px;
  top: 50%;
  margin-top: -30px;
}
.print_btn {
  text-decoration: none;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  background: #348fe2;
  display: inline-block;
  border-radius: 5px;
}
.blank130 {
  height: 130px;
  overflow: hidden;
}
.header,
.footer {
  height: 30px;
  width: 600px;
}
.header {
  background: url(../../assets/img/header.gif) center no-repeat;
  left: 50%;
  margin-left: -300px;
  position: relative;
}
.footer {
  background: url(../../assets/img/footer.gif) center no-repeat;
  position: absolute;
  bottom: 30px;
  left: 50%;
  margin-left: -300px;
}
.print_page2 {
  font-size: 18px;
  line-height: 48px;
}
.page_550 {
  width: 570px;
  margin: 0 auto;
  padding: 30px 0;
}
.print_page ol {
  line-height: 24px;
  padding-bottom: 10px;
  padding: 0px 25px;
}
.print_page h3 {
  font-size: 18px;
  padding: 10px 0;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 16px;
  width: 40%;
  float: left;
  margin-left: 30px;
}

.gongdaninfo ul {
  overflow: hidden;
}
.gongdaninfo ul li {
  float: left;
  width: 35%;
  list-style: none;
  text-align: left;
  overflow: hidden;
  margin-bottom: 20px;
}

.el-tabs--border-card > .el-tabs__content {
  /* padding: 15px; */
  padding: 10px 0px;
  padding-bottom: 0px;
}
.el-form--label-left .el-form-item__label {
  text-align: left;
  width: 100%;
  height: 18px;
}
.el-radio-group {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  font-size: 0;
  width: 100%;
  text-align: left;
}
hr {
  margin-top: 0px;
  margin-bottom: 0px;
  border: 0;
  border-top: 1px solid #eee;
}
.el-form-item {
  margin-bottom: 8px;
}
#result {
  float: left;
}
#result li {
  float: left;
  position: relative;
}
#result img {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-left: 10px;
}
label {
  font-weight: normal;
}
.typeTitle {
  text-align: left;
  font-weight: blod;
  float: left;
  width: 100%;
  font-size: 16px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ececec;
}
input {
  border-radius: 4px;
  border: 1px solid #bbb;
  text-aligin: center;
  height: 28px;
}


</style>
<style>
/* input{
  border-radius: 4px;
  border: 1px solid #bbb;
  text-aligin:center;
  height:28px;
} */
select {
  height: 28px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
label {
  font-weight: normal;
}
.paddingTop10 {
  padding-top: 10px;
}
.el-collapse-item__arrow {
    margin: 0;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    font-weight: 300;
}


</style>


