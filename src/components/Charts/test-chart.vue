<template>
  <div class="highcharts-container"></div>
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
  name: 'chart',
  props: {
  },
  data() {
    return {
      chart: null,
      options: {
        title: {
          text: 'title_text'
        },
        chart:{
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          // backgroundColor: 'whitesmoke',  //'rgba(250, 250, 250, 0.9)',
          borderWidth: 0,
          plotBackgroundColor: 'whitesmoke',
          // plotShadow: true,
          // plotBorderWidth: 0
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
          categories: ['xAxis_1_categorie', 'xAxis_2_categorie']
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
            data: [2, 5, 10, 18, 30, 35, 20, 10, 6]
          },
          {
            name: '当前样本FTIR谱图',
            // color: 'blue',
            // lineWidth: 1,
            data: [12, 15, 20, 28, 40, 45, 30, 20, 16]
          }
        ]
      },
      styles: {
        // width: 1150,
        height: 600,
      },
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      console.log(this.$el);
      // this.$el.style.width = (this.styles.width || 900) + 'px';
      this.$el.style.height = (this.styles.height || 600) + 'px';
      this.chart = new Highcharts.Chart(this.$el, this.options);
    }
  },

}
</script>

<style scoped>

</style>
