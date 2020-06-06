<template>
  <div>
    <el-card style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <!-- 添加头像 -->
      <div class="head-box">
        <div :span="100">
          <div class="block">
            <el-avatar :size="100" :src="circleUrl" />
            <el-upload class="avatar-upload" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-upload-icon" />
            </el-upload>
          </div>
        </div>
      </div>
      <div class="user-bio">
        <div class="user-info">
          <div v-for="item in InfoList" :key="item" class="text item" highlight-current-row>
            <p prop="userName">
              <i class="el-icon-user" /><span>姓名：</span>{{ item.userName }}
            </p>
            <p>
              <i class="el-icon-user" /><span>性别：</span>{{ item.gender }}
            </p>
            <p>
              <i class="el-icon-user" /><span>出生日期：</span>{{ item.birthday | parseTime('{y}-{m}-{d}') }}
            </p>
            <p>
              <i class="el-icon-map-location" />
              <span>现住地：</span>{{ item.residence }}
            </p>
            <p>
              <i class="el-icon-map-location" />
              <span>祖籍：</span>{{ item.AncestralHome }}
            </p>
            <p>
              <i class="el-icon-chat-dot-square" />
              <span>介绍: </span>{{ item.profiles }}
            </p>
            <el-button style="float: right; padding: 3px 0" type="text" @click="change()">修改按钮</el-button>
          </div>
        </div>
        <el-divider />
        <div class="user-skills user-bio-section">
          <div class="user-bio-secotion-header"><i class="el-icon-upload" /><span>我的上传</span></div>
          <div class="user-bio-section-body">
            <div class="progress-item">
              <i class="el-icon-mic" />
              <span>歌曲</span>
              <el-progress :percentage="70" />
            </div>
            <div class="progress-item">
              <i class="el-icon-video-camera" />
              <span>MV</span>
              <el-progress :percentage="18" />
            </div>
            <div class="progress-item">
              <i class="el-icon-tickets" />
              <span>歌词</span>
              <el-progress :percentage="12" show-text="bayas" />
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <!--弹窗-->
    <el-dialog :title="dialogTitle" width="50%" :visible.sync="iconFormVisible">
      <el-form :inline="true" :model="userInfo" class="demo-form-inline" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <!-- 添加用户名 -->
        <el-form-item label="用户名" prop="enrollType">
          <el-input v-model="userInfo.userName" placeholder="用户名" />
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="iconFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUser()">确 定</el-button>
      </div>
    </el-dialog>
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
      //  头像的icon
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      dialogTitle: '修改',
      iconFormVisible: false,
      gender: ['男', '女'],
      InfoList: [
        {
          userName: 'bayas',
          gender: '男',
          birthday: '2020-05-01',
          residence: '内蒙古呼和浩特市',
          AncestralHome: '内蒙古锡林郭勒盟',
          profiles: '现在就读于内蒙古师范大学'
        }
      ]
    }
  },
  methods: {
    change(index, row) {
      this.dialogTitle = '修改'
      this.iconFormVisible = true
      this.rowIndex = index
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
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.block{
  display: inline-block;
  margin-left: 110px;
}
.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
      .user-bio-section-body {
        margin-top: 15px;
      }
  }
    .user-info{
      margin-bottom: 40px;
      span{
        font-weight: 700;
      }
    }
}

// 卡片
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  //  上传头像
.avatar-upload {
  width: 100px;
  height: 100px;
  // border: 1px dashed #d9d9d9;
  border-radius: 50px;
  cursor: pointer;
  position: absolute;
  top: 75px;
  left: 142px;
  overflow: hidden;
}
// .avatar-upload .el-upload {
//     border: 1px dashed #d9d9d9;
//     border-radius: 50px;
//     cursor: pointer;
//     position: relative;
//     top: 75px;
//     left: 140px;
//     overflow: hidden;
// }
  .avatar-upload .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-upload-icon {
    font-size: 16px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

</style>
