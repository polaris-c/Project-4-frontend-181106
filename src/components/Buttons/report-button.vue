<template>
  <div id="ReportButton">
    <el-button 
      type="primary" 
      @click="beforeReport"
      icon="el-icon-document"
      class="">
      报 告
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'ReportButton',
  methods: {
    beforeReport() {
      this.$confirm('确定生成报告吗？', ' 提 示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'info'
      }).then(() => {
        this.$message({
          message: '报告生成中...',
          type: 'success'
        })
        this.$emit('report-confirm')
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

