<template>
  <div class="app-main-container">
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>残片基本信息</span>
          </div>
          <div v-loading="loading">
            <el-row class="el-row-style">
              <el-col :span="8">残片编号: {{ detailData.id }}</el-col>
              <el-col :span="8">残片名称：{{ detailData.evidenceName }}</el-col>
              <el-col :span="8">案件名称：{{ detailData.caseName }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">残片类型: {{ detailData.eviType }}</el-col>
              <el-col :span="8">录入日期：{{ detailData.inputDate }}</el-col>
              <el-col :span="8">录入人员：{{ detailData.user.name }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">残片厂家：{{ detailData.Factory }}</el-col>
              <el-col :span="8">残片型号：{{ detailData.Model }}</el-col>
              <el-col :span="8">残片商标: {{ detailData.Logo }}</el-col>
              
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">残片颜色：{{ detailData.Color }}</el-col>
              <el-col :span="8">残片材质: {{ detailData.Material }}</el-col>
              <el-col :span="8">残片形状：{{ detailData.Shape }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">残片厚度：{{ detailData.thickness }}</el-col>
              <el-col :span="8">备注：{{ detailData.note }}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="hover" class="el-row-style" v-if="shapeList.length > 0">
      <el-tabs 
        v-loading="loading"
        type="border-card"
        v-model="activeImgTabName"  
        @tab-click="handleImgTabClick">
        <!-- activeTabName与name绑定, label只是标签页的标题-->
        <el-tab-pane
          v-for="dataItem in shapeList"
          :key="dataItem.tabID"
          :label="dataItem.tabID"
          :name="dataItem.id.toString()">
          <tab-img
            :data-item="dataItem">
          </tab-img>
        </el-tab-pane>
      </el-tabs>
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
        
      </el-tabs>
    </el-card>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <el-col :span="22">
          <goback-button @goback-confirm="goBcak"></goback-button>
        </el-col>
        <el-col :span="2">
          <!-- <el-button 
            type="primary" 
            @click="update"
            icon="el-icon-edit"
            plain>
            修改
          </el-button> -->
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDevEviInfo } from '@/api/evidence-device'
import GobackButton from '@/components/Buttons/goback-button'
import TabImg from '@/views/evidence-management/device-evidence/device-tab-img'
import TabIngredient from '@/components/DetailTab/tab-ingredient'

export default {
  name: 'DeviceDetail',
  data() {
    return {
      loading: false,
      loadingChart: false,
      detailData: {
        user: {}
      },
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
      activeImgTabName: "",
      activeTabName: "FTIRtab",
      shapeList: [],
      canvasList: []
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
    TabImg,
    TabIngredient,
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getDevEviInfo(this.$route.params.id).then(res => {
        this.loading = true
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
        if(this.detailData.devShapeEvi.length) {
          this.shapeList = this.detailData.devShapeEvi
        }
        if(this.detailData.oPartImgEvi) {
          this.shapeList = this.detailData.oPartImgEvi
        }
        if(this.shapeList.length > 0) {
          let tabID = 1
          this.shapeList.forEach((val) => {
            val.tabID = tabID.toString()
            tabID++
            console.log('- - DeviceDetailAppearance - - shapeList id tabID:', val.id, val.tabID)
          })
          this.activeImgTabName = this.shapeList[0].id.toString()
        }
        this.loading = false
        this.loadingChart = true
      }).catch(err => {
        this.$message({
          message: '获取残片信息错误' + err.message,
          type: 'error',
          duration: 6 * 1000
        })
      })
    },
    handleImgTabClick(tab, event) {
      // console.log('- - Detail - - handleTabClick tab: ', tab.index, tab._props.label, tab._props.name)
      // console.log('- - Detail - - handleTabClick activeTabName: ', this.activeTabName)
    },
    handleTabClick(tab, event) {
      // console.log('- - Detail - - handleTabClick tab: ', tab.index, tab._props.label, tab._props.name)
      // console.log('- - Detail - - handleTabClick activeTabName: ', this.activeTabName)
    },

    /** 页面操作按键 */
    goBcak() {
      this.$router.push('/evidenceManagement/deviceEvidence/deviceIndexList/deviceList')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
