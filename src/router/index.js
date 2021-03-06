import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home"
import Welcome from "../components/Welcome"
import User1 from "../components/User1";
import User2 from "../components/User2";

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {path: '/welcome', component: Welcome},
        {path: '/user1', component: User1},
        {path: '/user2', component: User2}
      ]
    }
  ]
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  /**
   * to：到哪里去
   * from：从哪里来
   * next：是一个函数，表示放行
   * */
  if (to.path === '/login') return next(); // 登录页不需要拦截
  // 更具token来看是否放行
  const tokenStr = window.sessionStorage.getItem('token');
  // token为空，返回登录页
  if (!tokenStr) return next('/login');
  next();
})

export default router
