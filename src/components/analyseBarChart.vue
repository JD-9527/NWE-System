<template>
  <div>
    <v-chart
      :options="getOptions()"
      class="chart-box"
      autoresize
    ></v-chart>
  </div>
</template>

<style scoped>
.chart-box{
  width: 100%;
  height: 200px;
  margin: 0 auto;
}
</style>

<script>
export default {
  props : {
    data: {
      type: Array,
      default: () => [120, 200, 150, 80]
    }
  },
  methods: {
    getOptions() {
      return {
        grid: {
          left: '30',
          top: '30',
          right: '10',
          bottom: '20'
        },
        xAxis: {
          type: 'category',
          data: ['OEE', '稼動率', '生產效率', '良品率']
        },
        yAxis: {
          type: 'value'
        },
        color: '#409EFF',
        series: [{
          data: this.data,
          type: 'bar',
          barWidth: '30'
        }]
      }
    },
  }
}
</script>