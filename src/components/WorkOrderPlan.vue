<template>
  <div>
    <div class="header-row">
      工單計畫
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="工單報表" name="first">
        <el-tabs v-model="activeLine" type="card" @tab-click="handleClick">
          <div>
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
        <Gantt draggable v-show="line=='A 線' || (site == 'D10 - 1F') && line=='All'" line="A 線"/>
        <Gantt draggable v-show="line=='B 線'" line="B 線"/>
        <Gantt draggable v-show="line=='C 線'" line="C 線"/>
        <Gantt draggable v-show="line=='D 線'" line="D 線"/>
        <Gantt draggable v-show="line=='E 線' || (site == 'D9 - 1F') && line=='All'" line="E 線"/>
        <Gantt draggable v-show="line=='F 線'" line="F 線"/>
        <Gantt draggable v-show="line=='G 線'" line="G 線"/>
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

  export default {
    components:{
      WOTable,
      FactorySelection,
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
        site: 'D10 - 1F'
      };
    },
    methods: {
      /* eslint-disable */
      handleSelect(item) {
        this.line = item
      },
      siteSelect(item) {
        this.site = item
      }
      /* eslint-enable */
    }
  };
</script>

