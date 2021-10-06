<template>
  <div class="login_container">
    <div class="login_box">
      <!--   头像区域   -->
      <div class="avatar_box">
        <img src="../assets/login.png" alt="">
      </div>
      <!--   登录表单   -->
      <el-form ref="loginFormRef" :model="loginForm" class="login_form" label-width="0px" size="mini" :rules="loginFormRules">
        <!--   用户  -->
        <el-form-item label="" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!--    密码    -->
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-s-cooperation" type="password"></el-input>
        </el-form-item>
        <!--    按钮    -->
        <el-form-item label="" class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录框的绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登录框的验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}],
        // 验证密码是否合法
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    errorHandler() {
      return true;
    },
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      /**
       * 箭头函数只有一个参数时可以不写括号;
       * 回调函数：自定义一个函数，让validate内部进行调用;
       * 这是表单的预验证，当提交登录的时候会检查是否符合那些验证规则，valid是结果，可以再回调函数中根据验证的结果做一些操作
       * */
      this.$refs.loginFormRef.validate(valid => {
          if (valid) { // 验证成功
            /**
             * 这里只是简单做了一个弹框，应该还需要将登录成功后的token保存到客户端的 sessionStorage 中去
             * （token只在当前网页打开期间有效，所以将token保存在sessionStorage中）
             * 除了登录的接口，其他的接口应该在登录之后才能访问，就是用上面的token信息来判断
             * 登录成功后应该跳转到后台主页
             * */
            this.validateSuccess();
            window.sessionStorage.setItem("token","2021262961");// 假token，测试用
            setTimeout(()=>{
              this.$router.push("/home");
            },1000);
          } else {// 验证失败
            this.validateFail();
          }
      });
    },
    validateSuccess() {
      this.$message({
        showClose: true,
        message: '验证成功！',
        type: 'success'
      });
    },
    validateFail() {
      this.$message({
        showClose: true,
        message: '验证失败！！',
        type: 'error'
      });
    }
  }
}
</script>

<!--scoped表示这个样式只在那个组件中生效，去掉就会在全局的生效，这不符合规范-->
<!-- 需要进入到项目中去安装 less-loader依赖，并且是低版本的 -->
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 140px;
  width: 150px;
  border-radius: 50%;
  border: 1px solid #eee;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: grey;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
}

</style>
