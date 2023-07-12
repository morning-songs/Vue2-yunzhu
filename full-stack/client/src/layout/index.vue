<template>
    <div 
    class="layout-page" 
    :class="hamburgerFold ? 'side-fold' : 'side-unfold'" 
    style="color: inherit; background-color: inherit;"
    >
        <!--左导航菜单-->
        <GuideSideBar class="l-sidebar-container" :style="{'border-right': `1px solid ${variable.mainBoxShadow}`}"/>
        <!-- 右主体内容 -->
        <div class="r-main-container">
            <!-- 顶部导航topbar -->
            <GuideTopBar class="topbar-container"/>
            <!-- tag标签栏 -->
            <GuideTagBar class="t-tag-container" :style="{'box-shadow': `2px 0px 2px 0px ${variable.mainBoxShadow}`}"/>
            <!-- 右下侧内容展示区 -->
            <main class="r-content" style="user-select: text;">
                <!-- 二级渲染出口 -->
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
import GuideSideBar from "./components/guidesidebar/index.vue"
import GuideTopBar from "./components/GuideTopBar.vue"
import GuideTagBar from "./components/GuideTagBar.vue"
import { mapState, mapMutations } from 'vuex'

export default {
    name: "Layout",
    computed: {
        ...mapState("app", ["hamburgerFold"]),
        ...mapState("theme", ["variable"])
    },
    methods: {
        ...mapMutations("app", ["addTagsItem"])
    },
    components: {
        GuideSideBar,
        GuideTopBar,
        GuideTagBar
    },
    watch: {
        // 监听当前的路由变化
        $route: {
            handler (data) {
                // 添加一个标签
                data = {
                    path: data.path,
                    meta: {
                        title: data.meta.title
                    }
                }
                // console.log(data);
                this.addTagsItem(data);
            },
            immediate: true // 初始时执行一次
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/variable.less";
@import "~@/assets/css/layout.less";


.r-content {
    ::selection {
        color: @mainActiveColor !important;
    }
    /deep/ div.cell {
        text-align: center;
    }
}
</style>
