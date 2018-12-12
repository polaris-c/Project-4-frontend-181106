<template>
  <div class="app-main-container">
    user-management-detail
    <div>name:{{ name }}</div>
    {{ $route.params }}
    <el-button type="primary" @click="update">Update</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserDetail',
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
  mounted() {
    console.log('- - - - User detail this.$route:', this.$route)
  },
  methods: {
    update() {
      this.$router.push('/userManagement/userIndexList/userUpdate/' + this.$route.params.id)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
