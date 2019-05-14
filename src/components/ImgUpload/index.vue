<template>
  <div>
    <el-upload
      class=""
      action=""
      list-type="picture-card"
      :file-list="shapeImgList"
      :limit="20"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-preview="handlePreview"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :auto-upload="false"
      multiple>
      <el-button size="mini" type="primary">点击选取图片</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png图片</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  props: {
    functionType: {
      type: String
    },
    basicInfoId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      shapeImgList: [],  // 存放图片列表
      dataInfoId: '',  // 基本信息ID的键名
      createDataFile: {},  // 上传图片文件的API函数
      uploadShapeImg: {}  // 上传形态图片
    }
  },
  watch:{
    functionType: function(newVal, oldVal) {
      this.loadAPI()
      console.log(`---- ImgUpload -- watch functionType: `, newVal)
    }
  },

  mounted(){
    this.loadAPI()
  },

  methods: {
    loadAPI() {
      let APIname = ''  // API函数名的前缀,决定了其是样本(sample)或物证(evi),炸药(explo)或装置(dev)
      let IDname = ''
      /** 选择功能模块的类型 
       *  装置样本(devPartSample)  装置物证(devEvi) */
      switch (this.functionType) {
        case 'devShapeSamples': 
          APIname = 'createDevShapeSamples'
          IDname = 'devPartSample'
          import('@/api/sample-device').then(APImodule => this.setParam(APImodule, APIname, IDname))
          break
        case 'oPartImgSamples': 
          APIname = 'createOPartImgSamples'
          IDname = 'devPartSample'
          import('@/api/sample-device').then(APImodule => this.setParam(APImodule, APIname, IDname))
          break
        case 'devShapeEvis': 
          APIname = 'createDevShapeEvis'
          IDname = 'devEvi'
          import('@/api/evidence-device').then(APImodule => this.setParam(APImodule, APIname, IDname))
          break
        case 'oPartImgEvis': 
          APIname = 'createOPartImgEvis'
          IDname = 'devEvi'
          import('@/api/evidence-device').then(APImodule => this.setParam(APImodule, APIname, IDname))
          break
        default:
          console.log('!!! Error NO functionType !!!')
      }
    },
    setParam(APImodule, APIname, IDname) {
      this.createDataFile = APImodule[APIname]
      this.dataInfoId = IDname
    },

    /**  Submit  */
    beforeSubmit() {
      this.$watch('basicInfoId', this.handleSubmit)  // 监听基本信息的ID,当基本信息创建成功后会返回其ID,则可继续上传文件等信息
    },
    handleSubmit() {
      console.log(`---- ImgUpload -- $watch Img basicInfoId:`, this.basicInfoId)
      /** 去除未使用的形态图像 */
      if(!this.shapeImgList) {
        return console.log(`---- ImgUpload -- Img is empty!!!`)
      }
      this.shapeImgList.forEach((file, index) => {
        this.uploadShapeImg = new FormData()
        this.uploadShapeImg.append(this.dataInfoId, this.basicInfoId)
        this.uploadShapeImg.append('srcImgURL', file.raw)
        this.createDataFile(this.uploadShapeImg).then(res => {
            console.log(`${index}-${file.raw.name} 图片上传成功`)
            this.$message({
              message: `图片上传成功`,
              type: 'success'
            })
          }).catch(err => {
            this.$message({
              message: `上传图片错误:${err.message}`,
              type: 'error',
              duration: 6 * 1000
            })
          })
      })
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
      this.shapeImgList.push(file)
    },
    handlePreview(file) {
      // console.log('- - Preview - - file:', file.name)
      return this.$alert(` ${ file.name }  (${ file.size }字节)`, `图片`, {
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
      this.shapeImgList = fileList
      console.log('- - Remove - - .srcImgList:', this.shapeImgList)
    }
  }
}
</script>

<style scoped>

</style>

