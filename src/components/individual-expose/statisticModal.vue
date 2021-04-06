<template>
  <div>
    <Modal :title="this.params.title" v-model="statisticModal" :mask-closable="false" width="800">
      <Select v-if="changeType === true" v-model="travelWay" :label-in-value="true" size="small" style="width:90px" @on-change="getStatistic">
        <Option value="travelModel">出行方式</Option>
        <Option value="POIType">场景</Option>
      </Select>
      <Select v-else v-model="pollutionValue" size="small" style="width:90px" @on-change="getStatistic">
        <Option v-for="item in dataSelect" :key="item.id" :value="item.value">{{item.label}}</Option>
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
    params:Object
  },
  data(){
    return{
      chackValue:"",
      travelWay:'travelModel',
      selectLabel:"出行方式",
      pollutionValue:'aeri',
      beginTime:'',
      endTime:'',
      changeType:true,
      statisticModal:false,
      dataSelect:[
        {
          label:"AERI",
          value:'aeri'
        },
        {
          label:"PM₂.₅",
          value:'pm25'
        },
        {
          label:"PM₁₀",
          value:'pm10'
        },
        {
          label:"SO₂",
          value:'so2'
        },
        {
          label:"CO",
          value:'co'
        },
        {
          label:"NO₂",
          value:'no2'
        },
        {
          label:"O₃",
          value:'o3'
        }
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
    getStatistic(option){
      if(option) this.selectLabel=option.label;
      this.statisticModal = true;
      if(this.params.title == "个体出行轨迹统计"){
        this.changeType = true;
        this.travelReplayStatistic();
      }else{
        this.changeType = false;
        this.historicalExposureReplay();
      }
    },
    //出行轨迹回放统计
    travelReplayStatistic(){
      var beginTime = this.$utils.formatDate(this.params.beginTime,'yyyy-MM-dd hh:mm:ss');
      var endTime = this.$utils.formatDate(this.params.endTime,'yyyy-MM-dd hh:mm:ss');  
      let url = '';
      if(this.travelWay == "travelModel"){
        url = "statisticTravelModelTime"
      }else{
        url ="statisticPoiTypeTime"
      }
      this.$http.send({
        url: this.$utils.api +"/travelStatistic/" + url, 
        method:"POST", 
        params:{userids:this.params.userid,beginTime:beginTime,endTime:endTime}
      }, this, res => {
        var data = res.data; 
        var labelFormatter = "min"
        this.drawBar(data,labelFormatter,'时长',this.selectLabel);
      });
      return; 
    },
    //绘制柱状统计图
    drawBar(data,labelFormatter,yLabel,xLabel){
      let series = [], legendObj={},  YdataObj={},  datas = [];  
      for(var key in data){ 
        var legend = [],xAxis=[],Ydata=[]; 
        legendObj[key]=0;
        for(var k in data[key]){ 
          xAxis.push(k); 
          Ydata.push(data[key][k]); 
        }
        series.push({
          name:key,
          type:'bar',
          barWidth:20,
          data:Ydata,
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
            }
          } 
        }); 
      }
      for(var key in legendObj){
        legend.push(key); 
      }
      this.initCharts("myChart",{series:series,xAxis:xAxis,legend:legend,labelFormatter:labelFormatter,yLabel:yLabel,xLabel:xLabel})  
      this.resize("myChart"); 
    },
    initCharts(id,params){
      let myChart = this.$echarts.init(document.getElementById(id),'macarons');
      window.onresize = function() {
        myChart.resize();
      };
      myChart.resize();
      myChart.getDom().className="myEcharts";
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
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        legend: {
            data:params.legend
        },
        xAxis: [{
            type: "category",
            name:params.xLabel,
            data: params.xAxis
          }
        ],
        yAxis: [{
            type: "value",
            name:params.yLabel,
            axisLabel : {
              formatter: "{value} " + params.labelFormatter
            }
          }
        ],
        series: params.series
      });
    },
    //历史暴露回放统计
    historicalExposureReplay(){
      this.shishiModal = true; 
      var begin = this.$utils.formatDate(this.params.beginTime,'yyyy-MM-dd HH:mm:ss');
      var end = this.$utils.formatDate(this.params.endTime,'yyyy-MM-dd HH:mm:ss');  
      var url = "";
      if(this.pollutionValue == "aeri"){
        url = this.$utils.api +"/exposureStastics/aeri"
      }else {
        url = this.$utils.api +"/exposureStastics/exposure"
      }
      this.$http.send({ 
        url: url,
        params:{userIds:this.params.userid,begin:begin,end:end}
      }, this, res => {
        var data = res.data; 
        this.drawLine(data);
      })  
    },
    //绘制折现统计图
    drawLine(data){
      let series = [],
          legendObj={},
          YdataObj={};
      let keyValue = this.pollutionValue;
      for(var key in data){ 
        var legend = [],xAxis=[],Ydata=[];
        data[key].forEach(e=>{ 
          legendObj[key]=0;
          xAxis.push(e.time); 
          Ydata.push(e[this.pollutionValue]); 
        })
        series.push({
          name:key,
          type:'line',
          data:Ydata,
          markLine : {
            data : [
              { name: '平均值',type : 'average'}
            ],
            label:{
              show:true,
              position:"end",
              formatter: '{b}:{c}'
            }
          },
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
      }
      for(var key in legendObj){
        legend.push(key); 
      }
      var labelFormatter =''
      if(this.pollutionValue == "aeri"){
        labelFormatter = ""
      }else if(this.pollutionValue == "co"){
        labelFormatter = "mg/(kg·min)"
      }else{ 
        labelFormatter = "ug/(kg·min)"
      }
      this.$initCharts("myChart",{series:series,xAxis:xAxis,legend:legend,labelFormatter:labelFormatter,yLabel:'测量值',xLabel:'时间'}) 
      this.resize("myChart");  
    },
    // initCharts(id,params){
    //   let myChart = this.$echarts.init(document.getElementById(id),'macarons');
    //   window.onresize = function() {
    //     myChart.resize();
    //   };
    //   myChart.resize();
    //   myChart.getDom().className="myEcharts";
    //   myChart.clear();
    //   myChart.setOption({
    //     tooltip : {
    //       trigger: 'axis',
    //       axisPointer: {
    //         // type: 'cross',
    //         label: {
    //           backgroundColor: '#6a7985'
    //         }
    //       }
    //     },
    //     toolbox: {
    //       show : true,
    //       feature : { 
    //         dataView : {show: true, readOnly: false},
    //         magicType : {show: true, type: ['line', 'bar']},
    //         restore : {show: true},
    //         saveAsImage : {show: true}
    //       }
    //     },
    //     legend: {
    //         data:params.legend
    //     },
    //     xAxis: [{
    //         type: "category",
    //         data: params.xAxis
    //       }
    //     ],
    //     yAxis: [{
    //         type: "value",
    //         axisLabel : {
    //           formatter: "{value} " + labelFormatter
    //         }
    //       }
    //     ],
    //     series: params.series
    //   });
    // },
    //绘制统计图
    //  drawLine(legend,xValue,labelFormatter,seriesData){
    //   let myChart = this.$echarts.init(document.getElementById("myChart"),'macarons');
    //   window.onresize = function() {
    //     myChart.resize();
    //   };
    //   // myChart.getDom().className="myEcharts";
    //   myChart.resize();
    //   myChart.clear();
    //   myChart.setOption({
    //     tooltip : {
    //       trigger: 'axis',
    //       axisPointer: {
    //         // type: 'cross',
    //         label: {
    //           backgroundColor: '#6a7985'
    //         }
    //       }
    //     },
    //     toolbox: {
    //       show : true,
    //       feature : {
    //       //   mark : {show: true},
    //         dataView : {show: true, readOnly: false},
    //         magicType : {show: true, type: ['line', 'bar']},
    //         restore : {show: true},
    //         saveAsImage : {show: true}
    //       }
    //     },
    //     legend: {
    //         data:legend
    //     },
    //     xAxis: [{
    //         type: "category",
    //         data: xValue
    //       }
    //     ],
    //     yAxis: [{
    //         type: "value",
    //         axisLabel : {
    //           formatter: "{value} " + labelFormatter
    //         }
    //       }
    //     ],
    //     series: seriesData
    //   });

    // }
    resize(id){ 
        this.$echarts.init(document.getElementById(id),'macarons').resize(); 
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
