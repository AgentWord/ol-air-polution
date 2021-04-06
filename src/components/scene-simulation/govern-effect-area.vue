<style lang="less" scoped>
.split-pane-con {
  width: 100%;
  height: 100%;
}
.mychart {
  width: 98%;
  min-height: 300px;
  position: relative;
  margin: auto;
  padding: 0px;
}
.left-bottom-datepicker{
  position: absolute;
  top: 10px;
  float: left;
  z-index: 100;
  left:10px
}
</style>

<template>
  <div style="height:100%;">
    <Row style="height:100%;">
      <Col :span=16 style="height:100%;">
      <div class="split-pane-con">
        <split-pane :style="{height: '100%'}" direction="vertical" v-model="triggerOffsetV">
          <div slot="top" style="height: 100%;">
            <DatePicker class="left-bottom-datepicker" v-model="date1" size="small" type="date" placeholder="请选择日期" ></DatePicker>
            <arcgis-map ref="arcgismap" @extent-change="arcgisExtentChange"></arcgis-map>
          </div>
          <div slot="bottom" style="height: 100%;">
             <DatePicker class="left-bottom-datepicker" v-model="date2" size="small" type="date" v-bind:style="classObject" placeholder="请选择日期" ></DatePicker>
            <arcgis-map ref="arcgismap2" @extent-change="arcgisExtentChange2">

            </arcgis-map>
          </div>
        </split-pane>

      </div>

      </Col>
      <Col :span=8 style="height:100%;padding:10px">
      <div style="overflow:scroll;height:100%;">
        <h2 style="align:center">大名县环境治理前后空气质量等级面积占比</h2>
        <div id="air-quality-compare-pie-one"></div>
        <div id="air-quality-compare-pie-two"></div>
        <div style="padding:10px;margin-bottom:110px">
          <div id="air-quality-compare-bar"></div>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import arcgisMap from "../base/arcgisMap.vue";
import splitPane from "../base/split-pane";
export default {
  components: { arcgisMap, splitPane },
  mounted() {
    this.date1=new Date(this.$utils.getNearDay("nearWeek")+" 00:00:00");
    this.date2=new Date(this.$utils.getNearDay("yesterday")+" 23:59:59");
    this.init();
  },
  computed: {
  classObject: function () {
    return {
      top:((this.triggerOffsetV*window.innerHeight)/100+10)+"px"
    }
  }
},
  data() {
    return {
      triggerOffsetV: 40,
      date1:"",
      date2:""
    };
  },
  methods: {
    init(startDay, endDay) {
      if(!this.date1||!this.date2)return;
      var startTime=this.$utils.formatDate(this.date1,"yyyy-MM-dd hh:mm:ss");
      var endTime=this.$utils.formatDate(this.date2,"yyyy-MM-dd hh:mm:ss")

      this.$http.send(
        {
          url: this.$utils.api +"/pollutionCompare",
          params: {
            startTime: startTime,
            endTime: endTime,
          }
        },
        this,
        res => {
          this.initChart(res.data);
        }
      );
    },
    initChart(baseData) {
      var keys = ["one", "two"];
      var seriesBar = [],
        legendBar = [];
      var xAxisData = this.$utils.qualityNames;
      keys.forEach(key => {
        var data = baseData[key];
        var updatetime = data.updatetime;
        if (updatetime.length > 10) updatetime = updatetime.substring(0, 11);
        let values = [];
        values.push(data.bfbyou);
        values.push(data.bfbliang);
        values.push(data.bfbqingdu);
        values.push(data.bfbzhongdu);
        values.push(data.bfbzhongzhongdu);
        values.push(data.bfbyanzhong);
        this.initPie(values, key, updatetime);

        legendBar.push(updatetime);
        seriesBar.push({ name: updatetime, type: "bar", data: values });
      });
      this.initBar(legendBar, xAxisData, seriesBar);
    },
    initPie(values, key, updatetime) {
      let legend = this.$utils.qualityNames;
      let colors = this.$utils.qualityColors; //不同等级的颜色
      let seriesData = [];
      let i = 0;
      legend.forEach(e => {
        seriesData.push({
          name: e,
          value: values[i],
          itemStyle: { normal: { color: colors[i] } }
        });
        i++;
      });

      let myChart = this.$echarts.init(
        document.getElementById("air-quality-compare-pie-" + key)
      );
      window.onresize = function() {
        myChart.resize();
      };
      myChart.getDom().className = "mychart";
      myChart.resize();
      myChart.setOption({
        title: {
          subtext: updatetime,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
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
    arcgisExtentChange2(params){
      this.$refs.arcgismap.goToZoomCenter(params);
    },
    arcgisExtentChange(params){
      this.$refs.arcgismap2.goToZoomCenter(params);
    },
    getHistoryData(begin,arcgismap){
      this.$http.send(
        {
          url: this.$utils.api +"/daming/historyData",
          params: {startTime:begin+" 00:00:00",endTime:begin+" 23:59:59",timeFlag:"day",mpType:"",pageNum:0,pageSize:5}
        },
        this,
        res => {
            var list=res.data[begin];
            this.$refs[arcgismap].getShiceLayers(list, 'aqi');
        }
      );
    }
  },
  watch:{
    date1(newValue,oldValue){
      this.getHistoryData(this.$utils.formatDate(newValue,"yyyy-MM-dd"),"arcgismap");
      this.init();
    },
    date2(newValue,oldValue){
      this.getHistoryData(this.$utils.formatDate(newValue,"yyyy-MM-dd"),"arcgismap2");
      this.init();
    },
  }
};
</script>
