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
            <tab-ingredient
              data-type="FTIR"
              :ingredient-data="FTIRdata">
            </tab-ingredient>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Raman" name="Ramantab">
          <div v-if = "loadingChart">
            <tab-ingredient
              data-type="Raman"
              :ingredient-data="Ramandata">
            </tab-ingredient>
          </div>
        </el-tab-pane>

        <el-tab-pane label="XRF" name="XRFtab">
          <div v-if = "loadingChart">
            <tab-ingredient
              data-type="XRF"
              :ingredient-data="XRFdata">
            </tab-ingredient>
          </div>
        </el-tab-pane>
        
      </el-tabs>
    </el-card>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <el-col :span="22">
          <goback-button @goback-confirm="goBcak"></goback-button>
        </el-col>
        <el-col :span="2">
          <el-button 
            type="primary" 
            @click="update"
            icon="el-icon-edit"
            plain>
            修改
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDevPartSampleInfo } from '@/api/sample-device'
import GobackButton from '@/components/Buttons/goback-button'
import SubmitButton from '@/components/Buttons/submit-button'
import PaginationFiles from '@/components/PaginationFiles'
import TabIngredient from '@/components/DetailTab/tab-ingredient'

export default {
  name: 'DeviceDetailIngredient',
  data() {
    return {
      routeParams: null,
      loading: false,
      loadingChart: false,
      detailData: {},
      username: '',
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
      activeTabName: "FTIRtab"
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
    SubmitButton,
    PaginationFiles,
    TabIngredient,
  },
  mounted() {
    this.routeParams = this.$route.params
    console.log('- - DeviceDetailIngredient - - $route.params: ', this.$route.params.id)
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getDevPartSampleInfo(this.$route.params.id).then(res => {
        this.detailData = res
        /** 先检查有没有检测信息,再赋数据值 */
        if (this.detailData.devPartSampleFTIR.length) {
          this.FTIRdata.dataInfo = this.detailData.devPartSampleFTIR[0]
          this.FTIRdata.seriesData = this.detailData.devPartSampleFTIR[0].devPartSampleFTIRTestFile
        }
        if (this.detailData.devPartSampleRaman.length) {
          this.Ramandata.dataInfo = this.detailData.devPartSampleRaman[0]
          this.Ramandata.seriesData = this.detailData.devPartSampleRaman[0].devPartSampleRamanTestFile
        }
        if (this.detailData.devPartSampleXRF.length) {
          this.XRFdata.dataInfo = this.detailData.devPartSampleXRF[0]
          this.XRFdata.seriesData = this.detailData.devPartSampleXRF[0].devPartSampleXRFTestFile
        }
        this.username = this.detailData.user.username
        // console.log('---- DeviceDetailIngredient ---- this.detailData: ', this.detailData)
        // console.log('---- DeviceDetailIngredient ---- this.detailData: ', this.detailData.exploSampleFTIR[0].exploSampleFTIRTestFile)
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
      console.log('- - Detail - - handleTabClick tab: ', tab.index, tab._props.label, tab._props.name)
      console.log('- - Detail - - handleTabClick activeTabName: ', this.activeTabName)
    },

    /** 页面操作按键 */
    update() {
      this.$router.push('/sampleManagement/explosiveSample/explosiveIndexList/explosiveUpdate/' + this.$route.params.id)
    },
    goBcak() {
      this.$router.push('/sampleManagement/explosiveSample/explosiveIndexList/explosiveList')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
