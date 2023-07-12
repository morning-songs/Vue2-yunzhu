// 判断全局的路由权限
import router from "@/router/index.js"
import store from "@/store/index.js"
import { changeTitle } from "@/untils/changeTitle.js"
import permission from "./store/modules/permission";

/*  登录状态
    1、未登录：前往login页面
    2、已登录：前往layout页面，禁止访问login路由
*/

// 定义满足一定条件后，只可重定向到 / 路由的白名单
const whiteList = ["/login"];

// 定义全局的路由前置守卫
router.beforeEach (async (to, from, next) => {
    
    // 判断登录状态（token是否存在：存在---登录状态，不存在---未登录）
    const token = store.state.user.token;
    if (token) {
        // 已登录 --- 禁止访问白名单路由，重定向到 / 路由
        if (whiteList.includes(to.path)) { return next("/");}

        // 非白名单路由，可直接放行
        /* 是否具有用户信息
            具有：直接放行
            不具有：请求用户信息，并存到vuex中后放行（第一次登录和刷新页面后都要重获用户信息）
        */
        
        if (!store.state.user.userInfo) {
            // 不具有，获取登录者信息，接收权限值
            let permission = await store.dispatch("user/getUserInfoAsync").then(permission => permission);

            /*
                基于后端返回的，用户权限判断：
                    admin：将权限路由添加到router对象中
                    editor：将公开路由添加到router对象中
            */
            // 根据权限，获得筛选的routes数组
            let newRoutes = await store.dispatch("permission/menuNavRoutes", permission);
            // 将过滤路由数组动态添加到router对象中，与公共路由数组合并（异步的）
            // router.addRoutes(newRoutes); // addRoutes：批量添加（vue router 4已废弃），addRoute：添加一个
            // 一个一个地添加
            newRoutes.forEach(v => {
                router.addRoute(v);
            });
            // 查看挂载的路由对象的最新状态：router.getRoutes();
            /*
                使用addRoute方法，会自动中断本次导航，然后重新进入一次。
                    - 从而导致重复进入同一路由，使内存爆满
                    - 相当于在不断执行：next(to.path);
                解决方法：
                    - 手动打断本次导航，重新进入一次。
            */
            // return next(to.path); // 重复进入，确保（直到）动态添加的路由以及添加上去了（但容易占满内存）
            return router.push(to.path); // 优雅的方式：重进一次，但不报错。
        }
        // 具有，直接放行
        // 修改网页标题
        changeTitle(to.meta.title);
        next();
    } else {
        /*  未登录 --- 必须登录
            1、去访问的正是"/login"路由，直接放行
            2、去访问的是其他路由，重定向到login
        */
        // console.log(to);
        changeTitle(to.meta.title);
        to.path === "/login" ? next() : next("/login"); 
    }
})