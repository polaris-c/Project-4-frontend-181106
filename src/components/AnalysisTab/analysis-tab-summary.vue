<template>
  <div>
  <el-row :gutter="10">
    <el-col :span="18">
      <!-- 图表 -->
      <div class="img-container">
        <el-row v-if="FTIRdata.id">
          <el-col>
            匹配得分：{{ FTIRdata.Score }}
            <TabChart
              detection-type="FTIR"
              evi-type="explosive"
              :series-data = "FTIRdata.exploEviFTIRTestFile"
              :sample-data = "FTIRdata.exploSampleFTIRTestFile"
              distance-data = 2>
            </TabChart>
            <hr>
          </el-col>
        </el-row>

        <el-row v-if="Ramandata.id">
          <el-col>
            匹配得分：{{ Ramandata.Score }}
            <TabChart
              detection-type="Raman"
              evi-type="explosive"
              :series-data = "Ramandata.exploEviRamanTestFile"
              :sample-data = "Ramandata.exploSampleRamanTestFile"
              distance-data = 0.2>
            </TabChart>
            <hr>
          </el-col>
        </el-row>

        <el-row v-if="XRFdata.id">
          <el-col>
            匹配得分：{{ XRFdata.averScore }}
            <TabColumn
              evi-type="explosive"
              :series-data = "XRFdata.exploEviXRFTestFile"
              :sample-data = "XRFdata.exploSampleXRFTestFile">
            </TabColumn>
            <hr>
          </el-col>
        </el-row>

        <el-row v-if="XRDdata.id">
          <el-col>
            匹配得分：{{ XRDdata.Score }}
            <TabChart
              detection-type="XRD"
              evi-type="explosive"
              :series-data = "XRDdata.exploEviXRDTestFile"
              :sample-data = "XRDdata.exploSampleXRDTestFile"
              distance-data = 200>
            </TabChart>
            <hr>
          </el-col>
        </el-row>

        <!-- <el-row>
          <el-col>
            <span>-- GCMS --</span>
          </el-col>
        </el-row> -->
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
        v-loading="loading"
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

      <!-- table内结果排名列表小分页 -->
      <pagination
        list-type="match"
        v-bind="tableParams"
        @change-size="handleChangeSize"
        @change-page="handleChangePage">
      </pagination>
    </el-col>

  </el-row>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import RecognitionButton from '@/components/Buttons/recognition-button'
import CheckButton from '@/components/Buttons/check-button'
import Pagination from '@/components/Pagination'
import PaginationFiles from '@/components/PaginationFiles'
import TabChart from '@/components/ResultTab/result-tab-chart'
import TabColumn from '@/components/ResultTab/result-tab-column'
import { getExploSynMatchList,
          getExploSynMatchInfo,
          updateExploSynMatch } from '@/api/match-explosive'
import { getExploSampleFTIRTestFilesInfo,
          getExploSampleRamanTestFilesInfo,
          getExploSampleXRDTestFilesInfo,
          getExploSampleXRFTestFilesInfo,
          getExploSampleGCMSTestFilesInfo } from '@/api/sample-explosive'
import { getDevCompMatchsList,
          updateDevCompMatchs} from '@/api/match-device'
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
      loading: false,
      tableData: [],
      currentSample: {
        id: null,
        sname: null
      },
      FTIRdata: {
        Score: null,
        exploEviFTIRTestFile: {},
        exploSampleFTIRTestFile: {},
      },
      Ramandata: {
        Score: null,
        exploEviRamanTestFile: {},
        exploSampleRamanTestFile: {},
      },
      XRFdata: {
        Score: null,
        exploEviXRFTestFile: {},
        exploSampleXRFTestFile: {},
      },
      XRDdata: {
        Score: null,
        exploEviXRDTestFile: {},
        exploSampleXRDTestFile: {},
      },
      // table内小分页
      tablePageIndex: 1,
      tableParams: {
        page: 1,
        page_size: 10,
        count: 1,
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
      console.log('- - AnalysisTabSummary - - watch expertOpinion:', this.checkData.expertOpinion)
    }
  },
  components: {
    TabChart,
    TabColumn,
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
      this.loading = true
      getExploSynMatchList(this.tableParams).then(res => {
        this.tableData = res.results
        this.tableParams.count = res.count
        console.log('- - AnalysisTabSummary - - fetchList: ', this.tableParams.count)
        this.loading = false
      })
    },
    initData() {
      this.FTIRdata = {
        Score: null,
        exploEviFTIRTestFile: {},
        exploSampleFTIRTestFile: {},
      }
      this.Ramandata = {
        Score: null,
        exploEviRamanTestFile: {},
        exploSampleRamanTestFile: {},
      }
      this.XRFdata = {
        Score: null,
        exploEviXRFTestFile: {},
        exploSampleXRFTestFile: {},
      }
      this.XRDdata = {
        Score: null,
        exploEviXRDTestFile: {},
        exploSampleXRDTestFile: {},
      }
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
      // console.log('- - AnalysisTabSummary - - handleDetail:', row)
      this.handleCurrentChange(row)
      // getExploSynMatchInfo().then()
      this.initData()
      if(this.currentSample.exploEviFTIR) {
        this.FTIRdata = this.currentSample.exploEviFTIR
      }
      if(this.currentSample.exploEviRaman) {
        this.Ramandata = this.currentSample.exploEviRaman
      }
      if(this.currentSample.exploEviXRF) {
        this.XRFdata = this.currentSample.exploEviXRF
      }
      if(this.currentSample.exploEviXRD) {
        this.XRDdata = this.currentSample.exploEviXRD
      }
    },
    handleCurrentChange(row) {
      this.currentSample = row
      console.log('- - AnalysisTabSummary - - handleCurrentChange:', this.currentSample.id)
      this.$emit('change-sample', row.expertOpinion)
    },

    /** tab内结果排名列表翻页 */
    handleChangeSize(pageSize) {
      this.tableParams.page_size = pageSize
      this.tableParams.page = 1
      this.fetchList()
    },
    handleChangePage(pageIndex) {
      // console.log('- - AnalysisTabSummary - - pageIndex: ', pageIndex)
      this.tableParams.page = pageIndex
      this.fetchList()
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
