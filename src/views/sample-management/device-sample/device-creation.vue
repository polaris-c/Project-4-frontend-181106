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
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>零件信息</span>
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
                1
              </el-collapse-item>
            </el-collapse>
            <el-collapse > 
              <el-collapse-item title="形态特征" name="appearance">
                2
              </el-collapse-item>
            </el-collapse>
          </div>
          <!-- 删除零件 -->
          <div>
            <delete-button></delete-button>
          </div>
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
        note: '1111'
      },
      devPartData: {
        sname: 'A001',
        Origin: 'AO',
        Factory: 'AF',
        Model: 'AM',
        Logo: 'AL',
        function: 'AF',
        Color: '',
        Material: '',
        Shape: '',
        thickness: '',
        note: '1111'
      },
      devRule: {
      },
      FTIRData: {
        devDetect: '',
        methodDetect: ''
      },
      FTIRFile: [],
      uploadFTIRFile: {}
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
    ])
  },
  methods: {
    handleAddDevPart() {

    },
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
