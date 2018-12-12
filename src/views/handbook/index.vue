<template>
  <div class="app-main-container">
    handbook
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
    <div class="dashboard-text">sidebar:{{ sidebar }}</div>
    <div class="dashboard-text">device:{{ device }}</div>
    <div class="dashboard-text">token:{{ token }}</div>
    <div class="dashboard-text">avatar:{{ avatar }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Handbook',
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
