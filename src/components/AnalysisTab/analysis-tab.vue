<template>
    <el-row :gutter="10">
      <el-col :span="18">
        <TabChart :detectionType="detectionType"></TabChart>
      </el-col>

      <el-col :span="6">
        <el-table
          class="app-main-table"
          ref="explosiveList"
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark"
          @current-change="handleCurrentChange"
          fit
          stripe
          border
          highlight-current-row>

          <el-table-column
            label="编号"
            align="center"
            width=""
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
            label="物证名称"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button 
                type="text"
                @click="handleDetail(scope.row)">
                {{ scope.row.evidenceName }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            prop="Score"
            label="相似分"
            align="center"
            width="">
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
</template>

<script>
import TabChart from '@/components/AnalysisTab/analysis-tab-chart'

export default {
  name: 'AnalysisTab',
  props: {
    detectionType: {
      type: String,
      default: 'Unknown',
    },
  },
  data() {
    return {
      tableData: [
        {
          id: '001',
          evidenceName: 'A001',
          Score: '90',
        },
        {
          id: '002',
          evidenceName: 'A002',
          Score: '80',
        },
        {
          id: '003',
          evidenceName: 'A003',
          Score: '70',
        },
        {
          id: '004',
          evidenceName: 'A004',
          Score: '60',
        },
        {
          id: '005',
          evidenceName: 'A005',
          Score: '50',
        },
        {
          id: '006',
          evidenceName: 'A006',
          Score: '40',
        },
        {
          id: '007',
          evidenceName: 'A007',
          Score: '30',
        },
        {
          id: '008',
          evidenceName: 'A008',
          Score: '20',
        },
        {
          id: '009',
          evidenceName: 'A009',
          Score: '10',
        },
      ],
      tablePageIndex: 1
    }
  },
  components: {
    TabChart,
  },
  mounted() {
    console.log('- - AnalysisExplosiveDetail - - detectionType:', this.detectionType)
  },
  methods: {
    handleDetail(row) {
      console.log('- - AnalysisExplosiveDetail - - handleDetail row:', row.evidenceName)
    },
    handleCurrentChange(currentRow) {
      console.log('- - AnalysisExplosiveDetail - - handleCurrentChange currentRow:', currentRow.evidenceName)
    }
  },
}
</script>

<style scoped>

</style>
