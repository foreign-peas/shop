<template>
  <div>
    <el-button type="info" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // 退出登录的方式是用清除 token 来完成的
      window.sessionStorage.removeItem('token');
      // 清除完 token 后进行路由跳转
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="less" scoped>
</style>
