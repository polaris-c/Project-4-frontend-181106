<template>
  <div class="dashboard-container">
    device-detail
    <div>name:{{ name }}</div>
    {{ $route.params }}
    <el-button type="primary" @click="update">Update</el-button>
    <el-button type="primary" @click="ingredient">Ingredient</el-button>
    <el-button type="primary" @click="appearance">Appearance</el-button>
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
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceUpdate/' + this.$route.params.id)
    },
    ingredient() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailIngredient/'+ this.$route.params.id)
    },
    appearance() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailAppearance/'+ this.$route.params.id)
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
