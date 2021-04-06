<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" inline style="padding:10px">
        <FormItem>
          <Select v-model="formInline.action" size="small" style="width:120px">
            <Option v-for="item in actionArr" :key="item" :value="item">{{item}}</Option>
            <!-- <Option v-for="item in dateData" :key="item.id" :value="item.label">{{item.label}}</Option> -->
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="pause" @click="searchData">卷帘视图对比</Button>
          <Button type="primary" icon="stats-bars" @click="statisticData">统计分析</Button>
          <Button type="primary" icon="archive" @click="downloadWord">结果导出</Button>
        </FormItem>
      </Form>
      <!-- <Form>
        <FormItem>
          <Row  class="rankTab">
            <Col span="3">
              <h4>时间：</h4>
            </Col>
            <Col span="20">
              <Slider height="20px" v-model="sliderValue" :min="0" :max="24" :step="1" :tip-format="format" show-stops show-tip="always"></Slider>
            </Col>
          </Row>
        </FormItem>
      </Form> -->
    </div>
    <statisticmodal ref="statisticModal" :params="formInline" @on-closeStatistic="closeStatistic" v-show="visible"></statisticmodal>
  </div>
</template>

<script>
import statisticmodal from "./statisticModal.vue";
export default {
  components:{
    statisticmodal
  },
  data(){
    return{
      formInline: {
        controlWay:'',
        type:"污染预测仿真",
        action:''
      },
      dateData:[],
      visible:false,
      sliderValue:0,
      actionArr:[]
    }
  },
  mounted(){
    this.getAllActionControl();
  },
  methods:{
    //获取系统当前时间之后的7天
    getSystemDate(){
      var fullXdate = [] , Xdate = '';
      var nowdate = new Date();
      var Ty = nowdate.getFullYear();
      var Tm = nowdate.getMonth() + 1;
      for(var i = 1; i< 8;i++){
        var Td = nowdate.getDate() + i;
        if (Td <= 9) {
          Td = "0" + Td;
        }
        var Xdate = Tm + "月" + Td + "日"
        fullXdate.push({label:Xdate,value:i})
      }
      this.dateData = fullXdate;
    },
    format (val) {
      if(val<10){
        val = "0" + val;
      }
      return val + ":00";
    },
    //关闭统计弹窗
    closeStatistic(){
      this.visible = false;
    },
    //卷帘对比
    searchData(){ 
      if(!this.formInline.action) {
        this.$Message.info("请选择仿真方式")
        return
      }
      this.$http.send({
        url:this.$utils.api +"/qjfz/wrycfz/jldb",
        params:this.formInline,
        method:"POST"
      },this,res => { 
        var data = res.data;
        this.$emit("subExcutemethods",{data:data,id:this.formInline.controlWay,lengedType:this.formInline.action});
      });
      /* var id = this.$utils.RandomNumBoth(0,4);
      this.$http.sendMock({
        url:"PollutionPredictSimulation"+ id
      },this,res => {
        var data = res.data
        if(data.length != 0){
          data["before"].gridName = "人口密度";
          data["after"].gridName = "人口密度";
          this.$emit("subExcutemethods",{data:data,lengedType:"污染预测",type:this.formInline.controlWay});          
        }
      },true) */
    },
    //统计分析
    statisticData(){
      this.visible = true;
      this.$refs.statisticModal.getStatistic();
    },
    /* 获取所有的操作 */
    getAllActionControl(){
      this.$http.send({
        url:this.$utils.api +"/qjfz/wrycfz/allAction",
        params:{},
        method:"POST"
      },this,res => { 
        this.actionArr= res.data;
      });

    },
    //结果导出
    downloadWord(){ 
      this.SpinShow();
      setTimeout(()=>{
        this.$Spin.hide();
        var url = "./static/5.4污染预测仿真.docx";
        window.open(url);
      },500); 
    },
    SpinShow(){
      this.$Spin.show({
          render: (h) => {
              return h('div', [
                  h('Icon', {
                      'class': 'demo-spin-icon-load',
                      props: {
                          type: 'load-c',
                          size: 18
                      }
                  }),
                  h('div', '下载中。。。')
              ])
          }
      });
    },
  },
}
</script>

<style scoped>
.toolbox{
  background: #fff;
  position: absolute;
  z-index: 100;
  right: 0px;
  height: 55px;
}
.rankTab{
  background-color:white;
  /* margin-top:-18px; */
  padding: 5px 20px;
}
.sureClose{
  margin: 10px;
  letter-spacing: 2px
}
</style>
