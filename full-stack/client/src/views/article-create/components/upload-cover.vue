<template>
    <div>
        <el-upload 
            name="cover"
            class="upload-demo cover-uploader"
            accept="image/gif, image/jpeg, image/jpg, image/webp, image/png"
            action="#"
            :limit="1"
            :show-file-list="true"
            :auto-upload="false"
            :on-change="coverChange"
        >
            <img v-if="imageUrl" :src="imageUrl" alt="">
            <i v-else class="el-icon-plus cover-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import { isImageType } from '@/untils/isType.js';

export default {
    name: "UploadCover",
    data() {
        return {
            imageUrl: ""
        };
    },
    methods: {
        // 文件状态变化时触发：添加，上传都会触发
        coverChange(file, fileList) {
            /**
             * file：表示当前的文件对象
             * fileList：是一个文件对象的数组，上传多个文件时有效。
             * raw属性：表示各文件对象的源文件
             */
            if(file.status !== "ready") return; // ready表示待上传状态。
            // 判断是否为图片类型
            if (isImageType(file.raw.type)) {
                this.imageUrl = URL.createObjectURL(file.raw); // 获取源文件的url
                // 图片文件上传至父组件，统一提交
                this.$emit("handleCover", file.raw);

            } else {
                fileList.pop(); // 删除非标准格式的文件
                this.$message.error("只能上传 gif / jpeg / jpg / webp / png 格式的图片");
            }
        }
    }
}
</script>

<style lang="less" scoped>
/deep/ .cover-uploader {
    .el-upload {
        width: 150px !important;
        height: 150px !important;
        font-size: 30px;
        color: inherit;
        text-align: center;
        line-height: 150px;
        background-color: #fff;
        border: 1px dashed black;
        border-radius: 4px;
        opacity: .7;
        &:hover {
            color: rgb(43, 8, 244);
            border-color: rgb(43, 8, 244);
        }
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
</style>