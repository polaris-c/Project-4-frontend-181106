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
        <span>匹配样本信息</span>
      </div>
      <div v-loading="loading">
        形态：
        <div 
          v-for="(item, index) in devShapeMultiMatchList"
          :key="'appearance' + index">
          <el-button 
           type="text"
           @click="handleDetailAppearance(index)">
            {{ item.devSample.sname }} - {{ item.devPartSample.sname }} ———— {{ item.Score }}
          </el-button>
        </div>
        <hr>
        成分：
        <div 
          v-for="(item, index) in devCompMatchList"
          :key="'ingredient' + index">
          <el-button 
           type="text"
           @click="handleDetailIngredient(index)">
            {{ item.devSample.sname }} - {{ item.devPartSample.sname }} ———— {{ item.Score }}
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
        <div v-if="currentExpertOpinion">
          <hr>
          {{ currentExpertOpinion }}
        </div>
      </div>
    </el-card>

    <!-- 样本-成分 -->
    <!-- <el-card shadow="hover" class="el-row-style">
      <div slot="header">
        <span>匹配样本信息-成分</span>
      </div>
      <div v-loading="loading">
        <div 
          v-for="(item, index) in devCompMatchList"
          :key="index">
          <el-button 
           type="text"
           @click="handleDetail(index)">
            {{ item.devSample.sname }} - {{ item.devPartSample.sname }} ———— {{ item.Score }}
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
        <div v-if="currentExpertOpinion">
          <hr>
          {{ currentExpertOpinion }}
        </div>
      </div>
    </el-card> -->

    <el-card 
      shadow="hover" 
      class="el-row-style"
      v-if="shapeData.length > 0">
      <div
        v-for="(item, index) in shapeData"
        :key="item.id">
        匹配得分：{{ item.matchDegree }}
        <el-row>
          <el-col :span="16">
            <img 
              width="800px"
              height="700px"
              :src="item.oPartImgSample ? item.oPartImgSample.srcImgURL : item.devShapeSample.srcImgURL">
          </el-col>
          <el-col :span="8">
            <img 
              width="400px"
              height="350px"
              :src="item.oPartImgEvi ? item.oPartImgEvi.srcImgURL : item.devShapeEvi.srcImgURL">
          </el-col>
        </el-row>
        <hr>
      </div>
    </el-card>

    <!-- FTIR -->
    <el-card 
      shadow="hover" 
      class="el-row-style"
      v-if="FTIRdata.id">
      匹配得分：{{ FTIRdata.Score }}
      <TabChart
        detection-type="FTIR"
        evi-type="explosive"
        :series-data = "FTIRdata.devEviFTIRTestFile"
        :sample-data = "FTIRdata.devPartSampleFTIRTestFile"
        distance-data = 2>
      </TabChart>
    </el-card>

    <!-- Raman -->
    <el-card 
      shadow="hover" 
      class="el-row-style"
      v-if="Ramandata.id">
      匹配得分：{{ Ramandata.Score }}
      <TabChart
        detection-type="Raman"
        evi-type="explosive"
        :series-data = "Ramandata.devEviRamanTestFile"
        :sample-data = "Ramandata.devPartSampleRamanTestFile"
        distance-data = 0.2>
      </TabChart>
    </el-card>

    <!-- XRF -->
    <el-card 
      shadow="hover" 
      class="el-row-style"
      v-if="XRFdata.id">
      匹配得分：{{ XRFdata.averScore }}
      <TabColumn
        evi-type="explosive"
        :series-data = "XRFdata.devEviXRFTestFile"
        :sample-data = "XRFdata.devPartSampleXRFTestFile">
      </TabColumn>
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
  name: 'ExplosiveDetail',
  data() {
    return {
      loading: false,
      loadingChart: false,
      detailData: {
        user: {}
      },
      currentSampleInfo: {},
      currentExpertOpinion: '',
      devCompMatchList: [],
      devShapeMultiMatchList: [],
      shapeData: [],
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
        if(Array.isArray(res.devShapeMultiMatchList)) {
          this.devShapeMultiMatchList = res.devShapeMultiMatchList
        } else {
          this.devShapeMultiMatchList = [res.devShapeMultiMatchList]
        }
        if(Array.isArray(res.devCompMatchList)) {
          this.devCompMatchList = res.devCompMatchList
        } else {
          this.devCompMatchList = [res.devCompMatchList]
        }
        this.loading = false
      }).catch(err => {
        this.$message({
          message: '获取列表错误 ' + err.message,
          type: 'error'
        })
      })
    },
    initData() {
      this.shapeData = []
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
    handleDetailAppearance(index) {
      this.initData()
      this.currentSampleInfo = this.devShapeMultiMatchList[index].devPartSample
      this.currentExpertOpinion = this.devShapeMultiMatchList[index].expertShapeOpinion
      if(Array.isArray(this.devShapeMultiMatchList[index].devSampleList)) {
        this.shapeData = this.devShapeMultiMatchList[index].devSampleList
      } else {
        this.shapeData = [this.devShapeMultiMatchList[index].devSampleList]
      }
    },
    handleDetailIngredient(index) {
      this.initData()
      // console.log(this.devCompMatchList[index].id, this.devCompMatchList)
      this.currentSampleInfo = this.devCompMatchList[index].devPartSample
      this.currentExpertOpinion = this.devCompMatchList[index].expertCompOpinion
      if(this.devCompMatchList[index].devEviFTIR) {
        this.FTIRdata = this.devCompMatchList[index].devEviFTIR
      }
      if(this.devCompMatchList[index].devEviRaman) {
        this.Ramandata = this.devCompMatchList[index].devEviRaman
      }
      if(this.devCompMatchList[index].devEviXRF) {
        this.XRFdata = this.devCompMatchList[index].devEviXRF
      }
      this.devCompMatchList.find(match => {
        return match.id == this.devCompMatchList[index].id
      })
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
