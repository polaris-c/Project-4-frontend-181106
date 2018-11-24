<template>
  <div id="GobackButton">
    <el-button 
      type=""
      @click="beforeGoback"
      icon="el-icon-back">
      返 回
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'GobackButton',
  methods: {
    beforeGoback() {
      this.$confirm('确定离开吗？', '提 示', {
        confirmButtonText: '确定离开',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        this.$message({
          message: '正在退出...',
          type: 'info'
        })
        this.$emit('goback-confirm')
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

