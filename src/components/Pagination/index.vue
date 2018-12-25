<template>
  <el-pagination
    :current-page="page"
    :total="count"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="page_size"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    layout="total, sizes, prev, pager, next, jumper">
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    count: {
      type: [String, Number],
      default: 1
    },
    page: {
      type: [String, Number],
      default: 1
    },
    page_size: {
      type: [String, Number],
      default: 10
    }
  },
  data() {
    return {
    }
  },
  watch: {
    count() {
      this.$nextTick(() => {
        console.log('---- Pagination -- watch count: ', this.count)
      })
    },
    page() {
      this.$nextTick(() => {
        console.log('---- Pagination -- watch page: ', this.page)
      })
    },
    page_size() {
      this.$nextTick(() => {
        console.log('---- Pagination -- watch page_size: ', this.page_size)
      })
    }
  },
  mounted() {
    console.log('---- Pagination -- init count: ', this.count)
  },
  methods: {
    handleCurrentChange(pageIndex) {
      console.log('- - Pagination - - pageIndex: ', pageIndex)
      console.log('- - Pagination - - current page: ', this.page)
      this.$emit('change-page', pageIndex)
    },
    handleSizeChange(pageSize) {
      console.log('- - Pagination - - pageSize: ', pageSize)
      console.log('- - Pagination - - current size: ', this.page_size)
      this.$emit('change-size', pageSize)
    }
  }
}
</script>

<style scoped>

</style>

