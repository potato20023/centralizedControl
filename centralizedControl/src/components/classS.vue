<template>
    <div class="classM main">
        <div class="title">
            昆阳镇<b>|</b>叶县昆阳第一小学
        </div>
        <div class="con">
            <div class="top">
                <div class="tab">
                    <b class="real">实时</b>
                    <b class="statis">统计</b>
                </div>
                <div class="online">
                    在线率 2/8
                </div>
            </div>
            <div class="con_top">
                <div class="i_bind">
                    <bind></bind>
                </div>
                <div class="i_timeUse">
                    <!-- <useRate></useRate> -->
                </div>
            </div>
            <div class="con_bottom">
                <!-- <townRate></townRate> -->
            </div>
        </div>
    </div>
</template>

<script>
import bind from '@/components/mode/bind'
export default {
    data(){
        return{

        }
    },
    computed(){

    },
    mounted(){

    },
    components(){
        bind
    },
    methods:{

    }
}
</script>

<style lang="scss">
    
</style>
