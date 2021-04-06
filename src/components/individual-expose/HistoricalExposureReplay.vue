<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px 10px 0 10px;">
        <FormItem>
          <Input v-model="formInline.username" >
            <Icon type="person" size="15" slot="append" style="cursor: pointer;" @click="getUserModal"></Icon>
          </Input>
        </FormItem>
        <FormItem label="时间：" >
          <Row>
            <Col span="9">
                <DatePicker type="datetime" placeholder="起始时间" :options="formInline.options" v-model="formInline.beginTime"></DatePicker>
            </Col>
            <Col span="1" style="text-align: center">-</Col>
             <Col span="9">
                <DatePicker type="datetime" placeholder="终止时间" :options="formInline.options" v-model="formInline.endTime"></DatePicker>
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
    <Dropdown trigger="custom" :visible="GuijiVisible" class="rankTab" style="margin-top:55px;right: 20px;float:right"> 
     
      <DropdownMenu slot="list" > 
        <a href="#" id="popup-closer" class="ol-popup-closer" @click="closeTable"></a><br>
        <Table border  :height="tableHeight" :columns="columns2" :data="GuijiStatisticData"></Table> 
      </DropdownMenu>
    </Dropdown>
    <div>
      <usermodal ref="ModalVisible" @setUserName="getUserName" @on-closeUser="closeUserModal" v-show="userModalVisible"></usermodal>
      <statisticmodal ref="statisticModal" :params="formInline" v-show="statisticModalVisible"></statisticmodal>
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
        title:'个体暴露测量统计',
        options:{}
      },
      ruleValidate:rules.user,
      selectionData:[],
      guijiData:[],
      SingleGuiji:'',
      tableHeight:window.innerHeight - 350,
      columns1:[
        /* {
          title:"姓名",
          key:"userName",
          minWidth:80
        }, */
        {
          title:"时间段",
          key:"duringTime",
          minWidth:200
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
        {
          title:"AERI(ug/(kg·min))",
          key:"aeri",
          minWidth:100
        }
      ],
      GuijiStatisticData:[], 
    }
  },
  mounted(){ 
    //this.changeDate();
    // this.$nextTick(()=>{
    //     this.renderHeaderFilter();
    //   })
    
  },
  computed:{
    columns2(){
      let columns = [];
      /* columns.push(
        {
          title:"姓名",
          key:"userName",
          minWidth:80
        }
      ); */
      columns.push(
       {
          title:"时间段",
          key:"duringTime",
          minWidth:200
        }
      );
      columns.push(
        {
          title:"道路名称",
          key:"streetName",
          minWidth:100
        }
      );
      columns.push(
        {
          title:"出行方式",
          key:"cxfs",
          minWidth:100
        }
      );
      columns.push(
        {
          title:"里程(公里)",
          key:"licheng",
          minWidth:100
        }
      );
      columns.push({
          title:"AERI",
          key:"aeri",
          minWidth:150,
          filters: [
              {
                  label: 'AERI',
                  value: 'AERI'
              },
              {
                  label: 'PM₂.₅',
                  value: 'PM₂.₅'
              },
              {
                  label: 'PM₁₀',
                  value: 'PM₁₀'
              },
              {
                  label: 'NO₂',
                  value: 'NO₂'
              },
              {
                  label: 'SO₂',
                  value: 'SO₂'
              },
              {
                  label: 'O₃',
                  value: 'O₃'
              },
              {
                  label: 'CO',
                  value: 'CO'
              }
          ],
          filterMethod (value, row,label) {
              this.title=value+"(ug/(kg·min))";
              if(value=="CO"){
                this.title=value+"(mg/(kg·min))";
              }
              if(value=="AERI"){
                this.title=value;
              }
              this.key=getPollutionField(value);
              return row;
          },
          filterMultiple:false,
          filteredValue:[]
      });
      function getPollutionField(a){
          switch (a) {
              case "AERI":
                return "aeri";
              case "PM₂.₅":
                return "pm25Exp";
              case "PM₁₀":
                  return "pm10Exp";
              case "NO₂":
                  return "no2Exp";
              case "SO₂":
                  return "so2Exp";
              case "O₃":
                  return "o3Exp";
              case "CO":
                  return "coExp";
              default:
                break;
            }
      }

      return columns;
    }


  },
  methods:{//切换统计尺度
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
    //查询单个个体轨迹
    searchData(){
      // if(this.formInline.username == ""){
      //   this.$Message.info("请填写用户姓名！")
      //   this.statisticModalVisible = false;
      //   return;
      // }else if (this.formInline.beginTime == ''){
      //   this.$Message.info("请选择起始时间！")
      //   this.statisticModalVisible = false;
      //   return;
      // }else if (this.formInline.endTime == ''){
      //   this.$Message.info("请选择终止时间！")
      //   this.statisticModalVisible = false;
      //   return;
      // }else{
        const loading=this.$Message.loading({
            content: '数据加载中...',
            duration: 0
        });
        var beginTime = this.$utils.formatDate(this.formInline.beginTime,'yyyy-MM-dd hh:mm:ss');
        var endTime = this.$utils.formatDate(this.formInline.endTime,'yyyy-MM-dd hh:mm:ss');
        // let params = {userids:this.formInline.userid,beginTime:beginTime,endTime:endTime}
        
        this.getSingleGuijiStatistic({userids:this.formInline.userid,beginTime:beginTime,endTime:endTime}); 
        this.$http.send({
          url: this.$utils.api +"/exposure/historyExposureMap",
          method:"POST",
          params:{userIds:this.formInline.userid,start:beginTime,end:endTime}
        }, this, res => {
          var data = res.data;
          this.guijiData = [];
          this.guijiData = data;
          for(var item in data){
            var coorArr=data[item];
            this.$emit("excutemethods","DrawSingleRoute",{coorArr:coorArr,name:item });//绘制一条轨迹
          }
          //this.$emit("excutemethods","drawGuiJi",data)
          
          setTimeout(loading, 2000);
          this.GuijiVisible = true;
          document.getElementsByClassName("ivu-table-filter-select-item")[0].style.display='none';
          document.getElementsByClassName("ivu-select-dropdown")[3].style.right='10px';
          document.getElementsByClassName("ivu-select-dropdown")[3].style.width='730px';
        });
      // }
    },
    
    //获取单个个体轨迹统计
    getSingleGuijiStatistic(params){
      this.statisticModalVisible = true;
      this.$http.send({
        url: this.$utils.api +"/exposure/historyExposure",
        method:"POST",
        params:params
      }, this, res => {
        var data = res.data;
        this.GuijiStatisticData = [];
        for(var key in data){ 
          for(var i in data[key]){ 
            data[key][i]["userName"]  = key; 
            data[key][i]["inTime"]  = data[key][i].time; 
            this.GuijiStatisticData.push(data[key][i])
          } 
        }
        /* if(this.GuijiStatisticData.length==0){
          this.$Message.info("暂无数据")
        } */ 
      },true);
    },
    //轨迹回放
    guijiReplay(){
      this.$emit("excutemethods","RouteReplay");
    },
    guijiPause(){
      this.$emit("excutemethods","RouteReplayPause");
    },
    //统计分析
    statisticData(){
      if(this.formInline.username == ""){
        this.$Modal.warning({
          title:"",
          content:"请填写用户姓名！"
        })
        this.statisticModalVisible = false;
        return;
      }else if (this.formInline.beginTime == ''){
        this.$Modal.warning({
          title:"",
          content:"请选择起始时间！"
        })
        this.statisticModalVisible = false;
        return;
      }else if (this.formInline.endTime == ''){
        this.$Modal.warning({
          title:"",
          content:"请选择终止时间！"
        })
        this.statisticModalVisible = false;
        return;
      }else{
        this.statisticModalVisible = true;
        this.$refs.statisticModal.getStatistic();
      }
    },
    
    closeTable(){
      this.GuijiVisible=false;
    }
  }
}
</script>

<style scoped>
.toolbox{
  background: #fff;
  position: absolute;
  z-index: 901;
  right: 0px;
  height: 55px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
  z-index: 200;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>
