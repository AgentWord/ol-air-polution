<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" inline style="padding:10px">
        <FormItem>
          <Select v-model="formInline.renkouId" style="width:150px">
            <Option v-for="item in renkouArr" :key="item.id" :value="item.id">{{item.type}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Select v-model="formInline.place" style="width:150px" >
            <Option v-for="item in placeArr" :key="item.value" :value="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Select v-model="formInline.time" style="width:150px"  @on-change="changeTime">
            <Option v-for="item in timeArr" :key="item.key" :value="item">{{item}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem >
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" v-model="formInline.pollutionDataTime"></DatePicker>
        </FormItem> -->
        <FormItem>
          <Button type="primary" icon="ios-search" @click="QueryAnalysis">查询</Button>
         <!--  <Button type="primary" icon="stats-bars" @click="statisticData">统计</Button> -->
        </FormItem>
      </Form>
    </div>
    <!-- <six-wuranwu-radio @on-change="onWuranwuChange"></six-wuranwu-radio> -->
    <statisticmodal ref="statisticModal" :params="formInline" @on-closeStatistic="closeStatistic" v-show="statisticModalVisible"></statisticmodal>
  </div>
</template>

<script>
//import sixWuranwuRadio from "../../components/base/six-wuranwu-radio.vue";
import statisticmodal from "./statisticModal.vue";
import { loadModules } from 'esri-loader';
export default {
  components:{
    //sixWuranwuRadio,
    statisticmodal
  },
  data(){
    return{
      formInline: {
        renkouId:1,
        nongduId:0,
        pollutionDataTime:'',
        fanweiValue: '保定市', 
        wuranwu:'',
        statisticTitle:"暴露模拟",
        title:'',
        place:1,
        time:""
      },
      dataOfRadio:[
        {label:'PM2.5',value:"1"},
        {label:'PM10',value:"2"},
        {label:'SO2',value:"3"},
        {label:'NO2',value:"4"},
        {label:'CO',value:"5"},
        {label:'O3',value:"6"}],
      statisticModalVisible:false,
      
      renkouArr:[{id:1,type:"总人群"},{id:2,type:"青少年"},{id:3,type:"青年"},{id:4,type:"中年"},{id:5,type:"老年"}],
      placeArr:[],
      nongduArr:[],
      timeArr:[],
      dataInfo:""
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.placeArr=this.$utils.diquArr;
      this.getTimeInfo();
      /* 进行初始化人口信息 */
      //this.initRenkouId()
      
    },
    /* 切换地点   cdb 2019-10-5 */
    changeTime(value){
        
    },
    /* 查询按钮 */
    QueryAnalysis(){
        
        this.formInline.preUrl=this.dataInfo[this.formInline.time].url;
        this.formInline.layerid=this.dataInfo[this.formInline.time].layer;
        this.formInline.title="单位：μg/m³";
        this.$emit("excutemethods","ExposureSimulationPredict",{data:this.formInline,title:"暴露模拟预测"}); 
    },
    /* 获取时间序列  cdb 2019-10-5 */
    getTimeInfo(){
      this.$http.send({
        url:this.$utils.api +"/exposure/crowdExposureTime",
        params:{}
      },this,res => {
        let time=[];
        for(var key in res.data){
            time.push(key);
        }
        this.timeArr=time;
        this.dataInfo=res.data;
        this.formInline.time=time[0];
      },true);
    },
    //获取人口id
    initRenkouId(){
      this.$http.send({url:this.$utils.api + "/mapServer/mapServer/crowd/pollutantsAndCrowdBaseInfo"},this,res => {
        if(res.success){
          this.renkouArr = res.data.crowds
          this.nongduArr = res.data.pollutants
        }
      },true)
    },
    //查询
    searchData(){
      this.$emit("excutemethods","PopExposureCalculation",{nongduId:this.formInline.nongduId,renkouId:this.formInline.renkouId})
      return
      this.$http.send({
        url: this.$utils.api + "/pwel/cache/query",
        method:"POST",
        params:{nongduId:this.formInline.nongduId,renkouId:this.formInline.renkouId}
      },this,res => {
        if(res.success){
          var data = res.data
          if(data){
            this.$emit("excutemethods","PopExposureCalculationJobId",{data:data,type:this.formInline.nongduId})
          }
        }
      });
      // if(this.formInline.wuranwu == ""){
      //   this.$Message.info("请选择污染物！")
      // }
      // if(this.formInline.pollutionDataTime == ''){
      //   return;
      // }else{
      //   this.formInline.pollutionDataTime = this.$utils.formatDate(this.formInline.pollutionDataTime,'yyyy-MM-dd hh:mm');
      // }
      // var pollutionDataTime = this.$utils.formatDate(this.formInline.pollutionDataTime,'yyyy-MM-dd hh:mm:ss')
      // this.$http.sendMock({
      //   url:"TargetScenarioSimulation",
      //   params:this.formInline
      // },this,res => {
      //   var data = res.data[0]
      //   this.$emit("excutemethods","TargetScenarioSimulation",{data:data,id:1,title:"暴露量"})
      //   this.aGis.zoom=8;
      //   this.aGis.center=[115.160138,39.002451];
      // });
      return
      this.$http.send({
        url:this.$utils.api + "/pwel/pwel",
        method:"POST",
        params:{nongduId:this.formInline.nongduId,renkouId:this.formInline.renkouId,pollutionDataTime:pollutionDataTime}
      },this,res => {
        console.log(res)
        if(res.success){
          var data = res.data
          
        }
      },true)
    },
    //获取污染物
    onWuranwuChange(Wuranwu){
      this.formInline.wuranwu = Wuranwu;
      this.aGis.map.removeAll();
      if(this.formInline.pollutionDataTime == ''){
        return;
      }else{
        this.formInline.pollutionDataTime = this.$utils.formatDate(this.formInline.pollutionDataTime,'yyyy-MM-dd hh:mm');
      }
      // this.searchWuranDraw()
    },
    //查询污染物
    searchWuranDraw(){
      if(this.formInline.chooseTime == ''){
        this.$Modal.warning({
          title:"提示",
          content:"请选择时间！"
        })
        return;
      }else{
        this.formInline.selectTime = this.$utils.formatDate(this.formInline.chooseTime,'yyyy-MM-dd hh:mm');
      }
      this.$http.send({url:"fineDrawllution",
        data:{"crowd":this.formInline.renqunValue,
          "regionalScope":this.formInline.fanweiValue,
          "shijian":this.formInline.selectTime,
          "pollution":this.formInline.wuranwu}},
        this,res => {
        var resDatas = res.data["type" + this.formInline.renqunValue];
        resDatas.forEach(e=>{
          if(e.pollution == this.formInline.wuranwu){
            e.gridName="暴露量";
            this.$emit("excutemethods","popDistributSimulation",{data:e});
            return false;
          }
        });
      })
    },
    //关闭统计弹窗
    closeStatistic(){
      this.statisticModalVisible = false;
    },
    //统计分析
    statisticData(){
      this.statisticModalVisible = true;
      this.$refs.statisticModal.getStatistic();
    }
  },
}
</script>

<style scoped>
.toolbox{
  background: #fff;
  position: absolute;
  z-index: 100;
  right: 0px;
  height: 55px;
}
</style>
