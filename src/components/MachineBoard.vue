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
      <el-col
        :span="3"
      >
        <el-select
          v-model="line"
          :placeholder="$route.params.line == 'D10'? 'D10 - 1F': 'D9 - 1F'"
          size="small"
        >
          <el-option
            v-for="item in lines"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="13">
        <el-row
          type="flex"
          align="bottom"
          justify="end"
        >
          <el-col
            :span="3"
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
    <el-row :gutter="30" v-show="!machineDetail">
      <el-col :span="12">
        <el-card shadow="never" style="margin-bottom: 20px;">
          <div slot="header" class="clearfix" style="display: flex;">
            <span class="message-row">{{ current }} 機台訊息</span>
            <div style="flex-grow: 1"></div>
            <el-button
              round size="mini"
              v-show="isShowStopButton"
              @click="trigger()"
            >
              停止機台
            </el-button>
          </div>
          <div class="message" v-show="current != ''">
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
                  {{ machineInfo.status }}
                </div>
              </el-col>
              <el-col :span="4">
                <div class="message-subtitle">
                  負責人
                </div>
                <div>
                  {{ machineInfo.owner }}
                </div>
              </el-col>
              <el-col :span="16">
                <el-tooltip
                  v-for="detail in new_machine_message"
                  :key="detail.status"
                  placement="top"
                  effect="dark"
                >
                  <div slot="content" style="text-align: center;">
                    {{detail.status}}<br/>{{detail.value + ' (min)'}}
                  </div>
                  <div
                    :style="'width: '+ detail.width + '%;'"
                    :class="'progress-bar '+ progressColor(detail.status)"
                    style="font-weight: bold; margin-top: 20px; cursor: pointer;"
                    @click="machineDetail = !machineDetail"
                  >
                    <span>{{ detail.value }}</span>
                  </div>
                </el-tooltip>
                <div>
                  <div
                    v-for="detail in new_machine_message"
                    :key="detail.status"
                    :style="'width: '+ detail.width + '%;'"
                    class="progress-bar"
                    style="font-weight: bold"
                  >
                    <span style="font-size: 9px; font-weight: bold;">{{ detail.percent + '%' }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card shadow="never" >
          <div slot="header" class="clearfix">
            <span class="message-row">工單、塑料訊息</span>
          </div>
          <div class="message" v-show="current != ''">
            <el-row>
              <el-col :span="5">
                <div class="message-subtitle">
                  工單編號
                </div>
                <div>
                  {{ now_work_order.work_list_no }}
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
                  {{ now_work_order.mold_no }}
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
                  計畫開始時間
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
                  {{ now_work_order.planned_end_time }}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" >
          <div slot="header" class="clearfix">
            <span class="message-row">
              {{ infoTitle }}
            </span>
          </div>
          <div class="message" v-show="current != '' && statusCode.indexOf(currentStatus) != -1">
            <el-row>
              <el-col :span="12">
                <div class="message-subtitle">
                  {{ machineStatus }}開始時間
                </div>
                <div>
                  12:40:32
                </div>
              </el-col>
            </el-row>
            <span class="message-row">{{ machineStatus }}接單訊息</span>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="8">
                <div class="message-subtitle">
                  {{ machineStatus }}負責人
                </div>
                <div>
                  小賀
                </div>
              </el-col>
              <el-col :span="8">
                <div class="message-subtitle">
                  單號
                </div>
                <div>
                  4324234
                </div>
              </el-col>
              <el-col :span="8">
                <div class="message-subtitle">
                  單據性質
                </div>
                <div>
                  {{ machineStatus }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="message-subtitle">
                  {{ machineStatus }}接單時間
                </div>
                <div>
                  12:40:32
                </div>
              </el-col>
              <el-col :span="12">
                <div class="message-subtitle">
                  {{ machineStatus }}持續時間(min)
                </div>
                <div>
                  124.4
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="message" v-show="current != '' && statusCode.indexOf(currentStatus) == -1">
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
                        {{ produce_message.info.expected }}
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="message-subtitle">
                        實際
                      </div>
                      <div class="message">
                        {{ produce_message.info.real }}
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="message-subtitle">
                        良品
                      </div>
                      <div class="message">
                        {{ produce_message.info.good }}
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="message-subtitle">
                        不良品
                      </div>
                      <div class="message">
                        {{ produce_message.info.NG }}
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="message-subtitle">
                        調機損耗
                      </div>
                      <div class="message">
                        {{ produce_message.info.adj_total }}
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
                  {{ produce_message.good_rate }}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="message-subtitle">
                  週期時間(s) (預計/實際)
                </div>
                <div>
                  {{ produce_message.CT }}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="message-subtitle">
                  剩餘生產時間(h)
                </div>
                <div>
                  {{ produce_message.lasttime }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="message-subtitle">
                  實際開始時間
                </div>
                <div>
                  {{ produce_message.real_s_time }}
                </div>
              </el-col>
              <el-col :span="12">
                <div class="message-subtitle">
                  實際完成時間
                </div>
                <div>
                  {{ produce_message.real_e_time }}
                </div>
              </el-col>
              <!-- <el-col :span="12">
                <div class="message-subtitle">
                  維修成本(RMB) (單機成本/總成本)
                </div>
                <div>
                  {{ produce_message.pay }}
                </div>
              </el-col> -->
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="30" v-show="machineDetail">
      <el-col>
        <el-card shadow="never" style="margin-bottom: 20px;">
          <div slot="header" class="clearfix" style="display: flex;">
            <span class="message-row">{{ current }} 生產紀錄</span>
            <div style="flex-grow: 1"></div>
            <el-button
              v-show="machineDetail"
              @click="machineDetail = !machineDetail"
              size="mini"
              type="text"
            >返回</el-button>
          </div>
          <div class="message">
            <div style="padding: 15px 10px; ">
              <div class="boarder">
                <div style=" background: #ddd; height: 18px; border-radius: 5px;">
                  <el-tooltip
                    placement="top"
                    v-for="(item,index) in machineDetailTime"
                    :key="index"
                  >
                    <div slot="content" style="text-align: center;">
                      {{item.name}}<br/>{{item.time + ' min'}}
                    </div>
                    <div
                      :class="color(item.status)"
                      :style="'width:' + item.width + '%'"
                    ></div>
                  </el-tooltip>
                </div>
              </div>
            </div>
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
.progress-bar {
  display: inline-block;
  border-radius: 4px;
  min-height: 18px;
  text-align: center;
  font-size: 14px;
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
.boarder {
  border-left: 1px solid #333;
  border-bottom: 1px solid #333;
  padding-top:5px;
  height: 25px;
}
</style>

<script>
import { overviewMachineBoard, overviewMachineInfo, overviewMachineStop,
         overviewMachineWorkList, overviewMachineProduceInfo, overviewMachineInfoDetail } from '../api.js'
const legends = [
  { name:'正常', status: 0 },
  { name:'換模', status: 1 },
  { name:'待機', status: 2 },
  { name:'斷線', status: 3 },
  { name:'調機', status: 4 },
  { name:'維修', status: 5 },
  { name:'修模待機', status: 6 },
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
  work_list_no: '611484207',
  owner: '小讚',
  mold_no: 'NP16735',
  part_no: '700-234232-01WB',
  start_time: '2019/11/10 15:35:59',
  planned_end_time: '2019/11/30 15:12:24'
}
let produce_message = {
  info: {
    expected: '40,000',
    real: '28,000',
    good: '27,000',
    NG: '500',
    adj_total: '500'
  },
  good_rate: 99.99,
  CT: '57.00s / 42.51s',
  lasttime: 43.07,
  plan_e_time: '2019/11/30 05:49:36',
  // pay: '300RMB / 24,567RMB'
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
    line: '',
    lines: ['D9 - 1F','D10 - 1F'],
    legends: legends,
    machine_show: machine_show,
    machine_message: machine_message,
    new_machine_message: new_machine_message,
    now_work_order: now_work_order,
    produce_message: produce_message,
    current: '',
    currentStatus: 3,
    statusCode: [5,6],
    machineInfo: {},
    machineDetail: false,
    machineDetailTime: []
  }),
  watch: {
    line: function() {
      if (this.line == 'D10 - 1F') {
        // eslint-disable-next-line no-console
        this.$router.push('/overview/machine/D10').catch(()=> console.log('Push Error!'))
        // 初始化
        this.machines = []
        this.machinesB = []
        this.machinesC = []
        this.machinesD = []
        this.getMachineState('D10');
      }
      else if (this.line == 'D9 - 1F') {
        // eslint-disable-next-line no-console
        this.$router.push('/overview/machine/D9').catch(()=> console.log('Push Error!'))
        // 初始化
        this.machines = []
        this.machinesB = []
        this.machinesC = []
        this.machinesD = []
        this.getMachineState('D9');
      }
    }
  },
  methods: {
    onClick(params) {
      // eslint-disable-next-line no-console
      // console.log(params)
      this.current = params.name
      this.currentStatus = params.status
      this.getMachineInfo(this.current);
      this.getMachineWorkList(this.current);
      this.getMachineProduceInfo(this.current);
      this.getMachineDetailTime(this.current)
    },
    legendClick(index){
      // eslint-disable-next-line no-console
      console.log(this.machine_show)
      this.machine_show[index] = !this.machine_show[index]
    },
    statusToColor(data) {
      let tmp
      switch (data.status) {
        case 0:  //正常
          tmp = "color: #17ba6a;";
          break;
        case 1: // 換模
          tmp = "color: #990DFF;";
          break;
        case 2:  // 待機
          tmp = "color: #f7e31d;";
          break;
        case 3:  // 斷線
          tmp = "color: #909399;";
          break;
        case 4: // 調機
          tmp = "color: #f7921d;";
          break;
        case 5: // 維修
          tmp = "color: #F50000;";
          break;
        case 6: // 修模待機
          tmp = "color: #3030FF;";
          break;
        default:
          tmp = "color: #909399;";
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
      else if (data == '修模') {
        return 'color-blue'
      }
      else if (data == '調機') {
        return 'color-orange'
      }
      else if (data == '換模') {
        return 'color-purple'
      }
      else if (data == '斷線') {
        return 'color-grey'
      }
      else if (data == '待機') {
        return 'color-yellow'
      }
    },
    color: function(data) {
      switch (data) {
        case 0:
          return 'progress-bar color-green'
        case 1:
          return 'progress-bar color-purple'
        case 2:
          return 'progress-bar color-yellow'
        case 3:
          return 'progress-bar color-grey'
        case 4:
          return 'progress-bar color-orange'
        case 5:
          return 'progress-bar color-red'
        case 6:
          return 'progress-bar color-blue'
        default:
          return 'progress-bar color-grey'
      }
    },
    getMachineState(line) {
      overviewMachineBoard(line).then((response)=>{
        this.machines = []
        this.machinesB = []
        this.machinesC = []
        this.machinesD = []
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
    },
    getMachineInfo(machine) {
      overviewMachineInfo(machine).then(response => {
        let data = response.data
        this.machineInfo.owner = data.owner
        switch (data.status) {
          case 0:
            this.machineInfo.status = '正常'
            break
          case 1:
            this.machineInfo.status = '換模'
            break
          case 2:
            this.machineInfo.status = '待機'
            break
          case 3:
            this.machineInfo.status = '斷線'
            break
          case 4:
            this.machineInfo.status = '調機'
            break
          case 5:
            this.machineInfo.status = '維修'
            break
          case 6:
            this.machineInfo.status = '修模待機'
            break
          case 7:
            this.machineInfo.status = '維修+修模'
            break
          default:
            this.machineInfo.status = '斷線'
            break
        }
        // let new_machine_message=[
        //   {status: '稼動率', value: '3.8/5', percent: 76},
        //   {status: '維修', value: '0.6/5', percent: 12},
        //   {status: '調機', value: '0.6/5', percent: 12},
        // ]
        let tmp = []
        let math = 0        //儲存目前寬度（進度條寬度計算）
        Object.keys(data).forEach(key => {
          if (key != 'status' || key != 'owner') {
            let val = data[key] + '/' + data.total
            // 原利用百分比計算進度條寬度
            let perc = Math.round((data[key]/data.total) * 100)
            // 若百分比小於一定數字進度條會變很難看，所以額外新增進度條寬度計算
            // 百分比小於5，則用５，並加到math變數，計算目前已有的總寬度，若下次寬度計算後會超過100%，則只用100-math
            let widths = perc>5? perc: 5
            widths = (math + widths > 100? 100-math: widths)
            switch (key) {
              case 'utilization':
                tmp.push({
                  status: '稼動率',
                  value: val,
                  percent: perc,
                  width: widths
                })
                math += widths
                break
              case 'changeover':
                tmp.push({
                  status: '換模',
                  value: val,
                  percent: perc,
                  width: widths
                })
                math += widths
                break
              case 'waiting':
                tmp.push({
                  status: '待機',
                  value: val,
                  percent: perc,
                  width: widths
                })
                math += widths
                break
              case 'offline':
                tmp.push({
                  status: '斷線',
                  value: val,
                  percent: perc,
                  width: widths
                })
                math += widths
                break
              case 'adj':
                tmp.push({
                  status: '調機',
                  value: val,
                  percent: perc,
                  width: widths
                })
                math += widths
                break
              case 'repair':
                tmp.push({
                  status: '維修',
                  value: val,
                  percent: perc,
                  width: widths
                })
                math += widths
                break
              case 'fixmode':
                tmp.push({
                  status: '修模',
                  value: val,
                  percent: perc,
                  width: widths
                })
                math += widths
                break
              case 'repairfixmode':
                tmp.push({
                  status: '維修+修模',
                  value: val,
                  percent: perc,
                  width: widths
                })
                math += widths
                break
            }
          }
        })
        this.new_machine_message = tmp
      })
    },
    getMachineWorkList(machine) {
      overviewMachineWorkList(machine).then(response => {
        let data = response.data
        this.now_work_order = data
      })
    },
    getMachineProduceInfo(machine) {
      overviewMachineProduceInfo(machine).then(response => {
        let data = response.data
        this.produce_message = data
      })
    },
    getMachineDetailTime(machine) {
      overviewMachineInfoDetail(machine).then(response => {
        let data = response.data.data
        let tmp = []
        let math = 0        //儲存目前寬度（進度條寬度計算）
        data.forEach(item => {
          // 原利用百分比計算進度條寬度
          let perc = Math.round((item.time/1440) * 100)
          // 若百分比小於一定數字進度條會變很難看，所以額外新增進度條寬度計算
          // 百分比小於5，則用５，並加到math變數，計算目前已有的總寬度，若下次寬度計算後會超過100%，則只用100-math
          let widths = perc>5? perc: 5
          widths = (math + widths > 100? 100-math: widths)
          switch (item.status) {
            case 0:
              tmp.push({
                name: '正常',
                status: item.status,
                time: item.time,
                width: widths
              })
              math += widths
              break
            case 1:
              tmp.push({
                name: '換模',
                status: item.status,
                time: item.time,
                width: widths
              })
              math += widths
              break
            case 2:
              tmp.push({
                name: '待機',
                status: item.status,
                time: item.time,
                width: widths
              })
              math += widths
              break
            case 3:
              tmp.push({
                name: '斷線',
                status: item.status,
                time: item.time,
                width: widths
              })
              math += widths
              break
            case 4:
              tmp.push({
                name: '調機',
                status: item.status,
                time: item.time,
                width: widths
              })
              math += widths
              break
            case 5:
              tmp.push({
                name: '維修',
                status: item.status,
                time: item.time,
                width: widths
              })
              math += widths
              break
            case 6:
              tmp.push({
                name: '修模',
                status: item.status,
                time: item.time,
                width: widths
              })
              math += widths
              break
          }
        })
        this.machineDetailTime = tmp
      })
    },
    trigger() {
      /* eslint-disable */
      overviewMachineStop(this.current).then(response => {
        this.$message({
          message: '送出停機訊號',
          type: 'success',
          center: true,
          duration: 2000
        });
      })
      .catch(error => {
        this.$message.error({
          message: '發生問題，請聯繫管理員',
          center: true,
          duration: 2000
        });
      })
    },
    timer() {
      // console.log(this.$route.path.substring(0,19))
      if (this.$route.path.substring(0,18) == '/overview/machine/') {
        // if (this.current != '') {
        //   this.getSecurityState(this.current);
        // }
        this.getMachineState(this.$route.params.line)
        setTimeout(()=>{
          this.timer()
        },1000 * 10);
      }
    },
  },
  mounted() {
    // this.getMachineState(this.$route.params.line)
    this.line = this.$route.params.line == 'D10'? 'D10 - 1F': 'D9 - 1F';
    this.timer();
    // this.getMachineInfo();
    // this.getMachineWorkList();
    // this.getMachineProduceInfo();
  },
  computed: {
    infoTitle: function() {
      return this.currentStatus == 5? '維修基本訊息':
             this.currentStatus == 6? '修模基本訊息':
             '生產訊息'
    },
    machineStatus: function() {
      return this.currentStatus == 5? '維修': '修模'
    },
    isShowStopButton: function() {
      return this.current != '' &&
             ( this.$store.getters.roles[0] == 'website_maintainer' ||
               this.$store.getters.roles[0] == 'product_manager' ||
               this.$store.getters.roles[0] == 'dispatcher' )
    }
  }
};
</script>
