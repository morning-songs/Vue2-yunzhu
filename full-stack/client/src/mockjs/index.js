// 模拟后端，响应数据
// 导入mockjs模块
import Mock from "mockjs";

// 导入user文件
// import user from "./user"

// 配置Mock
Mock.setup({
    timeout: "300-600" // 设置全局的延迟时间（3-6ms后，返回模拟的响应数据）
})

// 拦截向该路由发起的post请求，应将相关的回调处理都整理到一个文件中。
// Mock.mock("/api/login", "post", user.login);
// Mock.mock("/api/userInfo", "get", user.getUserInfo);

// 导出Mock
export default Mock