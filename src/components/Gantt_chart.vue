<template>
  <div>
    <el-button
      @click="dialogVisible = true"
      v-if="draggable"
      size='small'
    >新增</el-button>
    <el-button
      v-if="draggable"
      @click="deleteRow"
      size='small'
    >刪除</el-button>
    <el-button
      @click="timeMinus"
      size='small'
    >-</el-button>
    <span>
      {{ toDate(from_time)  }} ~ {{ toDate(end_time) }}
    </span>
    <el-button
      @click="timeAdd"
      size='small'
    >+</el-button>
    <div v-show="holding">
      ID: {{selected_order.id}}, 工單號: {{selected_order.label}}, 機台號: {{selected_order.rowId}}
    </div>
    <div v-show="!holding">
      ID: {{selected_order_after.id}}, 工單號: {{selected_order_after.label}}, 機台號: {{selected_order_after.rowId}}
    </div>
    <div id="gantt_app">
      <GSTC
        :config="config"

        id="gantt"
      />
    </div>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>id</span>
      <el-input v-model="new_row.id"></el-input>
      <span>名稱</span>
      <el-input v-model="new_row.label"></el-input>
      <span>行數</span>
      <el-input v-model="new_row.rowId"></el-input>
      <span>start</span>
      <el-input v-model="new_row.time.start"></el-input>
      <span>end</span>
      <el-input v-model="new_row.time.end"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GSTC from "vue-gantt-schedule-timeline-calendar";
import Gantt from "gantt-schedule-timeline-calendar"
import ItemMovement from "gantt-schedule-timeline-calendar/dist/ItemMovement.plugin.js"
// import Selection from "gantt-schedule-timeline-calendar/dist/Selection.plugin.js"
import ItemHold from 'gantt-schedule-timeline-calendar/dist/ItemHold.plugin.js'
import $ from 'jquery';
import { planPreview } from '../api.js'

let subs = [];
/* eslint-disable */
const Order_template = { //工單
  id:'',
  machine_ton:'',          // 噸位
  machine_NO:'',           // 機台號
  mold_NO:'',              // 模號
  mold_Serial:'',          // 模序
  mold_hole:'',            // 模穴
  UPH:'',                  // UPH
  mold_position:'',        // 模具儲位
  product_name:'',         // 品名
  plan_number:0,           // 數量
  plastic_Part_NO:'',      // 塑膠料號
  plastic_color:'',        // 顏色
  machine_state:'',
  machine_repair_time:'',
  plan_work_time: '',       // 計畫工時
  plan_s_time: '',
  plan_e_time: '',
  mold_down_t: '',
  // prodcution_time:{
  //   label :'0 d 0 h 0 m',
  //   min:0,
  //   hour:0,
  //   day:0
  // },
  // starttime: {
  //   date:null,
  //   time:{
  //     HH: "00",
  //     mm: "00",
  //     ss: "00"
  //   }
  // },
  // endtime:{
  //   date:null,
  //   time:{
  //     HH: "00",
  //     mm: "00",
  //     ss: "00"
  //   }
  // }
}
let item_style= { 'background': 'grey', 'text-align': 'center' }

export default {
  name: "app",
  components: {
    GSTC
  },
  data() {
    return {
      columns: {
        data: {
          label: {
            id: "label",
            data: "label",
            width: 100,
            header: {
              content: "Machine"
            },
          },
        },
      },
      chart_items: {
        "1": {
          id: "1",
          rowId: '1',
          label: "654323234",
          time: {
            start: new Date().getTime(),
            end: new Date().getTime() + 14 * 60 * 60 * 1000
          },
          style: item_style
        },
        "2": {
          id: "2",
          rowId: '2',
          label: "654323234",
          time: {
            start: new Date().getTime() + 60 * 60 * 1000,
            end: new Date().getTime() + 4 * 60 * 60 * 1000
          },
          style: item_style
        },
        "3": {
          id: "3",
          rowId: '3',
          label: "654323234",
          time: {
            start: new Date().getTime() + 12 * 60 * 60 * 1000,
            end: new Date().getTime() + 24 * 60 * 60 * 1000
          },
          style: item_style
        },
        "4": {
          id: "4",
          rowId: '3',
          label: "654323234",
          time: {
            start: new Date().getTime() + 3 * 60 * 60 * 1000,
            end: new Date().getTime() + 6 * 60 * 60 * 1000
          },
          style: item_style
        },
        "5": {
          id: "5",
          rowId: '4',
          label: "654323234",
          time: {
            start: new Date().getTime() + 12 * 60 * 60 * 1000,
            end: new Date().getTime() + 18 * 60 * 60 * 1000
          },
          style: item_style
        }
      },
      selected_order: Order_template,
      selected_order_after: Order_template,
      new_order: Order_template,
      new_row: {
        id: '',
        label: '',
        rowId: '',
        time: {
          start: '2020-03-20',
          end: '2020-03-20'
        }
      },
      from_time: new Date().getTime() - 24 * 60 * 60 * 1000,
      end_time: new Date().getTime() + 24 * 60 * 60 * 1000,
      dialogVisible: false,
      holding: false
    };
  },
  props:{
    draggable: {
      type: Boolean,
      default: false
    },
    line: {
      type: String,
    },
  },
  computed: {
    config: function() {
      // var that =this;
      return {
        plugins: [
          ItemMovement({
            // snap item start time to start of the day
            snapStart(time, diff, item) {
              return Gantt.api
                .date(time)
                .add(diff, 'milliseconds')
                .startOf('hour')
                .valueOf();
            },
            // snap item end time to end of the day
            snapEnd(time, diff, item) {
              return Gantt.api
                .date(time)
                .add(diff, 'milliseconds')
                .endOf('hour')
                .valueOf();
            },
            moveable: this.draggable,
            ghostNode: this.draggable,
            resizable: false,
            collisionDetection: true
          }),
          ItemHold({
            time: 10,
            action: (element, item) => {
              // document.onmousedown = () => {
              //   console.log(item)
              this.holding = true
              this.selected_order.id = item.id ;
              this.selected_order.label = item.label ;
              this.selected_order.rowId = item.rowId ;
              // }

              document.onmouseup = () => {
                // console.log(item)
                this.holding = false
                this.selected_order_after.id = item.id ;
                this.selected_order_after.label = item.label ;
                this.selected_order_after.rowId = item.rowId ;
              }
              // this.selected_order.id = item.id ;
              // this.selected_order.part_no = item.label ;
              // this.selected_order.product_name = item.product_name ;
              // this.selected_order.plan_number = item.plan_number ;
              // this.selected_order.plastic_color = item.plastic_color ;
              // this.selected_order.machine = item.rowId ;

              // let st = new Date(planning_date_datetype.getTime()+(item.time.start-temp_time));
              // let et = new Date(planning_date_datetype.getTime()+(item.time.end-temp_time));

              // this.selected_order.starttime.date = st.getFullYear()+'-'+(st.getMonth()+1).toString().padStart(2,'0')+'-'+ st.getDate().toString().padStart(2,'0');
              // this.selected_order.starttime.time.HH = st.getHours().toString().padStart(2,'0');
              // this.selected_order.starttime.time.mm = st.getMinutes().toString().padStart(2,'0');

              // this.selected_order.endtime.date = et.getFullYear()+'-'+(et.getMonth()+1).toString().padStart(2,'0')+'-'+ et.getDate().toString().padStart(2,'0');
              // this.selected_order.endtime.time.HH = et.getHours().toString().padStart(2,'0');
              // this.selected_order.endtime.time.mm = et.getMinutes().toString().padStart(2,'0');

              // this.Is_order_data_show =true;
            }
          })
        ],
        height: 700,
        list: {
          rows: $.extend(true, {}, this.rows),
          columns: this.columns,
          toggle: {
            display: false
          },
        },
        chart: {
          items: this.chart_items,
          time: {
            from: this.from_time,
            to: this.end_time,
            period: 'hour',
            maxWidth: {}

          },
        },
        components: {

        }
      }
    },
    rows: function() {
      if (this.line == 'A 線') {
        let new_row = {}
        for (let i=0;i<15;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row['A'+num] = { 'id': 'A'+num, label: 'A'+num }
        }
        return new_row
      }
      else if (this.line == 'B 線') {
        let new_row = {}
        for (let i=0;i<14;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row['B'+num] = { 'id': 'B'+num, label: 'B'+num }
        }
        return new_row
      }
      else if (this.line == 'C 線') {
        let new_row = {}
        for (let i=0;i<12;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row['C'+num] = { 'id': 'C'+num, label: 'C'+num }
        }
        return new_row
      }
      else if (this.line == 'D 線') {
        let new_row = {}
        for (let i=0;i<19;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row['D'+num] = { 'id': 'D'+num, label: 'D'+num }
        }
        return new_row
      }
      else if (this.line == 'E 線') {
        let new_row = {}
        for (let i=0;i<21;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row['E'+num] = { 'id': 'E'+num, label: 'E'+num }
        }
        return new_row
      }
      else if (this.line == 'F 線') {
        let new_row = {}
        for (let i=0;i<17;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row['F'+num] = { 'id': 'F'+num, label: 'F'+num }
        }
        return new_row
      }
      else if (this.line == 'G 線') {
        let new_row = {}
        for (let i=0;i<9;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          new_row['G'+num] = { 'id': 'G'+num, label: 'G'+num }
        }
        return new_row
      }
    }
  },
  methods: {
    onState(state) {
      this.state = state;
      // console.log(state)
      subs.push(
        state.subscribe("config.chart.items.1", item => {
          // console.log("item 1 changed", item);
        })
      );
      subs.push(
        state.subscribe("config.list.rows.1", row => {
          // console.log("row 1 changed", row);
        })
      );
      subs.push(
        // state.subscribe("config.plugin.Selection", item => {
        //   if (!item || !item.item) return;
        //   console.log("ItemMovement", item);
        // })
      );
      // state.subscribe("config.plugin.ItemMovement", item => {
      //   // console.log(state)
      //     if (!item || !item.item) return;
      //     let move = item.movement
      //     if (move) {
      //       // console.log(move)
      //       if (move.moving && move.waiting) console.log('Start Moving',item.item)
      //       else if (!move.moving && !move.waiting) console.log('Stop moving')
      //     }
      //     // console.log("ItemMovement", item.movement);
      //   })
    },
    click() {
      // console.log(arguments)
    },
    addRow(){
      // this.dialogVisible = true
      this.$set(this.chart_items,this.new_row.id,{
        id: this.new_row.id,
        label: this.new_row.label,
        rowId: this.new_row.rowId,
        time: {
          start: new Date(this.new_row.time.start).getTime(),
          end: new Date(this.new_row.time.end).getTime() + 24 * 60 * 60 * 1000
        },
        style: item_style
      })
      // this.chart_items[this.new_row.id] = {
      //   id: this.new_row.id,
      //   label: this.new_row.label,
      //   rowId: this.new_row.rowId,
      //   time: {
      //     start: new Date(this.new_row.time.start).getTime(),
      //     end: new Date(this.new_row.time.end).getTime() + 24 * 60 * 60 * 1000
      //   }
      // }
      // this.$forceUpdate()
      this.dialogVisible = false
      console.log(this.chart_items)
    },
    deleteRow() {
      console.log(this.chart_items[this.selected_order.id])
      delete this.chart_items[this.selected_order.id]
      this.$set(this.chart_items,this.selected_order.id,{})
    },
    dataToGantt() {
      // console.log(this.line[0])
      // id:'',
      // machine_ton:'',          // 噸位
      // machine_NO:'',           // 機台號
      // mold_NO:'',              // 模號
      // mold_Serial:'',          // 模序
      // mold_hole:'',            // 模穴
      // UPH:'',                  // UPH
      // mold_position:'',        // 模具儲位
      // product_name:'',         // 品名
      // plan_number:0,           // 數量
      // plastic_Part_NO:'',      // 塑膠料號
      // plastic_color:'',        // 顏色
      // machine_state:'',
      // machine_repair_time:'',
      // plan_work_time: '',       // 計畫工時
      // plan_s_time: '',
      // plan_e_time: '',
      // mold_down_t: '',
      planPreview(undefined,this.line[0]).then((response)=>{
        let data = response.data.data
        for (let i=0;i<data.length;i++) {
          console.log(data[i])
          this.$set(this.chart_items,i,{
            id: i,
            label: data[i].Part_NO,
            rowId: data[i].machine_NO,
            machine_ton: data[i].machine_ton,
            mold_NO: data[i].mold_NO,
            mold_Serial: data[i].mold_Serial,
            UPH: data[i].UPH,
            mold_position: data[i].mold_position,
            product_name: data[i].product_name,
            plan_number: data[i].plan_number,
            plastic_Part_NO: data[i].plastic_Part_NO,
            plastic_color: data[i].plastic_color,
            plan_work_time: data[i].plan_work_time,
            mold_down_t: data[i].mold_down_t,
            time: {
              start: new Date(data[i].plan_s_time).getTime(),
              end: new Date(data[i].plan_e_time).getTime()
            },
            style: item_style
          })
        }
      })
    },
    timeAdd() {
      this.from_time = this.from_time + 24 * 60 * 60 * 1000;
      this.end_time = this.end_time + 24 * 60 * 60 * 1000;
    },
    timeMinus() {
      this.from_time = this.from_time - 24 * 60 * 60 * 1000;
      this.end_time = this.end_time - 24 * 60 * 60 * 1000;
    },
    toDate(time) {
      let year = new Date(time).getFullYear()
      let month = new Date(time).getMonth()+1
      let date = new Date(time).getDate()
      let hour = new Date(time).getHours()
      return year+'-'+month+'-'+date+' '+hour+':00:00'
    }
  },
  mounted() {
    this.dataToGantt();
    // setTimeout(() => {
    //   const item1 = this.config.chart.items["1"];
    //   item1.label = "label changed dynamically";
    //   item1.time.end += 2 * 24 * 60 * 60 * 1000;
    // }, 2000);
  },
  beforeDestroy() {
    // subs.forEach(unsub => unsub());
  }
};
</script>