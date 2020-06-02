<template>
  <div class="app-container">
    <el-input
      style="margin:0 0 20px 20px; width:300px;"
      placeholder="请输入内容"
      clearable
    />
    <el-button class="filter-item" type="primary" icon="el-icon-search">{{ $t('table.search') }}</el-button>
    <el-button type="primary" @click="add">{{ $t('table.add') }}</el-button>
    <el-card>
      <el-table :data="tableData" stripe element-loading-text="Loading..." highlight-current-row>
        <!-- 用户名 -->
        <el-table-column prop="fullname" label="用户名" align="center" />
        <!-- 报名类型 -->
        <el-table-column label="作品类型" prop="enrolltype" align="center">
          <template slot-scope="{row}">
            <span>{{ row.enrolltype }}</span>
          </template>
        </el-table-column>
        <!-- 作品类型 -->
        <el-table-column label="作品类型" prop="opustype" align="center">
          <template slot-scope="{row}">
            <span>{{ row.opustype }}</span>
          </template>
        </el-table-column>
        <!-- 创建时间 -->
        <el-table-column prop="timestamp" label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.createdate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column :label="$t('table.status')" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope,row">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button size="mini" type="success" @click="handleModifyStatus(row,'published')">
              <!-- v-if="row.status!='published'" -->
              {{ $t('table.publish') }}
            </el-button>
            <el-button size="mini" @click="handleModifyStatus(row,'draft')">
              <!--  v-if="row.status!='draft'" -->
              {{ $t('table.draft') }}
            </el-button>
            <el-button type="danger" size="mini" @click="remove(scope.$index, scope.row)">
              {{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--弹窗-->
    <el-dialog :title="dialogTitle" width="50%" :visible.sync="iconFormVisible">
      <el-form :inline="true" :model="userInfo" class="demo-form-inline" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <!-- 添加用户名 -->
        <el-form-item label="用户名">
          <el-input v-model="userInfo.fullname" placeholder="用户名" />
        </el-form-item>
        <!-- 添加报名类型 -->
        <el-form-item label="报名类型">
          <el-select v-model="userInfo.enrolltype" class="filter-item" placeholder="报名类型" prop="报名类型">
            <el-option v-for="item in enrollTypeOptions" :key="item" :label="item.display_name" :value="item" />
          </el-select>
        </el-form-item>
        <!-- 添加作品类型 -->
        <el-form-item label="作品类型">
          <el-select v-model="userInfo.opustype" class="filter-item" placeholder="作品类型" prop="opustype">
            <el-option v-for="item in opusTypeOptions" :key="item" :label="item.display_name" :value="item" />
          </el-select>
        </el-form-item>
        <!-- 添加创建时间 -->
        <el-form-item label="创建时间" prop="createdate">
          <el-date-picker v-model="userInfo.createdate" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <!-- 状态 -->
        <el-form-item :label="$t('table.status')">
          <el-select v-model="userInfo.status" class="filter-item" placeholder="状态">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="iconFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      userInfo: {
        fullname: '',
        enrolltype: '',
        opustype: '',
        createdate: '',
        // type: '',
        status: 'published'
      },
      iconFormVisible: false,
      // userInfo: {},
      dialogTitle: '增加',
      rowIndex: null,
      opusTypeOptions: ['歌曲', '乐谱', '歌词'],
      enrollTypeOptions: ['商品演出招商', '晚会招商', '广告招商', '设备租赁'],
      statusOptions: ['published', 'draft'],
      tableData: [
        {
          id: 1,
          fullname: 'bayas',
          enrolltype: '广告招商',
          opustype: '歌曲',
          createdate: '2020-05-01 11:12:25',
          status: 'published'
        },
        {
          id: 2,
          fullname: 'tunnl',
          enrolltype: '商品演出招商',
          opustype: '歌词',
          createdate: '2020-05-01 11:12:25',
          status: 'draft'
        },
        {
          id: 3,
          fullname: 'ga',
          enrolltype: '晚会',
          opustype: '乐谱',
          createdate: '2020-05-01 11:12:25',
          status: 'published'
        }]
    }
  },
  created() {
  },
  methods: {
    // resetTemp() {
    //   this.userInfo = {
    //     fullname: '',
    //     enrolltype: '',
    //     opustype: '',
    //     createdate: new Date()
    //     // type: ''
    //     // status: 'published'
    //   }
    // },
    // 增加
    add() {
      // this.resetTemp()
      this.dialogTitle = '增加'
      this.userInfo = {}
      this.iconFormVisible = true
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTitle = '编辑'
      this.userInfo = row
      this.iconFormVisible = true
      this.rowIndex = index
    },
    // 弹窗确定
    submitUser() {
      if (this.dialogTitle === '编辑') {
        this.tableData.splice(this.rowIndex, 1, this.userInfo)
        this.iconFormVisible = false
        return
      }
      this.tableData.splice(0, 0, this.userInfo)
      this.iconFormVisible = false
    },
    // 删除
    remove(index, row) {
      this.$confirm(`确定删除${row.fullname}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
      })
    },
    // 状态切换
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      console.log('row的打印值：', row)
      row.status = status
      console.log(' status的值 ', row.status)
    }
  }
}
</script>
