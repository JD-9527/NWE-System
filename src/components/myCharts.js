/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */

import echarts from 'echarts'

const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          radar: function (id,chartname,data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            let data_keys = Object.keys(data);
            let data_values = Object.values(data);
            let indicators = []
            for (let i=0;i<data_keys.length;i++) {
              indicators.push({
                name: data_keys[i],
                max: 100
              })
            }
            const optionData = {
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
            };
            this.chart.setOption(optionData);
          },
          bar: function (id,chartname,data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            let data_keys = Object.keys(data);
            let data_values = Object.values(data);
            const optionData = {
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
            this.chart.setOption(optionData);
          },
          bar_line: function (id,chartname,data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
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
            const optionData = {
              title: {
                text: chartname
              },
              tooltip: {

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
                  type: 'bar'
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
            this.chart.setOption(optionData);
          },
        }
      }
    }
  })
}

export default {
    install
}