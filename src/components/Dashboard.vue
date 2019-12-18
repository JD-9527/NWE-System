<template>
  <div>
    <el-row class="header-row">NWE 成型生產總覽</el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="chart-box">
          <el-row>
            <el-col :span="16">
              <!-- <div class="radar" id="radar" ref="radar01" @click='onClick'></div> -->
              <v-chart 
                :options="Radar" 
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
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-box">
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
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card class="chart-box">
          <v-chart 
            :options="barLine" 
            class="chart-box"
            autoresize
          ></v-chart>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-box">
          <v-chart 
            :options="bar" 
            class="chart-box"
            autoresize
          ></v-chart>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-box">
          <v-chart 
            :options="bar2" 
            class="chart-box"
            autoresize
          ></v-chart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
// import 'echarts/lib/chart/line'
import radar from './radar'
import barLine from './bar_line'
import bar from './bar'

let datasetA={
  'E線' : 100,
  'F線' : 80,
  'G線' : 50,
}

let datasetB={
  'A線' : 100,
  'B線' : 80,
  'C線' : 50,
  'D線' : 65,
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
  '修膜待機': 2,
  '換膜': 5,
  '斷線': 1
}
let datasetE={
  'C01': 3.1,
  'C06': 2.5, 
  'A13': 1.8,
  'B03': 1
}
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
      case '修膜待機' : 
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
      case '換膜' : 
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

axios.get('http://172.31.8.175:8000/overview/machine/state/?line=D9')
  .then(function(response) {
    // eslint-disable-next-line no-console
    console.log(response.data.data);
  })
  .catch(function (error) {
    // handle error
    // eslint-disable-next-line no-console
    console.log(error);
  })

export default {
  data: () => ({
    Dashboard: 'Dashboard',
    Radar: radar('D9 開動率',datasetA),
    Radar2: radar('D10 開動率',datasetB),
    barLine: barLine('D10 產品不良率總覽',datasetC),
    bar: bar('D10 機台狀態總覽',changeBarColor(datasetD)),
    bar2: bar('D10 機台停機累計時間',datasetE),
    // test: this.getRadarData()
  }),
  methods: {
    onClick(event) {
      // eslint-disable-next-line no-console
      console.log(event);
    },
    getRadarData: (location) => {
      return axios.get('http://172.31.8.175:8000/overview/machine/state/?line='+location)
        .then(function(response) {
          // eslint-disable-next-line no-console
          // console.log(response);
          return response.data.data
        })
    }
  },
  mounted() {
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
  height: 350px;  
  margin: 0 auto;
}
.row-top {
  padding: 20px 0;
}
.header-row {
  font-size: 32px;
  font-weight:bold;
}
</style>
