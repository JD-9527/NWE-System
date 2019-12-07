<template>
  <div>Login</div>
</template>

<script>
import { Toast } from 'mint-ui';

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
        Toast('登录成功！');
        this.$router.push('/jphadmin');
      } else{
        Toast('账号或密码错误！');
      }
    }
  }
};
</script>

<style>

</style>
