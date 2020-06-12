<template>
  <el-container style="height: 100%;">
    <el-header>
      <img src="../assets/fii.png"  alt="FII" style="padding-top: 7px; padding-left: 26px" />
    </el-header>
    <el-main>
      <div>
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 85vh;"
        >
          <el-col :span="12">
            <el-card shadow="always">
              <span>
                <div slot="header" class="login-header">Smart Modling Management System</div>
                <div class="sub-title">Welcome Back! Please login to your account.</div>
              </span>
              <el-row >
                <el-col :span="14" :offset="5">
                  <el-input v-model="userName" placeholder="Username"></el-input>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="14" :offset="5">
                  <el-input placeholder="Password" v-model="password" show-password></el-input>
                </el-col>
              </el-row>
              <div style="display: inline; text-align: center;">
                <div>
                  <el-button
                    style="background-color: #123456; color: #eee;"
                    @click="login(userName,password)"
                  >Login</el-button>
                  <el-button plain>Sign up</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <!-- <div style="position: absolute; bottom: 15%; color: #f2f2f2; text-align: center;">
            <strong>Username: nwe<br/>
            Password: foxconn88</strong>
          </div> -->
        </el-row>
      </div>
    </el-main>
    <el-footer height=30>
      {{ new Date().getFullYear() }} — &copy; IAI Innovative Application Dept.
    </el-footer>
  </el-container>
</template>

<script>

export default {
  data () {
    return {
      userName: 'nwe',
      password: 'foxconn88',
    }
  },
  methods: {
    /* eslint-disable */
    login() {
      if( this.userName == 'nwe' && this.password == 'foxconn88' ){
        localStorage.setItem('token', 'ImLogin')
        this.$message({
          message: '登入成功！',
          type: 'success',
          center: true,
          duration: 2000
        });
        this.$store.dispatch('user/login',['visitor'])
        // console.log(this.$store.getters)
        this.$router.push('/overview/dashboard').catch((err) => { console.log('Error:',err) });
      }
      else if ( this.userName == 'admin' && this.password == 'foxconn88' ){
        localStorage.setItem('token', 'ImLogin')
        this.$message({
          message: '登入成功！',
          type: 'success',
          center: true,
          duration: 2000
        });
        this.$store.dispatch('user/login', ['website_maintainer'])
        this.$router.push('/overview/dashboard').catch((err) => { console.log('Error:',err) });
      }
      else{
        this.$message.error({
          message: '帳號或密碼錯誤！',
          center: true,
          duration: 2000
        });
      }
      // console.log(this.$store.getters.roles)
    }
    // login(){
    //   // write login authencation logic here!323
    //   if( this.userName == 'nwe' && this.password == 'foxconn88' ){
    //     localStorage.setItem('token', 'ImLogin')
    //     this.$message({
    //       message: '登入成功！',
    //       type: 'success',
    //       center: true,
    //       duration: 2000
    //     });
    //     this.$router.push('/overview/dashboard');
    //   } else{
    //     this.$message.error({
    //       message: '帳號或密碼錯誤！',
    //       center: true,
    //       duration: 2000
    //     });
    //   }
    // login() {
    //   // const { username, password } = userInfo
    //   if ( this.userName == 'nwe' && this.password == 'foxconn88' ){
    //     // commit('SET_TOKEN', data.token)
    //     this.$store.commit('SET_ROLES', 'visitor')
    //   }
    //   else if ( this.userName == 'admin' && this.password == 'foxconn88' ){
    //     // commit('SET_TOKEN', data.token)
    //     this.$store.commit('SET_ROLES', 'website_maintainer')
    //   }
    // },
      // let username=this.userName
      // let password=this.password
      // this.$store.dispatch('login', { username, password })
      //   .then(() => {
      //     this.$router.push('/dashboard')}
      //   )
      //   .catch(() => {
      //    this.$message.error({
      //     message: '帳號或密碼錯誤！',
      //     center: true,
      //     duration: 2000
      //   });
      //   })
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  };
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.login-header {
  font-size: 28px;
  font-weight:bold;
  text-align: center;
  margin-bottom: 10px;
}

</style>
