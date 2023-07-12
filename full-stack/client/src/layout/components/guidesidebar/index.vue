<template>
  <div>
    <!-- 标题区 -->
    <div class="logo-container">
      <img :src="logoUrl" alt="LOGO图片" class="logo-img" />
      <h1 :style="{'color': $store.state.theme.variable.mainColor}">文竹管理系统</h1>
    </div>
    <div class="menu-container">
      <!-- 菜单区 -->
      <SiderMenu />
    </div>
  </div>
</template>

<script>
import SiderMenu from "./SiderMenu.vue"

export default {
  name: "GuideSideBar",
  data() {
    return {
      logoUrl: require("@/assets/logo.png"),
    };
  },
  components: {
    SiderMenu
  }
};
</script>

<style scoped lang="less">

.l-sidebar-container {
  .logo-container {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    text-align: center;
    overflow: hidden;
    .logo-img {
      width: 32px;
      height: 32px;
      margin-right: 12px;
      vertical-align: middle;
    }
    h1 {
      display: inline-block;
      font-size: 14px;
      font-weight: bold;
      vertical-align: middle;
    }
  }
}

</style>
