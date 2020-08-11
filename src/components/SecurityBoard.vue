<template>
  <div>
    <el-row
      class="header-row"
      type="flex"
      align="middle"
    >
      <el-col :span="8">
        NWE {{ $route.params.line }}機台監控訊息
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
        <el-badge>
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
      <el-col :span="10">
        <el-card shadow="never" style="margin-bottom: 20px;">
          <div slot="header" class="clearfix">
            <span class="message-row">{{ current }} 機台安全訊息</span>
          </div>
          <div class="message"  v-show="current != ''">
            <div class="alarm_box" v-show="machine_state.emergency1_signal != ''">
              <div :style="securityColor(machine_state.emergency1_signal)"></div>
              <div class="alarm_title">急停1 {{ signalStatus(machine_state.emergency1_signal) }}</div>
            </div>
            <div class="alarm_box" v-show="machine_state.emergency2_signal != ''">
              <div :style="securityColor(machine_state.emergency2_signal)"></div>
              <div class="alarm_title">急停2 {{ signalStatus(machine_state.emergency2_signal) }}</div>
            </div>
            <div class="alarm_box" v-show="machine_state.safe_door_total_signal != ''">
              <div :style="securityColor(machine_state.safe_door_total_signal)"></div>
              <div class="alarm_title">安全門聯桿 {{ signalStatus(machine_state.safe_door_total_signal) }}</div>
            </div>
            <div class="alarm_box" v-show="machine_state.safe_door_front_signal != ''">
              <div :style="securityColor(machine_state.safe_door_front_signal)"></div>
              <div class="alarm_title">前安全門聯桿 {{ signalStatus(machine_state.safe_door_front_signal) }}</div>
            </div>
            <div class="alarm_box" v-show="machine_state.safe_door_back_signal != ''">
              <div :style="securityColor(machine_state.safe_door_back_signal)"></div>
              <div class="alarm_title">後安全門聯桿 {{ signalStatus(machine_state.safe_door_back_signal) }}</div>
            </div>
            <img src="../assets/Vsp.png" style="width: 100%;" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card shadow="never" >
          <div slot="header" class="clearfix">
            <span class="message-row">測試訊息</span>
          </div>
          <div class="message" v-show="current != '' ">
            <el-table
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%"
              v-loading="loading"
            >
              <el-table-column
                prop="timestamp"
                label="測試時間"
                width="180"
                align="center"
              >
                <!-- <template slot-scope="scoped">
                  <span>{{ toDate(scoped.row.timestamp) }}</span>
                </template> -->
              </el-table-column>
              <el-table-column
                prop="tester"
                label="測試員"
                width="80"
                align="center">
              </el-table-column>
              <el-table-column
                label="測試結果"
                align="center"
              >
                <template slot-scope="scoped">
                  <div
                    class="door_block"
                    :style="'color:'+ (scoped.row.emergency1_OK == '0'? '#F50000;': '#111;')"
                    v-show="scoped.row.emergency1_OK != ''"
                  >
                    急停1 {{ doorState(scoped.row.emergency1_OK) }}
                  </div>
                  <div
                    class="door_block"
                    :style="'color:'+ (scoped.row.emergency2_OK == '0'? '#F50000;': '#111;')"
                    v-show="scoped.row.emergency2_OK != ''"
                  >
                    急停2 {{ doorState(scoped.row.emergency2_OK) }}
                  </div>
                  <div
                    class="door_block"
                    :style="'color:'+ (scoped.row.safe_door_total_OK == '0'? '#F50000;': '#111;')"
                    v-show="scoped.row.safe_door_total_OK != ''"
                  >
                    安全門聯桿 {{ doorState(scoped.row.safe_door_total_OK) }}
                  </div>
                  <div
                    class="door_block"
                    :style="'color:'+ (scoped.row.safe_door_front_OK == '0'? '#F50000;': '#111;')"
                    v-show="scoped.row.safe_door_front_OK != ''"
                  >
                    前安全門聯桿 {{ doorState(scoped.row.safe_door_front_OK) }}
                  </div>
                  <div
                    class="door_block"
                    :style="'color:'+ (scoped.row.safe_door_back_OK == '0'? '#F50000;': '#111;')"
                    v-show="scoped.row.safe_door_back_OK != ''"
                  >
                    後安全門聯桿 {{ doorState(scoped.row.safe_door_back_OK) }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div style="text-align: center;">
              <el-pagination
                :hide-on-single-page='true'
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="tableData.length"
                prev-text="上一頁"
                next-text="下一頁"
              >
              </el-pagination>
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
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: normal;
  color: #333;
  text-align: center;
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
.alarm_item {
  background: #F50000;
  color: #F50000;
  height: 20px;
  width: 20px;
  border: 1px #F50000 solid;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.alarm_title {
  display: inline-block;
  min-height: 20px;
  width: 110px;
  text-align: left;
  margin-left: 5px;
}
.alarm_box {
  padding: 2px;
  text-align: center;
  display: inline-block;
}
.door_block {
  display: inline-block;
  margin: 5px;
}
</style>

<script>
import { overviewSecurityState, overviewSecurityInfo, overviewSecurityTest } from '../api.js'
const legends = [
  { name:'正常', status: 1 },
  { name:'異常', status: 0 },
  { name:'斷線', status: 2 },
];

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
    current: '',
    line: '',
    lines: ['D9 - 1F','D10 - 1F'],
    machine_state: {
      emergency1_signal: '0',
      emergency2_signal: '0',
      safe_door_total_signal: '0',
      safe_door_front_signal: '0',
      safe_door_back_signal: '0'
    },
    tableData: [],
    status_message: '',
    loading: false,
    currentPage: 1,
    pageSize: 10,
  }),
  watch: {
    line: function() {
      if (this.line == 'D10 - 1F') {
        // eslint-disable-next-line no-console
        this.$router.push('/overview/security/D10').catch(()=> console.log('Push Error!'))
        // 初始化
        this.current = ''
        this.getMachineState('D10');
      }
      else if (this.line == 'D9 - 1F') {
        // eslint-disable-next-line no-console
        this.$router.push('/overview/security/D9').catch(()=> console.log('Push Error!'))
        // 初始化
        this.current = ''
        this.getMachineState('D9');
      }
    }
  },
  methods: {
    onClick(params) {
      // eslint-disable-next-line no-console
      // console.log(this.$route.params.line)
      // console.log(params.name)
      this.current = params.name
      this.getSecurityState(this.current);
    },
    legendClick(index){
      // eslint-disable-next-line no-console
      console.log(this.machine_show)
      this.machine_show[index] = !this.machine_show[index]
    },
    statusToColor(data) {
      let tmp
      switch (data.status) {
        case 0: //異常
          tmp = "color: #F50000;";
          break;
        case 1:  //正常
          tmp = "color: #17ba6a;";
          break;
        case 2: // 斷線
          tmp = "color: #909399;";
          break;
        default:
          tmp = "color: #909399;";
          break;
      }
      return tmp;
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
    securityColor(status) {
      if (status == '0') {
        return "background: #F50000;\
                color: #F50000;\
                height: 20px;\
                width: 20px;\
                border: 1px #F50000 solid;\
                border-radius: 50%;\
                display: inline-block;\
                vertical-align: middle;"
      }
      else if (status == '1') {
        return "background: #17ba6a;\
                color: #17ba6a;\
                height: 20px;\
                width: 20px;\
                border: 1px #17ba6a solid;\
                border-radius: 50%;\
                display: inline-block;\
                vertical-align: middle;"
      }
      else {
        return "background: #ff7f3c;\
                color: #ff7f3c;\
                height: 20px;\
                width: 20px;\
                border: 1px #ff7f3c solid;\
                border-radius: 50%;\
                display: inline-block;\
                vertical-align: middle;"
      }
    },
    signalStatus(status) {
      if (status == '0') return '失效'
      else if (status == '1') return ''
      else return '開啟'
    },
    doorState(status) {
      if (status == '0') return 'NG'
      else if (status == '1') return 'OK'
      else return 'NG'
    },
    getMachineState(field) {
      /* eslint-disable */
      overviewSecurityState(field).then((response)=>{
        this.machines = []
        this.machinesB = []
        this.machinesC = []
        this.machinesD = []
        // console.log(field)
        let data=response.data.data
        // console.log(data)
        for (let i=0;i<data.length;i++) {
          let line_cate=data[i].name.slice(0,1)
          if (line_cate == 'A' || line_cate == 'E') {
            // this.machines = []
            this.machines.push({
              name: data[i].name,
              status: data[i].status,
            })
          }
          else if (line_cate == 'B' || line_cate == 'F') {
            // this.machinesB = []
            this.machinesB.push({
              name: data[i].name,
              status: data[i].status,
            })
          }
          else if (line_cate == 'C' || line_cate == 'G') {
            // this.machinesC = []
            this.machinesC.push({
              name: data[i].name,
              status: data[i].status,
            })
          }
          if (line_cate == 'D') {
            // this.machinesD = []
            this.machinesD.push({
              name: data[i].name,
              status: data[i].status,
            })
          }
        }
      })
    },
    async getSecurityState(field) {
      try {
        this.loading = true
        // this.tableData = []
        let info = await overviewSecurityInfo(field)
        let test = await overviewSecurityTest(field)
        // console.log(info.data)
        this.machine_state = info.data
        // console.log(test.data.data)
        this.tableData = test.data.data
      }
      catch (error) {
        console.log(error.response.data)
      }
      this.loading = false
    },
    timer() {
      if (this.current != '') {
        this.getSecurityState(this.current);
      }
      this.getMachineState(this.$route.params.line)
      setTimeout(()=>{
        this.timer()
      },1000 * 10);
    },
    toDate(time) {
      let regTime = time.replace(' ', 'T')
      if(window.navigator.userAgent.match(/^((?!chrome|android).)*safari/i)) {
        regTime =  new Date(regTime).getTime() - 8 * 60 * 60 * 1000
      }
      let year = new Date(regTime).getFullYear()
      let month = new Date(regTime).getMonth()+1
      let date = new Date(regTime).getDate()
      let hour = new Date(regTime).getHours()
      hour = hour < 10? '0'+hour: hour
      let minute = new Date(regTime).getMinutes()
      minute = minute < 10? '0'+minute: minute
      let second = new Date(regTime).getSeconds()
      second = second < 10? '0'+second: second
      return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
  },
  mounted() {
    // this.getMachineState(this.$route.params.line);
    this.line = this.$route.params.line == 'D10'? 'D10 - 1F': 'D9 - 1F';
    this.timer();
  },
  computed: {
  }
};
</script>
