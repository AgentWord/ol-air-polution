<template>
  <!-- 污染物解析 -->
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px">
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
        <!-- <FormItem v-show="crowdStatistic">
          <Select v-model="formInline.crowdType" style="width:120px">
            <Option value="0">儿童</Option>
            <Option value="1">青年</Option>
            <Option value="2">中年</Option>
            <Option value="3">老年</Option>
            <Option value="4">总人群</Option>
          </Select>
        </FormItem> -->
        <FormItem>
          <Select v-model="formInline.riskType" style="width:120px">
            <Option value="0">致癌风险</Option>
            <Option value="1">非致癌风险</Option>
            <!-- <Option value="2">暴露指数</Option> -->
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
        <FormItem  v-show="individualStatistic">
          <DatePicker
            type="datetime"
            placeholder="选择时间"
            v-model="formInline.timePoint"
             
            :options="formInline.options"
          ></DatePicker>
        </FormItem>
        <FormItem  v-show="individualStatistic">
          <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
          <Button type="primary" icon="stats-bars" @click="statistic">统计</Button>
        </FormItem>
        <FormItem  v-show="crowdStatistic">
          <Button type="primary" icon="ios-search" @click="analysisData">查询</Button>
          <Button type="primary" icon="stats-bars" @click="statistic">统计</Button>
        </FormItem>
      </Form>
    </div>
    <usermodal
      ref="ModalVisible"
      @setUserName="getUserName"
      @on-closeUser="closeUserModal"
      v-show="userModalVisible"
    ></usermodal>

    <Modal :title="title" v-model="formModelShow" :mask-closable="false" width="800">
      <statisticmodal ref="pollutantAnaly" :params="formInline" @on-model-close="handleModelClose"></statisticmodal>
    </Modal>
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
      individualStatistic: true,
      crowdStatistic: false,
      formModelShow: false,
      formInline: {
        userIds: 6,
        username: "",
        timePoint: "",
        riskType: "0",
        crowdType: "0",
        statisticalType: "0",
        type: "污染物解析",
        jj:"",
        time:'',
        options:{}
        
      },
      title: "污染物解析统计",
      ruleValidate: rules.user,
      Seasons:[],
      timeArr:[],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //this.changeDate();
    },
    //切换统计个体和人群
    changeStatisticType() {
      if (this.formInline.statisticalType == "0") {
        this.individualStatistic = true;
        this.crowdStatistic = false;
      } else {
        this.individualStatistic = false;
        this.crowdStatistic = true;
        /* 默认风险类型为致癌风险 0 所以在切换至人群的时候去查询季节信息 */
        this.getSeasonData(this.formInline.riskType);
      }
    },
    //切换统计尺度
    changeDate() {
      this.formInline.timePoint = new Date(this.$utils.getNearDay("now"));
    },
    //打开用户信息表弹窗
    getUserModal() {
      this.userModalVisible = true;
      this.$refs.ModalVisible.openModal();
    },
    //关闭用户弹窗
    closeUserModal() {
      this.userModalVisible = false;
    },
    //关闭统计弹窗
    handleModelClose() {
      this.formModelShow = false;
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
            this.formInline.timePoint=data.stime;
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
    //个体解析
    analysisPerson() {
      var timePoint = this.$utils.formatDate(
        this.formInline.timePoint,
        "yyyy-MM-dd hh:mm:ss"
      );
      if (this.formInline.riskType == "2") {
        this.$http.send(
          {
            url: this.$utils.IP + "/analysis/person/pollutantsStastics",
            params: {
              userIds: this.formInline.userIds,
              riskType: this.formInline.riskType,
              timePoint: timePoint
            }
          },
          this,
          res => {
            if (res.success) {
              var data = res.data;
              //在这里解析
              var parseData = [];
              data.forEach(e => {
                var s = e.aeriAnalysisEntity;
                s.name = e.name;
                parseData.push(s);
              });
              var options = this.setOptions(parseData);
              this.$emit("excutemethods", "PollutantAnalysis", {
                data: options
              });
            }
          },
          true
        );
      } else {
        this.$http.send(
          {
            url: this.$utils.IP + "/analysis/person/pollutantsPie",
            params: {
              userIds: this.formInline.userIds,
              riskType: this.formInline.riskType,
              timePoint: timePoint
            }
          },
          this,
          res => {
            if (res.success) {
              var data = res.data;
              var parseData = [];
              data.forEach(e => {
                var s = e.bfbData;
                s.name = e.name;
                s.jd = e.jd;
                s.wd = e.wd;
                parseData.push(s);
              });
              var options = this.setOptions(parseData);
              this.$emit("excutemethods", "PollutantAnalysis", {
                data: options
              });
            }
          },
          true
        );
      }
    },
    //人群解析
    analysisCrowd() {
      var timePoint = this.$utils.formatDate(
        this.formInline.timePoint,
        "yyyy-MM-dd hh:mm:ss"
      );
      if (this.formInline.riskType == "2") {
        this.$http.send(
          {
            url: this.$utils.IP + "/analysis/crowd/pollutantsStastics",
            params: {
              crowdType: this.formInline.crowdType,
              riskType: this.formInline.riskType,
              timePoint: timePoint
            }
          },
          this,
          res => {
            if (res.success) {
              var data = [res.data.aeri];
              var options = this.setOptionsOfCrowd(data);
              this.$emit("excutemethods", "PollutantAnalysis", {
                data: options
              });
            }
          },
          true
        );
      } else {
        this.$http.send(
          {
            url: this.$utils.IP + "/analysis/crowd/pollutantsPieStastics",
            params: {
              crowdType: this.formInline.crowdType,
              riskType: this.formInline.riskType,
              timePoint: timePoint
            }
          },
          this,
          res => {
            if (res.success) {
              var data = [res.data.component];
              var options = this.setOptionsOfCrowd(data);
              this.$emit("excutemethods", "PollutantAnalysis", {
                data: options
              });
            }
          },
          true
        );
      }
    },
    //查询饼图
    searchData() {
      if (this.formInline.statisticalType == "0") {
        this.analysisPerson();
       
      } else {
        this.analysisCrowd();
       
      }
    },
    loadMap(){
      this.$http.send({
        url:this.$utils.api +"/risk/crowd/riskPositionStasticsData",
        params:this.formInline
      },this,res => {
        var result = res.data; 
        result.forEach(element => {
          element.whjType=element.dd;
        });
        //console.table(result);
        //this.data1=result;
        //this.visible = true;
        // 加载第一个地图数据
        var data={};
        data.preUrl=result[0].url;
        data.layerid=result[0].layer;
        data.title="人群风险地点解析";
        this.$emit("excutemethods","riskTimePeriodAnalysisCrowd",{data:data,title:"人群风险地点解析"});
      },true);
    },


    setOptions(res) {
      var options = [],
        grid = [],
        series1 = [],
        legend = [],
        series2 = [
          {
            name: "小人",
            type: "scatter",
            coordinateSystem: "geo",
            data: [], //是个数组就好了啊
            showAllSymbol: true,
            symbol:
              "image://http://211.159.186.65/subsystemold/aqi/loc-0-0-0.png",
            // symbol: "image://http://211.159.186.65/subsystemold/aqi/loc-"+ picUrl[0]+"-"+ picUrl[1] +"-"+ picUrl[2]+".png",
            symbolSize: [40, 40],
            symbolOffset: [0, 60],
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#ddb926"
              }
            }
          }
        ];
      for (var i = 0; i < res.length; i++) {
        var datas = [],series = [];
        grid.push({
          lat: res[i].wd,
          lon: res[i].jd,
          // width: "38px",
          // height: "38px",
          // show:true,
        });
        for (var key in res[i]) {
          if (key == "jd" || key == "wd" || key == "recId" || key == "name") {
            continue;
          }
          var result = key.replace("Aeri", "").replace("Bfb", "");
          //datas.push({ name: result, value: res[i][key] });
          datas.push({name: this.$utils.aliasNameMap[result]+":"+res[i][key].toFixed(2)+"%", value: res[i][key],title:result});
        }
        series1.push({
          name: "占比",
          type: "pie",
          radius: ['30%', '50%'],
          //avoidLabelOverlap: true,
          label: {
            normal: {
              show: true,
              position: 'outer',
              alignTo: 'none',
              bleedMargin: 5,
              textStyle: {
                fontSize: "14",
                fontWeight: "bold",
                color: "red"
              },
              
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "18",
                fontWeight: "bold",
                color: "red"
              },
              formatter: params => {
                var alias = this.$utils.aliasNameMap[params.data.title];
                return alias + ":" + params.data.value.toFixed(2) + "%";
              }
            }
          },
          labelLine: {
            normal: {
              show: true,
              
            },
            lineStyle:{
              color:"red",
            }
          },
          data: datas
        });
        series2[0].data.push({
          name: res[i].name,
          value: [res[i].jd, res[i].wd, 0]
        });
      }
      var option1 = {
        grid: grid,
        series: series1
      };
      var option2 = {
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          y: "bottom",
          x: "right",
          data: legend,
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          map: "",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },
        series: series2
      };
      options.push(option2);
      options.push(option1);
      return options;
    },
    setOptionsOfCrowd(res) {
      var options = [],
        grid = [],
        series1 = [],
        legend = [];
      for (var i = 0; i < res.length; i++) {
        var datas = [],
          series = [];
        for (var key in res[i]) {
          if (key == "jd" || key == "wd" || key == "recId" || key == "id"|| key == "jj"|| key == "time") {
            continue;
          }
          var result = key.replace("Bfb", "").replace("Risk", "");
          datas.push({ name:this.$utils.aliasNameMap[result]+":"+(res[i][key]*100).toFixed(2)+"%",value: res[i][key],title: result  });
        }
        series1.push({
          name: "占比",
          type: "pie",
          center:["80%","50%"],
          radius: ['30%', '50%'],
          //avoidLabelOverlap: true,
          label: {
            normal: {
              show: true,
              position: 'outer',
              alignTo: 'none',
              bleedMargin: 5,
              textStyle: {
                fontSize: "14",
                fontWeight: "bold",
                color: "red"
              },
              
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "18",
                fontWeight: "bold",
                color: "red"
              },
              formatter: params => {
                var alias = this.$utils.aliasNameMap[params.data.title];
                return alias + ":" + (params.data.value*100).toFixed(2) + "%";
              }
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          data: datas
        });
      }
      var option1 = {
        grid: { lat: "", lon: "" },
        series: series1
      };
      options.push(option1);
      return options;
    },
    statistic() {
      this.formModelShow = true;
      if (this.formInline.statisticalType == "0") {
        this.statisticPerson();
      } else {
        this.statisticCrowd();
      }
    },
    //个体统计
    statisticPerson() {
      var timePoint = this.$utils.formatDate(
        this.formInline.timePoint,
        "yyyy-MM-dd hh:mm:ss"
      );
      this.$http.send(
        {
          url: this.$utils.IP + "/analysis/person/pollutantsStastics",
          params: {
            userIds: this.formInline.userIds,
            riskType: this.formInline.riskType,
            timePoint: timePoint
          }
        },
        this,
        res => {
          if (res.success) {
            var data = res.data;
            //在这里解析
            if (this.formInline.riskType == "2") {
              var parseData = [];
              data.forEach(e => {
                var s = {};
                s.value = e.aeriAnalysisEntity;
                s.name = e.name;
                parseData.push(s);
              });
              this.$refs.pollutantAnaly.getStatistic(parseData);
            } else {
              var parseData = [];
              data.forEach(e => {
                var s = {};
                s.value = e.data;
                s.name = e.name;
                parseData.push(s);
              });
              this.$refs.pollutantAnaly.getStatistic(parseData);
            }
          }
        },
        true
      );
    },
    //人群统计
    statisticCrowd() {
      /* var timePoint = this.$utils.formatDate(
        this.formInline.timePoint,
        "yyyy-MM-dd hh:mm:ss"
      ); */
      this.$http.send(
        {
          url: this.$utils.IP + "/analysis/crowd/pollutantsStastics",
          params: this.formInline
        },
        this,
        res => {
          if (res.success) {
            var data = [res.data];
            //在这里解析
            if (this.formInline.riskType == "2") {
              var parseData = [];
              data.forEach(e => {
                var s = {};
                s.value = e.aeri;
                s.name = this.$utils.renqunText(this.formInline.crowdType);
                parseData.push(s);
              });
              this.$refs.pollutantAnaly.getStatistic(parseData);
            } else {
              var parseData = [];
              data.forEach(e => {
                var s = {};
                s.value = e.component;
                s.name ="污染物解析统计";// this.$utils.renqunText(this.formInline.crowdType);
                parseData.push(s);
              });
              this.$refs.pollutantAnaly.getStatistic(parseData);
            }
          }
        },
        true
      );
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
        url:this.$utils.api +"/analysis/crowd/pollutantsPieStasticsJJ",
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
        url:this.$utils.api +"/analysis/crowd/pollutantsPieStasticsTime",
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
      this.$http.send({
        url:this.$utils.api +"/analysis/crowd/pollutantsPieStastics",
        params:this.formInline
      },this,res => {
        var data =res.data;
        var options = this.setOptionsOfCrowd(data);
        this.$emit("excutemethods", "PollutantAnalysis", {
          data: options
        });
        this.loadMap();
      },true);

    },
  }
};
</script>

<style scoped>
.toolbox {
  background: #fff;
  position: absolute;
  z-index: 100;
  right: 0px;
  height: 55px;
}
</style>
