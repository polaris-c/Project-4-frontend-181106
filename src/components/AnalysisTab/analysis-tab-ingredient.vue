<template>
  <div>
  <el-row :gutter="10">
    <el-col :span="18">
      <!-- 图表 -->
      <!-- <TabImg v-if="isImgTab" :detection-type="dataType"></TabImg> -->

      <TabChart v-if="dataType !== 'Summary'"
        :detection-type="dataType"
        :evi-type="eviType"
        :series-data="ingredientData.seriesData"
        :data-index = "dataIndex">
      </TabChart>
    </el-col>

    <el-col :span="6">
      <el-row>
        <el-col :span="8">
          <!-- 识别按键 -->
          <RecognitionButton 
            v-if="dataType !== 'Summary'"
            @recognition-confirm="handleRecognition">
          </RecognitionButton> 
        </el-col>
        <el-col :span="16">
          <!-- 核准按键 -->
          <CheckButton 
            v-if="dataType === 'Summary'"
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

        <!-- <el-table-column
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
        </el-table-column> -->

        <el-table-column
          label="样本名称"
          align="center"
          width=""
          fixed="left">
          <template slot-scope="scope">
            <el-button 
              type="text"
              @click="handleDetail(scope.row)">
              {{ scope.row.exploSampleName }}
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

      <!-- table内小分页 -->
      <pagination
        :currentPage="tablePageIndex"
        @change-page="handleChangePage">
      </pagination>
    </el-col>

    
  </el-row>

  <!-- tab内大分页 -->
  <el-row :gutter="10">
    <pagination-files 
      :count="ingredientData.seriesData.length"
      :page="pageIndex"
      @change-page="handleChangeFilePage">
    </pagination-files>
  </el-row>
  </div>

</template>

<script>
import TabChart from '@/components/AnalysisTab/analysis-tab-chart'
import TabImg from '@/components/AnalysisTab/analysis-tab-img'
import RecognitionButton from '@/components/Buttons/recognition-button'
import CheckButton from '@/components/Buttons/check-button'
import Pagination from '@/components/Pagination'
import PaginationFiles from '@/components/PaginationFiles'
import { startMatch, getExploMatchFTIRList, getExploMatchFTIRInfo } from '@/api/match-explosive'

const dataTypeMap = {
        FTIR: [1,'exploEviFTIRTestFile', 'exploSampleFTIRTestFile'],
        Raman: [2, 'exploEviRamanTestFile', 'exploSampleRamanTestFile'],
        XRD: [3, 'exploEviXRDTestFile', 'exploSampleXRDTestFile'],
        XRF: [4, 'exploEviXRFTestFile', 'exploSampleXRFTestFile'],
        GCMS: [5, 'exploEviGCMSTestFile', 'exploSampleGCMSTestFile'],
      }

export default {
  name: 'AnalysisTab',
  props: {
    isImgTab: {
      type: Boolean,
      default: false,
    },
    dataType: {
      type: String,
      default: 'FTIR',
    },
    eviType: {
      type: String,
      default: 'explosive',
    },
    ingredientData: {
      type: Object
    }
  },
  data() {
    return {
      matchData: {
        type: 0,
        eviFileId: 0,
        sampleFileId: 0,
      },
      tableData: [],
      currentSample: {},
      // table内小分页
      tablePageIndex: 1,
      tableParams: {
        page: 1,
        page_size: 20,
        exploEviFTIRTestFile_id: 1
      },
      // tab内大分页
      dataIndex: 0,  // 数据数组下标从0开始
      pageIndex: 1,  // 页码从1开始
    }
  },
  components: {
    TabChart,
    TabImg,
    RecognitionButton,
    CheckButton,
    Pagination,
    PaginationFiles
  },
  mounted() {
    this.initTab()
    // console.log('- - AnalysisTab - - isImgTab:', this.isImgTab)
    this.fetchList()
  },
  methods: {
    initTab() {
      let dataType = this.dataType
      if(this.dataType !== 'Summary') {
        this.matchData.type = dataTypeMap[this.dataType][0]
      }
      
      // this.matchData.eviFileId = (this.ingredientData.seriesData)[this.dataIndex].id  // 物证数据文件id
      // this.matchData.sampleFileId = dataTypeMap[this.dataType][2]
    },
    fetchList() {
      getExploMatchFTIRList(this.tableParams).then(res => {
        this.tableData = res.results
        // console.log(this.tableData)
      })
    },
    handleRecognition() {
      // console.log('- - AnalysisTab - - handleRecognition:', this.$route.params)
      let uploadForm = new FormData()
      this.matchData.eviFileId = this.ingredientData.seriesData[this.dataIndex].id  // 物证数据文件id
      uploadForm.append('type', this.matchData.type)
      uploadForm.append('eviFileId', this.matchData.eviFileId)
      startMatch(uploadForm).then(res => {
        console.log('- - AnalysisTab - - handleRecognition:', res)
        this.fetchList()
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
    },

    // tab内大分页
    handleChangeFilePage(index) {
      console.log('---- TabIngredient ---- index: ', index)
      this.dataIndex = index - 1
      this.pageIndex = index
    },
  },
}
</script>

<style scoped>

</style>
