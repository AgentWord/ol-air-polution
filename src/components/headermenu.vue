<style>
.ivu-layout-header{
  line-height: 0px !important;
}
</style> 
<template>
  <div>
    <Row>
      <Col :xs="24" :sm="20" :lg="14">
        <img src="../assets/images/logo.png" class="logoimg">
        <h2 class="maintitle">
          大气污染暴露测量及健康风险来源解析技术平台</h2>
        <h5 class="subtext">Air pollution exposure measurement and health risk source apportionment technology platform</h5>
      </Col>
      <!-- <Col :xs="24" :sm="4" :lg="10" style="margin-top: 15px;">
        <div class="loginSty">
          <Dropdown>
            <a href="javascript:void(0)">
                {{this.$store.state.usernames}}
              <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
              <router-link to="/"><DropdownItem name="login">退出登录</DropdownItem></router-link>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col> -->
      <Col :xs="24" :sm="4" :lg="10" style="margin-top: 8px;">
        <div class="loginSty">
          <Button name="login" @click="backToindex">返回首页</Button>
        </div>
      </Col>
    </Row> 
    <Row class="subMenu">
      <Col :xs="24" :sm="24" style="background-color: #457ED8;">
      <Icon @click.native="collapsedSider" class="collapsedstyle" type="navicon-round" size="24"></Icon> 
      <a v-for="(item,index) in functionList" :key="index"
        :class="{'a-function-selected':classOfItemClicked === index}"  @click="to(item.url,index)" >
        <span class="subtitle">{{item.name}}</span>
      </a>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      functionList:[
        {url:'/main/individualExpose/arcgismap/TravelReplay',name:"个体暴露可视化监测"},
        {url:'/main/populationExpose/arcgismap/FineDrawingPollution',name:"人群暴露可视化监测"},
        {url:'/main/spaceStatistic/arcgismap/IndividualRiskStatistics',name:"暴露风险时空统计"},
        {url:'/main/sourceAnalysis/arcgismap/TravelmodeRiskAnalysis',name:"暴露风险时空源解析"}, 
        {url:'/main/sceneSimulation/arcgismap/TargetScenarioSimulation',name:"暴露风险情景仿真"},
      ],
      classOfItemClicked:0,
      index:0,
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      var path=this.$route.path;
      path=path.substring(0,path.lastIndexOf("/"));
      for(var i=0;i<this.functionList.length;i++){
        if(this.functionList[i].url.startsWith(path)){
           this.classOfItemClicked=i;break;
        }
      }
    },
    backToindex(){
      window.location.href = "http://211.159.186.65/ZNDX/index.html"
    },
    collapsedSider () {
      this.$emit("handleHeaderSider")
    },
    to(name,index){
      this.index = index
      console.log(name,this.index)
      this.classOfItemClicked=this.index;
      this.$router.push(name);
    }
  }
}
</script>

<style scoped>
.a-function-selected { 
  padding-bottom: 5px;
  border-bottom: 2px solid white; 
}
.headerlogo{ 
  float: left;
  position: relative;
  padding: 0px 15px;
}
.logoimg{
  width: 49px;
  height: 36px;
  float: left;
  cursor: pointer;
  margin: 8px 0px 4px 50px;
}
.maintitle{
  line-height: 24px!important;
  letter-spacing: 6px;
  padding-top: 8px;
}
.title{
  float: left;
  margin-left: 20px;
  position: relative;
} 
.subtitle{ 
  margin: 0px 9px;
  cursor: pointer;
  color: white;
  line-height: 42px;
}
.subtext{
  line-height: 11px!important;
}
@media (min-width: 768px){
  .subtitle {
    font-size: 1.5em;
  }
  .subtext .maintitle{
    text-align: center;
  }
}
@media (max-width: 768px){
  .subtext, .maintitle{
    text-align: center;
  }
}
.seperator{
  width: 2px;
  height: 35px;
  background-color: #d4d4d4;
  float: left;
  margin: 15px;
}
.seperatorLine{
  border-top: 1px solid rgba(204, 204, 204, 0.6);
}
.loginSty{
  color: white;
  float: right;
  margin: 4px 28px 0 0;
  position: relative;
  cursor: pointer;
}
@media (max-width: 768px){
  .loginSty {
    line-height: 20px
  }
}
.subMenu{
  background-color: #457ED8;
  z-index: 1;
  min-height: 40px; 
}
.changeIcon{
  float: left;
  margin: 20px;
  color: white;
}
.collapsedstyle{
  margin: 9px  15px 0;
  float: left;
  cursor: pointer;
} 
</style>
