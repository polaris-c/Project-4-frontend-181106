<template>
  <div>
    <div>
      <div v-if="optionsGM.isExist" id="general-metals-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} General Metals 没有数据 ————</div>
      <!-- {{ optionsGM.handledData }} -->
    </div>
    <div>
      <div v-if="optionsPP.isExist" id="plastics-pvc-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} Plastics PVC 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsTG.isExist" id="testall-geo-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} TestAll Geo 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsS.isExist" id="soil-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} Soil 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsM.isExist" id="mining-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} Mining 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsM1.isExist" id="mining1-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} Mining1 没有数据 ————</div>
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
          '' : ''
        },
        xAxis: {
          title: {
            text: ''
          },
          lineWidth: 2,
          categories: []
        },
        yAxis: {
          title: {
            text: ''
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
        handledData: {}
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
          '' : ''
        },
        xAxis: {
          title: {
            text: ''
          },
          lineWidth: 2,
          categories: []
        },
        yAxis: {
          title: {
            text: ''
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
        handledData: {}
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
          '' : ''
        },
        xAxis: {
          title: {
            text: ''
          },
          lineWidth: 2,
          categories: []
        },
        yAxis: {
          title: {
            text: ''
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
        handledData: {}
      },
      optionsS: {
        isExist: false,
        title: {
          text: 'Soil'
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
          '' : ''
        },
        xAxis: {
          title: {
            text: ''
          },
          lineWidth: 2,
          categories: []
        },
        yAxis: {
          title: {
            text: ''
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
        handledData: {}
      },
      optionsM: {
        isExist: false,
        title: {
          text: 'Mining'
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
          '' : ''
        },
        xAxis: {
          title: {
            text: ''
          },
          lineWidth: 2,
          categories: []
        },
        yAxis: {
          title: {
            text: ''
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
        handledData: {}
      },
      optionsM1: {
        isExist: false,
        title: {
          text: 'Mining1'
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
          '' : ''
        },
        xAxis: {
          title: {
            text: ''
          },
          lineWidth: 2,
          categories: []
        },
        yAxis: {
          title: {
            text: ''
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
        handledData: {}
      },
      handledData: {},
      extractHandledData: [[], []],
      allElementData: [
        ["Mg","Al","Si","P","S","Cl","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Rb","Sr","Y","Zr","Nb","Mo","Ru","Pd","Ag","Cd","Sn","Sb","Te","Cs","Ba","Hf","W","Au","Hg","Pb","Bi","Th","U"], 
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
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
      this.optionsS.isExist = false
      this.optionsM.isExist = false
      this.optionsM1.isExist = false

      if (!this.seriesData.length) {
        console.log(`---- ChartColumn ---- ${ this.dataType } is empty!!! `)
        return
      }
      this.handledData = this.seriesData[this.dataIndex].handledData
      if (this.handledData['General Metals'] !== undefined && JSON.stringify(this.handledData['General Metals']) !== "{}") {
        this.extractData(this.handledData['General Metals'], this.optionsGM)
        // this.optionsGM.xAxis.categories = this.allElementData[0]
        // this.optionsGM.series[0].data = this.allElementData[1].map(Number)
        // this.optionsGM.isExist = true
      }
      if (this.handledData['Plastics PVC'] !== undefined && JSON.stringify(this.handledData['Plastics PVC']) !== "{}") {
        this.extractData(this.handledData['Plastics PVC'], this.optionsPP)
        // this.optionsPP.xAxis.categories = this.allElementData[0]
        // this.optionsPP.series[0].data = this.allElementData[1].map(Number)
        // this.optionsPP.isExist = true
      }
      if (this.handledData['TestAll Geo'] !== undefined && JSON.stringify(this.handledData['TestAll Geo']) !== "{}") {
        this.extractData(this.handledData['TestAll Geo'], this.optionsTG)
        // this.optionsTG.xAxis.categories = this.allElementData[0]
        // this.optionsTG.series[0].data = this.allElementData[1].map(Number)
        // this.optionsTG.isExist = true
      } 
      if (this.handledData['Soil'] !== undefined && JSON.stringify(this.handledData['Soil']) !== "{}") {
        this.extractData(this.handledData['Soil'], this.optionsS)
        // this.optionsS.xAxis.categories = this.allElementData[0]
        // this.optionsS.series[0].data = this.allElementData[1].map(Number)
        // this.optionsS.isExist = true
      }
      if (this.handledData['Mining'] !== undefined && JSON.stringify(this.handledData['Mining']) !== "{}") {
        this.extractData(this.handledData['Mining'], this.optionsM)
        // this.optionsM.xAxis.categories = this.allElementData[0]
        // this.optionsM.series[0].data = this.allElementData[1].map(Number)
        // this.optionsM.isExist = true
      }
      if (this.handledData['Mining1'] !== undefined && JSON.stringify(this.handledData['Mining1']) !== "{}") {
        this.extractData(this.handledData['Mining1'], this.optionsM1)
        // this.optionsM1.xAxis.categories = this.allElementData[0]
        // this.optionsM1.series[0].data = this.allElementData[1].map(Number)
        // this.optionsM1.isExist = true
      }
      this.$nextTick(() => {
        let domGM = document.getElementById('general-metals-container') 
        let domPP = document.getElementById('plastics-pvc-container')
        let domTG = document.getElementById('testall-geo-container')
        let domS = document.getElementById('soil-container')
        let domM = document.getElementById('mining-container')
        let domM1 = document.getElementById('mining1-container')

        if(domGM && this.optionsGM.isExist) {
          this.chart = new Highcharts.Chart(domGM, this.optionsGM);
        }
        if(domPP && this.optionsPP.isExist) {
          new Highcharts.Chart(domPP, this.optionsPP);
        }
        if(domTG && this.optionsTG.isExist) {
          new Highcharts.Chart(domTG, this.optionsTG);
        }
        if(domS && this.optionsS.isExist) {
          new Highcharts.Chart(domS, this.optionsS);
        }
        if(domM && this.optionsM.isExist) {
          new Highcharts.Chart(domM, this.optionsM);
        }
        if(domM1 && this.optionsM1.isExist) {
          new Highcharts.Chart(domM1, this.optionsM1);
        }
      })
    },
    extractData(dataObj, optionObj) {
      optionObj.handledData = dataObj
      this.extractHandledData = [[], []]
      this.extractHandledData[0] = Object.keys(dataObj)  // 获取键值,即元素名称
      // console.log(`---- ChartColumn ---- extractData :`, this.extractHandledData[0])
      this.extractHandledData[0].forEach(key => {  // 获取对应元素含量数值 
        this.extractHandledData[1].push(dataObj[key])
      })
      // 获取绘图元素数据
      this.allElementData = [
        ["Mg","Al","Si","P","S","Cl","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Rb","Sr","Y","Zr","Nb","Mo","Ru","Pd","Ag","Cd","Sn","Sb","Te","Cs","Ba","Hf","W","Au","Hg","Pb","Bi","Th","U","Bal"], 
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
      for(let e in dataObj) {
        let eIndex = this.allElementData[0].indexOf(e)
        if(eIndex >= 0) {
          let eVal = Number(dataObj[e])
          if(eVal > 1) {
            eVal = Math.log2(eVal)
          }
          this.allElementData[1][eIndex] = eVal
        }
      }
      optionObj.xAxis.categories = this.allElementData[0]
      optionObj.series[0].data = this.allElementData[1].map(Number)
      optionObj.isExist = true
    }
  },

}
</script>

<style scoped>

</style>
