<template>
  <div class="app-main-container">
    <!-- 基本信息 -->
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>炸药与原材料基本信息</span>
          </div>
          <div>
            <el-form 
              ref="baseForm" 
              :model="formData"
              :rules="formRule"
              :label-position="labelPosition"
              label-width="80px">

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="样本名称">
                    <el-input v-model="formData.sname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="名称缩写">
                    <el-input v-model="formData.snameAbbr"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="样本产地">
                    <el-input v-model="formData.sampleOrigin"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="样本厂家">
                    <el-input v-model="formData.factory"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="备注">
                    <el-input 
                      v-model="formData.note"
                      type="textarea"
                      placeholder="请输入...">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12"></el-col>
              </el-row>
              
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>

     <!-- 检测方法  -->
    <el-row :gutter="15" class="el-row-style">

      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span>FTIR</span>
          </div>
          <div>
            <el-form 
              ref="FTIR" 
              :model="FTIRData"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="FTIRData.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="FTIRData.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadFTIR"
                  :limit="10"
                  :file-list="FTIRFile"
                  :on-change="handleChange"
                  :on-preview="handlePreview"
                  :before-upload="beforeFileUpload"> 
                  <!-- :on-change="handleChange"  :auto-upload="false"-->
                  <el-button slot="trigger" size="small" type="primary">点击选取</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span>RAMAN</span>
          </div>
          <div>
            <el-form 
              ref="FTIR" 
              :model="FTIRData"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="FTIRData.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="FTIRData.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span>XRF</span>
          </div>
          <div>
            <el-form 
              ref="FTIR" 
              :model="FTIRData"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="FTIRData.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="FTIRData.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-row :gutter="15" class="el-row-style">

      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span>XRD</span>
          </div>
          <div>
            <el-form 
            ref="FTIR" 
            :model="FTIRData"
            :label-position="labelPosition"
            label-width="80px">
            <el-form-item label="检测设备">
              <el-input v-model="FTIRData.devDetect"></el-input>
            </el-form-item>
            <el-form-item label="检测方法">
              <el-input v-model="FTIRData.methodDetect"></el-input>
            </el-form-item>
          </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span>GCMS</span>
          </div>
          <div>
            <el-form 
            ref="FTIR" 
            :model="FTIRData"
            :label-position="labelPosition"
            label-width="80px">
            <el-form-item label="检测设备">
              <el-input v-model="FTIRData.devDetect"></el-input>
            </el-form-item>
            <el-form-item label="检测方法">
              <el-input v-model="FTIRData.methodDetect"></el-input>
            </el-form-item>
          </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
      </el-col>

    </el-row>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <el-col :span="22">
          <goback-button @goback-confirm="goBcak"></goback-button>
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

export default {
  name: 'ExplosiveCreation',
  data() {
    return {
      labelPosition: 'left',
      formData: {
          sname: '',
          snameAbbr: '',
          sampleOrigin: '',
          factory: '',
          user: '',
          inputDate: '',
          note: '',
          picURL: ''
      },
      formRule: {
      },
      FTIRData: {
        devDetect: '',
        methodDetect: ''
      },
      FTIRFile: [],
      uploadFTIRFile: {}
    }
  },
  components: {
    GobackButton,
    SubmitButton
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

  mounted() {
    this.uploadFTIRFile = new FormData()
    console.log('+ + ExplosiveCreation mounted + + uploadFTIRFile is OK')
  },

  methods: {
    handleChange(file, fileList) {
      for(let fileItem of fileList) {
        // console.log('- - Change - - fileItem:', fileItem)
      }
      // this.FTIRFile = fileList
      // console.log('- - Change - - FTIRFile:', this.FTIRFile)
      // console.log('- - Change - - file:', file)
      // this.uploadFTIRFile.set('txtURL', file)
      // console.log('- - Change - - uploadFTIRFile.txtURL:', this.uploadFTIRFile)
    },
    beforeFileUpload(file) {
      console.log('- - before - - file:', file)

      this.FTIRFile.push(file)
      console.log('- - before - - FTIRFile:', this.FTIRFile)
      
      this.uploadFTIRFile.append('txtURL', file)
      // console.log('- - before- - uploadFTIRFile:', this.uploadFTIRFile)

      for(let key of this.uploadFTIRFile.keys()) {
        // console.log('- - before- - uploadFTIRFile key:', key)
      }
      for(let value of this.uploadFTIRFile.values()) {
        console.log('- - before- - uploadFTIRFile value:', value)
      }
      return false
    },
    handlePreview(file) {
      console.log('- - Preview - - file:', file.name, file)
    },

    handleSubmit() {
      console.log('- - submit - - formData:', this.formData.sname)
    },
    goBcak() {
      this.$router.push('/sampleManagement/explosiveSample/explosiveIndexList/explosiveList')
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  &-container {
    padding: 15px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.main {
  &-form {
    width: 400px;
  }
}

.el-row-style {
  margin-bottom: 15px;
}

</style>
