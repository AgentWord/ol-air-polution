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
        <FormItem style="margin-right:-73px">
          <Row>
            <Col span="9">
                <DatePicker type="datetime" placeholder="起始时间" :options="formInline.options" format="yyyy-MM-dd HH:mm" v-model="formInline.startTime"></DatePicker>
            </Col>
            <Col span="1" style="text-align: center">-</Col>
             <Col span="9">
                <DatePicker type="datetime" placeholder="终止时间" :options="formInline.options" format="yyyy-MM-dd HH:mm" v-model="formInline.endTime"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="stats-bars" @click="statisticData">统计</Button>
        </FormItem>
      </Form>
    </div>
    <div>
      <usermodal ref="ModalVisible" @setUserName="getUserName" @on-closeUser="closeUserModal" v-show="userModalVisible"></usermodal>
      <statisticmodal ref="statisticModal" :params="formInline" @on-closeStatistic="closeStatistic" v-show="statisticModalVisible"></statisticmodal>
    </div>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
import usermodal from "../../components/base/userModalSingle.vue";
import statisticmodal from "./statisticModal.vue";
export default {
  name:"riskChangeAnalysis",
  components:{
    usermodal,
    statisticmodal,
  },
  data(){
    return{
      userModalVisible: false,
      statisticModalVisible: false,
      formInline: {
        username: '',
        startTime: '',
        endTime: '',
        riskType:"0",
        selectuserid:[],
        type:'风险变化',
        options:{}
      },
      ruleValidate:rules.user,
    }
  },
  mounted(){ 
    //this.init() 
  },
  methods:{
    init(){
      this.changeDate()
    },
    changeDate(){
      this.formInline.startTime=new Date(this.$utils.getNearDay("yesterday")+" 00:00:00");
      this.formInline.endTime=new Date(this.$utils.getNearDay("today")+" 23:59:59");
    },
    //按周统计
    weekStatistic(){
      //获取系统当前时间
      if(this.formInline.statisticalScale == "按周统计"){
        var date2 = new Date(this.formInline.startTime);
        date2.setDate(this.formInline.startTime.getDate()+6);
        var times = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
        this.formInline.endTime = times
      }else{
        this.formInline.endTime = '';
      }
    }, 
    //打开用户信息表弹窗
    getUserModal(){
      this.userModalVisible = true;
      this.$refs.ModalVisible.openModal();
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
    //查询单个个体轨迹 utils.formatDate
    searchData(){ 
      var startTime = this.$utils.formatDate(this.formInline.startTime,'yyyy-MM-dd hh:mm:ss');
      var endTime = this.$utils.formatDate(this.formInline.endTime,'yyyy-MM-dd hh:mm:ss');
      console.log(startTime)
      console.log(endTime)
      this.$http.send({
        url: this.$utils.api +"/risk/riskChangeRate",
        params:{userIds:this.formInline.userid,
          riskType:this.formInline.riskType,
          startTime:startTime,
          endTime:endTime}
      }, this, res => {
        var data = res.data
        console.log(data)
        // this.$emit("excutemethods","RiskChangeAnalysis",{data:data,beginTime:startTime,endTime:endTime});
      },true) 
    },
    statisticData(){
      this.statisticModalVisible = true;
      this.$refs.statisticModal.getStatistic();
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
