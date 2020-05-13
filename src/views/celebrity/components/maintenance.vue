
<template>
  <div class="app-container">
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading..."
        stripe
        style="width: 100%"
      >
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="date" label="身份类型" width="140" />
        <el-table-column prop="date" label="祖籍" width="140" />
        <el-table-column prop="date" label="居住地" width="100" />
        <el-table-column prop="date" label="性别" width="100" />
        <el-table-column prop="date" label="民族" width="100" />
        <el-table-column prop="date" label="手机" width="140" />
        <el-table-column prop="date" label="有效" width="140" />
        <el-table-column prop="date" label="推荐" width="100" />
        <el-table-column prop="date" label="免费" width="100" />
        <el-table-column prop="date" label="状态 " width="140" />
        <el-table-column prop="date" label="创建时间" width="100" />
        <el-table-column prop="date" label="创建用户" width="100" />
        <el-table-column prop="date" label="修改时间" width="140" />
        <el-table-column prop="name" label="修改用户" width="140" />
      </el-table>
    </el-card>
  </div>
</template>

