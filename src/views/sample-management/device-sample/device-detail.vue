<template>
  <div class="dashboard-container">
    device-detail
    <div class="dashboard-text">name:{{ name }}</div>
    <el-button type="primary" @click="detailIngredient">Detail Ingredient</el-button>
    <el-button type="primary" @click="deviceDetailAppearance">Detail Appearance</el-button>
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
    detailIngredient() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailIngredient')
    },
    deviceDetailAppearance() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailAppearance')
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
