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
              ref="messageForm" 
              :model="messageData"
              :label-position="labelPosition"
              label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="物证类别">
                    <el-select
                      v-model="evidenceInfo.evidenceType"
                      placeholder="请选择物证类别">
                      <el-option 
                        value="explosive"
                        label="炸药与原材料">
                      </el-option>
                      <el-option 
                        value="device"
                        label="爆炸装置残片">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6" >
                  <el-form-item label="物证编号">
                    <el-input 
                      v-model="evidenceInfo.evidenceID"
                      placeholder="请输入物证编号">
                      <!-- :disabled="true" -->
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="1">
                  {{ evidenceInfo.evidenceType }}
                  <div v-if="messageData.exploEviId">exploEviId: {{ messageData.exploEviId }}</div>
                  <div v-else-if="messageData.devEviId">devEviId: {{ messageData.devEviId }}</div>
                </el-col>
              </el-row>
              <hr>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="发件人">
                    <el-input 
                      v-model="messageData.sendUser"
                      :disabled="true">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="收件人">
                    <el-input v-model="messageData.receiveUser"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="标题">
                    <el-input v-model="messageData.title"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
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
  name: 'MessageCreation',
  data() {
    return {
      labelPosition: 'left',
      evidenceInfo: {
        evidenceType: '',
        evidenceID: ''
      },
      messageData: {
        sendUser: '',
        receiveUser: '',
        title: '',
        message: '',
        exploEviId: '',
        devEviId: '',
        sendDate: '',
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
    ]),
  },
  watch: {
    evidenceInfo: {
      deep: true,
      handler: function(val, oldVal) {
        console.log('- - MessageCreation - - val: ', val.evidenceType)
        if (val.evidenceType === 'explosive') {
          console.log('- - MessageCreation - - explosive: ', this.evidenceInfo.evidenceID)
          this.messageData.exploEviId = this.evidenceInfo.evidenceID
          this.messageData.devEviId = ''
        }
        else {
          console.log('- - MessageCreation - - device: ', this.evidenceInfo.evidenceID)
          this.messageData.devEviId = this.evidenceInfo.evidenceID
          this.messageData.exploEviId = ''
        }
      }
    }
  },
  components: {
    GobackButton,
    SubmitButton
  },
  mounted() {
    this.messageData.sendUser = this.name
  },
  methods: {
    /**  */
    handleSubmit() {
      console.log('- - submit - - messageData:', this.messageData.exploEviId, this.messageData.devEviId)
    },
    goBcak() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
