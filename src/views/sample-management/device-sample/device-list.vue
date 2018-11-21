<template>
  <div class="dashboard-container">
    sample-device-list
    <div>name:{{ name }}</div>

    <el-table
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
            @click="detail((scope.row))">
            {{ scope.row.id }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="sname"
        label="组件样本名称"
        align="center"
        width="150">
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
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetail/' + row.id)
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
