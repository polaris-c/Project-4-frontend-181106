<template>
  <div id="GoBack">
    <el-button 
      type=""
      @click="goBcak"
      icon="el-icon-back">
      返 回
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'GoBack',
  mounted() {
    // console.log('- - GoBack - - $route.params:', this.$route.params)
  },
  methods: {
    goBcak() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>

