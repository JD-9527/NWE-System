<template>
  <div>
    <el-row>NWE 成型生產總覽</el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="chart-box">
          <el-row>
            <el-col :span="16">
              <div class="radar" id="radar" ref="radar01"></div>
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
              <div class="radar" id="radar2" ref="radar02"></div>
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
          <div class="radar" id="bar1" ref="bar01"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-box">
          <div class="radar" id="bar2" ref="bar02"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-box">
          <div class="radar" id="bar3" ref="bar03"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let datasetA={
  'D線' : 100,
  'E線' : 80,
  'F線' : 50,
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
export default {
  data: () => ({
    Dashboard: 'Dashboard'
  }),
  methods: {
    changeBarColor(data) {
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
                  color: '#FF0000',
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
  },
  mounted() {
    this.$chart.radar('radar','D9 開動率',datasetA);
    this.$chart.radar('radar2','D10 開動率',datasetB);
    this.$chart.bar_line('bar1','D10 產品不良率總覽',datasetC);
    this.$chart.bar('bar2','D10 機台狀態總覽',this.changeBarColor(datasetD));
    this.$chart.bar('bar3','D10 機台停機累計時間',datasetC);
  }
};
</script>

<style>
.radar {
  height: 300px;
}
.chart-box{
  width: 95%;
  height: 350px;  
  margin: 0 auto;
}
.row-top {
  padding: 20px 0;
}
</style>
