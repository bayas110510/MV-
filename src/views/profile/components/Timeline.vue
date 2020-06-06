<template>
  <div>
    <div class="uploadData" style="margin-bottom:20px;">
      <el-form ref="form" :model="form" label-width="80px" :visible.sync="iconFormVisible">
        <!-- 作品名 -->
        <el-form-item label="作品名: " prop="opusName">
          <el-input v-model="form.opusName" type="title" placeholder="作品名" autocomplete="off" />
        </el-form-item>
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
        <!-- 作品介绍 -->
        <el-form-item label="作品介绍:" prop="Introduction">
          <el-input v-model="form.Introduction" type="textarea" class="textBox" placeholder="作品介绍" />
        </el-form-item>
        <!-- 上传文件 -->
        <el-form-item prop="upload">
          <!-- https://jsonplaceholder.typicode.com/posts/ -->
          <el-upload ref="upload" v-model="form.upload" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
          </el-upload>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" style="float:right" @click="onSubmit('form')">立即创建</el-button>
          <el-button style="float:right; margin-right:10px;" @click="reset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(item,index) of opusList" :key="index" :timestamp="item.createdate | parseTime('{y}-{m}-{d} {h}:{i}') " placement="top">
          <el-card>
            <h4>{{ item.opusName }}</h4>
            <p>{{ item.enrollType }}</p>
            <p>{{ item.opusType }}</p>
            <p>{{ item.Introduction }}</p>
            <div>{{ item.upload }}</div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
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
        // 上传图片
        upload: ''
      },
      iconFormVisible: false,
      rowIndex: null,
      //  报名类型
      enrollTypeOptions: ['商品演出招商', '晚会招商', '广告招商', '设备租赁'],
      //  作品类型
      opusTypeOptions: ['歌曲', '乐谱', '歌词'],
      opusList: [
        {
          createdate: '2019/4/20',
          opusName: '父亲的草原母亲的河',
          enrollType: '晚会招商',
          opusType: '歌曲',
          Introduction: 'Lorem ipsum represents a long-held tradition for designers,typographers and the like. Some people hate it and argue forits demise, but others ignore the hate as they create awesometools to help create filler text for everyone from bacon loversto Charlie Sheen fans.'
        },
        {
          createdate: '2019/5/10',
          opusName: '父亲的草原母亲的河',
          enrollType: '晚会招商',
          opusType: '歌曲',
          Introduction: 'Lorem ipsum represents a long-held tradition for designers,typographers and the like. Some people hate it and argue forits demise, but others ignore the hate as they create awesometools to help create filler text for everyone from bacon loversto Charlie Sheen fans.'
        },
        {
          createdate: '2019/5/15',
          opusName: '父亲的草原母亲的河',
          enrollType: '晚会招商',
          opusType: '歌曲',
          Introduction: 'Lorem ipsum represents a long-held tradition for designers,typographers and the like. Some people hate it and argue forits demise, but others ignore the hate as they create awesometools to help create filler text for everyone from bacon loversto Charlie Sheen fans.'
        },
        {
          createdate: '2019/6/2',
          opusName: '父亲的草原母亲的河',
          enrollType: '晚会招商',
          opusType: '歌曲',
          Introduction: 'Lorem ipsum represents a long-held tradition for designers,typographers and the like. Some people hate it and argue forits demise, but others ignore the hate as they create awesometools to help create filler text for everyone from bacon loversto Charlie Sheen fans.'
        }
      ]
    }
  },
  methods: {
    // 添加按钮
    onSubmit(form) {
      console.log('submit!')
      // this.opusList.splice(0, 0, this.form)
      // this.opusList = {}
      // this.iconFormVisible = true
      this.opusList.splice(0, 0, this.form)
      this.form = {}
      // this.form :''
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

