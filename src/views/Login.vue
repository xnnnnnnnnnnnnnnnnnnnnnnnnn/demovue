<template>
 <div class="wrapper">
   <div style="margin: 200px auto;background-color: #ffffff;width: 350px;height: 300px;padding: 20px;border-radius: 10px">
     <div style="margin: 20px 0;text-align: center;font-size: 24px"><b>登录</b></div>
     <el-form :model="user" :rules="rules" ref="userForm">
       <el-form-item prop="userid">
         <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.userid"></el-input>
       </el-form-item>
       <el-form-item prop="password">
         <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
       </el-form-item>
       <div style="margin: 10px 0;text-align: right">
         <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
         <el-button type="warning" size="small" autocomplete="off" @click="register">注册</el-button>
       </div>
     </el-form>
   </div>
 </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {},
      rules: {
        userid: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    login(){
      this.$refs["userForm"].validate((valid) => {
        if (valid) { //表单校验合法
          this.request.post("/user/login", this.user).then(res => {
            if (!res) {
              this.$message.error("用户名或者密码错误")
            } else {
              localStorage.setItem("user",JSON.stringify(this.user)) //存储用户信息到浏览器，后续登录可以使用用户信息
              // console.log(this.user.userid)
              if(this.user.userid=="admin"){
                console.log("admin")
                this.$router.push('/admin/userManage')
              }
              else {this.$router.push('/user/')}
            }
          })
        } else {
          return false;
        }
      });
    },
    register(){
      this.$router.push('/register')
    }
  }

};
</script>

<style scoped>
.wrapper{
  height: 100vh;
  background-color: #42b983;
  overflow: hidden;
}
</style>