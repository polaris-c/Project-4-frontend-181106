<template>
  <el-row :gutter="10">
    <el-col :span="18">
      <!-- 图表 -->
      <DeviceAppearanceTabImg
        v-if="eviType == 3"
        :dataItem = "dataItem"
        @receiveNorImgURL = "receiveNorImgURL">
      </DeviceAppearanceTabImg>
      <DeviceAppearanceTabImgO
        v-else
        :dataItem = "dataItem">
      </DeviceAppearanceTabImgO>
    </el-col>

    <el-col :span="6">
      <el-row>
        <el-col :span="8">
          <!-- 识别按键 -->
          <RecognitionButton @recognition-confirm="handleRecognition"></RecognitionButton> 
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
        @current-change="handleCurrentChange"
        fit
        stripe
        border
        highlight-current-row>

        <el-table-column
          label="样本名称"
          align="center"
          width=""
          fixed="left">
          <template slot-scope="scope">
            <el-button 
              type="text"
              @click="handleDetail(scope.row)">
              {{ scope.row.devSampleName }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="matchDegree"
          label="相似分"
          align="center"
          width="100">
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

    <!-- 样本-物证的图像查看 -->
    <el-dialog
      :title="currentSample.devSampleName"
      :visible.sync="dialogVisible"
      width="95%">
      <el-row v-loading="loadingImg">
        <el-col :span="18">
          <canvas :id="dataItem.id + '_sample'"></canvas>
        </el-col>
        <el-col :span="6">
          <canvas :id="dataItem.id + '_evidence'"></canvas>
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
import DeviceAppearanceTabImgO from '@/views/analysis/device-analysis/device-appearance-tab-imgO'
import RecognitionButton from '@/components/Buttons/recognition-button'
import CheckButton from '@/components/Buttons/check-button'
import Pagination from '@/components/Pagination'
import { startMatch, getDevShapeMatchsList, getOPartImgMatchsList } from '@/api/match-device'
import { getDevShapeSamplesInfo } from '@/api/sample-device'

// 样本画布默认最大尺寸
const SampleWidth = 1000
const SampleHeight = 800
// 物证画布默认最大尺寸
const EvidenceWidth = 300
const EvidenceHeight = 200

export default {
  name: 'DeviceAppearanceTab',
  props: {
    eviType: {
      type: [Number, String],
      default: 2,
    },
    dataItem: {
      type: Object,
      default: {},
    },
    analysisType: {
      type: String,
      default: 'explosive',
    }
  },
  data() {
    return {
      loading: false,
      loadingImg: false,
      evidenceNorImgURL: null,  // 在子组件对物证图像处理完毕后接收归一化的图像
      getMatchList: null,
      matchData: {
        type: 0,
        eviFileId: 0
      },
      tableData: [],
      tableParams: {
        page: 1,
        page_size: 10,
        // devShapeEvi_id: 1  // 物证数据文件id
        count: 1,
      },
      dialogVisible: false,
      canvasSample: null,
      canvasEvidence: null,
      ctxSample: null,
      ctxEvidence: null,
      scaleSample: [],
      sampleWTHR: 1,
      scaleEvidence: [],
      evidenceWTHR: 1,
      currentSample: {},
      imgSample: new Image(),
      imgEvidence: new Image(),
      tablePageIndex: 1
    }
  },
  components: {
    DeviceAppearanceTabImg,
    DeviceAppearanceTabImgO,
    RecognitionButton,
    CheckButton,
    Pagination,
  },
  mounted() {
    console.log('- - DeviceAppearanceTab - - eviType dataItem:', this.eviType, this.dataItem.id)
    if(Number(this.eviType) === 3) { // PCB电路版
      this.matchData.type = 9
      this.getMatchList = getDevShapeMatchsList
      this.tableParams.devShapeEvi_id = this.dataItem.id
    } else {
      this.matchData.type = 10
      this.getMatchList = getOPartImgMatchsList
      this.tableParams.oPartImgEvi_id = this.dataItem.id
    }
    this.fetchList()
    this.evidenceNorImgURL = this.dataItem.norImgURL
  },
  methods: {
    fetchList() {
      this.loading = true
      this.getMatchList(this.tableParams).then(res => {
        this.tableData = res.results
        this.tableParams.count = res.count
        this.loading = false
      })
    },
    initImage() {
      this.canvasSample = document.getElementById(this.dataItem.id + '_sample')
      this.ctxSample = this.canvasSample.getContext('2d')
      this.canvasSample.width = SampleWidth
      this.canvasSample.height = SampleHeight

      this.canvasEvidence = document.getElementById(this.dataItem.id + '_evidence')
      this.ctxEvidence = this.canvasEvidence.getContext('2d')
      this.canvasEvidence.width = EvidenceWidth
      this.canvasEvidence.height = EvidenceHeight
    },
    // 在新图像预处理后接收预处理的图像
    receiveNorImgURL(norImgURL) {
      console.log('- - DeviceAppearanceTab - - receiveNorImgURL:', norImgURL)
      this.evidenceNorImgURL = norImgURL
    },

    handleRecognition() {
      // console.log('- - DeviceAppearanceTab - - handleRecognition:', this.$route.params)
      this.loading = true
      let uploadForm = new FormData()
      this.matchData.eviFileId = this.dataItem.id
      uploadForm.append('type', this.matchData.type)
      uploadForm.append('eviFileId', this.matchData.eviFileId)
      console.log('- - DeviceAppearanceTab - - handleRecognition:', this.matchData.type, this.matchData.eviFileId)
      startMatch(uploadForm).then(res => {
        // res返回的列表数据地址不完整 重新fetchList
        // this.tableData = res.results 
        this.fetchList()
        this.loading = false
      })

    },
    // handleCheck() {
    //   console.log('- - DeviceAppearanceTab - - handleCheck:', this.currentSample.id)
    // },
    // 详细比对
    handleDetail(row) {
      this.dialogVisible = true
      this.loadingImg = true

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
              // this.ctxSample.drawImage(this.imgSample, 0, 0, this.canvasSample.width, this.canvasSample.height)
              
              // this.scaleSample[0] = Number((this.imgSample.naturalWidth / 800).toFixed(2))
              // this.scaleSample[1] = Number((this.imgSample.naturalHeight / 600).toFixed(2))
              // matchSampleCoordi[0] = matchSampleCoordi[0] / this.scaleSample[0]
              // matchSampleCoordi[1] = matchSampleCoordi[1] / this.scaleSample[1]

              // this.ctxSample.strokeStyle = 'rgb(250, 0, 0)'
              // this.ctxSample.beginPath()
              // this.ctxSample.arc(matchSampleCoordi[0], matchSampleCoordi[1], matchRadius, 0, Math.PI*2, true)
              // this.ctxSample.stroke()
              // console.log('- - DeviceAppearanceTab - - handleDetail:', matchSampleCoordi, matchRadius)
              // console.log('dataItem id:', this.dataItem.id, 'naturalWidth', this.imgSample.naturalWidth, 'naturalHeight: ', this.imgSample.naturalHeight,
              //     'scaleSample[0]: ', this.scaleSample[0], 'scaleSample[1]: ', this.scaleSample[1])

              // toFixed(n) 返回小数点后数字的n个数数字的字符串
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
              console.log('dataItem id:', this.dataItem.id, 'naturalWidth', this.imgSample.naturalWidth, 'naturalHeight: ', this.imgSample.naturalHeight,
                  'scaleSample[0]: ', this.scaleSample[0], 'scaleSample[1]: ', this.scaleSample[1], 'WTHR: ', this.sampleWTHR)

              this.ctxSample.drawImage(this.imgSample, 0, 0, this.canvasSample.width, this.canvasSample.height)
            
              matchSampleCoordi[0] = matchSampleCoordi[0] / this.scaleSample[0]
              matchSampleCoordi[1] = matchSampleCoordi[1] / this.scaleSample[1]

              this.ctxSample.strokeStyle = 'rgb(250, 0, 0)'
              this.ctxSample.beginPath()
              this.ctxSample.arc(matchSampleCoordi[0], matchSampleCoordi[1], matchRadius, 0, Math.PI*2, true)
              this.ctxSample.stroke()

              this.loadingImg = false
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
              console.log('dataItem id:', this.dataItem.id, 'naturalWidth', this.imgEvidence.naturalWidth, 'naturalHeight: ', this.imgEvidence.naturalHeight,
                  'scaleEvidence[0]: ', this.scaleEvidence[0], 'scaleEvidence[1]: ', this.scaleEvidence[1], 'WTHR: ', this.evidenceWTHR)

              this.ctxEvidence.drawImage(this.imgEvidence, 0, 0, this.canvasEvidence.width, this.canvasEvidence.height)
            
              matchEviCoordi[0] = matchEviCoordi[0] / this.scaleEvidence[0]
              matchEviCoordi[1] = matchEviCoordi[1] / this.scaleEvidence[1]

              this.ctxEvidence.strokeStyle = 'rgb(250, 0, 0)'
              this.ctxEvidence.beginPath()
              this.ctxEvidence.arc(matchEviCoordi[0], matchEviCoordi[1], matchRadius, 0, Math.PI*2, true)
              this.ctxEvidence.stroke()

              // this.ctxEvidence.drawImage(this.imgEvidence, 0, 0, this.canvasEvidence.width, this.canvasEvidence.height)
              // this.scaleEvidence[0] = Number((this.imgEvidence.naturalWidth / 400).toFixed(2))
              // this.scaleEvidence[1] = Number((this.imgEvidence.naturalHeight / 300).toFixed(2))
              // matchEviCoordi[0] = matchEviCoordi[0] / this.scaleEvidence[0]
              // matchEviCoordi[1] = matchEviCoordi[1] / this.scaleEvidence[1]

              // this.ctxEvidence.strokeStyle = 'rgb(250, 0, 0)'
              // this.ctxEvidence.beginPath()
              // this.ctxEvidence.arc(matchEviCoordi[0], matchEviCoordi[1], matchRadius, 0, Math.PI*2, true)
              // this.ctxEvidence.stroke()
              // console.log('dataItem id:', this.dataItem.id, 'naturalWidth', this.imgEvidence.naturalWidth, 'naturalHeight: ', this.imgEvidence.naturalHeight,
              //     'scaleEvidence[0]: ', this.scaleEvidence[0], 'scaleEvidence[1]: ', this.scaleEvidence[1])
            }
          })
        } else {
          this.currentSample = row.oPartImgSample
          this.currentSample.devSampleName = row.devSampleName

          // URL
          this.baseURL = 'http://10.112.99.172:8001'
          
          let end = this.currentSample.srcImgRelURL.search(/media/i) + 5
          let endURL = this.currentSample.srcImgRelURL.slice(end)
          this.imgSample = new Image()
          this.imgSample.src = this.baseURL + endURL

          end = this.dataItem.srcImgRelURL.search(/media/i) + 5
          endURL = this.dataItem.srcImgRelURL.slice(end)
          this.imgEvidence = new Image()
          this.imgEvidence.src = this.baseURL + endURL

          // this.imgSample = new Image()
          // this.imgSample.src = this.currentSample.srcImgURL
          // this.imgEvidence = new Image()
          // this.imgEvidence.src = this.dataItem.srcImgURL

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
            this.ctxSample.drawImage(this.imgSample, 0, 0, this.canvasSample.width, this.canvasSample.height)

            this.loadingImg = false
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
            this.ctxEvidence.drawImage(this.imgEvidence, 0, 0, this.canvasEvidence.width, this.canvasEvidence.height)

          }
        }
      })
      
    },
    handleCurrentChange(currentRow) {
      // console.log('- - DeviceAppearanceTab - - handleCurrentChange:', currentRow.sName)
      // this.currentSample = currentRow
    },
    /** tab内结果排名列表翻页 */
    handleChangeSize(pageSize) {
      this.tableParams.page_size = pageSize
      this.tableParams.page = 1
      this.fetchList()
    },
    handleChangePage(pageIndex) {
      // console.log('- - DeviceAppearanceTab - - pageIndex: ', pageIndex)
      this.tableParams.page = pageIndex
      this.fetchList()
    },
  },
}
</script>

<style scoped>

</style>
