// 评估协议配置
<template>
  <div style="padding:20px;height:100%">
    <div
      class = "tableBox"
      style = "background:#fff;padding:5px;height:95%"
    >
      <div
        el-row
        style = "margin:10px 0;text-align: left;"
      >
        <div
          el-col
          span = "24"
        >
          <el-button
            v-if   = "urlRole1==1"
            type   = "primary"
            size   = "small"
            icon   = "el-icon-plus"
            @click = "addData"
          >新增</el-button>
          <el-button
            v-if   = "urlRole2==1"
            type   = "primary"
            size   = "small"
            icon   = "el-icon-edit"
            @click = "updateData"
          >修改</el-button>
          <el-button
            v-if   = "urlRole3==1"
            type   = "primary"
            icon   = "el-icon-delete"
            size   = "small"
            @click = "deleteData"
          >删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        size="mini"
        style="text-align:left;"
      >
        <el-form-item label="评估协议编号:">
          <el-input v-model.trim="searchForm.id" placeholder="请输入评估协议编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="评估协议名称:">
          <el-input v-model.trim="searchForm.name" placeholder="请输入评估协议名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="协议有效期:">
          <div class="block">
            <el-date-picker
              v-model="pickDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据表格 -->
      <div style="padding:5px;height:80%">
        <el-table
          :data="lists"
          border
          stripe
          :default-sort="{prop: 'date', order: 'descending'}"
          @select="checkout"
          height="100%"
        >
          <el-table-column
            type  = "selection"
            width = "50"
          ></el-table-column>
          <el-table-column
            prop  = "confCode"
            label = "评估协议编号"
            width = "180"
            sortable
          ></el-table-column>
          <el-table-column
            prop  = "confName"
            label = "评估协议名称"
            width = "400"
          ></el-table-column>
          <el-table-column
            prop  = "startDate"
            label = "协议开始时间"
            width = "260"
            sortable
          ></el-table-column>
          <el-table-column
            prop  = "endDate"
            label = "协议终止时间"
            width = "260"
            sortable
          ></el-table-column>
          <el-table-column
            prop  = "updateTime"
            label = "上次修改时间"
            sortable
            width = "300"
          ></el-table-column>
          <el-table-column
            prop  = "accessDetail"
            label = "评估协议详情"
            sortable
            min-width="150"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="protocolDetail(scope.$index, scope.row)"
              >协议详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 模态框 -->
      <el-dialog
        :title="proptype"
        :visible.sync="dialogVisible"
        width="900px"
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
          :disabled="formDisabled"
        >
          <!-- <el-form-item>模态框状态{{this.modelType}}</el-form-item> -->
          <el-form-item
            label = "评估协议编号:"
            prop  = "number"
          >
            <el-input
              v-model     = "ruleForm.number"
              placeholder = "请输入评估协议编号"
              :disabled="updateAction"
            ></el-input>
          </el-form-item>
          <el-form-item
            label = "评估协议名称:"
            prop  = "name"
          >
            <el-input
              v-model     = "ruleForm.name"
              placeholder = "请输入评估协议名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label = "协议开始时间:"
            prop  = "startTime"
          >
            <el-date-picker
            type="date"
              v-model="ruleForm.startTime"
              style="width:100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label = "协议结束时间:"
            prop  = "stopTime"
          >
            <el-date-picker
            type="date"
              v-model="ruleForm.stopTime"
              style="width:100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label = "评估员A调查表:"
            prop  = "aForm"
            required
          >
            <el-select
              v-model="ruleForm.aForm"
              placeholder="请选择评估员A的调查表"
              style="width:100%;float:left;"
              clearable
            >
              <!-- <el-option
                label = "长期护理保险失能等级评估调查表A卷"
                value = "7"
              ></el-option>
              <el-option
                label = "长期护理保险失能等级评估调查表B卷"
                value = "8"
              ></el-option>
              <el-option
                label = "长期护理险评估调查表A卷"
                value = "9"
              ></el-option>
              <el-option
                label = "长期护理险评估调查表B卷"
                value = "10"
              ></el-option> -->
              <el-option v-for="(item,index) in assessFormA" :key="index" :value="item.id" :label="item.questionnaireName" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label = "评估员B调查表:"
            prop  = "bForm"
            required
          >
            <el-select
              v-model="ruleForm.bForm"
              placeholder="请选择评估员B的调查表"
              style="width:100%;float:left;"
              clearable
            >
              <!-- <el-option
                label = "长期护理保险失能等级评估调查表A卷"
                value = "7"
              ></el-option>
              <el-option
                label = "长期护理保险失能等级评估调查表B卷"
                value = "8"
              ></el-option>
              <el-option
                label = "长期护理险评估调查表A卷"
                value = "9"
              ></el-option>
              <el-option
                label = "长期护理险评估调查表B卷"
                value = "10"
              ></el-option> -->
              <el-option v-for="(item,index) in assessFormB" :key="index" :value="item.id" :label="item.questionnaireName" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评估费用配置:">
            <div>
              <table
                style="margin:0px;padding:0px;width:100%;"
                class="table table-striped table-bordered nowrap"
              >
                <tbody>
                  <tr>
                    <td style="padding-left: 80px;"></td>
                    <td align="center">费用（元/人次）</td>
                    <td align="center">统筹基金(元)</td>
                    <td align="center">自付(元)</td>
                  </tr>
                  <tr>
                    <td>初评</td>
                    <td align="center">
                      <el-input-number
                        v-model="numbers.num1"
                        :min="0"
                        label="描述文字"
                        style="width:100%;height:100%;border:none;"
                        controls-position="right"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="numbers.num2"
                        :min="0"
                        label="描述文字"
                        style="width:100%;height:100%;border:none;"
                        controls-position="right"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="numbers.num3"
                        :min="0"
                        label="描述文字"
                        style="width:100%;height:100%;border:none;"
                        controls-position="right"
                      ></el-input-number>
                    </td>
                  </tr>
                  <tr>
                    <td>复评</td>
                    <td align="center">
                      <el-input-number
                        v-model="numbers.num4"
                        :min="0"
                        label="描述文字"
                        style="width:100%;height:100%;border:none;"
                        controls-position="right"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="numbers.num5"
                        :min="0"
                        label="描述文字"
                        style="width:100%;height:100%;border:none;"
                        controls-position="right"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="numbers.num6"
                        :min="0"
                        label="描述文字"
                        style="width:100%;height:100%;border:none;"
                        controls-position="right"
                      ></el-input-number>
                    </td>
                  </tr>
                  <tr>
                    <td>持续评估</td>
                    <td align="center">
                      <el-input-number
                        v-model="numbers.num7"
                        :min="0"
                        label="描述文字"
                        style="width:100%;height:100%;border:none;"
                        controls-position="right"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="numbers.num8"
                        :min="0"
                        label="描述文字"
                        style="width:100%;height:100%;border:none;"
                        controls-position="right"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="numbers.num9"
                        :min="0"
                        label="描述文字"
                        style="width:100%;height:100%;border:none;"
                        controls-position="right"
                      ></el-input-number>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-form-item>
          <!-- 添加负责范围-->
          <el-form-item label="负责范围">
            <child-page
              v-for="(item,index) in items"
              :key="index"
              :index="index"
              :items="items[index]"
              :modelType="modelType"
              :flage="flage"
              :tab_pane_disabled='tab_pane_disabled'
              @deleteIndexArea="deleteArea"
            ></child-page>
            <div style="margin-left:80px;" id="addAreaButton">
              <el-button type="primary" size="mini" @click="addArea">添加负责范围</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type   = "primary"
              @click = "submitForm('ruleForm')"
            >提交</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
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
import childPage from "./child.vue";
import base from "../../base/base";
import Vue from "vue";
import { setTimeout } from "timers";
export default {
  mixins: [base],
  inject: ["reload"],
  data() {
    return {
      items: [],
      flage: 0,
      module: "assess_service_conf_mng",
      lists: [], //存放表格数据
      formDisabled: false,
      searchText: null,
      dialogVisible: false,
      proptype: "用户协议新增",
      searchForm: {
        id: "",
        name: ""
      },
      //搜索时的选择时间
      pickDate: "",
      checkedData: [],
      //弹出框选择
      ruleForm: {
        number: "",
        name: "",
        startTime: "",
        stopTime: "",
        aForm:"",
        bForm:"",
        area: 3,
        area1: "",
        id: "" //保存协议id
      },
      rules: {
        number: [
          { required: true, message: "请输入评估协议编号", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入评估协议名称", trigger: "blur" }
        ],
        startTime: [
          {
            required: true,
            message: "请选择协议开始时间",
            trigger: "change"
          }
        ],
        stopTime: [
          {
            required: true,
            message: "请选择协议结束时间",
            trigger: "change"
          }
        ],
        aForm:[
          {required: true, message: "必选项", trigger: "change"}
        ],
        bForm:[
          {required: true, message: "必选项", trigger: "change"}
        ]
      },
      //评估费用配置
      numbers: {
        num1: 0,
        num2: 0,
        num3: 0,
        num4: 0,
        num5: 0,
        num6: 0,
        num7: 0,
        num8: 0,
        num9: 0
      },
      assessFormA:[],
      assessFormB:[],
      modelType: 1, //判断是新增还是修改;;;;1---新增 0---修改--2查看,
      updateAction:false,
      tab_pane_disabled:false,//tab选项卡是否禁用
      // 权限分配
      urlRole1:0,
      urlRole2:0,
      urlRole3:0,
      urlRole4:0,

    };
  },
  components: {
    childPage
  },
  methods: {
    dataList(tableData) {
      if (Array.isArray(tableData)) {
        var newdata = [];
        var newUpdateTime = [];
        var dataArray = tableData;
        dataArray.forEach(el => {
          if (el.createTime) {
            newdata.push(
              this.$moment(el.createTime).format("YYYY-MM-DD HH:mm:ss")
            );
            if (el.updateTime) {
              newUpdateTime.push(
                this.$moment(el.updateTime).format("YYYY-MM-DD HH:mm:ss")
              );
            }
          }
        });
        this.transform(dataArray, newdata); //协议创建时间转换
        this.transform(dataArray, newUpdateTime); //协议修改时间转换
        this.lists = dataArray;
      }
    },
    // 时间戳转换
    transform(old, insert) {
      old.forEach((el, index) => {
        el.createTime = insert[index];
        if (el.updateTime) {
          el.updateTime = insert[index];
        }
      });
    },
    checkout(val) {
      this.checkedData = val;
    },
    //添加数据
    addData() {
      let _this=this;
      this.updateAction=false;
      this.items = [
        {
          overallType: "3",
          regionProvince: 3879,
          regionCity: "",
          regionDistrict: "",
          regionStreet: "",
          province: "北京市",
          city: "",
          district: "",
          street: ""
        }
      ];
      this.modelType = 1;
      this.proptype = "新增评估协议";
      this.tab_pane_disabled=false;
      this.dialogVisible = true;
      this.formDisabled = false;
      this.ruleForm.id = ""; //协议id
      this.ruleForm.number = "";
      this.ruleForm.name = "";
      this.ruleForm.aForm = "";
      this.ruleForm.bForm = "";
      this.ruleForm.id = "";
      this.ruleForm.startTime="";
      this.ruleForm.stopTime="";

      this.$nextTick(() => {
        _this.$refs["ruleForm"].clearValidate();
      });
    },
    //查询数据
    searchData() {
      let startDate = "";
      let endDate = "";
      if (this.pickDate) {
        startDate = this.pickDate[0];
        endDate = this.pickDate[1];
      }
      let _this = this;
      let getData={
        'confCode':this.searchForm.id,
        'confName':this.searchForm.name,
        'startDate':startDate,
        'endDate':endDate,
        'pageNo':this.currentPage,
        'pageSize':this.changePageSize
      }
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/assess/${this.module}/pagination`,
        params:getData
      }).then(res => {
        if (res.data.resultList) {
          let resultArray = res.data.resultList;
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          _this.dataList(resultArray);
        } else {
          this.lists = [];
          this.$alert("查询不到数据");
        }
      });
    },
    //修改信息
    updateData() {
      this.flage++;
      this.modelType = 0;
      this.formDisabled = false;
      this.proptype = "评估协议修改";
      this.updateAction=true;
      this.tab_pane_disabled=false;
      if (this.checkedData.length == 1) {
        let data = this.checkedData[0];
        this.dialogVisible = true;
        this.items = [];
        this.ruleForm.id = data.id; //协议id
        this.ruleForm.number = data.confCode;
        this.ruleForm.name = data.confName;
        this.ruleForm.startTime = data.startDate;
        this.ruleForm.stopTime = data.endDate;
        this.ruleForm.aForm = data.questionnaireA;
        this.ruleForm.bForm = data.questionnaireB;
        this.ruleForm.id = data.id;
        this.$axios({
          //请求当前选中的数据
          method: "get",
          url: `${this.$store.state.globalRouter}/auth/assess/${
            this.module
          }/query_intact_responsible_area?relationObjectId=${encodeURI(data.id)}`
        }).then(res => {
          if (res.data.resultCode == "000000") {
            let result = res.data.data;
          let resData=JSON.parse(JSON.stringify(res.data.data));
          if(resData.length>=1){
              resData.forEach(item=>{
              item.overallType=item.overallType+'';
              if(item.regionProvince){
                item.province=item.regionProvince.split('-')[1];
                item.regionProvince=parseInt(item.regionProvince.split('-')[0]);
              }else{
                item.province="";
                item.regionProvince="";
              }
              if(item.regionCity){
                item.city=item.regionCity.split('-')[1];
                item.regionCity=parseInt(item.regionCity.split('-')[0]);
              }else{
                item.city="";
                item.regionCity="";
              }
              if(item.regionDistrict){
              item.district=item.regionDistrict.split('-')[1];
              item.regionDistrict=parseInt(item.regionDistrict.split('-')[0]);
              }else{
              item.district="";
              item.regionDistrict="";
              }
              if(item.regionStreet&&item.regionStreet!=NaN&&item.regionStreet!='-'){
                item.street = item.regionStreet.split(",");
              }else{
                item.street=[];
                item.regionStreet="";
              }
            });
          }
          this.items=resData;
          }
        });

        this.numbers = {
          num1: data.firstAssessCost,
          num2: data.firstAssessFromGov,
          num3: data.firstAssessFromMyself,
          num4: data.againAssessCost,
          num5: data.againAssessFromGov,
          num6: data.againAssessFromMyself,
          num7: data.continuedAssessCost,
          num8: data.continuedAssessFromGov,
          num9: data.continuedAssessFromMyself
        };
      } else {
        this.$alert("请选择一条要修改的数据");
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.$refs['ruleForm'].clearValidate();
          // this.reload();
        })
        .catch(_ => {});
    },
    //查看协议详情
    protocolDetail(index, data) {
      this.modelType = 2;
      this.formDisabled = true;
      let _this = this;
      this.tab_pane_disabled=true;
      this.dialogVisible = true;
      this.proptype = "评估协议详情";
      this.ruleForm.number = data.confCode;
      this.ruleForm.name = data.confName;
      this.ruleForm.startTime = data.startDate;
      this.ruleForm.stopTime = data.endDate;
      this.ruleForm.aForm = data.questionnaireA;
      this.ruleForm.bForm = data.questionnaireB;
      this.numbers = {
        num1: data.firstAssessCost,
        num2: data.firstAssessFromGov,
        num3: data.firstAssessFromMyself,
        num4: data.againAssessCost,
        num5: data.againAssessFromGov,
        num6: data.againAssessFromMyself,
        num7: data.continuedAssessCost,
        num8: data.continuedAssessFromGov,
        num9: data.continuedAssessFromMyself
      };
      this.$axios({
        //请求当前选中的数据
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/assess/${
          this.module
        }/query_intact_responsible_area?relationObjectId=${encodeURI(data.id)}`
      }).then(res => {
        if (res.data.resultCode == "000000") {
          let result = res.data.data;
          this.ruleForm.id = result.relationObjectId;
          let resData = JSON.parse(JSON.stringify(res.data.data));
          if (resData.length >= 1) {
            resData.forEach(item => {
              item.overallType = item.overallType + "";
              if (item.regionProvince) {
                item.province = item.regionProvince.split("-")[1];
                item.regionProvince = parseInt(
                  item.regionProvince.split("-")[0]
                );
              } else {
                item.province = "";
                item.regionProvince = "";
              }
              if (item.regionCity) {
                item.city = item.regionCity.split("-")[1];
                item.regionCity = parseInt(item.regionCity.split("-")[0]);
              } else {
                item.city = "";
                item.regionCity = "";
              }
              if (item.regionDistrict) {
                item.district = item.regionDistrict.split("-")[1];
                item.regionDistrict = parseInt(
                  item.regionDistrict.split("-")[0]
                );
              } else {
                item.district = "";
                item.regionDistrict = "";
              }
              if (
                item.regionStreet &&
                item.regionStreet != NaN &&
                item.regionStreet != "-"
              ) {
                item.street = item.regionStreet.split(",");
              } else {
                item.street = [];
                item.regionStreet = "";
              }
            });
          }
          this.items=resData;
        }
      });
    },
    //删除数据
    deleteData() {
      if (this.checkedData.length == 1) {
        let id = this.checkedData[0].id;
        this.$confirm("确定删除此条数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$axios({
              method: "get",
              url: `${this.$store.state.globalRouter}/auth/assess/${
                this.module
              }/remove?id=${encodeURI(id)}`
            }).then(res => {
              if (res.data) {
                this.$message({type:'success',message:'删除成功'});
                this.getReloadData();
              } else {
                this.$message({type:'error',message:'删除失败，服务出错!'});
              }
            });
          })
          .catch(() => {
            this.$message("已取消删除");
          });
      } else {
        this.$alert("请选择一条要修改的数据");
      }
    },
    // 提交按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            confCode: this.ruleForm.number,
            confName: this.ruleForm.name,
            questionnaireA: parseInt(this.ruleForm.aForm),
            questionnaireB: parseInt(this.ruleForm.bForm),
            startDate: this.ruleForm.startTime,
            endDate: this.ruleForm.stopTime,
            firstAssessCost: this.numbers.num1,
            firstAssessFromGov: this.numbers.num2,
            firstAssessFromMyself: this.numbers.num3,
            againAssessCost: this.numbers.num4,
            againAssessFromGov: this.numbers.num5,
            againAssessFromMyself: this.numbers.num6,
            continuedAssessCost: this.numbers.num7,
            continuedAssessFromGov: this.numbers.num8,
            continuedAssessFromMyself: this.numbers.num9
          };
          let areaData =JSON.parse(JSON.stringify(this.items));
          areaData.forEach((item,index)=>{
            if(item.province){
            item.regionProvince=item.regionProvince+'-'+item.province;
            }else{
              item.regionProvince="";
            }
            if(item.city){
            item.regionCity=item.regionCity+'-'+item.city;
            }else{
              item.regionCity="";
            }
            if(item.regionDistrict){
            item.regionDistrict=item.regionDistrict+'-'+item.district;
            }else{
              item.regionDistrict="";
            }
            if (item.street) {
              item.regionStreet = item.street.join(",");
            } else {
              item.regionStreet = null;
            }
          });
          let d1=new Date(data.startDate).getTime();
          let d2=new Date(data.endDate).getTime();
          if(d2<d1){
            this.$message({type:'error',message:"协议结束日期不能大于协议开始日期！"});
            this.ruleForm.stopTime=null;
          }else{
              //判断是新增还是修改
            if (this.modelType) {
              // console.log("新增");
              // this.ruleForm.id = "";
              this.$axios({
                method: "post",
                url: `${this.$store.state.globalRouter}/auth/assess/${
                  this.module
                }/save`,
                data
              }).then(res => {
                if (res.data.resultCode == "000000") {
                  this.getData();
                  this.dialogVisible = false;
                  areaData.forEach((item, index) => {
                    item.relationObjectId = res.data.data;
                  });
                  //保存范围
                  this.$axios({
                    method: "post",
                    url: `${this.$store.state.globalRouter}/auth/assess/${
                      this.module
                    }/submit_intact_responsible_area`,
                    data: areaData
                  }).then(res => {
                    if (res.data.resultCode == "000000") {
                      this.$message({type:'success',message:"新增成功"});
                    } else {
                      this.$message({type:'error',message:"保存负责范围失败！"});
                    }
                  });
                } else {
                  this.$message(res.data.resultMsg);
                }
              });
            } else {
              // console.log("修改");
              // console.log(this.ruleForm.id);//协议id
              this.$axios({
                method: "post",
                url: `${this.$store.state.globalRouter}/auth/assess/${
                  this.module
                }/update?id=${encodeURI(this.ruleForm.id)}`,
                data
              }).then(res => {
                if(res.data.resultCode=='000000'){
                    this.getData();
                  this.dialogVisible = false;
                  areaData.forEach((item, index) => {
                    item.relationObjectId = this.ruleForm.id;
                  });
                  // 修改范围信息
                  if (res.data) {
                    this.$axios({
                      method: "post",
                      url: `${this.$store.state.globalRouter}/auth/assess/${
                        this.module
                      }/submit_intact_responsible_area`,
                      data: areaData
                    }).then(res => {
                      if (res.data.resultCode == "000000") {
                      this.$message({type:'success',message:"修改成功"});
                      } else {
                      this.$message({type:'error',message:"保存负责范围失败！"});
                      }
                    });
                }else{
                  this.$message(res.data.resultMsg);
                }
                }
              });
            }
          }

        } else {
         this.$message({type:'error',message:'填写格式不合法，请检查！'});
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //添加负责地区范围
    addArea() {
      this.items.push({
        overallType: "3",
        regionProvince: "",
        regionCity: "",
        regionDistrict: "",
        regionStreet: "",
        province: "北京市",
        city: "",
        district: "",
        street: ""
      });
    },
    //删除所负责的区域
    deleteArea(val) {
      this.items.splice(val,1);
    },
     // 分页
    handleCurrentChange(val) {
      this.currentPage=val;
      this.searchData();
    },
    handleSizeChange(val) {
            this.changePageSize = val;
            this.searchData();
    },
    getReloadData(){
      let startDate = "";
      let endDate = "";
      if (this.pickDate) {
        startDate = this.pickDate[0];
        endDate = this.pickDate[1];
      }
      this.$axios({
          url   : `${this.$store.state.globalRouter}/auth/assess/${this.module}/pagination?confCode=${encodeURI(this.searchForm.id)}&confName=${encodeURI(this.searchForm.name)
        }&startDate=${encodeURI(startDate)}&endDate=${encodeURI(endDate)}&pageNo=1&pageSize=${this.pageSize[0]}`,
          method: 'get'
      }).then(res => {
          if(res.data.resultCode=='100005'){
              this.$router.push({ path: "/" });
          }else{
              this.total       = res.data.totalCount;
              this.currentPage = res.data.curPage;
              this.resData     = res.data.resultList;
              this.dataList(this.resData);//列出列表
          }
      });
    },
    getAssessFormA() {
      this.$axios
        .get(
          `${this.$store.state.globalRouter}/auth/assess/assess_questionnaire_mng/list`
        )
        .then(res => {
          if(res.data.resultCode=='000000'){
            this.assessFormA=res.data.data;
            this.assessFormB=res.data.data;
          }else{
            this.assessFormA=[];
            this.assessFormB=[];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getData();
    this.getAssessFormA();
    // 增删改审的权限判断
    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "协议配置管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "core/access_service") {
              // console.log("评估协议配置", submenu[j]);
              // urlRole1==dataAdd 增
              // urlRole2==dataUpdate 修
              // urlRole3==dataDelete 删除
              // urlRole4==dataAudit 审

              this.urlRole1 = submenu[j].dataAdd;
              this.urlRole2 = submenu[j].dataUpdate;
              this.urlRole3 = submenu[j].dataDelete;
              this.urlRole4 = submenu[j].dataAudit;
            }
          }
        }
      }
    }
  }
};
</script>
