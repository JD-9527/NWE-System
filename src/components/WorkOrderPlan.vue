<template>
  <div>
    <div class="header-row">
      工單計畫
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="工單報表" name="first">
        <el-tabs v-model="activeLine" type="card">
          <div style="position: relative; top: 10px;">
            <NewRowButton :tableInfo="tableInfo"/>
            <div style="width: 50%; display: inline-block;"></div>
            <div class="sub-title select">噸位</div>
            <el-select
              size='mini'
              v-model="ton"
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
            <WOTable :name="line" editable/>
            <el-card style="width: 100%; margin: 10px 0;">
              <div slot="header" class="message">
                <span>工單詳情</span>
              </div>
              <el-row style="margin: 0;">
                <el-col :span="12">
                  <div style="margin-bottom: 10px;">
                    <div class="message-subtitle">生產數量（件）</div>
                    <div style="padding-right: 20px;">
                      <div class="progress-bar" style="text-align: right; width: 100%;">28,400/40,000</div>
                      <el-progress
                        :percentage="28/40*100"
                        :stroke-width="20"
                        :show-text='false'
                        color="#17ba6a"
                      ></el-progress>
                    </div>
                  </div>
                  <div style="display: inline-block; width: 33%;">
                    <div class="message-subtitle">客戶名稱</div>
                    <div class="message">Cisco</div>
                  </div>
                  <div style="display: inline-block; width: 33%;">
                    <div class="message-subtitle">工單負責人</div>
                    <div class="message">小兵</div>
                  </div>
                  <div style="display: inline-block; width: 33%;">
                    <div class="message-subtitle">工單號</div>
                    <div class="message">6110394</div>
                  </div>
                </el-col>
                <el-col :span="12" style="height: 105px;">
                  <div class="message-subtitle">工單生產紀錄</div>
                  <div style="padding: 20px 10px;">
                    <div style=" background: #ddd; height: 20px; border-radius: 5px;">
                      <div class="progress-bar color-green" style="width:30%">1</div>
                      <div class="progress-bar color-yellow" style="width:30%">2</div>
                      <div class="progress-bar color-red" style="width:30%">3</div>
                    </div>
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
</style>

<script>
  import WOTable from './WorkOrderTable.vue'
  import FactorySelection from './FactorySelection.vue'
  import Gantt from './Gantt_chart.vue'
  import NewRowButton from './NewRowButton.vue'
  import { planWorkTonlist } from '../api.js'

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
        ton: '130',
        line: 'All',
        site: 'D10 - 1F',
        dataType:'workorder',
        tableInfo: [
          {prop: 'ton',label: '噸位', type: 'input'},
          {prop: 'number',label: '機台號', type: 'input'},
          {prop: 'color',label: '當前顏色', type: 'input'},
          {prop: 'ch_time',label: '上下模時間', type: 'input'},
          {prop: 'start_time',label: '起始時間', type: 'input'},
          {prop: 'end_time',label: '結束時間', type: 'input'},
          {prop: 'name',label: '品名', type: 'input'},
          {prop: 'part_num',label: '料號', type: 'input'},
          {prop: 'work_num',label: '工令號', type: 'input'},
          {prop: 'plastic_num',label: '塑膠料號', type: 'input'},
          {prop: 'count',label: '數量', type: 'input'},
          {prop: 'mold_num',label: '模號', type: 'input'},
          {prop: 'mold_seq',label: '模序', type: 'input'},
          {prop: 'mold_count',label: '模穴術', type: 'input'},
          {prop: 'mold_pos',label: '模具儲位', type: 'input'},
          {prop: 'plan_time',label: '計畫工時', type: 'input'},
          {prop: 'standard_cycle',label: '標準週期', type: 'input'},
        ]
      };
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
          this.tons = data
        })
      }
      /* eslint-enable */
    }
  };
</script>

