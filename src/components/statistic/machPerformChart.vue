<template>
  <div>
    <div style="text-align: center;">{{ title }}</div>
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
  height: 300px;
  margin: 0 auto;
}
</style>

<script>

export default {
  props : {
    time_list: Array,
    data: {
      type: Array,
      default: () => [82.0, 93.2, 90.1, 93.4, 29.0, 33.0, 32.0]
    },
    title: String,
  },
  methods: {
    getOptions() {
      return {
        grid: {
          left: '5%',
          top: '40',
          right: '5%',
          bottom: '25'
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          data: this.time_list
        },
        yAxis: {
          name: '(%)',
          nameLocation: 'end',
          type: 'value',
        },
        color: '#409EFF',
        series: [{
          data: this.data,
          type: 'line',
          smooth: true,
          markLine: {
            show: true,
            itemStyle: {
              color: '#2f4554',
            },
            label: {
              show: true,
              formatter : '{b}\n{c} %'
            },
            data: [
              {
                name: 'Sta.',
                yAxis: '80',
              },
              {
                name: 'Avg.',
                type: 'average'
              },
            ]
          }
        }]
      }
    },
  }
}
</script>