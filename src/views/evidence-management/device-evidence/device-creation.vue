<template>
  <div class="app-main-container">

    <!-- 物证基本信息 -->
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>物证残片基本信息</span>
          </div>
          <div>
            <el-form 
              ref="devPartForm" 
              :model="basicInfoData"
              :label-position="labelPosition"
              label-width="80px">

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="物证名称">
                    <el-input v-model="basicInfoData.evidenceName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="案件名称">
                    <el-input v-model="basicInfoData.caseName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="物证类型">
                    <el-select 
                      class="el-select-style"
                      v-model="basicInfoData.eviType" 
                      placeholder="请选择物证类型"
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
                <el-col :span="12">
                  <el-form-item label="物证厂家">
                    <el-input v-model="basicInfoData.Factory"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="物证型号">
                    <el-input v-model="basicInfoData.Model"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="物证商标">
                    <el-input v-model="basicInfoData.Logo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="物证颜色">
                    <el-input v-model="basicInfoData.Color"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="物证材质">
                    <el-input v-model="basicInfoData.Material"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="物证形状">
                    <el-input v-model="basicInfoData.Shape"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="物证厚度">
                    <el-input v-model="basicInfoData.thickness"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
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
          <div>
            <img-upload
              ref="imgUpload"
              function-type="devEvi"
              :basic-info-id = "basicInfoData.id">
            </img-upload>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 成分 -->
    <el-row :gutter="15" class="el-row-style">
      <el-col 
        :span="8" 
        v-for="dataType in dataTypeList" 
        :key="dataType">
        <card-common
          ref="commonDataType"
          function-type="devEvi"
          :basic-info-id = "basicInfoData.id"
          :data-type = "dataType"
          :dev-detect-list = "devDetectList"
          :method-detect-list = "methodDetectList">
        </card-common>
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
import { createDevEvi } from '@/api/evidence-device'
import { getDevDetectsList, getMethodDetectsList} from '@/api/detection-option'
import GobackButton from '@/components/Buttons/goback-button'
import SubmitButton from '@/components/Buttons/submit-button'
import CardCommon from '@/components/IngredientCard/card-common'
import ImgUpload from '@/components/ImgUpload'

export default {
  name: 'DeviceCreation',
  data() {
    return {
      labelPosition: 'left',
      basicInfoData: {
        id: null,
        evidenceName: 'Aa001',
        caseName: '',
        eviType: null,
        Factory: 'AaF',
        Model: 'AaM',
        Logo: 'AaL',
        Color: '1a',
        Material: '1a',
        Shape: '1a',
        thickness: '1a',
        note: '1111',
      },
      devRule: {},
      dataTypeList: ['FTIR', 'Raman', 'XRF'],  // 基本检测类型  XRD,GCMS是炸药原材料特有
      devDetectList: [],  // 检测设备信息列表
      methodDetectList: [],  // 检测方法列表
      uploadBasicInfo: {},  // 上传基本信息
      tableParams: {
        page: 1,
        page_size: 100,
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
    ])
  },
  components: {
    GobackButton,
    SubmitButton,
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

    /*  */ 
    handleSubmit() {
      console.log('- - submit - - basicInfoData:', this.basicInfoData.evidenceName)
      /** 加载uploadBasicInfo */
      for(let prop in this.basicInfoData) {
        if(this.basicInfoData.hasOwnProperty(prop)) {
          this.uploadBasicInfo.append(prop, this.basicInfoData[prop])
        }
      }
      /** 创建残片信息 */
      createDevEvi(this.uploadBasicInfo).then(res => {
        this.basicInfoData.id = res.id  // 获取残片id,用于发送残片成分检测数据文件与形态图片
        /** 上传成分检测信息与数据文件 */
        this.$refs.commonDataType.forEach(component => {
          component.beforeSubmit()
        })
        /** 上传形态图片 */
        this.$refs.imgUpload.beforeSubmit()
      }).catch(err => {
        console.log('---- DeviceCreation -- createDevEvi err:', err)
        this.$message({
          message: '基本信息错误' + err.message,
          type: 'error',
          duration: 10 * 1000
        })
      })
    },

    goBcak() {
      this.$router.push('/evidenceManagement/deviceEvidence/deviceIndexList/deviceList')
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-select-style {
  width: 350px;
}
</style>
