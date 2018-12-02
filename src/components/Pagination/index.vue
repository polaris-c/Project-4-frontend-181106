<template>
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :total="23"
    layout="total, prev, pager, next, jumper">
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleCurrentChange(pageIndex) {
      console.log('- - Pagination - - pageIndex: ', pageIndex)
      console.log('- - Pagination - - currentPage: ', this.currentPage)
      this.$emit('change-page', pageIndex)
    }
  }
}
</script>

<style scoped>

</style>

