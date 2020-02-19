<!--
 * @Description: 输入框组件
 * @Author: wangjn
 * @Date: 2019-08-08 09:06:39
 * @LastEditTime: 2019-08-16 14:46:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="input_body">
    <el-row :gutter="10">
      <el-col :span="inputConfig.labelWidth" class="label">
        <span v-if="inputConfig.isRequire">*</span>
        <label>{{inputConfig.labelName}}</label>
      </el-col>
      <el-col :span="inputConfig.inputWidth">
        <div :class="{input_box:inputConfig.type === 'textarea' ? false : true}" :style="{'border-color':inputConfig.borderColor}">
          <el-input
            :placeholder="inputConfig.placeholder"
            v-bind="$attrs"
            v-model.trim="inputConfig.value"
            v-on:focus="interaction"
            @blur="blurInput"
            @input="changInput"
            :type="inputConfig.type"
            :show-password="inputConfig.type==='password'"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="inputConfig.warningWidth">
        <p class="warning">{{inputConfig.warningInfo}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '' // input框的内容
    }
  },
  props: ['inputConfig', 'labelwidth', 'propsValue'],
  components: {},

  computed: {},

  created () {},

  mounted () {},

  methods: {
    blurInput () {
      this.$emit('getContent', this.inputConfig.value)
    },
    changInput () {
      this.$emit('changeContent', this.inputConfig.value)
    },
    interaction () {
      console.log(this.inputConfig.status)
      if (this.inputConfig.status) {
        this.inputConfig.borderColor = '#409EFF'
      } else {
        this.inputConfig.borderColor = '#FF0014'
      }
    }
  }
}

</script>
<style lang='stylus' scoped>
$colorDefault = #DCDFE6
$colorTip = #FF0014
$colorIOTBlue = #005BAC
.input_body
  margin-top 20px
.label
  text-align right
  overflow hidden
  label
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(107,121,142,1);
    line-height:22px;
    float right
    margin-right 10px
    margin-top 4px
  span
    font-size 20px
    float right
    color $colorTip
    margin-top 8px
.input_box
  box-shadow:0px 1px 2px 0px rgba(180,194,211,0.3);
  border-radius:3px;
  border:1px solid $colorDefault;
  height 30Px
  >>>.el-input__inner
    border none
    height 30Px
.warning
  color $colorTip
  font-size:12px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  line-height:30px;
</style>
