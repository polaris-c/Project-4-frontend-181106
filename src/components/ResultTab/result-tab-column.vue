<template>
  <div>
    <div>
      <div v-if="optionsGM.isExist" id="summary-general-metals-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} General Metals 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsPP.isExist" id="summary-plastics-pvc-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} Plastics PVC 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsTG.isExist" id="summary-testall-geo-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} TestAll Geo 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsS.isExist" id="summary-soil-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} Soil 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsM.isExist" id="summary-mining-container" style="min-width:600px; height:600px"></div>
      <div v-else>———— {{ dataType }} Mining 没有数据 ————</div>
    </div>
    <div>
      <div v-if="optionsM1.isExist" id="summary-mining1-container" style="min-width:600px; height:600px"></div>
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
  name: 'AnalysisTabColumn',
  props: {
    dataType: {
      type: String,
      default: 'XRF'
    },
    eviType: {
      type: String,
      default: 'explosive',
    },
    seriesData: {
      type: Object,
      default: {}
    },
    sampleData: {
      type: Object,
      default: {}
    },
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
            name: '物证',
            color: 'red',
            // lineWidth: 1,
            data: []
          },
          {
            name: '样本',
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
            name: '物证',
            color: 'red',
            // lineWidth: 1,
            data: []
          },
          {
            name: '样本',
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
            name: '物证',
            color: 'red',
            // lineWidth: 1,
            data: []
          },
          {
            name: '样本',
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
            name: '物证',
            color: 'red',
            // lineWidth: 1,
            data: []
          },
          {
            name: '样本',
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
            name: '物证',
            color: 'red',
            // lineWidth: 1,
            data: []
          },
          {
            name: '样本',
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
            name: '物证',
            color: 'red',
            // lineWidth: 1,
            data: []
          },
          {
            name: '样本',
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
        [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
    }
  },
  watch: {
    sampleData() {
      console.log(`---- AnalysisTabColumn ---- watch sampleData: `, this.sampleData)
      this.drawChart()
    },
  },
  mounted() {
    console.log(`---- AnalysisTabColumn ---- mounted sampleData: `, this.sampleData)
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

      if (JSON.stringify(this.seriesData) === "{}") {
        console.log(`---- AnalysisTabColumn ---- ${ this.dataType } is empty!!! `)
        return
      }
      this.handledData = this.seriesData.handledData
      console.log(`---- AnalysisTabColumn ---- handledData: `, this.handledData['General Metals'])
      if (this.handledData['General Metals'] !== undefined && JSON.stringify(this.handledData['General Metals']) !== "{}") {
        if(JSON.stringify(this.sampleData) !== "{}" && this.sampleData.handledData['General Metals'] !== undefined) {
          this.extractData(this.handledData['General Metals'], this.sampleData.handledData['General Metals'], this.optionsGM)
        } else {
          this.extractData(this.handledData['General Metals'], {}, this.optionsGM)
        }
      } 
      if (this.handledData['Plastics PVC'] !== undefined && JSON.stringify(this.handledData['Plastics PVC']) !== "{}") {
        if(JSON.stringify(this.sampleData) !== "{}" && this.sampleData.handledData['Plastics PVC'] !== undefined) {
          this.extractData(this.handledData['Plastics PVC'], this.sampleData.handledData['Plastics PVC'], this.optionsPP)
        } else {
          this.extractData(this.handledData['Plastics PVC'], {}, this.optionsPP)
        }
      }
      if (this.handledData['TestAll Geo'] !== undefined && JSON.stringify(this.handledData['TestAll Geo']) !== "{}") {
        if(JSON.stringify(this.sampleData) !== "{}" && this.sampleData.handledData['TestAll Geo'] !== undefined) {
          this.extractData(this.handledData['TestAll Geo'], this.sampleData.handledData['TestAll Geo'], this.optionsTG)
        } else {
          this.extractData(this.handledData['TestAll Geo'], {}, this.optionsTG)
        }
      } 
      if (this.handledData['Soil'] !== undefined && JSON.stringify(this.handledData['Soil']) !== "{}") {
        if(JSON.stringify(this.sampleData) !== "{}" && this.sampleData.handledData['Soil'] !== undefined) {
          this.extractData(this.handledData['Soil'], this.sampleData.handledData['Soil'], this.optionsS)
        } else {
          this.extractData(this.handledData['Soil'], {}, this.optionsS)
        }
      }
      if (this.handledData['Mining'] !== undefined && JSON.stringify(this.handledData['Mining']) !== "{}") {
        if(JSON.stringify(this.sampleData) !== "{}" && this.sampleData.handledData['Mining'] !== undefined) {
          this.extractData(this.handledData['Mining'], this.sampleData.handledData['Mining'], this.optionsM)
        } else {
          this.extractData(this.handledData['Mining'], {}, this.optionsM)
        }
      }
      if (this.handledData['Mining1'] !== undefined && JSON.stringify(this.handledData['Mining1']) !== "{}") {
        if(JSON.stringify(this.sampleData) !== "{}" && this.sampleData.handledData['Mining1'] !== undefined) {
          this.extractData(this.handledData['Mining1'], this.sampleData.handledData['Mining1'], this.optionsM1)
        } else {
          this.extractData(this.handledData['Mining1'], {}, this.optionsM1)
        }
      } 

      this.$nextTick(() => {
        
        let domGM = document.getElementById('summary-general-metals-container') 
        let domPP = document.getElementById('summary-plastics-pvc-container')
        let domTG = document.getElementById('summary-testall-geo-container')
        let domS = document.getElementById('summary-soil-container')
        let domM = document.getElementById('summary-mining-container')
        let domM1 = document.getElementById('summary-mining1-container')

        if(domGM && this.optionsGM.isExist) {
          new Highcharts.Chart(domGM, this.optionsGM);
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
    extractData(dataObj, sampleObj, optionObj) {
      optionObj.handledData = dataObj
      this.extractHandledData = [[], []]
      this.extractHandledData[0] = Object.keys(dataObj)  // 获取键值,即元素名称
      this.extractHandledData[0].forEach(key => {  // 获取对应元素含量数值 
        this.extractHandledData[1].push(dataObj[key])
      })
      // 获取绘图元素数据
      this.allElementData = [
        ["Mg","Al","Si","P","S","Cl","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Rb","Sr","Y","Zr","Nb","Mo","Ru","Pd","Ag","Cd","Sn","Sb","Te","Cs","Ba","Hf","W","Au","Hg","Pb","Bi","Th","U","Bal"], 
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
      if(JSON.stringify(sampleObj) !== "{}") {
        for(let e in sampleObj) {
          let eIndex = this.allElementData[0].indexOf(e)
          if(eIndex >= 0) {
            let eVal = Number(sampleObj[e])
            if(eVal > 1) {
              eVal = Math.log2(eVal)
            }
            this.allElementData[2][eIndex] = eVal
          }
        }
      }
      optionObj.xAxis.categories = this.allElementData[0]
      optionObj.series[0].data = this.allElementData[1].map(Number)
      optionObj.series[1].data = this.allElementData[2].map(Number)
      optionObj.isExist = true
    }
  },

}
</script>

<style scoped>

</style>
