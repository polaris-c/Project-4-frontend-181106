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
                      placeholder="请选择物证类别"
                      :disabled="evidenceInfo.evidenceDisabled">
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
                <el-col :span="5" >
                  <el-form-item label="物证编号">
                    <el-input 
                      v-model="evidenceInfo.evidenceID"
                      placeholder="请输入物证编号"
                      :disabled="evidenceInfo.evidenceDisabled">
                      <!-- :disabled="true" -->
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="1">
                  <!-- {{ evidenceInfo.evidenceType }}
                  <div v-if="messageData.exploEviId">exploEviId: {{ messageData.exploEviId }}</div>
                  <div v-else-if="messageData.devEviId">devEviId: {{ messageData.devEviId }}</div> -->
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

                  <el-form-item label="收件人">
                    <el-select v-model="messageData.receiveUser" placeholder="请选择收件人">
                      <el-option
                        v-for="item in expertData"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <!-- <el-form-item label="收件人">
                    <el-input 
                      v-model="expertSelectedName"
                      :disabled="true"
                      placeholder="请在右侧专家列表中选择专家并确定 ->">
                    </el-input>
                  </el-form-item> -->

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

                <!-- <el-col :span="10" :offset="2" v-if="role !== 3">
                  <el-transfer
                    filter-placeholder="请输入专家名称或职务"
                    v-model="expertSelected"
                    :data="expertData"
                    :titles="['专家列表', '选定专家']"
                    filterable>
                    <el-button 
                      class="transfer-footer" 
                      slot="right-footer"
                      type="primary" 
                      size="small"
                      @click="handleSelectExpert">
                      确 定
                    </el-button>
                  </el-transfer>
                </el-col> -->

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
import { createUserMessages } from '@/api/message'
import { getList } from '@/api/user-management'

export default {
  name: 'MessageCreation',
  data() {
    return {
      labelPosition: 'left',
      evidenceInfo: {
        evidenceType: '',
        evidenceID: '',
        evidenceDisabled: false,
      },  // 临时记录物证信息,包括类别,物证编号和是否能手动输入物证
      messageData: {
        sendUser: '',
        receiveUser: '',
        title: '',
        message: '',
        exploEviId: '',
        devEviId: '',
      },  // 消息数据体
      expertList: [
        {
          id: 1,
          name: '赵**',
          posts: '爆炸装置专家',
        },
        {
          id: 2,
          name: '钱**',
          posts: '炸药专家',
        },
        {
          id: 3,
          name: '孙**',
          posts: '爆炸装置专家',
        },
        {
          id: 5,
          name: '李**',
          posts: '爆炸装置专家',
        },
        {
          id: 6,
          name: '周**',
          posts: '炸药专家',
        },
        {
          id: 7,
          name: '吴**',
          posts: '炸药专家',
        }
      ],  // 获取的所有专家信息
      expertData: [],  // 穿梭框左栏的专家列表,"专家姓名--职务"形式显示,key是专家编号
      expertSelected: [],  // 穿梭框右栏选定的专家,仅仅只是专家编号的数组
      expertSelectedName: '',  // 显示收件人所需的专家名称字符串,多个专家以";"分隔
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'role',
    ]),
  },
  watch: {
    /** 监听临时物证记录,根据类别传入消息数据体中 */
    evidenceInfo: {
      deep: true,
      handler: function(val, oldVal) {
        // console.log('- - MessageCreation - - val: ', val.evidenceType)
        if (val.evidenceType === 'explosive') {
          // console.log('- - MessageCreation - - explosive: ', this.evidenceInfo.evidenceID)
          this.messageData.exploEviId = this.evidenceInfo.evidenceID
          this.messageData.devEviId = ''
        }
        else {
          // console.log('- - MessageCreation - - device: ', this.evidenceInfo.evidenceID)
          this.messageData.devEviId = this.evidenceInfo.evidenceID
          this.messageData.exploEviId = ''
        }
      }
    },
  },
  components: {
    GobackButton,
    SubmitButton
  },
  mounted() {
    this.messageData.sendUser = this.name
    this.generateExpertData()
    /** 从分析研判模块直接传入物证信息 */
    if (this.$route.params.evidenceType && this.$route.params.evidenceID) {
      console.log('- - MessageCreation - - $route.params:', this.$route.params.evidenceType, this.$route.params.evidenceID)
      // console.log('- - MessageCreation - - $route:', this.$route)
      this.evidenceInfo.evidenceType = this.$route.params.evidenceType
      this.evidenceInfo.evidenceID = this.$route.params.evidenceID
      this.evidenceInfo.evidenceDisabled = true
    }
  },
  methods: {
    /** 生成用于穿梭框左栏的专家列表(expertData),"专家姓名--职务"形式显示,key是专家编号 */
    generateExpertData() {
      getList().then( res => {
        this.expertList = res.results
        this.expertList.forEach((expert, index) => {
          this.expertData.push({
            id: expert.id,  // 专家编号
            label: `${expert.name} -- ${expert.posts}`,  // 专家名 -- 专家职务
          })
        });
      })
    },
    /** 确定专家后操作 */
    handleSelectExpert() {
      console.log('- - MessageCreation - - handleSelectExpert expertSelected:', this.expertSelected)
      let tempExpertList = []  // 完整选定专家信息的数组
      this.messageData.receiveUser = this.expertSelected  // 将选定专家的编号数组传到消息
      数据体中
      this.expertSelectedName = ''  // 每次确定专家时都将原收件人字符串清空，防止重复
      /** 从所有专家的数据中(expertList)根据被选定的专家编号(expertSelected)，抽取出选定专家的信息,包含专家的姓名,职务信息 */
      tempExpertList = this.expertList.filter((expert) => {
        return this.expertSelected.includes(expert.id)
      })
      /** 根据选定的专家信息,创建用于显示收件人的字符串(expertSelectedName),多个专家名称以";"分隔 */
      tempExpertList.forEach((expert) => {
        this.expertSelectedName = `${this.expertSelectedName + expert.name}; `
      })
    },

    /**  */
    handleSubmit() {
      console.log('- - MessageCreation - - handleSubmit ',`exploEviId: ${this.messageData.exploEviId}`, `devEviId: ${this.messageData.devEviId}`)
      console.log('- - MessageCreation - - handleSubmit receiveUser:', this.messageData.receiveUser)
      let message = new FormData()
      for(let prop in this.messageData) {
        if(this.messageData.hasOwnProperty(prop)) {
          message.append(prop, this.messageData[prop])
        }
      }
      // message.append('title', this.messageData.title)
      // message.append('message', this.messageData.message)
      // message.append('exploEviId', this.messageData.exploEviId)
      createUserMessages(message).then( res => {
        console.log('- - MessageCreation - - handleSubmit res:', res)
        if(res.isSend) {
          this.$message({
            message: '消息发送成功',
            type: 'success'
          })
          this.goBcak()
        } else {
          this.$message({
            message: '消息发送失败',
            type: 'error'
          })
        }
      })
    },
    goBcak() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.transfer-footer {
  margin-left: 130px;
}
</style>
