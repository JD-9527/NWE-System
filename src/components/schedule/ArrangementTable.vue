<template>
  <div>

    <el-table
      :data="filterTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      :height="616"
    >
       <el-table-column
        v-for="column in tableInfo"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        align="center"
      ></el-table-column>
    </el-table>
    <div style="text-align: center;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="filterTable.length"
        prev-text="上一頁"
        next-text="下一頁">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { PlanOrder } from '@/api.js'

export default {
  data(){
    return{
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      tableInfo: [
        { prop: 'Part_NO', label: '料號', width: '200' },
        { prop: 'VER', label: '版次', width: '100' },
        { prop: 'machine_ton', label: '噸位', width: '80' },
        { prop: 'machine_NO', label: '機台號', width: '80' },
        { prop: 'plastic_color', label: '當前顏色', width: '100' },
        { prop: 'mold_down_t', label: '上下模時間', width: '100' },
        { prop: 'plan_s_time', label: '起始時間', width: '100' },
        { prop: 'plan_e_time', label: '結束時間', width: '100' },
        { prop: 'product_name', label: '品名', width: '100' },
        { prop: 'plastic_Part_NO', label: '塑膠料號', width: '100' },
        { prop: 'plan_number', label: '數量', width: '100' },
        { prop: 'mold_NO', label: '模號', width: '100' },
        { prop: 'mold_Serial', label: '模序', width: '100' },
        { prop: 'mold_position', label: '模具儲位', width: '100' },
        { prop: 'plan_work_time', label: '計畫工時', width: '100' },
        { prop: 'machine_CT', label: '標準週期', width: '100' },
        { prop: 'UPH', label: 'UPH', width: '100' },
        { prop: 'emergency', label: '緊急程度', width: '100' },
        { prop: 'need', label: '量產', width: '100' },
        { prop: 'note', label: '備註', width: '100' },
      ]
    }
  },
  props: {
    mach: {
      type: String,
      default: ''
    },
  },
  computed: {
    field() {
      let D10 = ['A', 'B', 'C', 'D']
      if (this.mach) {
        const line = this.mach.charAt(0)
        if (D10.includes(line)) {
          return 'D10'
        }
        else return 'D9'
      }
      else return 'All'
    },
    line() {
      if (this.mach) {
        return this.mach.charAt(0)
      }
      else return 'All'
    },
    filterTable: function() {
      return this.tableData
             .filter(data => !this.mach || data.machine_NO == this.mach)
    }
  },

  methods: {
    loadTable() {
      PlanOrder(this.field,this.line,'All').then((response)=>{
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
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.mach)
    this.loadTable()
  }
}
</script>