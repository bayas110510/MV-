<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="作品上传" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="我的作品" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="基本资料" name="Information">
                <Information />
              </el-tab-pane>
              <el-tab-pane label="重置密码" name="account">
                <account :user="user" />
              </el-tab-pane>
              <!-- demo -->
              <el-tab-pane label="demo" name="demo">
                <demo />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import Information from './components/Information'
import demo from './components/demo'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account, Information, demo },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        // role: this.roles.join(' | '),
        role: this.roles,
        email: 'admin@test.com',
        avatar: this.avatar
      }
    }
  }
}
</script>
