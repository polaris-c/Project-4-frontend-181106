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
      ref="deviceList"
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
        label="组件样本序号"
        align="center"
        width="150"
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
        prop="sname"
        label="组件样本名称"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-button 
            type="text"
            @click="handleDetail(scope.row)">
            {{ scope.row.sname }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="Type"
        label="组件类型"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="Origin"
        label="组件产地"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="Factory"
        label="组件厂家"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="Model"
        label="组件型号"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="Logo"
        label="组件商标"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="function"
        label="组件功能"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="user"
        label="处理人员"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        label="录入日期"
        align="center"
        width="150"
        fixed="right">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.inputDate }}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination 
      v-bind="tableParams"
      @change-size="handleChangeSize"
      @change-page="handleChangePage">
    </pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DeleteButton from '@/components/Buttons/delete-button'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'
import { getDevSampleList, deleteDevSample } from '@/api/sample-device'

export default {
  name: 'DeviceList',
  data() {
    return {
      loading: false,
      multipleSelection: [],
      tableData: [],
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
      getDevSampleList(tableParams).then(res => {
        this.tableData = res.results
        this.tableParams.count =  res.count
        this.loading = false
      }).catch(err => {
        this.$message({
          message: '获取列表错误' + err.message,
          type: 'error'
        })
        this.loading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('- - - - multipleSeletion:', this.multipleSelection)
    },
    handleDetail(row) {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetail/' + row.id)
    },

    /** 页面按键功能 */
    handleDelete() {
      this.loading = true
      this.multipleSelection.forEach(val => {
        deleteDevSample(val.id).then(res =>{
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.tableParams.page = 1
          this.fetchData(this.tableParams)
          this.loading = false
        }).catch(err => {
          console.log('- - DeviceList - - handleDelete: 删除失败 ', err)
          this.$message({
            message: '删除失败' + err.message,
            type: 'error'
          })
          this.loading = false
        })
      })
    },
    handleSearch(searchInputData) {
      console.log('- - DeviceList - - search: ', searchInputData)
      this.tableParams.search = searchInputData
      this.tableParams.page = 1
      this.fetchData(this.tableParams)
    },
    handleChangePage(pageIndex) {
      console.log('- - DeviceList - - pageIndex: ', pageIndex)
      this.tableParams.page = pageIndex
      this.fetchData(this.tableParams)
    },
    handleChangeSize(pageSize) {
      console.log('- - DeviceList - - pageSize: ', pageSize)
      this.tableParams.page_size = pageSize
      this.tableParams.page = 1
      this.fetchData(this.tableParams)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
