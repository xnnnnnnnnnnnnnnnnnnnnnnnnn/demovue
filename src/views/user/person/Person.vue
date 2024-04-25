<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
  <div class="person">
    <el-row>
      <span style="font-size: 24px; padding-left:10px">个人信息</span>
      <h1></h1>
    </el-row>
    <el-row style="font-size: 20px; padding-left:10px">
      <span>用户名：</span>
      <span style="text-decoration: underline">{{user.userid}}</span>
      <h1></h1>
    </el-row>
    <el-row style="font-size: 20px; padding-left:10px">
      <span>密  码：</span>
      <span style="text-decoration: underline">{{user.password}}</span>
      <h1></h1>
    </el-row>
    <el-row>
      <el-button style="font-size: 20px; padding-left:10px" @click="click" type="success">更改密码</el-button>
    </el-row>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="80px" size="small">
        <el-form-item label="新密码" >
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
import Header from "@/components/Header";
import AsideUser from "@/components/AsideUser";
export default {
  name: "Person",
  components: {
    Header,
    AsideUser,
  },
  data(){
    return{
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{supplierid:"xn",password:"123"},
      dialogFormVisible: false,
      form: {},
    }
  },

  methods:{
    click(){
      this.dialogFormVisible=true;
      this.form={}
      this.form.supplierid=this.supplier.supplierid
    },
    save(){
      this.request.post("/user",this.form).then(res=>{
        if(res){
          this.$message.success("保存成功")
          this.dialogFormVisible=false
          this.$message.success("请重新登录")
          this.$router.push("/login");
          localStorage.removeItem("user")
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