<template>
  <div class="dashboard-container">
    explosive-creation
    <div>name:{{ name }}</div>

    <div>
      <el-form 
        ref="form" 
        :model="formData"
        :rules="formRule"
        :label-position="labelPosition"
        label-width="100px">
        <el-form-item label="样本名称">
          <el-input v-model="formData.sname"></el-input>
        </el-form-item>
        <el-form-item label="样本名称缩写">
          <el-input v-model="formData.snameAbbr"></el-input>
        </el-form-item>
        <el-form-item label="样本产地">
          <el-input v-model="formData.sampleOrigin"></el-input>
        </el-form-item>
        <el-form-item label="样本厂家">
          <el-input v-model="formData.factory"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input 
            v-model="formData.note"
            type="textarea"
            placeholder="请输入...">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ExplosiveCreation',
  data() {
    return {
      labelPosition: 'left',
      formData: {
          // id: '001',
          sname: '',
          snameAbbr: '',
          sampleOrigin: '',
          factory: '',
          user: '',
          inputDate: '',
          note: '',
          picURL: ''
      },
      formRule: {

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

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
