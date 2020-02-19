<!--
 * @Description: 框架页
 * @Author: wangjn
 * @Date: 2019-07-16 15:50:10
 * @LastEditTime : 2020-01-10 17:31:47
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="body">
    <el-container class="container">
      <el-container>
        <el-header>
          <!-- <img src="../assets/logo.png" class="logo_img"> -->
          <span class="title_line"></span>
          <!-- <label class="title_label">服务配置中心</label> -->
          <i class="iconfont iconshouye" @click="goHome"></i>
          <div class="header-right-more">
            <el-dropdown trigger="click">
              <i class="el-icon-more"></i>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item  @click.native="changePwd"><i class="CHIoT iconpassword1"></i> <span>修改密码</span></el-dropdown-item> -->
                <el-dropdown-item  @click.native="logOut"><i class="CHIoT iconlogout"></i> <span>退出登录</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="user">
            <span class="user-name">{{username}}</span>
          </div>
          <div class="user">
            <img src="../assets/userimg.png" class="header_img">
          </div>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>
          <p class="footer_p">Copyright © 2019 All Rights Reserved. 
            </p>

        </el-footer>
      </el-container>

    </el-container>
    <el-dialog
      title="修改密码"
      class="change_pwd"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="580px"
      :before-close="handleClose">
      <changePwd @cancel="cancel" v-if="dialogVisible"></changePwd>
    </el-dialog>
  </div>
</template>

<script>
import changePwd from '@/components/changePwd'
export default {
  data () {
    return {
      username: '-',
      dialogVisible: false
    }
  },

  components: {
    changePwd
  },

  computed: {},

  created () {
    this.username = window.sessionStorage.getItem('username')
  },

  mounted () {},

  methods: {
    /**
     * @Description: 修改密码弹窗
     * @Author: WangJiaNan
     * @Date: 2019-07-16 16:49:43
     */
    changePwd () {
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    cancel (num) {
      this.dialogVisible = false
      if (num === 1) {
        this.$router.push({ path: '/' })
      }
    },
    /**
     * @Description:退出登录
     * @Author: WangJiaNan
     * @Date: 2019-07-16 17:02:39
     */
    logOut () {
      // let _this = this
      let content = '确定要退出吗？'
      this.$utils.confirm(this, content).then(() => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        this.$router.push({ path: '/' })
      })
    },
    // 返回首页
    goHome(){
      this.$router.push({ path: '/service' })
    }
  }
}

</script>
<style lang='stylus' scoped>
.el-menu-item
  text-align left
  font-size 14px
  height 52px
  line-height 52px;
.el-header{
    color: #333;
    height 52px !important
    line-height 52px
    .logo_img{
      width 120px
      margin-left 30px
      margin-top 10px
      float left
    }
    .title_line{
      float left
      border-left 1px solid #E7E7E7
      width 1px
      height 20px
      margin-top 15px
      margin-left 10px
    }
    .title_label{
      font-size:22px;
      font-family:AndaleMono;
      color:rgba(89,87,87,1);
      float left
      height 30px
      margin-left 10px
    }
    .user{
      float:right;
      padding: 0 10px;
      // width:100px;
      height:52px;
      color:rgba(132,144,166,1);
      font-weight:600;
      font-size:20px;
    }
    .header_img{
      width 32px
      margin-top 10px
    }
    .header-right-more{
      float:right;
      width:50px;
      height:60px;
      cursor pointer
      color rgba(255,255,255,1);
    }
  }
  .el-footer{
    height:30px !important;
    line-height 30px
    text-align right
    background-color: #f8fafb;
    .footer_p{
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:17px;
    }
  }
  .el-aside {
    height: 100%;
    background: #005bac;
    color: #333;
  }

  .el-main {
    background-color: #F8FAFB;
    color: #333;
    padding 0
  }
.body
  height 100%
  .container
    height 100%
.logo_container
  height 60px
  background #00284d
  text-align center
  .logo_img
    width 100px
    height 20px
    margin-top 20px
.change_pwd
  >>>.el-dialog__body
    padding 0
.iconshouye
  margin-left 20px   
.iconshouye:hover
  cursor pointer   
</style>
