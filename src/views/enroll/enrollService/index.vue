<template>
  <div class="app-container">
    <el-input
      v-model="input"
      style="margin:0 0 20px 20px; width:300px;"
      placeholder="请输入内容"
      clearable
    />
    <el-button style="margin:0 0 10px 10px;" type="success">成功按钮</el-button>
    <el-button type="primary" @click="handleAddRole">
      {{ $t('permission.addRole') }}
    </el-button>
    <el-card>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading..."
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="Name" label="用户姓名" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="enrollType" label="报名类型" />
        <el-table-column prop="papersType" label="文件类型" />
        <el-table-column prop="cost" label="报名费用" class-name="status-col" />
        <el-table-column prop="effective" label="有效" />
        <el-table-column prop="recommended" label="推荐" />
        <el-table-column prop="free" label="免费" />
        <el-table-column prop="Status" :formatter="statusFormatter" label="状态" />
        <el-table-column prop="CreateTime" label="创建时间" />
        <el-table-column prop="CreateUsers" label="创建用户" />
        <el-table-column prop="RentExpireTime" label="修改时间" />
        <el-table-column prop="RentExpireTime" label="修改用户" />

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

// import { fetchList } from '@/api/domain'
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
      // fetchList(this.postData).then(response => {
      //   // this.tableData = response.data.Response.DomainList
      //   this.listLoading = false
      // })
      this.tableData = [
        {
          Name: '巴雅斯古楞',
          Type: 0,
          PlayType: 1,
          IsDelayLive: 0,
          IsMiniProgramLive: 0,
          BCName: 1,
          userName: 'bayas',
          enrollType: '在线报名',
          papersType: '123',
          cost: '200$',
          effective: '是',
          recommended: 'xxx',
          free: 'true',
          Status: 1,
          CreateTime: '2020-05-17 11:12:25',
          CreateUsers: '超级管理员'
        },
        {
          Name: '张三',
          Type: 0,
          PlayType: 1,
          IsDelayLive: 0,
          IsMiniProgramLive: 0,
          BCName: 1,
          userName: 'zhang',
          enrollType: '线下报名',
          papersType: '123',
          cost: '200$',
          effective: '是',
          recommended: 'xxx',
          free: 'true',
          Status: 1,
          CreateTime: '2020-05-17 11:12:25',
          CreateUsers: '超级管理员'
        },
        {
          Name: '李四',
          Type: 0,
          PlayType: 1,
          IsDelayLive: 0,
          IsMiniProgramLive: 0,
          BCName: 1,
          userName: 'li',
          enrollType: '在线报名',
          papersType: '123',
          cost: '200$',
          effective: '是',
          recommended: 'xxx',
          free: 'true',
          Status: 1,
          CreateTime: '2020-05-17 11:12:25',
          CreateUsers: '超级管理员'
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
        return '报名成功'
      } else {
        return '报名失败'
      }
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
