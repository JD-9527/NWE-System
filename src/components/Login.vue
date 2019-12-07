<template>
  <div>
    <el-row 
      type="flex" 
      justify="center" 
      align="middle"
      style="height: 768px;"
    >
      <el-col :span="16">
        <el-card shadow="never">
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
          <el-row>
            <el-col :span="10" :offset="8">
              <el-button 
                style="background-color: #123456; color: #eee;"
                @click="login"
              >Login</el-button>
              <el-button plain>Sign up</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userName: '',
      password: '',
    }
  },
  methods: {
    login(){
      //write login authencation logic here!
      if( this.userName == 'nwe' && this.password == '123456' ){
        localStorage.setItem('token', 'ImLogin')
        this.$message({
          message: '登入成功！',
          type: 'success',
          center: true,
          duration: 2000
        });
        this.$router.push('/dashboard');
      } else{
        this.$message.error({
          message: '密碼錯誤！',
          center: true,
          duration: 2000
        });
      }
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
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
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
  .sub-title {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
