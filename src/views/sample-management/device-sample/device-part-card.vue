<template>
  <div>
    <el-card shadow="hover">
      <div slot="header">
        <el-row>
          <el-col :span="23">
            <span>零件信息   ( {{ index+1 }} )</span>
          </el-col>
          <el-col :span="1">
            <el-button
              type="danger" 
              size="mini"
              icon="el-icon-close"
              @click="handleDeleteDevPart(index)"
              circle>
            </el-button>
          </el-col>
        </el-row>
      </div>

      <!-- 零件基本信息 -->
      <div>
        <el-form 
          ref="devPartForm" 
          :model="devPartData"
          :label-position="labelPosition"
          label-width="80px">

          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="零件名称">
                <el-input v-model="devPartData.sname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="">
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="零件产地">
                <el-input v-model="devPartData.Origin"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="零件厂家">
                <el-input v-model="devPartData.Factory"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="零件型号">
                <el-input v-model="devPartData.Model"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="零件商标">
                <el-input v-model="devPartData.Logo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="零件颜色">
                <el-input v-model="devPartData.Color"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="零件材质">
                <el-input v-model="devPartData.Material"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="零件形状">
                <el-input v-model="devPartData.Shape"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="零件厚度">
                <el-input v-model="devPartData.thickness"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="零件功能">
                <el-input v-model="devPartData.function"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input 
                  v-model="devPartData.note"
                  type="textarea"
                  placeholder="请输入...">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>

      <!-- 零件特征 -->
      <div>
        <el-collapse > 
          <el-collapse-item title="成分特征" name="ingredient">
            <el-row :gutter="15" class="el-row-style">

              <el-col :span="8">
                <el-card 
                  shadow="hover">
                  <div slot="header">
                    <span>FTIR</span>
                  </div>
                  <div @mousedown="handleIndex(index, 'FTIR')">
                    <el-form 
                      ref="FTIR" 
                      :model="devPartData.FTIRdata"
                      :label-position="labelPosition"
                      label-width="80px">
                      <el-form-item label="检测设备">
                        <el-input v-model="devPartData.FTIRdata.devDetect"></el-input>
                      </el-form-item>
                      <el-form-item label="检测方法">
                        <el-input v-model="devPartData.FTIRdata.methodDetect"></el-input>
                      </el-form-item>
                      <el-form-item label="上传文件">
                        <el-upload
                          action=""
                          ref="uploadFTIR"
                          :limit="10"
                          :file-list="devPartData.FTIRdata.fileList"
                          :on-change="handleChange"
                          :on-preview="handlePreview"
                          :auto-upload="false"
                          :before-remove="beforeRemove"
                          :on-remove="handleRemove"> 
                          <!-- :on-change="handleChange"  :auto-upload="false" :before-upload="beforeFileUpload"-->
                          <el-button 
                            slot="trigger"
                            size="small" 
                            type="primary"
                            @click="handleIndex(index, 'FTIR')">
                            <!-- slot="trigger"  -->
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
                  <div @mousedown="handleIndex(index, 'RAMAN')">
                    <el-form 
                      ref="RAMAN"
                      :model="devPartData.RAMANdata"
                      :label-position="labelPosition"
                      label-width="80px">
                      <el-form-item label="检测设备">
                        <el-input v-model="devPartData.RAMANdata.devDetect"></el-input>
                      </el-form-item>
                      <el-form-item label="检测方法">
                        <el-input v-model="devPartData.RAMANdata.methodDetect"></el-input>
                      </el-form-item>
                      <el-form-item label="上传文件">
                        <el-upload
                          action=""
                          ref="uploadRAMAN"
                          :limit="10"
                          :file-list="devPartData.RAMANdata.fileList"
                          :on-change="handleChange"
                          :on-preview="handlePreview"
                          :auto-upload="false"
                          :before-remove="beforeRemove"
                          :on-remove="handleRemove"> 
                          <el-button 
                            slot="trigger" 
                            size="small" 
                            type="primary"
                            @click="handleIndex(index, 'RAMAN')">
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
                  <div @mousedown="handleIndex(index, 'XRF')">
                    <el-form 
                      ref="XRF" 
                      :model="devPartData.XRFdata"
                      :label-position="labelPosition"
                      label-width="80px">
                      <el-form-item label="检测设备">
                        <el-input v-model="devPartData.XRFdata.devDetect"></el-input>
                      </el-form-item>
                      <el-form-item label="检测方法">
                        <el-input v-model="devPartData.XRFdata.methodDetect"></el-input>
                      </el-form-item>
                      <el-form-item label="上传文件">
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-card>
              </el-col>

            </el-row>
          </el-collapse-item>
        </el-collapse>

        <el-collapse > 
          <el-collapse-item title="形态特征" name="appearance">
            2
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DevicePartCard',
  props: {
    index: {
      type: Number,
      default: 0
    },
    devPartData: Object,
  },
  data() {
    return {
      labelPosition: 'left',
      devPartIndex: 0,
      devPartType: '',
      devRule: {
      },
    }
  },
  methods: {
    handleIndex(index, type) {
      this.devPartIndex = index
      this.devPartType = type
      console.log('- - handleIndex - - :', this.devPartIndex, this.devPartType)
    },
    handleDeleteDevPart(index) {
      console.log('- - DeleteDevPart - - index: ', index)
      this.$emit('delete-device-part', index)
    },

    /* upload file */
    handleChange(file, fileList) {
      console.log('- - Change - - file:', file.raw)
      console.log('- - Change - - fileList:', fileList)
      switch (this.devPartType) {
        case 'FTIR':
          this.devPartData.FTIRdata.fileList.push(file)
          // this.devPartData.FTIRdata.uploadFile.append('txtURL', file)
          console.log('- - Change - - .FTIRdata.fileList:', this.devPartData.FTIRdata.fileList)
          break
        case 'RAMAN':
          this.devPartData.RAMANdata.fileList.push(file)
          // this.devPartData.RAMANdata.uploadFile.append('txtURL', file)
          console.log('- - Change - - .RAMANdata.fileList:', this.devPartData.RAMANdata.fileList)
          break
        case 'XRF':
          this.devPartData.XRFdata.fileList.push(file)
          // this.devPartData.XRFdata.uploadFile.append('txtURL', file)
          console.log('- - Change - - .XRFdata.fileList:', this.devPartData.XRFdata.fileList)
          break
        default:
          console.log('! Error NO devPartType !')
      }

      for(let fileItem of fileList) {
        // console.log('- - Change - - fileItem:', fileItem)
      }
    },

    handlePreview(file) {
      console.log('- - Preview - - file:', file.name, file)
    },

    beforeRemove(file, fileList) {
      return  this.$confirm(`确定删除 ${ file.name } 吗？`, '提 示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取 消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  message: '正在删除...',
                  type: 'warning'
                })
                return true
              }).catch(() => {
                this.$message({
                  message: '取消操作'
                })
                return false
              })
    },
    handleRemove(file, fileList) {
      console.log('- - Remove - - file:', file.name)
      console.log('- - Remove - - fileList:', fileList)
      switch (this.devPartType) {
        case 'FTIR':
          this.devPartData.FTIRdata.fileList = fileList
          console.log('- - Remove - - .FTIRdata.fileList:', this.devPartData.FTIRdata.fileList)
          break
        case 'RAMAN':
          this.devPartData.RAMANdata.fileList = fileList
          console.log('- - Remove - - .RAMANdata.fileList:', this.devPartData.RAMANdata.fileList)
          break
        case 'XRF':
          this.devPartData.XRFdata.fileList = fileList
          console.log('- - Remove - - .XRFdata.fileList:', this.devPartData.XRFdata.fileList)
          break
        default:
          console.log('! Error NO devPartType !')
      }
    }
  },
}
</script>

<style scoped>

</style>
