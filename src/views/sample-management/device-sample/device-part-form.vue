<template>
  <transition name="el-fade-in-linear">
    <div v-show="showCard">
      <el-card shadow="hover">
        <!-- 卡片头部 -->
        <div slot="header">
          <el-row>
            <!-- 卡片标题 -->
            <el-col :span="23"  style="padding-top: 5px;">
              <span>零件信息  [ {{ index+1 }} ]</span>
            </el-col>
            <!-- 删除卡片按钮 -->
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

            <!-- 图片 -->
            <el-collapse-item title="零件形态" name="appearance">
              <img-upload
                ref="imgUpload"
                :function-type="devPartSample"
                :basic-info-id = "basicInfoData.id">
              </img-upload>
            </el-collapse-item>

            <!-- 零件基本信息 -->
            <el-collapse-item title="基本信息" name="baseInfo">
              <div>
                <el-form 
                  ref="devPartForm" 
                  :model="basicInfoData"
                  :label-position="labelPosition"
                  label-width="80px">

                  <el-row :gutter="40">
                    <el-col :span="12">
                      <el-form-item label="零件名称">
                        <el-input v-model="basicInfoData.sname"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="零件类型">
                        <el-select 
                          class="el-select-style"
                          v-model="basicInfoData.sampleType" 
                          placeholder="请选择零件类型"
                          filterable>
                          <el-option
                            label="外壳"
                            value="1">
                          </el-option>
                          <el-option
                            label="零件"
                            value="2">
                          </el-option>
                          <el-option
                            label="电路版"
                            value="3">
                          </el-option>
                          <el-option
                            label="Logo"
                            value="4">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="40">
                    <el-col :span="12">
                      <el-form-item label="零件产地">
                        <el-input v-model="basicInfoData.Origin"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="零件厂家">
                        <el-input v-model="basicInfoData.Factory"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="40">
                    <el-col :span="12">
                      <el-form-item label="零件型号">
                        <el-input v-model="basicInfoData.Model"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="零件商标">
                        <el-input v-model="basicInfoData.Logo"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="40">
                    <el-col :span="12">
                      <el-form-item label="零件颜色">
                        <el-input v-model="basicInfoData.Color"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="零件材质">
                        <el-input v-model="basicInfoData.Material"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="40">
                    <el-col :span="12">
                      <el-form-item label="零件形状">
                        <el-input v-model="basicInfoData.Shape"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="零件厚度">
                        <el-input v-model="basicInfoData.thickness"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="40">
                    <el-col :span="12">
                      <el-form-item label="零件功能">
                        <el-input v-model="basicInfoData.function"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="备注">
                        <el-input 
                          v-model="basicInfoData.note"
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
            <el-collapse-item title="零件成分" name="ingredient">
              <el-row :gutter="15" class="el-row-style">
                <el-col 
                  :span="8" 
                  v-for="dataType in dataTypeList" 
                  :key="dataType">
                  <card-common
                    ref="commonDataType"
                    function-type="devPartSample"
                    :basic-info-id = "basicInfoData.id"
                    :data-type = "dataType"
                    :dev-detect-list = "devDetectList"
                    :method-detect-list = "methodDetectList">
                  </card-common>
                </el-col>
              </el-row>
            </el-collapse-item>

          </el-collapse>

        </div>
      </el-card>
    </div>
  </transition>
</template>

<script>
import { getDevDetectsList, getMethodDetectsList} from '@/api/detection-option'
import { createDevPartSample, createDevShapeSamples, createOPartImgSamples} from '@/api/sample-device'
import CardCommon from '@/components/IngredientCard/card-common'
import ImgUpload from '@/components/ImgUpload'

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
    devDataId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      showCard: true,
      activeNames: ['appearance', 'baseInfo'],
      labelPosition: 'left',
      formRule: { },
      dataTypeList: ['FTIR', 'Raman', 'XRF'],  // 基本检测类型  XRD,GCMS是炸药原材料特有
      devDetectList: [],  // 检测设备信息列表
      methodDetectList: [],  // 检测方法列表
      basicInfoData: this.devPartData,  // 存放基本信息
      devPartSample: '',
      uploadBasicInfo: {},  // 上传基本信息
      shapeImgList: [],  // 存放图片列表
      uploadShapeImg: {},  // 上传形态图片
      tableParams: {
        page: 1,
        page_size: 100,
      }
    }
  },
  components: {
    CardCommon,
    ImgUpload
  },

  mounted() {
    this.fetchOption()
    this.uploadBasicInfo = new FormData()
  },

  methods: {
    fetchOption() {
      getDevDetectsList(this.tableParams).then(res => {
        this.devDetectList = res.results
      }).catch(err => {
        this.$message({
          message: '获取检测设备列表错误' + err.message,
          type: 'error',
          duration: 6 * 1000
        })
      })
      getMethodDetectsList(this.tableParams).then(res => {
        this.methodDetectList = res.results
      }).catch(err => {
        this.$message({
          message: '获取检测方法列表错误' + err.message,
          type: 'error',
          duration: 6 * 1000
        })
      })
    },

    /**  Submit  */
    beforeSubmit() {
      this.$watch('devDataId', this.handleSubmit)  // 监听基本信息的ID,当基本信息创建成功后会返回其ID,则可继续上传文件等信息
    },
    handleSubmit() {
      console.log('---- DevicePartForm -- handleSubmit devDataId:', this.devDataId)
      this.basicInfoData.devSample = this.devDataId  // 获取组件id, 用于发送零件信息
      /** 判断是否电路版 */
      if(Number(this.basicInfoData.sampleType) === 3) {
        this.devPartSample = 'devShapeSamples'
      } else {
        this.devPartSample = 'oPartImgSamples'
      }
      /** 加载uploadBasicInfo */
      for(let prop in this.basicInfoData) {
        if(this.basicInfoData.hasOwnProperty(prop)) {
          this.uploadBasicInfo.append(prop, this.basicInfoData[prop])
        }
      }
      /** 创建零件 */
      createDevPartSample(this.uploadBasicInfo).then(res => {
        this.basicInfoData.id = res.id  // 获取零件id,用于发送零件检测数据文件
        /** 上传检测信息与数据文件 */
        this.$refs.commonDataType.forEach(component => {
          component.beforeSubmit()
        })
        /** 上传形态图片 */
        this.$refs.imgUpload.beforeSubmit()
      }).catch(err => {
        console.log('---- DevicePartForm -- createDevPartSample err:', err)
        this.$message({
          message: '基本信息错误' + err.message,
          type: 'error',
          duration: 10 * 1000
        })
      })
    },
    /*
    submitImg() {
      createDevShapeSamples(this.uploadShapeImg).then(res => {
        // console.log('---- DevicePartForm -- createDevShapeSamples is OK!')
      }).catch(err => {
        console.log('---- DevicePartForm -- createDevShapeSamples err:', err)
      })
    },*/

    /** 删除零件 */
    handleDeleteDevPart(index) {
      console.log('- - DeleteDevPart - - index: ', index)
      this.$confirm('确定删除此零件吗？', '提 示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        this.showCard = false,
        this.$message({
          message: '正在删除...',
          type: 'warning'
        })
        const _this = this
        setTimeout(() => { _this.$emit('delete-device-part', index) }, 1000)
        // this.$emit('delete-device-part', index)
      }).catch(() => {
        this.$message({
          message: '取消操作'
        })
      })
    },
  },
}
</script>

<style scoped>
.el-fade-in-linear-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.el-select-style {
  width: 350px;
}
</style>
