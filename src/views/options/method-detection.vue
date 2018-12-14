<template>
  <div class="app-main-container">
    <el-card shadow="hover" class="el-row-style">
      <div slot="header">
        检测方法
      </div>
      <div>
        <el-form
          ref="baseForm" 
          :model="detectionMethodData"
          label-position="left"
          label-width="80px">
          <el-row :gutter="40" class="el-row-style">
            <el-col :span="12">
              <el-form-item label="检测方法">
                <el-input v-model="detectionMethodData.method"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input 
                  v-model="detectionMethodData.note"
                  type="textarea"
                  placeholder="请输入...">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-row>
          <el-col :span="2" :offset="22">
            <submit-button @submit-confirm="handleSubmit"></submit-button>
          </el-col>
        </el-row>
      </div>

      <hr>

      <div>
        <el-table
          class="form-table"
          ref="detectionDeviceList"
          :data="tableData"
          style="width: 100%"
          tooltip-effect="light"
          @selection-change="handleSelectionChange"
          fit
          stripe
          border
          highlight-current-row>

          <el-table-column
            type="selection"
            align="center"
            width="50">
          </el-table-column>


          <el-table-column
            prop="method"
            label="检测方法"
            align="center"
            width="160">
          </el-table-column>

          <el-table-column
            prop="note"
            label="备注"
            align="center"
            show-overflow-tooltip>
          </el-table-column>

        </el-table>

        <el-row>
          <el-col :span="2" :offset="22">
            <delete-button @delete-confirm="handleDelete"></delete-button>
          </el-col>
        </el-row>
      </div>
    </el-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubmitButton from '@/components/Buttons/submit-button'
import DeleteButton from '@/components/Buttons/delete-button'

export default {
  name: 'DetectionMethod',
  data() {
    return {
      detectionMethodData: {
        method: 'FTIR-method',
        note: '',
      },
      tableData: [
        {
          method: 'FTIR-method',
          note: 'FTIR-DD-001',
        },
        {
          method: 'RAMAN-method',
          note: 'RAMAN-DD-001, qwertyiooidl fldspowlld fldfcmvdfrgore djogrefndsfsd; sfdfgdgr dfgdfgdcbh;lppkppmy[[fs[redlkgg',
        },
        {
          method: 'XRD-method',
          note: 'XRD-DD-001',
        },
        {
          method: 'XRF-method',
          note: 'XRF-DD-001',
        },
      ],
      multipleSelection: []
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
    SubmitButton,
    DeleteButton
  },
  mounted() {

  },
  methods: {
    handleSubmit() {
      console.log('- - submit - - deviceName:', this.detectionMethodData.method)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('- - multipleSeletion:', this.multipleSelection)
    },
    handleDelete() {
      console.log('- - delete: ', this.multipleSelection)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
hr {
  margin: 20px 0;
}

.form-table {
  margin: 20px 0;
}
</style>
