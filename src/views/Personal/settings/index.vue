<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="10">
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="作品上传" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="我的作品" name="timeline">
                <timeline />
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
// import UserCard from '../components/UserCard'
import Activity from '../components/Activity'
import Timeline from '../components/Timeline'
// import Account from '../components/Account'

export default {
  name: 'Personal',
  components: { Activity, Timeline },
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
