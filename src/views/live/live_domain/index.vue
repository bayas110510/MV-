<template>
  <div class="app-container">
    <el-input
      v-model="input"
      style="margin:0 0 20px 20px; width:300px;"
      placeholder="请输入内容"
      clearable
    />
    <el-button style="margin:0 0 10px 10px;" type="success">成功按钮</el-button>
    <el-button type="primary">
      {{ $t('permission.addRole') }}
    </el-button>
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading..."
        stripe
        style="width: 100%"
      >
        <el-table-column prop="Name" label="域名" />
        <el-table-column prop="CurrentCName" label="CNAME" />
        <el-table-column prop="Type" :formatter="typeFormatter" label="类型" />
        <el-table-column prop="IsMiniProgramLive" :formatter="liveFormatter" label="场景" />
        <el-table-column prop="Status" :formatter="statusFormatter" label="状态" class-name="status-col">
          <template slot-scope="{row}">
            <el-tag :type="row.status">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="CreateTime" label="开始时间" />
        <el-table-column prop="RentExpireTime" label="过期时间" />

        <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
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
  </div>
</template>

<script>

import { fetchList } from '@/api/domain'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  data() {
    return {
      name: 'ComplexTable',
      filters: {
        statusFilter(status) {
          const statusMap = {
            published: 'success',
            draft: 'info',
            deleted: 'danger'
          }
          return statusMap[status]
        },
        typeFilter(type) {
          return calendarTypeKeyValue[type]
        }
      },
      listLoading: true,
      input: '',
      // tableData: null,
      tableData: null,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
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
          Status: 1,
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
          Status: 1,
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
          Status: 0,
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleModifyStatus(row, status) {
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
    // 类型
    typeFormatter(row, column) {
      const type = row.Type
      if (type === 0) {
        return '推流'
      } else {
        return '播放'
      }
    },
    // 场景
    liveFormatter(row, column) {
      const live = row.IsMiniProgramLive
      if (live === 0) {
        return '标准直播'
      } else {
        return '小程序直播'
      }
    },
    // 状态
    statusFormatter(row, column) {
      const status = row.Status
      if (status === 0) {
        return '停用'
      } else {
        return '启用'
      }
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
