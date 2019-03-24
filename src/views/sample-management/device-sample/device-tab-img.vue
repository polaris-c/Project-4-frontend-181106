<template>
  <div>
    <el-row class="img-operation-container">
      <el-col :span="24">
        <el-button-group>
          <el-button 
            type="primary"
            size="mini"
            icon="el-icon-arrow-right">
            旋转
          </el-button>
          <el-button 
            type="primary"
            size="mini"
            icon="el-icon-arrow-right">
            尺度
          </el-button>
          <el-button 
            type="success"
            size="mini"
            icon="el-icon-upload2">
            
          </el-button>
        </el-button-group>

        <el-button-group>
          <el-button 
            type="primary"
            size="mini"
            icon="el-icon-arrow-right">
            前景
          </el-button>
          <el-button 
            type="primary"
            size="mini"
            icon="el-icon-arrow-right">
            背景
          </el-button>
          <el-button 
            type="success"
            size="mini"
            icon="el-icon-circle-check-outline">
            
          </el-button>
        </el-button-group>
      </el-col>

    </el-row>

    <el-row>
      <div class="img-container" v-loading="loading">
        <el-col :span="24" :offset="0">
          <!-- {{ detectionType }} -->
          <!-- <img :src="dataItem.srcImgURL"> -->
          -
          <canvas :id="dataItem.id"></canvas>
          --
        </el-col>
      </div>
    </el-row>

  </div>
</template>

<script>
// const naturalImgInfo = {
//   width: 0,
//   height: 0
// }
//     let canvas = null
//     let ctx = null
//     let width = null
//     let height = null

export default {
  name: 'AnalysisTabImg',
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
  watch: {
    dataItem() {
      console.log('watch: ', this.image)
      this.loadImage()
    }
  },
  mounted() {
    this.loadImage()
  },
  methods: {
    loadImage() {
      // this.loading = true
    this.image = new Image()
    this.image.src = this.dataItem.srcImgURL
    this.naturalImgInfo.width = this.image.naturalWidth
    this.naturalImgInfo.height = this.image.naturalHeight
    console.log('dataItem id:', this.dataItem.id, 'naturalWidth', this.image.naturalWidth, 'naturalHeight: ', this.image.naturalHeight)

    this.canvas = document.getElementById(this.dataItem.id)
    // const canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    // this.ctx = canvas.getContext('2d')
    this.width = this.canvas.width = 1000
    this.height = this.canvas.height = 600
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
      console.log('drawImage: ', this.image.src)
    }
      // this.loading = false
    }
  },
}
</script>

<style scoped>
.img-operation-container {
  margin-bottom: 10px;
}
.img-container {
  width: 100%;
  height: 500px;
  /* background-color: whitesmoke; */
}
</style>
