<template>
  <div>
    <el-table
      :data="tableData.filter(data => searchLine == 'All' || data.machine_NO.includes(searchLine[0]))"
      style="width: 100%"
    >
      <el-table-column
        prop="machine_ton"
        label="噸位"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="machine_NO"
        label="機台號"
        width="100"
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
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="Part_NO"
        label="料號"
        width="200"
        align="center"
      >
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{row}"
          v-model="row.Part_NO"
        >
          <span slot="content">{{row.Part_NO}}</span>
        </editable-cell>
      </el-table-column>
      <el-table-column
        prop="plastic_Part_NO"
        label="塑膠料號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plan_number"
        label="數量"
        width="100"
        align="center"
      >
        <editable-cell
          :show-input="row.editMode"
          slot-scope="{row}"
          v-model="row.plan_number"
        >
          <span slot="content">{{row.plan_number}}</span>
        </editable-cell>
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
        label="操作"
        align="center"
        fixed="right"
        width="180"
      >
       <template slot-scope="{row, index}">
        <el-button
          size="mini"
          icon="el-icon-edit"
          @click="setEditMode(row, index)">
        </el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          size="mini"
          @click="saveRow(row, index)">
        </el-button>
        <el-button
          type="info"
          icon="el-icon-close"
          size="mini"
          @click="cancelEditMode(row, index)">
        </el-button>
       </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import EditableCell from "./EditableCell.vue";
import { planPreview } from '../api.js'

export default {
  components: {
      EditableCell,
  },
  data: () => ({
    tableData: [],
    tableData_o: [], // 原始數據
    searchLine: 'All'
  }),
  props: {
    field: String,
    line: {
      type: String,
      default: 'All'
    }
  },
  // computed: {
  //   tableData: function() {
  //     return this.loadTable()
  //   }
  // },
  watch: {
    field: function() {
      this.loadTable()
      this.searchLine = 'All'
    },
    line: function() {
      this.searchLine = this.line
    }
  },
  methods: {
    /* eslint-disable */
    loadTable() {
      planPreview(this.field).then((response)=>{
        this.tableData = response.data.data
        this.tableData = this.tableData.map(row => {
          return {
            ...row,
            editMode: false
          }
        })
        this.tableData_o = this.tableData
      })
    },
    // searchLine() {
    //   if (this.line == 'All') this.tableData = this.tableData_o
    //   else {
    //     // console.log(this.line[0])
    //     let line_tmp = this.line[0];
    //     this.tableData = this.tableData.filter(data => data.machine_NO.includes(this.line_tmp))
    //   }
    // },
    saveRow(row, index) {
      row.editMode = false;
    },
    cancelEditMode(row, index) {
      row.editMode = false;
      // this.getTableData();
    },
    setEditMode(row, index) {
      row.editMode = true;
    },
    cancelEditMode(row, index) {
      row.editMode = false;
      // this.getTableData();
      // this.getTableDataCT();
    },
    /* eslint-enable */
  },
  mounted() {
    this.loadTable()
  }
}
</script>