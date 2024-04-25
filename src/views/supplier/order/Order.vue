<template>
  <div>
    <div  style="padding: 10px 0">
      <el-input style="width: 200px" placeholder="请输入订单id" suffix-icon="el-icon-search"></el-input><el-button class="ml-5" >搜索</el-button>
    </div>
    <div>
       <el-popconfirm
          class="ml-5"
          confirm-button-text='确定'
          cancel-button-text='取消'
          icon="el-icon-info"
          icon-color="blue"
          title="您确定批量发货吗？"
          @confirm="handleDels"
      >
        <el-button type="danger" slot="reference" >批量发货<i class="el-icon-circle-remove-outline"/></el-button>
      </el-popconfirm>
    </div>
    <el-table :data="tableData"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="orderid" label="订单编号" width="140">
      </el-table-column>
      <el-table-column prop="userid" label="用户" width="120">
      </el-table-column>
      <el-table-column prop="foodid" label="食品" width="120">
      </el-table-column>
      <el-table-column prop="state" label="当前状态" width="120">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="120">
      </el-table-column>
      <el-table-column prop="other" label="其它">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">发货<i class="el-icon-edit"/> </el-button>
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

  </div>
</template>

<script>

import AsideSupplier from "@/components/AsideSupplier";
import HeaderSupplier from "@/components/HeaderSupplier";

export default {
  name: "Order",
  data(){
    return {
      tableData: [],
      sideWidth: 200,
      total: 0,
      pageNum: 1,
      pageSize: 5,
      dialogFormVisible: false,
      multipleSelection:[],
      form: {},
      orderid:"",
      userid:"",
      foodid:"",
      supplierid:"",
      state:"下单成功",
      time:new Date(),
      other:"无",
      supplier: localStorage.getItem("supplier") ? JSON.parse(localStorage.getItem("supplier")) : {userid: "xn", password: "123"}

    }
  },
  created(){
      this.load()
  },
  methods:{
    //更新数据
    load(){
      this.request.get("/orderform/page2",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          supplierid:this.supplier.supplierid
        }
      }).then(res=>{console.log(res)
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
    },

    //编辑
    handleEdit(row){
      this.form=row
    },
    //批量编辑
    handleDels(){
      let ids=this.multipleSelection.map(v=>v.userid) //将对象的userid全部取出放在一起
      this.request.post("/orderform/deletes/",ids).then(res=>{
        if(res){
          this.$message.success("批量删除成功")
          this.dialogFormVisible=false
          this.load()
        }
        else{
          this.$message.error("删除失败")
        }
      })
    },

    //多选框
    handleSelectionChange(val){
      this.multipleSelection=val
    },
    components:[
      AsideSupplier,
      HeaderSupplier
    ],
    //保存
    save() {
      this.form.time = this.time.getTime()
      if (this.form.state != "已发货") {
        this.form.state = "已发货"
        this.form.number=this.tableData.number
        console.log(this.form.time)
        if (this.form.orderid == null) {
          this.form.orderid = this.total + 1
        }
        console.log(this.form.orderid)
        this.form.state = this.state
        if (this.form.other == null) {
          this.form.other = this.other
        }
        this.request.post("/orderform", this.form).then(res => {
          if (res) {
            this.$message.success("保存成功")
            this.dialogFormVisible = false
            this.load()
          } else {
            this.$message.error("保存失败")
          }
        })
      }
    }
  }
}

</script>

<style scoped>

</style>