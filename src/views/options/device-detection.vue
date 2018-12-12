<template>
  <div class="app-main-container">
    device-detection
    <div class="dashboard-text">name:{{ name }}</div>
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
