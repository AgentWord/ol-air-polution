<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" inline style="padding:10px">
        <FormItem>
          <Select v-model="formInline.pollutionType" style="width:220px" placeholder="请选择污染物类型" @on-change="changePolution">
            <Option v-for="item in pollutionTypeArr" :key="item.id" :value="item.val">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Select v-model="formInline.time" style="width:250px" placeholder="请选择时间"> 
            <Option v-for="item in times" :key="item.id" :value="item">{{item}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem >
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" v-model="formInline.pollutionDataTime"></DatePicker>
        </FormItem> -->
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
          <Button type="primary" icon="stats-bars" @click="statisticData">统计</Button>
        </FormItem>
      </Form>
    </div>
    <!-- <six-wuranwu-radio @on-change="onWuranwuChange"></six-wuranwu-radio> -->
    <statisticmodal ref="statisticModal" :params="formInline" @on-closeStatistic="closeStatistic" v-show="statisticModalVisible"></statisticmodal>
  </div>
</template>

<script>
import sixWuranwuRadio from "../../components/base/six-wuranwu-radio.vue";
import statisticmodal from "./statisticModal.vue";
import { loadModules } from 'esri-loader';
export default {
  components:{
    sixWuranwuRadio,
    statisticmodal
  },
  data(){
    return{
      formInline: {
        renkouId:0,
        nongduId:0,
        pollutionDataTime:'',
        fanweiValue: '保定市', 
        wuranwu:'',
        statisticTitle:"人群统计",
        title:'',
        pollutionType:"",
        time:"",
        id:"",
      },
      pollutionTypeArr:[],
      times:[],
      dataOfRadio:[
        {label:'PM2.5',value:"1"},
        {label:'PM10',value:"2"},
        {label:'SO2',value:"3"},
        {label:'NO2',value:"4"},
        {label:'CO',value:"5"},
        {label:'O3',value:"6"}],
      statisticModalVisible:false,
      renkouArr:[],
      nongduArr:[],
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.getAllPollution();
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
      this.formInline.time="";
      this.$http.send({
        url:this.$utils.api +"/pwel/dataTime",
        params:{pollutionType:pollution},
        method:"POST"
      },this,res => { 
        this.times= res.data;
        this.formInline.time=this.times[0];
      });

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
    searchData(callback){
      /* this.$emit("excutemethods","PopExposureCalculation",{nongduId:this.formInline.nongduId,renkouId:this.formInline.renkouId})
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
      }); */
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
      this.$http.send({
        url:this.$utils.api + "/pwel/mapInfo",
        method:"POST",
        params:this.formInline
      },this,res => {
        if(res.success){
          var data = res.data;
           data.layerid=data.layer;
           data.preUrl=data.url;
           this.formInline.id=data.id;
           data.title="单位：μg/m³";
           this.formInline.unit="μg/m³";
           this.$emit("excutemethods","fineDrawllution",{data:data,title:"人群暴露"}); 
           if(callback) callback();
          
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
      // 如果id为空则请求一次制图
      if(this.formInline.id==""){
        this.searchData(()=>{
          this.statisticModalVisible = true;
          this.$refs.statisticModal.getStatistic();
        });
      }else{
        this.statisticModalVisible = true;
        this.$refs.statisticModal.getStatistic();
      }
      
    }
  },
  watch:{
    // $route(to,from){
    //   this.formInline = {}
    //   if(this.$route.name == "PopExposureCalculation"){
    //     this.formInline.title = "人群暴露统计";
    //   }else if(this.$route.name == "ExposureSimulationPredict"){ 
    //     this.formInline.title = "人群暴露模拟预测统计";
    //   }
    // }
  }
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
