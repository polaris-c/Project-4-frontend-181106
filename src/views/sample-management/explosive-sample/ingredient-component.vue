<template>
  <el-card shadow="hover">

    <div slot="header">
      <span>FTIR</span>
    </div>

    <div>
      <el-form 
      ref="form" 
      :model="formData"
      :label-position="labelPosition"
      label-width="100px"
      class="main-form">
        <el-form-item label="样本名称">
          <el-input v-model="formData.sname"></el-input>
        </el-form-item>
        <el-form-item label="样本名称缩写">
          <el-input v-model="formData.snameAbbr"></el-input>
        </el-form-item>
      </el-form>
    </div>

  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FTIR',
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
  watch: {
    $route() {
      console.log('- - - - detail route.params: ', this.$route.params.id)
    }
  },
  mounted() {
    console.log('- - - - detail route.params: ', this.$route.params.id)
  },
  methods: {

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
