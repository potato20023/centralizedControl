<template>
  <div class="main index">
    <div class="title">全县</div>
    <div class="con">
      <div class="con_top">
        <div class="i_bind">
          <bind para="all"></bind>
        </div>
        <div class="i_timeUse">
            <div class ="lineTitle">
                <div class="leftTitle">周/月的使用率</div>
                <div class="rightTitle">
                    <div :class="{month:true,active:monthActive}" @click="toMonth">月使用</div>
                    <div :class="{month:true,active:weekActive}" @click="toWeek">周使用</div>
                </div>
            </div>
          
          <useRateM v-if="monthActive" para='all'></useRateM>
          <useRateW v-if="weekActive" para='all'></useRateW>
        </div>
      </div>
      <div class="con_bottom">
        <townRate></townRate>
      </div>
    </div>
  </div>
</template>

<script>
import bind from '@/components/mode/bind'    // 设备在线率
import useRateM from '@/components/mode/useRateM'  // 月/周使用率
import townRate from '@/components/mode/townRate'  // 各个乡镇使用率
import useRateW from '@/components/mode/useRateW'
export default {    
    data(){
        return{
            monthActive : true,
            weekActive : false
        }
    },
    methods:{
        toMonth(){
      this.monthActive = true;
      this.weekActive = false;
      
    },
    toWeek(){
      this.monthActive = false;
      this.weekActive = true;
    },
    },
    components:{
        bind,
        useRateM,
        townRate,
        useRateW
    }
}
</script>

<style lang="">
</style>
