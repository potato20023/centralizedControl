<template>
    <div class="schoolUse">

        <div class="schoolUseLeft">
            <div class="schoolUseTitle">学校使用率排名</div>
            <img src="@/assets/img/schoolUse.png" alt="">
        </div>
        
        <div class="list">
            <ul class="list1">
                <li>
                    <div class="schoolName">
                        <img src="@/assets/img/ranking1.png" alt="" class="nums">
                        <b>{{list1[0].className}}</b>
                    </div>
                    <div>{{list1[0].percentage}}</div>
                </li>
                <li>
                    <div class="schoolName">
                        <img src="@/assets/img/ranking2.png" alt="" class="nums">
                        <b>{{list1[1].className}}</b>
                    </div>
                    <div>{{list1[1].percentage}}</div>
                </li>
                <li>
                    <div class="schoolName">
                        <img src="@/assets/img/ranking3.png" alt=""  class="nums">
                        <b>{{list1[2].className}}</b>
                    </div>
                    <div>{{list1[2].percentage}}</div>
                </li>
            </ul>
            <ul class="list2">
                <li v-for="(item,index) in list2" :key='index'>
                    <div class="schoolName">
                        <b class="num nums">{{index + 4}}</b>
                        <b>{{item.className}}</b>
                    </div>
                    <div>{{item.percentage}}</div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data(){
        return{
            list1:[{className:'叶县昆阳镇第四小学1',percentage:'90%'},
                {className:'叶县昆阳镇第四小学2',percentage:'90%'},
                {className:'叶县昆阳镇第四小学3',percentage:'90%'},],
            list2:[{className:'叶县昆阳镇第四小学4',percentage:'90%'},
                {className:'叶县昆阳镇第四小学5',percentage:'90%'},
                {className:'叶县昆阳镇第四小学6',percentage:'90%'}]
        }
    },
    computed: {
        ...mapGetters(["schoolId", "townId"])
    },
    props:['para'],
    mounted(){
        // this.getList();
    },
    methods:{
        getList(){
            let $this = this;
            let list = []
            let data = {
                scope:$this.para,
                schoolId:$this.schoolId,
                townId:$this.townId
            }
            $this.$store.dispatch('getschoolUse',data).then(res=>{
                if(res.data){
                    $this.list1 = res.data.slice(0,3)
                    $this.list2 = res.data.slice(3,6)
                }
            })
        }
    }
}
</script>
