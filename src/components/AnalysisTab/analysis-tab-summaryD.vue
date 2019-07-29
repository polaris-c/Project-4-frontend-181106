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
              evi-type="device"
              :series-data = "FTIRdata.devEviFTIRTestFile"
              :sample-data = "FTIRdata.devPartSampleFTIRTestFile"
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
              evi-type="device"
              :series-data = "Ramandata.devEviRamanTestFile"
              :sample-data = "Ramandata.devPartSampleRamanTestFile"
              distance-data = 0.2>
            </TabChart>
            <hr>
          </el-col>
        </el-row>

        <el-row v-if="XRFdata.id">
          <el-col>
            匹配得分：{{ XRFdata.averScore }}
            <TabColumn
              evi-type="device"
              :series-data = "XRFdata.devEviXRFTestFile"
              :sample-data = "XRFdata.devPartSampleXRFTestFile">
            </TabColumn>
            <hr>
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
        v-loading="loading"
        class="app-main-table"
        ref="deviceList"
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
              {{ eviType == "explosive" ? scope.row.exploSample.sname : scope.row.devSample.sname }}
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

  <!-- tab内大分页 -->
  <!-- <el-row>
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
  </el-row> -->
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
          
import { getDevCompMatchsList,
          updateDevCompMatchs} from '@/api/match-device'
import { getDevPartSampleFTIRTestFilesInfo,
          getDevPartSampleRamanTestFilesInfo,
          getDevPartSampleXRFTestFilesInfo} from '@/api/sample-device'

const explosiveMap = {}
const deviceMap = {}
let dataTypeMap = {}

export default {
  name: 'AnalysisTabSummaryD',
  props: {
    dataType: {
      type: String,
      default: 'FTIR',
    },
    eviType: {
      type: String,
      default: 'explosive',
    },
    expertCompOpinion: {
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
        devEviFTIRTestFile: {},
        devSampleFTIRTestFile: {},
      },
      Ramandata: {
        Score: null,
        devEviRamanTestFile: {},
        devSampleRamanTestFile: {},
      },
      XRFdata: {
        Score: null,
        devEviXRFTestFile: {},
        devSampleXRFTestFile: {},
      },
      XRDdata: {
        Score: null,
        devEviXRDTestFile: {},
        devSampleXRDTestFile: {},
      },
      // table内小分页
      tablePageIndex: 1,
      tableParams: {
        page: 1,
        page_size: 20,
        count: 1,
        // devEviFTIRTestFile_id: 1  // 物证数据文件id
        devEvi_id: null
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
    expertCompOpinion(val, oldVal) {
      if(!val && !oldVal) return
      if(this.role == 3) return
      this.checkData.expertCompOpinion = val
      console.log('- - AnalysisTabSummaryD - - watch expertCompOpinion:', this.checkData.expertCompOpinion)
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
    this.tableParams.devEvi_id = this.$route.params.id
    this.fetchList()
  },
  methods: {
    /** 获取匹配列表 */
    fetchList() {
      this.loading = true
      getDevCompMatchsList(this.tableParams).then(res => {
        this.tableData = res.results
        this.tableParams.count = res.count
        this.loading = false
        // console.log('- - AnalysisTabSummaryD - - fetchList: ', this.tableData)
      })
    },
    initData() {
      this.FTIRdata = {
        Score: null,
        devEviFTIRTestFile: {},
        devSampleFTIRTestFile: {},
      }
      this.Ramandata = {
        Score: null,
        devEviRamanTestFile: {},
        devSampleRamanTestFile: {},
      }
      this.XRFdata = {
        Score: null,
        devEviXRFTestFile: {},
        devSampleXRFTestFile: {},
      }
      this.XRDdata = {
        Score: null,
        devEviXRDTestFile: {},
        devSampleXRDTestFile: {},
      }
    },
    /** 核准 */
    handleCheck() {
      console.log('- - AnalysisTabSummaryD - - handleCheck:', this.currentSample.devSample.sname)
      if(!this.checkData.expertCompOpinion) {
        this.checkData.expertCompOpinion = "已核准（默认说明）"
      }
      console.log('- - AnalysisTabSummaryD - - handleCheck:', this.checkData.expertCompOpinion)
      updateDevCompMatchs(this.currentSample.id, this.checkData).then(res => {
        console.log('- - AnalysisTabSummaryD - - handleCheck:', res)
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
      console.log('- - AnalysisTabSummaryD - - handleDetail:', row)
      this.handleCurrentChange(row)
      this.initData()
      if(this.currentSample.devEviFTIR) {
        this.FTIRdata = this.currentSample.devEviFTIR
      }
      if(this.currentSample.devEviRaman) {
        this.Ramandata = this.currentSample.devEviRaman
      }
      if(this.currentSample.devEviXRF) {
        this.XRFdata = this.currentSample.devEviXRF
      }
      if(this.currentSample.devEviXRD) {
        this.XRDdata = this.currentSample.devEviXRD
      }
    },
    handleCurrentChange(row) {
      this.currentSample = row
      console.log('- - AnalysisTabSummaryD - - handleCurrentChange:', this.currentSample.id)
      this.$emit('change-sample', row.expertCompOpinion)
    },

    /** tab内结果排名列表翻页 */
    handleChangeSize(pageSize) {
      this.tableParams.page_size = pageSize
      this.tableParams.page = 1
      this.fetchList()
    },
    handleChangePage(pageIndex) {
      // console.log('- - AnalysisTabSummaryD - - pageIndex: ', pageIndex)
      this.tableParams.page = pageIndex
      this.fetchList()
    },

    // tab内大分页
    // handleChangeFilePage(index) {
    //   console.log('- - AnalysisTabSummaryD - - index: ', index)
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
