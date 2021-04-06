
<template>
  <div>
    <Modal :title="this.statisticData.statisticTitle" v-model="statisticModal" :mask-closable="false" width="800">
      <Select v-show="crowdVisible" v-model="crowdValue" size="small" style="width:90px" @on-change="getStatistic">
        <Option value="0">总人群</Option>
        <Option value="1">青少年</Option>
        <Option value="2">青年</Option>
        <Option value="3">中年</Option>
        <Option value="4">老年</Option>
      </Select>
      <Select v-show="exposureRiskVisible" v-model="exposureRiskValue" size="small" style="width:120px" @on-change="getStatistic">
        <Option value="0">暴露风险</Option>
        <Option value="1">暴露风险变化率</Option>
      </Select>
      <Select v-show="IndividualRisk" v-model="riskType" size="small" style="width:96px" @on-change="getStatistic">
        <Option value="致癌风险">致癌风险</Option>
        <Option value="非致癌风险">非致癌风险</Option>
      </Select>
      <Select v-show="pollutionVisible" v-model="pollutionType" size="small" style="width:96px" @on-change="getStatistic">
        <Option v-for="item in dataSelect" :value="item.label" :key="item.id">{{item.label}}</Option>
      </Select>
      <div id="myChart" class="myEcharts"></div>
      <div slot="footer">
        <Button type="ghost" @click="onClose">取消</Button>
        <Button type="primary" @click="onClose">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props:{
    statisticData:Object
  },
  data(){
    return{
      chackValue:"",
      riskType:'致癌风险',
      exposureRiskValue:'0',
      crowdValue:'0',
      pollutionType:'PM2.5',
      beginTime:'',
      endTime:'',
      IndividualRisk:true,
      crowdVisible:false,
      exposureRiskVisible:false,
      statisticModal:false,
      pollutionVisible:false,
      dataSelect:[
        {
          label:"PM2.5"
        },
        {
          label:"PM10"
        },
        {
          label:"SO2"
        },
        {
          label:"CO"
        },
        {
          label:"NO2"
        },
        {
          label:"O3"
        },
      ]
    }
  },
  mounted(){
  },
  methods:{
    //关闭弹窗
    onClose(){
      this.statisticModal = false;
      this.$emit("on-closeStatistic");
    },
    //统计类型
    getStatistic(methods){
      this.statisticModal = true;
      switch (this.statisticData.type) {
        case "风险时段解析":
          this.IndividualRisk = true;
          this.crowdVisible = false;
          this.exposureRiskVisible = false;
          this.pollutionVisible = false;
          this.RiskTimePeriodAnalyStatistic();
          this.statisticData.statisticTitle = "个体" + this.riskType + "统计";
          break;
        case "风险地点解析":
          this.IndividualRisk = true;
          this.crowdVisible = false;
          this.exposureRiskVisible = false;
          this.pollutionVisible = false;
          this.RiskLocationAnalyStatistic();
          this.statisticData.statisticTitle = "人群" + this.riskType + "统计";
          break;
        case "污染物解析":
          this.IndividualRisk = true;
          this.crowdVisible = false;
          this.exposureRiskVisible = false;
          this.pollutionVisible = false;
          this.statisticData.statisticTitle = "污染物解析统计";
          this.PollutantAnalyStatistic();
          break;
        case "污染来源解析":
          this.IndividualRisk = false;
          this.crowdVisible = false;
          this.exposureRiskVisible = false;
          this.pollutionVisible = true;
          this.statisticData.statisticTitle = "污染物来源解析统计";
          this.PollutionSourcesAnalyStatistic();
          break;
        default:
          break;
      }
    },
    //风险时段解析统计
    RiskTimePeriodAnalyStatistic(){
      var resDatas = [] , resData = [] , labelFormatter = '';
      var beginTime = this.$utils.formatDate(this.statisticData.beginTime,'yyyy-MM-dd hh') + ":00:00" ;
      var endTime = this.$utils.formatDate(this.statisticData.endTime,'yyyy-MM-dd hh') + ":59:59" ;
        if(this.statisticData.statisticalType == "0"){
          if(this.riskType == "致癌风险"){
            this.$http.send({url: "RiskTimePeriodAnalysisGTZA",
              data:{"userid":this.statisticData.selectuserid,
                "statisticalScale":this.statisticData.statisticalScale,
                "beginTime":beginTime,
                "endTime":endTime,
                "riskType":this.riskType,
                }}, this, res => {
              resDatas = res.data["type" + this.statisticData.statisticalScale];
              if(this.statisticData.selectuserid.length < 2){
                resData = [resDatas[0]];
              }else{
                resData = resData;
              }
              labelFormatter = '*10^-6';
              this.initChartData(resData,labelFormatter);
            });
          }else{
             this.$http.send({url: "RiskTimePeriodAnalysisGTFZA",
              data:{"userid":this.statisticData.selectuserid,
                "statisticalScale":this.statisticData.statisticalScale,
                "beginTime":beginTime,
                "endTime":endTime,
                "riskType":this.riskType,
                }}, this, res => {
              resData = res.data["type" + this.statisticData.statisticalScale];
              if(this.statisticData.selectuserid.length < 2){
                resData = [resDatas[0]];
              }else{
                resData = resData;
              }
              labelFormatter = '';
              this.initChartData(resData,labelFormatter);
            });
          }
        }else{
          if(this.riskType == "致癌风险"){
            this.$http.send({url: "RiskTimePeriodAnalysisRQZA",
              data:{"userid":this.statisticData.selectuserid,
                "statisticalScale":this.statisticData.statisticalScale,
                "regionalScope":this.statisticData.regionalScope,
                "beginTime":beginTime,
                "endTime":endTime,
                "riskType":this.riskType,
                }}, this, res => {
              resData = res.data["type" + this.statisticData.statisticalScale];
              if(this.statisticData.selectuserid.length < 2){
                resData = [resDatas[0]];
              }else{
                resData = resData;
              }
              labelFormatter = '*10^-6';
              this.initChartData(resData,labelFormatter);
            });
          }else{
             this.$http.send({url: "RiskTimePeriodAnalysisRQFZA",
              data:{"userid":this.statisticData.selectuserid,
                "statisticalScale":this.statisticData.statisticalScale,
                "regionalScope":this.statisticData.regionalScope,
                "beginTime":beginTime,
                "endTime":endTime,
                "riskType":this.riskType,
                }}, this, res => {
              resData = res.data["type" + this.statisticData.statisticalScale];
              if(this.statisticData.selectuserid.length < 2){
                resData = [resDatas[0]];
              }else{
                resData = resData;
              }
              labelFormatter = '';
              this.initChartData(resData,labelFormatter);
            });
          }
        }
    },
    initChartData(resData,labelFormatter){
      var legend = [],series = [],xAxisObj={},xAxis=[];
      if(this.statisticData.selectuserid.length < 2){
        resData.forEach(e => {
        legend.push(e.userName||e.crowd);
        var data=[];
        for(var key in e.value){
          xAxisObj[key]=0;
          data.push(e.value[key]);
        }
        series.push({
          name:e.userName||e.crowd,
          type:'bar',
          barWidth:20,
          data:data,
          markPoint:{
            data : [
              {type : 'max', name: '最大值'},
              {type : 'min', name: '最小值'}
            ],
            itemStyle:{
              color:'#2EC7C9'
            }
          },
          markLine : {
            data : [
              { name: '平均值',type : 'average'}
            ],
            label:{
              show:true,
              position:"end",
              formatter: '{b}:{c}'
            },
            lineStyle:{color:'#2EC7C9'}
          },
          itemStyle: {
            normal: {
                color: function(params) {
                  var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
                  // var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ];
                  var index = params.dataIndex;//表示当前的数据条的索引
                  var alternateNumber = colorList.length-1;//表示按几种颜色交替出现
                  var newColor="";//表示最终显示的颜色
                  if(index < alternateNumber){
                    //取出当前索引值对应的colorList的颜色
                    newColor = colorList[index]; 
                  }else{
                    /**当当前的索引值大于等于交替值的时候*/
                    var rowNumber=Math.floor(index/alternateNumber);//表示当前的数据出现在几次
                    //通过表达式计算返回正确的colorList索引
                    newColor = colorList[index-rowNumber*alternateNumber];
                  }
                  return newColor
                }, 
              label: {
                show: false,
                position: 'top',
                formatter: '{c}'
              }
            },
          },
        });
      });
      }else{
        resData.forEach(e => {
          legend.push(e.userName||e.crowd);
          var data=[];
          for(var key in e.value){
            xAxisObj[key]=0;
            data.push(e.value[key]);
          }
          series.push({
            name:e.userName||e.crowd,
              type:'line',
              smooth:true,
              data:data,
              markPoint:{
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ],
                itemStyle:{
                  color:'#2EC7C9'
                }
              },
              markLine : {
                data : [
                  { name: '平均值',type : 'average'}
                ],
                label:{
                  show:true,
                  position:"end",
                  formatter: '{b}:{c}'
                },
                lineStyle:{color:'#2EC7C9'}
              },
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: 'default'
                  },
                },
              },
            });
          });
        }
      for(var key in xAxisObj){
        xAxis.push(key);
      }
      console.log(series);
      this.drawLine(legend,xAxis,labelFormatter,series);
    },
    //风险地点解析统计
    RiskLocationAnalyStatistic(){
      var resData=[], labelFormatter = '',dataType = '';
      // var crowd = this.$utils.renqunText(this.statisticData.crowd);
      if(this.riskType == "致癌风险"){
        dataType = "0";
        labelFormatter = '*10^-6'
      }else{
        dataType = "1"
        labelFormatter = ''
      }
      if(this.statisticData.statisticalType == "0"){
        this.$http.send({url:"RiskLocationAnalysisGT",
          data:{"userid":[this.statisticData.selectuserid],
            "beginTime":this.statisticData.beginTime,
            "endTime":this.statisticData.endTime,
            "riskType":this.riskType
          }}, this, res => {
          resData = res.data["type"+dataType];
        })
      }else{
        var crowd = this.$utils.renqunText(this.statisticData.crowd);
        this.$http.send({url:"RiskLocationAnalysisRQ",
          data:{"crowd":crowd,
            "regionalScope":this.statisticData.regionalScope,
            "beginTime":this.statisticData.beginTime,
            "endTime":this.statisticData.endTime,
            "riskType":this.riskType
          }}, this, res => {
          resData = res.data["type"+dataType];
        })
      }
      var legend = [],series = [],xAxisObj={},xAxis=[];
      resData.forEach(e => {
        legend.push(e.userName||e.crowd);
        var data=[];
        for(var key in e.value){
          xAxisObj[key]=0;
          data.push(e.value[key]);
        }
        series.push({name:e.userName||e.crowd,type:'line',data:data});
      });
      for(var key in xAxisObj){
        xAxis.push(key);
      }
      this.drawLine(legend,xAxis,labelFormatter,series);
    },
    //污染物解析统计
    PollutantAnalyStatistic(){
      var resData=[], labelFormatter = '',dataType = '';
      var beginTime = this.$utils.formatDate(this.statisticData.beginTime,'yyyy-MM-dd hh') + ":00:00" ;;
      var endTime = this.$utils.formatDate(this.statisticData.endTime,'yyyy-MM-dd hh') + ":59:59" ;
      if(this.riskType == "致癌风险"){
        dataType = "0";
        labelFormatter = '*10^-6'
      }else{
        dataType = "1"
        labelFormatter = ''
      }
      if(this.statisticData.statisticalType == "0"){
        this.$http.send({url:"PollutantAnalysisGT",
          data:{"userid":[this.statisticData.selectuserid],
            "beginTime":this.statisticData.beginTime,
            "endTime":this.statisticData.endTime,
            "riskType":this.riskType
          }}, this, res => {
          resData = res.data["type"+dataType];
        })
      }else{
        var crowd = this.$utils.renqunText(this.statisticData.crowd);
        this.$http.send({url:"PollutantAnalysisRQ",
          data:{"crowd":crowd,
            "regionalScope":this.statisticData.regionalScope,
            "beginTime":this.statisticData.beginTime,
            "endTime":this.statisticData.endTime,
            "riskType":this.riskType
          }}, this, res => {
          resData = res.data["type"+dataType];
        })
      }
      var legend = [],series = [],xAxisObj={},xAxis=[];
      resData.forEach(e => {
        legend.push(e.userName||e.crowd);
        var data=[];
        for(var key in e.value){
          xAxisObj[key]=0;
          data.push(e.value[key]);
        }
        series.push({
          name:e.userName||e.crowd,
          type:'bar',
          barWidth: '20',
          markPoint : {
            data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
            ]
          },
          data:data
        });
      });
      for(var key in xAxisObj){
        xAxis.push(key);
      }
      this.drawBarXNo30(legend,xAxis,labelFormatter,series);
    },
    //污染物来源解析统计
    PollutionSourcesAnalyStatistic(){
      var resData=[], labelFormatter = '',dataType = '';
      var beginTime = this.$utils.formatDate(this.statisticData.beginTime,'yyyy-MM-dd hh') + ":00:00" ;;
      var endTime = this.$utils.formatDate(this.statisticData.endTime,'yyyy-MM-dd hh') + ":59:59" ;
      this.$http.send({url:"PollutionSourcesAnalyStatistic",
        data:{"userid":[this.statisticData.selectuserid],
          "regionalScope":this.statisticData.regionalScope,
          "statisticalScale":this.statisticData.statisticalScale,
          "beginTime":this.statisticData.beginTime,
          "endTime":this.statisticData.endTime,
          "pollutionType":this.pollutionType
        }}, this, res => {
        resData = res.data["PM2.5"];
        var legend = [],series = [],xAxisObj={},xAxis=[];
        var nn=1;
        if(this.pollutionType=="CO"){
          nn=10.0;
          labelFormatter = "mg/m³"
        }else{
          labelFormatter = "ug/m³"
        }
      resData.forEach(e => {
        legend.push(e.userName||e.crowd);
        var data=[];
        for(var key in e.value){
          xAxisObj[key]=0;
          // data.push(e.value[key]);
            data.push(parseInt(Math.random()*4+1)*1.0/nn);
        }
        series.push({
          name:e.userName||e.crowd,
          type:'bar',
          barWidth: '20',
          markPoint : {
            data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
            ]
          },
          data:data
        });
      });
      for(var key in xAxisObj){
        xAxis.push(key);
      }
      this.drawBarXNo30(legend,xAxis,labelFormatter,series);
      })
    },
    //绘制统计图 X周不倾斜30°
    drawBarXNo30(legend,xValue,labelFormatter,seriesData){
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      window.onresize = function() {
        myChart.resize();
      };
      // myChart.getDom().className="myEcharts";
      myChart.resize();
      myChart.clear();
      myChart.setOption({
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            // type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          show : true,
          feature : {
          //   mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        legend: {
            data:legend
        },
        xAxis: [{
            type: "category",
            data: xValue,
          }
        ],
        yAxis: [{
            type: "value",
            axisLabel : {
              formatter: '{value} ' + labelFormatter
            }
          }
        ],
        series: seriesData
      });
    },
    //绘制统计图
    drawLine(legend,xValue,labelFormatter,seriesData){
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      window.onresize = function() {
        myChart.resize();
      };
      // myChart.getDom().className="myEcharts";
      myChart.resize();
      myChart.clear();
      myChart.setOption({
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            // type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          show : true,
          feature : {
          //   mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        legend: {
            data:legend
        },
        xAxis: [{
            type: "category",
            data: xValue,
            axisLabel:{
              interval:0,//横轴信息全部显示
              rotate:-30,//-30度角倾斜显示
            }
          }
        ],
        yAxis: [{
            type: "value",
            axisLabel : {
              formatter: '{value} ' + labelFormatter
            }
          }
        ],
        series: seriesData
      });
    }
  },
}
</script>

<style scoped>
  .myEcharts{
    /* width: 100%;
    min-height: 350px; */
    width: 750px;
    height: 350px;
  }
</style>
