<template>
  <el-pagination
    v-if="listType === 'main'"
    :current-page="page"
    :total="count"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="page_size"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    layout="total, sizes, prev, pager, next, jumper">
  </el-pagination>

  <el-pagination
    v-else-if="listType === 'match'"
    :current-page="page"
    :total="Number(count)"
    :page-sizes="[10, 20]"
    :page-size="page_size"
    :pager-count="5"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    layout="total, prev, pager, next">
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    listType: {
      type: [String],
      default: 'main'
    },
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

