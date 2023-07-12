<template>
  <div style="margin: 20px; border-radius: 4px;">
    <el-table :data="articleTabel" empty-text="暂无数据，请至少创建一篇文章" style="width: 100%; text-align: center;">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封面" width="180">
          <template slot-scope="scope">
          <img :src="scope.row.cover" alt="封面" style="width: 180px; height: 80px;" />
        </template>
      </el-table-column>
      <el-table-column label="文章名称" width="180">
        <template slot-scope="scope">
          <input 
            v-if="scope.row.editor"
            v-model="scope.row.name" type="text" 
            style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
          />
          <span v-else style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="文章描述" width="180">
        <template slot-scope="scope">
          <input 
            v-if="scope.row.editor"
            v-model="scope.row.desc" type="text" 
            style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
          />
          <span v-else style="margin-left: 10px">{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章标签" width="180">
        <template slot-scope="scope">
          <input 
            v-if="scope.row.editor"
            v-model="scope.row.tag" type="text" 
            style="width: 100px; height: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 5px 20px;" 
          />
          <span v-else style="margin-left: 10px">{{ scope.row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问量" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.views }}</span>
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
    <div class="tfoot">请前往文章创建页，创建您的文章，以便在此展示</div>
    <div v-if="this.articleAchieved.length">
      <button class="update" @click="updateTable">更新表格</button>
      <h5>请在确认好表格内容后，手动更新表格。删除后无法恢复，请慎重删除</h5>
    </div>
  </div>
</template>

<script>
import {getArticle, articlePost} from "@/api/article.js"

export default {
    name: "ArticleList",
    data () {
        return {
            articleTabel: [
              {
                date: "天宝三载",
                cover: require("@/assets/images/mock/yxdz.webp"),
                name: "《月下独酌·其一》",
                desc: "花间一壶酒",
                tag: "唐代诗词",
                views: "10000+",
                editor: false,
                isViews: true
              },
              {
                date: "天宝十一载",
                cover: require("@/assets/images/mock/qjj.webp"),
                name: "《将进酒》",
                desc: "君不见黄河之水天上来",
                tag: "唐代诗词",
                views: "10000+",
                editor: false,
                isViews: true
              }
            ],
            articleAchieved: []
        };
    },
    methods: {
        handleEdit(index, row) {
            let data = this.articleTabel[index];
            data.editor = !data.editor;
            // console.log(data);
        },
        handleDelete(index, row) {
            this.articleTabel.splice(index, 1); // 页面删除
            this.articleAchieved.splice(index - this.articleTabel.length, 1); // 数据删除
            // if (!this.articleAchieved.length) {this.articleAchieved.length = 1};
            this.updateTable(); // 更新数据
            // console.log(index -2 , row);
        },
        updateTable() {
          // console.log(this.articleAchieved);
          // 发起请求，提交数据
          articlePost({data: JSON.stringify(this.articleAchieved)})
          .then(res => {
            console.log("res", res);
          })
          .catch(err => {
            console.log("err", err);
          });
        }
    },
    created() {
      // console.log(this.$store.state.user.token);
      getArticle({token: this.$store.state.user.token}).then(res => {
        // console.log(res.data.data);
        res.data.data.forEach(item => {
          // 转换editor字段
          item.editor = JSON.parse(item.editor);

          // 处理cover字段
          // console.log(item.cover);
          // console.log(/^\/img\//.test(item.cover));
          if (item.cover && !/^\/img\//.test(item.cover)) {
            item.cover = require(`@/assets/images/cover/${item.cover}`);
          }

          // 填充到数组
          this.articleAchieved.push(item);
        });
        // console.log(this.articleAchieved);
        this.articleTabel = this.articleTabel.concat(this.articleAchieved);
        // console.log(this.articleTabel);
      });
    }
};
</script>

<style scoped lang="less">
    // /deep/ div.cell {
    //     text-align: center;
    // }
    .tfoot {
      margin-top: 10px;
      font-size: 12px;
      text-align: center;
      font-weight: bold;
    }

    .update {
      height: 30px;
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
</style>