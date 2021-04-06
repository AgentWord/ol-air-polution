<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px">
        <FormItem prop="mockType">
          <Select  v-model="formInline.mockType" @on-change="changeMockType" style="width:150px">
            <Option value="1">个体暴露模拟测量</Option>
            <Option value="2">POI浓度模拟测量</Option>
          </Select> 
        </FormItem> 
        <FormItem v-if="POIType == true">
          <searchbar v-if="changeType === true" @on-select="loactionSelect" @getSearchKey="setSearchKey"></searchbar>
          <!-- <Select v-else v-model="formInline.location" style="width:162px;" @on-change="getInterestPoint">
            <Option v-for="item in dataSelect" :key="item.id" :value="item.label">{{item.label}}</Option>
          </Select> -->
        </FormItem>
        <!-- <FormItem style="margin-left:-15px" v-if="POIType == true">
          <Button type="ghost" icon="navigate" style="color:#4189DD" @click="onChangeButton">切换</Button>
        </FormItem> -->
        <FormItem v-else>
          <Input v-model="formInline.username">
            <Icon type="person" size="15" slot="append" style="cursor: pointer;" @click="getUserModal"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchData" v-if="POIType">场景提取</Button>
          <Button type="primary" icon="ios-search" @click="searchData" v-else>查询</Button>
          <Button type="primary" icon="stats-bars" @click="statisticData" v-if="POIType==false">统计</Button>
        </FormItem>
      </Form>
    </div>
    <div>
      <usermodal ref="userModalModal" @setUserName="getUserName" @on-closeUser="closeUserModalReal" v-show="userModalVisible"></usermodal>
      <RealTimestatisticModal ref="statisticModal" :params="formInline" @on-closeStatistic="closestatisticModalReal" v-show="statisticModalVisible"></RealTimestatisticModal>
    </div>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
import inputuser from "../../components/base/inputUser.vue";
import usermodal from "../../components/base/userModalSingle.vue";
import searchbar from "../../components/base/search-bar.vue";
import RealTimestatisticModal from "./RealTimestatisticModal.vue";
export default {
  components:{
    usermodal,
    RealTimestatisticModal,
    searchbar
  },
  data(){
    return{
      formInline: {
        username: '',
        userid:'',
        mockType:"1",
        location: '',
        statisticTitle:'模拟暴露测量统计'
      },
      ruleValidate:rules.user,
      userModalVisible:false,
      POIType:false,
      moniCeliang:true,// 标识 模拟测量
      statisticModalVisible:false,
      changeType:true,
      searchResults:[],
      loading:false,
      dataSelect:[
        {
          label:"医院"
        },
        {
          label:"学校"
        },
        {
          label:"车站"
        },
        {
          label:"工厂"
        },
        {
          label:"养老院"
        },
        {
          label:"公园"
        },
      ]
    }
  },
  mounted(){
    this.moniData()
  },
  methods:{
    //打开用户信息表弹窗
    getUserModal(){
      this.userModalVisible = true;
      this.$refs.userModalModal.openModal();
    },
    //打开用户信息表弹窗
    getStatisticModal(){
      this.statisticModalVisible = true;
      this.$refs.statisticModal.openModal();
    },
    //关闭弹窗
    closeUserModal(){
      this.userModalVisible = false;
    },
    //关闭统计弹窗
    closestatisticModalReal(){
      this.statisticModalVisible = false;
    },
    //获取选择的用户名
    getUserName(data){
      this.formInline.username = data.username;
      this.formInline.userid = data.userid;
    },
    closeUserModalReal(){
      this.RuserModalVisible = false;
    },
    //切换兴趣点
    onChangeButton(){
      this.changeType = !this.changeType;
    },
    //自动匹配位置查询
    loactionSelect(selectedItem){
      this.formInline.location = selectedItem.name;
    },
    //选择兴趣点
    getInterestPoint(){ 
    },
    //切换个体暴露模拟测量和POI浓度模拟测量
    changeMockType(){
      if(this.formInline.mockType == "2"){
        this.POIType = true; 
      }else{
        this.POIType = false;
      }
      this.moniCeliang = this.POIType;
    },
    //统计分析
    statisticData(){
      if(this.POIType){
        if (this.formInline.location == ''){
          this.$Message.info("请填写位置信息或兴趣点信息！")
          this.statisticModalVisible = false;
          return;
        }
      }else{
        if(this.formInline.username == ""){
          this.$Message.info("请填写用户名称！")
          this.statisticModalVisible = false;
          return;
        }
      } 
      this.statisticModalVisible = true;
      this.$refs.statisticModal.getStatistic(); 
    },
    //所有模拟暴露测量
    moniData(){
      this.$http.send({url: this.$utils.api +"/exposure/realTimeExposure"}, this, res => { 
        this.$emit("excutemethods","drawMoniPoints",{data:res.data,moniCeliang:this.moniCeliang,type:"realTime"})
      }); 
    },
    setSearchKey(key){
      this.formInline.location = key;
    },
    //查询模拟暴露
    searchData(){
      // if(this.formInline.username == ""){
      //   this.$Modal.warning({
      //     title:"",
      //     content:"请填写用户姓名！"
      //   })
      //   this.statisticModalVisible = false;
      //   return;
      // }else if (this.formInline.location == ''){
      //   this.$Modal.warning({
      //     title:"",
      //     content:"请填写位置信息或兴趣点信息！"
      //   })
      //   this.statisticModalVisible = false;
      //   return;
      // }else{
        this.statisticModalVisible = true; 
        var time = this.$utils.getNearDay("now");
        if(this.formInline.mockType == "1"){ // 个体
          this.$http.send({
            url: this.$utils.api +"/exposure/realTimeExposure",
            params:{userIds:this.formInline.userid}
          }, this, res => {
            var data = res.data;
            if(data.length == 0) {
              this.$Message.info("暂无数据")
            }else{
              this.$emit("excutemethods","drawMoniPoints",{data:data,moniCeliang:this.moniCeliang,type:"realTime"})
            }
          });
        }else{ // POI场景
          this.$http.send({
            url: this.$utils.api +"/poi/poiQuery",
            params:{name:this.formInline.location}
          }, this, res => {
            var resdata = res.data;
            resdata.time = time;
            resdata.street = this.formInline.location;
            var data = [resdata];
            this.$emit("excutemethods","drawMoniPoints",{data:data,moniCeliang:this.moniCeliang,type:"mock"})
          });
        } 
      // }
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
</style>
