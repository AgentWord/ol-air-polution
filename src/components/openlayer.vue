<template>
  <div id="map">
    <!-- <div class="toolbar">
    <Button type="primary" @click="StartMapOnceClick()">{{btn1}}</Button>
    <Button type="primary" @click="TravelWayRiskAnalysis()">{{btn2}}</Button>
    <Button type="primary" @click="CommonTest()">{{btn3}}</Button>
    
    </div>-->
    <div class="tools">
      <transition name="fade" v-if="showRouterView">
        <router-view @excutemethods="excuteChangeMethods" ref="toolbar"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import Image from "ol/layer/Image";
import VectorLayer from "ol/layer/Vector";

import { fromLonLat, transform } from "ol/proj.js";
import Projection from "ol/proj/Projection.js";

import XYZ from "ol/source/XYZ";
import ImageWMS from "ol/source/ImageWMS";
import TileWMS from "ol/source/TileWMS";
import VectorSource from "ol/source/Vector";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

import "ol/ol.css";
export default {
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
      btn1: "选择起点",
      btn2: "风险解析",
      btn3: "test",
      start: false, // 标识启动起止点选择
      startPoint: [], // 存起点坐标
      endPoint: [], // 存 终点坐标
      tempPoint:[],// 临时存储
      riskType: "0"
    };
  },
  mounted() {
    var format = "image/png";
    // 路网数据
    this.tiled = new TileLayer({
      /* visible: false, */
      source: new TileWMS({
        url: this.$utils.roadServiceUrl,
        params: {
          FORMAT: format,
          VERSION: "1.1.1",
          tiled: true,
          LAYERS: "cite:bdroad",
          exceptions: "application/vnd.ogc.se_inimage",
          tilesOrigin: 12838504 + "," + 4691152.5
        }
      })
    });
    // 路网数据 图片
    this.untiled = new Image({
      source: new ImageWMS({
        ratio: 1,
        url: this.$utils.roadServiceUrl,
        params: {
          FORMAT: format,
          VERSION: "1.1.1",
          LAYERS: "cite:bdroad",
          exceptions: "application/vnd.ogc.se_inimage"
        }
      })
    });
    // 天地图数据
    var tian_di_tu_road_layer = new TileLayer({
      title: "天地图路网",
      source: new XYZ({
        url:
          "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=401cb3e4aa8500aad525ea9b23e037c3"
      })
    });
    var tian_di_tu_annotation = new TileLayer({
      title: "天地图文字标注",
      source: new XYZ({
        url:
          "http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=401cb3e4aa8500aad525ea9b23e037c3"
      })
    });
    let center = fromLonLat([115.459812, 38.873716], "EPSG:3857");
    console.log(center);

    // 定义地图
    this.map = new Map({
      target: "map",
      layers: [tian_di_tu_road_layer,tian_di_tu_annotation, this.tiled], // tian_di_tu_road_layer
      view: new View({
        projection: "EPSG:3857", //使用这个坐标系 默认3857
        zoom: 12,
        center: center //[115.459812, 38.873716]
      })
    });
    // 添加一个点注记
    /** 设置点图层 */
    this.markVectorSource = new VectorSource();
    this.markVectorLayer = new VectorLayer({
      source: this.markVectorSource
    });
    this.map.addLayer(this.markVectorLayer);
    this.map.on("rendercomplete", this.MapRenderComplete);
   
  },
  methods: {
    CommonTest() {
      this.map.updateSize();
    },
    excuteChangeMethods(method, params) {
      switch (method) {
        case "StartMapOnceClick":
          this.StartMapOnceClick();// 执行工具条中的方法进行按钮切换？
          break;
        case "TravelWayRiskAnalysis":
          this.TravelWayRiskAnalysis(params);
          break;
        case "Refresh":
          this.PointLayerClear();
          // 路网重新加载
          this.RefreshRoadNet(null);
          break;
        case "PositionOnSearch":
          this.PositionOnSearch(params);
          break;
        case "exchangeStart2End":
          this.changeStart2End();
          break;
        default:
          break;
      }
    },
    MapRenderComplete() {
      this.map.updateSize();
    },
    AddRoad() {
      this.map.addLayer();
    },
    // 启动地图的点击事件
    StartMapClick() {
      this.map.on("singleclick", this.MapClick);
    },
    StartMapOnceClick() {
      this.map.once("singleclick", this.MapClick); // once 只监听一次
    },
    // 关闭地图的点击事件
    EndMapClick() {
      this.map.un("singleclick", this.MapClick);
    },
    
    // 地图点击事件
    MapClick(e) {
      // todo
      
      if (!this.start) {
        // 添加一个起点
        this.AddOnePoint(e.coordinate);
        this.startPoint = e.coordinate;
        this.endPoint = []; // 清空终点
        this.start = true; // 开启start
        this.btn1 = "选择终点"; // 按钮提示更换
      } else {
        // 添加一个终点
        this.AddOnePoint(e.coordinate, "../../static/images/endPoint.png");
        this.endPoint = e.coordinate;
        this.start = false; // 关闭start
        this.btn1 = "选择起点"; // 按钮提示更换
      }
    },
    // 坐标转换
    transferCoor(lon, lat) {
      var m_center = [lon, lat];
      return transform(m_center, "EPSG:4326", "EPSG:3857");
    },
    // 搜索匹配时 进行定位
    PositionOnSearch(params){
      // 自定义热点解析坐标 格式为：data.location={lat:,lng:};
      var lng=params.coor.location.lng;
      var lat=params.coor.location.lat;
      // 坐标转换为openlayer坐标
      var coor=this.transferCoor(lng,lat);

      this.CreateOrUpdatePoint(coor,params.isStart)
      // if (!this.start) {
      //   // 添加一个起点
      //   this.AddOnePoint(coor);
      //   this.startPoint = coor;
      //   this.endPoint = []; // 清空终点
      //   this.start = true; // 开启start
      //   //this.btn1 = "选择终点"; // 按钮提示更换
      // } else {
      //   // 添加一个终点
      //   this.AddOnePoint(coor, "/static/images/endPoint.png");
      //   this.endPoint = coor;
      //   this.start = false; // 关闭start
      // }
      
    },
    // 切换起止点
    changeStart2End(){
      this.markVectorSource.clear();//清空起始点
      // 添加一个起始点
      this.AddOnePoint(this.endPoint);
      this.tempPoint=this.startPoint;
      this.startPoint=this.endPoint;
      this.start=true;
      this.AddOnePoint(this.tempPoint, "/static/images/endPoint.png");
      this.endPoint=this.tempPoint;
      this.start=false;


    },
    // 路网图层的刷新
    RefreshRoadNet(filter) {
      this.tiled.getSource().updateParams({ CQL_FILTER: filter });
    },
    // 重置路网数据
    ResetRoadNet() {
      this.tiled.getSource().updateParams({ CQL_FILTER: null });
    },
    // 添加一个起点
    AddOnePoint(point, imgsrc = "../../static/images/startPoint1.png") {
      var iconFeature = new Feature({
        geometry: new Point(point) //纬度 经度
      });
      var markSettings = {
        markAnchor: [0.5, 0.5],
        markImage: imgsrc
      };
      var iconStyle = new Style({
        image: new Icon({
          anchor: markSettings.markAnchor, //点图片偏移量
          src: markSettings.markImage, //图片路径
          scale: 0.15
        })
      });
      iconFeature.setStyle(iconStyle);
      // 如果开启了start 则不清空图层
      if (!this.start) {
        this.markVectorSource.clear();
      }

      this.markVectorSource.addFeature(iconFeature);
    },

    // 修改或者创建起点。
    CreateOrUpdatePoint(pointCoor,isStart){
      let imgsrc = "/static/images/startPoint1.png" // 默认起点的图片
      let featrueArr = this.markVectorSource.getFeatures();
      let featureId = "start";
      if(!isStart){
        imgsrc = "/static/images/endPoint.png";// 默认终点的图标
        // 如果是终点 那么图层中的第二个元素必须清除
        if(featrueArr.length > 1){
           //this.markVectorSource.removeFeature(featrueArr[1]);
           let endFeature = this.markVectorSource.getFeatureById("end");
           this.markVectorSource.removeFeature(endFeature);
        }
        
        this.endPoint = pointCoor;
        featureId = "end";
      }
      else{
        // 只要是起点  就需要清空图层  路网刷新  气泡消失  但是 如果是修改起点呢？ 那就不能清空图层，需保留终点存在
        //this.markVectorSource.clear();
        if(featrueArr.length > 0)
            this.markVectorSource.removeFeature(this.markVectorSource.getFeatureById("start"));
        this.ResetRoadNet()
        //document.getElementById('popup').style.display="none";
        // 给起点数组赋值
        this.startPoint = pointCoor;
      }
      let iconFeature = new Feature({
        geometry: new Point(pointCoor), //纬度 经度
        
      });
      let markSettings = {
        markAnchor: [0.5, 0.5],
        markImage: imgsrc
      };
      let iconStyle = new Style({
        image: new Icon({
          anchor: markSettings.markAnchor, //点图片偏移量
          src: markSettings.markImage, //图片路径
          scale: 0.15
        })
      });
      iconFeature.setStyle(iconStyle); // 渲染一个点的样式
      // 设置这个图层的 id 
      iconFeature.setId(featureId)
      // 向图层中添加这个点

      this.markVectorSource.addFeature(iconFeature);
    },


    PointLayerClear() {
      this.markVectorSource.clear();
      this.startPoint = this.endPoint = [];
    },
    // 出行方式风险解析
    TravelWayRiskAnalysis(paramsObj) {
      // 判断起止点是否有值
      if (this.startPoint.length <= 0) {
        this.$Message.warning("请在地图选择出行起点");
        return;
      }
      if (this.endPoint.length <= 0) {
        this.$Message.warning("请在地图选择出行终点");
        return;
      }
      let params = {
        startX: this.startPoint[0],
        startY: this.startPoint[1],
        endX: this.endPoint[0],
        endY: this.endPoint[1],
        risk: paramsObj.riskType
      };
      console.log("I am here");
      this.$http.send(
        {
          url: this.$utils.IP + "/risk/tripModeAnalysis",
          method: "POST",
          params: params
        },
        this,
        res => {
          let data = res.data;
         
          if (res.success) {
            
            let filter = `objectid_1 in (${data.shortest.edgeIds},${data.health.edgeIds})`;
            if(paramsObj.riskStyle=="health"){
               filter = `objectid_1 in (${data.health.edgeIds})`;
            }
            if(paramsObj.riskStyle=="short"){
               filter = `objectid_1 in (${data.shortest.edgeIds})`;
            }
            this.RefreshRoadNet(filter); // 绘制路网
            this.$refs.toolbar.getData(data,paramsObj.riskStyle);
          }
        }
      );
    }
  }
};
</script>

<style>
.ol-zoom {
  display: none !important;
}
#map {
  height: 100%;
  overflow: hidden;
}
.toolbar {
  position: absolute;
  z-index: 1;
}
.tools {
  position: absolute;
  z-index: 1;
  right: 10px;
  width: 50%;
}
</style>
