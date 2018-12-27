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
      <el-col 
        :span="8" 
        v-for="dataType in dataTypeList" 
        :key="dataType">
        <card-common
          ref="basicDataType"
          :sampleDataID = "sampleData.id"
          :dataType = "dataType"
          :devDetectList = "devDetectList"
          :methodDetectList = "methodDetectList">
        </card-common>
      </el-col>
    </el-row>

    <el-row :gutter="15" class="el-row-style">
      <el-col :span="8">
        <card-common
          ref="XRD"
          :sampleDataID = "sampleData.id"
          dataType = "XRD"
          :devDetectList = "devDetectList"
          :methodDetectList = "methodDetectList">
        </card-common>
      </el-col>
      <el-col :span="8">
        <card-common
          ref="GCMS"
          :sampleDataID = "sampleData.id"
          dataType = "GCMS"
          :devDetectList = "devDetectList"
          :methodDetectList = "methodDetectList">
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
import GobackButton from '@/components/Buttons/goback-button'
import SubmitButton from '@/components/Buttons/submit-button'
import CardCommon from '@/components/IngredientCard/card-common'
import { getDevDetectsList, getMethodDetectsList} from '@/api/detection-option'
import { createExplosiveSample } from '@/api/sample-explosive'

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
      },
      formRule: {
      },
      dataTypeList: ['FTIR', 'RAMAN', 'XRF'],  // 基本检测类型  XRD,GCMS是炸药原材料特有
      devDetectList: [],  // 检测设备信息列表
      methodDetectList: [],  // 检测方法列表
      uploadSample: {},  //上传基本信息
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
      'sidebar',
      'device',
      'token',
      'avatar',
    ])
  },
  components: {
    GobackButton,
    SubmitButton,
    CardCommon
  },

  mounted() {
    this.fetchOption()
    this.uploadSample = new FormData()
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

    /** 页面上传操作  */
    /** 样本基本信息 */
    handleSubmit() {
      /** 加载uploadSample */
      for(let prop in this.sampleData) {
        if(this.sampleData.hasOwnProperty(prop)) {
          this.uploadSample.append(prop, this.sampleData[prop])
        }
      }
      createExplosiveSample(this.uploadSample).then(res => {
        /** 获取样本id,用于发送检测信息 */
        this.sampleData.id = res.id
        // console.log(`---- ExplosiveCreation -- $refs`, this.$refs)
        this.$refs.basicDataType.forEach((component) => {
          component.beforeSubmit()
        }) 
        this.$refs.XRD.beforeSubmit()
        this.$refs.GCMS.beforeSubmit()
      }).catch(err => {
        console.log('---- ExplosiveCreation -- createExplosiveSample err:', err)
        this.$message({
          message: '基本信息错误' + err.message,
          type: 'error',
          duration: 10 * 1000
        })
      })
    },

    goBcak() {
      this.$router.push('/sampleManagement/explosiveSample/explosiveIndexList/explosiveList')
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-select-style {
  width: 316px;
}
</style>
