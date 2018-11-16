<template>
  <div class="dashboard-container">
    device-list
    <div class="dashboard-text">name:{{ name }}</div>
    <el-button type="primary" @click="update">Update</el-button>
    <el-button type="primary" @click="detail">Detail</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DeviceList',
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
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceUpdate')
    },
    detail() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetail')
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
