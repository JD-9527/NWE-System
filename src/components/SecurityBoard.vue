<template>
  <div>
    <el-row
      class="header-row"
      type="flex"
      align="middle"
    >
      <el-col :span="8">
        NWE {{ $route.params.line }}機台安全看板
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
    <el-row :gutter="30">
      <el-col :span="10">
        <el-card shadow="never" style="margin-bottom: 20px;">
          <div slot="header" class="clearfix">
            <span class="message-row">{{ current }} 機台安全訊息</span>
          </div>
          <div class="message"  v-show="current != ''">
            <div class="alarm_box">
              <div :style="securityColor(machine_state.safe_door_total)"></div>
              <div class="alarm_title">急停</div>
            </div>
            <div class="alarm_box">
              <div :style="securityColor(machine_state.safe_door_font)"></div>
              <div class="alarm_title">前安全門</div>
            </div>
            <div class="alarm_box">
              <div :style="securityColor(machine_state.safe_door_back)"></div>
              <div class="alarm_title">後安全門</div>
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
              :data="tableData"
              style="width: 100%">
            <el-table-column
              prop="timestamp"
              label="測試時間"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tester"
              label="測試員"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              label="測試結果"
              align="center"
            >
              <template slot-scope="scoped">
                <div
                  class="door_block"
                  :style="'color:'+ (scoped.row.safe_door_total_OK == 0? '#F50000;': '#111;')"
                >
                  {{ doorState(scoped.row.safe_door_total_OK) }}
                </div>
                <div
                  class="door_block"
                  :style="'color:'+ (scoped.row.safe_door_font_OK == 0? '#F50000;': '#111;')"
                >
                  前{{ doorState(scoped.row.safe_door_font_OK) }}
                </div>
                <div
                  class="door_block"
                  :style="'color:'+ (scoped.row.safe_door_back_OK == 0? '#F50000;': '#111;')"
                >
                  後{{ doorState(scoped.row.safe_door_back_OK) }}
                </div>
              </template>
            </el-table-column>
            </el-table>
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
  width: 100px;
  text-align: left;
  margin-left: 10px;
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
import { overviewMachineBoard, overviewSecurityInfo, overviewSecurityTest } from '../api.js'
const legends = [
  { name:'正常', status: 0 },
  { name:'待機', status: 1 },
  { name:'調機', status: 2 },
  { name:'維修', status: 3 },
  { name:'修模待機', status: 4 },
  { name:'換模', status: 5 },
  { name:'斷線', status: 6 },
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
    machine_state: { safe_door_total: 0, safe_door_font: 0, safe_door_back: 0 },
    tableData: [],
  }),
  watch: {
    line: function() {
      if (this.line == 'D10 - 1F') {
        // eslint-disable-next-line no-console
        this.$router.push('/overview/security/D10').catch(()=> console.log('Push Error!'))
        // 初始化
        this.machines = []
        this.machinesB = []
        this.machinesC = []
        this.machinesD = []
        this.current = ''
        this.getMachineState('D10');
      }
      else if (this.line == 'D9 - 1F') {
        // eslint-disable-next-line no-console
        this.$router.push('/overview/security/D9').catch(()=> console.log('Push Error!'))
        // 初始化
        this.machines = []
        this.machinesB = []
        this.machinesC = []
        this.machinesD = []
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
    securityColor(status) {
      if (status == 0) {
        return "background: #F50000;\
                color: #F50000;\
                height: 20px;\
                width: 20px;\
                border: 1px #F50000 solid;\
                border-radius: 50%;\
                display: inline-block;\
                vertical-align: middle;"
      }
      else {
        return "background: #17ba6a;\
                color: #17ba6a;\
                height: 20px;\
                width: 20px;\
                border: 1px #17ba6a solid;\
                border-radius: 50%;\
                display: inline-block;\
                vertical-align: middle;"
      }
    },
    doorState(status) {
      if (status == 0) return '安全門NG'
      else return '安全門OK'
    },
    getMachineState(line) {
      overviewMachineBoard(line).then((response)=>{
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
    async getSecurityState(field) {
      /* eslint-disable */
      let info = await overviewSecurityInfo(field)
      let test = await overviewSecurityTest(field)
      // console.log(field)
      this.machine_state = info.data
      // console.log(test.data)
      this.tableData = test.data.data
    },
    timer() {
      if (this.current != '') {
        this.getSecurityState(this.current);
      }
      setTimeout(()=>{
        this.timer()
      },1000 * 10);
    }
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
