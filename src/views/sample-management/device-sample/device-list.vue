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
      :currentPage="tablePageIndex"
      @change-page="handleChangePage">
    </pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DeleteButton from '@/components/Buttons/delete-button'
import SearchInput from '@/components/SearchInput'
import Pagination from '@/components/Pagination'

export default {
  name: 'DeviceList',
  data() {
    return {
      multipleSelection: [],
      tableData: [
        {
          id: '001',
          sname: 'A001',
          Type: 'A1',
          Origin: 'AO',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          function: 'AF',
          user: 'user001',
          inputDate: '2018-11-19',
          note: '1111'
        },
        {
          id: '002',
          sname: 'A002',
          Type: 'A2',
          Origin: 'AO',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          function: 'AF',
          user: 'user002',
          inputDate: '2018-11-19',
          note: '1112'
        },
        {
          id: '003',
          sname: 'A003',
          Type: 'A3',
          Origin: 'AO',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          function: 'AF',
          user: 'user003',
          inputDate: '2018-11-19',
          note: '1113'
        },
      ],
      tablePageIndex: 1
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
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('- - - - multipleSeletion:', this.multipleSelection)
    },
    handleDetail(row) {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetail/' + row.id)
    },

    /** 页面按键功能 */
    handleDelete() {
      console.log('- - delete: ', this.multipleSelection)
    },
    handleSearch(searchInputData) {
      console.log('- - search: ', searchInputData)
    },
    handleChangePage(pageIndex) {
      console.log('- - ExplosiveList - - pageIndex: ', pageIndex)
      this.tablePageIndex = pageIndex
    }
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
