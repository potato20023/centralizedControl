<template>
    <div class="dayNotuseClass">
        <div class="day day3">
            <p>3日未使用</p>
            <ul v-if="list3.length > 0">
                <li v-for="(item,index) in list3" :key="index">{{item.class_name}}</li>
            </ul>
            <div v-else style="color:#fff">没有班级</div>
        </div>
        <div class="day day7">
            <p>7日未使用</p>
            <ul v-if="list7.length > 0">
                <li v-for="(item,index) in list7" :key="index">{{item.class_name}}</li>
            </ul>
            <div v-else style="color:#fff">没有班级</div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            list3:[],
            list7:[]
        }
    },
    computed:{
        ...mapGetters(['townId','schoolId'])
    },
    mounted(){
        this.getOffline();
    },
    methods:{
        getOffline(){
            let $this = this;
            let data3 = {
                scope:'school',
                days:3,
                town_id:$this.townId,
                school_id:$this.schoolId
            }
            let data7 = {
                scope:'school',
                days:7,
                town_id:$this.townId,
                school_id:$this.schoolId
            }
            $this.$store.dispatch('getOfflineList',data3).then(res=>{
                // console.log(res)
                if(res.data){
                    $this.list3 = res.data;
                }
            })
            $this.$store.dispatch('getOfflineList',data7).then(res=>{
                // console.log(res)
                if(res.data){
                    $this.list7 = res.data;
                }
            })
        }
    }
}
</script>
