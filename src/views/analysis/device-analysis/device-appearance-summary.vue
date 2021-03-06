<template>
  <el-row>
    <el-col :span="24">
        <!-- 核准按键 -->
        <CheckButton 
          @check-confirm="handleCheck">
        </CheckButton>
        当前选择：- {{ currentRow.id }} - 
      
      <!-- 结果排名列表 -->
      <el-table
        v-if="tableData.length > 0 && eviType > 0"
        v-loading="loading"
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
          prop="id"
          label="匹配编号"
          align="center"
          width="100"
          fixed="left">
        </el-table-column>

        <el-table-column
          label="组件名称"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button 
              type="text"
              @click="handleCurrentChange(scope.row)">
              {{ scope.row.devSample.sname }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          label="零件名称"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button 
              type="text"
              @click="handleCurrentChange(scope.row)">
              {{ scope.row.devPartSample.sname }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          label="图像匹配信息"
          align="center"
          width="">
          <template slot-scope="scope">
            <!-- <img 
              :src="eviType == 3 
                ? baseURL + scope.row.devShapeMatchList.devShapeSample.srcImgRelURL.slice(11) 
                : baseURL + scope.row.opartMatchList.oPartImgSample.srcImgRelURL.slice(11)" 
              width="80px" height="60px"
              @click="handleDetail(eviType == 3 ? scope.row.devShapeMatchList : scope.row.opartMatchList, scope.row)"> -->
            <img 
              v-if="eviType == 3"
              :src="baseURL + scope.row.devShapeMatchList.devShapeSample.srcImgRelURL.slice(11)"
              width="80px" height="60px"
              @click="handleDetail(eviType == 3 ? scope.row.devShapeMatchList : scope.row.opartMatchList, scope.row)">
            <img 
              v-else
              :src="baseURL + scope.row.opartMatchList.oPartImgSample.srcImgRelURL.slice(11)"
              width="80px" height="60px"
              @click="handleDetail(eviType == 3 ? scope.row.devShapeMatchList : scope.row.opartMatchList, scope.row)">
          </template>
        </el-table-column>

        <el-table-column
          prop="Score"
          label="总相似分"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-tag :type="(scope.row.isCheck == 2 || scope.row.isExpertCheck == 2) ? 'success' : 'info'">
              {{scope.row.Score}}
            </el-tag>
          </template>
        </el-table-column>

      </el-table>

      <pagination 
        v-bind="tableParams"
        @change-size="handleChangeSize"
        @change-page="handleChangePage">
      </pagination>

    </el-col>

    <!-- 样本-物证的图像查看 -->
    <el-dialog
      :title="currentSample.devSampleName + ' - ' + currentSample.devPartSampleName + ' - ' + currentSample.matchDegree"
      :visible.sync="dialogVisible"
      width="95%">
      <el-row v-loading="loadingImg">
        <el-col :span="18">
          <canvas :id="'S_' + $route.params.id + '_sample'"></canvas>
        </el-col>
        <el-col :span="6">
          <canvas :id="'S_' + $route.params.id + '_evidence'"></canvas>
        </el-col>
      </el-row>
      
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import DeviceAppearanceTabImg from '@/views/analysis/device-analysis/device-appearance-tab-img'
import RecognitionButton from '@/components/Buttons/recognition-button'
import CheckButton from '@/components/Buttons/check-button'
import Pagination from '@/components/Pagination'
import { startMatch,
          getDevShapeMultiMatchsList,
          getOPartImgMultiMatchsList,
          getDevShapeMultiMatchsInfo,
          updateDevShapeMultiMatchs,
          updateOPartImgMultiMatchs } from '@/api/match-device'
import { getDevShapeSamplesInfo } from '@/api/sample-device'

// 样本画布默认最大尺寸
const SampleWidth = 1000
const SampleHeight = 800
// 物证画布默认最大尺寸
const EvidenceWidth = 300
const EvidenceHeight = 200

export default {
  name: 'DeviceAppearanceSummary',
  props: {
    eviType: {
      type: [Number, String],
      default: 0,
    },
    expertShapeOpinion: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      loadingImg: false,
      baseURL: 'http://10.112.99.172:8001',
      evidenceNorImgURL: null,  // 在子组件对物证图像处理完毕后接收归一化的图像
      matchData: {
        type: 0,
        eviFileId: 0
      },
      tableData: [],
      oPartImgSample: null,
      getMatchList: null,
      checkMatch: null,
      checkData: {
        Check: 'True',
      },
      dialogVisible: false,
      canvasSample: null,
      canvasEvidence: null,
      ctxSample: null,
      ctxEvidence: null,
      scaleSample: [],
      scaleEvidence: [],
      sampleWTHR: 1,
      evidenceWTHR: 1,
      currentSample: {},
      currentEvi: {},
      currentRow: {},
      imgSample: new Image(),
      imgEvidence: new Image(),
      tablePageIndex: 1,
      tableParams: {
        page: 1,
        page_size: 10,
        devEvi_id: 1,  // 物证id
        count: 1,
      }
    }
  },
  components: {
    DeviceAppearanceTabImg,
    RecognitionButton,
    CheckButton,
    Pagination,
  },
  watch: {
    expertShapeOpinion(val, oldVal) {
      if(!val && !oldVal) return
      if(this.role == 3) return
      this.checkData.expertShapeOpinion = val
      console.log('- - DeviceAppearanceSummary - - watch expertShapeOpinion:', this.checkData.expertShapeOpinion)
    }
  },
  mounted() {
    console.log('- - DeviceAppearanceSummary - - eviType: ', this.eviType)
    if(Number(this.eviType) === 3) {
      this.getMatchList = getDevShapeMultiMatchsList
      this.checkMatch = updateDevShapeMultiMatchs
    } else {
      this.getMatchList = getOPartImgMultiMatchsList
      this.checkMatch = updateOPartImgMultiMatchs
    }
    this.tableParams.devEvi_id = this.$route.params.id
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.loading = true
      this.getMatchList(this.tableParams).then(res => {
        this.tableData = res.results
        // console.log('- - DeviceAppearanceSummary - - tableData: ',  this.tableData)
        // console.log('- - DeviceAppearanceSummary - - tableData[0]: ', this.tableData[0].opartMatchList[0].oPartImgSample)
        // console.log('- - DeviceAppearanceSummary - - tableData[0]: ', this.tableData[0].opartMatchList[0].oPartImgSample.srcImgRelURL.slice(11))
        // this.oPartImgSample = this.baseURL + this.tableData[0].opartMatchList[0].oPartImgSample.srcImgRelURL.slice(11)
        // console.log('- - DeviceAppearanceSummary - - tableData[0]: ', this.tableData[0].devShapeMatchList.devShapeSample)
        this.tableParams.count =  res.count
        this.loading = false
      })
    },
    initImage() {
      this.canvasSample = document.getElementById('S_' + this.$route.params.id + '_sample')
      this.ctxSample = this.canvasSample.getContext('2d')
      this.canvasSample.width = SampleWidth
      this.canvasSample.height = SampleHeight

      this.canvasEvidence = document.getElementById('S_' + this.$route.params.id + '_evidence')
      this.ctxEvidence = this.canvasEvidence.getContext('2d')
      this.canvasEvidence.width = EvidenceWidth
      this.canvasEvidence.height = EvidenceHeight
    },

    handleCheck() {
      console.log('- - DeviceAppearanceSummary - - handleCheck:', this.currentRow.id)
      if(!this.checkData.expertShapeOpinion) {
        this.checkData.expertShapeOpinion = "已核准（默认说明）"
      }
      console.log('- - DeviceAppearanceSummary - - handleCheck:', this.checkData.expertShapeOpinion)
      this.checkMatch(this.currentRow.id, this.checkData).then(res => {
        console.log('- - DeviceAppearanceSummary - - handleCheck:', res)
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

    // 详细比对
    handleDetail(item, row) {
      this.dialogVisible = true
      this.loadingImg = true

      this.$nextTick(() => {
        if(Number(this.eviType) === 3) {
          let matchSampleCoordi	= JSON.parse(item.matchSampleCoordi).map(val => Number(val))
          let matchEviCoordi = JSON.parse(item.matchEviCoordi).map(val => Number(val))
          let matchRadius = Number(JSON.parse(item.matchRadius))

          this.currentSample = item.devShapeSample
          this.currentEvi = item.devShapeEvi
          this.currentSample.devSampleName = row.devSample.sname
          this.currentSample.devPartSampleName = row.devPartSample.sname
          this.currentSample.matchDegree = item.matchDegree

          // URL
          this.baseURL = 'http://10.112.99.172:8001'

          let end = this.currentSample.srcImgRelURL.search(/media/i) + 5
          let endURL = this.currentSample.srcImgRelURL.slice(end)
          this.imgSample = new Image()
          this.imgSample.src = this.currentSample.norImgURL || this.baseURL + endURL

          end = this.currentEvi.srcImgRelURL.search(/media/i) + 5
          endURL = this.currentEvi.srcImgRelURL.slice(end)
          this.imgEvidence = new Image()
          this.imgEvidence.src = this.currentEvi.norImgURL || this.baseURL + endURL

          this.initImage()

          this.imgSample.onload = () => {

            this.sampleWTHR = Number((this.imgSample.naturalWidth / this.imgSample.naturalHeight).toFixed(3))

            if(this.imgSample.naturalWidth > this.canvasSample.width) {
              // 图像原始尺寸比画布大 等比例缩小
              this.canvasSample.height = Number((this.canvasSample.width / this.sampleWTHR).toFixed())
            } else {
              // 图像原始尺寸比画布小 直接使用原始尺寸
              this.canvasSample.width = this.imgSample.naturalWidth
              this.canvasSample.height = this.imgSample.naturalHeight
            }

            this.scaleSample[0] = Number((this.imgSample.naturalWidth / this.canvasSample.width).toFixed(3))
            this.scaleSample[1] = Number((this.imgSample.naturalHeight / this.canvasSample.height).toFixed(3))
            console.log('naturalWidth', this.imgSample.naturalWidth, 'naturalHeight: ', this.imgSample.naturalHeight,
                'scaleSample[0]: ', this.scaleSample[0], 'scaleSample[1]: ', this.scaleSample[1], 'WTHR: ', this.sampleWTHR)

            this.ctxSample.drawImage(this.imgSample, 0, 0, this.canvasSample.width, this.canvasSample.height)
          
            matchSampleCoordi[0] = matchSampleCoordi[0] / this.scaleSample[0]
            matchSampleCoordi[1] = matchSampleCoordi[1] / this.scaleSample[1]

            this.ctxSample.strokeStyle = 'rgb(250, 0, 0)'
            this.ctxSample.beginPath()
            this.ctxSample.arc(matchSampleCoordi[0], matchSampleCoordi[1], matchRadius, 0, Math.PI*2, true)
            this.ctxSample.stroke()

            this.loadingImg = false

            // this.canvasSample.width = this.imgSample.naturalWidth
            // this.canvasSample.height = this.imgSample.naturalHeight
            // this.ctxSample.drawImage(this.imgSample, 0, 0, this.canvasSample.width, this.canvasSample.height)
            
            // this.scaleSample[0] = Number((this.imgSample.naturalWidth / 800).toFixed(2))
            // this.scaleSample[1] = Number((this.imgSample.naturalHeight / 600).toFixed(2))
            // matchSampleCoordi[0] = matchSampleCoordi[0] // / this.scaleSample[0]
            // matchSampleCoordi[1] = matchSampleCoordi[1] // / this.scaleSample[1]

            // this.ctxSample.strokeStyle = 'rgb(250, 0, 0)'
            // this.ctxSample.beginPath()
            // this.ctxSample.arc(matchSampleCoordi[0], matchSampleCoordi[1], matchRadius, 0, Math.PI*2, true)
            // this.ctxSample.stroke()
          }

          this.imgEvidence.onload = () => {

            this.evidenceWTHR = Number((this.imgEvidence.naturalWidth / this.imgEvidence.naturalHeight).toFixed(3))

            if(this.imgEvidence.naturalWidth > this.canvasEvidence.width) {
              // 图像原始尺寸比画布大 等比例缩小
              this.canvasEvidence.height = Number((this.canvasEvidence.width / this.evidenceWTHR).toFixed())
            } else {
              // 图像原始尺寸比画布小 直接使用原始尺寸
              this.canvasEvidence.width = this.imgEvidence.naturalWidth
              this.canvasEvidence.height = this.imgEvidence.naturalHeight
            }

            this.scaleEvidence[0] = Number((this.imgEvidence.naturalWidth / this.canvasEvidence.width).toFixed(3))
            this.scaleEvidence[1] = Number((this.imgEvidence.naturalHeight / this.canvasEvidence.height).toFixed(3))
            console.log('naturalWidth', this.imgEvidence.naturalWidth, 'naturalHeight: ', this.imgEvidence.naturalHeight,
                'scaleEvidence[0]: ', this.scaleEvidence[0], 'scaleEvidence[1]: ', this.scaleEvidence[1], 'WTHR: ', this.evidenceWTHR)

            this.ctxEvidence.drawImage(this.imgEvidence, 0, 0, this.canvasEvidence.width, this.canvasEvidence.height)
          
            matchEviCoordi[0] = matchEviCoordi[0] / this.scaleEvidence[0]
            matchEviCoordi[1] = matchEviCoordi[1] / this.scaleEvidence[1]

            this.ctxEvidence.strokeStyle = 'rgb(250, 0, 0)'
            this.ctxEvidence.beginPath()
            this.ctxEvidence.arc(matchEviCoordi[0], matchEviCoordi[1], matchRadius, 0, Math.PI*2, true)
            this.ctxEvidence.stroke()

            // this.canvasEvidence.width = this.imgEvidence.naturalWidth
            // this.canvasEvidence.height = this.imgEvidence.naturalHeight
            // this.ctxEvidence.drawImage(this.imgEvidence, 0, 0, this.canvasEvidence.width, this.canvasEvidence.height)
            // this.scaleEvidence[0] = Number((this.imgEvidence.naturalWidth / 400).toFixed(2))
            // this.scaleEvidence[1] = Number((this.imgEvidence.naturalHeight / 300).toFixed(2))
            // matchEviCoordi[0] = matchEviCoordi[0] // / this.scaleEvidence[0]
            // matchEviCoordi[1] = matchEviCoordi[1] // / this.scaleEvidence[1]

            // this.ctxEvidence.strokeStyle = 'rgb(250, 0, 0)'
            // this.ctxEvidence.beginPath()
            // this.ctxEvidence.arc(matchEviCoordi[0], matchEviCoordi[1], matchRadius, 0, Math.PI*2, true)
            // this.ctxEvidence.stroke()
          }
        } else {
          this.currentSample = item.oPartImgSample
          this.currentEvi = item.oPartImgEvi
          this.currentSample.devSampleName = row.devSample.sname
          this.currentSample.devPartSampleName = row.devPartSample.sname
          this.currentSample.matchDegree = item.matchDegree

          // URL
          this.baseURL = 'http://10.112.99.172:8001'
          
          let end = this.currentSample.srcImgRelURL.search(/media/i) + 5
          let endURL = this.currentSample.srcImgRelURL.slice(end)
          this.imgSample = new Image()
          this.imgSample.src = this.baseURL + endURL

          end = this.currentEvi.srcImgRelURL.search(/media/i) + 5
          endURL = this.currentEvi.srcImgRelURL.slice(end)
          this.imgEvidence = new Image()
          this.imgEvidence.src = this.baseURL + endURL

          // this.imgSample = new Image()
          // this.imgSample.src = this.currentSample.srcImgURL
          // this.imgEvidence = new Image()
          // this.imgEvidence.src = this.currentEvi.srcImgURL

          this.initImage()

          this.imgSample.onload = () => {
            // this.ctxSample.drawImage(this.imgSample, 0, 0, this.canvasSample.width, this.canvasSample.height)

            this.sampleWTHR = Number((this.imgSample.naturalWidth / this.imgSample.naturalHeight).toFixed(3))

            if(this.imgSample.naturalWidth > this.canvasSample.width) {
              // 图像原始尺寸比画布大 等比例缩小
              this.canvasSample.height = Number((this.canvasSample.width / this.sampleWTHR).toFixed())
            } else {
              // 图像原始尺寸比画布小 直接使用原始尺寸
              this.canvasSample.width = this.imgSample.naturalWidth
              this.canvasSample.height = this.imgSample.naturalHeight
            }
            this.ctxSample.drawImage(this.imgSample, 0, 0, this.canvasSample.width, this.canvasSample.height)

            this.loadingImg = false
          }
          this.imgEvidence.onload = () => {
            // this.ctxEvidence.drawImage(this.imgEvidence, 0, 0, this.canvasEvidence.width, this.canvasEvidence.height)

            this.evidenceWTHR = Number((this.imgEvidence.naturalWidth / this.imgEvidence.naturalHeight).toFixed(3))

            if(this.imgEvidence.naturalWidth > this.canvasEvidence.width) {
              // 图像原始尺寸比画布大 等比例缩小
              this.canvasEvidence.height = Number((this.canvasEvidence.width / this.evidenceWTHR).toFixed())
            } else {
              // 图像原始尺寸比画布小 直接使用原始尺寸
              this.canvasEvidence.width = this.imgEvidence.naturalWidth
              this.canvasEvidence.height = this.imgEvidence.naturalHeight
            }

            this.ctxEvidence.drawImage(this.imgEvidence, 0, 0, this.canvasEvidence.width, this.canvasEvidence.height)
          }
        }
      })
    },
    handleCurrentChange(currentRow) {
      // console.log('- - DeviceAppearanceSummary - - handleCurrentChange:', currentRow.id, currentRow.Score)
      if(!currentRow) return
      this.currentRow = currentRow
      this.$emit('change-sample', currentRow.expertShapeOpinion)
    },
    /** 翻页 */
    handleChangePage(pageIndex) {
      console.log('- - DeviceAppearanceSummary - - pageIndex: ', pageIndex)
      this.tableParams.page = pageIndex
      this.fetchList(this.tableParams)
    },
    handleChangeSize(pageSize) {
      console.log('- - DeviceAppearanceSummary - - pageSize: ', pageSize)
      this.tableParams.page_size = pageSize
      this.tableParams.page = 1
      this.fetchList(this.tableParams)
    },
  },
}
</script>

<style scoped>

</style>
