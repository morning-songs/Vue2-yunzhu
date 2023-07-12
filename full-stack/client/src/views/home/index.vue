<template>
    <div class="home-page">
        <h2 class="title">我的主页</h2>
        <div class="content">
            <ul>
                <li><h3>云竹</h3></li>
                <li>1999.12.31<span>魔羯座</span></li>
                <li>海南<span>五指山</span></li>
                <li>毕业于稷下学宫</li>
                <li>擅长没有擅长</li>
            </ul>
            <div class="img">
                <img src="../../assets/images/yunzhu.png" alt="云竹">
            </div>
        </div>
        <h3>“文雅，息隐，永恒”</h3>
        <footer>123456789@qq.com</footer>
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>

<style lang="less" scoped>
    .home-page {
        width: 1000px;
        height: 500px;
        margin: 50px auto 0px;
        border: 1px solid #ccc;
        border-radius: 4px;
        .title {
            width: 100px;
            margin: 20px;
            padding: 5px 10px;
            font-size: 20px;
            text-align: center;
            background-color: rgba(222, 206, 168, 0.33);
        }
        .content {
            width: 750px;
            margin: 50px auto;
            overflow: hidden;
            ul {
                float: left;
                width: 300px;
                li {
                    margin-bottom: 10px;
                    font-size: 14px;
                    font-weight: bold;
                    h3 {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
                    span {
                        margin-left: 10px;
                    }
                }
            }

            .img {
                float: right;
                width: 300px;
                height: 200px;
                border: 5px solid black;
                border-radius: 5px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .content ~ h3 {
            font-size: 20px;
            text-align: center;
            font-weight: bold;
            margin-bottom: 50px;
        }
        footer {
            margin-right: 120px;
            font-size: 14px;
            text-align: right;
            font-weight: bold;
        }
    }
</style>