<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态">
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select @change="changeCondition" v-model="formData.channel_id">
          <!-- 循环生成 el-option -->
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          @change="changeCondition"
          v-model="formData.date"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- -------------------------主体内容 -->
    <div class="total">共找到{{page.total}}条符合条件的内容</div>
    <div class="article-item" v-for="(item,index) in list" :key="index">
      <!-- 左侧 -->
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
        <div class="info">
          <span class="title">{{item.title}}</span>
          <el-tag :type="item.status | statusType" class="status">{{item.status | statusText }}</el-tag>
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <span @click="goEdit(item.id)">
          <i class="el-icon-edit"></i>修改
        </span>
        <span @click="delArticles(item.id)">
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <!-- -------------------------------分页 -->
    <el-row type="flex" justify="center" style="margin:10px 0">
      <el-pagination
        background
        @current-change="changePage"
        layout="prev,pager,next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 文章状态
        channel_id: null,
        data: []
      },
      list: [],
      channels: [],
      defaultImg: require('../../assets/img/huli.jpg'), // 将图片地址转成base64
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 18
      }
    }
  },
  methods: {
    //  跳转到修改
    goEdit (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 删除文章
    delArticles (id) {
      this.$confirm('你确定要删除该文章吗？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.qureyArticles()
        })
      })
    },
    changeCondition () {
      this.page.currentPage = 1
      this.qureyArticles()
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.qureyArticles()
    },
    qureyArticles () {
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id, // 频道id
        begin_pubdate: this.formData.data.length ? this.formData.data[0] : null, // 开始
        end_pubdate:
          this.formData.data.length > 1 ? this.formData.data[1] : null, // 结束时间
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 获取文章列表
        this.page.total = result.data.total_count // 获取总条数
      })
    },
    getChannels () {
      this.$axios({
        url: './channels'
      }).then(result => {
        this.channels = result.data.channels // 获取channels
      })
    }
  },
  created () {
    this.getChannels() // 获取频道列表
    this.getArticles() // 获取文章
  },
  filters: {
    //   定义一个过滤器 处理显示文本
    // 过滤器的第一个参数 永远是前面传过来的值
    // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    // 处理状态的显示样式
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.total {
  border-bottom: 1px dashed #ccc;
  height: 50px;
  line-height: 50px;
}
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px solid #f2f3f5;
  .left {
    display: flex;
    img {
      width: 180px;
      height: 100px;
      border-radius: 4px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      justify-content: space-around;
      .date {
        color: #999;
        font-size: 12px;
      }
      .title {
        font-size: 14px;
      }
      .status {
        width: 60px;
        text-align: center;
      }
    }
  }
  .right {
    font-size: 12px;
    span {
      margin-right: 8px;
      cursor: pointer;
    }
  }
}
</style>
