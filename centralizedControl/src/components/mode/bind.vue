<template>
  <div class="bind">
    <div class="bind_top">
      <div class="box">
        <div :class="{auto:auto,clip:true}">
          <div class="left" :style="{transform:transform}"></div>
          <div :class="{widthNone:widthNone,right:true}"></div>
        </div>
        <div class="num">{{rotate}}<b>%</b></div>
        <div class="online">{{onlines}}/{{count}}</div>
        <div class="name">设备在线率</div>
        <div class="border1"></div>
        <div class="border2"></div>
      </div>
    </div>
    <div v-if="para == 'all'" class="bind_bottom">
      <b @click="day3">3日未使用</b>
      <b>|</b>
      <b @click="day7">7日未使用</b>
    </div>

    <el-dialog
      width='40%'
      :title="title"
      :visible.sync="dialogVisible"
    >
      <div class='dialog_ul'>
        <ul v-if="classList.length > 0">
          <li v-for="(item,index) in classList" :key="index">
            <b>{{item.school_name}}</b>
            <b>{{item.class_name}}</b>
          </li>
        </ul>
        <div v-else>没有班级多天未在线</div>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      onlines:0,
      count:0,
      rotate:0,
      auto:false,
      widthNone:true,
      transform:'',
      title:'3天未使用',
      dialogVisible:false,
      classList:[
        {name:'叶县昆阳镇小学',class:'三年级一班'},
        {name:'叶县昆阳镇小学',class:'三年级er班'},
        {name:'叶县昆阳镇小学',class:'三年级三班'},
      ],
    };
  },
  props:['para'],
  computed:{
    ...mapGetters(['townId','schoolId'])
  },
  created(){
    this.getOnline();
    setTimeout(()=>{
      this.transform = 'rotate('+ 3.6 * this.rotate + 'deg)'
      this.ring();
    },1000)
  },
  mounted(){
    
  },
  methods: {
    day3(){
      this.dialogVisible = true;
      this.title = '3天未使用'
      this.getOffline(3)
    },
    day7(){
      this.dialogVisible = true;
      this.title = '7天未使用'
      this.getOffline(7)
    },
    ring(){
      let $this = this;
      // console.log($this.rotate)
      if($this.rotate >= 100){
          // $this.rotate = 0;
          $this.widthNone = true
          $this.auto = false
      } else if($this.rotate > 50){
          $this.widthNone = false
          $this.auto = true
      }
    },
    // 获取设备在线率
    getOnline(){
      let $this = this
      let data = {
        scope:$this.para,
        town_id:$this.townId,
        school_id:$this.schoolId
      }
      $this.$store.dispatch('getOnlineInfo',data).then(res=>{
        // console.log(res)
        if(res.data){
          $this.onlines = res.data.onlines;
          $this.count = res.data.count;
          if(res.data.count > 0){
            $this.rotate = Math.round(res.data.onlines/res.data.count*100);
          }else{
            $this.rotate = 0
          }
          // console.log('拿到百分比')
        }
      })
    },
    // 获取指定范围内的离线设备列表 
    getOffline(days){
      let $this = this;
      let data = {
        scope:$this.para,
        days:days,
        town_id:$this.townId,
        school_id:$this.schoolId
      }
      $this.$store.dispatch('getOfflineList',data).then(res=>{
        // console.log(res)
        if(res.data){
          $this.classList = res.data
        }
      })
    }
  },
  watch:{
    schoolId:function(res){
      this.getOnline();
      setTimeout(()=>{
        this.transform = 'rotate('+ 3.6 * this.rotate + 'deg)'
        this.ring();
      },500)
      
    },
    townId:function(res){
      this.getOnline();
      setTimeout(()=>{
        this.transform = 'rotate('+ 3.6 * this.rotate + 'deg)'
        this.ring();
      },500)
    },
    watch:{
      rotate:function(res){
        this.ring();
      }
    }
  }
};
</script>

<style lang="scss">
</style>