<style lang="less">
.ivu-tabs-bar{
  margin-top: 0px
}
</style>

<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px 10px 0 10px;">
       <!--  <FormItem >
          <Label>POI统计</Label>
          <Select v-model="formInline.staticType" style="width:120px" @on-change="changeStaticType">
            <Option value="0">区域统计</Option>
            <Option value="1">POI统计</Option> 
          </Select> 
        </FormItem>-->
        <FormItem >
          <Select v-model="formInline.diqu" style="width:120px" placeholder="请选择区域">
            <Option v-for="item in this.$utils.diquArr"  :disabled="item.disable" :key="item.id" :value="item.label">{{item.label}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem v-if="POIVisible">
          <Select v-model="formInline.poiTypes" style="width:120px" placeholder="请选择POI">
            <Option v-for="item in POIList" :key="item.id" :value="item.type">{{item.type}}</Option> 
          </Select>
        </FormItem> -->
        <FormItem>
          <Select v-model="formInline.riskType" style="width:120px">
            <Option value="0">致癌风险</Option>
            <Option value="1">非致癌风险</Option> 
          </Select>
        </FormItem>
        <FormItem>
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="终止时间" v-model="formInline.endTime"></DatePicker>

          
        </FormItem>
        <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
       </Form>
    </div>
      <Dropdown trigger="custom" :visible="visible" style="margin-top:55px">
        <DropdownMenu slot="list">
           <a href="#" id="popup-closer" class="ol-popup-closer" @click="closeTable"></a>
            <div  class="rankTab" v-show="formInline.rankTab">
              <Tabs value="custom" @on-click="changeTab">
                <TabPane label="时榜" name="custom" class="rankStyle"  style="margin-top: -17px;">
                  <custom-hot-rank ref="custom" :params="formInline" @drawPoints="getRiskHotRanPoints" @drawPointFlash="goToPoint"></custom-hot-rank>
                </TabPane>
                <TabPane label="日榜" name="today" class="rankStyle"  style="margin-top: -17px;">
                  <custom-hot-rank ref="today" :params="formInline" @drawPoints="getRiskHotRanPoints"  @drawPointFlash="goToPoint"></custom-hot-rank>
                </TabPane>
                <TabPane label="周榜" name="nearWeek" class="rankStyle"  style="margin-top: -17px;">
                  <custom-hot-rank ref="nearWeek" :params="formInline" @drawPoints="getRiskHotRanPoints" @drawPointFlash="goToPoint"></custom-hot-rank>
                </TabPane>
                <TabPane label="月榜" name="nearMouth" class="rankStyle"  style="margin-top: -17px;">
                  <custom-hot-rank ref="nearMouth" :params="formInline" @drawPoints="getRiskHotRanPoints" @drawPointFlash="goToPoint"></custom-hot-rank>
                </TabPane>
              </Tabs>
            </div>
        </DropdownMenu>
      </Dropdown>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
import inputuser from "../../components/base/inputUser.vue";
import usermodal from "../../components/base/userModal.vue";
import customHotRank from "./customHotRank.vue";
export default {
  components:{
    usermodal,
    inputuser,
    customHotRank,
  },
  data(){
    return{
      userModalVisible: false,
      statisticModalVisible: false,
      visible: false, 
      POIVisible: true, 
      formInline: {
        diqu: '全部',
        riskType:'0', // 0 为致癌  1为非致癌
        staticType:'1',// 9.2 修改为POI统计
        timeType:'0',
        poiTypes:'',
        statisticTitle:'人群',
        rankTab: false,
        rankTabType:'custom',
      },
      ruleValidate:rules.user,
      selectionData:[],
      SingleGuiji:'',
      POIList:[],
      GuijiStatisticData:[],
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){ 
      //this.getAllPoitype();
      this.formInline.endTime=new Date(this.$utils.getNearDay("today")+" 23:59:59");
    },
    //获取所有的POI点
    getAllPoitype(){
      this.$http.send({url:this.$utils.api +"/poi/getAllPoitype"},this,res =>{
        this.POIList = res.data;
      },true)
    },
    //切换统计方式
    changeStaticType(){
      if(this.formInline.staticType == "0"){
        this.POIVisible = false;
      }else{ 
        this.POIVisible = true;
      } 
    },
    closeStatistic(){
      this.statisticModalVisible = false
    },
    getRiskHotRanPoints(data){
      this.$emit("excutemethods","customRickHotRank",data);
    },
    changeTimeType(name){
      var timeType
      switch (name) {
        case 'custom':
          timeType=0
          break;
        case 'today':
          timeType=1
          break;
        case 'nearWeek':
          timeType=2
          break;
        case 'nearMouth':
          timeType=3
          break; 
        default:
          break;
      }
      return timeType
    },
    //切换tab
    changeTab(name){
      this.formInline.rankTabType = name;
      this.formInline.timeType = this.changeTimeType(name)
      this.$refs[this.formInline.rankTabType].initTable();
    },
    //定位点
    goToPoint(target){
      this.$emit("excutemethods","drawPointFlash",[target.lon,target.lat]);
    },
    //查询
    searchData(){
      if(this.formInline.diqu == ""){
        this.$Message.info("请选择区域！")
        this.statisticModalVisible = false;
        return;
      }else if (this.formInline.riskType == ''){
        this.$Message.info("请选择风险类型！")
        this.statisticModalVisible = false;
        return;
      }else{
        this.visible = true
        this.formInline.rankTab = true;
        this.$refs[this.formInline.rankTabType].initTable();
      }
    },
    closeTable(){
      this.visible=false;
    }
  },
}
</script>

<style scoped>
.toolbox{
  background: #fff;
  position: absolute;
  z-index: 1000;
  right: 0px;
  height: 55px;
}
.rankStyle{
  max-height: 500px;
  /* height: 300px; */
  overflow-y:auto;
}
.rankTab{ 
  width: 400px;
  float:right;
  height: 100%;
  /* background-color:white; */
  /* margin-top:60px; */
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
