<template>
  <div>
    <!-- <Modal :title="title" v-model="statisticModal" :mask-closable="false" width="800"> -->
      <div id="myChart" class="myEcharts"></div>
      <!-- <div slot="footer">
        <Button type="ghost" @click="onClose">取消</Button>
        <Button type="primary" @click="onClose">确定</Button>
      </div> -->
    <!-- </Modal> -->
  </div>
</template>

<script>
export default {
  props:{
    params:Object
  },
  data(){
    return{
      title:"",
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
          label:"PM₂.₅"
        },
        {
          label:"PM₁₀"
        },
        {
          label:"SO₂"
        },
        {
          label:"CO"
        },
        {
          label:"NO₂"
        },
        {
          label:"O₃"
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
      this.$emit("on-model-close");
    },
    //统计类型
    getStatistic(data){
      switch (this.params.type) {
        case "污染物解析":  
          this.pollutantAnaly(data);
          break;
        case "污染来源解析":
          this.pollutionSources(data);
          break;
        default:
          break;
      }
    }, 
    initChartData(resData,labelFormatter){
      var legend = [],series = [],xAxisObj={},xAxis=[];
      if(this.params.statisticalType == "0"){
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
            data:data,
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
        }
      for(var key in xAxisObj){
        xAxis.push(key);
      }
      this.drawLine(legend,xAxis,labelFormatter,series);
    },
    //污染物解析统计
    pollutantAnaly(res){
      var labelFormatter = '', legend = []
      var xAxisObj = {} , xAxis=[], series=[]
      res.forEach(e => {
        legend.push(e.name)
        var seriesData =[]
        for(var key in e.value){
          if(key =="jd" || key=="wd" || key == "recId" || key == "id" || key == "name"){
            continue;
          }
          xAxisObj[key]=0
          seriesData.push(e.value[key]) //.toExponential(6)
        }
        series.push({ name: e.name, type: "bar", barWidth:20, data: seriesData,
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
        
        
        });
      })
      for(var key in xAxisObj){
        if(key =="jd" || key=="wd" || key == "recId" || key == "id" || key == "name"){
          continue;
        }
        var resKey = key.replace("Aeri",'').replace("Risk",'')
        xAxis.push(this.$utils.aliasNameMap[resKey])
      }
      let yLabel = this.params.riskType == 0 ? "风险值(e-4)" : "风险值"

      this.drawBar(legend,xAxis,labelFormatter,series,"污染物",yLabel);
      this.resize("myChart")
    },
    //污染物来源解析统计
    pollutionSources(res){
      var labelFormatter = '%', legend = []
      var xAxisObj = {} , xAxis=[], series=[]
      res.forEach(e => {
        legend.push(e.name)
        var seriesData =[]
        for(var key in e){
          if(key =="jd" || key=="wd" || key == "recId" || key == "id" || key == "name"){
            continue;
          }
          xAxisObj[key]=0
          seriesData.push(e[key].toFixed(2)) //.toExponential(6)
        }
        series.push({ name: e.name, type: "bar", barWidth:20, data: seriesData, 
          markPoint:{
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ],
                itemStyle:{
                  color:'#2EC7C9'
                }
              },
          // markLine : {
          //   data : [
          //     { name: '平均值',type : 'average'}
          //   ],
          //   label:{
          //     show:true,
          //     position:"end",
          //     formatter: '{b}:{c} %'
          //   },
          //   lineStyle:{color:'#2EC7C9'}
          // },
        });
      })
      for(var key in xAxisObj){
        if(key =="jd" || key=="wd" || key == "recId" || key == "id" || key == "name"){
          continue;
        }
        var resKey = key.replace("Aeri",'').replace("Risk",'')
        xAxis.push(this.$utils.aliasNameMap[resKey])
      }
      this.drawBar(legend,xAxis,labelFormatter,series);
      this.resize("myChart")
    },
    //绘制统计图 X周不倾斜30°
    drawBar(legend,xValue,labelFormatter,seriesData,xLabel="",yLabel=""){
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
    resize(id){ 
      this.$echarts.init(document.getElementById(id),'macarons').resize(); 
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
