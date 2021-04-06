<template>
  <div class="layout" style="height:100%;overflow: hidden;">
    <Layout style="height:100%;overflow: hidden;">
      <Header class="headers">
        <headermenu ref="headerLeft" @handleHeaderSider="handleHideSider"></headermenu>
      </Header>
      <router-view style="height:100%" ref="routerView"></router-view>
    </Layout>
  </div>
</template>
<script>
import headermenu from './headermenu.vue'
export default {
  components:{
    headermenu,
  },
  data () {
    return {
    }
  },

  methods:{
    handleHideSider(){
      this.$refs.routerView.clickCollapsed();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* @import url("https://js.arcgis.com/4.6/esri/css/main.css");  http://192.168.43.100/lib/arcgis_js_api/4.6*/
  @import url("http://211.159.186.65/lib/arcgis_js_lib/4.6/esri/css/main.css");
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
.headers{
  /* background: #fff;
  height:auto;
  padding: 0px;
  z-index: 100000; */
  background: #fff;
  height:auto;
  padding: 0px;
}
</style>
