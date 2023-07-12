import axios from "@/untils/axios";

// 创建文章，提交数据
export function articleCreatePost(data) {
    return axios({
        url: "/api/article/create",
        method: "post",
        data
    })
}

// 文章列表，提交数据
export function articlePost(data) {
    return axios({
        url: "/api/article/post",
        method: "post",
        data
    })
}

// 文章标签，提交数据
export function tagsPost(data) {
    return axios({
        url: "/api/tags/post",
        method: "post",
        data
    })
}

// 获取文章数据
export function getArticle (data) {
    return axios({
        url: "/api/articleGet",
        method: "get",
        // data, // 使用mock响应
        params: data // 使用node响应
    })
}

// 获取文章标签
export function getTags(data) {
    return axios({
        url: "/api/TagsGet",
        method: "get",
        // data, // 使用mock响应
        params: data // 使用node响应
    })
}