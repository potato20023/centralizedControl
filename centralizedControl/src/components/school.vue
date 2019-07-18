<template>
    <div class="school">
        <div class="header">
            <div class="logo">
                <img src="@/assets/img/logo.png" alt="">
            </div>
            <div class="banner">
                <img src="@/assets/img/banner1.png" alt="">
            </div>
        </div>
        <div class="container">   
            <tree class="c_tree"></tree>
            <classM class="c_class"></classM>
        </div>
        
        
    </div>
</template>

<script>
import tree from '@/components/mode/tree';
import classM from '@/components/mode/classM';
export default {
    data(){
        return{

        }
    },
    methods:{

    },
    components:{
        tree,
        classM
    }
}
</script>

<style lang="scss">
    
</style>
