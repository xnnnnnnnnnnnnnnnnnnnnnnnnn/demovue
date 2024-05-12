<template>
<div style="font-size: 12px;line-height: 60px;display: flex">
  <div style="flex: 1;font-size: 18px">
    <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
<!--    <el-breadcrumb separator="/" style="display: inline-block ;margin-left: 10px">-->
<!--      <el-breadcrumb-item to="/" >首页</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>{{ pathName }}</el-breadcrumb-item>-->
<!--    </el-breadcrumb>-->
  </div>
  <el-dropdown style="width: 70px;cursor: pointer">
    <span>{{ user.userid }}</span>
    <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <span style="text-decoration: none" @click="person">个人信息</span></el-dropdown-item>
      <el-dropdown-item>
        <span style="text-decoration: none" @click="logout">退出</span>
      </el-dropdown-item>
      </el-dropdown-menu>
  </el-dropdown>
</div>

</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse:Boolean,
  },
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {userid: "xn", password: "123"}
    }
  },
  methods:{
    logout(){
      this.$router.push("/login")
      localStorage.removeItem("user")
      this.$message.success("退出成功")
    },
    person(){
      this.$router.push("/user/person")
    }
  }

}

</script>

<style scoped>

</style>