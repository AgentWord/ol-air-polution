<template>
  <!-- 风险时段解析 -->
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline"  inline style="padding:10px 10px 0 10px;">
        <FormItem>
          <Select
            v-model="formInline.statisticalType"
            @on-change="changeStatisticType"
            style="width:100px"
          >
            <Option value="0">个体统计</Option>
            <Option value="1">人群统计</Option>
          </Select>
        </FormItem>
        <FormItem v-show="individualStatistic">
          <Input v-model="formInline.username">
            <Icon
              type="person"
              size="15"
              slot="append"
              style="cursor: pointer;"
              @click="getUserModal"
            ></Icon>
          </Input>
        </FormItem>
        <FormItem v-show="crowdStatistic">
          <Select v-model="formInline.crowdType" style="width:120px">
            <Option value="0">儿童</Option>
            <Option value="1">青年</Option>
            <Option value="2">中年</Option>
            <Option value="3">老年</Option>
            <Option value="4">总人群</Option>
          </Select>
        </FormItem>
       <!--  <FormItem v-show="crowdStatistic">
          <Select v-model="formInline.diqu" style="width:120px">
            <Option
              v-for="item in this.$utils.diquArr"
              :key="item.id"
              :value="item.value"
            >{{item.label}}</Option>
          </Select>
        </FormItem> -->
        <FormItem>
          <Select v-model="formInline.riskType" style="width:120px">
              <Option value="0">致癌风险</Option>
              <Option value="1">非致癌风险</Option>

          </Select>
        </FormItem>
        <FormItem style="margin-right:-40px" v-show="individualStatistic">
          <Row>
            <Col span="10">
              <DatePicker type="datetime" placeholder="起始时间" :options="formInline.options" v-model="formInline.startTime"></DatePicker>
            </Col>
            <Col span="1" style="text-align: center">-</Col>
            <Col span="10">
              <DatePicker type="datetime" placeholder="终止时间" :options="formInline.options" v-model="formInline.endTime"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem v-show="crowdStatistic">
          <Select v-model="formInline.jj" style="width:120px" placeholder="选择季节">
            <Option v-for="item in jjArr" :key="item" :value="item">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
        </FormItem>
      </Form>
    </div>
    <Dropdown trigger="custom" :visible="visible" style="margin-top:55px">
      <DropdownMenu slot="list">
        <a href="#" id="popup-closer" class="ol-popup-closer" @click="closeTable"></a>

        <Table :columns="columns1" height="350" highlight-row :data="data1" @on-row-click="onRowClick"></Table>
      </DropdownMenu>
    </Dropdown>
    <div>
      <usermodal
        ref="ModalVisible"
        @setUserName="getUserName"
        @on-closeUser="closeUserModal"
        v-show="userModalVisible"
      ></usermodal>
    </div>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
import usermodal from "../../components/base/userModalSingle.vue";
import statisticmodal from "./statisticModal.vue";
export default {
  components: {
    usermodal,
    statisticmodal
  },
  data() {
    return {
      userModalVisible: false,
      statisticModalVisible: false,
      individualStatistic: true,
      crowdStatistic: false,
      formInline: {
        userIds: 0,
        username: "",
        startTime: "",
        endTime: "",
        riskType: "0",
        crowdType: "4",
        statisticalType: "0",
        diqu: "0",
        type: "风险时段解析",
        jj:"春季",
        options:{}
      },
      ruleValidate: rules.user,
      jjArr:["夏季","冬季"],
      visible: false,
      tableHeight: window.innerHeight - 470,
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 60
        },
        {
          title: "风险时段",
          key: "time",
          minWidth: 250
        },
        {
          title: "风险值",
          key: "risk",
          minWidth: 120,
          /* render: (h, params) => {

            return h("div", this.num2e(params.row.risk));
          } */
        }
      ],
      data1: []
    };
  },
  mounted() {
    this.init();
    /* let toolEle=document.getElementsByClassName("tools");
    let form=document.getElementsByTagName("form");
    toolEle[0].style.width="70%";
    console.log(form[0].style.width); */
  },
  methods: {
    init() {
      //this.changeDate();
    },
    //切换统计个体和人群
    changeStatisticType() {
      this.visible = false;
      //this.aGis.map.removeAll();
      if (this.formInline.statisticalType == "0") {
        this.individualStatistic = true;
        this.crowdStatistic = false;
      } else {
        this.individualStatistic = false;
        this.crowdStatistic = true;
        // 切换到人群时，时间怎么处理？
      }
    },
    //默认时间
    changeDate() {
      this.formInline.startTime = new Date(
        this.$utils.getNearDay("yesterday") + " 00:00:00"
      );
      this.formInline.endTime = new Date(
        this.$utils.getNearDay("today") + " 23:59:59"
      );
    },

    //打开用户信息表弹窗
    getUserModal() {
      this.userModalVisible = true;
      this.$refs.ModalVisible.openModal();
    },
    //关闭弹窗
    closeUserModal() {
      this.userModalVisible = false;
    },
    //关闭统计弹窗
    closeStatistic() {
      this.statisticModalVisible = false;
    },
    //获取选择的用户名
    getUserName(data) {
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
    searchData() {
      
      if (this.formInline.statisticalType == "0") {
        //个体
        var startTime = this.$utils.formatDate(
          this.formInline.startTime,
          "yyyy-MM-dd hh:mm:ss"
        );
        var endTime = this.$utils.formatDate(
          this.formInline.endTime,
          "yyyy-MM-dd hh:mm:ss"
        );
        this.$http.send(
          {
            url: this.$utils.IP + "/risk/person/riskTimeStastics",
            params: {
              userIds: this.formInline.userIds,
              riskType: this.formInline.riskType,
              startTime: startTime,
              endTime: endTime
            }
          },
          this,
          res => {
            if (res.success) {
              var data = res.data;
              console.log("test Console");
              if(data.length<=0){
                this.$Message.warning("无此数据，请重新选择解析条件！");
                return;
              }
              this.data1 = [];
              for (var key in data) {
                for (var i in data[key]) {
                  data[key][i].lon = data[key][i].jd;
                  data[key][i].lat = data[key][i].wd;
                  this.data1.push(data[key][i]);
                }
              }
              if (this.data1.length > 0) {
                this.visible = true;
              }
              this.$emit("excutemethods", "riskTimePeriodAnalysisPersonal", this.data1);
            }
          },
          
        );
      } else {
        // 人群
        //console.log("I am here:"+this.$utils.IP);
        this.$http.send(
          {
            //http://106.37.181.79:19999/risk/crowd/riskTimeStastics
            //url: this.$utils.IP + "/risk/crowd/riskTimeStastics",
            url: this.$utils.IP + "/risk/crowd/riskMapTable",
            params: this.formInline
          },
          this,
          res => {
            if (res.success) {
              var data = res.data;
              //this.data1 = [];
              // for (var i in data) {
              //   data[i].lon = data[i].jd;
              //   data[i].lat = data[i].wd;
              //   data[i].risk = data[i].risk;
              //   data[i].time = data[i].date;
              //   this.data1.push(data[i]);
              // }
              this.data1=data;
              if (data.length > 0) {
              // 加载第一个地图数据
              data.preUrl=data[0].url;
              data.layerid=data[0].layer;
              data.title="人群风险时段解析";
              this.$emit("excutemethods","riskTimePeriodAnalysisCrowd",{data:data,title:"人群风险时段解析"});
              this.visible = true;
              this.aGis.zoom=12;
                //this.drawCrowdMap();
              } else {
                this.$Message.info("暂无数据！");
              }
            }
          },
          true
        );
      }
    },
    /* 监听人群表格的点击事件 */
   onRowClick(rowdata,index){
     //console.table(rowdata);
     if(this.individualStatistic){
       this.$emit("excutemethods","goTo",[rowdata.jd,rowdata.wd]);
       return;
     }
     rowdata.preUrl=rowdata.url;
     rowdata.layerid=rowdata.layer;
     rowdata.title="人群风险时段解析";
     this.$emit("excutemethods","riskTimePeriodAnalysisCrowd",{data:rowdata,title:"人群风险时段解析"});

   },
    drawCrowdMap() {
      this.$http.sendMock(
        {
          url: "PopulationRiskStatistics"
        },
        this,
        res => {
          var data = res.data;
          this.$emit("excutemethods", "TargetScenarioSimulation", {
            data: data,
            id: this.formInline.riskType,
            title: "人群风险"
          });
        }
      );
    },
    num2e(num) {
      var p = Math.floor(Math.log(num) / Math.LN10);
      var n = num * Math.pow(10, -p);
      return n + "e" + p;
    },
    toNumber(num) {
      //if (this.formInline.riskType == "0") {
        num = num.toExponential(6);
      //}
      // else{
      //   num = num.toFixed(4)
      // }
      //return num;
    },
    closeTable(){
      this.visible=false;
    }
  }
};
</script>

<style scoped>
.toolbox {
  background: #fff;
  position: absolute;
  z-index: 1000;
  right: 0px;
  height: 55px;
}
.ivu-select-dropdown {
    width: 45%;
    right: 10px;
    
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
