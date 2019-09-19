<template>
  <el-container>
    <!-- 左侧导航 -->
    <el-aside>
      <layout-aside>导航</layout-aside>
    </el-aside>
    <!-- 内容区域 -->
    <el-container>
      <!-- 头部 -->
      <el-header>头部</el-header>
      <el-main>
        <!-- 路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
