import router from "@/router/index.js"

export default {
    namespaced: true,
    state: {
        hamburgerFold: false,
        tagBarList: [
            {
                path: "/index",
                meta: {
                    title: "首页"
                }
            }
        ]
    },
    mutations: {
        hamburgerFoldSwitch (state) {
            state.hamburgerFold = !state.hamburgerFold;
        },
        addTagsItem (state, tagRoute) {
            // 去重
            !state.tagBarList.find(item => item.path === tagRoute.path) && state.tagBarList.push(tagRoute);
        },
        removeTagsItem (state, {index, isRoute}) {
            // 删除当前项
            state.tagBarList.splice(index, 1);
            // 删除的是当前的选中项，跳转到最后一项
            isRoute && router.push(state.tagBarList[state.tagBarList.length - 1].path);
        }
    }
}