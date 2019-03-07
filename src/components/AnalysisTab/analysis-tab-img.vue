<template>
  <div>
    <el-row class="img-operation-container">
      <el-col :span="24">
        <el-button-group>
          <el-button 
            type="primary"
            size="mini"
            icon="el-icon-arrow-right">
            旋转
          </el-button>
          <el-button 
            type="primary"
            size="mini"
            icon="el-icon-arrow-right">
            尺度
          </el-button>
          <el-button 
            type="success"
            size="mini"
            icon="el-icon-upload2">
            
          </el-button>
        </el-button-group>

        <el-button-group>
          <el-button 
            type="primary"
            size="mini"
            icon="el-icon-arrow-right">
            前景
          </el-button>
          <el-button 
            type="primary"
            size="mini"
            icon="el-icon-arrow-right">
            背景
          </el-button>
          <el-button 
            type="success"
            size="mini"
            icon="el-icon-circle-check-outline">
            
          </el-button>
        </el-button-group>
      </el-col>

    </el-row>

    <el-row>
      <div class="img-container">
        <el-col :span="12" :offset="0">
            <!-- {{ detectionType }} -->
            <!-- <img src="@/assets/4_123.jpg"> -->-
        </el-col>
        <el-col :span="12" :offset="10">
          <!-- {{ detectionType }} -->
          <img src="@/assets/4_123.jpg">
        </el-col>
      </div>
    </el-row>

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
  background-color: whitesmoke;
}
</style>
