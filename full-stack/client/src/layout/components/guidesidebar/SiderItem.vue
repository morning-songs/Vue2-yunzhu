<template>
    <div>
        <!-- 判断每一项是否允许生成自己菜单，并且是否具有子路由：具有 -- 继续循环；不具有 -- 终止 -->
        <el-submenu v-if="!route.meta.noDropDown && route.children && route.children.length > 0" :index="route.path">
            <template slot="title">
                <i :class="route.meta.icon"></i>
                <span>{{route.meta.title}}</span>
            </template>
            <!-- 通过递归的方式，使用该组件 -->
            <SiderItem
                v-for="childrenItem in route.children"
                :key="childrenItem.path"
                :index="childrenItem.path"
                :route="childrenItem"
            >
            </SiderItem>
        </el-submenu>

        <!-- 选中样式通过index来动态绑定 -->
        <el-menu-item v-else 
        :index="route.meta.noDropDown ? route.children[0].path : route.path"
        :style="!route.meta.noDropDown && {'border-right': `1px solid ${variable.mainBoxShadow}`}"
        >
            <i :class="route.meta.icon"></i>
            <span>{{route.meta.title}}</span>
        </el-menu-item>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "SiderItem",
    props: ["route"],
    computed: {
        ...mapState("theme", ["variable"])
    }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/variable.less";

.el-menu-item {
    box-sizing: border-box;
}

.el-menu-item:hover {
    color: @mainHoverColor;
    background-color: @mainHoverBgc;
}
.el-menu-item.is-active {
    color: @mainActiveColor;
}
/deep/ .el-submenu__title:hover {
    color: @mainHoverColor;
    background-color: @mainHoverBgc;
}

</style>