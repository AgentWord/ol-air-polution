<template>
  <div>
    <Modal :title="this.$utils.aliasRealTimeS[this.pollutionValue]+this.params.statisticTitle" v-model="RealTimeModalVisible" :mask-closable="false" width="800">
      <Select v-model="pollutionValue" v-if="shishiModal" size="small" style="width:90px" @on-change="getStatistic">
        <Option v-for="item in realTimeSelect" :key="item.id" :value="item.value">{{item.label}}</Option>
      </Select>
      <div id="myChart"></div>
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
      pollutionValue:'aeri',
      RealTimeModalVisible:false,
      shishiModal:false,
      moniModal:false,
      realTimeSelect:[
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
      this.RealTimeModalVisible = false;
      this.$emit("on-closeStatistic");
    },
    //统计分析
    getStatistic(){
      this.RealTimeModalVisible = true;
      switch (this.params.statisticTitle) {
        case "实时暴露测量统计":
          this.shishiStatistic()
          break;
        case "模拟暴露测量统计":
          this.moniStatistic()
          break;
        default:
          break;
      }
    },
    //实时暴露测量统计
    shishiStatistic(){
      this.shishiModal = true;
      //获取系统当前时间
      var begin = this.$utils.getNearDay("today") +" 00:00:00";
      var end = this.$utils.getNearDay("now");
      var labelFormatter = '';
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
    //模拟暴露测量统计
    moniStatistic(){
      this.shishiModal = true;
      //获取系统当前时间
      var begin = this.$utils.getNearDay("today") +" 00:00:00";
      var end = this.$utils.getNearDay("now"); 
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
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: 'top',
                formatter: '{c}'
              }
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
          },
          markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ],
                
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
    initCharts(id,params){
      let myChart = this.$echarts.init(document.getElementById(id),'macarons');
      window.onresize = function() {
        myChart.resize();
      };
      myChart.resize();
      myChart.getDom().className="myEcharts";
      myChart.clear();
      var labelFormatter =''
      if(this.pollutionValue == "aeri"){
        labelFormatter = ""
      }else if(this.pollutionValue == "co"){
        labelFormatter = "mg/(kg·min)"
      }else{ 
        labelFormatter = "ug/(kg·min)"
      }
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
            data: params.xAxis
          }
        ],
        yAxis: [{
            type: "value",
            axisLabel : {
              formatter: "{value} " + labelFormatter
            }, 
          }
        ],
        series: params.series
      });
    },
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
