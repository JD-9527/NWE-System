<template>
  <div>
    <el-row
      class="header-row"
      type="flex"
      align="middle"
    >
      <el-col :span="8">
        NWE {{ $route.params.line }}機台狀態看板
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
        <el-badge value="!" :hidden="!machine.show">
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
        <el-badge value="!" :hidden="!machine.show">
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
        <el-badge value="!" :hidden="!machine.show">
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
      v-if="$route.params.line == 'D10'"
    >
      <el-col
        v-for="machine in machinesD"
        :key="machine.name"
        :span="1"
      >
        <el-badge value="!" :hidden="!machine.show">
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
              align="top"
            >
              <el-col :span="4">
                <div class="message-subtitle">
                  狀態
                </div>
                <div>
                  調機
                </div>
              </el-col>
              <el-col :span="4">
                <div class="message-subtitle">
                  負責人
                </div>
                <div>
                  小賀
                </div>
              </el-col>
              <el-col :span="16">
                <el-row class="progress-bar-text">
                  <el-col
                    v-for="detail in new_machine_message"
                    :key="detail.status"
                    :style="'width: '+ detail.percent.toString() + '%;'"
                  >
                    <span>{{ detail.status }}</span>
                    <div
                      :class="'grid-content '+ progressColor(detail.status)"
                      style="font-weight: bold"
                    >
                      <span>{{ detail.value }}</span>
                    </div>
                    <div style="font-size: 9px; font-weight: bold;">{{ detail.percent + '%' }}</div>
                  </el-col>
                </el-row>
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
              <el-col :span="5">
                <div class="message-subtitle">
                  工單編號
                </div>
                <div>
                  {{ now_work_order.no }}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="message-subtitle">
                  工單負責人
                </div>
                <div>
                  {{ now_work_order.owner }}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="message-subtitle">
                  模具編號
                </div>
                <div>
                  {{ now_work_order.mod_no }}
                </div>
              </el-col>
              <el-col :span="9">
                <div class="message-subtitle">
                  料號
                </div>
                <div>
                  {{ now_work_order.part_no }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <div class="message-subtitle">
                  實際開始時間
                </div>
                <div>
                  {{ now_work_order.start_time }}
                </div>
              </el-col>
              <el-col :span="14">
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
                  {{ produce_message.good_rate }} %
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

<style scoped>
.item {
  /*font-size: 36px; */
  border-color: #fff;
  border-width: 2px;
  padding: 0;
}
.item:hover {
  /*font-size: 36px; */
  border-color: #123456;
  border-width: 2px;
  padding: 0;
}
.message {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
  /*padding: 10px 20px 0;*/
}
.grid-content {
  border-radius: 4px;
  min-height: 18px;
}
.progress-bar-text {
  display: inline;
  text-align: center;
  font-weight: normal;
  font-size: 14px;
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
.el-row {
  margin-bottom: 8px;
}
.legend {
  font-size: 16px;
}
</style>

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
  {status: '稼動率', value: '3.8/5', percent: 76},
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
    expect: '40,000',
    real: '28,000',
    good: '27,000',
    bad: '500',
    fix: '500'
  },
  good_rate: 99.99,
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
    machines: [],
    machinesB: [],
    machinesC: [],
    machinesD: [],
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
          tmp = "color: #F50000;";
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
    convertProgess() {
      let sum = 0
      let data = this.machine_message.detail
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
      if (data == '稼動率') {
        return 'color-green'
      }
      else if (data == '維修') {
        return 'color-red'
      }
      else if (data == '調機') {
        return 'color-orange'
      }
    },
    getMachineState(line) {
      const url='http://10.124.131.87:8880/Overview/machine/board//?line='
      this.$http.get(url+line).then((response)=>{
        let data=response.data.data
        for (let i=0;i<data.length;i++) {
          let line_cate=data[i].name.slice(0,1)
          if (line_cate == 'A' || line_cate == 'E') {
            // this.machines = []
            this.machines.push({
              name: data[i].name,
              status: data[i].status,
              show: data[i].show
            })
          }
          if (line_cate == 'B' || line_cate == 'F') {
            // this.machinesB = []
            this.machinesB.push({
              name: data[i].name,
              status: data[i].status,
              show: data[i].show
            })
          }
          if (line_cate == 'C' || line_cate == 'G') {
            // this.machinesC = []
            this.machinesC.push({
              name: data[i].name,
              status: data[i].status,
              show: data[i].show
            })
          }
          if (line_cate == 'D') {
            // this.machinesD = []
            this.machinesD.push({
              name: data[i].name,
              status: data[i].status,
              show: data[i].show
            })
          }
        }
      })
    }
  },
  mounted() {
    this.getMachineState(this.$route.params.line)
  },
  computed: {
  }
};
</script>
