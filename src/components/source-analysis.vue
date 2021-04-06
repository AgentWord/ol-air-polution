<template>
  <Layout>
    <!-- 左侧菜单 -->
    <Sider ref="side1" class="siderbar" v-model='isCollapsed' :style="{background: '#fff'}" :collapsed-width="0" collapsible breakpoint='md' hide-trigger>
      <Menu theme="light" style="width:unset" accordion  @on-select="routeTo" ref="sideMenu" :active-name="$route.name">
        
        <MenuItem name="TravelmodeRiskAnalysis">出行方式风险解析</MenuItem>
        <MenuItem name="RiskTimePeriodAnalysis">风险时段解析</MenuItem>
        <MenuItem name="RiskLocationAnalysis">风险地点解析</MenuItem>
        <MenuItem name="PollutantAnalysis">污染物解析</MenuItem>
        <!-- <MenuItem name="../PollutionSourcesAnalyCharts/PollutionSourcesAnalysis">污染来源解析</MenuItem> -->
        <MenuItem name="PollutionSourcesAnalysis">污染来源解析</MenuItem>
        <MenuItem name="ExposureMarkerParsing">暴露标志物解析</MenuItem>
      </Menu>
       
    </Sider>
    <!-- 中间地图 -->
    <Layout>
      <Content style="height:100%;">
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </Content>
    </Layout>
  </Layout>
</template>

<script>  
export default { 
  data () {
    return {
      isCollapsed:false,
    }
  },
  
  methods:{
    clickCollapsed(){
      this.$refs.side1.toggleCollapse();
    }, 
    routeTo(name){
        this.$router.push(name);
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar{
  background-color: #fff;
}
.navleft{
  background: #fff;
} 
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-footer-center{
  text-align: center;
  padding: 12px;
}
.headers{
  background: #fff;
  height:auto;
  padding: 0px;
}
.siderbar{
  /* overflow-y: auto; */
  overflow: hidden;
  z-index: 100000;
}

</style>
