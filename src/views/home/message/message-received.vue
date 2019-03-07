<template>
  <div class="app-main-container">
    <el-row>
      <el-col :span="22">
        <search-input ></search-input>
      </el-col>
      <el-col :span="2">
        <delete-button ></delete-button>
      </el-col>
    </el-row>
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <el-button type="primary" @click="detail">Detail</el-button> -->
    <el-table
      class="app-main-table"
      ref="MessageList"
      :data="tableData"
      style="width: 100%"
      tooltip-effect="dark"
      fit
      stripe
      border
      highlight-current-row>

      <el-table-column
        type="selection"
        align="center"
        width="50">
      </el-table-column>
      
      <el-table-column
        prop="sendUser"
        label="发送人"
        align="center"
        width="200">
      </el-table-column>


      <el-table-column
        prop="title"
        label="主题"
        align="center"
        width="">
        <template slot-scope="scope">
          <el-button 
            type="text"
            @click="handleDetail(scope.row)">
            {{ scope.row.title }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="hasRead"
        label="是否已读"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="hasHandle"
        label="是否处理"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="handleUser"
        label="处理人"
        align="center"
        width="150">
      </el-table-column>

      <el-table-column
        prop="sendDate"
        label="发送时间"
        align="center"
        width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DeleteButton from '@/components/Buttons/delete-button'
import SearchInput from '@/components/SearchInput'

export default {
  name: 'MessageDetail',
  data() {
    return {
      tableData: [
        {
          id: 1,
          sendUser: 'User001',
          receiveUser: '所有专家及管理员',
          title: 'X案件的疑似炸药原材料咨询',
          message: '',
          hasRead: '是',
          hasHandle: '是',
          handleUser: '赵** 炸药专家',
          sendDate: '2019-03-05',
        },
        {
          id: 2,
          sendUser: 'User002',
          receiveUser: '所有专家及管理员',
          title: 'A案件的疑似炸药原材料咨询',
          message: '',
          hasRead: '是',
          hasHandle: '是',
          handleUser: '赵** 炸药专家',
          sendDate: '2019-03-05',
        },
        {
          id: 3,
          sendUser: 'User003',
          receiveUser: '所有专家及管理员',
          title: 'AXX案件的爆炸装置残片咨询',
          message: '',
          hasRead: '是',
          hasHandle: '是',
          handleUser: '徐** 爆炸装置专家',
          sendDate: '2019-03-05',
        },
        {
          id: 4,
          sendUser: 'User004',
          receiveUser: '所有专家及管理员',
          title: 'XXX案件的疑似炸药原材料咨询',
          message: '',
          hasRead: '是',
          hasHandle: '否',
          handleUser: '无',
          sendDate: '2019-03-05',
        },
        {
          id: 5,
          sendUser: '孙** 管理员',
          receiveUser: '徐** 爆炸装置专家',
          title: 'ZXX案件的爆炸装置残片咨询',
          message: '',
          hasRead: '是',
          hasHandle: '是',
          handleUser: '徐** 爆炸装置专家',
          sendDate: '2019-03-05',
        },
        {
          id: 6,
          sendUser: '赵** 管理员',
          receiveUser: '李** 炸药专家',
          title: 'DXX案件的疑似炸药原材料咨询',
          message: '',
          hasRead: '是',
          hasHandle: '否',
          handleUser: '无',
          sendDate: '2019-03-05',
        }
      ]
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
  components: {
    DeleteButton,
    SearchInput,
  },
  methods: {
    handleDetail() {
      this.$router.push('/message/messageDetail')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
