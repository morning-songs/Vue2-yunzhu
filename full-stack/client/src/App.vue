<template>
  <div id="app" 
  :style="{'color': $store.state.theme.variable.mainColor, 'backgroundColor': $store.state.theme.variable.mainBgc}"
  style="user-select: none;"
  >
    <router-view></router-view>
  </div>
</template>

<style lang="less">
// 导入执行reset样式文件
@import "~@/assets/css/element-ui.less";
@import "~@/assets/css/reset.css";

</style>
