<template>
  <div style="padding:20px;height:100%;" id="nursingPlan">
    <div style="background:#ffffff;height:95%;padding:5px;overflow:auto">
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
            v-if          = "urlRole1==1"
            type          = "primary"
            size          = "small"
            @click.native = "add"
            icon          = "el-icon-plus"
          >新增</el-button>
          <el-button
            v-if          = "urlRole2==1"
            type          = "primary"
            size          = "small"
            @click.native = "update"
            icon          = "el-icon-edit"
          >修改</el-button>
          <!-- <el-button
            v-if          = "urlRole3==1"
            type          = "primary"
            size          = "small"
            @click.native = "remove"
            icon          = "el-icon-delete"
          >删除</el-button> -->
          <el-button
            type          = "primary"
            size          = "small"
            @click.native = "exportPlan"
            icon          = "el-icon-download"
          >导出护理计划</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <el-form
        :inline = "true"
          class = "demo-form-inline"
          size  = 'mini'
          style = "text-align:left;padding-left:15px;"

      >
        <el-form-item label="姓名:">
          <el-input
            v-model.trim     = "nameSearch"
            placeholder = "请输入姓名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input
            v-model.trim     = "idCardSearch"
            placeholder = "请输入身份证号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="医保卡号:">
          <el-input
            v-model.trim     = "ybCardSearch"
            placeholder = "请输入医保卡号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="审核状态:">

          <el-select
            v-model     = "statusSearch"
            placeholder = "请选择审核状态"
            style       = "width:150px"
            @change     = "changeSelect"
            size        = 'mini'
            clearable
          >
            <el-option
              label = "全部"
              value = ""
            ></el-option>
            <el-option
              label = "未审核"
              value = "100"
            ></el-option>
            <el-option
              label = "审核通过"
              value = "101"
            ></el-option>
            <el-option
              label = "审核拒绝"
              value = "102"
            ></el-option>

          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type   = "primary"
            @click = "search"
            icon   = "el-icon-search"
          >查询</el-button>
        </el-form-item>
      </el-form>
     <div style="padding:5px;height:80%">
      <el-table
        :data = "datalists"
        border
        stripe
        style             = "width: 100%;text-align:left;"
        @selection-change = "handleSelectionChange"
        height="100%"
      >
        <el-table-column
          type  = "selection"
          width = "55"
        >
        </el-table-column>
        <el-table-column
          prop  = "planId"
          label = '序号'
          width = "180"
        >
        </el-table-column>
        <el-table-column
          prop  = "userName"
          label = "姓名"
          width = "100"
        ></el-table-column>
        <el-table-column
          prop  = "userIdcard"
          label = "身份证号"
          width = "180"
        ></el-table-column>
        <el-table-column
          prop  = "medicalInsuranceId"
          label = "医保卡号"
          width = "180"
        ></el-table-column>
        <el-table-column
          prop  = "planStartDate"
          label = "计划开始日期"
          width = "180"
        ></el-table-column>
        <el-table-column
          prop  = "planEndDate"
          label = "计划结束日期"
          width = "180"
        ></el-table-column>
        <el-table-column
          prop  = "auditStatus"
          label = "审核状态"
          width = "80"
        ></el-table-column>
        <el-table-column
          prop  = "planStatus"
          label = "服务状态"
          width = "80"
        ></el-table-column>
        <el-table-column
          prop  = "auditUserName"
          label = "审核人"
          width = "150"
        ></el-table-column>
        <el-table-column
          prop  = "auditTime"
          label = "审核日期"
          width = "180"
        ></el-table-column>
        <el-table-column
          label = "操作"
          width = "220"
          style = "text-align:left;"
          fixed="right"
        >
          <template slot-scope="scope">
            <div
              v-if  = "scope.row.auditStatus!='审核通过'"
              style = "display:inline-block;"
            >
              <el-button
                size        = "mini"
                type        = "success"
                @click.stop = "planDetail(scope.$index, scope.row,1)"
                style       = "margin:0px;"
              >计划详情</el-button>
              <el-button
                v-if        = "urlRole4==1"
                size        = "mini"
                type        = "success"
                @click.stop = "planDetail(scope.$index, scope.row,2)"
                style       = "margin:0px;"
              >计划审核</el-button>
              <el-button
                v-if        = "scope.row.planStatus=='暂停'"
                size        = "mini"
                type        = "success"
                @click.stop = "stopService(scope.$index, scope.row,2)"
                style       = "margin:0px;"
              >终止计划</el-button>

            </div>
            <div v-else>
              <el-button
                size        = "mini"
                type        = "success"
                @click.stop = "planDetail(scope.$index, scope.row,1)"
                style       = "margin:0px;"
              >计划详情</el-button>
              <el-button
                v-if        = "scope.row.planStatus=='暂停'"
                size        = "mini"
                type        = "success"
                @click.stop = "stopService(scope.$index, scope.row,2)"
                style       = "margin:0px;"
              >终止计划</el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>
      </div>
      <!-- 添加模态框 -->
      <el-dialog
        :visible.sync = "dialogVisible"
          width       = "1100px"
        :before-close = "handleClose1"
          style       = "text-align:left;"
          center
      >

        <span
          slot  = "header"
          class = "dialog-header"
          hidden
        >

        </span>
        <div class="modal-header">

          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            基础信息
          </h5>
        </div>
        <div class="modal-body">
          <table
            id    = "myModelTable"
            style = 'margin:0 auto;padding:0px;width:96%;'
            class = 'table table-striped'
          >
            <tr>
              <th>身份证号：</th>
              <td><input
                  class     = "form-control"
                  name      = "userIdcard"
                  type      = "text"
                  maxlength = "18"
                  @blur     = "fillAppointAgeAndSex"
                /></td>
              <th>医保卡号：</th>
              <td><input
                  class    = "form-control"
                  name     = "medicalInsuranceId"
                  type     = "text"
                  readonly = "readonly"
                /></td>
            </tr>
            <tr>
              <th>年龄：</th>
              <td><input
                  class    = "form-control"
                  name     = "userAge"
                  type     = "number"
                  oninput  = "if(value.length>3)value=value.slice(0,3)"
                  readonly = "readonly"
                /></td>
              <th>姓名：</th>
              <td><input
                  class    = "form-control"
                  name     = "userName"
                  type     = "text"
                  readonly = "readonly"
                /></td>
            </tr>
            <tr>
              <th>评估等级：</th>
              <td><input
                  class    = "form-control"
                  name     = "userAssessedLevel"
                  type     = "number"
                  oninput  = "if(value.length>1)value=value.slice(0,1)"
                  readonly = "readonly"
                /></td>
              <th>性别：</th>
              <td>
                <el-radio
                  v-model = "updateSex"
                  label   = "M"
                  disabled
                >男</el-radio>
                <el-radio
                  v-model = "updateSex"
                  label   = "F"
                  disabled
                >女</el-radio>
                <input
                  class    = "form-control"
                  name     = "userSex"
                  type     = "hidden"
                  readonly = "readonly"
                />
              </td>
            </tr>

            <tr>
              <th>代理人姓名：</th>
              <td><input
                  class     = "form-control"
                  name      = "agentName"
                  type      = "text"
                  maxlength = "20"
                /></td>
              <th>联系电话：</th>
              <td><input
                  class     = "form-control"
                  name      = "agentPhone"
                  type      = "tel"
                  maxlength = "20"
                /></td>
            </tr>

            <tr>
              <th>是否为民政部门认定的特殊人群：</th>
              <td><select
                  class = "form-control"
                  name  = "special"
                  id    = "special"
                >
                  <option value="">请选择</option>
                  <option value="0">不是</option>
                  <option value="1">五保户</option>
                  <option value="2">低保户</option>
                  <option value="3">困难户</option>
                </select></td>

              <th>是否为残联部门认定的残疾人：</th>
              <td><select
                  class = "form-control"
                  name  = "handicapped"
                  id    = "handicapped"
                >
                  <option value="">请选择</option>
                  <option value="0">不是</option>
                  <option value="1">是</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>计划开始日期：</th>
              <td>
                <el-date-picker
                    v-model       = "updateStartTime"
                    name          = "planStartDate"
                    type          = "date"
                  :picker-options = "pickerOptions0"
                >
                </el-date-picker>
                <!-- <input class="form-control" name="planStartDate" type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'todayInput\')}'});"/> -->
              </td>
            </tr>
          </table>
        </div>
        <div class="modal-header">
          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            护理地址信息
          </h5>
        </div>
        <div class="modal-body">
          <table
            id    = "addressTable"
            style = 'margin:0 auto;padding:0px;width:96%;'
            class = 'table table-striped'
          >
            <tr>
              <th>省：</th>
              <td>
                <!-- <select class="form-control" name="province"></select><input type="hidden" class="hidden" name="regionProvince"/> -->
                <select
                  class   = "form-control"
                  v-model = "selected"
                  autofocus
                  v-if  = "provinceL"
                  style = "display:inline-block;"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择城市</option>
                  <option
                      v-for = "(item,index) in provinceL"
                    :value  = "item.regionId"
                    :key="index"
                  >{{item.regionName}}</option>
                </select>
              </td>
              <th>市：</th>
              <td>
                <!-- <select class="form-control" name="city"></select><input type="hidden" class="hidden" name="regionCity"/> -->
                <select
                  class   = "form-control"
                  v-model = "citySelected"
                  v-if    = "cityL"
                  style   = "display:inline-block;"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择城市</option>
                  <option
                      v-for = "(item,index) in cityL"
                    :value  = "item.regionId"
                    :key="index"
                  >{{item.regionName}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>区/县：</th>
              <td>
                <!-- <select class="form-control" name="district"></select><input type="hidden" class="hidden" name="regionDistrict"/> -->
                <select
                  class   = "form-control"
                  v-model = "areaSelected"
                  v-if    = "areaL"
                  style   = "display:inline-block;"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择区县</option>
                  <option
                      v-for = "(item,index) in areaL"
                    :value  = "item.regionId"
                    :key="index"
                  >{{item.regionName}}</option>
                </select>
              </td>
              <th>街道：</th>
              <td>
                <!-- <select class="form-control" name="streetSelect"></select>
								<input type="hidden" class="hidden" name="streetId"/><input type="hidden" class="hidden" name="streetName"/> -->
                <select
                  class   = "form-control"
                  v-model = "streetSelected"
                  v-if    = "streetL"
                  style   = "display:inline-block;"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择街道</option>
                  <option
                      v-for = "(item,index) in streetL"
                    :value  = "item.streetId"
                    :key="index"
                  >{{item.streetName}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>详细地址：</th>
              <td colspan="3"><input
                  class     = "form-control"
                  name      = "address"
                  cols      = "1"
                  maxlength = "200"
                /></td>
            </tr>
          </table>
        </div>
        <div class="modal-header">
          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            护理项目详情
          </h5>
        </div>
        <div class="modal-body">
          <div class="table-responsive panel-body">
            <table
              id    = "pagDetailModalTable"
              style = 'margin:0 auto;padding:0px;width:96%;background-color: #F0F3F5'
              class = 'table table-striped table-bordered nowrap'
            >
              <tr>
                <th style='text-align:center;'>护理分类</th>
                <th style='text-align:center;'>护理项目（可选）</th>
                <th style='text-align:center;'>护理频次（默认）</th>
                <th style='text-align:center;'>实际护理频次</th>
                <th style='text-align:center;'>项目护理时长</th>
                <th style='text-align:center;'>护理价格（元/次）</th>
              </tr>
            </table>
          </div>
        </div>
        <div class="modal-header">
          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            护理计划纸质文件
          </h5>
        </div>
        <div class="modal-body">
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
        </div>
        <span
          slot  = "footer"
          class = "dialog-footer"
        >
          <el-button
            @click = "cancel00"
            size='mini'
          >取 消</el-button>
          <el-button
            type   = "primary"
            @click = "planSubmit(1)"
            size='mini'
          >确 定</el-button>
        </span>

      </el-dialog>

      <!-- 修改模态框 -->
      <el-dialog
        :visible.sync = "dialogVisible1"
          width       = "1100px"
        :before-close = "handleClose1"
          style       = "text-align:left;"
          center
      >

        <span
          slot  = "header"
          class = "dialog-header"
          hidden
        >

        </span>
        <div class="modal-header">

          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            基础信息
          </h5>
        </div>
        <div class="modal-body">
          <table
            id    = "myModelTable"
            style = 'margin:0 auto;padding:0px;width:96%;'
            class = 'table table-striped'
          >
            <tr>
              <th>身份证号：</th>
              <td><input
                  class     = "form-control"
                  name      = "userIdcard"
                  type      = "text"
                  maxlength = "18"
                  @blur     = "fillAppointAgeAndSex"
                /></td>
              <th>医保卡号：</th>
              <td><input
                  class    = "form-control"
                  name     = "medicalInsuranceId"
                  type     = "text"
                  readonly = "readonly"
                /></td>
            </tr>
            <tr>
              <th>年龄：</th>
              <td><input
                  class    = "form-control"
                  name     = "userAge"
                  type     = "number"
                  oninput  = "if(value.length>3)value=value.slice(0,3)"
                  readonly = "readonly"
                /></td>
              <th>姓名：</th>
              <td><input
                  class    = "form-control"
                  name     = "userName"
                  type     = "text"
                  readonly = "readonly"
                /></td>
            </tr>
            <tr>
              <th>评估等级：</th>
              <td><input
                  class    = "form-control"
                  name     = "userAssessedLevel"
                  type     = "number"
                  oninput  = "if(value.length>1)value=value.slice(0,1)"
                  readonly = "readonly"
                /></td>
              <th>性别：</th>
              <td>
                <el-radio
                  v-model = "updateSex"
                  label   = "M"
                  disabled
                >男</el-radio>
                <el-radio
                  v-model = "updateSex"
                  label   = "F"
                  disabled
                >女</el-radio>
                <input
                  class    = "form-control"
                  name     = "userSex"
                  type     = "hidden"
                  readonly = "readonly"
                />
              </td>
            </tr>

            <tr>
              <th>代理人姓名：</th>
              <td><input
                  class     = "form-control"
                  name      = "agentName"
                  type      = "text"
                  maxlength = "20"
                /></td>
              <th>联系电话：</th>
              <td><input
                  class     = "form-control"
                  name      = "agentPhone"
                  type      = "tel"
                  maxlength = "20"
                /></td>
            </tr>

            <tr>
              <th>是否为民政部门认定的特殊人群：</th>
              <td><select
                  class = "form-control"
                  name  = "special"
                  id    = "special"
                >
                  <option value="">请选择</option>
                  <option value="0">不是</option>
                  <option value="1">五保户</option>
                  <option value="2">低保户</option>
                  <option value="3">困难户</option>
                </select></td>

              <th>是否为残联部门认定的残疾人：</th>
              <td><select
                  class = "form-control"
                  name  = "handicapped"
                  id    = "handicapped"
                >
                  <option value="">请选择</option>
                  <option value="0">不是</option>
                  <option value="1">是</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>计划开始日期：</th>
              <td>
                <el-date-picker
                    v-model       = "updateStartTime"
                    name          = "planStartDate"
                    type          = "date"
                  :picker-options = "pickerOptions0"
                >
                </el-date-picker>
                <!-- <input class="form-control" name="planStartDate" type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'todayInput\')}'});"/> -->
              </td>
            </tr>
          </table>
        </div>
        <div class="modal-header">
          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            护理地址信息
          </h5>
        </div>
        <div class="modal-body">
          <table
            id    = "addressTable"
            style = 'margin:0 auto;padding:0px;width:96%;'
            class = 'table table-striped'
          >
            <tr>
              <th>省：</th>
              <td>
                <!-- <select class="form-control" name="province"></select><input type="hidden" class="hidden" name="regionProvince"/> -->
                <select
                  class   = "form-control"
                  v-model = "selectedXG"
                  autofocus
                  v-if  = "provinceLXG"
                  style = "display:inline-block;"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择城市</option>
                  <option
                      v-for = "(item,index) in provinceLXG"
                    :value  = "item.regionId"
                    :key="index"
                  >{{item.regionName}}</option>
                </select>
              </td>
              <th>市：</th>
              <td>
                <!-- <select class="form-control" name="city"></select><input type="hidden" class="hidden" name="regionCity"/> -->
                <select
                  class   = "form-control"
                  v-model = "citySelectedXG"
                  v-if    = "cityLXG"
                  style   = "display:inline-block;"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择城市</option>
                  <option
                      v-for = "(item,index) in cityLXG"
                    :value  = "item.regionId"
                    :key="index"
                  >{{item.regionName}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>区/县：</th>
              <td>
                <!-- <select class="form-control" name="district"></select><input type="hidden" class="hidden" name="regionDistrict"/> -->
                <select
                  class   = "form-control"
                  v-model = "areaSelectedXG"
                  v-if    = "areaLXG"
                  style   = "display:inline-block;"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择区县</option>
                  <option
                      v-for = "(item,index) in areaLXG"
                    :value  = "item.regionId"
                    :key="index"
                  >{{item.regionName}}</option>
                </select>
              </td>
              <th>街道：</th>
              <td>
                <!-- <select class="form-control" name="streetSelect"></select>
								<input type="hidden" class="hidden" name="streetId"/><input type="hidden" class="hidden" name="streetName"/> -->
                <select
                  class   = "form-control"
                  v-model = "streetSelectedXG"
                  v-if    = "streetLXG"
                  style   = "display:inline-block;"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择街道</option>
                  <option
                      v-for = "(item,index) in streetLXG"
                    :value  = "item.streetId"
                    :key="index"
                  >{{item.streetName}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>详细地址：</th>
              <td colspan="3"><input
                  class     = "form-control"
                  name      = "address"
                  cols      = "1"
                  maxlength = "200"
                /></td>
            </tr>
          </table>
        </div>
        <div class="modal-header">
          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            护理项目详情
          </h5>
        </div>
        <div class="modal-body">
          <div class="table-responsive panel-body">
            <table
              id    = "pagDetailModalTable"
              style = 'margin:0 auto;padding:0px;width:96%;background-color: #F0F3F5'
              class = 'table table-striped table-bordered nowrap'
            >
              <tr>
                <th style='text-align:center;'>护理分类</th>
                <th style='text-align:center;'>护理项目（可选）</th>
                <th style='text-align:center;'>护理频次（默认）</th>
                <th style='text-align:center;'>实际护理频次</th>
                <th style='text-align:center;'>项目护理时长</th>
                <th style='text-align:center;'>护理价格（元/次）</th>
              </tr>
            </table>
          </div>
        </div>
        <div class="modal-header">
          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            护理计划纸质文件
          </h5>
        </div>
        <div class="modal-body">
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
        </div>

        <!-- <el-form-item>
            <el-button
              type   = "primary"
              @click = "submitForm1('ruleForm1')"
            >提交</el-button>
            <el-button @click="resetForm1('ruleForm1')">重置</el-button>
          </el-form-item>
        </el-form> -->
        <span
          slot  = "footer"
          class = "dialog-footer"
        >
          <el-button
            @click = "cancel11"
            size='mini'
          >取 消</el-button>
          <el-button
            type   = "primary"
            @click = "planSubmit(3)"
            size='mini'
          >确 定</el-button>
        </span>

      </el-dialog>

      <!-- 护理计划详情模态框 -->
      <el-dialog
        :visible.sync = "dialogVisible2"
          width       = "1100px"
        :before-close = "handleClose"
          style       = "text-align:left;"
          center
      >

        <!-- <el-form
          :model        = "ruleForm"
          :rules        = "rules"
            ref         = "ruleForm"
            label-width = "100px"
            class       = "demo-ruleForm"
        >
         修改护理计划
          <el-form-item>
            <el-button
              type   = "primary"
              @click = "submitForm('ruleForm')"
            >提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form> -->
        <span
          slot  = "header"
          class = "dialog-header"
          style = "padding:0px;"
          hidden
        >
        </span>

        <div class="modal-header">

          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            基础信息
          </h5>
        </div>
        <div class="modal-body">
          <div class="table-responsive panel-body">
            <table
              id    = "myModelTableDetail"
              style = 'margin:0 auto;padding:0px;width:96%;background-color: #F0F3F5'
              class = 'table table-striped'
            >
              <tr>
                <th>身份证号：</th>
                <td><input
                    class    = "form-control"
                    name     = "userIdcard"
                    type     = "text"
                    disabled = "disabled"
                  /></td>
                <th>医保卡号：</th>
                <td><input
                    class    = "form-control"
                    name     = "medicalInsuranceId"
                    type     = "text"
                    disabled = "disabled"
                  /></td>
              </tr>
              <tr>
                <th>年龄：</th>
                <td><input
                    class    = "form-control"
                    name     = "userAge"
                    type     = "number"
                    disabled = "disabled"
                  /></td>
                <th>姓名：</th>
                <td><input
                    class    = "form-control"
                    name     = "userName"
                    type     = "text"
                    disabled = "disabled"
                  /></td>

              </tr>
              <tr>
                <th>评估等级：</th>
                <td><input
                    class    = "form-control"
                    name     = "userAssessedLevel"
                    type     = "number"
                    disabled = "disabled"
                  /></td>
                <th>性别：</th>
                <td><input
                    style    = "width: 10%;"
                    name     = "userSexM"
                    value    = "M"
                    type     = "radio"
                    disabled = "disabled"
                  />男<input
                    style    = "width: 10%;"
                    name     = "userSexF"
                    value    = "F"
                    type     = "radio"
                    disabled = "disabled"
                  />女
                  <input
                    class    = "form-control"
                    name     = "userSex"
                    type     = "hidden"
                    readonly = "readonly"
                  />
                </td>
              </tr>

              <tr>
                <th>代理人姓名：</th>
                <td><input
                    class    = "form-control"
                    name     = "agentName"
                    type     = "text"
                    disabled = "disabled"
                  /></td>
                <th>联系电话：</th>
                <td><input
                    class    = "form-control"
                    name     = "agentPhone"
                    type     = "tel"
                    disabled = "disabled"
                  /></td>
              </tr>
              <tr>
                <th>是否为民政部门认定的特殊人群：</th>
                <td><input
                    class    = "form-control"
                    name     = "special"
                    type     = "text"
                    disabled = "disabled"
                  /></td>
                <th>是否为残联部门认定的残疾人：</th>
                <td><input
                    class    = "form-control"
                    name     = "handicapped"
                    type     = "text"
                    disabled = "disabled"
                  /></td>
              </tr>

              <tr>
                <th>计划开始日期：</th>
                <td><input
                    class    = "form-control"
                    name     = "planStartDate"
                    type     = "text"
                    disabled = "disabled"
                  /></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="modal-header">
          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            护理地址信息
          </h5>
        </div>
        <div class="modal-body">
          <table
            id    = "addressTableDetail"
            style = 'margin:0 auto;padding:0px;width:96%;'
            class = 'table table-striped'
          >
            <tr>
              <th>省：</th>
              <td>
                <!-- <select class="form-control" name="province"></select><input type="hidden" class="hidden" name="regionProvince"/> -->
                <select
                  class   = "form-control"
                  v-model = "selectedXQ"
                  autofocus
                  v-if  = "provinceLXQ"
                  style = "display:inline-block;"
                  disabled = "disabled"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择城市</option>
                  <option
                      v-for = "(item,index) in provinceLXQ"
                    :value  = "item.regionId"
                    :key="index"
                  >{{item.regionName}}</option>
                </select>
              </td>
              <th>市：</th>
              <td>
                <!-- <select class="form-control" name="city"></select><input type="hidden" class="hidden" name="regionCity"/> -->
                <select
                  class   = "form-control"
                  v-model = "citySelectedXQ"
                  v-if    = "cityLXQ"
                  style   = "display:inline-block;"
                  disabled = "disabled"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择城市</option>
                  <option
                      v-for = "(item,index) in cityLXQ"
                    :value  = "item.regionId"
                    :key="index"
                  >{{item.regionName}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>区/县：</th>
              <td>
                <!-- <select class="form-control" name="district"></select><input type="hidden" class="hidden" name="regionDistrict"/> -->
                <select
                  class   = "form-control"
                  v-model = "areaSelectedXQ"
                  v-if    = "areaLXQ"
                  style   = "display:inline-block;"
                  disabled = "disabled"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择区县</option>
                  <option
                      v-for = "(item,index) in areaLXQ"
                    :value  = "item.regionId"
                    :key="index"
                  >{{item.regionName}}</option>
                </select>
              </td>
              <th>街道：</th>
              <td>
                <!-- <select class="form-control" name="streetSelect"></select>
								<input type="hidden" class="hidden" name="streetId"/><input type="hidden" class="hidden" name="streetName"/> -->
                <select
                  class   = "form-control"
                  v-model = "streetSelectedXQ"
                  v-if    = "streetLXQ"
                  style   = "display:inline-block;"
                  disabled = "disabled"
                >
                  <option
                    disabled
                    value = "请选择城市"
                  >请选择街道</option>
                  <option
                      v-for = "(item,index) in streetLXQ"
                    :value  = "item.streetId"
                    :key="index"
                  >{{item.streetName}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>详细地址：</th>
              <td colspan="3"><input
                  class     = "form-control"
                  name      = "address"
                  cols      = "1"
                  maxlength = "200"
                  disabled = "disabled"
                /></td>
            </tr>
          </table>
        </div>
        <div class="modal-header">
          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            护理项目详情
          </h5>
        </div>
        <div class="modal-body">
          <div class="table-responsive panel-body">
            <table
              id    = "detailTable"
              style = 'margin:0 auto;padding:0px;width:96%;background-color: #F0F3F5'
              class = 'table table-striped table-bordered nowrap'
            >
              <tr>
                <th style='text-align:center;'>护理分类</th>
                <th style='text-align:center;'>护理项目（可选）</th>
                <th style='text-align:center;'>护理频次（默认）</th>
                <th style='text-align:center;'>实际护理频次</th>
                <th style='text-align:center;'>项目护理时长</th>
                <th style='text-align:center;'>护理价格（元/次）</th>
              </tr>
            </table>
          </div>

        </div>
        <div class="modal-header">
          <h5
            class = "modal-title"
            name  = "distriUserModalLabel"
          >
            护理计划纸质文件
          </h5>
        </div>
        <div class="modal-body">
          <div class="img_box">
            <ul
              class = "img_list"
              id    = "paperImgs"
            >
              <!-- <li>
                          <div class="file_box" style="float: left">
                            <a href="javascript:;" class="up_img" >
                              <input id="imgFile" accept="image/gif,image/jpeg,image/png" type="file" multiple="multiple" v-on:change="ProcessFile"/>
                            </a>
                          </div>
                        </li> -->
              <ul
                id = "result"
                v-viewer
              ></ul>
            </ul>
          </div>
        </div>
        <div
          id    = "detailAudit6"
          class = "table-responsive panel-body"
          style = "display:none;"
        >
          <table
            id    = "myModelTable"
            style = 'margin:0 auto;padding:0px;width:96%;'
            class = 'table table-striped'
          >
            <tr>
              <th>审核状态：</th>
              <td>
                <select
                  id    = "auditStatusSubmit"
                  style = "width: 100px;"
                >
                  <option value="101">审核通过</option>
                  <option value="102">审核拒绝</option>
                </select>
              </td>
            </tr>
          </table>
        </div>

        <span
          slot  = "footer"
          class = "dialog-footer"
        >
          <el-button
            @click = "cancel22"
            id     = "queding"
            style  = "display:none;"
            size='mini'
          >确定</el-button>
          <el-button
            id     = "submit"
            type   = "primary"
            @click = "shenhe()"
            size='mini'
            style  = "display:none;"
          >提交</el-button>
        </span>

      </el-dialog>

    </div>
    <div class="pageNation">
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
import vueArea from "vue-area";
export default {
  mixins: [base],
  inject: ["reload"],
  data() {
    return {
      //搜索相关
      nameSearch  : "",
      idCardSearch: "",
      ybCardSearch: "",
      statusSearch: "",
      //分页data
      currentPage   : 1,
      pageSize      : [10, 20, 30, 50],
      changePageSize: 10,
      total         : 0,

      //表单相关
      dialogVisible : false,
      dialogVisible1: false,
      dialogVisible2: false,
      ruleForm      : {
        name   : "",
        company: "",
        state  : "",
        notice : "",
        id     : 0
      },
      rules: {
        name   : [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        company: [
          { required: true, message: "请选择角色所属公司", trigger: "change" }
        ]
        // state: [
        //   { required: true, message: "请选择角色当前状态", trigger: "change" }
        // ]
      },

      ruleForm1: {
        name   : "",
        company: "",
        state  : "",
        notice : "",
        id     : 0
      },
      rules1: {
        name   : [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        company: [
          { required: true, message: "请选择角色所属公司", trigger: "change" }
        ]
        // state: [
        //   { required: true, message: "请选择角色当前状态", trigger: "change" }
        // ]
      },
      //列表相关
      datalists: [],

      //搜索
      searchValue    : "",
      updateData2    : [],
      updateStartTime: null,
      updateSex      : null,

      // 添加省市区相关
      selected      : "",
      citySelected  : "",
      areaSelected  : "",
      streetSelected: "",
      provinceL     : [],
      cityL         : [],
      areaL         : [],
      streetL       : [],
      provinceName  : "",
      cityName      : "",
      areaName      : "",
      streetName    : "",
      // 修改省市区相关
      selectedXG      : "",
      citySelectedXG  : "",
      areaSelectedXG  : "",
      streetSelectedXG: "",
      selectedCount      : 0,
      citySelectedCount  : 0,
      areaSelectedCount  : 0,
      streetSelectedCount: 0,
      provinceLXG     : [],
      cityLXG         : [],
      areaLXG         : [],
      streetLXG       : [],
      provinceNameXG  : "",
      cityNameXG      : "",
      areaNameXG      : "",
      streetNameXG    : "",
      // 详情省市区相关
      selectedXQ      : "",
      citySelectedXQ  : "",
      areaSelectedXQ  : "",
      streetSelectedXQ: "",
      provinceLXQ     : [],
      cityLXQ         : [],
      areaLXQ         : [],
      streetLXQ       : [],
      provinceNameXQ  : "",
      cityNameXQ      : "",
      areaNameXQ      : "",
      streetNameXQ    : "",


      // 图片上传相关
      imgFile : null,
      imgMax  : 20,
      imgCount: 0,

      // 修改时保存当前数据
      currentData: null,
      planId     : null,

      currentPlanID: null,

      // 计划开始日期相关，不能选择以前的日期
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },

      // 增删改审的权限问题？？
      urlRole1: 0,
      urlRole2: 0,
      urlRole3: 0,
      urlRole4: 0
    };
  },
  watch: {
    // 添加的省市区
    selected: function() {
      for (var item of this.provinceL) {
        if (item.regionId == this.selected) {
          this.provinceName = item.regionName;
        }
      }

      // console.log(this.selected,this.provinceName)
      this.$axios({
        url: `${this.$store.state.globalRouter}/get_regions?parentId=${
          encodeURI(this.selected)
        }`,
        method: "get"
      }).then(res => {
        // console.log(res)
        this.cityL = res.data;
        this.citySelected=this.cityL[0].regionId
      });

      this.areaL = [];
      // this.streetName     = '';
      // this.streetSelected = '';
      // this.areaSelected   = '';
      // this.areaName       = '';
      // this.citySelected   = '';
      // this.cityName       = '';
    },
    citySelected: function() {
      for (var item of this.cityL) {
        if (item.regionId == this.citySelected) {
          this.cityName = item.regionName;
        }
      }
      // console.log(this.citySelected,this.cityName)
      this.$axios({
        url: `${this.$store.state.globalRouter}/get_regions?parentId=${
          encodeURI(this.citySelected)
        }`,
        method: "get"
      }).then(res => {
        // console.log(res)
        this.areaL = res.data;
        this.areaSelected=this.areaL[0].regionId
      });
    },
    areaSelected: function() {
      for (var item of this.areaL) {
        if (item.regionId == this.areaSelected) {
          this.areaName = item.regionName;
        }
      }
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_street_mng/find_nursing_street_by_district?district=${
         encodeURI(this.areaSelected)
        }-${encodeURI(this.areaName)}`,
        method: "get"
      }).then(res => {
        this.streetL = res.data.data;
        if(this.streetL && this.streetL.length>=1){
          console.log(this.streetL)
          this.streetSelected=this.streetL[0].streetId;
        }
        //  this.areaL = res.data;
      });
      // console.log(this.areaSelected,this.areaName)
    },
    streetSelected: function() {
      for (var item of this.streetL) {
        if (item.streetId == this.streetSelected) {
          this.streetName = item.regionName;
        }
      }
    },
    // 修改省市区
    selectedXG: function() {
      for (var item of this.provinceLXG) {
        if (item.regionId == this.selectedXG) {
          this.provinceNameXG = item.regionName;
        }
      }
      this.selectedCount++;

      // console.log(this.selected,this.provinceName)
      this.$axios({
        url: `${this.$store.state.globalRouter}/get_regions?parentId=${
          encodeURI(this.selectedXG)
        }`,
        method: "get"
      }).then(res => {
        // console.log(res)
        this.cityLXG = res.data;
        if(this.selectedCount>1){
          this.citySelectedXG=this.cityLXG[0].regionId
        }

      });

      this.areaLXG = [];
      // this.streetName     = '';
      // this.streetSelected = '';
      // this.areaSelected   = '';
      // this.areaName       = '';
      // this.citySelected   = '';
      // this.cityName       = '';
    },
    citySelectedXG: function() {
      for (var item of this.cityLXG) {
        if (item.regionId == this.citySelectedXG) {
          this.cityNameXG = item.regionName;
        }
      }
      this.citySelectedCount++;
      // console.log(this.citySelected,this.cityName)
      this.$axios({
        url: `${this.$store.state.globalRouter}/get_regions?parentId=${
          encodeURI(this.citySelectedXG)
        }`,
        method: "get"
      }).then(res => {
        // console.log(res)
        this.areaLXG = res.data;
        if(this.citySelectedCount>1){
          this.areaSelectedXG=this.areaLXG[0].regionId
        }
      });
    },
    areaSelectedXG: function() {
      for (var item of this.areaLXG) {
        if (item.regionId == this.areaSelectedXG) {
          this.areaNameXG = item.regionName;
        }
      }
      this.areaSelectedCount++;
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_street_mng/find_nursing_street_by_district?district=${
          encodeURI(this.areaSelectedXG)
        }-${encodeURI(this.areaNameXG)}`,
        method: "get"
      }).then(res => {
        this.streetLXG = res.data.data;
        if(this.areaSelectedCount>1){
          if(this.streetLXG && this.streetLXG.length>=1){
            this.streetSelectedXG=this.streetLXG[0].streetId;
          }
        }


        //  this.areaL = res.data;
      });
      // console.log(this.areaSelected,this.areaName)
    },
    streetSelectedXG: function() {
      for (var item of this.streetLXG) {
        if (item.streetId == this.streetSelectedXG) {
          this.streetNameXG = item.regionName;
        }
      }
    },
    // 计划详情及计划审核的省市区
    selectedXQ: function() {
      for (var item of this.provinceLXQ) {
        if (item.regionId == this.selectedXQ) {
          this.provinceNameXQ = item.regionName;
        }
      }

      // console.log(this.selected,this.provinceName)
      this.$axios({
        url: `${this.$store.state.globalRouter}/get_regions?parentId=${
          encodeURI(this.selectedXQ)
        }`,
        method: "get"
      }).then(res => {
        // console.log(res)
        this.cityLXQ = res.data;
      });
      this.areaLXQ = [];
    },
    citySelectedXQ: function() {
      for (var item of this.cityLXQ) {
        if (item.regionId == this.citySelectedXQ) {
          this.cityNameXQ = item.regionName;
        }
      }
      // console.log(this.citySelected,this.cityName)
      this.$axios({
        url: `${this.$store.state.globalRouter}/get_regions?parentId=${
          encodeURI(this.citySelectedXQ)
        }`,
        method: "get"
      }).then(res => {
        // console.log(res)
        this.areaLXQ = res.data;
      });
    },
    areaSelectedXQ: function() {
      for (var item of this.areaLXQ) {
        if (item.regionId == this.areaSelectedXQ) {
          this.areaNameXQ = item.regionName;
        }
      }
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_street_mng/find_nursing_street_by_district?district=${
          encodeURI(this.areaSelectedXQ)
        }-${encodeURI(this.areaNameXQ)}`,
        method: "get"
      }).then(res => {
        this.streetLXQ = res.data.data;
      });
    },

  },
  components: {
    vueArea: vueArea
  },
  methods: {
    exportPlan() {
      let addr = `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_service_plan_base_mng/nursing_server_plan_excel_out`;
      window.location.href = addr;
    },

    search() {
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_base_mng/pagination?userNameLike=${
          encodeURI(this.nameSearch)
        }&userIdcardLike=${encodeURI(this.idCardSearch)}&medicalInsuranceIdLike=${
          encodeURI(this.ybCardSearch)
        }&auditStatus=${encodeURI(this.statusSearch)}&pageSize=${
          encodeURI(this.changePageSize)
        }&pageNo=1`,
        method: "get"
      }).then(res => {
        // console.log(res.data);
        this.dataList(res.data.resultList);
        this.total       = res.data.totalCount;
        this.currentPage = 1;
      });
    },
    changeSelect(val) {
      //   console.log(this.statusSearch)
    },
    cancel00() {
      this.dialogVisible = false;
      this.reload();
    },
    cancel11() {
      this.dialogVisible1 = false;
      this.reload();
    },
    cancel22() {
      this.dialogVisible2 = false;
      this.reload();
    },
    add() {
          this.dialogVisible = true;
          this.curOpt_       = 1;
      var that               = this;
      this.$options.methods.clearModelTable();
      var myModelTable = $("#myModelTable");

      myModelTable.find("input[name='userIdcard']").attr("disabled", false);
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
          }'><img  style='width:100%;height:100%;cursor:pointer;' src='${
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
    update() {
      if (this.updateData2.length != 1) {
        alert("请选择一条记录");
      } else {
            this.dialogVisible1 = true;
        var that                = this;
            this.curOpt_        = 3;
        this.$options.methods.loadInsUserPlanEidtData(
          this.updateData2[0].planId,
          that
        );
      }
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
            var planId = this.updateData2[0].planId;
            this.$axios({
              url: `${
                this.$store.state.globalRouter
              }/auth/nursing/nursing_service_plan_base_mng/remove?planIds=${encodeURI(planId)}`,
              method: "get"
            }).then(res => {
              this.$options.methods.deleteAfterGetData(this);
              this.$message({tyepe:'success',message:'删除成功！'});
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
    shenhe() {
      // alert(this.currentPlanID);
      // alert($('#auditStatusSubmit').val())
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_base_mng/submit_audit_plan?planId=${
          encodeURI(this.currentPlanID)
        }&auditStatus=${encodeURI($("#auditStatusSubmit").val())}`,
        method: "get"
      }).then(res => {
        this.$options.methods.getReloadData(this);
        alert("提交成功");
        this.dialogVisible2 = false;
      });
    },
    stopService(index, row, type) {
      this.$confirm("计划一旦中止无法恢复，确定中止计划吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText : "取消",
        type             : "warning"
      })
        .then(() => {
          this.$axios({
            url: `${
              this.$store.state.globalRouter
            }/auth/nursing/nursing_service_plan_base_mng/stop_service?planId=${
              encodeURI(row.planId)
            }`,
            method: "get"
          }).then(res => {
            this.$options.methods.getReloadData(this);
            alert("提交成功");
          });
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          this.$message({
            type   : "info",
            message: "取消终止"
          });
        });
    },
    planDetail(index, row, type) {
      this.dialogVisible2 = true;
      $("#result").html("");
      var planId             = row.planId;
          this.currentPlanID = row.planId;
          var that=this;
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_base_mng/load_ins_user_plan_edit_data?planId=${encodeURI(planId)}`,
        method: "get"
      }).then(res => {
        var result = res.data.data;
        // console.log("111", result);
        var myModelTable = $("#myModelTableDetail");
        if (type == 2) {
          // $("#auditHomeServiceButton").show();
          $("#detailAudit6").attr("style", "display:block;");
          $("#submit").attr(
            "style",
            "display:inline-block;"
          );
          $("#queding").attr(
            "style",
            "display:none;"
          );

          // $("#auditID").val(planId);
        }
        if (type == 1) {
          $("#detailAudit6").attr("style", "display:none;");
          $("#submit").attr(
            "style",
            "display:none;"
          );
          $("#queding").attr(
            "style",
            "display:inline-block;"
          );
        }
        myModelTable.find("input[name='userIdcard']").val(result.idNo);
        myModelTable.find("input[name='userName']").val(result.fullName);
        //下面是简单的根据身份证号算下年龄和性别并赋上值，可以手动再改
        var date          = new Date();
        var year          = date.getFullYear();
        var birthday_year = parseInt(
          myModelTable
            .find("input[name='userIdcard']")
            .val()
            .substr(6, 4)
        );
        var userage = year - birthday_year;
        myModelTable.find("input[name='userAge']").val(userage);
        // 不应该用attr要用prop
        if (result.sex == "M") {
          myModelTable
            .find("input[name='userSexM']")
            .prop("checked", "checked");
          myModelTable.find("input[name='userSexF']").prop("checked", false);
        } else {
          myModelTable
            .find("input[name='userSexF']")
            .prop("checked", "checked");
          myModelTable.find("input[name='userSexM']").prop("checked", false);
        }
        var specialArray     = ["不是", "五保户", "低保户", "困难户"];
        var handicappedArray = ["不是", "是"];
        myModelTable.find("input[name='userSex']").val(result.sex);
        myModelTable
          .find("input[name='userAssessedLevel']")
          .val(result.assessedLevel);
        myModelTable.find("input[name='agentName']").val(result.contactName);
        myModelTable.find("input[name='agentPhone']").val(result.contactPhone);

        myModelTable
          .find("input[name='medicalInsuranceId']")
          .val(result.medicalInsuranceId);
        myModelTable
          .find("input[name='planStartDate']")
          .val(result.planStartDate);

        myModelTable
          .find("input[name='special']")
          .val(specialArray[result.special]);
        myModelTable
          .find("input[name='handicapped']")
          .val(handicappedArray[result.handicapped]);

        var addressTable = $("#addressTableDetail");
        addressTable.find("input[name='address']").val(result.appointedAddress);
        // addressTable
        //   .find("input[name='detailProvince']")
        //   .val(result.regionProvince.split("-")[1]);
        // addressTable
        //   .find("input[name='detailCity']")
        //   .val(result.regionCity.split("-")[1]);
        // addressTable
        //   .find("input[name='detailArea']")
        //   .val(result.regionDistrict.split("-")[1]);
          console.log('机构',result)
        // addressTable.find("input[name='detailStreet']").val(result.streetName);
        this.$axios({
              url   : `${this.$store.state.globalRouter}/get_provinces`,
              method: "get"
            })
            .then(res => {
              console.log("city", res.data);

              that.provinceLXQ = res.data;

              // that.streetSelected = result.streetName;
              that.selectedXQ     = result.regionProvince.split("-")[0];
              that.provinceNameXQ = result.regionProvince.split("-")[1];

              that.citySelectedXQ   = result.regionCity.split("-")[0];
              that.cityNameXQ       = result.regionCity.split("-")[1];
              that.areaSelectedXQ   = result.regionDistrict.split("-")[0];
              that.areaNameXQ       = result.regionDistrict.split("-")[1];
              that.streetSelectedXQ = result.streetId;
              that.streetNameXQ     = result.streetName;
            });

        if (result.planPaperPics != null && result.planPaperPics != "") {
          // alert(result.planPaperPics);
          var url      = result.planPaperPics.split(";");
          var tempHtml = "";
          for (i = 0; i <= url.length; i++) {
            if (url[i] != "" && typeof url[i] != "undefined") {
              var code = url[i].split(".")[0].split("/")[3];
              var data = `<li style='position:relative;width:80px;height:80px;float:left;list-style:none;margin-left:10px;' id='${code}' value33='${
                url[i]
              }'><img  style='width:100%;height:100%;cursor:pointer;' src='${
                this.$store.state.globalIMGRouter
              }/${url[i]}' /></li>`;

              var MyComponent = Vue.extend({
                template: data,
                data() {
                  return {};
                },
                methods: {
                  // delete11(event){
                  //   // alert('33');
                  //   var goal = event.target.getAttribute('value');
                  //   $('#'+goal).remove();
                  // }
                }
              });
              var component = new MyComponent().$mount();
              $("#result").append(data);
            }
          }
        }

        // if (result.planPaperPics != null && result.planPaperPics != "") {
        //   var url      = result.planPaperPics.split(";");
        //   var tempHtml = "";
        //   for (i = 0; i <= url.length; i++) {
        //     if (url[i] != "" && typeof url[i] != "undefined") {
        //       // 图片路径为他们的域名
        //       var allUrl    = "http://www.ecare.org.cn:8081/" + url[i];
        //           tempHtml +=
        //         '<li name=\'apply_img_li\' style="margin:0;margin-right:10px;width:80px;height:80px;"><input name="applyImg" value="' +
        //         allUrl +
        //         '" type="hidden"><img src="' +
        //         allUrl +
        //         '" big_src="' +
        //         allUrl +
        //         '"  style="width:80px;height:80px;"></li>';
        //     }
        //   }
        //   $("#detail_img_li").html(tempHtml);
        // }

        $("#submitButton").css("background", "#7BB6EC");
        $("#submitButton").removeAttr("disabled");

        // 护理计划制定的时候数据为空
        var tableHTML = "";
        for (var i = 0; i < result.confNursingProtocolServiceList.length; i++) {
          var confNursingProtocolService =
            result.confNursingProtocolServiceList[i];
          if (
            confNursingProtocolService.supportAssessLevels.indexOf(
              result.assessedLevel
            ) < 0
          ) {
            continue;
          }
          tableHTML += "<tr name='data_tr'>";
          if (confNursingProtocolService.serviceType == "1") {
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>基础护理</td>";
          } else if (confNursingProtocolService.serviceType == "2") {
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>常用临床护理</td>";
          }
          tableHTML +=
            "<td style='text-align:left;vertical-align: middle;'><input type='checkbox' value='" +
            confNursingProtocolService.id +
            "' name='baseNursingServiceCheckBox' disabled='disabled'/>" +
            confNursingProtocolService.serviceName +
            "<input name='serviceId' type='hidden' value='" +
            confNursingProtocolService.serviceId +
            "'/><input name='serviceName' type='hidden' value='" +
            confNursingProtocolService.serviceName +
            "'/><input name='serviceType' type='hidden' value='" +
            confNursingProtocolService.serviceType +
            "'/></td>";
          // 护理频次（默认）
          tableHTML += "<td style='text-align:center;vertical-align: middle;'>";
          tableHTML +=
            "<input type='text' style='width:50px;margin-top:1px;' disabled='disabled' value='" +
            confNursingProtocolService.frequencyUnitLength +
            "'/>";
          tableHTML +=
            "<select style='width:50px;position:relative;top:-1px;height:31px!important;' disabled='disabled'>";
          if (confNursingProtocolService.frequencyUnit == 1) {
            tableHTML += "<option value='1' selected='selected'>日</option>";
            tableHTML += "<option value='2'>月</option>";
          }
          if (confNursingProtocolService.frequencyUnit == 2) {
            tableHTML += "<option value='1'>日</option>";
            tableHTML += "<option value='2' selected='selected'>月</option>";
          }
          tableHTML += "</select>";
          tableHTML +=
            "<input type='text' style='width:50px;' disabled='disabled' value='" +
            confNursingProtocolService.frequency +
            "'/> 次";
          tableHTML += "</td>";
          // 护理频次（实际）
          tableHTML += "<td style='text-align:center;vertical-align: middle;'>";
          tableHTML +=
            "<input type='text' name='frequencyUnitLength' disabled='disabled' style='width:50px;margin-top:1px;' value='" +
            confNursingProtocolService.frequencyUnitLength +
            "'/>";
          tableHTML +=
            "<select name='frequencyUnit' style='width:50px;position:relative;top:-1px;height:31px!important;' disabled='disabled'>";
          if (confNursingProtocolService.frequencyUnit == 1) {
            tableHTML += "<option value='1' selected='selected'>日</option>";
            tableHTML += "<option value='2'>月</option>";
          }
          if (confNursingProtocolService.frequencyUnit == 2) {
            tableHTML += "<option value='1'>日</option>";
            tableHTML += "<option value='2' selected='selected'>月</option>";
          }
          tableHTML += "</select>";
          tableHTML +=
            "<input type='text' name='frequency' style='width:50px;' disabled='disabled' value='" +
            confNursingProtocolService.frequency +
            "'/> 次";
          tableHTML += "</td>";
          tableHTML +=
            "<td style='text-align:center;vertical-align: middle;'><input type='text' name='duration' disabled='disabled' value='" +
            confNursingProtocolService.duration +
            "' style='width:50px;'> 分</td>";
          tableHTML +=
            "<td style='text-align:center;vertical-align: middle;'><input type='hidden' name='servicePrice' value='" +
            confNursingProtocolService.servicePrice +
            "'>" +
            confNursingProtocolService.servicePrice +
            "</td>";
          tableHTML += "</tr>";
        }
        //先清除下除了表头之外的数据
        $("#detailTable tr:not(:first)").remove();
        $("#detailTable").append(tableHTML);
        for (var j = 0; j < result.nursingServicePlanItemList.length; j++) {
          var nursingServicePlanItem = result.nursingServicePlanItemList[j];
          var $targetTr              = $(
            "input[name='serviceId'][value='" +
              nursingServicePlanItem.serviceId +
              "']"
          )
            .parent()
            .parent();
          $targetTr
            .find("input[name='baseNursingServiceCheckBox']")
            .attr("checked", true);
          $targetTr
            .find("input[name='frequencyUnitLength']")
            .val(nursingServicePlanItem.frequencyUnitLength); // 频次长度
          $targetTr
            .find("input[name='frequency']")
            .val(nursingServicePlanItem.frequency); // 频次
          $targetTr
            .find("select[name='frequencyUnit']")
            .val(nursingServicePlanItem.frequencyUnit); // 频次的单位
          $targetTr
            .find("input[name='duration']")
            .val(nursingServicePlanItem.duration); // 护理时长
        }

        //计划详情
        if (null != tableHTML || tableHTML != "") {
          var otherHtml  = "";
              otherHtml += "<tr name='data_tr_cost_stotal'>";
              otherHtml +=
            "<td style='text-align:center;vertical-align: middle;'>合计</td>";
          otherHtml +=
            "<td style='text-align:center;vertical-align: middle;'></td>";
          otherHtml +=
            "<td style='text-align:center;vertical-align: middle;'></td>";
          otherHtml +=
            "<td style='text-align:center;vertical-align: middle;'></td>";
          otherHtml +=
            "<td style='text-align:center;vertical-align: middle;'></td>";
          otherHtml +=
            "<td style='text-align:center;vertical-align: middle;' id='costTotal'>0.00(元/月)</td>";
          otherHtml += "</tr>";
          otherHtml += "<tr name='message'>";
          otherHtml +=
            "<td colspan='6' style='text-align: center'>说明：每月实际护理费用，按当月护理执行记录为准，护理项目30日1次的按遵医嘱执行，暂不合计费用</td>";
          otherHtml += "</tr>";
          $("#detailTable").append(otherHtml);
        }
        var that = this;
        this.$options.methods.costTotal(that);
      });
      //    解决调用同级方法里面this失效问题
      var that = this;
      this.$options.methods.costTotal(that);
      // if (type == 2) {
      //   // $("#auditHomeServiceButton").show();
      //   $("#detailAudit6").attr("style", "display:block;");
      //   // $("#auditID").val(planId);
      // }
      // if (flag == "no") {
      //   $("#auditHomeServiceButton").hide();
      //   $("#detailAudit").attr("style", "display:none;");
      // }
    },
    costTotal(that) {
      var conditons = [];
      $("#detailTable")
        .find("tr[name='data_tr']")
        .each(function() {
          if (
            $(this)
              .find("input[name='baseNursingServiceCheckBox']")
              .attr("checked")
          ) {
            var nursingServicePlanItem             = new Object();
                nursingServicePlanItem.serviceType = $(this)
              .find("input[name='serviceType']")
              .val();
            nursingServicePlanItem.serviceId = $(this)
              .find("input[name='serviceId']")
              .val();
            nursingServicePlanItem.serviceName = $(this)
              .find("input[name='serviceName']")
              .val();
            nursingServicePlanItem.servicePrice = $(this)
              .find("input[name='servicePrice']")
              .val();
            var frequencyUnitLength = $(this)
              .find("input[name='frequencyUnitLength']")
              .val();
            if (frequencyUnitLength == "") {
              alert("频次长度不能为空");
              return false;
            }
            if (
              /^(\+|-)?\d+$/.test(frequencyUnitLength) &&
              frequencyUnitLength > 0
            ) {
              nursingServicePlanItem.frequencyUnitLength = frequencyUnitLength;
            } else {
              alert("频次长度必须是正整数");
              return false;
            }
            nursingServicePlanItem.frequencyUnit = $(this)
              .find("select[name='frequencyUnit']")
              .val();
            var frequency = $(this)
              .find("input[name='frequency']")
              .val();
            if (frequency == "") {
              alert("频次不能为空");
              return false;
            }
            if (/^(\+|-)?\d+$/.test(frequency) && frequency > 0) {
              nursingServicePlanItem.frequency = frequency;
            } else {
              alert("频次必须是正整数");
              return false;
            }

            var duration = $(this)
              .find("input[name='duration']")
              .val();
            if (duration == "") {
              alert("时长不能为空");
              return false;
            }
            if (/^(\+|-)?\d+$/.test(duration) && duration > 0) {
              nursingServicePlanItem.duration = duration;
            } else {
              alert("时长必须是正整数");
              return false;
            }
            conditons.push(nursingServicePlanItem);
          }
        });

      if (conditons.length > 0) {
        // console.log(conditons)
        // alert('11')
        $.ajax({
          type: "POST",
          url : `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_plan_base_mng/cost_total`,
          contentType: "application/json; charset=utf-8",
          data       : JSON.stringify(conditons),
          dataType   : "json",
          xhrFields  : {
            withCredentials: true
          },
          crossDomain: true,
          success    : function(res) {
            if (res.resultCode == "000000") {
              document.getElementById("costTotal").innerHTML = res.data;
            } else {
              alert("请求失败，服务出错！");
            }
          },
          error: function() {
            tip("请求失败，服务出错！");
          }
        });
        // that
        //   .$axios({
        //     url: `${
        //       that.$store.state.globalRouter
        //     }/auth/nursing/nursing_service_plan_base_mng/cost_total`,
        //     method: "post",
        //     data  : JSON.stringify(conditons)
        //     // url: `${
        //     //   that.$store.state.globalRouter
        //     // }/auth/nursing/nursing_service_plan_base_mng/cost_total`,
        //     // method: "get",
        //     // params: {
        //     //   conditions: JSON.stringify(conditons)
        //     // }
        //   })
        //   .then(res => {
        //     document.getElementById("costTotal").innerHTML = res.data.data;
        //   });
      }
    },
    planSubmit(curOpt_) {
      var myModelTable                    = $("#myModelTable");
      var addressTable                    = $("#addressTable");
      var nursingServicePlanBase          = new Object();
          nursingServicePlanBase.userName = myModelTable
        .find("input[name='userName']")
        .val();
      nursingServicePlanBase.userIdcard = myModelTable
        .find("input[name='userIdcard']")
        .val();
      nursingServicePlanBase.medicalInsuranceId = myModelTable
        .find("input[name='medicalInsuranceId']")
        .val();
      nursingServicePlanBase.userSex = myModelTable
        .find("input[name='userSex']")
        .val();
      nursingServicePlanBase.userAge = myModelTable
        .find("input[name='userAge']")
        .val();
      nursingServicePlanBase.userAssessedLevel = myModelTable
        .find("input[name='userAssessedLevel']")
        .val();
      nursingServicePlanBase.agentName = myModelTable
        .find("input[name='agentName']")
        .val();
      nursingServicePlanBase.agentPhone = myModelTable
        .find("input[name='agentPhone']")
        .val();
      nursingServicePlanBase.regionProvince =
        this.selected + "-" + this.provinceName;
      nursingServicePlanBase.regionCity =
        this.citySelected + "-" + this.cityName;
      nursingServicePlanBase.regionDistrict =
        this.areaSelected + "-" + this.areaName;
      nursingServicePlanBase.streetId   = this.streetSelected;
      nursingServicePlanBase.streetName = this.streetName;
      nursingServicePlanBase.address    = addressTable
        .find("input[name='address']")
        .val();
      nursingServicePlanBase.planStartDateString = myModelTable
        .find("input[name='planStartDate']")
        .val();
      nursingServicePlanBase.special = myModelTable
        .find("select[name='special']")
        .val();
      nursingServicePlanBase.handicapped = myModelTable
        .find("select[name='handicapped']")
        .val();
      nursingServicePlanBase.planId = this.planId;

      // console.log("要提交的数据", nursingServicePlanBase);
      var applyImg = "";

      // 图片路径相关
      // "planPaperPics":"upload/cms/assess/190314094806131.jpg;upload/cms/assess/190314094814104.png;"
      // $.each($("input[name$='applyImg']"), function(index, text) {
      //   applyImg += text.value + ";";
      // });
      var applyImg = "";
      if ($("#result").find("li") && $("#result").find("li").length >= 1) {
        var data = $("#result").find("li");
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
          applyImg += data[i].attributes.value33.value + ";";
        }
      }
      // console.log('图片',applyImg);
      nursingServicePlanBase.planPaperPics = applyImg;

      if (myModelTable.find("input[name='agentName']").val() == "") {
        alert("代理人姓名不能为空");
        return false;
      }
      if (myModelTable.find("input[name='agentPhone']").val() == "") {
        alert("联系电话不能为空");
        return false;
      }
      if (myModelTable.find("input[name='address']").val() == "") {
        alert("联系地址不能为空");
        return false;
      }
      if (myModelTable.find("input[name='planStartDate']").val() == "") {
        alert("计划开始日期不能为空");
        return false;
      }
      // 此处不能识别size只能识别length
      // console.log($("#pagDetailModalTable").find("tr[name='data_tr']").find("input[name='baseNursingServiceCheckBox']:checked").length)
      if (
        $("#pagDetailModalTable")
          .find("tr[name='data_tr']")
          .find("input[name='baseNursingServiceCheckBox']:checked").length == 0
      ) {
        alert("至少选择一个护理项目");
        return false;
      }

      var conditons = [];
      var i         = 0;
      $("#pagDetailModalTable")
        .find("tr[name='data_tr']")
        .each(function() {
          // 获取被选中的数据时，不能使用attr获取checked属性，而是需要使用prop来获取，重要
          if (
            $(this)
              .find("input[name='baseNursingServiceCheckBox']")
              .prop("checked")
          ) {
            var nursingServicePlanItem             = new Object();
                nursingServicePlanItem.serviceType = $(this)
              .find("input[name='serviceType']")
              .val();
            nursingServicePlanItem.serviceId = $(this)
              .find("input[name='serviceId']")
              .val();
            nursingServicePlanItem.serviceName = $(this)
              .find("input[name='serviceName']")
              .val();
            var frequencyUnitLength = $(this)
              .find("input[name='frequencyUnitLength']")
              .val();
            if (frequencyUnitLength == "") {
              alert("频次长度不能为空");
              return false;
            }
            if (
              /^(\+|-)?\d+$/.test(frequencyUnitLength) &&
              frequencyUnitLength > 0
            ) {
              nursingServicePlanItem.frequencyUnitLength = frequencyUnitLength;
            } else {
              alert("频次长度必须是正整数");
              return false;
            }
            nursingServicePlanItem.frequencyUnit = $(this)
              .find("select[name='frequencyUnit']")
              .val();
            var frequency = $(this)
              .find("input[name='frequency']")
              .val();
            if (frequency == "") {
              alert("频次不能为空");
              return false;
            }
            if (/^(\+|-)?\d+$/.test(frequency) && frequency > 0) {
              nursingServicePlanItem.frequency = frequency;
            } else {
              alert("频次必须是正整数");
              return false;
            }

            var duration = $(this)
              .find("input[name='duration']")
              .val();
            if (duration == "") {
              alert("时长不能为空");
              return false;
            }
            if (/^(\+|-)?\d+$/.test(duration) && duration > 0) {
              nursingServicePlanItem.duration = duration;
            } else {
              alert("时长必须是正整数");
              return false;
            }

            nursingServicePlanItem.servicePrice = $(this)
              .find("input[name='servicePrice']")
              .val();
            conditons.push(nursingServicePlanItem);
          }
        });

      // console.log('conditions',this.$moment(this.updateStartTime).format("YYYY-MM-DD HH:mm:ss"),conditons);
      var newObj                              = {};
          newObj.nursingServicePlanBaseRspDTO = nursingServicePlanBase;
          newObj.nursingServicePlanItems      = conditons;
      // console.log(newObj);
      if (this.curOpt_ == 3) {
        // alert('66')

         newObj.nursingServicePlanBaseRspDTO.regionProvince =
        this.selectedXG + "-" + this.provinceNameXG;
      newObj.nursingServicePlanBaseRspDTO.regionCity =
        this.citySelectedXG + "-" + this.cityNameXG;
      newObj.nursingServicePlanBaseRspDTO.regionDistrict =
        this.areaSelectedXG + "-" + this.areaNameXG;
      newObj.nursingServicePlanBaseRspDTO.streetId   = this.streetSelectedXG;
      newObj.nursingServicePlanBaseRspDTO.streetName = this.streetNameXG;
        this.$axios({
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_plan_base_mng/update_nursing_service_plan_base`,
          method: "post",
          data  : newObj
        }).then(res => {
          this.$options.methods.getReloadData(this);
          alert("修改成功");
          this.dialogVisible1 = false;
        });
      } else if (this.curOpt_ == 1) {
        this.$axios({
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_plan_base_mng/save_nursing_service_plan_base`,
          method: "post",
          data  : newObj
        }).then(res => {
          if(res.data.resultCode=='000000'){
            alert("添加成功");
          }else{
            this.$message.warning(res.data.resultMsg);
          }
          this.$options.methods.getReloadData(this);
          this.dialogVisible = false;
        });
      }
    },
    clearModelTable() {
      var myModelTable = $("#myModelTable");
      var addressTable = $("#addressTable");
      myModelTable.find("input[name='userIdcard']").val("");
      myModelTable.find("input[name='userName']").val("");
      myModelTable.find("input[name='userAge']").val("");
      myModelTable.find("input[name='userSexM']").attr("checked", false);
      myModelTable.find("input[name='userSexF']").attr("checked", false);
      myModelTable.find("input[name='userAssessedLevel']").val("");
      myModelTable.find("input[name='agentName']").val("");
      myModelTable.find("input[name='agentPhone']").val("");
      myModelTable.find("input[name='address']").val("");
      myModelTable.find("input[name='medicalInsuranceId']").val("");
      $("#pagDetailModalTable tr:not(:first)").remove();
      $("#submitButton").css("background", "#b6c2c9");
      $("#submitButton").attr("disabled", true);

      addressTable.find("input[name='regionProvince']").val();
      addressTable.find("input[name='regionCity']").val();
      addressTable.find("input[name='regionDistrict']").val();
      // $("select[name='province']").change();
    },

    fillAppointAgeAndSex() {
      // var that = this;
      var that = this;

      var myModelTable = $("#myModelTable");
      if (myModelTable.find("input[name='userIdcard']").val() == "") {
        this.$options.methods.clearModelTable();
        return false;
      }
      $("#submitButton").css("background", "#b6c2c9");
      $("#submitButton").attr("disabled", true);
      var idCard = myModelTable.find("input[name='userIdcard']").val();
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_base_mng/load_ins_user_by_idCard?idCard=${encodeURI(idCard)}`,
        method: "get"
      }).then(res => {
        var result = res.data.data;
        if (result.idNo == null) {
          $("#userAge").focus();
          alert(
            "无身份证号为：" +
              myModelTable.find("input[name='userIdcard']").val() +
              "的参保人记录信息"
          );
          this.$options.methods.clearModelTable();
        } else {
          if (result.idNo == "-1") {
            $("#userAge").focus();
            alert(
              "身份证号为：" +
                myModelTable.find("input[name='userIdcard']").val() +
                "的参保人已有护理计划，无法再次制定"
            );
            this.$options.methods.clearModelTable();
          } else if (result.idNo == "-2") {
            $("#userAge").focus();
            alert(
              "身份证号为：" +
                myModelTable.find("input[name='userIdcard']").val() +
                "的参保人评估状态非已完成且通过复审，无法制定计划"
            );
            this.$options.methods.clearModelTable();
          } else if (result.assessedLevel == null) {
            $("#userAge").focus();
            alert(
              "身份证号为：" +
                myModelTable.find("input[name='userIdcard']").val() +
                "的参保人评估等级尚未完成"
            );
            this.$options.methods.clearModelTable();
          } else if (result.assessedLevel == 0 || result.assessedLevel == "0") {
            $("#userAge").focus();
            alert(
              "身份证号为：" +
                myModelTable.find("input[name='userIdcard']").val() +
                "的参保人评估等级为0级，无法新增服务计划"
            );
            this.$options.methods.clearModelTable();
          } else if (result.assessedLevel == 1 || result.assessedLevel == "1") {
            $("#userAge").focus();
            alert(
              "身份证号为：" +
                myModelTable.find("input[name='userIdcard']").val() +
                "的参保人评估等级为1级，无法新增服务计划"
            );
            this.$options.methods.clearModelTable();
          } else if (result.assessedLevel == 2 || result.assessedLevel == "2") {
            $("#userAge").focus();
            alert(
              "身份证号为：" +
                myModelTable.find("input[name='userIdcard']").val() +
                "的参保人评估等级为2级，无法新增服务计划"
            );
            this.$options.methods.clearModelTable();
          } else if (result.assessedLevel == 3 || result.assessedLevel == "3") {
            $("#userAge").focus();
            alert(
              "身份证号为：" +
                myModelTable.find("input[name='userIdcard']").val() +
                "的参保人评估等级为3级，无法新增服务计划"
            );
            this.$options.methods.clearModelTable();
          }
          // else if (result.assessedLevel == 4 || result.assessedLevel == "4") {
          //   $("#userAge").focus();
          //   alert(
          //     "身份证号为：" +
          //       myModelTable.find("input[name='userIdcard']").val() +
          //       "的参保人评估等级为4级，无法新增服务计划"
          //   );
          //   this.$options.methods.clearModelTable();
          // }
          else if (result.confNursingProtocolServiceList == null) {
            $("#userAge").focus();
            alert(
              "身份证号为：" +
                myModelTable.find("input[name='userIdcard']").val() +
                "的参保人的护理协议配置不正确，项目所在地没有配置相对应的护理协议或者护理协议没有配置"
            );
            this.$options.methods.clearModelTable();
          } else {
            myModelTable.find("input[name='userIdcard']").val(result.idNo);
            myModelTable.find("input[name='userName']").val(result.fullName);
            //下面是简单的根据身份证号算下年龄和性别并赋上值，可以手动再改
            var date          = new Date();
            var year          = date.getFullYear();
            var birthday_year = parseInt(
              myModelTable
                .find("input[name='userIdcard']")
                .val()
                .substr(6, 4)
            );
            var userage = year - birthday_year;
            myModelTable.find("input[name='userAge']").val(userage);
            if (result.sex == "M") {
              that.updateSex = "M";
            } else {
              that.updateSex = "F";
            }
            myModelTable.find("input[name='userSex']").val(result.sex);
            //     if (result.sex == "M") {

            // } else {
            //   myModelTable
            //     .find("input[name='userSexF']")
            //     .prop("checked", "checked");
            //     myModelTable
            //     .find("input[name='userSexM']")
            //     .prop("checked",false);
            // }
            //     myModelTable.find("input[name='userSex']").val(result.sex);
            myModelTable
              .find("input[name='userAssessedLevel']")
              .val(result.assessedLevel);
            myModelTable
              .find("input[name='agentName']")
              .val(result.contactName);
            myModelTable
              .find("input[name='agentPhone']")
              .val(result.contactPhone);

            var addressTable = $("#addressTable");
            addressTable
              .find("input[name='address']")
              .val(result.appointedAddress);
            myModelTable
              .find("input[name='medicalInsuranceId']")
              .val(result.medicalInsuranceId);

            this.selected       = result.regionProvince.split("-")[0];
            this.provinceName   = result.regionProvince.split("-")[1];
            this.citySelected   = result.regionCity.split("-")[0];
            this.cityName       = result.regionCity.split("-")[1];
            this.areaSelected   = result.regionDistrict.split("-")[0];
            this.areaName       = result.regionDistrict.split("-")[1];
            this.streetSelected = result.streetId;
            this.streetName     = result.streetName;

            $("#submitButton").css("background", "#7BB6EC");
            $("#submitButton").removeAttr("disabled");

            // 获取地址？？？？
            // confNursingProtocolServiceList
            // alert('11')
            var tableHTML = "<tbody>";
            for (
              var i = 0;
              i < result.confNursingProtocolServiceList.length;
              i++
            ) {
              var confNursingProtocolService =
                result.confNursingProtocolServiceList[i];
              if (
                confNursingProtocolService.supportAssessLevels.indexOf(
                  result.assessedLevel
                ) < 0
              ) {
                continue;
              }
              tableHTML += "<tr name='data_tr'>";
              if (confNursingProtocolService.serviceType == "1") {
                tableHTML +=
                  "<td style='text-align:center;vertical-align: middle;'>基础护理</td>";
              } else if (confNursingProtocolService.serviceType == "2") {
                tableHTML +=
                  "<td style='text-align:center;vertical-align: middle;'>常用临床护理</td>";
              }
              tableHTML +=
                "<td style='text-align:left;vertical-align: middle;'><input type='checkbox' value='" +
                confNursingProtocolService.id +
                "' name='baseNursingServiceCheckBox' @click='checkData'/>" +
                confNursingProtocolService.serviceName +
                "<input name='serviceId' type='hidden' value='" +
                confNursingProtocolService.serviceId +
                "'/><input name='serviceName' type='hidden' value='" +
                confNursingProtocolService.serviceName +
                "'/><input name='serviceType' type='hidden' value='" +
                confNursingProtocolService.serviceType +
                "'/></td>";
              // 护理频次（默认）
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>";
              tableHTML +=
                "<input type='text' style='width:50px;margin-top:1px;' disabled='disabled' value='" +
                confNursingProtocolService.frequencyUnitLength +
                "'/>";
              tableHTML +=
                "<select style='width:50px;position:relative;top:-1px;height:31px!important;' disabled='disabled'>";
              if (confNursingProtocolService.frequencyUnit == 1) {
                tableHTML +=
                  "<option value='1' selected='selected'>日</option>";
                tableHTML += "<option value='2'>月</option>";
              }
              if (confNursingProtocolService.frequencyUnit == 2) {
                tableHTML += "<option value='1'>日</option>";
                tableHTML +=
                  "<option value='2' selected='selected'>月</option>";
              }
              tableHTML += "</select>";
              tableHTML +=
                "<input type='text' style='width:50px;' disabled='disabled' value='" +
                confNursingProtocolService.frequency +
                "'/> 次";
              tableHTML += "</td>";
              // 护理频次（实际）
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>";
              tableHTML +=
                "<input type='text' name='frequencyUnitLength' style='width:50px;margin-top:1px;' value='" +
                confNursingProtocolService.frequencyUnitLength +
                "' @blur='checkData'/>";
              tableHTML +=
                "<select name='frequencyUnit' style='width:50px;position:relative;top:-1px;height:31px!important;'>";
              if (confNursingProtocolService.frequencyUnit == 1) {
                tableHTML +=
                  "<option value='1' selected='selected'>日</option>";
                tableHTML += "<option value='2'>月</option>";
              }
              if (confNursingProtocolService.frequencyUnit == 2) {
                tableHTML += "<option value='1'>日</option>";
                tableHTML +=
                  "<option value='2' selected='selected'>月</option>";
              }
              tableHTML += "</select>";
              tableHTML +=
                "<input type='text' name='frequency' style='width:50px;' value='" +
                confNursingProtocolService.frequency +
                "' @blur='checkData'/> 次";
              tableHTML += "</td>";
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'><input type='text' name='duration' value='" +
                confNursingProtocolService.duration +
                "' style='width:50px;'> 分</td>";
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'><input type='hidden' name='servicePrice' value='" +
                confNursingProtocolService.servicePrice +
                "'>" +
                confNursingProtocolService.servicePrice +
                "</td>";
              tableHTML += "</tr>";
            }
            tableHTML += "</tbody>";
            //先清除下除了表头之外的数据
            $("#pagDetailModalTable tr:not(:first)").remove();
            // $("#pagDetailModalTable").append(tableHTML);
            // 每次点击计算总价
            var MyComponent = Vue.extend({
              template: tableHTML,
              data() {
                return {};
              },
              methods: {
                checkData() {
                  that.$options.methods.costTotalSalve(that);
                }
              },
              mounted() {}
            });
            var component = new MyComponent().$mount();
            $("#pagDetailModalTable").append(component.$el);

            //新增
            if (null != tableHTML || tableHTML != "") {
              var otherHtml  = "";
                  otherHtml += "<tr name='data_tr_cost_stotal'>";
                  otherHtml +=
                "<td style='text-align:center;vertical-align: middle;'>合计</td>";
              otherHtml +=
                "<td style='text-align:center;vertical-align: middle;'></td>";
              otherHtml +=
                "<td style='text-align:center;vertical-align: middle;'></td>";
              otherHtml +=
                "<td style='text-align:center;vertical-align: middle;'></td>";
              otherHtml +=
                "<td style='text-align:center;vertical-align: middle;'></td>";
              otherHtml +=
                "<td style='text-align:center;vertical-align: middle;' id='costTotal1'>0.00(元/月)</td>";
              otherHtml += "</tr>";
              otherHtml += "<tr name='message'>";
              otherHtml +=
                "<td colspan='6' style='text-align: center'>说明：每月实际护理费用，按当月护理执行记录为准，护理项目30日1次的按遵医嘱执行，暂不合计费用</td>";
              otherHtml += "</tr>";
              $("#pagDetailModalTable").append(otherHtml);
            }
            this.$options.methods.costTotalSalve(this);
          }
        }
      });
    },
    loadInsUserPlanEidtData(planId, that) {
      // console.log(planId,that.$axios);
      that.planId = planId;
      $("#result").html("");
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_plan_base_mng/load_ins_user_plan_edit_data?planId=${encodeURI(planId)}`,
          method: "get"
        })
        .then(res => {
          var result           = res.data.data;
              that.currentData = res.data.data;
          //  console.log('111',result);

          var myModelTable = $("#myModelTable");

          myModelTable.find("input[name='userIdcard']").val(result.idNo);
          myModelTable.find("input[name='userIdcard']").attr("disabled", true);
          myModelTable.find("input[name='userName']").val(result.fullName);
          //下面是简单的根据身份证号算下年龄和性别并赋上值，可以手动再改
          var date          = new Date();
          var year          = date.getFullYear();
          var birthday_year = parseInt(
            myModelTable
              .find("input[name='userIdcard']")
              .val()
              .substr(6, 4)
          );
          var userage = year - birthday_year;
          myModelTable.find("input[name='userAge']").val(userage);
          if (result.sex == "M") {
            that.updateSex = "M";
          } else {
            that.updateSex = "F";
          }
          myModelTable.find("input[name='userSex']").val(result.sex);
          myModelTable
            .find("input[name='userAssessedLevel']")
            .val(result.assessedLevel);
          myModelTable.find("input[name='agentName']").val(result.contactName);
          myModelTable
            .find("input[name='agentPhone']")
            .val(result.contactPhone);

          myModelTable.find("select[name='special']").val(result.special);
          myModelTable
            .find("select[name='handicapped']")
            .val(result.handicapped);

          myModelTable
            .find("input[name='medicalInsuranceId']")
            .val(result.medicalInsuranceId);
          myModelTable
            .find("input[name='planStartDate']")
            .val(result.planStartDate);

          var addressTable = $("#addressTable");
          addressTable
            .find("input[name='address']")
            .val(result.appointedAddress);

            console.log('修改计划',result)

          that
            .$axios({
              url   : `${that.$store.state.globalRouter}/get_provinces`,
              method: "get"
            })
            .then(res => {
              that.provinceLXG = res.data;
              // that.streetSelected = result.streetName;
              that.selectedXG     = result.regionProvince.split("-")[0];
              that.provinceNameXG = result.regionProvince.split("-")[1];
              that.citySelectedXG   = result.regionCity.split("-")[0];
              that.cityNameXG       = result.regionCity.split("-")[1];
              that.areaSelectedXG   = result.regionDistrict.split("-")[0];
              that.areaNameXG       = result.regionDistrict.split("-")[1];
              that.streetSelectedXG = result.streetId;
              that.streetNameXG     = result.streetName;
            });

          if (result.planPaperPics != null && result.planPaperPics != "") {
            var url      = result.planPaperPics.split(";");
            var tempHtml = "";
            for (i = 0; i <= url.length; i++) {
              if (url[i] != "" && typeof url[i] != "undefined") {
                var code = url[i].split(".")[0].split("/")[3];
                var data = `<li style='position:relative;width:80px;height:80px;float:left;list-style:none;margin-left:10px;' id='${code}' value33='${
                  url[i]
                }'><img  style='width:100%;height:100%;cursor:pointer;' src='${
                  that.$store.state.globalIMGRouter
                }/${
                  url[i]
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
                //     var allUrl    = "http://192.168.1.187:4280/img/" + url[i];
                //     var valueUrl  = url[i];
                //         tempHtml +=
                //       '<li name=\'apply_img_li\' style="margin:0;margin-right:10px;width:80px;height:80px;"><input name="applyImg" value="' +
                //       valueUrl +
                //       '" type="hidden"><img src="' +
                //       allUrl +
                //       '" big_src="' +
                //       allUrl +
                //       "\"  style=\"width:80px;height:80px;\"><i class='del_btn' onclick='delParent(this)'></i></li>";
              }
            }
            // $("#up_img_li").before(tempHtml);
          }

          $("#submitButton").css("background", "#7BB6EC");
          $("#submitButton").removeAttr("disabled");

          var tableHTML = "<tbody>";
          for (
            var i = 0;
            i < result.confNursingProtocolServiceList.length;
            i++
          ) {
            var confNursingProtocolService =
              result.confNursingProtocolServiceList[i];
            if (
              confNursingProtocolService.supportAssessLevels.indexOf(
                result.assessedLevel
              ) < 0
            ) {
              continue;
            }
            tableHTML += "<tr name='data_tr'>";
            if (confNursingProtocolService.serviceType == "1") {
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>基础护理</td>";
            } else if (confNursingProtocolService.serviceType == "2") {
              tableHTML +=
                "<td style='text-align:center;vertical-align: middle;'>常用临床护理</td>";
            }
            tableHTML +=
              "<td style='text-align:left;vertical-align: middle;'><input type='checkbox' value='" +
              confNursingProtocolService.id +
              "' name='baseNursingServiceCheckBox' @click='checkData' />" +
              confNursingProtocolService.serviceName +
              "<input name='serviceId' type='hidden' value='" +
              confNursingProtocolService.serviceId +
              "'/><input name='serviceName' type='hidden' value='" +
              confNursingProtocolService.serviceName +
              "'/><input name='serviceType' type='hidden' value='" +
              confNursingProtocolService.serviceType +
              "'/></td>";
            // 护理频次（默认）
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>";
            tableHTML +=
              "<input type='text' style='width:50px;margin-top:1px;' disabled='disabled' value='" +
              confNursingProtocolService.frequencyUnitLength +
              "'/>";
            tableHTML +=
              "<select style='width:50px;position:relative;top:-1px;height:31px!important;' disabled='disabled'>";
            if (confNursingProtocolService.frequencyUnit == 1) {
              tableHTML += "<option value='1' selected='selected'>日</option>";
              tableHTML += "<option value='2'>月</option>";
            }
            if (confNursingProtocolService.frequencyUnit == 2) {
              tableHTML += "<option value='1'>日</option>";
              tableHTML += "<option value='2' selected='selected'>月</option>";
            }
            tableHTML += "</select>";
            tableHTML +=
              "<input type='text' style='width:50px;' disabled='disabled' value='" +
              confNursingProtocolService.frequency +
              "'/> 次";
            tableHTML += "</td>";
            // 护理频次（实际）
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'>";
            tableHTML +=
              "<input type='text' name='frequencyUnitLength' style='width:50px;margin-top:1px;' value='" +
              confNursingProtocolService.frequencyUnitLength +
              "' @blur='checkData'/>";
            tableHTML +=
              "<select name='frequencyUnit' style='width:50px;position:relative;top:-1px;height:31px!important;'>";
            if (confNursingProtocolService.frequencyUnit == 1) {
              tableHTML += "<option value='1' selected='selected'>日</option>";
              tableHTML += "<option value='2'>月</option>";
            }
            if (confNursingProtocolService.frequencyUnit == 2) {
              tableHTML += "<option value='1'>日</option>";
              tableHTML += "<option value='2' selected='selected'>月</option>";
            }
            tableHTML += "</select>";
            tableHTML +=
              "<input type='text' name='frequency' style='width:50px;' value='" +
              confNursingProtocolService.frequency +
              "' @blur='checkData'/> 次";
            tableHTML += "</td>";
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'><input type='text' name='duration' value='" +
              confNursingProtocolService.duration +
              "' style='width:50px;'> 分</td>";
            tableHTML +=
              "<td style='text-align:center;vertical-align: middle;'><input type='hidden' name='servicePrice' value='" +
              confNursingProtocolService.servicePrice +
              "'>" +
              confNursingProtocolService.servicePrice +
              "</td>";
            tableHTML += "</tr>";
          }

          tableHTML += "</tbody>";
          //先清除下除了表头之外的数据
          $("#pagDetailModalTable tr:not(:first)").remove();
          // $("#pagDetailModalTable").append(tableHTML);
          // 每次点击计算总价
          var MyComponent = Vue.extend({
            template: tableHTML,
            data() {
              return {};
            },
            methods: {
              checkData() {
                that.$options.methods.costTotalSalve(that);
              }
            },
            mounted() {}
          });
          var component = new MyComponent().$mount();
          $("#pagDetailModalTable").append(component.$el);

          // event.$el.appendChild();

          for (var j = 0; j < result.nursingServicePlanItemList.length; j++) {
            var nursingServicePlanItem = result.nursingServicePlanItemList[j];
            var $targetTr              = $(
              "input[name='serviceId'][value='" +
                nursingServicePlanItem.serviceId +
                "']"
            )
              .parent()
              .parent();
            $targetTr
              .find("input[name='baseNursingServiceCheckBox']")
              .attr("checked", true);
            $targetTr
              .find("input[name='frequencyUnitLength']")
              .val(nursingServicePlanItem.frequencyUnitLength); // 频次长度
            $targetTr
              .find("input[name='frequency']")
              .val(nursingServicePlanItem.frequency); // 频次
            $targetTr
              .find("select[name='frequencyUnit']")
              .val(nursingServicePlanItem.frequencyUnit); // 频次的单位
            $targetTr
              .find("input[name='duration']")
              .val(nursingServicePlanItem.duration); // 护理时长
          }

          //修改
          if (null != tableHTML || tableHTML != "") {
            var otherHtml  = "";
                otherHtml += "<tr name='data_tr_cost_stotal'>";
                otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'>合计</td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'></td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'></td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'></td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;'></td>";
            otherHtml +=
              "<td style='text-align:center;vertical-align: middle;' id='costTotal1'>0.00(元/月)</td>";
            otherHtml += "</tr>";
            otherHtml += "<tr name='message'>";
            otherHtml +=
              "<td colspan='6' style='text-align: center'>说明：每月实际护理费用，按当月护理执行记录为准，护理项目30日1次的按遵医嘱执行，暂不合计费用</td>";
            otherHtml += "</tr>";
            $("#pagDetailModalTable").append(otherHtml);
          }
          that.$options.methods.costTotalSalve(that);
        });
      // that.$options.methods.costTotalData(that);
    },

    costTotalData(that) {
      //护理项目总价(复选框点击事件)
      $("input[name='baseNursingServiceCheckBox']").click(function() {
        that.$options.methods.costTotalSalve(that);
      });
      //下拉框的事件
      $("select[name='frequencyUnit']").change(function() {
        that.$options.methods.costTotalSalve(that);
      });
    },
    costTotalSalve(that) {
      var conditons = [];
      $("#pagDetailModalTable")
        .find("tr[name='data_tr']")
        .each(function() {
          // prop与attr区别
          if (
            $(this)
              .find("input[name='baseNursingServiceCheckBox']")
              .prop("checked")
          ) {
            var nursingServicePlanItem             = new Object();
                nursingServicePlanItem.serviceType = $(this)
              .find("input[name='serviceType']")
              .val();
            nursingServicePlanItem.serviceId = $(this)
              .find("input[name='serviceId']")
              .val();
            nursingServicePlanItem.serviceName = $(this)
              .find("input[name='serviceName']")
              .val();
            nursingServicePlanItem.servicePrice = $(this)
              .find("input[name='servicePrice']")
              .val();
            var frequencyUnitLength = $(this)
              .find("input[name='frequencyUnitLength']")
              .val();
            if (frequencyUnitLength == "") {
              alert("频次长度不能为空");
              return false;
            }
            if (
              /^(\+|-)?\d+$/.test(frequencyUnitLength) &&
              frequencyUnitLength > 0
            ) {
              nursingServicePlanItem.frequencyUnitLength = frequencyUnitLength;
            } else {
              alert("频次长度必须是正整数");
              return false;
            }
            nursingServicePlanItem.frequencyUnit = $(this)
              .find("select[name='frequencyUnit']")
              .val();
            var frequency = $(this)
              .find("input[name='frequency']")
              .val();
            if (frequency == "") {
              alert("频次不能为空");
              return false;
            }
            if (/^(\+|-)?\d+$/.test(frequency) && frequency > 0) {
              nursingServicePlanItem.frequency = frequency;
            } else {
              alert("频次必须是正整数");
              return false;
            }

            var duration = $(this)
              .find("input[name='duration']")
              .val();
            if (duration == "") {
              alert("时长不能为空");
              return false;
            }
            if (/^(\+|-)?\d+$/.test(duration) && duration > 0) {
              nursingServicePlanItem.duration = duration;
            } else {
              alert("时长必须是正整数");
              return false;
            }
            conditons.push(nursingServicePlanItem);
          }
        });
      if (conditons.length > 0) {
        $.ajax({
          type: "POST",
          url : `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_plan_base_mng/cost_total`,
          contentType: "application/json; charset=utf-8",
          data       : JSON.stringify(conditons),
          dataType   : "json",
          xhrFields  : {
            withCredentials: true
          },
          crossDomain: true,
          success    : function(res) {
            if (res.resultCode == "000000") {
              document.getElementById("costTotal1").innerHTML = res.data;
            } else {
              alert("请求失败，服务出错！");
            }
          },
          error: function() {
            tip("请求失败，服务出错！");
          }
        });
      }
      // if(conditons.length>0){
      //     $.getJSON(curUrl+"?act=costTotal",{'conditions':JSON.stringify(conditons)},function (msg) {
      //         document.getElementById("costTotal").innerHTML = msg;
      //     });
      // }
    },

    // 图片上传相关

    dataList(tableData) {
      var newdata    = [];
      var newdata2   = [];
      var newdata3   = [];
      var dataArray  = tableData;
      var dataArray1 = tableData;
      var dataArray2 = tableData;
      var dataArray3 = tableData;
      dataArray.forEach(el => {
        if (el.auditStatus) {
          if (el.auditStatus == 100) {
            el.auditStatus = "未审核";
          } else if (el.auditStatus == 101) {
            el.auditStatus = "审核通过";
          } else if (el.auditStatus == 102) {
            el.auditStatus = "审核拒绝";
          }
        }
        if (el.planStatus) {
          if (el.planStatus == 1) {
            el.planStatus = "正常";
          } else if (el.planStatus == 2) {
            el.planStatus = "暂停";
          } else if (el.planStatus == 3) {
            el.planStatus = "终止";
          }
        }
      });
      dataArray1.forEach(el => {
        if (el.planStartDate) {
          newdata.push(
            this.$moment(el.planStartDate).format("YYYY-MM-DD")
          );
        }
      });

      dataArray2.forEach(el => {
        if (el.planEndDate) {
          newdata2.push(
            this.$moment(el.planEndDate).format("YYYY-MM-DD")
          );
        }
      });

      dataArray3.forEach(el => {
        if (el.auditTime) {
          newdata3.push(
            this.$moment(el.auditTime).format("YYYY-MM-DD HH:mm:ss")
          );
        }
      });

      this.transform(dataArray1, newdata);
      this.transform2(dataArray2, newdata2);
      this.transform3(dataArray3, newdata3);
      this.datalists = dataArray1;
    },
    transform(old, insert) {
      old.forEach((el, index) => {
        el.planStartDate = insert[index];
      });
    },
    transform2(old, insert) {
      old.forEach((el, index) => {
        el.planEndDate = insert[index];
      });
    },
    transform3(old, insert) {
      old.forEach((el, index) => {
        el.auditTime = insert[index];
      });
    },
    //分页methods
    handleSizeChange(val) {
      this.changePageSize = val;
      this.$options.methods.getReloadData(this);
    },
    handleCurrentChange(val) {
      // alert(this.changePageSize)
      this.$axios({
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_plan_base_mng/pagination?pageSize=${
          encodeURI(this.changePageSize)
        }&pageNo=${encodeURI(val)}&userNameLike=${encodeURI(this.nameSearch)}&userIdcardLike=${
          encodeURI(this.idCardSearch)
        }&medicalInsuranceIdLike=${encodeURI(this.ybCardSearch)}&auditStatus=${
          encodeURI(this.statusSearch)
        }`,
        method: "get"
      }).then(res => {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      });
    },
    handleSelectionChange(val) {
      this.updateData2 = val;
      //   console.log(this.updateData2)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.reload();
        })
        .catch(_ => {});
    },
    handleClose1(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          // alert('11')
          this.reload();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("修改成功");
        } else {
          return false;
        }
      });
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields();
    },

    getReloadData(that) {
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_plan_base_mng/pagination?pageNo=${
            encodeURI(that.currentPage)
          }&pageSize=${encodeURI(that.changePageSize)}`,
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
    },
    deleteAfterGetData(that){
      that
        .$axios({
          url: `${
            that.$store.state.globalRouter
          }/auth/nursing/nursing_service_plan_base_mng/pagination?pageNo=1&pageSize=${encodeURI(that.changePageSize)}`,
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
    }
  },
  mounted() {
    // this.costTotalData(this);
    // this.getData();
    this.$axios({
      url: `${
        this.$store.state.globalRouter
      }/auth/nursing/nursing_service_plan_base_mng/pagination`,
      method: "get"
    }).then(res => {
      if (res.data.resultCode == "100005") {
        this.$router.push({ path: "/" });
      } else {
        this.total       = res.data.totalCount;
        this.currentPage = res.data.curPage;
        this.dataList(res.data.resultList);
      }
    });

    // //获取添加时的所有权限列表（树形）
    // this.treeData = this.$store.state.getRouter;

    this.$axios({
      url   : `${this.$store.state.globalRouter}/get_provinces`,
      method: "get"
    }).then(res => {
      // console.log('city',res.data);

      this.provinceL = res.data;

      // that.streetSelected = result.streetName;
    });

    // 增删改审的权限判断
    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "护理计划制定") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "nursing/nursing_plan") {
              console.log("护理计划制定", submenu[j]);
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
th {
  text-align: right;
}
td {
  padding: 2px 0px;
}

/* 图片上传相关的样式 */
* {
  padding: 0px;
  margin : 0px;
}
li {
  list-style: none;
}
/* .box_page{ padding:30px 0} */
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
  border    : #d9d9d9 1px solid;
  overflow  : hidden;
  border-top: none;
  padding   : 20px 0;
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
/* .del_btn {
      width     : 20px;
      height    : 18px;
      display   : block;
      position  : absolute;
      right     : 0;
      bottom    : 0;
      background: url("../../assets/img/del.png") no-repeat;
      cursor    : pointer;
      z-index   : 9;
    } */

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
.pageNation{
  margin:10px 0;
}

/* 修改，详情，添加模态框样式优化 */

.modal-header {
padding: 12px 15px;
border-bottom-color: #e2e7eb;
min-height: 16.43px;
border-bottom: 1px solid #e5e5e5;
}
.modal-body {
padding: 15px;
}
.dialog-header{
padding: 0px!important;
}
#myModelTableDetail tr,#myModelTable tr,#addressTableDetail tr,#addressTable tr{
border-top: 1px solid #ddd;
}
#myModelTableDetail th,#myModelTable th,#addressTableDetail th,#addressTable th{
text-align: right;
width: 15%;
vertical-align: middle;
}
#myModelTableDetail td,#myModelTable td,#addressTableDetail td,#addressTable td{
text-align: left;
width: 35%;
vertical-align: middle;
}
#addressTable input,#addressTableDetail input {
width: 80%;
}
#myModelTableDetail td,#myModelTableDetail th,#myModelTable td,#myModelTable th,#addressTableDetail td,#addressTableDetail th,#addressTable td,#addressTable th{
padding: 10px 15px;
}
#myModelTableDetail tr:nth-child(odd),#myModelTable tr:nth-child(odd),#addressTableDetail tr:nth-child(odd),#addressTable tr:nth-child(odd){
background-color: #f9f9f9;
}
#nursingPlan{
color: #707478;
}
#myModelTableDetail,#myModelTable,#addressTableDetail,#addressTable{
margin: 0 auto;
padding: 0px;
width: 96%;
background-color: #F0F3F5;
}
h5{
  text-align: left;
}
input{
  padding:6px 12px;
}
.form-control{
  padding:6px 12px;
}
</style>
<style>
#nursingPlan .el-dialog__header{
padding: 0px!important;
}
#nursingPlan .el-dialog__body{
padding: 0px!important;
}
</style>

