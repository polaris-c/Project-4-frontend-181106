<template>
  <div class="app-main-container">
    <el-card shadow="hover" class="el-row-style">
      <el-tabs 
        v-if="eviType > 0"
        type="border-card"
        v-model="activeTabName"
        @tab-click="handleTabClick">

        <el-tab-pane 
          v-for="dataItem in dataList"
          :key="dataItem.tabID"
          :label="dataItem.tabID"
          :name="dataItem.id.toString()">
          <DeviceAppearanceTab 
            :dataItem="dataItem"
            :eviType="eviType">
          </DeviceAppearanceTab>
        </el-tab-pane>

        <el-tab-pane
          label="Summary"
          name="Summary">
          <DeviceAppearanceSummary
            :eviType="eviType">
          </DeviceAppearanceSummary>
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
import DeviceAppearanceTab from '@/views/analysis/device-analysis/device-appearance-tab'
import DeviceAppearanceSummary from '@/views/analysis/device-analysis/device-appearance-summary'
import { getDevEviInfo } from '@/api/evidence-device'

export default {
  name: 'AnalysisDeviceDetailAppearance',
  data() {
    return {
      loading: false,
      eviType: 0,
      activeTabName: "1",
      dataList: [],
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
    DeviceAppearanceTab,
    DeviceAppearanceSummary
  },
  mounted() {
    console.log('- - AnalysisDeviceDetailAppearance - - $route.params.id:', this.$route.params.id)
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getDevEviInfo(this.$route.params.id).then(res => {
        console.log('- - AnalysisDeviceDetailAppearance - - res:', res)
        this.eviType = res.eviType
        if(res.devShapeEvi.length) {
          this.dataList = res.devShapeEvi
        }
        if(res.oPartImgEvi.length) {
          this.dataList = res.oPartImgEvi
        }
        if(this.dataList.length > 0) {
          let tabID = 1
          this.dataList.forEach(val => {
            val.tabID = tabID.toString()
            tabID++
            console.log('- - AnalysisDeviceDetailAppearance - - dataList id tabID:', val.id, val.tabID)
          })
          this.activeTabName = this.dataList[0].id.toString()
        }
        this.loading = false
      }).catch(err => {
        this.$message({
          message: '获取残片信息错误' + err.message,
          type: 'error',
          duration: 6 * 1000
        })
      })
    },
    // analysisAppearanceCompare() {
    //   this.$router.push('/analysis/deviceAnalysis/deviceAppearanceCompare')
    // },
    handleTabClick(tab, event) {
      console.log('- - AnalysisDeviceDetailAppearance - - handleTabClick tab: ', tab.index, tab._props.label, tab._props.name)
      console.log('- - AnalysisDeviceDetailAppearance - - handleTabClick activeTabName: ', this.activeTabName)
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
