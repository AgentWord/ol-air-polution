<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px">
        <FormItem>
          <Input v-model="formInline.username" >
            <Icon type="person" size="15" slot="append" style="cursor: pointer;" @click="getUserModal"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Select v-model="formInline.riskType" style="width:120px">
            <Option value="0">致癌风险</Option>
            <Option value="1">非致癌风险</Option>
          </Select>
        </FormItem>
        <FormItem > <!-- style="margin-right:-73px" -->
          <Row>
            <Col >
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" :options="formInline.options" placeholder="起始时间" v-model="formInline.startTime"></DatePicker>
            </Col>
            <!-- <Col span="1" style="text-align: center">-</Col>
             <Col span="9">
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="终止时间" v-model="formInline.endTime"></DatePicker>
            </Col> -->
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
          <Button type="primary" icon="stats-bars" @click="statisticData">统计</Button>
        </FormItem>
      </Form>
    </div>
    <div>
      <usermodal ref="userModal" @setUserName="getUserName" @on-closeUser="closeUserModal" v-show="userModalVisible"></usermodal>
      <statisticmodal ref="statisticModal" :params="formInline" @on-closeStatistic="closeStatistic" v-show="statisticModalVisible"></statisticmodal>
    </div>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
import usermodal from "../../components/base/userModalSingle.vue";
import statisticmodal from "./statisticModal.vue";
export default {
  components:{
    usermodal,
    statisticmodal,
  },
  data(){
    return{
      userModalVisible: false,
      statisticModalVisible: false,
      statisticalTime: true,
      formInline: {
        username:'',
        userIds:6, 
        startTime:'', 
        endTime:'', 
        riskType: '0',
        statisticalWay: '时间统计',
        statisticalScale: '按秒统计',
        type:'个体',
        options:{}
      },
      ruleValidate:rules.user,
      selectionData:[],
      SingleGuiji:'',
      columns1:[
        {
          title:"时间段",
          key:"timeDuring"
        },
        {
          title:"道路名称",
          key:"roadName"
        },
        {
          title:"里程数（公里）",
          key:"licheng"
        },
      ],
      GuijiStatisticData:[],
    }
  },
  mounted(){
    this.init();
  },
  computed:{
    getDateFormatByType() {
      var format="yyyy-MM-dd hh:mm:ss";
      switch (this.formInline.statisticalScale) {
        case "按分统计":
            format="yyyy-MM-dd hh:mm";
            break;
        case "按时统计":
            format="yyyy-MM-dd hh"
            break;
        case "按天统计":
            format="yyyy-MM-dd"
            break;
        case "按周统计":
            format="yyyy-MM-dd";
            break;
        case "按月统计":
            format="yyyy-MM"
            break;
        default:
            break;
      }
      this.weekStatistic();
      return format;
    },
  },
  methods:{
    init(){
      this.changeDate()
    },
    changeDate(){
      this.formInline.startTime=new Date(this.$utils.getNearDay("yesterday")+" 00:00:00");
      this.formInline.endTime=new Date(this.$utils.getNearDay("today")+" 23:59:59");
      //this.formInline.startTime=new Date(this.$utils.getNearDay("today")+" 23:59:59");
    }, 
    //打开用户信息表弹窗
    getUserModal(){
      this.userModalVisible = true;
      this.$refs.userModal.openModal();
    },
    //关闭弹窗
    closeUserModal(){
      this.userModalVisible = false;
    },
    //选择统计尺度
    selectStatisticWay(){
      if(this.formInline.statisticalWay == "时间统计"){
        this.statisticalTime = true;
      }else{
        this.statisticalTime = false;
      }
    },
    //关闭统计弹窗
    closeStatistic(){
      this.statisticModalVisible = false;
    },
    //获取选择的用户名
    getUserName(data){
      this.formInline.username = data.username;
      this.formInline.userIds = data.userid;
      this.formInline.devSn = data.devSn;//获取设备编号
      // 根据设备编号控制时间的选择区间
      this.controlTime(this.formInline.devSn);
    },
    controlTime(devSn){
        this.$http.send({
          url:this.$utils.api +"/volunteer/getVolunteerDataTime",
          params:{devSn:devSn}
        },this,res => { 
            let data=res.data;
            this.formInline.startTime=data.stime;
            this.formInline.endTime=data.time; 
            this.formInline.options={
              disabledDate (date) {
                {
                  //debugger;
                  let endtime=new Date(data.time);
                  let stime=new Date(data.stime);
                  return date && date.valueOf() < stime.valueOf() - 86400000 || date.valueOf() > endtime.valueOf();
                }
              }
            }
        });
    },
    //查询所有个体暴露量
    searchData(){
      // if(this.formInline.username == ""){
      //   this.$Message.info("请填写用户姓名！")
      //   this.statisticModalVisible = false;
      //   return;
      // }else if (this.formInline.startTime == ''){
      //   this.$Message.info("请选择起始时间！")
      //   this.statisticModalVisible = false;
      //   return;
      // }else if (this.formInline.endTime == ''){
      //   this.$Message.info("请选择终止时间！")
      //   this.statisticModalVisible = false;
      //   return;
      // }else{
      var startTime = this.$utils.formatDate(this.formInline.startTime,'yyyy-MM-dd hh:mm:ss');
      //var endTime = this.$utils.formatDate(this.formInline.endTime,'yyyy-MM-dd hh:mm:ss');  
      const msg = this.$Message.loading({
                    content: '正在加载...',
                    duration: 0
                });
      setTimeout(msg, 5000);

      this.$http.sendAll([
        {url: this.$utils.api +"/risk/stasticsRiskByTime", params: {
          userIds:this.formInline.userIds,
          startTime:startTime,
          //endTime:endTime,
          riskType:0
          }},
        {url: this.$utils.api +"/risk/stasticsRiskByTime", params: {
          userIds:this.formInline.userIds,
          startTime:startTime,
         // endTime:endTime,
          riskType:1
          }}
        ],this,(resDaming,resRound)=>{
          var res0=resDaming.data
          var res1=resRound.data
          var res0Data=this.parseData(res0);
          var res1Data=this.parseData(res1);

          var data=[]
          var isCancer=true;
          if(this.formInline.riskType == "0"){
            for(var i=0;i<res0Data.length;i++){
              data.push(res0Data[i][0]);
               data[i].risk0=res0Data[i][0].risk
              data[i].risk1=res1Data[i][0].risk
              /*data[i].lon=res0Data[i].jd
              data[i].lat=res0Data[i].wd */
            }
          }else{
            isCancer=false;
            for(var i=0;i<res1Data.length;i++){
                data.push(res1Data[i][0])
                 data[i].risk0=res0Data[i][0].risk
                data[i].risk1=res1Data[i][0].risk
                /*data[i].lon=res1Data[i].jd
                data[i].lat=res1Data[i].wd */
            }
          }
          //msg.close();
          var params={
            da:data,
            iscancer:isCancer
          }
          this.$emit("excutemethods","IndividualRiskStatistic",params)
          this.aGis.zoom=14
      });
    },
    parseData(res0){
      var dataAll=[]
      var names=[];
      for(var key in res0.data.userInfo){
        var info=res0.data.userInfo[key]
        info.name=key
        names.push(info);
      }
      names.forEach(e=>{
        var data=res0.data[e.name]
        data.forEach(d=>{
          d.name=e.name
          d.sex=e.sex
          d.age=e.age
        })
        dataAll.push(data);
      })
      return dataAll
    },
    //统计分析
    statisticData(){
      if(this.formInline.username == ""){
        this.$Message.info("请填写用户姓名！")
        this.statisticModalVisible = false;
        return;
      }else if (this.formInline.startTime == ''){
        this.$Message.info("请选择起始时间！")
        this.statisticModalVisible = false;
        return;
      }/* else if (this.formInline.endTime == ''){
        this.$Message.info("请选择终止时间！")
        this.statisticModalVisible = false;
        return;
      } */else{
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
