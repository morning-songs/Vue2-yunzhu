<template>
    <div style="margin: 20px;">
        <el-table :data="linksTabel" style="width: 1080px; text-align: center; margin: 0 auto;">
             <el-table-column label="企业名称" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.name" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="法人代表" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.legal" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.legal }}</span>
                </template>
            </el-table-column>
            <el-table-column label="经纪人" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.broker" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.broker }}</span>
                </template>
            </el-table-column>
            <el-table-column label="重要合作" width="180">
                <template slot-scope="scope">
                    <input 
                        v-if="scope.row.editor"
                        v-model="scope.row.mainLink" type="text" 
                        style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
                    />
                    <span v-else style="margin-left: 10px">{{ scope.row.mainLink }}</span>
                </template>
            </el-table-column>
            <el-table-column label="链接数" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.counts }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
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
            </template>
            </el-table-column>
        </el-table>
        <button class="add-item" @click="addItem">添加一条</button>
        <button v-if="this.linksTabel.length" class="update" @click="updateTable">更新表格</button>
    </div>
</template>

<script>
import {linksPost, linksGet} from "@/api/links.js"

export default {
    name: "LinkList",
    data() {
        return {
            linksTabel: [
                // {   
                //     name: "殷商帝国",
                //     legal: "帝辛（子受）",
                //     broker: "妲己",
                //     mainLink: "《苏氏秘辛》",
                //     counts: "99+",
                //     editor: false
                // },
                // {   
                //     name: "西周帝国",
                //     legal: "幽王（姬宫湦）",
                //     broker: "褒姒",
                //     mainLink: "《褒氏秘辛》",
                //     counts: "99+",
                //     editor: false
                // },
                // {   
                //     name: "东周越国",
                //     legal: "勾践（姒鸠浅）",
                //     broker: "西施",
                //     mainLink: "《施氏秘辛》",
                //     counts: "99+",
                //     editor: false
                // },
                // {   
                //     name: "西汉帝国",
                //     legal: "元帝（刘奭）",
                //     broker: "昭君",
                //     mainLink: "《王氏秘辛》",
                //     counts: "99+",
                //     editor: false
                // },
                // {   
                //     name: "东汉帝国",
                //     legal: "献帝（刘协）",
                //     broker: "貂蝉",
                //     mainLink: "《王氏秘辛》",
                //     counts: "99+",
                //     editor: false
                // },
                // {   
                //     name: "大唐帝国",
                //     legal: "玄宗（李隆基）",
                //     broker: "贵妃",
                //     mainLink: "《杨氏秘辛》",
                //     counts: "99+",
                //     editor: false
                // }
            ]
        };
    },
    methods: {
        handleEdit(index, row) {
            // console.log(index);
            let data = this.linksTabel[index];
            data.editor = !data.editor;
        },
        handleDelete(index, row) {
            this.linksTabel.splice(index, 1); // 页面删除
            this.updateTable(); // 更新数据
            // console.log(index -2 , row);
        },
        addItem() {
            let item = {
                name: "",
                legal: "",
                broker: "",
                mainLink: "",
                counts: "9+",
                editor: false
            };

            this.linksTabel.push(item);
        },
        updateTable() {

            // 发起请求，提交数据
            linksPost({data: JSON.stringify(this.linksTabel)})
            .then(res => {
                console.log("res", res);
            })
            .catch(err => {
                console.log("err", err);
            });
        }
    },
    created() {
        linksGet({token: this.$store.state.user.token}).then(res => {

            res.data.data.forEach(item => {
                // 转换editor字段
                item.editor = JSON.parse(item.editor);

                // // 填充到数组
                // this.linksTabel.push(item);
            });
            this.linksTabel = res.data.data;
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