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
