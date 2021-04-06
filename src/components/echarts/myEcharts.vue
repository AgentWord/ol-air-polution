<style scoped>
.mychart-arcgis {
  position: absolute;
  z-index: 0;
  width: 100px;
  height: 100px;
}

.mychart-arcgis-full {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
}
</style>
<template>
  <span>
     <div v-for="(item,index) in chartsDiv" :key="index" :id="item.id" :style="item.style"></div>
</span>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  data() {
    return {
      chartsDiv: [],
      offset:{left:200,top:109}
    };
  },
  mounted() {

  },
  methods:{
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
      this.refreshChart(mapView);

    },
    clearChartDiv(){
      this.chartsDiv = [];
    },
    //污染物解析饼图
    drawPieChart(data,mapView){
      this.initChartDiv(data,mapView);
      let datas = data.data;
      let colors=this.$utils.sixWuRanwuColors;
      setTimeout(() => {
        for (var i = 0; i < datas.length; i++) {
          var seriesData=[];
          for(var key in datas[i].value){
            seriesData.push({name: key,value:datas[i].value[key],itemStyle:{color:colors[key]}});
          }
          let myChart = this.$echarts.init(
            document.getElementById("chart-" + i)
          );
          myChart.getDom().className = "mychart-arcgis";     
          window.onresize = function() {
            myChart.resize();
          }; 
          myChart.resize();
          debugger;         
          myChart.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
              {
                name: "占比",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                label:{
                   position: 'outside'
                },
                data: seriesData,
                itemStyle: {
                  normal: {
                    label: { show: false },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          });
        }
      }, 1000);
    },
    //来源解析坐标
    convertData(data){
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = [dataItem.from.lon,dataItem.from.lat];
        var toCoord = [dataItem.to.lon,dataItem.to.lat];
        if (fromCoord && toCoord) {
          // res.push({//弃用
          //   fromName: dataItem.from.name,
          //   toName: dataItem.to.name,
          //   coords: [fromCoord, toCoord]  //坐标
          // });
          //3.0的写法
          res.push([{coord: fromCoord}, {coord: toCoord}]);         
        }
      }
      return res;
    },
    //污染物来源解析饼图
    drawPieSourcesChart(data,mapView){

      loadModules(["echarts3layer/Echarts3Layer", "dojo/domReady!"]).then(([Echarts3Layer]) => {
     // this.initChartDiv(data,mapView);
      let datas = data.data;
      var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
      var color = ['#a6c84c', '#ffa022', '#46bee9','#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB'];
     // setTimeout(() => {
        var i=0;
         datas.forEach(e=>{
          var seriesData=[],legendObj = {}, legend = [];
          for (var key in e) {
            legendObj[key] = 0;
            var converData=this.convertData(e[key]);
            //debugger;
            seriesData.push(
            //   {
            //   name: key,
            //   type: 'lines',
            //   zlevel: 1,
            //   effect: {
            //       show: true,
            //       period: 6,
            //       trailLength: 0.7,
            //       color: '#fff',
            //       symbolSize: 3
            //   },
            //   lineStyle: {
            //       normal: {
            //           color: color[i],
            //           width: 0,
            //           curveness: 0.2
            //       }
            //   },
            //   data: converData
            // },
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
              data:converData
            },
            {
              name: key,
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                  brushType: 'stroke'
              },
              label: {
                  normal: {
                      show: false,
                      position: 'right',
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
          // let myChart = this.$echarts.init(document.getElementById("chart-" + i));
          // myChart.getDom().className = "mychart-arcgis-full";  
          // window.onresize = function() {
          //   myChart.resize();
          // };
          //myChart.resize();   
                
          var option = {
            //backgroundColor: '#404a59',
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
            geo: {
              map: '',
              label: {
                  emphasis: {
                      show: false
                  }
              },
              roam: true,
              itemStyle: {
                  normal: {
                      areaColor: '#323c48',
                      borderColor: '#404a59'
                  },
                  emphasis: {
                      areaColor: '#2a333d'
                  }
              }
            },
            series: seriesData
          };
          //指定echartdiv的id，用于清空和复用
                var overlay = new Echarts3Layer(mapView,echarts,this.offset,"migrate-chart-"+i);
                var chartsContainer = overlay.getEchartsContainer();
                var myChart = overlay.initECharts(chartsContainer);
                myChart.setOption(option);
                 i++;
          });          
        });
      //}, 1000);
    },
    refreshChart(mapView) {
      loadModules(["esri/geometry/Point"]).then(([Point]) => {
        this.chartsDiv.forEach(e => {
          var point = {
            type: "point",
            longitude: parseFloat(e.data.lon),
            latitude: parseFloat(e.data.lat)
          };
          var t = mapView.toScreen(new Point(point));
          e.style = { left: (parseInt(t.x)+this.offset.left) + "px", top:(parseInt(t.y)+this.offset.top) + "px" };
        });
      });
    }
  }
};
</script>


