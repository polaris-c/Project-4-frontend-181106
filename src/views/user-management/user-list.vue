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
      v-loading="loading"
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
            @click="handleDetail(scope.row)">
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
            @click="handleDetail(scope.row)">
            {{ scope.row.name }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="username"
        label="账号（手机）"
        align="center"
        width="180">
        <template slot-scope="scope">
          <el-button 
            type="text"
            @click="handleDetail(scope.row)">
            {{ scope.row.username }}
          </el-button>
        </template>
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
        width="100"
        fixed="right">
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
        width="100"
        fixed="right">
        <template slot-scope="scope">
          <el-tag
           :type="scope.row.role === 3 ? 'info' : ''">
           {{ scope.row.role === 3 ? '普通用户' : '管理员'}}
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
import { getList, deleteUser } from '@/api/user-management'

export default {
  name: 'UserList',
  data() {
    return {
      loading: false,
      multipleSelection: [],
      tableData: [],
      tableParams: {
        search: null,
        page: 1,
        page_size: 10,
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
    this.loading = true
    this.fetchData(this.tableParams)
  },
  methods: {
    fetchData(tableParams){
      this.loading = true
      getList(tableParams).then(res => {
        this.tableData = res.results
        this.tableParams.count =  res.count
        // console.log('- - UserList - - tableParams.count:', this.tableParams.count)
        this.loading = false
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
    handleDetail(row) {
      this.$router.push('/userManagement/userIndexList/userDetail/' + row.username)
    },

    /** 页面按键功能 */
    handleDelete() {
      this.loading = true
      this.multipleSelection.forEach(val => {
        deleteUser(val.username).then(res =>{
        }).catch(err => {
          console.log('- - UserList - - handleDelete: 删除失败 ', err)
          this.$message({
            message: '删除失败' + err.message,
            type: 'error'
          })
        })
      })
      this.tableParams.page = 1
      this.fetchData(this.tableParams)
      this.loading = false
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
