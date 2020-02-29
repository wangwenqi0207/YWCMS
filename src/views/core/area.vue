<template>
  <div style="text-align:left;">
    <select v-model="selected" autofocus v-if="provinceL" style="width:32%;display:inline-block;height:24px;">
      <option disabled value="请选择城市">请选择城市</option>
      <option v-for="(item,index) in provinceL" :value="item.regionId" :key="index">{{item.regionName}}</option>
    </select>
    <select v-model="citySelected" v-if="cityL" style="width:32%;display:inline-block;height:24px;">
      <option disabled value="请选择城市">请选择城市</option>
      <option v-for="(item,index) in cityL" :value="item.regionId" :key="index">{{item.regionName}}</option>
    </select>
    <select v-model="areaSelected" v-if="areaL" style="width:32%;display:inline-block;height:24px;">
      <option disabled value="请选择城市">请选择区县</option>
      <option v-for="(item,index) in areaL" :value="item.regionId" :key="index">{{item.regionName}}</option>
    </select>
  </div>
</template>

<script>
import vueArea from 'vue-area'
// import { province, city, area } from '../../assets/js/vue-area.js'

export default {
  name: 'app',
  data() {
    return {
      msg: '省市联动',
      // selected: {
      //   regionId  : 3879,
      //   regionName: "北京市",
      //   parentId  : 0
      // },
      selected    : '',
      citySelected: '',
      areaSelected: '',
      provinceL   : [],
      cityL       : [],
      areaL       : [],
      city        : [],
      provinceName: '',
      cityName    : '',
      areaName    : '',

      // 省市区计数
      provinceCount:1,
      cityCount:1

    }
  },
  watch: {
    selected: function () {
      this.provinceCount++;
      for(var item of this.provinceL){
        if(item.regionId==this.selected){
          this.provinceName = item.regionName;
        }
      }

      // console.log(this.selected,this.provinceName)
     this.$axios({
        url:`${
        this.$store.state.globalRouter
      }/get_regions?parentId=${encodeURI(this.selected)}`,
      method: 'get'
      }).then(res=>{
        // console.log(res)
         this.cityL        = res.data;
        //  this.citySelected = this.cityL[0].regionId;
        if(this.provinceCount>2){
          this.citySelected = this.cityL[0].regionId;
        }

      })
      this.areaL = [];

    },
    citySelected: function () {
      this.cityCount++;
      for(var item of this.cityL){
        if(item.regionId==this.citySelected){
          this.cityName = item.regionName;
        }
      }
      // console.log(this.citySelected,this.cityName)
    this.$axios({
        url:`${
        this.$store.state.globalRouter
      }/get_regions?parentId=${encodeURI(this.citySelected)}`,
      method: 'get'
      }).then(res=>{
        // console.log(res)
         this.areaL        = res.data;
        //  this.areaSelected = this.areaL[0].regionId;
        if(this.cityCount>2){
          this.areaSelected = this.areaL[0].regionId;
        }
      })

    },
    areaSelected:function(){
      for(var item of this.areaL){
        if(item.regionId==this.areaSelected){
          this.areaName = item.regionName;
        }
      }
      // console.log(this.areaSelected,this.areaName)
    }
  },
  components: {
    vueArea: vueArea
  },
  methods: {

  },

  created() {
    // console.log(province)
    this.$axios({
    url:`${
        this.$store.state.globalRouter
      }/get_provinces`,
      method: 'get'
  }).then(res=>{
    this.provinceL = res.data;
    // console.log(this.provinceL)
    // this.selected = this.provinceL[0].regionId;
    this.selected = 337;

  });
  this.provinceCount=1;
  this.cityCount=1;
  },


}
</script>

<style lang="scss">
*{
  padding: 0px;
  margin : 0px;
}

// select {
//   width: 200px;
// }
</style>
