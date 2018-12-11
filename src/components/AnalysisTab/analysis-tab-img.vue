<template>
  <div>
    <el-row class="img-operation-container">
      <el-col :span="24">
        <el-button-group>
          <el-button 
            type="primary"
            size="medium"
            icon="el-icon-arrow-right">
            直 线
          </el-button>
          <el-button 
            type="primary"
            size="medium"
            icon="el-icon-arrow-right">
            矩形框
          </el-button>
          <el-button 
            type="primary"
            size="medium"
            icon="el-icon-arrow-right">
            取 点
          </el-button>
          <el-button 
            type="success"
            size="medium"
            icon="el-icon-circle-check-outline">
            完 成
          </el-button>
        </el-button-group>
      </el-col>

    </el-row>
    <div class="img-container">
      {{ detectionType }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalysisTabImg',
  props: {
    detectionType: {
      type: String,
      default: 'Unknown',
    },
  },
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style scoped>
.img-operation-container {
  margin-bottom: 10px;
}
.img-container {
  width: 100%;
  height: 500px;
  background-color: lightgrey;
}
</style>
