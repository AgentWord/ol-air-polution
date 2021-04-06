<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px">
        <FormItem>
          <Input v-model="formInline.username" >
            <Icon type="person" size="15" slot="append" style="cursor: pointer;" @click="getUserModal"></Icon>
          </Input> 
        </FormItem>
        <FormItem label="时间：">
          <Row>
            <Col span="9">
                <DatePicker type="datetime" placeholder="起始时间"  :options="formInline.options" v-model="formInline.beginTime"></DatePicker>
            </Col>
            <Col span="1" style="text-align: center">-</Col>
             <Col span="9">
                <DatePicker type="datetime" placeholder="终止时间"  :options="formInline.options" v-model="formInline.endTime"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchData">查询</Button> 
          <Button type="primary" icon="ios-play" @click="guijiReplay">回放</Button>
          <Button type="primary" icon="ios-pause" @click="guijiPause">暂停</Button>
          <Button type="primary" icon="stats-bars" @click="statisticData">统计</Button>
        </FormItem> 
      </Form>
    </div> 
    <Dropdown trigger="custom" :visible="GuijiVisible" class="rankTab"  style="margin-top:55px"> 
      <DropdownMenu slot="list"> 
        <Table :height="tableHeight" :columns="columns1" width="500" :data="GuijiStatisticData"></Table> 
      </DropdownMenu>
    </Dropdown>
    <div>
      <usermodal ref="ModalVisible" @setUserName="getUserName" @on-closeUser="closeUserModal" v-show="userModalVisible"></usermodal>
      <statisticmodal ref="statisticModal" :params="formInline" @on-closeStatistic="closeStatistic" v-show="statisticModalVisible"></statisticmodal>
    </div>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
import inputuser from "../../components/base/inputUser.vue";
import usermodal from "../../components/base/userModalSingle.vue";
import statisticmodal from "./statisticModal.vue";
export default {
  components:{
    usermodal,
    statisticmodal,
    inputuser
  },
  data(){
    return{
      loading1: false,
      GuijiVisible: false,
      userModalVisible: false,
      statisticModalVisible: false,
      formInline: {
        username: '',
        userid: '',
        beginTime: '',
        endTime: '',
        title:'个体出行轨迹统计',
        options:{

        }
      }, 
      tableHeight:window.innerHeight - 350,
      ruleValidate:rules.user,
      selectionData:[],
      guijiData:[],
      SingleGuiji:'',
      columns1:[
        {
          title:"姓名",
          key:"userName",
          minWidth:90
        },
        {
          title:"时间段",
          key:"duringTime",
          minWidth:300
        },
        {
          title:"道路名称",
          key:"streetName",
          minWidth:100
        },
        {
          title:"出行方式",
          key:"cxfs",
          minWidth:100
        },
        {
          title:"里程(公里)",
          key:"licheng",
          minWidth:100
        },
      ],
      GuijiStatisticData:[], 
    }
  },
  mounted(){
    //this.changeDate();
  },
  methods:{
    //切换统计尺度
    changeDate(){
      var name = 'yesterday';
      this.formInline.beginTime=new Date(this.$utils.getNearDay(name)+" 00:00:00");
      this.formInline.endTime=new Date(this.$utils.getNearDay("today")+" 23:59:59");
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
            this.formInline.beginTime=data.stime;
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
    //统计轨迹 
    getSingleGuijiStatistic(params){
      this.$http.send({ 
        url: this.$utils.api +"/travelReplay/getSingleGuijiStatistic",
        method:"POST",
        params:params
      }, this, res => {
        var data = res.data;
        this.GuijiStatisticData = [];
        for(var key in data){
          for(var i in data[key]){
            this.GuijiStatisticData.push(data[key][i])
          } 
        } 
        /* if(this.GuijiStatisticData.length==0){
          this.$Message.info("暂无数据")
        } */
      },true);
    },
    //查询单个个体轨迹 utils.formatDate
    searchData(){
       if(this.formInline.username == ""){
         this.$Message.info("请填写用户姓名！")
         this.statisticModalVisible = false;
         return;
       }else if (this.formInline.beginTime == ''){
         this.$Message.info("请选择起始时间！")
         this.statisticModalVisible = false;
         return;
       }else if (this.formInline.endTime == ''){
         this.$Message.info("请选择终止时间！")
         this.statisticModalVisible = false;
         return;
       }else{
        var beginTime = this.$utils.formatDate(this.formInline.beginTime,'yyyy-MM-dd hh:mm:ss');
        var endTime = this.$utils.formatDate(this.formInline.endTime,'yyyy-MM-dd hh:mm:ss'); 
        let params = {userids:this.formInline.userid,beginTime:beginTime,endTime:endTime}
        
        this.getSingleGuijiStatistic(params);
        this.$http.send({
          url: this.$utils.api +"/travelReplay/trackPlayback", 
          method:"POST",
          params:params
          }, this, res => {
          var data = res.data;
          if(data.length>0){
            this.GuijiVisible = true;
          }
          this.guijiData = [];
          this.guijiData = data; 
          for(var item in data){
            var coorArr=data[item];
            this.$emit("excutemethods","DrawSingleRoute",{coorArr:coorArr,name:item });//绘制一条轨迹
          }
          //debugger;
          
        });
       }
    }, 
    //轨迹回放
    guijiReplay(){
      this.$emit("excutemethods","RouteReplay")
    },
    guijiPause(){
      this.$emit("excutemethods","RouteReplayPause")

    },
    //统计分析
    statisticData(){
      if(this.formInline.username == ""){
        this.$Message.info("请填写用户姓名！")
        this.statisticModalVisible = false;
        return;
      }else if (this.formInline.beginTime == ''){
        this.$Message.info("请选择起始时间！")
        this.statisticModalVisible = false;
        return;
      }else if (this.formInline.endTime == ''){
        this.$Message.info("请选择终止时间！")
        this.statisticModalVisible = false;
        return;
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
