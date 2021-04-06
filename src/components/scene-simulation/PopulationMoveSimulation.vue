<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" inline style="padding:10px">
        <FormItem>
          <Select v-model="formInline.action" size="small" style="width:90px">
           <Option v-for="item in actionArr" :key="item" :value="item">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="pause" @click="searchData">卷帘视图对比</Button>
          <Button type="primary" icon="stats-bars" @click="statisticData">统计分析</Button>
          <Button type="primary" icon="archive" @click="downloadWord">结果导出</Button>
        </FormItem>
      </Form>
      <!-- <Dropdown trigger="custom" :visible="GuijiVisible" class="rankTab"  style="margin-top:55px"> 
        <DropdownMenu slot="list"> 
          <Table :height="tableHeight" :columns="columns4" width="500" :data="CheckboxData"></Table> 
        </DropdownMenu>
      </Dropdown> -->
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
        controlWay: '0',
        closeName:[],
        type:"人口移动仿真",
        action:''
      }, 
      CheckboxData:[],
      visible:false,
      tableHeight:window.innerHeight - 350,
      actionArr:[]
    }
  },
  mounted(){
    this.getAllActionControl();
  },
  methods:{
    //获取道路和工厂名称
    getControlPolicy(){
      // this.checkboxVisible = true;
      /* this.$http.send({url:"getControlPolicy",
        data:{controlWay:this.formInline.controlWay,
          closeName:this.formInline.closeName}},
      this,res => {
        this.CheckboxData = res.data["type" + this.formInline.controlWay];
      }) */
    },
    /* 获取所有的操作 */
    getAllActionControl(){
      this.$http.send({
        url:this.$utils.api +"/rkydfz/allAction",
        params:{},
        method:"POST"
      },this,res => { 
        this.actionArr= res.data;
      });

    },
    //选择道路或工厂
    selectCheckData(selection){
      var selected = [];
      selection.forEach(e=> {
         selected.push(e.label);
      })
      this.selectData = selected;
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
        url:this.$utils.api +"/rkydfz/jldb",
        params:this.formInline,
        method:"POST"
      },this,res => { 
        var data = res.data;
        this.$emit("subExcutemethods",{data:data,id:this.formInline.controlWay,lengedType:this.formInline.action});
      });
      /* this.$http.sendMock({
        url:"PopulationMoveSimulation"+ this.formInline.controlWay
      },this,res => {
        var data = res.data
          data["before"].gridName = "人口密度";
          data["after"].gridName = "人口密度";
        this.$emit("subExcutemethods",{data:data,id:this.formInline.controlWay,lengedType:"人口移动"});
      },true) */
    }, 
    //统计分析
    statisticData(){
      this.visible = true;
      this.$refs.statisticModal.getStatistic();
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
        var url = "./static/5.3人口移动仿真.docx";
        window.open(url);
      },500); 
    },
    //结果导出
    // downloadWord(){
    //   var url = "../../static/人口移动仿真.docx";
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
.rankTab{
  float:right;
  background-color:white;
  margin-top:-18px
}
.sureClose{
  margin: 10px;
  letter-spacing: 2px
}
</style>
