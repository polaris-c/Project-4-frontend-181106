<template>
  <div class="app-main-container">
    <!-- 人员基本信息 -->
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card 
          shadow="hover"
          class="">
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
                    <el-select 
                      v-model="userData.role" 
                      placeholder="请选择权限">
                      <el-option label="管理员" value="2">管理员</el-option>
                      <el-option label="普通用户" value="3">普通用户</el-option>
                    </el-select>
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
                <el-col :span="12">
                  <el-form-item label="用户照片">
                    <el-upload
                      class="avatar-uploader"
                      action=""
                      :show-file-list="false"
                      :on-change="handleChange"
                      :auto-upload="false">
                      <img 
                        v-if="userData.picDisplayURL" 
                        :src="userData.picDisplayURL" 
                        class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
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
import { createUser } from '@/api/user-management'

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
        picUrl: '',
        picDisplayURL: '',
        note: ''
      },
      userDataRule: { },
      uploadForm: { }
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
  mounted() {
    this.uploadForm = new FormData()
  },
  methods: {
    handleChange(file, fileList) {
      window.URL = window.URL || window.webkitURL
      this.userData.picDisplayURL = window.URL.createObjectURL(file.raw)
      console.log('- - handleChange - - file:', this.userData.picDisplayURL)
      this.userData.picUrl = file.raw
    },
    /** 页面操作 */
    handleSubmit() {
      console.log('- - UserCreation - - name:', this.userData.name)
      for(let prop in this.userData) {
        if(this.userData.hasOwnProperty(prop)) {
          this.uploadForm.append(prop, this.userData[prop])
        }
      }
      createUser(this.uploadForm).then(res => {
        this.$message({
          message: '创建用户成功',
          type: 'success'
        })
        this.goBcak()
      }).catch(err => {
        this.$message({
          message: '创建用户错误' + err.message,
          type: 'error'
        })
      })
    },
    goBcak() {
      this.$router.push('/userManagement/userIndexList/userList')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.avatar-uploader {
  border: 2px dashed lightgrey;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 200px;
  display: block;
  padding: 3px;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 190px;
  height: 190px;
  line-height: 190px;
  text-align: center;
}
.avatar {
  width: 190px;
  height: 190px;
  display: block;
}
</style>
