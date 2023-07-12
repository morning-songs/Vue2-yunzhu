// 导入axios.js文件
import axios from "@/untils/axios";

// 提交消息列表
export function messagePost(data) {
    return axios({
        url: "/api/messagePost",
        method: "post",
        data
    });
}

// 获取消息列表
export function messageGet(data) {
    return axios({
        url: "/api/messageGet",
        method: "get",
        // data // 使用mock请求数据
        params: data // 使用后端请求数据
    });
}

// 提交评论列表
export function commentPost(data) {
    return axios({
        url: "/api/commentPost",
        method: "post",
        data
    });
}

// 获取获取列表
export function commentGet(data) {
    return axios({
        url: "/api/commentGet",
        method: "get",
        // data // 使用mock请求数据
        params: data // 使用后端请求数据
    });
}