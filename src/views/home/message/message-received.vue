<template>
  <div class="dashboard-container">
    message-received
    <div class="dashboard-text">name:{{ name }}</div>
    <el-button type="primary" @click="detail">Detail</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MessageReceived',
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
    },
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
