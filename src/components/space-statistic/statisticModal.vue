<template>
  <div>
    <Modal :title="this.params.title" v-model="statisticModal" :mask-closable="false" width="800" >
      <Select v-show="exposureRiskVisible" v-model="exposureRiskValue" size="small" style="width:120px" @on-change="getStatistic">
        <Option value="0">风险</Option>
        <Option value="1">风险变化率</Option>
      </Select>
      <Select v-show="staticTypeOfgeti" v-model="staticGetiValue" size="small" style="width:96px" @on-change="getStatistic">
        <Option value="0">地点统计</Option>
        <Option value="1">时间统计</Option>
      </Select> 
      <Select v-show="staticTypeOfcrowd" v-model="staticCrowdValue" size="small" style="width:96px" @on-change="changeStaticType">
        <Option value="0">地点统计</Option>
        <Option value="1">时间统计</Option>
      </Select> 
      <DatePicker v-show="timeStaticVisible" type="datetime" :options="timeOptions" confirm size="small" format="yyyy-MM-dd HH:mm" 
        placeholder="起始时间" v-model="start"></DatePicker>
      <span v-show="timeStaticVisible" >-</span>
      <DatePicker v-show="timeStaticVisible" type="datetime" :options="timeOptions" confirm size="small" format="yyyy-MM-dd HH:mm"
         placeholder="终止时间" v-model="end"></DatePicker> 
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
      staticGetiValue:'0',
      staticCrowdValue:'0',
      exposureRiskValue:'0',
      crowdValue:'0', 
      start:'',
      end:'', 
      IndividualRisk:true,
      crowdVisible:false,
      staticTypeOfgeti:false,
      staticTypeOfcrowd:false,
      exposureRiskVisible:false,
      statisticModal:false,
      timeStaticVisible:false,
      isOpenDatePicker:false,
      timeOptions:{},
      dataSelect:[
        {
          label:"AQI"
        },
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
      if(this.params.type == "个体"){ 
        this.staticTypeOfgeti = true;
        this.exposureRiskVisible = false;
        //this.timeStaticVisible = true; // 个人风险统计显示时间控件，
        this.start=this.params.startTime; // 开始时间赋值
        this.end=new Date(this.params.endTime);// 结束时间赋值
        this.controlDisableTime(this.end,this.start);
        this.params.title = "个体" + this.$utils.getRiskType(this.params.riskType) + "统计";
        this.IndividualRiskStatistic();
      }else if(this.params.type == "人群"){  
        this.staticTypeOfcrowd = true;
        this.exposureRiskVisible = false;
        this.params.title = "人群" + this.$utils.getRiskType(this.params.riskType) + "统计";
        this.PopulationRiskStatistic();
      }else{  
        this.exposureRiskVisible = true;
        this.params.title = "个体风险变化统计";
        this.RiskChangeAnalyStatistic();
      }
    },
    //个体风险统计    modify cdb----时间调整
    IndividualRiskStatistic(){ 
      var startTime = this.$utils.formatDate(this.start, "yyyy-MM-dd hh:mm:ss");
      var endTime = this.$utils.formatDate(this.end, "yyyy-MM-dd hh:mm:ss"); 
      let url = "" , xKey = '' , yKey = "",labelFormatter="";
      var xLabel="";
      var yLabel="风险值(e-4)";
      var params={userIds:this.params.userIds,riskType:this.params.riskType,
                  endtime:endTime}
      var isInterval=false
      if(this.staticGetiValue == "1"){
        url = "stasticsRiskByTime12HourStastics";//  stasticsRiskByTime  12小时统计
        xKey = "time";
        yKey = "risk";
        xLabel="时间";
        this.timeStaticVisible = true; // 个人风险统计显示时间控件，

      }else{
        url = "stasticsRiskByTop10POI"
        xKey="poiName";
        yKey="value"; 
        params={userIds:this.params.userIds,riskType:this.params.riskType,
                startTime:startTime,endTime:endTime};
        // 是否全部显示
        isInterval=true,
        xLabel="POI点";
        this.timeStaticVisible = false; // 个人风险统计显示时间控件，

      }
      // 致癌显示（e-4）非致癌不显示
      var labelFormat8ter=this.params.riskType=="0"?"(e-4)":"";
      yLabel = this.params.riskType=="0"?"风险值(e-4)":"风险值";
      this.$http.send({
        url:this.$utils.api +"/risk/" +url,
        params:params
      },this,res => {
        var data = res.data;
        this.drawLine(data,xKey,yKey,labelFormatter,isInterval,xLabel,yLabel );
      },true);
    },
    //绘制折现统计图
    drawLine(data,xKey,yKey,labelFormatter,interval=false,xLabel,yLabel,maxminLabel='{c}'+labelFormatter){
     
      let series = [],
          legendObj={},
          YdataObj={}; 
      for(var key in data){ 
        if(key == "userInfo") continue
        var legend = [],xAxis=[],Ydata=[];
        data[key].forEach(e=>{ 
          legendObj[key]=0;
          xAxis.push(e[xKey]); 
          Ydata.push(e[yKey]); 
        })
        series.push({
          name:key,
          type:'line',
          data:Ydata,
          markPoint:{
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ],
              label:{
                normal: {
                    formatter: maxminLabel//'{c}(e-4)'
                }
              },
              itemStyle:{
                color:'#2EC7C9'
              }
            },
          markLine: {
            data: [{ name: "平均值", type: "average" }],
            label: {
              show: true,
              position: "end",
              formatter: "{b}:{c}"
            },
          }, 
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: 'top',
                formatter: '{c}'
              }
            }
          },
        });
      }
      for(var key in legendObj){
        legend.push(key); 
      } 
      this.$initCharts("myChart",{series:series,xAxis:xAxis,legend:legend,labelFormatter:labelFormatter,interval:interval,xLabel:xLabel,yLabel:yLabel})  
      this.resize("myChart");
    }, 
    initBar(legend, xAxisData, series) {
      let myChart = this.$echarts.init(
        document.getElementById("air-quality-compare-bar")
      );
      window.onresize = function() {
        myChart.resize();
      };
      myChart.getDom().className = "mychart";
      myChart.resize();
      myChart.setOption({
        legend: {
          data: legend
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: series
      });
    },
    // 切换统计方式
    changeStaticType(){
      if(this.staticCrowdValue == "0"){
        this.timeStaticVisible = false;
        this.start = "";
        this.end = "";
        this.PopulationRiskStatistic("地点");
      }else{
        //this.timeStaticVisible = true 
        this.PopulationRiskStatistic("时间");
      }
    },
    //人群风险统计
    PopulationRiskStatistic(xLabel="地点"){
      /* 判断是否为致癌或者非致癌 */
      var labelMark="(e-4)";
      if(this.params.riskType=="1"){
        // 非致癌==》数据量不带e-4
        labelMark="";

      }
      if(this.staticCrowdValue == "0"){  
        this.$http.send({
          url: this.$utils.api +"/risk/statisticCrowdDataByPoiType",
          params:this.params
        },this,res => { 
          var data = res.data; 
          let series = [],
              legendObj={},
              YdataObj={};  
          var legend = [],xAxis=[],Ydata=[]; 
          for(var key in data){
            legendObj[key]=0;
            xAxis.push(key); 
            Ydata.push(data[key]); 
          }
          series.push({ 
            type:'bar',
            barWidth:20,
            data:Ydata,
            markPoint:{
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ],
              label:{
                normal: {
                    formatter: '{c}'+labelMark
                }
                //formatter: '{c}'

              },
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
                formatter: '{c}'+labelMark
              },
              lineStyle:{color:'#2EC7C9'}
            },
            itemStyle: {
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
            },
          }); 
          for(var key in legendObj){
            legend.push(key); 
          }
          this.$initCharts("myChart",{series:series,xAxis:xAxis,legend:legend,labelFormatter:labelMark,interval:true,xLabel:xLabel,yLabel:"风险值"});
          this.resize("myChart");
        },true); 
      }else{
        // if (!this.start || !this.end||this.start==""||this.end=="") return;
        // var start = this.$utils.formatDate(this.start, "yyyy-MM-dd hh:mm:ss");
        // var end = this.$utils.formatDate(this.end, "yyyy-MM-dd hh:mm:ss"); 
        this.$http.send({
          url: this.$utils.api +"/risk/statisticCrowdDataByTime2",
          params:this.params
        },this,res => {
          var data = res.data;  
          let series = [],
              legendObj={},
              YdataObj={}; 
          var legend = [],xAxis=[],Ydata=[];
          data.forEach(e=>{  
            xAxis.push(e.time); 
            Ydata.push(e.value); 
          })
          series.push({ 
            type:'bar',
            barWidth:20,
            data:Ydata,
            markPoint:{
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ],
              label:{
                normal: {
                    formatter: '{c}'+labelMark
                }
                //formatter: '{c}'

              },
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
                formatter: '{c}'+labelMark
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
              },
            },
          });  
        this.$initCharts("myChart",{series:series,xAxis:xAxis,legend:legend,labelFormatter:labelMark,xLabel:xLabel,yLabel:"风险值"})  
        this.resize("myChart"); 
        },true);  
      }
    },
    //风险变化分析统计
    RiskChangeAnalyStatistic(){
      var startTime = this.$utils.formatDate(this.params.startTime,'yyyy-MM-dd hh:mm:ss');
      var endTime = this.$utils.formatDate(this.params.endTime,'yyyy-MM-dd hh:mm:ss');
      let url = "" ,xKey ="",yKey="",labelFormatter="";
      var xLabel='时间',yLabel='风险值';
      var isChange=false;
      if(this.exposureRiskValue == "0"){
        //url = "stasticsRiskByTime";
        url="stasticsRiskByTimeDuration";
        xKey = "time";
        yKey = "risk";
        isChange=false;
        labelFormatter=this.params.riskType=="0"?"(e-4)":"";
        yLabel='风险值';
      }else{
        url = "riskChangeRate"
        xKey = "time";
        yKey = "rate";
        isChange=true
        // labelFormatter = "%"
        yLabel="变化率";
      }
      this.$http.send({
        url: this.$utils.api +"/risk/"+url,
        params:{userIds:this.params.userid,
          riskType:this.params.riskType,
          startTime:startTime,
          endTime:endTime}
      }, this, res => {
        var data = res.data 
        if(isChange)
          this.drawLine(data,xKey,yKey,labelFormatter,false,xLabel,yLabel,"{c}");
        else
          this.drawLine(data,xKey,yKey,labelFormatter,false,xLabel,yLabel,"{c}"+labelFormatter);

      },true) 
    }, 
    resize(id){ 
      this.$echarts.init(document.getElementById(id),'macarons').resize(); 
    },
    /* cdb + 控制时间 */
    controlDisableTime(start,end){
      this.timeOptions={
          disabledDate (date) {
            {
             
              let endtime=start;//new Date(this.params.startTime); // 开始时间赋值
              let stime=end;//new Date(this.params.endTime);// 结束时间赋值
              return date && date.valueOf() < stime.valueOf() - 86400000 || date.valueOf() > endtime.valueOf();
            }
          }
        }
    } 
  },
  watch: {
    
   /*  start(newValue, oldValue) {
      if(this.staticTypeOfcrowd)
        this.PopulationRiskStatistic(); 
    },
    end(newValue, oldValue) {
      if(this.staticTypeOfcrowd)
        this.PopulationRiskStatistic(); 
    } */
  }
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
