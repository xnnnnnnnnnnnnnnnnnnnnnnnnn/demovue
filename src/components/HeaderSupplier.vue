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
      <span>{{ supplier.supplierid }}</span>
      <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>
          <span style="text-decoration: none" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>
export default {
  name: "HeaderSupplier",
  props: {
    collapseBtnClass: String,
    collapse:Boolean,
  },
  data() {
    return {
      supplier: localStorage.getItem("supplier") ? JSON.parse(localStorage.getItem("supplier")) : {userid: "xn", password: "123"}
    }
  },
  methods:{
    logout(){
      this.$router.push("/supplier/login")
      localStorage.removeItem("supplier")
      this.$message.success("退出成功")
    }
  }
}
</script>

<style scoped>

</style>