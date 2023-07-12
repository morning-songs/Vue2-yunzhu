/* 
    区分不同的权限，筛选不同的路由
    过滤掉不在侧边栏显示的路由，返回对应权限的导航菜单的路由数组
*/
// 导入公开路由对象和私有路由对象
import {publicRoutes, prevateRoutes} from "@/router/index.js"

export default {
    namespaced: true,
    state: {
        routes: publicRoutes
    },
    mutations: {
        setRoutes (state, newRoutes) {
            state.routes = [...publicRoutes, ...newRoutes];
        }
    },
    actions: {
        // 对权限路由过滤，分离出admin的路由对象，和editor的路由对象
        filterRoutes (context, role) {
            return prevateRoutes.filter(v => {return v.meta.role.includes(role)});
        },
        /**
         * 区分不同的权限，筛选不同的路由
         * @param {object} context 上下文
         * @param {string} role 权限值
         * @return 返回处理后的权限路由
         */
        async menuNavRoutes (context, role) {
            // 获取过滤的路由数组
            let newRoutes = await context.dispatch("filterRoutes", role);
            // 修改routes状态
            await context.commit("setRoutes", newRoutes);
            // 返回过滤数组
            return Promise.resolve(newRoutes);
        }
    }
}