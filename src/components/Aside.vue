<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden"
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
  >
    <div style="height: 60px;line-height: 60px;text-align: center;width: 200px">
      <b style="color: white">食品生鲜物流系统</b>
    </div>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-s-home"></i>
        <span slot="title">首页</span></template>
      <el-menu-item-group>
        <el-menu-item index="1-1">食品信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i><span slot="title">订单信息</span></template>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-setting"></i><span slot="title">运输信息</span></template>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title"><i class="el-icon-s-custom"></i><span slot="title">个人信息</span></template>
      <el-menu-item-group>
        <el-menu-item index="4-1">信息修改</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean
  }
}
</script>

<style scoped>

</style>