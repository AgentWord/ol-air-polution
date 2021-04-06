<template>
  <div>
    <Modal :title="title" v-model="statisticModal" :mask-closable="false" width="800">
      <Select v-if="changeType === true" v-model="stasticsType" size="small" style="width:90px" @on-change="getStatistic">
        <Option value="1" v-show="canUnit">行政单元</Option>
        <Option value="2" >场景</Option>
      </Select>
      <Select v-else v-model="stasticsType" size="small" style="width:90px" @on-change="getStatistic">
         <Option value="1">行政单元</Option>
        <!-- <Option value="2">场景</Option> -->
        <Option value="3">时段</Option>
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
      stasticsType:'1',
      pollutionValue:'AQI',
      beginTime:'',
      endTime:'',
      title:'',
      crowd:'',
      statisticalScale:'',
      changeType:true,
      statisticModal:false,
      canUnit:true
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
      if(this.params.statisticTitle == "浓度统计"){
        this.changeType = true; 
        this.title = this.$utils.getPollutionTypeOfname(this.params.wuranwuValue) + this.params.statisticTitle;
        this.FineDrawllutionStatistic();
      }
      else if(this.params.type == "分布统计"){
        this.changeType = true;
        this.title = "人群" + this.params.type;
        this.popDistributSimulationStatistic();
      }
      else if(this.params.statisticTitle == "人群统计"){
        this.changeType = true; 
        this.title= "人群暴露统计"
        this.popExposureCalculatStatistic();
      }
      else if(this.params.statisticTitle == "暴露模拟"){
        this.changeType = true; 
        this.title= "人群暴露模拟预测统计"
        this.popExposureCalculatStatistic();
      }else{
        this.changeType = false;
        this.title = this.params.wuranwuValue + this.params.statisticTitle + this.crowd + "统计" ;
        this.exposureDynamicAnalysisStatistic();
      }
    },
    //污染精细制图统计
    FineDrawllutionStatistic(){
      //var time = this.$utils.formatDate(this.params.time, "yyyy-MM-dd hh:mm:ss"); 
      var yLabel="污染物浓度";
      var xLabel="";
      //判断是否是一公里示范区
      if(this.params.quyu=="一公里示范区"){
         // 设置统计只有场景
         this.stasticsType="2";
         this.canUnit=false;
         xLabel="场景";
      }else
      {
         this.canUnit=true;
      } 
      // 判断赋值x标签
      xLabel=this.stasticsType=="1"?"行政单元":"场景";
      
      this.$http.send({ 
        url: this.$utils.api +"/statistic/pollution",
        params:{id:this.params.id,
                stasticsType:this.stasticsType}
      }, this, res => {
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
          markPoint:{
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ],
              label:{
                normal: {
                    formatter: '{c}'
                }
              },
              itemStyle:{
                color:'#2EC7C9'
              }
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
        for(var key in legendObj){
          legend.push(key); 
        }
        var labelFormatter=this.params.unit;// 已处理过

        /* var labelFormatter = "ug/(kg·min)"
        if(this.params.wuranwuValue == "6"){
          labelFormatter = "mg/(kg·min)"
        } */
        this.$initCharts("myChart",{series:series,xAxis:xAxis,legend:legend,labelFormatter:labelFormatter,xLabel:xLabel,yLabel:yLabel});
        this.resize("myChart");
      })  
    },
    //人群分布模拟
    popDistributSimulationStatistic(){
      //var time = this.$utils.formatDate(this.params.time, "yyyy-MM-dd hh:mm:ss"); 
      var xLabel=this.stasticsType=="1"?"行政单元":"场景";
      var yLabel="人数";
      this.$http.send({ 
        url: this.$utils.api +"/statistic/crowd",
        params:{id:this.params.id,
                stasticsType:this.stasticsType}
      }, this, res => {
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
            },
          },
        }); 
        for(var key in legendObj){
          legend.push(key); 
        }
        this.$initCharts("myChart",{series:series,xAxis:xAxis,legend:legend,labelFormatter:"人",xLabel:xLabel,yLabel:yLabel});
        this.resize("myChart");
      })
    },
    //人群暴露计算
    popExposureCalculatStatistic(){
      //var pollutionDataTime = this.$utils.formatDate(this.params.pollutionDataTime,'yyyy-MM-dd hh:mm:ss')
      var xLabel=this.stasticsType=="1"?"行政单元":"场景";
      var yLabel="人群暴露量";
      this.$http.send({
        url:this.$utils.api + "/pwel/pwelFx",
        method:"POST",
        params:{id:this.params.id,stasticsType:this.stasticsType}
      },this,res => {
        var e = []
        var legend = [], legendObj={}, series = [],xAxisObj={},xAxis=[] ,data =[]
        if(res.success){
          /* if(this.stasticsType == "1") {
            e = res.data.fqtj 
          }else{
            e = res.data.poitj
          } */
          e = res.data;
          for(var key in e){
            xAxisObj[key]=0
            legendObj[key]=0
            data.push(e[key])
          }
          for(var key in xAxisObj){
            xAxis.push(key)
          }
          for(var key in legendObj){
            legend.push(key)
          }
          series.push({ 
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
              },
            },
          }); 
        var labelFormatter=this.params.unit;
        this.$initCharts("myChart",{series:series,xAxis:xAxis,legend:legend,labelFormatter:labelFormatter,xLabel:xLabel,yLabel:yLabel});
        this.resize("myChart");
        }
      },true)
    },
    //暴露动态分析
    exposureDynamicAnalysisStatistic(){
      /* if(this.stasticsType == "1" || this.stasticsType == 2){
        this.params.nongduId = 41
        this.params.renkouId = 15
        this.params.pollutionDataTime = new Date("2019-04-24 00:00:00")
        this.popExposureCalculatStatistic()
      }else{ */
      var xLabel=this.stasticsType=="1"?"行政单元":"场景";
      var yLabel="暴露变化率";
      //判断统计类型
      var urlStr="pwelChangeTime";
      if(this.stasticsType == "1"){
          urlStr="pwelChangeXzq";
      }
        this.$http.send({
        url:this.$utils.api + "/pwel/"+urlStr,
        method:"POST",
        params:this.params
      },this, res => {
          if(res.success){
            var data = [res.data];
            var legend = [],series = [],xAxisObj={},
                xAxis=[] ,datas =[]
            data.forEach(e => {
              //legend.push(e.statisticName) 
              for(var key in e){
                xAxisObj[key]=0;
                datas.push(e[key]);
              }
              series.push({
                name:e.statisticName,
                type:'bar',
                barWidth:20,
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
                  },
                },
                data:datas,
              });
            })
            for(var key in xAxisObj){
              xAxis.push(key);
            }
            this.$initCharts("myChart",{series:series,xAxis:xAxis,legend:legend,labelFormatter:"",xLabel:xLabel,yLabel:yLabel});
            this.resize("myChart");
          }
        },true)
      //}
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
