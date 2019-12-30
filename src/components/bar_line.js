export default function bar_line(data) {
  let data_keys = Object.keys(data);
  let data_values = Object.values(data);
  let valuepercent = [];    // 儲存資料累計百分比
  let sum = 0;   // 計算資料總和
  let percent_sum = 0    // 計算百分比總和
  for (let i=0;i < data_values.length; i++) {
    sum += data_values[i]
  }
  for (let i=0;i < data_values.length; i++) {
    percent_sum += data_values[i]/sum
    valuepercent.push(percent_sum*100)
  }
  return {
    tooltip: {

    },
    grid:{
      top: '8%',
      bottom: '8%',
      left: '3%',
    },
    xAxis: {
      data: data_keys,
      type: 'category',
    },
    yAxis: [
      {
        name: '數量',
        type: 'value',
        min: 0,
        max: 5,
        interval: 1,
      },
      {
        name: '百分比',
        type: 'value',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
            formatter: '{value} %'
        }
      },
    ],
    series: [
      {
        itemStyle: {
          color: '#409EFF'
        },
        data: data_values,
        type: 'bar',
        barWidth: '60%',
      },
      {
        itemStyle: {
          color: '#123456'
        },
        data: valuepercent,
        yAxisIndex: 1,
        type: 'line'
      },
    ]
  }
}