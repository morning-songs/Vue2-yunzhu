<template>
    <div>
        <router-link 
            v-for="(item, index) in tagBarList"
            :key="item.path"
            :to="item.path"
            :style="{'border-color': variable.mainBoxShadow, }"
            style="color: inherit"
            :class="$route.path === item.path && 'is-active'"
        >
            {{item.meta.title}}
            <i 
            v-if="item.path !== '/index'"
            class="el-icon-close"
            @click.prevent="closeTag(index, item.path)"
            >
            </i>
        </router-link>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: "GuideTagBar",
    data () {
        return {
            tags: [
                { name: '标签一'},
                { name: '标签二'},
                { name: '标签三'},
                { name: '标签四'},
                { name: '标签五'}
            ]
        };
    },
    computed: {
        ...mapState("app", ["tagBarList"]),
        ...mapState("theme", ["variable"]),
    },
    methods: {
        ...mapMutations("app", ["addTagsItem", "removeTagsItem"]),
        closeTag (index, path) {
            // 判断要关闭的标签是否为当前的选中项
            this.removeTagsItem({index, isRoute: this.$route.path === path});
        }
    }
};
</script>

<style lang="less" scoped>

.t-tag-container {
    display: flex;
    justify-content: left;
    align-items: center;
    a {
        margin-right: 8px;
        padding: 2px 8px;
        font-size: 14px;
        border: 1px solid;
        border-radius: 4px;
        i {
            border-radius: 50%;
        }
        i:hover {
            background-color: #969696;
        }
        &.is-active {
            color: #fff !important;
            background-color: rgb(13, 205, 87);
            &::before {
                display: inline-block;
                content: '';
                width: 8px;
                height: 8px;
                background-color: #fff;
                border-radius: 50%;
                margin-right: 2px;
            }
        }
    }
}
</style>