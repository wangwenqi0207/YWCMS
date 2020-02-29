// 护理协议配置
<template>
  <div style="padding:20px;height:100%" id="nursingService">
    <div class="tableBox" style="background:#fff;padding:5px;height:95%">
      <div el-row style="margin:10px 0;text-align: left;">
        <div el-col span="24">
          <!-- <el-input placeholder="模糊查询协议名称" v-model="searchText" style="width: auto" size="mini"/>
          <el-button type="primary" icon="el-icon-search" size="small" @click="searchData">搜索</el-button>-->
          <el-button
            v-if="urlRole1==1"
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="addData"
          >新增</el-button>
          <el-button
            v-if="urlRole2==1"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="updateData"
          >修改</el-button>
          <el-button
            v-if="urlRole3==1"
            type="primary"
            icon="el-icon-delete"
            size="small"
            @click="deleteData"
          >删除</el-button>
          <div class="grid-content bg-purple-dark"></div>
        </div>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        size="mini"
        style="text-align:left;"
      >
        <el-form-item label="护理协议编号:">
          <el-input v-model.trim="searchForm.id" placeholder="请输入护理协议编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="护理协议名称:">
          <el-input v-model.trim="searchForm.name" placeholder="请输入护理协议名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="协议有效期:">
          <div class="block">
            <el-date-picker
              v-model="pickDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <div style="padding:5px;height:80%">
        <el-table
          :data="lists"
          border
          stripe
          :default-sort="{prop: 'date', order: 'descending'}"
          @select="checkOut"
          height="100%"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="confId" label="护理协议编号" width="180" sortable></el-table-column>
          <el-table-column prop="confName" label="护理协议名称" width="400"></el-table-column>
          <el-table-column prop="startDate" label="协议开始时间" width="260" sortable></el-table-column>
          <el-table-column prop="endDate" label="协议终止时间" width="260" sortable></el-table-column>
          <el-table-column prop="updateTime" label="上次修改时间" sortable width="300"></el-table-column>
          <el-table-column prop="accessDetail" label="护理协议详情" sortable min-width="180" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="protocolDetails(scope.$index, scope.row)"
              >协议详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- //模态框 -->
      <el-dialog
        :title="proptype"
        :visible.sync="dialogVisible"
        top="50px"
        width="80%"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="20%"
          class="demo-ruleForm"
        >
          <!-- <el-form-item>模态框状态{{modelType}}</el-form-item> -->
          <el-form-item label="护理协议编号" prop="id" width="200">
            <el-input v-model="ruleForm.id" :disabled="updateAction"></el-input>
          </el-form-item>
          <el-form-item label="护理协议名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="date1" label="协议开始时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="ruleForm.date1"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item prop="date2" label="协议结束时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="ruleForm.date2"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 添加负责范围-->
          <el-form-item label="负责范围">
            <child-page
              v-for="(item,index) in items"
              :key="index"
              :index="index"
              :items="items[index]"
              :modelType="modelType"
              :flage="flage"
              :tab_pane_disabled="tab_pane_disabled"
              @deleteIndexArea="deleteArea"
            ></child-page>
            <div style="margin-left:80px;" id="addAreaButton">
              <el-button type="primary" size="mini" @click="addArea">添加负责范围</el-button>
            </div>
          </el-form-item>
          <el-form-item label="参保人为民政部门认定的特殊人群">
            <div class="el-col-24" style="overflow:auto;">
              <table class="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <td></td>
                    <td align="center">统筹基金(%)</td>
                    <td align="center">个人自费(%)</td>
                  </tr>
                  <tr>
                    <td align="middle">基础护理</td>
                    <td align="center">
                      <el-input-number
                        v-model="number1.num1"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="number1.num2"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                  </tr>
                  <tr>
                    <td align="middle">临床护理</td>
                    <td align="center">
                      <el-input-number
                        v-model="number1.num3"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="number1.num4"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-form-item>
          <el-form-item label="参保人为残联部门认定的残疾人">
            <div class="el-col-24" style="overflow:auto;">
              <table class="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <td></td>
                    <td align="center">统筹基金(%)</td>
                    <td align="center">个人自费(%)</td>
                  </tr>
                  <tr>
                    <td align="middle">基础护理</td>
                    <td align="center">
                      <el-input-number
                        v-model="number2.num1"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="number2.num2"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                  </tr>
                  <tr>
                    <td align="middle">临床护理</td>
                    <td align="center">
                      <el-input-number
                        v-model="number2.num3"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="number2.num4"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-form-item>
          <el-form-item label="参保人护理费用比例">
            <!-- 居家上门护理 -->
            <div class="el-col-24">
              <div class="el-col-24" style="overflow:auto;">
                <table class="table table-bordered table-striped">
                  <tbody>
                    <tr>
                      <th colspan="3" align="center">居家上门护理</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td align="center">统筹基金(%)</td>
                      <td align="center">个人自费(%)</td>
                    </tr>
                    <tr>
                      <td align="middle">基础护理</td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num1"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num2"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                    </tr>
                    <tr>
                      <td align="middle">临床护理</td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num3"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num4"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 养护机构护理 -->
            <div class="el-col-24">
              <div class="el-col-24" style="overflow:auto;">
                <table class="table table-bordered table-striped">
                  <tbody>
                    <tr>
                      <th colspan="3" align="center">养护机构护理</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td align="center">统筹基金(%)</td>
                      <td align="center">个人自费(%)</td>
                    </tr>
                    <tr>
                      <td align="middle">基础护理</td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num5"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num6"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                    </tr>
                    <tr>
                      <td align="middle">临床护理</td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num7"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num8"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 医疗机构护理 -->
            <div class="el-col-24">
              <div class="el-col-24" style="overflow:auto;">
                <table class="table table-bordered table-striped">
                  <tbody>
                    <tr>
                      <th colspan="3" align="center">医疗机构护理</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td align="center">统筹基金(%)</td>
                      <td align="center">个人自费(%)</td>
                    </tr>
                    <tr>
                      <td align="middle">基础护理</td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num9"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num10"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                    </tr>
                    <tr>
                      <td align="middle">临床护理</td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num11"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                      <td align="center">
                        <el-input-number
                          v-model="number3.num12"
                          controls-position="right"
                          :min="0"
                          :max="100"
                        ></el-input-number>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="护理人员费用比例">
            <div class="el-col-24" style="overflow:auto;">
              <table class="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <td></td>
                    <td align="center">基础护理(%)</td>
                    <td align="center">临床护理(%)</td>
                  </tr>
                  <tr>
                    <td align="middle">护理人员</td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num1"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num2"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                  </tr>
                  <tr>
                    <td align="middle">护士</td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num3"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num4"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                  </tr>
                  <tr>
                    <td align="middle">家属人员</td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num5"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num6"
                        controls-position="right"
                        :min="0"
                        :max="100"
                      ></el-input-number>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-form-item>
          <div>
            <table
              id="base-nursing-service-table"
              class="table table-striped table-bordered qqq"
              ref="base-nursing-service-table"
            >
              <thead>
                <tr>
                  <th colspan="4"></th>

                  <th colspan="6">失能等级</th>
                  <th colspan="2">护理等级</th>
                </tr>
                <tr>
                  <th rowspan="2">护理分类</th>
                  <th rowspan="2">
                    <input type="checkbox" name="baseNursingServiceCheckBoxCheckAll">护理项目
                  </th>
                  <th rowspan="2">护理频次（默认）</th>
                  <th rowspan="2">护理时长（默认）</th>
                  <th>
                    <input
                      type="checkbox"
                      name="supportAssessLevelsCheckAll"
                      class="col_1"
                      value="1"
                    >失能等级1
                  </th>
                  <th>
                    <input
                      type="checkbox"
                      name="supportAssessLevelsCheckAll"
                      class="col_2"
                      value="2"
                    >失能等级2
                  </th>
                  <th>
                    <input
                      type="checkbox"
                      name="supportAssessLevelsCheckAll"
                      class="col_3"
                      value="3"
                    >失能等级3
                  </th>
                  <th>
                    <input
                      type="checkbox"
                      name="supportAssessLevelsCheckAll"
                      class="col_4"
                      value="4"
                    >失能等级4
                  </th>
                  <th>
                    <input
                      type="checkbox"
                      name="supportAssessLevelsCheckAll"
                      class="col_5"
                      value="5"
                    >失能等级5
                  </th>
                  <th>
                    <input
                      type="checkbox"
                      name="supportAssessLevelsCheckAll"
                      class="col_6"
                      value="6"
                    >失能等级6
                  </th>
                  <th>
                    <input
                      type="checkbox"
                      name="supportNursingLevelsCheckAll"
                      class="col_1"
                      value="1"
                    >护士
                  </th>
                  <th>
                    <input
                      type="checkbox"
                      name="supportNursingLevelsCheckAll"
                      class="col_2"
                      value="2"
                    >护理员
                  </th>
                </tr>
              </thead>
              <tbody id="base-nursing-service-table-tbody"></tbody>
            </table>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 详情模态框 -->
      <el-dialog :title="detailName" :visible.sync="dialogVisible2" top="50px" width="80%">
        <!-- <div id="shadowBox" class="shadowBox" style="width:78%;height:600px;position:fixed;"></div> -->
        <el-collapse v-model="activeNames" >
          <el-collapse-item title="基本信息" name="1">
            <el-form
              :model="detailForm"
              ref="detailForm"
              label-width="20%"
              class="demo-ruleForm"
              :disabled="detailFormDis"
            >
              <!-- <el-form-item>模态框状态{{modelType}}</el-form-item> -->
              <el-form-item label="护理协议编号" prop="id" width="200">
                <el-input v-model="detailForm.id" :disabled="updateAction"></el-input>
              </el-form-item>
              <el-form-item label="护理协议名称" prop="name">
                <el-input v-model="detailForm.name"></el-input>
              </el-form-item>
              <el-form-item prop="date1" label="协议开始时间">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    v-model="detailForm.date1"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item prop="date2" label="协议结束时间">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    v-model="detailForm.date2"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <!-- 添加负责范围-->
              <el-form-item label="负责范围">
                <child-page
                  v-for="(item,index) in items"
                  :key="index"
                  :index="index"
                  :items="items[index]"
                  :modelType="modelType"
                  :flage="flage"
                  :tab_pane_disabled="tab_pane_disabled"
                  @deleteIndexArea="deleteArea"
                ></child-page>
                <div style="margin-left:80px;" id="addAreaButton">
                  <el-button type="primary" size="mini" @click="addArea">添加负责范围</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="特殊人群费用比例" name="2">
            <el-form
              :model="detailForm2"
              ref="detailForm2"
              label-width="20%"
              class="demo-ruleForm"
              :disabled="detailFormDis"
            >
            <!-- 参保人为民政部门认定的特殊人群 -->
              <el-form-item label="参保人为民政部门认定的特殊人群">
                <div class="el-col-24" style="overflow:auto;">
                  <table class="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td></td>
                        <td align="center">统筹基金(%)</td>
                        <td align="center">个人自费(%)</td>
                      </tr>
                      <tr>
                        <td align="middle">基础护理</td>
                        <td align="center">
                          <el-input-number
                            v-model="number1.num1"
                            controls-position="right"
                            :min="0"
                            :max="100"
                          ></el-input-number>
                        </td>
                        <td align="center">
                          <el-input-number
                            v-model="number1.num2"
                            controls-position="right"
                            :min="0"
                            :max="100"
                          ></el-input-number>
                        </td>
                      </tr>
                      <tr>
                        <td align="middle">临床护理</td>
                        <td align="center">
                          <el-input-number
                            v-model="number1.num3"
                            controls-position="right"
                            :min="0"
                            :max="100"
                          ></el-input-number>
                        </td>
                        <td align="center">
                          <el-input-number
                            v-model="number1.num4"
                            controls-position="right"
                            :min="0"
                            :max="100"
                          ></el-input-number>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </el-form-item>
            <!--  参保人为残联部门认定的残疾人-->
              <el-form-item label="参保人为残联部门认定的残疾人">
                <div class="el-col-24" style="overflow:auto;">
                  <table class="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td></td>
                        <td align="center">统筹基金(%)</td>
                        <td align="center">个人自费(%)</td>
                      </tr>
                      <tr>
                        <td align="middle">基础护理</td>
                        <td align="center">
                          <el-input-number
                            v-model="number2.num1"
                            controls-position="right"
                            :min="0"
                            :max="100"
                          ></el-input-number>
                        </td>
                        <td align="center">
                          <el-input-number
                            v-model="number2.num2"
                            controls-position="right"
                            :min="0"
                            :max="100"
                          ></el-input-number>
                        </td>
                      </tr>
                      <tr>
                        <td align="middle">临床护理</td>
                        <td align="center">
                          <el-input-number
                            v-model="number2.num3"
                            controls-position="right"
                            :min="0"
                            :max="100"
                          ></el-input-number>
                        </td>
                        <td align="center">
                          <el-input-number
                            v-model="number2.num4"
                            controls-position="right"
                            :min="0"
                            :max="100"
                          ></el-input-number>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="参保人护理费用比例" name="3">
             <!-- 参保人护理费用比例 -->
                  <!-- 居家上门护理 -->
                  <div class="el-col-24" style="text-align:center">
                    <div style="width:80%;margin:0 auto;overflow:auto;">
                      <table class="table table-bordered table-striped">
                        <tbody>
                          <tr>
                            <th colspan="3" align="center">居家上门护理</th>
                          </tr>
                          <tr>
                            <td></td>
                            <td align="center">统筹基金(%)</td>
                            <td align="center">个人自费(%)</td>
                          </tr>
                          <tr>
                            <td align="middle">基础护理</td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num1"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num2"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                          </tr>
                          <tr>
                            <td align="middle">临床护理</td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num3"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num4"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!-- 养护机构护理 -->
                  <div class="el-col-24">
                    <div style="width:80%;margin:0 auto;overflow:auto;">
                      <table class="table table-bordered table-striped">
                        <tbody>
                          <tr>
                            <th colspan="3" align="center">养护机构护理</th>
                          </tr>
                          <tr>
                            <td></td>
                            <td align="center">统筹基金(%)</td>
                            <td align="center">个人自费(%)</td>
                          </tr>
                          <tr>
                            <td align="middle">基础护理</td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num5"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num6"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                          </tr>
                          <tr>
                            <td align="middle">临床护理</td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num7"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num8"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!-- 医疗机构护理 -->
                  <div class="el-col-24">
                    <div style="width:80%;margin:0 auto;overflow:auto;">
                      <table class="table table-bordered table-striped">
                        <tbody>
                          <tr>
                            <th colspan="3" align="center">医疗机构护理</th>
                          </tr>
                          <tr>
                            <td></td>
                            <td align="center">统筹基金(%)</td>
                            <td align="center">个人自费(%)</td>
                          </tr>
                          <tr>
                            <td align="middle">基础护理</td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num9"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num10"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                          </tr>
                          <tr>
                            <td align="middle">临床护理</td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num11"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                            <td align="center">
                              <el-input-number
                                v-model="number3.num12"
                                controls-position="right"
                                :min="0"
                                :max="100"
                                :disabled="true"
                              ></el-input-number>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
          </el-collapse-item>
          <el-collapse-item title="护理人员费用比例" name="4">
            <div style="width:80%;margin:0 auto;overflow:auto;">
              <table class="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <td></td>
                    <td align="center">基础护理(%)</td>
                    <td align="center">临床护理(%)</td>
                  </tr>
                  <tr>
                    <td align="middle">护理人员</td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num1"
                        controls-position="right"
                        :min="0"
                        :max="100"
                        :disabled="true"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num2"
                        controls-position="right"
                        :min="0"
                        :max="100"
                        :disabled="true"
                      ></el-input-number>
                    </td>
                  </tr>
                  <tr>
                    <td align="middle">护士</td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num3"
                        controls-position="right"
                        :min="0"
                        :max="100"
                        :disabled="true"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num4"
                        controls-position="right"
                        :min="0"
                        :max="100"
                        :disabled="true"
                      ></el-input-number>
                    </td>
                  </tr>
                  <tr>
                    <td align="middle">家属人员</td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num5"
                        controls-position="right"
                        :min="0"
                        :max="100"
                        :disabled="true"
                      ></el-input-number>
                    </td>
                    <td align="center">
                      <el-input-number
                        v-model="number4.num6"
                        controls-position="right"
                        :min="0"
                        :max="100"
                        :disabled="true"
                      ></el-input-number>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-collapse-item>
          <el-collapse-item title="协议项目配置信息" name="5">
            <div id="serviceProtocolConfDetail">
              <table
                class="table table-striped table-bordered qqq"
                name="detailTable"
              >
                <thead>
                  <tr>
                    <th colspan="4"></th>

                    <th colspan="6">失能等级</th>
                    <th colspan="2">护理等级</th>
                  </tr>
                  <tr>
                    <th rowspan="2">护理分类</th>
                    <th rowspan="2">护理项目</th>
                    <th rowspan="2">护理频次（默认）</th>
                    <th rowspan="2">护理时长（默认）</th>
                    <th>
                      <input type="checkbox" name="supportAssessLevelsCheckAll" class="col_1" value="1">失能等级1
                    </th>
                    <th>
                      <input type="checkbox" name="supportAssessLevelsCheckAll" class="col_2" value="2">失能等级2
                    </th>
                    <th>
                      <input type="checkbox" name="supportAssessLevelsCheckAll" class="col_3" value="3">失能等级3
                    </th>
                    <th>
                      <input type="checkbox" name="supportAssessLevelsCheckAll" class="col_4" value="4">失能等级4
                    </th>
                    <th>
                      <input type="checkbox" name="supportAssessLevelsCheckAll" class="col_5" value="5">失能等级5
                    </th>
                    <th>
                      <input type="checkbox" name="supportAssessLevelsCheckAll" class="col_6" value="6">失能等级6
                    </th>
                    <th>
                      <input
                        type="checkbox"
                        name="supportNursingLevelsCheckAll"
                        class="col_1"
                        value="1"
                      >护士
                    </th>
                    <th>
                      <input
                        type="checkbox"
                        name="supportNursingLevelsCheckAll"
                        class="col_2"
                        value="2"
                      >护理员
                    </th>
                  </tr>
                </thead>
                <tbody id="base-nursing-service-details"></tbody>
              </table>
            </div>
         </el-collapse-item>
        </el-collapse>
      </el-dialog>
    </div>
    <div class="pageNation">
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
import childPage from "./child.vue";
import base from "../../base/base";
import { setTimeout } from "timers";
export default {
  mixins: [base],
  inject: ["reload"],
  data() {
    return {
      items: [],
      flage: 0,
      module: "nursing_service_protocol_conf_mng",
      title: "新增护理协议",
      detailName: "护理协议详情",
      activeNames: ['5'],
      detailFormDis:true,
      searchForm: {
        id: "",
        name: ""
      },
      lists: [], //存放表格数据
      tableData: [
        {
          name: "护理床位清洁"
        }
      ],
      ruleForm: {
        id: "",
        name: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        area: 4,
        responsibleArea: "",
        confId: ""
      },
      rules: {
        id: [{ required: true, message: "请输入协议ID", trigger: "blur" }],
        name: [{ required: true, message: "请输入协议名称", trigger: "blur" }],
        date1: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        date2: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      detailForm: {
        id: "",
        name: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        area: 4,
        responsibleArea: "",
        confId: ""
      },
      detailForm2:{

      },
      searchText: null,
      dialogVisible: false,
      dialogVisible2: false,
      proptype: "新增护理协议",
      modelType: 1, //判断是新增还是修改1---新增 0---修改--2查看
      number1: {
        //参保人为民政部门认定的特殊人群
        num1: "",
        num2: "",
        num3: "",
        num4: ""
      },
      number2: {
        //参保人为残联部门认定的残疾人
        num1: "",
        num2: "",
        num3: "",
        num4: ""
      },
      number3: {
        //参保人护理费用比例
        num1: "",
        num2: "",
        num3: "",
        num4: "",
        num5: "",
        num6: "",
        num7: "",
        num8: "",
        num9: "",
        num10: "",
        num11: "",
        num12: ""
      },
      number4: {
        num1: "",
        num2: "",
        num3: "",
        num4: "",
        num5: "",
        num6: ""
      },
      checkData: [],
      pickDate: "",
      nursing_service_allchecked: 0,
      assess_levels_allchecked: 0,
      nursing_levels_allchecked: 0,
      tab_pane_disabled: false,
      // 增删改审的权限问题？？
      urlRole1: 0,
      urlRole2: 0,
      urlRole3: 0,
      urlRole4: 0,

      // 添加协议的编号
      index: 1,
      // 当前修改时原来的数据
      currentData: "",
      updateAction: false
    };
  },
  components: {
    childPage
  },
  methods: {
    getData() {
      this.$axios({
        url: `${this.$store.state.globalRouter}/auth/nursing/${
          this.module
        }/pagination?pageNo=${this.currentPage}&pageSize=${
          this.changePageSize
        }`,
        method: "get"
      }).then(res => {
        if (res.data.resultCode == "100005") {
          this.$router.push({ path: "/" });
        } else {
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.dataList(res.data.resultList);
        }
      });
    },
    dataList(tableData) {
      let data = JSON.parse(JSON.stringify(tableData));
      data.forEach((item, index) => {
        item.updateTime = this.$moment(item.updateTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });
      this.lists = data;
    },
    checkOut(val) {
      this.checkData = val;
    },
    //新增数据
    addData() {
      this.items = [
        {
          overallType: "3",
          regionProvince: 3879,
          regionCity: "",
          regionDistrict: "",
          regionStreet: "",
          province: "北京市",
          city: "",
          district: "",
          street: ""
        }
      ];
      this.updateAction = false;
      var _this = this;
      this.tab_pane_disabled = false;
      this.dialogVisible = true;
      this.proptype = "新增护理协议";
      this.ruleForm.confId = "";
      this.modelType = 1;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
      let mapServiceType = {};
      mapServiceType[1] = "基础护理";
      mapServiceType[2] = "常用临床护理";
      // this.loadBaseNursingService();
      this.$axios({
        method: "get",
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_protocol_conf_mng/load_base_nursing_service`
      }).then(res => {
        if (res.data.data) {
          this.mockData = res.data.data;
          let list = this.mockData;
          // console.log(list);
          let news = "";
          for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list.length - i - 1; j++) {
              if (list[j].serviceType > list[j + 1].serviceType) {
                news = list[j];
                list[j] = list[j + 1];
                list[j + 1] = news;
              }
            }
          }
          let html = "";
          for (let i = 0; i < list.length; i++) {
            html += "<tr name='data_tr'>";
            html += "<td>" + mapServiceType[list[i].serviceType];
            html +=
              "<input name='serviceType' type='hidden' value='" +
              list[i].serviceType +
              "'>";
            html +=
              "<input name='serviceId' type='hidden' value='" +
              list[i].id +
              "'>";
            html +=
              "<input name='servicePrice' type='hidden' value='" +
              list[i].servicePrice +
              "'>";
            html += "</td>";
            html +=
              "<td><input type='checkbox' value='" +
              list[i].id +
              "' name='baseNursingServiceCheckBox' />" +
              list[i].serviceName +
              "<input name='serviceName' type='hidden' value='" +
              list[i].serviceName +
              "'></td>";
            html += "<td>";
            html +=
              "<input type='text' name='frequencyUnitLength' style='width:50px;margin-top:1px;'/>";
            html +=
              "<select name='frequencyUnit' style='width:50px;position:relative;top:1px;height:25px!important;'>";
            html += "<option value='1'>日</option>";
            html += "<option value='2'>月</option>";
            html += "</select>";
            html +=
              "<input type='text' name='frequency' style='width:50px;'/> 次";
            html += "</td>";
            html +=
              "<td><input type='text' name='duration' style='width:50px;'/> 分</td>";
            html +=
              "<td><input type='checkbox' value='1' class='col_1' name='supportAssessLevels'/></td>";
            html +=
              "<td><input type='checkbox' value='2' class='col_2' name='supportAssessLevels'/></td>";
            html +=
              "<td><input type='checkbox' value='3' class='col_3' name='supportAssessLevels'/></td>";
            html +=
              "<td><input type='checkbox' value='4' class='col_4' name='supportAssessLevels'/></td>";
            html +=
              "<td><input type='checkbox' value='5' class='col_5' name='supportAssessLevels'/></td>";
            html +=
              "<td><input type='checkbox' value='6' class='col_6' name='supportAssessLevels'/></td>";
            html +=
              "<td><input type='checkbox' value='1' class='col_1' name='supportNursingLevels'/></td>";
            html +=
              "<td><input type='checkbox' value='2' class='col_2' name='supportNursingLevels'/></td>";
            html += "</tr>";
          }
          setTimeout(function() {
            $("#base-nursing-service-table-tbody").html(html);
          }, 50);

          setTimeout(function() {
            let baseNursingServiceTable = $("#base-nursing-service-table");
            // 护理项目选择
            baseNursingServiceTable
              .find("input[name='baseNursingServiceCheckBoxCheckAll']")
              .change(function() {
                _this.nursing_service_allchecked = 1;
                if ((_this.nursing_service_allchecked = 1)) {
                  baseNursingServiceTable
                    .find("input[name='baseNursingServiceCheckBox']")
                    .prop("checked", true);
                  _this.nursing_service_allchecked = 1;
                } else {
                  baseNursingServiceTable
                    .find("input[name='baseNursingServiceCheckBox']")
                    .prop("checked", false);
                  _this.nursing_service_allchecked = 0;
                }
              });
            // 失能等级选择
            baseNursingServiceTable
              .find("input[name='supportAssessLevelsCheckAll']")
              .change(function() {
                _this.assess_levels_allchecked = 1;
                if (_this.assess_levels_allchecked) {
                  baseNursingServiceTable
                    .find(
                      "input[name='supportAssessLevels'][class='" +
                        $(this).attr("class") +
                        "']"
                    )
                    .prop("checked", true);
                } else {
                  baseNursingServiceTable
                    .find(
                      "input[name='supportAssessLevels'][class='" +
                        $(this).attr("class") +
                        "']"
                    )
                    .prop("checked", false);
                }
              });

            // 护理等级选择
            baseNursingServiceTable
              .find("input[name='supportNursingLevelsCheckAll']")
              .change(function() {
                _this.nursing_levels_allchecked = 1;
                if (_this.nursing_levels_allchecked) {
                  baseNursingServiceTable
                    .find(
                      "input[name='supportNursingLevels'][class='" +
                        $(this).attr("class") +
                        "']"
                    )
                    .prop("checked", true);
                } else {
                  baseNursingServiceTable
                    .find(
                      "input[name='supportNursingLevels'][class='" +
                        $(this).attr("class") +
                        "']"
                    )
                    .prop("checked", false);
                }
              });
          }, 200);
        }
      });

      $("#responsibleAreaDiv").html("");
    },
    //修改数据
    updateData() {
      if (this.checkData.length == 1) {
        this.tab_pane_disabled = false;
        this.dialogVisible = true;
        this.items = [];
        this.proptype = "护理协议修改";
        let _this = this;
        this.modelType = 0;
        let data = this.checkData[0];
        this.ruleForm.confId = data.id;
        let mapServiceType = {};
        mapServiceType[1] = "基础护理";
        mapServiceType[2] = "常用临床护理";
        this.updateAction = true;
        //ajax获取协议基本信息
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_protocol_conf_mng/loadForEdit?id=${
            encodeURI(this.ruleForm.confId)
          }`
        }).then(res => {
          if (res.data.data) {
            let data = res.data.data;
            this.ruleForm.id = data.confId;
            this.ruleForm.name = data.confName;
            this.ruleForm.date1 = data.startDate;
            this.ruleForm.date2 = data.endDate;
          }
        });
        // ajax获取协议负责范围
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_protocol_conf_mng/query_intact_responsible_area?relationObjectId=${
            encodeURI(this.ruleForm.confId)
          }`
        }).then(res => {
          // console.log(res.data.data);
          if (res.data.resultCode == "000000") {
            let result = res.data.data;
            let resData = JSON.parse(JSON.stringify(res.data.data));
            if (resData.length >= 1) {
              resData.forEach(item => {
                item.overallType = item.overallType + "";
                if (item.regionProvince) {
                  item.province = item.regionProvince.split("-")[1];
                  item.regionProvince = parseInt(
                    item.regionProvince.split("-")[0]
                  );
                } else {
                  item.province = "";
                  item.regionProvince = "";
                }
                if (item.regionCity) {
                  item.city = item.regionCity.split("-")[1];
                  item.regionCity = parseInt(item.regionCity.split("-")[0]);
                } else {
                  item.city = "";
                  item.regionCity = "";
                }
                if (item.regionDistrict) {
                  item.district = item.regionDistrict.split("-")[1];
                  item.regionDistrict = parseInt(
                    item.regionDistrict.split("-")[0]
                  );
                } else {
                  item.district = "";
                  item.regionDistrict = "";
                }
                if (
                  item.regionStreet &&
                  item.regionStreet != NaN &&
                  item.regionStreet != "-"
                ) {
                  item.street = item.regionStreet.split(",");
                } else {
                  item.street = [];
                  item.regionStreet = "";
                }
              });
            }
            this.items = resData;
          } else {
          }
        });

        // 获取统筹基金
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_protocol_conf_mng/query_conf_nursing_cost_proportion?nursingProtocolId=${
            encodeURI(this.ruleForm.confId)
          }`
        }).then(res => {
          // console.log(res.data.data);
          if (res.data.data) {
            let data = res.data.data;
            this.number1.num1 = data.insDibaoJichuTongchou;
            this.number1.num2 = data.insDibaoJichuGeren;
            this.number1.num3 = data.insDibaoLinchuangTongchou;
            this.number1.num4 = data.insDibaoLinchuangGeren;

            this.number2.num1 = data.insCanjiJichuTongchou;
            this.number2.num2 = data.insCanjiJichuGeren;
            this.number2.num3 = data.insCanjiLinchuangTongchou;
            this.number2.num4 = data.insCanjiLinchuangGeren;

            this.number3.num1 = data.insJujiaJichuTongchou;
            this.number3.num2 = data.insJujiaJichuGeren;
            this.number3.num3 = data.insJujiaLinchuangTongchou;
            this.number3.num4 = data.insJujiaLinchuangGeren;
            this.number3.num5 = data.insYanghuJichuTongchou;
            this.number3.num6 = data.insYanghuJichuGeren;
            this.number3.num7 = data.insYanghuLinchuangTongchou;
            this.number3.num8 = data.insYanghuLinchuangGeren;
            this.number3.num9 = data.insYiliaoJichuTongchou;
            this.number3.num10 = data.insYiliaoJichuGeren;
            this.number3.num11 = data.insYiliaoLinchuangTongchou;
            this.number3.num12 = data.insYiliaoLinchuangGeren;

            this.number4.num1 = data.nurseNurserJichu;
            this.number4.num2 = data.nurseNurserLinchuang;
            this.number4.num3 = data.nurseNurseJichu;
            this.number4.num4 = data.nurseNurseLinchuang;
            this.number4.num5 = data.nurseMemberJichu;
            this.number4.num6 = data.nurseMemberLinchuang;
          }
        });
        //获取协议服务项目
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_protocol_conf_mng/load_conf_nursing_protocol_service_by_id?confId=${
            encodeURI(this.ruleForm.confId)
          }`
        }).then(res => {
          // console.log(res.data.data);
          if (res.data.resultCode == "000000") {
            this.mockData = res.data.data;
            let list = this.mockData;
            let news = "";
            for (let i = 0; i < list.length; i++) {
              for (let j = 0; j < list.length - i - 1; j++) {
                if (list[j].serviceType > list[j + 1].serviceType) {
                  news = list[j];
                  list[j] = list[j + 1];
                  list[j + 1] = news;
                }
              }
            }
            let html = "";
            if (list.length > 0) {
              for (var i = 0; i < list.length; i++) {
                html += "<tr name='data_tr'>";
                html += "<td>" + mapServiceType[list[i].serviceType];
                html +=
                  "<input name='serviceType' type='hidden' value='" +
                  list[i].serviceType +
                  "'>";
                html +=
                  "<input name='serviceId' type='hidden' value='" +
                  list[i].serviceId +
                  "'>";
                html +=
                  "<input name='servicePrice' type='hidden' value='" +
                  list[i].servicePrice +
                  "'>";
                html += "</td>";
                html +=
                  "<td><input type='checkbox' value='" +
                  list[i].id +
                  "' name='baseNursingServiceCheckBox'/>";
                html +=
                  "" +
                  list[i].serviceName +
                  "<input name='serviceName' type='hidden' value='" +
                  list[i].serviceName +
                  "'></td>";
                html += "<td>";
                html +=
                  "<input type='text' name='frequencyUnitLength' style='width:50px;margin-top:1px;'/>";
                html +=
                  "<select name='frequencyUnit' style='width:50px;position:relative;top:1px;height:25px!important;'>";
                html += "<option value='1'>日</option>";
                html += "<option value='2'>月</option>";
                html += "</select>";
                html +=
                  "<input type='text' name='frequency' style='width:50px;'/> 次";
                html += "</td>";
                html +=
                  "<td><input type='text' name='duration' style='width:50px;'/> 分</td>";
                html +=
                  "<td><input type='checkbox' value='1' class='col_1' name='supportAssessLevels'/></td>";
                html +=
                  "<td><input type='checkbox' value='2' class='col_2' name='supportAssessLevels'/></td>";
                html +=
                  "<td><input type='checkbox' value='3' class='col_3' name='supportAssessLevels'/></td>";
                html +=
                  "<td><input type='checkbox' value='4' class='col_4' name='supportAssessLevels'/></td>";
                html +=
                  "<td><input type='checkbox' value='5' class='col_5' name='supportAssessLevels'/></td>";
                html +=
                  "<td><input type='checkbox' value='6' class='col_6' name='supportAssessLevels'/></td>";
                html +=
                  "<td><input type='checkbox' value='1' class='col_1' name='supportNursingLevels'/></td>";
                html +=
                  "<td><input type='checkbox' value='2' class='col_2' name='supportNursingLevels'/></td>";
                html += "</tr>";
              }
            }

            // console.log(list);
            $("#base-nursing-service-table-tbody").html(html);
            setTimeout(function() {
              for (let m = 0; m < list.length; m++) {
                let object = list[m];
                let $targetTr = $(
                  "input[name='serviceId'][value='" + object.serviceId + "']"
                )
                  .parent()
                  .parent();
                if (object.isChecked == 1) {
                  $targetTr
                    .find("input[name='baseNursingServiceCheckBox']")
                    .attr("checked", true);
                }
                if (object.isChecked == 0) {
                  $targetTr
                    .find("input[name='baseNursingServiceCheckBox']")
                    .attr("checked", false);
                }
                $targetTr
                  .find("input[name='frequencyUnitLength']")
                  .val(object.frequencyUnitLength); // 频次长度
                $targetTr.find("input[name='frequency']").val(object.frequency); // 频次
                $targetTr
                  .find("select[name='frequencyUnit']")
                  .val(object.frequencyUnit); // 频次的单位
                $targetTr.find("input[name='duration']").val(object.duration); // 护理时长
                if (
                  object.supportAssessLevels != null &&
                  object.supportAssessLevels != ""
                ) {
                  let supportAssessLevels_chk_value = object.supportAssessLevels.split(
                    ","
                  );
                  for (
                    let j = 0;
                    j < supportAssessLevels_chk_value.length;
                    j++
                  ) {
                    // 支持的评估等级
                    $targetTr
                      .find(
                        "input[name='supportAssessLevels'][value='" +
                          supportAssessLevels_chk_value[j] +
                          "']"
                      )
                      .attr("checked", true);
                  }
                }
                if (
                  object.supportNursingLevels != null &&
                  object.supportNursingLevels != ""
                ) {
                  let supportNursingLevels_chk_value = object.supportNursingLevels.split(
                    ","
                  );
                  for (
                    let k = 0;
                    k < supportNursingLevels_chk_value.length;
                    k++
                  ) {
                    // 支持的评估护理等级
                    $targetTr
                      .find(
                        "input[name='supportNursingLevels'][value='" +
                          supportNursingLevels_chk_value[k] +
                          "']"
                      )
                      .attr("checked", true);
                  }
                }
                $targetTr
                  .find("input[name='servicePrice']")
                  .val(object.servicePrice); // 服务价格
              }
            }, 100);
            // ------------------------------------
            setTimeout(function() {
              let baseNursingServiceTable = $("#base-nursing-service-table");
              // 护理项目选择
              baseNursingServiceTable
                .find("input[name='baseNursingServiceCheckBoxCheckAll']")
                .change(function() {
                  _this.nursing_service_allchecked = 1;
                  if ((_this.nursing_service_allchecked = 1)) {
                    baseNursingServiceTable
                      .find("input[name='baseNursingServiceCheckBox']")
                      .prop("checked", true);
                    _this.nursing_service_allchecked = 1;
                  } else {
                    baseNursingServiceTable
                      .find("input[name='baseNursingServiceCheckBox']")
                      .prop("checked", false);
                    _this.nursing_service_allchecked = 0;
                  }
                });
              // 失能等级选择
              baseNursingServiceTable
                .find("input[name='supportAssessLevelsCheckAll']")
                .change(function() {
                  _this.assess_levels_allchecked = 1;
                  if (_this.assess_levels_allchecked) {
                    baseNursingServiceTable
                      .find(
                        "input[name='supportAssessLevels'][class='" +
                          $(this).attr("class") +
                          "']"
                      )
                      .prop("checked", true);
                  } else {
                    baseNursingServiceTable
                      .find(
                        "input[name='supportAssessLevels'][class='" +
                          $(this).attr("class") +
                          "']"
                      )
                      .prop("checked", false);
                  }
                });

              // 护理等级选择
              baseNursingServiceTable
                .find("input[name='supportNursingLevelsCheckAll']")
                .change(function() {
                  _this.nursing_levels_allchecked = 1;
                  if (_this.nursing_levels_allchecked) {
                    baseNursingServiceTable
                      .find(
                        "input[name='supportNursingLevels'][class='" +
                          $(this).attr("class") +
                          "']"
                      )
                      .prop("checked", true);
                  } else {
                    baseNursingServiceTable
                      .find(
                        "input[name='supportNursingLevels'][class='" +
                          $(this).attr("class") +
                          "']"
                      )
                      .prop("checked", false);
                  }
                });
            }, 200);
            // ---------------------------------------------------------------------
          } else {
            this.$message({ type: "error", message: res.data.resultMsg });
          }
        });
      } else {
        this.$alert("请选择一条数据进行修改");
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.reload();
        })
        .catch(_ => {});
    },
    //删除协议
    deleteData() {
      if (this.checkData.length == 1) {
        let data = this.checkData[0];
        // console.log(data);
        this.$confirm("确定删除此条数据", "提示", {
          confirmButtonText: "确定",
          cancleButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$axios({
              method: "get",
              url: `${
                this.$store.state.globalRouter
              }/auth/nursing/nursing_service_protocol_conf_mng/remove?id=${
                encodeURI(data.id)
              }`
            }).then(res => {
              if (res.data.data) {
                this.$message({ type: "success", message: "删除成功" });
                // this.getData();
                // this.getReloadData();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败，服务出错！请稍候再试"
                });
              }
              this.reload();
            });
          })
          .catch(() => {
            this.$message("已取消");
          });
      } else {
        this.$message("请选择一条数据进行删除！");
      }
    },
    // 查询数据
    searchData() {
      let startDate = "";
      let endtDate = "";
      if (this.pickDate) {
        startDate = this.pickDate[0];
        endtDate = this.pickDate[1];
      }
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/nursing/${
          this.module
        }/pagination?confIdLike=${encodeURI(this.searchForm.id)}&confNameLike=${
          encodeURI(this.searchForm.name)
        }&startDateQuery=${encodeURI(startDate)}&endDateQuery=${encodeURI(endtDate)}&pageNo=${
          this.currentPage
        }&pageSize=${this.changePageSize}`
      }).then(res => {
        if (res.data.resultList) {
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.dataList(res.data.resultList);
        } else {
          this.lists = [];
        }
      });
    },
    // 护理协议详情
    protocolDetails(index, rowData) {
      // console.log(index, rowData);
      this.modelType=2;
      this.tab_pane_disabled = true;
      this.dialogVisible2 = true;
      this.detailName = rowData.confName;
      this.detailForm.confId=rowData.id;
      let mapServiceType = {};
      mapServiceType[1] = "基础护理";
      mapServiceType[2] = "常用临床护理";
      this.activeNames=['5'];
      //ajax获取协议基本信息
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_protocol_conf_mng/loadForEdit?id=${
            encodeURI(this.detailForm.confId)
          }`
        }).then(res => {
          if (res.data.data) {
            let data = res.data.data;
            this.detailForm.id = data.confId;
            this.detailForm.name = data.confName;
            this.detailForm.date1 = data.startDate;
            this.detailForm.date2 = data.endDate;
          }
        });
        // ajax获取协议负责范围
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_protocol_conf_mng/query_intact_responsible_area?relationObjectId=${
            encodeURI(this.detailForm.confId)
          }`
        }).then(res => {
          // console.log(res.data.data);
          if (res.data.resultCode == "000000") {
            let result = res.data.data;
            let resData = JSON.parse(JSON.stringify(res.data.data));
            if (resData.length >= 1) {
              resData.forEach(item => {
                item.overallType = item.overallType + "";
                if (item.regionProvince) {
                  item.province = item.regionProvince.split("-")[1];
                  item.regionProvince = parseInt(
                    item.regionProvince.split("-")[0]
                  );
                } else {
                  item.province = "";
                  item.regionProvince = "";
                }
                if (item.regionCity) {
                  item.city = item.regionCity.split("-")[1];
                  item.regionCity = parseInt(item.regionCity.split("-")[0]);
                } else {
                  item.city = "";
                  item.regionCity = "";
                }
                if (item.regionDistrict) {
                  item.district = item.regionDistrict.split("-")[1];
                  item.regionDistrict = parseInt(
                    item.regionDistrict.split("-")[0]
                  );
                } else {
                  item.district = "";
                  item.regionDistrict = "";
                }
                if (
                  item.regionStreet &&
                  item.regionStreet != NaN &&
                  item.regionStreet != "-"
                ) {
                  item.street = item.regionStreet.split(",");
                } else {
                  item.street = [];
                  item.regionStreet = "";
                }
              });
            }
            this.items = resData;
          } else {
          }
        });
          // 获取统筹基金
        this.$axios({
          method: "get",
          url: `${
            this.$store.state.globalRouter
          }/auth/nursing/nursing_service_protocol_conf_mng/query_conf_nursing_cost_proportion?nursingProtocolId=${
            encodeURI(this.detailForm.confId)
          }`
        }).then(res => {
          // console.log(res.data.data);
          if (res.data.data) {
            let data = res.data.data;
            this.number1.num1 = data.insDibaoJichuTongchou;
            this.number1.num2 = data.insDibaoJichuGeren;
            this.number1.num3 = data.insDibaoLinchuangTongchou;
            this.number1.num4 = data.insDibaoLinchuangGeren;

            this.number2.num1 = data.insCanjiJichuTongchou;
            this.number2.num2 = data.insCanjiJichuGeren;
            this.number2.num3 = data.insCanjiLinchuangTongchou;
            this.number2.num4 = data.insCanjiLinchuangGeren;

            this.number3.num1 = data.insJujiaJichuTongchou;
            this.number3.num2 = data.insJujiaJichuGeren;
            this.number3.num3 = data.insJujiaLinchuangTongchou;
            this.number3.num4 = data.insJujiaLinchuangGeren;
            this.number3.num5 = data.insYanghuJichuTongchou;
            this.number3.num6 = data.insYanghuJichuGeren;
            this.number3.num7 = data.insYanghuLinchuangTongchou;
            this.number3.num8 = data.insYanghuLinchuangGeren;
            this.number3.num9 = data.insYiliaoJichuTongchou;
            this.number3.num10 = data.insYiliaoJichuGeren;
            this.number3.num11 = data.insYiliaoLinchuangTongchou;
            this.number3.num12 = data.insYiliaoLinchuangGeren;

            this.number4.num1 = data.nurseNurserJichu;
            this.number4.num2 = data.nurseNurserLinchuang;
            this.number4.num3 = data.nurseNurseJichu;
            this.number4.num4 = data.nurseNurseLinchuang;
            this.number4.num5 = data.nurseMemberJichu;
            this.number4.num6 = data.nurseMemberLinchuang;
          }
        });
        // ajax获取协议服务项目
      this.$axios({
        method: "get",
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_protocol_conf_mng/load_conf_nursing_protocol_service_by_id?confId=${
          encodeURI(rowData.id)
        }`
      }).then(res => {
        if (res.data.data) {
          // console.log(res.data.data);
          let list = res.data.data;
          let news = "";
          for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list.length - i - 1; j++) {
              if (list[j].serviceType > list[j + 1].serviceType) {
                news = list[j];
                list[j] = list[j + 1];
                list[j + 1] = news;
              }
            }
          }
          if (list != null) {
            let html = "";
            for (var i = 0; i < list.length; i++) {
              html += "<tr name='data_tr'>";
              html += "<td>" + mapServiceType[list[i].serviceType];
              html +=
                "<input name='serviceType' type='hidden' value='" +
                list[i].serviceType +
                "'>";
              html +=
                "<input name='serviceId' type='hidden' value='" +
                list[i].serviceId +
                "'>";
              html +=
                "<input name='servicePrice' type='hidden' value='" +
                list[i].servicePrice +
                "'>";
              html += "</td>";
              html +=
                "<td><input type='checkbox' value='" +
                list[i].id +
                "' name='baseNursingServiceCheckBox'/>";
              html +=
                "" +
                list[i].serviceName +
                "<input name='serviceName' type='hidden' value='" +
                list[i].serviceName +
                "'></td>";
              // html+="<td>"+list[i].serviceName+"</td>"
              html += "<td>";
              html +=
                "<input type='text' name='frequencyUnitLength' style='width:50px;margin-top:1px;disabled'/>";
              // html +=
              //   "<select name='frequencyUnit' style='width:50px;position:relative;top:1px;height:25px!important;'>";
              // html += "<option value='1'>日</option>";
              // html += "<option value='2'>月</option>";
              // html += "</select>";
              html += "日";
              html +=
                "<input type='text' name='frequency' style='width:50px;disabled '/> 次";
              html += "</td>";
              html +=
                "<td><input type='text' name='duration' style='width:50px;'/> 分</td>";
              html +=
                "<td><input type='checkbox' value='1' class='col_1' name='supportAssessLevels'/></td>";
              html +=
                "<td><input type='checkbox' value='2' class='col_2' name='supportAssessLevels'/></td>";
              html +=
                "<td><input type='checkbox' value='3' class='col_3' name='supportAssessLevels'/></td>";
              html +=
                "<td><input type='checkbox' value='4' class='col_4' name='supportAssessLevels'/></td>";
              html +=
                "<td><input type='checkbox' value='5' class='col_5' name='supportAssessLevels'/></td>";
              html +=
                "<td><input type='checkbox' value='6' class='col_6' name='supportAssessLevels'/></td>";
              html +=
                "<td><input type='checkbox' value='1' class='col_1' name='supportNursingLevels'/></td>";
              html +=
                "<td><input type='checkbox' value='2' class='col_2' name='supportNursingLevels'/></td>";
              html += "</tr>";
            }
            // console.log(list);
            $("#base-nursing-service-details").html(html);
          }
          setTimeout(function() {
            for (let m = 0; m < list.length; m++) {
              let object = list[m];
              let $targetTr = $(
                "input[name='serviceId'][value='" + object.serviceId + "']"
              )
                .parent()
                .parent();
              if (object.isChecked == 1) {
                $targetTr
                  .find("input[name='baseNursingServiceCheckBox']")
                  .attr("checked", true);
              }
              if (object.isChecked == 0) {
                $targetTr
                  .find("input[name='baseNursingServiceCheckBox']")
                  .attr("checked", false);
              }
              $targetTr
                .find("input[name='frequencyUnitLength']")
                .val(object.frequencyUnitLength); // 频次长度
              $targetTr.find("input[name='frequency']").val(object.frequency); // 频次
              $targetTr
                .find("select[name='frequencyUnit']")
                .val(object.frequencyUnit); // 频次的单位
              $targetTr.find("input[name='duration']").val(object.duration); // 护理时长
              if (
                object.supportAssessLevels != null &&
                object.supportAssessLevels != ""
              ) {
                let supportAssessLevels_chk_value = object.supportAssessLevels.split(
                  ","
                );
                for (let j = 0; j < supportAssessLevels_chk_value.length; j++) {
                  // 支持的评估等级
                  $targetTr
                    .find(
                      "input[name='supportAssessLevels'][value='" +
                        supportAssessLevels_chk_value[j] +
                        "']"
                    )
                    .attr("checked", true);
                }
              }
              if (
                object.supportNursingLevels != null &&
                object.supportNursingLevels != ""
              ) {
                let supportNursingLevels_chk_value = object.supportNursingLevels.split(
                  ","
                );
                for (
                  let k = 0;
                  k < supportNursingLevels_chk_value.length;
                  k++
                ) {
                  // 支持的评估护理等级
                  $targetTr
                    .find(
                      "input[name='supportNursingLevels'][value='" +
                        supportNursingLevels_chk_value[k] +
                        "']"
                    )
                    .attr("checked", true);
                }
              }
              $targetTr
                .find("input[name='servicePrice']")
                .val(object.servicePrice); // 服务价格
            }
          }, 100);
        }
      });
    },
    //提交表单数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this;
          let nursingCostProportion = {
            insDibaoJichuTongchou: this.number1.num1 + "",
            insDibaoJichuGeren: this.number1.num2 + "",
            insDibaoLinchuangTongchou: this.number1.num3 + "",
            insDibaoLinchuangGeren: this.number1.num4 + "",

            insJujiaJichuTongchou: this.number3.num1 + "",
            insJujiaJichuGeren: this.number3.num2 + "",
            insJujiaLinchuangTongchou: this.number3.num3 + "",
            insJujiaLinchuangGeren: this.number3.num4 + "",

            insYanghuJichuTongchou: this.number3.num5 + "",
            insYanghuJichuGeren: this.number3.num6 + "",
            insYanghuLinchuangTongchou: this.number3.num7 + "",
            insYanghuLinchuangGeren: this.number3.num8 + "",
            insYiliaoJichuGeren: this.number3.num10 + "",
            insYiliaoJichuTongchou: this.number3.num9 + "",
            insYiliaoLinchuangTongchou: this.number3.num11 + "",
            insYiliaoLinchuangGeren: this.number3.num12 + "",

            nurseNurserJichu: this.number4.num1 + "",
            nurseNurserLinchuang: this.number4.num2 + "",
            nurseNurseJichu: this.number4.num3 + "",
            nurseNurseLinchuang: this.number4.num4 + "",
            nurseMemberJichu: this.number4.num5 + "",
            nurseMemberLinchuang: this.number4.num6 + "",
            nursingProtocolId: this.ruleForm.confId
          };
          let areaData = JSON.parse(JSON.stringify(this.items));
          areaData.forEach((item, index) => {
            item.id = null;
            item.regionProvince = item.regionProvince + "-" + item.province;
            item.regionCity = item.regionCity + "-" + item.city;
            item.regionDistrict = item.regionDistrict + "-" + item.district;
            if (item.street) {
              item.regionStreet = item.street.join(",");
            } else {
              item.regionStreet = null;
            }
          });
          let saveData = {
            confId: this.ruleForm.id,
            confName: this.ruleForm.name,
            startDate: this.ruleForm.date1,
            endDate: this.ruleForm.date2
          };
          let d1 = new Date(saveData.startDate).getTime();
          let d2 = new Date(saveData.endDate).getTime();
          if (d2 < d1) {
            this.$message({
              type: "error",
              message: "协议结束日期不能大于协议开始日期！"
            });
            this.ruleForm.date2 = null;
          } else {
            // 判断新增还是修改
            if (this.modelType) {
              this.$axios({
                //保存基本护理协议
                method: "post",
                url: `${this.$store.state.globalRouter}/auth/nursing/${
                  this.module
                }/save`,
                data: saveData
              }).then(res => {
                // console.log(res);//检查是否返回ID
                if (res.data.resultCode == "000000") {
                  this.ruleForm.confId = res.data.data;
                  let resId = res.data.data;
                  // 保存统筹基金比例
                  nursingCostProportion.nursingProtocolId = resId;
                  this.$axios({
                    method: "post",
                    url: `${
                      this.$store.state.globalRouter
                    }/auth/nursing/nursing_service_protocol_conf_mng/submit_conf_nursing_cost_proportion`,
                    data: nursingCostProportion
                  }).then(res => {
                    this.dialogVisible = false;
                    this.getData();
                    if (res.data.resultCode == "000000") {
                      this.$message({ type: "info", message: "添加成功" });
                    }
                  });

                  // 保存协议作用范围
                  areaData.forEach((item, index) => {
                    item.relationObjectId = parseInt(resId);
                  });
                  this.$axios({
                    method: "post",
                    url: `${
                      this.$store.state.globalRouter
                    }/auth/nursing/nursing_service_protocol_conf_mng/submit_intact_responsible_area`,
                    data: areaData
                  }).then(res => {
                    if (res.data.resultCode == "000000") {
                    } else {
                      this.$message({
                        tyepe: "error",
                        message: "服务出错，保存协议作用范围失败"
                      });
                    }
                  });
                  //保存具体护理项目
                  this.saveConfNursingProtocolService();
                } else {
                  this.$message({
                    tyepe: "error",
                    message: "服务出错，保存协议失败"
                  });
                  this.$message(res.data.resultMsg);
                }
              });
            } else {
              // console.log("修改");
              // console.log(this.ruleForm);
              // 保存护理协议基本信息
              this.$axios({
                method: "post",
                url: `${
                  this.$store.state.globalRouter
                }/auth/nursing/nursing_service_protocol_conf_mng/update?id=${
                  encodeURI(this.ruleForm.confId)
                }`,
                data: {
                  confName: this.ruleForm.name
                }
              }).then(res => {
                if (res.data.resultCode == "000000") {
                  this.$message({
                    type: "info",
                    message: "修改成功,等待系统保存具体护理项目"
                  });
                  this.dialogVisible = false;
                  this.getData();
                } else {
                  this.$message({ type: "error", message: "修改协议失败！" });
                }
              });
              // 保存统筹基金比例
              this.$axios({
                method: "post",
                url: `${
                  this.$store.state.globalRouter
                }/auth/nursing/nursing_service_protocol_conf_mng/submit_conf_nursing_cost_proportion`,
                data: nursingCostProportion
              }).then(res => {
                if (res.data.resultCode == "000000") {
                } else {
                  this.$message({
                    type: "error",
                    message: "统筹基金比例修改失败！"
                  });
                }
              });

              // 保存协议作用范围
              areaData.forEach((item, index) => {
                item.relationObjectId = parseInt(this.ruleForm.confId);
              });
              this.$axios({
                method: "post",
                url: `${
                  this.$store.state.globalRouter
                }/auth/nursing/nursing_service_protocol_conf_mng/submit_intact_responsible_area`,
                data: areaData
              }).then(res => {
                if (res.data.resultCode == "000000") {
                } else {
                  this.$message("服务出错，修改地址失败");
                }
              });
              //保存具体护理项目
              this.saveConfNursingProtocolService();
            }
          }
        } else {
          this.$message({ type: "error", message: "填写格式不合法，请检查！" });
          return false;
        }
      });
    },
    // 保存具体服务协议
    saveConfNursingProtocolService() {
      let conditons = [];
      let i = 0;
      let _this = this;
      $("#base-nursing-service-table")
        .find("tr[name='data_tr']")
        .each(function() {
          let confNursingProtocolService = new Object();
          confNursingProtocolService.confId = _this.ruleForm.confId;
          if (
            $(this)
              .find("input[name='baseNursingServiceCheckBox']")
              .prop("checked")
          ) {
            confNursingProtocolService.isChecked = 1;
          } else {
            confNursingProtocolService.isChecked = 0;
          }
          confNursingProtocolService.serviceType = $(this)
            .find("input[name='serviceType']")
            .val();
          confNursingProtocolService.serviceId = $(this)
            .find("input[name='serviceId']")
            .val();
          confNursingProtocolService.serviceName = $(this)
            .find("input[name='serviceName']")
            .val();
          confNursingProtocolService.frequencyUnitLength = $(this)
            .find("input[name='frequencyUnitLength']")
            .val();
          confNursingProtocolService.frequencyUnit = $(this)
            .find("select[name='frequencyUnit']")
            .val();
          confNursingProtocolService.frequency = $(this)
            .find("input[name='frequency']")
            .val();
          confNursingProtocolService.duration = $(this)
            .find("input[name='duration']")
            .val();
          var supportAssessLevels_chk_value = [];
          $(this)
            .find('input[name="supportAssessLevels"]:checked')
            .each(function() {
              supportAssessLevels_chk_value.push($(this).val());
            });
          confNursingProtocolService.supportAssessLevels = supportAssessLevels_chk_value.join(
            ","
          );
          var supportNursingLevels_chk_value = [];
          $(this)
            .find('input[name="supportNursingLevels"]:checked')
            .each(function() {
              supportNursingLevels_chk_value.push($(this).val());
            });
          confNursingProtocolService.supportNursingLevels = supportNursingLevels_chk_value.join(
            ","
          );
          confNursingProtocolService.servicePrice = $(this)
            .find("input[name='servicePrice']")
            .val(); // 服务价格
          conditons.push(confNursingProtocolService);
        });
      // console.log(conditons);
      this.$axios({
        method: "post",
        url: `${
          this.$store.state.globalRouter
        }/auth/nursing/nursing_service_protocol_conf_mng/save_conf_nursing_protocol_service`,
        data: { list: conditons, confId: _this.ruleForm.confId }
      }).then(res => {
        if (res.data.resultCode == "000000") {
          this.$message({ type: "success", message: "护理协议项目保存成功" });
        }
      });
    },
    //删除所负责的区域
    deleteArea(val) {
      this.items.splice(val, 1);
    },
    addArea() {
      this.items.push({
        overallType: "3",
        regionProvince: "",
        regionCity: "",
        regionDistrict: "",
        regionStreet: "",
        province: "北京市",
        city: "",
        district: "",
        street: ""
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchData();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`,this.pageSize);
      this.changePageSize = val;
      this.searchData();
    },
    getReloadData() {
      let startDate = "";
      let endtDate = "";
      if (this.pickDate.length == 2) {
        startDate = this.pickDate[0];
        endtDate = this.pickDate[1];
      }
      this.$axios({
        method: "get",
        url: `${this.$store.state.globalRouter}/auth/nursing/${
          this.module
        }/pagination?confIdLike=${encodeURI(this.searchForm.id)}&confNameLike=${
          encodeURI(this.searchForm.name)
        }&startDateQuery=${encodeURI(startDate)}&endDateQuery=${encodeURI(endtDate)}&pageNo=1&pageSize=${
          this.pageSize[0]
        }`
      }).then(res => {
        if (res.data.resultList) {
          this.total = res.data.totalCount;
          this.currentPage = res.data.curPage;
          this.dataList(res.data.resultList);
        } else {
          this.lists = [];
        }
      });
    }
  },
  watch: {
    nursing_service_allchecked: function() {
      // console.log($("#base-nursing-service-table").find("input[name='baseNursingServiceCheckBox']"));
      let _this = this;
      $("#base-nursing-service-table")
        .find("input[name='baseNursingServiceCheckBoxCheckAll']")
        .change(function() {
          // console.log($(this).prop("checked"));
          if ($(this).prop("checked")) {
            $("#base-nursing-service-table")
              .find("input[name='baseNursingServiceCheckBox']")
              .prop("checked", true);
            _this.nursing_service_allchecked = 0;
          } else {
            $("#base-nursing-service-table")
              .find("input[name='baseNursingServiceCheckBox']")
              .prop("checked", false);
            _this.nursing_service_allchecked = 1;
          }
        });
    },
    assess_levels_allchecked: function() {
      let _this = this;
      $("#base-nursing-service-table")
        .find("input[name='supportAssessLevelsCheckAll']")
        .change(function() {
          // console.log($(this).prop("checked"));
          if ($(this).prop("checked")) {
            $("#base-nursing-service-table")
              .find(
                "input[name='supportAssessLevels'][class='" +
                  $(this).attr("class") +
                  "']"
              )
              .prop("checked", true);
            _this.assess_levels_allchecked = 0;
          } else {
            $("#base-nursing-service-table")
              .find(
                "input[name='supportAssessLevels'][class='" +
                  $(this).attr("class") +
                  "']"
              )
              .prop("checked", false);
            _this.assess_levels_allchecked = 1;
          }
        });
    },
    nursing_levels_allchecked: function() {
      let _this = this;
      $("#base-nursing-service-table")
        .find("input[name='supportNursingLevelsCheckAll']")
        .change(function() {
          // console.log($(this).prop("checked"));
          if ($(this).prop("checked")) {
            $("#base-nursing-service-table")
              .find(
                "input[name='supportNursingLevels'][class='" +
                  $(this).attr("class") +
                  "']"
              )
              .prop("checked", true);
            _this.nursing_levels_allchecked = 0;
          } else {
            $("#base-nursing-service-table")
              .find(
                "input[name='supportNursingLevels'][class='" +
                  $(this).attr("class") +
                  "']"
              )
              .prop("checked", false);
            _this.nursing_levels_allchecked = 1;
          }
        });
    }
  },
  mounted() {
    this.getData();
    // 增删改审的权限判断
    // 权限按钮的查找
    // console.log('菜单',JSON.parse(window.localStorage.getItem('router')));
    var menu = JSON.parse(window.localStorage.getItem("router"));
    if (menu && menu.length > 0) {
      for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == "协议配置管理") {
          var submenu = menu[i].children;
          for (let j = 0; j < submenu.length; j++) {
            if (submenu[j].component == "core/nursing_service") {
              // console.log("护理协议配置", submenu[j]);
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
.el-container {
  background: lightgoldenrodyellow;
}
.demo-ruleForm {
  flex: 0;
  width: 100%;
  text-align: left;
}
/* .el-form-item {
  border-bottom: 1px solid #eeeeee;
} */
.el-dialog__body {
  position: relative;
}
</style>
<style>
#nursingService .el-collapse-item__arrow {
  margin: 0;
}
</style>

