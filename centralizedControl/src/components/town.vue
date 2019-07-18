<template>
    <div class="town main">
        <div class="title">{{townName}}</div>
        <div class="con">
            <div class="con_top">
                <div class="i_bind">
                    <bind para="town"></bind>
                </div>
                <div class="i_timeUse">
                     <div class ="lineTitle">
                        <div class="leftTitle">周/月的使用率</div>
                        <div class="rightTitle">
                            <div :class="{month:true,active:monthActive}" @click="toMonth">月使用</div>
                            <div :class="{month:true,active:weekActive}" @click="toWeek">周使用</div>
                        </div>
                    </div>
                    <useRateM v-if="monthActive" para='town'></useRateM>
                    <useRateW v-if="weekActive" para='town'></useRateW>
                </div>
            </div>
            <div class="con_bottom">
                <dayNotuse para='town'></dayNotuse>
                <schoolUse para='town'></schoolUse>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import bind from '@/components/mode/bind'    // 设备在线率
import useRateM from '@/components/mode/useRateM'  // 月/周使用率
import useRateW from '@/components/mode/useRateW'
import dayNotuse from '@/components/mode/dayNotuse' // 3/7日未使用
import schoolUse from '@/components/mode/schoolUse'  // 学校使用率排名
export default {
    data(){
        return{
            monthActive : true,
            weekActive : false
        }
    },
    computed:{
        ...mapGetters(['townName'])
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
        useRateW,
        dayNotuse,
        schoolUse
    }
}
</script>
