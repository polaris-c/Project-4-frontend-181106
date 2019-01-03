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
              :model="evidenceData"
              :rules="formRule"
              :label-position="labelPosition"
              label-width="80px">

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="物证名称">
                    <el-input v-model="evidenceData.evidenceName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="案件名称">
                    <el-input v-model="evidenceData.caseName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="备注">
                    <el-input 
                      v-model="evidenceData.note"
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
          function-type="exploEvi"
          :basic-info-id = "evidenceData.id"
          :data-type = "dataType"
          :dev-detect-list = "devDetectList"
          :method-detect-list = "methodDetectList">
        </card-common>
      </el-col>
    </el-row>

    <el-row :gutter="15" class="el-row-style">
      <el-col :span="8">
        <card-common
          ref="XRD"
          function-type="exploEvi"
          :basic-info-id = "evidenceData.id"
          data-type = "XRD"
          :dev-detect-list = "devDetectList"
          :method-detect-list = "methodDetectList">
        </card-common>
      </el-col>
      <el-col :span="8">
        <card-common
          ref="GCMS"
          function-type="exploEvi"
          :basic-info-id = "evidenceData.id"
          data-type = "GCMS"
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
import GobackButton from '@/components/Buttons/goback-button'
import SubmitButton from '@/components/Buttons/submit-button'
import CardCommon from '@/components/IngredientCard/card-common'
import { getDevDetectsList, getMethodDetectsList} from '@/api/detection-option'
import { createExplosiveEvi } from '@/api/evidence-explosive'

export default {
  name: 'EvidenceExplosiveCreation',
  data() {
    return {
      labelPosition: 'left',
      evidenceData: {
        id: null,
        evidenceName: '',
        caseName: '',
        user: '',
        inputDate: '',
        note: '',
        picURL: '',
      },
      formRule: {
      },
      dataTypeList: ['FTIR', 'Raman', 'XRF'],  // 基本检测类型  XRD,GCMS是炸药原材料特有
      devDetectList: [],  // 检测设备信息列表
      methodDetectList: [],  // 检测方法列表
      uploadEvi: {},  //上传基本信息
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
    CardCommon
  },

  mounted() {
    this.fetchOption()
    this.uploadEvi = new FormData()
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
      /** 加载uploadEvi */
      for(let prop in this.evidenceData) {
        if(this.evidenceData.hasOwnProperty(prop)) {
          this.uploadEvi.append(prop, this.evidenceData[prop])
        }
      }
      createExplosiveEvi(this.uploadEvi).then(res => {
        /** 获取样本id,用于发送检测信息 */
        this.evidenceData.id = res.id
        // console.log(`---- EvidenceExplosiveCreation -- $refs`, this.$refs)
        this.$refs.basicDataType.forEach((component) => {
          component.beforeSubmit()
        }) 
        this.$refs.XRD.beforeSubmit()
        this.$refs.GCMS.beforeSubmit()
      }).catch(err => {
        console.log('---- EvidenceExplosiveCreation -- createExplosiveEvi err:', err)
        this.$message({
          message: '基本信息错误' + err.message,
          type: 'error',
          duration: 10 * 1000
        })
      })
    },

    goBcak() {
      this.$router.push('/evidenceManagement/explosiveEvidence/explosiveIndexList/explosiveList')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
