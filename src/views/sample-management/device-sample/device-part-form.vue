<template>
  <div>
    <el-card shadow="hover">
      <!-- 卡片标题 -->
      <div slot="header">
        <el-row>
          <el-col :span="23"  style="padding-top: 5px;">
            <span>零件信息  < {{ index+1 }} ></span>
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

      <!-- 零件表单 -->
      <div class="card-collapse">

        <el-collapse v-model="activeNames"> 
          <!-- 零件基本信息 -->
          <el-collapse-item title="基本信息" name="baseInfo">
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
          </el-collapse-item>

          <!-- 成分 -->
          <el-collapse-item title="成分特征" name="ingredient">
            <el-row :gutter="15" class="el-row-style">
              <el-col :span="8">
                <el-card shadow="hover">
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
                          :file-list="devPartData.FTIRdata.fileList"
                          :limit="20"
                          :on-exceed="handleExceed"
                          :on-change="handleChange"
                          :on-preview="handlePreview"
                          :before-remove="beforeRemove"
                          :on-remove="handleRemove"
                          :auto-upload="false"
                          multiple> 
                          <!-- :on-change="handleChange"  :auto-upload="false" :before-upload="beforeFileUpload"-->
                          <el-button 
                            slot="trigger"
                            size="mini" 
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
                          :file-list="devPartData.RAMANdata.fileList"
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

          <!-- 图片 -->
          <el-collapse-item title="形态特征" name="appearance">
            <!-- <el-upload
              class=""
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list=""
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload> -->
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DevicePartForm',
  props: {
    index: {
      type: Number,
      default: 0
    },
    devPartData: {
      type: Object,
    },
  },
  data() {
    return {
      activeNames: ['baseInfo'],
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

    /*  Upload  */
    handleExceed(files, fileList) {
      this.$message({
        message: `限制最多上传20个文件，本次选择了${files.length}个，共选择了${files.length + fileList.length}个文件`,
        type: 'warning',
        duration: 9000,
      })
    },

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
    },

    handlePreview(file) {
      console.log('- - Preview - - file:', file.name)
      return this.$alert(`  ${ file.name }`, `${ this.devPartType }`, {
        confirmButtonText: '确定',
        type: 'success'
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
