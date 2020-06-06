<template>
  <el-form ref="form" :model="form" label-width="80px" class="box">
    <!-- 报名类型 -->
    <el-form-item label="报名类型:" prop="enrollType">
      <el-select v-model="form.enrollType" class="filter-item" placeholder="请选择报名类型">
        <el-option v-for="item in enrollTypeOptions" :key="item" :label="item.display_name" :value="item" />
      </el-select>
    </el-form-item>
    <!-- 作品类型 -->
    <el-form-item label="作品类型:" prop="opusType">
      <el-select v-model="form.opusType" class="filter-item" placeholder="请选择作品类型">
        <el-option v-for="item in opusTypeOptions" :key="item" :label="item.display_name" :value="item" />
      </el-select>
    </el-form-item>
    <!-- 创建时间 -->
    <el-form-item label="创建时间" prop="createdate">
      <el-date-picker v-model="form.createdate" type="datetime" placeholder="创建时间" />
    </el-form-item>
    <!-- 作品名 -->
    <el-form-item label="作品名: " prop="opusName">
      <el-input v-model="form.opusName" type="title" placeholder="作品名" autocomplete="off" />
    </el-form-item>
    <!-- 作品介绍 -->
    <el-form-item label="作品介绍:" prop="Introduction">
      <el-input v-model="form.Introduction" type="textarea" class="textBox" placeholder="作品介绍" />
    </el-form-item>
    <!-- 上传文件 -->
    <el-form-item prop="upload">
      <el-upload ref="upload" v-model="form.upload" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
      </el-upload>
    </el-form-item>
    <!-- 提交按钮 -->
    <el-form-item style="float:right">
      <el-button @click="reset('form')">重置</el-button>
      <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// import Timeline from '/Timeline'
// import Bus from 'bus.js'
export default {
  // components: { Timeline },
  data() {
    return {
      imageUrl: '',
      form: {
        // 报名类型
        enrollType: '',
        // 作品类型
        opusType: '',
        // 创建时间
        createdate: '',
        // 作品名
        opusName: '',
        // 作品介绍
        Introduction: '',
        upload: ''
      },
      //  报名类型
      enrollTypeOptions: ['商品演出招商', '晚会招商', '广告招商', '设备租赁'],
      //  作品类型
      opusTypeOptions: ['歌曲', '乐谱', '歌词']
    }
  },
  methods: {
    // 添加按钮
    onSubmit(form) {
      console.log('submit!')
      // this.$router.push('/Timeline')
      // this.form.
      // this.$router.push({
      //   path: './Timeline',
      //   query: {
      //     id: this.form
      //   }
      // })

      console.log('提交成功')
    },
    reset(form) {
      this.$refs[form].resetFields() // 将form表单重置
    },
    // 文件上传
    submitUpload() {
      this.$refs.upload.submit()
    }
  }
}
</script>
