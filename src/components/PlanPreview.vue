<template>
  <div>
    <div class="header-row">
      計畫預覽
    </div>
    <el-tabs v-model="activeName">
      <FactorySelection tonlist
        @lineSelected="handleSelect"
        @siteSelected="siteSelect"
        @tonSelected="tonSelect"
      />
      <el-button size='mini' style="margin-left: 10px;">提交</el-button>

      <el-tab-pane label="推薦報表" name="first">
        <Report :field='field' :line='line' :ton='ton'/>
      </el-tab-pane>
      <el-tab-pane label="推薦甘特圖" name="second">

        <Gantt draggable :line="line" :site="site" :ton="ton" :dataType="dataType" />
        <!-- <Gantt v-show="line=='A 線' || (site == 'D10 - 1F') && line=='All'" line="A 線"/>
        <Gantt v-show="line=='B 線'" line="B 線"/>
        <Gantt v-show="line=='C 線'" line="C 線"/>
        <Gantt v-show="line=='D 線'" line="D 線"/>
        <Gantt v-show="line=='E 線' || (site == 'D9 - 1F') && line=='All'" line="E 線"/>
        <Gantt v-show="line=='F 線'" line="F 線"/>
        <Gantt v-show="line=='G 線'" line="G 線"/> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Report from './ReportPreview.vue'
  import Gantt from './Gantt_chart.vue'
  import FactorySelection from './FactorySelection.vue'
  import { planPreview } from '../api.js'

  export default {
    components:{
      Report,
      Gantt,
      FactorySelection
    },
    data() {
      return {
        activeName: 'first',
        activeLine: '1',
        // lines: ['A線', 'B線', 'C線', 'D線', 'E線', 'F線', 'G線'],
        // tons: ['50','80','100','130'],
        ton: 'All',
        line: 'All',
        site: 'D10 - 1F',
        dataType:'planorder',
        datas: []
      };
    },
    computed:{
      field: function() {
        if (this.site == 'D9 - 1F') return 'D9'
        else return 'D10'
      }
    },
    methods: {
      /* eslint-disable */
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      handleSelect(item) {
        this.line = item
      },
      siteSelect(item) {
        this.site = item
      },
      tonSelect(item) {
        this.ton = item
      },
      getData() {
        planPreview('D10',undefined).then((response)=>{
          console.log(response.data.data)
          this.datas = response.data.data
        })
        .catch((error)=>{
          console.log(error)
        })
      }
      /* eslint-enable */
    },
    mounted() {
      // this.getData();
    }
  };
</script>

