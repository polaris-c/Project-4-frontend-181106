<template>
  <div class="dashboard-container">
    device-appearance!
    <div class="dashboard-text">name:{{ name }}</div>
    <el-button type="primary" @click="analysisAppearanceCompare">AppearanceCompare</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sidebar',
      'device',
      'token',
      'avatar',
    ])
  },
  methods: {
    analysisAppearanceCompare() {
      this.$router.push('/analysis/deviceAnalysis/deviceAppearanceCompare')
    }
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
