<style scoped>
.mychart-arcgis {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
}
.bmview {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
}
</style>
<template>
  <div style="widht:100%;height:100%">
    <!-- 右侧的工具条 -->
    <transition name="fade">
      <router-view @excuteChartMethods="excuteChangeChartMethods" ></router-view>
    </transition>
    <baidu-map center="保定" :dragging="true" :scroll-wheel-zoom="true" class="bmview" >
    </baidu-map>
    <div v-for="(item,index) in chartsDiv" :key="index" :id="item.id" :style="item.style"></div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import '../../../static/bmap.js'
import '../../../static/china.js'
export default {
  data () {
    return {
      center: {lng: 115.459812, lat: 38.873716},
      zoom:15,
      Cheight:'',
      chartsDiv: []
    }
  },
  mounted () {
    this.lng = 115.459812
    this.lat = 38.873716
    this.zoom = 18
  },
  methods:{
    excuteChangeChartMethods(methods,params){
      switch (methods) {
        case "PollutionSourcesAnalysis":
          this.drawPieSourcesChart(params);
          break;

        default:
          break;
      }
    },
    initChartDiv(data,mapView){
      var chart = [];
      var i = 0;
      let datas = data.data;
      datas.forEach(e => {
        chart.push({
          id: "chart-" + i,
          data: e,
          style:{},
        });
        i++;
      });
      this.chartsDiv = chart;
      // this.refreshChart(mapView);

    },
    clearChartDiv(){
      this.chartsDiv = [];
    },
    //来源解析坐标
    convertData(data){
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = [dataItem.from.lon,dataItem.from.lat];
        var toCoord = [dataItem.to.lon,dataItem.to.lat];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem.from.name,
            toName: dataItem.to.name,
            coords: [fromCoord, toCoord]  //坐标
          });
        }
      }
      return res;
    },
    //污染物来源解析饼图
    drawPieSourcesChart(data,mapView){
      this.initChartDiv(data,mapView);
      let datas = data.data;
      var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
      // var color = ['#a6c84c', '#ffa022', '#46bee9','#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB'];
      var color = ['#a6c84c', '#ffa022', '#46bee9'];
      setTimeout(() => {
        var i=0;
         datas.forEach(e=>{
          var seriesData=[],legendObj = {}, legend = [];
          for (var key in e) {
            legendObj[key] = 0;
            var converData=this.convertData(e[key]);
            seriesData.push({
              name: key,
              type: 'lines',
              zlevel: 1,
              effect: {
                show: true,
                period: 6,
                trailLength: 2,
                color: '#FFFF00',
                symbolSize: 5
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 2,
                    curveness: 0.2
                }
            },
              // effect: {
              //     show: true,
              //     period: 6,
              //     trailLength: 0.7,
              //     color: '#fff',
              //     symbolSize: 3
              // },
              // lineStyle: {
              //     normal: {
              //         color: color[i],
              //         width: 0,
              //         curveness: 0.2
              //     }
              // },
              data: converData
            },
            {
              name: key,
              type: 'lines',
              zlevel: 2,
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.4,
                    curveness: 0.2
                }
            },
              // effect: {
              //     show: true,
              //     period: 6,
              //     trailLength: 0,
              //     symbol: planePath,
              //     symbolSize: 15
              // },
              // lineStyle: {
              //     normal: {
              //         color: color[i],
              //         width: 1,
              //         opacity: 0.4,
              //         curveness: 0.2
              //     }
              // },
              data:converData
            },
            {
              name: key,
              type: 'effectScatter',
              coordinateSystem: 'bmap',
              zlevel: 2,
              rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: false,
                    fontSize:24,
                    position: 'right',
                    color:'#000000',
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
              // rippleEffect: {
              //     brushType: 'stroke'
              // },
              // label: {
              //     normal: {
              //         show: false,
              //         position: 'right',
              //         formatter: '{b}'
              //     }
              // },
              // symbolSize: function (val) {
              //     return val[2] / 8;
              // },
              // itemStyle: {
              //   normal: {
              //     color: color[i]
              //   }
              // },
              data:e[key].map(function (dataItem) {
                return {
                  name: dataItem.to.name,
                  value: [dataItem.to.lon, dataItem.to.lat, dataItem.to.value]
                };
              })
            });
          }
          for(var key in legendObj){
            legend.push(key);
          }
          let myChart = this.$echarts.init(document.getElementById("chart-" + i));
            myChart.getDom().className = "bmview";
            // myChart.getDom().className = "mychart-arcgis";
            myChart.resize();
            var option = {
              backgroundColor: '#404a59',
              title : {
                  left: 'center',
                  textStyle : {
                      color: '#fff'
                  }
              },
              tooltip : {
                  trigger: 'item'
              },
              legend: {
                  orient: 'vertical',
                  top: 'bottom',
                  left: 'right',
                  data:legend,
                  textStyle: {
                      color: '#fff'
                  },
                  selectedMode: 'single'
              },
              // geo: {
              //   map: 'china',
              //   zoom: 12,
              //   center: [115.459812,38.873716],
              //   label: {
              //       emphasis: {
              //           show: false
              //       }
              //   },
              //   roam: true,
              //   itemStyle: {
              //       normal: {
              //           areaColor: '#323c48',
              //           borderColor: '#404a59'
              //       },
              //       emphasis: {
              //           areaColor: '#2a333d'
              //       }
              //   }
              // },
              bmap: {
                center: [115.466,38.8799],
                zoom: 5,
                roam: true
              },
              series: seriesData
            };
            myChart.setOption(option);
            i++;
          });
        }, 1000);
      },
    // refreshChart(mapView) {
    //   loadModules(["esri/geometry/Point"]).then(([Point]) => {
    //     this.chartsDiv.forEach(e => {
    //       var point = {
    //         type: "point",
    //         longitude: parseFloat(e.data.lon),
    //         latitude: parseFloat(e.data.lat)
    //       };
    //       var t = mapView.toScreen(new Point(point));
    //       e.style = { left: (parseInt(t.x)+150) + "px", top:(parseInt(t.y)+50) + "px" };
    //     });
    //   });
    // }
  }
};
</script>


