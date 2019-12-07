<template>
  <el-container id="app">
    <el-header>
      <el-row 
        style="height: 500px;"
      >
        <el-col :span="22">FII</el-col>
        <el-col :span="2">
          <el-button 
            icon="el-icon-switch-button" 
            @click="logout"
            class="dark-blue-theme"
          >登出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: #123456">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#123456"
          text-color="#eee"
          active-text-color="#486dd5"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>生產狀態</span>
            </template>
              <el-menu-item index="1-1">生產總覽</el-menu-item>
              <el-menu-item index="1-2">工單看板</el-menu-item>
              <el-menu-item index="1-3">機台看板</el-menu-item>
              <el-menu-item index="1-4">計畫看板</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>生產統計</span>
            </template>
              <el-menu-item index="2-1">機台性能</el-menu-item>
              <el-menu-item index="2-2">生產利潤</el-menu-item>
              <el-menu-item index="2-3">其他查詢</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-date"></i>
            <span slot="title">生產排程</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-upload"></i>
            <span slot="title">數據錄入</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
           <router-view/>
        </el-main>
        <el-footer
          height=30
        >
          {{ new Date().getFullYear() }} — &copy; IAI Innovative Application Dept.
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// import Dashboard from './components/Dashboard'
// import Login from './components/Login'

export default {
  name: 'App',
  components: {
    // Dashboard,
    // Login
  },
  data:() => ({
      
  }),
  methods: {
    logout(){
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  }
};
</script>

<style>
#app {
  margin-top: 0px;
  min-height: 768px; 
  height: 100%;
}
.el-header {
    background-color: #123456;
    color: #eee;
    line-height: 60px;
  }
.el-main {
  hight: 100%;
  /*padding: 0;*/
}
.el-aside {
  color: #eee;
}
.el-footer {
  background-color: #eee;
  text-align: center;
}
.dark-blue-theme {
  background-color: #123456; 
  color: #eee;
}
</style>
