<template>
  <el-row>
    <div class="img-container" v-loading="loading">
      <el-col :span="24" :offset="0">
        <canvas :id="dataItem.id">
        </canvas>
      </el-col>
    </div>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DeviceDetailAppearance',
  props: {
    dataItem: {
      type: Object,
      default: { srcImgURL: "@/assets/4_123.jpg"},
    },
  },
  data() {
    return {
      loading: false,
      image: new Image(),
      // 图像原始尺寸
      naturalImgInfo: {
        width: 0,
        height: 0
      },
      canvas: null,
      ctx: null,
      width: null,
      height: null,
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
    ])
  },
  mounted() {
    this.initImage()
  },
  methods: {
    initImage() {
      this.loading = true
      this.image = new Image()
      this.image.src = this.dataItem.srcImgURL

      this.canvas = document.getElementById(this.dataItem.id)
      this.ctx = this.canvas.getContext('2d')
      this.width = this.canvas.width = 1000
      this.height = this.canvas.height = 800

      this.image.onload = () => {
        this.naturalImgInfo.width = this.image.naturalWidth
        this.naturalImgInfo.height = this.image.naturalHeight

        if(this.naturalImgInfo.width > this.canvas.width || this.naturalImgInfo.height > this.canvas.height) {
          this.width = this.canvas.width = Number((this.naturalImgInfo.width * 0.5).toFixed())
          this.height = this.canvas.height = Number((this.naturalImgInfo.height * 0.5).toFixed())
        } else {
          this.width = this.canvas.width = this.naturalImgInfo.width
          this.height = this.canvas.height = this.naturalImgInfo.height
        }
        this.ctx.drawImage(this.image, 0, 0, this.width, this.height)

        this.loading = false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
