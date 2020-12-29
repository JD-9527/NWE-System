<template>
  <div>
    <div style="text-align: center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        prev-text="上一頁"
        next-text="下一頁">
      </el-pagination>
    </div>
    <!-- <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      @select="handleSelect"
      @select-all="handleSelect"
    >
      <el-table-column
        width="50"
        align="center"
        type="selection"
        fixed="left"
      >
      </el-table-column>
      <el-table-column
        prop="Part_NO"
        label="料號"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="VER"
        label="版次"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="machine_ton"
        label="噸位"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="machine_NO"
        label="機台號"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plastic_color"
        label="當前顏色"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_down_t"
        label="上下模時間"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plan_s_time"
        label="起始時間"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plan_e_time"
        label="結束時間"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="product_name"
        label="品名"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plastic_Part_NO"
        label="塑膠料號"
        width="130"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plan_number"
        label="數量"
        width="170"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-input-number 
            v-if="row.editMode"
            v-model="row.plan_number"
            style="width:140px"
            @input="changePlanNumber(row)"
          ></el-input-number>
          <span v-else>{{ row.plan_number }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mold_NO"
        label="模號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_Serial"
        label="模序"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_position"
        label="模具儲位"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plan_work_time"
        label="計畫工時"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="machine_CT"
        label="標準週期"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="UPH"
        label="UPH"
        width="100"
        align="center"
      >
      </el-table-column>
       <el-table-column
        prop="emergency"
        label="緊急程度"
        width="100"
        align="center"
      >
      </el-table-column>
       <el-table-column
        prop="need"
        label="量產"
        width="100"
        align="center"
      >
      </el-table-column>
       <el-table-column
        prop="note"
        label="備註"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        width="180">
        <template slot-scope="{ row, index }">
          <el-button
            size="mini"
            icon="el-icon-edit"
            :disabled="row.status == 1"
            @click="setEditMode(row, index)"
          >
          </el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            v-show="row.editMode"
            @click="saveRow(row, index)"
          >
          </el-button>
          <el-button
            type="info"
            icon="el-icon-close"
            size="mini"
            v-show="row.editMode"
            @click="cancelEditMode(row, index)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <custom-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      :tableInfo="tableInfo"
      @select="handleSelect"
      @select-all="handleSelect"
    >
      <template #head>
        <el-table-column
          width="50"
          align="center"
          type="selection"
          fixed="left"
        ></el-table-column>
      </template>
      <template
        v-for="{prop, component} in tableInfo"
        #[prop]={row}
      >
        <div :key="prop">
          <span v-show="!row.editMode">
            {{ row[prop] }}<span v-show="prop==='machine_NO'">#</span>
            <span v-show="prop==='machine_ton'">T</span>
          </span>
          <el-input
            v-if="row.editMode && component==='input'"
            v-model="row[prop]"
            :type="numberList.includes(prop)?'number': 'text'"
            :disabled="prop==='plan_work_time'"
          >#</el-input>
          <el-date-picker
            v-else-if="row.editMode && component==='time'"
            v-model="row[prop]"
            type="datetime"
            placeholder=""
            format="yyyy-MM-dd, HH:mm:ss"
            value-format="yyyy-MM-dd, HH:mm:ss"
            @change="calTime(row)"
          />
          <el-select
            v-else-if="row.editMode && prop==='machine_NO'"
            v-model="row[prop]"
            filterable
            placeholder=""
          >
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </template>
      <template #tail>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="180">
          <template slot-scope="{ row, index }">
            <el-button
              size="mini"
              icon="el-icon-edit"
              :disabled="row.status == 1"
              @click="setEditMode(row, index)"
            >
            </el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              size="mini"
              v-show="row.editMode"
              @click="saveRow(row, index)"
            >
            </el-button>
            <el-button
              type="info"
              icon="el-icon-close"
              size="mini"
              v-show="row.editMode"
              @click="cancelEditMode(row, index)"
            >
            </el-button>
          </template>
        </el-table-column>
      </template>
    </custom-table>
  </div>
</template>

<script>
import { PlanOrder, planEditPreview } from '@/api.js'

const data = require('@/assets/data/common.json')

export default {
  components: {
    CustomTable: () => import('../base/CustomTable'),
  },

  data(){
    return{
      tableData: [],
      tableData_o: [], // 原始數據
      searchLine: 'All',
      searchTon: 'All',
      pageSize: 10,
      currentPage: 1,
      tableInfo: [
        { prop: 'mold_down_t', label: '預計\n下模時間', width: '100', component: 'time' },
        { prop: 'plan_s_time', label: '預計生產\n開始時間', width: '100', component: 'time' },
        { prop: 'plan_e_time', label: '預計生產\n結束時間', width: '100', component: 'time' },
        { prop: 'machine_NO',  label: '機台號', width: '100' },
        { prop: 'machine_ton', label: '機台噸位', width: '80', component: 'input' },
        { prop: 'product_name', label: '品名', width: '100', component: 'input' },
        { prop: 'Part_NO', label: '料號', width: '200', component: 'input' },
        { prop: 'VER', label: '版次', width: '100', component: 'input' },
        { prop: 'work_list_NO', label: '工單號', width: '100', component: 'input' },
        { prop: 'plan_number', label: '排配數量', width: '100', component: 'input' },
        { prop: 'UPH', label: 'UPH', width: '100', component: 'input' },
        { prop: 'machine_CT', label: '機器工時', width: '100', component: 'input' },
        { prop: 'plan_work_time', label: '計畫工時', width: '100', component: 'input' },
        { prop: 'mold_Serial', label: '模序', width: '100', component: 'input' },
        { prop: 'mold_NO', label: '模號', width: '100', component: 'input' },
        { prop: 'mold_position', label: '模具儲位', width: '100', component: 'input' },
        { prop: 'package_size', label: '包規', width: '100', component: 'input' },
        { prop: 'emergency', label: '緊急程度', width: '100', component: 'input' },
        { prop: 'mass_pro', label: '是否量產', width: '100', component: 'input' },
        { prop: 'need', label: '是否需要\n特殊工料', width: '100', component: 'input' },
        { prop: 'same_mold+part_NO', label: '共模料號', width: '100', component: 'input' },
        { prop: 'value', label: '單位產值', width: '100', component: 'input' },
        { prop: 'total_value', label: '總產值', width: '100', component: 'input' },
        { prop: 'plastic_Part_NO', label: '原料料號\n(塑膠粒料號)', width: '100', component: 'input' },
        { prop: 'mold_changeover_time', label: '換膜時間', width: '100', component: 'input' },
        { prop: 'plastic_color', label: '顏色', width: '100', component: 'input' },
        { prop: 'note', label: '備註', width: '100', component: 'input' },
      ],
      options: data['machine_NO'],
      numberList: ['work_list_NO', 'plan_number', 'UPH', 'machine_CT',
                   'emergency', 'value', 'total_value', 'mold_changeover_time']
    }
  },
  props: {
    field: String,
    line: {
      type: String,
      default: 'All'
    },
    ton: {
      type: String,
      default: 'All'
    }
  },
  watch: {
    field: function() {
      this.searchLine = 'All'
      this.searchTon = 'All'
      this.loadTable()
    },
    line: function() {
      this.searchLine = this.line
      this.searchTon = 'All'
      this.loadTable()
    },
    ton: function() {
      this.searchTon = this.ton
      this.loadTable()
    },
  },
  methods: {
    /* eslint-disable */
    linefilter(line){ //A 線-> A
      if(line!='All')
        return line.charAt(0)
      else
        return line
    },
    loadTable() {
      // console.log(this.searchTon)
      PlanOrder(this.field,this.linefilter(this.searchLine),this.searchTon).then((response)=>{
        // console.log(response.data.details)
        if(Object.keys(response.data.data).length>0){
          this.tableData = response.data.data
          this.tableData = this.tableData.map(row => {
            return {
              ...row,
              editMode: false,
            }
          })
          this.tableData_o = this.tableData
        }
        else
          this.tableData = []
      })
    },
    saveRow(row, index) {
      row.editMode = false;
      console.log(this.$store.getters.name)
      planEditPreview(row, this.$store.getters.name).then((response)=>{
        this.$message.success('修改成功！')
      })
      .catch((error)=>{
        this.$message.error('修改失敗')
      })
      this.loadTable();
    },
    cancelEditMode(row, index) {
      row.editMode = false;
      this.loadTable();
    },
    setEditMode(row, index) {
      row.editMode = true;
      // row.editMode = false;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },

    handleSizeChange: function(size) {
      this.pageSize = size;
    },
    handleSelect(selection) {
      this.$emit('select', selection)
    },
    calTime(row) {
      const String2Date = (string) => {
        // format: 'YYYY-MM-DD, hh:mm:ss'
        let year        = string.substring(0,4);
        let month       = string.substring(5,7);
        let day         = string.substring(8,10);
        let hour        = string.substring(12,14);
        let minute      = string.substring(15,17);
        let second      = string.substring(18,20);
        return new Date(year, month-1, day, hour, minute, second)
      }

      const startTime = String2Date(row.plan_s_time).getTime()
      const endTime = String2Date(row.plan_e_time).getTime()

      const workTime = Math.round((endTime - startTime)/(1000*60*60)*100)/100
      row.plan_work_time = workTime
    },
  },
  mounted() {
    this.loadTable()
  }
}
</script>