// 导入axios.js文件
import axios from "@/untils/axios";

// 提交友链列表
export function linksPost(data) {
    return axios({
        url: "/api/linksPost",
        method: "post",
        data
    });
}

// 获取友链列表
export function linksGet(data) {
    return axios({
        url: "/api/linksGet",
        method: "get",
        // data // 使用mock请求数据
        params: data // 使用后端请求数据
    });
}