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
            <el-form 
              ref="devForm" 
              :model="devData"
              :rules="devRule"
              :label-position="labelPosition"
              label-width="80px">

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="组件名称">
                    <el-input v-model="devData.sname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="组件类型">
                    <el-input v-model="devData.Type"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="组件产地">
                    <el-input v-model="devData.Origin"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="组件厂家">
                    <el-input v-model="devData.Factory"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="组件型号">
                    <el-input v-model="devData.Model"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="组件商标">
                    <el-input v-model="devData.Logo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="组件功能">
                    <el-input v-model="devData.function"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注">
                    <el-input 
                      v-model="devData.note"
                      type="textarea"
                      placeholder="请输入...">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
            </el-form>
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
        <device-part-form 
          :devPartData="devPartData"
          :index="index"
          @delete-device-part="handleDeleteDevPart">
        </device-part-form>
      </el-col>
    </el-row>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <el-col :span="19">
          <goback-button @goback-confirm="goBcak"></goback-button>
        </el-col>
        <el-col :span="3">
          <el-button 
            type="primary"
            @click="handleAddDevPart"
            icon="el-icon-plus"
            plain>新增零件</el-button>
        </el-col>
        <el-col :span="2">
          <submit-button @submit-confirm="handleSubmit"></submit-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GobackButton from '@/components/Buttons/goback-button'
import SubmitButton from '@/components/Buttons/submit-button'
import DeleteButton from '@/components/Buttons/delete-button'
import DevicePartForm from '@/views/sample-management/device-sample/device-part-form'

export default {
  name: 'DeviceCreation',
  data() {
    return {
      labelPosition: 'left',
      devData: {
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
          sname: 'A001',
          Origin: 'AO',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          function: 'AF',
          Color: '1',
          Material: '1',
          Shape: '1',
          thickness: '1',
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
      ],
      uploadFile: {},
      devPartIndex: 0,
      devPartType: '',
      devRule: {
      },
    }
  },
  components: {
    GobackButton,
    SubmitButton,
    DeleteButton,
    DevicePartForm
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sidebar',
      'device',
      'token',
      'avatar',
    ]),
  },

  mounted() {
    this.uploadFile = new FormData()
    console.log('+ + ExplosiveCreation mounted + + uploadFTIRfile is OK')
  },

  methods: {
    handleAddDevPart() {
      this.devPartDataList.push(
        {
          sname: 'A002',
          Origin: 'AO',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          function: 'AF',
          Color: '2',
          Material: '2',
          Shape: '2',
          thickness: '2',
          note: '222',
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
        }
      )

    },
    handleDeleteDevPart(index) {
      console.log('- - DeleteDevPart - - index: ', index)
      this.devPartDataList.splice(index, 1)
      console.log('- - DeleteDevPart - - devPartDataList:', this.devPartDataList)
    },
    handleIndex(index, type) {
      this.devPartIndex = index
      this.devPartType = type
    },

    /* submit */ 
    handleSubmit() {
      console.log('- - submit - - devData:', this.devData.sname)
      for(const devPartData of this.devPartDataList) {
        console.log('- - submit - - devPartData:', devPartData.sname)
        // console.log('- - submit - - devPartData:', devPartData.FTIRdata.fileList)
      }
    },
    goBcak() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceList')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
