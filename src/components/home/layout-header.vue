<template>
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4">
      <img class="head-img" :src="userInfo.photo ? userInfo.photo : defaultImg" alt />
      <el-dropdown trigger="click" @command="commonClick">
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="accout">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile' }).then(result => {
        // this.userInfo = result.data.data
        this.userInfo = result.data // 接收数据对象
      })
    },
    commonClick (key) {
      if (key === 'accout') {
        this.$router.push('/home/account')
      } else if (key === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/83heimatoutiao'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
    // 一旦监听到事件 就会执行后面的函数
    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo()
    })
  }
}
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
