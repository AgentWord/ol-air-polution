<template>
  <Layout>
    <Sider ref="side1" class="siderbar" v-model='isCollapsed' :style="{background: '#fff'}" :collapsed-width="0" collapsible breakpoint='md' hide-trigger>
      <Menu theme="light" accordion style="width:unset" @on-select="routeTo" ref="sideMenu" :active-name="$route.name">
        <MenuItem name="FineDrawingPollution">污染精细制图</MenuItem>
        <MenuItem name="PopDistributSimulation">人群分布模拟</MenuItem>
        <MenuItem name="PopExposureCalculation">人群暴露计算</MenuItem>
        <MenuItem name="ExposureDynamicAnalysis">暴露动态分析</MenuItem>
        <MenuItem name="ExposureSimulationPredict">暴露模拟预测</MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <Content  style="height:100%;overflow: hidden;">
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
      activeName:'FineDrawingPollution'
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
