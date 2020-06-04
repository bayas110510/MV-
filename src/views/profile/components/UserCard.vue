<template>
  <div>
    <el-card style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <div class="head-box">
        <div :span="100">
          <div class="block">
            <el-avatar :size="100" :src="circleUrl" />
          </div>
        </div>
      </div>
      <div class="user-bio">
        <div class="user-education user-bio-section">
          <!-- <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>Education</span></div> -->
          <div class="user-bio-section-body">
            <div class="text-muted">
              <div class="account-center-detail">
                <p>
                  <i class="el-icon-user" /><span>姓名：</span>巴雅斯古楞
                </p>
                <p>
                  <i class="el-icon-user" /><span>性别：</span>男
                </p>
                <p>
                  <i class="el-icon-user" /><span>出生日期：</span>19970810
                </p>
                <p>
                  <i class="el-icon-map-location" />
                  <span>现住地：</span>内蒙古呼和浩特市
                </p>
                <p>
                  <i class="el-icon-map-location" />
                  <span>祖籍：</span>内蒙古锡林郭勒盟
                </p>
                <p>
                  <i class="el-icon-chat-dot-square" /><span>介绍</span>
                </p>
                <el-button style="float:right;" type="mini" @click="add">修改</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="user-skills user-bio-section">
          <div class="user-bio-section-header"><i class="el-icon-upload" /><span>我的上传</span></div>
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
        <el-form-item label="用户名">
          <el-input placeholder="用户名" />
        </el-form-item>
        <!-- 添加性别 -->
        <el-form-item label="性别">
          <el-input placeholder="性别" />
        </el-form-item>
        <!-- 出生日期 -->
        <el-form-item label="出生日期" prop="createdate">
          <el-date-picker type="datetime" placeholder="Please pick a date" />
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
      //  头像的icon
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      dialogTitle: '修改',
      iconFormVisible: false
    }
  },
  methods: {
    add() {
      this.dialogTitle = '修改'
      this.iconFormVisible = true
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
    }
  }
}
</script>

<style lang="scss" scoped>
.block{
  display: inline-block;
  margin-left: 110px;
}
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
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
  }
  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 0;
    }

  }
}
</style>
