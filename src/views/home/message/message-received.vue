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
      v-loading="loading"
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
        prop="sendUser.name"
        label="发送人"
        align="center"
        width="200">
        <!-- <template slot-scope="scope"> -->
          <!-- {{ scope.row.sendUser == null ? '所有专家及管理员' : scope.row.sendUser }} -->
        <!-- </template> -->
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
        <template slot-scope="scope">
          {{ scope.row.hasRead == false ? '否' : '是'}}
        </template>
      </el-table-column>

      <el-table-column
        prop="hasHandle"
        label="是否处理"
        align="center"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.hasHandle == false ? '否' : '是'}}
        </template>
      </el-table-column>

      <el-table-column
        prop="handleUser"
        label="处理人"
        align="center"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.handleUser == null ? '未指定' : scope.row.receiveUser }}
        </template>
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
import { getUserMessagesList } from '@/api/message'

export default {
  name: 'MessageDetail',
  data() {
    return {
      loading: true,
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
        }
      ],
      tableParams: {
        receiveUser: null,
        search: null,
        page: 1,
        page_size: 20,
        count: 1,
      }
    }

  },
  computed: {
    ...mapGetters([
      'username',
      'id',
      'name',
      'roles',
    ]),
  },
  components: {
    DeleteButton,
    SearchInput,
  },
  mounted() {
    this.tableParams.receiveUser = this.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getUserMessagesList(this.tableParams).then( res => {
        this.tableData = res.results
        this.loading = false
      })
    },
    handleDetail(row) {
      this.$router.push('/message/messageDetail/' + row.id)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
