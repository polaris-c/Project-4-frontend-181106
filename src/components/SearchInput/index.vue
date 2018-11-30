<template>
  <div id="SearchInput">
    <el-input
      v-model="searchInputData"
      placeholder="请输入需要搜索的信息...">
      <el-button
        slot="append"
        class="el-icon-search"
        @click="emitSearch">
      </el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchInputData: ''
    }
  },
  methods: {
    emitSearch() {
      this.$emit('emit-search', this.searchInputData)
      this.$message({
        message: '正在搜索...',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
#SearchInput {
  width: 400px;
}
</style>


