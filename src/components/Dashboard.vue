<template>
  <div>
    <el-row class="header-row">NWE 成型生產總覽</el-row>
    <el-row>
      <el-col :span="12">
        <el-card 
          class="chart-box" 
          :style="isSelect == 'D9'? selectStyle: ''"
          :body-style="{ padding: '10px 30px 20px 10px' }"
        >
          <el-row>
            <el-col :span="16">
              <!-- <div class="radar" id="radar" ref="radar01" @click='onClick'></div> -->
              <v-chart 
                :options="Radar" 
                class="radar"
                autoresize
              ></v-chart>
            </el-col>
            <el-col :span="8" class="row-top">
              <el-row>總達成率</el-row>
              <el-row>
                <el-progress :text-inside="true" :stroke-width="20" :percentage="70" color="#17ba6a"></el-progress>
              </el-row>
              <el-row>總稼動率</el-row>
              <el-row>
                <el-progress :text-inside="true" :stroke-width="20" :percentage="70" color="#17ba6a"></el-progress>
              </el-row>
              <el-row style="display: inline;text-align: right;">
                <div style="padding: 20px 10px">
                  <el-button type="text" @click="callData('D9')">
                    Detail
                  </el-button>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card 
          class="chart-box"  
          :style="isSelect == 'D10'? selectStyle: ''"
          :body-style="{ padding: '10px 30px 20px 10px'}"
        >
          <el-row>
            <el-col :span="16">
              <v-chart 
                :options="Radar2" 
                class="radar"
                autoresize
                @click="onClick"
              ></v-chart>
            </el-col>
            <el-col :span="8" class="row-top">
              <el-row>總達成率</el-row>
              <el-row>
                <el-progress :text-inside="true" :stroke-width="20" :percentage="70" color="#17ba6a"></el-progress>
              </el-row>
              <el-row>總稼動率</el-row>
              <el-row>
                <el-progress :text-inside="true" :stroke-width="20" :percentage="70" color="#17ba6a"></el-progress>
              </el-row>
              <el-row style="display: inline;text-align: right;">
                <div style="padding: 20px 10px">
                  <el-button type="text" @click="callData('D10')">
                    Detail
                  </el-button>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="8">
        <el-card>
          <el-row>
            <el-col :span="20" style="text-align: left;">
              <div class="chart-title">{{ isSelect }} 產品不良率總覽</div>
            </el-col>
            <el-col :span="4" style="display: inline;text-align: right;">
              <el-button
                type="text"
                size="medium"
                @click="$router.push('/overview/dashboard/defectrate')"
              >
                詳情
              </el-button>
            </el-col>
          </el-row>
          <div class="chart-box">
            <v-chart 
              :options="barLine" 
              class="chart-box"
              autoresize
            ></v-chart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-row>
            <el-col :span="20" style="text-align: left;">
              <div class="chart-title">{{ isSelect }} 機台狀態總覽</div>
            </el-col>
            <el-col :span="4" style="display: inline;text-align: right;">
              <el-button
                type="text"
                size="medium"
                @click="$router.push('/overview/machine/'+isSelect)"
              >
                詳情
              </el-button>
            </el-col>
          </el-row>
          <div class="chart-box">
            <v-chart 
              :options="bar" 
              class="chart-box"
              autoresize
            ></v-chart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-row>
            <el-col :span="20" style="text-align: left;">
              <div class="chart-title">{{ isSelect }} 機台停機累計時間</div>
            </el-col>
          </el-row>
          <div class="chart-box">
            <v-chart 
              :options="bar2" 
              class="chart-box"
              autoresize
            ></v-chart>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import radar from './radar'
import barLine from './bar_line'
import bar from './bar'

let datasetA={
  'E線' : 0,
  'F線' : 0,
  'G線' : 0,
}

let datasetB={
  'A線' : 0,
  'B線' : 0,
  'C線' : 0,
  'D線' : 0,
}
let datasetC={
  '料花': 4,
  '黑紋': 2, 
  '刮傷': 1,
  '毛邊': 1,
  '異色': 1
}
let datasetD={
  '正常': 43,
  '待機': 2, 
  '調機': 2,
  '維修': 5,
  '修模': 2,
  '換模': 5,
  '斷線': 1
}
let datasetE=[
  {
    name:'C01',
    value: 3.1,
    status: '維修'
  },
  {
    name:'C06',
    value: 2.5,
    status: '維修'
  },
  {
    name:'A13',
    value: 1.8,
    status: '修模待機'
  },
  {
    name:'B03',
    value: 1,
    status: '維修'
  }
]

const radar_url='http://mockjs/radar/'
const machine_state='http://mockjs/machine_state/'
// 改變機台狀態總覽bar顏色
function changeBarColor(data) {
  let new_data=[]
  let data_keys = Object.keys(data);
  let data_values = Object.values(data);
  for (let i=0;i<data_keys.length;i++) {
    var tmp;
    switch (data_keys[i]) {
      case '正常' :
        tmp = {
          name: data_keys[i],
          value: data_values[i],
          itemStyle: {
            normal: {
              color: '#17ba6a',
            }
          }
        }
      break;
      case '待機' : 
          tmp = {
          name: data_keys[i],
          value: data_values[i],
          itemStyle: {
            normal: {
              color: '#f7e31d',
            }
          }
        }
      break;
      case '調機' : 
          tmp = {
          name: data_keys[i],
          value: data_values[i],
          itemStyle: {
            normal: {
              color: '#f7921d',
            }
          }
        }
      break;
      case '維修' : 
          tmp = {
          name: data_keys[i],
          value: data_values[i],
          itemStyle: {
            normal: {
              color: '#F50000',
            }
          }
        }
      break;
      case '修模' : 
          tmp = {
          name: data_keys[i],
          value: data_values[i],
          itemStyle: {
            normal: {
              color: '#3030FF',
            }
          }
        }
      break;
      case '換模' : 
          tmp = {
          name: data_keys[i],
          value: data_values[i],
          itemStyle: {
            normal: {
              color: '#990DFF',
            }
          }
        }
      break;
      case '斷線' : 
          tmp = {
          name: data_keys[i],
          value: data_values[i],
          itemStyle: {
            normal: {
              color: '#909399',
            }
          }
        }
      break;
    }
  new_data[data_keys[i]]=tmp
  }
  return new_data
}
// 改變機台停機累計時間的bar顏色
function changeBarColor2(data) {
  let new_data=[]
  for (let i = 0; i < data.length; i++) {
    let tmp;
    if (data[i].status == '維修') {
      tmp = {
        name: data[i].name,
        value: data[i].value,
        itemStyle: {
          normal: {
            color: '#F50000',
          }
        }
      }
    }
    else if (data[i].status == '修模待機') {
      tmp = {
        name: data[i].name,
        value: data[i].value,
        itemStyle: {
          normal: {
            color: '#3030FF',
          }
        }
      }
    }
    new_data[data[i].name] = tmp
  }
  return new_data
}

export default {
  data: () => ({
    Dashboard: 'Dashboard',
    Radar: radar('D9 開動率',datasetA),
    Radar2: radar('D10 開動率',datasetB),
    barLine: barLine(datasetC),
    bar: bar(changeBarColor(datasetD)),
    bar2: bar(changeBarColor2(datasetE)),
    isSelect: 'D10',
    selectStyle: 'border-color: #409EFF; border-width: 2px'
    // test: this.getRadarData()
  }),
  methods: {
    onClick(event) {
      // eslint-disable-next-line no-console
      console.log(event);
    },
    getRadarData(location) {
      axios.get(radar_url+location).then((response) => {
        let data = response.data
        var keys = Object.keys(data);
        var values = Object.values(data);
        let indicators = []
        for (let i=0;i<keys.length;i++) {
          indicators.push({
            name: keys[i],
            max: 100
          })
        }
        if (location == 'D9') {
          this.Radar.series[0].data[0].value = values
        }
        else if (location == 'D10') {
          this.Radar2.series[0].data[0].value = values
        }
      });
    },
    getMachineState(location) {
      axios.get(machine_state+location).then((response) => {
        let data = changeBarColor(response.data)
        var keys = Object.keys(data);
        var values = Object.values(data);

        this.bar.xAxis.data = keys
        this.bar.series[0].data = values
      });
    },
    callData(location) {
      this.isSelect = location
      this.getMachineState(location)
    }
  },
  mounted() {
    this.getRadarData('D9');
    this.getRadarData('D10');
    this.getMachineState('D10')
  }
};
</script>

<style>
.radar {
  width: 100%;
  height: 325px;
}
.chart-box{
  width: 95%;
  height: 345px;  
  margin: 0 auto;
}
.chart-title {
  padding: 0px 0 8px 0;
  font-weight: bold;
  font-size: 18px;
}
.row-top {
  padding: 20px 0;
}
.header-row {
  font-size: 32px;
  font-weight:bold;
}
</style>
