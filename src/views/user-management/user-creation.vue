<template>
  <div class="app-main-container">
    user-management-creation
    <div class="dashboard-text">name:{{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserCreation',
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
