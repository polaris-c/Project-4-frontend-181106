<template>
  <div class="app-main-container">

    <el-card shadow="hover" class="el-row-style">
      <div slot="header">
        <span>炸药与原材料基本信息</span>
      </div>
      <div>
        <!-- <div>route.params: {{ routeParams }}</div> -->
        <el-row>
          <el-col :span="8">样本编号: {{ detailData.id }}</el-col>
          <el-col :span="8">样本名称：{{ detailData.sname }}</el-col>
          <el-col :span="8">样本缩写：{{ detailData.snameAbbr }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">样本产地：{{ detailData.sampleOrigin }}</el-col>
          <el-col :span="8">样本厂家：{{ detailData.factory }}</el-col>
          <el-col :span="8">处理人员：{{ detailData.user }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">录入日期：{{ detailData.inputDate }}</el-col>
          <el-col :span="8">备注：{{ detailData.note }}</el-col>
        </el-row>
      </div>
    </el-card>

    <el-card shadow="hover" class="el-row-style">
      <el-tabs 
        type="border-card"
        v-model="activeTabName"
        @tab-click="handleTabClick">
        <el-tab-pane label="FTIR" name="FTIRtab" >
          <test-chart></test-chart>
        </el-tab-pane>
        <el-tab-pane label="RAMAN" name="RAMANtab">RAMAN</el-tab-pane>
        <el-tab-pane label="XRF" name="XRFtab">XRF</el-tab-pane>
        <el-tab-pane label="XRD" name="XRDtab">XRD</el-tab-pane>
        <el-tab-pane label="GCMS" name="GCMStab">GCMS</el-tab-pane>
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
import GobackButton from '@/components/Buttons/goback-button'
import SubmitButton from '@/components/Buttons/submit-button'
import TestChart from '@/components/Charts/test-chart'

export default {
  name: 'DeviceDetail',
  data() {
    return {
      routeParams: null,
      detailData: {
        id: '001',
        sname: 'A001',
        snameAbbr: 'A1',
        sampleOrigin: 'AP',
        factory: 'AF',
        user: 'user001',
        inputDate: '2018-11-19',
        note: '1111'
      },
      activeTabName: "FTIRtab"
    }
  },
  components: {
    GobackButton,
    SubmitButton,
    TestChart,
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
  watch: {
    $route() {
      this.routeParams = this.$route.params
      console.log('- - - - detail route.params: ', this.$route.params.id)
    }
  },
  mounted() {
    this.routeParams = this.$route.params
    console.log('- - - - detail route.params: ', this.$route.params.id)
  },
  methods: {
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
