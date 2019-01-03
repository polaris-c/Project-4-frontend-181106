<template>
  <div>
    <el-upload
      class=""
      action=""
      list-type="picture-card"
      :file-list="basicInfoData.srcImgList"
      :limit="20"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-preview="handlePreview"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :auto-upload="false"
      multiple>
      <el-button size="mini" type="primary">点击选取图片</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png图片</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>

