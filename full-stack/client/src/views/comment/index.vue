<template>
    <div style="margin: 20px;">
        <el-table :data="commentTabel" style="width: 1080px; text-align: center; margin: 0 auto;">
             <el-table-column label="用户昵称" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发表日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评论文章" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.article }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评论内容" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.content }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评论量" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.counts }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >
                        删除
                    </el-button>
                </template>
         </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {commentPost, commentGet} from "@/api/message.js"

export default {
    name: "Comment",
    data() {
        return {
            commentTabel: [
                // {   
                //     name: "西施",
                //     date: "春秋末期",
                //     article: "《西施浣纱》",
                //     content: "……",
                //     counts: "999+"
                // },
                // {   
                //     name: "昭君",
                //     date: "竟宁元年",
                //     article: "《昭君出塞》",
                //     content: "……",
                //     counts: "999+"
                // },
                // {   
                //     name: "貂蝉",
                //     date: "东汉末年",
                //     article: "《闭月羞花》",
                //     content: "……",
                //     counts: "999+"
                // },
                // {   
                //     name: "贵妃",
                //     date: "天宝四载",
                //     article: "《贵妃醉酒》",
                //     content: "……",
                //     counts: "999+"
                // }
            ]
        };
    },
    methods: {
        handleDelete(index, row) {
            this.commentTabel.splice(index, 1); // 页面删除，数据删除
            this.updateTable(); // 更新数据
        },
        updateTable() {
            // 发起请求，提交数据
            commentPost({data: JSON.stringify(this.commentTabel)})
            .then(res => {
                console.log("res", res);
            })
            .catch(err => {
                console.log("err", err);
            });
        }
    },
    created() {
        commentGet({token: this.$store.state.user.token}).then(res => {
            this.commentTabel = res.data.data;
        });
    }
}
</script>

<style scoped lang="less">

</style>