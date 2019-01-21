<template>
  <div>
    <div>
      <div v-if="optionsGM.isExist" id="general-metals-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} General Metals 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsPP.isExist" id="plastics-pvc-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} Plastics PVC 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsTG.isExist" id="testall-geo-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} TestAll Geo 没有数据 ————</div>
    </div>
  </div>
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
  name: 'ChartColumn',
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
      optionsGM: {
        title: {
          text: 'General Metals'
        },
        chart:{
          type: 'column',
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
            name: 'General Metals',
            color: 'red',
            // lineWidth: 1,
            data: []
          },
        ],
      },
      optionsPP: {
        isExist: false,
        title: {
          text: 'Plastics PVC'
        },
        chart:{
          type: 'column',
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          plotBackgroundColor: 'whitesmoke',   // 绘图区背景
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
      optionsTG: {
        isExist: false,
        title: {
          text: 'TestAll Geo'
        },
        chart:{
          type: 'column',
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          plotBackgroundColor: 'whitesmoke',   // 绘图区背景
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
      handledData: {},
      extractHandledData: [[], []]
    }
  },
  watch: {
    dataIndex(val) {
      this.dataIndex = val
      console.log(`---- ChartColumn watch ---- ${ this.dataType } Index:`, this.dataIndex)
      this.drawChart()
    }
  },
  mounted() {
    console.log(`---- ChartColumn ---- ${ this.dataType } Index: `, this.dataIndex)
    this.drawChart()
  },
  methods: {
    drawChart() {
      this.optionsGM.isExist = false
      this.optionsPP.isExist = false
      this.optionsTG.isExist = false
      if (!this.seriesData.length) {
        console.log(`---- ChartColumn ---- ${ this.dataType } is empty!!! `)
        return
      }
      this.handledData = this.seriesData[this.dataIndex].handledData
      if (Object.keys(this.handledData['General Metals']).length) {
        this.extractData(this.handledData['General Metals'])
        this.optionsGM.xAxis.categories = this.extractHandledData[0]
        this.optionsGM.series[0].data = this.extractHandledData[1].map(Number)
        this.optionsGM.isExist = true
      }
      if (Object.keys(this.handledData['Plastics PVC']).length) {
        this.extractData(this.handledData['Plastics PVC'])
        this.optionsPP.xAxis.categories = this.extractHandledData[0]
        this.optionsPP.series[0].data = this.extractHandledData[1].map(Number)
        this.optionsPP.isExist = true
      }
      if (Object.keys(this.handledData['TestAll Geo']).length) {
        this.extractData(this.handledData['TestAll Geo'])
        this.optionsTG.xAxis.categories = this.extractHandledData[0]
        this.optionsTG.series[0].data = this.extractHandledData[1].map(Number)
        this.optionsTG.isExist = true
      }
      this.$nextTick(() => {
        let domGM = document.getElementById('general-metals-container') 
        let domPP = document.getElementById('plastics-pvc-container')
        let domTG = document.getElementById('testall-geo-container')
        // console.log(`---- ChartColumn ---- dom :`, domGM, domPP, domTG)
        // console.log(`---- ChartColumn ---- domGM :`, this.optionsGM.xAxis.categories)
        // console.log(`---- ChartColumn ---- domGM :`, this.optionsGM.series[0].data)
        if(domGM && this.optionsGM.isExist) {
          this.chart = new Highcharts.Chart(domGM, this.optionsGM);
        }
        if(domPP && this.optionsPP.isExist) {
          new Highcharts.Chart(domPP, this.optionsPP);
        }
        if(domTG && this.optionsTG.isExist) {
          new Highcharts.Chart(domTG, this.optionsTG);
        }
      })
    },
    extractData(dataObj) {
      this.extractHandledData = [[], []]
      this.extractHandledData[0] = Object.keys(dataObj)  // 获取键值,即元素名称
      // console.log(`---- ChartColumn ---- extractData :`, this.extractHandledData[0])
      this.extractHandledData[0].forEach(key => {  // 获取对应元素含量数值 
        this.extractHandledData[1].push(dataObj[key])
      })
    }
  },

}
</script>

<style scoped>

</style>
