<template>
  <div>
    <div  style="padding: 10px 0">
      <el-input style="width: 200px" placeholder="请输入食品id" suffix-icon="el-icon-search"></el-input><el-button class="ml-5" >搜索</el-button>
    </div>

    <el-table :data="tableData"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="foodid" label="食品" width="140">
      </el-table-column>
      <el-table-column prop="number" label="数量" width="120">
      </el-table-column>
      <el-table-column prop="supplierid" label="商家" width="120">
      </el-table-column>
      <el-table-column prop="other" label="其它信息">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="neworder(scope.row)">下单<i class="el-icon-edit"/> </el-button>
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
import AsideUser from "@/components/AsideUser.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Food",
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
      foodid:"",
      number:1,
      other:"",
      supplierid:"",
      picture:"",
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {userid: "xn", password: "123"},
      order:{}
    }
  },
  created(){
    this.load()
  },
  methods:{
    //更新数据
    load(){
      this.request.get("/food/page3",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
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
    neworder(row){
      this.form=row
      this.order.orderid=parseInt(new Date().getDate()*1000000+new Date().getHours()*10000+new Date().getMinutes()*100+new Date().getMilliseconds())
      this.order.userid=this.user.userid
      this.order.foodid=this.form.foodid
      this.order.state="下单成功"
      this.order.other=this.form.other
      this.order.time=null
      this.request.post("/orderform",this.order).then(
          res=>{console.log(res)
            this.$message.success("保存成功")
            this.form.number=this.form.number-1
            console.log(this.form.number)
            this.request.post("/food",this.form).then(
                res=> {
                  console.log(res)
                  this.load()
                })
            this.load()
      })
    },


    //多选框
    handleSelectionChange(val){
      this.multipleSelection=val
    },
    components:[
      AsideUser,
      Header
    ],

  }
}

</script>

<style scoped>

</style>