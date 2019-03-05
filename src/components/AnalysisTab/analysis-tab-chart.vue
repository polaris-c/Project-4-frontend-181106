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
  name: 'AnalysisTabChart',
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
            text: 'xAxis_title'
          },
          lineWidth: 2,
          categories: []
        },
        yAxis: {
          title: {
            text: 'yAxis_title_Intensity'
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
    dataIndex(val) {
      this.dataIndex = val
      console.log(`---- AnalysisTabChart watch ---- ${ this.detectionType } Index:`, this.dataIndex)
      this.drawChart()
    }
  },
  mounted() {
    this.drawChart();
    // console.log('-- AnalysisTabChart -- :', this.ingredientData.seriesData)
    
  },
  methods: {
    // initChart() {
    //   // console.log(this.$el);
    //   // this.$el.style.width = (this.styles.width || 900) + 'px';
    //   // this.$el.style.height = (this.styles.height || 600) + 'px';
    //   this.chart = new Highcharts.Chart(this.$el, this.options);
    // }
    drawChart() {
      if (!this.seriesData.length) {
        console.log(`---- AnalysisTabChart ---- ${ this.detectionType } is empty!!! `)
        return
      }
      // console.log(this.$el);
      // this.$el.style.width = (this.styles.width || 900) + 'px';
      // this.$el.style.height = (this.styles.height || 600) + 'px';
      this.options.xAxis.categories = this.seriesData[this.dataIndex].handledData[0]
      this.options.series[0].data = this.seriesData[this.dataIndex].handledData[1]
      this.chart = new Highcharts.Chart(this.$el, this.options);
    },
  },

}
</script>

<style scoped>

</style>
