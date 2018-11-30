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
  data() {
    return {
      currentPage: 2
    }
  },
  methods: {
    handleCurrentChange(pageIndex) {
      console.log('- - pageIndex: ', pageIndex)
    }
  }
}
</script>

<style scoped>

</style>

