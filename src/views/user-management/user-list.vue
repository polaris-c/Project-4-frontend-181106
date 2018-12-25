<template>
  <div class="app-main-container">
    <el-row>
      <el-col :span="22">
        <search-input @emit-search="handleSearch"></search-input>
      </el-col>
      <el-col :span="2">
        <delete-button @delete-confirm="handleDelete"></delete-button>
      </el-col>
    </el-row>

    <el-table
      class="app-main-table"
      ref="UserList"
      :data="tableData"
      style="width: 100%"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      fit
      stripe
      border
      highlight-current-row>

      <el-table-column
        type="selection"
        align="center"
        width="50">
      </el-table-column>

      <el-table-column
        label="人员编号"
        align="center"
        width="100"
        fixed="left">
        <template slot-scope="scope">
          <el-button 
            type="text"
            @click="detail(scope.row)">
            {{ scope.row.id }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="人员姓名"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-button 
            type="text"
            @click="detail(scope.row)">
            {{ scope.row.name }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="username"
        label="账号（手机）"
        align="center"
        width="180">
      </el-table-column>

      <el-table-column
        prop="phone"
        label="固话"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
        width="200">
      </el-table-column>

      <el-table-column
        prop="unit"
        label="单位"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="department"
        label="部门"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="posts"
        label="职务"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="isDelete"
        label="在任情况"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-tag
           :type="scope.row.isDelete === false ? 'success' : 'danger'">
            {{ scope.row.isDelete === false ? '在 任' : '离 任' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="role"
        label="权限"
        align="center"
        width="150"
        fixed="right">
        <template slot-scope="scope">
          <el-tag
           :type="scope.row.role === 'user' ? 'warning' : ''">
           {{ scope.row.role }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column
        prop="note"
        label="备注"
        align="center"
        width="150">
      </el-table-column> -->

    </el-table>

    <pagination 
      v-bind="tableParams"
      @change-page="handleChangePage"
      @change-size="handleChangeSize">
    </pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DeleteButton from '@/components/Buttons/delete-button'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import { getList } from '@/api/user-management'

export default {
  name: 'UserList',
  data() {
    return {
      multipleSelection: [],
      tableData: [
        {
          id: 1,
          name: 'Admin01',
          mobile: '123456',
          phone: '321456',
          email: '123456@outlook.com',
          unit: 'AAA',
          department: 'aaa',
          posts: 'UPA',
          role: 'admin',
          isDelete: true,
          note: 'aaa1'
        },
        {
          id: 2,
          name: 'Admin02',
          mobile: '123456',
          phone: '321456',
          email: '123456@outlook.com',
          unit: 'AAA',
          department: 'aaa',
          posts: 'UPA',
          role: 'admin',
          isDelete: false,
          note: 'aaa2'
        },
        {
          id: 3,
          name: 'Admin03',
          mobile: '123456',
          phone: '321456',
          email: '123456@outlook.com',
          unit: 'AAA',
          department: 'aaa',
          posts: 'UPA',
          role: 'admin',
          isDelete: true,
          note: 'aaa3'
        },
        {
          id: 4,
          name: 'User01',
          mobile: '123456',
          phone: '321456',
          email: '123456@outlook.com',
          unit: 'AAA',
          department: 'aaa',
          posts: 'UPA',
          role: 'user',
          isDelete: true,
          note: 'aaa1'
        },
        {
          id: 5,
          name: 'User02',
          mobile: '123456',
          phone: '321456',
          email: '123456@outlook.com',
          unit: 'AAA',
          department: 'aaa',
          posts: 'UPA',
          role: 'user',
          isDelete: true,
          note: 'aaa2'
        }
      ],
      tableParams: {
        search: null,
        page: 1,
        page_size: 20,
        count: 1,
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sidebar',
      'device',
      'token',
      'avatar',
    ])
  },
  components: {
    DeleteButton,
    SearchInput,
    Pagination
  },
  mounted() {
    this.fetchData(this.tableParams)
  },
  methods: {
    fetchData(tableParams){
      getList(tableParams).then(res => {
        this.tableData = res.results
        this.tableParams.count =  res.count
      }).catch(err => {
        this.$message({
          message: '获取用户列表错误' + err.message,
          type: 'error'
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('- - UserList - - multipleSeletion:', this.multipleSelection)
    },
    detail(row) {
      this.$router.push('/userManagement/userIndexList/userDetail/' + row.id)
    },

    /** 页面按键功能 */
    handleDelete() {
      console.log('- - UserList - - delete: ', this.multipleSelection)
    },
    handleSearch(searchInputData) {
      console.log('- - UserList - - search: ', searchInputData)
      this.tableParams.search = searchInputData
      this.tableParams.page = 1
      this.fetchData(this.tableParams)
    },
    handleChangePage(pageIndex) {
      console.log('- - UserList - - pageIndex: ', pageIndex)
      this.tableParams.page = pageIndex
      this.fetchData(this.tableParams)
    },
    handleChangeSize(pageSize) {
      console.log('- - UserList - - pageSize: ', pageSize)
      this.tableParams.page_size = pageSize
      this.tableParams.page = 1
      this.fetchData(this.tableParams)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
