<template>
  <div>
    <Modal :title="title" v-model="statisticModal" :mask-closable="false" width="800">
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
    params:Object
  },
  data(){
    return{
      title:'',
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
    getStatistic(){
      this.statisticModal = true;
      switch (this.params.type) {
        case "污染管控仿真":
          this.title = "污染管控仿真前后人群暴露对比统计";
          this.PollutionControlSimulationStatistic();
          break;
        case "人口移动仿真":
          this.PopulationMoveSimulationStatistic();
          this.title = "人口模拟仿真前后人群暴露对比统计";
          break;
        case "污染预测仿真":
          this.title = "污染预测仿真前后人群暴露对比统计";
          this.PollutionPredictSimulationStatistic();
          break;
        default:
          break;
      }
    },
    //污染管控仿真统计
    PollutionControlSimulationStatistic(){
      var resData = [] , labelFormatter = '(ug/m³)';
      /* this.$http.sendMock({
        url:"PCSStatistic" + this.params.controlWay
      },this, res => {
        var data = res.data
        this.initChartData(data,labelFormatter);
      },true) */
      this.$http.send({
        url:this.$utils.api +"/dqjfz/tjfx",
        //params:this.formInline,
        method:"POST"
      },this,res => { 
        var data = res.data;
        this.initChartData(data,labelFormatter,"管控政策","暴露浓度");
      });
    },
    
    //人口移动仿真统计
    PopulationMoveSimulationStatistic(){
      this.$http.send({
        url:this.$utils.api +"/rkydfz/fx",
        //params:this.formInline,
        method:"POST"
      },this,res => { 
        var data = res.data;
        this.initChartData(data,"(ug/m³)","管控政策","暴露浓度");
      });
      /* var labelFormatter = '',dataType = '';
      this.$http.sendMock({
        url: "PMSStatistic" + this.params.controlWay,
        data:{"controlWay":this.params.controlWay,
          "closeName":[this.params.closeName]}
        }, this, res => {
        var data = res.data
        this.initChartData(data,labelFormatter);
      }) */
    },
    //污染预测仿真统计
    PollutionPredictSimulationStatistic(){
      /* var resData=[], labelFormatter = '',dataType = '';
      this.$http.sendMock({
        url: "PMSStatistic" + this.params.controlWay,
        data:{"controlWay":this.params.controlWay,
          "closeName":[this.params.closeName]}
        }, this, res => {
        var data = res.data
        this.initChartData(data,labelFormatter);
      }) */
      this.$http.send({
        url:this.$utils.api +"/qjfz/wrycfz/fx",
        //params:this.formInline,
        method:"POST"
      },this,res => { 
        var data = res.data;
        this.initChartData(data,"(ug/m³)","气候因素","暴露浓度");
      });
    },
    initChartData(datas,labelFormatter,xLabel,yLabel){
      var legendObj={}, legend = [],series = [],xAxisObj={},xAxis=[],seriesData = [];
      for(var key in datas){
        var temp = datas[key];
        seriesData.push(temp.value);
        xAxis.push(temp.action);
        
      }
      series.push({ 
        name: temp.action, 
        type: "bar", 
        barWidth:20, 
        data: seriesData,
        markPoint:{
            data : [
              {type : 'max', name: '最大值'},
              {type : 'min', name: '最小值'}
            ],
            itemStyle:{
              color:'#2EC7C9'
            }
          },
       });
      this.drawBarXNo30(legend,xAxis,labelFormatter,series,xLabel,yLabel); 
    },
    //绘制统计图 X周不倾斜30°
    drawBarXNo30(legend,xValue,labelFormatter,seriesData,xLabel,yLabel){
      let myChart = this.$echarts.init(document.getElementById("myChart"),'macarons');
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
        grid: {
            left: '3%',
            right: '10%',
            bottom: '3%',
            containLabel: true
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
            name:xLabel,
            data: xValue,
          }
        ],
        yAxis: [{
            type: "value",
            name:yLabel,
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
      let myChart = this.$echarts.init(document.getElementById("myChart"),'macarons');
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
