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
        <el-card shadow="hover">
          <div slot="header">
            <el-row>
              <el-col :span="23">
                <span>零件信息   ( {{index+1}} )</span>
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
                <el-row :gutter="20" class="el-row-style">

                  <el-col :span="8">
                    <el-card shadow="hover">
                      <div slot="header">
                        <span>FTIR</span>
                      </div>
                      <div>
                        <el-form 
                          ref="FTIR" 
                          :model="devPartData.FTIRdata"
                          :label-position="labelPosition"
                          label-width="100px">
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
                              :file-list="devPartData.FTIRdata.FTIRfileList"
                              :on-change="handleChange"
                              :on-preview="handlePreview"
                              :before-upload="beforeFileUpload"> 
                              <!-- :on-change="handleChange"  :auto-upload="false"-->
                              <el-button 
                                slot="trigger" 
                                size="small" 
                                type="primary"
                                @click="handleIndex(index, 'FTIR')">
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
                      <div>
                        <el-form 
                          ref="RAMAN"
                          :model="devPartData.RAMANdata"
                          :label-position="labelPosition"
                          label-width="100px">
                          <el-form-item label="检测设备">
                            <el-input v-model="devPartData.RAMANdata.devDetect"></el-input>
                          </el-form-item>
                          <el-form-item label="检测方法">
                            <el-input v-model="devPartData.RAMANdata.methodDetect"></el-input>
                          </el-form-item>
                          <el-form-item label="上传文件">
                            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                            <el-upload
                              action=""
                              ref="uploadRAMAN"
                              :limit="10"
                              :file-list="devPartData.RAMANdata.RAMANfileList"
                              :on-change="handleChange"
                              :on-preview="handlePreview"
                              :before-upload="beforeFileUpload"> 
                              <!-- :on-change="handleChange"  :auto-upload="false"-->
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
                      <div>
                        <el-form 
                          ref="XRF" 
                          :model="devPartData.XRFdata"
                          :label-position="labelPosition"
                          label-width="100px">
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
          <!-- 删除零件 -->
          <!-- <div>
            <delete-button></delete-button>
          </div> -->
        </el-card>
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
            FTIRfileList: [],
          },
          RAMANdata: {
            devDetect: '',
            methodDetect: '',
            RAMANfileList: [],
          },
          XRFdata: {
            devDetect: '',
            methodDetect: '',
            XRFfileList: [],
          },
        },
      ],
      // FTIRfileList: [],
      // uploadFTIRfile: {},
      devPartIndex: 0,
      devPartType: '',
      devRule: {
      },
    }
  },
  components: {
    GobackButton,
    SubmitButton,
    DeleteButton
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
    this.uploadFTIRfile = new FormData()
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
            FTIRfileList: [],
            uploadFTIRfile: new FormData()
          },
          RAMANdata: {
            devDetect: '',
            methodDetect: '',
            RAMANfileList: [],
          },
          XRFdata: {
            devDetect: '',
            methodDetect: '',
            XRFfileList: [],
          },
        }
      )
      // console.log('- - before - - ref FTIR:', this.$refs.FTIR)
      // console.log('- - before - - ref devPartForm:', this.$refs.devPartForm)
    },
    handleDeleteDevPart(index) {
      console.log('- - DeleteDevPart - - index: ', index)
      this.devPartDataList.splice(index, 1)
      console.log('- - DeleteDevPart - - FTIRfileList:', this.FTIRfileList)
      for(let value of this.uploadFTIRfile.values()) {
        console.log('- - DeleteDevPart- - uploadFTIRfile value:', value)
      }
    },
    handleIndex(index, type) {
      this.devPartIndex = index
      this.devPartType = type
    },

    /* upload file */
    handleChange(file, fileList) {
      for(let fileItem of fileList) {
        // console.log('- - Change - - fileItem:', fileItem)
      }
      // this.FTIRfileList = fileList
      // console.log('- - Change - - FTIRfileList:', this.FTIRfileList)
      // console.log('- - Change - - file:', file)
    },
    beforeFileUpload(file) {
      console.log('- - before - - index:', this.devPartIndex)
      console.log('- - before - - devPartType:', this.devPartType)
      // console.log('- - before - - file typeof:', typeof(file))
      // console.log('- - before - - file:', file)
      if(this.devPartType === 'FTIR') {
        this.devPartDataList[this.devPartIndex].FTIRdata.FTIRfileList.push(file)
        console.log('- - before - - FTIRfileList:', this.devPartDataList[this.devPartIndex].FTIRdata.FTIRfileList)
      } else {
        this.devPartDataList[this.devPartIndex].RAMANdata.RAMANfileList.push(file)
        console.log('- - before - - RAMANfileList:', this.devPartDataList[this.devPartIndex].RAMANdata.RAMANfileList)
      }
      
      // this.uploadFTIRfile.append('txtURL', file)
      // console.log('- - before- - uploadFTIRfile:', this.uploadFTIRfile)

      // for(let key of this.uploadFTIRfile.keys()) {
      //   console.log('- - before- - uploadFTIRfile key:', key)
      // }
      // // console.log('- - before- - uploadFTIRfile value len:', this.uploadFTIRfile.values())
      // for(let value of this.uploadFTIRfile.values()) {
      //   console.log('- - before- - uploadFTIRfile value:', value)
      // }
      return false
    },
    handlePreview(file) {
      console.log('- - Preview - - file:', file.name, file)
    },

    /* submit */ 
    handleSubmit() {
      console.log('- - submit - - devData:', this.devData.sname)
    },
    goBcak() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceList')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
