<template>
  <div style="padding:20px;height:100%;">
    <div style="background: rgb(255, 255, 255);width:100%;height:100%;overflow:auto;">
      <div
        el-row
        style="padding:10px;text-align: left;overflow:hidden;"
      >
        <div style="width:50%;float:left;">
          <div
            id="main"
            style="width:70%;height:360px;margin:0 auto;"
          ></div>
        </div>
        <div style="width:50%;float:left;height:360px;">
          <table style="width:80%;">
            <tr style="border-bottom:2px solid #ddd;">
              <th>年龄</th>
              <th>人数</th>
              <th>比例</th>
            </tr>
            <tr>
              <td>100以上</td>
              <td>{{insUserGroupByAge.overHundred}}</td>
              <td>{{(insUserGroupByAge.overHundred/NLTotal*100).toFixed(2)}}%</td>
            </tr>
            <tr>
              <td>90-100</td>
              <td>{{insUserGroupByAge.ninety}}</td>
              <td>{{(insUserGroupByAge.ninety/NLTotal*100).toFixed(2)}}%</td>
            </tr>
            <tr>
              <td>80-90</td>
              <td>{{insUserGroupByAge.eighty}}</td>
              <td>{{(insUserGroupByAge.eighty/NLTotal*100).toFixed(2)}}%</td>
            </tr>
            <tr>
              <td>70-80</td>
              <td>{{insUserGroupByAge.seventy}}</td>
              <td>{{(insUserGroupByAge.seventy/NLTotal*100).toFixed(2)}}%</td>
            </tr>
            <tr>
              <td>60-70</td>
              <td>{{insUserGroupByAge.sixty}}</td>
              <td>{{(insUserGroupByAge.sixty/NLTotal*100).toFixed(2)}}%</td>
            </tr>
            <tr>
              <td>50-60</td>
              <td>{{insUserGroupByAge.fifty}}</td>
              <td>{{(insUserGroupByAge.fifty/NLTotal*100).toFixed(2)}}%</td>
            </tr>
            <tr>
              <td>50以下</td>
              <td>{{insUserGroupByAge.underFifty}}</td>
              <td>{{(insUserGroupByAge.underFifty/NLTotal*100).toFixed(2)}}%</td>
            </tr>
          </table>
        </div>
        <table
          class="table table-hover"
          style="margin-bottom:0"
        >
          <thead>
            <tr>
              <th colspan="3">参保人性别分布</th>
            </tr>
            <tr>
              <td
                width="46"
                style="vertical-align:middle"
              >男</td>
              <td width="70%">

                <div
                  style="background-color:#5da5e8;height:20px;float:left;"
                  id="man"
                >

                </div>

              </td>
              <td style="vertical-align:middle">
                {{insUserMale}}

              </td>
            </tr>
            <tr>
              <td style="vertical-align:middle">女</td>
              <td>

                <div
                  style="background-color:#ff5b57;height:20px;float:left;"
                  id="woman"
                >

                </div>

              </td>
              <td style="vertical-align:middle">{{insUserFemale}}</td>
            </tr>
          </thead>
        </table>
        <table
          class="table table-hover"
          style="margin-bottom:0px;margin-top:20px;padding:20px 0px;"
        >
          <thead>
            <tr>
              <th colspan="3">参保人参保类型分布</th>
            </tr>
            <tr>
              <td
                width="46"
                style="vertical-align:middle"
              >职工</td>
              <td width="70%">

                <div
                  style="background-color:#5da5e8;height:20px;float:left;"
                  id="worker"
                >

                </div>

              </td>
              <td style="vertical-align:middle">
                {{worker}}

              </td>
            </tr>
            <tr>
              <td style="vertical-align:middle">城乡</td>
              <td>

                <div
                  style="background-color:#ff5b57;height:20px;float:left;"
                  id="people"
                >

                </div>

              </td>
              <td style="vertical-align:middle">{{people}}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts"; //引入echarts
import Vue from "vue";
export default {
  data() {
    return {
      insUserMale: "1842人，49%",
      insUserFemale: "1938人，51%",
      insUserGroupByAge: [],
      NLTotal: 1,
      worker: 200,
      people: 2606
    };
  },
  destroyed() {},
  mounted() {
    this.initChart();
    this.getYb();
    $("#woman").css("width", `${49}%`);
    $("#man").css("width", `${51}%`);
    $("#worker").css("width", `${19}%`);
    $("#people").css("width", `${81}%`);
  },
  methods: {
    initChart() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/assess/assess_chart_ins/get_data`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "000000") {
          var data = res.data.data;
          // 男女比例赋值
          var totalNN = data.insUserFemale + data.insUserMale;
          this.insUserMale =
            data.insUserMale +
            "，" +
            ((data.insUserMale / totalNN) * 100).toFixed(2) +
            "%";
          this.insUserFemale =
            data.insUserFemale +
            "，" +
            ((data.insUserFemale / totalNN) * 100).toFixed(2) +
            "%";
          $("#woman").css(
            "width",
            `${((data.insUserFemale / totalNN) * 100).toFixed(2)}%`
          );
          $("#man").css(
            "width",
            `${((data.insUserMale / totalNN) * 100).toFixed(2)}%`
          );
          // 年龄数据赋值
          var nlfb1 = [
            "50以下",
            "50岁",
            "60岁",
            "70岁",
            "80岁",
            "90岁",
            "100以上"
          ];
          var nlfb3 = [0, 0, 0, 0, 0, 0, 0];
          var dataNL = res.data.data.insUserGroupByAge;
          this.insUserGroupByAge = res.data.data.insUserGroupByAge;
          var totalNL =
            dataNL.underFifty +
            dataNL.fifty +
            dataNL.sixty +
            dataNL.seventy +
            dataNL.eighty +
            dataNL.ninety +
            dataNL.overHundred;
          this.NLTotal =
            dataNL.underFifty +
            dataNL.fifty +
            dataNL.sixty +
            dataNL.seventy +
            dataNL.eighty +
            dataNL.ninety +
            dataNL.overHundred;
          nlfb3[0] = {
            name: "50以下",
            value: dataNL.underFifty
          };
          nlfb3[1] = {
            name: "50岁",
            value: dataNL.fifty
          };
          nlfb3[2] = {
            name: "60岁",
            value: dataNL.sixty
          };
          nlfb3[3] = {
            name: "70岁",
            value: dataNL.seventy
          };
          nlfb3[4] = {
            name: "80岁",
            value: dataNL.eighty
          };
          nlfb3[5] = {
            name: "90岁",
            value: dataNL.ninety
          };
          nlfb3[6] = {
            name: "100以上",
            value: dataNL.overHundred
          };

          // 指定图表的配置项和数据
          var option = {
            // legend: ["50以下", "50岁", "60岁", "70岁", "80岁","90岁","100以上"],
            legend: {},
            tooltip: {
              show: true,
              formatter: "{b}&nbsp;&nbsp;&nbsp;人数：{c}&nbsp;&nbsp;比例：{d}%"
            },
            color: [
              "#ff5b57",
              "#f59c1a",
              "#00acac",
              "#49b6d6",
              "#348fe2",
              "#727cb6",
              "#b6c2c9"
            ],
            // xAxis: {type: 'category'},
            // yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
              {
                name: "年龄分布",
                type: "pie",
                radius: ["0%", "70%"],
                avoidLabelOverlap: false,
                // startAngle:-180,
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    borderColor: "#fff"
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: "inner"
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: "30",
                      fontWeight: "bold"
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: nlfb3
              }
            ]
          };

          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main"), "walden");
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        } else {
          // this.number1 = '1666'
        }
      });
    },
    getYb() {
      this
        .$axios({
          url: `${
            this.$store.state.globalRouter
          }/core/assess_chart_cost/medical_inse_category_count`,
          method: "get"
        })
        .then(res => {
          if (res.data) {
            if(res.data.职工){
              this.worker = res.data.职工;
            }else{
              this.worker=0;
            }
            if(res.data.城乡){
              this.people = res.data.城乡;
            }else{
              this.people=0;
            }


            var totalNN=this.worker+this.people;
            $("#worker").css("width", `${((this.worker / totalNN) * 100).toFixed(2)}%`);
            $("#people").css("width", `${((this.people / totalNN) * 100).toFixed(2)}%`);
          }
        });
    }
  }
};
</script>
<style scoped>
tr {
  border-bottom: 1px solid #ddd;
}
th {
  padding: 10px 15px;
}
td {
  padding: 10px 15px;
}
</style>


