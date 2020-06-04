<template>
  <div>
    <div class="header-row">
      計畫預覽
    </div>
    <el-tabs v-model="activeName">
      <FactorySelection tonlist
        @lineSelected="handleSelect"
        @siteSelected="siteSelect"
      />
      <el-button size='mini' style="margin-left: 10px;">提交</el-button>

      <el-tab-pane label="推薦報表" name="first">
        <Report :field='field' :line="line"/>
      </el-tab-pane>
      <el-tab-pane label="推薦甘特圖" name="second">
        <Gantt draggable v-show="line=='A 線' || (site == 'D10 - 1F') && line=='All'" line="A 線"/>
        <Gantt draggable v-show="line=='B 線'" line="B 線"/>
        <Gantt draggable v-show="line=='C 線'" line="C 線"/>
        <Gantt draggable v-show="line=='D 線'" line="D 線"/>
        <Gantt draggable v-show="line=='E 線' || (site == 'D9 - 1F') && line=='All'" line="E 線"/>
        <Gantt draggable v-show="line=='F 線'" line="F 線"/>
        <Gantt draggable v-show="line=='G 線'" line="G 線"/>
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
        line: 'All',
        site: 'D10 - 1F',
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
      handleSelect(item) {
        this.line = item
      },
      siteSelect(item) {
        this.site = item
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

