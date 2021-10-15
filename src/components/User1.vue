<template>
  <div>
    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  卡片主体区域  -->
    <el-card>
      <!--   搜索栏   -->
      <el-row :gutter="20">
        <el-col span="10">
          <el-input v-model="text" placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col span="5">
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!--   表格数据   -->
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="状态">
          <!--    利用插槽实现状态的渲染      -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <!--   还是利用插槽实现自定义按钮  -->
            <el-tooltip effect="dark" content="编辑信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="设置" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--   分页   -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagenum"
        :page-sizes="[1,2,5]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    @close="buttonClose">
      <el-form :model="addUserForm" :rules="userRules" ref="addUserFormRef" label-width="100px" status-icon>
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="addUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="tel">
          <el-input v-model="addUserForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var emailValidator = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value))
        return callback()
      callback(new Error("请输入合法的邮箱"))
    }
    return {
      dialogVisible: false,
      text: '',
      pagenum: 1,
      pagesize: 1,
      total: 4,
      tableData: [],
      addUserForm: {
        name: '',
        password: '',
        tel: '',
        email: ''
      },
      userRules: {
        name: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入用户密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        tel: [
          {required: true, message: '请输入用户电话', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入用户邮箱', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'},
          {validator: emailValidator, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getInfor()
  },
  methods: {
    getInfor() {
      this.tableData = [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        status: true
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        status: false
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        status: true
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        status: false
      }]
    },
    // 每页显示多少条数据
    handleSizeChange(val) {
      this.pagesize = val
      this.getInfor()
    },
    // 当前多少页
    handleCurrentChange(val) {
      this.pagenum = val
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.$refs.addUserFormRef.resetFields()
        })
        .catch(_ => {
        });
    },
    buttonClose(){
      this.$refs.addUserFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 10px;
  font-size: 12px;
}

.el-pagination {
  margin-top: 15px;
}
</style>
