<template>
  <el-pagination
    :current-page="page"
    :total="count"
    :page-size="constSize"
    @current-change="handleCurrentChange"
    layout="total, prev, pager, next">
  </el-pagination>
</template>

<script>
export default {
  name: 'PaginationFiles',
  props: {
    count: {
      type: [String, Number],
      default: 1
    },
    page: {
      type: [String, Number],
      default: 1
    },
  },
  data() {
    return {
      constSize: 1,
    }
  },
  watch: {
    count() {
      this.$nextTick(() => {
        console.log('- - Pagination - - watch count: ', this.count)
      })
    },
    page() {
      this.$nextTick(() => {
        console.log('- - Pagination - - watch page: ', this.page)
      })
    },
  },
  mounted() {
    // console.log('- - Pagination - - init count: ', this.count)
  },
  methods: {
    handleCurrentChange(pageIndex) {
      console.log('- - Pagination - - pageIndex: ', pageIndex)
      console.log('- - Pagination - - current page: ', this.page)
      this.$emit('change-page', pageIndex)
    },
  }
}
</script>

<style scoped>

</style>

