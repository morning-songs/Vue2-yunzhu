<template>
  <div class="article-create">
    <el-form :model="articleForm" :rules="articleRules" ref="articleForm">
      <fieldset :style="{ 'border-color': variable.mainBoxShadow }">
        <legend>文章基本信息</legend>
        <el-form-item prop="name" class="input_text">
          <el-input
            v-model="articleForm.name"
            placeholder="请输入文章名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="desc" class="input_text">
          <el-input
            v-model="articleForm.desc"
            placeholder="请输入文章描述"
          ></el-input>
        </el-form-item>
        <el-form-item prop="tag" class="input_text">
          <el-input
            v-model="articleForm.tag"
            placeholder="请输入文章标签"
          ></el-input>
        </el-form-item>
      </fieldset>

      <fieldset :style="{ 'border-color': variable.mainBoxShadow }">
        <legend>上传文章封面</legend>
        <el-form-item>
          <UploadCOver @handleCover="getCoverFile" />
        </el-form-item>
        <small style="font-size: 12px; color: #606266;">提示：封面上传后无法更改，请谨慎选择</small>
      </fieldset>

      <fieldset :style="{ 'border-color': variable.mainBoxShadow }">
        <legend>上传文章内容</legend>
        <el-form-item>
          <el-radio-group v-model="uploadArticleRadios">
            <el-radio label="UploadMd">上传md文件</el-radio>
            <el-radio label="MarkDown">markdown在线编辑</el-radio>
            <el-radio label="RichText">富文本在线编辑</el-radio>
          </el-radio-group>
            <!-- 动态组件 -->
            <keep-alive>
              <component 
                :is="uploadArticleRadios" 
                @handleMdFile="getMdFile" 
                @handleMarkdown="getMarkdown" 
                @handleRichText="getRichText" 
                name="article"
                >
                </component>
            </keep-alive>
        </el-form-item>
        <el-form-item class="last-item">
          <el-button type="primary" @click="submit('articleForm')">创建</el-button>
          <el-button type="" @click="reset('articleForm')">重置</el-button>
        </el-form-item>
      </fieldset>
    </el-form>
  </div>
</template>

<script>
import MarkDown from "./components/mark-down.vue";
import RichText from "./components/rich-text.vue";
import UploadCOver from "./components/upload-cover.vue";
import UploadMd from "./components/upload-md.vue";
import { mapState } from "vuex";
import {articleCreatePost} from "@/api/article.js"
import {getDate} from "@/untils/getDate.js"

export default {
  name: "ArticleCreate",
  data() {
    return {
      coverFile: null,
      article: null,
      mdFile: null,
      markdown: "",
      richText: "",
      articleForm: {
        name: "",
        desc: "",
        tag: "",
      },
      articleRules: {
        name: [
          { required: "true", message: "文章名称为必填项o~" },
          {max: 10, message: "最多输入10个字作为文章名称"}
        ],
        desc: [
          { required: "true", message: "文章描述为必填项o~" },
          {max: 30, message: "最多输入30个字作为文章描述"}
        ],
        tag: [
          { required: "true", message: "文章标签为必填项o~" },
          {max: 10, message: "最多输入10个字作为文章标签"}
          ],
      },
      uploadArticleRadios: "UploadMd",
    };
  },
  computed: {
    ...mapState("theme", ["variable"]),
  },
  methods: {
    getCoverFile (file) {
      this.coverFile = file;
      // console.log(this.coverFile);
    },
    getMdFile (file) {
      this.mdFile = file;
      // console.log(this.article);
    },
    getMarkdown (content) {
      this.markdown = content;
    },
    getRichText (content) {
      this.richText = content;
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        // 选择最终的提交内容
        switch (this.uploadArticleRadios) {
          case "UploadMd" : 
            this.article = this.mdFile
            break; 
          case "MarkDown" : 
            this.article = this.markdown
            break;
          case "RichText" : 
            this.article = this.richText
            break;
        }
        // 校验表单
        if (!valid) return this.$message.error("表单校验失败");
        // 准备表单数据，提交到后端
        let reqData = new FormData(); // 创建一个表单实例
        reqData.append("date", getDate(new Date()));
        reqData.append("cover", this.coverFile);
        reqData.append("article", this.article);
        reqData.append("name", this.articleForm.name);
        reqData.append("desc", this.articleForm.desc);
        reqData.append("tag", this.articleForm.tag);
        reqData.append("editor", false);

        // 发起请求，提交数据
        articleCreatePost(reqData)
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {
          console.log("err", err);
        });
      })
    },
    reset(name) {
      // 重置表单
      // this.coverFile = this.article = null;
      this.$refs[name].resetFields();
    },
  },
  components: {
    MarkDown,
    RichText,
    UploadCOver,
    UploadMd,
  }
};
</script>

<style scoped lang="less">
.article-create {
  fieldset {
    margin: 20px;
    border-style: dotted;
    border-radius: 4px;
    padding: 20px;
    legend {
      font-size: 14px;
    }
    // /deep/ input[type="text"] {
    //     width: 500px;
    // }
    /deep/ .input_text {
      width: 500px;
      height: 30px;
      * {
        width: 100%;
        height: 100%;
        .el-form-item__error {
          padding: 8px;
        }
      }
    }
    .el-radio {
      color: inherit;
    }
    .el-form-item {
      margin-bottom: 20px;
      button {
        width: 60px;
        height: 30px;
        padding: 6px;
        text-align: center;
      }
      /deep/ .upload-demo {
        .el-upload {
          width: 100%;
          height: 100%;
          .el-upload-dragger {
            width: 100%;
            height: 100%;
          }
        }
        .el-upload__tip {
          margin: 0;
        }
        .el-upload-list {
          width: 400px;
          .el-upload-list__item {
            box-sizing: border-box;
            line-height: 26px;
            border: 1px solid transparent;
          }
          .el-upload-list__item-status-label {
            display: block;
          }
          &:hover {
            .el-upload-list__item {
              border-color: rgb(43, 8, 244);
            }
            .el-upload-list__item-status-label {
              display: none;
            }
            .el-icon-close {
              top: 0;
              line-height: 26px;
            }
            .el-icon-close-tip {
              display: block;
              top: 0;
              line-height: 26px;
              right: 20px;
            }
          }
        }
      }
    }
    .last-item {
        position: static;
        margin-bottom: 0;
        /deep/ .el-form-item__content {
          position: static;
        }
      }
  }
}
</style>