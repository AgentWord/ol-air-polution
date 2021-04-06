<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" inline style="padding:10px">
        <FormItem>
          <Select v-model="formInline.quyu" style="width:120px" @on-change="selectRange" placeholder="请选择区域"> 
            <Option v-for="item in quyu" :key="item.id" :value="item">{{item}}</Option> 
            <!-- <Option value="全国">全国</Option>
            <Option value="京津冀">京津冀</Option>
            <Option value="保定市">保定市</Option>
            <Option value="保定市区">保定市区</Option>
            <Option value="一公里示范区">一公里示范区</Option> -->
          </Select>
          <!-- <Dropdown @on-click="selectRange"> 
              <DropdownMenu slot="list" >
                  <DropdownItem name="全国">全国</DropdownItem>
                  <DropdownItem name="京津冀">京津冀</DropdownItem>
                  <DropdownItem name="保定市">保定市</DropdownItem>
                  <DropdownItem name="保定市区">保定市区</DropdownItem>
                  <DropdownItem name="一公里示范区">一公里示范区</DropdownItem>
              </DropdownMenu>
          </Dropdown> -->
        </FormItem>
        <FormItem >
          <Select v-model="formInline.moshi" style="width:130px" @on-change="changeRaster" placeholder="请选择模型"> 
            <Option v-for="item in models" :key="item.id" :value="item">{{item}}</Option> 
           <!--  <Option value="1">土地利用回归模型</Option>
            <Option value="2">模式模拟模型</Option>
            <Option value="3">AOD回归模型</Option> -->
          </Select>
        </FormItem>
        <FormItem >
          <Select v-model="formInline.pollutionType" style="width:130px" @on-change="changePolution" placeholder="请选择污染物"> 
            <Option v-for="item in dataOfRadio" :key="item.id" :value="item.val">{{item.label}}</Option> 
          </Select>
        </FormItem>
        <FormItem>
           <!-- <DatePicker type="datetime" placeholder="请选择时间" format="yyyy-MM-dd HH:mm" v-model="formInline.time"></DatePicker> -->
           <Select v-model="formInline.time" style="width:130px" placeholder="请选择时间" > 
            <Option v-for="item in times" :key="item.id" :value="item">{{item}}</Option> 
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchWuranDraw">查询</Button>
          <Button type="primary" icon="stats-bars" v-show="canStatistic" @click="statisticData">统计</Button>
        </FormItem>
      </Form>
    </div>
    <!-- <six-wuranwu-radio @on-change="onWuranwuChange" :dataOfRadio="dataOfRadio"></six-wuranwu-radio> -->
    <statisticmodal ref="statisticModal" :params="formInline" @on-closeStatistic="closeStatistic" v-show="statisticModalVisible"></statisticmodal>
  </div>
</template>

<script>
import sixWuranwuRadio from "../../components/base/six-wuranwu-radio.vue";
import statisticmodal from "./statisticModal.vue";
import { loadModules } from 'esri-loader';
import Vue from 'vue'
export default {
  components:{
    sixWuranwuRadio,
    statisticmodal
  },
  data(){
    return{
      formInline: {
        quyu:"",
        fanweiValue: '保定市',
        rasterType: "1",
        moshi:"",
        pollutionType:'',
        wuranwuValue:"AQI",
        time:'',
        id:"",
        statisticTitle:"浓度统计"
      },
      quyu:[],
      models:[],
      times:[],
      statisticModalVisible:false,
      rasterType:[],
      dataOfRadio:[],
      canStatistic:true,
      // dataOfRadio:[ 
      //   {label:'PM2.5',value:"1"},
      //   {label:'PM10',value:"2"},
      //   {label:'SO2',value:"3"},
      //   {label:'NO2',value:"4"},
      //   {label:'CO',value:"6"},
      //   {label:'O3',value:"5"}
      // ]
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){ 
      // 初始化区域范围
       this.$http.send({
        url:this.$utils.api +"/mapServer/mapServer/quyu",
        params:{}
      },this,res => { 
        this.quyu= res.data;
        this.formInline.quyu=this.quyu[0];// 设置默认选择第一项
        setTimeout(()=>{this.selectRange(this.formInline.quyu)});
      });
    },
    //选择缩放范围 
    selectRange(name){ 
      switch (name) {
        case "全国":
          this.aGis.zoom=4;
          this.aGis.center=[106.02,25.29];
          break;
        case "京津冀"://6
          this.aGis.zoom=6;
          this.aGis.center=[116.281587,39.315298];
          break;
        case "保定市"://7
          this.aGis.zoom=8;
          this.aGis.center=[115.160138,39.002451];
          break;
        case "保定市区"://12
          this.aGis.zoom=12;
          this.aGis.center=[115.459812,38.873716];
          break;
        case "一公里示范区"://16
          this.aGis.zoom=16;
          this.aGis.center=[115.511,38.857];
          break;
        default:
          break;
      } 
      this.formInline.moshi=this.formInline.pollutionType=this.formInline.time="";
      this.models=this.times=this.dataOfRadio=[];
      // 加载不同的model
      this.$http.send({
        url:this.$utils.api +"/mapServer/mapServer/moshi",
        params:{quyu:name}
      },this,res => { 
        this.models= res.data;
        this.formInline.moshi=this.models[0];
        // 执行加载污染物
        setTimeout(()=>{this.changeRaster(this.formInline.moshi)});
      });
      this.aGis.map.removeAll();


      //缩放范围中心点115.472489,38.880167  115.469,38.874 115.538138,39.052451  115.469,38.874  
    },
    changeRaster(model){
      /* if(this.formInline.rasterType == "3"){
        this.dataOfRadio = ["PM2.5"];
      }else{
        this.dataOfRadio = ['PM2.5','PM10','SO2','NO2','CO','O3']
      } */
      this.formInline.pollutionType=this.formInline.time="";
      this.$http.send({
        url:this.$utils.api +"/mapServer/mapServer/pollutionLx",
        params:this.formInline
      },this,res => { 
        this.dataOfRadio= [];
        res.data.forEach(element => {
             this.dataOfRadio.push({label:this.$utils.Diction(element),val:element});
        });
        // 默认选中第一条数据
        this.formInline.pollutionType=this.dataOfRadio[0].val;
        setTimeout(()=>{this.changePolution(this.formInline.pollutionType)});
      });
    },
    // 根据区域、模型、污染物类型获取时间段信息
    changePolution(pollutionType){
      this.formInline.time="";
      this.$http.send({
        url:this.$utils.api +"/mapServer/mapServer/getTime",
        params:this.formInline
      },this,res => { 
        this.times= res.data;
        this.formInline.time=this.times[0];
      });
    },
    //获取右侧污染物
    onWuranwuChange(Wuranwu){ 
      /* this.formInline.wuranwuValue = this.$utils.getPollutionType(Wuranwu);
      console.log(this.formInline.wuranwuValue)
      this.searchWuranDraw() */
    }, 
    //查询污染物
    searchWuranDraw(callback){
      if(this.formInline.time == ""){
        this.$Message.info("请选择时间！")
        return;
      }
      var unitEmu=this.$utils.pollutionUnit;
      this.$http.send({
        url:this.$utils.api +"/mapServer/mapServer/getUrl",
        params:this.formInline
      },this,res => { 
        var data = res.data;
        this.formInline.id=data.id;
        //处理数据
        var url=data.preUrl;
        var serviceUrl=url.substr(0,url.lastIndexOf("/"));
        var layerid=parseInt( url.substr(url.lastIndexOf("/")+1));
        data.layerid=layerid;
        data.preUrl=serviceUrl;
        var unit=unitEmu[data.rasterType][data.pollutionType];
        data.title="单位："+unit;
        this.formInline.unit=unit;
        this.$emit("excutemethods","fineDrawllution",{data:data,title:"污染浓度"}); 
        if(callback)callback();
        /* this.aGis.zoom = 6 */
      }) 
    },
    //关闭统计弹窗
    closeStatistic(){
      this.statisticModalVisible = false;
    },
    //统计分析
    statisticData(){
      if(this.formInline.time == ""){
        this.$Message.info("请选择时间")
        return
      }
      //if(this.formInline.id==""){
        this.searchWuranDraw(()=>{
          this.statisticModalVisible = true;
          this.$refs.statisticModal.getStatistic();
          //his.formInline.id="";// 将id置空 切换选项进行统计时避免出现id未切换。
        });
      /* }else{
        this.statisticModalVisible = true;
        this.$refs.statisticModal.getStatistic();
        this.formInline.id="";// 将id置空 切换选项进行统计时避免出现id未切换。

      }
       */
    },
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
