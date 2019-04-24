<template>
  <div class="app-main-container">
    <!-- 组件基本信息 -->
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>关键组件基本信息</span>
          </div>
          <div v-loading="loading">
            <el-row class="el-row-style">
              <el-col :span="8">组件编号: {{ devData.id }}</el-col>
              <el-col :span="8">组件名称：{{ devData.sname }}</el-col>
              <el-col :span="8">组件类型：{{ devData.Type }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">组件产地: {{ devData.Origin }}</el-col>
              <el-col :span="8">组件厂家：{{ devData.Factory }}</el-col>
              <el-col :span="8">组件型号：{{ devData.Model }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">组件商标: {{ devData.Logo }}</el-col>
              <el-col :span="8">组件功能：{{ devData.function }}</el-col>
              <el-col :span="8">备注：{{ devData.note }}</el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 零件信息 -->
    <el-row 
      class="el-row-style"
      v-for="(devPartData, index) in devPartDataList"
      :key="devPartData.key">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>零件基本信息 [ {{ index+1 }} ]</span>
          </div>
          <div v-loading="loading">
            <el-row class="el-row-style">
              <el-col :span="8">零件编号: {{ devPartData.id }}</el-col>
              <el-col :span="8">零件名称：{{ devPartData.sname }}</el-col>
              <!-- <el-col :span="8">零件类型：{{ devPartData.Type }}</el-col> -->
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">零件产地: {{ devPartData.Origin }}</el-col>
              <el-col :span="8">零件厂家：{{ devPartData.Factory }}</el-col>
              <el-col :span="8">零件型号：{{ devPartData.Model }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">零件商标: {{ devPartData.Logo }}</el-col>
              <el-col :span="8">零件功能：{{ devPartData.function }}</el-col>
              <el-col :span="8">零件颜色：{{ devPartData.Color }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">零件材质: {{ devPartData.Material }}</el-col>
              <el-col :span="8">零件形状：{{ devPartData.Shape }}</el-col>
              <el-col :span="8">零件厚度：{{ devPartData.thickness }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">备注：{{ devPartData.note }}</el-col>
            </el-row>
            <hr>
            <el-row>
              <el-col :span="2" :offset="20">
                <el-button 
                  type="primary"
                  size="medium"
                  @click="ingredient(devPartData.id)">
                  成分特征
                </el-button>
              </el-col>
              <el-col :span="2">
                <el-button 
                  type="primary"
                  size="medium"
                  @click="appearance(devPartData.id)">
                  形态特征
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

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
            修 改
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GobackButton from '@/components/Buttons/goback-button'
import DevicePartForm from '@/views/sample-management/device-sample/device-part-form'
import { getDevSampleInfo } from '@/api/sample-device'

export default {
  name: 'DeviceDetail',
  data() {
    return {
      loading: false,
      devData: {},
      devPartDataList: [],
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
    DevicePartForm,
  },
  mounted() {
    console.log('- - DeviceDetail - - $route.params:', this.$route.params)
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getDevSampleInfo(this.$route.params.id).then(res => {
        // console.log('- - DeviceDetail - - res:', res)
        this.devData = res
        if(this.devData.devPartSample.length) {
          this.devPartDataList = this.devData.devPartSample
        }
        this.loading = false
      }).catch(err => {
        this.$message({
          message: '获取组件信息错误' + err.message,
          type: 'error',
          duration: 6 * 1000
        })
      })
    },

    ingredient(id) {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailIngredient/'+ id)
    },
    appearance(id) {
      // this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailAppearance/'+ this.$route.params.id)
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailAppearance/'+ id)
    },

    /** 页面操作按键 */
    update() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceUpdate/' + this.$route.params.id)
    },
    goBcak() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceList')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
