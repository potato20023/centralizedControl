<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <img src="@/assets/img/logo.png" alt />
      </div>
      <div class="banner">
        <img src="@/assets/img/banner1.png" alt />
      </div>
    </div>
    <div class="container">
      <tree class="c_tree"></tree>
      <router-view />
    </div>
  </div>
</template>

<script>
import tree from "@/components/tree";
import { mapGetters } from "vuex";
import { setTimeout } from "timers";
import service from "./server/service";
export default {
  name: "App",
  data() {
    return {
      screenWidth: document.documentElement.clientWidth, // 屏幕宽度
      screenHeight: document.documentElement.clientHeight // 屏幕高度
    };
  },
  computed: {
    ...mapGetters(["schoolId", "deviceList"])
  },
  mounted() {
    let $this = this;
    window.onresize = function() {
      $this.screenWidth = document.documentElement.clientWidth;
      $this.screenHeight = document.documentElement.clientHeight;
    };
    $this.initWebSocket();
    // if($this.schoolId){
    //   $this.send({
    //     'cmd':'subscribe_school',
    //     'school_id':$this.schoolId
    //   })
    // }

    window.onbeforeunload = function() {
      // $this.send("closesocket:");
      $this.closeWebSocket();
    };
  },
  components: {
    tree
  },
  methods: {
    initWebSocket() {
      let $this = this;
      // var WebSocket = require('ws')
      // var websocket = null;
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        var serviceIp = "192.168.17.215:4000";
        this.websocket = new WebSocket("ws://" + serviceIp + "/web");
      } else if ("MozWebSocket" in window) {
        var serviceIp = "192.168.17.215:4000";
        this.websocket = new WebSocket("ws://" + serviceIp + "/web");
      } else {
        console.log("当前浏览器 Not support websocket");
        // let that = this;
        // this.interval = window.setInterval(function() {
        //   //每隔30秒钟发送一次心跳，避免websocket连接因超时而自动断开
        //   that.forgeWebSocket();
        // }, 30000);
      }
      // let that = this;
      let arr = [];
      // this.interval = window.setInterval(function() {
      //   //每隔30秒钟发送一次心跳，避免websocket连接因超时而自动断开
      //   if (that.websocket != null) {
      //     that.websocket.send("HeartBeat");
      //     console.log("发送心跳包：HeartBeat");
      //   }
      // }, 30000);

      //连接发生错误的回调方法
      this.websocket.onerror = function(ev) {
        console.log("WebSocket连接发生错误");
      };

      //连接成功建立的回调方法
      this.websocket.onopen = function(ev) {
        console.log("WebSocket连接成功");
        // this.send({
        //   'cmd':'subscribe_school',
        //   'school_id': 'dc73747fe41a4af6a7967a25dd4c7b5f'
        // });
      };

      //接收到消息的回调方法
      this.websocket.onmessage = function(event) {
        
        let data;
        if (typeof event.data !="object") {
          data = JSON.parse(event.data);
       
          // console.log(JSON.parse(event.data))
          // console.log(Boolean(typeof event.data == String))

          setTimeout(() => {
            let deviceList = $this.deviceList;
            deviceList.map(item => {
              if (item.assets_id == data.device_id) {
                // console.log(2)
                if (data.cmd == "dev_connect") {
                  // console.log("正常");
                  item.status = 1;
                } else if (data.cmd == "dev_disconnect") {
                  // console.log("异常");
                  item.status = 0;
                  item.url = "";
                } else if (data.cmd == "dev_img") {
                  item.url = service.url + "/" + data.data;
                  // console.log("有图片");
                }
              }
            });
            $this.$store.commit("SET_DEVICE_LIST", deviceList);
            // console.log("保存了");

            // setTimeout(()=>{
            // let deviceList1 = JSON.parse(deviceList)

            sessionStorage.setItem(
              "deviceList",
              JSON.stringify(deviceList)
            );
            // console.log("session保存了");
            // },1000)
          }, 500);
        }
        // arr.push(data)
        // that.$store.commit('SET_WEB',arr)
        // sessionStorage.setItem('web',JSON.stringify(arr))
      };

      //连接关闭的回调方法
      this.websocket.onclose = function(ev) {
        console.log("WebSocket连接关闭");
        this.websocket = null;
      };
    },

    send(message) {
      if (this.websocket && this.websocket != null) {
        this.websocket.send(JSON.stringify(message));
        // console.log("发送的消息：" + message);
      }
    },
    //关闭WebSocket连接
    closeWebSocket() {
      if (this.websocket != null) {
        this.websocket.close();
        console.log("已执行closeWebSocket中关闭websocket操作");
      }
      if (this.interval) {
        // window.clearInterval(this.interval);
        // console.log("清除定时器");
      }
    }
  },
  watch: {
    screenWidth: function(res) {
      this.$store.commit("SET_SCREEN_WIDTH", res);
    },
    screenHeight: function(res) {
      this.$store.commit("SET_SCREEN_HEIGHT", res);
    },
    schoolId: function(res) {
      // console.log(res)
      this.send({
        cmd: "subscribe_school",
        school_id: res
      });
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/style/style.scss";
</style>
