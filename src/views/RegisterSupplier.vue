<template>
  <div>
    <el-card class="box-card">
      <h2>注册</h2>
      <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="80px"
          class="demo-ruleForm"
      >
        <el-form-item label="商户名" prop="supplierid" >
          <el-input v-model="ruleForm.supplierid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordre">
          <el-input
              type="password"
              v-model="ruleForm.passwordre"
              autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="其它信息" prop="other">
          <el-input v-model="ruleForm.other"></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RegisterSupplier",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var  validatePass3 = (rule, value, callback) => {
      this.rename();
      callback();
    };

    return {
      ruleForm: {
        supplierid: "",
        password: "",
        passwordre: "",
        phone:"",
        other:""
      },
      rules: {
        supplierid: [
          { required: true, message: "用户名不能为空！", validator:validatePass3, trigger: "blur" },
        ],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        passwordre: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };  },
  methods: {
    submitForm(formName) {
      console.log("进入")
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request.post("/supplier", this.ruleForm).then(res => {
            if (!res) {
              this.$message.error("注册失败");
            } else {
              alert("注册成功!");
              this.$router.push("/supplier/login");
            }
          })
        } else {
          console.log("提交失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log(formName);
      this.$refs[formName].resetFields();

    },
    goBack() {
      this.$router.push("/supplier/login");
    },
    rename(){
      this.request.get("/supplier/select/"+this.ruleForm.supplierid).then(res => {
        if (res) {
          this.$message.error("该商户名已被使用，请重新注册");
          this.resetForm('ruleForm')
        } else {

        }
      })
    }
  },
}
</script>

<style scoped>
.box-card {
  margin: auto auto;
  width: 400px;
}
.login-from {
  margin: auto auto;
}
</style>