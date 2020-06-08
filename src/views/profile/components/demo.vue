<template>
  <div>
    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(item,index) of opusList" :key="index" :timestamp="item.createdate | parseTime('{y}-{m}-{d} {h}:{i}') " placement="top">
          <el-card>
            <h4>{{ item.opusName }}</h4>
            <p>{{ item.enrollType }}</p>
            <p>{{ item.opusType }}</p>
            <p>{{ item.Introduction }}</p>
            <div>{{ item.upload }}</div>
            <!-- <span>{{ msg }}</span> -->
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import bus from './bus'
export default {
  data() {
    return {
      msg: '默认值',
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
  mounted() {
    var self = this
    bus.$on('userDefinedEvent', function(msg) {
      self.msg = msg
      console.log('demo里收到的数据', msg)
      //   this.msg = this.opusList
      this.opusList.splice(this.rowIndex, 1, this.msg)
      //   this.msg = this.opusList
      console.log(this.opusList)
      //   this.form = {}
    })
  },
  methods: {
  }
//   methods: {
//     // 添加按钮
//     onSubmit(form) {
//       console.log('submit!')
//       // this.opusList.splice(0, 0, this.form)
//       // this.opusList = {}
//       // this.iconFormVisible = true
//       this.opusList.splice(0, 0, this.form)
//       this.form = {}
//       // this.form :''
//     }
//   }
}
</script>
