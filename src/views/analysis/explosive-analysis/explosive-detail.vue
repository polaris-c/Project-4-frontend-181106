<template>
  <div class="app-main-container">

    <el-card shadow="hover" class="el-row-style">
      <el-tabs 
        v-loading="loading"
        type="border-card"
        v-model="activeTabName"
        @tab-click="handleTabClick">

        <el-tab-pane label="FTIR" name="FTIRtab" >
          <div v-if = "loadingChart">
            <analysis-tab-ingredient
              evi-type="explosive"
              data-type="FTIR"
              :ingredient-data="FTIRdata">
            </analysis-tab-ingredient>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Raman" name="Ramantab">
          <div v-if = "loadingChart">
            <analysis-tab-ingredient
              evi-type="explosive"
              data-type="Raman"
              :ingredient-data="Ramandata">
            </analysis-tab-ingredient>
          </div>
        </el-tab-pane>

        <el-tab-pane label="XRF" name="XRFtab">
          <div v-if = "loadingChart">
            <analysis-tab-ingredient
              evi-type="explosive"
              data-type="XRF"
              :ingredient-data="XRFdata">
            </analysis-tab-ingredient>
          </div>
        </el-tab-pane>

        <el-tab-pane label="XRD" name="XRDtab">
          <div v-if = "loadingChart">
            <analysis-tab-ingredient
              evi-type="explosive"
              data-type="XRD"
              :ingredient-data="XRDdata">
            </analysis-tab-ingredient>
          </div>
        </el-tab-pane>

        <el-tab-pane label="GCMS" name="GCMStab">
          <!-- <chart-curve></chart-curve> -->
        </el-tab-pane>

        <el-tab-pane label="Summary" name="Summarytab">
          <div v-if = "loadingChart">
            <analysis-tab-summary
              evi-type="explosive"
              data-type="Summary"
              :expert-opinion = "expertOpinion"
              @change-sample = "handleSampleChange">
            </analysis-tab-summary>
          </div>
        </el-tab-pane>
        
      </el-tabs>
    </el-card>

    <el-card shadow="hover" class="el-row-style" v-if="activeTabName === 'Summarytab'">
      <div>专家意见：</div>
      <hr>
      <el-input 
        v-model="expertOpinion"
        :rows="3"
        type="textarea"
        placeholder="请输入..."
        :disabled="role === 3">
      </el-input>
    </el-card>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <el-col :span="19">
          <goback-button @goback-confirm="goBcak"></goback-button>
        </el-col>
        <el-col :span="3">
          <message-button @message-confirm="handleMessage"></message-button>
        </el-col>
        <el-col :span="2">
          <report-button @report-confirm="handleReport"></report-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExplosiveEviInfo } from '@/api/evidence-explosive'
import GobackButton from '@/components/Buttons/goback-button'
import ReportButton from '@/components/Buttons/report-button'
import MessageButton from '@/components/Buttons/message-button'
import AnalysisTabIngredient from '@/components/AnalysisTab/analysis-tab-ingredient'
import AnalysisTabSummary from '@/components/AnalysisTab/analysis-tab-summary'
import { createExploReport } from '@/api/match-explosive'

export default {
  name: 'AnalysisExplosiveDetail',
  data() {
    return {
      routeParams: null,
      loading: false,
      loadingChart: false,
      detailData: {},
      FTIRdata: {
        dataInfo: {},
        seriesData: [],
      },
      Ramandata: {
        dataInfo: {},
        seriesData: [],
      },
      XRFdata: {
        dataInfo: {},
        seriesData: [],
      },
      XRDdata: {
        dataInfo: {},
        seriesData: [],
      },
      activeTabName: "FTIRtab",
      // activeTabName: "FTIR",
      // detectionTypeList: ['FTIR', 'RAMAN', 'XRF', 'XRD', 'GCMS', 'Summary'],
      expertOpinion: ' ',  // 专家核准意见
      reportData: {
        exploId: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'role',
    ])
  },
  components: {
    GobackButton,
    ReportButton,
    MessageButton,
    AnalysisTabIngredient,
    AnalysisTabSummary
  },
  mounted() {
    this.routeParams = this.$route.params
    this.reportData.exploId = this.$route.params.id
    console.log('- - AnalysisExplosiveDetail - - $route.params: ', this.$route.params.id)
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getExplosiveEviInfo(this.$route.params.id).then(res => {
        this.detailData = res
        /** 先检查有没有检测信息,再赋数据值 */
        if (this.detailData.exploEviFTIR.length) {
          this.FTIRdata.dataInfo = this.detailData.exploEviFTIR[0]
          this.FTIRdata.seriesData = this.detailData.exploEviFTIR[0].exploEviFTIRTestFile
        }
        if (this.detailData.exploEviRaman.length) {
          this.Ramandata.dataInfo = this.detailData.exploEviRaman[0]
          this.Ramandata.seriesData = this.detailData.exploEviRaman[0].exploEviRamanTestFile
        }
        if (this.detailData.exploEviXRF.length) {
          this.XRFdata.dataInfo = this.detailData.exploEviXRF[0]
          this.XRFdata.seriesData = this.detailData.exploEviXRF[0].exploEviXRFTestFile
        }
        if (this.detailData.exploEviXRD.length) {
          this.XRDdata.dataInfo = this.detailData.exploEviXRD[0]
          this.XRDdata.seriesData = this.detailData.exploEviXRD[0].exploEviXRDTestFile
        }
        this.loading = false
        this.loadingChart = true
      }).catch(err => {
        this.$message({
          message: '获取样本信息错误' + err.message,
          type: 'error',
          duration: 6 * 1000
        })
      })
    },
    handleTabClick(tab, event) {
      console.log('- - AnalysisExplosiveDetail - - handleTabClick tab: ', tab.index, tab._props.label, tab._props.name)
      console.log('- - AnalysisExplosiveDetail - - handleTabClick activeTabName: ', this.activeTabName)
    },
    handleSampleChange(expertOpinion) {
      this.expertOpinion = expertOpinion
    },

    /** 生成报告 */
    handleReport() {
      let uploadForm = new FormData()
      uploadForm.append('exploId', this.$route.params.id)
      createExploReport(uploadForm).then(res => {
        this.$message({
          message: '报告已生成 ',
          type: 'success',
          duration: 6 * 1000
        })
      })
    },
    /** 专家咨询 */
    handleMessage() {
      // this.$router.push('/message/messageCreation')
      this.$router.push({ 
        name: 'MessageCreation', 
        params: { 
          evidenceType: 'explosive',
          evidenceID: this.$route.params.id,
        }
      }) 
    },
    goBcak() {
      this.$router.push('/analysis/explosiveAnalysis/explosiveList')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
