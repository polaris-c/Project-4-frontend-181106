<template>
  <div class="highcharts-container" style="min-width:600px; height:600px"></div>
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
  name: 'ResultTabChart',
  props: {
    detectionType: {
      type: String,
      default: 'FTIR',
    },
    eviType: {
      type: String,
      default: 'explosive',
    },
    seriesData: {
      type: Object,
      default: {}
    },
    // dataIndex: {
    //   type: [Number, String],
    //   default: 0
    // },
    sampleData: {
      type: Object,
      default: {}
    },
    distanceData: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      chart: null,
      options: {
        title: {
          text: this.detectionType
        },
        chart:{
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
            name: '物证FTIR谱图',
            color: 'red',
            // lineWidth: 1,
            data: []
          },
          {
            name: '当前样本FTIR谱图',
            // color: 'blue',
            // lineWidth: 1,
            data: []
          }
        ],
      },
      styles: {
        // width: 1150,
        // 'min-width': 400px,
        // height: 600,
      },
    }
  },
  watch: {
    // dataIndex(val) {
    //   this.dataIndex = val
    //   console.log(`---- ResultTabChart watch ---- ${ this.detectionType } Index:`, this.dataIndex)
    //   this.drawChart()
    // },
    sampleData() {
      this.drawChart()
    },
    distanceData() {
      this.drawChart()
    }
  },
  mounted() {
    console.log(`---- ResultTabChart ---- mounted ${ this.detectionType }`)
    this.drawChart();
  },
  methods: {
    drawChart() {
      if (!this.seriesData == {}) {
        console.log(`---- ResultTabChart ---- ${ this.detectionType } is empty!!! `)
        return
      }
      this.options.xAxis.categories = this.seriesData.handledData[0]
      let eviData = this.seriesData.handledData[1].concat()
      let distance = eviData.sort((a, b) => a - b)[eviData.length - 1]
      this.options.series[0].data = this.seriesData.handledData[1]
      // console.log(`---- ResultTabChart ---- sampleData Len:`, Object.keys(this.sampleData).length )
      this.options.series[1].data = []
      if(Object.keys(this.sampleData).length !== 0) {
        // console.log(`---- ResultTabChart ---- sampleData:`, this.sampleData )
        let count = 0
        this.options.series[1].data = this.sampleData.handledData[1].map(y => {
          return y += distance || Number(this.distanceData)
        })
      }

      this.chart = new Highcharts.Chart(this.$el, this.options);
    },
  },

}
</script>

<style scoped>

</style>
