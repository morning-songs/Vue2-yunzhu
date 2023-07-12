<template>
    <el-upload
        class="upload-demo"
        drag
        action="#"
        :show-file-list="true"
        :auto-upload="false"
        :limit="1"
        style="opacity: .7;"
        :on-change="handleChange"
    >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">注意：只能上传单个 md 文件</div>
    </el-upload>
</template>

<script>
import { isMdType } from '@/untils/isType.js';

export default {
    name: "UploadMd",
    methods: {
        handleChange (file, fileList) {
            if(file.status !== "ready") return; // ready表示待上传状态。
            // 判断是否为图片类型
            if (isMdType(file.name)) {
                // 文件上传至父组件，统一提交
                this.$emit("handleMdFile", file.raw);
            } else {
                fileList.pop(); // 删除非标准格式的文件
                this.$message.error("只能上传 md 格式的文件");
            }
        }
    }
}
</script>

<style lang="less" scoped>
.upload-demo {
    /deep/ .el-upload {
        width: 400px !important;
        height: 200px !important;
    }
}

</style>