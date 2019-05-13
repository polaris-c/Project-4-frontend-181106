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
              evi-type="device"
              data-type="FTIR"
              :ingredient-data="FTIRdata">
            </analysis-tab-ingredient>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Raman" name="Ramantab">
          <div v-if = "loadingChart">
            <analysis-tab-ingredient
              evi-type="device"
              data-type="Raman"
              :ingredient-data="Ramandata">
            </analysis-tab-ingredient>
          </div>
        </el-tab-pane>

        <el-tab-pane label="XRF" name="XRFtab">
          <div v-if = "loadingChart">
            <analysis-tab-ingredient
              evi-type="device"
              data-type="XRF"
              :ingredient-data="XRFdata">
            </analysis-tab-ingredient>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Summary" name="Summarytab">
          <div v-if = "loadingChart">
            <analysis-tab-summary
              evi-type="device"
              data-type="Summary">
            </analysis-tab-summary>
          </div>
        </el-tab-pane>
        
      </el-tabs>
    </el-card>

    <el-card shadow="hover" class="el-row-style" v-if="role !== 3">
      <div>专家意见：</div>
      <hr>
      <el-input 
        v-model="expertOpinion"
        :rows="6"
        type="textarea"
        placeholder="请输入...">
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
import { getDevEviInfo } from '@/api/evidence-device'
import GobackButton from '@/components/Buttons/goback-button'
import ReportButton from '@/components/Buttons/report-button'
import MessageButton from '@/components/Buttons/message-button'
import AnalysisTabIngredient from '@/components/AnalysisTab/analysis-tab-ingredient'
import AnalysisTabSummary from '@/components/AnalysisTab/analysis-tab-summaryD'

export default {
  name: 'AnalysisDeviceDetailIngredient',
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
      expertOpinion: ''  // 专家核准意见
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
    console.log('- - AnalysisDeviceDetailIngredient - - $route.params: ', this.$route.params.id)
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getDevEviInfo(this.$route.params.id).then(res => {
        this.detailData = res
        /** 先检查有没有检测信息,再赋数据值 */
        if (this.detailData.devEviFTIR.length) {
          this.FTIRdata.dataInfo = this.detailData.devEviFTIR[0]
          this.FTIRdata.seriesData = this.detailData.devEviFTIR[0].devEviFTIRTestFile
        }
        if (this.detailData.devEviRaman.length) {
          this.Ramandata.dataInfo = this.detailData.devEviRaman[0]
          this.Ramandata.seriesData = this.detailData.devEviRaman[0].devEviRamanTestFile
        }
        if (this.detailData.devEviXRF.length) {
          this.XRFdata.dataInfo = this.detailData.devEviXRF[0]
          this.XRFdata.seriesData = this.detailData.devEviXRF[0].devEviXRFTestFile
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
      console.log('- - AnalysisDeviceDetailIngredient - - handleTabClick tab: ', tab.index, tab._props.label, tab._props.name)
      console.log('- - AnalysisDeviceDetailIngredient - - handleTabClick activeTabName: ', this.activeTabName)
    },

    /** */
    handleReport() {
    },
    handleMessage() {
      // this.$router.push('/message/messageCreation')
      this.$router.push({ 
        name: 'MessageCreation', 
        params: { 
          evidenceType: 'device',
          evidenceID: this.$route.params.id,
        }
      }) 
    },
    goBcak() {
      this.$router.push('/analysis/deviceAnalysis/deviceList')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
