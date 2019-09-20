<template>
  <el-row class='layout-header' type='flex' align="middle" justify="space-between">
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4">
      <img class="head-img" src="../../assets/img/file-1567005333695.jpg" alt />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          哈哈哈哈
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">git地址</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout-header {
  height: 50px;
  .el-icon-s-unfold {
    font-size: 22px;
    margin-top: 14px;
  }
  .title {
    vertical-align: top;
    line-height: 50px;
    margin-left: 4px;
  }
  .head-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 4px;
  }
}
</style>
