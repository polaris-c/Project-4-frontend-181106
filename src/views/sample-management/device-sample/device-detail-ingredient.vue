<template>
  <div class="app-main-container">

    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>零件基本信息</span>
          </div>
          <div>
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
              <el-col :span="20">备注：{{ devPartData.note }}</el-col>
              <!-- <el-col :span="2">
                <el-button 
                  type="primary"
                  @click="ingredient"
                  plain>
                  成分特征
                </el-button>
              </el-col>
              <el-col :span="2">
                <el-button 
                  type="primary"
                  @click="appearance"
                  plain>
                  形态特征
                </el-button>
              </el-col> -->
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <go-back></go-back>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GoBack from '@/components/Buttons/go-back'

export default {
  name: 'DeviceDetailIngredient',
  data() {
    return {
      devPartData: {
        id: '01',
        sname: 'A001',
        Origin: 'AO',
        Factory: 'AF',
        Model: 'AM',
        Logo: 'AL',
        function: 'AF',
        Color: 'CMST1',
        Material: 'CMST1',
        Shape: 'CMST1',
        thickness: 'CMST1',
        note: '1111',
        key: Date.now(),
        FTIRdata: {
          devDetect: '',
          methodDetect: '',
          fileList: [],
          uploadFile: new FormData()
        },
        RAMANdata: {
          devDetect: '',
          methodDetect: '',
          fileList: [],
          uploadFile: new FormData()
        },
        XRFdata: {
          devDetect: '',
          methodDetect: '',
          fileList: [],
          uploadFile: new FormData()
        },
        srcImgList: [],
        uploadImg: new FormData(),
      },
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
    GoBack,
  },
  mounted() {
    console.log('- - DeviceDetailIngredient - - $route.params:', this.$route.params)
  },
  methods: {
    ingredient() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailIngredient/'+ this.$route.params.id)
    },
    appearance() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailAppearance/'+ this.$route.params.id)
    },

    /** 页面操作按键 */
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
