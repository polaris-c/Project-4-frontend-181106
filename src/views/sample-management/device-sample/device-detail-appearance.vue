<template>
  <div class="app-main-container">
    device-appearance
    <div>name:{{ name }}</div>
    {{ $route.params }}

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <go-back></go-back>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GoBack from '@/components/Buttons/go-back'

export default {
  name: 'DeviceDetailAppearance',
  data() {
    return {

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
  components: {
    GoBack,
  },
  mounted() {
    console.log('- - DeviceDetailAppearance - - $route.params:', this.$route.params)
  },
  methods: {
    ingredient() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailIngredient/'+ this.$route.params.id)
    },
    appearance() {
      this.$router.push('/sampleManagement/deviceSample/deviceIndexList/deviceDetailAppearance/'+ this.$route.params.id)
    },

    /** 页面操作按键 */
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
