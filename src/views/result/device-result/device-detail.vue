<template>
  <div class="app-main-container">

    <!-- 物证 -->
    <el-card shadow="hover" class="el-row-style">
      <div slot="header">
        <span>残片基本信息</span>
      </div>
      <div v-loading="loading">
        <el-row class="el-row-style">
          <el-col :span="8">残片编号: {{ detailData.id }}</el-col>
          <el-col :span="8">残片名称：{{ detailData.evidenceName }}</el-col>
          <el-col :span="8">案件名称：{{ detailData.caseName }}</el-col>
        </el-row>
        <el-row class="el-row-style">
          <el-col :span="8">残片类型: {{ detailData.eviType }}</el-col>
          <el-col :span="8">录入日期：{{ detailData.inputDate }}</el-col>
          <!-- <el-col :span="8">录入人员：{{ detailData.user.name }}</el-col> -->
        </el-row>
        <el-row class="el-row-style">
          <el-col :span="8">残片厂家：{{ detailData.Factory }}</el-col>
          <el-col :span="8">残片型号：{{ detailData.Model }}</el-col>
          <el-col :span="8">残片商标: {{ detailData.Logo }}</el-col>
        </el-row>
        <el-row class="el-row-style">
          <el-col :span="8">残片颜色：{{ detailData.Color }}</el-col>
          <el-col :span="8">残片材质: {{ detailData.Material }}</el-col>
          <el-col :span="8">残片形状：{{ detailData.Shape }}</el-col>
        </el-row>
        <el-row class="el-row-style">
          <el-col :span="8">残片厚度：{{ detailData.thickness }}</el-col>
          <el-col :span="8">备注：{{ detailData.note }}</el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 样本 -->
    <el-card shadow="hover" class="el-row-style">
      <div slot="header">
        <span>已核准样本信息</span>
      </div>
      <div v-loading="loading">
        <div 
          v-for="(item, index) in devSampleList"
          :key="'appearance' + index">
          <el-button 
           type="text"
           @click="handleDetail(index)">
            {{ item.devPartSample.id }} - {{ item.devPartSample.sname }} ———— {{ item.synScore }}
          </el-button>
        </div>
        <hr>
        <div v-if="currentSampleInfo.sname">
          <el-row class="el-row-style">
            <el-col :span="8">样本编号: {{ currentSampleInfo.id }}</el-col>
            <el-col :span="8">样本名称：{{ currentSampleInfo.sname }}</el-col>
            <el-col :span="8">样本类型：{{ currentSampleInfo.sampleType }}</el-col>
          </el-row>
          <el-row class="el-row-style">
            <el-col :span="8">样本产地：{{ currentSampleInfo.Origin }}</el-col>
            <el-col :span="8">样本厂家：{{ currentSampleInfo.Factory }}</el-col>
            <el-col :span="8">录入日期：{{ currentSampleInfo.inputDate }}</el-col>
          </el-row>
          <el-row class="el-row-style">
            <el-col :span="8">样本型号：{{ currentSampleInfo.Model }}</el-col>
            <el-col :span="8">样本商标: {{ currentSampleInfo.Logo }}</el-col>
            <el-col :span="8">样本功能：{{ currentSampleInfo.function }}</el-col>
          </el-row>
          <el-row class="el-row-style">
            <el-col :span="8">样本颜色：{{ currentSampleInfo.Color }}</el-col>
            <el-col :span="8">样本材质: {{ currentSampleInfo.Material }}</el-col>
            <el-col :span="8">样本形状：{{ currentSampleInfo.Shape }}</el-col>
          </el-row>
          <el-row class="el-row-style">
            <el-col :span="8">样本厚度：{{ currentSampleInfo.thickness }}</el-col>
            <el-col :span="8">备注：{{ currentSampleInfo.note }}</el-col>
          </el-row>
        </div>
      </div>
    </el-card>

    <el-card 
      shadow="hover" 
      class="el-row-style"
      v-if="showImg"
      v-loading="loadingImg">
      <!-- v-if="shapeData"> -->
        <div v-if="expertShapeOpinion">
          专家意见：
          {{ expertShapeOpinion }}
          <hr>
        </div>
        形态匹配综合得分：{{ devShapeMultiMatch.Score }}

        <el-row>
          <el-col :span="18">
            <img id="ImgSample">
            <!-- <img 
              id="ImgSample"
              width="800px"
              :src="eviType == 3 
                ? baseURL + shapeData.devShapeSample.srcImgRelURL.slice(11)
                : baseURL + shapeData.oPartImgSample.srcImgRelURL.slice(11)"> -->
          </el-col>
          <el-col :span="6">
            <img id="ImgEvidence">
            <!-- <img 
              id="ImgEvidence"
              width="400px"
              :src="eviType == 3 
                ? baseURL + shapeData.devShapeEvi.srcImgRelURL.slice(11) 
                : baseURL + shapeData.oPartImgEvi.srcImgRelURL.slice(11)"> -->
          </el-col>
        </el-row>

    </el-card>

    <!-- 成分 -->
    <el-card 
      shadow="hover" 
      class="el-row-style"
      v-if="FTIRdata.id || Ramandata.id || XRFdata.id">

      <div v-if="expertCompOpinion">
        专家意见：
        {{ expertCompOpinion }}
        <hr>
      </div>
      成分匹配综合得分：{{ devCompMatch.Score }}
      <div> - </div>

      <div v-if="FTIRdata.id">
        >> FTIR匹配得分：{{ FTIRdata.Score }}
        <TabChart
          detection-type="FTIR"
          evi-type="explosive"
          :series-data = "FTIRdata.devEviFTIRTestFile"
          :sample-data = "FTIRdata.devPartSampleFTIRTestFile"
          distance-data = 2>
        </TabChart>
        <hr>
      </div>

      <div v-if="Ramandata.id">
        >> Raman匹配得分：{{ Ramandata.Score }}
        <TabChart
          detection-type="Raman"
          evi-type="explosive"
          :series-data = "Ramandata.devEviRamanTestFile"
          :sample-data = "Ramandata.devPartSampleRamanTestFile"
          distance-data = 0.2>
        </TabChart>
        <hr>
      </div>

      <div v-if="XRFdata.id">
        >> XRF匹配得分：{{ XRFdata.averScore }}
        <TabColumn
          evi-type="explosive"
          :series-data = "XRFdata.devEviXRFTestFile"
          :sample-data = "XRFdata.devPartSampleXRFTestFile">
        </TabColumn>
        <hr>
      </div>

    </el-card>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <el-col :span="22">
          <goback-button @goback-confirm="goBcak"></goback-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDevSynMatchsInfo } from '@/api/match-device'
import GobackButton from '@/components/Buttons/goback-button'
import TabChart from '@/components/ResultTab/result-tab-chart'
import TabColumn from '@/components/ResultTab/result-tab-column'
// import TabChart from '@/views/result/explosive-result/result-tab-chart'
// import TabColumn from '@/views/result/explosive-result/result-tab-column'

export default {
  name: 'DeviceDetail',
  data() {
    return {
      loading: false,
      loadingImg: false,
      loadingChart: false,
      showImg: false,
      baseURL: 'http://10.112.99.172:8001',
      detailData: {
        user: {}
      },
      eviType: 0,
      devSampleList: [],
      currentSampleInfo: {},
      devShapeMultiMatch: {},
      devCompMatch: {},
      expertShapeOpinion: '',
      expertCompOpinion: '',
      shapeData: null,
      FTIRdata: {
        Score: null,
        devEviFTIRTestFile: {},
        devPartSampleFTIRTestFile: {},
      },
      Ramandata: {
        Score: null,
        devEviRamanTestFile: {},
        devPartSampleRamanTestFile: {},
      },
      XRFdata: {
        Score: null,
        devEviXRFTestFile: {},
        devPartSampleXRFTestFile: {},
      },
      tableParams: {
        search: null,
        page: 1,
        page_size: 20,
        count: 1,
        devEvi_id: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
    ])
  },
  components: {
    GobackButton,
    TabChart,
    TabColumn
  },
  mounted() {
    this.tableParams.devEvi_id = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getDevSynMatchsInfo(this.$route.params.id).then(res => {
        this.detailData = res.devEvi
        this.eviType = res.devEvi.eviType
        if(Array.isArray(res.devSampleList)) {
          this.devSampleList = res.devSampleList
        } else {
          this.devSampleList = [res.devSampleList]
        }
        this.loading = false
      }).catch(err => {
        this.$message({
          message: '物证未生成研判结果报告',
          type: 'error'
        })
      })
    },
    initData() {
      this.shapeData = null
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
    },
    handleDetail(index) {
      this.initData()

      this.showImg = true
      this.loadingImg = true

      this.$nextTick(() => {
        let ImgSample = document.getElementById('ImgSample')
        let ImgEvidence = document.getElementById('ImgEvidence')

        console.log('ImgSample: ', ImgSample)

        ImgSample.style.width = "960px"
        ImgEvidence.style.width = "320px"

        this.currentSampleInfo = this.devSampleList[index].devPartSample

        if(this.devSampleList[index].devShapeMultiMatchList) {
          this.devShapeMultiMatch = this.devSampleList[index].devShapeMultiMatchList
          this.expertShapeOpinion = this.devSampleList[index].devShapeMultiMatchList.expertShapeOpinion
          this.shapeData = this.eviType == 3 
            ? this.devSampleList[index].devShapeMultiMatchList.devShapeMatchList 
            : this.devSampleList[index].devShapeMultiMatchList.opartMatchList

          ImgSample.src = this.eviType == 3 
            ? this.baseURL + this.shapeData.devShapeSample.srcImgRelURL.slice(11)
            : this.baseURL + this.shapeData.oPartImgSample.srcImgRelURL.slice(11)
          ImgEvidence.src = this.eviType == 3 
            ? this.baseURL + this.shapeData.devShapeEvi.srcImgRelURL.slice(11)
            : this.baseURL + this.shapeData.oPartImgEvi.srcImgRelURL.slice(11)

          ImgSample.onload = () => {
            console.log('ImgSample.naturalWidth: ', ImgSample.naturalWidth)
            if(ImgSample.naturalWidth < 960) {
              ImgSample.style.width = ImgSample.naturalWidth + 'px'
            }
            this.loadingImg = false
          }
          ImgEvidence.onload = () => {
            console.log('ImgEvidence.naturalWidth: ', ImgEvidence.naturalWidth)
            if(ImgEvidence.naturalWidth < 320) {
              ImgEvidence.style.width = ImgEvidence.naturalWidth + 'px'
            }
            this.loadingImg = false
          }
        }
      })


      if(this.devSampleList[index].devCompMatchList) {
        this.devCompMatch = this.devSampleList[index].devCompMatchList
        this.expertCompOpinion = this.devSampleList[index].devCompMatchList.expertCompOpinion

        if(this.devSampleList[index].devCompMatchList.devEviFTIR) {
          this.FTIRdata = this.devSampleList[index].devCompMatchList.devEviFTIR
        }
        if(this.devSampleList[index].devCompMatchList.devEviRaman) {
          this.Ramandata = this.devSampleList[index].devCompMatchList.devEviRaman
        }
        if(this.devSampleList[index].devCompMatchList.devEviXRF) {
          this.XRFdata = this.devSampleList[index].devCompMatchList.devEviXRF
        }
      }
    },
    /** 页面操作按键 */
    goBcak() {
      this.$router.push('/result/explosiveResult/explosiveList/')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
