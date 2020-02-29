<template>
  <div class="childCompoment">
    <div>
      <!-- <div>{{items}}</div> -->
      <!-- <div>modelType:{{modelType}}</div>
      <div>flage:{{flage}}</div> -->
      <!-- <div>{{index}}</div> -->
      <el-tabs v-model="items.overallType" type="border-card">
        <el-tab-pane label="一级统筹" name="1">
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
        <el-tab-pane label="二级统筹" name="2">
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
        <el-tab-pane label="三级统筹" name="3">
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
        <el-tab-pane label="四级统筹" name="4">
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
          <div style="overflow:hidden;" class="street">
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
          </div>
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
      // areaName: ""
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
          this.cityL = res.data;
          this.areaL = [];
          this.blockL = [];
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
        // this.cityL = [];
        // this.items.regionCity = "";
      }
    },
    cityChange() {
      if (this.items.regionCity) {
        this.$axios({
          method: "get",
          url: `${this.$store.state.globalRouter}/get_regions?parentId=${
            encodeURI(this.items.regionCity)
          }`
        }).then(res => {
          this.areaL = res.data;
          this.blockL = [];
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
          this.blockL = res.data.data;
          if (this.modelType == 1) {
            this.items.regionStreet = "";
          }
        });
      }
    },
    selectGetProvince(val) {
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
      this.items.street = "";
    },
    selectGetCity(val) {
      let obj = {};
      obj = this.cityL.find(item => {
        return item.regionId === val;
      });
      let getName = "";
      getName = obj.regionName;
      this.items.city = getName;
      this.items.district = "";
      this.items.street = "";
    },
    selectGetDistrict(val) {
      let obj = {};
      obj = this.areaL.find(item => {
        return item.regionId === val;
      });
      let getName = "";
      getName = obj.regionName;
      this.items.district = getName;
      this.items.street = "";
    },
    selectGetStreet(val) {
      let obj = {};
      obj = this.blockL.find(item => {
        return item.streetId === val;
      });
      let getName = "";
      getName = obj.streetName;
      this.items.street = getName;
    },
    getProvince() {
      this.$axios({
        //获取省份
        url: `${this.$store.state.globalRouter}/get_provinces`,
        method: "get"
      }).then(res => {
        this.provinceL = res.data;
      });
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
    'item.regionStreet':{
      handler(newVal, oldVal) {
            this.areaChange();
          },
          immediate: true,
          deep: true
    },
    items: {
      handler(newVal, oldVal) {},
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getProvince();
  },
  mounted() {},
  updated() {}
};
</script>

