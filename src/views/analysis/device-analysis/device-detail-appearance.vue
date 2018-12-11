<template>
  <div class="app-main-container">
    <el-card shadow="hover" class="el-row-style">
      <el-tabs 
        type="border-card"
        v-model="activeTabName"
        @tab-click="handleTabClick">

        <el-tab-pane 
          v-for="detectionTypeItem in detectionTypeList"
          :key="detectionTypeItem"
          :label="detectionTypeItem"
          :name="detectionTypeItem">
          <AnalysisTab 
            :isImgTab="isImgTab"
            :detectionType="detectionTypeItem">
          </AnalysisTab>
        </el-tab-pane>
        
      </el-tabs>
    </el-card>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <goback-button @goback-confirm="goBcak"></goback-button>
    </el-card>
    <!-- <el-button type="primary" @click="analysisAppearanceCompare">AppearanceCompare</el-button> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GobackButton from '@/components/Buttons/goback-button'
import AnalysisTab from '@/components/AnalysisTab/analysis-tab'

export default {
  name: 'AnalysisDeviceDetailAppearance',
  data() {
    return {
      activeTabName: "1",
      isImgTab: true,
      detectionTypeList: ['1', '2', '3', '4'],
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
    // analysisAppearanceCompare() {
    //   this.$router.push('/analysis/deviceAnalysis/deviceAppearanceCompare')
    // },
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
