<style lang="less">
.ivu-table td, .ivu-table th{
  height: 33px;
}
</style>

<template>
  <div>
    <div class="toolbox">
      <!-- <Select v-model="riskType" style="width:120px;" @on-change="changeRiskType">
            <Option value="0">致癌风险</Option>
            <Option value="1">非致癌风险</Option>
      </Select> -->
      <searchbar ref="startPlace" @on-select="selectValue1"></searchbar>
      <Icon type="arrow-swap" size="18" @click="changeSwap" ></Icon>
      <searchbar ref="endPalce" @on-select="selectValue2"></searchbar>
      <!-- <Button  type="info" @click="StartSelectPoint()">{{btn1}}</Button>
      <Button  type="error" @click="StartSelectPoint()">{{btn4}}</Button> -->

      <Button type="primary" icon="ios-analytics" @click="TravelWayRiskAnalysis()">{{btn2}}</Button>
      <Button type="primary" icon="ios-refresh" @click="Refresh()">{{btn3}}</Button>
    </div>
    
    <Dropdown trigger="custom" :visible="visible" style="margin-top:40px;float:right">
     
          <DropdownMenu slot="list" >
             <a href="#"  class="ol-popup-closer" @click="handleClose"></a>
              <!-- <div  class="rankTab"> -->
                
                    <Button type="success" @click="TravelHealthWayRiskAnalysis" >健康路径</Button>
                    <Button type="warning" @click="TravelShortestWayRiskAnalysis" >最短路径</Button>
                    <Button  type="primary" @click="TravelWayRiskAnalysis" >全部</Button>
                
                
              
                <Table  border :columns="tableColumns" :data="data1"></Table>
              <!-- </div> -->
          </DropdownMenu>
      </Dropdown>
    
    
    

  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
import searchbar from "../../components/base/search-bar.vue";
export default {
  components:{
    searchbar,
  },
  data(){
    return{
      btn1:"选择起点",
      btn2:"风险解析",
      btn3:"重置",
      riskType:'0',
      //butType1:"info",
      btn4:"选择终点",

      formInline: {
        startPoint: {},
        endPoint: {},
        riskType:'0',
      },
      
      visible:true,
      
      subVisible:false,
      tableColumns:[],
      subColumns:[],
      data1:[],
      subData:[],
      subId:0,
      routeId:0,
      startSelected:false,
      endSelected:false,
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.columsInit()
    },
    StartSelectPoint(){
        this.$emit("excutemethods","StartMapOnceClick");// 启动地图的点选;
    },
    TravelWayRiskAnalysis(){
      this.$emit("excutemethods","TravelWayRiskAnalysis",{riskType:this.riskType,riskStyle:"all"});
      //this.visible=true;
    },
    TravelHealthWayRiskAnalysis(){
        this.$emit("excutemethods","TravelWayRiskAnalysis",{riskType:this.riskType,riskStyle:"health"});       
    },
    TravelShortestWayRiskAnalysis(){
        this.$emit("excutemethods","TravelWayRiskAnalysis",{riskType:this.riskType,riskStyle:"short"});       
    },
    Refresh(){
      this.$emit("excutemethods","Refresh");// 刷新;
      this.visible=false;
      //清空起始点位置
      this.$refs.startPlace.clear();
      this.$refs.endPalce.clear();
    },
    // 初始化表头
    columsInit () {
      let riskTitle = this.changeRiskType() + '值'
      this.tableColumns = []
      this.tableColumns.splice(2, 3,
        
        { title:"方式", key:"type", align: 'center',minWidth:80},
        { title:"路径类型", key:"style", align: 'center',minWidth:100},
        { title:"距离(公里)", key:"distance", align: 'center', minWidth:100},
        { title:"预计用时(分钟)", key:"time", align: 'center', minWidth:100},
        { title: "暴露风险值(AERI)" , key:"risk", align: 'center',minWidth:120},
        
      )
    },
    selectValue1(selectedItem) {
      this.formInline.startPoint = selectedItem;
      this.formInline.startPointName = selectedItem.name;
      this.$emit("excutemethods","PositionOnSearch",{coor:selectedItem,isStart:true});
      //如果选中了 那么设置为ture
      // if(!this.startSelected){
      //   this.startSelected=true;
      // }else{ // 否则为第二次修改  那么清空另一个内容
      //   this.$refs.endPalce.clear();
      //   this.startSelected=false;
      // }
    },
    selectValue2(selectedItem) {
      console.log(selectedItem);
      this.formInline.endPoint = selectedItem;
      this.formInline.endPointName = selectedItem.name;
      this.$emit("excutemethods","PositionOnSearch",{coor:selectedItem,isStart:false});
      // this.$emit("excutemethods","PositionOnSearch",selectedItem);
      // if(!this.endSelected){
      //   this.endSelected=true;
      // }else{ // 否则为第二次修改  那么清空另一个内容
      //   this.$refs.startPlace.clear();
      //   this.endSelected=false;
      // }
    },
    /* selectValue1(selectedItem){
      this.formInline.startPoint = selectedItem;
    },
    selectValue2(selectedItem){
      this.formInline.endPoint = selectedItem;
    }, */
    //交换值
    changeSwap(){
      var temp = {};
      temp = this.formInline.startPoint;
      this.formInline.startPoint = this.formInline.endPoint;
      this.formInline.endPoint = temp;
      this.$refs.endPalce.setSelect(this.formInline.endPoint);
      this.$refs.startPlace.setSelect(this.formInline.startPoint);
      this.$emit("excutemethods","exchangeStart2End");
    },
    changeRiskType(){
      var res;
      this.visible = false
      this.subVisible = false
      switch (this.formInline.riskType) {
        case '0':
          res  = "致癌风险"
          break;
        case '1':
          res  = "非致癌风险"
          break;
        default:
          break;
      }
      return res
    },
    // 查询
    getData(data,style){
      
      this.columsInit();
      //debugger;
      this.visible = true;
      // 处理data
      var healthData=data.health;
      var shortData=data.shortest;
      let dealData=[];
      if(style=="health"){
        dealData.push({style:"健康路径",type:"步行",distance:healthData.juli.toFixed(4),time:healthData.walkTime.toFixed(2),risk:healthData.walkRisk.toFixed(3)})
        dealData.push({style:"健康路径",type:"骑行",distance:healthData.juli.toFixed(4),time:healthData.bikeTime.toFixed(2),risk:healthData.bikeRisk.toFixed(3)})
        dealData.push({style:"健康路径",type:"公交",distance:healthData.juli.toFixed(4),time:healthData.busTime.toFixed(2),risk:healthData.busRisk.toFixed(3)})
        dealData.push({style:"健康路径",type:"驾车",distance:healthData.juli.toFixed(4),time:healthData.carTime.toFixed(2),risk:healthData.carRisk.toFixed(3)})
      }
      if(style=="short"){
        dealData.push({style:"最短路径",type:"步行",distance:shortData.juli.toFixed(4),time:shortData.walkTime.toFixed(2),risk:shortData.walkRisk.toFixed(3)})
        dealData.push({style:"最短路径",type:"骑行",distance:shortData.juli.toFixed(4),time:shortData.bikeTime.toFixed(2),risk:shortData.bikeRisk.toFixed(3)})
        dealData.push({style:"最短路径",type:"公交",distance:shortData.juli.toFixed(4),time:shortData.busTime.toFixed(2),risk:shortData.busRisk.toFixed(3)})
        dealData.push({style:"最短路径",type:"驾车",distance:shortData.juli.toFixed(4),time:shortData.carTime.toFixed(2),risk:shortData.carRisk.toFixed(3)})
      }
      if(style=="all"){
        dealData.push({style:"健康路径",type:"步行",distance:healthData.juli.toFixed(4),time:healthData.walkTime.toFixed(2),risk:healthData.walkRisk.toFixed(3)})
        dealData.push({style:"最短路径",type:"步行",distance:shortData.juli.toFixed(4),time:shortData.walkTime.toFixed(2),risk:shortData.walkRisk.toFixed(3)})

        dealData.push({style:"健康路径",type:"骑行",distance:healthData.juli.toFixed(4),time:healthData.bikeTime.toFixed(2),risk:healthData.bikeRisk.toFixed(3)})
        dealData.push({style:"最短路径",type:"骑行",distance:shortData.juli.toFixed(4),time:shortData.bikeTime.toFixed(2),risk:shortData.bikeRisk.toFixed(3)})

        dealData.push({style:"健康路径",type:"公交",distance:healthData.juli.toFixed(4),time:healthData.busTime.toFixed(2),risk:healthData.busRisk.toFixed(3)})
        dealData.push({style:"最短路径",type:"公交",distance:shortData.juli.toFixed(4),time:shortData.busTime.toFixed(2),risk:shortData.busRisk.toFixed(3)})

        dealData.push({style:"健康路径",type:"驾车",distance:healthData.juli.toFixed(4),time:healthData.carTime.toFixed(2),risk:healthData.carRisk.toFixed(3)})
        dealData.push({style:"最短路径",type:"驾车",distance:shortData.juli.toFixed(4),time:shortData.carTime.toFixed(2),risk:shortData.carRisk.toFixed(3)})

        
      }
      
      this.data1 = dealData;
      //console.log(data);
    },
    
    handleClose(){
      this.subVisible=this.visible=false;
    },
    handleSubClose(){
      // 子列表关闭时显示父级列表
      this.visible=true;
      this.subVisible=false;
    }
  },
}
</script>

<style scoped>
.toolbox{
  background: #fff;
  position: absolute;
  margin:10px 10px 0px 0px;
  z-index: 1000;
  right: 0px;
  /* height: 55px; */
}
.rankTab{
  /* width: 500px; */
  float:right;
  /* margin-top: 15px; */
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
  z-index: 1;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>
