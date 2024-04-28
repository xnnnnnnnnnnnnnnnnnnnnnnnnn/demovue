<template>
  <div>
    <div  style="padding: 10px 0">
      <el-input style="width: 200px" placeholder="请输入订单id" suffix-icon="el-icon-search"></el-input><el-button class="ml-5" >搜索</el-button>
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
          <el-button type="success" @click="save(scope.row)">发货<i class="el-icon-edit"/> </el-button>
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
      this.save()
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
    save(row) {
      this.form=row
      console.log("保存中---=---------------")
      if (this.form.state == "下单成功") {
        if (this.form.orderid == null) {
          this.order.orderid=parseInt(new Date().getDate()*1000000+new Date().getHours()*10000+new Date().getMinutes()*100+new Date().getMilliseconds())
        }
        if (this.form.other == null) {
          this.form.other = this.other
        }
        this.form.state = "已发货"
        this.request.post("/orderform", this.form).then(res => {
          if (res) {
            this.$message.success("保存成功")
            this.load()
          } else {
            this.$message.error("保存失败")
          }
        })
      }else{
        this.$message.error("已经发货成功，无需再次发货")
        this.load()
      }
    }
  }
}

</script>

<style scoped>

</style>