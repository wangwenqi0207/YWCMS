<template>
 <div style="padding:20px;height:100%">
    <div class style="height:100%;background:#fff;padding:5px;overflow: auto;">
    <div style="width:100%;height:40px;text-align:left;line-height:40px;padding-left:30px;margin-bottom:10px;background:#2d353c;color:#fff;">工单数量统计</div>
    <div style="overflow:hidden;height:100px;width:96%;margin:20px auto 30px;text-align:center;color:#fff;">
      <div style="width:28%;background:#eee;height:100%;float:left;padding:10px;background:#008a8a;">
        <p>累计工单总量</p>
        <p style="font-size:18px;font-weight:700;">6666</p>
        <p>初评：<span>11</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;复评：<span>22</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持续评估：<span>22</span></p>
      </div>
      <div style="width:20%;background:#eee;height:100%;float:left;margin-left:6%;padding:10px;background:#1993E4;">
        <p>年工单量</p>
        <p style="font-size:18px;font-weight:700;">11111</p>
      </div>
      <div style="width:20%;background:#eee;height:100%;float:left;margin-left:3%;padding:10px;background:#5b6392;">
        <p>月工单量</p>
        <p style="font-size:18px;font-weight:700;">66</p>
      </div>
      <div style="width:20%;background:#eee;height:100%;float:left;margin-left:3%;padding:10px;background:#2d353c;">
        <p>日工单量</p>
        <p style="font-size:18px;font-weight:700;">99</p>
      </div>
    </div>
    <div
      class="row"
      style="width:96%;margin-top:30px!important;margin-left:5px!important;margin:0 auto;"
    >
      <div class="col-md-12">
        <ul class="nav nav-tabs" style="background: #ddd;">
          <li
            class="active"
            style="width:80px;text-align:center;"
          ><a
              href="#default-tab-1"
              @click="yearTabClick();"
              data-toggle="tab"
            >年</a></li>
          <li
            class=""
            style="width:80px;text-align:center;"
          ><a
              href="#default-tab-2"
              @click="monthTabClick();"
              data-toggle="tab"
            >月</a></li>
          <li
            class=""
            style="width:165px;text-align:center;float:right;background:#ccc;"
          >
            <a
              id="selectTitle"
              href="javascript:;"
              data-toggle="dropdown"
              class="btn btn-default dropdown-toggle"
              style="background:#ccc;"
            >年份 <span
                id="caret"
                class="caret"
              ></span></a>
            <ul
              class="dropdown-menu"
              id="selectBar"
              style="text-align:center;"
            >

            </ul>
          </li>
        </ul>
        <!-- <div
          class="tab-content"
          style="margin-bottom:0;padding-bottom:0"
        >
          <div
            class="tab-pane fade active in"
            id="default-tab-1"
          >

            <div
              id="nv-bar-chart1"
              class="height-md"
            >

            </div>

          </div>
          <div
            class="tab-pane fade"
            id="default-tab-2"
          >

            <div
              id="nv-bar-chart2"
              class="height-md"
            >

            </div>

          </div>
        </div> -->

        <div
              id="nv-bar-chart2"
              class="height-md"
              style="width:100%;height:400px;"
            >

            </div>
      </div>
    </div>
    <hr style="height:1px;margin:0;width:95%;margin-left:25px;">
    <div
      class="row"
      style="width:95%;margin-top:5px;margin-left:25px;"
    >
    </div>
    <input type="hidden" id="selectedYear" />
	<input type="hidden" id="selectedMonth" />
    </div>
    </div>
</template>
<script>
import Vue from "vue";
import echarts from "echarts"; //引入echarts
export default {
    data() {
        return {
            vYear:2019
        }
    },
    methods: {
        yearTabClick(){


			$("#selectTitle").html($("#selectedYear").val() + "年   <span class='caret'></span>");
			var html = "<div>";
			for (var i = 0; i < 10; i++) {
				html += "<li><a name='yearLi' href='javascript:;' @click='yearClick("+(this.vYear-i)+")'>"+(this.vYear-i)+"</a></li>";
            }
            html+='</div>'
            var MyComponent = Vue.extend({
                template: html,
                data() {
                    return {

                    };
                },
                methods: {
                    yearClick(year){
                        // 清空柱状图
                        // $("#nv-bar-chart1").empty();

                        $("#selectedYear").val(year);
                        $("#selectTitle").html(year + "年   <span class='caret'></span>");
                        console.log(year)

                        var option = {
                            color: ['#3398DB'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },
                                formatter:'{a}年{b}月：数量&nbsp;&nbsp;&nbsp;{c}'
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data : ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12'],
                                    axisTick: {
                                        alignWithLabel: true
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    name:year,
                                    type:'bar',
                                    barWidth: '60%',
                                    data:[10, 52, 200, 334, 390, 330, 10, 52, 200, 334, 390, 330]
                                }
                            ]
                        };

                        // 基于准备好的dom，初始化echarts实例
                        var myChart = echarts.init(document.getElementById("nv-bar-chart2"), "walden");
                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);

                        // $.getJSON("<@sp.ctx />core/assess_chart_amount.htm?act=getChartByYear&year="+year,function cb(list){

                        // 	// 设置参数
                        //     var e = [{
                        //         key: "Cumulative Return",
                        //         values: []
                        //     }];
                        //     for (var i = 1; i <= list.length; i++) {
                        //     	var b = {
                        //             	label: i,
                        //                 value: list[i-1],
                        //                 color: color.blue
                        //             };

                        //         e[0].values.push(b);
                        // 	}
                        //     // 柱状图加载
                        //     ChartNvd3.init(e,1);
                        // });


                    },

                },
                mounted() {

                }
            });
            var component = new MyComponent().$mount();
            // event.$el.appendChild(component.$el);
            $("#selectBar").html(component.$el);

            // 清空柱状图
			// $("#nv-bar-chart2").empty();
			setTimeout(function(){
				$("a[name='yearLi']").get(0).click();
			},150);

		},



		monthTabClick(){

			$("#selectTitle").html("1 月   <span class='caret'></span>");
			var html = "<div>";
			for (var i = 1; i <= 12; i++) {
				html += "<li><a name='monthLi' href='javascript:;' @click='monthClick("+i+")'>"+i+" 月</a></li>";
            }
            html += "</div>";
            var MyComponent = Vue.extend({
                template: html,
                data() {
                    return {

                    };
                },
                methods: {
                    monthClick(month){
                        // 清空柱状图
                        // $("#nv-bar-chart2").empty();

                        $("#selectedMonth").val(month);
                        $("#selectTitle").html($("#selectedYear").val() + " 年 " + month + " 月   <span class='caret'></span>");
                        console.log(month)


                        var option = {
                            color: ['#3398DB'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },
                                formatter:'{a}{b}日：数量&nbsp;&nbsp;&nbsp;{c}'
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
                                    axisTick: {
                                        alignWithLabel: true
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    name:$("#selectedYear").val() + " 年 " + month + " 月",
                                    type:'bar',
                                    barWidth: '60%',
                                    data:[10, 52, 200, 334, 390, 10, 52, 200, 334, 390,10, 52, 200, 334, 390,10, 52, 200, 334, 390,10, 52, 200, 334, 390,10, 52, 200, 334, 390,2]
                                }
                            ]
                        };


                        // 基于准备好的dom，初始化echarts实例
                        var myChart = echarts.init(document.getElementById("nv-bar-chart2"), "walden");
                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);


                        // $.getJSON("<@sp.ctx />core/assess_chart_amount.htm?act=getChartByYearAndMonth&year="+$("#selectedYear").val()+"&month="+month,function cb(list){

                        // 	// 设置参数
                        //     var e = [{
                        //         key: "Cumulative Return",
                        //         values: []
                        //     }];
                        //     for (var i = 1; i <= list.length; i++) {
                        //     	var b = {
                        //             	label: i,
                        //                 value: list[i-1],
                        //                 color: color.blue
                        //             };

                        //         e[0].values.push(b);
                        // 	}
                        //     // 柱状图加载
                        //     ChartNvd3.init(e,2);
                        // });






                    },



                },
                mounted() {

                }
            });
            var component = new MyComponent().$mount();
            // event.$el.appendChild(component.$el);
			$("#selectBar").html(component.$el);
			// $("#selectBar").html(html);

			// 清空柱状图
			// $("#nv-bar-chart2").empty();
			setTimeout(function(){
				$("a[name='monthLi']").get(0).click();
			},150);
		},




		// // 生成柱状图方法
		// handleBarChart(e,type) {
	    //     "use strict";
	    //     nv.addGraph(function() {
	    //         var a = nv.models.discreteBarChart().x(function(e) {
	    //             return e.label
	    //         }).y(function(e) {
	    //             return e.value
	    //         }).showValues(!0).duration(250).valueFormat(function(d) { return d==0?"":commasFormatter(d);});
	    //         switch(type){
	    //         	case 1:
	    //         		return a.tooltip.keyFormatter(function(d) { return $("#selectedYear").val() + "年" + commasFormatter(d) + "月";}),
	    //         			   a.tooltip.valueFormatter(function(d) { return "数量:" + commasFormatter(d);}),
	    //         			   a.yAxis.tickFormat(d3.format(",.0f")), d3.select("#nv-bar-chart1").append("svg").datum(e).call(a), nv.utils.windowResize(a.update), a
	    //         	case 2:
	    //         		return a.tooltip.keyFormatter(function(d) { return $("#selectedYear").val() + "年" + $("#selectedMonth").val() + "月" + commasFormatter(d) + "日";}),
        //  			   		   a.tooltip.valueFormatter(function(d) { return "数量:" + commasFormatter(d);}),
	    //         			   a.yAxis.tickFormat(d3.format(",.0f")), d3.select("#nv-bar-chart2").append("svg").datum(e).call(a), nv.utils.windowResize(a.update), a
	    //         	default:
	    //         		return null;
	    //         }
        //     })
	    // },
	    // ChartNvd3 = function(e,type) {
	    //     "use strict";
	    //     return {
	    //         init: function(e,type) {
	    //             handleBarChart(e,type)
	    //         }
	    //     }
	    // }(),
    },
    mounted() {
        // 获取时间
        var date = new Date();
		this.vYear = date.getFullYear();
        $("#selectedYear").val(this.vYear);
        // 界面初始化
        // 界面初始化
		this.yearTabClick();
		// $("a[name='yearLi']").get(0).click();
    },
}
</script>
<style scoped>
/* .nav-tabs>li>a {
    margin-right: 2px;
    line-height: 1.42857143;
    border: 1px solid #ddd;
    border-radius: 4px 4px 0 0;
} */
</style>




