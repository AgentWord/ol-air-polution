<style lang="less" scoped>
.legendDiv {
  position: fixed;
  bottom: 15px;
  font-size: 10px;
  overflow-y: auto;
  min-width: 120px;
  // height:16%;
  max-width: 15%;
  border: 1px solid #400040;
  z-index: 100;
  &-left {
    left: 210px;
  }
  &-right {
    right: 10px;
  }
}
.compareDiv {
  position: fixed;
  bottom: 15px;
  font-size: 10px;
  overflow-y: auto;
  min-width: 120px;
  max-width: 15%;
  border: 1px solid #400040;
  background-color: gray;
  color: white;
  z-index: 100;
  &-left {
    right: 20px;
  }
  &-right {
    left: 300px;
  }
}
.map {
  &-top-left {
    float: left;
    position: absolute;
    margin: 10px;
    z-index: 100;
  }
  &-top-right {
    float: right;
    position: absolute;
    margin: 0px;
    z-index: 100;
    right: 5px;
  }
  &-bottom-right {
    float: right;
    position: absolute;
    margin: 10px;
    right: 5px;
    bottom: 10px;
    z-index: 100;
  }
  &-bottom-left {
    float: left;
    position: absolute;
    margin: 10px;
    bottom: 10px;
    z-index: 100;
  }
}
</style>
<style>
.esri-ui .esri-attribution {
  display: none !important;
}
.esri-zoom {
  display: none !important;
}
.esri-widget table tr td {
  width: auto;
  background-color: #fff !important;
}
.esri-popup__main-container {
  max-height: 360px !important;
}
.esri-popup__header-buttons {
  display: none !important;
}
.esri-widget table tr:nth-child(odd) {
  background-color: transparent !important;
}
.esri-widget table tr th {
  border-right: 0px solid rgba(0, 0, 0, 0.05) !important;
}
.esri-legend__layer-caption {
  display: none !important;
}
</style>

<template>
  <div style="height:100%;overflow: hidden;margin:0,30px;">
    <div ref="map" id="viewDiv" class="map">
      <div ref="button"></div>
      <!-- 右侧的工具条 -->
      <!-- <div class="map-top-right">
      <slot name="top-right">-->
      <transition name="fade" v-if="showRouterView">
        <router-view @excutemethods="excuteChangeMethods"></router-view>
      </transition>
      <!-- </slot>  
      </div>-->
      <div class="map-bottom-left">
        <slot name="bottom-left" v-if="silderSlot.bottomleft.show"></slot>
      </div>
      <div class="legendDiv" :class="legendDiClass" v-show="legendShow">
        <div ref="legend"></div>
      </div>
      <!-- <div class="compareDiv" :class ="compareDiClass"> 
       {{compareTitile}}
      </div>-->
      <div class="legendDiv chartLegendDiv" v-show="chartLegendShow">
        <h4>{{legendTitle}}</h4>
        <div v-for="(item,index) in colors " :key="index">
          <span :style="{'background-color':item.color}" class="chartlegendStyle"></span>
          &nbsp;{{item.name}}
        </div>
      </div>

      <myEcharts ref="myEcharts"></myEcharts>
    </div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import Vue from "vue";
import myEcharts from "./echarts/myEcharts.vue";
// import echarts3 from 'echarts3'
export default {
  components: { myEcharts },
  props: {
    showRouterView: {
      type: Boolean,
      default: true
    },
    legendDiClass: {
      type: String,
      default: "legendDiv-right"
    },
    compareDiClass: {
      type: String,
      default: "compareDiClass-right"
    }
  },
  data() {
    return {
      wdid: 4326,
      datas: [],
      timeOut: [],
      guijiTimeOut: [],
      map: "",
      view: "",
      is2d: true,
      tdtyx: "",
      tdtLayer: "",
      tdtLayerZJ: "",
      tdtLayerXX: "",
      appConfig: {
        mapView: null,
        sceneView: null,
        activeView: null,
        container: "viewDiv" // use same container for views
      },
      cao: "",
      servicrURL: "http://106.37.181.79/ahr/",
      legendShow: false,
      chartLegendShow: false,
      colors: [],
      legendTitle: "",
      compareTitile: "浓度对比",
      overlay: "",
      imageJobId: {},
      timeFlag: "",
      jobIdData: [],
      serverUrl:
        "http://211.159.186.65:6080/arcgis/rest/services/pwel/GPServer/pwel",
      gp: {},
      nongduId: "",
      renkouId: "",
      silderSlot: {
        bottomleft: {
          show: true
        }
      }
    };
  },
  name: "arcgisMap",
  mounted() {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/WebMap",
      "esri/Basemap",
      "esri/layers/MapImageLayer",
      "esri/layers/ImageryLayer",
      "esri/layers/TileLayer",
      "esri/layers/WebTileLayer",
      "esri/layers/FeatureLayer",
      "esri/PopupTemplate",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/Color",
      "dojo/dom",
      "dojo/on",
      "esri/widgets/BasemapToggle",
      "esri/widgets/Legend",
      "esri/geometry/Point",
      "esri/layers/WMSLayer",
      "esri/geometry/Extent",
      "esri/layers/GraphicsLayer",
      "esri/Graphic",
      "esri/geometry/SpatialReference",
      "esri/WebScene",
      "esri/layers/SceneLayer",
      "esri/layers/support/RasterFunction",
      "esri/config",
      "echarts3Layer/Echarts3Layer",
      "esri/tasks/Geoprocessor",
      "dojo/domReady!"
    ])
      .then(
        ([
          EsriMap,
          MapView,
          SceneView,
          WebMap,
          Basemap,
          MapImageLayer,
          ImageryLayer,
          TileLayer,
          WebTileLayer,
          FeatureLayer,
          PopupTemplate,
          SimpleMarkerSymbol,
          Color,
          dom,
          on,
          BasemapToggle,
          Legend,
          Point,
          WMSLayer,
          Extent,
          GraphicsLayer,
          Graphic,
          SpatialReference,
          WebScene,
          SceneLayer,
          RasterFunction,
          esriConfig,
          Echarts3Layer,
          Geoprocessor
        ]) => {
          // create map with the given options
          let vm = this;
          this.tdtLayer = new WebTileLayer({
            urlTemplate:
              "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=401cb3e4aa8500aad525ea9b23e037c3",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            copyright: "天地图",
            // spatialReference:sr,
            title: "矢量地图"
          });
          this.tdtLayerZJ = new WebTileLayer({
            urlTemplate:
              "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=401cb3e4aa8500aad525ea9b23e037c3",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            copyright: "天地图",
            title: "矢量地图注记"
          });
          this.tdtLayerXX = new WebTileLayer({
            urlTemplate:
              "http://{subDomain}.tianditu.gov.cn/DataServer?T=img_w&x={col}&y={row}&l={level}&tk=401cb3e4aa8500aad525ea9b23e037c3",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],

            copyright: "天地图"
          });
          // 添加路网数据
          /* var resourceInfo={
            extent: new Extent(70.400390625, 16.34765625, 137.900390625, 55.37109375, {
                    wkid: 4326
                }),
                layerInfos: [],
                version: '1.1.1'
          } */

          /* var geoWmsUrl = "http://106.37.181.79:40402/bdroad/wms";
          var roadnetLayer = new WMSLayer({
                url: geoWmsUrl,// url to the service,
                //imageFormat:"image/png",
                version: '1.1.1',
                sublayers: [{
                              name: "bdroad"
                            }]
              });
            roadnetLayer.on("error", function (response) {
                console.log("Error: %s", response.error.message);
            }); */
          //var roadnetLayer = new WMSLayer(geoWmsUrl,{resourceInfo: resourceInfo});
          //roadnetLayer.imageFormat="png";
          //roadnetLayer.setVisibleLayers("bdroad:bdroad");

          var customBasemap = new Basemap({
            baseLayers: [this.tdtLayer, this.tdtLayerZJ], //tdtLayer ,tdtLayerZJ  tdtLayer,tdtLayerZJ
            title: "Custom Basemap",
            id: "myBasemap"
          });
         // customBasemap.addLayer(roadnetLayer);// 将路网数据添加到地图中 


          var initialViewParams = {
            zoom: 12,
            center: [115.459812, 38.873716],
            // container: this.appConfig.container
            container: this.$refs.map
          };
          var options = { logo: false };

          var webmap = new WebMap({
            basemap: customBasemap
          });
          
          // create 2D view and and set active
          this.appConfig.mapView = new MapView(initialViewParams); //this.createView(initialViewParams, "2d");
          this.appConfig.mapView.map = webmap;
          this.appConfig.activeView = this.appConfig.mapView;
          

          //地图缩放级别
          var _this = this;
          Vue.prototype.aGis = this.appConfig.mapView;
          Vue.prototype.selectLayer = this.appConfig.mapView;

          let legend = new Legend(
            {
              view: this.appConfig.mapView,
              layerInfos: [
                {
                  layer: this.appConfig.mapView.map,
                  title: ""
                }
              ]
            },
            this.$refs.legend
          );
          legend.startup();

          this.guiJiGraphicsLayer = new GraphicsLayer({
            title: "出行轨迹",
            graphics: []
          });
          this.pointsGraphicsLayer = new GraphicsLayer({
            title: "实时暴露测量点",
            graphics: []
          });
          this.pointFlashGraphicsLayer = new GraphicsLayer({
            title: "闪烁",
            graphics: []
          });
          this.pointsGuijiRepalyLayer = new GraphicsLayer({
            title: "轨迹回放",
            graphics: []
          });

          //执行绘制轨迹
          this.$on("drawGraphicLines", function(
            params,
            polylineSymbol,
            startOrEndSymbol,
            popupTemplateOptions,
            isClearAll,
            utils=this.$utils,
          ) {
            let graphics = [];
            let datas = params;
            let userInfo = [];
            let paths = [];
            let colorIndex=0;
            this.guiJiGraphicsLayer.graphics.removeAll();// 清空轨迹图层中所有轨迹
            for (var key in datas) {
              
              var dataKey = datas[key];
              for (var i = 0; i < dataKey.length; i++) {
                paths.push([dataKey[i].lon, dataKey[i].lat]);
                dataKey[i].username=key;
                userInfo.push(dataKey[i]);
              }
              if (paths.length < 2) return;
              // 设置不同人的轨迹颜色
              var lineSymbol = {
                  type: "simple-line", // autocasts as SimpleLineSymbol()
                  color: utils.RouteColors[colorIndex++],
                  width:3
              };
              
              var graphic = new Graphic({
                geometry: { type: "polyline", paths: paths },
                symbol: lineSymbol,
                attributes: userInfo[0],
                popupTemplate: new PopupTemplate(popupTemplateOptions)
              });
              graphics.push(graphic);// 添加路线
              var startPoint = {
                type: "point",
                longitude: paths[0][0],
                latitude: paths[0][1]
              };
              startOrEndSymbol.url =
                "http://211.159.186.65/subsystemold/images/startPoint.png";
              var startPointGraphic = new Graphic({
                geometry: startPoint,
                symbol: startOrEndSymbol
              });
              graphics.push(startPointGraphic);// 添加起点
              var endPoint = {
                type: "point",
                longitude: paths[paths.length - 1][0],
                latitude: paths[paths.length - 1][1]
              };
              startOrEndSymbol.url =
                "http://211.159.186.65/subsystemold/images/endPoint.png";
              var endPointGraphic = new Graphic({
                geometry: endPoint,
                symbol: startOrEndSymbol
              });
              graphics.push(endPointGraphic);// 添加终点
              // if(isClearAll){
              //   this.appConfig.mapView.map.removeAll();
              //   this.guiJiGraphicsLayer.graphics.removeAll();
              // }
              
            }
            
            this.guiJiGraphicsLayer.graphics.addMany(graphics);
            this.appConfig.mapView.map.add(this.guiJiGraphicsLayer);
            // cdb 缩放到点的范围
            var opts = {
              duration: 2000  // 动画延迟2秒
            };
            this.appConfig.mapView.goTo({
              target: this.guiJiGraphicsLayer.graphics,
              zoom: 16
            }, opts);


          });
          //执行绘制多个个体轨迹
          this.$on("drawMultipleGraphicLines", function(
            params,
            polylineSymbol,
            startOrEndSymbol,
            popupTemplateOptions
          ) {
            let graphics = [];
            let datas = params;
            let userInfo = [];
            let paths = [];
            console.log(datas);
            // for(var i=0;i<datas.length;i++){
            paths.push([datas["beginPoint"].lon, datas["beginPoint"].lat]);
            paths.push([datas["endPoint"].lon, datas["endPoint"].lat]);
            userInfo.push(datas["timeDuring"]);
            // }
            if (paths.length < 2) return;
            var graphic = new Graphic({
              geometry: { type: "polyline", paths: paths },
              symbol: polylineSymbol,
              attributes: userInfo,
              popupTemplate: new PopupTemplate(popupTemplateOptions)
            });
            graphics.push(graphic);
            var startPoint = {
              type: "point",
              longitude: paths[0][0],
              latitude: paths[0][1]
            };
            startOrEndSymbol.url =
              "http://211.159.186.65/subsystemold/images/startPoint.png";
            var startPointGraphic = new Graphic({
              geometry: startPoint,
              symbol: startOrEndSymbol
            });
            graphics.push(startPointGraphic);
            var endPoint = {
              type: "point",
              longitude: paths[paths.length - 1][0],
              latitude: paths[paths.length - 1][1]
            };
            startOrEndSymbol.url =
              "http://211.159.186.65/subsystemold/images/endPoint.png";
            var endPointGraphic = new Graphic({
              geometry: endPoint,
              symbol: startOrEndSymbol
            });
            graphics.push(endPointGraphic);
            this.guiJiGraphicsLayer.graphics.addMany(graphics);
            this.appConfig.mapView.map.add(this.guiJiGraphicsLayer);
          });

          //执行绘制出行方式轨迹
          this.$on("drawGraphicLinesOfOut", function(
            pathDatas,
            startOrEndSymbol,
            popupTemplateOptions,
            isClearAll
          ) {
            let graphics = [];
            let length = pathDatas.length;
            if (length < 2) return;
            let colors = this.$utils.qualityColors;
            this.colors = [];
            for (var i = 0; i < 5; i++) {
              this.colors.push({ name: i + "-" + (i + 1), color: colors[i] });
            }
            this.legendTitle = "暴露风险值";
            this.chartLegendShow = true;
            this.legendShow = false;
            for (var i = 1; i < length; i++) {
              let paths = [];
              paths.push([pathDatas[i - 1].lon, pathDatas[i - 1].lat]);
              paths.push([pathDatas[i].lon, pathDatas[i].lat]);
              let riskValue = parseInt(
                (pathDatas[i - 1].riskValue + pathDatas[i].riskValue) / 2
              );
              var graphic = new Graphic({
                geometry: { type: "polyline", paths: paths },
                symbol: {
                  type: "simple-line", // autocasts as SimpleLineSymbol()
                  color: colors[riskValue],
                  width: 4
                }
              });
              graphics.push(graphic);
            }
            var startPoint = {
              type: "point",
              longitude: pathDatas[0].lon,
              latitude: pathDatas[0].lat
            };
            startOrEndSymbol.url =
              "http://211.159.186.65/subsystemold/images/startPoint.png";
            var startPointGraphic = new Graphic({
              geometry: startPoint,
              symbol: startOrEndSymbol
            });
            graphics.push(startPointGraphic);
            var endPoint = {
              type: "point",
              longitude: pathDatas[length - 1].lon,
              latitude: pathDatas[length - 1].lat
            };
            startOrEndSymbol.url =
              "http://211.159.186.65/subsystemold/images/endPoint.png";
            var endPointGraphic = new Graphic({
              geometry: endPoint,
              symbol: startOrEndSymbol
            });
            graphics.push(endPointGraphic);
            if (isClearAll) {
              this.appConfig.mapView.map.removeAll();
              this.guiJiGraphicsLayer.graphics.removeAll();
            }
            this.guiJiGraphicsLayer.graphics.addMany(graphics);
            this.appConfig.mapView.map.add(this.guiJiGraphicsLayer);
          });

          //轨迹回放
          this.$on("drawGuijiRepalyPoints", function(
            data,
            points,
            markerSymbols,
            textSymbols,
            popupTemplateOptions
          ) {
            let graphics = [];
            
            for (var key in data) {
              // for(var i =0;i<data[key].length;i++){

              // }
              data[key].forEach((e, i, arr) => {
                var point = points[i];
                var pointGraphic = new Graphic({
                  geometry: point,
                  symbol: markerSymbols[i]
                });
                var textGraphic = new Graphic({
                  geometry: point,
                  symbol: textSymbols[i],
                  attributes: e,
                  popupTemplate: new PopupTemplate(popupTemplateOptions)
                });
                graphics.push(pointGraphic, textGraphic);
              });
            }
            this.appConfig.mapView.map.remove(this.pointsGuijiRepalyLayer);
            this.pointsGuijiRepalyLayer.graphics.removeAll();
            
            this.appConfig.mapView.map.remove(this.pointsGuijiRepalyLayer);
            this.appConfig.mapView.map.add(this.pointsGuijiRepalyLayer);
            var n = 0;
            this.guijiTimeOut = [];
            for (var key in data) {
              for (var i = 0; i < data[key].length; i++) {
                this.guijiTimeOut.push(
                  setTimeout(() => {
                    this.pointsGuijiRepalyLayer.graphics.removeAll();
                    this.pointsGuijiRepalyLayer.graphics.addMany([
                      graphics[n],
                      graphics[n + 1]
                    ]);
                    n += 2;
                  }, 2000 * i)
                );
                this.guijiTimeOut.push(
                  setTimeout(() => {
                    this.pointsGuijiRepalyLayer.graphics.removeAll();
                    n += 2;
                  }, 2000 * (data[key].length + 2))
                );
              }
            }
          });
          //绘制实时暴露测量点
          this.$on("drawGraphicPoints", function(
            data,
            type,
            points,
            markerSymbols,
            textSymbols,
            popupTemplateOptions,
            realTimeOrMoni
          ) {
            this.appConfig.mapView.map.removeAll();
            this.appConfig.mapView.popup = null;
            let graphics = [];
            for (var i = 0; i < data.length; i++) {
              var point = points[i];
              var pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbols[i]
              });
              if (type == "realTime") {
                popupTemplateOptions.title = "姓名：" + data[i].name;
              } else {
                if (realTimeOrMoni) {
                  popupTemplateOptions.title = "姓名：" + data[i].name;
                } else {
                  popupTemplateOptions.title = "";
                }
              }
              var textGraphic = new Graphic({
                geometry: point,
                symbol: textSymbols[i],
                attributes: data[i],
                popupTemplate: new PopupTemplate(popupTemplateOptions)
              });
              graphics.push(pointGraphic, textGraphic);
            }
            this.appConfig.mapView.map.remove(this.pointsGraphicsLayer);
            this.pointsGraphicsLayer.graphics.removeAll();
            this.pointsGraphicsLayer.graphics.addMany(graphics);
            this.appConfig.mapView.map.add(this.pointsGraphicsLayer);
            // cdb 缩放到点的范围
            var opts = {
              duration: 2000  // 动画延迟2秒
            };
            this.appConfig.mapView.goTo({
              target: this.pointsGraphicsLayer.graphics,
              //zoom: 15
            }, opts);
            
          });
          // 个体风险统计 
          this.$on("drawIndividualRiskPoints", function(
            data,
            points,
            markerSymbols,
            textSymbols,
            popupTemplateOptions
          ) {
            this.appConfig.mapView.map.removeAll();
            let graphics = [];
            for (var i = 0; i < data.length; i++) {
              var point = points[i];
              popupTemplateOptions.title = "姓名：" + data[i].name;
              var pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbols[i],
                attributes: data[i],
                popupTemplate: new PopupTemplate(popupTemplateOptions)
              });
              var textGraphic = new Graphic({
                geometry: point,
                symbol: textSymbols[i],
                attributes: data[i],
                popupTemplate: new PopupTemplate(popupTemplateOptions)
              });
              graphics.push(pointGraphic, textGraphic);
            }
            this.appConfig.mapView.map.remove(this.pointsGraphicsLayer);
            this.pointsGraphicsLayer.graphics.removeAll();
            this.pointsGraphicsLayer.graphics.addMany(graphics);
            this.appConfig.mapView.map.add(this.pointsGraphicsLayer);
            // cdb 缩放至视野内
            var opts = {
              duration: 2000  // 动画延迟2秒
            };
            this.appConfig.mapView.goTo({
              target: this.pointsGraphicsLayer.graphics,
            }, opts);

          });
          
          // 风险时段解析
          this.$on("riskTimePeriodAnalysis", function(
            data,
            points,
            markerSymbols,
            textSymbols,
            popupTemplateOptions
          ) {
            this.appConfig.mapView.map.removeAll();
            let graphics = [];
            for (var i = 0; i < data.length; i++) {
              var point = points[i];
              // popupTemplateOptions.title = "姓名：" + data[i].name
              var pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbols[i],
                attributes: data[i],
                popupTemplate: new PopupTemplate(popupTemplateOptions)
              });
              var textGraphic = new Graphic({
                geometry: point,
                symbol: textSymbols[i],
                attributes: data[i],
                popupTemplate: new PopupTemplate(popupTemplateOptions)
              });
              graphics.push(pointGraphic, textGraphic);
            }
            this.appConfig.mapView.map.remove(this.pointsGraphicsLayer);
            this.pointsGraphicsLayer.graphics.removeAll();
            this.pointsGraphicsLayer.graphics.addMany(graphics);
            this.appConfig.mapView.map.add(this.pointsGraphicsLayer);
            // cdb 缩放至视野内
            var opts = {
              duration: 2000  // 动画延迟2秒
            };
            this.appConfig.mapView.goTo({
              target: this.pointsGraphicsLayer.graphics,
            }, opts);
          });
          //实时污染栅格数据
          esriConfig.request.corsEnabledServers.push(
            "http://211.159.186.65:7777"
          );
          // 通用加载MapService 
          this.$on("LoadMapService", function(data, method) {
            this.appConfig.mapView.map.removeAll();
            let datas = data.data;
            if (datas.length == 0) return;
            var preUrl=datas.preUrl;
            var layerid=datas.layerid;
            var lyr = new MapImageLayer({   //下面的url是动态地图服务的
              url:preUrl,
              sublayers: [{
                id: layerid// 根据id显示子图层
              }]
            });
            this.appConfig.mapView.map.add(lyr);
            this.legendShow = true;
            legend.layerInfos[0].title = datas.title;// 设置图例的标题
            console.log("layerInfos",legend);
            /* // cdb 缩放至视野内
            var opts = {
              duration: 2000  // 动画延迟2秒
            };
            this.appConfig.mapView.goTo({
              target: lyr,
            }, opts); */


          });
          // 污染精细化制图加载ImageryLayer
          this.$on("fineDrawllution", function(data, method) {
            console.log(data);
            console.log(method);
            this.appConfig.mapView.map.removeAll();
            let datas = data.data;
            if (datas.length == 0) return;
            var imageLayer = new ImageryLayer(datas[0].preUrl);
            //var imageLayer = new ImageryLayer("http://211.159.186.65:6080/arcgis/rest/services/pop/dtrk/ImageServer");
            // this.legendTitle = "污染浓度值"
            var InputRange = [
              0,
              160,
              161,
              200,
              201,
              300,
              301,
              400,
              401,
              800,
              801,
              1200
            ];
            if (method == "fineDrawllution") {
              InputRange = this.$utils.InputRanges[datas[0].pollutionType];
            }
            console.log(datas[0].preUrl);
            var remapRF = new RasterFunction({
              functionName: "Remap",
              functionArguments: {
                InputRanges: InputRange,
                OutputValues: [1, 2, 3, 4, 5, 6],
                Raster: "$$"
              },
              outputPixelType: "u8"
            });
            var colorRF = new RasterFunction({
              functionName: "Colormap",
              functionArguments: {
                Colormap: [
                  [1, 107, 205, 5], //all pixels with value of 1 symbolized with 绿色
                  [2, 250, 208, 40], //all pixels with value of 2 symbolized with 黄色
                  [3, 254, 136, 0], //all pixels with value of 1 symbolized with 橙色
                  [4, 253, 0, 0], //all pixels with value of 2 symbolized with 红色
                  [5, 151, 4, 84], //all pixels with value of 1 symbolized with 紫色
                  [6, 98, 0, 30] //all pixels with value of 2 symbolized with 褐红色
                ],
                Raster: remapRF
              }
            });
            imageLayer.renderingRule = colorRF;
            this.appConfig.mapView.map.removeAll();
            this.appConfig.mapView.map.add(imageLayer);
            this.legendShow = true;
            legend.layerInfos[0].title = data.title;
            
          });
          //风险热点排序
          this.$on("drawRiskHotRanPoints", function(
            data,
            points,
            markerSymbols,
            textSymbols,
            popupTemplateOptions
          ) {
            this.appConfig.mapView.map.removeAll();
            let graphics = [];
            for (var i = 0; i < data.length; i++) {
              var point = points[i];
              var pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbols[i]
              });
              popupTemplateOptions.title = "姓名：" + data[i].name;
              var textGraphic = new Graphic({
                geometry: point,
                symbol: textSymbols[i],
                attributes: data[i],
                popupTemplate: new PopupTemplate(popupTemplateOptions)
              });
              graphics.push(pointGraphic, textGraphic);
            }
            this.appConfig.mapView.map.remove(this.pointsGraphicsLayer);
            this.pointsGraphicsLayer.graphics.removeAll();
            this.pointsGraphicsLayer.graphics.addMany(graphics);
            this.appConfig.mapView.map.add(this.pointsGraphicsLayer);
            // cdb 缩放至视野内
            var opts = {
              duration: 2000  // 动画延迟2秒
            };
            this.appConfig.mapView.goTo({
              target: this.pointsGraphicsLayer.graphics,
            }, opts);
          });

          //风险热点排序定位交互
          this.$on("arcgisEvent_addGraphicPointsFlash", function(
            point,
            markerSymbol
          ) {
            let graphics = [];
            var pointGraphic = new Graphic({
              geometry: point,
              symbol: markerSymbol
            });
            graphics.push(pointGraphic);
            this.appConfig.mapView.map.remove(this.pointFlashGraphicsLayer);
            this.pointFlashGraphicsLayer.graphics.removeAll();
            this.pointFlashGraphicsLayer.graphics.addMany(graphics);
            this.appConfig.mapView.map.add(this.pointFlashGraphicsLayer);
            //this.map.reorder(this.pointFlashGraphicsLayer,this.map.allLayers.length-1);
          });

          //gp
          this.$on("drawChazhi", function(params) {
            var layer = this.appConfig.mapView.map.findLayerById(
              "wuran_chazhi"
            );
            if (layer) {
              this.appConfig.mapView.map.remove(layer);
            }
            // var featureSet = new FeatureSet();
            this.gp[this.nongduId] = new Geoprocessor(this.serverUrl);
            this.gp[this.nongduId].submitJob(params).then(
              jobinfo => {
                if (jobinfo.jobStatus == "job-succeeded") {
                  //任务成功，jobId放到一个数组里
                  this.imageJobId[this.nongduId + this.renkouId] =
                    jobinfo.jobId;
                  return;
                  let params = {
                    jobId: jobinfo.jobId,
                    nongduId: this.nongduId,
                    renkouId: this.renkouId
                  };
                  this.upLoadJobIdInfo(params);
                }
              },
              error => {
                this.$Message.error("数据渲染错误");
              },
              jobinfo => {
                //this.$Message.info(jobinfo.jobStatus);
              }
            );
          });

          this.appConfig.mapView.when(() => {
            //鼠标拖拽或缩放 联动
            this.appConfig.mapView.on(["mouse-wheel", "drag"], evt => {
              // deltaY value is postive when wheel is scrolled up
              // and it is negative when wheel is scrolled down.
              this.$emit("extent-change", {
                extent: this.appConfig.mapView.extent,
                center: this.appConfig.mapView.center,
                zoom: this.appConfig.mapView.zoom
              });
              if (evt.type == "mouse-wheel")
                setTimeout(() => {
                  this.refreshChart();
                }, 500);
              else {
                this.refreshChart();
              }
            });
          });

          //污染管控仿真
          this.$on("arcgisEvent_PollutionControlSimulation", function(datas) {
            this.appConfig.mapView.map.removeAll();
            // var id = parseInt(Math.random()*2);
            let data = datas.data;
            let id = datas.id;
            var gridUrl = new MapImageLayer({
              url: data.url,
              sublayers: [
                {
                  id: id,
                  title: datas.title
                }
              ]
              // server exports in either jpg or png format
            });
            // this.legendTitle = datas.title
            legend.layerInfos[0].title = datas.title;
            this.appConfig.mapView.map.removeAll();
            this.appConfig.mapView.map.add(gridUrl);
            this.legendShow = true;
            this.chartLegendShow = false;
            //cdb
            this.appConfig.mapView.goTo({
              target: gridUrl,
              zoom:12
            }, {duration: 2000 });
          });
          this.$on("arcgisEvent_TravelRiskAnalysis", function(datas) {
            this.appConfig.mapView.map.removeAll();
            let data = datas.data;
            let id = datas.id;
            var gridUrl = new MapImageLayer({
              url: data.url,
              sublayers: []
            });
            id.forEach(e => {
              gridUrl.sublayers.push({
                id: e,
                title: datas.title
              });
            });
            legend.layerInfos[0].title = datas.title;
            this.appConfig.mapView.map.removeAll();
            this.appConfig.mapView.map.add(gridUrl);
            this.legendShow = false;
            this.chartLegendShow = false;
          });
        }
      )
      .catch(err => {
        // handle any script or module loading errors
        console.error(err);
      });
  },
  methods: {
    //执行方法
    excuteChangeMethods(method, params) {
      switch (method) {
        case "drawGuiJi":
          this.drawGuiJi(params);
          break;
        case "drawMultipleGuiJi":
          this.drawMultipleGuiJi(params);
          break;
        case "drawRealTimePoints":
        case "drawMoniPoints":
          this.drawRealTimePoints(params);
          break;
        case "fineDrawllution":
        case "popDistributSimulation":
        case "ExposureDynamicAnalysis":
        case "PopulationRiskStatistics":
        case "ExposureSimulationPredict":
        case "riskTimePeriodAnalysisCrowd":
        case "TargetScenarioSimulation":
          this.fineDrawllution(params, method);
          break;
        case "IndividualRiskStatistic":
          this.drawIndividualRiskPoints(params);
          break;
        case "customRickHotRank":
          this.drawRiskHotRanPoints(params);
          break;
        case "IndividualRiskRank":
          this.drawIndiviRiskPoints(params);
          break;
        case "RiskChangeAnalysis":
          this.drawRiskChangePoints(params);
          break;
        case "riskLocationAnalysis":
          this.riskLocationAnalysis(params);
          break;
        case "riskTimePeriodAnalysisPersonal":
          this.riskTimePeriodAnalysis(params);
          break;
        case "drawPointFlash":
          this.drawPointFlash(params);
          break;
        case "guijiReplay":
          this.drawGuijiReplay(params);
          break;
        case "PollutantAnalysis":
          this.drawPieChart(params);
          break;
        case "TravelRiskAnalysis":
          this.travelRiskAnalysisLine(params);
          this.appConfig.mapView.zoom = 14;
          this.appConfig.mapView.center = [115.495048, 38.863144];
          break;
        /* case "TargetScenarioSimulation":
          this.PollutionControlSimulation(params);
          break; */
        case "PopExposureCalculation":
          this.drawLayetOfPop(params);
          break;
        case "PopExposureCalculation":
          this.drawLayetOfPop(params);
          break;
        case "goTo":
          this.goTo(params);
          break;
        default:
          break;
      }
    },
    checkReady() {
      return this.appConfig.mapView && this.appConfig.mapView.ready;
    },
    //定位
    goTo(target) {
      //[lon,lat]
      //target: Number[]|Geometry|Geometry[]|Graphic|Graphic[]|Viewpoint|Object
      // cdb 缩放至视野内
      var opts = {
        duration: 2000  // 动画延迟2秒
      };
      this.appConfig.mapView.goTo({
        target: target,
      }, opts);
      //this.appConfig.mapView.goTo(target);
    },
    getJobImageLayer(nongduId, renkouId) {
      var jobId = this.imageJobId[nongduId + renkouId];
      loadModules(["esri/tasks/Geoprocessor"]).then(([Geoprocessor]) => {
        this.gp[this.nongduId] = new Geoprocessor(this.serverUrl);
      });
      if (!jobId) {
        setTimeout(() => {
          this.getJobImageLayer(nongduId, renkouId);
        }, 1000);
        return;
      }
      var imageLayer = this.gp[this.nongduId].getResultMapImageLayer(jobId);
      imageLayer.opacity = 0.6;
      imageLayer.id = "wuran_chazhi";
      var layer = this.appConfig.mapView.map.findLayerById("wuran_chazhi");
      if (layer) {
        this.appConfig.mapView.map.remove(layer);
      }
      this.appConfig.mapView.map.add(imageLayer, 0);
    },
    drawPointFlash(params) {
      var point = { type: "point", longitude: params[0], latitude: params[1] };
      for (var i = 0; i < this.timeOut.length; i++) {
        clearTimeout(this.timeOut[i]);
      }
      this.timeOut = [];
      this.pointFlashGraphicsLayer.graphics.removeAll();

      var markerSymbol = {
        type: "picture-marker", // autocasts as new PictureMarkerSymbol()
        url: "http://211.159.186.65/subsystemold/images/ranking.png",
        width: "30px",
        height: "30px",
        xoffset: "0px",
        yoffset: "10px"
      };
      this.$emit("arcgisEvent_addGraphicPointsFlash", point, markerSymbol);
      this.goTo([point.longitude, point.latitude]);
      // this.goTo({target:[point.longitude,point.latitude],zoom:15});
      for (var i = 0; i < 8; i++) {
        this.timeOut.push(
          setTimeout(() => {
            this.pointFlashGraphicsLayer.visible = !this.pointFlashGraphicsLayer
              .visible;
          }, 1000 * i)
        );
        if (i == 7) {
          this.timeOut.push(
            setTimeout(() => {
              this.pointFlashGraphicsLayer.graphics.removeAll();
            }, 1000 * i)
          );
        }
      }
    },
    //人群暴露计算gp
    drawLayetOfPop(data) {
      console.log(data);
      if (!data) return;
      if (!this.checkReady()) {
        setTimeout(() => {
          this.drawLayetOfPop(data);
        }, 3000);
        return;
      }
      this.nongduId = data.nongduId;
      this.renkouId = data.renkouId;
      var jobId = this.imageJobId[this.nongduId + this.renkouId];
      if (jobId) {
        this.getJobImageLayer(this.nongduId, this.renkouId);
      } else {
        // let params = {timeType:this.timeFlag,pollutionType:zValue,datatime:datatime}
        this.$http.send(
          {
            url: this.$utils.api + "/pwel/cache/query",
            method: "POST",
            params: { nongduId: this.nongduId, renkouId: this.renkouId }
          },
          this,
          res => {
            var data = res.data;
            if (data) {
              this.imageJobId[this.nongduId + this.renkouId] = data;
            }
            var jobId = this.imageJobId[this.nongduId + this.renkouId];
            if (jobId) {
              this.getJobImageLayer(this.nongduId, this.renkouId);
            } else {
              //定义GP服务参数对象
              var gpParams = {};
              //添加点集合的字段信息
              gpParams["concentration_grid"] = JSON.stringify({
                url:
                  "http://211.159.186.65:19999/imageDownload/pollution/" +
                  this.nongduId
              });
              gpParams["population_grid"] = JSON.stringify({
                url:
                  "http://211.159.186.65:19999/imageDownload/crowd/" +
                  this.renkouId
              });
              this.$emit("drawChazhi", gpParams);

              // var points = [],
              //   attributes = [];
              // var i = 0;
              // datas.forEach(e => {
              //   points.push({ type: "point", longitude: e.jd, latitude: e.wd });
              //   attributes.push({ FID: i, Id: i, value: e[zValue] });
              //   i++;
              // });
              // if (points.length > 0)
              //   this.$emit("drawChazhi", points, attributes, zValue,datatime);
            }
            // this.getJobImageLayer(params.pollutionType,params.datatime)
          },
          true
        );
      }
    },
    //上传jobid
    upLoadJobIdInfo(params) {
      this.$http.send(
        {
          url: this.$utils.api + "/pwel/cache/addCache",
          params: params
        },
        this,
        res => {
          // console.log(res);
        },
        true
      );
    },
    //绘制轨迹
    drawGuiJi(data) {
     
      var startOrEndSymbol = {
        type: "picture-marker", // autocasts as new PictureMarkerSymbol()
        url: "",
        width: "40px",
        height: "40px",
        xoffset: "0px",
        yoffset: "20px"
      };
      

      var polylineSymbol = {
        type: "simple-line", // autocasts as SimpleLineSymbol()
        color: [226, 119, 40],
        width: 3
      };
      polylineSymbol.color=this.$utils.RouteColors[5];
      var popupTemplateOptions = {
        title: `人员：{username}`,
        content:
          `<br>
          <b>时间：</b>  {inTime}.`
      };
      this.$emit(
        "drawGraphicLines",
        data,
        polylineSymbol,
        startOrEndSymbol,
        popupTemplateOptions,
        true
      );
    },
    //绘制多个个体轨迹
    drawMultipleGuiJi(data) {
      this.guiJiGraphicsLayer.graphics.removeAll();
      data.forEach(e => {
        var startOrEndSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: "",
          width: "40px",
          height: "40px",
          xoffset: "0px",
          yoffset: "20px"
        };
        var polylineSymbol = {
          type: "simple-line", // autocasts as SimpleLineSymbol()
          color: [226, 119, 40],
          width: 4
        };
        var popupTemplateOptions = {
          title: "人员：{username}",
          content:
            "{changdu}</b><br>" +
            "<b>已走公里数：</b>  {changdu}公里.<br>" +
            "<b>时间：</b>  {itime}."
        };
        this.$emit(
          "drawMultipleGraphicLines",
          e,
          polylineSymbol,
          startOrEndSymbol,
          popupTemplateOptions
        );
      });
    },
    //轨迹回放点
    drawGuijiReplay(data) {
      //Create a symbol for drawing the point
      
      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };
      var points = [],
        markerSymbols = [],
        textSymbols = [];
      for (var key in data) {
        // for(var i=0;i<data[key].length;i++){
        data[key].forEach(e => {
          var point = { type: "point", longitude: e.lon, latitude: e.lat };
          points.push(point);
          var textSymbol = {
            type: "text", // autocasts as new TextSymbol()
            color: "black",
            haloColor: "black",
            haloSize: "1px",
            text: e.inTime,
            xoffset: 0,
            yoffset: 22,
            font: {
              // autocast as new Font()
              size: 10,
              family: "sans-serif",
              weight: "bolder"
            }
          };
          var markerSymbol = {
            type: "picture-marker",
            url: "http://211.159.186.65/subsystemold/aqi/loc-0-0-0.png",
            width: "40px",
            height: "40px",
            xoffset: "0px",
            yoffset: "10px"
          };
          textSymbols.push(textSymbol);
          markerSymbols.push(markerSymbol);
        });
        var popupTemplateOptions = {
          title: "姓名：{userName}",
          content:
            "<b>时间：</b> {timeDuring}</b><br>" +
            "<b>地点：</b>  {roadName} </b><br>"
        };
        this.$emit(
          "drawGuijiRepalyPoints",
          data,
          points,
          markerSymbols,
          textSymbols,
          popupTemplateOptions
        );
      }
    },
    // 绘制实时暴露测量和模拟暴露测量点
    drawRealTimePoints(datas) {
      if (!datas) return;
      if (!this.checkReady()) {
        setTimeout(() => {
          this.drawRealTimePoints(datas);
        }, 3000);
        return;
      }
      var markerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      };
      var colors = this.$utils.qualityColors;
      let data = datas.data;
      var points = [],
        markerSymbols = [],
        textSymbols = [];
      for (var i = 0; i < data.length; i++) {
        var point = {
          type: "point",
          longitude: data[i].lon,
          latitude: data[i].lat
        };
        points.push(point);
        var textSymbol = {
          type: "text",
          color: "",
          backgroundColor: "#ffffff",
          haloColor: "black",
          haloSize: "1px",
          text: "",
          xoffset: 0,
          yoffset: 22,
          font: {
            size: 10,
            family: "sans-serif",
            weight: "bolder"
          }
        };
        var picUrl = [];
        if (datas.type == "realTime") { // 个体的 如果是真实测量
          picUrl = this.$utils.markerSymbolsUrl(
            data[i],
            data[i].realTimeAeri.aeri,
            "aeri"
          );
          var index = this.$utils.getQualityFromAeri(data[i].realTimeAeri.aeri);
          textSymbol.color = colors[index];
          if (datas.moniCeliang) {// 判断是否是模拟测量
            textSymbol.text = data[i]["name"]+":"+data[i]["moniAeri"].aeri;
          } else {
            textSymbol.text = data[i]["name"]+":"+data[i]["realTimeAeri"].aeri;
          }
        } else { // 场景的
          if (!datas.moniCeliang) {//  不是模拟测量 
            picUrl = this.$utils.markerSymbolsUrl(
              data[i],
              data[i].moniAeri.aeri,
              "aeri"
            );
            var index = this.$utils.getQualityFromAeri(
              data[i].moniAeri.aeri,
              "aeri"
            );
            textSymbol.color = colors[index];
            textSymbol.text = data[i]["name"]+":"+data[i]["moniAeri"].aeri;
          } else { // poi场景  设置为符号
            //picUrl = this.$utils.markerSymbolsUrl(data[i], data[i].aqi, "aqi");
            picUrl = ["p","o","i"];
            var index = this.$utils.getQualityFromAeri(data[i].aqi);
            textSymbol.color = colors[index];
            textSymbol.text = data[i].aqi;
          }
        }
        var markerSymbol = {
          type: "picture-marker",
          url:
            "http://211.159.186.65/subsystemold/aqi/loc-" +
            picUrl[0] +
            "-" +
            picUrl[1] +
            "-" +
            picUrl[2] +
            ".png",
          width: picUrl[0] % 2 == 0 && picUrl[1] == 1 ? 40 : 40 + "px",
          height: picUrl[0] % 2 == 0 && picUrl[1] == 1 ? 40 : 40 + "px",
          xoffset: 0,//"-20px",
          yoffset: 5,//"-20px"
        };
        textSymbols.push(textSymbol);
        markerSymbols.push(markerSymbol);
      }
      // 设置弹出层
      var popupTemplateOptions = {
        title: "",
        content: this.getPopupContent("realtime-expose-measure", {
          type: datas.type,
          realTimeOrMoni: datas.moniCeliang
        })
      };
      this.$emit(
        "drawGraphicPoints",
        data,
        datas.type,
        points,
        markerSymbols,
        textSymbols,
        popupTemplateOptions
      );
    },
    //实时污染栅格数据 
    fineDrawllution(data, method) {
      if (!data) return;
      if (!this.checkReady()) {
        setTimeout(() => {
          this.fineDrawllution(data, method);
        }, 3000);
        return;
      }
      //this.$emit("fineDrawllution", data, method);
      // 采用新的地图调用 Mapservice 需要参数如下 datas.preUrl;datas.layerid;datas.title
      this.$emit("LoadMapService", data, method);
    },
    // 绘制个体风险统计点
    drawIndividualRiskPoints(params) {
      var data=params.da;
      var isCancer=params.iscancer;
      if (!data) return;
      if (!this.checkReady()) {
        setTimeout(() => {
          this.drawIndividualRiskPoints(params);
        }, 3000);
        return;
      }
      var markerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      };
      var points = [],
        markerSymbols = [],
        textSymbols = [];
      for (var i = 0; i < data.length; i++) {
        var point = {
          type: "point",
          longitude: data[i].jd,
          latitude: data[i].wd
        };
        points.push(point);
        var textSymbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "blue",
          haloColor: "black",
          haloSize: "1px",
          text: "",
          xoffset: 0,
          yoffset: 22,
          font: {
            // autocast as new Font()
            size: 10,
            family: "sans-serif",
            weight: "bolder"
          }
        };
        var picUrl = this.IndividualRiskSymbolsUrl(data[i]);
        var markerSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url:
            "http://211.159.186.65/subsystemold/fengxian/loc-" +
            picUrl[0] +
            "-" +
            picUrl[1] +
            ".png",
          width: picUrl[1] == 0 ? 30 : 50 + "px",
          height: picUrl[1] == 0 ? 30 : 50 + "px",
          xoffset: "0px",
          yoffset: "10px"
        };
        // 区分致癌和非致癌
        textSymbol.text = data[i].risk+"e-4";//10^-4
        if(!isCancer)
            textSymbol.text = data[i].risk;//10^-4
        textSymbols.push(textSymbol);
        markerSymbols.push(markerSymbol);
      }
      var popupTemplateOptions = {
        title: "",
        content: this.getPopupContent("individual-risk-static")
      };
      this.$emit(
        "drawIndividualRiskPoints",
        data,
        points,
        markerSymbols,
        textSymbols,
        popupTemplateOptions
      );
    },
    //个体风险点的颜色
    IndividualRiskSymbolsUrl(datas) {
      let agei = "",
        genderi = "",
        picUrl = [];
      if (datas.age <= 17) {
        agei = 0;
      } else if (datas.age > 17 && datas.age <= 40) {
        agei = 1;
      } else if (datas.age > 40 && datas.age <= 65) {
        agei = 2;
      } else if (datas.age > 65) {
        agei = 3;
      }
      if (datas.gender == "女") {
        genderi = 0;
      } else {
        genderi = 1;
      }
      picUrl.push(agei, genderi);
      return picUrl;
    },
    // 绘制风险热点排序点
    drawRiskHotRanPoints(data) {
      //Create a symbol for drawing the point
      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };
      var points = [],
        markerSymbols = [],
        textSymbols = [];
      for (var i = 0; i < data.length; i++) {
        var point = {
          type: "point",
          longitude: data[i].lon,
          latitude: data[i].lat
        };
        points.push(point);
        var textSymbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          text: "",
          xoffset: 0,
          yoffset: 6,
          font: {
            // autocast as new Font()
            size: 10,
            family: "sans-serif",
            weight: "bolder"
          }
        };
        // var picUrl= this.markerSymbolsUrl(data[i]["value"],data[i]);
        var markerSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: "http://211.159.186.65/subsystemold/images/ranking.png",
          width: "40px",
          height: "40px",
          xoffset: "0px",
          yoffset: "10px"
        };

        textSymbol.text = i + 1;
        textSymbols.push(textSymbol);
        markerSymbols.push(markerSymbol);
      }
      var popupTemplateOptions = {
        title: "{name}",
        content:
          "<b>地址：</b> {address}</b><br>" + "<b>风险值：</b>  {risk}<br>"
      };
      this.$emit(
        "drawRiskHotRanPoints",
        data,
        points,
        markerSymbols,
        textSymbols,
        popupTemplateOptions
      );
    },
    // 绘制个体风险热点排序点
    drawIndiviRiskPoints(data) {
      console.log(data);
      if (!data) return;
      if (!this.checkReady()) {
        setTimeout(() => {
          this.drawIndiviRiskPoints(data);
        }, 3000);
        return;
      }
      //Create a symbol for drawing the point
      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };
      var points = [],
        markerSymbols = [],
        textSymbols = [];
      for (var i = 0; i < data.length; i++) {
        var point = {
          type: "point",
          longitude: data[i].lon,
          latitude: data[i].lat
        };
        points.push(point);
        var textSymbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          text: i + 1,
          xoffset: 0,
          yoffset: 6,
          font: {
            // autocast as new Font()
            size: 10,
            family: "sans-serif",
            weight: "bolder"
          }
        };
        // var picUrl= this.markerSymbolsUrl(data[i]["value"],data[i]);
        var markerSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: "http://211.159.186.65/subsystemold/images/ranking.png",
          width: "40px",
          height: "40px",
          xoffset: "0px",
          yoffset: "10px"
        };
        textSymbols.push(textSymbol);
        markerSymbols.push(markerSymbol);
      }
      var popupTemplateOptions = {
        title: "",
        content: this.getPopupContent("indivi-risk-rank",data)
      };
      this.$emit(
        "drawRiskHotRanPoints",
        data,
        points,
        markerSymbols,
        textSymbols,
        popupTemplateOptions
      );
    },
    // 绘制风险变化分析点
    drawRiskChangePoints(datas) {
      //Create a symbol for drawing the point
      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };
      var points = [],
        markerSymbols = [],
        textSymbols = [];
      let data = datas.data;
      for (var i = 0; i < data.length; i++) {
        var point = {
          type: "point",
          longitude: data[i].lon,
          latitude: data[i].lat
        };
        points.push(point);
        var textSymbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          text: "",
          xoffset: 0,
          yoffset: 6,
          font: {
            // autocast as new Font()
            size: 10,
            family: "sans-serif",
            weight: "bolder"
          }
        };
        // var picUrl= this.markerSymbolsUrl(data[i]["value"],data[i]);
        var markerSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: "http://211.159.186.65/subsystemold/images/ranking.png",
          width: "40px",
          height: "40px",
          xoffset: "0px",
          yoffset: "10px"
        };
        textSymbol.text = i + 1;
        textSymbols.push(textSymbol);
        markerSymbols.push(markerSymbol);
      }
      let beginShijian = datas.beginTime;
      let endShijian = datas.endTime;
      var popupTemplateOptions = {
        title: "姓名：{userName}",
        content:
          "<b>地址：</b> {location}</b><br>" +
          "<b>时间：</b>" +
          beginShijian +
          " - " +
          endShijian +
          "</b><br>"
      };
      this.$emit(
        "drawRiskHotRanPoints",
        data,
        points,
        markerSymbols,
        textSymbols,
        popupTemplateOptions
      );
    },
    /* cdb 风险地点解析  个人 */
    riskLocationAnalysis(params) {
      var data=params.da;
      var isCancer=params.iscancer;
      if (!data) return;
      if (!this.checkReady()) {
        setTimeout(() => {
          this.riskLocationAnalysis(params);
        }, 3000);
        return;
      }
      var markerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      };
      var points = [],
        markerSymbols = [],
        textSymbols = [];
      for (var i = 0; i < data.length; i++) {
        var point = {
          type: "point",
          longitude: data[i].lon,
          latitude: data[i].lat
        };
        points.push(point);
        var textSymbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "blue",
          haloColor: "black",
          haloSize: "1px",
          text: "",
          xoffset: 0,
          yoffset: 22,
          font: {
            // autocast as new Font()
            size: 10,
            family: "sans-serif",
            weight: "bolder"
          }
        };
        var picUrl = this.IndividualRiskSymbolsUrl(data[i]);
        var markerSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: "http://211.159.186.65/subsystemold/fengxian/loc-0-1.png",
          width: picUrl[1] == 0 ? 30 : 50 + "px",
          height: picUrl[1] == 0 ? 30 : 50 + "px",
          xoffset: "0px",
          yoffset: "10px"
        };

        textSymbol.text = data[i].risk+"•e-4";
        if(!isCancer){
          textSymbol.text = data[i].risk;
        }
        textSymbols.push(textSymbol);
        markerSymbols.push(markerSymbol);
      }
      var popupTemplateOptions = {
        title: "风险地点解析",
        content: this.getPopupContent("risk-Location-Analysis")
      };
      this.$emit(
        "riskTimePeriodAnalysis",
        data,
        points,
        markerSymbols,
        textSymbols,
        popupTemplateOptions
      );
    },
    riskTimePeriodAnalysis(data) {
      if (!data) return;
      if (!this.checkReady()) {
        setTimeout(() => {
          this.riskTimePeriodAnalysis(data);
        }, 3000);
        return;
      }
      var markerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      };
      var points = [],
        markerSymbols = [],
        textSymbols = [];
      for (var i = 0; i < data.length; i++) {
        var point = {
          type: "point",
          longitude: data[i].lon,
          latitude: data[i].lat
        };
        points.push(point);
        var textSymbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "blue",
          haloColor: "black",
          haloSize: "1px",
          text: "",
          xoffset: 0,
          yoffset: 22,
          font: {
            // autocast as new Font()
            size: 10,
            family: "sans-serif",
            weight: "bolder"
          }
        };
        var picUrl = this.IndividualRiskSymbolsUrl(data[i]);
        var markerSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: "http://211.159.186.65/subsystemold/fengxian/loc-0-1.png",
          width: picUrl[1] == 0 ? 30 : 50 + "px",
          height: picUrl[1] == 0 ? 30 : 50 + "px",
          xoffset: "0px",
          yoffset: "10px"
        };
        textSymbol.text = data[i].risk;//+"•e-4";
        textSymbols.push(textSymbol);
        markerSymbols.push(markerSymbol);
      }
      var popupTemplateOptions = {
        title: "风险时段解析",
        content: this.getPopupContent("risk-Time-Period-Analysis")
      };
      this.$emit(
        "riskTimePeriodAnalysis",
        data,
        points,
        markerSymbols,
        textSymbols,
        popupTemplateOptions
      );
    },
    //联动
    goToZoomCenter(params) {
      this.appConfig.mapView.zoom = params.zoom;
      this.appConfig.mapView.center = params.center;
    },
    //卷帘
    getSimulation(methods, params) {
      switch (methods) {
        case "PollutionControlSimulation":
          //this.PollutionControlSimulation(params);
          this.fineDrawllution(params, methods);
          break;
        default:
          break;
      }
    },
    //污染管控仿真
    PollutionControlSimulation(data) {
      this.$emit("arcgisEvent_PollutionControlSimulation", data);
    },
    //气泡函数
    getPopupContent(popupType, data) {
      if (popupType == "realtime-expose-measure") {
        if (data.type == "realTime") { // 标识个体 的真实测量
          if (!data.realTimeOrMoni) { // 不是模拟测量
            return feature => {
              var data = feature.graphic.attributes;
              return (
                "<table><tr style='border-bottom:1px solid rgba(127, 127, 127, 0.6)'><td>地点：</td><td>" +
                data.street +
                "</td>" +
                "<td>时间</td><td>" +
                data.time +
                "</td></tr></table>" +
                "<table><tr style='border-bottom:1px solid rgba(127, 127, 127, 0.6);'><td>空气质量指数AQI：</td> <td> " +
                data.aqi +
                "<td>空气污染暴露指数AERI：</td> <td> " +
                data.realTimeAeri.aeri +
                "</table><table><tr><th style='width:20%;text-align:center;'>污染物</th><th style='width:40%;text-align: center;'>浓度</th><th style='width:40%;text-align: center;'>暴露量</th></tr>" +
                "<tr><td style='text-align:center;'>PM₂.₅：</td> <td style='text-align:center;'> " +
                data.pollutionData.pm25 +
                " ug/m³" +
                "</td> <td style='text-align:center;'> " +
                //data.realTimeAeri.pm25Aeri +
                data.moniExposure.pm25Exposure +
                "e-4 ug/(kg·min)" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>PM₁₀：</td> <td style='text-align:center;'> " +
                data.pollutionData.pm10 +
                " ug/m³" +
                "</td> <td style='text-align:center;'> " +
                //data.realTimeAeri.pm10Aeri +
                data.moniExposure.pm10Exposure +
                "e-4 ug/(kg·min)" +
                "</td></tr>" +
                "<td style='text-align:center;'>NO₂：</td> <td style='text-align:center;'> " +
                data.pollutionData.no2 +
                " ug/m³" +
                "</td> <td style='text-align:center;'> " +
                //data.realTimeAeri.no2Aeri +
                data.moniExposure.no2xposure +
                "e-4 ug/(kg·min)" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>SO₂：</td> <td style='text-align:center;'> " +
                data.pollutionData.so2 +
                " ug/m³" +
                "</td> <td style='text-align:center;'> " +
                //data.realTimeAeri.so2Aeri +
                data.moniExposure.so2Exposure +
                "e-4 ug/(kg·min)" +
                "</td></tr>" +
                "</td><td style='text-align:center;'>O₃：</td> <td style='text-align:center;'> " +
                data.pollutionData.o3 +
                " ug/m³" +
                "</td> <td style='text-align:center;'> " +
                //data.realTimeAeri.o3Aeri +
                data.moniExposure.o3Exposure +
                "e-4 ug/(kg·min)" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>CO：</td> <td style='text-align:center;'> " +
                data.pollutionData.co +
                " mg/m³" +
                "</td> <td style='text-align:center;'> " +
                data.moniExposure.coExposure +
                //data.realTimeAeri.coAeri +
                "e-4 mg/(kg·min)" +
                "</td></tr></table>"
              );
            };
          } else {
            return feature => {
              var data = feature.graphic.attributes;
              return (
                "<table><tr style='border-bottom:1px solid rgba(127, 127, 127, 0.6)'><td>地点：</td><td>" +
                data.street +
                "</td>" +
                "<td>时间</td><td>" +
                data.time +
                "</td></tr></table>" +
                "<table><tr style='border-bottom:1px solid rgba(127, 127, 127, 0.6);'><td>空气污染暴露指数AERI</td><td>实时：</td><td> " +
                data.realTimeAeri.aeri +
                "<td>模拟：</td> <td> " +
                data.moniAeri.aeri +
                "</table><table><tr><th style='width:20%;text-align:center;'>污染物</th><th style='width:40%;text-align: center;'>实时暴露量</th><th style='width:40%;text-align: center;'>模拟暴露量</th></tr>" +
                /* "<tr><td style='text-align:center;'>AQI：</td> <td style='text-align:center;'> " +
                data.moniExposure.aqi +
                "</td> <td style='text-align:center;'> " +
                data.realTimeExposure.aqi +
                "</td></tr>" + */
                "<tr><td style='text-align:center;'>PM₂.₅：</td> <td style='text-align:center;'> " +
                data.moniExposure.pm25Exposure +
                " e-4 ug/(kg·min)" +
                "</td> <td style='text-align:center;'> " +
                data.realTimeExposure.pm25Exposure +
                " e-4 ug/(kg·min)" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>PM₁₀：</td> <td style='text-align:center;'> " +
                data.moniExposure.pm10Exposure +
                " ug/(kg·min)" +
                "</td> <td style='text-align:center;'> " +
                data.realTimeExposure.pm10Exposure +
                " e-4 ug/(kg·min)" +
                "</td></tr>" +
                "<td style='text-align:center;'>NO₂：</td> <td style='text-align:center;'> " +
                data.moniExposure.no2xposure +
                " e-4 ug/(kg·min)" +
                "</td> <td style='text-align:center;'> " +
                data.realTimeExposure.no2xposure +
                " e-4 ug/(kg·min)" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>SO₂：</td> <td style='text-align:center;'> " +
                data.moniExposure.so2Exposure +
                " e-4 ug/(kg·min)" +
                "</td> <td style='text-align:center;'> " +
                data.realTimeExposure.so2Exposure +
                " e-4 ug/(kg·min)" +
                "</td></tr>" +
                "</td><td style='text-align:center;'>O₃：</td> <td style='text-align:center;'> " +
                data.moniExposure.o3Exposure +
                " e-4 ug/(kg·min)" +
                "</td> <td style='text-align:center;'> " +
                data.realTimeExposure.o3Exposure +
                " e-4 ug/(kg·min)" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>CO：</td> <td style='text-align:center;'> " +
                data.moniExposure.coExposure +
                " e-4 mg/(kg·min)" +
                "</td> <td style='text-align:center;'> " +
                data.realTimeExposure.coExposure +
                " e-4 mg/(kg·min)" +
                "</td></tr></table>"
              );
            };
          }
        } else if (data.type == "mock") {
          if (!data.realTimeOrMoni) {
            return feature => {
              var data = feature.graphic.attributes;
              return (
                "<table><tr style='border-bottom:1px solid rgba(127, 127, 127, 0.6)'><td>地点：</td><td>" +
                data.street +
                "</td>" +
                "<td>时间</td><td>" +
                data.time +
                "</td></tr></table>" +
                "<table><tr style='border-bottom:1px solid rgba(127, 127, 127, 0.6);'><td>空气质量指数AQI：</td> <td> " +
                data.aqi +
                "<td>空气污染暴露指数AERI：</td> <td> " +
                data.realTimeAeri.aeri +
                "</table><table><tr><th style='width:20%;text-align:center;'>污染物</th><th style='width:40%;text-align: center;'>模拟浓度</th><th style='width:40%;text-align: center;'>模拟暴露量</th></tr>" +
                "<tr><td style='text-align:center;'>PM₂.₅：</td> <td style='text-align:center;'> " +
                data.moniPollutionData.pm25 +
                " ug/m³" +
                "</td> <td style='text-align:center;'> " +
                data.moniExposure.pm25Exposure +
                " ug/(kg·min)" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>PM₁₀：</td> <td style='text-align:center;'> " +
                data.moniPollutionData.pm10 +
                " ug/m³" +
                "</td> <td style='text-align:center;'> " +
                data.moniExposure.pm10Exposure +
                " ug/(kg·min)" +
                "</td></tr>" +
                "<td style='text-align:center;'>NO₂：</td> <td style='text-align:center;'> " +
                data.moniPollutionData.no2 +
                " ug/m³" +
                "</td> <td style='text-align:center;'> " +
                data.moniExposure.no2xposure +
                " ug/(kg·min)" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>SO₂：</td> <td style='text-align:center;'> " +
                data.moniPollutionData.so2 +
                " ug/m³" +
                "</td> <td style='text-align:center;'> " +
                data.moniExposure.so2Exposure +
                " ug/(kg·min)" +
                "</td></tr>" +
                "</td><td style='text-align:center;'>O₃：</td> <td style='text-align:center;'> " +
                data.moniPollutionData.o3 +
                " ug/m³" +
                "</td> <td style='text-align:center;'> " +
                data.moniExposure.o3Exposure +
                " ug/(kg·min)" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>CO：</td> <td style='text-align:center;'> " +
                data.moniPollutionData.co +
                " mg/m³" +
                "</td> <td style='text-align:center;'> " +
                data.moniExposure.coExposure +
                " mg/(kg·min)" +
                "</td></tr></table>"
              );
            };
          } else {
            return feature => {
              var data = feature.graphic.attributes;
              return (
                "<table><tr style='border-bottom:1px solid rgba(127, 127, 127, 0.6)'><td>地点：</td><td>" +
                data.street +
                "</td></tr>" +
                "<tr style='border-bottom:1px solid rgba(127, 127, 127, 0.6)'><td>时间</td><td>" +
                data.time +
                "</td></tr></table>" +
                "<table><tr><th style='width:20%;text-align:center;'>污染物</th><th style='width:40%;text-align: center;'>模拟浓度</th></tr>" +
                "<tr><td style='text-align:center;'>AQI：</td> <td style='text-align:center;'> " +
                data.aqi +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>PM₂.₅：</td> <td style='text-align:center;'> " +
                data.pm25 +
                " ug/m³" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>PM₁₀：</td> <td style='text-align:center;'> " +
                data.pm10 +
                " ug/m³" +
                "</td></tr>" +
                "<td style='text-align:center;'>NO₂：</td> <td style='text-align:center;'> " +
                data.no2 +
                " ug/m³" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>SO₂：</td> <td style='text-align:center;'> " +
                data.so2 +
                " ug/m³" +
                "</td></tr>" +
                "</td><td style='text-align:center;'>O₃：</td> <td style='text-align:center;'> " +
                data.o3 +
                " ug/m³" +
                "</td></tr>" +
                "<tr><td style='text-align:center;'>CO：</td> <td style='text-align:center;'> " +
                data.co +
                " mg/m³" +
                "</td></tr></table>"
              );
            };
          }
        }
      } else if (popupType == "individual-risk-static") {
        return feature => {
          var data = feature.graphic.attributes;
          return (
            "<table><tr ><td style='text-align:center;'>地点：</td><td style='text-align:center;'>" +
            data.streetName +
            "</td></tr>" +
            "<tr><td style='text-align:center;'>时间：</td><td style='text-align:center;'>" +
            data.time +
            "</td></tr>" +
            "<tr><td style='text-align:center;'>致癌风险：</td> <td style='text-align:center;'> " +
            data.risk0 +
            "·e<sup>-4</sup></td></tr>" +
            "<tr><td style='text-align:center;'>非致癌风险：</td> <td style='text-align:center;'> " +
            data.risk1 +
            "</td></tr></table>"
          );
        };
      } else if (popupType == "indivi-risk-rank") {
        return feature => {
          var attr = feature.graphic.attributes;
          return (
            "<table><tr><td style='text-align:center;'>地点：</td><td style='text-align:center;'>" +
            attr.streetName +
            "</td></tr>" +
            // "<tr><td style='text-align:center;'>时间</td><td style='text-align:center;'>" +data.time+ "</td></tr>" +
            "<tr><td style='text-align:center;'>风险值：</td> <td style='text-align:center;'> " +
            attr.risk  +"</td></tr></table>"
          );
        };
      } else if (popupType == "risk-Time-Period-Analysis") {
        return feature => {
          var data = feature.graphic.attributes;
          return (
            "<table><tr><td style='text-align:center;'>时间：</td><td style='text-align:center;'>" +
            data.time +
            "</td></tr>" +
            // "<tr><td style='text-align:center;'>时间</td><td style='text-align:center;'>" +data.time+ "</td></tr>" +
            "<tr><td style='text-align:center;'>风险值：</td> <td style='text-align:center;'> " +
            data.risk /* +"·e<sup>-4</sup>" */+"</td></tr></table>"
          );
        };
      }else if (popupType == "risk-Location-Analysis") {
        return feature => {
          var data = feature.graphic.attributes;
          return (
            "<table><tr><td style='text-align:center;'>地点：</td><td style='text-align:center;'>" +
            data.whjType +
            "</td></tr>" +
            // "<tr><td style='text-align:center;'>时间</td><td style='text-align:center;'>" +data.time+ "</td></tr>" +
            "<tr><td style='text-align:center;'>风险值：</td> <td style='text-align:center;'> " +
            data.risk +
            "·e<sup>-4</sup></td></tr></table>"
          );
        };
      }
    },
    drawPieChart(data) {
      this.$utils.clearOverlay();
      var options = data.data;
      //加载
      loadModules(["echarts3Layer/Echarts3Layer"]).then(([Echarts3Layer]) => {
        options.forEach((option, index) => {
          var overlay = new Echarts3Layer(
            this.appConfig.mapView,
            echarts3,
            "chartId_" + index
          );
          var chartsContainer = overlay.getEchartsContainer();
          overlay.initECharts(chartsContainer);
          overlay.setOption(option, true);
        });
      });
    },
    //绘制污染物解析饼图 --- 原来的
    drawPieChartBefore(data) {
      this.$refs.myEcharts.drawPieChart(data, this.appConfig.mapView);
      let colors = this.$utils.sixWuRanwuColors;
      this.colors = [];
      for (var key in colors) {
        this.colors.push({ name: key, color: colors[key] });
      }
      this.legendTitle = "";
      this.legendShow = false;
      this.chartLegendShow = true;
    },
    //绘制污染物来源解析饼图
    drawPieSourcesChart(data) {
      this.$refs.myEcharts.drawPieSourcesChart(data, this.appConfig.mapView);
      let colors = this.$utils.sixWuRanwuColors;
      this.colors = [];
      for (var key in colors) {
        this.colors.push({ name: key, color: colors[key] });
      }
      this.legendTitle = "";
      this.legendShow = false;
      this.chartLegendShow = true;
    },
    refreshChart() {
      this.$refs.myEcharts.refreshChart(this.appConfig.mapView);
    },
    //出行轨迹路线规划
    travelRiskAnalysisLine(data) {
      this.$emit("arcgisEvent_TravelRiskAnalysis", data);
    },
    //出行轨迹路线规划 -- 原来的
    drawTravelModeRiskPoints(data) {
      this.guiJiGraphicsLayer.graphics.removeAll();
      data.forEach(e => {
        var startOrEndSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: "",
          width: "40px",
          height: "40px",
          xoffset: "0px",
          yoffset: "20px"
        };

        var popupTemplateOptions = {
          title: "人员：{username}",
          content:
            "{changdu}</b><br>" +
            "<b>已走公里数：</b>  {changdu}公里.<br>" +
            "<b>时间：</b>  {itime}."
        };
        this.$emit(
          "drawGraphicLinesOfOut",
          e.path,
          startOrEndSymbol,
          popupTemplateOptions,
          false
        );
      });
    }
  },
  watch: {
    $route(to, from) {
      this.appConfig.mapView.map.removeAll();
      this.$refs.myEcharts.clearChartDiv();
      this.colors = [];
      this.chartLegendShow = false;
      this.legendShow = false;
      //this.appConfig.mapView.map.removeAll();
      this.$utils.clearOverlay();
      this.appConfig.mapView.zoom = 12;
      this.appConfig.mapView.center = [115.459812, 38.873716];
      this.appConfig.mapView.popup = null;
    }
  }
};
</script>

<style scoped>
.HomeButton {
  position: absolute;
  top: 184px;
  left: 271px;
  z-index: 10;
}
.esriSimpleSliderTL {
  top: 10px !important;
}
.map {
  height: 100%;
}
.tablePopup {
  border-bottom: 1px solid rgba(127, 127, 127, 0.6);
}
.toolbox {
  background: #fff;
  position: absolute;
  z-index: 100;
  right: 2%;
  margin-top: 0.5%;
}
.toolbox > div {
  float: left;
  padding: 10px;
}
.toolimg {
  width: 20px;
  height: 20px;
}
.tooltext {
  font-size: 1.3em;
}
.textdiv {
  cursor: pointer;
}
.seperatorLine {
  border-right: 2px #dbdee2 dashed;
  padding: 0 12px;
}

@media (max-width: 768px) {
  .toolbox {
    font-size: 0.4em;
    right: 3%;
  }
  .toolbox > div {
    float: left;
    padding: 4px;
  }
  .toolimg {
    width: 10px;
    height: 10px;
  }
  .esriSimpleSliderTL {
    top: 33px !important;
    left: 6px;
  }
}
.chartlegendStyle {
  display: inline-block;
  margin: 2px 5px;
  border-radius: 10px;
  width: 10px;
  height: 10px;
}
.chartLegendDiv {
  float: right;
  right: 0;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
}
</style>

