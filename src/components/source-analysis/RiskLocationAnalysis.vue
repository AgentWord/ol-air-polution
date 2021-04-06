<template>
  <!-- 风险地点解析 -->
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px 10px 0 10px;">
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
        <!-- 注释人群类型接口  cdb 2019-10-5-->
        <!-- <FormItem v-show="crowdStatistic">
          <Select v-model="formInline.crowdType" style="width:120px">
            <Option value="0">儿童</Option>
            <Option value="1">青年</Option>
            <Option value="2">中年</Option>
            <Option value="3">老年</Option>
            <Option value="4">总人群</Option>
          </Select>
        </FormItem> -->
        <!-- <FormItem v-show="crowdStatistic">
          <Select v-model="formInline.regionalScope" style="width:120px">
            <Option
              v-for="item in this.$utils.diquArr"
              :key="item.id"
              :value="item.value"
            >{{item.label}}</Option>
          </Select>
        </FormItem> -->
        <FormItem>
          <Select v-model="formInline.riskType" style="width:120px" @on-change="changeRisk">
            <Option value="0">致癌风险</Option>
            <Option value="1">非致癌风险</Option>
          </Select>
        </FormItem>
        <!-- 增加季节的选项  人群 cdb 2019-10-5 -->
        <FormItem v-show="crowdStatistic">
          <Select v-model="formInline.jj" style="width:120px" placeholder="请选择季节" @on-change="changeSeason">
            <Option
              v-for="item in this.Seasons"
              :key="item"
              :value="item"
            >{{item}}</Option>
          </Select>
        </FormItem>
         <!-- 时间选择更改为时间列表选择 人群  cdb 2019-10-5 -->
         <FormItem v-show="crowdStatistic">
          <Select v-model="formInline.time" style="width:120px" placeholder="请选择时间" >
            <Option
              v-for="item in this.timeArr"
              :key="item"
              :value="item"
            >{{item}}</Option>
          </Select>
        </FormItem>
         <FormItem v-show="individualStatistic" >
              <DatePicker type="datetime" placeholder="起始时间" :options="formInline.options" v-model="formInline.startTime"></DatePicker>
              <DatePicker type="datetime" placeholder="终止时间" :options="formInline.options" v-model="formInline.endTime"></DatePicker>

          
        </FormItem>
        <FormItem  v-show="individualStatistic">
          <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
        </FormItem>
        <!-- 查询按钮 人群  cdb 2019-10-5 -->
        <FormItem v-show="crowdStatistic">
          <Button type="primary" icon="ios-search" @click="analysisData">查询</Button>
        </FormItem>
      </Form>
    </div>
    <Dropdown trigger="custom" :visible="visible" style="margin-top:55px">
      <DropdownMenu slot="list">
        <a href="#" id="popup-closer" class="ol-popup-closer" @click="closeTable"></a>
        <Table :height="tableHeight" :columns="columns1" width="400" :data="data1" @on-row-click="onRowClick"></Table>
      </DropdownMenu>
    </Dropdown>
    <div>
      <usermodal
        ref="ModalVisible"
        @setUserName="getUserName"
        @on-closeUser="closeUserModal"
        v-show="userModalVisible"
      ></usermodal>
      <!-- <statisticmodal ref="statisticModal" :statisticData="formInline" @on-closeStatistic="closeStatistic" v-show="statisticModalVisible"></statisticmodal> -->
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
        jj:'',
        time:'',
        // regionalScope:"保定市",
        type: "风险地点解析",
        options:{}
      },
      Seasons:[],
      timeArr:[],
      ruleValidate: rules.user,
      visible: false,
      iscancer:true,
      tableHeight: window.innerHeight - 470,
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 80
        },
        {
          title: "风险地点",
          key: "whjType",
          minWidth: 150
        },
        {
          title: "风险值",
          key: "risk",
          minWidth: 150,
          render: (h, params) => {
            return h("div", this.toNumber2(params.row.risk));
          }
        }
      ],
      columns2: [
        {
          title: "序号",
          type: "index",
          minWidth: 80
        },
        {
          title: "风险地点",
          key: "whjType",
          minWidth: 150
        },
        {
          title: "风险值",
          key: "avgRisk",
          minWidth: 150,
          render: (h, params) => {
            return h("div", this.toNumber2(params.row.avgRisk));
          }
        }
      ],
      data1: [] // 表格数据绑定值
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
     // this.changeDate();
    },
    //切换统计个体和人群
    changeStatisticType() {
      this.visible = false;
      this.aGis.map.removeAll();
      if (this.formInline.statisticalType == "0") {// 个体
        this.individualStatistic = true;
        this.crowdStatistic = false;
      } else { // 人群
        this.individualStatistic = false;
        this.crowdStatistic = true;
        /* 默认风险类型为致癌风险 0 所以在切换至人群的时候去查询季节信息 */
        this.getSeasonData(this.formInline.riskType);
      }
    },
    /**
     * APIMethod: changeRisk  cdb 2019-10-5
     * 切换风险类型的监听函数  调用获取季节的方法
     *
     * Parameters: 
     * value - {<String>} 当前选中的风险类型. 
     *
     * Returns:
     * {<None>} 
     */
    changeRisk(value){
      // 清空季节、时间
      this.Seasons=this.timeArr=[];
      this.formInline.jj=this.formInline.time='';
      this.getSeasonData(value);
    },
    /**
     * APIMethod: changeSeason  cdb 2019-10-5
     * 切换季节的监听函数  调用获取时间序列的方法
     *
     * Parameters: 
     * value - {<String>} 当前选中的季节. 
     *
     * Returns:
     * {<None>} 
     */
    changeSeason(value){
      // 清空时间数组
      this.timeArr=[];
      this.formInline.time='';
      this.getTimeData(this.formInline.riskType,value);

    },
    /**
     * APIMethod: getSeasonData  cdb 2019-10-5
     * 根据风险类型请求数据库得到季节数据  
     *
     * Parameters: 
     * riskType - {<String>} 风险类型. 
     *
     * Returns:
     * {<None>} 季节数组赋值. 数据结构例如["冬季", "夏季"],
     */
    getSeasonData(riskType){
       this.$http.send({
        url:this.$utils.api +"/risk/crowd/riskPositionStasticsJJ",
        params:{riskType:riskType}
      },this,res => {
        this.Seasons = res.data; 
      },true);
    },
    /**
     * APIMethod: getTimeData  cdb 2019-10-5
     * 根据风险类型+季节数据  => 时间序列
     *
     * Parameters: 
     * riskType - {<String>} 风险类型. 
     * season - {<String>} 季节. 
     *
     * Returns:
     * {<None>} 时间数组赋值. 数据结构例如["17:00-20:00", "10:00-12:00"],
     */
    getTimeData(riskType,season){
       this.$http.send({
        url:this.$utils.api +"/risk/crowd/riskPositionStasticsTime",
        params:{riskType:riskType,jj:season}
      },this,res => {
        this.timeArr = res.data; 
      },true);
    },
    /**
     * APIMethod: analysisData  cdb 2019-10-5
     * 根据风险类型+季节数据+时间序列  => 风险数据
     *
     * Parameters: 
     * riskType - {<String>} 风险类型. 
     * season - {<String>} 季节. 
     *
     * Returns:
     * {<None>} 时间数组赋值. 数据结构例如["17:00-20:00", "10:00-12:00"],
     */
    analysisData(){
      this.iscancer=this.formInline.riskType=="0"?true:false;
      this.$http.send({
        url:this.$utils.api +"/risk/crowd/riskPositionStasticsData",
        params:this.formInline
      },this,res => {
        var result = res.data; 
        result.forEach(element => {
          element.whjType=element.dd;
          if(this.iscancer)
            element.risk = (element.risk*10000).toFixed(2);// 
          else{
            element.risk = (element.risk).toFixed(2);// 
          }
        });
        //console.table(result);
        this.data1=result;
        this.visible = true;
        // 加载第一个地图数据
        var data={};
        data.preUrl=this.data1[0].url;
        data.layerid=this.data1[0].layer;
        data.title="人群风险地点解析";
        this.$emit("excutemethods","riskTimePeriodAnalysisCrowd",{data:data,title:"人群风险地点解析"});
      },true);

    },
    /* 监听人群表格的点击事件 */
   onRowClick(rowdata,index){
     if(this.individualStatistic){
       this.$emit("excutemethods","goTo",[rowdata.jd,rowdata.wd]);
       return;
     }
     //console.table(rowdata);
     rowdata.preUrl=rowdata.url;
     rowdata.layerid=rowdata.layer;
     rowdata.title="人群风险地点解析";
     this.$emit("excutemethods","riskTimePeriodAnalysisCrowd",{data:rowdata,title:"人群风险地点解析"});

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
      this.iscancer=this.formInline.riskType=="0"?true:false;
      var startTime = this.$utils.formatDate(
        this.formInline.startTime,
        "yyyy-MM-dd hh:mm:ss"
      );
      var endTime = this.$utils.formatDate(
        this.formInline.endTime,
        "yyyy-MM-dd hh:mm:ss"
      );
      //this.formInline.userIds = "6,7";
      if (this.formInline.statisticalType == "0") {
        // 个体
        var params = {
          userIds: this.formInline.userIds,
          riskType: this.formInline.riskType,
          startTime: startTime,
          endTime: endTime
        };
        this.$http.send(
          {
            url: this.$utils.IP + "/risk/person/riskPositionStastics",
            params: params
          },
          this,
          res => {
            if (res.success) {
              /* 这里的返回值出现了变动，卧槽 
                1.给表格赋值
                2.在地图绘制出点
              */
             //debugger;
              var data = res.data.maxData;// 获取按照大小排序的数据
              this.data1 = []; // 表格数据
              for (var key in data) {
                // 修改经纬度
                data[key].lon=data[key].jd;
                data[key].lat=data[key].wd;
                this.data1.push(data[key]);
              }
              this.visible = true;
              var cancer=this.formInline.riskType=="0"?true:false;
              var params={
                da:this.data1,
                iscancer:cancer
              }
              this.$emit("excutemethods", "riskLocationAnalysis", params);
            }
          },
          true
        );
      } else {
        // 人群
        this.$http.send(
          {
            url: this.$utils.IP + "/risk/crowd/riskPositionStastics",
            params: {
              crowdType: this.formInline.crowdType,
              riskType: this.formInline.riskType,
              startTime: startTime,
              endTime: endTime
            }
          },
          this,
          res => {
            if (res.success) {
              
              var data = res.data;
              this.data1 = [];
              for (var i in data) {
                this.data1.push(data[i]);
              }
              if (this.data1.length > 0) {
                this.visible = true;
                this.drawCrowdMap();
              } else {
                this.$Message.info("暂无数据！");
              }
            }
          },
          true
        );
      }
    },
    mapLocation(params) {
      this.$http.send(
        {
          url: this.$utils.api + "/risk/person/riskTimeStastics",
          params: params
        },
        this,
        res => {
          if (res.success) {
            this.visible = true;
            var data = res.data;
            console.log(data);
            var data1 = [];
            for (var key in data) {
              for (var i in data[key]) {
                data[key][i].lon = data[key][i].jd;
                data[key][i].lat = data[key][i].wd;
                data1.push(data[key][i]);
              }
            }
            this.$emit("excutemethods", "riskTimePeriodAnalysis", data1);
          }
        },
        true
      );
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
    toNumber(num) {
      if (this.formInline.riskType == "0") {
        num = num.toExponential(6);
      } else {
        num = num.toFixed(6);
      }
      return num;
    },
    toNumber2(num) {
      if (this.iscancer) {
        num = num+"e-4";
      } 
      return num;
    },
    closeTable(){
      this.visible=false;
    }
    // statisticData(){
    //   this.statisticModalVisible = true;
    //   this.$refs.statisticModal.getStatistic();
    // },
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
