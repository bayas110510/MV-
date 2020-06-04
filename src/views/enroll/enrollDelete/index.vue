<template>
  <div>
    <el-card shadow="always" class="box-card" body-style="width: 600px;">
      <el-form ref="pwdForm" :model="resetPwdForm" status-icon :rules="resetPwdRules" label-width="100px">
        <el-form-item label="密码" prop="password">
          <el-input v-model="resetPwdForm.password" prefix-icon="iconfont icon-showpassword" placeholder="请输入密码" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="resetPwdForm.newPassword" prefix-icon="iconfont icon-showpassword" placeholder="请输入新密码" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="resetPwdForm.checkPassword" prefix-icon="iconfont icon-showpassword" placeholder="请再次输入新密码" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="">
          <el-button type="primary" @click="submitForm('pwdForm')">提交</el-button>
          <el-button @click="resetForm('pwdForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.resetPwdForm.checkPassword !== '') {
          this.$refs.pwdForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetPwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      resetPwdForm: {
        username: '',
        password: '',
        newPassword: '',
        checkPassword: ''
      },
      resetPwdRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '用户密码的长度在6～18个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 6, max: 18, message: '用户密码的长度在6～18个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 6, max: 18, message: '用户密码的长度在6～18个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.resetPwdForm.username = this.$store.getters.username
  },
  methods: {
    // 提交
    // submitForm() {

    // },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

