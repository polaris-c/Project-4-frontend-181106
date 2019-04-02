<template>
  <div class="app-main-container">
    message-detail
    <div class="dashboard-text">id:{{ id }}</div>
    {{ detailData }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserMessagesInfo } from '@/api/message'

export default {
  name: 'MessageDetail',
  props: { },
  data() {
    return {
      id: null,
      detailData : {}
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
    ])
  },
  mounted() {
    this.id = this.$route.params.id
    console.log(this.$route.params.id)
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUserMessagesInfo(this.id).then( res => {
        this.detailData = res
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
