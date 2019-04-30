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
          <el-col :span="8">案件名称：{{ detailData.caseName }}</el-col>
        </el-row>
        <el-row class="el-row-style">
          <el-col :span="8">处理人员：{{ }}</el-col>
          <el-col :span="8">录入日期：{{ detailData.inputDate }}</el-col>
          <el-col :span="8">备注：{{ detailData.note }}</el-col>
        </el-row>
      </div>
    </el-card>

    <el-card shadow="hover" class="el-row-style">
      <div slot="header">
        <span>匹配样本信息</span>
      </div>
      <div v-loading="loading">
        <div 
          v-for="(item, index) in exploSynMatchList"
          :key="index">
          <el-button 
           type="text"
           @click="handleDetail(index)">
            {{ item.exploSample.sname }} ———— {{ item.Score }}
          </el-button>
        </div>
      </div>
    </el-card>

    <el-card shadow="hover" class="el-row-style">

    </el-card>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <el-col :span="22">
          <goback-button @goback-confirm="goBcak"></goback-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExploReportMatchsInfo } from '@/api/match-explosive'
import GobackButton from '@/components/Buttons/goback-button'

export default {
  name: 'ExplosiveDetail',
  data() {
    return {
      loading: false,
      loadingChart: false,
      detailData: {
        user: { }
      },
      exploSynMatchList: [],
      tableParams: {
        search: null,
        page: 1,
        page_size: 20,
        count: 1,
      }
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
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData(){
      this.loading = true
      getExploReportMatchsInfo(this.$route.params.id).then(res => {
        this.detailData = res.exploEvi
        if(Array.isArray(res.exploSynMatchList)) {
          this.exploSynMatchList = res.exploSynMatchList
        } else {
          this.exploSynMatchList = [res.exploSynMatchList]
        }
        
        this.loading = false
      }).catch(err => {
        this.$message({
          message: '获取列表错误 ' + err.message,
          type: 'error'
        })
      })
    },
    handleDetail(index) {
      console.log(this.exploSynMatchList[index].id)
    },
    /** 页面操作按键 */
    goBcak() {
      this.$router.push('/result/explosiveResult/explosiveList/')
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
