<template>
    <div style="margin: 20px;">
        <el-table :data="messageTabel" style="width: 1080px; text-align: center; margin: 0 auto;">
             <el-table-column label="用户昵称" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="留言日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="留言内容" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.content }}</span>
                </template>
            </el-table-column>
            <el-table-column label="留言数" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.counts }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户状态" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.state }}</span>
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
import {messagePost, messageGet} from "@/api/message.js"

export default {
    name: "Message",
    data() {
        return {
            messageTabel: [
                // {   
                //     name: "妲己",
                //     date: "帝辛三十年",
                //     content: "……",
                //     counts: "99+",
                //     state: "在线",
                // },
                // {   
                //     name: "褒姒",
                //     date: "幽王十一年",
                //     content: "……",
                //     counts: "99+",
                //     state: "离线",
                // },
                // {   
                //     name: "西施",
                //     date: "周元王四年",
                //     content: "……",
                //     counts: "99+",
                //     state: "在线",
                // },
                // {   
                //     name: "昭君",
                //     date: "建始二年",
                //     content: "……",
                //     counts: "99+",
                //     state: "忙碌",
                // },
                // {   
                //     name: "貂蝉",
                //     date: "初平三年",
                //     content: "……",
                //     counts: "99+",
                //     state: "忙碌",
                // },
                // {   
                //     name: "贵妃",
                //     date: "天宝十五载",
                //     content: "……",
                //     counts: "99+",
                //     state: "离线",
                // }
            ]
        };
    },
    methods: {
        handleDelete(index, row) {
            this.messageTabel.splice(index, 1); // 页面删除，数据删除
            this.updateTable(); // 更新数据
        },
        updateTable() {
            // 发起请求，提交数据
            messagePost({data: JSON.stringify(this.messageTabel)})
            .then(res => {
                console.log("res", res);
            })
            .catch(err => {
                console.log("err", err);
            });
        }
    },
    created() {
        // this.updateTable();
        // this.tagTabel = this.tagTabel.concat(this.addTable);
        messageGet({token: this.$store.state.user.token}).then(res => {
            // console.log(res.data.data);
            this.messageTabel = res.data.data;
        });
    }
}
</script>

<style scoped lang="less">

</style>