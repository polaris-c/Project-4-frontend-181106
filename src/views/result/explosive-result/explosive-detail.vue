<template>
  <div class="app-main-container">

    <!-- 物证 -->
    <el-card shadow="hover" class="el-row-style">
      <div slot="header">
        <span>炸药与原材料基本信息</span>
      </div>
      <div v-loading="loading">
        <el-row class="el-row-style">
          <el-col :span="8">物证编号: {{ detailData.id }}</el-col>
          <el-col :span="8">物证名称：{{ detailData.evidenceName }}</el-col>
          <el-col :span="8">案件名称：{{ detailData.caseName }}</el-col>
        </el-row>
        <el-row class="el-row-style">
          <el-col :span="8">处理人员：{{ }}</el-col>
          <el-col :span="8">录入日期：{{ detailData.inputDate }}</el-col>
          <el-col :span="8">备注：{{ detailData.note }}</el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 样本 -->
    <el-card shadow="hover" class="el-row-style">
      <div slot="header">
        <span>核准样本信息</span>
      </div>
      <div v-loading="loading">
        <div 
          v-for="(item, index) in exploSynMatchList"
          :key="index">
          <el-button 
           type="text"
           @click="handleDetail(index)">
            {{ item.exploSample.id }} - {{ item.exploSample.sname }} ———— {{ item.Score }}
          </el-button>
        </div>
        <hr>
        <div v-if="currentSampleInfo.sname">
          <el-row class="el-row-style">
            <el-col :span="8">样本编号: {{ currentSampleInfo.id }}</el-col>
            <el-col :span="8">样本名称：{{ currentSampleInfo.sname }}</el-col>
            <el-col :span="8">样本缩写：{{ currentSampleInfo.snameAbbr }}</el-col>
          </el-row>
          <el-row class="el-row-style">
            <el-col :span="8">样本产地：{{ currentSampleInfo.sampleOrigin }}</el-col>
            <el-col :span="8">样本厂家：{{ currentSampleInfo.factory }}</el-col>
            <el-col :span="8">录入日期：{{ currentSampleInfo.inputDate }}</el-col>
          </el-row>
          <el-row class="el-row-style">
            <el-col :span="8">备注：{{ currentSampleInfo.note }}</el-col>
          </el-row>
        </div>
        <div v-if="currentExpertOpinion">
          <hr>
          专家意见： {{ currentExpertOpinion }}
        </div>
        
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
        :series-data = "FTIRdata.exploEviFTIRTestFile"
        :sample-data = "FTIRdata.exploSampleFTIRTestFile"
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
        :series-data = "Ramandata.exploEviRamanTestFile"
        :sample-data = "Ramandata.exploSampleRamanTestFile"
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
        :series-data = "XRFdata.exploEviXRFTestFile"
        :sample-data = "XRFdata.exploSampleXRFTestFile">
      </TabColumn>
    </el-card>

    <!-- XRD -->
    <el-card 
      shadow="hover" 
      class="el-row-style"
      v-if="XRDdata.id">
      匹配得分：{{ XRDdata.Score }}
      <TabChart
        detection-type="XRD"
        evi-type="explosive"
        :series-data = "XRDdata.exploEviXRDTestFile"
        :sample-data = "XRDdata.exploSampleXRDTestFile"
        distance-data = 30>
      </TabChart>
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
import { getExploReportMatchsList, getExploReportMatchsInfo } from '@/api/match-explosive'
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
      exploSynMatchList: [],
      eviData: {},
      currentSampleData: {},
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
      tableParams: {
        search: null,
        page: 1,
        page_size: 20,
        exploEvi_id: null,
        count: 1,
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
    this.tableParams.exploEvi_id = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getExploReportMatchsInfo(this.$route.params.id).then(res => {
        this.detailData = res.exploEvi
        if(Array.isArray(res.exploSynMatchList)) {
          this.exploSynMatchList = res.exploSynMatchList
        } else {
          this.exploSynMatchList = [res.exploSynMatchList]
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
    handleDetail(index) {
      this.initData()
      // console.log(this.exploSynMatchList[index].id, this.exploSynMatchList)
      this.currentSampleInfo = this.exploSynMatchList[index].exploSample
      this.currentExpertOpinion = this.exploSynMatchList[index].expertOpinion
      if(this.exploSynMatchList[index].exploEviFTIR) {
        this.FTIRdata = this.exploSynMatchList[index].exploEviFTIR
      }
      if(this.exploSynMatchList[index].exploEviRaman) {
        this.Ramandata = this.exploSynMatchList[index].exploEviRaman
      }
      if(this.exploSynMatchList[index].exploEviXRF) {
        this.XRFdata = this.exploSynMatchList[index].exploEviXRF
      }
      if(this.exploSynMatchList[index].exploEviXRD) {
        this.XRDdata = this.exploSynMatchList[index].exploEviXRD
      }
      this.exploSynMatchList.find(match => {
        return match.id == this.exploSynMatchList[index].id
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
