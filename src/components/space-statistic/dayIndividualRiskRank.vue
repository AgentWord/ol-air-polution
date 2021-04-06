<style lang="less">
.leftTop{
  &-site-table{
  width: 290px !important;
  }
}
.table-page-bar{
    text-align:center;
}
</style>
<template>
  <div>
    <Table border :columns="columnsOfSiteTable" :show-header="showHeader" size="small" 
     :data="dataOfAll" :height="tableHeight" 
        highlight-row @on-row-click="handleCurrentChange">
        <Page slot="footer" class-name="table-page-bar" :total="total" simple
        :current="pageNum" :page-size="pageSize" size="small" show-total placement="top"
            @on-change="handlePage">
        </Page>           
    </Table>
  </div>
</template>

<script>
export default {
  props:{
    params:Object
  },
  data(){
    return{
      imgSrc:"../../static/images/华电二区.jpg",
      current:1,
      dataOfSiteTable:[],
      dataOfAll:[],
      total:0,
      pageNum:1,
      pageSize:10,
      tableHeight:350,
      showHeader:true,
      columnsOfSiteTable:[
        {title:'序号',type: "index",width:65,align:'center'},
        {title:'名字',key:'name',width:100,align:'left'},
        {title:"风险",key:'risk',width:90,align:'center'},
        {title:"地址",key:'streetName',align:'center'},
      ],
    }
  },
  mounted(){
  },
  methods:{
    initTable(){
      if(this.params.statisticalType == '1'){
        //区域
        this.$http.send({
          url: this.$utils.api +"/risk/individualRiskRank",
          method:"POST",
          params:{riskType:this.params.riskType,page:this.pageNum,pageSize:this.pageSize,
                  diqu:this.params.diqu,timeType:this.params.timeType}
          }, this, res => {
            if(res.success){
              var data = res.data.data
              data.forEach(e => {
                e.risk = e.avgRisk
              })
              this.dataOfAll = [];
              data.forEach(item => {
                item.risk=item.risk+"e-4";
                this.dataOfAll.push(item);
              });
              this.$emit("setRiskRank",data); 
            }
        });
      }else{
        //个体
        this.$http.send({
          url: this.$utils.api +"/risk/individualRiskUserRank",
          method:"POST",
          params:{riskType:this.params.riskType,userIds:this.params.userIds,timeType:this.params.timeType}
          }, this, res => {
            if(res.success){
              var data = res.data
              this.dataOfAll = data
              this.$emit("setRiskRank",data); 
            }
        });
      }
    },
    handlePage(value){
        this.pageNum=value;
        this.initTable();
    },
    handlePageSize(value){
        this.pageSize=value;
        this.initTable();
    },
    handleCurrentChange(currentRow,oldCurrentRow){
        this.$emit("drawPointFlash",currentRow)
    },
    //获取风险热点排序
    IndividualRiskRank(){
      this.rankTableVisible = true; 
      let params = {}
      if(this.params.statisticalType == "0"){

      }else{
        params = {page:this.pageIndex,
          pageSize:this.pageSize,
          diqu:this.params.diqu,
          timeType:this.params.timeType,
          riskType:this.params.riskType}
      }
      this.$http.send({
        url: this.$utils.api +"/risk/individualRiskRank",
        method:"POST",
        params:params
        }, this, res => {  
          var data = res.data.data;
          this.textOrder = data.sort(this.$utils.sortDescByKey("riskValue"));
          this.totalLength = this.textOrder.length;
          this.data2 = this.textOrder;
          if(this.textOrder.length<this.pageSize){
            this.dataOrder = this.data2;
          }else{
            this.dataOrder=this.textOrder.slice(0,this.pageSize);
          }
          this.$emit("setRiskRank",this.textOrder); 
        })
        return;
        if(this.params.statisticalType == "0"){
          this.$http.send({url: "IndividualRiskRanking",
            data:{"userid":this.params.selectuserid,
              "beginTime":beginTime,
              "endTime":endTime
              }}, this, res => {
            var resDatas = res.data;
            // console.log(resDatas);
            resDatas.forEach(e=>{
              e.riskValue=parseInt(Math.random()*100+1);
            })
            this.textOrder = resDatas.sort(this.$utils.sortDescByKey("riskValue"));
            this.totalLength = this.textOrder.length;
            this.data2 = this.textOrder;
            // this.dataOrder = this.textOrder.slice(0,5);
            if(this.textOrder.length<this.pageSize){
              this.dataOrder = this.data2;
            }else{
              this.dataOrder=this.textOrder.slice(0,this.pageSize);
            }
            this.$emit("setRiskRank",this.textOrder);
          });
        }else{
          this.$http.send({url: "IndividualRiskRanking",
            data:{"regionalScope":this.params.regionalScope,
              "beginTime":beginTime,
              "endTime":endTime
              }}, this, res => {
            var resDatas = res.data;
            // console.log(resDatas);
            resDatas.forEach(e=>{
              e.riskValue=parseInt(Math.random()*100+1);
            })
            this.textOrder = resDatas.sort(this.$utils.sortDescByKey("riskValue"));
            console.log(this.textOrder)
            // this.totalLength = resDatas.length;
            // this.dataOrder = this.textOrder.slice(0,5);
            this.data2 = this.textOrder;
            // this.dataOrder = this.textOrder.slice(0,5);
            if(this.textOrder.length<this.pageSize){
              this.dataOrder = this.data2;
            }else{
              this.dataOrder=this.textOrder.slice(0,this.pageSize);
            }
            this.$emit("setRiskRank",this.textOrder);
          });
        }

    },
    addMore(){
      this.pageIndex ++
      var end = this.pageIndex*this.listSize;
      this.dataOrder = this.textOrder.slice(0,end);
    },
    jiaohu(index){
      var lon = parseFloat(index["lon"]);
      var lat = parseFloat(index["lat"]);
      var target = [lon,lat];
      this.$emit("setPoint",target);
    },
    //切换页数
    changePage(pageIndex){
      this.pageIndex = pageIndex;
      var start=(pageIndex - 1) * this.pageSize;//切换页数的起始数据行
      var end=pageIndex * this.pageSize;//切换页数的结束数据行
      this.dataOrder=this.textOrder.slice(start,end);
    },
    //添加分组
    addGroup(name){
      switch (name) {
        case "addGroup":
        this.addGroupVisible=true;
        this.$refs.ModalVisible.openModal();
          break;
        case this.groupItem[0].groupName:
        this.IndividualRiskRank();
          break;

        default:
          break;
      }
    },
    //确认分组
    excudeGrouped(groupData){
      // this.groupItem.push(groupData);
      this.groupItem = groupData;
      console.log(this.groupItem)
      this.params.selectuserid = groupData.selectUserId;
      this.IndividualRiskRank();
    }
  }
}
</script>

<style scoped>
  .badgeText{
    letter-spacing: 2px;
    padding-left: 0.5em;
  }
.myRankImg{
  width: 75px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 500px;
  white-space: nowrap;
  margin: 15px 0px 10px 5px;
}
.rankStyle{
  padding-top:25px;
  cursor: pointer;
}
</style>
