<template>
    <Page :total="total" :current="page" :page-size="pageSize" size="small" show-total placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'>
</Page>
</template>

<script>

export default {
    props:{
        page:{type:Number,default:1},
        pageSize:{type:Number,default:10},
        ajaxOptions:{type:Object,default:{}},
    },
    data(){
        return{
            total:0,
            num:1,
            size:10,
        }
    },
    created() {
        this.num=this.page;
        this.size=this.pageSize;
        this.init();

    },
    methods:{
        init(){
            if(!this.ajaxOptions.url){
                return;
            }
            if(!this.ajaxOptions.method){
               this.ajaxOptions.method="get";
            }
            if(!this.ajaxOptions.params){
                this.ajaxOptions.params={};
            }
            this.ajaxOptions.params.page=this.num;
            this.ajaxOptions.params.pageSize=this.size;
            this.$http.send(this.ajaxOptions,this,(res) =>{
                //如果res.data是不分页的全部数据，就前端分页
                //var temp=this.$http.pagination(this.page,this.pageSize,res.data);
                this.$emit('request-data',{data:res.data.datas});
                this.total=res.data.total;
            });           
        },
        handleRefresh(){
            this.ajaxOptions.params.page=this.num;
            this.ajaxOptions.params.pageSize=this.size; 
            this.$http.send(this.ajaxOptions,this,(res) =>{
                this.$emit('request-data',{data:res.data.datas});
                this.total=res.data.total;
            });             
        },
        handlePage(value){
            this.num=value;
            this.init();
        },
        handlePageSize(value){
            this.size=value;
            this.init();
        },
        
    }
};
</script>