<template>
  <div class="app-main-container">
    message-sent
    <div class="dashboard-text">name:{{ name }}</div>
    <el-button type="primary" @click="detail">Detail</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MessageDetail',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sidebar',
      'device',
      'token',
      'avatar',
    ]),
  },
  methods: {
    detail() {
      this.$router.push('/message/messageDetail')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
