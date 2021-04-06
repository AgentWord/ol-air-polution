<style>
    .table-page-bar{
        text-align:center;
    }
</style>
<template>
    <div class="" ref="basetable">
       <Table highlight-row :columns="columnsList" :size="size" :data="data" :row-class-name="rowClassName"
        @on-current-change="handleCurrentChange" :height="tableHeight"
        @on-select-cancel="handleCancelselectRow" @on-select="handleSelectedRow"
        @on-select-all="handleSelectAll" @@on-selection-change="handleSelectChange">
         <page-bar slot="footer" class="table-page-bar" ref="pagebar" v-bind:ajaxOptions="ajaxOptions"  @request-data='handleRequestData'>
        </page-bar>
        </Table> 
    </div>
</template>

<script> 
export default {
    props:{
        columnsList:{type:Array,default:[]},
        ajaxOptions:{type:Object,default:{}},
        chooseObject:Object,
        size:{type:String,default:'small'},
        tableHeight:Number,
        rowClassName:Function, 
    }, 
    data(){
        return{
            data:[],
            dataOfAll:[],
            dataFilter:()=>{return true}
        }
    },
    methods:{
        init(){
        },
        handleCurrentChange(currentRow,oldCurrentRow){
            this.$emit('handleCurrentChange',currentRow,oldCurrentRow);
        },
        //全选
        handleSelectAll(selection){ 
            this.$emit('handleSelectAll',selection);
        },
        //取消全选
        handleSelectChange(selection){
            this.$emit('handleSelectChange',selection);
        },
        //取消选中用户
        handleCancelselectRow(selection,row){
            this.$emit('handleCancelselectRow',selection,row);
        },
        //勾选用户
        handleSelectedRow(selection,row){
            this.$emit('handleSelectedRow',selection,row);
        },
        handleRequestData(res){
            //request-return-data
            this.dataOfAll=res.data;
            this.data=this.dataOfAll.filter(this.dataFilter); 
        },
        setDataFilter(callBack){
            this.dataFilter=callBack;
            this.data=this.dataOfAll.filter(this.dataFilter);
        },
        setDataSort(key,order){
            this.data=this.$utils.sort(this.dataOfAll,key,order);
        },
        handleDelete(val, index){
            this.$emit('on-delete',val);
        },
        handleRefresh(){
            this.$refs.pagebar.handleRefresh();
        }
    }
};
</script>
