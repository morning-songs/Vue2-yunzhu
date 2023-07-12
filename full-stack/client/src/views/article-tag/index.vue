<template>
    <div style="margin: 20px;">
        <el-table :data="tagTabel" style="width: 1080px; text-align: center; margin: 0 auto;">
             <el-table-column label="标签名称" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.name" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="标签描述" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.desc" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.desc }}</span>
                </template>
            </el-table-column>
            <el-table-column label="出处来源" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.origin" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.origin }}</span>
                </template>
            </el-table-column>
            <el-table-column label="相关标签" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.relationl" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.relationl }}</span>
                </template>
            </el-table-column>
            <el-table-column label="使用量" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.usageAmount" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.usageAmount }}</span>
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
import {tagsPost, getTags} from "@/api/article.js"

export default {
    name: "ArticleTag",
    data() {
        return {
            tagTabel: [
                {   
                    name: "Vue",
                    desc: "轻量级前端框架…",
                    origin: "Evan You",
                    relationl: "渐进式框架、React",
                    usageAmount: "10000+",
                    editor: false,
                    isViews: true
                },
                {   
                    name: "JavaScript",
                    desc: "前端脚本语言",
                    origin: "Netscape",
                    relationl: "解释型语言",
                    usageAmount: "10000+",
                    editor: false,
                    isViews: true
                },
                {   
                    name: "小程序",
                    desc: "无需安装，随时可用",
                    origin: "张小龙",
                    relationl: "微信、轻应用",
                    usageAmount: "10000+",
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
            let data = this.tagTabel[index];
            data.editor = !data.editor;
            // console.log(this.tagTabel);
        },
        handleDelete(index, row) {
            this.tagTabel.splice(index, 1); // 页面删除
            this.addTable.splice(index - this.tagTabel.length, 1); // 数据删除
            this.updateTable(); // 更新数据
            // console.log(index -2 , row);
        },
        addItem() {
            let item = {
                name: "",
                desc: "",
                origin: "",
                relationl: "",
                usageAmount: "",
                editor: false
            };
            this.addTable.push(item);
            // console.log(this.addTable);
            this.tagTabel.push(this.addTable[this.addTable.length - 1]);
            // console.log( this.tagTabel );
        },
        updateTable() {
            // console.log(this.addTable);

            // 发起请求，提交数据
            tagsPost({data: JSON.stringify(this.addTable)})
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
        getTags({token: this.$store.state.user.token}).then(res => {
            // console.log(res.data.data);

            res.data.data.forEach(item => {
                // 转换editor字段
                item.editor = JSON.parse(item.editor);

                // 填充到数组
                this.addTable.push(item);
            });

            // console.log(this.addTable);
            this.tagTabel = this.tagTabel.concat(this.addTable);
            // console.log(this.tagTabel);
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