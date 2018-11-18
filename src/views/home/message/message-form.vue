<template>
  <div class="dashboard-container">
    message-form
    <div class="dashboard-text">name:{{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MessageCreation',
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
