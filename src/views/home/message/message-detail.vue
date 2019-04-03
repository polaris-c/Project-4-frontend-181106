<template>
  <div class="app-main-container">
    <el-row class="el-row-style">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <span>咨询消息</span>
          </div>
          <div>
            <el-form
              v-loading="loading"
              ref="messageForm" 
              :model="messageData"
              label-position="left"
              label-width="80px">
              <el-row>
                <el-col :span="18">
                  <!-- {{ evidenceInfo.evidenceType }} -->
                  <div v-if="messageData.exploEviId">炸药与原材料编号: {{ messageData.exploEviId }}</div>
                  <div v-else-if="messageData.devEviId">爆炸装置残片编号: {{ messageData.devEviId }}</div>
                </el-col>
                <el-col :span="6">
                  <div>录入时间: {{ messageData.sendDate }}</div>
                </el-col>
              </el-row>

              <hr>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="发件人">
                    <el-input 
                      v-model="messageData.sendUser.name"
                      :disabled="true">
                    </el-input>
                  </el-form-item>

                  <el-form-item label="收件人">
                    <el-input 
                      v-model="messageData.receiveUser.name"
                      :disabled="true"
                      placeholder="默认所有专家与管理员">
                    </el-input>
                  </el-form-item>

                  <el-form-item label="标题">
                    <el-input v-model="messageData.title"></el-input>
                  </el-form-item>

                  <el-form-item label="正文">
                    <el-input 
                      v-model="messageData.message"
                      :rows="12"
                      type="textarea"
                      placeholder="请输入...">
                    </el-input>
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
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GobackButton from '@/components/Buttons/goback-button'
import { getUserMessagesInfo } from '@/api/message'

export default {
  name: 'MessageDetail',
  props: { },
  data() {
    return {
      id: null,
      loading: false,
      messageData : {
        sendUser: { name: 'Empty' },  // 保证在后端返回信息前messageData.sendUser.xxx不报错
        receiveUser: { name: 'Empty' }
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
    ])
  },
  watch: {

  },
  components: {
    GobackButton
  },
  mounted() {
    this.id = this.$route.params.id
    // console.log(this.$route.params.id)
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getUserMessagesInfo(this.id).then( res => {
        this.messageData = res
        this.loading = false
      })
    },
    goBcak() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
