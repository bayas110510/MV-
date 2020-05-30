<template>
  <div class="app-container">
    <el-input
      v-model="input"
      style="margin:0 0 20px 20px; width:300px;"
      placeholder="请输入内容"
      clearable
    />
    <el-button class="filter-item" type="primary" icon="el-icon-search">{{ $t('table.search') }}</el-button>
    <el-button type="primary" @click="handleCreate">{{ $t('table.add') }}</el-button>
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading..."
        stripe
        style="width: 100%"
      >
        <el-table-column prop="Name" label="用户名" />
        <el-table-column prop="enrollType" label="报名类型" />
        <el-table-column prop="opustype" label="作品类型" />
        <el-table-column prop="createdate" label="创建时间" />
        <el-table-column prop="status" label="状态" class-name="status-col">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
              {{ $t('table.publish') }}
            </el-button>
            <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
              {{ $t('table.draft') }}
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              {{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 弹出框 -->
    <!-- <el-dialog>
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="fullname">
          <el-input v-model="temp.fullname" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>

import { fetchList } from '@/api/domain'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listLoading: true,
      input: '',
      // tableData: null,
      tableData: null
      // temp
      //  报名类型
      // enrollTypeOptions: ['商品演出招商', '晚会招商', '广告招商', '设备租赁']
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList(this.postData).then(response => {
        // this.tableData = response.data.Response.DomainList
        this.listLoading = false
      })
      this.tableData = [
        {
          Name: 'push.tib1206.com',
          Type: 0,
          // Status: 1,
          status: 'published',
          PlayType: 1,
          IsDelayLive: 0,
          IsMiniProgramLive: 0,
          CreateTime: '2020-05-01 11:12:25',
          BCName: 1,
          CurrentCName: 'push.tib1206.com.livepush.myqcloud.com',
          TargetDomain: 'push.tib1206.com.livepush.myqcloud.com',
          RentTag: 0,
          RentExpireTime: '-'
        },
        {
          Name: 'play.tib1206.com',
          Type: 1,
          // Status: 1,
          status: 'draft',
          PlayType: 1,
          IsDelayLive: 0,
          IsMiniProgramLive: 0,
          CreateTime: '2020-05-01 11:02:37',
          BCName: 1,
          CurrentCName: 'play.tib1206.com.livecdn.liveplay.myqcloud.com',
          TargetDomain: 'play.tib1206.com.livecdn.liveplay.myqcloud.com',
          RentTag: 0,
          RentExpireTime: '-'
        },
        {
          Name: '95437.livepush.myqcloud.com',
          Type: 0,
          // Status: 0,
          status: 'draft',
          PlayType: 0,
          IsDelayLive: 0,
          IsMiniProgramLive: 0,
          CreateTime: '2020-04-30 15:47:18',
          BCName: 1,
          CurrentCName: '95437.livepush.myqcloud.com',
          TargetDomain: '95437.livepush.myqcloud.com',
          RentTag: 0,
          RentExpireTime: '-'
        }
      ]
      this.listLoading = false
    },
    handleCreate() {
      alert('弹出框')
    },
    handleModifyStatus(row, status) {
      alert('草稿&发布点击事件')
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      alert(row.Status)
      alert(status)
      row.Status = status
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
      console.log('点击了删除按钮')
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
