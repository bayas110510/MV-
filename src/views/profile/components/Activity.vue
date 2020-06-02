<template>
  <el-form ref="form" :model="form" label-width="80px" class="box">
    <!-- 用户名  -->
    <el-form-item label="用户名">
      <el-input v-model="form.name" />
    </el-form-item>
    <!-- 上传图片 -->
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <!-- 报名类型 -->
    <el-form-item label="报名类型">
      <el-select v-model="form.enrollType" class="filter-item" placeholder="请选择报名类型">
        <el-option v-for="item in enrollTypeOptions" :key="item" :label="item.display_name" :value="item" />
      </el-select>
    </el-form-item>
    <!-- 用户介绍 -->
    <el-form-item label="用户介绍">
      <el-input type="textarea" v-model="form.desc" />
    </el-form-item>
    <!-- 作品介绍 -->
    <el-form-item label="作品介绍">
      <el-input v-model="form.enrollType" :disabled="true" />
      <el-input type="textarea" v-model="form.Introduction" class="textBox" />
    </el-form-item>
    <!-- 作品类型 -->
    <el-form-item label="作品类型">
      <el-select v-model="form.opusType" class="filter-item" placeholder="请选择作品类型">
        <el-option v-for="item in opusTypeOptions" :key="item" :label="item.display_name" :value="item" />
      </el-select>
      <el-input type="textarea" v-model="form.opusTypeCont" class="textBox" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: '',
      form: {
        name: '',
        enrollType: '',
        opusType: '',
        resource: '',
        desc: '',
        Introduction: '',
        opusTypeCont: ''
      },
      //  报名类型
      enrollTypeOptions: ['商品演出招商', '晚会招商', '广告招商', '设备租赁'],
      //  作品类型
      opusTypeOptions: ['歌曲', '乐谱', '歌词']
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    // 图片上传
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
<style>
.box{
  position: relative;
}
/* 输入框宽度 */
.el-input {
    width: 230px;
}
/* 上传图片样式 */
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: absolute;
    top: 30px;
    right: 50px;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /* 用户介绍 */
  .el-textarea__inner {
    width: 50%;
  }
  /* 作品介绍 */
  .textBox{
    margin-top: 10px;
  }

</style>
