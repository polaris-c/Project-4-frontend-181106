<template>
  <div id="SubmitButton">
    <el-button 
      type="primary" 
      @click="beforeSubmit"
      icon="el-icon-upload"
      class="buttons-gutter">
      提 交
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'SubmitButton',
  methods: {
    beforeSubmit() {
      this.$confirm('确定提交吗？', ' 提 示', {
        confirmButtonText: '确定提交',
        cancelButtonText: '取 消',
        type: 'info'
      }).then(() => {
        this.$message({
          message: '上传中...',
          type: 'success'
        })
        this.$emit('submit-confirm')
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

.buttons-gutter {
  /* margin-left: 15px; */
}
</style>

