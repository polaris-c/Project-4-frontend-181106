<template>
  <div class="dashboard-container">
    evidence-device-list
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
        width="150">
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
        },
        {
          id: '002',
          evidenceName: 'A002',
          caseName: 'A2',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          Color: 'AC',
          Material: 'AM',
          Shape: 'AS',
          thickness: 'AF',
          user: 'user002',
          inputDate: '2018-11-19',
          note: '1112'
        },
        {
          id: '003',
          evidenceName: 'A003',
          caseName: 'A3',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          Color: 'AC',
          Material: 'AM',
          Shape: 'AS',
          thickness: 'AF',
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
      this.$router.push('/evidenceManagement/deviceEvidence/deviceIndexList/deviceDetail/' + row.id)
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
