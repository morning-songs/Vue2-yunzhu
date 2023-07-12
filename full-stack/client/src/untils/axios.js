// 设置全局的axios方法
// 导入axios模块
import axios from "axios";

// 导出axios方法实例
export default axios.create({
    // baseURL: "", // 使用mock
    baseURL: "http://localhost:5000",   // 所有请求的base url
    timeout: 5000 // 设置请求的时间
})