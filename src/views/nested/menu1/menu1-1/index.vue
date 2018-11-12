<template >
  <div style="padding:30px;  border: 2px dotted red;">
  	- menu 1-1 -
    <el-alert :closable="false" title="menu 1-1" type="success">
      <router-view />
    </el-alert>
  </div>
</template>
