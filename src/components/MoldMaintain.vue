<template>
  <div>
    <el-row class="header-row">模具維護<span class="sub-header-row"> 資料查詢</span></el-row>
    <el-row :gutter="10">
      <el-col :md="3" :lg="2">
        <span style="line-height: 40px">請填入查詢模號：</span>
      </el-col>
      <el-col :span="5">
        <el-input v-model="input"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button @click="dataSearch(input)">搜尋</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        max-height="700"
        v-loading="loading"
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
      <div>
        <el-pagination 
          :hide-on-single-page='true'
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="currentPage" 
          :page-sizes="[10,20,50]" 
          :page-size="pagesize" 
          layout="total, sizes,prev, pager, next" 
          :total="tableData.length" 
          prev-text="上一頁" 
          next-text="下一頁">
        </el-pagination>
      </div>
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
  import axios from 'axios'
  export default {
    data() {
      return {
        columns: [
          {prop: 'mold_NO', label: "模號"},
          {prop: 'Honhi_Part_NO', label: "料號"},
          {prop: 'mold_Serial', label: "複製模代碼"},
          {prop: 'mold_hole', label: "模穴數"},
          {prop: 'machine_ton', label: "噸位"},
          {prop: 'mold_life', label: "標準壽命"},
          {prop: 'mold_type', label: "模具類型"},
          {prop: 'mold_location', label: "所在模倉"},
          {prop: 'mold_position', label: "儲位"}
        ],
        tableData: [],
        input: '',
        currentPage: 1, //默认显示页面为1
        pagesize: 20, //    每页的数据条数
        loading: false
      }
    },
    methods: {
      dataSearch(data) {
        this.getTableData(data)
      },
      getTableData(mold) {
        if (mold == '') {
          this.$message.error('請輸入要搜尋的模號！');
        }
        else {
          const url='http://10.124.131.87:8880/data/mold/?moldno='
          this.loading = true
          axios.get(url+mold).then((response)=>{
            this.loading = false
            this.tableData = response.data.data
          })
        }
      },
      handleSizeChange: function(size) {
        this.pagesize = size;
        /*console.log(this.pagesize) */
      },
      //点击第几页
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        /*console.log(this.currentPage) */
      },
    }
  }
</script>