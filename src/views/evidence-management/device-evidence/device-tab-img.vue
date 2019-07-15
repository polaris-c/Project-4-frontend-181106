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

// 画布默认最大尺寸
const CanvasWidth = 1200
const CanvasHeight = 800

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
      WTHR: 1,  // 原始图像长宽比例 width to height ratio
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
      // 设置画布初始值
      this.width = this.canvas.width = CanvasWidth
      this.height = this.canvas.height = CanvasHeight
      // toFixed(n) 返回小数点后数字的n个数数字的字符串
      this.WTHR = Number((this.image.naturalWidth / this.image.naturalHeight).toFixed(3))

      this.image.onload = () => {
        this.naturalImgInfo.width = this.image.naturalWidth
        this.naturalImgInfo.height = this.image.naturalHeight

        if(this.naturalImgInfo.width > this.canvas.width) {
          // 图像原始尺寸比画布大 等比例缩小
          this.height = this.canvas.height = Number((this.canvas.width / this.WTHR).toFixed())
        } else {
          // 图像原始尺寸比画布小 直接使用原始尺寸
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
