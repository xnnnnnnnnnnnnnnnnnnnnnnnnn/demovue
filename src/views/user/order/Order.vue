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
          <el-button type="success" @click="handleEdit(scope.row)">查看详情 </el-button>
          <el-button type="danger" @click="shensu(scope.row)">发起申诉</el-button>
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

    <el-dialog title="运输信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-steps :active="active" finish-status="success">
        <el-step title="下单成功"></el-step>
        <el-step title="已发货"></el-step>
        <el-step title="运输中"></el-step>
        <el-step title="送货上门"></el-step>
      </el-steps>
    </el-dialog>
    <el-dialog title="申诉信息" :visible.sync="dialogFormVisible2" width="30%" >
      <el-form label-width="80px" size="small">
        <el-form-item label="申诉原因" >
          <el-input v-model="form.other" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import AsideUser from "@/components/AsideUser.vue";
import Header from "@/components/Header.vue";

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
      dialogFormVisible2: false,
      multipleSelection:[],
      form: {},
      orderid:"",
      userid:"",
      foodid:"",
      state:"下单成功",
      time:new Date(),
      other:"无",
      active:0,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {userid: "xn", password: "123"}
    }
  },
  created(){
    this.load()
  },
  methods:{
    //更新数据
    load(){
      this.request.get("/orderform/page3",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          userid:this.user.userid
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
   //详情
    handleEdit(row){
      this.form=row
      if(this.form.state=="下单成功"){
        this.active=0
      }else if(this.form.state=="已发货"){
        this.active=1
      }else if(this.form.state=="运输中"){
        this.active=2
      }else if(this.form.state=="送货上门"){
        this.active=3
      }else{
        this.active=2
      }

      this.dialogFormVisible=true //显示弹窗
    },
    shensu(row){
      this.form=row
      this.form.state="待审核"
      this.dialogFormVisible2=true
    },

    //多选框
    handleSelectionChange(val){
      this.multipleSelection=val
    },
    components:[
      AsideUser,
      Header
    ],
    //保存
    save(){
      // this.form.time=this.time.getYear()+this.time.getMonth()+this.time.getDate()+this.time.getHours()+this.time.getMinutes()+this.time.getSeconds()
      if(this.form.time==null) {
        this.form.time = this.$moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
        console.log(this.form.time)
      }
      if(this.form.orderid==null){
        this.form.orderid=parseInt(new Date().getDate()*1000000+new Date().getHours()*10000+new Date().getMinutes()*100+new Date().getMilliseconds())
      }
      console.log(this.form.orderid)
      if(this.form.state==null){
        this.form.state="下单成功"
      }
      if(this.form.other==null){
        this.form.other=this.other}
      this.request.post("/orderform",this.form).then(res=>{
        if(res){
          this.$message.success("保存成功")
          this.dialogFormVisible=false
          this.dialogFormVisible2=false
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