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
      <div class="title">
       404 Error
      </div>
      <div class="highlight">
        頁面不存在
      </div>
      <div class="sub-title">
        您可以點擊"返回"回到上一頁
      </div>
      <div class="sub-title">
        或點擊側邊欄任意一項回到正確路徑
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'page404'
}
</script>
<style scoped>
.title {
  font-size: 32px;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
  color: #333;
}
.sub-title {
  font-size: 18px;
  text-align: center;
  line-height: 20px;
  color: #aaa;
}
.highlight {
  font-size: 64px;
  text-align: center;
  line-height: 500px;
  font-weight: bold;
  color: #aaa;
}
</style>