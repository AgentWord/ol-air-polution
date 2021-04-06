<template>
  <Layout>
    <Sider ref="side1" class="siderbar" v-model='isCollapsed' :style="{background: '#fff'}" :collapsed-width="0" collapsible breakpoint='md' hide-trigger>
      <Menu theme="light" accordion style="width:unset" @on-select="routeTo" ref="sideMenu" :active-name="$route.name">
        <MenuItem name="IndividualRiskStatistics">个体风险统计</MenuItem>
        <MenuItem name="PopulationRiskStatistics">人群风险统计</MenuItem>
        <MenuItem name="RiskHotRanking">风险热点排序</MenuItem>
        <MenuItem name="IndividualRiskRanking">个体风险排序</MenuItem>
        <MenuItem name="RiskChangeAnalysis">风险变化分析</MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <Content  style="height:100%;overflow: hidden;">
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </Content>
      <!-- <Footer class="layout-footer-center">Copy Right &copy; 2010 - 2018 EGIS.All Right Reserved. <br/>
        国家重点研发计划 大气污染暴露监测与健康风险源解析技术平台
      </Footer> -->
    </Layout>
  </Layout>
</template>
<script> 

export default { 
  data () {
    return {
      isCollapsed:false
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
