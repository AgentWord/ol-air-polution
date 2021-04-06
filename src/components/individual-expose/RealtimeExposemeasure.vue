<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px">
        <FormItem>
          <Input v-model="formInline.username">
            <Icon type="person" size="15" slot="append" style="cursor: pointer;" @click="getUserModal"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchRealTime">查询</Button>
          <Button type="primary" icon="stats-bars" @click="statisticData">统计</Button>
        </FormItem>
        <FormItem>
          <Checkbox v-model="moniCeliang" @on-change="searchRealTime"><span style="font-size:14px;letter-spacing:0.5px">模拟暴露测量</span></Checkbox>
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
import RealTimestatisticModal from "./RealTimestatisticModal.vue";
export default {
  components:{
    usermodal,
    RealTimestatisticModal,
  },
  data(){
    return{
      formInline: {
        username: '',
        userid:'',
        statisticTitle:'实时暴露测量统计'
      },
      ruleValidate:rules.user,
      moniCeliang:false,
      userModalVisible:false,
      statisticModalVisible:false
    }
  },
  mounted(){
    this.RealTimesData()
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
    //统计分析
    statisticData(){ 
      if(this.formInline.username == ""){
        this.$Message("请选择用户姓名!")
        return;
      }else{
        this.statisticModalVisible = true;
        this.$refs.statisticModal.getStatistic();
      }
    },
    //所有实时暴露测量
    RealTimesData(){
      this.$http.send({ url: this.$utils.api +"/exposure/realTimeExposure"}, this, res => {
        var resData = res.data;
        this.$emit("excutemethods","drawRealTimePoints",{data:resData,moniCeliang:this.moniCeliang,type:"realTime"})
      });
    },
    //查询实时暴露
    searchRealTime(){
      if(this.formInline.username == ""){
        this.$Message.warning("请选择用户姓名")
        this.statisticModalVisible = false;
        return;
      }else{
        this.statisticModalVisible = true;
        this.$http.send({ 
          url: this.$utils.api +"/exposure/realTimeExposure",
          params:{userIds:this.formInline.userid}
        }, this, res => {  
          var data = res.data;
          if(data.length == 0) {
            this.$Message.info("暂无数据")
          }else{
            this.$emit("excutemethods","drawRealTimePoints",{data:data,moniCeliang:this.moniCeliang,type:"realTime"})
          }
        });
      }
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
