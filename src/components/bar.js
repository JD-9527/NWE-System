export default function bar(data) {
  let data_keys = Object.keys(data);
  let data_values = Object.values(data);

  return {
    tooltip: {

    },
    grid:{
      top: '20',
      bottom: '8%',
      left: '25',
      right: '3%',
    },
    xAxis: {
      data: data_keys,
      type: 'category',
      axisLabel : {
        rotate: -20,
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      itemStyle: {
        color: '#409EFF'
      },
      barWidth: '60%',
      data: data_values,
      type: 'bar'
    }]
  }
}