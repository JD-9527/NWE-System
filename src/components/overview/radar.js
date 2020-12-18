// import axios from 'axios'

export default function radar(chartname,data) {
  // const url='http://172.31.8.175:8000/overview/machine/state/?line='+location
  // var data = []
  let data_keys = []
  let data_values =[]
  let indicators = []
  // axios.get(url).then((response) => {
    // var data=response.data
  var keys = Object.keys(data);
  var values = Object.values(data);
  for (let i=0;i<keys.length;i++) {
    indicators.push({
      name: keys[i],
      max: 100
    })
    data_keys.push(keys[i])
    data_values.push(values[i])
  }
  // });
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