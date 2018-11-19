<template>
  <div class="dashboard-container">
    device-detail!
    <div class="dashboard-text">name:{{ name }}</div>
    <el-button type="primary" @click="analysisIngredient">Ingredient</el-button>
    <el-button type="primary" @click="analysisAppearance">Appearance</el-button>
    <el-button type="primary" @click="analysisFilter">Filter</el-button>
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
    analysisIngredient() {
      this.$router.push('/analysis/deviceAnalysis/deviceIngredient')
    },
    analysisAppearance() {
      this.$router.push('/analysis/deviceAnalysis/deviceAppearance')
    },
    analysisFilter() {
      this.$router.push('/analysis/deviceAnalysis/deviceFilter')
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
