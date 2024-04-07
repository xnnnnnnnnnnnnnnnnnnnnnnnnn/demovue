<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside width="sideWidth+'px'" style="background-color: rgb(238, 241, 246);height: 100%">
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
      </el-aside>

      <el-container>
        <el-header style="font-size: 12px;display: flex;border-bottom: 1px solid #ccc;line-height: 60px">
          <div style="flex: 1;font-size: 18px">
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
          </div>
          <el-dropdown style="width: 70px;cursor: pointer">
            <span>xn</span>
            <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <div  style="padding: 10px 0">
            <el-input style="width: 200px" placeholder="请输入食品id" suffix-icon="el-icon-search"></el-input><el-button class="ml-5" >搜索</el-button>
          </div>
          <el-table :data="tableData">
            <el-table-column prop="userid" label="姓名" width="140">
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="warning">查看详情<i class="el-icon-edit"/> </el-button>
<!--                <el-button type="danger">删除<i class="el-icon-remove-outline"/> </el-button>-->
              </template>
            </el-table-column>
          </el-table>
            <div class="block">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNum"
                  :page-sizes="[2, 5, 10, 20]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
              </el-pagination>
            </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data(){

    return {
      tableData: [],
      isCollapse:false,
      collapseBtnClass:'el-icon-s-fold',
      sideWidth:200,
      total:0,
      pageNum:1,
      pageSize:2
    }
  },
  created() {
    this.load()
  },
  methods:{
    collapse(){
      this.isCollapse=!this.isCollapse
      if(this.isCollapse){
        this.sideWidth=64
        this.collapseBtnClass='el-icon-s-unfold'
      }else {
        this.sideWidth=200
        this.collapseBtnClass='el-icon-s-fold'
      }
    },
    load(){
      fetch("http://localhost:8088/user/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize).then(res=>res.json()).then(res=>{
        console.log(res)
        this.tableData=res.data
        this.total=res.total
      })
    },
    handleSizeChange(pageSize){
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load()
    }

  }
}
</script>
