<template>
  <div style="height: 100%;">
    <split-pane :style="{height: '100%'}" direction="horizontal" v-model="triggerOffsetV">
      <div slot="left" style="height: 100%;">
        <arcgis-map ref="arcgismap" legendDiClass="legendDiv-left" :showRouterView='false' @extent-change="arcgisExtentChange">
        </arcgis-map>
      </div>
      <div slot="right" style="height: 100%;">
        <transition name="fade">
          <router-view  @subExcutemethods="subChangeMethods"></router-view>
        </transition>
        <arcgis-map ref="arcgismap2" :showRouterView='false' compareDiClass="compare-left" @extent-change="arcgisExtentChange2">
        </arcgis-map>
      </div>
    </split-pane>
  </div>
</template>

<script>
import arcgisMap from "@/components/arcgisMap.vue";
import splitPane from "./split-pane";
export default {
  components: { arcgisMap, splitPane },
  data(){
    return{
      triggerOffsetV:50
    }
  },
  methods:{

    arcgisExtentChange2(params){
      this.$refs.arcgismap.goToZoomCenter(params);
    },
    arcgisExtentChange(params){
      this.$refs.arcgismap2.goToZoomCenter(params);
    },
    subChangeMethods(datas){ 
      var data = datas.data
      var before = data["now"];
      var after = data["action"];
      var lengedTitle1, lengedTitle2 , beforeId, afterId;
      if(datas.lengedType == "污染预测"){
        lengedTitle1 = this.$utils.getNearDay("todayOfYY")
        lengedTitle2 = datas.type
        beforeId = before.id
        afterId = after.id
      } else if (datas.lengedType =="防控辅助"){
        lengedTitle1 = datas.lengedType +"前"
        lengedTitle2 = datas.lengedType +"后"
        beforeId = before.id
        afterId = after.id
      }
      else{
       lengedTitle1 = datas.lengedType +"前PM₂.₅(ug/m³)"
       lengedTitle2 = datas.lengedType +"后PM₂.₅(ug/m³)";
       
       
       /* beforeId = datas.id
       afterId = datas.id */
      }
      before.preUrl=before.url;
      before.layerid=before.layer;
      before.title=lengedTitle1;
      after.preUrl=after.url;
      after.layerid=after.layer;
      after.title=lengedTitle2;
      /* this.$refs.arcgismap.getSimulation("PollutionControlSimulation",{data:before,id:beforeId,title:lengedTitle1 });
      this.$refs.arcgismap2.getSimulation("PollutionControlSimulation",{data:after,id:afterId,title:lengedTitle2 }); */
      this.$refs.arcgismap.getSimulation("PollutionControlSimulation",{data:before,title:lengedTitle1 });
      this.$refs.arcgismap2.getSimulation("PollutionControlSimulation",{data:after,title:lengedTitle2 });
    },
  }
}
</script>

<style>

</style>
