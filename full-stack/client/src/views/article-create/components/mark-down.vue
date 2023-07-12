<template>
    <Editor 
        :initialValue="editorText"
        :options="editorOptions"
        height="500px"
        initialEditType="wysiwyg"
        previewStyle="vertical"
        @change="onEditorChange('markdown')"
        ref="markdown"
    />
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';

export default {
    name: "MarkDown",
    data() {
        return {
            editorText: "请输入内容", // 编辑器里的初始内容
            // 编辑器的配置对象
            editorOptions: {
                hideModeSwitch: true // 隐藏编辑器模式的切换开关，默认模式为：wysiwyg
            }
        };
    },
    methods: {
        // 当编辑器里的内容发生变化时触发
        onEditorChange (name) {
            this.editorText = this.$refs[name].invoke("getMarkdown"); // 获取内容
            // console.log(this.editorText);
            // 上传到父组件
            this.$emit("handleMarkdown", this.editorText);
        }
    },
    components: {
        Editor
    }
}
</script>

<style lang="less" scoped>

</style>