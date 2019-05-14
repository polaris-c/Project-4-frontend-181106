<template>
  <el-row :gutter="10">
    <el-col :span="18">
      <!-- 图表 -->
      <DeviceAppearanceTabImg
        :dataItem = "dataItem"
        @receiveNorImgURL = "receiveNorImgURL">
      </DeviceAppearanceTabImg>
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

      <pagination
        :currentPage="tablePageIndex"
        @change-page="handleChangePage">
      </pagination>

    </el-col>

    <el-dialog
      :title="currentSample.devSampleName"
      :visible.sync="dialogVisible"
      width="90%">
      <!-- <span>{{ currentSample.norImgURL }}</span> -->
      <el-row>
        <el-col :span="16">
          <canvas :id="dataItem.id + '_sample'"></canvas>
        </el-col>
        <el-col :span="8">
          <canvas :id="dataItem.id + '_evidence'"></canvas>
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
import { startMatch, getDevShapeMatchsList, getDevShapeMatchsInfo } from '@/api/match-device'
import { getDevShapeSamplesInfo } from '@/api/sample-device'

export default {
  name: 'DeviceAppearanceTab',
  props: {
    isImgTab: {
      type: Boolean,
      default: false,
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
      evidenceNorImgURL: null,  // 在子组件对物证图像处理完毕后接收归一化的图片
      matchData: {
        type: 0,
        eviFileId: 0
      },
      tableData: [
        {
          id:	1,
          devShapeSample:	1,
          devShapeEvi:	1,
          matchDegree:	79,
          matchSampleCoordi:	["1299", "235"],
          matchEviCoordi:	"50",
          devSampleName:	"A001-1 img"
        }
      ],
      tableParams: {
        page: 1,
        page_size: 20,
        devShapeEvi_id: 1  // 物证数据文件id
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
    console.log('- - DeviceAppearanceTab - - isImgTab:', this.isImgTab)
    this.fetchList()
    this.evidenceNorImgURL = this.dataItem.norImgURL
  },
  methods: {
    fetchList() {
      this.loading = true
      this.tableParams.devShapeEvi_id = this.dataItem.id
      getDevShapeMatchsList(this.tableParams).then(res => {
        this.tableData = res.results
        this.loading = false
      })
    },
    initImage() {
      this.canvasSample = document.getElementById(this.dataItem.id + '_sample')
      this.ctxSample = this.canvasSample.getContext('2d')
      this.canvasSample.width = 800
      this.canvasSample.height = 600
      // console.log('- - DeviceAppearanceTab - - canvasSample:', this.canvasSample)

      this.canvasEvidence = document.getElementById(this.dataItem.id + '_evidence')
      this.ctxEvidence = this.canvasEvidence.getContext('2d')
      this.canvasEvidence.width = 400
      this.canvasEvidence.height = 300
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
      this.matchData.type = 9  // PCB电路版
      this.matchData.eviFileId = this.dataItem.id
      uploadForm.append('type', this.matchData.type)
      uploadForm.append('eviFileId', this.matchData.eviFileId)
      console.log('- - DeviceAppearanceTab - - handleRecognition:', this.matchData.type, this.matchData.eviFileId)
      startMatch(uploadForm).then(res => {
        // console.log('- - DeviceAppearanceTab - - handleRecognition:', res)
        this.tableData = res.results
        this.loading = false
      })

    },
    handleCheck() {
      console.log('- - DeviceAppearanceTab - - handleCheck:', this.currentSample.id)
    },
    // 详细比对
    handleDetail(row) {
        // this.$router.push('/analysis/deviceAnalysis/deviceAppearanceCompare')
      this.dialogVisible = true
      // console.log('- - DeviceAppearanceTab - - handleDetail:', JSON.parse(row.matchSampleCoordi), row.matchEviCoordi, row.matchRadius)
      let matchSampleCoordi	= JSON.parse(row.matchSampleCoordi).map(val => Number(val))
      let matchEviCoordi = JSON.parse(row.matchEviCoordi).map(val => Number(val))
      let matchRadius = Number(JSON.parse(row.matchRadius))
      // console.log(row.matchRadius, JSON.parse(row.matchRadius), typeof JSON.parse(row.matchRadius))

      // console.log('- - DeviceAppearanceTab - - handleDetail:', row.devShapeSample, row.devSampleName)
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
          // console.log('- - DeviceAppearanceTab - - handleDetail:', matchSampleCoordi, matchRadius)
          console.log('dataItem id:', this.dataItem.id, 'naturalWidth', this.imgSample.naturalWidth, 'naturalHeight: ', this.imgSample.naturalHeight,
              'scaleSample[0]: ', this.scaleSample[0], 'scaleSample[1]: ', this.scaleSample[1])
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
          console.log('dataItem id:', this.dataItem.id, 'naturalWidth', this.imgEvidence.naturalWidth, 'naturalHeight: ', this.imgEvidence.naturalHeight,
              'scaleEvidence[0]: ', this.scaleEvidence[0], 'scaleEvidence[1]: ', this.scaleEvidence[1])
        }
      })
      
    },
    handleCurrentChange(currentRow) {
      // console.log('- - DeviceAppearanceTab - - handleCurrentChange:', currentRow.sName)
      // this.currentSample = currentRow
    },
    handleChangePage(pageIndex) {
      console.log('- - DeviceAppearanceTab - - pageIndex: ', pageIndex)
      this.tablePageIndex = pageIndex
    }
  },
}
</script>

<style scoped>

</style>
