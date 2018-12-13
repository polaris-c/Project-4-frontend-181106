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
                <el-col :span="11">
                  <el-form-item label="发件人">
                    <el-input 
                      v-model="messageData.sendUser"
                      :disabled="true">
                    </el-input>
                  </el-form-item>

                  <el-form-item label="收件人">
                    <el-input 
                      v-model="expertSelectedName"
                      :disabled="true"
                      placeholder="请在右侧专家列表中选择专家并确定 ->">
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

                <el-col :span="11" :offset="2">
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
        evidenceID: '',
        evidenceDisabled: false,
      },  // 临时记录物证信息,包括类别,物证编号和是否能手动输入物证
      messageData: {
        sendUser: '',
        receiveUser: [],
        title: '',
        message: '',
        exploEviId: '',
        devEviId: '',
        sendDate: '',
      },  // 消息数据体
      expertList: [
        {
          id: 1,
          name: 'Aaa1',
          posts: '爆炸物',
        },
        {
          id: 2,
          name: 'Bbb1',
          posts: '炸药',
        },
        {
          id: 3,
          name: 'Aaa2',
          posts: '爆炸物',
        },
        {
          id: 5,
          name: 'Aaa3',
          posts: '爆炸物',
        },
        {
          id: 6,
          name: 'Bbb2',
          posts: '炸药',
        },
        {
          id: 7,
          name: 'Bbb3',
          posts: '',
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
      'roles',
      'sidebar',
      'device',
      'token',
      'avatar',
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
    }
  },
  components: {
    GobackButton,
    SubmitButton
  },
  mounted() {
    this.messageData.sendUser = this.name
    this.expertData= this.generateExpertData()
    /** 从分析研判模块直接传入物证信息 */
    if (this.$route.params.evidenceType && this.$route.params.evidenceID) {
      console.log('- - MessageCreation - - $route.params:', this.$route.params.evidenceType, this.$route.params.evidenceID)
      this.evidenceInfo.evidenceType = this.$route.params.evidenceType
      this.evidenceInfo.evidenceID = this.$route.params.evidenceID
      this.evidenceInfo.evidenceDisabled = true
    }
  },
  methods: {
    /** 生成用于穿梭框左栏的专家列表(expertData),"专家姓名--职务"形式显示,key是专家编号 */
    generateExpertData() {
      let data = []
      this.expertList.forEach((expert, index) => {
        data.push({
          key: expert.id,  // 专家编号
          label: `${expert.name} -- ${expert.posts}`,  // 专家名 -- 专家职务
        })
      });
      return data
    },
    /** 确定专家后操作 */
    handleSelectExpert() {
      console.log('- - MessageCreation - - handleSelectExpert expertSelected:', this.expertSelected)
      let tempExpertList = []  // 完整选定专家信息的数组
      this.messageData.receiveUser = this.expertSelected  // 将选定专家的编号数组传到消息数据体中
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
