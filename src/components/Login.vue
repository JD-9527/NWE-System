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
// import { login } from '@/api.js'
export default {
  data () {
    return {
      userName: 'nwe',
      password: 'foxconn88',
    }
  },
  methods: {
    /* eslint-disable */
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
    //     let access = 'login'
    //     let groups = 'website_maintainer'
    //     let username = 'nwe'
    //     this.$store.dispatch('user/login', { access, groups, username })
    //     this.$router.push('/overview/dashboard');
    //   } else{
    //     this.$message.error({
    //       message: '帳號或密碼錯誤！',
    //       center: true,
    //       duration: 2000
    //     });
    //   }
    // },
    login() {
      let username=this.userName
      let password=this.password
      login(username,password).then(response =>{
        // console.log(response)
        const { access, groups, username } = response.data
        if (typeof(access) != 'undefined') {
          // 登入成功
          this.$message({
            message: '登入成功！',
            type: 'success',
            center: true,
            duration: 2000
          });
          this.$store.dispatch('user/login', { access, groups, username })
          this.$router.push('/overview/dashboard').catch(e => {})
        }
        else {
          // 登入失敗
          this.$message.error({
            message: response.data.detail,
            center: true,
            duration: 5000
          });
        }
      })
      .catch((error) => {
        this.$message.error({
          message: error.response.data,
          center: true,
          duration: 5000
        });
      })
    }
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
