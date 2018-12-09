<template>
  <div class="app-main-container">

    <!-- 零件基本信息 -->
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>物证残片基本信息</span>
          </div>
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
        </el-card>
      </el-col>
    </el-row>

    <!-- 成分 -->
    <el-row :gutter="15" class="el-row-style">
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span>FTIR</span>
          </div>
          <div @mousedown="handleIndex('FTIR')">
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
                    @click="handleIndex('FTIR')">
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
          <div @mousedown="handleIndex('RAMAN')">
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
          <div @mousedown="handleIndex('XRF')">
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

    <!-- 图片 -->
    <el-row :gutter="15" class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            形态图片
          </div>
          <div @mousedown="handleIndex('IMG')">
            <el-upload
              class=""
              action=""
              list-type="picture-card"
              :file-list="devPartData.srcImgList"
              :limit="20"
              :on-exceed="handleExceed"
              :on-change="handleChange"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :on-remove="handleRemove"
              :auto-upload="false"
              multiple>
              <el-button 
                size="mini" 
                type="primary"
                @mousedown="handleIndex('IMG')">
                点击选取
              </el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload>
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
  name: 'DeviceCreation',
  data() {
    return {
      labelPosition: 'left',
      devPartData: {
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
      uploadFile: {},
      devPartIndex: 0,
      devPartType: '',
      devRule: {
      },
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
    SubmitButton,
  },
  methods: {
    handleIndex(type) {
      this.devPartType = type
      console.log('- - handleIndex - - this.devPartIndex', this.devPartType)
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
          this.devPartData.FTIRdata.fileList.push(file)
          // this.devPartData.FTIRdata.uploadFile.append('txtURL', file)
          // console.log('- - Change - - .FTIRdata.fileList:', this.devPartData.FTIRdata.fileList)
          break
        case 'RAMAN':
          this.devPartData.RAMANdata.fileList.push(file)
          // this.devPartData.RAMANdata.uploadFile.append('txtURL', file)
          // console.log('- - Change - - .RAMANdata.fileList:', this.devPartData.RAMANdata.fileList)
          break
        case 'XRF':
          this.devPartData.XRFdata.fileList.push(file)
          // this.devPartData.XRFdata.uploadFile.append('txtURL', file)
          // console.log('- - Change - - .XRFdata.fileList:', this.devPartData.XRFdata.fileList)
          break
        case 'IMG':
          this.devPartData.srcImgList.push(file)
          // this.devPartData.uploadImg.append('srcImgURL', file)
          // console.log('- - Change - - .srcImgList:', this.devPartData.srcImgList)
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
        case 'IMG':
          this.devPartData.srcImgList = fileList
          console.log('- - Remove - - .srcImgList:', this.devPartData.srcImgList)
          break
        default:
          console.log('!!! Error NO devPartType !!!')
      }
    },

    /*  */ 
    handleSubmit() {
      console.log('- - submit - - devData:', this.devData.sname)
      for(const devPartData of this.devPartDataList) {
        console.log('- - submit - - devPartData:', devPartData.sname)
        // console.log('- - submit - - devPartData:', devPartData.FTIRdata.fileList)
      }
    },
    goBcak() {
      this.$router.push('/evidenceManagement/deviceEvidence/deviceIndexList/deviceList')
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
