<template>
  <div>
  <el-row :gutter="10">
    <el-col :span="18">
      <!-- 图表 -->

      <TabChart v-if="dataType !== 'Summary' && dataType !== 'XRF'"
        :detection-type="dataType"
        :evi-type="eviType"
        :series-data="ingredientData.seriesData"
        :data-index = "dataIndex"
        :sample-data = "currentSample"
        :distance-data = "distanceData">
      </TabChart>

      <TabColumn v-if="dataType === 'XRF'"
        :evi-type="eviType"
        :series-data="ingredientData.seriesData"
        :data-index = "dataIndex"
        :sample-data = "currentSample">
      </TabColumn>

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
        fit
        stripe
        border
        highlight-current-row>
        <!--  @current-change="handleCurrentChange" -->
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
              {{ eviType == "explosive" ? scope.row.exploSampleName : scope.row.devSampleName }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="Score"
          label="相似分"
          align="center"
          width="100">
          <template slot-scope="scope">
            {{ dataType == "XRF" ? scope.row.averScore : scope.row.Score }}
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
  <el-row :gutter="10">
    <el-col :span="8">
      <pagination-files 
        :count="ingredientData.seriesData.length"
        :page="pageIndex"
        @change-page="handleChangeFilePage">
      </pagination-files>
    </el-col>
    <el-col :span="4" :offset="6">
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
import TabChart from '@/components/AnalysisTab/analysis-tab-chart'
import TabColumn from '@/components/AnalysisTab/analysis-tab-column'
import RecognitionButton from '@/components/Buttons/recognition-button'
import CheckButton from '@/components/Buttons/check-button'
import Pagination from '@/components/Pagination'
import PaginationFiles from '@/components/PaginationFiles'
import { startMatch, 
          getExploMatchFTIRList,
          getExploMatchRamanList,
          getExploMatchXRDList,
          getExploMatchXRFList,
          getExploMatchGCMSList} from '@/api/match-explosive'
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

const explosiveMap = {
        FTIR: [1,'exploEviFTIRTestFile', 'exploSampleFTIRTestFile', getExploMatchFTIRList, getExploSampleFTIRTestFilesInfo],
        Raman: [2, 'exploEviRamanTestFile', 'exploSampleRamanTestFile', getExploMatchRamanList, getExploSampleRamanTestFilesInfo],
        XRD: [3, 'exploEviXRDTestFile', 'exploSampleXRDTestFile', getExploMatchXRDList, getExploSampleXRDTestFilesInfo],
        XRF: [4, 'exploEviXRFTestFile', 'exploSampleXRFTestFile', getExploMatchXRFList, getExploSampleXRFTestFilesInfo],
        GCMS: [5, 'exploEviGCMSTestFile', 'exploSampleGCMSTestFile', {}, {}],
      }
const deviceMap = {
        FTIR: [6,'devEviFTIRTestFile', 'devPartSampleFTIRTestFile', getDevMatchFTIRList, getDevPartSampleFTIRTestFilesInfo],
        Raman: [7, 'devEviRamanTestFile', 'devPartSampleRamanTestFile', getDevMatchRamanList, getDevPartSampleRamanTestFilesInfo],
        XRF: [8, 'devEviXRFTestFile', 'devPartSampleXRFTestFile', getDevMatchXRFList, getDevPartSampleXRFTestFilesInfo],
      }
let dataTypeMap = {}

export default {
  name: 'AnalysisTabIngredient',
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
      match: 'match',
      matchData: {
        type: 0,  // 根据数据类型触发算法类别
        eviFileIdName: '',  // 物证id字段名称
        sampleFileIdName: '',  // 样本id字段名称
        getMatchList: {},  // 获取物证match匹配表API
        getSampleFilesInfo: {}  // 获取样本数据文件API
      },
      tableData: [],
      currentSample: {},
      // table内小分页
      tablePageIndex: 1,
      tableParams: {
        page: 1,
        page_size: 10,
        // exploEviFTIRTestFile_id: 1  // 物证数据文件id
        count: 1,
      },
      // tab内大分页
      dataIndex: 0,  // 数据数组下标从0开始
      pageIndex: 1,  // 页码从1开始
      inputDistanceData: null,
      distanceData: null,
    }
  },
  watch: {
    dataIndex(val) {
      this.currentSample = {}  // 改变物证数据文件时 清除之前绘制的样本
      this.initTab()
      this.fetchList()
    }
  },
  components: {
    TabChart,
    TabColumn,
    RecognitionButton,
    CheckButton,
    Pagination,
    PaginationFiles,
  },
  mounted() {
    if(this.eviType == 'explosive') {
      dataTypeMap = explosiveMap
    } else {
      dataTypeMap = deviceMap
    }
    this.initTab()
    this.fetchList()
  },
  methods: {
    /** 改变物证数据文件时 重新绘图(传给子组件) 重新获取匹配列表(本组件) */
    initTab() {
      if(this.dataType !== 'Summary') {
        /** 配置 */
        this.matchData.type = dataTypeMap[this.dataType][0]
        this.matchData.eviFileIdName = dataTypeMap[this.dataType][1]
        this.matchData.sampleFileIdName = dataTypeMap[this.dataType][2]
        this.matchData.getMatchList = dataTypeMap[this.dataType][3]
        this.matchData.getSampleFilesInfo = dataTypeMap[this.dataType][4]

        if(this.ingredientData.seriesData[this.dataIndex] === undefined) {
          return
        }

        let eviFileIdName_id = this.matchData.eviFileIdName + '_id'
        let IdDescriptor = Object.create(null)
        Object.defineProperty(this.tableParams, eviFileIdName_id, {
            value : this.ingredientData.seriesData[this.dataIndex].id,
            writable : true,
            enumerable : true,
            configurable : true
          })
      }
    },
    /** 获取匹配列表 */
    fetchList() {
      if(this.ingredientData.seriesData[this.dataIndex] === undefined) {
        return
      }
      this.matchData.getMatchList(this.tableParams).then(res => {
        this.tableData = res.results
        this.tableParams.count = res.count
        // console.log('- - AnalysisTabIngredient - - fetchList: ', this.tableData)
      })
    },
    handleRecognition() {
      if(this.ingredientData.seriesData[this.dataIndex] === undefined) {
        return
      }
      // console.log('- - AnalysisTabIngredient - - handleRecognition:', this.$route.params)
      let uploadForm = new FormData()
      uploadForm.append('type', this.matchData.type)
      uploadForm.append('eviFileId', this.ingredientData.seriesData[this.dataIndex].id)  // seriesData是此种检测类型数据的数组
      startMatch(uploadForm).then(res => {
        console.log('- - AnalysisTabIngredient - - handleRecognition:', res)
        this.fetchList()
      })
    },
    handleCheck() {
      console.log('- - AnalysisTabIngredient - - handleCheck:', this.currentSample.id)
    },
    /** 获取样本数据 */
    handleDetail(row) {
      if (this.isImgTab) {
        this.$router.push('/analysis/deviceAnalysis/deviceAppearanceCompare')
      }
      else {
        console.log('- - AnalysisTabIngredient - - handleDetail:', row.Score)
        this.matchData.getSampleFilesInfo(row[this.matchData.sampleFileIdName]).then(res => {
          console.log('- - AnalysisTabIngredient - - handleDetail getExploSample:', res)
          this.currentSample = res
        })
      }
    },
    /** tab内结果排名列表翻页 */
    handleChangeSize(pageSize) {
      this.tableParams.page_size = pageSize
      this.tableParams.page = 1
      this.fetchList()
    },
    handleChangePage(pageIndex) {
      // console.log('- - AnalysisTabIngredient - - pageIndex: ', pageIndex)
      this.tableParams.page = pageIndex
      this.fetchList()
    },

    /** tab内大分页 */ 
    handleChangeFilePage(index) {
      console.log('- - AnalysisTabIngredient - - index: ', index)
      this.dataIndex = index - 1
      this.pageIndex = index
    },
    //
    handleDistance() {
      this.distanceData = this.inputDistanceData
    }
  },
}
</script>

<style scoped>
.img-container {
  width: 100%;
  height: 500px;
  background-color: whitesmoke;
}
</style>
