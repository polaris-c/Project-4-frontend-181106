<template>
  <div class="app-main-container">
    
    <el-row>
      <el-col :span="22">
        <search-input @emit-search="handleSearch"></search-input>
      </el-col>
    </el-row>

    <el-table
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
        label="物证序号"
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
        prop="evidenceName"
        label="物证名称"
        align="center"
        width="150">
        <template slot-scope="scope">
          <el-button 
            type="text"
            @click="handleDetail(scope.row)">
            {{ scope.row.evidenceName }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="caseName"
        label="案件名称"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="Factory"
        label="物证厂家"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="Model"
        label="物证型号"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="Logo"
        label="物证商标"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="Color"
        label="物证颜色"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="Material"
        label="物证材质"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="Shape"
        label="物证形状"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="thickness"
        label="物证厚度"
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
import { getDevEviList } from '@/api/evidence-device'
import { getDevSynMatchsList } from '@/api/match-device'

export default {
  name: 'DeviceList',
  data() {
    return {
      loading: false,
      multipleSelection: [],
      resultID: [],
      tableData: [
        {
          id: '001',
          evidenceName: 'A001',
          caseName: 'A1',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          Color: 'AF',
          Material: 'AF',
          Shape: 'AF',
          thickness: 'AF',
          user: 'user001',
          inputDate: '2018-11-19',
          note: '1111'
        }
      ],
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
      'roles'
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
      getDevSynMatchsList(tableParams).then(res => {
        this.resultID = res.results.map(el => {
          return el.devEvi
        })
      }).then(() => {
        console.log('- - DeviceList - - resultID:', this.resultID)
      })
      
      getDevEviList(tableParams).then(res => {
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
      console.log('- - DeviceList - - multipleSeletion:', this.multipleSelection)
    },
    handleDetail(row) {
      this.$router.push('/result/deviceResult/deviceDetail/' + row.id)
    },

    /** 页面按键功能 */
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
