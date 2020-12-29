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
            <div v-if="column.necessary=='Y'">{{column.label}} <span style="color:red"> *必填 </span></div>
            <div v-else>{{column.label}}</div>
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
            <el-select
              v-model="new_row[column.prop]"
              placeholder="請選擇"
              filterable
              clearable
              v-else-if="column.prop == 'mold_NO' "
              size='small'
              style="width: 100%"
              @input="getMoldInfo"
            >
              <el-option
                v-for="(item,index) in mold_info"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <el-input
              :placeholder="'輸入料號與版次後帶出其他資訊'"
              size='small'
              style='width: 100%;'
              v-model="new_row[column.prop]"
              v-else-if="column.type == 'input' && (column.prop == 'Part_NO' || column.prop == 'VER')"
              @change="getPartNo_detail()"
            ></el-input>
            <el-input
              :placeholder="column.label"
              size='small'
              style='width: 100%;'
              v-model="new_row[column.prop]"
              v-else-if="column.type == 'input'"
            ></el-input>
            <el-input-number
              :placeholder="column.label"
              size='small'
              style='width: 100%;'
              type="number"
              v-model="new_row[column.prop]"
              v-else-if="column.type == 'number'"
              @input="EditTime(column.prop)"
            ></el-input-number>
            <el-date-picker
              v-model="new_row[column.prop]"
              type="date"
              size='small'
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
              :placeholder="column.label"
              editable-component="el-date-picker"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style='width: 100%;'
              v-else-if="column.type == 'date2'"
            >
            </el-date-picker>
            <el-time-picker
              v-model="new_row[column.prop]"
              value-format="HH:mm:ss"
              type="time"
              size='small'
              style='width: 100%;'
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
        <el-button @click="new_row={}">清 除</el-button>
        <el-button @click="dialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dataEditWeekPlan, dataEditDayPlan, dataEditCtTime,
         dataEditPlasticColor, dataColorList, dataSpecPartnoNew,
         dataEditMachineColor, dataAddWorkOrder, PartNoInfo, MoldNoInfo} from '@/api.js'
  /* eslint-disable */
export default {
  data() {
    return {
      dialog: false,
      new_row: {'plastic_Part_NO':'','plan_work_time':0,'plan_number':0,'mold_hole':0,
      'mold_Serial':'','mold_position':'','UPH':0,'machine_CT':0},
      Edit: '',
      categorylist: ['急單', 'D11組裝', '成型組裝', 'NSD', '海外', '印刷', '重試' ],
      colorlist: [],
      select_list: ['require_source', 'plastic_color', 'machine_NO'],
      machinelist: [],
      Alists: [],
      selection: ['select', 'select-multi'],
      mold_info :[],
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
    
      let IsCorrect = true //If data format correct

      // 工單計畫新增
      if (this.type=='workorder')
        IsCorrect = this.CheckDataFormat(IsCorrect)
   
      // 提交
      if (IsCorrect){
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
    },
    getPartNo_detail(){ //enter part_no and ver to get detial infomation
      let that = this;
      if (this.type=='workorder'){
        if (typeof this.new_row.Part_NO != 'undefined' && typeof this.new_row.VER != 'undefined'){
          PartNoInfo(this.new_row.Part_NO,this.new_row.VER).then((response)=>{
            for(let i=0;i<response.data.mold_info.length;i++){
              that.mold_info.push(response.data.mold_info[i].mold_no);
            }
            this.new_row.machine_CT = response.data.part_no_ct;
            this.new_row.product_name = response.data.product_name;
            this.new_row.plastic_Part_NO = response.data.plastic_Part_NO;
            this.new_row.plastic_color = response.data.plastic_color;
          })
        }
      }
    },
    getMoldInfo(e){ //enter part_no, ver, and mold_no to get mold information
      if (this.type=='workorder'){
        MoldNoInfo(this.new_row.Part_NO,e,this.new_row.VER).then((response)=>{
          this.new_row.mold_Serial = response.data.mold_Serial;
          this.new_row.mold_position = response.data.mold_position;
          this.new_row.mold_hole = response.data.mold_hole;
          this.new_row.UPH = response.data.mold_uph;
        })
      }
    },
    EditTime(prop){ //enter plannumber|machine_CT|mold_hole to change plan_work_time
      if (this.type=='workorder'){
        if(prop=='machine_CT'|prop=='mold_hole'){
          this.new_row.UPH = Number(((1/this.new_row.machine_CT) * 3600 * this.new_row.mold_hole).toFixed(2))
          this.new_row.plan_work_time = Number((this.new_row.plan_number / this.new_row.UPH).toFixed(2)) //計畫工時
        }
        if (prop=='plan_number')
          this.new_row.plan_work_time = Number((this.new_row.plan_number / this.new_row.UPH).toFixed(2)) //計畫工時
      }
    },
    CheckDataFormat(IsCorrect){

      let check_list =[
        {'en':'work_list_NO','ch':'工令號'},
        {'en':'Part_NO','ch':'料號'},
        {'en':'VER','ch':'版次'},
        {'en':'machine_NO','ch':'機台號'},
        {'en':'machine_ton','ch':'噸位'},
        {'en':'plan_s_date','ch':'預計開始日期'},
        {'en':'plan_s_time','ch':'預計開始時間'},
        {'en':'plan_e_date','ch':'預計結束日期'},
        {'en':'plan_e_time','ch':'預計結束時間'},
        {'en':'plan_number','ch':'數量'},
        {'en':'mold_NO','ch':'模號'},
        {'en':'mold_Serial','ch':'模序'},
        {'en':'mold_hole','ch':'模穴數'},
        {'en':'plan_work_time','ch':'計畫工時'}
      ]
      
      for(let i=0;i<check_list.length;i++){
        if((this.new_row[check_list[i].en]==null)&(IsCorrect)){
          this.$message.error('請輸入'+check_list[i].ch)
          IsCorrect = false
        }
      }

      if(IsCorrect){
        let stert_date_time= new Date(this.new_row.plan_s_date+' '+this.new_row.plan_s_time)
        let end_date_time= new Date(this.new_row.plan_e_date+' '+this.new_row.plan_e_time)
        if (stert_date_time>end_date_time){
          this.$message.error('預計開始時間需小於結束')
          IsCorrect = false
        }
        else{ 
          this.new_row['plan_s_time']=(this.new_row.plan_s_date+' '+this.new_row.plan_s_time)
          this.new_row['plan_e_time']=(this.new_row.plan_e_date+' '+this.new_row.plan_e_time)
        }
      }
      return IsCorrect
    }
  },
  mounted() {
    this.getEditFunct()
    this.getColorList()
    this.getMachineList()
  }
}
</script>