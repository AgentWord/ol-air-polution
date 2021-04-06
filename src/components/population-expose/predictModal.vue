<template>
  <div>
    <Modal :title="title" v-model="predictModal" :mask-closable="false" width="800">
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
    statisticData:Object
  },
  data(){
    return{
      predictModal:false,
      title:'',
      crowd:'',
    }
  },
  mounted(){
  },
  methods:{
    //关闭弹窗
    onClose(){
      this.predictModal = false;
      this.$emit("on-closeStatistic");
    },
    //人群text
    renqunText(renqunValues){
      switch (renqunValues) {
        case "0":
          this.crowd = "总人群"
          break;
        case "1":
          this.crowd = "青少年"
          break;
        case "2":
          this.crowd = "青年"
          break;
        case "3":
          this.crowd = "中年"
          break;
        case "4":
          this.crowd = "老年"
          break;
        default:
          break;
      }
      return this.crowd;
    },
    //获取系统当前时间之后的7天
    getSystemDate(){
      var fullXdate = [] , Xdate = '';
      var nowdate = new Date();
      var Ty = nowdate.getFullYear();
      var Tm = nowdate.getMonth() + 1;
      for(var i = 0; i< 8;i++){
        var Td = nowdate.getDate() + i;
        if (Td <= 9) {
          Td = "0" + Td;
        }
        var Xdate = Tm + "/" + Td
        fullXdate.push(Xdate)
      }
     return  fullXdate;
    },
    //统计类型
    getStatistic(){
      this.predictModal = true;
      if(this.statisticData.statisticTitle == "预测"){
        this.crowd =  this.renqunText(this.statisticData.crowd);
        this.title = this.statisticData.wuranwuValue + "暴露" + this.crowd + this.statisticData.statisticTitle;
        this.ExposureSimulationPredictStatistic();
      }
    },
    //暴露模拟预测统计
    ExposureSimulationPredictStatistic(){
      var resData = [];
      var legend = [],series = [],xAxisObj={},xAxis=[];
      this.$http.send({ url: "statisticExposureSimulationPredict",
        data:{"crowd":this.crowd,
          "regionalScope":this.statisticData.regionalScope,
          "shijian":this.statisticData.chooseTime,
          "pollution":this.statisticData.wuranwuValue}},
        this, res => {
        resData = res.data;
      })
      var dataDate = this.getSystemDate();
      resData.forEach(e => {
        legend.push(e.userName);
        var data=[];
        for(var key in e.value){
          xAxisObj[key]=0;
          data.push(e.value[key]);
        }
        series.push({
          name:e.userName,
          type:'bar',
          barWidth: '20',
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
              { type : 'average',name: '平均值'}
            ],
            label:{
              show:true,
              position:"end",
              formatter: '{b}:{c}'
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
              label: {
                show: false,
                position: 'top',
                formatter: '{c}'
              }
            }
          },
        });
      });
      for(var key in xAxisObj){
        xAxis.push(key);
      }
      var labelFormatter = "ug/m³";
      this.drawLine(legend,dataDate,labelFormatter,series);
    },
    //绘制统计图
    drawLine(legend,dataDate,labelFormatter,seriesData){
      let myChart = this.$echarts.init(document.getElementById("myChart"),'macarons');
      window.onresize = function() {
        myChart.resize();
      };
      myChart.getDom().className="myEcharts";
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
            data: dataDate,
            // axisLabel:{
            //   interval:0,//横轴信息全部显示
            //   rotate:-30,//-30度角倾斜显示
            // }
          }
        ],
        yAxis: [{
            type: "value",
            axisLabel : {
              formatter: "{value} " + labelFormatter
            }
          }
        ],
        series: seriesData
      });
    },
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
