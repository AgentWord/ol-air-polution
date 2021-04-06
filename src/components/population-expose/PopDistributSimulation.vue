<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" inline style="padding:10px">
        <!-- <FormItem>
          <Select v-model="formInline.crowdType" style="width:120px">
            <Option value="1">总人群</Option>
            <Option value="2">青少年</Option>
            <Option value="2">青年</Option>
            <Option value="3">中年</Option>
            <Option value="4">老年</Option>
          </Select>
        </FormItem> -->
        <!-- <FormItem >
          <Select v-model="formInline.diqu" style="width:120px">
            <Option v-for="item in this.$utils.diquArr" :key="item.id" :value="item.value">{{item.label}}</Option> 
          </Select>
        </FormItem> --> 
         <FormItem >
          <Select v-model="formInline.value" style="width:250px" filterable placeholder="请选择人群数据" @on-change="SelectChange">
            <Option v-for="item in formData" :key="item.id" :value="item.id+'&'+item.url">{{item.about}}</Option> 
          </Select>
        </FormItem>
        <!-- <FormItem >
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" v-model="formInline.time"></DatePicker>
        </FormItem> -->
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchWuranDraw">查询</Button>
          <Button type="primary" icon="stats-bars" @click="statisticData">统计</Button>
        </FormItem>
      </Form>
    </div> 
    <statisticmodal ref="statisticModal" :params="formInline" @on-closeStatistic="closeStatistic" v-show="statisticModalVisible"></statisticmodal>
  </div>
</template>

<script>
import sixWuranwuRadio from "../../components/base/six-wuranwu-radio.vue";
import statisticmodal from "./statisticModal.vue";
export default {
  components:{
    sixWuranwuRadio,
    statisticmodal
  },
  data(){
    return{
      formInline: {
        about:"",
        id:"",
        preUrl:"",
        value:"",
        type:"分布统计",
      },
      formData:[],
      diquArr:[
        {
          label:"全部",
          value:1,
        },
        {
          label:"北市区",
          value:2,
        },
        {
          label:"南市区",
          value:3,
        },
        {
          label:"新市区",
          value:4,
        },
      ],
      statisticModalVisible:false, 
    }
  },
  mounted(){
    // 初始化加载地图信息；
    this.GetAllMapData();
  },
  methods:{ 
    //查询污染物
    searchWuranDraw(){
      if(this.formInline.value == ""){
        this.$Message.info("请选择人群数据！")
        return;
      }
      /* var dataArr=[];
      dataArr.push(this.formInline); */
      this.formInline.title="单位：人"
      this.$emit("excutemethods","popDistributSimulation",{data:this.formInline,title:"人口密度"})

      // 原调用  弃用
      /* this.$http.send({
        url:this.$utils.api +"/mapServer/mapServer/crowd/getCrowdMapServerInfoByCrowdType",
        params:{crowdType:this.formInline.crowdType}
      },this,res => {
        var data = res.data;
        var e = data.filter((value, index, self)=>{  
          return value.diqu == this.formInline.diqu;
        }) 
        this.$emit("excutemethods","popDistributSimulation",{data:e,title:"人口密度"})
      })  */
      
    },
    // 加载后台信息
    GetAllMapData(){
      this.$http.send({
        url:this.$utils.api +"/mapServer/mapServer/crowd/getCrowdMapServerInfoByCrowdType",
        params:{}
      },this,res => {
        this.formData = res.data;
      });
    },
    // 对下拉列表进行监听
    SelectChange(value){
      this.formInline.id=value.split("&")[0];
      var url=value.split("&")[1];
      var serviceUrl=url.substr(0,url.lastIndexOf("/"));
      var layerid=parseInt( url.substr(url.lastIndexOf("/")+1));
      this.formInline.layerid=layerid;
      this.formInline.preUrl=serviceUrl;
      console.table(this.formInline);

    },
    //关闭统计弹窗
    closeStatistic(){
      this.statisticModalVisible = false;
    },
    //统计分析
    statisticData(){
      this.statisticModalVisible = true;
      this.$refs.statisticModal.getStatistic();
    }
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
</style>
