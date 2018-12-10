<template>
  <div class="app-main-container">
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>物证残片基本信息</span>
          </div>
          <div>
            <el-row class="el-row-style">
              <el-col :span="8">零件编号: {{ devPartData.id }}</el-col>
              <el-col :span="8">零件名称：{{ devPartData.evidenceName }}</el-col>
              <el-col :span="8">案件名称：{{ devPartData.caseName }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">零件类型: {{ devPartData.eviType }}</el-col>
              <el-col :span="8">零件厂家：{{ devPartData.Factory }}</el-col>
              <el-col :span="8">案件型号：{{ devPartData.Model }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">零件商标: {{ devPartData.Logo }}</el-col>
              <el-col :span="8">处理人员：{{ devPartData.user }}</el-col>
              <el-col :span="8">录入日期：{{ devPartData.inputDate }}</el-col>
            </el-row>
            <el-row class="el-row-style">
              <el-col :span="8">备注: {{ devPartData.note }}</el-col>
            </el-row>
            <hr>
            <el-row>
              <el-col :span="2" :offset="20">
                <el-button 
                  type="primary" 
                  size="medium"
                  @click="analysisIngredient">
                  成分比对
                </el-button>
              </el-col>
              <el-col :span="2">
                <el-button 
                  type="primary" 
                  size="medium"
                  @click="analysisAppearance">
                  形态比对
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>语义筛选</span>
          </div>
          <div>

            <el-row class="el-row-style">
              <el-checkbox-group 
                v-model="checkList"
                @change="handleCheckListChange">
                <el-col :span="5">
                  <el-checkbox label="Color" border>颜 色： {{ devPartData.Color }}</el-checkbox>
                </el-col>
                <el-col :span="5">
                  <el-checkbox label="Material" border>材 质：{{ devPartData.Material }}</el-checkbox>
                </el-col>
                <el-col :span="5">
                  <el-checkbox label="Shape" border>形 状： {{ devPartData.Shape }}</el-checkbox>
                </el-col>
                <el-col :span="5">
                  <el-checkbox label="thickness" border>厚 度：{{ devPartData.thickness }}</el-checkbox>
                </el-col>
                <el-col 
                  :span="2"
                  :offset="2">
                  <el-button 
                    type="primary" 
                    size="medium"
                    icon="el-icon-search"
                    @click="analysisFilter">
                    筛 选
                  </el-button>
                </el-col>
              </el-checkbox-group>
            </el-row>

            <span>已选物证属性:</span>
            <el-tag
              v-for="checkItem in checkListTranslation" 
              :key="checkItem"
              class="tag-check">
              {{ checkItem }}
            </el-tag>

            <hr>

            <el-table
              v-if="visibleTable"
              class="app-main-table"
              ref="deviceList"
              :data="tableData"
              style="width: 100%"
              tooltip-effect="dark"
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
                label="物证序号"
                align="center"
                width="150"
                fixed="left">
                <template slot-scope="scope">
                  <el-button 
                    type="text"
                    @click="detail(scope.row)">
                    {{ scope.row.id }}
                  </el-button>
                </template>
              </el-table-column>

              <el-table-column
                prop="evidenceName"
                label="物证名称"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                prop="caseName"
                label="案件名称"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                prop="eviType"
                label="物证类型"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                prop="Factory"
                label="物证厂家"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                prop="Model"
                label="物证型号"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                prop="Logo"
                label="物证商标"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                prop="Color"
                label="物证颜色"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                prop="Material"
                label="物证材质"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                prop="Shape"
                label="物证形状"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                prop="thickness"
                label="物证厚度"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                prop="user"
                label="处理人员"
                align="center"
                width="150">
              </el-table-column>

              <el-table-column
                label="录入日期"
                align="center"
                width="150"
                fixed="right">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span>{{ scope.row.inputDate }}</span>
                </template>
              </el-table-column>

            </el-table>

            <div v-else><span>请选择需要考虑的属性并执行筛选</span></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <el-col :span="2">
          <goback-button @goback-confirm="goBcak"></goback-button>
        </el-col>
        <el-col 
          :span="2"
          :offset="20">
          <report-button @report-confirm="handleReport"></report-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GobackButton from '@/components/Buttons/goback-button'
import ReportButton from '@/components/Buttons/report-button'

export default {
  name: 'AnalysisDeviceDetail',
  data() {
    return {
      devPartData: {
        id: '001',
        evidenceName: 'A001',
        caseName: 'A1',
        eviType: '1',
        Factory: 'AF',
        Model: 'AM',
        Logo: 'AL',
        Color: 'AF',
        Material: 'AF',
        Shape: 'AF',
        thickness: 'AF',
        user: 'user001',
        inputDate: '2018-11-19',
        note: '1111'
      },
      // checkList: ['Color', 'Material', 'Shape', 'thickness'],
      checkList: ['Color'],
      visibleTable: false,
      tableData: [
        {
          id: '001',
          evidenceName: 'A001',
          caseName: 'A1',
          eviType: '1',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          Color: 'AF',
          Material: 'AF',
          Shape: 'AF',
          thickness: 'AF',
          user: 'user001',
          inputDate: '2018-11-19',
          note: '1111'
        },
        {
          id: '002',
          evidenceName: 'A002',
          caseName: 'A2',
          eviType: '2',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          Color: 'AC',
          Material: 'AM',
          Shape: 'AS',
          thickness: 'AF',
          user: 'user002',
          inputDate: '2018-11-19',
          note: '1112'
        },
        {
          id: '003',
          evidenceName: 'A003',
          caseName: 'A3',
          eviType: '3',
          Factory: 'AF',
          Model: 'AM',
          Logo: 'AL',
          Color: 'AC',
          Material: 'AM',
          Shape: 'AS',
          thickness: 'AF',
          user: 'user003',
          inputDate: '2018-11-19',
          note: '1113'
        },
      ],
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
    ]),
    checkListTranslation() {
      return this.checkList.map((value) => {
        switch (value) {
          case 'Color': 
            return '颜 色'
            break
          case 'Material': 
            return '材 质'
            break
          case 'Shape': 
            return '形 状'
            break
          case 'thickness': 
            return '厚 度'
            break
          default:
            console.log('!!! Error Can\'t find CheckItem !!!')
            return 'Error Can\'t find CheckItem'
        }
      })
    }
  },
  components:{
    GobackButton,
    ReportButton,
  },
  methods: {
    analysisIngredient() {
      this.$router.push('/analysis/deviceAnalysis/deviceIngredient')
    },
    analysisAppearance() {
      this.$router.push('/analysis/deviceAnalysis/deviceAppearance')
    },
    analysisFilter() {
      // this.$router.push('/analysis/deviceAnalysis/deviceFilter')
      this.visibleTable = true

    },
    handleCheckListChange(currentCheckList) {
      console.log('- - AnalysisDeviceDetail - - handleCheckListChange:', currentCheckList)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('- - DeviceList - - multipleSeletion:', this.multipleSelection)
    },
    detail(row) {
      console.log('- - ExplosiveList - - row:', row.id, row.evidenceName)
      this.$router.push('/evidenceManagement/deviceEvidence/deviceIndexList/deviceDetail/' + row.id)
    },

    /** 页面操作按键 */
    handleReport() {

    },
    goBcak() {
      this.$router.push('/analysis/deviceAnalysis/deviceList')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
.tag-check {
  margin-left: 10px;
}
</style>
