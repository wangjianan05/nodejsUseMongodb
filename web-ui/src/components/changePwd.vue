<template>
  <div class="body">
    <div class="form_body">
      <elinput
        :inputConfig = inputConfigOld
        @getContent = blurOldPwd
        @changeContent = changeOldPwd
      ></elinput>
      <elinput
        :inputConfig = inputConfigNew
        @getContent = blurNewPwd
        @changeContent = changeNewPwd
      ></elinput>
      <elinput
        :inputConfig = inputConfigCheck
        @getContent = blurCheckPwd
        @changeContent = changeCheckPwd
      ></elinput>
      <!-- <el-form label-width="120px" :model="form" :rules="dataRule" ref="form">
        <el-form-item label="旧密码" prop="old">
          <el-input v-model="form.old" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new">
          <el-input v-model="form.new" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkNew">
          <el-input v-model="form.checkNew" type="password" show-password></el-input>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="btn_box">
      <div class="fr">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="cancel(0)">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import elinput from '@/components/input'
export default {
  name: '',
  data () {
    return {
      inputConfigOld: {
        labelWidth: 5,
        inputWidth: 11,
        warningWidth: 8,
        labelName: '当前密码',
        isRequire: true,
        type: 'password',
        placeholder: '请输入',
        borderColor: '#DCDFE6',
        warningInfo: '',
        value: '',
        status: true
      },
      inputConfigNew: {
        labelWidth: 5,
        inputWidth: 11,
        warningWidth: 8,
        labelName: '新密码',
        isRequire: true,
        type: 'password',
        placeholder: '请输入',
        borderColor: '#DCDFE6',
        warningInfo: '',
        value: '',
        status: true
      },
      inputConfigCheck: {
        labelWidth: 5,
        inputWidth: 11,
        warningWidth: 8,
        labelName: '确认新密码',
        isRequire: true,
        type: 'password',
        placeholder: '请再次输入',
        borderColor: '#DCDFE6',
        warningInfo: '',
        value: '',
        status: true
      }
    }
  },
  components: {
    elinput
  },
  methods: {
    /**
     * @Description: 旧密码失去焦点
     * @Author: WangJiaNan
     * @Date: 2019-08-08 14:37:53
     */
    blurOldPwd (val) {
      this.checkOldPwd(val, 'blur')
    },
    /**
     * @Description: 旧密码改变值
     * @Author: WangJiaNan
     * @Date: 2019-08-08 14:37:53
     */
    changeOldPwd (val) {
      this.checkOldPwd(val, 'change')
    },
    /**
     * @Description: 旧密码验证
     * @Author: WangJiaNan
     * @Date: 2019-08-08 14:37:53
     */
    checkOldPwd (val, type) {
      if (val) {
        this.inputConfigOld.warningInfo = ''
        if (type === 'blur') {
          this.inputConfigOld.borderColor = '#DCDFE6'
        } else {
          this.inputConfigOld.borderColor = '#409EFF'
        }
        this.inputConfigOld.status = true
      } else {
        this.inputConfigOld.warningInfo = '请输入旧密码'
        this.inputConfigOld.borderColor = '#FF0014'
        this.inputConfigOld.status = false
      }
      this.inputConfigOld.value = val
    },
    /**
     * @Description: 新密码失去焦点
     * @Author: WangJiaNan
     * @Date: 2019-08-08 14:39:01
     */
    blurNewPwd (val) {
      this.checkNewPwd(val, 'blur')
    },
    /**
     * @Description:新密码改变值
     * @Author: WangJiaNan
     * @Date: 2019-08-08 14:43:47
     */
    changeNewPwd (val) {
      this.checkNewPwd(val, 'change')
      if (this.inputConfigCheck.value) {
        this.checkAgainPwd(this.inputConfigCheck.value, 'change')
      }
    },
    /**
     * @Description: 新密码校验
     * @Author: WangJiaNan
     * @Date: 2019-08-08 14:44:00
     */
    checkNewPwd (val, type) {
      if (!this.$regExp.password.test(val)) {
        this.inputConfigNew.warningInfo = '密码为英文数字和下划线组合'
        this.inputConfigNew.borderColor = '#FF0014'
        this.inputConfigNew.status = false
      } else if (!this.$regExp.passwordLength.test(val)) {
        this.inputConfigNew.warningInfo = '密码长度为4-20位'
        this.inputConfigNew.borderColor = '#FF0014'
        this.inputConfigNew.status = false
      } else {
        this.inputConfigNew.warningInfo = ''
        if (type === 'blur') {
          this.inputConfigNew.borderColor = '#DCDFE6'
        } else {
          this.inputConfigNew.borderColor = '#409EFF'
        }
        this.inputConfigNew.status = true
      }
      this.inputConfigNew.value = val
    },
    blurCheckPwd (val) {
      this.checkAgainPwd(val, 'blur')
    },
    changeCheckPwd (val) {
      this.checkAgainPwd(val, 'change')
    },
    checkAgainPwd (val, type) {
      if (!/\S/.test(val)) {
        this.inputConfigCheck.warningInfo = '请输入正确的密码'
        this.inputConfigCheck.borderColor = '#FF0014'
        this.inputConfigCheck.status = false
      } else if (this.inputConfigNew.value !== val) {
        this.inputConfigCheck.warningInfo = '密码不一致'
        this.inputConfigCheck.borderColor = '#FF0014'
        this.inputConfigCheck.status = false
      } else {
        this.inputConfigCheck.warningInfo = ''
        if (type === 'blur') {
          this.inputConfigCheck.borderColor = '#DCDFE6'
        } else {
          this.inputConfigCheck.borderColor = '#409EFF'
        }
        this.inputConfigCheck.status = true
      }
      this.inputConfigCheck.value = val
    },
    /**
     * @Description: 表单提交
     * @Author: WangJiaNan
     * @Date: 2019-07-16 17:59:04
     */
    submit () {
      if (this.inputConfigOld.status && this.inputConfigNew.status && this.inputConfigCheck.status) {
        this.change()
      }
      // this.$refs['form'].validate((valid) => {
      //   if (valid) {
      //     this.change()
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    /**
     * @Description: 取消按钮
     * @Author: WangJiaNan
     * @Date: 2019-07-16 17:59:20
     */
    cancel (num) {
      this.$emit('cancel', num)
    },
    change () {
      let _this = this
      var obj = {
        params: {
          oldPassword: this.inputConfigOld.value,
          newPassword: this.inputConfigNew.value
        },
        url: this.$urlConfig.changePwd
      }
      this.$api.putWithBody(obj).then(function (res) {
        _this.$message.success('修改成功')
        _this.$emit('cancel', 1)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.body
  .form_body
    overflow hidden
    padding 30px
  .btn_box
    overflow hidden
    padding 10px 15px
    border-top: 1px solid #d0d8dc;
    .fr
      float right
</style>
