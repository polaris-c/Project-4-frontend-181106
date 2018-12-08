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
              :model="evidenceData"
              :rules="formRule"
              :label-position="labelPosition"
              label-width="80px">

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="物证名称">
                    <el-input v-model="evidenceData.evidenceName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="案件名称">
                    <el-input v-model="evidenceData.caseName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="备注">
                    <el-input 
                      v-model="evidenceData.note"
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
          <div @click="handleIndex('FTIR')">
            <el-form 
              ref="FTIR" 
              :model="evidenceData.FTIRdata"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="evidenceData.FTIRdata.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="evidenceData.FTIRdata.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadFTIR"
                  :file-list="evidenceData.FTIRdata.fileList"
                  :limit="20"
                  :on-exceed="handleExceed"
                  :on-change="handleChange"
                  :on-preview="handlePreview"
                  :before-remove="beforeRemove"
                  :on-remove="handleRemove"
                  :auto-upload="false"
                  multiple> 
                  <el-button 
                    slot="trigger"
                    size="mini" 
                    type="primary"
                    @click="handleIndex('FTIR')">
                    点击选取
                  </el-button>
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
          <div @click="handleIndex('RAMAN')">
            <el-form 
              ref="RAMAN" 
              :model="evidenceData.RAMANdata"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="evidenceData.RAMANdata.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="evidenceData.RAMANdata.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadRAMAN"
                  :file-list="evidenceData.RAMANdata.fileList"
                  :limit="20"
                  :on-exceed="handleExceed"
                  :on-change="handleChange"
                  :on-preview="handlePreview"
                  :before-remove="beforeRemove"
                  :on-remove="handleRemove"
                  :auto-upload="false"
                  multiple> 
                  <el-button 
                    slot="trigger" 
                    size="mini" 
                    type="primary"
                    @click="handleIndex('RAMAN')">
                    点击选取
                  </el-button>
                </el-upload>
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
          <div @click="handleIndex('XRF')">
            <el-form 
              ref="XRF" 
              :model="evidenceData.XRFdata"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="evidenceData.XRFdata.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="evidenceData.XRFdata.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadXRF"
                  :file-list="evidenceData.XRFdata.fileList"
                  :limit="20"
                  :on-exceed="handleExceed"
                  :on-change="handleChange"
                  :on-preview="handlePreview"
                  :before-remove="beforeRemove"
                  :on-remove="handleRemove"
                  :auto-upload="false"
                  multiple> 
                  <el-button 
                    slot="trigger" 
                    size="mini" 
                    type="primary"
                    @click="handleIndex('XRF')">
                    点击选取
                  </el-button>
                </el-upload>
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
          <div @click="handleIndex('XRD')">
            <el-form 
              ref="XRD" 
              :model="evidenceData.XRDdata"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="evidenceData.XRDdata.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="evidenceData.XRDdata.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadXRD"
                  :file-list="evidenceData.XRDdata.fileList"
                  :limit="20"
                  :on-exceed="handleExceed"
                  :on-change="handleChange"
                  :on-preview="handlePreview"
                  :before-remove="beforeRemove"
                  :on-remove="handleRemove"
                  :auto-upload="false"
                  multiple> 
                  <el-button 
                    slot="trigger" 
                    size="mini" 
                    type="primary"
                    @click="handleIndex('XRD')">
                    点击选取
                  </el-button>
                </el-upload>
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
          <div @click="handleIndex('GCMS')">
            <el-form 
              ref="GCMS" 
              :model="evidenceData.GCMSdata"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="evidenceData.GCMSdata.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="evidenceData.GCMSdata.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadGCMS"
                  :file-list="evidenceData.GCMSdata.fileList"
                  :limit="20"
                  :on-exceed="handleExceed"
                  :on-change="handleChange"
                  :on-preview="handlePreview"
                  :before-remove="beforeRemove"
                  :on-remove="handleRemove"
                  :auto-upload="false"
                  multiple> 
                  <el-button 
                    slot="trigger" 
                    size="mini" 
                    type="primary"
                    @click="handleIndex('GCMS')">
                    点击选取
                  </el-button>
                </el-upload>
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
  name: 'EvidenceExplosiveCreation',
  data() {
    return {
      labelPosition: 'left',
      evidenceData: {
        evidenceName: '',
        caseName: '',
        user: '',
        inputDate: '',
        note: '',
        picURL: '',
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
        XRDdata: {
          devDetect: '',
          methodDetect: '',
          fileList: [],
          uploadFile: new FormData()
        },
        GCMSdata: {
          devDetect: '',
          methodDetect: '',
          fileList: [],
          uploadFile: new FormData()
        },
      },
      formRule: {
      },
      devPartType: '',
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
  methods: {
    handleIndex(type) {
      this.devPartType = type
      console.log('- - handleIndex - - :', this.devPartType)
    },

    /*  Upload  */
    handleExceed(files, fileList) {
      this.$message({
        message: `限制最多上传20个文件，本次选择了${files.length}个，共选择了${files.length + fileList.length}个文件`,
        type: 'warning',
        duration: 9000,
      })
    },
    handleChange(file, fileList) {
      console.log('- - Change - - file.raw:', file.raw)
      // console.log('- - Change - - fileList:', fileList)
      switch (this.devPartType) {
        case 'FTIR':
          this.evidenceData.FTIRdata.fileList.push(file)
          // this.evidenceData.FTIRdata.uploadFile.append('txtURL', file)
          // console.log('- - Change - - .FTIRdata.fileList:', this.evidenceData.FTIRdata.fileList)
          break
        case 'RAMAN':
          this.evidenceData.RAMANdata.fileList.push(file)
          // this.evidenceData.RAMANdata.uploadFile.append('txtURL', file)
          // console.log('- - Change - - .RAMANdata.fileList:', this.evidenceData.RAMANdata.fileList)
          break
        case 'XRF':
          this.evidenceData.XRFdata.fileList.push(file)
          // this.evidenceData.XRFdata.uploadFile.append('txtURL', file)
          // console.log('- - Change - - .XRFdata.fileList:', this.evidenceData.XRFdata.fileList)
          break
        case 'XRD':
          this.evidenceData.XRDdata.fileList.push(file)
          // this.evidenceData.XRDdata.uploadFile.append('txtURL', file)
          // console.log('- - Change - - .XRDdata.fileList:', this.evidenceData.XRDdata.fileList)
          break
        case 'GCMS':
          this.evidenceData.GCMSdata.fileList.push(file)
          // this.evidenceData.GCMSdata.uploadFile.append('txtURL', file)
          // console.log('- - Change - - .GCMSdata.fileList:', this.evidenceData.GCMSdata.fileList)
          break
        case 'IMG':
          this.evidenceData.srcImgList.push(file)
          // this.evidenceData.uploadImg.append('srcImgURL', file)
          // console.log('- - Change - - .srcImgList:', this.evidenceData.srcImgList)
          break
        default:
          console.log('!!! Error NO devPartType !!!')
      }
    },
    handlePreview(file) {
      console.log('- - Preview - - file:', file.name)
      return this.$alert(` ${ file.name }  (${ file.size }字节)`, `${ this.devPartType }`, {
        confirmButtonText: '确定',
        type: 'success'
      }).then(() => {
      }).catch(() => {
      })
    },
    beforeRemove(file, fileList) {
      return  this.$confirm(`确定删除 < ${ file.name } > 吗？`, '提 示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取 消',
        type: 'warning'
      })
    },
    handleRemove(file, fileList) {
      console.log('- - Remove - - file:', file.name)
      // console.log('- - Remove - - fileList:', fileList)
      switch (this.devPartType) {
        case 'FTIR':
          this.evidenceData.FTIRdata.fileList = fileList
          console.log('- - Remove - - .FTIRdata.fileList:', this.evidenceData.FTIRdata.fileList)
          break
        case 'RAMAN':
          this.evidenceData.RAMANdata.fileList = fileList
          console.log('- - Remove - - .RAMANdata.fileList:', this.evidenceData.RAMANdata.fileList)
          break
        case 'XRF':
          this.evidenceData.XRFdata.fileList = fileList
          console.log('- - Remove - - .XRFdata.fileList:', this.evidenceData.XRFdata.fileList)
          break
        case 'XRD':
          this.evidenceData.XRDdata.fileList = fileList
          console.log('- - Remove - - .XRDdata.fileList:', this.evidenceData.XRDdata.fileList)
          break
        case 'GCMS':
          this.evidenceData.GCMSdata.fileList = fileList
          console.log('- - Remove - - .GCMSdata.fileList:', this.evidenceData.GCMSdata.fileList)
          break
        case 'IMG':
          this.evidenceData.srcImgList = fileList
          console.log('- - Remove - - .srcImgList:', this.evidenceData.srcImgList)
          break
        default:
          console.log('!!! Error NO devPartType !!!')
      }
    },

    /**  */
    handleSubmit() {
      console.log('- - submit - - evidenceData:', this.evidenceData.sname)
    },
    goBcak() {
      this.$router.push('/evidenceManagement/explosiveEvidence/explosiveIndexList/explosiveList')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
