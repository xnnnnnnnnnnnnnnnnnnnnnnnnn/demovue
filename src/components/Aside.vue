<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden"
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px;line-height: 60px;text-align: center;width: 200px">
      <b style="color: white">食品生鲜物流系统</b>
    </div>
    <el-submenu index="/">
      <template slot="title"><i class="el-icon-s-home"></i>
        <span slot="title">首页</span></template>
      <el-menu-item-group>
        <el-menu-item index="/userManage"><i class="el-icon-s-custom"/>用户信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/supplierManage"><i class="el-icon-s-custom"/>商户信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/">
      <template slot="title"><i class="el-icon-menu"></i><span slot="title">订单信息</span></template>
      <el-menu-item-group>
        <el-menu-item index="/orderformManage"><i class="el-icon-menu"/>订单信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/">
      <template slot="title"><i class="el-icon-setting"></i><span slot="title">运输信息</span></template>
      <el-menu-item-group>
        <el-menu-item index="/transportManage"><i class="el-icon-setting"/>运输信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/">
      <template slot="title"><i class="el-icon-s-shop"></i><span slot="title">食品信息</span></template>
      <el-menu-item-group>
        <el-menu-item index="/foodManage"><i class="el-icon-s-shop"/>食品信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean
  },

}
</script>

<style scoped>

</style>