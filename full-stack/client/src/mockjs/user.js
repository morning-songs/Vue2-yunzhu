// 后端处理用户的相关请求

// 接收登录请求，根据权限返回响应内容
function login (request) {
    // console.log(request);
    // request：拦截通过指定路由，它是向后端发起ajax的请求内容（此处未经打包处理，也不包含请求报文）
    
    let data = JSON.parse(request.body);
    // console.log(data);
    // 根据用户权限，响应不同内容
    switch (data.username) {
        case "admin":
            return {
                code: 200,
                token: "admin", // 返回token，做持久化登录：token未过期，免登录
                data: {
                    msg: "登录成功，欢迎您！超级管理员"
                }
            };

        case "editor":
            return {
                code: 200,
                token: "editor",
                data: {
                    msg: "登录成功，欢迎您！编辑者"
                }
            };

        default:
            return {
                code: 400,
                data: {
                    msg: "登录失败，token过期或不存在"
                }
            };
    }
}

// 监听获取用户信息的请求（根据token值判断，是否要给出正确的用户信息）
function getUserInfo (request) {
    /* 后端验证token的一般依据
        1、是否正确
        2、是否篡改
        3、是否过期
    */
    let token = JSON.parse(request.body).token;
    switch (token) {
        case "admin":
            return {
                code: 200,
                data: {
                    permission: "admin", // 权限
                    name: "超级管理员", // 名字
                    avator: require("@/assets/images/mock/admin.webp"), // 头像
                }
            };
        case "editor":
            return {
                code: 200,
                data: {
                    permission: "editor", // 权限
                    name: "编辑者",
                    avator: require("@/assets/images/mock/editor.webp"), // 头像
                }
            };
        default:
            return {
                code: 401,
                data: {
                    msg: "登录失败，token过期或不存在"
                }
            };
    }
}

export default {
    login,
    getUserInfo
}