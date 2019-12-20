<template>
  <el-container id="app">
    <el-header>
      <el-row>
        <el-col :span="22" style="font-size: 24px">
          <!-- <el-button type="text" :icon="icons" @click="onClick"></el-button>  -->
          <i :class="icons" @click="onClick"></i>
          FII
        </el-col>
        <el-col :span="2">
          <el-button 
            icon="el-icon-switch-button" 
            @click="logout"
            class="dark-blue-theme"
            type="text"
          >登出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="initial" style="background-color: #424242;">
        <el-menu
          class="drawer"
          default-active="2"
          background-color="#424242"
          text-color="#eee"
          active-text-color="#486dd5"
          unique-opened
          router
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>生產狀態</span>
            </template>
              <el-menu-item index="dashboard">生產總覽</el-menu-item>
              <el-menu-item index="work_order">工單看板</el-menu-item>
              <el-menu-item index="machine">機台看板</el-menu-item>
              <el-menu-item index="plan">計畫看板</el-menu-item>
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
      isCollapse: false,
      asideWidth: "200px",
      icons: "el-icon-s-fold"
  }),
  methods: {
    logout(){
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    onClick() {
      this.isCollapse=!this.isCollapse
      // this.asideWidth= this.isCollapse? "60px" : "200px"
      this.icons= this.isCollapse? "el-icon-s-unfold" : "el-icon-s-fold"
    }
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
  /*padding: 10px;*/
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
.drawer:not(.el-menu--collapse) {
  /*height: 100vh;*/
  width: 180px;
}
</style>
