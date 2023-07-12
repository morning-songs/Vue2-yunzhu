import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)
// 定义公开路由
export const publicRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
    meta: {
      title: "登录 | 文竹管理系统" // 设置菜单标题
    }
  },
  {
    path: "/",
    name: "index",
    component: Layout,
    redirect: "/index",
    meta: {
      title: "首页", // 设置菜单标题
      icon: "el-icon-house",
      noDropDown: true // 不渲染子级路由的菜单
    },
    children: [
      {
        path: "/index",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页"
        }
      }
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
    meta: {
      title: "404" // // 设置菜单标题
    }
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    meta: {
      title: "401" // // 设置菜单标题
    }
  },
]
// 定义权限路由（一般由后端提供）
export const prevateRoutes = [
  {
    path: "/articleManager",
    name: "articleManager",
    component: Layout,
    meta: {
      title: "文章管理",
      role: ["admin"],
      icon: "el-icon-document-copy",
      noDropDown: false
    },
    children: [
      {
        path: "/articleManager/articleCreate",
        name: "articleCreate",
        component: () => import("@/views/article-create"),
        meta: {
          title: "文章创建",
          icon: "el-icon-document-add"
        }
      },
      {
        path: "/articleManager/articleList",
        name: "articleList",
        component: () => import("@/views/article-list"),
        meta: {
          title: "文章列表",
          icon: "el-icon-document"
        }
      },
      {
        path: "/articleManager/articleTag",
        name: "articleTag",
        component: () => import("@/views/article-tag"),
        meta: {
          title: "文章标签",
          icon: "el-icon-collection-tag"
        }
      }
    ]
  },
  {
    path: "/userManager",
    name: "userManager",
    component: Layout,
    meta: {
      title: "用户管理",
      role: ["editor", "admin"],
      icon: "el-icon-user",
      noDropDown: false
    },
    children: [
      {
        path: "/userManager/userList",
        name: "userList",
        component: () => import("@/views/user-list"),
        meta: {
          title: "用户列表",
          icon: "el-icon-user-solid"
        }
      }
    ]
  },
  {
    path: "/newsManager",
    name: "newsManager",
    component: Layout,
    meta: {
      title: "消息管理",
      role: ["editor", "admin"],
      icon: "el-icon-bell",
      noDropDown: false
    },
    children: [
      {
        path: "/newsManager/comment",
        name: "comment",
        component: () => import("@/views/comment"),
        meta: {
          title: "评论管理",
          icon: "el-icon-s-comment"
        }
      },
      {
        path: "/newsManager/message",
        name: "message",
        component: () => import("@/views/message"),
        meta: {
          title: "留言管理",
          icon: "el-icon-message"
        }
      }
    ]
  },
  {
    path: "/linksManager",
    name: "linksManager",
    component: Layout,
    meta: {
      title: "友链管理",
      role: ["editor", "admin"],
      icon: "el-icon-position",
      noDropDown: false
    },
    children: [
      {
        path: "/linksManager/linkList",
        name: "linkList",
        component: () => import("@/views/link-list"),
        meta: {
          title: "友链列表",
          icon: "el-icon-link"
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  routes: publicRoutes // 先挂载公开路由，待接收到权限路由后，再替换它
})

export default router
