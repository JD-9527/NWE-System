<template>
  <div>
    <el-row class="header-row">機台性能總覽</el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="車間維護" name="1">
        <FactorySelection machlist time
          @timeSelected="handleSelect"
        />
        <el-card style="margin-bottom: 20px;">
          <el-radio-group
            v-model="radio1"
            size="mini"
            v-for="radio in radio_list"
            :key="radio"
          >
            <el-radio-button :label="radio"></el-radio-button>
          </el-radio-group>
          <mpchart
            :time_list="time_array"
            v-show="radio1 == radio_list[0]"
            :title="'D10 ' + radio_list[0]"
          />
          <mpchart
            :time_list="time_array"
            v-show="radio1 == radio_list[1]"
            :title="'D10 ' + radio_list[1]"
          />
          <mpchart
            :time_list="time_array"
            v-show="radio1 == radio_list[2]"
            :title="'D10 ' + radio_list[2]"
          />
          <mpchart
            :time_list="time_array"
            v-show="radio1 == radio_list[3]"
            :title="'D10 ' + radio_list[3]"
          />
        </el-card>
        <el-card style="margin-bottom: 20px;">
          <el-row :gutter="20">
            <div style="font-size: 20px; margin-left: 20px; margin-bottom: 5px;">線體 總指標分析</div>
            <el-col
              :span="6"
              v-for="i in 4"
              :key="i"
            >
              <abchart :title="analyseTitle[i-1]"/>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="成型模具" name="2">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 5px;
}
.upload {
  position: absolute;
  left: 66px;
  width: 80px;
  color: #409EFF;
}
.commit {
  position: relative;
  /*margin-left: 5px;*/
  left: 86px;
}
.change{
  position: absolute;
  overflow: hidden;
  line-height: 28px;
  left: 66px;
  width: 80px;
  opacity: 0;
}
</style>

<script>
import mpchart from './machPerformChart.vue'
import abchart from './analyseBarChart.vue'
import FactorySelection from './FactorySelection.vue'

export default {
  components: {
    mpchart,
    abchart,
    FactorySelection,
  },
  data() {
    return {
      activeName: '1',  // 默認激活的tab
      sites: [],
      lines: [],
      machs: [],
      classes: [],
      site1: 'D10 - 1F',
      line1: 'All',
      mach1: 'All',
      class1: 'All',
      start_end: this.getLast7Days(),   //預設回傳今天和往前7天的日期
      value: '',
      time_array: [],            //回傳開始和結束之間的日期(array)
      analyseTitle: ['A線','B線','C線','D線'],
      radio1: 'OEE',
      radio_list: ['OEE','稼動率','效率','良率']
    }
  },
  methods: {
    /* eslint-disable */
    //Date格式轉字串
    convertDate(time) {
      let new_time = new Date(time)
      var yyyy = new_time.getFullYear();
      var MM = (new_time.getMonth() + 1) >= 10 ? (new_time.getMonth() + 1) : ("0" + (new_time.getMonth() + 1));
      var dd = new_time.getDate() < 10 ? ("0"+new_time.getDate()) : new_time.getDate();
      return yyyy + "-" + MM + "-" + dd
    },
    //抓取今天和7天前時間
    getLast7Days() {
      var fullDate = new Date();
      var today = this.convertDate(fullDate);
      var last_week = fullDate.setDate(fullDate.getDate() - 6)
      var last = this.convertDate(last_week);
      return [last,today];
    },
    //回傳時間區間內所有日期array
    getAllDate(start_end) {
      let start = new Date(start_end[0])
      let end = new Date(start_end[1])
      let days = (end - start)/(1000*60*60*24)     //計算相差幾天
      let date_array = []
      date_array.push(this.convertDate(start))
      for (let i = 0; i < days; i++) {
        let newDate = start.setDate(start.getDate() + 1)
        let newDate_s = this.convertDate(newDate);
        date_array.push(newDate_s)
      }
      // console.log(date_array)
      return date_array
    },
    handleSelect(item) {
      this.time_array = this.getAllDate(item)
    },
    /* eslint-enable */
  },
  mounted() {
    this.time_array = this.getAllDate(this.getLast7Days())
  }
}
</script>