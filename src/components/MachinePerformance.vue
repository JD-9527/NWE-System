<template>
  <div>
    <el-row class="header-row">機台性能總覽</el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="車間維護" name="1">
        <el-row>
          <el-col :span="1" style="margin-top: 5px;">
            <div class="sub-title">場域</div>
          </el-col>
          <el-col :span="3">
            <el-select
              v-model="site1"
              placeholder=" "
              size="mini"
              @change="handleSelect"
            >
              <el-option
                v-for="item in sites"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" style="margin-top: 5px;">
            <div class="sub-title">線別</div>
          </el-col>
          <el-col :span="2">
            <el-select
              v-model="line1"
              placeholder=" "
              size="mini"
              @change="handleSelect"
            >
              <el-option
                v-for="item in lines"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" style="margin-top: 5px;">
            <div class="sub-title">機台</div>
          </el-col>
          <el-col :span="2">
            <el-select
              v-model="mach1"
              placeholder=" "
              size="mini"
              @change="handleSelect"
            >
              <el-option
                v-for="item in machs"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" style="margin-top: 5px;">
            <div class="sub-title">班別</div>
          </el-col>
          <el-col :span="3">
            <el-select
              v-model="class1"
              placeholder=" "
              size="mini"
              @change="handleSelect"
            >
              <el-option
                v-for="item in classes"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" style="margin-top: 5px;">
            <div class="sub-title">日期</div>
          </el-col>
          <el-col :span="3">
            <el-date-picker
              v-model="start_end"
              type="daterange"
              size="mini"
              value-format="yyyy-MM-dd"
              @change="handleSelect"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-card style="margin-bottom: 20px;">
          <mpchart :time_list="time_array"/>
        </el-card>
        <el-card style="margin-bottom: 20px;">
          <el-row :gutter="20">
            <div style="font-size: 20px; margin-left: 20px;">線體 總指標分析</div>
            <el-col
              :span="6"
              v-for="i in 4"
              :key="i"
            >
              <abchart/>
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
.header-row {
  font-size: 32px;
  font-weight:bold;
}
.sub-header-row {
  font-size: 20px;
  color: #888;
  font-weight: normal;
}
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

export default {
  components: {
    mpchart,
    abchart,
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
      time_array: []            //回傳開始和結束之間的日期(array)
    }
  },
  watch: {
    start_end: function() {
      this.time_array = this.getAllDate(this.start_end)
    }
  },
  methods: {
    /* eslint-disable */
    loadSite() {
      return [
        {value: 'D9 - 1F'},
        {value: 'D9 - 2F'},
        {value: 'D10 - 1F'},
        {value: 'D10 - 2F'}
      ];
    },
    loadLine() {
      return [
        {value: 'All'},
        {value: 'A 線'},
        {value: 'B 線'},
        {value: 'C 線'}
      ];
    },
    loadMach() {
      return [
        {value: 'All'},
        {value: 'A01'},
        {value: 'B01'},
        {value: 'C01'}
      ];
    },
    loadClass() {
      return [
        {value: 'All'},
        {value: '早班'},
        {value: '晚班'},
      ];
    },
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
      console.log(item);
    },
    /* eslint-enable */
  },
  mounted() {
    this.sites = this.loadSite();
    this.lines = this.loadLine();
    this.machs = this.loadMach();
    this.classes = this.loadClass();
    this.time_array = this.getAllDate(this.getLast7Days())
  }
}
</script>