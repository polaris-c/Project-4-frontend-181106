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
              :model="sampleData"
              :rules="formRule"
              :label-position="labelPosition"
              label-width="80px">

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="样本名称">
                    <el-input v-model="sampleData.sname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="名称缩写">
                    <el-input v-model="sampleData.snameAbbr"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="样本产地">
                    <el-input v-model="sampleData.sampleOrigin"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="样本厂家">
                    <el-input v-model="sampleData.factory"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="备注">
                    <el-input 
                      v-model="sampleData.note"
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
              :model="sampleData.FTIRdata"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="sampleData.FTIRdata.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="sampleData.FTIRdata.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadFTIR"
                  :file-list="sampleData.FTIRdata.fileList"
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
              :model="sampleData.RAMANdata"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="sampleData.RAMANdata.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="sampleData.RAMANdata.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadRAMAN"
                  :file-list="sampleData.RAMANdata.fileList"
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
              :model="sampleData.XRFdata"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="sampleData.XRFdata.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="sampleData.XRFdata.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadXRF"
                  :file-list="sampleData.XRFdata.fileList"
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
              :model="sampleData.XRDdata"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="sampleData.XRDdata.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="sampleData.XRDdata.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadXRD"
                  :file-list="sampleData.XRDdata.fileList"
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
              :model="sampleData.GCMSdata"
              :label-position="labelPosition"
              label-width="80px">
              <el-form-item label="检测设备">
                <el-input v-model="sampleData.GCMSdata.devDetect"></el-input>
              </el-form-item>
              <el-form-item label="检测方法">
                <el-input v-model="sampleData.GCMSdata.methodDetect"></el-input>
              </el-form-item>
              <el-form-item label="上传文件">
                <el-upload
                  action=""
                  ref="uploadGCMS"
                  :file-list="sampleData.GCMSdata.fileList"
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
import { createExplosiveSample, 
          createExploSampleFTIRs, createExploSampleFTIRTestFiles, 
          createExploSampleRamans, createExploSampleRamanTestFiles,
          createExploSampleXRDs, createExploSampleXRDTestFiles} from '@/api/sample-explosive'

export default {
  name: 'ExplosiveCreation',
  data() {
    return {
      labelPosition: 'left',
      sampleData: {
        id: null,
        sname: '',
        snameAbbr: '',
        sampleOrigin: '',
        factory: '',
        user: '',
        inputDate: '',
        note: '',
        picURL: '',
        FTIRdata: {
          id: null,
          exploSample: null,
          devDetect: '',
          methodDetect: '',
          fileList: [],
        },
        RAMANdata: {
          id: null,
          exploSample: null,
          devDetect: '',
          methodDetect: '',
          fileList: [],
        },
        XRFdata: {
          id: null,
          exploSample: null,
          devDetect: '',
          methodDetect: '',
          fileList: [],
        },
        XRDdata: {
          id: null,
          exploSample: null,
          devDetect: '',
          methodDetect: '',
          fileList: [],
        },
        GCMSdata: {
          id: null,
          exploSample: null,
          devDetect: '',
          methodDetect: '',
          fileList: [],
        },
      },
      formRule: {
      },
      dataType: '',
      dataTypeList: ['FTIR', 'RAMAN', 'XRF', 'XRD', 'GCMS'],
      uploadSample: {},
      uploadSampleDataInfo: {},
      uploadSampleDataFile: {}
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
    SubmitButton
  },

  mounted() {
    this.uploadSample = new FormData()
    this.uploadSampleDataInfo = new FormData()
    this.uploadSampleDataFile = new FormData()
  },

  methods: {
    /**  */
    handleIndex(type) {
      this.dataType = type
      console.log('- - handleIndex - - :', this.dataType)
    },

    /**  Upload  */
    handleExceed(files, fileList) {
      this.$message({
        message: `限制最多上传20个文件，本次选择了${files.length}个，共选择了${files.length + fileList.length}个文件`,
        type: 'warning',
        duration: 10 * 1000,
      })
    },
    handleChange(file, fileList) {
      console.log('- - Change - - file.raw:', file.raw)
      switch (this.dataType) {
        case 'FTIR':
          this.sampleData.FTIRdata.fileList.push(file)
          break
        case 'RAMAN':
          this.sampleData.RAMANdata.fileList.push(file)
          break
        case 'XRF':
          this.sampleData.XRFdata.fileList.push(file)
          break
        case 'XRD':
          this.sampleData.XRDdata.fileList.push(file)
          break
        case 'GCMS':
          this.sampleData.GCMSdata.fileList.push(file)
          break
        case 'IMG':
          this.sampleData.srcImgList.push(file)
          break
        default:
          console.log('!!! Error NO dataType !!!')
      }
    },
    handlePreview(file) {
      console.log('- - Preview - - file:', file.name)
      return this.$alert(` ${ file.name }  (${ file.size }字节)`, `${ this.dataType }`, {
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
      switch (this.dataType) {
        case 'FTIR':
          this.sampleData.FTIRdata.fileList = fileList
          console.log('- - Remove - - .FTIRdata.fileList:', this.sampleData.FTIRdata.fileList)
          break
        case 'RAMAN':
          this.sampleData.RAMANdata.fileList = fileList
          console.log('- - Remove - - .RAMANdata.fileList:', this.sampleData.RAMANdata.fileList)
          break
        case 'XRF':
          this.sampleData.XRFdata.fileList = fileList
          console.log('- - Remove - - .XRFdata.fileList:', this.sampleData.XRFdata.fileList)
          break
        case 'XRD':
          this.sampleData.XRDdata.fileList = fileList
          console.log('- - Remove - - .XRDdata.fileList:', this.sampleData.XRDdata.fileList)
          break
        case 'GCMS':
          this.sampleData.GCMSdata.fileList = fileList
          console.log('- - Remove - - .GCMSdata.fileList:', this.sampleData.GCMSdata.fileList)
          break
        case 'IMG':
          this.sampleData.srcImgList = fileList
          console.log('- - Remove - - .srcImgList:', this.sampleData.srcImgList)
          break
        default:
          console.log('!!! Error NO dataType !!!')
      }
    },

    /** 页面上传操作 1-> 2-> 3 */
    /** 1.样本基本信息 */
    handleSubmit() {
      for(let prop in this.sampleData) {
        if(this.sampleData.hasOwnProperty(prop)) {
          this.uploadSample.append(prop, this.sampleData[prop])
        }
      }
      createExplosiveSample(this.uploadSample).then(res => {
        this.sampleData.id = res.id
        this.sampleData.FTIRdata.exploSample = res.id  // 获取样本id,用于发送检测信息
        this.sampleData.RAMANdata.exploSample = res.id
        this.sampleData.XRFdata.exploSample = res.id
        this.sampleData.XRDdata.exploSample = res.id
        this.sampleData.GCMSdata.exploSample = res.id
        this.submitDataInfo()  // 上传检测信息
      }).catch(err => {
        this.$message({
          message: '基本信息错误' + err.message,
          type: 'error',
          duration: 10 * 1000
        })
      })
      
    },
    /** 2.检测信息 */
    submitDataInfo() {
      /** 遍历dataTypeList数组 */
      this.dataTypeList.forEach(dataType => {
        this.uploadSampleDataInfo = new FormData()
        let dataTypeData = dataType + 'data'
        /** 去除未使用的检测类型 */
        if(!this.sampleData[dataTypeData].devDetect || !this.sampleData[dataTypeData].methodDetect) {
          console.log(`---- ExplosiveCreation -- ${dataTypeData} is empty!`)
          return
        }
        /** 加载uploadSampleDataInfo */
        for(let prop in this.sampleData[dataTypeData]) {
          if(this.sampleData[dataTypeData].hasOwnProperty(prop)) {
            this.uploadSampleDataInfo.append(prop, this.sampleData[dataTypeData][prop])
          }
        }
        /** 选择API发送检测信息 */
        switch (dataTypeData) {
          case 'FTIRdata':
            createExploSampleFTIRs(this.uploadSampleDataInfo).then(res => {
              this.sampleData[dataTypeData].id = res.id  // 获取检测信息id,用于发送数据文件
              this.submitDataFile(dataTypeData)  // 上传数据文件
            }).catch(err => {
              this.$message({
                message: 'FTIR检测信息错误' + err.message,
                type: 'error',
                duration: 8 * 1000
              })
            })
            break
          case 'RAMANdata':
            createExploSampleRamans(this.uploadSampleDataInfo).then(res => {
              this.sampleData[dataTypeData].id = res.id
              // console.log('---- ExplosiveCreation -- RAMANdata.id', this.sampleData[dataTypeData].id)
              this.submitDataFile(dataTypeData)  // 上传数据文件
            }).catch(err => {
              this.$message({
                message: 'RAMAN检测信息错误' + err.message,
                type: 'error',
                duration: 8 * 1000
              })
            })
            break
          case 'XRFdata':

            break
          case 'XRDdata':
          createExploSampleXRDs(this.uploadSampleDataInfo).then(res => {
              this.sampleData[dataTypeData].id = res.id
              this.submitDataFile(dataTypeData)  // 上传数据文件
            }).catch(err => {
              this.$message({
                message: 'XRD检测信息错误' + err.message,
                type: 'error',
                duration: 8 * 1000
              })
            })
            break
          case 'GCMSdata':
  
            break
          default:
            console.log('!!! Error NO dataTypeData !!!')
        }
      })

    },
    /** 3.检测数据文件 */
    submitDataFile(dataTypeData) {
      switch (dataTypeData) {
        case 'FTIRdata':
          this.sampleData[dataTypeData].fileList.forEach((file, index) => {
            this.uploadSampleDataFile = new FormData()
            this.uploadSampleDataFile.append('exploSampleFTIR', this.sampleData[dataTypeData].id)
            this.uploadSampleDataFile.append('FTIRs', file.raw)
            createExploSampleFTIRTestFiles(this.uploadSampleDataFile).then(res => {
              this.$message({
                message: `数据文件${index}-${file.raw.name}上传完毕`,
                type: 'success'
              })
            }).catch(err => {
              this.$message({
                message: 'FTIR数据文件错误' + err.message,
                type: 'error',
                duration: 6 * 1000
              })
            })
          })
          break
        case 'RAMANdata':
          this.sampleData[dataTypeData].fileList.forEach((file, index) => {
            this.uploadSampleDataFile = new FormData()
            this.uploadSampleDataFile.append('exploSampleRaman', this.sampleData[dataTypeData].id)
            this.uploadSampleDataFile.append('Ramans', file.raw)
            createExploSampleRamanTestFiles(this.uploadSampleDataFile).then(res => {
              this.$message({
                message: `数据文件${index}-${file.raw.name}上传完毕`,
                type: 'success'
              })
            }).catch(err => {
              this.$message({
                message: 'Raman数据文件错误' + err.message,
                type: 'error',
                duration: 6 * 1000
              })
            })
          })
          break
        case 'XRFdata':

          break
        case 'XRDdata':
          this.sampleData[dataTypeData].fileList.forEach((file, index) => {
            this.uploadSampleDataFile = new FormData()
            this.uploadSampleDataFile.append('exploSampleXRD', this.sampleData[dataTypeData].id)
            this.uploadSampleDataFile.append('XRDs', file.raw)
            createExploSampleXRDTestFiles(this.uploadSampleDataFile).then(res => {
              this.$message({
                message: `数据文件${index}-${file.raw.name}上传完毕`,
                type: 'success'
              })
            }).catch(err => {
              this.$message({
                message: 'XRD数据文件错误' + err.message,
                type: 'error',
                duration: 6 * 1000
              })
            })
          })
          break
        case 'GCMSdata':

          break
        default:
          console.log('!!! Error NO dataTypeData !!!')
      }

    },

    goBcak() {
      this.$router.push('/sampleManagement/explosiveSample/explosiveIndexList/explosiveList')
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
