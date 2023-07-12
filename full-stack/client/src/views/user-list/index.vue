<template>
    <div style="margin: 20px;">
        <el-table :data="userTabel" style="width: 1080px; text-align: center; margin: 0 auto;">
             <el-table-column label="用户昵称" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.name" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="注册日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="主要作品" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.output" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.output }}</span>
                </template>
            </el-table-column>
            <el-table-column label="转载文章" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.relationl" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.relationl }}</span>
                </template>
            </el-table-column>
            <el-table-column label="活跃状态" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.state }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <span v-if="scope.row.isViews">展示数据</span>
                    <div v-else>
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                            <span v-if="scope.row.editor">确定</span>
                            <span v-else>编辑</span>
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <button class="add-item" @click="addItem">添加一条</button>
        <button v-if="this.addTable.length" class="update" @click="updateTable">更新表格</button>
    </div>
</template>

<script>
import {userListPost, userListGet} from "@/api/user.js"

export default {
    name: "UserList",
    data() {
        return {
            userTabel: [
                {   
                    name: "妲己",
                    date: "帝辛二年",
                    output: "《武庚》",
                    relationl: "《封神演义》",
                    state: "活跃",
                    editor: false,
                    isViews: true
                },
                {   
                    name: "褒姒",
                    date: "幽王三年",
                    output: "《烽火戏诸侯》",
                    relationl: "《一笑倾城》",
                    state: "冒泡",
                    editor: false,
                    isViews: true
                },
                {   
                    name: "西施",
                    date: "春秋末期",
                    output: "《豆腐》",
                    relationl: "《美人计》",
                    state: "活跃",
                    editor: false,
                    isViews: true
                },
                {   
                    name: "昭君",
                    date: "建昭元年",
                    output: "《怨词》",
                    relationl: "《平沙落雁》",
                    state: "活跃",
                    editor: false,
                    isViews: true
                },
                {   
                    name: "貂蝉",
                    date: "东汉末年",
                    output: "《凤仪亭相会》",
                    relationl: "《连环计》",
                    state: "活跃",
                    editor: false,
                    isViews: true
                },
                {   
                    name: "贵妃",
                    date: "天宝四载",
                    output: "《赠张云容舞》",
                    relationl: "《霓裳羽衣曲》",
                    state: "冒泡",
                    editor: false,
                    isViews: true
                }
            ],
            addTable: []
        };
    },
    methods: {
           handleEdit(index, row) {
            // console.log(index);
            let data = this.userTabel[index];
            data.editor = !data.editor;
            // console.log(this.userTabel);
        },
        handleDelete(index, row) {
            this.userTabel.splice(index, 1); // 页面删除
            this.addTable.splice(index - this.userTabel.length, 1); // 数据删除
            this.updateTable(); // 更新数据
            // console.log(index -2 , row);
        },
        addItem() {
            let item = {
                name: "",
                date: "2022-1-1",
                output: "",
                relationl: "",
                state: "潜水",
                editor: false
            };
            this.addTable.push(item);
            // console.log(this.addTable);
            this.userTabel.push(this.addTable[this.addTable.length - 1]);
            // console.log( this.userTabel );
        },
        updateTable() {
            // console.log(this.addTable);

            // 发起请求，提交数据
            userListPost({data: JSON.stringify(this.addTable)})
            .then(res => {
                console.log("res", res);
            })
            .catch(err => {
                console.log("err", err);
            });
        }
    },
    created() {
        // this.tagTabel = this.tagTabel.concat(this.addTable);
        userListGet({token: this.$store.state.user.token}).then(res => {
            // console.log(res.data.data);

            res.data.data.forEach(item => {
                // 转换editor字段
                item.editor = JSON.parse(item.editor);

                // 填充到数组
                this.addTable.push(item);
            });

            // console.log(this.addTable);
            this.userTabel = this.userTabel.concat(this.addTable);
            // console.log(this.userTabel);
      });
    }
}
</script>

<style scoped lang="less">
    .add-item,
    .update {
        height: 30px;
        margin: 20px 0 0 99px;
        line-height: 16px;
        padding: 6px;
        text-align: center;
        cursor: pointer;
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
        border: 1px solid;
        font-size: 14px;
        border-radius: 4px;
        user-select: none;
    }
    .update {
        margin-left: 20px;
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
    }
</style>