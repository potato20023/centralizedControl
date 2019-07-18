<template>
  <div class="class main">
    <!-- 学校 -->
    <div class="title">
      {{townName}}
      <b>|</b>{{schoolName}}
    </div>
    <!-- 班级 -->
    <div class="conClass">
      <!-- 头部 -->
      <div class="top">
        <div class="tab">
          <b class="real" :style="{color:realColor,backgroundColor:realBg}" @click="real">实时</b>
          <b class="statis" :style="{color:statisColor,backgroundColor:statisBg}" @click="statis">统计</b>
        </div>
        <div class="online">在线率 2/8</div>
      </div>
      <!-- 具体班级  实时 -->
      <div class="class_all" :style="{display:displayUl}">
        <ul v-if="deviceList1.length > 0">
          <li v-for="(item,index) in deviceList1" :key="index">
            <div class="class_head">
              <b class="name">{{item.class_name}}</b>
              <b v-if="item.status == 0" class="status0">异常</b>
              <b v-if="item.status == 1" class="status1">正常</b>
            </div>
            <div class="class_img">
              <!-- <img :src="item.url" alt=""> -->
              <img v-show="item.url != undefined" :src="item.url" alt />
              <img v-show='item.url == undefined' src="@/assets/img/class.jpg" alt />
            </div>
            <div class="class_bottom">
              <div class="time">开机时长: 150小时</div>
              <div class="detail" @click="toDetail(item.assets_id)">设备详情</div>
            </div>
          </li>
        </ul>
        <div v-else style="color:#fff;">暂时没有设备在线</div>
      </div>

      <!-- 统计 -->
      <div class="conTop" :style="{display:displayS}">
        <div class="classBind">
          <bind para='school'></bind>
        </div>
        <div class="classUse">
           <div class ="lineTitle">
                <div class="leftTitle">周/月的使用率</div>
                <div class="rightTitle">
                    <div :class="{month:true,active:monthActive}" @click="toMonth">月使用</div>
                    <div :class="{month:true,active:weekActive}" @click="toWeek">周使用</div>
                </div>
            </div>
          <useRateM v-if="monthActive" para='school'></useRateM>
          <useRateW v-if="weekActive" para='school'></useRateW>
        </div>
        <div class="classBind dayUse">
          <dayUse></dayUse>
        </div>
        <div class="classUse classRanking">
          <classRanking para='school'></classRanking>
        </div>
      </div>

      <!-- 弹框 -->
      <el-dialog
        width='40%'
        title='设备详情'
        :visible.sync="dialogVisible"
      >
        <div v-if="hasData">
          <p class="dialog_p">电脑型号 : {{detailList.ComputerName}}</p>
          <p class="dialog_p">操作系统 : {{detailList.SystemType}} </p>
          <p class="dialog_p">CPU : {{detailList.CPUName}}</p>
          <p class="dialog_p">主板 : {{detailList.BoardManufacturer}} </p>
          <p class="dialog_p">内存: {{detailList.PhysicalMemory}}</p>
          <p class="dialog_p">主硬盘: </p>
          <p class="dialog_p">显卡: </p>
          <p class="dialog_p">显示器: </p>
          <p class="dialog_p">声卡 : {{detailList.SoundPNPID}}</p>
          <p class="dialog_p">网卡 : {{detailList.VideoPNPID}}</p>
        </div>
        <div v-else>
          <p class="dialog_p">设备信息获取失败</p>
        </div>
        
      </el-dialog>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bind from "@/components/mode/bind";
import useRateM from '@/components/mode/useRateM'  // 月/周使用率
import useRateW from '@/components/mode/useRateW'
import service from "../server/service";
import dayUse from '@/components/mode/dayNotuseClass'
import classRanking from '@/components/mode/schoolUse'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      realColor: "#fff",
      realBg: "#01aae5",
      statisColor: "#01aae5",
      statisBg: "#091950",
      displayUl: "block", // 实时状态
      displayS: "none", // 统计状态
      deviceList1: [],
      dialogVisible: false, // 弹框状态
      hasData:true,
      detailList: {}, // 弹窗内容
      webs:this.web,
      monthActive : true,
      weekActive : false
    };
  },
  computed: {
    ...mapGetters(["schoolId", "web",'townName','schoolName','deviceList'])
  },
  mounted() {
    this.getList();
  },
  components: {
    bind,
    useRateM,
    useRateW,
    dayUse,
    classRanking
  },
  methods: {
    getList() {
      let $this = this;
      // console.log($this.schoolId)
      let data = { schoolId: $this.schoolId };
      $this.$store.dispatch("getDevList",data).then(res => {
        // console.log(res)
        if (res.data) {
          
          if(sessionStorage.getItem('deviceList')){
            $this.deviceList1 = JSON.parse(sessionStorage.getItem('deviceList')) 
            // console.log('刷新')
          }else{
            sessionStorage.setItem('deviceList',res.data)
            $this.$store.commit('SET_DEVICE_LIST',res.data)
            // console.log('新页面')
          }
          
        }
        // this.change()
      });
      
    },
    change(){
      let $this = this;
      console.log($this.web)
      $this.web.map(item1=>{
        $this.classList.map(item => {
          // console.log(1)
          if ((item.assets_id == item1.device_id)) {
            // console.log(2)
            if ((item1.cmd == "dev_connect")) {
              // console.log("正常");
              item.status = 1;
            } else if (item1.cmd == "dev_disconnect") {
              // console.log('异常')
              item.status = 0;
              item.url = ''
            } else if (item1.cmd == "dev_img") {
              // console.log('有图片')
              item.url = service.url + "/" + item1.data;
            }
          }
          console.log($this.web)
        });
        
      })
      
    },
    toDetail(e) {
      let $this= this;
      // console.log(e); // diviceId
      let data = { deviceId: e };
      let $$ = this;
      $this.$store.dispatch("getDevConfigList", data).then(res => {
        // console.log(res);
        if(res.data){
          $this.detailList = res.data
          $this.hasData = true
        }else{
          $this.hasData = false
        }
      }).catch(err=>{
        $this.hasData = false
      });
      $this.dialogVisible = true;
    },
    // 切换实时
    real() {
      this.realColor = "#fff";
      this.realBg = "#01aae5";
      this.statisColor = "#01aae5";
      this.statisBg = "#091950";
      this.displayUl = "block";
      this.displayS = "none";
    },
    // 切换统计
    statis() {
      this.realColor = "#01aae5";
      this.realBg = "#091950";
      this.statisColor = "#fff";
      this.statisBg = "#01aae5";
      this.displayUl = "none";
      this.displayS = "block";
    },
    toMonth(){
      this.monthActive = true;
      this.weekActive = false;
      
    },
    toWeek(){
      this.monthActive = false;
      this.weekActive = true;
    },
  },
  watch: {
    schoolId:function(res){
      this.getList()
    },
    // webs: function(res) {
    //   this.change()
    // },
    deviceList:function(res){
      this.deviceList1 = []
      setTimeout(()=>{
        console.log(res)
        this.deviceList1 = res
      },1000)
    }
  }
};
</script>

<style lang="scss">
</style>
