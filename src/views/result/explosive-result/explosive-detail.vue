<template>
  <div class="dashboard-container">
    explosive-detail
    <div class="dashboard-text">name:{{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExploSynMatchList } from '@/api/match-explosive'

export default {
  name: 'ExplosiveDetail',
  data() {
    return {
      tableParams: {
        search: null,
        page: 1,
        page_size: 20,
        count: 1,
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
    ])
  },
  mounted() {
    this.fetchData(this.tableParams)
  },
  methods: {
    fetchData(tableParams){
      getExploSynMatchList(tableParams).then(res => {

      }).catch(err => {
        this.$message({
          message: '获取列表错误' + err.message,
          type: 'error'
        })
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
