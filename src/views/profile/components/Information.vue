<template>
  <div>
    <el-form :inline="true" :model="userInfo" class="demo-form-inline" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
      <!-- 添加用户名 -->
      <el-form-item label="用户名" prop="enrollType">
        <el-input v-model="userInfo.userName" placeholder="用户名" autocomplete="off" />
      </el-form-item>
      <!-- 添加性别 -->
      <el-form-item label="性别">
        <el-select v-model="userInfo.gender" placeholder="性别" prop="gender">
          <el-option v-for="item in gender" :key="item" :label="item.display_name" :value="item" />
        </el-select>
      </el-form-item>
      <!-- 出生日期 -->
      <el-form-item label="出生日期" prop="birthday">
        <!-- <el-date-picker v-model="userInfo.birthday" type="datetime" placeholder="Please pick a date" /> -->
        <el-date-picker v-model="userInfo.birthday" type="date" placeholder="选择日期" />
      </el-form-item>
      <!-- 现住地 -->
      <el-form-item label="现住地">
        <el-input v-model="userInfo.residence" placeholder="现住地" />
      </el-form-item>
      <!-- 祖籍 -->
      <el-form-item label="祖籍">
        <el-input v-model="userInfo.AncestralHome" placeholder="祖籍" />
      </el-form-item>
      <!-- 简介 -->
      <el-form-item label="简介">
        <el-input v-model="userInfo.profiles" placeholder="简介" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="float:right">
      <el-button @click="iconFormVisible = false">重 置</el-button>
      <el-button type="primary" @click="submitUser()">确 定</el-button>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      //  上传头像
      imageUrl: '',
      userInfo: {
        userName: '',
        gender: '',
        birthday: '',
        residence: '',
        AncestralHome: '',
        profiles: ''
      },
      gender: ['男', '女']
    }
  },
  methods: {
    change(index, row) {
    },
    // 弹窗确定
    submitUser() {
      if (this.dialogTitle === '修改') {
        this.InfoList.splice(this.rowIndex, 1, this.userInfo)
        this.iconFormVisible = false
        return
      }
      this.InfoList.splice(0, 0, this.userInfo)
      this.iconFormVisible = false
    }
  }
}
</script>
