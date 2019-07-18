<template>
    <div class="dayNotUse">
        <div class="tab">
            <div class="day" :class="{activeDay:day3ac,noactiveDay:day3no}" @click="day3">3日未使用</div>
            <div class="day" :class="{activeDay:day7ac,noactiveDay:day7no}" @click="day7">7日未使用</div>
        </div>
        <div class="list">
            <ul v-if="list.length > 0">
                <li v-for="(item,index) in list" :key="index">
                    <b>{{item.school_name}}</b>
                    <b>{{item.class_name}}</b>
                </li>
            </ul>
            <div v-else style="color:#fff;">暂时没有班级多天未登陆</div>
        </div>
        
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            day3ac:true,
            day3no:false,
            day7ac:false,
            day7no:true,
            list:[
                {
                    school:'叶县昆阳镇第四小学',
                    class:'五年级一班'
                },
                {
                    school:'叶县昆阳镇第四小学',
                    class:'五年级一班'
                },
                {
                    school:'叶县昆阳镇第四小学',
                    class:'五年级一班'
                },
                {
                    school:'叶县昆阳镇第四小学',
                    class:'五年级一班'
                },
                {
                    school:'叶县昆阳镇第四小学',
                    class:'五年级一班'
                },
                {
                    school:'叶县昆阳镇第四小学',
                    class:'五年级一班'
                }
            ]
        }
    },
    computed:{
        ...mapGetters(['townId','schoolId'])
    },
    props:['para'],
    mounted(){
        this.getOffline(3);
    },
    methods:{
        day3(){
            this.day3ac = true
            this.day3no = false
            this.day7ac = false
            this.day7no = true
            this.getOffline(3)
        },
        day7(){
            this.day3ac = false
            this.day3no = true
            this.day7ac = true
            this.day7no = false
            this.getOffline(7)
        },
        // 获取3,7日未使用列表
        getOffline(days){
            let $this = this
            let data = {
                scope:$this.para,
                days:days,
                town_id:$this.townId,
                school_id:$this.schoolId
            }
            this.$store.dispatch('getOfflineList',data).then(res=>{
                // console.log(res)
                if(res.data){
                    $this.list = res.data
                }
            })
        }
    }
}
</script>

<style lang="scss">
    
</style>
