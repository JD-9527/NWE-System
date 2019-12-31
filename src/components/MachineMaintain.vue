<template>
  <div>
    <el-row class="header-row">機台維護</el-row>
    <el-tabs>
      <el-tab-pane label="資料導入" name="first">

        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">選取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="前置作業時間維護" name="second">前置作業時間維護</el-tab-pane>
      <el-tab-pane label="資料查詢" name="third">
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
            :data="tabledata"
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
      </el-tab-pane>
    </el-tabs>  
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
.el-row {
  margin-bottom: 5px;
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
        input: '',
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      }
    },
    methods: {
      onClick() {
        this.getTableData('10')
      },
      getTableData(mold) {
        const url='http://172.31.8.175:8000/data/molddata/?moldno='
        axios.get(url+mold).then((response)=>{
          this.tableData = response.data
        })
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>