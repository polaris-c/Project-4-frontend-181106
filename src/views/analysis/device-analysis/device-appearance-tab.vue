<template>
  <el-row :gutter="10">
    <el-col :span="18">
      <!-- 图表 -->
      <DeviceAppearanceTabImg
        :dataItem = "dataItem">
      </DeviceAppearanceTabImg>
    </el-col>

    <el-col :span="6">
      <el-row>
        <el-col :span="8">
          <!-- 识别按键 -->
          <RecognitionButton @recognition-confirm="handleRecognition"></RecognitionButton> 
        </el-col>
        <el-col :span="16">
          <!-- 核准按键 -->
          <!-- <CheckButton 
            v-if="detectionType === 'Summary'"
            @check-confirm="handleCheck">
          </CheckButton> -->
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
  </el-row>
</template>

<script>
import DeviceAppearanceTabImg from '@/views/analysis/device-analysis/device-appearance-tab-img'
import RecognitionButton from '@/components/Buttons/recognition-button'
import CheckButton from '@/components/Buttons/check-button'
import Pagination from '@/components/Pagination'
import { startMatch } from '@/api/match-explosive'

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
      currentSample: {},
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
    // console.log('- - DeviceAppearanceTab - - detectionType:', this.detectionType)
    console.log('- - DeviceAppearanceTab - - isImgTab:', this.isImgTab)
  },
  methods: {
    handleRecognition() {
      // console.log('- - DeviceAppearanceTab - - handleRecognition:', this.$route.params)
      let uploadForm = new FormData()
      this.matchData.type = 9  // PCB电路版
      this.matchData.eviFileId = this.dataItem.id
      uploadForm.append('type', this.matchData.type)
      uploadForm.append('eviFileId', this.matchData.eviFileId)
      console.log('- - DeviceAppearanceTab - - handleRecognition:', this.matchData.type, this.matchData.eviFileId)
      startMatch(uploadForm).then(res => {
        console.log('- - DeviceAppearanceTab - - handleRecognition:', res)
        this.tableData = res.results
      })

    },
    handleCheck() {
      console.log('- - DeviceAppearanceTab - - handleCheck:', this.currentSample.id)
    },
    handleDetail(row) {
      if (this.isImgTab) {
        this.$router.push('/analysis/deviceAnalysis/deviceAppearanceCompare')
      }
      else {
        console.log('- - DeviceAppearanceTab - - handleDetail:', row.sName)
        this.currentSample = row
      }
    },
    handleCurrentChange(currentRow) {
      console.log('- - DeviceAppearanceTab - - handleCurrentChange:', currentRow.sName)
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
