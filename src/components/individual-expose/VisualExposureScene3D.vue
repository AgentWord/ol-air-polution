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
          <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div>
      <usermodal ref="userModalModal" @setUserName="getUserName" @on-closeUser="closeUserModalReal" v-show="userModalVisible"></usermodal>
    </div>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js"; 
import usermodal from "../../components/base/userModalSingle.vue"; 
export default {
  components:{
    usermodal, 
  },
  data(){
    return{
      formInline: {
        username: '',
        userid: '',  
      },
      ruleValidate:rules.user, 
      userModalVisible:false, 
    }
  },
  mounted(){
    this.init(); 
  },
  methods:{
    init(){
      this.RealTimesData()
      // if(){ 
      //   this.aGis.zoom=6;
      //   this.aGis.center=[115.459812,38.873716];
      // }
    },
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
    //所有实时暴露测量
    RealTimesData(){
      this.$http.send({ url: this.$utils.api +"/exposure/realTimeExposure"}, this, res => {
        var data = res.data;
        this.$emit("scence3DMethods","VisualExposureScene3D",{data:data})
      });
      // this.$http.send({ url: "VisualExposureScene3D"}, this, res => {
      //   this.$emit("scence3DMethods","VisualExposureScene3D",res)
      // });
    },
    //查询实时暴露
    searchData(){
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
            this.$emit("scence3DMethods","VisualExposureScene3D",{data:data})
          }
        });
      } 
      // this.$http.send({ url: "getVisualExposureScene3D",
      //   data:{"usersid":[this.formInline.selectuserid],
      //       "beginTime":beginTime,
      //       "endTime":endTime
      //   }}, this, res => {
      //     var resData = res.data;
      //     console.log(resData);
      //     this.$emit("scence3DMethods","VisualExposureScene3D",res)
      // });
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
