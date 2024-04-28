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
          icon-color="red"
          title="您确定批量删除吗？"
          @confirm="handleDels"
      >
        <el-button type="danger" slot="reference" >批量删除<i class="el-icon-circle-remove-outline"/></el-button>
      </el-popconfirm>
      <!--    <el-button type="primary" class="ml-5">导入<i class="el-icon-bottom"/></el-button>-->
      <!--    <el-button type="primary">导出<i class="el-icon-top"/></el-button>-->
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
          <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"/> </el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="handleDel(scope.row.orderid)"
          >
            <el-button type="danger" slot="reference" >删除<i class="el-icon-remove-outline"/> </el-button>
          </el-popconfirm>
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
      <el-form label-width="80px" size="small">
        <el-form-item label="状态" >
          <el-select v-model="form.state" placeholder="状态">
            <el-option
                v-if="form.state!=='下单成功'"
                v-for="item in options"
                  :key="form.state"
                  :label="item.label"
                  :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" >
          <el-input v-model="form.time" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
  name: "TransportManage",
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
      state:"待审核",
      time:"",
      other:"",
      options: [{
        value: "运输中",
        label: '运输中'
      }, {
        value: "送货上门",
        label: '送货上门'
      }, {
        value: "退款中",
        label: '商家退款中'
      }, {
        value: "退款成功",
        label: '退款成功'
      }
      ],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {userid: "xn", password: "123"}

    }
  },
  created(){
    if(this.user.userid=="admin" && this.user.password=="123") {
      this.load()
    }
  },
  methods:{
    //更新数据
    load(){
      this.request.get("/orderform/page",{
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
    //新增
    handleAdd(){
      this.dialogFormVisible=true;
      this.form={}
    },
    //编辑
    handleEdit(row){
      this.form=row
      this.dialogFormVisible=true //显示弹窗
    },
    //批量删除
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
    //删除
    handleDel(id){
      this.request.delete("/orderform/delete/"+id).then(res=>{
        if(res){
          this.$message.success("删除成功")
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
      Aside,
      Header
    ],
    //保存
    save(){
      this.request.post("/orderform",this.form).then(res=>{
        if(res){
          this.$message.success("保存成功")
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