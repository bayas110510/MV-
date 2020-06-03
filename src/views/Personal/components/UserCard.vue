<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>个人中心</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <!-- <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div> -->
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>Education</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <div class="account-center-detail">
              <p>
                <i class="el-icon-user" /><span>巴雅斯古楞</span>
              </p>
              <p>
                <i class="el-icon-map-location" />
                <span>内蒙古</span>
                <span>呼和浩特市</span>
              </p>
              <p>
                <i class="el-icon-user" /><span><a href="#">我的作品</a></span>
              </p>
              <p>
                <i class="el-icon-user" /><span><a href="#">介绍</a></span>
              </p>
              <p>
                <i class="el-icon-setting" /><span><a href="#">设置</a></span>
              </p>
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
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
    span:hover{
      color: orange;
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
