<template>
  <div class="dashboard-container">
    <div>explosive-detail</div>
    <div>name: {{ name }}</div>
    <div>route.params: {{ routeParams }}</div>
    <el-button type="primary" @click="update">Update</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DeviceDetail',
  data() {
    return {
      routeParams: null
    }
  },
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
  watch: {
    $route() {
      this.routeParams = this.$route.params
      console.log('- - - - detail route.params: ', this.$route.params.id)
    }
  },
  mounted() {
    this.routeParams = this.$route.params
    console.log('- - - - detail route.params: ', this.$route.params.id)
  },
  methods: {
    update() {
      this.$router.push('/sampleManagement/explosiveSample/explosiveIndexList/explosiveUpdate/' + this.$route.params.id)
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
