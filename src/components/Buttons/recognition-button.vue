<template>
  <div id="RecognitionButton">
    <el-button 
      type="primary" 
      size="medium"
      @click="beforeRecognition"
      icon="el-icon-view"
      class="">
      识 别
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'RecognitionButton',
  methods: {
    beforeRecognition() {
      this.$confirm('确定开始识别吗？计算需要一段时间', ' 提 示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'info'
      }).then(() => {
        this.$message({
          message: '识别中...',
          type: 'success'
        })
        this.$emit('recognition-confirm')
      }).catch(() => {
        this.$message({
          message: '取消操作'
        })
      })
    },
  }
}
</script>

<style scoped>

#buttons {
  margin: 0 0px 0 0px;
}

</style>

