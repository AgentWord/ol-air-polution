<style scoped>
.overviewDiv {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 300px;
  height: 200px;
  border: 1px solid black;
  z-index: 0;
}
.changeViewDiv {
  background-color:#fff;
  position: absolute;
  right: 15px;
  bottom: 170px;
  z-index: 1;
}

.map {
  height: 100%;
  overflow: hidden;
  margin: 0, 30px;
  z-index: -1;
}
</style>
<style>
  .esri-widget table tr td {
    width: auto;
    background-color: #fff !important;
  }
</style>

<template>
  <div style="height:100%;overflow: hidden;margin:0,30px;">
    <!-- 右侧的工具条 -->
    <transition name="fade" >
      <router-view @scence3DMethods="excude3DMethods"></router-view>
    </transition>
    <div ref="mainMap" class="map">
    </div>
      <div ref="overviewDiv" class="overviewDiv"></div>
      <div  class="changeViewDiv" @click="changeView">
        <Icon type="arrow-swap" size="30" />
      </div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import Vue from "vue";
export default {
  data() {
    return {
      tdtyx: "",
      tdtLayer: "",
      tdtLayerZJ: "",
      tdtLayerXX: "",
      drawPointsData:[],
      appConfig: {
        mapView: null,
        mainView: null,
        activeView: null,
        overViewCon:'',
        mainViewCon:'',
      },
      pointsGraphicsLayer: { d2: {}, d3: {} },
      chartsDiv: [],
      senceLayers:[],
      senceLayerBaseUrl:"http://121.89.183.44/server/rest/services/Hosted/",
      senceLayerNames:["building1","building2","building3","building4","building5","greenarea","ground","streetB","streetN"]
      // senceLayerBaseUrl:"http://39.104.57.37/arcgis/rest/services/Hosted/",
      // senceLayerNames:["streetB","streetNstreetN","bdbuilding1","bddbuilding2","bdbuilding3","bdbuilding4","bdbuilding5","bdgreenarea","bdground"]
    };
  },
  components: {},
  name: "arcgisMap",
  mounted() {
    this.appConfig.overViewCon=this.$refs.overviewDiv;
    this.appConfig.mainViewCon=this.$refs.mainMap;
    this.init();
  },
  methods: {
    init(){
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView","esri/config",
        "esri/views/SceneView",
        "esri/WebMap",
        "esri/Basemap",
        "esri/layers/MapImageLayer",
        "esri/layers/TileLayer",
        "esri/layers/WebTileLayer",
        "esri/layers/FeatureLayer",
        "esri/PopupTemplate",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/Color",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/_base/window",
        "dojo/on",
        "esri/widgets/BasemapToggle",
        "esri/widgets/Legend",
        "esri/geometry/Point",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/core/watchUtils",
        "esri/geometry/SpatialReference",
        "esri/WebScene",
        "esri/layers/SceneLayer",
        "esri/core/urlUtils",
        "dojo/domReady!"
      ]).then(([ Map, MapView,esriConfig,SceneView, WebMap,Basemap, MapImageLayer,TileLayer, WebTileLayer, FeatureLayer,PopupTemplate,
          SimpleMarkerSymbol,Color,dom,domConstruct,win,on,BasemapToggle,Legend,Point,GraphicsLayer,Graphic,watchUtils,
          SpatialReference,WebScene,SceneLayer,urlUtils]) => {
          // create map with the given options
          // urlUtils.addProxyRule({
          //     urlPrefix: "http://192.168.43.100:8080",
          //     proxyUrl: "http://192.168.43.100:8080/Java/proxy.jsp"
          // });

          if(this.tdtLayer=="")this.tdtLayer = new WebTileLayer({
            urlTemplate:
              "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=401cb3e4aa8500aad525ea9b23e037c3",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            copyright: "天地图",
            // spatialReference:sr,
            title: "矢量地图"
          });
          if(this.tdtLayerZJ=="")this.tdtLayerZJ = new WebTileLayer({
            urlTemplate:
              "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=401cb3e4aa8500aad525ea9b23e037c3",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            copyright: "天地图",
            title: "矢量地图注记"
          });
          if(this.tdtLayerXX=="")this.tdtLayerXX = new WebTileLayer({
            urlTemplate:
              "http://{subDomain}.tianditu.gov.cn/DataServer?T=img_w&x={col}&y={row}&l={level}&tk=401cb3e4aa8500aad525ea9b23e037c3",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],

            copyright: "天地图"
          });
          this.pointsGraphicsLayer.d2 = new GraphicsLayer({
            title: "实时暴露测量点",
            graphics: [],
            id: "2d"
          });
          this.pointsGraphicsLayer.d3 = new GraphicsLayer({
            title: "暴露测量点--",
            graphics: [],
            id: "3d"
          });
          var customBasemap = new Basemap({
            baseLayers: [this.tdtLayer, this.tdtLayerZJ], //tdtLayer ,tdtLayerZJ  tdtLayer,tdtLayerZJ
            title: "Custom Basemap",
            id: "myBasemap"
          });

          var initialViewParams = {
            zoom: 8,
            center: [115.160138,39.002451],
            // center: [115.459812,38.873716],
            container: "overviewDiv"
          };
          var options = { logo: false };

          var overviewMap = new WebMap({
            basemap: customBasemap
          });
          initialViewParams.container =this.appConfig.overViewCon;//this.$refs.mainMap; ;
          this.appConfig.mapView = new MapView(initialViewParams); //this.createView(initialViewParams, "2d");
          this.appConfig.mapView.ui.components = [];
          this.appConfig.mapView.map = overviewMap;
          this.appConfig.activeView = this.appConfig.mapView;
         // this.appConfig.mapView.goTo([115.160138,39.002451]);

          //sanwei,http://47.92.77.165:8080/js/bussinessJS/3Dbaoding.js
          //三维图层服务 -------------------bdb1,bdb2,bdb3,bdb4,bdb5,bdgreenarea,bdground,streetB,
          if(this.senceLayers.length==0){
            //this.senceLayers.push(this.tdtLayer);this.senceLayers.push(this.tdtLayerZJ);
            this.senceLayerNames.forEach(e=>{
                let url = this.senceLayerBaseUrl+e+"/SceneServer/layers/0";
                /* if(e=="greenarea"){
                    url = "http://39.104.57.37/server/rest/services/Hosted/greenarea/SceneServer/layers/0";
                } */
                this.senceLayers.push(new SceneLayer({
                  url:url, 
                  popupEnabled: false
                }));
            });
          }
          var scene = new Map({
            layers: this.senceLayers
          });
          // create 3D view, won't initialize until container is set
          this.appConfig.mainView = new SceneView({
            map: scene,
            camera: {
              position: { // 115.50648 38.84853
                x: 115.5109134602469, // lon115.459812, 38.873716  115.5115134602469
                y: 38.855022718011613, // lat
                z: 300 // elevation in meters
              },
              tilt: 60
            },
            
            container: this.appConfig.mainViewCon,
          }); //this.createView(initialViewParams, "3d");

          this.$on("drawGraphicPoints", function(data, points,markerSymbols,textSymbols,popupTemplateOptions){
            let graphics3 = [],graphics2 = [];
            for (var i = 0; i < data.length; i++) {
              var point = points[i];
              var pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbols[i]
              });
              popupTemplateOptions.title = "姓名："+data[i].name;
              var textGraphic = new Graphic({
                geometry: new Point({latitude:point.latitude,longitude:point.longitude,z:45}),
                symbol: textSymbols[i],
                attributes: data[i],
                popupTemplate: new PopupTemplate(popupTemplateOptions)
              });
              graphics2.push(pointGraphic);
              graphics3.push(pointGraphic,textGraphic);
            }

            this.pointsGraphicsLayer.d2.graphics.removeAll();
            this.pointsGraphicsLayer.d2.graphics.addMany(graphics2);

            this.pointsGraphicsLayer.d3.graphics.removeAll();
            this.pointsGraphicsLayer.d3.graphics.addMany(graphics3);

            this.appConfig.mapView.map.add(this.pointsGraphicsLayer.d2);
            this.appConfig.mainView.map.add(this.pointsGraphicsLayer.d3);

           // this.$emit("createChartInfoWindow", data, points);
           this.appConfig.mapView.goTo({
                  target:this.pointsGraphicsLayer.d2.graphics,
                }, {duration: 2000 });
           });

          this.appConfig.mapView.when(() => {
            // Update the overview extent whenever the MapView or SceneView extent changes
            this.appConfig.mainView.watch("extent", () => {
              // Update the overview extent by converting the SceneView extent to the
              // MapView screen coordinates and updating the extentDiv position.
              this.updateOverview();
            });
            if(this.drawPointsData.length>0){
              this.drawPoints(this.drawPointsData);
            }
            //this.appConfig.mainView.map.add();

            this.appConfig.mapView.on("click", event => {
              this.appConfig.mapView.hitTest(event).then(response => {
                var graphic = response.results[0].graphic; 
                // this.appConfig.mainView.goTo([
                //   graphic.geometry.longitude,
                //   graphic.geometry.latitude
                // ]);
               
                this.appConfig.mainView.goTo({
                  target:graphic,
                  
                }, {duration: 2000 });
                
              });
            });
            // this.appConfig.mainView.on("click", event => {
            //   this.appConfig.mainView.hitTest(event).then(response => {
            //     var graphic = response.results[0].graphic;
            //     this.appConfig.mapView.goTo([
            //       graphic.geometry.longitude,
            //       graphic.geometry.latitude
            //     ]);
            //   });
            // });
          });
        }
      )
      .catch(err => {
        // handle any script or module loading errors
        console.error(err);
      });
    },

    //执行方法
    excude3DMethods(methods,params){
      switch (methods) {
        case "VisualExposureScene3D":
          this.drawPoints(params);
          break;
        default:
          break;
      }
    },
    checkReady() {
      try {
        return this.appConfig.mapView.ready;
      } catch (error) {
        return false;
      }
    },
    updateMainview() {
      this.appConfig.mainView.goTo({
        center: this.appConfig.mapView.center,
        scale: this.appConfig.mapView.scale * 2 *
          Math.max(
            this.appConfig.mapView.width / this.appConfig.mainView.width,
            this.appConfig.mapView.height / this.appConfig.mainView.height
          )
      });
    },
    updateOverview() {
      this.appConfig.mapView.goTo({
        center: this.appConfig.mainView.center,
        scale:this.appConfig.mainView.scale * 2 *
          Math.max(
            this.appConfig.mainView.width / this.appConfig.mapView.width,
            this.appConfig.mainView.height / this.appConfig.mapView.height
          )
      });
    },
    // 绘制2d图标
    drawPoints(datas) {
      if (!datas) return;
      if (!this.checkReady()) {
        setTimeout(() => {
          this.drawPoints(datas);
        }, 3000);
        return;
      }
      let data = datas.data; 
      this.drawPointsData = data;
      var colors=this.$utils.qualityColors;  
      var points = [], markerSymbols = [], textSymbols = [];
      data.forEach(e => {  
        points.push({
          type: "point",
          z: 45,
          longitude: e.lon,
          latitude: e.lat
        });
        var picUrl = this.$utils.markerSymbolsUrl(e,e.realTimeAeri.aeri,'aeri')
        markerSymbols.push({
          type: "picture-marker",
          url:"http://211.159.186.65/subsystemold/aqi/loc-" + picUrl[0] + "-" + picUrl[1] + "-" + picUrl[2] +".png",
          width: picUrl[0] % 2 == 0 && picUrl[1] == 1 ? "40px" : "40px",
          height: picUrl[0] % 2 == 0 && picUrl[1] == 1 ? "40px" : "40px",
          xoffset: "0px",
          yoffset: "10px"
        });
        var index=this.$utils.getQualityFromAeri(e.realTimeAeri.aeri); 
        var textSymbol = {
          type:'point-3d',
          symbolLayers: [{
            type: "text",
            material: { color: colors[index] },
            size:12,
            text: e["realTimeAeri"].aeri,
          }],
          verticalOffset : {
            screenLength : 25,
            maxWorldLength : 200,
            minWorldLength : 10
          }
        };
        textSymbols.push(textSymbol);
      });
      var popupTemplateOptions = {
        title: "",
        content:this.getPopupContent('realtime-expose-measure')
      }; 
      this.$emit("drawGraphicPoints",data,points,markerSymbols,textSymbols,popupTemplateOptions);
    }, 
    changeView(){
      var t=this.appConfig.overViewCon;
      this.appConfig.overViewCon=this.appConfig.mainViewCon;
      this.appConfig.mainViewCon=t;

      this.$refs.overviewDiv.innerHTML="";
      this.$refs.mainMap.innerHTML='';
      this.init();
      
    }, 
    //气泡函数
    getPopupContent(popupType){
      if(popupType=="realtime-expose-measure"){
        return (feature)=>{
          var data=feature.graphic.attributes;
          return "<table><tr style='border-bottom:1px solid rgba(127, 127, 127, 0.6)'><td>地点：</td><td>" +data.street+ "</td>" +
            "<td>时间</td><td>" +data.time+ "</td></tr></table>" + 
            "<table><tr style='border-bottom:1px solid rgba(127, 127, 127, 0.6);'><td>空气质量指数AQI：</td> <td> " + data.aqi +
            "<td>空气污染暴露指数AERI：</td> <td> " + data.realTimeAeri.aeri +
            "</table><table><tr><th style='width:20%;text-align:center;'>污染物</th><th style='width:40%;text-align: center;'>浓度</th><th style='width:40%;text-align: center;'>暴露量</th></tr>"+
            "<tr><td style='text-align:center;'>PM₂.₅：</td> <td style='text-align:center;'> " + data.pollutionData.pm25 + " ug/m³" + "</td> <td style='text-align:center;'> " + data.realTimeAeri.pm25Aeri + " ug/(kg·min)" + "</td></tr>" +
            "<tr><td style='text-align:center;'>PM₁₀：</td> <td style='text-align:center;'> " + data.pollutionData.pm10 + " ug/m³"  + "</td> <td style='text-align:center;'> " + data.realTimeAeri.pm10Aeri + " ug/(kg·min)" + "</td></tr>" +
            "<td style='text-align:center;'>NO₂：</td> <td style='text-align:center;'> " + data.pollutionData.no2 + " mg/m³"  + "</td> <td style='text-align:center;'> " + data.realTimeAeri.no2Aeri + " ug/(kg·min)"  + "</td></tr>" +
            "<tr><td style='text-align:center;'>SO₂：</td> <td style='text-align:center;'> " + data.pollutionData.so2 + " ug/m³"  + "</td> <td style='text-align:center;'> " + data.realTimeAeri.so2Aeri + "ug/(kg·min)" + "</td></tr>" +
            "</td><td style='text-align:center;'>O₃：</td> <td style='text-align:center;'> " + data.pollutionData.o3 + " ug/m³"+ "</td> <td style='text-align:center;'> " + data.realTimeAeri.o3Aeri + " ug/(kg·min)" + "</td></tr>" +
            "<tr><td style='text-align:center;'>CO：</td> <td style='text-align:center;'> " + data.pollutionData.co + " mg/m³"  + "</td> <td style='text-align:center;'> " + data.realTimeAeri.coAeri + " ug/(kg·min)" + "</td></tr></table>"
        }
      }
    },
  }
};
</script>
