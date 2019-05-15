<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <!-- 图表 -->
    </el-col>

    <el-col :span="12">
      <el-row>
        <!-- 核准按键 -->
        <CheckButton 
          @check-confirm="handleCheck">
        </CheckButton>
      </el-row>
      
      <!-- 结果排名列表 -->
      <el-table
        v-if="tableData.length > 0"
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
          width="">
          <template slot-scope="scope">
            <el-button 
              type="text"
              @click="handleDetail(scope.row)">
              {{ scope.row.devSample.sname }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          label="零件名称"
          align="center"
          width="">
          <template slot-scope="scope">
            <el-button 
              type="text"
              @click="handleDetail(scope.row)">
              {{ scope.row.devPartSample.sname }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="Score"
          label="相似分"
          align="center"
          width="100">
        </el-table-column>

      </el-table>

      <pagination
        :currentPage="tablePageIndex"
        @change-page="handleChangePage">
      </pagination>

    </el-col>

    <el-dialog
      :title="currentSample.devSampleName"
      :visible.sync="dialogVisible"
      width="90%">
      <el-row>
        <el-col :span="16">
          <canvas :id="'S_' + $route.params.id + '_sample'"></canvas>
        </el-col>
        <el-col :span="8">
          <canvas :id="'S_' + $route.params.id + '_evidence'"></canvas>
        </el-col>
      </el-row>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
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

export default {
  name: 'DeviceAppearanceSummary',
  props: {
    eviType: {
      type: [Number, String],
      default: 2,
    },
    // dataItem: {
    //   type: Object,
    //   default: {},
    // },
  },
  data() {
    return {
      loading: false,
      evidenceNorImgURL: null,  // 在子组件对物证图像处理完毕后接收归一化的图片
      matchData: {
        type: 0,
        eviFileId: 0
      },
      tableData: [{
        devPartSample: {},
        devSample: {}
      }],
      getMatchList: null,
      checkMatch: null,
      tableParams: {
        page: 1,
        page_size: 20,
        devEvi_id: 1  // 物证id
      },
      dialogVisible: false,
      canvasSample: null,
      canvasEvidence: null,
      ctxSample: null,
      ctxEvidence: null,
      scaleSample: [],
      scaleEvidence: [],
      currentSample: {},
      imgSample: new Image(),
      imgEvidence: new Image(),
      tablePageIndex: 1
    }
  },
  components: {
    DeviceAppearanceTabImg,
    RecognitionButton,
    CheckButton,
    Pagination,
  },
  mounted() {
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
        this.loading = false
      })
    },
    initImage() {
      this.canvasSample = document.getElementById(this.dataItem.id + '_sample')
      this.ctxSample = this.canvasSample.getContext('2d')
      this.canvasSample.width = 800
      this.canvasSample.height = 600

      this.canvasEvidence = document.getElementById(this.dataItem.id + '_evidence')
      this.ctxEvidence = this.canvasEvidence.getContext('2d')
      this.canvasEvidence.width = 400
      this.canvasEvidence.height = 300
    },

    handleCheck() {
      console.log('- - DeviceAppearanceSummary - - handleCheck:', this.currentSample.id)
    },

    // 详细比对
    handleDetail(row) {
      this.dialogVisible = true

      this.$nextTick(() => {
        if(Number(this.eviType) === 3) {
          let matchSampleCoordi	= JSON.parse(row.matchSampleCoordi).map(val => Number(val))
          let matchEviCoordi = JSON.parse(row.matchEviCoordi).map(val => Number(val))
          let matchRadius = Number(JSON.parse(row.matchRadius))

          getDevShapeSamplesInfo(row.devShapeSample).then(res => {
            this.currentSample = res  // res.norImgURL
            this.currentSample.devSampleName = row.devSampleName

            this.imgSample = new Image()
            this.imgSample.src = this.currentSample.norImgURL
            try {
              if(!this.evidenceNorImgURL) {
                throw (new Error("Evidence norImgURL is empty! Use srcImgURL."))
              }
            }
            catch(e) {
              console.log(e)
              this.evidenceNorImgURL = this.dataItem.srcImgURL
            }
            this.imgEvidence = new Image()
            this.imgEvidence.src = this.evidenceNorImgURL

            this.initImage()

            this.imgSample.onload = () => {
              this.ctxSample.drawImage(this.imgSample, 0, 0, this.canvasSample.width, this.canvasSample.height)
              
              this.scaleSample[0] = Number((this.imgSample.naturalWidth / 800).toFixed(2))
              this.scaleSample[1] = Number((this.imgSample.naturalHeight / 600).toFixed(2))
              matchSampleCoordi[0] = matchSampleCoordi[0] / this.scaleSample[0]
              matchSampleCoordi[1] = matchSampleCoordi[1] / this.scaleSample[1]

              this.ctxSample.strokeStyle = 'rgb(250, 0, 0)'
              this.ctxSample.beginPath()
              this.ctxSample.arc(matchSampleCoordi[0], matchSampleCoordi[1], matchRadius, 0, Math.PI*2, true)
              this.ctxSample.stroke()

              // console.log('dataItem id:', this.dataItem.id, 'naturalWidth', this.imgSample.naturalWidth, 'naturalHeight: ', this.imgSample.naturalHeight,
              //     'scaleSample[0]: ', this.scaleSample[0], 'scaleSample[1]: ', this.scaleSample[1])
            }
            this.imgEvidence.onload = () => {
              this.ctxEvidence.drawImage(this.imgEvidence, 0, 0, this.canvasEvidence.width, this.canvasEvidence.height)
              this.scaleEvidence[0] = Number((this.imgEvidence.naturalWidth / 400).toFixed(2))
              this.scaleEvidence[1] = Number((this.imgEvidence.naturalHeight / 300).toFixed(2))
              matchEviCoordi[0] = matchEviCoordi[0] / this.scaleEvidence[0]
              matchEviCoordi[1] = matchEviCoordi[1] / this.scaleEvidence[1]

              this.ctxEvidence.strokeStyle = 'rgb(250, 0, 0)'
              this.ctxEvidence.beginPath()
              this.ctxEvidence.arc(matchEviCoordi[0], matchEviCoordi[1], matchRadius, 0, Math.PI*2, true)
              this.ctxEvidence.stroke()
              // console.log('dataItem id:', this.dataItem.id, 'naturalWidth', this.imgEvidence.naturalWidth, 'naturalHeight: ', this.imgEvidence.naturalHeight,
              //     'scaleEvidence[0]: ', this.scaleEvidence[0], 'scaleEvidence[1]: ', this.scaleEvidence[1])
            }
          })
        } else {
          this.currentSample = row.oPartImgSample
          this.currentSample.devSampleName = row.devSampleName

          this.imgSample = new Image()
          this.imgSample.src = this.currentSample.srcImgURL
          this.imgEvidence = new Image()
          this.imgEvidence.src = this.dataItem.srcImgURL

          this.initImage()

          this.imgSample.onload = () => {
            this.ctxSample.drawImage(this.imgSample, 0, 0, this.canvasSample.width, this.canvasSample.height)
          }
          this.imgEvidence.onload = () => {
            this.ctxEvidence.drawImage(this.imgEvidence, 0, 0, this.canvasEvidence.width, this.canvasEvidence.height)
          }
        }
      })
    },
    handleCurrentChange(currentRow) {
      // console.log('- - DeviceAppearanceSummary - - handleCurrentChange:', currentRow.sName)
      // this.currentSample = currentRow
    },
    handleChangePage(pageIndex) {
      console.log('- - DeviceAppearanceSummary - - pageIndex: ', pageIndex)
      this.tablePageIndex = pageIndex
    }
  },
}
</script>

<style scoped>

</style>
