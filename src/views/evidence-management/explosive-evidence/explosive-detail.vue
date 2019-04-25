<template>
  <div class="app-main-container">

    <el-card shadow="hover" class="el-row-style">
      <div slot="header">
        <span>炸药与原材料基本信息</span>
      </div>
      <div v-loading="loading">
        <el-row class="el-row-style">
          <el-col :span="8">物证编号: {{ detailData.id }}</el-col>
          <el-col :span="8">物证名称：{{ detailData.evidenceName }}</el-col>
          <el-col :span="8">物证缩写：{{ detailData.caseName }}</el-col>
        </el-row>
        <el-row class="el-row-style">
          <el-col :span="8">处理人员：{{ detailData.user.name }}</el-col>
          <el-col :span="8">录入日期：{{ detailData.inputDate }}</el-col>
          <el-col :span="8">备注：{{ detailData.note }}</el-col>
        </el-row>
      </div>
    </el-card>

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

        <el-tab-pane label="XRD" name="XRDtab">
          <div v-if = "loadingChart">
            <tab-ingredient
              data-type="XRD"
              :ingredient-data="XRDdata">
            </tab-ingredient>
          </div>
        </el-tab-pane>

        <el-tab-pane label="GCMS" name="GCMStab">
          <!-- <chart-curve></chart-curve> -->
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
import { getExplosiveEviInfo } from '@/api/evidence-explosive'
import GobackButton from '@/components/Buttons/goback-button'
import SubmitButton from '@/components/Buttons/submit-button'
import PaginationFiles from '@/components/PaginationFiles'
import TabIngredient from '@/components/DetailTab/tab-ingredient'

export default {
  name: 'ExplosiveDetail',
  data() {
    return {
      routeParams: null,
      loading: false,
      loadingChart: false,
      detailData: {
        user: { }
      },
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
      XRDdata: {
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
    console.log('- - ExplosiveDetail - - $route.params: ', this.$route.params.id)
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
        this.username = this.detailData.user.username
        // console.log('---- ExplosiveDetail ---- this.detailData: ', this.detailData)
        // console.log('---- ExplosiveDetail ---- this.detailData: ', this.detailData.exploSampleFTIR[0].exploSampleFTIRTestFile)
        this.loading = false
        this.loadingChart = true
      }).catch(err => {
        this.$message({
          message: '获取物证信息错误' + err.message,
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
      this.$router.push('/evidenceManagement/explosiveEvidence/explosiveIndexList/explosiveUpdate/' + this.$route.params.id)
    },
    goBcak() {
      this.$router.push('/evidenceManagement/explosiveEvidence/explosiveIndexList/explosiveList')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
