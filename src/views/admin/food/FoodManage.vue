<template>
  <div>
    <div  style="padding: 10px 0">
      <el-input style="width: 200px" placeholder="请输入食品id" suffix-icon="el-icon-search"></el-input><el-button class="ml-5" >搜索</el-button>
    </div>
    <div>
      <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"/></el-button>
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
<!--      <el-button type="primary" class="ml-5">导入<i class="el-icon-bottom"/></el-button>-->
<!--      <el-button type="primary">导出<i class="el-icon-top"/></el-button>-->
    </div>
    <el-table :data="tableData"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="foodid" label="食品" width="140">
      </el-table-column>
      <el-table-column prop="number" label="数量" width="120">
      </el-table-column>
      <el-table-column prop="supplierid" label="商家" width="120">
      </el-table-column>
<!--      <el-table-column prop="number" label="图片" width="120">-->
<!--      </el-table-column>-->
      <el-table-column prop="other" label="其它信息">
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
              @confirm="handleDel(scope.row.foodid)"
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

    <el-dialog title="食品信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="80px" size="small">
        <el-form-item label="食品名称" >
          <el-input v-model="form.foodid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" >
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商家" >
          <el-input v-model="form.supplierid" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="图片" >-->
<!--          <el-input v-model="form.adress" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="其它信息" >
          <el-input v-model="form.other" autocomplete="off"></el-input>
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
  name: "FoodManage",
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
      this.request.get("/food/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          username:this.username
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
      this.request.post("/food/deletes/",ids).then(res=>{
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
      this.request.delete("/food/delete/"+id).then(res=>{
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
      this.request.post("/food",this.form).then(res=>{
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