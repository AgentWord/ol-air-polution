<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" inline style="padding:10px">
        <FormItem>
          <Select v-model="formInline.action" size="small" style="width:90px" @on-change="getControlPolicy">
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
    <statisticmodal ref="statisticModal" :params="formInline" 
      @on-closeStatistic="closeStatistic" v-show="visible"></statisticmodal>
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
        type:"污染管控仿真",
        action:''
      },
      columns4: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '道路名称',
          key: 'label'
        }
      ],
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
        url:this.$utils.api +"/dqjfz/getAllAction",
        params:{isSys5:'1'},
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
      /* this.$http.sendMock({
        url:"PollutionControlSimulation"+ this.formInline.controlWay
      },this,res => {
        var data = res.data
        this.$emit("subExcutemethods",{data:data,id:this.formInline.controlWay,lengedType:"污染管控"});
      },true) */
      this.$http.send({
        url:this.$utils.api +"/dqjfz/jldb",
        params:this.formInline,
        method:"POST"
      },this,res => { 
        var data = res.data;
        this.$emit("subExcutemethods",{data:data,id:this.formInline.controlWay,lengedType:"污染管控"});
      });
      
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
      var _this = this;
      setTimeout(function(){
        _this.$Spin.hide();
        var url = "./static/5.2污染管控仿真.docx";
        window.open(url);
      },500); 
    },
    //结果导出
    // downloadWord(){
    //   var url = "../../static/污染管控仿真.docx";
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
