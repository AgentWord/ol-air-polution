<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px">
         <FormItem>
          <Select v-model="formInline.crowdType" style="width:120px" disabled  @on-change="changeCrowd"> 
            <Option value="0">儿童</Option>
            <Option value="1">青年</Option>
            <Option value="3">中年</Option>
            <Option value="3">老年</Option>
            <Option value="4">总人群</Option> 
          </Select>
        </FormItem>
        
        <FormItem>
          <Select v-model="formInline.riskType" style="width:120px" @on-change="changeRiskType" >
            <Option value="0">致癌风险</Option>
            <Option value="1">非致癌风险</Option> 
          </Select>
        </FormItem>
        <FormItem>
          <Select v-model="formInline.jj" style="width:120px" @on-change="changeSeason" placeholder="选择季节">
            <Option v-for="item in Seasons" :key="item" :value="item">{{item}}</Option> 
          </Select>
        </FormItem>
        <FormItem>
          <Select v-model="formInline.time" style="width:100px" placeholder="选择时间"> 
            <Option v-for="item in dataTimeArr" :key="item" :value="item">{{item}}</Option> 
          </Select>
          <label>时</label>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
          <Button type="primary" icon="stats-bars" @click="statisticData">统计</Button>
        </FormItem>
      </Form>
    </div>
    <div>
      <usermodal ref="userModal" @setUsername="getUserName" @on-closeUser="closeUserModal" v-show="userModalVisible"></usermodal>
      <statisticmodal ref="statisticModal" :params="formInline" @on-closeStatistic="closeStatistic" v-show="statisticModalVisible"></statisticmodal>
    </div>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
import inputuser from "../../components/base/inputUser.vue";
import usermodal from "../../components/base/userModal.vue";
import statisticmodal from "./statisticModal.vue";
export default {
  components:{
    usermodal,
    statisticmodal,
    inputuser
  },
  data(){
    return{
      userModalVisible: false,
      statisticModalVisible: false, 
      formInline: {
        crowdType:'4', 
        riskType: '0',
        time:'', 
        type:'人群',
        jj:'',
        id:""
      },
      Seasons:[],
      dataTimeArr:[],
      ruleValidate:rules.user, 
    }
  },
  mounted(){ 
    // 默认选择的风险为：致癌风险(0),根据致癌风险获取季节列表  ,默认人群类型为：总人口(4)
    this.changeRiskType();

  },
  methods:{   
    //打开用户信息表弹窗
    getUserModal(){
      this.userModalVisible = true;
      this.$refs.userModal.openModal();
    },
    //关闭弹窗
    closeUserModal(){
      this.userModalVisible = false;
    },
    //关闭统计弹窗
    closeStatistic(){
      this.statisticModalVisible = false;
    },
    //获取选择的用户名
    getUserName(data){
      this.formInline.username = data.username;
      this.formInline.userid = data.userid;
    },
    //切换人群类型
    changeCrowd(){
      this.$http.send({
        url:this.$utils.api +"/risk/getCrowdType",
        params:{crowdType:this.formInline.crowdType}
      },this,res => {
        var data = res.data; 
        this.dataTimeArr = [];
        var timeData = data.filter(e => {
          return e.riskType == this.formInline.riskType;
        })
        // time.push(timeData);
        this.dataTimeArr = timeData;
      },true);
    },
    // 切换风险类型 获取季节数据
    changeRiskType(){
      // 清除选择的时间数据和季节数据
      this.formInline.time=this.formInline.jj="";
      this.dataTimeArr=[];
      this.$http.send({
        url:this.$utils.api +"/risk/riskMapServerJJ",
        params:this.formInline
      },this,res => {
        this.Seasons = res.data; 
      },true);
    },
    // 切换季节，由季节和风险类型获取时间列表
    changeSeason(){
      // 清除选择的时间数据
      this.formInline.time="";
      this.$http.send({
        url:this.$utils.api +"/risk/riskMapServerTime",
        params:this.formInline
      },this,res => {
        this.dataTimeArr = res.data; 
      },true);
    },
    //查询所有个体暴露量
    IndividualRisk(){
      this.$http.send({url: "IndividualRiskStatistics"}, this, res => {
        var resData = res.data;
        this.$emit("excutemethods","IndividualRiskStatistics",resData)
      });
    },
    searchData(callback){
      if(this.formInline.jj == ""){
        this.$Message.info("请选择季节！");
        return;
      }
      if (this.formInline.time ==""){
        this.$Message.info("请选择时间！")
        return;
      }
      // 优化 将获取统计信息放置于获取地图数据之后调用
      /* this.$http.sendMock({
        url: "PopulationRiskStatistics",
        params:{crowdType:this.formInline.crowdType,riskType:this.formInline.riskType,time:this.formInline.dataTime}
      }, this, res => {
        var data = res.data; 
        console.log(data)
        this.$emit("excutemethods","TargetScenarioSimulation",{data:data,id:this.formInline.riskType,title:"人群风险"});
      });
      return */
      // 风险类型+季节+时间点=获取地图数据
      this.$http.send({
        url: this.$utils.api +"/risk/riskMapServer",
        params:this.formInline
      }, this, res => {
        var data = res.data[0]; 
        data.preUrl=data.url;
        data.layerid=data.layer;
        data.title="人群风险统计";
        this.formInline.id=data.id; // 获取地图服务的id，用于统计
        if(typeof(callback)=="function"){
          callback();
        }
        this.$emit("excutemethods","PopulationRiskStatistics",{data:data,title:"人群风险统计"}); 
        
      });
      // }
    },
    //统计分析
    statisticData(){
      if(this.formInline.time == ""){
        this.$Message.info("请选择时间")
        return
      }
      if(this.formInline.id==""){
        this.searchData(()=>{
          this.statisticModalVisible = true;
          this.$refs.statisticModal.getStatistic();

        });
      }else{
        this.statisticModalVisible = true;
        this.$refs.statisticModal.getStatistic();
      }
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
