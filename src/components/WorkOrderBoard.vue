<template>
  <div>
    <el-row
      class="header-row"
      type="flex"
      align="middle"
    >
      NWE D10 工單看板
    </el-row>
    <el-row>
    <el-tabs v-model="activeLine" type="card">
      <div style="position: relative; top: 10px;">
      <div style="width: 50%; display: inline-block;"></div>
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
          :ton='ton'
          @row-click="rowClick"
        />
        <el-card style="width: 100%; margin: 10px 0;">
          <div slot="header" class="message">
            <span>工單詳情</span>
          </div>
          <el-row style="margin: 0;">
            <el-col :span="12">
              <div style="margin-bottom: 10px;">
                <div class="message-subtitle">生產數量（件）</div>
                <div style="padding-right: 20px;">
                  <div class="progress-bar" style="text-align: right; width: 100%;">
                    {{ data_detail.produced + '/' + data_detail.plan_count }}
                  </div>
                  <el-progress
                    :percentage="data_detail.produced/data_detail.plan_count*100"
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
                <div class="message-subtitle">當前/結束時間</div>
                <div class="message">{{ data_detail.end_time }}</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    </el-row>
  </div>
</template>

<style scoped>
.header {
  font-size: 20px;
  font-weight: bold;
}
.el-card >>> .el-card__header {
  padding: 10px 20px;
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
// import Table from './Table'
import WOTable from './WorkOrderTable.vue'
import { planTonList } from '../api.js'


let data_detail = {
  plan_count: 40000,
  produced: 28400,
  customer: 'Cisco',
  owner: '小兵',
  work_no: 6110394,
  start_time: '15:13:12',
  end_time: '20:32:45',
  product_record: [
    { status: 0, time: 60 },
    { status: 5, time: 60 },
    { status: 0, time: 60 },
    { status: 3, time: 60 },
  ]
}

export default {
  components : {
    // Table
    WOTable
  },
  data() {
    return {
      activeName: 'first',
      activeLine: '1',
      lines: ['A線', 'B線', 'C線', 'D線', 'E線', 'F線', 'G線'],
      line: 'All',
      tons: ['50','80','100','130'],
      ton: '',
      tableData: [
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
          isDelay: 0
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '延遲',
          isDelay: 1
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
          isDelay: 0
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
          isDelay: 0
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
          isDelay: 0
        },
        {
          no: '611232322',
          part_no: '700-234232-01WB',
          machine: 'C01',
          mod_no: 'NP12343',
          plan_count: '40,000',
          has_count: '28,400',
          status: '正常',
          isDelay: 0
        },
      ],
      data_detail: data_detail
    };
  },
  computed: {
    total_time: function(){
      let tmp = 0
      this.data_detail.product_record.forEach(obj => {
        tmp += obj.time
      })
      return tmp
    },
  },
  watch: {
    activeLine: function(){
      if (this.activeLine == '1') this.getTonList('A')
      else if  (this.activeLine == '2') this.getTonList('B')
      else if  (this.activeLine == '3') this.getTonList('C')
      else if  (this.activeLine == '4') this.getTonList('D')
      else if  (this.activeLine == '5') this.getTonList('E')
      else if  (this.activeLine == '6') this.getTonList('F')
      else if  (this.activeLine == '7') this.getTonList('G')
      this.ton = null
    }
    },
  methods: {
    handleClick(tab, event) {
      // eslint-disable-next-line no-console
      console.log(tab, event);
    },
    onClick(row) {
      // eslint-disable-next-line no-console
      console.log(row);
    },
    /* eslint-disable */
    tableRowClassName({row}) {
      // console.log({row, rowIndex})
      if (row.isDelay === 1) {
        return 'warning-row';
      }
      return '';
    },
    getTonList(line) {
      planTonList(line).then((response)=>{
        let data = response.data.data
        this.tons = data
      })
    },
    rowClick() {
      console.log(arguments[0])
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
  }
};
</script>

