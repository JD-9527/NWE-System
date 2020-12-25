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
      :title="`${title} 新增資料`"
      :visible.sync="dialog"
      :width="$attrs.width"
    >
      <el-row>
        <el-col :span="new_row['machine_NO']&& type=='workorder'? 12: 24">
          <div
            style="padding: 5px; width: 45%; display: inline-block;"
            v-for="(column,index) in tableInfo"
            :key="index"
          >
            <div>{{column.label}}</div>
            <el-select
              v-model="new_row[column.prop]"
              placeholder="請選擇"
              filterable
              clearable
              :multiple="column.prop == 'machine_NO' && column.type == 'select-multi'"
              v-if="select_list.indexOf(column.prop) > -1 && selection.includes(column.type)"
              size='small'
              style="width: 100%"
              @focus="getLists(column.prop)"
            >
              <el-option
                v-for="(item,index) in Alists"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <el-input
              :placeholder="column.label"
              size='small'
              style='width: 100%;'
              v-model="new_row[column.prop]"
              v-else-if="column.type == 'input'"
            ></el-input>
            <el-input
              :placeholder="column.label"
              size='small'
              style='width: 100%;'
              type="number"
              v-model="new_row[column.prop]"
              v-else-if="column.type == 'input_number'"
            ></el-input>
            <el-date-picker
              v-model="new_row[column.prop]"
              type="date"
              size='small'
              style="width: 100%"
              :placeholder="column.label"
              editable-component="el-date-picker"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              v-else-if="column.type == 'date'"
            >
            </el-date-picker>
            <el-date-picker
              v-model="new_row[column.prop]"
              type="date"
              size='small'
              style="width: 100%"
              :placeholder="column.label"
              editable-component="el-date-picker"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-else-if="column.type == 'date2'"
            >
            </el-date-picker>
            <el-time-picker
              v-model="new_row[column.prop]"
              value-format="HH:mm:ss"
              type="time"
              size='small'
              style="width: 100%"
              :placeholder="column.label"
              editable-component="el-time-picker"
              v-else-if="column.type == 'time'">
            </el-time-picker>
          </div>
        </el-col>
        <el-col
          v-if="new_row['machine_NO'] && type=='workorder'"
          :span="12"
        >
          <slot :machs="new_row['machine_NO']"></slot>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="comfirmEdit">新 增</el-button>
        <el-button @click="dialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dataEditWeekPlan, dataEditDayPlan, dataEditCtTime,
         dataEditPlasticColor, dataColorList, dataSpecPartnoNew,
         dataEditMachineColor, dataAddWorkOrder } from '@/api.js'

  /* eslint-disable */
export default {
  data() {
    return {
      dialog: false,
      new_row: {},
      Edit: '',
      categorylist: ['急單', 'D11組裝', '成型組裝', 'NSD', '海外', '印刷', '重試' ],
      colorlist: [],
      select_list: ['require_source', 'plastic_color', 'machine_NO'],
      machinelist: [],
      Alists: [],
      selection: ['select', 'select-multi']
    }
  },
  props: {
    // 欄位對應的prop
    tableInfo: {
      type: Array,
      default: () => []
    },
    type: String,
    title: {
      type: String,
      default: '',
    }
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
      else if (this.type == 'partnoS') {
        this.Edit = dataSpecPartnoNew
      }
      else if (this.type == 'machinecolor') {
        this.Edit = dataEditMachineColor
      }
      else if (this.type == 'workorder') {
        this.Edit = dataAddWorkOrder
      }
    },
    comfirmEdit() {

      let pass_key = true

      // 工單計畫新增 資料過濾與補空值
      if (this.type=='workorder'){
        let check_list = ['work_list_NO','machine_NO','plan_s_date','plan_s_time',
                          'plan_e_date','plan_e_time','Part_NO','plan_number']
        let check_list_name = ['工令號','機台號','預計開始日期','預計開始時間',
                              '預計結束日期','預計結束時間','料號','數量']

        for(let i=0;i<check_list.length;i++){
          if((this.new_row[check_list[i]]==null)&(pass_key)){
            this.$message.error('請輸入'+check_list_name[i])
            pass_key = false
          }
        }

        if (pass_key){
          let stert_date_time= new Date(this.new_row.plan_s_date+' '+this.new_row.plan_s_time)
          let end_date_time= new Date(this.new_row.plan_e_date+' '+this.new_row.plan_e_time)
            if (stert_date_time>end_date_time){
              this.$message.error('預計開始時間需小於結束')
              pass_key = false
            }
            else{
              this.new_row['plan_s_time']=(this.new_row.plan_s_date+' '+this.new_row.plan_s_time)
              this.new_row['plan_e_time']=(this.new_row.plan_e_date+' '+this.new_row.plan_e_time)
            }
        }

      }

      // 提交
      if (pass_key){
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
      }

    },
    getColorList() {
      dataColorList().then((response)=>{
        let data = response.data.color
        this.colorlist = data
        // for (let i=0;i<data.length;i++) {
        //   this.colorlist.push({
        //     value: data[i].toString(),
        //     label: data[i].toString()
        //   })
        // }
      })
    },
    getMachineList() {
      let tmp = []
      for (let i=0;i<15;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('A'+num)
      }
      for (let i=0;i<14;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('B'+num)
      }
      for (let i=0;i<12;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('C'+num)
      }
      for (let i=0;i<19;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('D'+num)
      }
      for (let i=0;i<21;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('E'+num)
      }
      for (let i=0;i<17;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('F'+num)
      }
      for (let i=0;i<9;i++) {
        let num = (i+1)<10? '0'+(i+1): (i+1)
        tmp.push('G'+num)
      }
      this.machinelist = tmp
    },
    getLists(prop) {
      // console.log(this.new_row.b)
      if (prop == 'require_source') this.Alists = this.categorylist
      else if (prop == 'plastic_color') this.Alists = this.colorlist
      else if (prop == 'machine_NO') this.Alists = this.machinelist
    }
  },
  mounted() {
    this.getEditFunct()
    this.getColorList()
    this.getMachineList()
  }
}
</script>