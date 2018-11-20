<template>
  <div class="dashboard-container">
    explosive-detail
    <div>name:{{ name }}</div>
    {{ $route.params }}
    <el-button type="primary" @click="update">Update</el-button>
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
    update() {
      this.$router.push('/evidenceManagement/explosiveEvidence/explosiveIndexList/explosiveUpdate/' + this.$route.params.id)
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
