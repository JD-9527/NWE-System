<template>
  <el-container id="app">
    <el-header>
      <el-row>
        <el-col :span="22" class="header-row">
          <el-button :icon="icons" style="font-size: 24px; color: #DDD" type="text" @click="onClick"></el-button>
          <img src="../assets/fii.png"  alt="FII" style="padding-top: 7px" />
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
          :default-active="activeItem"
          background-color="#424242"
          text-color="#eee"
          active-text-color="#486dd5"
          unique-opened
          router
          :collapse="isCollapse"
          style="border-right: 0px"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>生產狀態</span>
            </template>
              <el-menu-item index="/overview/dashboard">生產總覽</el-menu-item>
              <el-menu-item index="/overview/work_order">工單看板</el-menu-item>
              <el-menu-item index="/overview/machine/D10">機台看板</el-menu-item>
              <el-menu-item index="/overview/plan">計畫看板</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>生產統計</span>
            </template>
              <el-menu-item index="/productStatic/machinePerform">機台性能</el-menu-item>
              <el-menu-item index="/productStatic/2-2">生產利潤</el-menu-item>
              <el-menu-item index="/productStatic/2-3">其他查詢</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span slot="title">生產排程</span>
            </template>
            <el-menu-item index="/productSchedule/3-1">資料輸入</el-menu-item>
            <el-menu-item index="/productSchedule/3-2">計畫預覽</el-menu-item>
            <el-menu-item index="/productSchedule/3-3">工單計畫</el-menu-item>
            <el-menu-item index="/productSchedule/3-4">其他查詢</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-upload"></i>
              <span slot="title">數據錄入</span>
            </template>
            <el-menu-item index="/maintain/mold">模具維護</el-menu-item>
            <el-menu-item index="/maintain/machine">機台維護</el-menu-item>
            <el-menu-item index="/maintain/partno">料號維護</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-opportunity"></i>
              <span slot="title">智能節電</span>
            </template>
            <el-menu-item index="/saving/machine">機台看板</el-menu-item>
          </el-submenu>
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
      icons: "el-icon-s-fold",
      activeItem: ''
  }),
  watch : {
    $route: function () {
      let tmp_path = this.$route.path.split("/")
      this.activeItem = '/'+tmp_path[1] + '/' + tmp_path[2]
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token');
      this.$router.push('/login');
      // this.$store.dispatch('logout')
      // .then(() => {
      //   this.$router.push('/login')
      // })
    },
    onClick() {
      this.isCollapse=!this.isCollapse
      // this.asideWidth= this.isCollapse? "60px" : "200px"
      this.icons= this.isCollapse? "el-icon-s-unfold" : "el-icon-s-fold"
    },
    activeTab() {
      let tmp_path = this.$route.path.split("/")
      this.activeItem = '/'+tmp_path[1] + '/' + tmp_path[2]
    }
  },
  mounted() {
    this.activeTab();
  },
  created: function () {
    // this.$http.interceptors.response.use(undefined, function (err) {
    //   return new Promise(function () {
    //     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
    //       this.$store.dispatch('logout')
    //     }
    //     throw err;
    //   });
    // });
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟雅黑體", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0px;
  min-height: 768px;
  height: 100%;
}
.el-header {
    background-color: #123456;
    color: #eee;
    line-height: 60px;
}
.header-row {
  padding-top: 0px;
  display: flex;
  align-content:center;
}
.el-main {
  height: 100%;
  padding: 10px 20px 0 20px;
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
  width: 200px;
}
</style>
