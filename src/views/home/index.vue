<template>
  <el-container>
    <!-- 左侧导航 -->
    <el-aside style="width:200px; overflow:hidden; background-color:#323745">
      <layout-aside>导航</layout-aside>
    </el-aside>
    <!-- 内容区域    style="background-color:rgb(242,243,243)" -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <layout-header>头部</layout-header>
      </el-header>
      <el-main style="padding:0">
        <!-- 路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style>
</style>
