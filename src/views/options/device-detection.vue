<template>
  <div class="app-main-container">
    <el-card 
      shadow="hover"
      class="el-row-style">
      <div slot="header">
        检测设备
      </div>
      <div>
        <el-form
          ref="baseForm" 
          :model="detectionDeviceData"
          label-position="left"
          label-width="80px">
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="设备名称">
                <el-input v-model="detectionDeviceData.deviceName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备型号">
                <el-input v-model="detectionDeviceData.deviceVersion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row :gutter="40" class="el-row-style">
            <el-col :span="12">
              <el-form-item label="设备厂家">
                <el-input v-model="detectionDeviceData.detectMrfs"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input 
                  v-model="detectionDeviceData.note"
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
          v-loading="loading"
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
            prop="deviceName"
            label="设备名称"
            align="center"
            width="160">
          </el-table-column>

          <el-table-column
            prop="deviceVersion"
            label="设备型号"
            align="center"
            width="250">
          </el-table-column>

          <el-table-column
            prop="detectMrfs"
            label="设备厂家"
            align="center"
            width="250">
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
import { getDevDetectsList, createDevDetects, deleteDevDetects} from '@/api/detection-option'

export default {
  name: 'DetectionDevice',
  data() {
    return {
      loading: false,
      detectionDeviceData: {
        deviceName: 'FTIR-Device',
        deviceVersion: '',
        detectMrfs: '',
        note: '',
      },
      tableData: [
        {
          deviceName: 'FTIR-Device',
          deviceVersion: 'F-A001',
          detectMrfs: 'FM1',
          note: 'FTIR-DD-001',
        },
        {
          deviceName: 'RAMAN-Device',
          deviceVersion: 'RAMAN-A002',
          detectMrfs: 'FM2',
          note: 'RAMAN-DD-001, qwertyiooidl fldspowlld fldfcmvdfrgore djogrefndsfsd; sfdfgdgr dfgdfgdcbh;lppkppmy[[fs[redlkgg',
        },
        {
          deviceName: 'XRD-Device',
          deviceVersion: 'XRD-A003',
          detectMrfs: 'FM2',
          note: 'XRD-DD-001',
        },
        {
          deviceName: 'XRF-Device',
          deviceVersion: 'XRF-A003',
          detectMrfs: 'FM2',
          note: 'XRF-DD-001',
        },
      ],
      multipleSelection: [],
      tableParams: {
        search: null,
        page: 1,
        page_size: 20,
        count: 1,
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
    SubmitButton,
    DeleteButton
  },
  mounted() {
    this.loading = true
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getDevDetectsList(this.tableParams).then(res => {
        this.tableData = res.results
        this.tableParams.count =  res.count
      }).catch(err => {
        this.$message({
          message: '获取列表错误' + err.message,
          type: 'error',
          duration: 6 * 1000
        })
      })
      this.loading = false
    },

    handleSubmit() {
      console.log('- - submit - - deviceName:', this.detectionDeviceData.deviceName)
      createDevDetects(this.detectionDeviceData).then(res => {
        this.$message({
          message: `检测设备${res.deviceName}上传完毕`,
          type: 'success',
          duration: 6 * 1000
        })
        this.fetchData()
        this.detectionDeviceData = {
          deviceName: 'FTIR-Device',
          deviceVersion: '',
          detectMrfs: '',
          note: 'Test',
        }
      }).catch(err => {
        this.$message({
          message: '上传检测设备错误' + err.message,
          type: 'error',
          duration: 6 * 1000
        })
      })
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
