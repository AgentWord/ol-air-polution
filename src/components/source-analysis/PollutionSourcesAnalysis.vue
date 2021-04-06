<template>
  <!-- 污染来源解析 -->
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px">
        <FormItem>
          <Select
            v-model="formInline.statisticalType"
            @on-change="changeStatisticType"
            style="width:100px"
          >
            <Option value="0">个体</Option>
            <Option value="1">地点</Option>
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
        <FormItem v-show="individualStatistic">
          <DatePicker
            type="datetime"
            placeholder="起始时间"
            v-model="formInline.timePoint"
            :options="formInline.options"
          ></DatePicker>
        </FormItem>
        <FormItem v-show="localtionStatistic">
          <!-- <Input v-model="formInline.positionName" placeholder="请输入地点"></Input> -->
          <searchbar ref="selectPlace" @on-select="selectValue"></searchbar>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
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
      <statisticmodal
        ref="pollutantSources"
        :params="formInline"
        @on-model-close="handleModelClose"
      ></statisticmodal>
    </Modal>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
import usermodal from "../../components/base/userModalSingle.vue";
import statisticmodal from "./statisticModal.vue";
import searchbar from "../../components/base/search-bar.vue";

export default {
  components: {
    usermodal,
    statisticmodal,
    searchbar
  },
  data() {
    return {
      userModalVisible: false,
      formModelShow: false,
      individualStatistic: true,
      localtionStatistic: false,
      formModelShow: false,
      formInline: {
        userIds: 6,
        username: "",
        timePoint: "",
        riskType: "0",
        crowdType: "",
        positionName: "河北农业大学",
        statisticalType: "0",
        type: "污染来源解析",
        options:{}
      },
      title: "个体污染来源解析统计",
      ruleValidate: rules.user
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.changeDate();
      //排放清单  0-3
      //http://localhost:6080/arcgis/rest/services/subsystem/PMList/MapServer
    },
    //切换统计个体和人群
    changeStatisticType() {
      if (this.formInline.statisticalType == "0") {
        this.individualStatistic = true;
        this.localtionStatistic = false;
      } else {
        this.individualStatistic = false;
        this.localtionStatistic = true;
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
    selectValue(selectedItem){
      this.formInline.positionName = selectedItem.name;
      //alert(this.formInline.positionName );

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
    //查询
    searchData() {
      var timePoint = this.$utils.formatDate(
        this.formInline.timePoint,
        "yyyy-MM-dd hh:mm:ss"
      );
      var url = "",
        params = {};
      if (this.formInline.statisticalType == "0") {
        this.$http.send(
          {
            url: this.$utils.IP + "/analysis/person/pollutantsAnalysis",
            params: { userIds: this.formInline.userIds, timePoint: timePoint }
          },
          this,
          res => {
            if (res.success) {
              var data = res.data;
              var options = this.setOptions(data);
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
            url: this.$utils.IP + "/analysis/location/pollutantsAnalysis",
            params: { positionName: this.formInline.positionName }
          },
          this,
          res => {
            if (res.success) {
              var data = res.data;
              //var options = this.setOptionsOfLocaltion([data]);
              var options = this.setOptions([data],true);
              this.$emit("excutemethods", "PollutantAnalysis", {
                data: options
              });
            }
          },
          true
        );
      }
    },
    setOptions(data,icon) {
      // 图标变换
      var iconSym="image://http://211.159.186.65/subsystemold/aqi/loc-0-0-0.png";
      if(icon){
        iconSym="image://http://211.159.186.65/subsystemold/aqi/loc-p-o-i.png";
      }
      var options = [],
        series1 = [],
        series2 = [
          {
            name: "小人",
            type: "scatter",
            coordinateSystem: "geo",
            data: [],
            showAllSymbol: true,
            symbol:iconSym,
            symbolSize: [40, 40],
            symbolOffset: [0, 60],
            label: {
              normal: {
                formatter: "{b}:{d}",
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
        ],
        legend = [],
        grid = [];
        

      for (var i = 0; i < data.length; i++) {
        var datas = [];
        grid.push({
          lat: data[i].wd,
          lon: data[i].jd,
          width: "38px",
          height: "38px"
        });
        legend.push(data[i].name);
        var d = data[i];
        for (var key in d) {
          if (key == "jd" || key == "wd" || key == "name") {
            continue;
          }
          datas.push({ name: this.$utils.aliasNameMap[key]+":"+d[key]+"%", value: d[key],title:key});
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
              show: true
            }
          },
          data: datas
        });
        series2[0].data.push({
          name: data[i].name,
          value: [data[i].jd, data[i].wd, 0]
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
    setOptionsOfLocaltion(data) {
      var options = [],
        series1 = [],
        legend = [],
        grid = [];
      for (var i = 0; i < data.length; i++) {
        var datas = [];
        grid.push({
          lat: data[i].wd,
          lon: data[i].jd+0.1,
          width: "38px",
          height: "38px"
        });
        legend.push(data[i].name);
        var d = data[i];
        for (var key in d) {
          if (key == "jd" || key == "wd" || key == "name") {
            continue;
          }
          datas.push({ name: this.$utils.aliasNameMap[key]+":"+d[key]+"%", value: d[key],title:key});
        }
        series1.push({
          name: "占比",
          type: "pie",
          radius: "60%",
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: "outside"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "14",
                fontWeight: "bold",
                color: "white"
              },
              formatter: params => {
                var alias = this.$utils.aliasNameMap[params.data.title];
                return alias + ":" + params.data.value + "%";
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: datas
        });
      }
      var option1 = {
        grid: grid,
        series: series1
      };
      options.push(option1);
      return options;
    },
    statistic() {
      this.formModelShow = true;
      if (this.formInline.statisticalType == "0") {
        this.title = "个体污染来源解析";
        this.statisticPerson();
      } else {
        this.title = "地点污染来源解析";
        this.statisticLocation();
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
          url: this.$utils.IP + "/analysis/person/pollutantsAnalysis",
          params: { userIds: this.formInline.userIds, timePoint: timePoint }
        },
        this,
        res => {
          if (res.success) {
            var data = res.data;
            //在这里解析
            this.$refs.pollutantSources.getStatistic(data);
          }
        },
        true
      );
    },
    //地点统计
    statisticLocation() {
      var timePoint = this.$utils.formatDate(
        this.formInline.timePoint,
        "yyyy-MM-dd hh:mm:ss"
      );
      this.$http.send(
        {
          url: this.$utils.IP + "/analysis/location/pollutantsAnalysis",
          params: { positionName: this.formInline.positionName }
        },
        this,
        res => {
          if (res.success) {
            var data = res.data;
            //在这里解析
            this.$refs.pollutantSources.getStatistic([data]);
          }
        },
        true
      );
    }
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
