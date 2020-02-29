// 街道维护
<template>
  <div style="padding:20px;height:100%">
    <div class="tableBox" style="height:95%;background:#fff;padding:5px;overflow:auto">
      <div el-row style="margin:10px 0;text-align: left;">
        <div el-col span="24">
          <!-- <el-input placeholder="模糊查询协议名称" v-model="searchText" style="width: auto" size="mini"/>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchData">搜索</el-button>-->
          <el-button
            v-if="urlRole1==1"
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="addData"
          >新增</el-button>
          <el-button
            v-if="urlRole2==1"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="updateData"
          >修改</el-button>
          <el-button
            v-if="urlRole3==1"
            type="primary"
            icon="el-icon-delete"
            size="small"
            @click="deleteData"
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
        <el-form-item label="省/直辖市:" >
          <el-select
            v-model="provinceSelect"
            style="width:100%;float:left"
            clearable
            id="searchProvince"
          >
            <el-option
              v-for="(item,index) in provinceL"
              :value="item.regionId"
              :label="item.regionName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市:">
          <el-select v-model="citySelect" style="width:100%;float:left" clearable id="searchCity">
            <el-option
              v-for="(item,index) in cityL"
              :value="item.regionId"
              :label="item.regionName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区县:">
          <el-select v-model="areaSelect" style="width:100%;float:left" clearable id="searchArea">
            <el-option
              v-for="(item,index) in areaL"
              :value="item.regionId"
              :label="item.regionName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="街道:">
          <el-input v-model="inputBlock" placeholder="请输入街道名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <div style="padding:5px;height:80%">
      <el-table
        :data="lists"
        border
        stripe
        style="width:100% "
        :default-sort="{prop: 'date', order: 'descending'}"
        @select="checkOut"
        height="100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="streetId" label="ID" width="100" sortable></el-table-column>
        <el-table-column prop="regionProvince" label="省/直辖市" width="150" sortable></el-table-column>
        <el-table-column prop="regionCity" label="市" width="150" sortable></el-table-column>
        <el-table-column prop="regionDistrict" label="区/县" width="150" sortable></el-table-column>
        <el-table-column prop="streetName" label="街道/镇" width="150" sortable></el-table-column>
        <el-table-column prop="status" label="状态" width="150" sortable></el-table-column>
        <!-- <el-table-column label="创建人" width="150" sortable></el-table-column> -->
        <el-table-column prop="createTime" label="创建时间" width="200" sortable></el-table-column>
        <el-table-column prop="updateTime" label="上次修改时间" sortable width="200"></el-table-column>
        <el-table-column prop="accessDetail" label="详情" sortable min-width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="protocolDetails(scope.$index, scope.row)"
            >街道详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <!-- 模态框 -->
      <el-dialog
        :title="proptype"
        :visible.sync="dialogVisible"
        width="600px"
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
          <el-form-item label="省/直辖市" required prop="formProvinceSelect">
            <el-select
              v-model="ruleForm.formProvinceSelect"
              style="width:100%;float:left"
              clearable
              id="formProvinceSelect"
            >
              <el-option
                v-for="(item,index) in provinceL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市" required prop="formCitySelect">
            <el-select
              v-model="ruleForm.formCitySelect"
              style="width:100%;float:left"
              clearable
              id="formCitySelect"
            >
              <el-option
                v-for="(item,index) in cityL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区县" required prop="formAreaSelect">
            <el-select
              v-model="ruleForm.formAreaSelect"
              style="width:100%;float:left"
              clearable
              id="formAreaSelect"
            >
              <el-option
                v-for="(item,index) in areaL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="街道" prop="streetName">
            <el-input v-model="ruleForm.streetName"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status" style="text-align:left;">
            <el-radio-group v-model="ruleForm.status" @change="selectStatu">
              <el-radio :label="1">有效</el-radio>
              <el-radio :label="0">无效</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini">提交</el-button>
          <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 详情模态框 -->
      <el-dialog title="街道信息" :visible.sync="dialogVisible2" width="600px" center>
        <el-form
          :model="detailForm"
          ref="detailForm"
          label-width="150px"
          class="demo-ruleForm"
          style="overflow:auto;"
          disabled
        >
          <el-form-item label="省/直辖市">
            <el-input v-model="detailForm.regionProvince"></el-input>
          </el-form-item>
          <el-form-item label="市">
            <el-input v-model="detailForm.regionCity"></el-input>
          </el-form-item>
          <el-form-item label="区县">
            <el-input v-model="detailForm.regionDistrict"></el-input>
          </el-form-item>
          <el-form-item label="街道">
            <el-input v-model="detailForm.streetName"></el-input>
          </el-form-item>
          <el-form-item label="状态" style="text-align:left;">
            <el-radio-group v-model="detailForm.status">
              <el-radio :label="1" value="1">有效</el-radio>
              <el-radio :label="0" value="2">无效</el-radio>
            </el-radio-group>
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
import base from "../../base/base";
import { setTimeout } from "timers";
export default {
  mixins: [base],
  inject: ["reload"],
  data() {
    let validateStreetName=(rule, value, callback)=>{
      value=value.trim();
      if(this.oldName && value==this.oldName){
        callback()
      }else if(value==null || value==''){
        callback(new Error('街道名称必填！'));
      }else{
        let data={
          'regionDistrict':this.ruleForm.formAreaSelect+'-'+$("#formAreaSelect")[0].value,
          'streetName':this.ruleForm.streetName
        };
        this.$axios({
          url   : `${this.$store.state.globalRouter}/auth/nursing/${encodeURI(this.module)}/isExist`,
          method: "post",
          data
        }).then(res => {
         if(res.data.data){
            callback();
         }else{
           callback(new Error('该街道名称已经存在，请更换街道名称！'));
         }
        });
      }
    };
    return {
      module: "nursing_street_mng",
      proptype: "街道新增",
      dialogVisible: false,
      dialogVisible2: false,
      searchForm: {
        id: "",
        name: ""
      },
      oldName:null,
      ruleForm: {
        regionProvince: "",
        regionCity: "",
        regionDistrict: "",
        streetName: "",
        status: "",
        formProvinceSelect: "",
        formCitySelect: "",
        formAreaSelect: "",
      },
      rules: {
        formProvinceSelect: [
          { required: true, message: "请选择省/直辖市", trigger: "change" }
        ],
        formCitySelect: [{ required: true, message: "请选择市", trigger: "change" }],
        formAreaSelect: [
          { required: true, message: "请选择区县", trigger: "change" }
        ],
        streetName: [
          { required: true, message: "请选择街道", trigger: "blur" },
          {validator:validateStreetName,trigger:'blur'}
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      detailForm: {
        regionProvince: "",
        regionCity: "",
        regionDistrict: "",
        streetName: "",
        status: ""
      },
      lists: [],
      modelType: 1,
      formDisabled: false,
      checkData: "",

      provinceSelect: "",
      citySelect: "",
      areaSelect: "",
      inputBlock: "",
      provinceL: "",
      cityL: "",
      areaL: "",
      // 表单内三级
      // formProvinceSelect: "",
      // formCitySelect: "",
      // formAreaSelect: "",
      updateDataId: "",

      // 增删改审的权限问题？？
      urlRole1: 0,
      urlRole2: 0,
      urlRole3: 0,
      urlRole4: 0
    };
  },
  methods: {
    checkOut(val) {
      this.checkData = val;
      console.log(this.checkData);
    },
    selectStatu() {},
    getData() {
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/nursing/${
          encodeURI(this.module)
        }/pagination?regionProvince=${encodeURI(this.provinceSelect)}&regionCity=${
          encodeURI(this.citySelect)
        }&regionDistrict=${encodeURI(this.areaSelect)}&streetName=${
          encodeURI(this.inputBlock)
        }&pageNo=${encodeURI(this.currentPage)}&pageSize=${encodeURI(this.changePageSize)}`
      }).then(res => {
        if (res.data.resultCode == "100005") {
          this.$router.push({ path: "/" });
        } else {
          if (res.data.resultList) {
            this.total = res.data.totalCount;
            this.currentPage = res.data.curPage;
            this.resData = res.data.resultList;
            this.dataList(res.data.resultList);
          }
        }
      });
    },
    dataList(tableData) {
      let _this = this;
      let data = tableData;
      data.forEach((item, index) => {
        if (item.status == 1) {
          item.status = "有效";
        } else {
          item.status = "无效";
        }
        item.regionProvince = item.regionProvince.split("-")[1];
        item.regionCity = item.regionCity.split("-")[1];
        item.regionDistrict = item.regionDistrict.split("-")[1];
        item.createTime = this.$moment(item.createTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        item.updateTime = this.$moment(item.updateTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        delete item.id;
      });
      this.lists = data;
    },
    addData() {
      let _this = this;
      this.modelType = 1;
      this.proptype = "街道新增";
      this.dialogVisible = true;
      this.formDisabled = false;
      this.oldName=null;
      this.$nextTick(() => {
        _this.$refs["ruleForm"].clearValidate();
      });
      this.ruleForm.formProvinceSelect = "";
    },
    updateData() {
      let _this = this;
      this.modelType = 0;
      this.proptype = "修改街道管理";
      if (this.checkData.length != 1) {
        this.$message({ type: "info", message: "请选择一条数据包进行修改" });
      } else {
        console.log(this.checkData[0]);
        let data = this.checkData[0];
        this.updateDataId = data.streetId;
        this.dialogVisible = true;
        this.ruleForm.status = data.status == "有效" ? 1 : 2;
        this.$axios({
          method: "get",
          url: `${this.$store.state.globalRouter}/auth/nursing/${
            encodeURI(this.module)
          }/load_for_edit?id=${encodeURI(this.updateDataId)}`
        }).then(res => {
          console.log(res.data.data);
          let resData = res.data.data;
          _this.ruleForm.formProvinceSelect = parseInt(
            resData.regionProvince.split("-")[0]
          );
          setTimeout(() => {
            _this.ruleForm.formCitySelect = parseInt(resData.regionCity.split("-")[0]);
          }, 50);
          setTimeout(() => {
            _this.ruleForm.formAreaSelect = parseInt(
              resData.regionDistrict.split("-")[0]
            );
          }, 100);
          this.ruleForm.streetName = resData.streetName;
          this.oldName=resData.streetName;
        });
      }
    },
    searchData() {
      let data = {
        regionProvince: this.provinceSelect,
        regionCity: this.citySelect,
        regionDistrict: this.areaSelect,
        streetName: this.inputBlock
      };
      var provinceSelect = "";
      var citySelect = "";
      var areaSelect = "";
      if (this.provinceSelect) {
        provinceSelect = this.provinceSelect + "-" + $("#searchProvince").val();
      }
      if (this.citySelect) {
        citySelect = this.citySelect + "-" + $("#searchCity").val();
      }
      if (this.areaSelect) {
        areaSelect = this.areaSelect + "-" + $("#searchArea").val();
      }
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/nursing/${
          encodeURI(this.module)
        }/pagination?regionProvince=${encodeURI(provinceSelect)}&regionCity=${encodeURI(citySelect)}&regionDistrict=${encodeURI(areaSelect)}&streetName=${
          encodeURI(this.inputBlock)
        }&pageNo=${encodeURI(this.currentPage)}&pageSize=${encodeURI(this.changePageSize)}`
      }).then(res => {
        if (res.data.resultList) {
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.resData = res.data.resultList;
          this.dataList(res.data.resultList);
        }
      });
    },
    protocolDetails(index, rowData) {
      console.log(index, rowData);
      this.dialogVisible2 = true;
      this.detailForm.regionProvince = rowData.regionProvince;
      this.detailForm.regionCity = rowData.regionCity;
      this.detailForm.regionDistrict = rowData.regionDistrict;
      this.detailForm.streetName = rowData.streetName;
      this.detailForm.status = rowData.status == "有效" ? 1 : 2;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let province = $("#formProvinceSelect")[0].value;
          let city = $("#formCitySelect")[0].value;
          let area = $("#formAreaSelect")[0].value;
          let data = {
            streetName: this.ruleForm.streetName,
            regionProvince: this.ruleForm.formProvinceSelect + "-" + province,
            regionCity: this.ruleForm.formCitySelect + "-" + city,
            regionDistrict: this.ruleForm.formAreaSelect + "-" + area,
            province: this.ruleForm.formProvinceSelect + "-" + province,
            city: this.ruleForm.formCitySelect + "-" + city,
            district: this.ruleForm.formAreaSelect + "-" + area,
            status: this.ruleForm.status
          };
          if (this.modelType) {
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/nursing/${
                encodeURI(this.module)
              }/save`,
              data
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.searchData();
                this.$message({ type: "success", message: "添加成功" });
              } else {
                this.$message({ type: "error", message: res.data.resultMsg });
              }
            });
          } else {
            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/nursing/${
                this.module
              }/update?id=${parseInt(this.updateDataId)}`,
              data
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.searchData();
                this.$message({ type: "success", message: "修改成功" });
              } else {
                this.$message({ type: "error", message: res.data.resultMsg });
              }
            });
          }
        } else {
          this.$message({ type: "error", message: "非法输入！" });
        }
      });
    },
    deleteData() {
      let _this = this;
      if (this.checkData.length != 1) {
        this.$message("请选择一条数据进行删除");
      } else {
        this.$confirm("是否确定删除该条数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            let streetId = [];
            streetId.push(this.checkData[0].streetId);
            this.$axios({
              method: "get",
              url: `${this.$store.state.globalRouter}/auth/nursing/${
                encodeURI(this.module)
              }/remove?street=${encodeURI(streetId)}`
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.$message({ type: "success", message: "删除成功" });
                this.currentPage=1;
                this.changePageSize=10;
                this.getData();
              } else {
                this.$message({ type: "error", message: res.data.resultMsg });
                this.getData();
              }
            });
          })
          .catch(() => {
            this.$message({ type: "info", message: "取消" });
          });
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage=val;
      this.searchData();
    }
  },
  watch: {
    provinceSelect: function() {
      this.currentPage=1;
      if (this.provinceSelect != "") {
        this.$axios({
          url: `${this.$store.state.globalRouter}/get_regions?parentId=${
            encodeURI(this.provinceSelect)
          }`,
          method: "get"
        }).then(res => {
          this.cityL = res.data;
          this.citySelect = "";
          this.areaSelect = "";
        });
        this.areaL = [];
      }
    },
    citySelect: function() {
      this.currentPage=1;
      if (this.citySelect != "") {
        this.$axios({
          method: "get",
          url: `${this.$store.state.globalRouter}/get_regions?parentId=${
            encodeURI(this.citySelect)
          }`
        }).then(res => {
          this.areaL = res.data;
          this.areaSelect = "";
        });
      }
    },
    areaSelect:function(){
      this.currentPage=1;
    },
    'ruleForm.formProvinceSelect': function() {
      if (this.ruleForm.formProvinceSelect != "") {
        this.$axios({
          url: `${this.$store.state.globalRouter}/get_regions?parentId=${
            encodeURI(this.ruleForm.formProvinceSelect)
          }`,
          method: "get"
        }).then(res => {
          this.cityL = res.data;
          if (this.cityL.length > 0) {
            this.ruleForm.formCitySelect = this.cityL[0].regionId;
          } else {
            this.ruleForm.formCitySelect = "";
            this.ruleForm.formAreaSelect = "";
          }
        });
      } else {
        this.ruleForm.formCitySelect = "";
        this.ruleForm.formAreaSelect = "";
        this.ruleForm.streetName = "";
      }
    },
    'ruleForm.formCitySelect': function() {
      if (this.ruleForm.formCitySelect != "") {
        this.$axios({
          method: "get",
          url: `${this.$store.state.globalRouter}/get_regions?parentId=${
            encodeURI(this.ruleForm.formCitySelect)
          }`
        }).then(res => {
          this.areaL = res.data;
          this.ruleForm.formAreaSelect = this.areaL[0].regionId;
        });
      }
    }
  },
  created() {
    this.$axios({
      //获取省份
      url: `${this.$store.state.globalRouter}/get_provinces`,
      method: "get"
    }).then(res => {
      this.provinceL = res.data;
      this.formProvinceL = res.data;
    });
  },
  mounted() {
    this.getData();
    // 增删改审的权限判断
    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "基础配置管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "nursing/nursing_street") {
              console.log("街道维护", submenu[j]);
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
<style scoped>
.el-pagination {
  text-align: left;
}
</style>
