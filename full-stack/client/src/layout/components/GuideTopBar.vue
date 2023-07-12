<template>
  <div :style="{'color': variable.mainColor}">
    <!-- 左侧菜单 -->
    <div class="l-menu">
      <!-- 汉堡包 -->
      <div class="hamburger-container" @click="hamburgerFoldSwitch" style="cursor: pointer;">
        <i :class="hamburgerFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <!-- 若已为首页,不允许跳转,其他页面可跳转回首页 -->
        <el-breadcrumb-item
          v-if="$route.path !== '/index'"
          :to="$route.path === '/index' ? '' : '/index'"
          style="color: inherit"
        >
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          v-if="item.path"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧菜单 -->
    <div class="r-menu" style="cursor: pointer;">
      <div>
          <el-dropdown trigger="click" style="color: inherit" class="customTheme">
            <span class="el-dropdown-link">
                自定义主题
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu 
            style="box-sizing: border-box; height: 50px; background-color: transparent;"
            :style="{'color': variable.mainColor}">
                <ul class="customList"
                style="display: flex; justify-items: center; align-items: center; font-size: 14px; color: inherit;"
                >
                    <li style="width: 120px; margin: 0 5px">
                        <label style="vertical-align: middle;">背景色：
                            <input style="vertical-align: middle;" type="color" />
                        </label>
                    </li>
                    <li style="width: 120px; margin: 0 5px">
                        <label style="vertical-align: middle;">字体色：
                            <input style="vertical-align: middle;" type="color" />
                        </label>
                    </li>
                    <li style="width: 120px; margin: 0 5px">
                        <label style="vertical-align: middle;">边框色：
                            <input style="vertical-align: middle;" type="color" />
                        </label>
                    </li>
                    <li style="width: 50px; margin: 0 5px" @click="getColor">
                        <button 
                        style="width: 100%; height: 27px; border: 1px solid black; border-radius: 4px; color: inherit; font-weight: bold;">
                        确定
                        </button>
                    </li>
                </ul>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
      <div class="theme-switch" @click="switchWOD($store.state.theme.variable)">
        <i
          :class="themeIcon"
          :style="{ color: $store.state.theme.variable.mainColor }"
        ></i>
      </div>
      <!-- 头像 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar
          shape="circle"
          :size="30"
          :src="$store.state.user.userInfo && $store.state.user.userInfo.avator"
          >
          </el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from "vuex";

export default {
  name: "GuideTopBar",
  data() {
    return {
      themeIcon: "el-icon-sunny",
    };
  },
  computed: {
    ...mapState("app", ["hamburgerFold"]),
    ...mapState("theme", ["variable"]),
    themeInputs() {
        return document.getElementsByClassName("customList")[0].getElementsByTagName("input");
    }
  },
  methods: {
    ...mapMutations("app", ["hamburgerFoldSwitch"]),
    ...mapMutations("theme", [ "whiteSwitch", "darkSwitch", "customSwitch", "setCustom"]),
    ...mapActions("user", ["logout"]),
    switchWOD(variable) {
      // console.log(variable);
      if (variable.mainBgc === variable.whiteMainBgc) {
        this.themeIcon = "el-icon-moon";
        this.darkSwitch();
      } else {
        this.themeIcon = "el-icon-sunny";
        this.whiteSwitch();
      }
    },
    getColor () {
        // console.log(this.themeInputs);
        this.setCustom([this.themeInputs[0].value, this.themeInputs[1].value, this.themeInputs[2].value]);
        this.customSwitch();
    },
    handleCommand (option) {
      /** 退出登录
       *  1、发起log out请求，告知服务端需要退出登录
       *  2、清除本地缓存，以及vuex中用户相关的重要信息
       *  3、跳转到/login
       */
      if (option === "logout") {
        this.logout();
      }
    }
  }
}; 
</script>

<style lang="less" scoped>

.l-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  .hamburger-container {
    margin-right: 20px;
    i {
      font-size: 24px;
    }
  }
  .el-breadcrumb__item {
    /deep/ .el-breadcrumb__inner {
      color: inherit;
      a {
        transition: none;
      }
    }
    /deep/ .el-breadcrumb__inner.is-link {
      transition: none;
    }
  }
}

.r-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  .theme-switch {
    margin: 0 20px;
    i {
      font-size: 24px;
    }
  }
}
</style>