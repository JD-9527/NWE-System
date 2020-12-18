<template>
  <el-row>
    <el-col :span="1">
      <el-button
        type="text"
        @click="$router.go(-1)"
        style="font-size: 20px; color: #424242;"
      >
        <i class="el-icon-back"></i>返回
      </el-button>
    </el-col>
    <el-col :span="22">
      <div style="font-size: 36px; text-align: center; font-weight: bold">
        D10 產品不良率總覽
      </div>
    </el-col>
    <el-col>
      <div class="charts-box">
        <v-chart
          :options="barStack"
          autoresize
          style="width: 100%; height: 75vh"
        />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
  .charts-box{
    width: 100%;
    height: 75vh;
    text-align: center;
  }
</style>

<script>
function hideZero(list) {
  let tmp = list
  for (let i=0;i < list.length;i++) {
    if (tmp[i]== 0) { tmp[i] = null}
  }
  return tmp
}

export default{
  data: () => ({
    barStack: {
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['毛邊', '缺膠','黑紋']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis:  {
        type: 'category',
        data: ['C01','A04','D09','C12','B11']
      },
      yAxis: {
        type: 'value'
      },
      color: ["#ff7f3c","#a3a1fb","#5068a4"],
      series: [
        {
          name: '毛邊',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{a}'
            },
          },
          data: hideZero([2, 3, 1, 0, 0])
        },
        {
          name: '缺膠',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{a}'
            }
          },
          data: hideZero([2, 0, 1, 1, 1])
        },
        {
          name: '黑紋',
          type: 'bar',
          stack: '总量',
          barWidth: '40%',
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{a}'
            }
          },
          data: hideZero([1, 0, 0, 0, 0])
        }
      ]
    }
  })
}

</script>