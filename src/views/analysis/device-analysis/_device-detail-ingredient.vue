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
      <goback-button @goback-confirm="goBcak"></goback-button>
    </el-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GobackButton from '@/components/Buttons/goback-button'
import AnalysisTab from '@/components/AnalysisTab/analysis-tab'

export default {
  name: 'AnalysisDeviceDetailIngredient',
  data() {
    return {
      activeTabName: "FTIR",
      detectionTypeList: ['FTIR', 'RAMAN', 'XRF', 'Summary'],
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
    AnalysisTab,
  },
  methods: {
    handleTabClick(tab, event) {
      console.log('- - AnalysisDeviceDetailIngredient - - handleTabClick tab: ', tab.index, tab._props.label, tab._props.name)
      console.log('- - AnalysisDeviceDetailIngredient - - handleTabClick activeTabName: ', this.activeTabName)
    },

    /** */
    goBcak() {
      this.$router.go(-1)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
