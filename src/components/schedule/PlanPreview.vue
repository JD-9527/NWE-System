<template>
  <div>
    <div class="header-row">
      計畫預覽
    </div>
    <el-tabs v-model="activeName">
      <el-row type="flex">
        <FactorySelection tonlist
          @lineSelected="handleSelect"
          @siteSelected="siteSelect"
          @tonSelected="tonSelect"
        />
        <el-button
          size='mini'
          style="margin-left: 10px; height: 28px;"
          @click="submit_plan"
        >
          提交
        </el-button>
      </el-row>

      <el-tab-pane label="推薦報表" name="first">
        <report
          :key="renderComponent"
          :field='field'
          :line='line'
          :ton='ton'
          @select="tableSelect"
        ></report>
      </el-tab-pane>
      <el-tab-pane label="推薦甘特圖" name="second">

        <Gantt :line="line" :site="site" :ton="ton" :dataType="dataType" />
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
  import FactorySelection from '../base/FactorySelection.vue'
  import { planPreview,submitarrangement } from '@/api.js'
  import { workbook2blob, openDownloadDialog } from '@/utils/excel.js'

  export default {
    components:{
      Report: () => import('./ReportPreview.vue'),
      Gantt: () => import('../Gantt_chart.vue'),
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
        site: 'All',
        dataType:'planorder',
        datas: [],
        renderComponent:0,
        selection: [],
      };
    },
    computed:{
      field: function() {
        if (this.site == 'D9 - 1F')
          return 'D9'
        else if (this.site == 'D10 - 1F')
          return 'D10'
        else
          return 'All'
      }
    },
    methods: {
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
          // console.log(response.data.data)
          this.datas = response.data.data
        })
        .catch((error)=>{
          // eslint-disable-next-line no-console
          console.log(error)
        })
      },
      submit_plan(){ //call submitarrangement api
        let Submit = new Object()
        Submit = submitarrangement
        Submit(this.selection).then((response)=>{
          if (response.status == 200) {
            this.$message.success('提交成功！')
          }
          else {
            this.$message.error(response.Message)
          }
        })
        // eslint-disable-next-line no-console
        .catch(error => console.log(error.response));
        this.renderComponent +=1 //refresh component
      },
      tableSelect(selection) {
        let seqList = []
        selection.forEach(row => {
          seqList.push(row.Seq)
        })
        this.selection = seqList
      },
      downloadData() {
        let excelData = []
        this.filterTable.forEach(row => {
          excelData.push({
            '開始時間': row.start,
            '結束時間': row.end,
            '生產線別': row.line,
            '機台號': row.machine_NO,
            '異常項目': row.abnormal_item,
            '異常分鐘': row.abnormal_time,
            '異常I/O': row.abnormal_io,
            '異常類型': row.abnormal_type,
            '備註': row.remark,
          })
        })

        let wb = this.$xlsx.utils.book_new()
        let sheet = this.$xlsx.utils.json_to_sheet(excelData)

        this.$xlsx.utils.book_append_sheet(wb, sheet, '監控統計報表')
        // 创建工作薄blob
        const workbookBlob = workbook2blob(wb)
        // 导出工作薄
        openDownloadDialog(workbookBlob, '監控統計報表.xlsx')
      },
    },
    mounted() {
      this.getData();
    }
  };
</script>

