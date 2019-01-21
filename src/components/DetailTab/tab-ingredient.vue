<template>
  <div>
    <div>检测设备：{{ ingredientData.dataInfo.devDetect }}</div>
    <chart-column 
      v-if="dataType === 'XRF'"
      :data-type = "dataType"
      :series-data = "ingredientData.seriesData"
      :data-index = "dataIndex">
    </chart-column>
    <chart-curve 
      v-else
      :data-type = "dataType"
      :series-data = "ingredientData.seriesData"
      :data-index = "dataIndex">
    </chart-curve>
    <pagination-files 
      :count="ingredientData.seriesData.length"
      :page="pageIndex"
      @change-page="handleChangePage">
    </pagination-files>
  </div>
</template>

<script>
import PaginationFiles from '@/components/PaginationFiles'
import ChartCurve from '@/components/Charts/chart-curve'
import ChartColumn from '@/components/Charts/chart-column'

export default {
  name: "TabIngredient",
  props: {
    dataType: {
      type: String
    },
    ingredientData: {
      type: Object
    },
  },
  data() {
    return {
      dataIndex: 0,  // 数据数组下标从0开始
      pageIndex: 1,  // 页码从1开始
    }
  },
  components: {
    PaginationFiles,
    ChartCurve,
    ChartColumn,
  },
  mounted() {
    console.log(`---- TabIngredient ---- ${ this.dataType } ingredientData: `, this.ingredientData.seriesData)
  },
  methods: {
    handleChangePage(index) {
      console.log('---- TabIngredient ---- index: ', index)
      this.dataIndex = index - 1
      this.pageIndex = index
    },
  }
}
</script>

<style scoped>

</style>
