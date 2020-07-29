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
        <el-select
          v-model="new_row[column.prop]"
          placeholder="請選擇"
          v-if="column.prop == 'require_source'"
          size='small'
        >
          <el-option
            v-for="(item,index) in categorylist"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="new_row[column.prop]"
          placeholder="請選擇"
          v-if="column.prop == 'plastic_color'"
          size='small'
        >
          <el-option
            v-for="(item,index) in colorlist"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          :placeholder="column.label"
          size='small'
          style='width: 100%;'
          v-model="new_row[column.prop]"
          v-else
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
import { dataEditWeekPlan, dataEditDayPlan, dataEditCtTime, dataEditPlasticColor,dataColorList } from '../api.js'

  /* eslint-disable */
export default {
  data() {
    return {
      dialog: false,
      new_row: {},
      Edit: '',
      categorylist: ['急單', 'D11組裝', '成型組裝', 'NSD', '海外', '印刷', '重試' ],
      colorlist: []
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
    },
    getEditFunct() {
      if (this.type == 'dayplan') {
        this.Edit = dataEditDayPlan
      }
      else if (this.type == 'weekplan') {
        this.Edit = dataEditWeekPlan
      }
      else if (this.type == 'cttime') {
        this.Edit = dataEditCtTime
      }
      else if (this.type == 'partno') {
        this.Edit = dataEditPlasticColor
      }
    },
    comfirmEdit() {
      console.log(this.new_row)
      this.Edit(this.new_row,this.$store.getters.name).then((response)=>{
        this.$message.success('新增成功！')
        this.$emit('update')
        this.dialog = false
        this.new_row = {}
      })
      .catch((error)=>{
        this.$message.error('新增失敗！')
        console.log(error)
      })
    },
    getColorList() {
      dataColorList().then((response)=>{
        let data = response.data.color
        for (let i=0;i<data.length;i++) {
          this.colorlist.push({
            value: data[i].toString(),
            label: data[i].toString()
          })
        }
      })
    }
  },
  mounted() {
    this.getEditFunct()
    this.getColorList()
  }
}
</script>