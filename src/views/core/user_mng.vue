<template>
  <div style="padding:20px;height:100%;">
    <div style="height:95%;background:#fff;padding:5px;overflow:auto">
      <div
        el-row
        style = "padding:10px;text-align: left;"
      >
        <div
          el-col
          span  = "24"
          class = "top"
        >
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "add"
            icon          = "el-icon-plus"
          >新增</el-button>
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "update"
            icon          = "el-icon-edit"
          >修改</el-button>
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "remove"
            icon          = "el-icon-delete"
          >删除</el-button>

          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div
        el-row
        style = "padding:10px;text-align: left;"
      >
        <div
          el-col
          span  = "24"
          class = "top"
        >
          <el-form
            :inline = "true"
            :model  = "searchForm"
              class = "demo-form-inline"
              size  = "mini"
              style = "text-align:left;"
          >
            <el-form-item label="手机:">
              <el-input
                v-model.trim = "searchForm.mobilePhone"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input
                v-model.trim = "searchForm.userName"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证:">
              <el-input
                v-model.trim = "searchForm.cardNo"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type   = "primary"
                @click = "search"
                icon="el-icon-search"
              >查询</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button
                type   = "primary"
                @click = "resetSearch"
              >重置</el-button>
            </el-form-item> -->
          </el-form>

          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div style="padding:5px;height:80%">
      <el-table
        :data = "datalists"
        border
        stripe
        style             = "width: 100%;text-align:left; "
        @selection-change = "handleSelectionChange"
        height="100%"
      >
         <el-table-column
          type  = "selection"
          width = "55"
        ></el-table-column>
        <el-table-column
          prop  = "id"
          label = "序号"
          width = "100"
        ></el-table-column>
        <el-table-column
          prop  = "mobilePhone"
          label = "手机"
        ></el-table-column>
        <el-table-column
          prop  = "userName"
          label = "姓名"
        ></el-table-column>
        <el-table-column
          prop  = "gender"
          label = "性别"
        >
         <template slot-scope="scope">
            <p v-if="scope.row.gender=='M'">
              男
            </p>
            <p v-else>
              女
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "cardNo"
          label = "身份证号"
        ></el-table-column>
        <el-table-column
          prop  = "picCardNo"
          label = "身份证号照片"
        >
         <template slot-scope="scope">
           <div v-if="scope.row.picCardNo">
             <ul v-viewer>
               <img  v-for = "(picItem,index) in scope.row.picCardNo.split('-')"
                              :key    = "index"
                                style = "float:left;list-style:none;width:40px;height:40px;cursor:pointer;margin-right:5px;"
                              :src    = "showData(picItem)"

                                />

                  <!-- <img style="width:40px;height:40px;" :src=$store.state.globalIMGRouter/picItem /> -->


             </ul>

           </div>
          </template>
        </el-table-column>
        <el-table-column
          prop  = "addressDetailed"
          label = "地址"

        >
        </el-table-column>
        <el-table-column
          prop  = "createDateTime"
          label = "注册时间"
          width = "210"
        >
          <template slot-scope="scope">
            {{$moment(scope.row.createDateTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
      </el-table>
      </div>
      <el-dialog
        :title        = "proptype"
        :visible.sync = "dialogVisible"
          width       = "700px"
        center
        :before-close = "handleClose"
      >
        <el-form
          :model        = "ruleForm"
          :rules        = "rules"
            ref         = "ruleForm"
            label-width = "100px"
            class       = "demo-ruleForm"
            style       = "overflow:auto;"
        >
          <el-form-item
            label = "手机号"
            prop  = "mobilePhone"
          >
            <el-col :span="20">
              <el-input
                v-model= "ruleForm.mobilePhone"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "姓名"
            prop  = "userName"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.userName"
               auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "性别"
            prop  = "gender"
          >
            <el-col :span="20" style="text-align:left;">
             <el-select
                v-model     = "ruleForm.gender"
                placeholder = "请选择"
                style       = "width:150px"
                size        = 'mini'
                clearable
              >
                <el-option
                  value = "M"
                  label = "男"
                ></el-option>
                <el-option
                  value = "F"
                  label = "女"
                ></el-option>
              </el-select>

            </el-col>
          </el-form-item>

          <el-form-item
            label = "身份证号"
            prop  = "cardNo"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.cardNo"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "身份证照"
            prop  = "cardImg"
          >
            <el-col :span="20">
             <div class="img_box">
            <ul
              class = "img_list"
              id    = "paperImgs"
            >
              <li>
                <div
                  class = "file_box"
                  style = "float: left"
                >
                  <a
                    href  = "javascript:;"
                    class = "up_img"
                  >
                    <input
                      id       = "imgFile"
                      accept   = "image/gif,image/jpeg,image/png"
                      type     = "file"
                      multiple = "multiple"
                     v-on:change   = "ProcessFile"
                    />
                  </a>
                </div>
              </li>
              <ul
                id = "result"
                v-viewer
              ></ul>
            </ul>
          </div>
            </el-col>
          </el-form-item>
          <el-form-item
            label = "地址"
            prop  = "address"
          >
            <el-col :span="20">
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
            </el-col>
          </el-form-item>

          <el-form-item
            label = "详细地址"
            prop  = "addressDetailed"
          >
            <el-col :span="20">
              <el-input
                v-model      = "ruleForm.addressDetailed"
                auto-complete="off"
                clearable
              ></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <span
          slot  = "footer"
          class = "dialog-footer"
        >
          <el-button
            type   = "primary"
            @click = "submitForm('ruleForm')"
            size   = "mini"
          >提交</el-button>
          <el-button
            @click = "cancle"
            size   = "mini"
          >取 消</el-button>
        </span>
      </el-dialog>

    </div>
    <div class="pageNation" style="height: 5%; margin: 10px 0px;">
      <el-pagination
        @size-change    = "handleSizeChange"
        @current-change = "handleCurrentChange"
      :current-page     = "currentPage"
      :page-sizes       = "pageSize"
      :page-size        = "100"
        layout          = "total, sizes, prev, pager, next, jumper"
      :total            = "total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import base from "../../base/base.js";
import Vue from "vue";
import vueArea from 'vue-area'

export default {
  mixins: [base],
  data() {
    return {
      //分页data
      currentPage   : 1,
      pageSize      : [10, 20, 30, 50],
      total         : 0,
      changePageSize: 10,

      //列表相关
      datalists: [],

      // 搜索相关
      searchForm: {
       mobilePhone: '',
       userName   : '',
       cardNo     : ''
      },



      updateData2: [],
      //
      // 添加或者修改相关
      dialogVisible: false,
      proptype     : "会员管理新增",
      ruleForm     : {
        mobilePhone    : null,
        userName       : null,
        gender         : null,
        cardNo         : null,
        cardImg        : '1',
        address        : '1',
        addressDetailed: null,

      },
      rules: {
        mobilePhone: [
          { required: true, message: "手机号必填", trigger: "blur" },
          // { type: "number", message: "电话必须为数字值" },
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请填大陆有效手机号',trigger:'blur'}
          ],
        userName   : [
          { required: true, message: "姓名必填", trigger: "blur" },
          {pattern:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,message:"请输入真实姓名",trigger:"blur"}
        ],
        gender         : [{ required: true, message: "性别必填", trigger: "change" }],
        cardNo         : [
          { required: true, message: "身份证号必填", trigger: "blur" },
          {pattern:/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,message:"身份证号码无效",trigger:"blur"}
        ],
        cardImg        : [{ required: true}],
        address        : [{ required: true}],
        addressDetailed: [{ required: true, message: "详细地址必填", trigger: "blur" }],

      },
      isAdd: 1,


      // 省市级相关
       selected    : '',
       citySelected: '',
       areaSelected: '',
       provinceL   : [],
       cityL       : [],
       areaL       : [],
       city        : [],
       provinceName: '',
       cityName    : '',
       areaName    : ''
    };
  },
   watch: {
    selected: function () {
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
         this.citySelected = this.cityL[0].regionId;

      })

      this.areaL = [];
    },
    citySelected: function () {
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
         this.areaSelected = this.areaL[0].regionId;
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
  },
  methods: {
    showData(picItem){
      var data = this.$store.state.globalIMGRouter+'/'+picItem
      return data;
    },
    add() {
      this.dialogVisible = true;
      this.proptype      = "会员管理新增";
      this.isAdd         = 1;
      this.ruleForm      = {
        mobilePhone    : null,
        userName       : null,
        gender         : 'M',
        cardNo         : null,
        cardImg        : '1',
        address        : '1',
        addressDetailed: null,


      };
      $('#result').html('');
      let _this=this;
      this.$nextTick(()=>{
        _this.$refs['ruleForm'].clearValidate();
      });
    },
    update() {
      let _this = this;
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        let data               = JSON.parse(JSON.stringify(this.updateData2[0]));
            this.proptype      = "会员管理修改";
            this.isAdd         = 2;
            this.dialogVisible = true;
            this.$nextTick(()=>{
              _this.$refs['ruleForm'].clearValidate();
            });
            this.ruleForm      = JSON.parse(JSON.stringify(data));
            this.ruleForm.mobilePhone=data.mobilePhone;
            if(this.updateData2[0].picCardNo && this.updateData2[0].picCardNo.length>0){
              var picData = this.updateData2[0].picCardNo.split('-');

              var data1 = '<div style="display:inline-block;margin-right:10px;height:80px;float:left;">'

          for(var i=0;i<picData.length;i++){
            var code   = picData[i].split(".")[0].split("/")[3];
                data1 += `<li style='position:relative;width:80px;height:80px;float:left;list-style:none;margin-left:10px;' id='${code}' value33='${
            picData[i]
          }' name='applyImg'><img  style='width:100%;height:100%;cursor:pointer;' src='${
            this.$store.state.globalIMGRouter
          }/${
            picData[i]
          }' /><i class="el-icon-delete" @click='delete11' style='position:absolute;right:10px;bottom:10px;font-size:20px;font-weight:700;' value='${code}'></i></li>`;

          }
                  data1 += '</div>';
                  // console.log('11',data1)
          setTimeout(()=>{
            var MyComponent  = Vue.extend({
            template: data1,
            data() {
              return {};
            },
            methods: {
              delete11(event) {
                // alert("33");
                var goal = event.target.getAttribute("value");
                $("#" + goal).remove();
              }
            }
          });
          var component = new MyComponent().$mount();
          // $("#data-table").append(component.$el);
          $("#result").html(component.$el);
          },200)


            };
            this.ruleForm.cardImg = '1';
            this.ruleForm.address = '1';


      }
    },
    cancle() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isAdd == 1) {
            if($("li[name='applyImg']")){
              var i = $("li[name='applyImg']").length;
              if(i==2 || i=='2'){
                // var applyImgData = "";
                //   for (var j = 0; j < i; j++) {
                //     applyImgData += $("li[name='applyImg']")[j].attributes.value33.value + ";";
                // }
                var applyImg= $("li[name='applyImg']")[0].attributes.value33.value;
                var applyImg1= $("li[name='applyImg']")[1].attributes.value33.value;
                // console.log(this.ruleForm,applyImg,applyImg1,this.selected+'-'+this.provinceName,this.citySelected+'-'+this.cityName,this.areaSelected+'-'+this.areaName);
                var objData={
                  mobilePhone: this.ruleForm.mobilePhone,
                  userName: this.ruleForm.userName,
                  gender: this.ruleForm.gender,
                  cardNo: this.ruleForm.cardNo,
                  applyImg: applyImg,
                  applyImg1: applyImg1,
                  province: this.selected+'-'+this.provinceName,
                  city: this.citySelected+'-'+this.cityName,
                  district: this.areaSelected+'-'+this.areaName,
                  addressDetailed: this.ruleForm.addressDetailed,
                }
                console.log(objData)
                //  添加
                  this.$axios({
              method: "post",
              url   : `${
                this.$store.state.globalRouter
              }/auth/agent_user/save`,
              data: objData
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                alert("添加成功");
              } else {
                alert("添加失败" + res.data.resultMsg);
              }
            });

              }else{
                alert('请上传身份证照片，正、反面各一张');
              }
            }


          } else if (this.isAdd == 2) {
            if($("li[name='applyImg']")){
              var i = $("li[name='applyImg']").length;
              if(i==2 || i=='2'){
                // var applyImg = "";
                //   for (var j = 0; j < i; j++) {
                //     applyImg += $("li[name='applyImg']")[j].attributes.value33.value + ";";
                // }
                var applyImg= $("li[name='applyImg']")[0].attributes.value33.value;
                var applyImg1= $("li[name='applyImg']")[1].attributes.value33.value;
                // console.log(this.ruleForm,applyImg,applyImg1);
                var objData={
                  id:this.updateData2[0].id,
                  mobilePhone: this.ruleForm.mobilePhone,
                  userName: this.ruleForm.userName,
                  gender: this.ruleForm.gender,
                  cardNo: this.ruleForm.cardNo,
                  applyImg: applyImg,
                  applyImg1: applyImg1,
                  province: this.selected+'-'+this.provinceName,
                  city: this.citySelected+'-'+this.cityName,
                  district: this.areaSelected+'-'+this.areaName,
                  addressDetailed: this.ruleForm.addressDetailed,
                }
                // console.log(objData)
                // 修改
                  this.$axios({
              method: "post",
              url   : `${
                this.$store.state.globalRouter
              }/auth/agent_user/update`,
              data: objData
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                alert("修改成功");
              } else {
                alert("修改失败" + res.data.resultMsg);
              }
            });
              }else{
                alert('请上传身份证照片，正、反面各一张');
              }
            }


          }
        } else {
          this.$message("erro submit");
          return false;
        }
      });
    },
    remove() {
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        this.$confirm("是否要删除当前数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText : "取消",
          type             : "warning",
          center           : true
        })
          .then(() => {
            // console.log(this.updateData2[0].id);
            this.$axios({
              url:
                this.$store.state.globalRouter +
                "/auth/agent_user/remove?id=" +
               encodeURI(this.updateData2[0].id),
              method: "get"
            }).then(res => {
              if (res.data.resultCode == "000000") {
                alert("删除成功");
                this.$options.methods.getReloadData(this);
              } else {
                alert("删除失败：" + res.data.resultMsg);
              }
            });
          })
          .catch(() => {
            this.$message({
              type   : "info",
              message: "取消删除"
            });
          });
      }
    },
     // 图片上传相关
    ProcessFile() {
      // alert("66");

      var   file     = document.getElementById("imgFile").files[0];
      const formData = new FormData();
      formData.append("imgFile", file);
      formData.append("fileDir", "assess/");
      this.$axios({
        url: `${this.$store.state.globalRouter}/core/upload_file`,
        // url   : `http://192.168.1.187:4280/insurance-intact-web/upload_paper_img`,
        method: "post",
        data  : formData
      })
        .then(res => {
          // alert($('#imgShow'))
          // $('#imgShow').prepend(`<img src='https://img-blog.csdn.net/20180114000819862?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbTBfMzgwMjIwMjk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' />`)
          // var data=res.data.file.split[]
          var code = res.data.file.split(".")[0].split("/")[3];

          var data = `<li style='position:relative;width:80px;height:80px;float:left;list-style:none;margin-left:10px;' id='${code}' value33='${
            res.data.file
          }' name='applyImg'><img  style='width:100%;height:100%;cursor:pointer;' src='${
            this.$store.state.globalIMGRouter
          }/${
            res.data.file
          }' /><i class="el-icon-delete" @click='delete11' style='position:absolute;right:10px;bottom:10px;font-size:20px;font-weight:700;' value='${code}'></i></li>`;

          var MyComponent = Vue.extend({
            template: data,
            data() {
              return {};
            },
            methods: {
              delete11(event) {
                // alert("33");
                var goal = event.target.getAttribute("value");
                $("#" + goal).remove();
              }
            }
          });
          var component = new MyComponent().$mount();
          // $("#data-table").append(component.$el);
          $("#result").append(component.$el);

          //  var a = 666;
          //  this.$options.methods.handleSuccess();
        })
        .catch(err => {
          console.log(err);
        });
    },
    search() {

      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/agent_user/pagination?mobilePhone=${
          encodeURI(this.searchForm.mobilePhone)
        }&userName=${encodeURI(this.searchForm.userName)}&cardNo=${
          encodeURI(this.searchForm.cardNo)
        }`,
        method: "get"
      }).then(res => {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    resetSearch() {
      this.searchForm = {
         mobilePhone: '',
         userName   : '',
         cardNo     : ''
      };
    },
    // showDetail(id) {
    //   window.localStorage.setItem("cbrJbId", id);
    //   this.$router.push({ path: "/userBasicInfo/user_basic_info_detail" });
    //   // this.currentPlanID = row.planId;
    //   // this.planDate      = this.$moment().format('YYYY-MM-DD');
    //   // $("#executeHistoryListModal").modal("show");
    //   // this.$options.methods.queryExecuteHistoryButton(this.currentPlanID,this.planDate,this);
    // },

    dataList(tableData) {
      this.datalists = tableData;
    },
    //分页methods
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`,this.pageSize);
      this.changePageSize = val;
      this.$options.methods.getReloadData(this);
    },
    handleCurrentChange(val) {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/agent_user/pagination?mobilePhone=${
          encodeURI(this.searchForm.mobilePhone)
        }&userName=${encodeURI(this.searchForm.userName)}&cardNo=${
        encodeURI(this.searchForm.cardNo)
        }&pageSize=${
          this.changePageSize
        }&pageNo=${val}`,
        method: "get"
      }).then(res => {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    indexMethod(index) {
      // return (this.currentPage-1)*this.pageSize[0]+index+1;
      return (this.currentPage - 1) * this.changePageSize + index + 1;
    },
    handleSelectionChange(val) {
      this.updateData2 = val;
      // console.log(this.updateData2)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    getReloadData(that) {
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/agent_user/pagination?mobilePhone=${
          encodeURI(that.searchForm.mobilePhone)
        }&userName=${encodeURI(that.searchForm.userName)}&cardNo=${
          encodeURI(that.searchForm.cardNo)
        }&pageSize=${
            that.changePageSize
          }&pageNo=${that.currentPage}`,
          method: "get"
        })
        .then(res => {
          if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
          } else {
            that.total       = res.data.totalCount;
            that.currentPage = res.data.curPage;
            that.dataList(res.data.resultList);
          }
        });
      // that.reload();
    }
  },
  mounted() {
    // this.getData();
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/agent_user/pagination`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "100005") {
        this.$router.push({ path: "/" });
      } else {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        // for(var item of res.data.resultList){

        // }
        this.dataList(res.data.resultList);
      }
    });

  }
};
</script>

<style scoped>
.top {
  text-align: left;
}
.el-pagination {
  text-align: left;
}
hr {
  margin-top   : 3px;
  margin-bottom: 6px;
}
.el-form-item {
  margin-bottom: 18px;
}
.el-form-item__label {
  width: 150px;
}
.el-form-item__content {
  margin-left: 150px;
}

/* 图片上传样式相关 */
* {
  padding: 0px;
  margin : 0px;
}
li {
  list-style: none;
}
.img_box {
  padding-bottom: 0;
}

.img_list {
  margin-left: 24px;
  width      : 1050px;
}
.img_list li {
  margin-right: 25px;
}

.img_box {
  border  : #d9d9d9 1px solid;
  overflow: hidden;
  /* border-top: none; */
  padding: 20px 0;
}
.file input,
.up_img input {
  position : absolute;
  font-size: 500px;
  right    : 0;
  top      : 0;
  opacity  : 0;
  cursor   : pointer;
  width    : 80px;
  height   : 80px;
}

.up_img {
  width        : 80px;
  height       : 80px;
  display      : block;
  background   : url("../../assets/img/up_img.gif") no-repeat;
  position     : relative;
  overflow     : hidden;
  margin-bottom: 20px;
}

/* 测试上传图片 */
#result {
  float: left;
}
#result li {
  float   : left;
  position: relative;
}
#result img {
  display    : inline-block;
  width      : 80px;
  height     : 80px;
  margin-left: 10px;
}

.el-button--small,
.el-button--small.is-round {
  padding: 9px 15px;
}

.el-button--mini,
.el-button--small {
  font-size    : 12px;
  border-radius: 3px;
}
.el-button--primary {
  color           : #fff;
  background-color: #409eff;
  border-color    : #409eff;
}

.el-button {
  display    : inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor     : pointer;
  /* background        : #fff; */
  border: 1px solid #dcdfe6;
  /* color             : #606266; */
  -webkit-appearance: none;
  text-align        : center;
  -webkit-box-sizing: border-box;
  box-sizing        : border-box;
  outline           : 0;
  margin            : 0;
  -webkit-transition: 0.1s;
  transition        : 0.1s;
  /* padding           : 12px 20px; */
  font-size    : 14px;
  border-radius: 4px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 7px 15px;
}
.el-button--mini,
.el-button--small {
  font-size    : 12px;
  border-radius: 3px;
}
.el-button--warning {
  color           : #fff;
  background-color: #e6a23c;
  border-color    : #e6a23c;
}

.el-button,
.el-checkbox {
  -ms-user-select: none;
  font-weight    : 500;
}
select {
    height: 28px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
}
</style>

