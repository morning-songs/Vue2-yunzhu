// 导入axios.js文件
import axios from "@/untils/axios";

// 发起有关用户的axios请求

// 登录请求
function loginPost (data) {
    return axios({
        url: "/api/login",
        method: "post",
        data
    });
}

// 请求用户信息
function userInfoGet (data) {
    return axios({
        url: "/api/userInfo",
        method: "get",
        // data // 使用mock请求数据
        params: data // 使用后端请求数据
    });
}

// 提交用户列表
function userListPost (data) {
    return axios({
        url: "/api/userListPost",
        method: "post",
        data
    });
}

// 获取用户列表
function userListGet(data) {
    return axios({
        url: "/api/userListGet",
        method: "get",
        // data // 使用mock请求数据
        params: data // 使用后端请求数据
    });
}

// 导出请求方法
export {
    loginPost,
    userInfoGet,
    userListPost,
    userListGet
}