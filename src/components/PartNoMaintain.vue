<template>
  <div>
    <el-row class="header-row">料號維護<span class="sub-header-row" style="display: flex; align-items: flex-end;"> 資料查詢</span></el-row>
    <el-row :gutter="10">
      <el-col :md="3" :lg="2">
        <span style="line-height: 40px">請填入查詢模號：</span>
      </el-col>
      <el-col :span="5">
        <el-input v-model="input"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button>搜尋</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          v-for="(column,index) in columns"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<style scoped>
.header-row {
  font-size: 32px;
  font-weight:bold;
} 
.sub-header-row {
  font-size: 20px; 
  color: #888; 
  font-weight: normal;
} 
</style>

<script>
  export default {
    data() {
      return {
        columns: [
          {prop: 'mold_NO', label: "模號"},
          {prop: 'Honhi_Part_NO', label: "料號"},
          {prop: 'mold_Serial', label: "複製魔代碼"},
          {prop: 'mold_hole', label: "模穴數"},
          {prop: 'machine_ton', label: "噸位"},
          {prop: 'mold_life', label: "標準壽命"},
          {prop: 'mold_type', label: "模具類型"},
          {prop: 'mold_location', label: "所在模倉"},
          {prop: 'mold_position', label: "儲位"}
        ],
        tableData: [
          {
            mold_NO: '',
            Honhi_Part_NO: '',
            mold_Serial: '',
            mold_hole: '',
            machine_ton: '',
            mold_life: '',
            mold_type: '',
            mold_location: '',
            mold_position: ''
          }, 
        ],
        input: ''
      }
    }
  }
</script>