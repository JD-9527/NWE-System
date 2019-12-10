<template>
  <div>
    <el-row>NWE 成型生產總覽</el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="chart-box">
          <div id="radar"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data: () => ({
    Dashboard: 'Dashboard'
  }),
  mounted() {
    this.$chart.radar('radar','D9 開動率');
  }
};
</script>

<style>
#radar {
  /*width: 500px;*/
  height: 500px;
}
.chart-box{
  width: 95%;
  height: 400px;  
  margin: 0 auto;
}
</style>
