export default function radar(chartname,data) {
  let data_keys = Object.keys(data);
  let data_values = Object.values(data);
  let indicators = []
  for (let i=0;i<data_keys.length;i++) {
    indicators.push({
      name: data_keys[i],
      max: 100
    })
  }
  return {
    title: {
      text: chartname
    },
    tooltip: {
        formatter: function (params) {
        let result=params.name + '<br/>'
        // let keys = Object.keys(params.data);
        let vals = Object.values(params.value);
        for (var i = 0;i < vals.length;i++) {
          result +=  data_keys[i] + ': ' + vals[i] + '%<br/>';
        }
        return result
      },
    },
    radar: {
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: indicators
    },
    series: [{
      name: chartname,
      type: 'radar',
      lineStyle: {
        color: '#486dd5'
      },
      // areaStyle: {normal: {}},
      itemStyle: {
        color: '#123456'
      },
      data : [{
        value : data_values,
        name : '開動率'
      }]
    }]
  }
}