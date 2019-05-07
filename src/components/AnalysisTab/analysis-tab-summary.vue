<template>
  <div>
  <el-row :gutter="10">
    <el-col :span="18">
      <!-- 图表 -->
      <div class="img-container">
        <el-row>
          <el-col>
            <span>-- FTIR --</span>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col>
            <span>-- Raman --</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <span>-- XRF --</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <span>-- XRD --</span>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <span>-- GCMS --</span>
          </el-col>
        </el-row>
      </div>
    </el-col>

    <el-col :span="6">
      <el-row>
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
        fit
        stripe
        border
        highlight-current-row>
        <!--  @current-change="handleCurrentChange"> -->

        <el-table-column
          label="样本名称"
          align="center"
          width=""
          fixed="left">
          <template slot-scope="scope">
            <el-button 
              type="text"
              @click="handleDetail(scope.row)">
              {{ eviType == "explosive" ? scope.row.exploSample.sname : scope.row.devSampleName }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="Score"
          label="相似分"
          align="center"
          width="100">
          <template slot-scope="scope">
          <el-tag :type="(scope.row.isCheck == 2 || scope.row.isExpertCheck == 2) ? 'success' : 'info'">
            {{scope.row.Score}}
          </el-tag>
          </template>

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
  <el-row>
    <el-col :span="4" :offset="0">
      <el-input
        v-model="inputDistanceData"
        placeholder="样本-物证距离">
        <el-button
          slot="append"
          size="mini"
          @click="handleDistance">
          分 离
        </el-button>
      </el-input>

    </el-col>
  </el-row>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import TabChart from '@/components/AnalysisTab/analysis-tab-chart'
import RecognitionButton from '@/components/Buttons/recognition-button'
import CheckButton from '@/components/Buttons/check-button'
import Pagination from '@/components/Pagination'
import PaginationFiles from '@/components/PaginationFiles'
import { startMatch,
          getExploSynMatchList,
          getExploSynMatchInfo,
          updateExploSynMatch } from '@/api/match-explosive'
import { getExploSampleFTIRTestFilesInfo,
          getExploSampleRamanTestFilesInfo,
          getExploSampleXRDTestFilesInfo,
          getExploSampleXRFTestFilesInfo,
          getExploSampleGCMSTestFilesInfo } from '@/api/sample-explosive'
import { getDevMatchFTIRList,
          getDevMatchRamanList,
          getDevMatchXRFList} from '@/api/match-device'
import { getDevPartSampleFTIRTestFilesInfo,
          getDevPartSampleRamanTestFilesInfo,
          getDevPartSampleXRFTestFilesInfo} from '@/api/sample-device'

const explosiveMap = {}
const deviceMap = {}
let dataTypeMap = {}

export default {
  name: 'AnalysisTabSummary',
  props: {
    dataType: {
      type: String,
      default: 'FTIR',
    },
    eviType: {
      type: String,
      default: 'explosive',
    },
    expertOpinion: {
      type: String,
      default: ' ',
    }
  },
  data() {
    return {
      tableData: [],
      currentSample: {
        id: null,
        sname: null
      },
      // table内小分页
      tablePageIndex: 1,
      tableParams: {
        page: 1,
        page_size: 20,
        // exploEviFTIRTestFile_id: 1  // 物证数据文件id
        exploEvi_id: null
      },
      checkData: {
        Check: true,
      },
      // tab内大分页
      dataIndex: 0,  // 数据数组下标从0开始
      pageIndex: 1,  // 页码从1开始
      inputDistanceData: null,
      distanceData: null,
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'role',
    ])
  },
  watch: {
    expertOpinion(val, oldVal) {
      if(!val && !oldVal) return
      if(this.role == 3) return
      this.checkData.expertOpinion = val
      console.log('- - AnalysisTabSummary - - watch:', this.checkData.expertOpinion)
    }
  },
  components: {
    TabChart,
    RecognitionButton,
    CheckButton,
    Pagination,
    PaginationFiles
  },
  mounted() {
    if(this.eviType == 'explosive') {
      dataTypeMap = explosiveMap
    } else {
      dataTypeMap = deviceMap
    }
    this.tableParams.exploEvi_id = this.$route.params.id
    this.fetchList()
  },
  methods: {
    /** 获取匹配列表 */
    fetchList() {
      getExploSynMatchList(this.tableParams).then(res => {
        this.tableData = res.results
        console.log('- - AnalysisTabSummary - - fetchList: ', this.tableData)
      })
    },
    /** 核准 */
    handleCheck() {
      console.log('- - AnalysisTabSummary - - handleCheck:', this.currentSample.exploSample.sname)
      if(this.checkData.hasOwnProperty('expertOpinion') && !this.checkData.expertOpinion) {
        this.checkData.expertOpinion = "已核准（默认说明）"
      }
      console.log('- - AnalysisTabSummary - - handleCheck:', this.checkData.expertOpinion)
      updateExploSynMatch(this.currentSample.id, this.checkData).then(res => {
        console.log('- - AnalysisTabSummary - - handleCheck:', res)
        this.fetchList()
        this.$message({
          message: '核准完成 ',
          type: 'success',
          duration: 6 * 1000
        })
      }).catch(err => {
        this.$message({
          message: '核准错误 ' + err.message,
          type: 'error',
          duration: 6 * 1000
        })
      })
    },
    /** 选定样本 */
    handleDetail(row) {
      this.currentSample = row
      console.log('- - AnalysisTabSummary - - handleDetail:', row.Score)
      this.handleCurrentChange(row)
    },
    handleCurrentChange(row) {
      this.currentSample = row
      console.log('- - AnalysisTabSummary - - handleCurrentChange:', this.currentSample.id)
      this.$emit('change-sample', row.expertOpinion)
    },

    handleChangePage(pageIndex) {
      console.log('- - AnalysisTabSummary - - pageIndex: ', pageIndex)
      this.tablePageIndex = pageIndex
    },

    // tab内大分页
    // handleChangeFilePage(index) {
    //   console.log('- - AnalysisTabSummary - - index: ', index)
    //   this.dataIndex = index - 1
    //   this.pageIndex = index
    // },
    //
    handleDistance() {
      this.distanceData = this.inputDistanceData
    }
  }
}
</script>

<style scoped>
.img-container {
  width: 100%;
  height: 500px;
  background-color: whitesmoke;
}
</style>
