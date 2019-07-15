<template>
  <el-row :gutter="10">
    <el-col :span="18">
      <!-- 图表 -->
      <TabImg v-if="isImgTab" :detectionType="detectionType"></TabImg>
      <TabChart v-else :detectionType="detectionType"></TabChart>
    </el-col>

    <el-col :span="6">
      <el-row>
        <el-col :span="8">
          <!-- 识别按键 -->
          <RecognitionButton @recognition-confirm="handleRecognition"></RecognitionButton> 
        </el-col>
        <el-col :span="16">
          <!-- 核准按键 -->
          <CheckButton 
            v-if="detectionType === 'Summary'"
            @check-confirm="handleCheck">
          </CheckButton>
        </el-col>
      </el-row>
      
      <!-- 结果排名列表 -->
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
          label="样本名称"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button 
              type="text"
              @click="handleDetail(scope.row)">
              {{ scope.row.sName }}
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

      <pagination
        :currentPage="tablePageIndex"
        @change-page="handleChangePage">
      </pagination>


    </el-col>
  </el-row>
</template>

<script>
import TabChart from '@/components/AnalysisTab/analysis-tab-chart'
import TabImg from '@/components/AnalysisTab/analysis-tab-img'
import RecognitionButton from '@/components/Buttons/recognition-button'
import CheckButton from '@/components/Buttons/check-button'
import Pagination from '@/components/Pagination'
import { startMatch } from '@/api/match-explosive'

export default {
  name: 'AnalysisTab',
  props: {
    isImgTab: {
      type: Boolean,
      default: false,
    },
    detectionType: {
      type: String,
      default: 'Unknown',
    },
    analysisType: {
      type: String,
      default: 'explosive',
    }
  },
  data() {
    return {
      matchData: {
        type: 0,
        eviFileId: 0
      },
      tableData: [
        {
          id: '001',
          sName: 'A001',
          Score: '90',
        },
        {
          id: '002',
          sName: 'A002',
          Score: '80',
        },
        {
          id: '003',
          sName: 'A003',
          Score: '70',
        },
        {
          id: '004',
          sName: 'A004',
          Score: '60',
        },
        {
          id: '005',
          sName: 'A005',
          Score: '50',
        },
        {
          id: '006',
          sName: 'A006',
          Score: '40',
        },
        {
          id: '007',
          sName: 'A007',
          Score: '30',
        },
        {
          id: '008',
          sName: 'A008',
          Score: '20',
        },
        {
          id: '009',
          sName: 'A009',
          Score: '10',
        },
        {
          id: '0010',
          sName: 'A0010',
          Score: '0',
        },
      ],
      currentSample: {},
      tablePageIndex: 1
    }
  },
  components: {
    TabChart,
    TabImg,
    RecognitionButton,
    CheckButton,
    Pagination,
  },
  mounted() {
    // console.log('- - AnalysisTab - - detectionType:', this.detectionType)
    console.log('- - AnalysisTab - - isImgTab:', this.isImgTab)
  },
  methods: {
    handleRecognition() {
      console.log('- - AnalysisTab - - handleRecognition:', this.$route.params)
      let uploadForm = new FormData()
      this.matchData.type = 1
      this.matchData.eviFileId = 10
      uploadForm.append('type', this.matchData.type)
      uploadForm.append('eviFileId', this.matchData.eviFileId)
      startMatch(uploadForm).then(res => {
        console.log('- - AnalysisTab - - handleRecognition:', res)
      })

    },
    handleCheck() {
      console.log('- - AnalysisTab - - handleCheck:', this.currentSample.id)
    },
    handleDetail(row) {
      if (this.isImgTab) {
        this.$router.push('/analysis/deviceAnalysis/deviceAppearanceCompare')
      }
      else {
        console.log('- - AnalysisTab - - handleDetail:', row.sName)
        this.currentSample = row
      }
    },
    handleCurrentChange(currentRow) {
      console.log('- - AnalysisTab - - handleCurrentChange:', currentRow.sName)
      // this.currentSample = currentRow
    },
    handleChangePage(pageIndex) {
      console.log('- - AnalysisTab - - pageIndex: ', pageIndex)
      this.tablePageIndex = pageIndex
    }
  },
}
</script>

<style scoped>

</style>
