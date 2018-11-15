<template>
  <div style="padding:30px; border: 2px dotted red;">
  	- menu 1-2 -
    <el-alert :closable="false" title="menu 1-2" type="success">
      <router-view />
    </el-alert>
  </div>
</template>
