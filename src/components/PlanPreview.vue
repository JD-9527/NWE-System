<template>
  <div>
    <div class="header-row">
      計畫預覽
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <FactorySelection tonlist
        @lineSelected="handleSelect"
        @siteSelected="siteSelect"
      />
      <el-button size='mini' style="margin-left: 10px;">提交</el-button>

      <el-tab-pane label="推薦報表" name="first">
        <Report/>
      </el-tab-pane>
      <el-tab-pane label="推薦甘特圖" name="second">
        <Gantt v-show="line=='A 線' || (site == 'D10 - 1F') && line=='All'" draggable line="A 線"/>
        <Gantt v-show="line=='B 線'" draggable line="B 線"/>
        <Gantt v-show="line=='C 線'" draggable line="C 線"/>
        <Gantt v-show="line=='D 線'" draggable line="D 線"/>
        <Gantt v-show="line=='E 線' || (site == 'D9 - 1F') && line=='All'" draggable line="E 線"/>
        <Gantt v-show="line=='F 線'" draggable line="F 線"/>
        <Gantt v-show="line=='G 線'" draggable line="G 線"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Report from './ReportPreview.vue'
  import Gantt from './Gantt_chart.vue'
  import FactorySelection from './FactorySelection.vue'

  export default {
    components:{
      Report,
      Gantt,
      FactorySelection
    },
    data() {
      return {
        activeName: 'first',
        line: 'All',
        site: 'D10 - 1F'
      };
    },
    methods: {
      /* eslint-disable */
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSelect(item) {
        this.line = item
      },
      siteSelect(item) {
        this.site = item
      }
      /* eslint-enable */
    },
    mounted() {
      this.lines = this.loadLine()
    }
  };
</script>

