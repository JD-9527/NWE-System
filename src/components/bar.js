export default function bar(chartname,data) {
  let data_keys = Object.keys(data);
  let data_values = Object.values(data);
  return {
    title: {
      text: chartname
    },
    tooltip: {

    },
    xAxis: {
      data: data_keys,
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      itemStyle: {
        color: '#409EFF'
      },
      data: data_values,
      type: 'bar'
    }]
  }
}