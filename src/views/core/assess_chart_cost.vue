<template>
 <div style="padding:20px;height:100%">
    <div class style="height:100%;background:#fff;padding:5px;overflow: auto;">
    <div style="width:100%;height:40px;text-align:left;line-height:40px;padding-left:30px;margin-bottom:10px;background:#2d353c;color:#fff;">评估费用统计</div>
    <div style="overflow:hidden;height:100px;width:96%;margin:20px auto 30px;text-align:center;color:#fff;">
      <div style="width:28%;background:#eee;height:100%;float:left;padding:10px;background:#f59c1a;">
        <p>总评估费用（元）</p>
        <p style="font-size:18px;font-weight:700;">{{data1.orderTotal}}</p>
        <p>个人支付：<span>{{data1.OrderCostFrom1}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基金支付：<span>{{data1.OrderCostFrom0}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发起方承担：<span>{{data1.OrderCostFrom2}}</span></p>
      </div>
      <div style="width:20%;background:#eee;height:100%;float:left;margin-left:6%;padding:10px;background:#1993E4;">
        <p>年评估费用</p>
        <p style="font-size:18px;font-weight:700;">{{data1.thisYearOrderTotal}}</p>
      </div>
      <div style="width:20%;background:#eee;height:100%;float:left;margin-left:3%;padding:10px;background:#5b6392;">
        <p>月评估费用</p>
        <p style="font-size:18px;font-weight:700;">{{data1.thisMonthOrderTotal}}</p>
      </div>
      <div style="width:20%;background:#eee;height:100%;float:left;margin-left:3%;padding:10px;background:#2d353c;">
        <p>日评估费用</p>
        <p style="font-size:18px;font-weight:700;">{{data1.todayOrderTotal}}</p>
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
            vYear:2019,
            mouthData:[80, 0, 200, 334, 390, 330, 10, 52, 200, 334, 390, 330],
            dayData:[52, 200, 334, 390, 10, 52, 200, 334, 390,10, 52, 200, 334, 390,10, 52, 200, 334, 390,10, 52, 200, 334, 390,10, 52, 200, 334, 390,2],
            data1:{
                orderTotal:0,
                OrderCostFrom1:0,
                OrderCostFrom0:0,
                OrderCostFrom2:0,
                thisYearOrderTotal:0,
                thisMonthOrderTotal:0,
                todayOrderTotal:0
            }
        }
    },
    methods: {
      getData(){
        this.$axios({
                        url: `${
                          this.$store.state.globalRouter
                        }/core/assess_chart_cost/get_index`,
                        method: "get"
                      }).then(res => {
                        if (res.data) {
                          this.data1=res.data;
                        }
                        })
      },
        yearTabClick(){
          var that=this;


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
                      that.$axios({
                        url: `${
                          that.$store.state.globalRouter
                        }/core/assess_chart_cost/getChartByYear?year=${year}`,
                        method: "get"
                      }).then(res => {
                        if (res.data) {
                          // 清空柱状图
                          // $("#nv-bar-chart1").empty();

                          $("#selectedYear").val(year);
                          $("#selectTitle").html(year + "年   <span class='caret'></span>");
                          var data1=[];
                          var data2=[];
                          that.mouthData=res.data;
                          for(var i=1;i<=that.mouthData.length;i++){
                            data1.push(i);
                            data2.push(that.mouthData[i-1])
                          }
                          var option = {
                              color: ['#3398DB'],
                              tooltip : {
                                  trigger: 'axis',
                                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                  },
                                  formatter:'{a}年{b}月：费用&nbsp;&nbsp;&nbsp;{c}元'
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
                                      data : data1,
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
                                      data:data2
                                  }
                              ]
                          };

                          // 基于准备好的dom，初始化echarts实例
                          var myChart = echarts.init(document.getElementById("nv-bar-chart2"), "walden");
                          // 使用刚指定的配置项和数据显示图表。
                          myChart.setOption(option);
                        }
                      })
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
      var that=this;

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
                      that.$axios({
                        url: `${
                          that.$store.state.globalRouter
                        }/core/assess_chart_cost/getChartByYearAndMonth?year=${$("#selectedYear").val()}&month=${month}`,
                        method: "get"
                      }).then(res => {
                        if (res.data) {
                          // 清空柱状图
                          // $("#nv-bar-chart2").empty();
                          $("#selectedMonth").val(month);
                          $("#selectTitle").html($("#selectedYear").val() + " 年 " + month + " 月   <span class='caret'></span>");
                          var data1=[];
                          var data2=[];
                          that.dayData=res.data;
                          for(var i=1;i<=that.dayData.length;i++){
                            data1.push(i);
                            data2.push(that.dayData[i-1])
                          }
                          var option = {
                              color: ['#3398DB'],
                              tooltip : {
                                  trigger: 'axis',
                                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                  },
                                  formatter:'{a}{b}日：费用&nbsp;&nbsp;&nbsp;{c}元'
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
                                      data : data1,
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
                                      data:data2
                                  }
                              ]
                          };


                          // 基于准备好的dom，初始化echarts实例
                          var myChart = echarts.init(document.getElementById("nv-bar-chart2"), "walden");
                          // 使用刚指定的配置项和数据显示图表。
                          myChart.setOption(option);

                        }
                      })
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
    this.getData();
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




