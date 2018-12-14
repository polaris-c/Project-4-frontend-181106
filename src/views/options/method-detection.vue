<template>
  <div class="app-main-container">
    method-detection
    <div class="dashboard-text">name:{{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DetectionMethod',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sidebar',
      'device',
      'token',
      'avatar',
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
