<template>
  <el-menu 
    class="navbar" 
    mode="horizontal">

        <!-- 收放侧栏 -->
        <hamburger 
          :toggle-click="toggleSideBar" 
          :is-active="sidebar.opened" 
          class="hamburger-container"/>

        <!-- 面包屑路径 -->
        <breadcrumb />

        <!-- <span>账号:{{ username }} || 用户姓名:{{ name }}</span> -->

        <el-dropdown 
          class="avatar-container" 
          trigger="click">

          <!-- 用户头像  -->
          <div class="avatar-wrapper">
            <img 
              v-if="avatar"
              :src="avatar+'?imageView2/1/w/80/h/80'" 
              class="user-avatar">
            <i v-else class="el-icon-picture avatar-null-small-icon"></i>
          </div>

          <el-dropdown-menu 
            slot="dropdown" 
            class="user-dropdown">
            <!-- 用户主页 -->
            <router-link 
              class="inlineBlock" 
              to="/">
              <el-dropdown-item>
                用户主页
              </el-dropdown-item>
            </router-link>
            <!-- 退出登录 -->
            <el-dropdown-item divided>
              <span 
                style="display:block;" 
                @click="logout">
                登 出
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>

        </el-dropdown>

  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'username',
      'name',
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 6px;
      }
      .avatar-null-small-icon {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        line-height: 40px;
        text-align: center;
        background-color: antiquewhite;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }

}
</style>

