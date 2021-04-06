<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" inline style="padding:10px">
        <FormItem >
          {{timeNow}}
        </FormItem>
        <FormItem v-show="false">
          <Select v-model="formInline.crowdType" style="width:120px">
            <Option value="0">儿童</Option>
            <Option value="1">青年</Option>
            <Option value="2">中年</Option>
            <Option value="3">老年</Option>
            <Option value="4">总人群</Option>
          </Select>
        </FormItem>
        <FormItem v-show="false">
          <Select v-model="formInline.diqu" style="width:120px">
            <Option v-for="item in this.$utils.diquArr" :key="item.id" :value="item.value">{{item.label}}</Option>  
          </Select>
        </FormItem>
        <!-- 2019-10-12 cdb modify  选择污染物类型 -->
        <FormItem>
          <Select v-model="formInline.pollutionType" style="width:200px" placeholder="请选择污染物类型" @on-change="changePolution">
            <Option v-for="item in pollutionTypeArr" :key="item.id" :value="item.val">{{item.label}}</Option>
          </Select>
        </FormItem>
        <Button type="primary" icon="ios-search" @click="QueryData">查询</Button>
        <FormItem>
          <Select v-model="formInline.id1" style="width:150px" placeholder="请选择时间" >
            <Option v-for="item in times" :key="item.id" :value="item.id">{{item.time}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Select v-model="formInline.id2" style="width:150px" placeholder="请选择时间" >
            <Option v-for="item in times" :key="item.id" :value="item.id">{{item.time}}</Option>
          </Select>
        </FormItem>
        <FormItem>
         <!--  <Button type="primary" icon="ios-search" @click="drawPoints">查询</Button> -->
          <!-- <Button type="primary" icon="ios-search" @click="QueryData">查询</Button> -->
          <Button type="primary" icon="stats-bars" @click="statisticData">统计</Button>
        </FormItem>
      </Form>
    </div>
    <!-- <six-wuranwu-radio @on-change="onWuranwuChange" v-show="false"></six-wuranwu-radio> -->
    <time-line v-if="showTimeLine" slot="bottom-left" class="timeline" :showNumbers='showNumbers' :timelist="times" :intervalTime='5000' @request-data="getRequestData" 
      ref="timeline" @on-select-change="handleTimeSelected" @time-flag="getTimeFlag"></time-line>
    <statisticmodal ref="statisticModal" :params="formInline" @on-closeStatistic="closeStatistic" v-show="statisticModalVisible"></statisticmodal>
    <!-- todo 时间线 -->
  
  </div>
</template>

<script>
//import sixWuranwuRadio from "../../components/base/six-wuranwu-radio.vue";
import statisticmodal from "./statisticModal.vue";
import timeLine from "../base/time-line.vue";
export default {
  components:{
    //sixWuranwuRadio,
    statisticmodal,
    timeLine
  },
  props:{
    showNumbers:{
      type:Number,
      default:10
    }
  },
  data(){
    return{
      formInline: {
        crowd:"0",
        regionalScope: '保定市',
        statisticalScale:'0',
        wuranwuValue:'',
        statisticTitle:"暴露变化率",
        time:"",
        pollutionType:"",
      },
      statisticModalVisible:false,
      timeNow:'',
      setArr:[],
      pollutionTypeArr:[],
      times:[],
      showTimeLine:false
    }
  },
  mounted(){
    this.getAllPollution();
  },
  methods:{
    onWuranwuChange(selectWuranwu) {
      this.selectWuranwu=selectWuranwu;
      this.getRequestData(this.dataOfAll)
      this.drawPoints();
    },
    // 初始化获取所以污染物类型
    getAllPollution(){
      this.$http.send({
        url:this.$utils.api +"/pwel/pollutionType",
        params:{},
        method:"POST"
      },this,res => { 
        this.pollutionTypeArr= [];
        res.data.forEach(element => {
              this.pollutionTypeArr.push({label:this.$utils.Diction(element),val:element});
        }); 
        // 默认选中第一条数据
        this.formInline.pollutionType=this.pollutionTypeArr[0].val;
        setTimeout(()=>{this.changePolution(this.formInline.pollutionType)});
      });
    },
    changePolution(pollution){
      this.times=[];
      this.formInline.id1=this.formInline.id2="";
      this.$http.send({
        url:this.$utils.api +"/pwel/timeAndId",
        params:{pollutionType:pollution},
        method:"POST"
      },this,res => { 
        this.times= res.data;
        this.formInline.id1=this.times[0].id;
        this.formInline.id2=this.times[0].id;
      });

    },
    /* cdb 2019-11-12 查询按钮点击事件=>获取时间轴，启动轮播 */
    QueryData(){
      // 获取时间序列
      //this.TurnPlay(3000);
      // 显示时间线
      this.showTimeLine=true;

    },
    /* 轮播控制实现方法 */
    TurnPlay(step){
      var index=0;  
      setInterval(()=>{
         this.LoadMapByTime(this.formInline.pollutionType,this.times[index].time);
         index++;
         if(index>=this.times.length){
           index=0;
         }
      },step);
    },
    /* 根据参数绘制地图  */
    LoadMapByTime(pollutionType,time){
      this.$http.send({
        url:this.$utils.api + "/pwel/mapInfo",
        method:"POST",
        params:{pollutionType:pollutionType,time:time}
      },this,res => {
        if(res.success){
           var data = res.data;
           data.layerid=data.layer;
           data.preUrl=data.url;
           data.title="单位：μg/m³";
           this.formInline.unit="μg/m³";
           this.$emit("excutemethods","fineDrawllution",{data:data,title:"暴露动态分析"}); 
        }
      },true)

    },
    getTimeFlag(timeFlag){
      this.timeFlag = timeFlag;
    },
    /* 时间线中出现调用 */
    getRequestData(data) {
      console.log(data)
      this.dataOfAll = data;
      var selectTime = [];
      // for(var key in this.dataOfAll){
      //   // this.$refs.arcgismap.getShiceLayers(this.dataOfAll[key], this.selectWuranwu,key,this.timeFlag);
      // }
    },
    drawPoints(){
      /* this.$http.sendMock({
        url:"NewExposureDynamicAnalysis",
      },this,res => { 
        var data = res.data
        var id = this.$utils.RandomNumBoth(0,4)
        this.$emit("excutemethods","TargetScenarioSimulation",{data:data,id:id,title:"暴露量"})
      },true) */
    },
    // getRequestData(params) {
    //   this.dataOfAll = params.data;
    //   var selectTime = [];
    //   for(var key in this.dataOfAll){
    //     this.$refs.arcgismap.getShiceLayers(this.dataOfAll[key], this.selectWuranwu,key,params.timeFlag);
    //   }
    //   //this.drawPoints();
    // },
    handleTimeSelected(selectTime) {
      this.selectTime=selectTime;
      console.log(selectTime);
      this.LoadMapByTime(this.formInline.pollutionType,selectTime);
      //this.drawPoints();
    },
    //查询暴露动态
    searchWuranDraw(){
      this.setArr.forEach(e => {
        clearTimeout(e);
      })
      this.setArr = [];
      this.$http.sendMock({url:"ExposureDynamicAnalysis",
        data:{"crowd":this.formInline.crowd,
          "regionalScope":this.formInline.regionalScope,
          "statisticalScale":this.formInline.statisticalScale,
          "pollution":this.formInline.wuranwuValue}},
        this,res => {
        var resDatas = res.data[this.formInline.wuranwuValue];
        console.log(resDatas);
        var i=0;
          resDatas.forEach(e=>{
            this.setArr.push(
            setTimeout(()=>{
              e.gridName="暴露量";
              this.timeNow = e.shijian;
              this.$emit("excutemethods","ExposureDynamicAnalysis",{data:e});
            },5000*i))
            i++;
          })
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
.timeline{
  background: #fff;
  position: absolute;
  z-index: 100;
  left: 210px;
  bottom: 15px;
  width: 70%;
}
@media (max-width: 968px) {
  .timeline{
    left: 10px;
  }
}
</style>
