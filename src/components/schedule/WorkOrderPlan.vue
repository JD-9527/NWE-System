<template>
  <div>
    <div class="header-row">
      工單計畫
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="工單報表" name="first">
        <el-tabs v-model="activeLine" type="card">
          <div style="position: relative; display: flex">
            <NewRowButton :tableInfo="tableInfo"/>
            <div style="flex-grow: 1;"></div>
            <div class="sub-title select" style="margin-top: 5px;">機台</div>
            <el-select
              size='mini'
              v-model="mach"
              clearable
            >
              <el-option
                v-for="item in machs"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <div class="sub-title select">噸位</div>
            <el-select
              size='mini'
              v-model="ton"
              clearable
            >
              <el-option
                v-for="item in tons"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <div style="padding: 5px; display: inline-block;">
              <font-awesome-icon
                :icon="['fas','square']"
                class="legend-blue"
              ></font-awesome-icon>
              已完成
            </div>
            <div style="padding: 5px; display: inline-block;">
              <font-awesome-icon
                :icon="['fas','square']"
                class="legend-white"
              ></font-awesome-icon>
              待開始
            </div>
            <div style="padding: 5px; display: inline-block;">
              <font-awesome-icon
                :icon="['fas','square']"
                class="legend-red"
              ></font-awesome-icon>
              延遲
            </div>
            <div style="padding: 5px; display: inline-block;">
              <font-awesome-icon
                :icon="['fas','square']"
                class="legend-green"
              ></font-awesome-icon>
              正常生產
            </div>
          </div>
          <el-tab-pane
            v-for="(line,index) in lines"
            :key="line"
            :label="line"
            :name="(index+1).toString()"
          >
            <WOTable
              :name="line"
              :ton="ton"
              :mach="mach"
              editable
              @row-click="rowClick"
            />
            <el-card style="width: 100%; margin: 10px 0;">
              <div slot="header" class="message">
                <span>工單詳情</span>
              </div>
              <el-row style="margin: 0;" v-show= "data_detail.work_no != 0">
                <el-col :span="12">
                  <div style="margin-bottom: 10px;">
                    <div class="message-subtitle">生產數量（件）</div>
                    <div style="padding-right: 20px;">
                      <div class="progress-bar" style="text-align: right; width: 100%;">
                        {{ data_detail.pruduct_now + '/' + data_detail.pruduct_total }}
                      </div>
                      <el-progress
                        :percentage="perc"
                        :stroke-width="20"
                        :show-text='false'
                        color="#17ba6a"
                      ></el-progress>
                    </div>
                  </div>
                  <div style="display: inline-block; width: 33%;">
                    <div class="message-subtitle">客戶名稱</div>
                    <div class="message">{{ data_detail.customer }}</div>
                  </div>
                  <div style="display: inline-block; width: 33%;">
                    <div class="message-subtitle">工單負責人</div>
                    <div class="message">{{ data_detail.owner }}</div>
                  </div>
                  <div style="display: inline-block; width: 33%;">
                    <div class="message-subtitle">工單號</div>
                    <div class="message">{{ data_detail.work_no }}</div>
                  </div>
                </el-col>
                <el-col :span="12" style="height: 105px;">
                  <div class="message-subtitle">工單生產紀錄</div>
                  <div style="padding: 15px 10px; ">
                    <div class="boarder">
                      <div style=" background: #ddd; height: 20px; border-radius: 5px;">
                        <div
                          v-for="(item,index) in data_detail.product_record"
                          :key="index"
                          :class="color(item.status)"
                          :style="'width:' + item.time/total_time*100 + '%'"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div style="display: inline-block; width: 50%;">
                    <div class="message-subtitle">開始時間</div>
                    <div class="message">{{ data_detail.start_time }}</div>
                  </div>
                  <div style="display: inline-block; width: 50%; text-align: right">
                    <div class="message-subtitle">
                      {{currentStatus}}
                    </div>
                    <div class="message">{{ data_detail.end_time }}</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="生產甘特圖" name="second">
        <FactorySelection tonlist
          @lineSelected="handleSelect"
          @siteSelected="siteSelect"
        />
        <el-button size='mini' style="margin-left: 10px;">提交</el-button>

        <Gantt draggable :line="line" :site="site" :ton="ton" :dataType="dataType" />
        <!-- <Gantt draggable :line="line=='All'? 'A 線': line"/> -->


      </el-tab-pane>
      <el-tab-pane label="現場作業狀況" name="third">
        現場作業狀況
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.select {
  width: 40px;
  display: inline-block;
  margin-top: 5px;
}
.legend-blue {
  color:#cbd2ff;
  background: #cbd2ff;
  border: 1px #000 solid;
}
.legend-white {
  color:#f2f2f2;
  background: #f2f2f2;
  border: 1px #000 solid;
}
.legend-red {
  color:#ffc8ca;
  background: #ffc8ca;
  border: 1px #000 solid;
}
.legend-green {
  color:#bcffc6;
  background: #bcffc6;
  border: 1px #000 solid;
}
.progress-bar {
  display: inline-block;
  border-radius: 5px;
  height: 20px;
  text-align: center;
}
.boarder {
  border-left: 1px solid #333;
  border-bottom: 1px solid #333;
  padding-top:5px;
  height: 25px;
}
</style>

<script>
  import WOTable from '../WorkOrderTable.vue'
  import FactorySelection from '../base/FactorySelection.vue'
  import Gantt from '../Gantt_chart.vue'
  import NewRowButton from '../base/NewRowButton.vue'
  import { planWorkTonlist, planWorlistDetail } from '@/api.js'
  import { String2Date, Date2String } from '@/utils/common.js'

  export default {
    components:{
      WOTable,
      FactorySelection,
      NewRowButton,
      Gantt
    },
    data() {
      return {
        activeName: 'first',
        activeLine: '1',
        lines: ['A線', 'B線', 'C線', 'D線', 'E線', 'F線', 'G線'],
        tons: ['50','80','100','130'],
        ton: '',
        machs: [],
        mach: '',
        line: 'All',
        site: 'D10 - 1F',
        dataType:'workorder',
        tableInfo: [
          {prop: 'machine_ton',label: '噸位', type: 'input'},
          {prop: 'machine_NO',label: '機台號', type: 'input'},
          {prop: 'plastic_color',label: '當前顏色', type: 'input'},
          {prop: 'real_mold_changerover_time',label: '上下模時間', type: 'input'},
          {prop: 'real_s_time',label: '實際開始時間', type: 'input'},
          {prop: 'plan_e_time',label: '預計結束時間', type: 'input'},
          {prop: 'product_name',label: '品名', type: 'input'},
          {prop: 'Part_NO',label: '料號', type: 'input'},
          {prop: 'work_list',label: '工令號', type: 'input'},
          {prop: 'plastic_Part_NO',label: '塑膠料號', type: 'input'},
          {prop: 'work_list_number',label: '數量', type: 'input'},
          {prop: 'mold_NO',label: '模號', type: 'input'},
          {prop: 'mold_Serial',label: '模序', type: 'input'},
          {prop: 'mold_hole',label: '模穴數', type: 'input'},
          {prop: 'mold_position',label: '模具儲位', type: 'input'},
          {prop: 'plan_work_time',label: '計畫工時', type: 'input'},
          {prop: 'machine_CT',label: '標準週期', type: 'input'},
        ],
        data_detail: {
          pruduct_total: 0,
          pruduct_now: 0,
          customer: '',
          owner: '',
          work_no: 0,
          start_time: '',
          end_time: '',
          product_record: []
        },
        currentRowStatus: 0
      };
    },
    watch: {
      activeLine: function(){
      if (this.activeLine == '1') {
        this.getTonList('A')
        this.getMachs('A')
      }
      else if  (this.activeLine == '2') {
        this.getTonList('B')
        this.getMachs('B')
      }
      else if  (this.activeLine == '3') {
        this.getTonList('C')
        this.getMachs('C')
      }
      else if  (this.activeLine == '4') {
        this.getTonList('D')
        this.getMachs('D')
      }
      else if  (this.activeLine == '5') {
        this.getTonList('E')
        this.getMachs('E')
      }
      else if  (this.activeLine == '6') {
        this.getTonList('F')
        this.getMachs('F')
      }
      else if  (this.activeLine == '7') {
        this.getTonList('G')
        this.getMachs('G')
      }
      this.ton = null
      this.mach = null
    }
    },
    computed: {
      total_time: function(){
        let tmp = 0
        this.data_detail.product_record.forEach(obj => {
          tmp += obj.time
        })
        return tmp
      },
      currentStatus: function() {
        return this.currentRowStatus == 1? '結束時間': '當前時間'
      },
      perc: function() {
        return this.data_detail.pruduct_total == 0?
              0:
              (this.data_detail.pruduct_now > this.data_detail.pruduct_total)?
              100:
              this.data_detail.pruduct_now/this.data_detail.pruduct_total*100
      }
    },
    methods: {
      /* eslint-disable */
      handleSelect(item) {
        this.line = item
      },
      siteSelect(item) {
        this.site = item
      },
      getTonList(line) {
        planWorkTonlist(line).then((response)=>{
          let data = response.data.data
          // console.log(data)
          this.tons = data
        })
      },
      getMachs(line) {
        // this.mach1 = 'All'
        if (line == 'A') {
          let mach = []
          for (let i=0;i<15;i++) {
            let num = (i+1)<10? '0'+(i+1): (i+1)
            mach.push('A'+num)
          }
          this.machs = mach
        }
        else if (line == 'B') {
          let mach = []
          for (let i=0;i<14;i++) {
            let num = (i+1)<10? '0'+(i+1): (i+1)
            mach.push('B'+num)
          }
          this.machs = mach
        }
        else if (line == 'C') {
          let mach = []
          for (let i=0;i<12;i++) {
            let num = (i+1)<10? '0'+(i+1): (i+1)
            mach.push('C'+num)
          }
          this.machs = mach
        }
        else if (line == 'D') {
          let mach = []
          for (let i=0;i<19;i++) {
            let num = (i+1)<10? '0'+(i+1): (i+1)
            mach.push('D'+num)
          }
          this.machs = mach
        }
        else if (line == 'E') {
          let mach = []
          for (let i=0;i<21;i++) {
            let num = (i+1)<10? '0'+(i+1): (i+1)
            mach.push('E'+num)
          }
          this.machs = mach
        }
        else if (line == 'F') {
          let mach = []
          for (let i=0;i<17;i++) {
            let num = (i+1)<10? '0'+(i+1): (i+1)
            mach.push('F'+num)
          }
          this.machs = mach
        }
        else if (line == 'G') {
          let mach = []
          for (let i=0;i<9;i++) {
            let num = (i+1)<10? '0'+(i+1): (i+1)
            mach.push('G'+num)
          }
          this.machs = mach
        }
      },
      rowClick() {
        let row = arguments[0]
        this.currentRowStatus = row.status
        // console.log(arguments[0])
        planWorlistDetail(row.status, row.work_list).then(response => {
          let data = response.data
          this.data_detail = data
          let s_time = String2Date(data.start_time)
          data.pruduct_now = data.pruduct_now? data.pruduct_now: 0
          let end_time = s_time.setSeconds( s_time.getSeconds() + this.total_time ) ;
          data.end_time = data.start_time == ''? '': Date2String(end_time)
          // console.log(data)
        })
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
      /* eslint-enable */
    },
    mounted() {
      this.getTonList('A');
      this.getMachs('A');
    }
  };
</script>

