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

export default {
  name: 'CardCommon',
  props: {
    /** 样本(sample)或物证(evi),炸药(explo)或装置(dev) */
    functionType: {
      type: String,
    },
    /** 基本信息ID */
    basicInfoID: {
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
        devDetect: '',
        methodDetect: '',
        fileList: [],
      },
      formRule: {
      },
      dataInfoID: '',  // 检测信息ID的键名
      dataFile: '',    // 数据文件的键名
      createDataInfo: {},  // 上传检测信息的API函数
      createDataFile: {},  // 上传数据文件的API函数
      uploadDataInfo: {},  // 上传检测信息
      uploadDataFile: {},  // 上传数据文件
    }
  },
  mounted() {
    this.uploadDataInfo = new FormData()
    this.uploadDataFile = new FormData()
    this.loadAPI()
  },
  methods: {
    /**  loadAPI  */
    loadAPI() {
      let APIprefixName = ''  // API函数名的前缀,决定了其是样本(sample)或物证(evi),炸药(explo)或装置(dev)
      /** 选择功能模块的类型 
       * 炸药样本(exploSample)  炸药物证(exploEvi)  装置样本(devPartSample)  装置物证(devEvi) */
      switch (this.functionType) {
        case 'exploSample': 
          APIprefixName = 'createExploSample'
          import('@/api/sample-explosive').then(APImodule => this.setParam(APImodule, APIprefixName))
          break
        case 'exploEvi': 
          APIprefixName = 'createExploEvi'
          import('@/api/evidence-explosive').then(APImodule => this.setParam(APImodule, APIprefixName))
          break
        case 'devPartSample': 
          APIprefixName = 'createDevPartSample'
          // import('@/api/sample-device').then(APImodule => this.setParam(APImodule, APIprefixName))
          break
        case 'devEvi': 
          APIprefixName = 'createDevEvi'
          // import('@/api/evidence-device').then(APImodule => this.setParam(APImodule, APIprefixName))
          break
        default:
          console.log('!!! Error NO functionType !!!')
      }
    },
    setParam(APImodule, APIprefixName) {
      this.createDataInfo = APImodule[APIprefixName + this.dataType + 's']
      this.createDataFile = APImodule[APIprefixName + this.dataType + 'TestFiles']
      this.dataInfoID = this.functionType + this.dataType
      this.dataFile = this.dataType + 's'
    },

    /**  Submit  */
    beforeSubmit() {
      this.$watch('basicInfoID', this.handleSubmit)  // 监听基本信息的ID,当基本信息创建成功后会返回其ID,则可继续上传文件等信息
    },
    handleSubmit() {
      console.log(`---- CardCommon -- $watch ${this.dataType} basicInfoID:`, this.basicInfoID)
      /** 去除未使用的检测类型 */
      if(!this.detectionData.devDetect || !this.detectionData.methodDetect) {
        return console.log(`---- CardCommon -- ${this.dataType} is empty!!!`)
      }
      /** 1-1 加载uploadDataInfo */
      this.uploadDataInfo.append(this.functionType, this.basicInfoID)
      this.uploadDataInfo.append('devDetect', this.detectionData.devDetect)
      this.uploadDataInfo.append('methodDetect', this.detectionData.methodDetect)
      /** 1-2 发送检测信息 */
      this.createDataInfo(this.uploadDataInfo).then(res => {
        this.detectionData.id = res.id  // 获取检测信息id,用于发送数据文件
        this.detectionData.fileList.forEach((file, index) => {
          /** 2-1 加载uploadDataFile */
          this.uploadDataFile = new FormData()
          this.uploadDataFile.append(this.dataInfoID, this.detectionData.id)
          this.uploadDataFile.append(this.dataFile, file.raw)
          /** 2-2 发送数据文件 */
          this.createDataFile(this.uploadDataFile).then(res => {
            this.$message({
              message: `数据文件${index}-${file.raw.name}上传完毕`,
              type: 'success'
            })
          }).catch(err => {
            this.$message({
              message: `${this.dataType}数据文件错误:${err.message}`,
              type: 'error',
              duration: 6 * 1000
            })
          })
        })
      }).catch(err => {
        this.$message({
          message: `${this.dataType}检测信息错误:${err.message}`,
          type: 'error',
          duration: 8 * 1000
        })
      })
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
  }
}
</script>

<style scoped>

</style>
