<template>
  <div>
    <div class="header-row">
      計畫預覽
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="推薦報表" name="first">
        <Report/>
      </el-tab-pane>
      <el-tab-pane label="推薦甘特圖" name="second">
        推薦甘特圖
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Report from './ReportPreview.vue'
  export default {
    components:{
      Report,
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      /* eslint-disable */
      handleClick(tab, event) {
        console.log(tab, event);
      }
      /* eslint-enable */
    }
  };
</script>

