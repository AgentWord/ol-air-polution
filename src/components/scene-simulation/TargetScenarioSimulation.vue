<template>
  <div>
    <div class="toolbox">
      <Form ref="formInline" :model="formInline" inline style="padding:10px">
        <FormItem>
          <Select v-model="formInline.type" size="small" style="width:120px" @on-change="getTarget">
            <Option v-for="item in pollutionArr" :key="item.id" :value="item.val">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Select v-model="formInline.year" size="small" style="width:120px" @on-change="getTargetNongdu">
            <Option v-for="item in targetArr" :key="item" :value="item">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Select v-model="formInline.level" size="small" style="width:120px">
            <Option v-for="item in levelArr" :key="item.id" :value="item">{{item}}</Option>
            <!-- <Option value="0">高 35ug/m³</Option>
            <Option value="1">中 37ug/m³</Option>
            <Option value="2">低 53ug/m³</Option> -->
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="QueryData">查询</Button> 
          <Button type="primary" icon="archive" @click="downloadWord">详情下载</Button>
        </FormItem>
      </Form>
    </div>
    <Dropdown trigger="custom" :visible="visible" style="margin-top:55px"> 
      <DropdownMenu slot="list"> 
        <a href="#" id="popup-closer" class="ol-popup-closer" @click="closeTable"></a>
        <Table :height="tableHeight" :columns="columns1" :data="data1"></Table> 
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  data(){
    return{
      formInline: {
        type: "",
        year:"",
        level:'',
        tragetNongdu:"",
      },
      visible:false,
      tableHeight:200,
      columns1:[
        {
          title:"情景设定",
          key:"qjsd",
          minWidth:120
        },
        {
          title:"健康效益评估(万元)",
          key:"jkxypg",
          minWidth:150
        },
        {
          title:"控制成本评估(万元)",
          key:"kzcbpg",
          minWidth:150
        },
        {
          title:"成本效益比",
          key:"cbxyb",
          minWidth:120,
          render: (h, params) => {
              return h("div",
                params.row.cbxyb.toFixed(3)
              ) 
          }
        }
      ],
      data1:[],
      qingjingArr:[],
      pollutionArr:[],
      targetArr:[],
      levelArr:[]
    }
  },
  mounted(){
    this.initpollutionArr(); 
  },
  methods:{
    //获取目标浓度
    
    /* 初始化 获取情景数据 --污染物类型*/
    initpollutionArr(){
      this.$http.send({
        url:this.$utils.api +"/fkya/getpollutionType",
        params:{},
        method:"POST"
      },this,res => { 
        //this.pollutionArr= res.data;
        this.pollutionArr= [];
        res.data.forEach(element => {
             this.pollutionArr.push({label:this.$utils.Diction(element),val:element});
        });
        // 默认选中第一条数据
        this.formInline.type=this.pollutionArr[0].val;
        setTimeout(()=>{this.getTarget(this.formInline.type)},100);
      });
    },
    /* 污染物类型=>年度目标*/
    getTarget(value){
      this.$http.send({
        url:this.$utils.api +"/fkya/getYear",
        params:{type:value},
        method:"POST"
      },this,res => { 
        this.targetArr= res.data;
        // 默认选中第一条数据
        this.formInline.year=this.targetArr[0];
        setTimeout(()=>{this.getTargetNongdu()},100);
      });
    },
    /* 根据污染物类型和年份查询浓度 */
    getTargetNongdu(){
      this.$http.send({
        url:this.$utils.api +"/fkya/getLevel",
        params:this.formInline,
        method:"POST"
      },this,res => { 
        this.levelArr= res.data;
        this.formInline.level=this.levelArr[0];
      });

    },
    /* 点击查询 */
    QueryData(){
      this.$http.send({
        url:this.$utils.api +"/fkya/getAllInfo",
        params:this.formInline,
        method:"POST"
      },this,res => { 
        this.visible = true;
        this.data1=res.data.table;
        /* 地图加载 */
        let mapData = res.data.data;
        this.formInline.preUrl = mapData[0].url;
        this.formInline.layerid = mapData[0].layer;
        this.formInline.title="单位：μg/m³";
        this.$emit("excutemethods","TargetScenarioSimulation",{data:this.formInline,title:"暴露模拟预测"}); 
        this.aGis.zoom=8;
      });

    },
    //查询
    searchData(){
      this.$http.sendMock({
        url:"TargetScenarioSimulation",
        params:this.formInline
      },this,res => {
        var data = res.data[0]
        this.$emit("excutemethods","TargetScenarioSimulation",{data:data,id:this.formInline.tragetNongdu,title:"暴露量"})
        this.aGis.zoom=8;
        this.aGis.center=[115.160138,39.002451];
        this.visible = true;
        this.getData()
      });
    }, 
    //获取data1
    getData(){
      this.$http.sendMock({
        url:"TargetScenarioSimulation" + this.formInline.pollutionType + this.formInline.tragetYear,
      },this,res => {
        this.data1 = res.data
      });
    },
    //详情下载
    downloadWord(){
      var url = "../../../static/5.1目标情景仿真.docx"
      /* switch (this.formInline.tragetYear) {
        case "0":
          url = "../../../static/PM2025年目标情景评估.docx"
          break;
        case "1":
          url = "../../../static/PM2030年目标情景评估.docx"
          break; 
        default:
          break;
      } */
      console.log(url)
      window.open(url);
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
.rankTab{
  float:right;
  background-color:white;
  margin-top:-18px
}
.sureClose{
  margin: 10px;
  letter-spacing: 2px
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
