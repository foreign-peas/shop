<template>
  <!-- 容器 -->
  <el-container>
    <!--  页面头部  -->
    <el-header>
      <div>
        <img src="../assets/head.png">
        <span>算法可视化系统</span>
      </div>
      <el-button type="info" @click="logout">退出登录</el-button>
    </el-header>
    <el-container>
      <!--   侧边栏   -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!--    侧边伸缩栏    -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--
                1、i 标签是前面那个图标；
                2、el-menu 标签一般只有一个，包括所有的项，是总菜单；若一个项有子项，那么该项和其子项都需要使用 el-submenu 进行包裹，是子菜单；
                3、如果有子导航，就用 template 标签，然后所有的子导航就用一个 el-menu-item-group 标签包裹；
                4、没有就用 el-menu-item ，代表一个项。
        -->
        <el-menu :default-active="activePath"
                 class="el-menu-vertical-demo"
                 background-color="#333744"
                 text-color="#fff"
                 :unique-opened="true"
                 active-text-color="#409BEF"
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 :router="true"
        >
          <!--     实际中的这些菜单项是从数据库中读取的，只需要一个 el-submenv 标签，使用 for 循环动态加载     -->
          <el-submenu index="1">
            <!--      有子菜单的父菜单      -->
            <template slot="title">
              <!--       图标       -->
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <!--    当开启 vue-router 模式，会在激活导航时以 index 作为 path 进行路由跳转   -->
              <el-menu-item index="/user1" @click="setActiveItem('/user1')">用户一</el-menu-item>
              <el-menu-item index="/user2" @click="setActiveItem('/user2')">用户二</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--   页面主体   -->
      <el-main>
        <!--  路由占位符     -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activeItem')
  },
  methods: {
    logout() {
      // 退出登录的方式是用清除 token 来完成的
      window.sessionStorage.removeItem('token');
      // 清除完 token 后进行路由跳转
      this.$router.push('/login');
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setActiveItem(activeItem) {
      window.sessionStorage.setItem('activeItem', activeItem)
      this.activePath = activeItem
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;

  div {
    display: flex;
    align-items: center;

    img {
      height: 60px;
      width: 80px;
    }
  }
}

.el-button {
  height: 30px;
  width: 80px;
  padding: 0 0;
}

.el-aside {
  background-color: #333744;

  .toggle-button {
    background-color: #4a5064;
    color: white;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }

  .el-menu {
    border: 0px;
  }
}

.el-main {
  background-color: #eaedf1;
}


</style>
