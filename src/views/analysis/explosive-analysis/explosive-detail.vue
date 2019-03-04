<template>
  <div class="app-main-container">

    <el-card shadow="hover" class="el-row-style">
      <el-tabs 
        type="border-card"
        v-model="activeTabName"
        @tab-click="handleTabClick">

        <!-- <el-tab-pane label="FTIR" name="FTIRtab" >
          <AnalysisTab detectionType="FTIR"></AnalysisTab>
        </el-tab-pane> -->
        
        <el-tab-pane 
          v-for="detectionTypeItem in detectionTypeList"
          :key="detectionTypeItem"
          :label="detectionTypeItem"
          :name="detectionTypeItem">
          <!-- 标签页内容 -->
          <AnalysisTab :detectionType="detectionTypeItem"></AnalysisTab>
        </el-tab-pane>
        
      </el-tabs>
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
import GobackButton from '@/components/Buttons/goback-button'
import ReportButton from '@/components/Buttons/report-button'
import MessageButton from '@/components/Buttons/message-button'
import AnalysisTab from '@/components/AnalysisTab/analysis-tab'

export default {
  name: 'AnalysisExplosiveDetail',
  data() {
    return {
      activeTabName: "FTIR",
      detectionTypeList: ['FTIR', 'RAMAN', 'XRF', 'XRD', 'GCMS', 'Summary'],
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sidebar',
      'device',
      'token',
      'avatar',
    ])
  },
  components: {
    GobackButton,
    ReportButton,
    MessageButton,
    AnalysisTab,
  },
  methods: {
        fetchData() {
      this.loading = true
      getExplosiveSampleInfo(this.$route.params.id).then(res => {
        this.detailData = res
        /** 先检查有没有检测信息,再赋数据值 */
        if (this.detailData.exploSampleFTIR.length) {
          this.FTIRdata.dataInfo = this.detailData.exploSampleFTIR[0]
          this.FTIRdata.seriesData = this.detailData.exploSampleFTIR[0].exploSampleFTIRTestFile
        }
        if (this.detailData.exploSampleRaman.length) {
          this.Ramandata.dataInfo = this.detailData.exploSampleRaman[0]
          this.Ramandata.seriesData = this.detailData.exploSampleRaman[0].exploSampleRamanTestFile
        }
        if (this.detailData.exploSampleXRF.length) {
          this.XRFdata.dataInfo = this.detailData.exploSampleXRF[0]
          this.XRFdata.seriesData = this.detailData.exploSampleXRF[0].exploSampleXRFTestFile
        }
        if (this.detailData.exploSampleXRD.length) {
          this.XRDdata.dataInfo = this.detailData.exploSampleXRD[0]
          this.XRDdata.seriesData = this.detailData.exploSampleXRD[0].exploSampleXRDTestFile
        }

        // console.log('---- ExplosiveDetail ---- this.detailData: ', this.detailData)
        // console.log('---- ExplosiveDetail ---- this.detailData: ', this.detailData.exploSampleFTIR[0].exploSampleFTIRTestFile)
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

    /** */
    handleReport() {
    },
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
