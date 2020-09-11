<template>
  <div>
    <div v-show="current == ''">
      <el-row
        class="header-row"
        type="flex"
        align="middle"
      >
        <el-col :span="8">
          NWE {{ $route.params.line }} 機台監控訊息
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
    </div>
    <div v-show="current != ''" style="height: 606px;">
      <div class="header-row-gai">
        <div :style="securityColor(currentStatus)"></div>
        <div style="vertical-align: middle; margin-left: 8px;">{{ current }} 機台監控訊息</div>
      </div>
      <div style="display: flex; text-align: center;">
        <div style="flex-grow: 1;"></div>
        <div>
          <JSMpegPlayer
            :id="'1'"
            :src="source"
            :height="560"
            :width="315"
          />
        </div>
        <div style="margin-left: 20px">
          <JSMpegPlayer
            :id="'2'"
            :src="sourceR"
            :height="315"
            :width="560"
          />
          <div style="margin: 29px 0;">
            <div>
            <!-- <div v-show="odStatus.human_count"> -->
              <div
                class="od_block"
                :style="'color:'+ (odStatus.helmet == 0? '#F50000;': odStatus.helmet == 1? '#17ba6a;': '#000;')"
              >
                安全帽: {{ odStatus.helmet == 0? '不合法': odStatus.helmet == 1? '合法': '未檢測' }}
              </div>
              <div
                class="od_block"
                :style="'color:'+ (odStatus.gloves == 0? '#F50000;': odStatus.gloves == 1? '#17ba6a;': '#000;')"
              >
                手套: {{ odStatus.gloves == 0? '不合法': odStatus.gloves == 1? '合法': '未檢測' }}
              </div>
              <div
                class="od_block"
                :style="'color:'+ (odStatus.glasses == 0? '#F50000;': odStatus.glasses == 1? '#17ba6a;': '#000;')"
              >
                護目鏡: {{ odStatus.glasses == 0? '不合法': odStatus.glasses == 1? '合法': '未檢測' }}
              </div>
              <div
                class="od_block"
                :style="'color:'+ (odStatus.shoes == 0? '#F50000;': odStatus.shoes == 1? '#17ba6a;': '#000;')"
              >
                安全鞋: {{ odStatus.shoes == 0? '不合法': odStatus.shoes == 1? '合法': '未檢測' }}
              </div>
            </div>
            <div>
              <el-button
                style="font-size: 20px;"
                @click="current = ''; odStatus={}" type="text"
              >
                <i class="el-icon-back"></i>返回主畫面
              </el-button>
            </div>
          </div>
          <canvas id="video-canvasR" style="height: 315px; width: 560px;"></canvas>
        </div>
        <div style="flex-grow: 1;"></div>
      </div>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="30" v-show="current != '' ">
      <el-col :span="10">
        <el-card shadow="never" style="margin-bottom: 20px;" class="mach">
          <div slot="header" class="clearfix">
            <span class="message-row">{{ current }} 設備邏輯監控</span>
          </div>
          <div class="message"  v-show="current != ''">
            <div
              v-for="(key) in door_sort"
              :key="key"
              class="alarm_box"
              v-show="machine_state[key] != ''"
            >
              <div :style="securityColor(machine_state[key])"></div>
              <div
                class="alarm_title"
                :style="'color:'+ (machine_state[key] == '0'? '#F50000;': '#111;')"
              >
                {{ infoName(key) }} {{ signalStatus(machine_state[key]) }}
              </div>
            </div>
            <div
              style="text-align: right; margin-top: 10px; color: #F50000"
              v-show="machine_state.operation_error == 0"
            >操作錯誤，前門關，後門開！</div>
            <img src="../assets/Vsp.png" style="width: 100%;" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card shadow="never" >
          <div slot="header" class="clearfix" style="display: flex;">
            <span class="message-row">{{ current }} 點檢歷史</span>
            <div style="flex-grow: 1"></div>
            <el-button
              round
              size="mini"
              v-show="current != ''"
              @click="trigger()"
              v-if="$store.getters.roles[0] == 'website_maintainer'"
            >開始點檢</el-button>
          </div>
          <div class="message" v-show="current != '' ">
            <el-table
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%"
              max-height="304"
            >
              <el-table-column
                prop="timestamp"
                label="測試時間"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="tester"
                label="測試員"
                width="80"
                align="center">
              </el-table-column>
              <el-table-column
                prop="type"
                label="點檢類型"
                align="center">
              </el-table-column>
              <el-table-column
                label="點檢編號"
                align="center"
              >
                <template slot-scope="{row}">
                  <div
                    v-for="key in Object.keys(row)"
                    :key="key"
                  >
                    <div
                      class="door_block"
                      v-show="row[key] != '' && key[0]=='I'"
                    >
                      {{ testTooltip(key).no }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="點檢內容"
                align="center"
                width="350"
              >
                <template slot-scope="{row}">
                  <div
                    v-for="key in Object.keys(row)"
                    :key="key"
                  >
                    <div
                      class="door_block"
                      v-show="row[key] != '' && key[0]=='I'"
                    >
                      {{ testTooltip(key).content }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="點檢結果"
                align="center"
                fixed="right"
              >
                <template slot-scope="{row}">
                  <div
                    v-for="key in Object.keys(row)"
                    :key="key"
                  >
                    <div
                      class="door_block"
                      v-show="row[key] != '' && key[0]=='I'"
                      :style="'color:'+ (row[key] == '0'? '#F50000;': '#17ba6a;')"
                    >
                      {{ doorState(row[key]) }}
                    </div>
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
.header-row-gai {
  font-size: 32px;
  font-weight:bold;
  margin-bottom: 8px;
  margin-top: 6px;
  display:flex;/*Flex布局*/
  display: -webkit-flex; /* Safari */
  align-items:center;/*指定垂直居中*/
}
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
.mach >>> .el-card__body {
  padding: 15px;
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
  min-width: 150px;
  text-align: left;
  margin-left: 5px;
}
.alarm_box {
  padding: 2px;
  text-align: center;
  display: inline-block;
}
.door_block {
  margin: 5px;
 /* border: 0.5px solid #555;*/
}
.od_block {
  margin: 10px;
  font-size: 18px;
 /* border: 0.5px solid #555;*/
}
</style>

<script>
import { overviewSecurityState, overviewSecurityInfo, overviewSecurityManual,
         overviewSecurityTest, overviewSecurityMachineOD } from '../api.js'
import JSMpegPlayer from './jsmpegPlayer'

const legends = [
  { name:'正常', status: 1 },
  { name:'異常', status: 0 },
  { name:'斷線', status: 2 },
];

export default {
  name: 'MachineBoard',
  components: {
    JSMpegPlayer
  },
  data: () => ({
    hidden: true,
    style: "",
    machines: [],
    machinesB: [],
    machinesC: [],
    machinesD: [],
    legends: legends,
    current: '',
    currentStatus: 2,
    line: '',
    lines: ['D9 - 1F','D10 - 1F'],
    machine_state: {},
    tableData: [],
    status_message: '',
    loading: false,
    currentPage: 1,
    pageSize: 10,
    door_Seq: [                         //決定訊號順序
      "safe_door_block_logic",
      "safe_door_front_logic",
      "safe_door_ONOFF_logic",
      "safe_door_total_logic",
      "safe_door_back_logic",
      "nozzle_protection_logic",
      "emergency_1_logic",
      "emergency_2_logic",
      "emergency_3_logic",
      "emergency_4_logic",
      "emergency_5_logic"
    ],
    door_sort: [],                        // 排序後的燈號順序
    // source: 'ws://10.132.54.108:8082',   //你拉取视频源地址
    // 'ws://10.132.53.2:9999' 'ws://10.132.53.2:9998'
    source: 'ws://10.124.131.81:8869',   //你拉取视频源地址
    sourceR: 'ws://10.124.131.81:8870',   //另一台攝影機
    odStatus: {},
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
      // console.log(this.$route.params.line)
      // eslint-disable-next-line no-console
      // console.log(params)
      this.current = params.name
      this.currentStatus = params.status
      this.getSecurityState(this.current);
      // this.getMachineOD(this.current)
      this.timer1();
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
    testStatusToColor(data) {
      let tmp
      switch (data.status) {
        case 0: //異常
          tmp = "color: #F50000;";
          break;
        case 1:  //正常
          tmp = "color: #000;";
          break;
        default:
          tmp = "color: #000;";
          break;
      }
      return tmp;
    },
    infoName: function(key) {
      switch (key) {
        case 'safe_door_front_logic':
          return '前門1(止動開關)'
        case 'safe_door_back_logic':
          return '後門2(行程開關)'
        case 'safe_door_total_logic':
          return '後門1(液壓閥)'
        case 'nozzle_protection_logic':
          return '射嘴防護罩'
        case 'emergency_1_logic':
          return '急停1'
        case 'emergency_2_logic':
          return '急停2'
        case 'emergency_3_logic':
          return '急停3'
        case 'emergency_4_logic':
          return '急停4'
        case 'emergency_5_logic':
          return '急停5'
        case 'safe_door_block_logic':
          return '前門檔塊'
        case 'safe_door_ONOFF_logic':
          return '前門2開關'
        default:
          return ''
      }
    },
    testName: function(key) {
      switch (key) {
        case 'ID4_OK':
          return 'ID4'
        case 'ID6_OK':
          return 'ID6'
        case 'ID9_OK':
          return 'ID9'
        case 'ID21_OK':
          return 'ID21'
        case 'ID22_OK':
          return 'ID22'
        case 'ID27_OK':
          return 'ID27'
        default:
          return ''
      }
    },
    testTooltip: function(key) {
      switch (key) {
        case 'ID4_OK':
          return {
            no: 'ID4',
            content: '三色燈是否變紅，是否有報警聲(前/後安全門開)'
          }
        case 'ID6_OK':
          return {
            no: 'ID6',
            content: '安全門打開後是否有連鎖信號'
          }
        case 'ID9_OK':
          return {
            no: 'ID9',
            content: '後門安全門開，馬達是否自動關閉'
          }
        case 'ID21_OK':
          return {
            no: 'ID21',
            content: '急停信號是否正常'
          }
        case 'ID22_OK':
          return {
            no: 'ID22',
            content: '射嘴防護罩是否正常'
          }
        case 'ID27_OK':
          return {
            no: 'ID27',
            content: '三色燈是否正常'
          }
        default:
          return {
            no: '',
            content: ''
          }
      }
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
        return "background: #909399;\
                color: #909399;\
                height: 20px;\
                width: 20px;\
                border: 1px #909399 solid;\
                border-radius: 50%;\
                display: inline-block;\
                vertical-align: middle;"
      }
    },
    signalStatus(status) {
      if (status == '0') return '失效'
      else if (status == '1') return ''
      else return '失效'
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
        let data=response.data.data

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
        if (this.current != '') {
          let curField = this.current[0]
          let curLine = parseInt(this.current.substring(1,3))
          if (curField == 'A' || curField == 'E') this.currentStatus =this.machines[curLine-1].status
          if (curField == 'B' || curField == 'F') this.currentStatus =this.machinesB[curLine-1].status
          if (curField == 'C' || curField == 'G') this.currentStatus =this.machinesC[curLine-1].status
          if (curField == 'D' ) this.currentStatus =this.machinesD[curLine-1].status
        }
      })
    },
    async getSecurityState(field) {
      try {
        this.loading = true
        // this.tableData = []
        let info = await overviewSecurityInfo(field)
        let test = await overviewSecurityTest(field)
        this.door_sort = Object.keys(info.data).sort((a,b)=>{
          return this.door_Seq.indexOf(a) - this.door_Seq.indexOf(b)
        })
        this.machine_state = info.data
        // console.log(test.data.data)
        let test_data = test.data.data
        test_data = test_data.map(row => {
          return {
            ...row,
            type: '人工點檢'
          }
        })
        this.tableData = test_data
      }
      catch (error) {
        console.log(error.response.data)
      }
      this.loading = false
    },
    timer() {
      // console.log(this.$route.path.substring(0,19))
      if (this.$route.path.substring(0,19) == '/overview/security/') {
        // if (this.current != '') {
        //   this.getSecurityState(this.current);
        // }
        this.getMachineState(this.$route.params.line)
        setTimeout(()=>{
          this.timer()
        },1000 * 10);
      }
    },
    timer1() {
      // console.log(this.$route.path.substring(0,19))
      if (this.$route.path.substring(0,19) == '/overview/security/') {
        if (this.current != '') {
          this.getMachineOD(this.current)
          this.getSecurityState(this.current);
          // console.log('test')
        }
        // this.getMachineState(this.$route.params.line)
        setTimeout(()=>{
          this.timer1()
        },1000 * 3);
      }
    },
    getMachineOD(field) {
      overviewSecurityMachineOD(field).then(response => {
        let data = response.data
        // console.log(data)
        this.odStatus = data
      })
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    trigger() {
      overviewSecurityManual(this.current).then(response => {
        this.$message({
          message: '已開始點檢',
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
    }
  },
  mounted() {
    // let canvas = document.getElementById('video-canvas')
    // let canvasR = document.getElementById('video-canvasR')
    // let player = new JSMpeg.Player(this.source, {canvas: canvas})
    // let playerR = new JSMpeg.Player(this.sourceR, {canvas: canvasR})
    this.line = this.$route.params.line == 'D10'? 'D10 - 1F': 'D9 - 1F';
    this.timer();
  },
  computed: {
  }
};
</script>
