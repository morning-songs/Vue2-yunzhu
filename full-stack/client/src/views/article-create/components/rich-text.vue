<template>
    <div>
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
            @onChange="handel"
        />
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
    name: "RichText",
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,   //  页面上的editor对象
            html: '<p>hello</p>', // 编辑器里的文本内容
            toolbarConfig: { }, // 工具栏的配置对象
            editorConfig: { placeholder: '请输入内容...' }, // 编辑器的配置对象
            mode: 'default', // or 'simple' //  两种可选的模式
        }
    },
    methods: {
        // 相当于created钩子函数
        onCreated(editor) {
            this.editor = Object.seal(editor) // 获取editor对象，一定要用 Object.seal() ，否则会报错
        },
        handel() {
            // 将内容上传到父组件
            this.$emit("handleRichText", this.html);
        }
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
}
</script>

<style lang="less" scoped>

</style>