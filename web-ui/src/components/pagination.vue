<!--
 * @module:公共组件 -分页
 * @fileName:pagination.vue
 * @Description:分页组件
 * demo :<app-pagintaion :totalSize='totalSize' @changePageNumber="queryDeviceTypes"/>
 * totalSize:{Number} 总条数
 * layoutOptions:{String} 配置分页组件子组件，多个值之间用逗号分隔；默认值是“prev, pager, next,sizes,jumper”
 * pagesCount:{Number}  显示页码数，默认是7个页码
 * @Author: LiSuwan
 * @Date: 2019-04-10 14:11:01
 -->

<template>
  <div class="components_pagination">
    <el-pagination
      background
      v-bind="$attrs"
      ref="tests"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="defaultSize"
      :layout="setLayout"
      @current-change="changePageNumber"
      @size-change="handleSizeChange"
      :current-page.sync="currentPage1"
      :total="totalNumber"
      :pager-count="pagerCount"
      class="pagination"><!-- :hide-on-single-page="hideSinglePage" -->
    </el-pagination>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      pagerCount: this.pagesCount || 7, // 默认最多显示7页
      currentPage1: 1, // 默认显示第一页
      totalNumber: 1, // 总条数
      setLayout: this.layoutOptions || 'prev, pager, next,sizes,jumper',
      defaultSize: 10, // 默认显示条数
      hideSinglePage: true, // 只有一页不显示
      addSym: false
    }
  },
  inheritAttrs: false,
  methods: {
    /**
     * @Description: 修改改变页码
     * @Author: LiSuwan
     * @param {Number} pageNo：页码
     * @Date: 2019-04-17 13:13:49
     */
    changePageNumber (pageNo) {
      this.currentPage1 = Number(pageNo)
      this.$emit('changePageNumber', { pageNo: pageNo })
    },
    /**
     * @Description:修改每页显示的条数
     * @Author: LiSuwan
     * @param {Number} pageSize:每页显示的条数
     * @Date: 2019-04-17 12:56:49
     */
    handleSizeChange (pageSize) {
      this.currentPage1 = 1 // 每页显示的条数，页码默认跳转到第一页
      this.$emit('changePageNumber', { pageSize: pageSize, pageNo: 1 })
    },
    /**
     * @Description:监听键盘输入事件,若输入加号或减号则用空格替换
     * @Author: ZLL
     * @Date: 2019-12-25 19:26:21
     */
    handlerKeyup () {
      document.querySelector('.is-in-pagination .el-input__inner').addEventListener('keyup', function (e) {
        if (e.keyCode === 187 || e.keyCode === 189) {
          e.target.value = e.target.value.replace(/(\+|\-)+/g, '')
        }
      })
    }
  },
  props: ['totalSize', 'pagesCount', 'layoutOptions', 'currentPage', 'pageSize'],
  mounted () {
    this.totalNumber = this.totalSize * 1 || 1
    this.handlerKeyup()
  },
  watch: {
    /**
     * @Description: 监听属性pageSize,改变显示条数
     * @Author: ZLL
     * @Param: {Number} val：总条数
     * @Date: 2019-12-11 14:24:11
     */
    pageSize: {
      handler (val) {
        if (val) {
          this.defaultSize = val
        }
      },
      immediate: true
    },
    /**
     * @Description: 监听属性totalSize
     * @Author: LiSuwan
     * @Param: {String} val：总条数，默认值是1
     * @Date: 2019-04-25 19:04:42
     */
    totalSize (val) {
      this.totalNumber = val * 1 || 1
      this.currentPage1 = 1// 总条数发生变化时，页码默认显示第一页
    },
    /**
    * @Description: 父组件重新搜索返回第一页
    * @Author: WangJiaNan
    * @Date: 2019-04-26 10:14:58
    */
    currentPage () {
      this.currentPage1 = this.currentPage
    }
  }
}
</script>

<style lang="stylus" scoped>
.components_pagination
  margin-top 20px
  margin-bottom 20px
  margin-right 30px
  text-align right

  /* >>> .el-pager li,>>> .el-pagination button
    width 30px
    height 30px
    line-height 30px
    color rgba(144,147,153,1)
    background-color #fff
    border(,rgba(237,239,242,1),)
    round-corners() */

  >>> .el-pagination span:not([class*=suffix])
    height 30px
    line-height 30pxs

  >>> .el-scrollbar__wrap
    overflow-x visible

  >>> .el-pagination.is-background .el-pager li:not(.disabled):hover
    color $chiotBlue

  >>> .el-pagination.is-background .el-pager li:not(.disabled).active
    background-color #409EFF
    color #FFF

  /* >>> .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li
    width 36px
    height 36px
    background rgba(255, 255, 255, 1)
    round-corners()
    border-style solid
    border-color rgba(217, 217, 217, 1)
    border-width 1px
    color rgba(144,147,153,1); */

  >>> .el-pagination.is-background .btn-prev, >>> .el-pagination.is-background .btn-next, >>> .el-pagination.is-background .el-pager li
    background #fff
    border-style solid
    border-color rgba(217, 217, 217, 1)
    border-width 1px
    color #666
    font-weight 500
  >>> .el-pagination.is-background .btn-prev:disabled
    color: #C0C4CC;

</style>
<style lang="stylus">
/* .el-scrollbar__wrap
  overflow-x visible */

.el-select-dropdown__item.selected
  color $chiotBlue
  font-weight 700

.el-pagination--small .el-input--mini .el-input__inner
  height 24px
  line-height 24px
</style>
