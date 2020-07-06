<template>
  <div>
    <el-button
      @click="dialogVisible = true"
      v-if="draggable"
      size='small'
      v-show="IsPlanorder"
    >新增</el-button>
    <el-button
      v-if="draggable"
      @click="deleteRow"
      size='small'
      v-show="IsPlanorder"
    >刪除</el-button>
    <el-button
      @click="timeMinus"
      size='small'
    >-</el-button>
    <span>
      {{ toDate(from_time) }} ~ {{ toDate(end_time) }}
    </span>
    <el-button
      @click="timeAdd"
      size='small'
    >+</el-button>
    <el-button
      @click="updatePlan"
      size='small'
      v-show="IsPlanorder"
    >儲存更動</el-button>
    <el-button
      @click="exportdialogVisble = true"
      size='small'
    >匯出資料</el-button>
    <el-button
      v-if="false"
      @click="test"
      size='small'
    >test</el-button>

    <el-table
      :data="tableData"
      v-show="holding & table_show"
      style="width: 100%"
    >
      <el-table-column
        label="縮小"
        width="70"
        align="center">
        <el-button
         @click="close_table"
         size='small'
        >▲</el-button>
      </el-table-column>
       <el-table-column
        prop="work_list"
        label="工單號"
        width="100"
        align="center"
        v-if="!IsPlanorder">
      </el-table-column>
      <el-table-column
        prop="label"
        label="料號"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="plan_number"
        label="生產數量"
        width="100"
        align="center"
        v-if="IsPlanorder">
      </el-table-column>
      <el-table-column
        prop="work_list_number"
        label="工單數量"
        width="100"
        align="center"
        v-if="!IsPlanorder">
      </el-table-column>
      <el-table-column
        prop="product_name"
        label="品名"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="machine_ton"
        label="噸位"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="rowId"
        label="機台號"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        label="預計起始"
        width="100"
        align="center">
        {{timeToString(selected_order.starttime)}}
      </el-table-column>
      <el-table-column
        label="預計結束"
        width="100"
        align="center">
        {{timeToString(selected_order.endtime)}}
      </el-table-column>
      <el-table-column
        label="生產時間"
        width="100"
        align="center"
        v-if="IsPlanorder">
        {{selected_order.productiontime.label}}
      </el-table-column>
      <el-table-column
        prop="plastic_color"
        label="塑料顏色"
        width="100"
        align="center"
        v-if="IsPlanorder">
      </el-table-column>
      <el-table-column
        prop="plastic_Part_NO"
        label="塑膠粒料號"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mold_NO"
        label="模號"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mold_Serial"
        label="模序"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mold_position"
        label="模具儲位"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="machine_CT"
        label="C.T."
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="UPH"
        label="UPH"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="emergency"
        label="緊急程度"
        width="100"
        align="center"
        v-if="IsPlanorder">
        <!-- <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.emergency" type="number">
          <span slot="content">{{row.emergency}}</span>
        </editable-cell> -->
      </el-table-column>
      <el-table-column
        prop="note"
        label="備註"
        width="100"
        align="center"
        v-if="IsPlanorder">
        <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.note" :maxlength="800">
          <span slot="content">{{row.note}}</span>
        </editable-cell>
      </el-table-column>
      <el-table-column
        abel="操作"
        align="center"
        fixed="right"
        width="180">
       <template slot-scope="{row, index}">
        <el-button
          v-show="!row.editMode"
          @click="setEditMode(row, index)"
          icon="el-icon-edit"
          size="mini">
        </el-button>
        <el-button
          v-show="row.editMode"
          @click="saveRow(row, index)"
          icon="el-icon-check"
          type="success"
          size="mini">
        </el-button>
        <el-button
          v-show="row.editMode"
          @click="cancelEditMode(row, index)"
          icon="el-icon-close"
          type="info"
          size="mini">
        </el-button>
       </template>
      </el-table-column>
    </el-table>

    <el-table :data="tableData_after" style="width: 100%" v-show="!holding & table_show">
      <el-table-column
        label="縮小"
        width="70"
        align="center">
        <el-button
          @click="close_table"
          size='small'
        >▲</el-button>
      </el-table-column>
       <el-table-column
        prop="work_list"
        label="工單號"
        width="100"
        align="center"
        v-if="!IsPlanorder">
      </el-table-column>
      <el-table-column
        prop="label"
        label="料號"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="plan_number"
        label="生產數量"
        width="100"
        align="center"
        v-if="IsPlanorder">
      </el-table-column>
      <el-table-column
        prop="work_list_number"
        label="工單數量"
        width="100"
        align="center"
        v-if="!IsPlanorder">
      </el-table-column>
      <el-table-column
        prop="product_name"
        label="品名"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="machine_ton"
        label="噸位"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="rowId"
        label="機台號"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        label="預計起始"
        width="100"
        align="center">
        {{timeToString(selected_order.starttime)}}
      </el-table-column>
      <el-table-column
        label="預計結束"
        width="100"
        align="center">
        {{timeToString(selected_order.endtime)}}
      </el-table-column>
      <el-table-column
        label="生產時間"
        width="100"
        align="center"
        v-if="IsPlanorder">
        {{selected_order.productiontime.label}}
      </el-table-column>
      <el-table-column
        prop="plastic_color"
        label="塑料顏色"
        width="100"
        align="center"
        v-if="IsPlanorder">
      </el-table-column>
      <el-table-column
        prop="plastic_Part_NO"
        label="塑膠粒料號"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mold_NO"
        label="模號"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mold_Serial"
        label="模序"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mold_position"
        label="模具儲位"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="machine_CT"
        label="C.T."
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="UPH"
        label="UPH"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="emergency"
        label="緊急程度"
        width="100"
        align="center"
        v-if="IsPlanorder">
        <!-- <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.emergency" type="number">
          <span slot="content">{{row.emergency}}</span>
        </editable-cell> -->
      </el-table-column>
      <el-table-column
        prop="note"
        label="備註"
        width="100"
        align="center"
        v-if="IsPlanorder"
        >
        <editable-cell :show-input="row.editMode" slot-scope="{row}" v-model="row.note" :maxlength="800">
          <span slot="content">{{row.note}}</span>
        </editable-cell>
      </el-table-column>
      <el-table-column
        abel="操作"
        align="center"
        fixed="right"
        width="180">
       <template slot-scope="{row, index}">
        <el-button
          v-show="!row.editMode"
          @click="setEditMode(row, index)"
          icon="el-icon-edit"
          size="mini">
        </el-button>
        <el-button
          v-show="row.editMode"
          @click="saveRow(row, index)"
          icon="el-icon-check"
          type="success"
          size="mini">
        </el-button>
        <el-button
          v-show="row.editMode"
          @click="cancelEditMode(row, index)"
          icon="el-icon-close"
          type="info"
          size="mini">
        </el-button>
       </template>
      </el-table-column>
    </el-table>
    <div id="gantt_app">
      <GSTC
        :config="config"
        id="gantt"
      />
    </div>

    <el-dialog
      title="新增工單計畫"
      :visible.sync="dialogVisible"
      width="85%"
      align="center"
    >
      <div>
        <table>
          <thead>
            <tr>
              <th style="width:10%"></th>
              <th style="width:20%"></th>
              <th style="width:10%"></th>
              <th style="width:20%"></th>
              <th style="width:10%"></th>
              <th style="width:20%"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>料號</td>
              <td>
                <el-select
                  v-model="new_order.Part_NO"
                  @input="pickPartNo"
                  filterable
                  clearable
                  placeholder="請選擇料號"
                  style="width:250px">
                  <el-option
                    v-for="item in week_plans"
                    :key="item.id"
                    :label="item.Part_NO"
                    :value="item">
                  </el-option>
                </el-select>
              </td>
              <td>品名</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.product_name"
                  readonly
                  placeholder="選擇料號自動帶出">
                </el-input>
              </td>
              <td>塑膠粒料號</td>
              <td style="padding:5px 15px">
                <el-input
                v-model="new_order.plastic_Part_NO"
                type="textarea"
                readonly
                placeholder="選擇料號自動帶出">
                </el-input>
              </td>
            </tr>
            <tr>
              <td>剩餘總數</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.remaining_number"
                  readonly
                  placeholder="選擇料號自動帶出">
                </el-input>
              </td>
              <td>噸位需求</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.machine_ton"
                  readonly=""
                  placeholder="選擇料號自動帶出">
                </el-input>
              </td>
              <td>塑膠粒顏色</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.plastic_color"
                  readonly
                  placeholder="選擇料號自動帶出">
                </el-input>
              </td>
            </tr>
            <tr>
              <td>機台</td>
              <td>
                <el-select
                  v-model="new_order.machine_NO"
                  @input="pickMcahineNo"
                  filterable
                  clearable
                  placeholder="先選擇料號"
                  style="width:250px">
                  <el-option
                    v-for="item in new_order.machine_options"
                    :key="item.id"
                    :label="item.label"
                    :value="item">
                  </el-option>
                </el-select>
              </td>
              <td>模具</td>
              <td>
                <el-select
                  v-model="new_order.mold_NO"
                  @input="pickMoldNo"
                  filterable
                  clearable
                  placeholder="先選擇料號"
                  style="width:250px">
                  <el-option
                    v-for="item in new_order.mold_options"
                    :key="item.id"
                    :label="item.mold_NO"
                    :value="item">
                  </el-option>
                </el-select>
              </td>
              <td>模序</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.mold_Serial"
                  readonly
                  placeholder="選擇模具自動帶出">
                </el-input>
                </td>
            </tr>
            <tr>
              <td>穴數</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.mold_hole"
                  @change="resetUPH"
                  type="number"
                  min="1"
                  placeholder="選擇模具自動帶出">
                </el-input>
              </td>
              <td>CT</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.cycle_time"
                  @change="resetUPH"
                  type="number"
                  min="1"
                  placeholder="選擇模具自動帶出">
                </el-input>
              </td>
              <td>UPH</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.UPH"
                  readonly
                  placeholder="選擇模具自動帶出">
                </el-input>
              </td>
            </tr>
            <tr>
              <td>位置</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.mold_position"
                  readonly placeholder="選擇模具自動帶出">
                </el-input>
              </td>
              <td>換模時間</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.mold_changeover_time"
                  readonly
                  placeholder="選擇模具自動帶出">
                </el-input></td>
              <td>模具狀態</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.mold_state"
                  readonly
                  placeholder="選擇模具自動帶出">
                </el-input>
              </td>
            </tr>
            <tr>
              <td>包規</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.package_size"
                  maxlength="2"
                  placeholder="請輸入包規">
                </el-input>
              </td>
              <td>共模料號</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.same_mold_part_NO"
                  maxlength="30"
                  placeholder="請輸入共模料號">
                </el-input>
              </td>
              <td>緊急程度</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.emergency"
                  type="number"
                  placeholder="請輸入緊急程度">
                </el-input>
              </td>
            </tr>
            <tr>
              <td>是否需要特殊工料</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.need"
                  maxlength="1"
                  placeholder="請輸入是否需要特殊工料">
                </el-input>
              </td>
              <td>是否量產</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.mass_pro"
                  maxlength="1"
                  placeholder="請輸入是否量產">
                </el-input>
              </td>
              <td >備註</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.note"
                  maxlength="800"
                  placeholder="請輸入備註">
                </el-input>
              </td>
            </tr>
            <tr>
              <td>本次生產數量</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.plan_number"
                  @input="caculate_exetime"
                  type="number"
                  min="0"
                  :max="new_order.remaining_number">
                </el-input>
              </td>
              <td>生產耗時</td>
              <td style="padding:5px 15px">
                <el-input
                  v-model="new_order.productiontime.label">
                </el-input>
              </td>
            </tr>
            <tr>
              <td>起始時間</td>
              <td>
                <el-date-picker
                  v-model="new_order.starttime.date"
                  type="date"
                  style="width:250px"
                  placeholder="選擇起始日期">
                </el-date-picker>
              </td>
              <td>結束時間</td>
              <td>
                <el-date-picker
                  v-model="new_order.endtime.date"
                  type="date"
                  style="width:250px"
                  placeholder="選擇結束日期">
                </el-date-picker>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <el-button
                  @click="getEndtime"
                  style="padding:10px 5px"
                  type="success">
                  推算結束時間</el-button>
              </td>
              <td>
                <el-time-picker
                  v-model="new_order.starttime.time"
                  placeholder="HH:mm:ss"
                  value-format="HH:mm:ss"
                  style="width:250px">
                </el-time-picker>
              </td>
              <td>
                <el-button
                  @click="getExeNumber"
                  style="padding:10px 5px"
                  type="success">
                  推算生產數量</el-button>
              </td>
              <td>
                <el-time-picker
                v-model="new_order.endtime.time"
                placeholder="HH:mm:ss"
                value-format="HH:mm:ss"
                style="width:250px">
                </el-time-picker>
              </td>
              <td></td>
              <td style="text-align: center;">
                <el-button @click="clearTable">
                  清 除</el-button>
                <el-button @click="dialogVisible = false">
                  取 消</el-button>
                <el-button type="primary" @click="addRow">
                  确 定</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>

     <el-dialog
      title="匯出計畫預覽"
      :visible.sync="exportdialogVisble"
      width="50%"
      align="center"
    >
      <div style="height:150px">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>起始時間</td>
              <td>
                <el-date-picker
                  v-model="export_starttime.date"
                  type="date"
                  placeholder="選擇起始日期">
                </el-date-picker>
              </td>
              <td>
                <el-time-picker
                  v-model="export_starttime.time"
                  placeholder="選擇起始時間"
                  value-format="HH:mm:ss">
                </el-time-picker>
              </td>
              <td><el-button @click="export_plan('range')" type="primary" >指定範圍匯出</el-button></td>
            </tr>
            <tr style="background:#000">
              <td>結束時間</td>
              <td>
                <el-date-picker
                  v-model="export_endtime.date"
                  type="date"
                  placeholder="選擇結束日期">
                </el-date-picker>
              </td>
              <td>
                <el-time-picker
                  v-model="export_endtime.time"
                  placeholder="選擇結束時間"
                  value-format="HH:mm:ss">
                </el-time-picker>
              </td>
              <td>
                <el-button
                @click="export_plan('all')"
                type="success">
                不限日期匯出</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import GSTC from "vue-gantt-schedule-timeline-calendar"
import Gantt from "gantt-schedule-timeline-calendar"
import ItemMovement from "gantt-schedule-timeline-calendar/dist/ItemMovement.plugin.js"
import ItemHold from 'gantt-schedule-timeline-calendar/dist/ItemHold.plugin.js'
import { isNull } from 'util'
import { PlanOrder,WorkOrder,PartNoInfo,WeeksPlan,MachineData} from '../api.js'
import EditableCell from "./EditableCell.vue";

let subs = [];
/* eslint-disable */

const Order_template = { //工單
  id:'',
  Part_NO:'',              // 料號
  UPH:'',                  // UPH
  machine_CT:'',           // 生產週期
  machine_NO:'',           // 機台號
  machine_ton:'',          // 機台噸位
  mass_pro:'',             // 是否量產
  mold_NO:'',              // 模號
  mold_Serial:'',          // 模序
  mold_changeover_time:'', // 機台換模時間
  mold_down_t:'',          // 預計下模時間
  mold_edit:'',            // 版次
  mold_position:'',        // 模具儲位
  machine:'',              // 機台資訊
  need:'',                 // 是否需要特殊工料
  note:'',                 // 備註
  package_size:'',         // 包規
  plan_work_time:'',       // 工時
  productiontime:{        // 生產時間
    label :'0 d 0 h 0 m', min : 0, hour : 0, day : 0
  },
  starttime: {             // 工單起始時間
    date:null,
    time:'19:30:00'
  },
  endtime:{                // 工單結束時間
    date:null,
    time:'19:30:00'
  },
  plan_number:0,           // 數量
  plastic_Part_NO:'',      // 塑膠料號
  plastic_color:'',        // 塑膠料號顏色
  product_name:'',         // 品名
  same_mold_part_NO:'',    // 共模料號
  value:0,                // 單價
  total_value:0,          // 總產值
  emergency:0,            // 緊急程度
  Seq:'',
  remaining_number:0,      // 周計畫剩餘數量
  cycle_time:'',
  mold_state:'',           // 模具狀態
  mold_hole:'',            // 模穴 (可修改)
  mold_max_hole:'',        // 模穴 (最大值)
  // machine_state:'',        // 機台狀態
  // machine_repair_time:'',  // 機台修復時間
  mold_options:[],          // 模具選項
  machine_options:[],       // 機台選項
  machine_selected_data:''
}
const New_Order_template = { //工單
  id:'',
  Part_NO:'',              // 料號
  UPH:'',                  // UPH
  machine_CT:'',           // 生產週期
  machine_NO:'',           // 機台號
  machine_ton:'',          // 機台噸位
  mass_pro:'',             // 是否量產
  mold_NO:'',              // 模號
  mold_Serial:'',          // 模序
  mold_changeover_time:'', // 機台換模時間
  mold_down_t:'',          // 預計下模時間
  mold_edit:'',            // 版次
  mold_position:'',        // 模具儲位
  machine:'',              // 機台資訊
  need:'',                 // 是否需要特殊工料
  note:'',                 // 備註
  package_size:'',         // 包規
  plan_work_time:'',       // 工時
  productiontime:{        // 生產時間
    label :'0 d 0 h 0 m', min : 0, hour : 0, day : 0
  },
  starttime: {             // 工單起始時間
    date:null,
    time:'19:30:00'
  },
  endtime:{                // 工單結束時間
    date:null,
    time:'19:30:00'
  },
  plan_number:0,           // 數量
  plastic_Part_NO:'',      // 塑膠料號
  plastic_color:'',        // 塑膠料號顏色
  product_name:'',         // 品名
  same_mold_part_NO:'',    // 共模料號
  value:0,                // 單價
  total_value:0,          // 總產值
  emergency:0,            // 緊急程度
  Seq:'',
  remaining_number:0,      // 周計畫剩餘數量
  cycle_time:'',
  mold_state:'',           // 模具狀態
  mold_hole:'',            // 模穴 (可修改)
  mold_max_hole:'',        // 模穴 (最大值)
  // machine_state:'',        // 機台狀態
  // machine_repair_time:'',  // 機台修復時間
  mold_options:[],          // 模具選項
  machine_options:[],       // 機台選項
  machine_selected_data:''
}

let item_style= { 'background': 'grey', 'text-align': 'center' }

export default {
  name: "app",
  components: {
    GSTC,
    EditableCell
  },
  data() {
    return {
      columns: { //Gantt columns 設定
        data: {
          label: {
            id: "label",
            data: "label",
            width: 120,
            header: { content: "機台" },
          }
        }
      },
      chart_items: { //Gantt chart 內容
        "1": {
          id: "1",
          rowId: '1',
          label: "654323234",
          time: {
            start: new Date().getTime(),
            end: new Date().getTime() + 14 * 60 * 60 * 1000
          },
          style: item_style
        }
      },
      lineInfo:{}, //機台線體
      selected_order: Order_template,
      new_order: New_Order_template,
      lastId:0, //last id of created order
      from_time: new Date().getTime() - 24 * 60 * 60 * 1000,
      end_time: new Date().getTime() + 24 * 60 * 60 * 1000,
      dialogVisible: false,
      exportdialogVisble:false,
      holding: false,
      table_show : false,
      week_plans:[],           //週計畫料號資訊
      machine_data:[],         //機台資訊
      searchTon: 'All',
      searchLine : 'All',
      export_starttime: {      // 匯出工單起始時間
        date:null,
        time:'19:30:00'
      },
      export_endtime: {      // 匯出工單起始時間
        date:null,
        time:'19:30:00'
      },
      tableData:[],
      tableData_after:[],
      temptableData:'',
      resetvalue:false,
      pageSize: 10,
      currentPage: 1,
      IsPlanorder : true, //false => work order
    };
  },
  props:{
    draggable: { type: Boolean, default: false},
    line : { type: String , default: 'All'},
    site : { type: String , default: 'All'},
    ton : { type: String , default: 'All'},
    dataType : { type: String },
  },
  watch:{
    ton:function(){
      this.searchTon = this.ton
    },
    line:function(){
      this.searchTon = 'All'
      this.searchLine = this.line
    },
    site:function(){
      this.searchTon = 'All'
      this.searchLine = 'All'
    },
  },
  computed: {
    rows: function() {
      let allLine = ['A','B','C','D','E','F','G']
      if (this.searchLine =='All'){
        let new_row={}
        let restline = []
        if(this.site == 'D9 - 1F')
          restline = ['E','F','G']
        else
          restline = ['A','B','C','D']
        if(Object.keys(this.lineInfo).length>0){
          for(let i=0;i<Object.keys(allLine).length;i++){
            for(let j=0;j<this.lineInfo[allLine[i]].length;j++){
              let tempLineInfo = this.lineInfo[allLine[i]][j]
              if(restline.includes(allLine[i])){ //該樓 所有線體
                if(this.searchTon=='All'){ // Ton = All
                  new_row[tempLineInfo.machine_NO] = {
                    id:tempLineInfo.machine_NO,
                    label:tempLineInfo.machine_NO + '  '+ tempLineInfo.machine_ton + 'T  '+ tempLineInfo.product_color,
                    parentId:undefined
                  }
                }else{
                  if (parseInt(this.searchTon)==tempLineInfo.machine_ton){
                    new_row[tempLineInfo.machine_NO] = {
                      id:tempLineInfo.machine_NO,
                      label:tempLineInfo.machine_NO + '  '+ tempLineInfo.machine_ton + 'T  '+ tempLineInfo.product_color,
                      parentId:undefined
                    }
                  }else{
                    new_row[tempLineInfo.machine_NO] = {
                      id:tempLineInfo.machine_NO,
                      label:tempLineInfo.machine_NO + '  '+ tempLineInfo.machine_ton + 'T  '+ tempLineInfo.product_color,
                      parentId:0
                    }
                  }
                }
              }else{
                new_row[tempLineInfo.machine_NO] = {
                  id:tempLineInfo.machine_NO,
                  label:tempLineInfo.machine_NO + '  '+ tempLineInfo.machine_ton + 'T  '+ tempLineInfo.product_color,
                  parentId:0
                }
              }
            }
          }
        }else
          new_row['A01'] = {id:'A01',label:'請稍後'}
        return new_row
      }
      else{
        let new_row = {}
        if(Object.keys(this.lineInfo).length>0){
          for(let i=0;i<Object.keys(allLine).length;i++){
            for(let j=0;j<this.lineInfo[allLine[i]].length;j++){
              let tempLineInfo = this.lineInfo[allLine[i]][j]
              if(allLine[i]==this.searchLine.charAt(0)){ //選擇的線
                if(this.searchTon=='All'){ // Ton = All
                  new_row[tempLineInfo.machine_NO] = {
                    id:tempLineInfo.machine_NO,
                    label:tempLineInfo.machine_NO + '  '+ tempLineInfo.machine_ton + 'T  '+ tempLineInfo.product_color,
                    parentId:undefined
                  }
                }else{ //Ton != All
                  if (parseInt(this.searchTon)==tempLineInfo.machine_ton){
                    new_row[tempLineInfo.machine_NO] = {
                      id:tempLineInfo.machine_NO,
                      label:tempLineInfo.machine_NO + '  '+ tempLineInfo.machine_ton + 'T  '+ tempLineInfo.product_color,
                      parentId:undefined
                    }
                  }else{
                    new_row[tempLineInfo.machine_NO] = {
                      id:tempLineInfo.machine_NO,
                      label:tempLineInfo.machine_NO + '  '+ tempLineInfo.machine_ton + 'T  '+ tempLineInfo.product_color,
                      parentId:0
                    }
                  }
                }
              }else{ //其他的線 隱藏
                new_row[tempLineInfo.machine_NO] = {
                  id:tempLineInfo.machine_NO,
                  label:tempLineInfo.machine_NO + '  '+ tempLineInfo.machine_ton + 'T  '+ tempLineInfo.product_color,
                  parentId:0
                }
              }
            }
          }
        }else
          new_row['A01'] = {id:'A01',label:'請稍後'}

        return new_row
      }
    },// row function

    config: function() {
      return {
        plugins: [
          ItemMovement({
            // snap item start time to start of the day
            snapStart(time, diff, item) {
              return Gantt.api
                .date(time)
                .add(diff, 'milliseconds')
                .startOf('hour')
                .valueOf()
            },
            // snap item end time to end of the day
            snapEnd(time, diff, item) {
              return Gantt.api
                .date(time)
                .add(diff, 'milliseconds')
                .endOf('hour')
                .valueOf()
            },
            moveable: this.draggable,
            ghostNode: this.draggable,
            resizable: false,
            collisionDetection: true
          }),
          ItemHold({
            time: 10,
            action: (element, item) => {
              // console.log('click')
              this.holding = true
<<<<<<< HEAD
              this.selected_order.id = item.id ;
              this.selected_order.label = item.label ;
              this.selected_order.rowId = item.rowId ;
              this.selected_order.product_name = item.product_name ;
              this.selected_order.plan_number = item.plan_number ;
              this.selected_order.plastic_color = item.plastic_color ;
              this.selected_order.machine_ton = item.machine_ton;
              this.selected_order.machine_NO = item.machine_NO;
              this.selected_order.mold_NO = item.mold_NO;
              this.selected_order.mold_Serial = item.mold_Serial;
              this.selected_order.UPH = item.UPH;
              this.selected_order.mold_position = item.mold_position;
              this.selected_order.plan_work_time = item.plan_work_time
              this.selected_order.plan_s_time = item.time.start
              this.selected_order.plan_e_time = item.time.end
              // }

              document.onmouseup = () => {
                // console.log(item)
                this.holding = false
                this.selected_order_after.id = item.id ;
                this.selected_order_after.label = item.label ;
                this.selected_order_after.rowId = item.rowId ;
                this.selected_order_after.product_name = item.product_name ;
                this.selected_order_after.plan_number = item.plan_number ;
                this.selected_order_after.plastic_color = item.plastic_color ;
                this.selected_order_after.machine_ton = item.machine_ton;
                this.selected_order_after.machine_NO = item.machine_NO;
                this.selected_order_after.mold_NO = item.mold_NO;
                this.selected_order_after.mold_Serial = item.mold_Serial;
                this.selected_order_after.UPH = item.UPH;
                this.selected_order_after.mold_position = item.mold_position;
                this.selected_order_after.plan_work_time = item.plan_work_time
                this.selected_order_after.plan_s_time = item.time.start
                this.selected_order_after.plan_e_time = item.time.end
              }
              // this.selected_order.id = item.id ;
              // this.selected_order.part_no = item.label ;
              // this.selected_order.product_name = item.product_name ;
              // this.selected_order.plan_number = item.plan_number ;
              // this.selected_order.plastic_color = item.plastic_color ;
              // this.selected_order.machine = item.rowId ;
=======
              this.table_show = true
              this.selected_order.Part_NO = item.label
              this.selected_order.machine_NO = item.rowId
              // this.selected_order.mold_hole = item.mold_hole
              let assignlist = ['id','machine_CT','machine_ton','mass_pro','mold_NO','mold_Serial','UPH',
                                'mold_changeover_time','mold_down_t','mold_edit','mold_position',
                                'need','note','package_size','plan_number','plan_work_time','plastic_color',
                                'plastic_Part_NO','product_name','total_value','value','emergency','Seq',
                                'work_list','work_list_number','pirce','information','good_NO','NG_NO','adj_NO',
                                'person_in_charge']
              this.valueAssign(assignlist,this.selected_order,item)
              //標準時間 轉換成 yyyy-mm-dd
              this.NewDateToObject(new Date(item.time.start),this.selected_order.starttime)
              this.NewDateToObject(new Date(item.time.end),this.selected_order.endtime)
              let mins = Math.round(((item.time.end - item.time.start)/1000)/60)
              this.setProductionTime(mins,this.selected_order.productiontime)
>>>>>>> master

              //TableData
              let selectedData = item
              selectedData['editMode']= false
              this.tableData = [selectedData]

              document.onmouseup = () => {
                if(this.table_show){
                  // console.log('up')
                  this.holding = false
                  this.table_show = true

                  if(this.tableData[0].id==item.id)
                    item = this.tableData[0]

                  let selectedData = item
                  selectedData['editMode']= this.tableData[0].editMode
                  this.tableData_after = [selectedData]
                }
                this.update_chartitem(item)
              }
            }
          })
        ],
        height: 700,
        list: {
          rows: this.rows,
          columns: this.columns,
          toggle: { display: true },
        },
        chart: {
          items: this.chart_items,
          time: {
            from: this.from_time,
            to: this.end_time,
            period: 'hour',
            maxWidth: {}
          },
        },
        components: {}
      }
    }, //config function
  },
  methods: {

    onState(state) {
      this.state = state
      // console.log(state)
      subs.push(
        state.subscribe("config.chart.items.1", item => {
          // console.log("item 1 changed", item);
        })
      );
      subs.push(
        state.subscribe("config.list.rows.1", row => {
          console.log("row 1 changed", row)
        })
      );
      subs.push(
        // state.subscribe("config.plugin.Selection", item => {
        //   if (!item || !item.item) return;
        //   console.log("ItemMovement", item);
        // })
      );
      // state.subscribe("config.plugin.ItemMovement", item => {
      //   // console.log(state)
      //     if (!item || !item.item) return;
      //     let move = item.movement
      //     if (move) {
      //       // console.log(move)
      //       if (move.moving && move.waiting) console.log('Start Moving',item.item)
      //       else if (!move.moving && !move.waiting) console.log('Stop moving')
      //     }
      //     // console.log("ItemMovement", item.movement);
      //   })
    },
<<<<<<< HEAD
    click() {
      // console.log(arguments)
    },
    addRow(){
      // this.dialogVisible = true
      this.$set(this.chart_items,this.new_row.id,{
        id: this.new_row.id,
        label: this.new_row.label,
        rowId: this.new_row.rowId,
        time: {
          start: new Date(this.new_row.time.start).getTime(),
          end: new Date(this.new_row.time.end).getTime() + 24 * 60 * 60 * 1000
        },
        style: item_style
      })
      // this.chart_items[this.new_row.id] = {
      //   id: this.new_row.id,
      //   label: this.new_row.label,
      //   rowId: this.new_row.rowId,
      //   time: {
      //     start: new Date(this.new_row.time.start).getTime(),
      //     end: new Date(this.new_row.time.end).getTime() + 24 * 60 * 60 * 1000
      //   }
      // }
      // this.$forceUpdate()
      this.dialogVisible = false
      console.log(this.chart_items)
    },
    deleteRow() {
      console.log(this.chart_items[this.selected_order.id])
      delete this.chart_items[this.selected_order.id]
      this.$set(this.chart_items,this.selected_order.id,{})
    },
    dataToGantt() {
      // console.log(this.line[0])
      // id:'',
      // machine_ton:'',          // 噸位
      // machine_NO:'',           // 機台號
      // mold_NO:'',              // 模號
      // mold_Serial:'',          // 模序
      // mold_hole:'',            // 模穴
      // UPH:'',                  // UPH
      // mold_position:'',        // 模具儲位
      // product_name:'',         // 品名
      // plan_number:0,           // 數量
      // plastic_Part_NO:'',      // 塑膠料號
      // plastic_color:'',        // 顏色
      // machine_state:'',
      // machine_repair_time:'',
      // plan_work_time: '',       // 計畫工時
      // plan_s_time: '',
      // plan_e_time: '',
      // mold_down_t: '',
      planPreview(undefined,this.line[0]).then((response)=>{
        let data = response.data.data
        for (let i=0;i<data.length;i++) {
          // console.log(data[i])
          this.$set(this.chart_items,i,{
            id: i,
            label: data[i].Part_NO,
            rowId: data[i].machine_NO,
            machine_ton: data[i].machine_ton,
            mold_NO: data[i].mold_NO,
            mold_Serial: data[i].mold_Serial,
            UPH: data[i].UPH,
            mold_position: data[i].mold_position,
            product_name: data[i].product_name,
            plan_number: data[i].plan_number,
            plastic_Part_NO: data[i].plastic_Part_NO,
            plastic_color: data[i].plastic_color,
            plan_work_time: data[i].plan_work_time,
            mold_down_t: data[i].mold_down_t,
            time: {
              start: new Date(data[i].plan_s_time).getTime(),
              end: new Date(data[i].plan_e_time).getTime()
            },
            style: item_style
=======
    dataToGantt(type){ //arrangement_result data
      if(type=='workorder'){
        WorkOrder('All','All','All').then((response)=>{
          let that = this
          let order_no = 0
          this.from_time = new Date(response.data.date).getTime() + 8 * 60 * 60 * 1000
          this.end_time = new Date(response.data.date).getTime() + 56 * 60 * 60 * 1000
          for (let j=0;j<response.data.data.length;j++){
            let data = response.data.data[j]
            order_no++
            let varList = ['UPH','machine_CT','machine_ton','mass_pro','mold_NO','mold_Serial',
                            'mold_changeover_time','mold_down_t','mold_position','need','note',
                            'package_size','mold_edit','plan_number','plan_work_time','plastic_Part_NO',
                            'plastic_color','product_name','same_mold_part_NO','total_value','value',
                            'emergency','Seq',
                            'work_list','work_list_number','pirce','information','good_NO','NG_NO','adj_NO',
                            'person_in_charge']
            let new_dict = this.dictMapping(varList,data)
            new_dict['id'] = order_no
            new_dict['label'] = data.Part_NO
            new_dict['rowId'] = data.machine_NO
            new_dict['time'] = {
              start: new Date(data.plan_s_time).getTime(),
              end: new Date(data.plan_e_time).getTime(),
              realstart: new Date(data.real_s_time).getTime(),
              realend: new Date(data.real_e_time).getTime()
            }
            new_dict['style'] = item_style
            new_dict['progress'] = 50
            new_dict['changed'] = 0
            this.$set(this.chart_items,order_no,new_dict)
          }
          that.lastId = order_no
        })
      }
      else{
        PlanOrder('All','All','All').then((response)=>{
          let that = this
          let order_no = 0
          this.from_time = new Date(response.data.date).getTime() + 8 * 60 * 60 * 1000
          this.end_time = new Date(response.data.date).getTime() + 56 * 60 * 60 * 1000

          for (let j=0;j<response.data.data.length;j++){
            let data = response.data.data[j]
            order_no++
            let varList = ['UPH','machine_CT','machine_ton','mass_pro','mold_NO','mold_Serial',
                            'mold_changeover_time','mold_down_t','mold_position','need','note',
                            'package_size','mold_edit','plan_number','plan_work_time','plastic_Part_NO',
                            'plastic_color','product_name','same_mold_part_NO','total_value','value',
                            'emergency','Seq']
            let new_dict = this.dictMapping(varList,data)
            new_dict['id'] = order_no
            new_dict['label'] = data.Part_NO
            new_dict['rowId'] = data.machine_NO
            new_dict['time'] = {
              start: new Date(data.plan_s_time).getTime(),
              end: new Date(data.plan_e_time).getTime(),
              mold_down: new Date(data.mold_down_t).getTime()
            }
            new_dict['style'] = item_style
            new_dict['progress'] = 50
            new_dict['changed'] = 0
            this.$set(this.chart_items,order_no,new_dict)
          }
          that.lastId = order_no
        })
      }
    },
    GetWeekPlan(){ //week_plan data
      WeeksPlan().then((response)=>{
        let that =this
        let week_plan = response.data.week_plan
        for(let i=0;i< week_plan.length;i++){
          that.week_plans.push({
            id:String(i+1),
            Part_NO:week_plan[i]['part_no'],
            plan_number:week_plan[i]['plan_number'],
            machine_CT:week_plan[i]['machine_CT'],
            product_color:week_plan[i]['product_color'],
            machine_ton:week_plan[i]['machine_ton'],
>>>>>>> master
          })
        }
      })
    },
    GetMachineData(){ //machine_data
      let that = this
      MachineData().then((response)=>{
        let temp_line = ['A','B','C','D','E','F','G']
        let counter = 0
        for(let i=0;i<temp_line.length;i++){
          let temp_machine = response.data[temp_line[i]]
          let temp_line_data=[]
          for(let j=0;j<temp_machine.length;j++){
            let machine_dict ={
              id:counter,
              machine_NO:temp_machine[j].machine_NO,
              machine_ton:temp_machine[j].machine_ton,
              product_color:temp_machine[j].product_color,
              mold_changeover_time:temp_machine[j].mold_changeover_time,
            }
            that.machine_data.push(machine_dict)   // machine options
            temp_line_data.push(machine_dict)      // machine information group by line
          }
          that.lineInfo[temp_line[i]] = temp_line_data
          counter++
        }
      })
    },
    pickPartNo(e){ //料號下拉式選單，設定相對應資訊

      //clear last selected data
      let clearList_empty = ['Part_NO','mold_NO','machine','mold_Serial','mold_hole',
                        'UPH','cycle_time','product_name','mold_position','machine_ton',
                        'plastic_Part_NO','plastic_color','mold_state','machine_repair_time','mold_edit',
                        'package_size','same_mold_part_NO','mold_changeover_time','note',
                        'machine_CT','mass_pro','need','machine_NO']
      let clearList_zero= ['plan_number','remaining_number','value','total_value','emergency']
      let clearList_emptyarray= ['mold_options','machine_options']

      this.new_order.productiontime={label :'0 d 0 h 0 m', min : 0, hour : 0, day : 0 }
      this.clearValue(this.new_order,clearList_empty,clearList_zero,clearList_emptyarray)  //clear last selected data
      if(!(e=='')){
        this.new_order.remaining_number = Number(e.plan_number)
        this.valueAssign(['machine_ton','Part_NO'],this.new_order,e)

        //新增 Mold_options
        PartNoInfo(e.Part_NO).then((response)=>{
          let that = this
          let temp_mold_options =[]
          let partno_info = response.data[0]
          that.valueAssign(['product_name','plastic_Part_NO','plastic_color'],that.new_order,partno_info)

          let mold_info = partno_info.mold_info
          for(let i=0;i< mold_info.length;i++){
            temp_mold_options.push({
              mid:String(i+1),
              mold_NO : mold_info[i].mold_no,
              mold_Serial:mold_info[i].mold_Serial,
              mold_hole:mold_info[i].mold_hole,
              UPH:mold_info[i].mold_uph,
              mold_position:mold_info[i].mold_position,
              mold_state:mold_info[i].mold_state,
              cycle_time:mold_info[i].cycle_time
            })
          }
          that.new_order.mold_options = temp_mold_options
        }).catch(function (error) {
            alert('請檢查網路 ' + error)
        })
        //新增 Machine_options
        for(let i=0;i<Object.keys(this.machine_data).length;i++){
          if(this.machine_data[i].machine_ton == e.machine_ton){
            this.new_order.machine_options.push({
              id:i,
              label:(String(this.machine_data[i].machine_NO)+' '+String(this.machine_data[i].machine_ton)+' '+String(this.machine_data[i].product_color)),
              // label:String(this.machine_data[i].machine_NO),
              machine_ton:this.machine_data[i].machine_ton,
              machine_NO:this.machine_data[i].machine_NO,
              mold_changeover_time:this.machine_data[i].mold_changeover_time
            })
          }
        }
      }
    },
    pickMcahineNo(e){ //機台下拉式選單
      this.clearValue(this.new_order,['mold_changeover_time','machine_NO'],[],[])
      if(!(e==''))
        this.valueAssign(['mold_changeover_time','machine_NO'],this.new_order,e)
    },
    pickMoldNo(e){   //模具下拉式選單
      let clearList = ['mold_Serial','mold_hole','UPH','mold_position','mold_state','cycle_time']
      this.clearValue(this.new_order,clearList,['mold_max_hole'],[])  //clear last selected data
      if(!(e=='')){
        let assignList = ['mold_NO','mold_Serial','mold_hole','UPH','mold_position','mold_state','cycle_time']
        this.valueAssign(assignList,this.new_order,e)
        this.new_order.mold_max_hole = e.mold_hole
      }
      $("#mold_input").attr({ //
        "max" : parseInt(this.new_order.mold_max_hole)
      })
      this.caculate_exetime()

    },
    addRow(){ //新增計畫
      if(this.check_form()){    // 先檢查格式
        let st = this.ObjectToNewDate(this.new_order.starttime)
        let et = this.ObjectToNewDate(this.new_order.endtime)
        if (st >= et)
          alert('結束時間要大於開始時間')
        else {
          this.dialogVisible = true
          this.lastId ++
          let varList = ['UPH','machine_ton','mass_pro','mold_NO','mold_Serial',
                          'mold_changeover_time','mold_down_t','mold_position','need','note',
                          'package_size','mold_edit','plan_number','plan_work_time','plastic_Part_NO',
                          'plastic_color','product_name','same_mold_part_NO','total_value','value',
                          'emergency','Seq']
          let new_dict = this.dictMapping(varList,this.new_order)
          new_dict['id'] = this.lastId,
          new_dict['label'] = this.new_order.Part_NO
          new_dict['rowId'] = this.new_order.machine_NO
          new_dict['machine_CT'] = this.new_order.cycle_time
          new_dict['time'] = {
            start: st.getTime(),
            end: et.getTime(),
            mold_down: st.getTime()
          }
          new_dict['style'] = item_style
          new_dict['progress'] = 50
          new_dict['changed'] = 1
          this.$set(this.chart_items,this.lastId,new_dict)
          this.dialogVisible = false
          alert('新增成功')
        } //else
      } //if
    },
    deleteRow(){   //刪除計畫
      if(this.selected_order.id=='')
          alert('請選擇工單')
      else{
        delete this.chart_items[this.selected_order.id]
        this.$set(this.chart_items,this.selected_order.id,{
          id: "x",
          rowId: 'x',
          label: "x",
          changed : 2,
          Seq:this.selected_order.Seq
        })
        this.table_show =false
      }
    },
    check_form(){  //檢查所有單位是否正確
      let pass_key = true
      if(this.new_order.Part_NO.length==0){
        alert('請選擇料號')
        pass_key = false
      }else if(this.new_order.machine_NO.length==0){
        alert('請選擇機台')
        pass_key = false
      }else if(this.new_order.mold_NO.length==0){
        alert('請選擇模具')
        pass_key = false
      }else if ( this.new_order.plan_number==0){
        alert('請輸入生產數量')
        pass_key = false
      }else if (this.new_order.plan_number > Number(this.new_order.remaining_number)){
        let alert_mas = "剩餘數量 : " + this.new_order.remaining_number
        alert(alert_mas)
        pass_key = false
      }else if ( isNull(this.new_order.starttime.date) ||  isNull(this.new_order.endtime.date) ){
        alert('請輸入開始時間與結束時間')
        pass_key = false
      }
      return pass_key
    },
    timeAdd() {
      this.from_time = this.from_time + 24 * 60 * 60 * 1000
      this.end_time = this.end_time + 24 * 60 * 60 * 1000
    },
    timeMinus() {
      this.from_time = this.from_time - 24 * 60 * 60 * 1000
      this.end_time = this.end_time - 24 * 60 * 60 * 1000
    },
    toDate(time) {
      let year = new Date(time).getFullYear()
      let month = new Date(time).getMonth()+1
      let date = new Date(time).getDate()
      let hour = new Date(time).getHours()
      return year+'-'+month+'-'+date+' '+hour+':00:00'
    },
    timeToString:function(val){  //datetime to str
      return val.date + ','+val.time
    },
    setProductionTime:function(mins,target){
      let hours =  parseInt(mins/60)
      mins = mins % 60
      let days = parseInt(hours/24)
      hours = hours % 24
      target.min = mins
      target.hour = hours
      target.day = days
      target.label = ( String(days)+' d '+String(hours)+' h '+String(mins)+' m')
    },
    ObjectToString:function(val){ //new date to yyyy-mm-dd in string
      return new Date(+val.date + 8 * 3600 * 1000).toISOString().substr(0, 10) + ' ' +val.time  //加入相差的8小時
    },
    ObjectToNewDate:function(target){
      //yyyy-mm-dd
      let newdate =  target.date
      newdate.setHours(0)
      newdate.setMinutes(0)
      newdate.setSeconds(0)

      //hh:mm:ss
      let temptime = parseInt(target.time.substring(0,2))*60*60 + parseInt(target.time.substring(3,5))*60 + parseInt(target.time.substring(6,8))

      return new Date(newdate.getTime() + temptime*1000)
    },
    NewDateToObject:function(time,target){
      target.date = time.getFullYear()+'-'+(time.getMonth()+1).toString().padStart(2,'0')+'-'+ time.getDate().toString().padStart(2,'0')
      target.time = time.getHours().toString().padStart(2,'0') + ':' + time.getMinutes().toString().padStart(2,'0')+ ':' + time.getSeconds().toString().padStart(2,'0')
    },
    caculate_exetime:function(){  //計算執行時間
      if(Number(this.new_order.UPH) > 0){
        let mins = Math.round((this.new_order.plan_number/this.new_order.UPH)*60)
        if((this.new_order.plan_number>0)&&(mins==0))
          mins = 1
        this.setProductionTime(mins,this.new_order.productiontime)
      }
      else
        this.new_order.productiontime= {label :'0 d 0 h 0 m', min:0, hour:0, day:0}
    },
    getEndtime:function(){ //推算結束時間
      if(this.new_order.Part_NO=='')
        alert('請選擇料號')
      else if(this.new_order.machine_NO=='')
        alert('請選擇機台')
      else if(this.new_order.mold_NO=='')
        alert('請選擇模具')
      else if (this.new_order.UPH=='')
        alert('無UPH')
      else if (this.new_order.plan_number==0)
        alert('請輸入本次生產數量')
      else{
        let new_time = this.ObjectToNewDate(this.new_order.starttime)
        new_time.setMinutes(new_time.getMinutes() + this.new_order.productiontime.min)
        new_time.setHours(new_time.getHours() + this.new_order.productiontime.hour)
        new_time.setDate(new_time.getDate()+this.new_order.productiontime.day)
        this.new_order.endtime.date = new_time
        this.new_order.endtime.time = this.timeAdd0(String(new_time.getHours()))+ ':' +this.timeAdd0(String(new_time.getMinutes()))+ ':' +this.timeAdd0(String(new_time.getSeconds()))
      }
    },
    getExeNumber:function(){ //推算單位時間內可製作數量
      if(this.new_order.Part_NO=='')
        alert('請選擇料號')
      else if(this.new_order.machine_NO=='')
        alert('請選擇機台')
      else if(this.new_order.mold_NO=='')
        alert('請選擇模具')
      else if(this.new_order.UPH=='')
        alert('無UPH')
      else if( isNull(this.new_order.starttime.date) || isNull(this.new_order.endtime.date))
        alert('請輸入開始與結束時間')
      else{
        let st = this.ObjectToNewDate(this.new_order.starttime)
        let et = this.ObjectToNewDate(this.new_order.endtime)
        if(et <= st)
          alert('結束時間要大於開始時間')
        else{
          // starttime - end_time
          let timediff = (et.getTime()-st.getTime())/1000/60/60
          let production_no = Math.round(this.new_order.UPH * timediff)
          //check remaining number
          if(this.new_order.remaining_number < production_no){
            let alert_mas = "剩餘數量為" + this.new_order.remaining_number
            alert(alert_mas)
            this.new_order.plan_number = this.new_order.remaining_number
          }else{
            this.new_order.plan_number = production_no
            let mins = timediff *60
            this.setProductionTime(mins,this.new_order.productiontime)
          }
        }
      }
    },
    valueAssign:function(vlist,a,b){
      for(let i=0;i<vlist.length;i++)
        a[vlist[i]] = b[vlist[i]]
    },
    dictMapping:function(vlist,a){
      let dict = {}
      for(let i=0;i<vlist.length;i++)
        dict[vlist[i]] = a[vlist[i]]
      return dict
    },
    clearValue(target,alist,blist,clist){
      for(let i=0;i<alist.length;i++) //alist set value = ''
        target[alist[i]] = ''
      for(let i=0;i<blist.length;i++) //blist set value = ''
        target[blist[i]] = 0
      for(let i=0;i<clist.length;i++) //clist set value = ''
        target[clist[i]] = []
    },
    clearTable(){
      let clearList_empty = ['Part_NO','mold_NO','machine','mold_Serial','mold_hole',
                        'UPH','cycle_time','product_name','mold_position','machine_ton',
                        'plastic_Part_NO','plastic_color','mold_state','machine_repair_time','mold_edit',
                        'package_size','same_mold_part_NO','mold_changeover_time','note','machine_CT','mass_pro','need']
      let clearList_zero= ['plan_number','remaining_number','emergency','value','total_value' ]
      let clearList_emptyarray= ['mold_options','machine_options']
      this.clearValue(this.new_order,clearList_empty,clearList_zero,clearList_emptyarray)
      this.new_order.productiontime={label :'0 d 0 h 0 m', min : 0, hour : 0, day : 0 }
      this.new_order.starttime={
        date : new Date(),
        time : '19:30:00'
      }
      this.new_order.endtime={
        date: new Date(),
        time : '19:30:00'
      }
    },
    timeAdd0:function(str) {
      if(str.length<=1)
        str='0'+str
      return str
    },
    close_table:function(){      // 表格縮小
      this.table_show =false
    },
    update_chartitem:function(item){
        let varList = ['UPH','machine_CT','machine_ton','mass_pro','mold_NO','mold_Serial',
                        'mold_changeover_time','mold_down_t','mold_position','need','note',
                        'package_size','mold_edit','plan_number','plan_work_time','plastic_Part_NO',
                        'plastic_color','product_name','same_mold_part_NO','total_value','value',
                        'emergency','Seq']
        let new_dict ={}
        if(this.chart_items[item.id].changed!=2){

          new_dict = this.dictMapping(varList,item)
          new_dict['id'] = item.id
          new_dict['label'] = item.label
          new_dict['rowId'] = item.rowId
          new_dict['time'] = {
            start: item.time.start,
            end: item.time.end,
            mold_down: item.time.start
          }
          new_dict['style'] = item_style
          new_dict['progress'] = 50
          new_dict['changed'] = 1
        }
        else{ //已刪除
          new_dict['id'] = 'x'
          new_dict['rowId'] = 'x'
          new_dict['label'] = 'x'
          new_dict['changed'] = 2
          new_dict['Seq'] =item.Seq
        }
        this.$set(this.chart_items,item.id,new_dict)
    },
    updatePlan:function(){       // 更新計畫
      // console.log(Object.keys(this.config.chart.items).length)

      let changedData ={}
      let counter = 0
      for(let i=1;i<=Object.keys(this.config.chart.items).length;i++){
        if(this.config.chart.items[i].changed!=0){
          changedData[counter]=this.config.chart.items[i]
          counter++
        }
      }
      // console.log(changedData)
      var json = JSON.stringify(changedData)
      // console.log(json)

      var update = function(){
        fetch('http://10.132.41.95:8002/api/update_nwe_db/', {
        // fetch('http://127.0.0.1:8002/api/update_nwe_db/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: json
        })
        .then(response => {
            console.log(response.text());
        });
      }
      update();
      alert('更新完成');

    },
    export_plan:function(val){   // 匯出報表
      let start_date = 'all'
      let end_date = 'all'
      let filename = '計畫預覽.xlsx'
      if(this.dataType=='workorder')
        filename = '工單計畫.xlsx'
      let time_check = true

      if(val != 'all'){
        let st = this.ObjectToNewDate(this.export_starttime)
        let et = this.ObjectToNewDate(this.export_endtime)
        if(st >= et){
          alert('請重新輸入時間')
          time_check = false
        }

        start_date = this.ObjectToString(this.export_starttime)
        end_date = this.ObjectToString(this.export_endtime)

        if(this.dataType=='workorder')
          filename = '工單計畫('+ start_date + '~'+ end_date + ').xlsx'
        else
          filename = '計畫預覽('+ start_date + '~'+ end_date + ').xlsx'

      }
      let urlparams = 'start_date=' + start_date  + '&end_date=' + end_date  + '&data_type=' + this.dataType

      // console.log(urlparams)
      let send_data = function(){
        fetch('http://10.132.41.95:8002/api/export_nwe_planning/?' + urlparams, {
        // fetch('http://127.0.0.1:8002/api/export_nwe_planning/?' + urlparams, {
        method: 'POST'
        })
        .then(response => response.blob())
        .then(blob => {
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          a.href = url
          a.download = filename
          document.body.appendChild(a)// we need to append the element to the dom -> otherwise it will not work in firefox
          a.click()
          a.remove()// afterwards we remove the element again
        })
      }
      if(time_check)
        send_data()
    },
    resetUPH:function(){
      if((this.new_order.mold_hole>0)&&(this.new_order.cycle_time>0)){
        this.new_order.UPH = parseInt((1/this.new_order.cycle_time) * 3600 * this.new_order.mold_hole)
      }
      this.caculate_exetime()
    },
    saveRow(row, index) {
      row.editMode = false;
    },
    cancelEditMode(row, index) {
      this.tableData[0] = JSON.parse(this.temptableData)
      this.tableData[0].editMode = false

      this.tableData_after[0] = JSON.parse(this.temptableData)
      this.tableData_after[0].editMode = false

      row.editMode = false
    },
    setEditMode(row, index) {
      this.resetvalue = false
      row.editMode = true;
      this.temptableData = JSON.stringify(row) //暫存結果 先轉String存 否則object call by reference
    },
    test(){
      console.log(this.config.chart.items)
    }
  },
mounted(){
  if(this.dataType=='workorder'){
    this.IsPlanorder = false
    this.dataToGantt('workorder')    //Get Work Information and set gantt
    this.GetMachineData() //Get Machine data
  }
  else{
    this.dataToGantt('planorder')    //Get Plan Information and set gantt
    this.GetWeekPlan()    //Get Week plans
    this.GetMachineData() //Get Machine data
  }

  //Initialize Datepicker
  this.new_order.starttime.date = new Date()
  this.new_order.endtime.date = new Date()
  this.export_starttime.date = new Date()
  this.export_endtime.date = new Date()

  this.line='all' //強迫computed的row動

},
beforeDestroy() {
  // subs.forEach(unsub => unsub());
}
};
</script>

<style scoped>

  table td {
    text-align: center;
    background: transparent;
    padding: 5px 4px;
    font-size: 14px;
  }

  table tbody tr:nth-child(2n) td {
    background: rgb(255, 255, 255);
  }

</style>