<template>
  <div style="display: inline-block;">
    <el-button
      size="small"
      style="margin-right: 10px; position: relative;"
      @click="addRow"
    >
      新增
    </el-button>
    <el-dialog
      title="新增資料"
      :visible.sync="dialog"
      width="50%"
    >
      <div
        style="padding: 5px; width: 45%; display: inline-block;"
        v-for="(column,index) in tableInfo"
        :key="index"
      >
        <div>{{column.label}}</div>
        <el-input
          :placeholder="column.label"
          size='small'
          style='width: 100%;'
          v-model="new_row[column.prop]"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="comfirmEdit">新 增</el-button>
        <el-button @click="dialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dataEditWeekPlan, dataEditDayPlan, dataWeekPlan, dataDayPlan } from '../api.js'

  /* eslint-disable */
export default {
  data() {
    return {
      dialog: false,
      // tableInfo: [],
      new_row: {},
      Edit: '',
      GetData: '',
      // categorylist = ['急單', 'D11組裝', '成型組裝', 'NSD', '海外', '印刷', '重試' ]
    }
  },
  props: {
    // 欄位對應的prop
    tableInfo: {
      type: Array,
      default: () => []
    },
    type: String,
  },
  methods: {
    addRow() {
      this.dialog = true
    },
    initNewRow() {
      let row = ''
      for (row of this.tableInfo) this.new_row[row.prop] = ''
      // console.log(this.new_row)
    },
    getEditFunct() {
      if (this.type == 'dayplan') {
        this.GetData = dataDayPlan
        this.Edit = dataEditDayPlan
      }
      else if (this.type == 'weekplan') {
        this.GetData = dataWeekPlan
        this.Edit = dataEditWeekPlan
      }
    },
    comfirmEdit() {
      console.log(this.new_row)
      this.Edit(this.new_row,'user').then((response)=>{
        this.$message.success('新增成功！')
        this.GetData()
        this.dialog = false
        this.new_row = {}
        // console.log('SUCCESS')
      })
      .catch((error)=>{
        this.$message.error('新增失敗！')
        console.log(error)
      })
    }
  },
  mounted() {
    this.getEditFunct()
    // this.initNewRow()
  }
}
</script>