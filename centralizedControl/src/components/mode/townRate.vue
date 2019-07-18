<template>
  <div class="townRate">
    <div id="bar"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      data:{
        datax:['仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇','仙台镇'],
        datay:['34','28','92','79','34','28','92','79','34','28','92','79','34','28','92','79','34','28']
      }
    };
  },
  computed: {
    ...mapGetters(["screenWidth", "screenHieght"])
  },
  mounted() {
    this.bar();
    // this.getLsit();
  },
  methods: {
    getLsit(){
      let $this = this;
      $this.$store.dispatch('getTownUse').then(res=>{
        if(res.data){
          $this.data = res.data
        }
      })
    },
    bar() {
        // console.log(11)
      let $this = this;
      let option = {
        // 标题
        title: {
          text: "全县各个乡镇的使用率",
          left: "left",
          top: (10 * $this.screenHeight) / 1080,
          textStyle: {
            color: "#fff"
          }
        },
        // 直角坐标系内绘制网格
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
            data:$this.data.datax,
            // boundaryGap: false,
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
            type: "value",
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
            splitLine: {
              // 分隔线样式
              show: true, // 默认数值轴显示, 类目轴不显示
              lineStyle: {
                type: "solid",
                color: "#3c4a8d"
              }
            }
          }
        ],
        // 系列列表, 每个系列通过type决定自己的图表类型
        series: [
          {
            name: "各个乡镇使用率",
            type: "bar", 
            barWidth: "30%",    // 圆柱宽度
            data: $this.data.datay,
            
            // data:[6388,6691,3606,29965,0,0,1],
            itemStyle: {
              normal: {  
                color: new $this.$echarts.graphic.LinearGradient(     // 圆柱颜色(渐变)
                  0,0,0,1,            // 0,0,1,0表示从左向右    0,0,0,1表示从上向下
                  [
                    { offset: 0, color: "#87f688" },// 上
                    { offset: 0.5, color: "#39ceb4" },// 上
                    { offset: 1, color: "#16bcc8" } // 下39ceb4
                  ]
                ),
                label:{    // 圆柱上方显示数字
                  show:true,
                  formatter:'{c}%',
                  position:'top',
                  textStyle:{
                    color:'#f5f5f6',
                    fontSize:18 * $this.screenHeight / 1080
                  }
                }
              }
            }
          }
        ]
      };

      let chart = $this.$echarts.init(document.getElementById("bar"));
      chart.clear();
      chart.resize(); //在容器大小发生改变时手动调整图标尺寸
      chart.setOption(option);
    }
  },
  watch: {
    screenWidth: function(res) {
      this.bar();
    },
    screenHeight: function(res) {
      this.bar();
    }
  }
};
</script>
