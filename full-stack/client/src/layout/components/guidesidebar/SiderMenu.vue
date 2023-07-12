<template>
    <div>
        <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :background-color="theme.mainBgc"
        :text-color="theme.mainColor"
        :active-text-color="theme.mainActiveColor"
        :unique-opened="true"
        >
        <template v-for="item in routes">
            <SiderItem v-if="item.meta.icon" :key="item.path" :route="item"/>
        </template>
        </el-menu>
    </div>
</template>

<script>
import SiderItem from "./SiderItem.vue"
import { mapState } from "vuex";

export default {
    name: "SiderMenu",
    data() {
        return {
            theme: this.$store.state.theme.variable
        };
    },
    computed: {
        ...mapState("permission", ["routes"]),
    },
    components: {
        SiderItem
    }
}
</script>

<style lang="less" scoped>

</style>