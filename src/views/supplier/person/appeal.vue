<template>
  <div>
    <div  style="padding: 10px 0">
      <el-input style="width: 200px" placeholder="请输入订单id" suffix-icon="el-icon-search"></el-input><el-button class="ml-5" >搜索</el-button>
    </div>

    <el-table :data="tableData"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="orderid" label="订单编号" width="140">
      </el-table-column>
      <el-table-column prop="foodid" label="食品" width="120">
      </el-table-column>
      <el-table-column prop="state" label="当前状态" width="120">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="200">
      </el-table-column>
      <el-table-column prop="other" label="其它">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="pass(scope.row)">通过</el-button>
          <el-button type="danger" @click="no(scope.row)">失败</el-button>
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
import Header from "@/components/Header";
import Aside from "@/components/Aside";
export default {
  name: "Appeal",
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
      state:"下单成功",
      time:new Date(),
      other:"无",
      active:0,
      supplier: localStorage.getItem("supplier") ? JSON.parse(localStorage.getItem("supplier")) : {userid: "xn", password: "123"}

    }
  },
  created(){
    this.load()
  },
  methods:{
    //更新数据
    load(){
      this.request.get("/orderform/page6",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          supplierid:this.supplier.supplierid,
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
    //通过
    pass(row){
      this.form=row
      if(this.form.state=="待审核"){
        this.form.state="审核通过"
        this.save()
        this.$message.success("审核成功")
      }
      else{
        this.$message.warning("已经审核成功，无需重复审核")
      }

    },

    //拒绝
    no(row){
      this.form=row
      if(this.form.state=="退款成功"){
        this.$message.success("订单退款已通过，无法更改")
      }else{
        this.form.state="审核失败"
        this.save()
        this.$message.error("审核失败")
      }

    },
    //多选框
    handleSelectionChange(val){
      this.multipleSelection=val
    },
    components:[
      Aside,
      Header
    ],
    //保存
    save(){
      if(this.form.time==null){
        this.form.time = this.$moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      }
      if(this.form.other==null){
        this.form.other=this.other}
      this.request.post("/orderform",this.form).then(res=>{
        if(res){
          this.dialogFormVisible=false
          this.load()
        }
        else{
          this.$message.error("保存失败")
        }
      })
    }

  }
}
</script>

<style scoped>


</style>