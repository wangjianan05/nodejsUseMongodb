<!--
 * @Description: 登录页
 * @Author: wangjn
 * @Date: 2019-07-16 10:55:30
 * @LastEditTime : 2020-01-15 13:22:14
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="body">
    <div class="top"></div>
    <div class="login_form">
      <div class="form_title">
        <!-- <img src="../assets/logo.png"> -->
        <!-- <label>服务配置中心</label> -->
      </div>
      <div class="form_body">
        <div class="left_part">
          <img src="../assets/img1.png">
          <h2>专业 ● 专注</h2>
        </div>
        <div class="right_part">
          <div class="P40">
            <div class="line"></div>
            <h1>欢迎登录</h1>
            <div class="form_box">
              <el-form label-position="left" :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="login-container">
                <el-form-item prop="username">
                    <el-input type="text" style="display: none" ></el-input>
                    <el-input class="input_item" v-model="loginForm.username" placeholder="登录账号" suffix-icon="iconfont iconyuandian" maxlength="16" clearable>
                      <i slot="prefix" class="el-input__icon CHIoT iconuser"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="text" style="display: none"></el-input>
                    <el-input class="input_item" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')" placeholder="登录密码" show-password suffix-icon="iconfont iconmima" type="password">
                      <i slot="prefix" class="el-input__icon CHIoT iconpassword"></i>
                    </el-input>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;font-size:18px" @click="submitForm('loginForm')" :loading="logining">登 录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <div class="footer">
            Copyright © 2019 All Rights Reserved.<br> 
             <!-- 正泰集团研究院 版权所有  版本号V1.1  浙ICP备11016013号 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logining: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
           required: true, message: '请输入账号', trigger: ['blur','change'] },
           { min: 1,message: '账号最少1位', trigger: ['blur','change'] }],
           password: [{ required: true, message: '请输入密码', trigger: ['blur','change'] },
           { min: 1,message: '密码最少1位', trigger: ['blur','change']  }]
      }
    }
  },

  components: {},

  computed: {},

  created () {},

  mounted () {},

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.logining = true
          Promise.all([this.login()]).then(() => {
            this.logining = false
          })
        } else {
          this.logining = false
          return false
        }
      })
    },
    login () {
      let _this = this
      // _this.$router.push({ path: '/main' })
      var obj = {
        params: {
          username: this.loginForm.username,
          password: this.loginForm.password
        },
        url: this.$urlConfig.login

      }
      this.$api.post(obj).then(function (res) {
        if (res.code === '0') {
          const TOKEN = res.data.token
          window.sessionStorage.setItem('token', TOKEN)
          window.sessionStorage.setItem('username', _this.loginForm.username)
          _this.$message.success('登录成功')
          _this.$router.push({ path: '/main' })
        }
      })
    }
  }
}

</script>
<style lang='stylus' scoped>
.body
  background-image:url("../assets/bg.png")
  background-size:100% 100%
  width: 100%;
  height: 100%;
.b-info
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  color: $white;
  text-align: center;
  font-size: 12px;
.top
  height:240px;
.login_form
  width 775Px;
  height 540Px
  margin 0 auto;
  .form_title
    overflow hidden
    img
      // width 160Px
      float left
    label
      font-size:22Px;
      float left
      font-family:AndaleMono;
      color:rgba(89,87,87,1);
      line-height:40Px;
      margin-left 20Px
  .form_body
    margin-top 20Px
    overflow hidden
    >>>.el-form-item
      margin-bottom 30px
      .el-form-item__error
        padding-top 10px
    .left_part
      float left
      width 345Px
      height 480Px
      position relative
      img
        width 100%
      h2
        position absolute
        bottom 35Px
        left 31Px
        color #fff
        font-size:24Px;
        font-family:PingFangSC-Medium;
        font-weight:500;
    .right_part
      float left
      width 430Px
      background #fff
      height 480Px
      .P40
        padding-left 40Px
      .footer
        height 60Px
        border-top 2Px solid #F5F5F5
        margin-top 80Px
        font-size:12Px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        text-align center
        line-height 20Px
      .line
        width:29Px;
        height:3Px;
        background:rgba(35,122,228,1);
        margin-top 51Px
      h1
        font-size:24Px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(89,87,87,1);
        line-height:40px;
        margin-top 5Px
      .form_box
        width 352Px
        margin-top 59Px
        >>>.el-input__inner
          width:352Px;
          height:46Px;
          background:rgba(255,255,255,1);
          box-shadow:0px 2px 2px 0px rgba(180,194,211,0.3);
          border-radius:3Px;
          // border:1Px solid rgba(235,239,242,1);
          padding-left 57Px !important
          font-size 14Px
        >>>.el-input__prefix
          left 20Px
  p
    padding-bottom 80px
</style>
