<template>
  <div id="CheckButton">
    <el-button 
      type="success" 
      size="medium"
      @click="beforeCheck"
      icon="el-icon-check"
      class="">
      核 准
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  methods: {
    beforeCheck() {
      this.$confirm('确定核准此样本吗？', ' 提 示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'info'
      }).then(() => {
        this.$message({
          message: '核准中...',
          type: 'success'
        })
        this.$emit('check-confirm')
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

