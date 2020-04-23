<template>
  <div>
    <div>
      <div class="sub-title select">場域</div>
      <el-select
        size='mini'
        v-model="site"
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
      >
        <el-option
          v-for="item in lines"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="sub-title select">噸位</div>
      <el-select
        size='mini'
        v-model="ton"
      >
        <el-option
          v-for="item in tons"
          :key="item.value"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="ton"
        label="噸位"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="number"
        label="機台號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="color"
        label="當前顏色"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ch_time"
        label="上下模時間"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="起始時間"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="結束時間"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="品名"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="part_num"
        label="料號"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plastic_num"
        label="塑膠料號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="數量"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_num"
        label="模號"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_seq"
        label="模序"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mold_pos"
        label="模具儲位"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="plan_time"
        label="計畫工時"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="standard_cycle"
        label="標準週期"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="uph"
        label="UPH"
        width="100"
        align="center"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.select {
  width: 40px;
  display: inline-block;
}
</style>

<script>
export default {
  data: () => ({
    sites: [
      { value: 'D9 - 1F' },
      { value: 'D10 - 1F' }
    ],
    lines: [],
    tons: [
      { value: 'All' },
      { value: '50' },
      { value: '80' },
      { value: '100' },
      { value: '130' }
    ],
    site: 'D10 - 1F',
    line: 'All',
    ton: 'All',
    tableData: []
  }),
  watch: {
    site: function() {
      this.lines = this.loadLine(this.site)
      this.line = 'All'
    }
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
    loadTable() {
      let newTable = []
      for (let i=0;i<10;i++) {
        newTable.push({
          ton: '130',
          number: 'A01',
          color: '黑',
          ch_time: '00:00',
          start_time: '02:00',
          end_time: '14:00',
          name: '支架',
          part_num: '700-30985-01WA',
          plastic_num: '8M460-002E',
          count: '513',
          mold_num: 'NP10713',
          mold_seq: 'M1',
          mold_pos: 'D10-C2-02',
          plan_time: '24',
          standard_cycle: '24',
          uph: '306'
        })
      }
      return newTable
    }
  },
  mounted() {
    this.lines = this.loadLine()
    this.tableData = this.loadTable()
  }
}
</script>