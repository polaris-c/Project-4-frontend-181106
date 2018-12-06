<template>
  <div class="app-main-container">
    <!-- 组件基本信息 -->
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>关键组件基本信息</span>
          </div>
          <div>
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
              <el-col :span="2">
                <el-button 
                  type="primary"
                  size="small"
                  @click="ingredient"
                  plain>
                  成分特征
                </el-button>
              </el-col>
              <el-col :span="2">
                <el-button 
                  type="primary"
                  size="small"
                  @click="appearance"
                  plain>
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
import DevicePartForm from '@/views/sample-management/device-sample/device-part-form'

export default {
  name: 'DeviceDetail',
  data() {
    return {
      devData: {
        id: '001',
        sname: 'A001',
        Type: 'A1',
        Origin: 'AO',
        Factory: 'AF',
        Model: 'AM',
        Logo: 'AL',
        function: 'AF',
        note: '1111',
      },
      devPartDataList: [
        {
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
        {
          id: '02',
          sname: 'A002',
          Origin: 'AO',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          function: 'AF',
          Color: 'CMST2',
          Material: 'CMST2',
          Shape: 'CMST2',
          thickness: 'CMST2',
          note: '2222',
          key: Date.now()+1,
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
      ],
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
  },
  methods: {
    ingredient() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailIngredient/'+ this.$route.params.id)
    },
    appearance() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailAppearance/'+ this.$route.params.id)
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
