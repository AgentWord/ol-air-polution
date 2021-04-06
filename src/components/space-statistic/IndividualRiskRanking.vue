<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px 10px 0 10px;">
       <!--  <FormItem>
           <Select  v-model="formInline.statisticalType" @on-change="changeStatisticType" style="width:100px">
            <Option value="0">个体统计</Option>
            <Option value="1">区域统计</Option>
          </Select>
        </FormItem> -->
        <FormItem>
          <Select v-model="formInline.riskType" style="width:120px">
            <Option value="0">致癌风险</Option>
            <Option value="1">非致癌风险</Option> 
          </Select>
        </FormItem>
        <FormItem v-show="individualVisible">
          <Input v-model="formInline.username" >
            <Icon type="person" size="15" slot="append" style="cursor: pointer;" @click="getUserModal"></Icon>
          </Input>
        </FormItem>
         <FormItem>
          <!-- <Select v-model="formInline.diqu" style="width:120px" >
            <Option v-for="item in this.$utils.diquArr" :key="item.id" :value="item.label" disabled>{{item.label}}</Option> 
          </Select> -->
           <Select  style="width:120px" value='1'>
          <Option value="1">全部</Option>
          <Option value="2" disabled>北市区</Option>
          <Option value="2" disabled>南市区</Option>
          <Option value="2" disabled>新市区</Option>
          </Select>
        </FormItem> 
        <FormItem>
          <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
        </FormItem>
      </Form>
    </div>
    <Dropdown trigger="custom" :visible="visible" style="margin-top:55px">
      <DropdownMenu slot="list">
        <a href="#" id="popup-closer" class="ol-popup-closer" @click="closeTable"></a>
        <div class="rankTab">
          <Row>
              <Col span="24">
                <Tabs value="0" @on-click="changeTab">
                  <TabPane label="时榜" name="0" style="margin-top: -17px;">
                    <day-individual-risk-rank ref="0" :params="formInline" @setRiskRank="getRiskRank" @drawPointFlash="goToPoint">
                    </day-individual-risk-rank>
                  </TabPane> 
                  <TabPane label="日榜" name="1" style="margin-top: -17px;">
                    <day-individual-risk-rank ref="1" :params="formInline" @setRiskRank="getRiskRank" @drawPointFlash="goToPoint">
                    </day-individual-risk-rank>
                  </TabPane>
                  <TabPane label="周榜" name="2" style="margin-top: -17px;">
                    <day-individual-risk-rank ref="2" :params="formInline" @setRiskRank="getRiskRank" @drawPointFlash="goToPoint">
                    </day-individual-risk-rank>
                  </TabPane>
                  <TabPane label="月榜" name="3" style="margin-top: -17px;">
                    <day-individual-risk-rank ref="3" :params="formInline" @setRiskRank="getRiskRank" @drawPointFlash="goToPoint">
                    </day-individual-risk-rank>
                  </TabPane>
                </Tabs>
              </Col>
            </Col>
          </Row>
        </div>
      </DropdownMenu> 
    </Dropdown>
    <usermodal ref="ModalVisible" @setUserName="getUserName" @on-closeUser="closeUserModal" v-show="userModalVisible"></usermodal>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
import usermodal from "../../components/base/userModalSingle.vue";
import dayIndividualRiskRank from "./dayIndividualRiskRank.vue";
export default {
  name: 'individualRiskRanking',
  components:{
    usermodal,
    dayIndividualRiskRank,
  },
  data(){
    return{
      userModalVisible: false,
      visible: false,
      rankTabVisible:false, 
      individualVisible:false,
      rankTabVisibleOfdiqu:false,
      formInline: { 
        username:'',
        userIds:6,
        diqu:'',
        timeType:'0',
        statisticalType:'0', 
        riskType:'0', 
      },
      ruleValidate:rules.user,
      dataOrder:[]
    }
  },
  mounted(){  
  },
  methods:{
    //切换统计
    changeStatisticType(){
      if(this.formInline.statisticalType == 0){
        this.individualVisible = true; 
        this.visible = true; 
        this.rankTabVisibleOfdiqu = false; 
        this.visibleOfdiqu = false; 
      }else{
        this.individualVisible = false; 
        this.visible = false; 
        this.rankTabVisibleOfdiqu = true; 
        this.visibleOfdiqu = true; 
      }
    }, 
    //打开用户信息表弹窗
    getUserModal(){
      this.userModalVisible = true;
      this.$refs.ModalVisible.openModal();
    },
    //关闭弹窗
    closeUserModal(){
      this.userModalVisible = false;
    },
    //获取选择的用户名
    getUserName(data){
      this.formInline.username = data.username;
      this.formInline.userIds = data.userid;
    },
    //切换tab
    changeTab(name){
      this.formInline.timeType = name; 
      this.$refs[this.formInline.timeType].initTable();
    }, 
    //加载点
    getRiskRank(data){
      // 单位问题曹丹
      //data.riskType=this.formInline.riskType;// 标志致癌0 非致癌1,控制单位是否显示e-4。
      this.$emit("excutemethods","IndividualRiskRank",data);
    },
    //定位点
    goToPoint(target){
      this.$emit("excutemethods","drawPointFlash", [target.lon,target.lat]);
    },
    //全部请求
    searchData(){
      this.visible = true;
      this.$refs[this.formInline.timeType].initTable(); 
    },
    closeTable(){
      this.visible=false;
    }
  },
}
</script>

<style scoped>
.toolbox{
  background: #fff;
  position: absolute;
  z-index: 1000;
  right: 0px;
  height: 55px;
}
.rankStyle{
  max-height: 600px;
  overflow-y:auto;
}
/* .rankTab{
  float:right;
  background-color:white;
  margin-top:-18px
} */
.myRank{
  /* background-color: rgb(84,172,236) */
  background: linear-gradient(to top right, #CDDC39 0%, #8BC34A 25%, #FFEB3B 100%);
}
.myRankImg{
  width: 75px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 500px;
  white-space: nowrap;
  margin: 15px 0px 10px 5px;
}
.rankText{
  padding-top:50px;
  color:white;
  font-size:15px;
  letter-spacing: 2px;
  text-align: center;
}
.rankTab{
  width: 350px;
  float:right;
  height: 100%;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
  z-index: 1;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>
