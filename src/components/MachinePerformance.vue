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
      time_array: [],            //回傳開始和結束之間的日期(array)
      analyseTitle: ['A線','B線','C線','D線'],
      radio1: 'OEE',
      radio_list: ['OEE','稼動率','效率','良率']
    }
  },
  watch: {
    start_end: function() {
      this.time_array = this.getAllDate(this.start_end)
    },
    site1: function() {
      this.lines = this.loadLine(this.site1)
      this.line1 = 'All'
    },
    line1: function() {
      this.machs = this.loadMach(this.line1)
      this.mach1 = 'All'
    }
  },
  methods: {
    /* eslint-disable */
    loadSite() {
      return [
        {value: 'D9 - 1F'},
        {value: 'D10 - 1F'},
      ];
    },
    loadLine(site) {
      if (site == 'D9 - 1F') {
        return [
          {value: 'All'},
          {value: 'E 線'},
          {value: 'F 線'},
          {value: 'G 線'},
        ];
      }
      else {
        return [
          {value: 'All'},
          {value: 'A 線'},
          {value: 'B 線'},
          {value: 'C 線'},
          {value: 'D 線'}
        ];
      }
    },
    loadMach(line) {
      // this.mach1 = 'All'
      if (line == 'All') {
        return [{ value: 'All' }]
      }
      else if (line == 'A 線') {
        let mach = []
        mach.push({value: 'All'})
        for (let i=0;i<15;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          mach.push({ value: 'A'+num })
        }
        return mach
      }
      else if (line == 'B 線') {
        let mach = []
        mach.push({value: 'All'})
        for (let i=0;i<14;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          mach.push({ value: 'B'+num })
        }
        return mach
      }
      else if (line == 'C 線') {
        let mach = []
        mach.push({value: 'All'})
        for (let i=0;i<12;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          mach.push({ value: 'C'+num })
        }
        return mach
      }
      else if (line == 'D 線') {
        let mach = []
        mach.push({value: 'All'})
        for (let i=0;i<19;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          mach.push({ value: 'D'+num })
        }
        return mach
      }
      else if (line == 'E 線') {
        let mach = []
        mach.push({value: 'All'})
        for (let i=0;i<21;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          mach.push({ value: 'E'+num })
        }
        return mach
      }
      else if (line == 'F 線') {
        let mach = []
        mach.push({value: 'All'})
        for (let i=0;i<17;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          mach.push({ value: 'F'+num })
        }
        return mach
      }
      else if (line == 'G 線') {
        let mach = []
        mach.push({value: 'All'})
        for (let i=0;i<9;i++) {
          let num = (i+1)<10? '0'+(i+1): (i+1)
          mach.push({ value: 'G'+num })
        }
        return mach
      }
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
    this.machs = this.loadMach('All');
    this.classes = this.loadClass();
    this.time_array = this.getAllDate(this.getLast7Days())
  }
}
</script>