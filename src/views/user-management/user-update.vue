<template>
  <div class="app-main-container">
    user-management-update
    <div>name:{{ name }}</div>
    {{ $route.params }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserUpdate',
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
