<!--
 * @Description: 主页
 * @Author: your name
 * @Date: 2019-07-16 18:21:04
 * @LastEditTime: 2020-02-19 17:19:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="body">
    <el-button type="primary"  @click="addShow()" >新增用户</el-button>
    <el-input placeholder="请输入内容" v-model="name" class="header__input--search">
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        fixed
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="userage"
        label="年龄">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(scope.row)"
            type="text"
            size="small">
            修改
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.row)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <app-pagination :totalSize='totalSize' @changePageNumber="changePag" class="pagination" :currentPage='currentPage'/>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form label-width="80px" :model="form" :rules="dataRule" ref="form">
        <el-form-item label="名称" prop="username">
          <el-input v-model="form.username" maxlength = "30"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="userage">
          <el-input v-model="form.userage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <input type="text" id="text" style="display:none">
          <input type="password" id="password" style="display:none">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import appPagination from '@/components/pagination'
export default {
  data () {
    var checkAge = function(rule, value, callback){
      console.log(value)
      let reg = /^[0-9]*$/
      if(value!==''&&!reg.test(value)){
        callback(new Error('请输入正整数'))
      } else if(value === 0 || value === '0') {
        callback(new Error('年龄不能为0'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      isAdd:true,
      name:'',
      form:{
        username:'',
        userage:'',
        password:''
      },
      tableData:[],
      totalSize: 1,
      currentPage: 1,
      pageData: {
        pageSize: 10,
        pageNum: 1
      },
      dataRule : {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userage:  [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
    
  },
  components: {
    appPagination
  },

  computed: {},

  created () {
    this.search()
  },

  mounted () {

  },

  methods: {
    handleClose(done) {
      done();
    },
    addShow(){
      this.form = {
        username:'',
        userage:'',
        password:''
      },
      
      this.isAdd = true
      new Promise((resolve,reject)=>{
        this.dialogVisible = true
        resolve(true)
        })
        .then(()=>{
        // this.$refs['form'].resetFields();
      })
      
    },
    
    submit(){
      let _this = this
      var obj = {
        params: this.form,
        url: this.$urlConfig.userList
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
           if(this.isAdd){
            this.$api.post(obj).then(function (res) {
              if (res.code === '0') {
                _this.dialogVisible = false;
                _this.search();
                _this.$message.success(res.msg)
              }
            })
          } else {
            this.$api.putWithBody(obj).then(function (res) {
              if (res.code === '0') {
                _this.dialogVisible = false;
                _this.search();
                _this.$message.success(res.msg)
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      console.log(123)
     
     
    },
    search(){
      this.loadTable()
    },
    /**
     * @Description: 改变页码
     * @Author: WangJiaNan
     * @param {number} pageSize:一页多少数据
     * @param {number} pageNo:页码
     * @Date: 2019-04-29 17:11:47
     */
    changePag ({ pageSize = this.pageData.pageSize, pageNo = this.pageData.pageNum } = {}) {
      this.pageData.pageSize = pageSize
      this.pageData.pageNum = pageNo
      this.currentPage = pageNo
      this.loadTable()
    },
    loadTable(){
      let _this = this
      var obj = {
        params: {
          name:this.name,
          pageSize:this.pageData.pageSize,
          pageNum:this.pageData.pageNum
        },
        url: this.$urlConfig.userList

      }
      this.$api.getParams(obj).then(function (res) {
        if (res.code === '0') {
          _this.tableData = res.data
          _this.totalSize = res.total
        }
      })
    },
    getDetail(id){
      let _this = this
      var obj = {
        params: {
        },
        url: this.$urlConfig.userList+`/${id}`

      }
      this.$api.get(obj).then(function (res) {
        if (res.code === '0') {
          _this.form = res.data
        }
      })
    },
    deleteRow(row){
      let _this = this
      var obj = {
        data: {
          data: [row._id]
        },
        url: this.$urlConfig.userList
      }
      let content = '确定要执行删除操作吗？'
      this.$utils.confirm(this, content).then(() => {
          this.$api.deleteWithBody(obj).then(function (res) {
          if (res.code === '0') {
            _this.search();
            _this.$message.success('删除成功')
          }
        })
      }).catch(() => {
      })
     
    },
    editRow(row){
      this.dialogVisible = true
      this.isAdd = false
      this.getDetail(row._id)
    }
  }
}

</script>
<style lang='stylus' scoped>
$white = #fff;
/*  ====== 字体大小 ====== */
fontSize(args)
  font-size args;
/*  ====== 圆角函数 ====== */
round-corners(round=4px)
  border-radius: round
/*  ====== 线性渐变函数 ====== */ 
.body
  height 100%
  background: url(./../assets/index_bg.png);
  background-size: cover;
  padding 20px
  .header__input--search
    width:300px;
    float:right;
</style>
