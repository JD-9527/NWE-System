<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane
        v-for="(line) in lines"
        :key="line"
        :label="line"
        :name="line"
      >
      </el-tab-pane>
    </el-tabs>
    <Gantt v-if="activeName=='A 線'" line="A 線"/>
    <Gantt v-else-if="activeName=='B 線'" line="B 線"/>
    <Gantt v-else-if="activeName=='C 線'" line="C 線"/>
    <Gantt v-else-if="activeName=='D 線'" line="D 線"/>
    <Gantt v-else-if="activeName=='E 線'" line="E 線"/>
    <Gantt v-else-if="activeName=='F 線'" line="F 線"/>
    <!-- <Gantt v-show="activeName=='G 線'" line="G 線"/> -->
    <Gantt v-else line="G 線"/>
  </div>
</template>

<script>
import Gantt from './Gantt_chart.vue'

export default {
  components: {
    Gantt,
  },
  data() {
    return {
      activeName: 'A 線',
      activeLine: '1',
      lines: ['A 線', 'B 線', 'C 線', 'D 線', 'E 線', 'F 線', 'G 線'],
    }
  },
  methods: {
    /* eslint-disable */
    handleClick(tab, event) {
      // console.log(tab, event);
      console.log(tab.name)
    },
  }
}
</script>