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
      ref="explosiveList"
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
        label="样本序号"
        align="center"
        width="120"
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
        label="样本名称"
        align="center"
        width="200">
        <template slot-scope="scope">
          <el-button 
            type="text"
            @click="handleDetail(scope.row)">
            {{ scope.row.sname }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="snameAbbr"
        label="名称缩写"
        align="center"
        width="160">
      </el-table-column>

      <el-table-column
        prop="sampleOrigin"
        label="样本产地"
        align="center"
        width="180">
      </el-table-column>

      <el-table-column
        prop="factory"
        label="样本厂家"
        align="center"
        width="180">
      </el-table-column>

      <el-table-column
        prop="user"
        label="处理人员"
        align="center"
        width="160">
      </el-table-column>

      <el-table-column
        label="录入日期"
        align="center"
        width=""
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
import { getExplosiveSampleList, deleteExplosiveSample } from '@/api/sample-management'

export default {
  name: 'ExplosiveList',
  data() {
    return {
      loading: false,
      multipleSelection: [],
      tableData: [],
      tablePageIndex: 1,
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
    this.loading = true
    this.fetchData(this.tableParams)
  },
  methods: {
    fetchData(tableParams){
      this.loading = true
      getExplosiveSampleList(tableParams).then(res => {
        this.tableData = res.results
        this.tableParams.count =  res.count
        this.loading = false
      }).catch(err => {
        this.$message({
          message: '获取列表错误' + err.message,
          type: 'error'
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('- - ExplosiveList - - multipleSeletion:', this.multipleSelection)
    },
    handleDetail(row) {
      console.log('- - list-detail row:', row.id, row.sname)
      this.$router.push({path: '/sampleManagement/explosiveSample/explosiveIndexList/explosiveDetail/' + row.id})
    },

    /** 页面按键功能 */
    handleDelete() {
      this.loading = true
      this.multipleSelection.forEach(val => {
        deleteExplosiveSample(val.username).then(res =>{
        }).catch(err => {
          console.log('- - ExplosiveList - - handleDelete: 删除失败 ', err)
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
      console.log('- - ExplosiveList - - search: ', searchInputData)
      this.tableParams.search = searchInputData
      this.tableParams.page = 1
      this.fetchData(this.tableParams)
    },
    handleChangePage(pageIndex) {
      console.log('- - ExplosiveList - - pageIndex: ', pageIndex)
      this.tableParams.page = pageIndex
      this.fetchData(this.tableParams)
    },
    handleChangeSize(pageSize) {
      console.log('- - ExplosiveList - - pageSize: ', pageSize)
      this.tableParams.page_size = pageSize
      this.tableParams.page = 1
      this.fetchData(this.tableParams)
    },
    // handleDelete() {
    //   console.log('- - delete: ', this.multipleSelection)
    // },
    // handleSearch(searchInputData) {
    //   console.log('- - search: ', searchInputData)
    // },
    // handleChangePage(pageIndex) {
    //   console.log('- - ExplosiveList - - pageIndex: ', pageIndex)
    //   this.tablePageIndex = pageIndex
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  &-container {
    padding: 15px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-table {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
