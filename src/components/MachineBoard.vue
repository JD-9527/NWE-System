<template>
  <div>
    <el-row 
      class="header-row"
      type="flex" 
      align="middle"
    >
      <el-col :span="8">
        NWE D10機台狀態看板
      </el-col>
      <el-col :span="13" :push="2">
        <el-row 
          type="flex" 
          align="bottom"
          justify="end"
        >
          <el-col 
            :span="4"
            v-for="legend in legends"
            :key="legend.name"
          >
            <el-button 
              type="text" 
              :style="statusToColor(legend)" 
              class="legend"
              @click="legendClick(legend.status)"
            >
              <font-awesome-icon 
                :icon="['fas','square']" 
              ></font-awesome-icon>
              <span style="color: #333">{{ legend.name }}</span>
            </el-button>
           </el-col>
         </el-row>
      </el-col>
    </el-row>
    <el-row 
      :gutter="20"
      type="flex" 
    >
      <el-col 
        v-for="machine in machines" 
        :key="machine.name"
        :span="1"
      >
        <el-badge value="!" :hidden="hidden">
          <el-button 
            type="text" 
            @click="onClick(machine)"
          >
            <el-card 
              class="item" 
              shadow="never" 
              :style="statusToColor(machine)"
              :body-style="{ padding: '0' }"
            >
              <font-awesome-icon 
                :icon="['fas','server']" 
                size="3x"
              ></font-awesome-icon>
              <div style="font-size: 24px; color: #333;">{{ machine.name }}</div>
            </el-card>
          </el-button>
        </el-badge>
      </el-col>
    </el-row>
    <el-row 
      :gutter="20"
      type="flex" 
    >
      <el-col 
        v-for="machine in machinesB" 
        :key="machine.name"
        :span="1"
      >
        <el-badge value="!" :hidden="hidden">
          <el-button 
            type="text" 
            @click="onClick(machine)"
          >
            <el-card 
              class="item" 
              shadow="never" 
              :style="statusToColor(machine)"
              :body-style="{ padding: '0' }"
            >
              <font-awesome-icon 
                :icon="['fas','server']" 
                size="3x"
              ></font-awesome-icon>
              <div style="font-size: 24px; color: #333;">{{ machine.name }}</div>
            </el-card>
          </el-button>
        </el-badge>
      </el-col>
    </el-row>
    <el-row 
      :gutter="20"
      type="flex" 
    >
      <el-col 
        v-for="machine in machinesC" 
        :key="machine.name"
        :span="1"
      >
        <el-badge value="!" :hidden="hidden">
          <el-button 
            type="text" 
            @click="onClick(machine)"
          >
            <el-card 
              class="item" 
              shadow="never" 
              :style="statusToColor(machine)"
              :body-style="{ padding: '0' }"
            >
              <font-awesome-icon 
                :icon="['fas','server']" 
                size="3x"
              ></font-awesome-icon>
              <div style="font-size: 24px; color: #333;">{{ machine.name }}</div>
            </el-card>
          </el-button>
        </el-badge>
      </el-col>
    </el-row>
    <el-row 
      :gutter="20"
      type="flex" 
    >
      <el-col 
        v-for="machine in machinesD" 
        :key="machine.name"
        :span="1"
      >
        <el-badge value="!" :hidden="machine.show">
          <el-button 
            type="text" 
            @click="onClick(machine)"
          >
            <el-card 
              class="item" 
              shadow="never" 
              :style="statusToColor(machine)"
              :body-style="{ padding: '0' }"
            >
              <font-awesome-icon 
                :icon="['fas','server']" 
                size="3x"
              ></font-awesome-icon>
              <div style="font-size: 24px; color: #333;">{{ machine.name }}</div>
            </el-card>
          </el-button>
        </el-badge>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-card shadow="never" style="margin-bottom: 20px;">
          <div slot="header" class="clearfix">
            <span class="message-row">機台訊息</span>
          </div>
          <div class="message">
            <el-row
              type="flex"
              justify="center"
              align="bottom"
            >
              <el-col :span="6">
                <div class="message-subtitle">
                  狀態
                </div>
                <div>
                  調機 
                </div>
              </el-col>
              <el-col :span="6">
                <div class="message-subtitle">
                  負責人
                </div>
                <div>
                  小賀 
                </div>
              </el-col>
              <el-col :span="12">
                <div class="progress">
                  <div 
                    class='progress-bar color-none'
                    role="progressbar" 
                    v-for="detail in new_machine_message"
                    :key="detail.status"
                    :style="'width: '+ detail.percent.toString() + '%;'" 
                    :aria-valuenow="detail.percent"
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  > {{ detail.status }} </div>
                </div>
                <div class="progress">
                  <div 
                    :class="'progress-bar '+progressColor(detail.status) " 
                    role="progressbar" 
                    v-for="detail in new_machine_message"
                    :key="detail.status"
                    :style="'width: '+ detail.percent.toString() + '%;'" 
                    :aria-valuenow="detail.percent"
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  > {{ detail.value }} </div>
                </div>
                <div class="progress">
                  <div 
                    class='progress-bar color-none'
                    role="progressbar" 
                    v-for="detail in new_machine_message"
                    :key="detail.status"
                    :style="'width: '+ detail.percent.toString() + '%;'" 
                    :aria-valuenow="detail.percent"
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  > {{ detail.percent.toString() + '%' }} </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card shadow="never" >
          <div slot="header" class="clearfix">
            <span class="message-row">工單、塑料訊息</span>
          </div>
          <div class="message">
            <el-row>
              <el-col :span="6">
                <div class="message-subtitle">
                  工單編號
                </div>
                <div>
                  {{ now_work_order.no }} 
                </div>
              </el-col>
              <el-col :span="6">
                <div class="message-subtitle">
                  工單負責人
                </div>
                <div>
                  {{ now_work_order.owner }} 
                </div>
              </el-col>
              <el-col :span="6">
                <div class="message-subtitle">
                  模具編號
                </div>
                <div>
                  {{ now_work_order.mod_no }} 
                </div>
              </el-col>
              <el-col :span="6">
                <div class="message-subtitle">
                  料號
                </div>
                <div>
                  {{ now_work_order.part_no }} 
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="message-subtitle">
                  實際開始時間
                </div>
                <div>
                  {{ now_work_order.start_time }} 
                </div>
              </el-col>
              <el-col :span="12">
                <div class="message-subtitle">
                  計畫完成時間
                </div>
                <div>
                  {{ now_work_order.end_time }} 
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" >
          <div slot="header" class="clearfix">
            <span class="message-row">生產訊息</span>
          </div>
          <div class="message">
            <el-row>
              <el-col class="message-subtitle">
                <div>
                  生產狀況
                </div>
                <el-card shadow="never">
                  <el-row
                    type="flex"
                    justify="center"
                    align="bottom"
                  >
                    <el-col :span="6">
                      <div class="message-subtitle">
                        預計
                      </div>
                      <div class="message">
                        {{ produce_message.produce_status.expect }} 
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="message-subtitle">
                        實際
                      </div>
                      <div class="message">
                        {{ produce_message.produce_status.real }}  
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="message-subtitle">
                        良品
                      </div>
                      <div class="message">
                        {{ produce_message.produce_status.good }}  
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="message-subtitle">
                        不良品
                      </div>
                      <div class="message">
                        {{ produce_message.produce_status.bad }}  
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="message-subtitle">
                        調機損耗
                      </div>
                      <div class="message">
                        {{ produce_message.produce_status.fix }}  
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="message-subtitle">
                  良品率
                </div>
                <div>
                  {{ produce_message.good }} %
                </div>
              </el-col>
              <el-col :span="8">
                <div class="message-subtitle">
                  週期時間(s) (預計/實際)
                </div>
                <div>
                  {{ produce_message.cycle_time }}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="message-subtitle">
                  剩餘生產時間(h)
                </div>
                <div>
                  {{ produce_message.left_time }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="message-subtitle">
                  預計完成時間
                </div>
                <div>
                  {{ produce_message.end_time }}
                </div>
              </el-col>
              <el-col :span="12">
                <div class="message-subtitle">
                  維修成本(RMB) (單機成本/總成本)
                </div>
                <div>
                  {{ produce_message.pay }}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const legends = [
  { name:'正常', status: 0 },
  { name:'待機', status: 1 },
  { name:'調機', status: 2 },
  { name:'維修', status: 3 },
  { name:'修模待機', status: 4 },
  { name:'換模', status: 5 },
  { name:'斷線', status: 6 },
];
let machines = [
  { name:'A01', status: 0, show: true},
  { name:'A02', status: 2, show: true},
  { name:'A03', status: 2, show: true},
  { name:'A04', status: 0, show: true},
  { name:'A05', status: 0, show: true},
  { name:'A06', status: 2, show: true},
  { name:'A07', status: 2, show: true},
  { name:'A08', status: 0, show: true},
  { name:'A09', status: 3, show: true},
  { name:'A10', status: 2, show: true},
  { name:'A11', status: 2, show: true},
  { name:'A12', status: 1, show: true},
  { name:'A13', status: 1, show: true},
  { name:'A14', status: 1, show: true},
  { name:'A15', status: 6, show: true},
];
let machinesB = [
  { name:'B01', status: 0, show: true},
  { name:'B02', status: 2, show: true},
  { name:'B03', status: 2, show: true},
  { name:'B04', status: 0, show: true},
  { name:'B05', status: 0, show: true},
  { name:'B06', status: 2, show: true},
  { name:'B07', status: 2, show: true},
  { name:'B08', status: 0, show: true},
  { name:'B09', status: 3, show: true},
  { name:'B10', status: 2, show: true},
  { name:'B11', status: 2, show: true},
  { name:'B12', status: 1, show: true},
  { name:'B13', status: 1, show: true},
  { name:'B14', status: 1, show: true},
];
let machinesC = [
  { name:'C01', status: 0, show: true},
  { name:'C02', status: 2, show: true},
  { name:'C03', status: 2, show: true},
  { name:'C04', status: 0, show: true},
  { name:'C05', status: 0, show: true},
  { name:'C06', status: 2, show: true},
  { name:'C07', status: 2, show: true},
  { name:'C08', status: 0, show: true},
  { name:'C09', status: 3, show: true},
  { name:'C10', status: 2, show: true},
  { name:'C11', status: 2, show: true},
  { name:'C12', status: 1, show: true},
];
let machinesD = [
  { name:'D01', status: 0, show: true},
  { name:'D02', status: 2, show: true},
  { name:'D03', status: 2, show: true},
  { name:'D04', status: 0, show: true},
  { name:'D05', status: 0, show: true},
  { name:'D06', status: 2, show: true},
  { name:'D07', status: 2, show: true},
  { name:'D08', status: 0, show: true},
  { name:'D09', status: 3, show: true},
  { name:'D10', status: 2, show: true},
  { name:'D11', status: 2, show: true},
  { name:'D12', status: 1, show: true},
  { name:'D13', status: 1, show: true},
  { name:'D14', status: 1, show: true},
  { name:'D15', status: 6, show: true},
  { name:'D16', status: 0, show: true},
  { name:'D17', status: 2, show: true},
  { name:'D18', status: 1, show: true},
  { name:'D19', status: 6, show: true},
];
let machine_show = [true,true,true,true,true,true,true]
let machine_message = {
  status: '調機',
  owner: '小賀',
  detail: [
    {status: '正常', value: 3.8},
    {status: '維修', value: 0.6},
    {status: '調機', value: 0.6},
    {status: '休模待機', value: 0}
  ]
}
let new_machine_message=[
  {status: '正常', value: '3.8/5', percent: 76},
  {status: '維修', value: '0.6/5', percent: 12},
  {status: '調機', value: '0.6/5', percent: 12},
]
let now_work_order = {
  no: '611484207',
  owner: '小讚',
  mod_no: 'NP16735',
  part_no: '700-234232-01WB',
  start_time: '2019/11/10 15:35:59',
  end_time: '2019/11/30 15:12:24'
}
let produce_message = {
  produce_status: {
    expect: '40.000',
    real: '28,000',
    good: '27,000',
    bad: '500',
    fix: '500'
  },
  good: 99.99,
  cycle_time: '57.00s / 42.51s',
  left_time: 43.07,
  end_time: '2019/11/30 05:49:36',
  pay: '300RMB / 24,567RMB'
}
export default {
  name: 'MachineBoard',
  data: () => ({
    hidden: true,
    style: "",
    machines: machines,
    machinesB: machinesB,
    machinesC: machinesC,
    machinesD: machinesD,
    legends: legends,
    machine_show: machine_show,
    machine_message: machine_message,
    new_machine_message: new_machine_message,
    now_work_order: now_work_order,
    produce_message: produce_message
    // progress_width: this.progressWidth(new_machine_message)
    // activeMachines: this.showActiveMachine(this.machines,this.machine_show),
  }),
  methods: {
    onClick(params) {
      // eslint-disable-next-line no-console
      console.log(params.name)
    },
    legendClick(index){
      // eslint-disable-next-line no-console
      console.log(this.machine_show)
      this.machine_show[index] = !this.machine_show[index]
    },
    statusToColor(data) {
      let tmp
      switch (data.status) {
        case 0:
          tmp = "color: #17ba6a;";
          break;
        case 1:
          tmp = "color: #f7e31d;";
          break;
        case 2:
          tmp = "color: #f7921d;";
          break;
        case 3:
          tmp = "color: #FF0000;";
          break;
        case 4:
          tmp = "color: #3030FF;";
          break;
        case 5:
          tmp = "color: #990DFF;";
          break;
        case 6:
          tmp = "color: #909399;";
          break;
        default:
          tmp = "color: #17ba6a;";
          break;
      }
      return tmp;
    },
    showActiveMachine (machine,machine_show) {
      for (let i=0;i<machine.length;i++) {
        machine[i].show = machine_show[machine[i].status]
      }
      let new_machine_list = []
      machine.forEach((data) => {
        if (data.show === true) {
          new_machine_list.push(data)
        }
      })
      return new_machine_list
    },
    convertProgess(data) {
      let sum = 0
      let new_data = []
      for (let i=0;i< data.length;i++) {
        sum += data[i].value
      }
      for (let i=0;i< data.length;i++) {
        new_data.push({
          status: data[i].status,
          value: data[i].value.toString() + '/' + sum.toString(),
          percent: (data[i].value/sum)*100
        })
      }
      return new_data
    },
    progressColor(data) {
      if (data == '正常') {
        return 'color-green'
      }
      else if (data == '維修') {
        return 'color-red'
      } 
      else if (data == '調機') {
        return 'color-orange'
      }
    }
  },
  computed: {
    // progressWidth: function() {
    //   return this.new_machine_message
    // }
  }
};
</script>

<style scoped>
.item {
  /*font-size: 36px; */
  border-color: #fff;
  padding: 0;
}
.message {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
  /*padding: 10px 20px 0;*/
}
.message-subtitle {
  font-size: 14px;
  margin-bottom: 5px;
  color: #888;
  /*padding: 10px 20px 0;*/
}
.message-row {
  font-size: 20px;
  font-weight:bold;
}
.el-card >>> .el-card__header {
  padding: 10px 20px;
}
.progess-bar-align {
  display:flex;
  align-items:center;
  justify-content:center;
  height:100%;
}
.el-row {
  margin-bottom: 8px;
}
.legend {
  font-size: 16px;
}
.color-green {
  background-color: #17ba6a;
  color: #000;
}
.color-yellow {
  background-color: #f7e31d;
  color: #000;
}
.color-orange {
  background-color: #f7921d;
  color: #000;
}
.color-red {
  background-color: #FF0000;
  color: #000;
}
.color-blue {
  background-color: #3030FF;
  color: #000;
}
.color-purple {
  background-color: #990DFF;
  color: #000;
}
.color-grey {
  background-color: #909399;
  color: #000;
}
.color-none {
  background-color: #fff;
  color: #000;
  font-size: 14px;
}
</style>
