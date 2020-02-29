<template>
  <div style="padding:20px;height:100%;">
    <div style="height:95%;background:#fff;padding:5px;overflow:auto">
      <div el-row style="padding:10px;text-align: left;">
        <div el-col span="24" class="top">
          <el-button type="primary" size="small" @click.native="add" icon="el-icon-plus">新增</el-button>
          <el-button type="primary" size="small" @click.native="update" icon="el-icon-edit">修改</el-button>
          <el-button type="primary" size="small" @click.native="remove" icon="el-icon-delete">删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div el-row style="padding:10px;text-align: left;">
        <div el-col span="24" class="top">
          <el-form
            :inline="true"
            :model="searchForm"
            class="demo-form-inline"
            size="mini"
            style="text-align:left;"
          >
            <el-form-item label="标题:">
              <el-input v-model.trim="searchForm.title" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态:">
              <el-select
                v-model="searchForm.status"
                placeholder="请选择"
                style="width:150px"
                size="mini"
                clearable
              >
                <el-option value="0" label="有效"></el-option>
                <el-option value="1" label="无效"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button
                type   = "primary"
                @click = "resetSearch"
              >重置</el-button>
            </el-form-item>-->
          </el-form>

          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <div style="padding:5px;height:80%">
      <el-table
        :data="datalists"
        border
        stripe
        style="width: 100%;text-align:left; "
        @selection-change="handleSelectionChange"
        height="100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="100"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="introduction" label="简介"></el-table-column>
        <el-table-column prop="updateTime" label="上次修改时间" width="160"></el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <p v-if="scope.row.status=='0' || scope.row.status==0">有效</p>
            <p v-else>无效</p>
          </template>
        </el-table-column>

        <el-table-column prop="needAssistItem" label="操作" width="130">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="showData(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <el-dialog
        :title="proptype"
        :visible.sync="dialogVisible"
        width="800px"
        center
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="overflow:auto;"
        >
          <el-form-item label="标题" prop="title">
            <!-- <el-col :span="20"> -->
            <el-input v-model="ruleForm.title" auto-complete="off" clearable></el-input>
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item label="简介" prop="introduction">
            <!-- <el-col :span="20"> -->
            <el-input v-model="ruleForm.introduction" auto-complete="off" clearable></el-input>
            <!-- </el-col> -->
          </el-form-item>

          <el-form-item label="简介图片" prop="cardImg">
            <!-- <el-col :span="20"> -->
            <div class="img_box">
              <ul class="img_list" id="paperImgs">
                <li>
                  <div class="file_box" style="float: left" id="file_box">
                    <a href="javascript:;" class="up_img">
                      <input
                        id="imgFile"
                        accept="image/gif, image/jpeg, image/png"
                        type="file"
                        multiple="multiple"
                        v-on:change="ProcessFile"
                      >
                    </a>
                  </div>
                </li>
                <ul id="result" v-viewer></ul>
              </ul>
            </div>
            <!-- </el-col> -->
          </el-form-item>
          <el-form-item label="详情" prop="addressDetailed">
            <div v-html="content" @input="result" id="editor" style="height:200px;"></div>

            <!-- </el-col> -->
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-col :span="20" style="text-align:left;">
              <el-select
                v-model="ruleForm.status"
                placeholder="请选择"
                style="width:150px"
                size="mini"
                clearable
              >
                <el-option value="0" label="有效"></el-option>
                <el-option value="1" label="无效"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')" size="mini" id="submit">提交</el-button>
          <el-button @click="cancle" size="mini">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="pageNation" style="height: 5%; margin: 10px 0px;">
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
import base from "../../base/base.js";
import Vue from "vue";
// 编辑器相关
import WangEditor from "wangeditor";

export default {
  // 编辑器相关

  mixins: [base],
  data() {
    return {
      //分页data
      currentPage: 1,
      pageSize: [10, 20, 30, 50],
      total: 0,
      changePageSize: 10,

      //列表相关
      datalists: [],

      // 搜索相关
      searchForm: {
        title: "",
        status: ""
      },

      updateData2: [],
      //
      // 添加或者修改相关
      dialogVisible: false,
      proptype: "评估管理问题新增",
      ruleForm: {
        title: "",
        introduction: "",
        cardImg: "1",
        addressDetailed: "1",
        status: "0"
      },
      rules: {
        title: [{ required: true, message: "资讯标题必填", trigger: "blur" }],
        introduction: [
          { required: true, message: "简介必填", trigger: "blur" }
        ],

        cardImg: [{ required: true }],
        addressDetailed: [{ required: true }],
        status: [{ required: true, message: "状态必选", trigger: "change" }]
      },
      isAdd: 1,

      // 编辑器相关
      editor: null,
      // content:'<p>999</p><p><iframe src="http://www.iqiyi.com/w_19rz7x67i1.html" width="640" height="498"></iframe></p><p><br></p>'
      content: "<p>999</p>"
    };
  },
  // 编辑器相关

  methods: {
    // 编辑器相关
    //  submit(){
    //         this.$emit('input', this.editor.$txt.html())
    //         console.log(this.editor.$txt.html());
    //     },
    result() {
      this.$emit("input", this.editor.$txt.html());
    },

    add() {
      this.dialogVisible = true;
      this.proptype = "资讯新增";
      this.isAdd = 1;
      this.ruleForm = {
        title: "",
        introduction: "",
        cardImg: "1",
        addressDetailed: "1",
        status: "0"
      };
      $("#result").html("");

      // 编辑器相关
      if (this.editor) {
        this.content = null;
      } else {
        var that = this;

        setTimeout(() => {
          var editor = new WangEditor("editor");
          // console.log(editor);
          editor.config.menus = [
            "source",
            "|",
            "bold",
            "underline",
            "italic",
            "strikethrough",
            "eraser",
            "forecolor",
            "bgcolor",
            "|",
            "quote",
            "fontfamily",
            "fontsize",
            "head",
            "unorderlist",
            "orderlist",
            "alignleft",
            "aligncenter",
            "alignright",
            "|",
            "link",
            "unlink",
            "table",
            "img",
            "video",
            "insertcode",
            "|",
            "undo",
            "redo",
            "fullscreen"
          ];
          editor.config.uploadImgUrl = `${
            this.$store.state.globalRouter
          }/core/upload_file`;
          editor.config.uploadImgFileName = "imgFile";

          //  editor.config.uploadImgServer = 'ww' //图片上传地址
          editor.config.uploadParams = {
            fileDir: "assess/"
          };
          // 自定义load事件
          editor.config.uploadImgFns.onload = function(resultText, xhr) {
            // resultText 服务器端返回的text
            // xhr 是 xmlHttpRequest 对象，IE8、9中不支持

            // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
            var originalName = editor.uploadImgOriginalName || "";
            // console.log('111',JSON.parse(resultText))

            // 如果 resultText 是图片的url地址，可以这样插入图片：
            editor.command(
              null,
              "insertHtml",
              '<img src="' +
                that.$store.state.globalIMGRouter +
                "/" +
                JSON.parse(resultText).file +
                '" alt="' +
                originalName +
                '" style="max-width:100%;"/>'
            );
            // 如果不想要 img 的 max-width 样式，也可以这样插入：
            // editor.command(null, 'InsertImage', resultText);
          };

          // 自定义timeout事件
          editor.config.uploadImgFns.ontimeout = function(xhr) {
            // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
            alert("上传超时");
          };

          // 自定义error事件
          editor.config.uploadImgFns.onerror = function(xhr) {
            // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
            alert("上传错误");
          };

          editor.create();
          that.editor = editor;
          that.content = null;
        }, 100);
      }

      // 添加时提交，添加图片按钮有效
      setTimeout(() => {
        // 隐藏提交按钮
        $("#submit").show();
        document
          .getElementById("file_box")
          .setAttribute("style", "float:left;");
      }, 100);
    },
    update() {
      let _this = this;
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
        let data = JSON.parse(JSON.stringify(this.updateData2[0]));
        this.proptype = "资讯修改";
        this.isAdd = 2;
        this.dialogVisible = true;
        this.ruleForm = JSON.parse(JSON.stringify(data));

        this.ruleForm.addressDetailed = "1";

        if (
          this.updateData2[0].picList &&
          this.updateData2[0].picList.length > 0
        ) {
          var picData = this.updateData2[0].picList.split("-");
          var data1 =
            '<div style="display:inline-block;margin-right:10px;height:80px;float:left;">';
          for (var i = 0; i < picData.length - 1; i++) {
            var code = picData[i].split(".")[0].split("/")[3];
            data1 += `<li style='position:relative;width:80px;height:80px;float:left;list-style:none;margin-left:10px;' id='${code}' value33='${
              picData[i]
            }' name='applyImg'><img  style='width:100%;height:100%;cursor:pointer;' src='${
              this.$store.state.globalIMGRouter
            }/${
              picData[i]
            }' /><i class="el-icon-delete" @click='delete11' style='position:absolute;right:10px;bottom:10px;font-size:20px;font-weight:700;' value='${code}'></i></li>`;
          }
          data1 += "</div>";
          // console.log('11',data1)
          setTimeout(() => {
            var MyComponent = Vue.extend({
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
          }, 200);
        }

        // 修改时提交，添加图片按钮有效
        setTimeout(() => {
          // 隐藏提交按钮
          $("#submit").show();
          document
            .getElementById("file_box")
            .setAttribute("style", "float:left;");
        }, 100);
        this.ruleForm.cardImg = "1";
        this.ruleForm.address = "1";

        var editData = "";
        if (
          this.updateData2[0].contentFirst != null &&
          this.updateData2[0].contentFirst != "null"
        ) {
          editData += this.updateData2[0].contentFirst;
        }
        if (
          this.updateData2[0].contentSecond != null &&
          this.updateData2[0].contentSecond != "null"
        ) {
          editData += this.updateData2[0].contentSecond;
        }
        if (
          this.updateData2[0].contentThird != null &&
          this.updateData2[0].contentThird != "null"
        ) {
          editData += this.updateData2[0].contentThird;
        }
        if (
          this.updateData2[0].contentFour != null &&
          this.updateData2[0].contentFour != "null"
        ) {
          editData += this.updateData2[0].contentFour;
        }
        if (
          this.updateData2[0].contentFive != null &&
          this.updateData2[0].contentFive != "null"
        ) {
          editData += this.updateData2[0].contentFive;
        }

        // 编辑器相关
        if (this.editor) {
          this.content = editData;
        } else {
          var that = this;
          setTimeout(() => {
            var editor = new WangEditor("editor");
            // console.log(editor);
            editor.config.menus = [
              "source",
              "|",
              "bold",
              "underline",
              "italic",
              "strikethrough",
              "eraser",
              "forecolor",
              "bgcolor",
              "|",
              "quote",
              "fontfamily",
              "fontsize",
              "head",
              "unorderlist",
              "orderlist",
              "alignleft",
              "aligncenter",
              "alignright",
              "|",
              "link",
              "unlink",
              "table",
              "img",
              "video",
              "insertcode",
              "|",
              "undo",
              "redo",
              "fullscreen"
            ];
            editor.config.uploadImgUrl = `${
              this.$store.state.globalRouter
            }/core/upload_file`;
            editor.config.uploadImgFileName = "imgFile";

            //  editor.config.uploadImgServer = 'ww' //图片上传地址
            editor.config.uploadParams = {
              fileDir: "assess/"
            };
            // 自定义load事件
            editor.config.uploadImgFns.onload = function(resultText, xhr) {
              // resultText 服务器端返回的text
              // xhr 是 xmlHttpRequest 对象，IE8、9中不支持

              // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
              var originalName = editor.uploadImgOriginalName || "";
              // console.log('111',JSON.parse(resultText))

              // 如果 resultText 是图片的url地址，可以这样插入图片：
              editor.command(
                null,
                "insertHtml",
                '<img src="' +
                  that.$store.state.globalIMGRouter +
                  "/" +
                  JSON.parse(resultText).file +
                  '" alt="' +
                  originalName +
                  '" style="max-width:100%;"/>'
              );
              // 如果不想要 img 的 max-width 样式，也可以这样插入：
              // editor.command(null, 'InsertImage', resultText);
            };

            // 自定义timeout事件
            editor.config.uploadImgFns.ontimeout = function(xhr) {
              // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
              alert("上传超时");
            };

            // 自定义error事件
            editor.config.uploadImgFns.onerror = function(xhr) {
              // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
              alert("上传错误");
            };

            editor.create();
            that.editor = editor;
            that.content = editData;
          }, 100);
        }
      }
    },
    cancle() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isAdd == 1) {
            if ($("li[name='applyImg']")) {
              var i = $("li[name='applyImg']").length;
              if ((i > 0 && i <= 3) || (i > "0" && i <= "3")) {
                var applyImg = "";
                for (var j = 0; j < i; j++) {
                  applyImg +=
                    $("li[name='applyImg']")[j].attributes.value33.value + "-";
                }
                // console.log('图片',applyImg);
              } else {
                alert("请上传简介图片1到3张");
              }

              console.log(
                this.content,
                applyImg,
                this.ruleForm.title,
                this.ruleForm.introduction
              );
              var objData = {
                title: this.ruleForm.title,
                introduction: this.ruleForm.introduction,
                picOrderFirst: $("li[name='applyImg']")[0]
                  ? $("li[name='applyImg']")[0].attributes.value33.value
                  : null,
                picOrderSecond: $("li[name='applyImg']")[1]
                  ? $("li[name='applyImg']")[1].attributes.value33.value
                  : null,
                picOrderThird: $("li[name='applyImg']")[2]
                  ? $("li[name='applyImg']")[2].attributes.value33.value
                  : null,
                picList: applyImg,
                // contentFirst:this.editor.$txt.html(),
                content: this.editor.$txt.html(),
                status: this.ruleForm.status
              };
              console.log(objData);
            }

            this.$axios({
              method: "post",
              url: `${this.$store.state.globalRouter}/auth/consultationMng/add`,
              // data:{body:objData}
              data: objData
              // emulateJSON: true,
              // contentType: 'application/json;charset=UTF-8'
            }).then(res => {
              if (res.data.resultCode == "000000") {
                this.dialogVisible = false;
                this.$options.methods.getReloadData(this);
                alert("新增成功");
              } else {
                alert("添加失败：" + res.data.resultMsg);
              }
            });
          } else if (this.isAdd == 2) {
            if ($("li[name='applyImg']")) {
              var i = $("li[name='applyImg']").length;
              // console.log('长度',i);
              if ((i > 0 && i <= 3) || (i > "0" && i <= "3")) {
                var applyImg = "";
                for (var j = 0; j < i; j++) {
                  applyImg +=
                    $("li[name='applyImg']")[j].attributes.value33.value + "-";
                }
                // console.log('图片',applyImg);
              } else {
                alert("请上传简介图片1到3张");
              }

              console.log(
                applyImg,
                this.ruleForm.title,
                this.ruleForm.introduction
              );
              var objData = {
                title: this.ruleForm.title,
                introduction: this.ruleForm.introduction,
                // picOrderFirst:$("li[name='applyImg']")[0].attributes.value33.value,
                picOrderFirst: $("li[name='applyImg']")[0]
                  ? $("li[name='applyImg']")[0].attributes.value33.value
                  : null,
                picOrderSecond: $("li[name='applyImg']")[1]
                  ? $("li[name='applyImg']")[1].attributes.value33.value
                  : null,
                picOrderThird: $("li[name='applyImg']")[2]
                  ? $("li[name='applyImg']")[2].attributes.value33.value
                  : null,
                picList: applyImg,
                content: this.editor.$txt.html(),
                status: this.ruleForm.status,
                id: this.updateData2[0].id + ""
              };
              console.log(objData);
            }
            this.$axios({
              method: "post",
              url: `${
                this.$store.state.globalRouter
              }/auth/consultationMng/update`,
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
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            // console.log(this.updateData2[0].id);
            this.$axios({
              url:
                this.$store.state.globalRouter +
                "/auth/consultationMng/remove?id=" +
                encodeURI(this.updateData2[0].id),
              method: "get"
            }).then(res => {
              if (res.data.resultCode == "000000") {
                alert("删除成功");
                this.$options.methods.deleteAfterGetData(this);
              } else {
                alert("删除失败：" + res.data.resultMsg);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除"
            });
          });
      }
    },
    // 图片上传相关
    ProcessFile() {
      // alert("66");

      var file = document.getElementById("imgFile").files[0];
      const formData = new FormData();
      formData.append("imgFile", file);
      formData.append("fileDir", "assess/");
      this.$axios({
        url: `${this.$store.state.globalRouter}/core/upload_file`,
        // url   : `http://192.168.1.187:4280/insurance-intact-web/upload_paper_img`,
        method: "post",
        data: formData
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
    showData(rowData) {
      // alert('11')
      console.log(rowData);

      let data = JSON.parse(JSON.stringify(rowData));
      this.proptype = "资讯详情";
      this.dialogVisible = true;
      this.ruleForm = JSON.parse(JSON.stringify(data));
      this.ruleForm.addressDetailed = "1";

      if (rowData.picList && rowData.picList.length > 0) {
        var picData = rowData.picList.split("-");
        var data1 =
          '<div style="display:inline-block;margin-right:10px;height:80px;float:left;">';
        for (var i = 0; i < picData.length - 1; i++) {
          var code = picData[i].split(".")[0].split("/")[3];
          data1 += `<li style='position:relative;width:80px;height:80px;float:left;list-style:none;margin-left:10px;' id='${code}' value33='${
            picData[i]
          }' name='applyImg'><img  style='width:100%;height:100%;cursor:pointer;' src='${
            this.$store.state.globalIMGRouter
          }/${picData[i]}' />`;
        }
        data1 += "</div>";

        // console.log('11',data1)
        setTimeout(() => {
          //   var MyComponent  = Vue.extend({
          //   template: data1,
          //   data() {
          //     return {};
          //   },
          //   methods: {
          //     delete11(event) {
          //       // alert("33");
          //       var goal = event.target.getAttribute("value");
          //       $("#" + goal).remove();
          //     }
          //   }
          // });
          // var component = new MyComponent().$mount();
          // // $("#data-table").append(component.$el);
          // $("#result").html(component.$el);
          $("#result").html(data1);

          // 详情展示时提交，添加图片按钮无效
          // 隐藏提交按钮
          $("#submit").hide();
          document
            .getElementById("file_box")
            .setAttribute("style", "float:left;display:none;");
        }, 200);
      }
      this.ruleForm.cardImg = "1";
      this.ruleForm.address = "1";

      var editData = "";
      if (rowData.contentFirst != null && rowData.contentFirst != "null") {
        editData += rowData.contentFirst;
      }
      if (rowData.contentSecond != null && rowData.contentSecond != "null") {
        editData += rowData.contentSecond;
      }
      if (rowData.contentThird != null && rowData.contentThird != "null") {
        editData += rowData.contentThird;
      }
      if (rowData.contentFour != null && rowData.contentFour != "null") {
        editData += rowData.contentFour;
      }
      if (rowData.contentFive != null && rowData.contentFive != "null") {
        editData += rowData.contentFive;
      }

      // 编辑器相关
      if (this.editor) {
        this.content = editData;
      } else {
        var that = this;
        setTimeout(() => {
          var editor = new WangEditor("editor");
          // console.log(editor);
          editor.config.menus = [
            "source",
            "|",
            "bold",
            "underline",
            "italic",
            "strikethrough",
            "eraser",
            "forecolor",
            "bgcolor",
            "|",
            "quote",
            "fontfamily",
            "fontsize",
            "head",
            "unorderlist",
            "orderlist",
            "alignleft",
            "aligncenter",
            "alignright",
            "|",
            "link",
            "unlink",
            "table",
            "img",
            "video",
            "insertcode",
            "|",
            "undo",
            "redo",
            "fullscreen"
          ];
          editor.config.uploadImgUrl = `${
            this.$store.state.globalRouter
          }/core/upload_file`;
          editor.config.uploadImgFileName = "imgFile";

          //  editor.config.uploadImgServer = 'ww' //图片上传地址
          editor.config.uploadParams = {
            fileDir: "assess/"
          };
          // 自定义load事件
          editor.config.uploadImgFns.onload = function(resultText, xhr) {
            // resultText 服务器端返回的text
            // xhr 是 xmlHttpRequest 对象，IE8、9中不支持

            // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
            var originalName = editor.uploadImgOriginalName || "";
            // console.log('111',JSON.parse(resultText))

            // 如果 resultText 是图片的url地址，可以这样插入图片：
            editor.command(
              null,
              "insertHtml",
              '<img src="' +
                that.$store.state.globalIMGRouter +
                "/" +
                JSON.parse(resultText).file +
                '" alt="' +
                originalName +
                '" style="max-width:100%;"/>'
            );
            // 如果不想要 img 的 max-width 样式，也可以这样插入：
            // editor.command(null, 'InsertImage', resultText);
          };

          // 自定义timeout事件
          editor.config.uploadImgFns.ontimeout = function(xhr) {
            // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
            alert("上传超时");
          };

          // 自定义error事件
          editor.config.uploadImgFns.onerror = function(xhr) {
            // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
            alert("上传错误");
          };

          editor.create();
          that.editor = editor;
          that.content = editData;
        }, 100);
      }
    },
    search() {
      // console.log(this.searchForm)
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/consultationMng/pagination?title=${
          encodeURI(this.searchForm.title)
        }&status=${encodeURI(this.searchForm.status)}`,
        method: "get"
      }).then(res => {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    resetSearch() {
      this.searchForm = {
        title: "",
        status: ""
      };
    },
    showDetail(id) {
      window.localStorage.setItem("cbrJbId", id);
      this.$router.push({ path: "/userBasicInfo/user_basic_info_detail" });
      // this.currentPlanID = row.planId;
      // this.planDate      = this.$moment().format('YYYY-MM-DD');
      // $("#executeHistoryListModal").modal("show");
      // this.$options.methods.queryExecuteHistoryButton(this.currentPlanID,this.planDate,this);
    },

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
        }/auth/consultationMng/pagination?pageSize=${
          this.changePageSize
        }&pageNo=${val}&title=${encodeURI(this.searchForm.title)}&status=${
          encodeURI(this.searchForm.status)
        }`,
        method: "get"
      }).then(res => {
        this.total = res.data.totalCount;
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
          }/auth/consultationMng/pagination?pageSize=${
            that.changePageSize
          }&pageNo=${that.currentPage}&title=${encodeURI(that.searchForm.title)}&status=${
            encodeURI(that.searchForm.status)
          }`,
          method: "get"
        })
        .then(res => {
          if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
          } else {
            that.total = res.data.totalCount;
            that.currentPage = res.data.curPage;
            that.dataList(res.data.resultList);
          }
        });
      // that.reload();
    },
    deleteAfterGetData(that) {
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/consultationMng/pagination?pageSize=${
            that.changePageSize
          }&pageNo=1&title=${encodeURI(that.searchForm.title)}&status=${
            encodeURI(that.searchForm.status)
          }`,
          method: "get"
        })
        .then(res => {
          if (res.data.resultCode == "100005") {
            that.$router.push({ path: "/" });
          } else {
            that.total = res.data.totalCount;
            that.currentPage = res.data.curPage;
            that.dataList(res.data.resultList);
          }
        });
    }
  },
  mounted() {
    // this.getData();
    this.$axios({
      url: `${this.$store.state.globalRouter}/auth/consultationMng/pagination`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "100005") {
        this.$router.push({ path: "/" });
      } else {
        this.total = res.data.totalCount;
        this.currentPage = res.data.curPage;
        // for(var item of res.data.resultList){

        // }
        this.dataList(res.data.resultList);
      }
    });

    // // 编辑器相关
    //     var that=this;
    //     var editor = new WangEditor('editor');
    //     console.log(editor);
    // //     editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
    // //         '|', 'link', 'unlink', 'table', 'img', 'video', 'insertcode', '|', 'undo', 'redo', 'fullscreen'
    // //     ]
    // //     editor.config.uploadImgUrl =`${this.$store.state.globalRouter}/core/upload_file`;
    // //     editor.config.uploadImgFileName  ='imgFile';

    // //     //  editor.config.uploadImgServer = 'ww' //图片上传地址
    // //      editor.config.uploadParams={
    // //          fileDir:'assess/'
    // //      }
    // //     // 自定义load事件
    // // editor.config.uploadImgFns.onload = function (resultText, xhr) {
    // //     // resultText 服务器端返回的text
    // //     // xhr 是 xmlHttpRequest 对象，IE8、9中不支持

    // //     // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
    // //     var originalName = editor.uploadImgOriginalName || '';
    // //     // console.log('111',JSON.parse(resultText))

    // //     // 如果 resultText 是图片的url地址，可以这样插入图片：
    // //     editor.command(null, 'insertHtml', '<img src="' +that.$store.state.globalIMGRouter+'/'+JSON.parse(resultText).file + '" alt="' + originalName + '" style="max-width:100%;"/>');
    // //     // 如果不想要 img 的 max-width 样式，也可以这样插入：
    // //     // editor.command(null, 'InsertImage', resultText);
    // // };

    // // // 自定义timeout事件
    // // editor.config.uploadImgFns.ontimeout = function (xhr) {
    // //     // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
    // //     alert('上传超时');
    // // };

    // // // 自定义error事件
    // // editor.config.uploadImgFns.onerror = function (xhr) {
    // //     // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
    // //     alert('上传错误');
    // // };

    //     editor.create();
    //     that.editor = editor;
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
  margin-top: 3px;
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

/* 题目内容详情展示 */
.popover {
  max-width: 600px !important;
  top: 0px !important;
}

/* 图片上传样式相关 */
* {
  padding: 0px;
  margin: 0px;
}
li {
  list-style: none;
}
.img_box {
  padding-bottom: 0;
}

.img_list {
  margin-left: 24px;
  width: 1050px;
}
.img_list li {
  margin-right: 25px;
}

.img_box {
  border: #d9d9d9 1px solid;
  overflow: hidden;
  /* border-top: none; */
  padding: 20px 0;
}
.file input,
.up_img input {
  position: absolute;
  font-size: 500px;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  width: 80px;
  height: 80px;
}

.up_img {
  width: 80px;
  height: 80px;
  display: block;
  background: url("../../assets/img/up_img.gif") no-repeat;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

/* 测试上传图片 */
#result {
  float: left;
}
#result li {
  float: left;
  position: relative;
}
#result img {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-left: 10px;
}

.el-button--small,
.el-button--small.is-round {
  padding: 9px 15px;
}

.el-button--mini,
.el-button--small {
  font-size: 12px;
  border-radius: 3px;
}
.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  /* background        : #fff; */
  border: 1px solid #dcdfe6;
  /* color             : #606266; */
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  /* padding           : 12px 20px; */
  font-size: 14px;
  border-radius: 4px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 7px 15px;
}
.el-button--mini,
.el-button--small {
  font-size: 12px;
  border-radius: 3px;
}
.el-button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.el-button,
.el-checkbox {
  -ms-user-select: none;
  font-weight: 500;
}
</style>



