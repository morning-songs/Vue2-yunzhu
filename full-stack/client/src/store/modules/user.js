import { setStorage, getStorage, removeAllStorage } from "@/untils/storage"
import router from "@/router/index.js";
import { userInfoGet } from "@/api/user.js"

export default {
    namespaced: true,
    state: {
        token: getStorage("token") || '', // 优先获取本地的token
        userInfo: null,
    },
    getters: {
        token (state) {return state.token},
        userInfo (state) {return state.userInfo}
    },
    mutations: {
        // 设置token的值
        setToken (state, token) {
            // 存入vuex中
            state.token = token;
            // 存入本地中
            setStorage("token", token);
        },
        // 存入用户信息
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {

        // 做登录成功（异步的）后的处理
        async login (context, data) {
            // 调用setToken方法，存储token值
            await context.commit("setToken", data.data.token);
            // 或者 this.commit("user/setToken", data.data.token); // 调用指定模块下的方法

            // 跳转到根页面
            router.push("/");
        },

        // 登陆成功后，存入用户信息
        async getUserInfoAsync(context) {
            // 向后端请求用户信息，必须传入一个对象
            return await userInfoGet({token: context.state.token})
            .then(({data}) => {
                // 将用户数据存入vuex中
                context.commit("setUserInfo", data.data);
                // 返回promise对象，以及用户的权限值
                return Promise.resolve(data.data.permission);
            })
            .catch(() => {
                console.log("用户信息获取失败，请尝试运行node中的app文件");
                alert("用户信息获取失败，请尝试运行node中的app文件");
                return Promise.reject("用户信息获取失败");
            });
        },

        // 退出登录
        async logout (context) {
            /** 退出登录
             *  1、发起log out请求，告知服务端需要退出登录
             *  2、清除本地缓存，以及vuex中用户相关的重要信息
             *  3、跳转到/login
             */

            // 清空缓存
            removeAllStorage(); // 清空本地缓存
            // 刷新页面，自动去往login页
            router.go(0);
        }
    }
}