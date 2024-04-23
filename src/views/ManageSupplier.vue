<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside width="sideWidth+'px'" style="background-color: rgb(238, 241, 246);height: 100%">
        <AsideSupplier :isCollapse="isCollapse"/>
      </el-aside>

      <el-container>
        <el-header  style=" border-bottom: 1px solid #ccc;">
          <HeaderSupplier :collapseBtnClass="collapseBtnClass" :collapse="collapse" />
        </el-header>
        <el-main>
          <!--          表示当前页面子路由会在router-view展示,需在router->index.js文件下配置子路由-->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>

import AsideSupplier from "@/components/AsideSupplier.vue";
import HeaderSupplier from "@/components/HeaderSupplier";

export default {
  name: 'ManageSupplier',
  components: {
    HeaderSupplier,
    AsideSupplier,
  },
  data(){
    return {
      isCollapse:false,
      collapseBtnClass:'el-icon-s-fold',
      sideWidth:200,
    }
  },
  methods:{
    //菜单收缩框设置
    collapse(){
      this.isCollapse=!this.isCollapse
      if(this.isCollapse){
        this.sideWidth=64
        this.collapseBtnClass='el-icon-s-unfold'
      }else {
        this.sideWidth=200
        this.collapseBtnClass='el-icon-s-fold'
      }
    }

  }
}
</script>
