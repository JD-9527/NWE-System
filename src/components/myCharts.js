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
          //画一条简单的线
          radar: function (id,chartname) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            const optionData = {
              title: {
                text: chartname
              },
              tooltip: {},
              legend: {
                data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
              },
              radar: {
              // shape: 'circle',
                name: {
                  textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                  }
                },
                indicator: [
                  { name: 'A線', max: 6500},
                  { name: 'B線', max: 16000},
                  { name: 'C線', max: 30000},
                ]
              },
                series: [{
                  name: '预算 vs 开销（Budget vs spending）',
                  type: 'radar',
                  // areaStyle: {normal: {}},
                  data : [
                    {
                      value : [4300, 10000, 28000],
                      name : '预算分配（Allocated Budget）'
                    },
                     {
                      value : [5000, 14000, 28000],
                      name : '实际开销（Actual Spending）'
                    }
                  ]
                }]
              };
            this.chart.setOption(optionData);
            setTimeout(function (){
              window.onresize = function () {
                this.chart.resize();
              }
            },200)
          },
        }
      }
    }
  })
}

export default {
    install
}