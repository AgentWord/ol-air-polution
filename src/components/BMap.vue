<template>
    
    <div class="pc-map">
        
       <!--  <Button @click="SearchRoute" >单轨迹查询</Button>
        <Button @click="RefreshMap" >刷新</Button>
        <Button @click="CommonTest" >轨迹加载</Button>
        <Button @click="play" >轨迹回放</Button>
        <Button @click="RoutePause" >轨迹暂停</Button> -->
        <div class="tools">
              <transition name="fade" v-if="showRouterView">
                <router-view @excutemethods="excuteChangeMethods"></router-view>
              </transition>
            </div>
        <div id="allmap" class="allmap">
            
          
          </div> 
        
    </div>
</template>

<script>
import BMap from 'BMap'
export default {
    name: 'BMap',
    props: {
    showRouterView: {
      type: Boolean,
      default: true
      },
    },
    data () {
        return {
        msg: 'Welcome to Your Vue.js App',
        points:[],
        index:0,
        label:"",
        car:"",
        map:"",
        timer:"",
        infoArr:[]
        }
    },
    mounted () {
        /**================================================= 地图初始化 start ============================================*/
        this.map = new BMap.Map("allmap",{enableMapClick:false});    // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(115.496181,38.882685), 12);  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        this.map.addControl(new BMap.MapTypeControl({
            mapTypes:[
                BMAP_NORMAL_MAP,
                BMAP_HYBRID_MAP
            ]}));     
        this.map.setCurrentCity("保定市");          // 设置地图显示的城市 此项是必须设置的
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        /**================================================= 地图初始化 end ============================================*/
        
        /**================================================= 添加信息窗口 start ============================================*/
        var opts = {    
            width : 250,     // 信息窗口宽度    
            height: 100,     // 信息窗口高度    
            title : "Hello"  // 信息窗口标题   
        }

        var infoWindow = new BMap.InfoWindow("World", opts);  // 创建信息窗口对象    
        //map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口

        /* 绘制轨迹监听函数 */
        this.$on("DrawRouteHandler",function(data,bmap=this.map,utils=this.utils,vm=this){
           vm.index=0;
           vm.points=[];
           var coorArr=data.coorArr;
           var name =data.name;
           var chartData = [];
           var tempPoint=null;
           bmap.clearOverlays();
           var walking = new BMap.WalkingRoute(bmap, {
            renderOptions : { map: bmap, autoViewport: false}// 不缩放地图
          });
          walking.disableAutoViewport();
          for (let i = 0; i < coorArr.length-1; i++) {
             const element = coorArr[i];
             const element2 = coorArr[i+1];
             var startpoint = new BMap.Point(element.lon, element.lat);
             var endpoint = new BMap.Point(element2.lon, element2.lat);
             tempPoint=endpoint;
             //vm.infoArr.push({"time":element.inTime});
             walking.search(startpoint, endpoint);
             walking.setSearchCompleteCallback(function(rs) {
                var abc = rs;
                var pts = walking.getResults().getPlan(0).getRoute(0).getPath();
                pts.forEach(item => {
                  item.name=name;
                  vm.points.push(item);
                });
                
                bmap.addOverlay(new BMap.Polyline(pts, {
                  strokeColor : "green",
                  strokeWeight : 2,
                  strokeOpacity : 1
                }));
              });
           }
           var beginMap= new BMap.Point(coorArr[0].lon, coorArr[0].lat);
           
           //bmap.panTo(tempPoint);
           setTimeout(() => {
              //walking.enableAutoViewport();
              walking.search(beginMap, tempPoint);
              bmap.setViewport([beginMap, tempPoint]);// 将视图缩放至起始点
            }, 5000);
            vm.label = new BMap.Label("", {offset: new BMap.Size(-40, -50)});
            vm.car = new BMap.Marker(beginMap);
            vm.car.setLabel(vm.label);
            bmap.addOverlay(vm.car);  
          //  coorArr.forEach(element => {
          //     var firstPoint = new BMap.Point(element.lon, element.lat);
          //     var m1 = new BMap.Marker(firstPoint);
          //     bmap.addOverlay(m1);
          //  });
           // 
        });

        this.$on("RouteReplayHandler",function(data,bmap=this.map,utils=this.utils){
           var walking = new BMap.WalkingRoute(bmap, { renderOptions: { map: bmap, autoViewport: true} });
           var startpoint = new BMap.Point(115.47392282090003, 38.87209080424058);
           var secondPoint = new BMap.Point(115.47973180849692, 38.87796496732933);
           var endpoint=new BMap.Point(115.47431889644702, 38.87460132909767);
           walking.search(startpoint, secondPoint);
           //walking.search(secondPoint, endpoint);
           //通过setSearchCompleteCallback回调事件可以把步行间的坐标信息获取
           walking.setSearchCompleteCallback(function (rs) {
              this.points = walking.getResults().getPlan(0).getRoute(0).getPath();
              //画面移动到起点和终点的中间
              var centerPoint = new BMap.Point((this.points[0].lng + this.points[this.points.length - 1].lng) / 2, (this.points[0].lat + this.points[this.points.length - 1].lat) / 2);
              bmap.panTo(centerPoint);
              //连接所有点
              bmap.addOverlay(new BMap.Polyline(this.points, {strokeColor: "green", strokeWeight: 5, strokeOpacity: 1}));
              
              //显示小车子
              vm.label = new BMap.Label("", {offset: new BMap.Size(-20, -20)});
              vm.car = new BMap.Marker(this.points[0]);
              vm.car.setLabel(vm.label);
              bmap.addOverlay(vm.car);            

          }); 

        });
        // 测试方法
        this.$on("TestHandler",function(data,bmap=this.map,utils=this.utils,vm=this){
           var walking = new BMap.WalkingRoute(bmap, { renderOptions: { map: bmap, autoViewport: true} });
           var startpoint = new BMap.Point(115.47392282090003, 38.87209080424058);
           var secondPoint = new BMap.Point(115.47973180849692, 38.87796496732933);
           var endpoint=new BMap.Point(115.47431889644702, 38.87460132909767);
           walking.search(startpoint, secondPoint);
           //walking.search(secondPoint, endpoint);
           //通过setSearchCompleteCallback回调事件可以把步行间的坐标信息获取
           walking.setSearchCompleteCallback(function (rs) {
              var pts = walking.getResults().getPlan(0).getRoute(0).getPath();
               pts.forEach(item => {
                  item.time="2019-09-06 00:00:00";
                  vm.points.push(item);
                });
              //画面移动到起点和终点的中间
              var centerPoint = new BMap.Point((vm.points[0].lng + vm.points[vm.points.length - 1].lng) / 2, (vm.points[0].lat + vm.points[vm.points.length - 1].lat) / 2);
              bmap.panTo(centerPoint);
              //连接所有点
              bmap.addOverlay(new BMap.Polyline(vm.points, {strokeColor: "green", strokeWeight: 5, strokeOpacity: 1}));
              
              //显示小车子
              vm.label = new BMap.Label("", {offset: new BMap.Size(-40, -50)});
              vm.car = new BMap.Marker(vm.points[0]);
              vm.car.setLabel(vm.label);
              bmap.addOverlay(vm.car);              

          }); 

        });
    },
    methods:{
      CommonTest() {
          this.$emit("TestHandler");
         // this.$Message.success(this.msg);
         //this.SearchRoute();
      },
      excuteChangeMethods(method, params) {
        switch (method) {
          case "DrawSingleRoute":
            this.$emit("DrawRouteHandler",params);// 轨迹查询
            break;
          case "RouteReplay":
            this.play();
            break;
          case "RouteReplayPause":
            window.clearTimeout(this.timer);
            break;

          default:
            break;
        }
      },
      /* 回放轨迹 */
      play(){
          //this.index=0;
          
          var point = this.points[this.index];
          if(this.index > 0) {
            //this.map.addOverlay(new BMap.Polyline([this.points[this.index - 1], point],{strokeColor: "green", strokeWeight: 5, strokeOpacity: 1}));
          }
          this.label.setContent("人员："+point.name+"<br>经度: " + point.lng + "<br>纬度: " + point.lat);
          this.car.setPosition(point);
          this.index++;
          
          this.map.panTo(point);
          
          if(this.index < this.points.length) {
            this.timer=setTimeout(() => {
 
              this.play();
          
            }, 1000);

            /* this.timer = window.setTimeout(function(){
              play();
            },1000); */
          } else {
            
            this.map.panTo(point);
          }
      },
      RefreshMap(){
        this.map.clearOverlays();
        window.clearTimeout(this.timer);
        this.index=0;
        this.map.centerAndZoom(new BMap.Point(115.459812, 38.873716), 13); 
      },
      RoutePause(){
        window.clearTimeout(this.timer);
      },
      /* 查找轨迹的请求 */
      SearchRoute(){
        const params={
          userids: 1,
          beginTime: "2019-09-06 00:00:00",
          endTime: "2019-09-07 23:59:59"
        }
        this.$http.send({
          url: this.$utils.api +"/travelReplay/trackPlayback", 
          method:"POST",
          params:params
          }, this, res => {
          var data = res.data;
          this.guijiData = [];
          this.guijiData = data; 
          for(var item in data){
            var coorArr=data[item];
            this.$emit("DrawRouteHandler",{coorArr:coorArr,name:item });
          }
          });

      }
    },
    watch:{
      $route:"RefreshMap"

    }
    
}
</script>

<style scoped>
#allmap {
    height: 100vh;
}
.tools {
  position: absolute;
  z-index: 1;
  right: 10px;
  width: 100%;
}
</style>