<template>
  <div class="dashboard-container">
    <div>sample-explosive-list</div>
    name:{{ name }}

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
        label="样本序号"
        align="center"
        width="150"
        fixed="left">
        <template slot-scope="scope">
          <el-button 
            type="text"
            @click="detail((scope.row))">
            {{ scope.row.id }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="sname"
        label="样本名称"
        align="center"
        width="200">
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
        width="160">
      </el-table-column>

      <el-table-column
        prop="factory"
        label="样本厂家"
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
  name: 'ExplosiveList',
  data() {
    return {
      multipleSelection: [],
      tableData: [
        {
          id: '001',
          sname: 'A001',
          snameAbbr: 'A1',
          sampleOrigin: 'AP',
          factory: 'AF',
          user: 'user001',
          inputDate: '2018-11-19',
          note: '1111'
        },
        {
          id: '002',
          sname: 'A002',
          snameAbbr: 'A2',
          sampleOrigin: 'AP',
          factory: 'AF',
          user: 'user002',
          inputDate: '2018-11-19',
          note: '2222'
        },
        {
          id: '003',
          sname: 'A003',
          snameAbbr: 'A3',
          sampleOrigin: 'AP',
          factory: 'AF',
          user: 'user003',
          inputDate: '2018-11-19',
          note: '3333'
        },
        {
          id: '004',
          sname: 'A004',
          snameAbbr: 'A4',
          sampleOrigin: 'AP',
          factory: 'AF',
          user: 'user004',
          inputDate: '2018-11-19',
          note: '4444'
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
      this.$router.push({path: '/sampleManagement/explosiveSample/explosiveIndexList/explosiveDetail/' + row.id})
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
