<template>
  <div v-if="seriesData.length" class="highcharts-container" style="min-width:600px; height:600px"></div>
  <div v-else>———— {{ dataType }}没有数据 ————</div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  name: 'ChartCurve',
  props: {
    dataType: {
      type: String
    },
    seriesData: {
      type: Array
    },
    dataIndex: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      chart: null,
      options: {
        title: {
          text: this.dataType
        },
        chart:{
          // type: 'column',
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          // backgroundColor: 'whitesmoke',  // 全部背景
          // borderWidth: 1,  // 外边框
          plotBackgroundColor: 'whitesmoke',   // 绘图区背景
          // plotBorderColor: 'rgb(50, 50, 50)',  // 绘图区边框颜色
          // plotBorderWidth: 2  // 绘图区边框
          // plotShadow: true,  // 绘图区阴影
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'black',
          },
          events: {
            click() {
              console.log('options-chart-Click')
            },
          },
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
          '鼠标拖动可以进行缩放' : '手势操作进行缩放'
        },
        xAxis: {
          title: {
            text: 'x'
          },
          lineWidth: 2,
          categories: []
        },
        yAxis: {
          title: {
            text: 'y'
          },
          lineWidth: 2,
          // lineColor: '#',
          id: 'yAxis_id_temperature-axis'
        },
        series: [
          {
            name: this.dataType,
            color: 'red',
            // lineWidth: 1,
            data: []
          },
        ],
      },
      styles: {
        // width: 1150,
        // 'min-width': 400px,
        // height: 600,
      },
      getDataInfo: {},
      dataInfo: {}
    }
  },
  watch: {
    dataIndex(val) {
      this.dataIndex = val
      console.log(`---- ChartCurve watch ---- ${ this.dataType } Index:`, this.dataIndex)
      this.drawChart()
    }
  },
  mounted() {
    console.log(`---- ChartCurve ---- ${ this.dataType } Index: `, this.dataIndex)
    this.drawChart()
  },
  methods: {
    drawChart() {
      if (!this.seriesData.length) {
        console.log(`---- ChartCurve ---- ${ this.dataType } is empty!!! `)
        return
      }
      // console.log(this.$el);
      // this.$el.style.width = (this.styles.width || 900) + 'px';
      // this.$el.style.height = (this.styles.height || 600) + 'px';
      this.options.xAxis.categories = this.seriesData[this.dataIndex].handledData[0]
      this.options.series[0].data = this.seriesData[this.dataIndex].handledData[1]
      this.chart = new Highcharts.Chart(this.$el, this.options);
    },
    
    /**  loadAPI  */
    loadAPI() {
      let APIname = ''  // API函数名的前缀,决定了其是样本(sample)或物证(evi),炸药(explo)或装置(dev)
      /** 选择功能模块的类型 
       *  炸药样本(exploSample)  炸药物证(exploEvi)  装置样本(devPartSample)  装置物证(devEvi) */
      switch (this.functionType) {
        case 'exploSample': 
          APIname = 'getExplosiveSampleInfo'
          import('@/api/sample-explosive').then(APImodule => this.setParam(APImodule, APIname))
          break
        case 'exploEvi': 
          APIname = 'getExplosiveEviInfo'
          import('@/api/evidence-explosive').then(APImodule => this.setParam(APImodule, APIname))
          break
        case 'devPartSample': 
          APIname = 'getDevPartSampleInfo'
          import('@/api/sample-device').then(APImodule => this.setParam(APImodule, APIname))
          break
        case 'devEvi': 
          APIname = 'getDevEviInfo'
          import('@/api/evidence-device').then(APImodule => this.setParam(APImodule, APIname))
          break
        default:
          console.log('!!! Error NO functionType !!!')
      }
    },
    setParam(APImodule, APIname) {
      this.getDataInfo = APImodule[APIname]
    },

    fetchData() {
      this.getDataInfo().then(res => {

      }).catch(err => {
        console.log('---- ChartCurve ---- fetchData error: ', err)
      })
    }
  },

}
</script>

<style scoped>

</style>
