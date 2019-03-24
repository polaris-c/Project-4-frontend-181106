<template>
  <div class="app-main-container">
    <!-- {{ $route.params }} -->
    <el-card 
      v-loading="loading"
      shadow="hover" 
      class="el-row-style">
      <el-tabs 
        type="border-card"
        v-model="activeTabName"  
        @tab-click="handleTabClick">
        <!-- activeTabName与name绑定, label只是标签页的标题-->
        <el-tab-pane
          v-for="dataItem in dataList"
          :key="dataItem.tabID"
          :label="dataItem.tabID"
          :name="dataItem.id.toString()">
          <tab-img
            :data-item="dataItem">
          </tab-img>
        </el-tab-pane>

      </el-tabs>
    </el-card>

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
import TabImg from '@/views/sample-management/device-sample/device-tab-img'
import { getDevPartSampleInfo } from '@/api/sample-device'

export default {
  name: 'DeviceDetailAppearance',
  data() {
    return {
      loading: false,
      activeTabName: '',
      dataList: [
        { 
          id: 0,
          srcImgURL: 'http://127.0.0.1:8000/media/image/devShapeSample/original/27.jpg' 
        },
        { 
          id: 1,
          srcImgURL: 'URL001' 
        },
      ],
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
    ]),
  },
  components: {
    GoBack,
    TabImg,
  },
  mounted() {
     console.log('- - DeviceDetailAppearance - - $route.params:', this.$route.params)
    // console.log('- - DeviceDetailAppearance - - dataList:', this.dataList)
    /** 图像列表添加用于tab标签页的字符串ID */
    this.fetchData()
  }, 
  methods: {
    fetchData() {
      this.loading = true
      getDevPartSampleInfo(this.$route.params.id).then(res => {
        this.dataList = res.devShapeSample
        let tabID = 1
        this.dataList.forEach((val) => {
          val.tabID = tabID.toString()
          tabID++
          console.log('- - DeviceDetailAppearance - - dataList id tabID:', val.id, val.tabID)
        })
        this.activeTabName = this.dataList[0].tabID
        this.loading = false
      })
    },
    handleTabClick(tab, event) {
      console.log('- - DeviceDetailAppearance - - tab: ', tab.index, tab._props.label, tab._props.name)
      console.log('- - DeviceDetailAppearance - - activeTabName: ', this.activeTabName)
    },

    /** 页面操作按键 */
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
