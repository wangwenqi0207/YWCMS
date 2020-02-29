<template>
  <div class="childCompoment">
    <div>
      <!-- <div>{{items}}</div> -->
      <!-- <div>modelType:{{modelType}}</div>
      <div>flage:{{flage}}</div>-->
      <!-- <div>{{index}}</div> -->
      <!-- <h1>areaL</h1>
      <div>{{areaL}}</div>
      <h2>blockL</h2>
      <div>{{blockL}}</div> -->
      <el-tabs v-model="items.overallType" type="border-card">
        <el-tab-pane label="一级统筹" name="1" :disabled="tab_pane_disabled">
          <div style="overflow:hidden;">
            <span style="display:block;float:left;width:50px;text-align:center;">省：</span>
            <el-select
              v-model="items.regionProvince"
              @change="selectGetProvince"
              placeholder="请选择省"
              style="width:80%;float:left;"
              size="mini"
              v-if="provinceL"
              id="province"
              clearable
            >
              <el-option
                v-for="(item,index) in provinceL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
          </div>
        </el-tab-pane>
        <el-tab-pane label="二级统筹" name="2" :disabled="tab_pane_disabled">
          <div style="overflow:hidden;">
            <span style="display:block;float:left;width:50px;text-align:center;">省：</span>
            <el-select
              v-model="items.regionProvince"
              @change="selectGetProvince"
              placeholder="请选择省"
              style="width:80%;float:left;"
              size="mini"
              v-if="provinceL"
              id="province"
              clearable
            >
              <el-option
                v-for="(item,index) in provinceL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
          </div>
          <div style="overflow:hidden;" class="city">
            <span style="display:block;float:left;width:50px;text-align:center;">市：</span>
            <el-select
              v-model="items.regionCity"
              @change="selectGetCity"
              placeholder="请选择市"
              style="width:80%;float:left;"
              size="mini"
              v-if="cityL"
              id="city"
              clearable
            >
              <el-option
                v-for="(item,index) in cityL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
          </div>
        </el-tab-pane>
        <el-tab-pane label="三级统筹" name="3" :disabled="tab_pane_disabled">
          <div style="overflow:hidden;">
            <span style="display:block;float:left;width:50px;text-align:center;">省：</span>
            <el-select
              v-model="items.regionProvince"
              @change="selectGetProvince"
              placeholder="请选择省"
              style="width:80%;float:left;"
              size="mini"
              v-if="provinceL"
              id="province"
              clearable
            >
              <el-option
                v-for="(item,index) in provinceL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
          </div>
          <div style="overflow:hidden;" class="city">
            <span style="display:block;float:left;width:50px;text-align:center;">市：</span>
            <el-select
              v-model="items.regionCity"
              @change="selectGetCity"
              placeholder="请选择市"
              style="width:80%;float:left;"
              size="mini"
              v-if="cityL"
              id="city"
              clearable
            >
              <el-option
                v-for="(item,index) in cityL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
          </div>
          <div style="overflow:hidden;" class="district">
            <span style="display:block;float:left;width:50px;text-align:center;">区：</span>
            <el-select
              v-model="items.regionDistrict"
              @change="selectGetDistrict"
              placeholder="请选择区"
              style="width:80%;float:left;"
              size="mini"
              v-if="areaL"
              id="district"
              clearable
            >
              <el-option
                v-for="(item,index) in areaL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
          </div>
        </el-tab-pane>
        <el-tab-pane label="四级统筹" name="4" :disabled="tab_pane_disabled">
          <div style="overflow:hidden;" class="province">
            <span style="display:block;float:left;width:50px;text-align:center;">省：</span>
            <el-select
              v-model="items.regionProvince"
              @change="selectGetProvince"
              placeholder="请选择省"
              style="width:80%;float:left;"
              size="mini"
              v-if="provinceL"
              id="province"
              clearable
            >
              <el-option
                v-for="(item,index) in provinceL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
          </div>
          <div style="overflow:hidden;" class="city">
            <span style="display:block;float:left;width:50px;text-align:center;">市：</span>
            <el-select
              v-model="items.regionCity"
              @change="selectGetCity"
              placeholder="请选择市"
              style="width:80%;float:left;"
              size="mini"
              v-if="cityL"
              id="city"
              clearable
            >
              <el-option
                v-for="(item,index) in cityL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
          </div>
          <div style="overflow:hidden;" class="district">
            <span style="display:block;float:left;width:50px;text-align:center;">区：</span>
            <el-select
              v-model="items.regionDistrict"
              @change="selectGetDistrict"
              placeholder="请选择区"
              style="width:80%;float:left;"
              size="mini"
              v-if="areaL"
              id="district"
              clearable
            >
              <el-option
                v-for="(item,index) in areaL"
                :value="item.regionId"
                :label="item.regionName"
                :key="index"
              >{{item.regionName}}</el-option>
            </el-select>
          </div>
          <!-- <div style="overflow:hidden;" class="street">
            <span style="display:block;float:left;width:50px;text-align:center;">街道：</span>
            <el-select
              v-model="items.regionStreet"
              @change="selectGetStreet"
              placeholder="请选择街道"
              style="width:80%;float:left;"
              size="mini"
              id="block"
              clearable
            >
              <el-option
                v-for="(item,index) in blockL"
                :value="item.streetId"
                :label="item.streetName"
                :key="index"
              >{{item.streetName}}</el-option>
            </el-select>
          </div> -->
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
           <el-checkbox-group v-model="checkedStreets" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(item,index) in blockL" :label="item" :key="index" >{{item.split('-')[1]}}</el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" size="mini" @click="deleteArea(index)">删除</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //三级联动
      provinceL: [],
      cityL: [],
      areaL: [],
      blockL: [],
      checkAll: false,
      isIndeterminate: true,
      checkedStreets:[],
    };
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    items: {
      type: Object,
      default: Array
    },
    modelType: {
      type: Number,
      required: true
    },
    flage: {
      type: Number,
      required: true
    },
    tab_pane_disabled:{
      type:Boolean,
      required:true
    }
  },
  methods: {
    deleteArea(val) {
      this.$emit("deleteIndexArea", this.index);
    },
    provinceChange() {
      if (this.items.regionProvince) {
        this.$axios({
          url: `${this.$store.state.globalRouter}/get_regions?parentId=${
            encodeURI(this.items.regionProvince)
          }`,
          method: "get"
        }).then(res => {
          this.cityL=res.data;
          this.areaL=[];
          // this.blockL=[];
          if (this.modelType == 1) {
            this.items.regionCity = "";
            this.items.regionDistrict = "";
            this.items.regionStreet = "";
          }

          // if(this.flage==1&&this.modelType==0){
          //   this.items.regionCity='';
          //   this.items.regionDistrict='';
          //   this.items.regionStreet='';
          // }
        });
      } else {
        this.cityL=[];
        this.areaL=[];
        // this.blockL=[];
        this.items.regionCity="";
        this.items.regionDistrict="";
        this.items.regionStreet="";
        this.items.province="";
        this.items.city="";
        this.items.district="";
        this.items.street=[];
      }
    },
    cityChange() {
      if (this.items.regionCity) {
        this.$axios({
          url: `${this.$store.state.globalRouter}/get_regions?parentId=${
            encodeURI(this.items.regionCity)
          }`,
          method: "get",
          // headers:{
          //   'Content-Type': 'application/json; charset=utf-8'
          // }
        }).then(res => {
          this.areaL = res.data;
          // this.blockL=[];
          if (this.modelType == 1) {
            this.items.regionDistrict = "";
            this.items.regionStreet = "";
          }
        });
      } else {
        // this.areaL = [];
      }
    },
    areaChange() {
      if (this.items.regionDistrict) {
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_street_mng/find_nursing_street_by_district?district=${
            encodeURI(this.items.regionDistrict)
          }-${encodeURI(this.items.district)}`
        }).then(res => {
          // console.log(res.data.data);
          let result=JSON.parse(JSON.stringify(res.data.data));
          let blocksArr=[];
          let mid="";
          if(result.length){
            result.forEach((item,index)=>{
              mid=item.streetId+'-'+item.streetName;
              blocksArr.push(mid);
            })
          }
          this.blockL=blocksArr;
          if(this.items.street){
            this.checkedStreets=this.items.street;
          }else{
            this.checkedStreets=[];
          }

          if (this.modelType == 1) {
            this.items.regionStreet = "";
          }

        });
      }
    },
    selectGetProvince(val) {
      if(val){
          let obj = {};
        obj = this.provinceL.find(item => {
          return item.regionId === val;
        });
        let getName = "";
        getName = obj.regionName;
        // console.log(getName);
        this.items.province = getName;
        this.items.city = "";
        this.items.district = "";
        this.items.street = [];
      }else{
        this.cityL=[];
        this.areaL=[];
        // this.blockL=[];
        this.items.regionCity="";
        this.items.regionDistrict="";
        this.items.regionStreet="";
        this.items.province="";
        this.items.city="";
        this.items.district="";
        this.items.street=[];
      }

    },
    selectGetCity(val) {
      if(val){
        let obj = {};
        obj = this.cityL.find(item => {
          return item.regionId === val;
        });
        let getName = "";
        getName = obj.regionName;
        this.items.city = getName;
        this.items.district = "";
        this.items.street = [];
      }else{
        this.areaL=[];
        // this.blockL=[];
        this.items.regionDistrict="";
        this.items.regionStreet="";
        this.items.city="";
        this.items.district="";
        this.items.street=[];
      }

    },
    selectGetDistrict(val) {
      if(val){
          let obj = {};
        obj = this.areaL.find(item => {
          return item.regionId === val;
        });
        let getName = "";
        getName = obj.regionName;
        this.items.district = getName;
      }else{
        this.blockL=[];
        this.items.regionStreet="";
        this.items.district="";
        this.items.street=[];
      }
    },
    selectGetStreet(val) {
      if(val){
          let obj = {};
        obj = this.blockL.find(item => {
          return item.streetId === val;
        });
        let getName = "";
        getName = obj.streetName;
        this.items.street = getName;
      }

    },
    getProvince() {
      this.$axios({
        //获取省份
        url: `${this.$store.state.globalRouter}/get_provinces`,
        method: "get"
      }).then(res => {
        this.provinceL = res.data;
      });
    },
    handleCheckAllChange(val) {
        this.checkedStreets = val ? this.blockL : [];
        this.isIndeterminate = false;
        this.items.street=this.checkedStreets;
      },
    handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.blockL.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.blockL.length;
        this.items.street=value;

    }
  },
  watch: {
    "items.regionProvince": {
      handler(newVal, oldVal) {
        this.provinceChange();
      },
      immediate: true,
      deep: true
    },
    "items.regionCity": {
      handler(newVal, oldVal) {
        this.cityChange();
      },
      immediate: true,
      deep: true
    },
    "items.regionDistrict": {
      handler(newVal, oldVal) {
        this.areaChange();
      },
      immediate: true,
      deep: true
    },
    "item.regionStreet": {
      handler(newVal, oldVal) {
      },
      immediate: true,
      deep: true
    },
    "items.overallType":{
      handler(newVal, oldVal) {
        if(this.items.overallType!=4){
          // this.checkedStreets=[];
          // this.items.street=[];
          if(this.modelType==1){
            this.checkedStreets=[];
            this.items.street=[];
          }
        }

      },
        // immediate: true,
        deep: true
    },
    items: {
      handler(newVal, oldVal) {},
      deep: true,
      immediate: true
    }
  },
  // created() {
  //   this.getProvince();
  // },
  mounted() {
    this.getProvince();
  },
  updated() {}
};
</script>

