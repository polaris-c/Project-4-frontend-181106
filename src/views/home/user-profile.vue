<template>
  <div class="app-main-container">

    <el-card 
      class="el-row-style"
      shadow="hover">
      <div slot="header">
        <span>用户信息</span>
      </div>
      <div class="card-body">
        <el-row>
          <el-col :span="8" :offset="1">
            <ul>
              -{{ userList }}-
              <li>编 号 : {{ userData.id }}</li>
              <li>姓 名 : {{ userData.name }}</li>
              <li>账号(手机) : {{ userData.username }}</li>
              <li>邮 箱: {{ userData.email }}</li>
              <li>固 话: {{ userData.phone }}</li>
              <li>单 位: {{ userData.unit }}</li>
              <li>部 门: {{ userData.department }}</li>
              <li>职 务: {{ userData.posts }}</li>
              <li>任职情况: {{ userData.isDelete }}</li>
              <li>权 限: {{ userData.role }}</li>
              <li>备 注: {{ userData.note }}</li>
            </ul>
            
          </el-col>
          <el-col :span="8" :offset="1">
            <div class="avatar-container">用户照片</div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card shadow="hover">
      <go-back></go-back>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GoBack from '@/components/Buttons/go-back'
import { getList } from '@/api/user-info'

export default {
  name: 'UserProfile',
  data() {
    return {
      userList: {},
      userData: {
        id: 1,
        name: 'Admin01',
        username: '123456',
        phone: '321456',
        email: '123456@outlook.com',
        unit: 'AAA',
        department: 'aaa',
        posts: 'UPA',
        role: 'admin',
        isDelete: false,
        note: 'aaa1'
      },
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'sidebar',
      'device',
      'token',
      'avatar',
    ])
  },
  components: {
    GoBack,
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      getList().then(res => {
        console.log('- - UserProfile - - getList res:', res)
        this.userList = res
      }).catch(err => {
        this.$message({
          message: '获取用户信息错误',
          type: 'error'
        })
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card-body {
  height: 500px;
}

.avatar-container {
  margin-top: 50px;
  width: 200px;
  height: 200px;
  background-color: antiquewhite;
}

ul {
  margin-top: 50px;
}

li {
  margin: 15px 0;
}
</style>
