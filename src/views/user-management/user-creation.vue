<template>
  <div class="app-main-container">
    <!-- 人员基本信息 -->
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card 
          shadow="hover"
          class="userCard">
          <div slot="header">
            <span>人员基本信息</span>
          </div>
          <div>
            <el-form 
              ref="userForm" 
              :model="userData"
              :rules="userDataRule"
              :label-position="labelPosition"
              label-width="80px">

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="人员姓名">
                    <el-input v-model="userData.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机(账号)">
                    <el-input v-model="userData.username"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="密码">
                    <el-input v-model="userData.password"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="确认密码">
                    <el-input v-model="userData.passwordCheck"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="固定电话">
                    <el-input v-model="userData.phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电子邮箱">
                    <el-input v-model="userData.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>



              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="工作单位">
                    <el-input v-model="userData.unit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工作部门">
                    <el-input v-model="userData.department"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="工作职务">
                    <el-input v-model="userData.posts"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <hr>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="系统权限">
                    <el-input v-model="userData.role"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <hr>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="备注">
                    <el-input 
                      v-model="userData.note"
                      :rows="8"
                      type="textarea"
                      placeholder="请输入...">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12"></el-col>
              </el-row>
              
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 页面操作按键 -->
    <el-card shadow="hover">
      <el-row class="">
        <el-col :span="22">
          <goback-button @goback-confirm="goBcak"></goback-button>
        </el-col>
        <el-col :span="2">
          <submit-button @submit-confirm="handleSubmit"></submit-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GobackButton from '@/components/Buttons/goback-button'
import SubmitButton from '@/components/Buttons/submit-button'

export default {
  name: 'UserCreation',
  data() {
    return {
      labelPosition: 'left',
      userData: {
        name: 'admin01',
        username: '',
        password: '',
        passwordCheck: '',
        phone: '',
        email: '',
        unit: '',
        department: '',
        posts: '',
        role: '',
        picURL: '',
        note: ''
      },
      userDataRule: { }
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
    GobackButton,
    SubmitButton
  },
  methods: {
    /**  */
    handleSubmit() {
      console.log('- - UserCreation - - name:', this.userData.name)
    },
    goBcak() {
      this.$router.push('/userManagement/userIndexList/userList')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.userCard {
  // height: 600px;
}
</style>
