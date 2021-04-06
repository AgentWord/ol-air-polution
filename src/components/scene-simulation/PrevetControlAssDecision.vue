<template>
  <div>
    <div class="toolbox"> 
      <Form ref="formInline" :model="formInline" :rules="ruleValidate" inline style="padding:10px">  
        <FormItem prop="">
          <Select v-model="formInline.action" size="small" style="width:90px">
              <Option v-for="item in actionArr" :key="item" :value="item">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="pause" @click="searchData">卷帘视图对比</Button>
          <Button type="primary" icon="archive" @click="downloadWord">防控辅助决策下载</Button>
        </FormItem> 
      </Form>
    </div>
  </div>
</template>

<script>
import rules from "@/lib/rule-validate.js";
export default {
  components:{
  },
  data(){
    return{
      formInline: {
        controlWay:'0',
        action:""
      },
      ruleValidate:rules.user,
      actionArr:[]
    }
  },
  mounted(){
    this.getAllActionControl();

  },
  methods:{
    /* 获取所有的操作 */
    getAllActionControl(){
      this.$http.send({
        url:this.$utils.api +"/fkfzjc/allAction",
        params:{},
        method:"POST"
      },this,res => { 
        this.actionArr= res.data;
      });

    },
    //卷帘对比
    searchData(){
      if(!this.formInline.action) {
        this.$Message.info("请选择仿真方式")
        return
      }
      this.$http.send({
        url:this.$utils.api +"/fkfzjc/jldb",
        params:this.formInline,
        method:"POST"
      },this,res => { 
        var data = res.data;
        this.$emit("subExcutemethods",{data:data,id:this.formInline.controlWay,lengedType:this.formInline.action});
      });
      /* var id = this.$utils.RandomNumBoth(0,4);
      this.$http.sendMock({
        url:"PollutionPredictSimulation"+ this.formInline.controlWay
      },this,res => {
        var data = res.data
        if(data.length != 0){
          data["before"].gridName = "风险值";
          data["after"].gridName = "风险值";
          this.$emit("subExcutemethods",{data:data,lengedType:"防控辅助"});          
        }
      },true) */
      // this.$http.sendMock({
      //   url:"PopulationMoveSimulation"+ this.formInline.controlWay
      // },this,res => {
      //   var data = res.data
      //     data["before"].gridName = "风险值";
      //     data["after"].gridName = "风险值";
      //   this.$emit("subExcutemethods",{data:data,id:this.formInline.controlWay,lengedType:"防控辅助"});
      // },true)
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
    //结果导出
    downloadWord(){ 
      this.SpinShow();
      setTimeout(()=>{
        this.$Spin.hide();
        var url = "./static/5.5防控辅助决策.docx";
        window.open(url);
      },500); 
    },
    //结果导出
    // downloadWord(){
    //   var url = "../../static/污染辅助决策.docx";
    //   window.open(url);
    // },
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
