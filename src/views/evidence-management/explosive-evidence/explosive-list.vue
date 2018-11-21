<template>
  <div class="dashboard-container">
    evidence-explosive-list
    <div>name:{{ name }}</div>
    
    <el-table
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
        label="物证序号"
        align="center"
        width="150"
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
        prop="evidenceName"
        label="物证名称"
        align="center"
        width="200">
      </el-table-column>

      <el-table-column
        prop="caseName"
        label="案件名称"
        align="center"
        width="160">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DeviceList',
  data() {
    return {
      multipleSelection: [],
      tableData: [
        {
          id: '001',
          evidenceName: 'A001',
          caseName: 'A1-case',
          user: 'user001',
          inputDate: '2018-11-19',
          note: '1111'
        },
        {
          id: '002',
          evidenceName: 'A002',
          caseName: 'A2-case',
          user: 'user002',
          inputDate: '2018-11-19',
          note: '1112'
        },
        {
          id: '003',
          evidenceName: 'A003',
          caseName: 'A3-case',
          user: 'user003',
          inputDate: '2018-11-19',
          note: '1113'
        },
      ]
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
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('- - - - multipleSeletion:', this.multipleSelection)
    },
    detail(row) {
      console.log('- - - - list-detail row:', row.id, row.sname)
      this.$router.push({path: '/evidenceManagement/explosiveEvidence/explosiveIndexList/explosiveDetail/' + row.id})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
