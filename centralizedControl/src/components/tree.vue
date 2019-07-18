<template>
  <div class="tree">
    <!-- 搜索 -->
    <div class="search">
      <input type="text" v-model="search" placeholder="请输入乡镇或学校" @keyup.enter="toSearch"/>
      <div class="img" @click="toSearch">
        <img src="@/assets/img/search.png" alt />
      </div>
    </div>
    <!-- 提示乡镇 -->
    <div class="choose">
      <div class="choose_all" :class="{activeColor:town == ''?false:true}" @click="allTown">全县</div>
      <div class="choose_item" v-if="showTree1 == 2 ||town">{{town}}</div>
      <!-- <div class="choose_item" v-else>{{townName}}</div> -->
    </div>
    <!-- 乡镇列表 -->
    <div class="autoList" :style="{display:showTree1 == 1?'block':'none'}">
      <ul class="list">
        <li
          class="item"
          v-for="(item,index) in dataTown"
          :key="index"
          @click="townClick(item)"
          @dblclick="townDblclick(index)"
        >
          <div>{{item.areaName}}</div>
          <div class="more"></div>
        </li>
      </ul>
    </div>
    <!-- 学校列表 -->
    <div class="autoList" :style="{display:showTree1 == 2?'block':'none'}">
      <ul class="list">
        <li
          class="item"
          v-for="(item,index) in dataSchool"
          :key="index"
          @click="onClick(item)"
        >
          <div>{{item.xxmc}}</div>
          <div class="moreText">详情</div>
        </li>
      </ul>
    </div>
    <!-- 搜索列表 -->
    <div class="autoList" :style="{display:showTree1 == 3?'block':'none'}">
      <ul class="list">
        <li
          class="item"
          v-for="(item,index) in searchList"
          :key="index"
          @click="onClick(item)"
        >
          <div>{{item.xxmc}}</div>
          <div class="moreText">详情</div>
        </li>
      </ul>
    </div>
    <!-- <el-tree 
            :data='data'
            :props = 'defaultProps'
            accordion
            @node-click = 'handleNodeClick'
    ></el-tree>-->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      search: "",
      town: "",
      showTree1: 1, // 1显示乡镇  2显示学校
      dataTown:[],
      dataSchool: [],
      searchList:[]

    };
  },
  computed:{
    ...mapGetters(['townName','showTree','townId'])
  },
  created() {
  },
  mounted() {
    this.getList();
    this.town = this.townName
    this.showTree1 = this.showTree
    // this.show();
  },
  methods: {
    // 获取列表
    getList(){
      let $this = this
      $this.$store.dispatch('getData').then(res=>{
        // console.log(res)
        if(res.data){
          $this.dataTown = res.data
        }
        $this.show();
      })
    },
    // 搜索
    toSearch() {
      console.log(this.search)
      let $this = this;
      
      let data = {search:$this.search}
      if($this.search != ''){
        $this.showTree1 = 3
        $this.$store.commit('SET_SHOWTREE',3)
        sessionStorage.setItem('showTree',3)
        $this.$store.dispatch('getSearch',data).then(res=>{
          if(res.data){
            $this.searchList = res.data
          }
        })
      }
      
    },
    // 点击叶县
    allTown() {
      this.showTree1 = 1
      this.$store.commit('SET_SHOWTREE',1)
      sessionStorage.setItem('showTree',1)
      this.town = "";
      this.$store.commit('SET_TOWN_ID','')
      this.$store.commit('SET_TOWN_NAME','')
      this.$router.push('/')
      sessionStorage.setItem('townId','')
      sessionStorage.setItem('townName','')
      this.$store.commit('SET_SCHOOL_ID','')
      this.$store.commit('SET_SCHOOL_NAME','')
      sessionStorage.setItem('schoolId','')
      sessionStorage.setItem('schoolName','')
      sessionStorage.setItem('web','')
      this.$store.commit('SET_WEB','')
      sessionStorage.setItem('web','')
      this.$store.commit('SET_DEVICE_LIST','')
      sessionStorage.setItem('deviceList','')
    },
    // 单击乡镇
    townClick(e) {
      let areaCode = e.areaCode  // 乡镇编号
      let areaName = e.areaName  // 乡镇名字
      this.town = areaName
      this.$store.commit('SET_TOWN_ID',areaCode)
      this.$store.commit('SET_TOWN_NAME',areaName)
      this.$router.push('/town/' + areaCode)
      sessionStorage.setItem('townId',areaCode)
      sessionStorage.setItem('townName',areaName)
    },
    // 双击乡镇
    townDblclick(e) {
      this.dataSchool = this.dataTown[e].schoolList;
      this.showTree1 = 2
      this.$store.commit('SET_SHOWTREE',2)
      sessionStorage.setItem('showTree',2)
    },
    // 点击学校
    onClick(e){
      console.log(e) // 学校id
      let schoolId = e.xxJbxxId
      let schoolName = e.xxmc
      this.$store.commit('SET_SCHOOL_ID',schoolId)
      this.$store.commit('SET_SCHOOL_NAME',schoolName)
      this.$router.push('/classM/' + schoolId)
      sessionStorage.setItem('schoolId',schoolId)
      sessionStorage.setItem('schoolName',schoolName)
      this.$store.commit('SET_DEVICE_LIST','')
      sessionStorage.setItem('deviceList','')
    },
    // 刷新显示学校列表
    show(){
      let $this = this;
      if($this.townId){
        // console.log('显示学校列表')
        // console.log($this.dataTown)
        $this.dataTown.map(item=>{
          if(item.areaCode == $this.townId){
            $this.dataSchool = item.schoolList
          }
        })
        // console.log($this.dataSchool)
      }
    }

    // handleNodeClick(e) {
    //   console.log(e);
    // }
  },
  beforeDestroy(){
    
  },
  watch:{
  }
  
};
</script>

<style lang="scss">
</style>