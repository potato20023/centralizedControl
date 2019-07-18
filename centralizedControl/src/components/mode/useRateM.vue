<template>
  <div class="useRate">
    <div id="line"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      monthActive:true,
      weekActive:false,
      data:{
        datax:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        datay:["20","40","20","40","24","40","20","40","20","40","20","40"]
      }
    };
  },
  computed: {
    ...mapGetters(["screenWidth", "screenHeight","schoolId", "townId"])
  },
  props:['para'],
  mounted() {
    this.line();
    // this.getLsit();
    // console.log(this.para)
  },
  methods: {
    getLsit(){
      let $this = this;
      let data = {
        scope:$this.para,
        townId:$this.townId,
        schoolId:$this.schoolId
      }
      $this.$store.dispatch('getMonthUse',data).then(res=>{
        if(res.data){
          $this.data = res.data
        }
      })
    },
    line() {
      let $this = this;
      let option = {
        // 标题
        // title: {
        //   text: "周/月的使用率",
        //   left: "left",
        //   top: (10 * $this.screenHeight) / 1080,
        //   textStyle: {
        //     color: "#fff"
        //   }
        // },
        // // 直角坐标系内绘制网格
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          height: "80%",
          containLabel: true // grid区域是否包含坐标轴的刻度标签
        },
        // grid直角坐标系中的x轴 (最多可放两个,再多需要设置)
        xAxis: [
          {
            type: "category", //'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
            data: $this.data.datax,
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "#ffa800",
                fontSize: (14 * $this.screenHeight) / 1080
              }
            }
          }
        ],
        // grid直角坐标系中的y轴
        yAxis: [
          {
            type:'value',
            boundaryGap: false,
            axisLabel: {
              show:true,
              interval:'auto',
              formatter:'{value}%',
              // y轴样式
              textStyle: {
                color: "#ffa800",
                fontSize: (14 * $this.screenHeight) / 1080
              }
            },
            splitLine: {    // 分隔线样式
                show:true,   // 默认数值轴显示, 类目轴不显示
                lineStyle: {
                    type:'solid',
                    color: '#3c4a8d'
                }
            }
          }
        ],
        // 系列列表, 每个系列通过type决定自己的图表类型
        series: [
          {
            type: "line", // 折线图
            name: "月使用率",
            data: $this.data.datay,
            itemStyle: {
              normal: {
                color: "#11f1ff",  // 折点颜色 
                lineStyle: {   // 线条
                  color: "#11f1ff"
                },
                label:{    // 折点上方显示数字
                  show:true,
                  formatter:'{c}%',
                  position:'top',
                  textStyle:{
                    color:'#fff',
                    fontSize:14 * $this.screenHeight / 1080
                  }
                }
              }
            },
            
            
            areaStyle: {
              // 填充样式
              normal: {
                color: new $this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#25a8b6" },
                  { offset: 1, color: "#2b3c8d" }
                ])
              }
            }
          }
        ]
      };

      let chart = $this.$echarts.init(document.getElementById("line"));
      chart.clear();
      chart.resize(); //在容器大小发生改变时手动调整图标尺寸
      chart.setOption(option);
    }
  },
  watch: {
    screenWidth: function(res) {
      this.line();
      console.log('宽度变化')
    },
    screenHeight: function(res) {
      this.line();
    }
  }
};
</script>

<style lang="scss">
</style>
