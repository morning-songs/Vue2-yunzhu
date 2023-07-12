
const express = require("express"),
    app = express(),
    multer = require("multer"),
    cors = require("cors"),
    crypto = require("crypto");

// 配置静态资源文件夹
app.use(express.static("./upload"));
// 允许跨域
app.use(cors());
// 解析数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 设置token
const admin = crypto.createHash("md5").update("yunzhu-admin").digest("hex"),
      editor = crypto.createHash("md5").update("editor-yunzhu").digest("hex");
// console.log(admin, editor);


// post提交用户登录的请求
app.post("/api/login", (req, res) => {
    let data = req.body;
    // console.log(data);
    switch (data.username) {
        case "admin":
            res.status(200).send({
                token: admin, // 返回token，做持久化登录：token未过期，免登录
                data: {
                    msg: "登录成功，欢迎您！超级管理员"
                }
            });
            break;

        case "editor":
            res.status(200).send({
                token: editor,
                data: {
                    msg: "登录成功，欢迎您！编辑者"
                }
            });
            break;

        default:
            res.status(400).send({
                data: {
                    msg: "登录失败，token过期或不存在"
                }
            });
    }
});

// get获取用户信息的请求
app.get("/api/userInfo", (req, res) => {

    let token = req.query.token;

    switch (token) {
        case admin:
            res.send({
                data: {
                    permission: "admin", // 权限
                    name: "超级管理员", // 名字
                    avator: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup." +
                        "enterdesk.com%2Fedpic%2Feb%2F24%2Fd5%2Feb24d54a0c4e1f174a7a4922aaa" +
                        "28454.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999," +
                        "10000&q=a80&n=0&g=0n&fmt=auto?sec=1656392060&t=660840cef4174e2f139" +
                        "a51afd9133f22" // 头像
                }
            });
            break;

        case editor:
            res.send({
                data: {
                    permission: "editor", // 权限
                    name: "编辑者", // 名字
                    avator: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup." +
                        "enterdesk.com%2Fedpic%2F82%2F45%2F8d%2F82458d7f8f7ce6d2ec91b5d8863" +
                        "d5f28.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999," +
                        "10000&q=a80&n=0&g=0n&fmt=auto?sec=1656392633&t=a3bc601faeb30450de5" +
                        "ed01c273f88c8" // 头像
                }
            });
            break;

        default:
            res.send({
                data: {
                    msg: "登录失败，token过期或不存在"
                }
            });
    }

});

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        switch (file.mimetype) {
            case "image/webp":
                callback(null, "../client/src/assets/images/cover");
                break;
            default:
                callback(null, "./upload");
                break;
        }
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname); // 以源文件名称命名
    }
});

let upload = multer({
    storage
});

let articleArr = [];

// post提交表单数据的请求
app.post("/api/article/create",
    upload.fields([
        { name: "cover", maxCount: 1 },
        { name: "article", maxCount: 1 }
    ]),
    (req, res) => {
        // console.log("files:", req.files, "body:", req.body);
        // console.log(path.resolve("./upload/images/", req.files.cover[0].filename));
        // console.log(req.files.cover);
        let cover = req.files.cover;
        if (cover) {
            cover = typeof cover === "object" ? cover[0].filename : cover;
        } else {
            cover = "";
        }
        articleArr.push({
            date: req.body.date,
            cover,
            name: req.body.name,
            desc: req.body.desc,
            tag: req.body.tag,
            editor: req.body.editor,
            views: 1000
        });
        // console.log(articleArr);
        res.status(200).send({data: {msg: "收到"}});
    }
);

// post更新文章列表的请求
app.post("/api/article/post", (req, res) => {
    // console.log(typeof req.body.data);
    articleArr = JSON.parse(req.body.data);
    // console.log(articleArr);
    res.status(200).send({ data: { msg: "收到" } });
});

// get获取文章信息的请求
app.get("/api/articleGet", (req, res) => {

    let token = req.query.token;
    // console.log(articleArr);

    switch (token) {
        case admin:
            res.send({
                data: articleArr
            });
            break;

        case editor:
            res.send({
                data: {
                    msg: "权限不足"
                }
            });
            break;

        default:
            res.send({
                data: {
                    msg: "登录失败，token过期或不存在"
                }
            });
    }
});

let tagsArr = [];

// post更新文章标签的请求
app.post("/api/tags/post", (req, res) => {
    tagsArr = JSON.parse(req.body.data);
    res.status(200).send({ data: {msg: "收到"} });
});

// get获取文章标签的请求
app.get("/api/TagsGet", (req, res) => {

    let token = req.query.token;
    // console.log(articleArr);

    switch (token) {
        case admin:
            res.send({
                data: tagsArr
            });
            break;

        case editor:
            res.send({
                data: {
                    msg: "权限不足"
                }
            });
            break;

        default:
            res.send({
                data: {
                    msg: "登录失败，token过期或不存在"
                }
            });
    }

});

let userList = [];

// post更新用户列表的请求
app.post("/api/userListPost", (req, res) => {
    userList = JSON.parse(req.body.data);
    res.status(200).send({ data: { msg: "收到" } });
});

// get获取用户列表的请求
app.get("/api/userListGet", (req, res) => {

    let token = req.query.token;
    // console.log(articleArr);

    switch (token) {
        case admin:
            res.send({
                data: userList
            });
            break;

        case editor:
            res.send({
                data: {
                    msg: "权限不足"
                }
            });
            break;

        default:
            res.send({
                data: {
                    msg: "登录失败，token过期或不存在"
                }
            });
    }

});

let messageList = [
    {   
        name: "妲己",
        date: "帝辛三十年",
        content: "……",
        counts: "99+",
        state: "在线",
    },
    {   
        name: "褒姒",
        date: "幽王十一年",
        content: "……",
        counts: "99+",
        state: "离线",
    },
    {   
        name: "西施",
        date: "周元王四年",
        content: "……",
        counts: "99+",
        state: "在线",
    },
    {   
        name: "昭君",
        date: "建始二年",
        content: "……",
        counts: "99+",
        state: "忙碌",
    },
    {   
        name: "貂蝉",
        date: "初平三年",
        content: "……",
        counts: "99+",
        state: "忙碌",
    },
    {   
        name: "贵妃",
        date: "天宝十五载",
        content: "……",
        counts: "99+",
        state: "离线",
    }
];

// post更新消息列表的请求
app.post("/api/messagePost", (req, res) => {
    messageList = JSON.parse(req.body.data);
    res.status(200).send({ data: { msg: "收到" } });
});

// get获取消息列表的请求
app.get("/api/messageGet", (req, res) => {

    let token = req.query.token;
    // console.log(articleArr);

    switch (token) {
        case admin:
            res.send({
                data: messageList
            });
            break;

        case editor:
            res.send({
                data: {
                    msg: "权限不足"
                }
            });
            break;

        default:
            res.send({
                data: {
                    msg: "登录失败，token过期或不存在"
                }
            });
    }

});

let commentList = [
    {   
        name: "西施",
        date: "春秋末期",
        article: "《西施浣纱》",
        content: "……",
        counts: "999+"
    },
    {   
        name: "昭君",
        date: "竟宁元年",
        article: "《昭君出塞》",
        content: "……",
        counts: "999+"
    },
    {   
        name: "貂蝉",
        date: "东汉末年",
        article: "《闭月羞花》",
        content: "……",
        counts: "999+"
    },
    {   
        name: "贵妃",
        date: "天宝四载",
        article: "《贵妃醉酒》",
        content: "……",
        counts: "999+"
    }
];

// post更新评论列表的请求
app.post("/api/commentPost", (req, res) => {
    commentList = JSON.parse(req.body.data);
    res.status(200).send({ data: { msg: "收到" } });
});

// get获取评论列表的请求
app.get("/api/commentGet", (req, res) => {

    let token = req.query.token;
    // console.log(articleArr);

    switch (token) {
        case admin:
            res.send({
                data: commentList
            });
            break;

        case editor:
            res.send({
                data: {
                    msg: "权限不足"
                }
            });
            break;

        default:
            res.send({
                data: {
                    msg: "登录失败，token过期或不存在"
                }
            });
    }

});

let linksList = [
    {
        name: "殷商帝国",
        legal: "帝辛（子受）",
        broker: "妲己",
        mainLink: "《苏氏秘辛》",
        counts: "99+",
        editor: false
    },
    {
        name: "西周帝国",
        legal: "幽王（姬宫湦）",
        broker: "褒姒",
        mainLink: "《褒氏秘辛》",
        counts: "99+",
        editor: false
    },
    {
        name: "东周越国",
        legal: "勾践（姒鸠浅）",
        broker: "西施",
        mainLink: "《施氏秘辛》",
        counts: "99+",
        editor: false
    },
    {
        name: "西汉帝国",
        legal: "元帝（刘奭）",
        broker: "昭君",
        mainLink: "《王氏秘辛》",
        counts: "99+",
        editor: false
    },
    {
        name: "东汉帝国",
        legal: "献帝（刘协）",
        broker: "貂蝉",
        mainLink: "《王氏秘辛》",
        counts: "99+",
        editor: false
    },
    {
        name: "大唐帝国",
        legal: "玄宗（李隆基）",
        broker: "贵妃",
        mainLink: "《杨氏秘辛》",
        counts: "99+",
        editor: false
    }
];

// post更新友链列表的请求
app.post("/api/linksPost", (req, res) => {
    linksList = JSON.parse(req.body.data);
    res.status(200).send({ data: { msg: "收到" } });
});

// get获取友链列表的请求
app.get("/api/linksGet", (req, res) => {

    let token = req.query.token;
    // console.log(articleArr);

    switch (token) {
        case admin:
            res.send({
                data: linksList
            });
            break;

        case editor:
            res.send({
                data: {
                    msg: "权限不足"
                }
            });
            break;

        default:
            res.send({
                data: {
                    msg: "登录失败，token过期或不存在"
                }
            });
    }

});

app.listen(5000, "localhost");