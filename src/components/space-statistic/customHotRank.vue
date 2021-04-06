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
    <Table :columns="columnsOfSiteTable" :show-header="showHeader" size="small" border
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
        {title:'序号',key: "id",width:65,align:'center'},
        {title:'名字',key:'name',width:100,align:'left'},
        {title:"风险",key:'risk',width:110,align:'center'},
        {title:"地址",key:'address',align:'center'},
      ],
    }
  },
  mounted(){
  },
  methods:{
    initTable(){
      this.$http.send({
        url: this.$utils.api + "/risk/riskHotRank",
        params:{riskType:this.params.riskType,page:this.pageNum,pageSize:this.pageSize,
                diqu:this.params.diqu,poiTypes:this.params.poiTypes,timeType:this.params.timeType}
      }, this, res => {
        if(res.success){
          var data = res.data.datas
          this.total = res.data.totalPages
          this.dataOfAll = [];
          
          data.forEach(item => {
            
            /* 修改因致癌和非致癌不同的数量级 */
            if(this.params.riskType=="1"){
              item.risk=item.risk;

            }else{
              item.risk=item.risk+"e-4";
            }
            this.dataOfAll.push(item)
          });
          this.$emit("drawPoints",data)
        }
      });
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
  }
}
</script>

<style scoped>
  .badgeText{
    letter-spacing: 2px;
    padding-left: 0.5em;
  }
  .imgStyle{
    width: 100%;
    height: 76px;
  }
  .rankStyle{
    padding-top:25px;
    cursor: pointer;
  }
</style>
