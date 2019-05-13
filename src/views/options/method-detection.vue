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
          v-loading="loading"
          class="form-table"
          ref="detectionMethodList"
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
import { getMethodDetectsList, createMethodDetects, deleteMethodDetects} from '@/api/detection-option'

export default {
  name: 'DetectionMethod',
  data() {
    return {
      loading: false,
      detectionMethodData: {
        method: 'X-method',
        note: '',
      },
      tableData: [
        {
          method: 'FTIR-method',
          note: 'FTIR-DD-001',
        }
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
      getMethodDetectsList(this.tableParams).then(res => {
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
      console.log('- - submit - - methodName:', this.detectionMethodData.method)
      createMethodDetects(this.detectionMethodData).then(res => {
        this.$message({
          message: `检测方法${res.method}上传完毕`,
          type: 'success',
          duration: 6 * 1000
        })
        this.fetchData()
        this.detectionMethodData = {
          method: 'X-method',
          note: '',
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
