<template>
  <Layout>
    <Sider ref="side1" class="siderbar" v-model='isCollapsed' :style="{background: '#fff'}" :collapsed-width="0" collapsible breakpoint='md' hide-trigger>
      <Menu theme="light" ref="sideMenu" accordion style="width:unset" @on-select="routeTo" :active-name="activeName">
        <MenuItem name="../arcgismap/TravelReplay">出行轨迹回放</MenuItem>
        <MenuItem name="../arcgismap/RealtimeExposemeasure">实时暴露测量</MenuItem>
        <MenuItem name="../arcgismap/SimulatedExposemeasure">模拟暴露测量</MenuItem>
        <MenuItem name="../arcgismap/HistoricalExposureReplay">历史暴露回放</MenuItem>
        <MenuItem name="../ArcgisMap3D/VisualExposureScene3D">暴露场景三维可视化</MenuItem>
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
      activeName:'../arcgismap/TravelReplay', 
    }
  },
  mounted () {
    this.$nextTick(() => {
      // if (this.$refs.sideMenu) {
      //   this.$refs.sideMenu.updateOpened();
      // }
      if(this.$route.name == "VisualExposureScene3D"){
        this.activeName = "../ArcgisMap3D/" + this.$route.name
      }else{ 
        this.activeName = "../arcgismap/" + this.$route.name
      }
      this.$refs.sideMenu.updateOpened();
      this.$refs.sideMenu.updateActiveName()
    });
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
  overflow: hidden;
  z-index: 100000;
}
</style>
