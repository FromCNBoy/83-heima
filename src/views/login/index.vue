/* eslint-disable no-undef */
<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form status-icon ref="myForm" :model="loginForm" :rules="loginRules" style="maegin-top:20px">
        <el-form-item prop="mobile">
          <!-- 输入手机号 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 发送/接收验证码 -->
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:65%"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <!-- 同意选项 -->
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      //   if (value) {
      //     callBack()
      //   } else {
      //     callBack(new Error('请您阅读用户协议和隐私条款'))
      //   }
      value ? callBack() : callBack(new Error('请您阅读用户协议和隐私条款'))
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        agree: false
      },
      loginRules: {
        // key(字段名):value(对象数组) => 一个对象就是一个校验规则
        // required 为true 就表示该字段必填 如果不填 就会提示消息
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      // 校验表单
      this.$refs.myForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            method: 'POST',
            url: '/authorizations',
            data: this.loginForm
          }).then(result => {
            // 将后台返回的token令牌存储到前端缓存中
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/home') // 跳转到主页
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 450px;
  height: 350px;
}
.title {
  text-align: center;
  img {
    height: 45px;
  }
}
</style>
