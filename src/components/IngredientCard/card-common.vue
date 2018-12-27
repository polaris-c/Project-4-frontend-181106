<template>
  <el-card shadow="hover">
    <div slot="header">
      <span>{{ dataType }}</span>
    </div>
    <div>
      <el-form 
        ref="detectionData" 
        :model="detectionData"
        :label-position="labelPosition"
        label-width="80px">

        <el-form-item label="检测设备">
          <el-select 
            class="el-select-style"
            v-model="detectionData.devDetect" 
            placeholder="请选择检测设备"
            filterable>
            <el-option
              v-for="item in devDetectList"
              :key="item.id"
              :label="item.deviceName + ' — ' + item.deviceVersion"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="检测方法">
          <el-select 
            class="el-select-style"
            v-model="detectionData.methodDetect" 
            placeholder="请选择检测方法"
            filterable>
            <el-option
              v-for="item in methodDetectList"
              :key="item.id"
              :label="item.method"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上传文件">
          <el-upload
            action=""
            ref="uploadFile"
            :file-list="detectionData.fileList"
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
              type="primary">
              点击选取
            </el-button>
          </el-upload>
        </el-form-item>

      </el-form>
    </div>
  </el-card>
</template>

<script>
import {  createExploSampleFTIRs, createExploSampleFTIRTestFiles, 
          createExploSampleRamans, createExploSampleRamanTestFiles,
          createExploSampleXRFs, createExploSampleXRFTestFiles,
          createExploSampleXRDs, createExploSampleXRDTestFiles } from '@/api/sample-explosive'

export default {
  name: 'CardCommon',
  props: {
    /** 样本基本信息ID */
    sampleDataID: {
      type: [Number, String]
    },
    /** 当前检测数据类型 */
    dataType: {
      type: String,
      required: true
    },
    devDetectList: {
      type: Array,
      required: true
    },
    methodDetectList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      labelPosition: 'left',
      detectionData: {
        id: null,
        exploSample: this.sampleDataID,
        devDetect: '',
        methodDetect: '',
        fileList: [],
      },
      formRule: {
      },
      uploadSampleDataInfo: {},  // 上传检测信息
      uploadSampleDataFile: {},  // 上传数据文件
    }
  },
  mounted() {
    this.uploadSampleDataInfo = new FormData()
    this.uploadSampleDataFile = new FormData()
  },
  methods: {
    /**  Upload  */
    handleExceed(files, fileList) {
      this.$message({
        message: `限制最多上传20个文件，本次选择了${files.length}个，共选择了${files.length + fileList.length}个文件`,
        type: 'warning',
        duration: 10 * 1000,
      })
    },
    handleChange(file, fileList) {
      console.log('- - Change - - file.raw:', file.raw.name)
      this.detectionData.fileList.push(file)
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
      this.detectionData.fileList = fileList
    },

    /**  Submit  */
    beforeSubmit() {
      this.$watch('sampleDataID', this.handleSubmit)
    },
    handleSubmit() {
      this.detectionData.exploSample = this.sampleDataID
      console.log(`---- CardCommon -- $watch ${this.dataType} exploSample:`, this.detectionData.exploSample)
      /** 去除未使用的检测类型 */
      if(!this.detectionData.devDetect || !this.detectionData.methodDetect) {
        return console.log(`---- CardCommon -- ${this.dataType} is empty!!!`)
      }
      /** 加载uploadSampleDataInfo */
      this.uploadSampleDataInfo.append('exploSample', this.detectionData.exploSample)
      this.uploadSampleDataInfo.append('devDetect', this.detectionData.devDetect)
      this.uploadSampleDataInfo.append('methodDetect', this.detectionData.methodDetect)

      /** 选择API发送信息 */
      switch (this.dataType) {
        case 'FTIR':
          /** 发送检测信息 */
          createExploSampleFTIRs(this.uploadSampleDataInfo).then(res => {
            this.detectionData.id = res.id  // 获取检测信息id,用于发送数据文件
            this.detectionData.fileList.forEach((file, index) => {
              /** 加载uploadSampleDataFile */
              this.uploadSampleDataFile = new FormData()
              this.uploadSampleDataFile.append('exploSampleFTIR', this.detectionData.id)
              this.uploadSampleDataFile.append('FTIRs', file.raw)

              /** 发送数据文件 */
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
          }).catch(err => {
            this.$message({
              message: 'FTIR检测信息错误' + err.message,
              type: 'error',
              duration: 8 * 1000
            })
          })
          break
        case 'RAMAN':
          createExploSampleRamans(this.uploadSampleDataInfo).then(res => {
            this.detectionData.id = res.id
            this.detectionData.fileList.forEach((file, index) => {
              this.uploadSampleDataFile = new FormData()
              this.uploadSampleDataFile.append('exploSampleRaman', this.detectionData.id)
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
          }).catch(err => {
            this.$message({
              message: 'RAMAN检测信息错误' + err.message,
              type: 'error',
              duration: 8 * 1000
            })
          })
          break
        case 'XRF':
          createExploSampleXRFs(this.uploadSampleDataInfo).then(res => {
            this.detectionData.id = res.id
            this.detectionData.fileList.forEach((file, index) => {
              this.uploadSampleDataFile = new FormData()
              this.uploadSampleDataFile.append('exploSampleXRF', this.detectionData.id)
              this.uploadSampleDataFile.append('XRFs', file.raw)
              createExploSampleXRFTestFiles(this.uploadSampleDataFile).then(res => {
                this.$message({
                  message: `数据文件${index}-${file.raw.name}上传完毕`,
                  type: 'success'
                })
              }).catch(err => {
                this.$message({
                  message: 'XRF数据文件错误' + err.message,
                  type: 'error',
                  duration: 6 * 1000
                })
              })
            })
          }).catch(err => {
            this.$message({
              message: 'XRF检测信息错误' + err.message,
              type: 'error',
              duration: 8 * 1000
            })
          })
          break
        case 'XRD':
          createExploSampleXRDs(this.uploadSampleDataInfo).then(res => {
            this.detectionData.id = res.id
            this.detectionData.fileList.forEach((file, index) => {
              this.uploadSampleDataFile = new FormData()
              this.uploadSampleDataFile.append('exploSampleXRD', this.detectionData.id)
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
          }).catch(err => {
            this.$message({
              message: 'XRD检测信息错误' + err.message,
              type: 'error',
              duration: 8 * 1000
            })
          })
          break
        case 'GCMS':

          break
        default:
          console.log('!!! Error NO this.dataType !!!')
      }
    }
  }
}
</script>

<style scoped>

</style>
