<template>
  <el-card v-loading="loading">
    <!-- slot=> header 是给el-card的插槽 -->
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <!-- el-table-column 列 属性 prop => 键名 => 字段名 label => 表头 -->
      <el-table-column width="600px" label="标题" prop="title"></el-table-column>
      <el-table-column
        :formatter="stateFormatter"
        align="center"
        label="评论状态"
        prop="comment_status"
      ></el-table-column>
      <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button :style="{color: obj.row.comment_status ? '#E6A23C' : '#409EFF' }" @click="closeOrOpen(obj.row)" size="small" type="text">
            {{
            obj.row.comment_status ? "关闭评论" : '打开评论'
            }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页页面结构 -->
    <el-row type="flex" justify="center" style='margin:20px 0'>
      <!-- page-size 是每页多少条 -->
      <el-pagination  @current-change="changePage" :current-page="page.currentPage" :page-size="page.pageSize" :total="page.total" background layout="prev, pager, next" ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 总条数
        currentPage: 1, // 默认第一页
        pageSize: 10 // 每页多少条
      },
      loading: false // 定义一个变量loading
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage // 更新最新页码给 currernpage
      this.getComment()
    },
    //   获取评论列表
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results // 把返回的数据赋值给list
        this.page.total = result.data.total_count // 把总条数给 分页组件的总条数
        this.loading = false
      })
    },
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭  row 当前行数据
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confrm(`您确定要${mess}评论?`).then(() => {
        // 调用接口
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() }, // 路径参数
          data: { allow_comment: !row.comment_status } // body参数  调用状态和当前状态是反着的 所以取反
        }).then(() => {
          // 成功之后一定会进入then
          this.getComment() // 重新拉取数据
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
