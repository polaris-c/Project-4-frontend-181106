<template>
  <div id="DeleteButton">
    <el-button 
      type="danger"
      size="small"
      @click="beforeDelete"
      icon="el-icon-delete">
      删 除
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'DeleteButton',
  methods: {
    beforeDelete() {
      this.$confirm('确定删除吗？', '提 示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        this.$message({
          message: '正在删除...',
          type: 'warning'
        })
        this.$emit('delete-confirm')
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

