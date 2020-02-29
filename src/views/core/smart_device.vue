<template>
  <div style="padding:5px;height:100%;">
    <div
      class = "tableBox"
      style = "background:#fff;padding:5px;height:100%;"
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
        <el-date-picker
            style="margin-left:80px"
            size='small'
            v-model.trim="dateTime"
            type="date"
            :picker-options="pickerOptions0"
            >
        </el-date-picker>
        <el-button
          type   = "primary"
          icon="el-icon-search"
          size   = "small"
          @click = "search"
        >查询</el-button>
        <div class="grid-content bg-purple-dark"></div>
      </div>
      <!-- <div
        el-col
        span  = "24"
        style = "text-align:left;"
      >
        <el-date-picker
            size='small'
            v-model.trim="dateTime"
            type="date"
            placeholder="请选择日期">
        </el-date-picker>
        <el-button
          type   = "primary"
          icon="el-icon-search"
          size   = "small"
          @click = "search"
        >查询</el-button>
        <div class="grid-content bg-purple-dark"></div>
      </div> -->
      <div style="margin-top:10px;">
          <div
            id="main1"
            style="width:100%;"
         >
         </div>
         <div
            id="main"
            style="width:100%;height:600px;"
         >
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts"; //引入echarts
import Vue from "vue";
export default {
  data(){
      return{
          idNo:null,
          dateTime:null,
          pickerOptions0: {
            disabledDate(time) {
                return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e6就是不可以选择今天的
            }
          },
      }
  },
  methods: {
      back(){
          this.$router.push({ path: "/user_info" });
      },
      search(){
          if(this.dateTime){
            //   this.$moment().format('YYYY:MM:DD');
            // console.log(this.$moment(this.dateTime).format('YYYY-MM-DD'),this.idNo)
            this.$axios({
                url: `${
                this.$store.state.globalRouter
                }/auth/ins_user/find_sport_point_by_date?idCard=${encodeURI(this.idNo)}&startDateQuery=${encodeURI(this.$moment(this.dateTime).format('YYYY-MM-DD'))}`,
                method: "get"
            }).then(res => {
                var data=res.data.list;
                if (data && data.length>0) {
                    // var countNum=86400;
                    var countNum = 2000;
                    var categoryData = [];
                    var valueData = [];
                    for (var i = 0; i < data.length; i++) {
                        categoryData.push(data[i].date);
                        valueData.push(data[i].value);
                    }
                    var titleData='运动数据';

                    // var categoryData=['2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01'];
                    // var valueData=['4334.00','222'];
                    var option = {
                        title: {
                          text:titleData,
                        //   textAlign:'center'
                          left:'center'
                        },
                        // toolbox: {
                        //   feature: {
                        //     dataZoom: {
                        //       yAxisIndex: false
                        //     },
                        //     saveAsImage: {
                        //       pixelRatio: 2
                        //     }
                        //   }
                        // },
                        tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // type: "shadow"
                            type: "line"
                        }
                        },
                        grid: {
                        bottom: 90
                        },
                        dataZoom: [
                        {
                            type: "inside"
                        },
                        {
                            type: "slider",
                            backgroundColor:'rgba(47,69,84,0)',
                            fillerColor:"rgba(63, 177, 227, 0.3)",
                            borderColor:'#ddd',
                            // textStyle:{
                            //     color:''
                            // }
                        }
                        ],
                        xAxis: {
                        data: categoryData,
                        silent: false,
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        }
                        // 坐标轴显示单位
                        // axisLabel:{interval:1000}
                        },
                        yAxis: {
                        // show:false,
                        axisLine:{
                            show:true
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                            color:['#efefef'],
                            type:'dashed',
                            // opacity:0.6
                            }
                        },
                        },
                        visualMap: {
                        show: false,
                        dimension: 1,
                        // pieces: [{gt: 800,lte: 1000,color: "rgba(247, 238, 214, 1)"}], //pieces的值由动态数据决定
                        pieces: [{lt:1,color:'red'},{gte:1, lte: 400000,color:'#65C0E8'},{gt: 400000,color: "pink"}], //pieces的值由动态数据决定
                        // outOfRange: {
                        //     //  color: '#349e85'
                        //     // color:['#349e85', 'rgba(63, 177, 227, 0.6)', '#349e85']
                        //     // color: "rgba(63, 177, 227, 0.8)"
                        //     color: "rgba(63, 177, 227, 0)"
                        //     // color:'red'
                        // },
                        },
                        series: [
                        {
                            type: "line",
                            symbolSize: 0,
                            smooth: true,
                            data: valueData,
                            // markLine: {
                            //     silent: true,
                            //     data: [{
                            //         yAxis: 800
                            //     }],
                            //     lineStyle:{
                            //       color:'rgba(215, 0, 64, 0.8)',
                            //       type:'solid'
                            //     }
                            // },
                            // areaStyle:{
                            //   // color: {
                            //   //   type: 'linear',
                            //   //   x: 0,
                            //   //   y: 0,
                            //   //   x2: 0,
                            //   //   y2: 1,
                            //   //   colorStops: [{
                            //   //       offset: 0, color: 'pink' // 0% 处的颜色
                            //   //   }, {
                            //   //       offset: 1, color: 'green' // 100% 处的颜色
                            //   //   }],
                            //   //   global: true // 缺省为 false
                            //   // }
                            // },
                            // Set `large` for large data amount
                            large: true,
                        }
                        ]
                    };
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById("main"), "walden");
                    //使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option,true);
                    //清空画布，防止缓存
                    myChart.clear();
                    //使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option,true);
                } else {
                    var titleData='暂无运动数据';
                    var option = {
                        title: {
                          text:'暂无运动数据',
                        //   textAlign:'center'
                          left:'center'
                        },
                        // toolbox: {
                        //   feature: {
                        //     dataZoom: {
                        //       yAxisIndex: false
                        //     },
                        //     saveAsImage: {
                        //       pixelRatio: 2
                        //     }
                        //   }
                        // },
                        tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // type: "shadow"
                            type: "line"
                        }
                        },
                        grid: {
                        bottom: 90
                        },
                        dataZoom: [
                        {
                            type: "inside"
                        },
                        {
                            type: "slider",
                            backgroundColor:'rgba(47,69,84,0)',
                            fillerColor:"rgba(63, 177, 227, 0.3)",
                            borderColor:'#ddd',
                            // textStyle:{
                            //     color:''
                            // }
                        }
                        ],
                        xAxis: {
                        data: [0],
                        silent: false,
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        }
                        // 坐标轴显示单位
                        // axisLabel:{interval:1000}
                        },
                        yAxis: {
                        // show:false,
                        axisLine:{
                            show:true
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                            color:['#efefef'],
                            type:'dashed',
                            // opacity:0.6
                            }
                        },
                        },
                        visualMap: {
                        show: false,
                        dimension: 1,
                        // pieces: [{gt: 800,lte: 1000,color: "rgba(247, 238, 214, 1)"}], //pieces的值由动态数据决定
                        pieces: [{gt: 400000,lte: 1000000,color: "pink"}], //pieces的值由动态数据决定
                        outOfRange: {
                            //  color: '#349e85'
                            // color:['#349e85', 'rgba(63, 177, 227, 0.6)', '#349e85']
                            // color: "rgba(63, 177, 227, 0.8)"
                            color: "rgba(63, 177, 227, 0.8)"
                        }
                        },
                        series: [
                        {
                            type: "line",
                            symbolSize: 0,
                            smooth: true,
                            data: [0],
                            // markLine: {
                            //     silent: true,
                            //     data: [{
                            //         yAxis: 800
                            //     }],
                            //     lineStyle:{
                            //       color:'rgba(215, 0, 64, 0.8)',
                            //       type:'solid'
                            //     }
                            // },
                            // areaStyle:{
                            //   // color: {
                            //   //   type: 'linear',
                            //   //   x: 0,
                            //   //   y: 0,
                            //   //   x2: 0,
                            //   //   y2: 1,
                            //   //   colorStops: [{
                            //   //       offset: 0, color: 'pink' // 0% 处的颜色
                            //   //   }, {
                            //   //       offset: 1, color: 'green' // 100% 处的颜色
                            //   //   }],
                            //   //   global: true // 缺省为 false
                            //   // }
                            // },
                            // Set `large` for large data amount
                            large: true
                        }
                        ]
                    };
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById("main"), "walden");
                    //使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option,true);
                    //清空画布，防止缓存
                    myChart.clear();
                    //使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option,true);
                }
            });
          }else{
              this.$message('请选择日期');
          }

      },
    // getData() {
    //   // var countNum=86400;
    //   var countNum = 2000;
    //   var categoryData = [];
    //   var valueData = [];
    //   for (var i = 0; i < countNum; i++) {
    //     categoryData.push(Math.random(200, 900).toFixed(3) * 1000);
    //     valueData.push(Math.random(1, 900).toFixed(3) * 1000);
    //   }

    //   // var categoryData=['2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01'];
    //   // var valueData=['4334.00','222'];
    //   var option = {
    //     title: {
    //       text: echarts.format.addCommas(countNum) + " Data",
    //       left: 10
    //     },
    //     toolbox: {
    //       feature: {
    //         dataZoom: {
    //           yAxisIndex: false
    //         },
    //         saveAsImage: {
    //           pixelRatio: 2
    //         }
    //       }
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         type: "shadow"
    //       }
    //     },
    //     grid: {
    //       bottom: 90
    //     },
    //     dataZoom: [
    //       {
    //         type: "inside"
    //       },
    //       {
    //         type: "slider"
    //       }
    //     ],
    //     xAxis: {
    //       data: categoryData,
    //       silent: false,
    //       splitLine: {
    //         show: false
    //       },
    //       splitArea: {
    //         show: false
    //       }
    //       // 坐标轴显示单位
    //       // axisLabel:{interval:1000}
    //     },
    //     yAxis: {
    //       splitArea: {
    //         show: false
    //       },
    //       splitLine: {
    //         show: false
    //       }
    //     },
    //     visualMap: {
    //       show: false,
    //       dimension: 1,
    //       pieces: [], //pieces的值由动态数据决定
    //       outOfRange: {
    //         //  color: '#349e85'
    //         // color:['#349e85', 'rgba(63, 177, 227, 0.6)', '#349e85']
    //         color: "rgba(63, 177, 227, 0.8)"
    //       }
    //     },
    //     series: [
    //       {
    //         type: "line",
    //         symbolSize: 0,
    //         smooth: true,
    //         data: valueData,
    //         itemStyle: {
    //           normal: {
    //             // areaStyle:{
    //             //   type:'linear',
    //             //   color:new echarts.graphic.LinearGradient(0,1,0,0,[{
    //             //     offset:0,
    //             //     // color:'#349e85'
    //             //     color:"rgba(63, 177, 227, 0.3)"
    //             //   },
    //             //   {
    //             //     offset:0.7999,
    //             //     // color:'#349e85'
    //             //     color:"rgba(63, 177, 227, 0.8)"
    //             //   },
    //             //   {
    //             //     offset:0.8,
    //             //     // color:'#349e85'
    //             //     color:"rgba(247, 238, 214, 0.8)"
    //             //   },
    //             //   {
    //             //     offset:1,
    //             //     // color:'#349e85'
    //             //     color:"rgba(247, 238, 214, 0.3)"
    //             //   }
    //             //   ])
    //             // },
    //             // linStyle:{
    //             //   color:'#349e85'
    //             // },
    //             // label:{
    //             //   show:false
    //             // }
    //           }
    //         },
    //         areaStyle: {},
    //         // Set `large` for large data amount
    //         large: true
    //       }
    //     ]
    //   };
    //   option.visualMap.pieces[0] = {
    //     gte: 900,
    //     lte: 1000,
    //     color: "rgba(247, 238, 214, 1)"
    //   };
    //   option.visualMap.pieces[1] = {
    //     gte: 800,
    //     lte: 900,
    //     color: "rgba(247, 238, 214, 0.96)"
    //   };
    //   option.visualMap.pieces[2] = {
    //     gte: 700,
    //     lte: 800,
    //     color: "rgba(63, 177, 227, 0.70)"
    //   };
    //   option.visualMap.pieces[3] = {
    //     gte: 600,
    //     lte: 700,
    //     color: "rgba(63, 177, 227, 0.74)"
    //   };
    //   option.visualMap.pieces[4] = {
    //     gte: 500,
    //     lte: 600,
    //     color: "rgba(63, 177, 227, 0.76)"
    //   };
    //   option.visualMap.pieces[5] = {
    //     gte: 400,
    //     lte: 500,
    //     color: "rgba(63, 177, 227, 0.78)"
    //   };

    //   // 基于准备好的dom，初始化echarts实例
    //   var myChart = echarts.init(document.getElementById("main"), "walden");
    //   // 使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(option);
    // },
    // getData() {
    //   // var countNum=86400;
    //   var countNum = 2000;
    //   var categoryData = [];
    //   var valueData = [];
    //   for (var i = 0; i < countNum; i++) {
    //     categoryData.push(Math.random(200, 900).toFixed(3) * 1000);
    //     valueData.push(Math.random(1, 900).toFixed(3) * 1000);
    //   }

    //   // var categoryData=['2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01','2011-01-01 00:00:00','2011-01-01 00:00:01'];
    //   // var valueData=['4334.00','222'];
    //   var option = {
    //     // title: {
    //     //   text: echarts.format.addCommas(countNum) + " Data",
    //     //   left: 10
    //     // },
    //     // toolbox: {
    //     //   feature: {
    //     //     dataZoom: {
    //     //       yAxisIndex: false
    //     //     },
    //     //     saveAsImage: {
    //     //       pixelRatio: 2
    //     //     }
    //     //   }
    //     // },
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         // type: "shadow"
    //         type: "line"
    //       }
    //     },
    //     grid: {
    //       bottom: 90
    //     },
    //     dataZoom: [
    //       {
    //         type: "inside"
    //       },
    //       {
    //         type: "slider",
    //         backgroundColor:'rgba(47,69,84,0)',
    //         fillerColor:"rgba(63, 177, 227, 0.3)",
    //         borderColor:'#ddd',
    //         // textStyle:{
    //         //     color:''
    //         // }
    //       }
    //     ],
    //     xAxis: {
    //       data: categoryData,
    //       silent: false,
    //       splitLine: {
    //         show: false
    //       },
    //       splitArea: {
    //         show: false
    //       }
    //       // 坐标轴显示单位
    //       // axisLabel:{interval:1000}
    //     },
    //     yAxis: {
    //       // show:false,
    //       axisLine:{
    //         show:true
    //       },
    //       splitArea: {
    //         show: false
    //       },
    //       splitLine: {
    //         show: true,
    //         lineStyle:{
    //           color:['#efefef'],
    //           type:'dashed',
    //           // opacity:0.6
    //         }
    //       },
    //     },
    //     visualMap: {
    //       show: false,
    //       dimension: 1,
    //       // pieces: [{gt: 800,lte: 1000,color: "rgba(247, 238, 214, 1)"}], //pieces的值由动态数据决定
    //       pieces: [{gt: 800,lte: 1000,color: "pink"}], //pieces的值由动态数据决定
    //       outOfRange: {
    //         //  color: '#349e85'
    //         // color:['#349e85', 'rgba(63, 177, 227, 0.6)', '#349e85']
    //         // color: "rgba(63, 177, 227, 0.8)"
    //         color: "rgba(63, 177, 227, 0.8)"
    //       }
    //     },
    //     series: [
    //       {
    //         type: "line",
    //         symbolSize: 0,
    //         smooth: true,
    //         data: valueData,
    //         // markLine: {
    //         //     silent: true,
    //         //     data: [{
    //         //         yAxis: 800
    //         //     }],
    //         //     lineStyle:{
    //         //       color:'rgba(215, 0, 64, 0.8)',
    //         //       type:'solid'
    //         //     }
    //         // },
    //         // areaStyle:{
    //         //   // color: {
    //         //   //   type: 'linear',
    //         //   //   x: 0,
    //         //   //   y: 0,
    //         //   //   x2: 0,
    //         //   //   y2: 1,
    //         //   //   colorStops: [{
    //         //   //       offset: 0, color: 'pink' // 0% 处的颜色
    //         //   //   }, {
    //         //   //       offset: 1, color: 'green' // 100% 处的颜色
    //         //   //   }],
    //         //   //   global: true // 缺省为 false
    //         //   // }
    //         // },
    //         // Set `large` for large data amount
    //         large: true
    //       }
    //     ]
    //   };
    //   // 基于准备好的dom，初始化echarts实例
    //   var myChart = echarts.init(document.getElementById("main"), "walden");
    //   // 使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(option);
    // },
  },
  mounted() {
    this.idNo=window.localStorage.getItem('cbrId');
    this.dateTime=this.$moment(new Date()).format('YYYY-MM-DD');
    this.search();
  }
};
</script>






