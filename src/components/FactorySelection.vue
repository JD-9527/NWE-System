<template>
  <div style="display: inline-block;">
    <div class="sub-title select">場域</div>
    <el-select
      size='mini'
      v-model="site"
      style="width: 120px;"
      @change="siteSelected"
    >
      <el-option
        v-for="item in sites"
        :key="item.value"
        :label="item.value"
        :value="item.value">
      </el-option>
    </el-select>
    <div class="sub-title select">線別</div>
    <el-select
      size='mini'
      v-model="line"
      style="width: 100px;"
      @change="lineSelected"
    >
      <el-option
        v-for="item in lines"
        :key="item.value"
        :label="item.value"
        :value="item.value"
      ></el-option>
    </el-select>
    <div class="sub-title select" v-if="machlist">機台</div>
    <el-select
      v-model="mach"
      placeholder=" "
      size="mini"
      style="width: 100px;"
      v-if="machlist"
    >
      <el-option
        v-for="item in machs"
        :key="item.value"
        :label="item.value"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div class="sub-title select" v-if="tonlist">噸位</div>
    <el-select
      size='mini'
      v-model="ton"
      v-if="tonlist"
      @change="tonSelected"
    >
      <el-option
        v-for="item in tons"
        :key="item.value"
        :label="item.value"
        :value="item.value">
      </el-option>
    </el-select>
    <div class="sub-title select" v-if="time">班別</div>
    <el-select
      v-model="class1"
      placeholder=" "
      size="mini"
      v-if="time"
      style="width: 100px;"
    >
      <el-option
        v-for="item in classes"
        :key="item.value"
        :label="item.value"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div class="sub-title select" v-if="time">日期</div>
    <el-date-picker
      v-model="start_end"
      type="daterange"
      size="mini"
      value-format="yyyy-MM-dd"
      v-if="time"
      @change="timeSelected"
    ></el-date-picker>
  </div>
</template>

<script>
import { planTonList } from '../api.js'
export default {
  data() {
    return {
      sites: [
        { value: 'All' },
        { value: 'D9 - 1F' },
        { value: 'D10 - 1F' }
      ],
      lines: [],
      tons: [
        { value: 'All' },
      ],
      machs: [],
      classes: [
        {value: 'All'},
        {value: '早班'},
        {value: '晚班'},
      ],
      class1: 'All',
      site: 'All',
      line: 'All',
      ton: 'All',
      mach: 'All',
      start_end: this.getLast7Days(),
    }
  },
  props:{
    machlist: {
      type: Boolean,
      default: false
    },
    tonlist: {
      type: Boolean,
      default: false
    },
    time: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    site: function() {
      this.line = 'All'
      this.lines = this.loadLine(this.site)
      this.$emit('lineSelected',this.line)

      this.mach = 'All'
      this.machs = this.loadMach(this.line)

      this.ton = 'All'
      this.tons = this.loadTons(this.line)
      this.$emit('tonSelected',this.ton)
    },
    line: function() {
      this.mach = 'All'
      this.machs = this.loadMach(this.line)

      this.ton = 'All'
      this.tons = this.loadTons(this.line)
      this.$emit('tonSelected',this.ton)
    },
  },
  methods: {
    loadLine(site) {
      if (site == 'D9 - 1F') {
        return [
          {value: 'All'},
          {value: 'E 線'},
          {value: 'F 線'},
          {value: 'G 線'},
        ];
      }
      else if (site == 'D10 - 1F') {
        return [
          {value: 'All'},
          {value: 'A 線'},
          {value: 'B 線'},
          {value: 'C 線'},
          {value: 'D 線'}
        ];
      }
      else {
        return [
          {value: 'All'},
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
    loadTons(mach) {
      let new_tons = [{value: 'All'}]
      planTonList(mach[0]).then((response)=>{
        let data = response.data.data
        let item = ''
        for (item of data) {
          new_tons.push({value: item})
        }
      })
      return new_tons
    },
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
    timeSelected(item) {
      this.$emit('timeSelected',item)
    },
    lineSelected(item) {
      this.$emit('lineSelected',item)
    },
    siteSelected(item) {
      this.$emit('siteSelected',item)
    },
    tonSelected(item) {
      this.$emit('tonSelected',item)
    },

  },
  mounted() {
    this.lines = this.loadLine()
    this.machs = this.loadMach('All')
  }
}
</script>