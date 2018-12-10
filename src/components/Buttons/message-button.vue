<template>
  <div id="MessageButton">
    <el-button 
      type="primary" 
      size=""
      @click="beforeMessage"
      icon="el-icon-message"
      class=""
      plain>
      专家咨询
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'MessageButton',
  methods: {
    beforeMessage() {
      this.$confirm('确定发起专家咨询请求吗？', ' 提 示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'info'
      }).then(() => {
        this.$message({
          message: '准备发起请求...',
          type: 'success'
        })
        this.$emit('message-confirm')
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

