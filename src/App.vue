<template>
  <div id="app">
    <router-view/>
  </div>
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
      this.activeItem = '/'+this.$route.path.split("/")[1]
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
      this.activeItem = '/'+this.$route.path.split("/")[1]
    }
  },
  mounted() {
    this.activeTab();
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
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
