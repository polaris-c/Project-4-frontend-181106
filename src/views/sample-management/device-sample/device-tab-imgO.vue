<template>
  <div>
    <el-row class="img-operation-container">
      <el-col :span="24">
        <el-button-group>
          <el-button 
            type="primary"
            size="mini"
            icon="el-icon-arrow-right"
            @click="switchFunction(3)">
            背景
          </el-button>

          <el-button 
            type="success"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="handleUpload">
          </el-button>
        </el-button-group>
        ( {{ coordinate.x }} , {{ coordinate.y }} )
        [ {{ moveCoordinate.x }} , {{ moveCoordinate.y }} ]
        -{{ functionFlag }}-
      </el-col>

    </el-row>

    <el-row>
      <div class="img-container" v-loading="loading">
        <el-col :span="24" :offset="0">
          <!-- {{ detectionType }} -->
          <!-- <img :src="dataItem.srcImgRelURL"> -->
          <canvas 
            :id="dataItem.id"
            @click="canvasClick"
            @mousemove="canvasMove">
          </canvas>
        </el-col>
      </div>
    </el-row>

  </div>
</template>

<script>
import { nomSamplePicture, updateOPartImgSamples } from '@/api/sample-device'

const Scale = 1
const Rotation = 2
const Back = 3
const Front = 4

// 画布默认最大尺寸
const CanvasWidth = 1200
const CanvasHeight = 800

export default {
  name: 'DeviceTabImgOthers',
  props: {
    dataItem: {
      type: Object,
      default: { srcImgRelURL: "@/assets/4_123.jpg"},
    },
  },
  data() {
    return {
      loading: false,
      baseURL: '',
      image: new Image(),
      // 图像原始尺寸
      naturalImgInfo: {
        width: 0,
        height: 0
      },
      scaleX: 0,
      ScaleY: 0,
      WTHR: 1,  // 原始图像长宽比例 width to height ratio
      // 点击时坐标
      coordinate: {
        x: 0,
        y: 0
      },
      // 移动时坐标
      moveCoordinate: {
        x: 0,
        y: 0
      },
      canvas: null,
      ctx: null,
      width: null,
      height: null,

      functionFlag: null,
      twoPointsFlag: false,
      originXY: [],
      destinationXY: [],

      objectScale: {
        beginXY: [],
        endXY: [],
        drawFigure: function(vm) {
          vm.ctx.strokeStyle = 'rgb(250, 0, 0)'
          vm.ctx.beginPath()
          vm.ctx.moveTo(this.beginXY[0], this.beginXY[1])
          vm.ctx.lineTo(this.endXY[0], this.endXY[1])
          vm.ctx.stroke()
        },
      },
      objectRotation: {
        beginXY: [],
        endXY: [],
        drawFigure: function(vm) {
          vm.ctx.strokeStyle = 'rgb(0, 250, 0)'
          vm.ctx.beginPath()
          vm.ctx.moveTo(this.beginXY[0], this.beginXY[1])
          vm.ctx.lineTo(this.endXY[0], this.endXY[1])
          vm.ctx.stroke()
        },
      },
      objectBack: {
        beginXY: [],
        endXY: [],
        drawFigure: function(vm) {
          vm.ctx.strokeStyle = 'rgb(0, 0, 250)'
          vm.ctx.strokeRect(this.beginXY[0], this.beginXY[1], 
                            this.endXY[0] - this.beginXY[0], 
                            this.endXY[1]- this.beginXY[1])
        }
      },
      objectFront: {
        beginXY: [],
        endXY: [],
        drawFigure: function(vm) {
          vm.ctx.strokeStyle = 'rgb(250, 250, 0)'
          vm.ctx.strokeRect(this.beginXY[0], this.beginXY[1], 
                            this.endXY[0] - this.beginXY[0], 
                            this.endXY[1]- this.beginXY[1])
        }
      }
    }
  },

  mounted() {
    this.initImage()
  },
  methods: {
    initImage() {
      this.loading = true
      this.image = new Image()
      
      let end = this.dataItem.srcImgRelURL.search(/media/i) + 5
      let endURL = this.dataItem.srcImgRelURL.slice(end)
      this.baseURL = this.dataItem.srcImgRelURL.slice(0, end-1)
      this.baseURL = 'http://10.112.99.172:8001'
      this.image.src = this.baseURL + endURL

      this.canvas = document.getElementById(this.dataItem.id)
      this.ctx = this.canvas.getContext('2d')
      this.width = this.canvas.width = CanvasWidth
      this.height = this.canvas.height = CanvasHeight

      this.image.onload = () => {
        
        this.naturalImgInfo.width = this.image.naturalWidth
        this.naturalImgInfo.height = this.image.naturalHeight
        // toFixed(n) 返回小数点后数字的n个数数字的字符串
        this.WTHR = Number((this.image.naturalWidth / this.image.naturalHeight).toFixed(3))
        
        if(this.naturalImgInfo.width > this.canvas.width) {
          // 图像原始尺寸比画布大 等比例缩小
          this.height = this.canvas.height = Number((this.canvas.width / this.WTHR).toFixed())
        } else {
          // 图像原始尺寸比画布小 直接使用原始尺寸
          this.width = this.canvas.width = this.naturalImgInfo.width
          this.height = this.canvas.height = this.naturalImgInfo.height
        }

        this.scaleX = Number((this.naturalImgInfo.width / this.canvas.width).toFixed(3))
        this.scaleY = Number((this.naturalImgInfo.height / this.canvas.height).toFixed(3))
        console.log('dataItem id:', this.dataItem.id, 'naturalWidth', this.image.naturalWidth, 'naturalHeight: ', this.image.naturalHeight, 'baseURL: ', this.baseURL,
            'scaleX: ', this.scaleX, 'scaleY: ', this.scaleY, 'WTHR: ', this.WTHR)
        
        this.ctx.drawImage(this.image, 0, 0, this.width, this.height)

        this.loading = false
      }
    },
		loadImage() {
			this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
			// console.log('drawImage: ', image)
    },
		setImage() {
      let vm = this
			this.loadImage()
			if(!(this.objectScale.beginXY.length === 0) && 
					!(this.objectScale.endXY.length === 0)) {
				this.objectScale.drawFigure(vm)
			}
			if(!(this.objectRotation.beginXY.length === 0) && 
					!(this.objectRotation.endXY.length === 0)) {
				this.objectRotation.drawFigure(vm)
      }
      if(!(this.objectBack.beginXY.length === 0) && 
					!(this.objectBack.endXY.length === 0)) {
				this.objectBack.drawFigure(vm)
			}
			if(!(this.objectFront.beginXY.length === 0) && 
					!(this.objectFront.endXY.length === 0)) {
				this.objectFront.drawFigure(vm)
			}
		},
		clear() {
			this.ctx.fillStyle = 'rgba(200, 200, 200, 0.99)'
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
			this.setImage()
    },
    clearVar() {
			this.twoPointsFlag = false
			this.originXY = []
		  this.destinationXY = []
			this.functionFlag = null
		},
    canvasMove(e) {
      this.clear()
      this.moveCoordinate.x = e.layerX
      this.moveCoordinate.y = e.layerY

      if (this.functionFlag) {
				switch (this.functionFlag) {
					case Scale:
					  this.drawScale()
						break
					case Rotation:
						this.drawRotation()
            break
          case Back:
						this.drawBack()
            break
          case Front:
						this.drawFront()
						break
					default:
						// cursor.drawCursor()
				}
			} else {
				console.log('Null Function')
			}
    },
    canvasClick(e) {
      this.coordinate.x = e.layerX
      this.coordinate.y = e.layerY
      // console.log(e.layerX, e.layerY)
      if(this.functionFlag) {
        if(!this.twoPointsFlag) {
          this.originXY = [e.layerX, e.layerY]// [cursor.x, cursor.y]
          this.twoPointsFlag = !this.twoPointsFlag
        } else {
          this.destinationXY = [e.layerX, e.layerY]// [cursor.x, cursor.y]
          this.twoPointsFlag = !this.twoPointsFlag
        }
      }
    },

    switchFunction(functionFlag) {
      this.clearVar()  // 若不清空原数据 canvasMove会触发其他操作对象的绘制
      console.log(functionFlag)
      this.functionFlag = functionFlag
    },

    /** 鼠标移动时绘制图像 */
		drawScale() {
      let vm = this
			if (this.twoPointsFlag) {
				this.ctx.strokeStyle = 'rgb(250, 50, 50)'
				this.ctx.beginPath()
				this.ctx.moveTo(this.originXY[0], this.originXY[1])
				this.ctx.lineTo(this.moveCoordinate.x, this.moveCoordinate.y)
        this.ctx.stroke()
        console.log('drawScale')
      } else if(this.originXY.length) {
				this.objectScale.beginXY = this.originXY
				this.objectScale.endXY = this.destinationXY
				this.objectScale.drawFigure(vm)
			}
    },
    drawRotation() {
      let vm = this
      if (this.twoPointsFlag) {
				this.ctx.strokeStyle = 'rgb(50,250,50)'
				this.ctx.beginPath()
				this.ctx.moveTo(this.originXY[0], this.originXY[1])
				this.ctx.lineTo(this.moveCoordinate.x, this.moveCoordinate.y)
        this.ctx.stroke()
        console.log('drawRotation')
      } else if(this.originXY.length) {
				this.objectRotation.beginXY = this.originXY
				this.objectRotation.endXY = this.destinationXY
				this.objectRotation.drawFigure(vm)
			}
    },
    drawBack() {
      let vm = this
			if (this.twoPointsFlag) {
				this.ctx.strokeStyle = 'rgb(20, 20, 250)'
				this.ctx.strokeRect(this.originXY[0], this.originXY[1], 
												this.moveCoordinate.x - this.originXY[0], this.moveCoordinate.y - this.originXY[1])
			} else if(this.originXY.length) {
				this.objectBack.beginXY = this.originXY
				this.objectBack.endXY = this.destinationXY
				this.objectBack.drawFigure(vm)
			}
    },
    drawFront() {
      let vm = this
			if (this.twoPointsFlag) {
				this.ctx.strokeStyle = 'rgb(250, 250, 20)'
				this.ctx.strokeRect(this.originXY[0], this.originXY[1], 
												this.moveCoordinate.x - this.originXY[0], this.moveCoordinate.y - this.originXY[1])
			} else if(this.originXY.length) {
				this.objectFront.beginXY = this.originXY
				this.objectFront.endXY = this.destinationXY
				this.objectFront.drawFigure(vm)
			}
		},

    handleUpload() {
      console.log(`objectBack:, ${this.objectBack.beginXY}, ${this.objectBack.endXY} \n
        objectFront:, ${this.objectFront.beginXY}, ${this.objectFront.endXY} \n
        scale: ${this.scaleX}, ${this.ScaleY}`)
      let [backX1, backY1, backX2, backY2] = [Number((this.objectBack.beginXY[0] * this.scaleX).toFixed()), 
                                              Number((this.objectBack.beginXY[1] * this.ScaleY).toFixed()),
                                              Number((this.objectBack.endXY[0] * this.scaleX).toFixed()),
                                              Number((this.objectBack.endXY[1] * this.ScaleY).toFixed())]
      let rectCoordi = [backX1, backY1, backX2, backY2]
      rectCoordi = rectCoordi.join(' ')
      console.log(rectCoordi, this.dataItem.id)

      let handleData = new FormData()
      handleData.append('rectCoordi', rectCoordi)
      this.loading = true
      updateOPartImgSamples(this.dataItem.id, handleData).then(res => {
        // console.log(res)
        this.loading = false

        this.$message({
          message: '图像处理成功！',
          type: 'success',
          duration: 10 * 1000
        })
      })
    },

  },
}
</script>

<style scoped>
.img-operation-container {
  margin-bottom: 10px;
}
.img-container {
  width: 100%;
  height: 800px;
  /* background-color: whitesmoke; */
}
</style>
